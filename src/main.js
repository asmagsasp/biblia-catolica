import './style.css';
import * as db from './db.js';
import { Preferences } from '@capacitor/preferences';

// ===== STATE =====
let allBooks = [];
let currentBook = null;
let currentChapter = 1;
let totalChapters = 0;
let heroData = null;
let planData = null;
let readingPlanDays = {};
import { TextToSpeech } from '@capacitor-community/text-to-speech';

const fonts = ['normal', 'large', 'xlarge', 'small'];
let currentFontIdx = 0;
let isSpeaking = false;
let stopRequested = false;

// ===== INIT =====
async function init() {
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
  if (heroData) {
    document.getElementById('heroText').textContent = `\u201C${heroData.texto}\u201D`;
    document.getElementById('heroRef').textContent = `${heroData.nome_livro} ${heroData.id_capitulo},${heroData.id_versiculo}`;
    if (heroData.oracao) document.getElementById('heroOracao').textContent = `\u2014 ${heroData.oracao}`;
  } else {
    document.getElementById('heroText').textContent = '\u201CNo princípio, Deus criou o céu e a terra.\u201D';
    document.getElementById('heroRef').textContent = 'Gênesis 1,1';
  }
}

window.shareHeroWhatsApp = function () {
  if (!heroData) return;
  const txt = `\u201C${heroData.texto}\u201D\n\n\u2014 ${heroData.nome_livro} ${heroData.id_capitulo},${heroData.id_versiculo}\n\n_Bíblia Sagrada Católica_`;
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
    navigator.clipboard.writeText(`"${copyBtn.dataset.txt}" \u2014 ${copyBtn.dataset.livro} ${copyBtn.dataset.cap},${copyBtn.dataset.ver}`);
    showToast('\uD83D\uDCCB Versículo copiado!');
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

// ===== DONATE MODAL =====
window.showDonateModal = function () {
  document.getElementById('donateModal').classList.remove('hidden');
};

window.closeDonateModal = function () {
  document.getElementById('donateModal').classList.add('hidden');
};

window.copyPix = function () {
  const pixKey = document.getElementById('pixKey').innerText;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(pixKey).then(() => {
      showToast('Chave Pix copiada com sucesso!');
    }).catch(err => {
      console.error('Erro ao copiar chave Pix', err);
      showToast('Erro ao copiar. Tente manualmente.');
    });
  } else {
    // Fallback
    const textArea = document.createElement("textarea");
    textArea.value = pixKey;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Chave Pix copiada com sucesso!');
    } catch (err) {
      showToast('Erro ao copiar. Tente manualmente.');
    }
    document.body.removeChild(textArea);
  }
};

// ===== AI HOMILY =====
// A chave agora é lida das variáveis de ambiente (para não vazar no GitHub!)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

window.closeHomilyModal = function () {
  document.getElementById('homilyModal').classList.add('hidden');
};

window.generateHomilyForChapter = async function () {
  const verses = await db.getVersiculos(currentBook.id, currentChapter);
  const text = verses.map(v => v.texto).join(" ");
  // Trim to avoid extremely large context, though Gemini handles large contexts well
  const truncatedText = text.length > 5000 ? text.substring(0, 5000) + "..." : text;
  generateHomily(currentBook.nome, currentChapter, "completo", truncatedText);
};

window.generateHomily = async function (bookName, chapter, verse, text) {
  const modal = document.getElementById('homilyModal');
  const title = document.getElementById('homilyTitle');
  const ref = document.getElementById('homilyReference');
  const excerpt = document.getElementById('homilyTextExcerpt');
  const body = document.getElementById('homilyBody');
  const speakBtn = document.getElementById('homilySpeakBtn');

  modal.classList.remove('hidden');
  ref.textContent = `${bookName} ${chapter}${verse === 'completo' ? '' : ':' + verse}`;
  excerpt.textContent = `"${text.length > 150 ? text.substring(0, 150) + '...' : text}"`;
  speakBtn.classList.add('hidden');
  speakBtn.removeAttribute('data-homily');

  if (GEMINI_API_KEY === "COLE_SUA_CHAVE_AQUI" || !GEMINI_API_KEY) {
    body.innerHTML = `
      <div style="text-align:center; padding: 20px;">
        <i class="fas fa-exclamation-triangle" style="font-size:30px; color:var(--gold-400); margin-bottom:10px;"></i>
        <p>A inteligência artificial ainda não foi configurada.</p>
        <p style="font-size:13px; color:var(--text-muted); margin-top:10px;">
          Para ativar as homilias, você precisa obter uma Chave de API gratuita no <a href="https://aistudio.google.com/" target="_blank" style="color:#60a5fa;">Google AI Studio</a> e colá-la na variável GEMINI_API_KEY no final do arquivo src/main.js.
        </p>
      </div>`;
    return;
  }

  body.innerHTML = `
    <div style="text-align: center; padding: 30px;">
        <div class="loading-spinner" style="border-color: rgba(59,130,246,0.3); border-top-color: #3b82f6; width: 40px; height: 40px; margin: 0 auto 15px;"></div>
        <p style="color: #60a5fa; font-weight: bold; animation: pulse-glow 1.5s infinite;">O Padre de IA está preparando a homilia...</p>
    </div>
  `;

  try {
    const prompt = `Aja como um padre católico acolhedor, sábio e com profunda bagagem teológica. 
Faça uma bela homilia ou reflexão devocional (máximo de 3 ou 4 parágrafos curtos) baseada nesta passagem: 
${bookName} ${chapter}${verse === 'completo' ? '' : ':' + verse} - "${text}"

Concentre-se em trazer conforto, esperança e um ensinamento prático para a vida diária do fiel moderno, baseado no Magistério da Igreja. Destaque palavras importantes com *negrito* ou **negrito**. Termine com uma bênção curta.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, topP: 0.95 }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Detalhes da API:", errorText);
      throw new Error(`Código ${response.status}. A Chave pode ser inválida. Detalhes: ${errorText}`);
    }

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    let homily = data.candidates[0].content.parts[0].text;

    // Parse simple markdown to HTML (bold and paragraphs)
    const formattedHomily = homily
      .split('\n\n')
      .map(p => `<p style="margin-bottom: 12px;">${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<strong>$1</strong>')}</p>`)
      .join('');

    body.innerHTML = formattedHomily;

    // Setup speak button
    speakBtn.dataset.homily = homily.replace(/\*/g, ''); // Text to speak (no asterisks)
    speakBtn.classList.remove('hidden');

  } catch (err) {
    console.error("Erro ao gerar homilia:", err);
    body.innerHTML = `
      <div style="text-align:center; padding: 20px;">
        <i class="fas fa-times-circle" style="font-size:30px; color:#ef4444; margin-bottom:10px;"></i>
        <p>Desculpe, ocorreu um erro ao se comunicar com a IA.</p>
        <p style="font-size:12px; color:var(--text-muted); margin-top:10px; word-break: break-all; text-align: left; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;">
          <strong>Erro técnico:</strong><br> ${err.message}
        </p>
      </div>`;
  }
};

window.speakHomily = function () {
  const btn = document.getElementById('homilySpeakBtn');
  const textToSpeak = btn.dataset.homily;
  if (textToSpeak) {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: textToSpeak,
        lang: 'pt-BR',
        rate: 1.0,
        pitch: 1.0,
        category: 'ambient'
      }).catch(e => {
        console.error("Erro TTS:", e);
        showToast("Erro ao ler homilia.");
      });
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    } else {
      showToast("Seu dispositivo não suporta leitura em voz alta.");
    }
  }
};
