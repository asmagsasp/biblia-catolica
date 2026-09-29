import './style.css';
import * as db from './db.js';
import { getDevotionalHomily } from './homilyService.js';
import { Preferences } from '@capacitor/preferences';
import { Clipboard } from '@capacitor/clipboard';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

// ===== CLIPBOARD UTILITY =====
export async function copyToClipboard(text) {
  if (!text) return false;

  // 1. Try Capacitor Native Clipboard (Android / iOS)
  try {
    if (Clipboard && typeof Clipboard.write === 'function') {
      await Clipboard.write({ string: text });
      return true;
    }
  } catch (e) {
    console.warn("Capacitor clipboard failed, tentando fallback:", e);
  }

  // 2. Try modern Web Clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      console.warn("navigator.clipboard.writeText failed, tentando fallback DOM:", e);
    }
  }

  // 3. Fallback: DOM execCommand for WebViews, older browsers or restricted contexts
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.contain = "strict";
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);

    const range = document.createRange();
    range.selectNodeContents(textArea);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (successful) return true;
  } catch (err) {
    console.error("DOM fallback execCommand copy failed:", err);
  }

  return false;
}

// ===== STATE =====
let allBooks = [];
let currentBook = null;
let currentChapter = 1;
let totalChapters = 0;
let heroData = null;
let planData = null;
let readingPlanDays = {};

const fonts = ['normal', 'large', 'xlarge', 'small'];
let currentFontIdx = 0;
let isSpeaking = false;
let stopRequested = false;

// ===== INIT =====
async function init() {
  // Inicia timer de doação
  checkAndStartDonateTimer();

  // Restore theme & font
  const { value: savedTheme } = await Preferences.get({ key: 'biblia_theme' }) || { value: 'dark' };
  setTheme(savedTheme || 'dark');

  const { value: savedFont } = await Preferences.get({ key: 'biblia_font' }) || { value: 'normal' };
  currentFontIdx = fonts.indexOf(savedFont) !== -1 ? fonts.indexOf(savedFont) : 0;
  document.documentElement.setAttribute('data-font', fonts[currentFontIdx]);

  // Restore Plan
  const { value: savedPlan } = await Preferences.get({ key: 'biblia_plan_days' });
  readingPlanDays = savedPlan ? JSON.parse(savedPlan) : {};

  // Load data
  try {
    await db.initDB();
  } catch (e) {
    console.error("Erro na inicialização do DB:", e);
  }

  // Remove splash
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.add('fade-out');
    setTimeout(() => splash.remove(), 600);
  }

  // Load UI
  allBooks = await db.getLivros() || [];
  renderBooks(allBooks);
  await loadVersiculoDoDia();
  await loadStats();

  // Events
  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });
}

document.addEventListener('DOMContentLoaded', init);

// ===== THEME =====
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.querySelector('#themeBtn i');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('biblia_theme', theme);
  stopSpeech();
}

window.stopSpeech = async function () {
  stopRequested = true;
  isSpeaking = false;
  try { await TextToSpeech.stop(); } catch (e) { }
  document.querySelectorAll('.verse.reading').forEach(v => v.classList.remove('reading'));
};

window.toggleTheme = function () {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  setTheme(next);
  Preferences.set({ key: 'biblia_theme', value: next });
};

window.toggleFontSize = function () {
  currentFontIdx = (currentFontIdx + 1) % fonts.length;
  const f = fonts[currentFontIdx];
  document.documentElement.setAttribute('data-font', f);
  Preferences.set({ key: 'biblia_font', value: f });
  showToast('Tamanho da letra ajustado \uD83D\uDD0D');
};

// ===== STATS =====
async function loadStats() {
  const s = await db.getStats();
  const container = document.getElementById('statsBar');
  if (!container) return;

  // Atualização atômica para não travar a UI
  container.innerHTML = `
        <div class="stat-item"><span class="stat-number">${s.total_livros}</span><span class="stat-label">Livros</span></div>
        <div class="stat-item"><span class="stat-number">${(s.total_versiculos / 1000).toFixed(1)}k</span><span class="stat-label">Versículos</span></div>
        <div class="stat-item"><span class="stat-number">${s.total_imagens}</span><span class="stat-label">Imagens</span></div>
        <div class="stat-item"><span class="stat-number" id="statsFavCount">${s.total_favoritos}</span><span class="stat-label">Favoritos</span></div>
    `;
}

async function updateFavCountOnly() {
  const el = document.getElementById('statsFavCount');
  if (el) {
    const s = await db.getStats();
    el.textContent = s.total_favoritos;
  }
}

// ===== BOOKS =====
function renderBooks(books) {
  const c = document.getElementById('booksContainer');
  const at = books.filter(b => b.id_testamento === 1);
  const nt = books.filter(b => b.id_testamento === 2);
  let h = '';
  if (at.length) h += `<section class="testamento-section" data-testamento="1"><h2 class="testamento-title">Antigo Testamento \u2014 ${at.length} livros</h2><div class="books-grid">${at.map(bookCard).join('')}</div></section>`;
  if (nt.length) h += `<section class="testamento-section" data-testamento="2"><h2 class="testamento-title">Novo Testamento \u2014 ${nt.length} livros</h2><div class="books-grid">${nt.map(bookCard).join('')}</div></section>`;
  c.innerHTML = h;
}

function bookCard(b) {
  return `<div class="book-card" data-livro="${b.id_livro}" data-nome="${b.nome_livro}" data-caps="${b.total_capitulos}">
        <div class="book-name">${b.nome_livro}</div>
        <div class="book-chapters">${b.total_capitulos} cap.</div>
    </div>`;
}

// Event delegation para livros
document.addEventListener('click', e => {
  const card = e.target.closest('.book-card');
  if (card) {
    openBook(
      parseInt(card.dataset.livro),
      card.dataset.nome,
      parseInt(card.dataset.caps)
    );
  }
});

window.filterTestamento = function (id, btn) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.testamento-section').forEach(s => {
    s.classList.toggle('hidden', id !== 0 && parseInt(s.dataset.testamento) !== id);
  });
};

// ===== VERSICULO DO DIA =====
async function loadVersiculoDoDia() {
  heroData = await db.getVersiculoDoDia();
  if (heroData && heroData.texto) {
    const nomeLivro = heroData.nome_livro || 'Salmos';
    const cap = heroData.id_capitulo || 23;
    const ver = heroData.id_versiculo || 1;
    const ref = heroData.referencia || `${nomeLivro} ${cap},${ver}`;

    document.getElementById('heroText').textContent = `“${heroData.texto.trim()}”`;
    document.getElementById('heroRef').textContent = ref;
    const oracaoEl = document.getElementById('heroOracao');
    if (oracaoEl) {
      if (heroData.oracao) {
        oracaoEl.textContent = `— ${heroData.oracao}`;
        oracaoEl.style.display = 'block';
      } else {
        oracaoEl.textContent = '';
        oracaoEl.style.display = 'none';
      }
    }
  } else {
    document.getElementById('heroText').textContent = '“O Senhor é o meu pastor; nada me faltará.”';
    document.getElementById('heroRef').textContent = 'Salmos 23,1';
    const oracaoEl = document.getElementById('heroOracao');
    if (oracaoEl) oracaoEl.textContent = '— Senhor, conduzi os meus passos e dai-me a paz de descansar em Teus braços.';
  }
}

window.shareHeroWhatsApp = function () {
  if (!heroData || !heroData.texto) return;
  const nomeLivro = heroData.nome_livro || 'Salmos';
  const cap = heroData.id_capitulo || 23;
  const ver = heroData.id_versiculo || 1;
  const ref = heroData.referencia || `${nomeLivro} ${cap},${ver}`;

  let txt = `“${heroData.texto.trim()}”\n\n— ${ref}`;
  if (heroData.oracao) {
    txt += `\n\n_${heroData.oracao}_`;
  }
  txt += `\n\n*Bíblia Sagrada Católica*`;
  window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, '_blank');
};

// ===== OPEN BOOK =====
async function openBook(id, nome, total) {
  if (!db.isReady()) return;
  try {
    if (!total) { const l = allBooks.find(b => b.id_livro === id); total = l ? l.total_capitulos : 1; }
    currentBook = { id, nome, total };
    totalChapters = total;
    currentChapter = 1;
    showView('chapterView');
    document.getElementById('chapterTitle').textContent = nome;
    document.getElementById('chapterSubtitle').textContent = `${total} capítulos`;
    renderChapterSelector();
    await loadVerses();
    window.scrollTo(0, 0);
    stopSpeech();
  } catch (e) {
    console.error("OpenBook error:", e);
    goHome();
  }
}

function renderChapterSelector() {
  let h = '';
  for (let i = 1; i <= totalChapters; i++) h += `<button class="chapter-btn ${i === currentChapter ? 'active' : ''}" data-cap="${i}">${i}</button>`;
  document.getElementById('chaptersSelector').innerHTML = h;
}

// Event delegation para capitulos
document.getElementById('chaptersSelector').addEventListener('click', async e => {
  const btn = e.target.closest('.chapter-btn');
  if (btn) await selectChapter(parseInt(btn.dataset.cap));
});

async function selectChapter(n) {
  currentChapter = n;
  renderChapterSelector();
  await loadVerses();
  window.scrollTo(0, 0);
  stopSpeech();
}

async function loadVerses() {
  const c = document.getElementById('versesContainer');
  const verses = await db.getVersiculos(currentBook.id, currentChapter);
  if (verses.length) {
    c.innerHTML = `
      <div class="chapter-actions-top" style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="btn-read-all" onclick="readFullChapter()">
          <i class="fas fa-volume-up"></i> Ouvir Capítulo
        </button>
        <button class="btn-read-all pulse-animation" onclick="generateHomilyForChapter()" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border-color: transparent;">
          <i class="fas fa-sparkles"></i> Homilia do Capítulo
        </button>
      </div>
    ` + verses.map(v => `
            <div class="verse" data-v="${v.id_versiculo}" id="v-${v.id_versiculo}">
                <span class="verse-number">${v.id_versiculo}</span>
                <span class="verse-text">${v.texto}</span>
                <div class="verse-actions">
                    <button class="verse-action-btn speak-btn" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="Ouvir"><i class="fas fa-volume-up"></i></button>
                    <button class="verse-action-btn fav-btn ${v.favorito ? 'favorited' : ''}" data-livro="${currentBook.id}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" title="Favoritar"><i class="fas fa-heart"></i></button>
                    <button class="verse-action-btn whatsapp wa-btn" data-livro="${currentBook.nome}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                    <button class="verse-action-btn copy-btn" data-livro="${currentBook.nome}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="Copiar"><i class="fas fa-copy"></i></button>
                    <button class="verse-action-btn ai-btn" data-livro="${currentBook.nome}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="Reflexão IA" style="color: #60a5fa;"><i class="fas fa-sparkles"></i></button>
                </div>
            </div>
        `).join('');
  } else {
    c.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px;">Nenhum versículo encontrado.</p>';
  }
  document.getElementById('prevChapter').disabled = currentChapter <= 1;
  document.getElementById('nextChapter').disabled = currentChapter >= totalChapters;
}

window.navigateChapter = function (d) {
  const n = currentChapter + d;
  if (n >= 1 && n <= totalChapters) selectChapter(n);
};

// Event delegation para ações de versículos
document.getElementById('versesContainer').addEventListener('click', async e => {
  const favBtn = e.target.closest('.fav-btn');
  if (favBtn) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await db.toggleFavorito(
        parseInt(favBtn.dataset.livro),
        parseInt(favBtn.dataset.cap),
        parseInt(favBtn.dataset.ver)
      );
      favBtn.classList.toggle('favorited', result === 1);

      // Feedback mínimo e assíncrono para não travar a UI
      requestAnimationFrame(async () => {
        showToast(result ? '❤ Favoritado' : 'Removido');
        const favContainer = document.getElementById('favoritesContainer');
        if (favContainer) delete favContainer.dataset.loaded;
        await updateFavCountOnly();
      });
    } catch (err) {
      console.error("Erro no Favorito:", err);
    }
    return;
  }
  const waBtn = e.target.closest('.wa-btn');
  if (waBtn) {
    e.stopPropagation();
    const msg = `\u201C${waBtn.dataset.txt}\u201D\n\n\u2014 ${waBtn.dataset.livro} ${waBtn.dataset.cap},${waBtn.dataset.ver}\n\n_Bíblia Sagrada Católica_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    return;
  }
  const copyBtn = e.target.closest('.copy-btn');
  if (copyBtn) {
    e.stopPropagation();
    const verseText = `"${copyBtn.dataset.txt}" — ${copyBtn.dataset.livro} ${copyBtn.dataset.cap},${copyBtn.dataset.ver}`;
    copyToClipboard(verseText).then(ok => {
      if (ok) {
        showToast('📋 Versículo copiado!');
      } else {
        showToast('Erro ao copiar versículo');
      }
    });
    return;
  }
  const aiBtn = e.target.closest('.ai-btn');
  if (aiBtn) {
    e.stopPropagation();
    generateHomily(aiBtn.dataset.livro, aiBtn.dataset.cap, aiBtn.dataset.ver, aiBtn.dataset.txt);
    return;
  }
  const speakBtn = e.target.closest('.speak-btn');
  if (speakBtn) {
    e.stopPropagation();
    const verseDiv = speakBtn.closest('.verse');
    const text = speakBtn.dataset.txt;
    const vNum = verseDiv.dataset.v;
    speakText(text, vNum);
    return;
  }
});

window.speakText = async function (text, vNum = null) {
  await stopSpeech();
  if (!text) return;

  isSpeaking = true;
  stopRequested = false;

  if (vNum) {
    const el = document.getElementById(`v-${vNum}`);
    if (el) el.classList.add('reading');
  }

  try {
    await TextToSpeech.speak({
      text: text,
      lang: 'pt-BR',
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient'
    });
  } catch (e) {
    console.error('TTS error:', e);
  } finally {
    if (vNum) {
      const el = document.getElementById(`v-${vNum}`);
      if (el) el.classList.remove('reading');
    }
    isSpeaking = false;
  }
};

window.readFullChapter = async function () {
  await stopSpeech();
  const verses = document.querySelectorAll('.verse');
  stopRequested = false;

  for (let i = 0; i < verses.length; i++) {
    if (stopRequested) break;

    const v = verses[i];
    const text = v.querySelector('.verse-text').textContent;

    v.classList.add('reading');
    v.scrollIntoView({ behavior: 'smooth', block: 'center' });

    try {
      await TextToSpeech.speak({
        text: text,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient'
      });
    } catch (e) {
      break;
    }

    v.classList.remove('reading');
  }

  document.querySelectorAll('.verse.reading').forEach(v => v.classList.remove('reading'));
  isSpeaking = false;
};

// ===== SEARCH =====
function doSearch() {
  const t = document.getElementById('searchInput').value.trim();
  if (t.length < 3) { showToast('Digite ao menos 3 caracteres'); return; }

  showView('searchView');
  const container = document.getElementById('searchResults');
  container.innerHTML = '<div class="loading" style="padding:100px"><div class="loading-spinner"></div></div>';

  setTimeout(async () => {
    try {
      const resultados = await db.buscar(t);
      let h = `<div class="chapter-header"><div class="chapter-header-left"><button class="btn-back" onclick="goHome()"><i class="fas fa-arrow-left"></i></button><div><h2 class="chapter-title">Resultados da Busca</h2><p class="chapter-subtitle">${resultados.length} resultados para "${t}"</p></div></div></div>`;

      if (!resultados.length) {
        h += '<p style="color:var(--text-muted);text-align:center;padding:40px;">Nenhum resultado encontrado.</p>';
      } else {
        resultados.forEach(r => {
          const hl = r.texto.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>');
          h += `<div class="search-result-item" data-livro="${r.id_livro}" data-nome="${r.nome_livro}" data-cap="${r.id_capitulo}">
                  <div class="search-result-ref">${r.nome_livro} ${r.id_capitulo},${r.id_versiculo}</div>
                  <div class="search-result-text">${hl}</div>
              </div>`;
        });
      }
      container.innerHTML = h;
    } catch (e) {
      console.error("Search error:", e);
    }
  }, 10);
}

document.getElementById('searchResults').addEventListener('click', e => {
  const item = e.target.closest('.search-result-item');
  if (item) {
    const cap = parseInt(item.dataset.cap);
    openBook(parseInt(item.dataset.livro), item.dataset.nome, 0);
    setTimeout(() => selectChapter(cap), 100);
  }
});

// ===== FAVORITES =====
window.showFavorites = function () {
  showView('favoritesView');
  const container = document.getElementById('favoritesContainer');
  if (container.dataset.loaded === '1') return;

  container.innerHTML = '<div class="loading" style="padding:100px"><div class="loading-spinner"></div></div>';

  requestAnimationFrame(async () => {
    try {
      const d = await db.getFavoritos();
      let h = `<div class="chapter-header"><div class="chapter-header-left"><button class="btn-back" onclick="goHome()"><i class="fas fa-arrow-left"></i></button><div><h2 class="chapter-title">Meus Favoritos</h2><p class="chapter-subtitle">${d.length} versículos</p></div></div></div>`;

      if (!d.length) {
        h += `<div class="favorites-empty"><i class="far fa-heart"></i><p>Nenhum versículo favoritado.</p></div>`;
      } else {
        d.forEach(r => {
          h += `<div class="search-result-item" data-livro="${r.id_livro}" data-nome="${r.nome_livro}" data-cap="${r.id_capitulo}">
                  <div class="search-result-ref">${r.nome_livro} ${r.id_capitulo},${r.id_versiculo}</div>
                  <div class="search-result-text">${r.texto}</div>
              </div>`;
        });
      }
      container.innerHTML = h;
      container.dataset.loaded = '1';
    } catch (e) {
      console.error("Favoritos Error:", e);
    }
  });
};



document.getElementById('favoritesContainer').addEventListener('click', e => {
  const item = e.target.closest('.search-result-item');
  if (item) {
    const cap = parseInt(item.dataset.cap);
    openBook(parseInt(item.dataset.livro), item.dataset.nome, 0);
    setTimeout(() => selectChapter(cap), 100);
  }
});

// ===== GALLERY =====
window.showGallery = function () {
  showView('galleryView');
  const g = document.getElementById('galleryGrid');
  if (g.dataset.loaded) return;

  g.innerHTML = '<div class="loading" style="grid-column:1/-1;padding:100px"><div class="loading-spinner"></div></div>';

  setTimeout(async () => {
    try {
      const imgs = await db.getImgVersiculos();
      let h = '';
      imgs.forEach(img => {
        h += `
          <div class="gallery-card">
              <img src="${img.address}" alt="${img.nome_livro} ${img.id_capitulo},${img.id_versiculo}" loading="lazy"
                   onerror="this.parentElement.style.background='var(--burgundy-700)';this.style.display='none'">
              <div class="gallery-card-overlay">
                  <div class="gallery-card-info">
                      <div class="gallery-card-ref">${img.nome_livro} ${img.id_capitulo},${img.id_versiculo}</div>
                      <div class="gallery-card-txt">${img.texto}</div>
                  </div>
                  <button class="gallery-wa" data-livro="${img.nome_livro}" data-cap="${img.id_capitulo}" data-ver="${img.id_versiculo}" data-txt="${img.texto.replace(/"/g, '&quot;')}">
                      <i class="fab fa-whatsapp"></i>
                  </button>
              </div>
          </div>`;
      });
      g.innerHTML = h;
      g.dataset.loaded = '1';
    } catch (e) {
      console.error("Gallery Error:", e);
    }
  }, 30);
};

document.getElementById('galleryGrid').addEventListener('click', e => {
  const btn = e.target.closest('.gallery-wa');
  if (btn) {
    e.stopPropagation();
    const msg = `\u201C${btn.dataset.txt}\u201D\n\n\u2014 ${btn.dataset.livro} ${btn.dataset.cap},${btn.dataset.ver}\n\n_Bíblia Sagrada Católica_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  }
});

// ===== READING PLAN =====
window.showPlan = function () {
  showView('planView');
  const c = document.getElementById('planContainer');
  if (c.dataset.loaded === '1') { updatePlanProgress(); return; }

  c.innerHTML = '<div class="loading" style="padding:100px"><div class="loading-spinner"></div></div>';

  requestAnimationFrame(async () => {
    try {
      const plan = await db.getPlanoLeitura();
      const now = new Date();
      const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);

      let h = '';
      plan.forEach(d => {
        const isToday = d.dia === dayOfYear;
        const done = readingPlanDays[d.dia] || false;
        const leituras = d.leituras.map(l => `${l.nome_livro} ${l.capitulo}`).join(', ');
        h += `<div class="plan-day ${done ? 'completed' : ''} ${isToday ? 'today' : ''}" data-dia="${d.dia}">
                <div class="plan-day-num">${d.dia}</div>
                <div class="plan-day-content">
                    <div class="plan-day-title">${isToday ? '\uD83D\uDCD6 Hoje' : `Dia ${d.dia}`}</div>
                    <div class="plan-day-desc">${leituras}</div>
                </div>
                <div class="plan-day-check"><i class="fas fa-check"></i></div>
            </div>`;
      });
      c.innerHTML = h;
      c.dataset.loaded = '1';
      updatePlanProgress();

      const todayEl = document.querySelector('.plan-day.today');
      if (todayEl) todayEl.scrollIntoView({ block: 'center' });
    } catch (e) {
      console.error("Plan Error:", e);
    }
  });
};

document.getElementById('planContainer').addEventListener('click', async e => {
  const day = e.target.closest('.plan-day');
  if (day) {
    const dia = parseInt(day.dataset.dia);
    readingPlanDays[dia] = !readingPlanDays[dia];

    await Preferences.set({
      key: 'biblia_plan_days',
      value: JSON.stringify(readingPlanDays)
    });

    day.classList.toggle('completed', readingPlanDays[dia]);
    updatePlanProgress();
    if (readingPlanDays[dia]) showToast('Leitura concluída! Deus te abençoe! \uD83D\uDE4F');
  }
});

function updatePlanProgress() {
  const done = Object.values(readingPlanDays).filter(Boolean).length;
  const pct = Math.round((done / 365) * 100);
  document.getElementById('planProgress').style.width = pct + '%';
  document.getElementById('planProgressText').textContent = `${done} de 365 dias concluídos (${pct}%)`;
}

// ===== VIEW MANAGEMENT =====
function showView(id) {
  stopSpeech();
  ['homeView', 'chapterView', 'searchView', 'favoritesView', 'galleryView', 'planView'].forEach(v => {
    const el = document.getElementById(v);
    if (el) el.classList.toggle('hidden', v !== id);
  });
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  const map = { homeView: 'bnHome', galleryView: 'bnGallery', planView: 'bnPlan', favoritesView: 'bnFav' };
  if (map[id]) { const btn = document.getElementById(map[id]); if (btn) btn.classList.add('active'); }
  window.scrollTo(0, 0);
}

window.goHome = function () {
  showView('homeView');
  document.getElementById('searchInput').value = '';
  window.scrollTo(0, 0);
};

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== DONATE MODAL & RECURRING REMINDER =====
let donateInterval = null;
const DONATE_INTERVAL_MS = 2 * 60 * 1000; // 2 minutos

async function checkAndStartDonateTimer() {
  try {
    const res = await Preferences.get({ key: 'biblia_already_donated' });
    const alreadyDonated = res && (res.value === 'true' || res.value === true);
    if (alreadyDonated) {
      console.log('[Donate] Usuário já marcou como doado. Timer desativado.');
      return;
    }

    if (donateInterval) clearInterval(donateInterval);
    console.log('[Donate] Timer de apoio ativado: abrirá a cada 2 minutos.');

    donateInterval = setInterval(async () => {
      try {
        const check = await Preferences.get({ key: 'biblia_already_donated' });
        if (check && (check.value === 'true' || check.value === true)) {
          if (donateInterval) clearInterval(donateInterval);
          return;
        }

        const modal = document.getElementById('donateModal');
        const homilyModal = document.getElementById('homilyModal');
        const homilyVisible = homilyModal && !homilyModal.classList.contains('hidden');

        if (modal && modal.classList.contains('hidden') && !homilyVisible) {
          console.log('[Donate] 2 minutos decorridos. Exibindo modal de apoio.');
          showDonateModal();
        }
      } catch (err) {
        console.error('[Donate] Erro no ciclo do timer:', err);
      }
    }, DONATE_INTERVAL_MS);
  } catch (err) {
    console.error("[Donate] Erro ao verificar timer de doação:", err);
  }
}

window.showDonateModal = function () {
  const modal = document.getElementById('donateModal');
  if (modal) modal.classList.remove('hidden');
};

window.closeDonateModal = function () {
  const modal = document.getElementById('donateModal');
  if (modal) modal.classList.add('hidden');
};

window.markAsDonated = async function () {
  try {
    await Preferences.set({ key: 'biblia_already_donated', value: 'true' });
    if (donateInterval) {
      clearInterval(donateInterval);
      donateInterval = null;
    }
    closeDonateModal();
    showToast('🙏 Deus abençoe sua generosidade! Muito obrigado por apoiar o projeto.');
  } catch (err) {
    console.error("[Donate] Erro ao salvar status de doação:", err);
    closeDonateModal();
  }
};

window.resetDonateStatus = async function () {
  try {
    await Preferences.remove({ key: 'biblia_already_donated' });
    checkAndStartDonateTimer();
    showToast('Status de doação reiniciado (2 min).');
  } catch (e) {
    console.error(e);
  }
};

window.copyPix = async function () {
  const pixKeyEl = document.getElementById('pixKey');
  const pixKey = pixKeyEl ? (pixKeyEl.innerText || pixKeyEl.textContent || '').trim() : 'minhabibliacatolica1@gmail.com';
  
  const success = await copyToClipboard(pixKey);
  const copyBtn = document.getElementById('pixCopyBtn');

  if (success) {
    showToast('Chave Pix copiada com sucesso!');
    if (copyBtn) {
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copiado!</span>';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.classList.remove('copied');
      }, 2500);
    }
  } else {
    // If all clipboard methods fail, automatically select the text for easy manual copy
    if (pixKeyEl) {
      try {
        const range = document.createRange();
        range.selectNodeContents(pixKeyEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (e) {
        console.warn("Could not select text range:", e);
      }
    }
    showToast('Chave selecionada! Copie manualmente.');
  }
};

// ===== AI HOMILY & DEVOTIONAL REFLECTION =====
function getGeminiApiKey() {
  const localKey = (localStorage.getItem('biblia_gemini_api_key') || '').trim();
  if (localKey) return localKey;
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  if (envKey && envKey !== 'COLE_SUA_CHAVE_AQUI') return envKey;
  return '';
}

window.closeHomilyModal = function () {
  const modal = document.getElementById('homilyModal');
  if (modal) modal.classList.add('hidden');
  stopHomilyAudio();
};

window.saveGeminiApiKeyFromInput = function () {
  const input = document.getElementById('geminiApiKeyInput');
  if (!input) return;
  const key = input.value.trim();
  if (!key) {
    showToast('Por favor, informe uma chave de API válida.');
    return;
  }
  localStorage.setItem('biblia_gemini_api_key', key);
  showToast('Chave de API salva com sucesso!');
  if (window._lastHomilyParams) {
    const { bookName, chapter, verse, text } = window._lastHomilyParams;
    generateDynamicGeminiHomily(bookName, chapter, verse, text);
  }
};

window.clearGeminiApiKey = function () {
  localStorage.removeItem('biblia_gemini_api_key');
  showToast('Chave removida.');
  if (window._lastHomilyParams) {
    const { bookName, chapter, verse, text } = window._lastHomilyParams;
    generateHomily(bookName, chapter, verse, text);
  }
};

function renderApiKeySetupUI(container, isInvalid = false) {
  const currentKey = getGeminiApiKey();
  const maskedKey = currentKey ? currentKey.substring(0, 6) + '...' + currentKey.substring(Math.max(0, currentKey.length - 4)) : '';

  container.innerHTML = `
    <div style="text-align:center; padding: 10px 5px;">
      <div style="width: 50px; height: 50px; border-radius: 50%; background: ${isInvalid ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)'}; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
        <i class="fas ${isInvalid ? 'fa-key' : 'fa-sparkles'}" style="font-size:22px; color: ${isInvalid ? '#ef4444' : '#60a5fa'};"></i>
      </div>
      
      <h3 style="font-size: 16px; margin-bottom: 8px; color: var(--text-primary); font-family: 'Cinzel', serif;">
        ${isInvalid ? 'Chave de API Inválida ou Expirada' : 'Configurar Chave do Gemini IA'}
      </h3>
      
      <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 15px; line-height: 1.5;">
        ${isInvalid 
          ? 'A chave do Google Gemini foi recusada ou expirou. Você pode obter uma nova chave gratuita no Google AI Studio e colá-la abaixo:' 
          : 'Para gerar reflexões em tempo real diretamente pelos servidores do Google Gemini, você pode obter uma chave gratuita no Google AI Studio:'}
      </p>

      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" 
         style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: #60a5fa; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); padding: 9px 15px; border-radius: 8px; text-decoration: none; margin-bottom: 18px; font-weight: 500;">
        <i class="fas fa-external-link-alt"></i> Obter Chave Gratuita no Google AI Studio
      </a>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px; margin-bottom: 14px; text-align: left;">
        <label for="geminiApiKeyInput" style="display: block; font-size: 12px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px;">
          Cole sua Chave de API (começa com AIza...):
        </label>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="geminiApiKeyInput" placeholder="AIzaSy..." 
                 value="${currentKey || ''}"
                 style="flex: 1; background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); padding: 10px 12px; border-radius: 8px; font-size: 13px; font-family: monospace; outline: none; width: 100%;">
        </div>
        ${maskedKey ? `<div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Chave configurada: <code>${maskedKey}</code></div>` : ''}
      </div>

      <div style="display: flex; gap: 8px; justify-content: center; margin-top: 15px; flex-wrap: wrap;">
        <button onclick="saveGeminiApiKeyFromInput()" 
                style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border: none; border-radius: 8px; padding: 10px 18px; font-weight: 600; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
          <i class="fas fa-save"></i> Salvar e Gerar
        </button>
        <button onclick="if(window._lastHomilyParams){ const p = window._lastHomilyParams; generateHomily(p.bookName, p.chapter, p.verse, p.text); }"
                style="background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-secondary); border-radius: 8px; padding: 10px 14px; font-size: 13px; cursor: pointer;">
          Voltar para Reflexão Padrão
        </button>
        ${currentKey ? `
          <button onclick="clearGeminiApiKey()" title="Remover chave salva no navegador"
                  style="background: transparent; border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 8px; padding: 10px 14px; font-size: 13px; cursor: pointer;">
            <i class="fas fa-trash-alt"></i> Limpar
          </button>
        ` : ''}
      </div>

      <p style="font-size: 11px; color: var(--text-muted); margin-top: 14px;">
        🔒 Sua chave é salva no armazenamento local do seu dispositivo ou pode ser definida via <code>.env</code> (<code>VITE_GEMINI_API_KEY</code>).
      </p>
    </div>
  `;
}

window.generateHomilyForChapter = async function () {
  const verses = await db.getVersiculos(currentBook.id, currentChapter);
  const text = verses.map(v => v.texto).join(" ");
  generateHomily(currentBook.nome, currentChapter, "completo", text);
};

// Gera a homilia devocional nativa católica imediatamente (igual ao the-bible-app)
window.generateHomily = function (bookName, chapter, verse, text) {
  const modal = document.getElementById('homilyModal');
  const title = document.getElementById('homilyTitle');
  const ref = document.getElementById('homilyReference');
  const excerpt = document.getElementById('homilyTextExcerpt');
  const body = document.getElementById('homilyBody');
  const speakBtn = document.getElementById('homilySpeakBtn');

  window._lastHomilyParams = { bookName, chapter, verse, text };

  modal.classList.remove('hidden');
  ref.textContent = `${bookName} ${chapter}${verse === 'completo' ? '' : ':' + verse}`;
  excerpt.textContent = `"${text.length > 150 ? text.substring(0, 150) + '...' : text}"`;

  // 1. Gera reflexão católica instantânea através do motor devocional nativo
  const devotional = getDevotionalHomily(bookName, chapter, verse, text);
  
  body.innerHTML = `
    ${devotional.html}
    <div style="margin-top: 20px; padding-top: 14px; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <span style="font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 5px;">
        <i class="fas fa-church" style="color: var(--gold-400);"></i> Meditação Bíblica Católica
      </span>
      <button onclick="triggerGeminiHomily()" 
              style="background: transparent; border: 1px solid rgba(59, 130, 246, 0.4); color: #60a5fa; font-size: 11px; padding: 5px 10px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 5px;">
        <i class="fas fa-sparkles"></i> Gerar com IA Gemini
      </button>
    </div>
  `;

  // 2. Prepara botão de áudio
  speakBtn.dataset.homily = devotional.textToSpeak;
  speakBtn.classList.remove('hidden');
  updateSpeakBtnState(false);
};

window.triggerGeminiHomily = function () {
  if (!window._lastHomilyParams) return;
  const { bookName, chapter, verse, text } = window._lastHomilyParams;
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    renderApiKeySetupUI(document.getElementById('homilyBody'), false);
    return;
  }
  generateDynamicGeminiHomily(bookName, chapter, verse, text);
};

window.generateDynamicGeminiHomily = async function (bookName, chapter, verse, text) {
  const body = document.getElementById('homilyBody');
  const speakBtn = document.getElementById('homilySpeakBtn');

  body.innerHTML = `
    <div style="text-align: center; padding: 30px;">
        <div class="loading-spinner" style="border-color: rgba(59,130,246,0.3); border-top-color: #3b82f6; width: 40px; height: 40px; margin: 0 auto 15px;"></div>
        <p style="color: #60a5fa; font-weight: bold; animation: pulse-glow 1.5s infinite;">O Padre de IA está preparando a homilia personalizada...</p>
    </div>
  `;

  try {
    const prompt = `Aja como um padre católico acolhedor, sábio e com profunda bagagem teológica. 
Faça uma bela homilia ou reflexão devocional (máximo de 3 ou 4 parágrafos curtos) baseada nesta passagem: 
${bookName} ${chapter}${verse === 'completo' ? '' : ':' + verse} - "${text}"

Concentre-se em trazer conforto, esperança e um ensinamento prático para a vida diária do fiel moderno, baseado no Magistério da Igreja Católica. Destaque palavras importantes com *negrito* ou **negrito**. Termine com uma bênção curta.`;

    const data = await callGeminiAPIWithFallback(prompt);
    let homily = data.candidates[0].content.parts[0].text;

    const formattedHomily = homily
      .split('\n\n')
      .map(p => `<p style="margin-bottom: 12px;">${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<strong>$1</strong>')}</p>`)
      .join('');

    body.innerHTML = `
      ${formattedHomily}
      <div style="margin-top: 20px; padding-top: 14px; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <span style="font-size: 11px; color: #60a5fa; display: flex; align-items: center; gap: 5px;">
          <i class="fas fa-sparkles"></i> Gerado com Google Gemini IA
        </span>
        <button onclick="renderApiKeySetupUI(document.getElementById('homilyBody'), false)"
                style="background: transparent; border: 1px solid var(--border-color); color: var(--text-muted); font-size: 11px; padding: 4px 8px; border-radius: 6px; cursor: pointer;">
          <i class="fas fa-cog"></i> Configurar Chave
        </button>
      </div>
    `;

    speakBtn.dataset.homily = homily.replace(/\*/g, '');
    speakBtn.classList.remove('hidden');
    updateSpeakBtnState(false);

  } catch (err) {
    console.error("Erro ao gerar homilia com Gemini:", err);
    if (err.message === 'INVALID_OR_EXPIRED_KEY') {
      renderApiKeySetupUI(body, true);
    } else if (err.message === 'KEY_NOT_CONFIGURED') {
      renderApiKeySetupUI(body, false);
    } else {
      // Fallback gracioso para a homilia devocional nativa com aviso suave
      const devotional = getDevotionalHomily(bookName, chapter, verse, text);
      body.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 8px 12px; margin-bottom: 15px; font-size: 12px; color: var(--text-secondary);">
          <i class="fas fa-info-circle" style="color: #ef4444;"></i> Servidores de IA ocupados. Exibindo reflexão espiritual padrão:
        </div>
        ${devotional.html}
      `;
      speakBtn.dataset.homily = devotional.textToSpeak;
      speakBtn.classList.remove('hidden');
      updateSpeakBtnState(false);
    }
  }
};

async function callGeminiAPIWithFallback(prompt) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("KEY_NOT_CONFIGURED");
  }

  // Modelos suportados no Google Gemini API v1beta
  const models = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash-lite'
  ];
  let lastError = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout per request

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, topP: 0.95, maxOutputTokens: 2048 }
          })
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data;
          }
        }

        const errorText = await response.text();
        console.warn(`Erro no modelo ${model} (tentativa ${attempt + 1}, status ${response.status}):`, errorText);

        if (response.status === 400 || response.status === 403) {
          throw new Error("INVALID_OR_EXPIRED_KEY");
        }

        lastError = new Error(`Código ${response.status}: Servidor do Gemini indisponível.`);
        
        if (response.status === 503 || response.status === 429 || response.status >= 500) {
          await new Promise(res => setTimeout(res, 500 * (attempt + 1)));
          continue;
        }
        break;
      } catch (err) {
        clearTimeout(timeoutId);
        lastError = err;
        if (err.name === 'AbortError') {
          console.warn(`Modelo ${model} demorou mais de 12s e foi cancelado (timeout). Alternando modelo...`);
          lastError = new Error("Tempo de resposta esgotado. Tentando modelo mais rápido...");
        } else if (err.message === 'INVALID_OR_EXPIRED_KEY' || err.message === 'KEY_NOT_CONFIGURED') {
          throw err;
        }
      }
    }
  }

  if (lastError && lastError.message !== 'INVALID_OR_EXPIRED_KEY' && lastError.message !== 'KEY_NOT_CONFIGURED') {
    throw new Error("Os servidores do Gemini estão enfrentando alta demanda no momento (sobrecarga temporária). Por favor, tente novamente em alguns instantes.");
  }
  throw lastError;
}

let isHomilySpeaking = false;

function updateSpeakBtnState(speaking) {
  isHomilySpeaking = speaking;
  const btn = document.getElementById('homilySpeakBtn');
  if (!btn) return;
  if (speaking) {
    btn.innerHTML = '<i class="fas fa-stop"></i> Parar Leitura';
    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
  } else {
    btn.innerHTML = '<i class="fas fa-volume-up"></i> Ouvir Homilia';
    btn.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
  }
}

function stopHomilyAudio() {
  isHomilySpeaking = false;
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    try { window.Capacitor.Plugins.TextToSpeech.stop(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  updateSpeakBtnState(false);
}

window.speakHomily = function () {
  if (isHomilySpeaking) {
    stopHomilyAudio();
    return;
  }

  const btn = document.getElementById('homilySpeakBtn');
  const textToSpeak = btn ? btn.dataset.homily : null;
  if (!textToSpeak) return;

  updateSpeakBtnState(true);

  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    window.Capacitor.Plugins.TextToSpeech.speak({
      text: textToSpeak,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
      category: 'ambient'
    }).then(() => {
      updateSpeakBtnState(false);
    }).catch(e => {
      console.error("Erro TTS:", e);
      updateSpeakBtnState(false);
      showToast("Erro ao ler homilia.");
    });
  } else if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();

    // Divide em sentenças para pronúncia clara e contínua
    const sentences = textToSpeak
      .split(/(?<=[.?!:])\s+|\n+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    let index = 0;
    function speakNextSentence() {
      if (!isHomilySpeaking || index >= sentences.length) {
        updateSpeakBtnState(false);
        return;
      }

      const sentence = sentences[index++];
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;

      utterance.onend = () => {
        if (isHomilySpeaking) {
          speakNextSentence();
        }
      };

      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis error:", e);
        if (isHomilySpeaking) {
          speakNextSentence();
        }
      };

      window.speechSynthesis.speak(utterance);
    }

    speakNextSentence();
  } else {
    updateSpeakBtnState(false);
    showToast("Seu dispositivo não suporta leitura em voz alta.");
  }
};
