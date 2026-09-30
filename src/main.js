import './style.css';
import * as db from './db.js';
import { getDevotionalHomily } from './homilyService.js';
import { generateSacredAIImage, composeCardOnCanvas, SACRED_AI_INSPIRATIONS, SACRED_AI_STYLES } from './aiImageService.js';
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
let isChapterReading = false;

function updateChapterReadBtnState(reading) {
  isChapterReading = reading;
  const btn = document.getElementById('btnReadChapter');
  if (!btn) return;
  if (reading) {
    btn.innerHTML = '<i class="fas fa-stop"></i> Parar Leitura';
    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
    btn.style.color = '#ffffff';
    btn.style.borderColor = 'transparent';
  } else {
    btn.innerHTML = '<i class="fas fa-volume-up"></i> Ouvir Capítulo';
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }
}

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

  // Events & Search Input Handling
  const mainSearchInput = document.getElementById('searchInput');
  const searchContainer = document.getElementById('searchContainer') || mainSearchInput?.parentElement;
  const headerEl = document.querySelector('.header');
  const searchClearBtn = document.getElementById('searchClearBtn');

  if (mainSearchInput) {
    mainSearchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      } else if (e.key === 'Escape') {
        mainSearchInput.value = '';
        if (searchClearBtn) searchClearBtn.classList.add('hidden');
        mainSearchInput.blur();
      }
    });

    mainSearchInput.addEventListener('input', e => {
      if (searchClearBtn) {
        searchClearBtn.classList.toggle('hidden', e.target.value.length === 0);
      }
    });

    mainSearchInput.addEventListener('focus', () => {
      if (headerEl) headerEl.classList.add('search-focused');
      if (searchContainer) searchContainer.classList.add('active');
    });

    mainSearchInput.addEventListener('blur', () => {
      if (headerEl) headerEl.classList.remove('search-focused');
      if (searchContainer) searchContainer.classList.remove('active');
    });
  }

  window.clearMainSearch = function (e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (mainSearchInput) {
      mainSearchInput.value = '';
      if (searchClearBtn) searchClearBtn.classList.add('hidden');
      if (headerEl) headerEl.classList.add('search-focused');
      if (searchContainer) searchContainer.classList.add('active');
      mainSearchInput.focus();
    }
  };
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
  updateChapterReadBtnState(false);
  try { await TextToSpeech.stop(); } catch (e) { }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  document.querySelectorAll('.verse.reading, .search-result-item.reading').forEach(v => v.classList.remove('reading'));
  document.querySelectorAll('.search-speak-btn.speaking').forEach(b => {
    b.classList.remove('speaking');
    b.innerHTML = '<i class="fas fa-volume-up"></i> <span>Ouvir</span>';
  });
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
  const isNT = b.id_testamento === 2;
  const iconClass = isNT ? 'fa-cross' : 'fa-scroll';
  return `<div class="book-card" data-livro="${b.id_livro}" data-nome="${b.nome_livro}" data-caps="${b.total_capitulos}">
        <div class="book-card-header">
          <span class="book-icon"><i class="fas ${iconClass}"></i></span>
          <span class="book-badge">${b.total_capitulos} cap.</span>
        </div>
        <div class="book-name">${b.nome_livro}</div>
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
        <button class="btn-read-all" id="btnReadChapter" onclick="readFullChapter()">
          <i class="fas fa-volume-up"></i> Ouvir Capítulo
        </button>
        <button class="btn-read-all pulse-animation" onclick="generateHomilyForChapter()" style="background: linear-gradient(135deg, var(--gold-500, #d4af37) 0%, #b8860b 100%); color: #111827; font-weight: 600; border-color: transparent;">
          <i class="fas fa-church"></i> Homilia do Capítulo
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
                    <button class="verse-action-btn ai-btn" data-livro="${currentBook.nome}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="Homilia & Meditação" style="color: var(--gold-400);"><i class="fas fa-church"></i></button>
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

window.speakText = async function (text, vNum = null, customEl = null) {
  await stopSpeech();
  if (!text) return;

  isSpeaking = true;
  stopRequested = false;

  if (vNum) {
    const el = document.getElementById(`v-${vNum}`);
    if (el) el.classList.add('reading');
  }
  if (customEl) {
    customEl.classList.add('reading');
    const speakBtn = customEl.querySelector('.search-speak-btn');
    if (speakBtn) {
      speakBtn.classList.add('speaking');
      speakBtn.innerHTML = '<i class="fas fa-stop"></i> <span>Parar</span>';
    }
  }

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
    // Fallback Web SpeechSynthesis se TextToSpeech não estiver disponível
    if ('speechSynthesis' in window && !stopRequested) {
      await new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.95;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      });
    }
  } finally {
    if (vNum) {
      const el = document.getElementById(`v-${vNum}`);
      if (el) el.classList.remove('reading');
    }
    if (customEl) {
      customEl.classList.remove('reading');
      const speakBtn = customEl.querySelector('.search-speak-btn');
      if (speakBtn) {
        speakBtn.classList.remove('speaking');
        speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> <span>Ouvir</span>';
      }
    }
    isSpeaking = false;
  }
};

window.readFullChapter = async function () {
  if (isChapterReading) {
    await stopSpeech();
    return;
  }

  await stopSpeech();
  const verses = document.querySelectorAll('.verse');
  if (!verses || verses.length === 0) return;

  stopRequested = false;
  isSpeaking = true;
  updateChapterReadBtnState(true);

  try {
    for (let i = 0; i < verses.length; i++) {
      if (stopRequested) break;

      const v = verses[i];
      const textEl = v.querySelector('.verse-text');
      if (!textEl) continue;
      const text = textEl.textContent.trim();

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
        // Fallback Web SpeechSynthesis se TextToSpeech não estiver disponível
        if ('speechSynthesis' in window && !stopRequested) {
          await new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR';
            utterance.rate = 0.95;
            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();
            window.speechSynthesis.speak(utterance);
          });
        } else {
          break;
        }
      } finally {
        v.classList.remove('reading');
      }
    }
  } finally {
    document.querySelectorAll('.verse.reading').forEach(v => v.classList.remove('reading'));
    isSpeaking = false;
    updateChapterReadBtnState(false);
  }
};

// ===== SEARCH HIGHLIGHTING HELPER =====
export function highlightSearchTerms(text, query) {
  if (!text || !query) return text || '';

  const accentMap = {
    'a': '[aáàâãäAÁÀÂÃÄ]',
    'e': '[eéèêëEÉÈÊË]',
    'i': '[iíìîïIÍÌÎÏ]',
    'o': '[oóòôõöOÓÒÔÕÖ]',
    'u': '[uúùûüUÚÙÛÜ]',
    'c': '[cçCÇ]',
    'n': '[nñNÑ]'
  };

  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const makePattern = (term) => {
    return term
      .split('')
      .map(ch => {
        if (/\s+/.test(ch)) return '\\s+';
        const lower = ch.toLowerCase();
        return accentMap[lower] || escapeRegex(ch);
      })
      .join('');
  };

  const trimmed = query.trim();
  const words = trimmed.split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return text;

  // Include full phrase first so multi-word matches are highlighted as a single block
  const termList = words.length > 1 ? [trimmed, ...words] : words;
  const sortedTerms = termList.sort((a, b) => b.length - a.length);

  const pattern = sortedTerms.map(makePattern).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

// ===== SEARCH =====
function doSearch() {
  const input = document.getElementById('searchInput');
  const t = input ? input.value.trim() : '';
  if (t.length < 2) { showToast('Digite ao menos 2 caracteres'); return; }

  if (input) input.blur();

  showView('searchView');
  const container = document.getElementById('searchResults');
  container.innerHTML = '<div class="loading" style="padding:100px"><div class="loading-spinner"></div></div>';

  setTimeout(async () => {
    try {
      const resultados = await db.buscar(t);
      const count = resultados.length;
      let h = `<div class="chapter-header"><div class="chapter-header-left"><button class="btn-back" onclick="goHome()"><i class="fas fa-arrow-left"></i></button><div><h2 class="chapter-title">Resultados da Busca</h2><p class="chapter-subtitle">${count} versículo${count === 1 ? '' : 's'} encontrado${count === 1 ? '' : 's'} para "${t}"</p></div></div></div>`;

      if (!resultados.length) {
        h += '<p style="color:var(--text-muted);text-align:center;padding:40px;">Nenhum versículo encontrado para este termo.</p>';
      } else {
        resultados.forEach(r => {
          const hl = highlightSearchTerms(r.texto, t);
          const isFav = r.favorito === 1 || db.isFavorito(r.id_livro, r.id_capitulo, r.id_versiculo);
          const rawTextEscaped = (r.texto || '').replace(/"/g, '&quot;');

          h += `<div class="search-result-item" data-livro="${r.id_livro}" data-nome="${r.nome_livro}" data-cap="${r.id_capitulo}" data-ver="${r.id_versiculo}">
                  <div class="search-result-header">
                    <div class="search-result-ref">
                      <span class="search-result-ref-title"><i class="fas fa-book-bible"></i> ${r.nome_livro} ${r.id_capitulo}, ${r.id_versiculo}</span>
                      <span class="search-result-tag">Capítulo ${r.id_capitulo}</span>
                    </div>
                    <div class="search-result-actions">
                      <button class="search-action-btn search-speak-btn" data-txt="${rawTextEscaped}" title="Ouvir versículo" aria-label="Ouvir"><i class="fas fa-volume-up"></i> <span>Ouvir</span></button>
                      <button class="search-action-btn search-fav-btn ${isFav ? 'favorited' : ''}" data-livro="${r.id_livro}" data-cap="${r.id_capitulo}" data-ver="${r.id_versiculo}" title="${isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}" aria-label="Favoritar"><i class="fas fa-heart"></i></button>
                      <button class="search-action-btn search-copy-btn" data-livro="${r.nome_livro}" data-cap="${r.id_capitulo}" data-ver="${r.id_versiculo}" data-txt="${rawTextEscaped}" title="Copiar versículo" aria-label="Copiar"><i class="fas fa-copy"></i></button>
                      <button class="search-action-btn search-wa-btn" data-livro="${r.nome_livro}" data-cap="${r.id_capitulo}" data-ver="${r.id_versiculo}" data-txt="${rawTextEscaped}" title="Compartilhar no WhatsApp" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                    </div>
                  </div>
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

document.getElementById('searchResults').addEventListener('click', async e => {
  // 1. Favoritar
  const favBtn = e.target.closest('.search-fav-btn');
  if (favBtn) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const livroId = parseInt(favBtn.dataset.livro);
      const cap = parseInt(favBtn.dataset.cap);
      const ver = parseInt(favBtn.dataset.ver);
      const result = await db.toggleFavorito(livroId, cap, ver);
      favBtn.classList.toggle('favorited', result === 1);
      favBtn.title = result === 1 ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos';

      showToast(result === 1 ? '❤ Adicionado aos Favoritos' : 'Removido dos Favoritos');
      const favContainer = document.getElementById('favoritesContainer');
      if (favContainer) delete favContainer.dataset.loaded;
      await updateFavCountOnly();
    } catch (err) {
      console.error("Erro ao favoritar na busca:", err);
    }
    return;
  }

  // 2. Ouvir Trecho
  const speakBtn = e.target.closest('.search-speak-btn');
  if (speakBtn) {
    e.preventDefault();
    e.stopPropagation();
    const item = speakBtn.closest('.search-result-item');
    const text = speakBtn.dataset.txt;

    if (speakBtn.classList.contains('speaking')) {
      await stopSpeech();
      return;
    }

    await stopSpeech();
    speakText(text, null, item);
    return;
  }

  // 3. Copiar
  const copyBtn = e.target.closest('.search-copy-btn');
  if (copyBtn) {
    e.preventDefault();
    e.stopPropagation();
    const verseText = `"${copyBtn.dataset.txt}" — ${copyBtn.dataset.livro} ${copyBtn.dataset.cap},${copyBtn.dataset.ver}`;
    copyToClipboard(verseText).then(ok => {
      if (ok) showToast('📋 Versículo copiado!');
      else showToast('Erro ao copiar versículo');
    });
    return;
  }

  // 4. WhatsApp
  const waBtn = e.target.closest('.search-wa-btn');
  if (waBtn) {
    e.preventDefault();
    e.stopPropagation();
    const msg = `“${waBtn.dataset.txt}”\n\n— ${waBtn.dataset.livro} ${waBtn.dataset.cap},${waBtn.dataset.ver}\n\n_Bíblia Sagrada Católica_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    return;
  }

  // 5. Clicar no card para abrir o livro e capítulo
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
          const rawTextEscaped = (r.texto || '').replace(/"/g, '&quot;');
          h += `<div class="search-result-item" data-livro="${r.id_livro}" data-nome="${r.nome_livro}" data-cap="${r.id_capitulo}" data-ver="${r.id_versiculo}">
                  <div class="search-result-header">
                    <div class="search-result-ref">
                      <span class="search-result-ref-title"><i class="fas fa-book-bible"></i> ${r.nome_livro} ${r.id_capitulo}, ${r.id_versiculo}</span>
                      <span class="search-result-tag">Capítulo ${r.id_capitulo}</span>
                    </div>
                    <div class="search-result-actions">
                      <button class="search-action-btn search-speak-btn" data-txt="${rawTextEscaped}" title="Ouvir versículo" aria-label="Ouvir"><i class="fas fa-volume-up"></i> <span>Ouvir</span></button>
                      <button class="search-action-btn search-fav-btn favorited" data-livro="${r.id_livro}" data-cap="${r.id_capitulo}" data-ver="${r.id_versiculo}" title="Remover dos Favoritos" aria-label="Favoritar"><i class="fas fa-heart"></i></button>
                      <button class="search-action-btn search-copy-btn" data-livro="${r.nome_livro}" data-cap="${r.id_capitulo}" data-ver="${r.id_versiculo}" data-txt="${rawTextEscaped}" title="Copiar versículo" aria-label="Copiar"><i class="fas fa-copy"></i></button>
                      <button class="search-action-btn search-wa-btn" data-livro="${r.nome_livro}" data-cap="${r.id_capitulo}" data-ver="${r.id_versiculo}" data-txt="${rawTextEscaped}" title="Compartilhar no WhatsApp" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                    </div>
                  </div>
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

document.getElementById('favoritesContainer').addEventListener('click', async e => {
  // 1. Favoritar (remover dos favoritos)
  const favBtn = e.target.closest('.search-fav-btn');
  if (favBtn) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const livroId = parseInt(favBtn.dataset.livro);
      const cap = parseInt(favBtn.dataset.cap);
      const ver = parseInt(favBtn.dataset.ver);
      const result = await db.toggleFavorito(livroId, cap, ver);
      favBtn.classList.toggle('favorited', result === 1);

      const item = favBtn.closest('.search-result-item');
      if (result === 0 && item) {
        item.style.opacity = '0.35';
      } else if (item) {
        item.style.opacity = '1';
      }

      showToast(result === 1 ? '❤ Adicionado aos Favoritos' : 'Removido dos Favoritos');
      await updateFavCountOnly();
    } catch (err) {
      console.error("Erro ao favoritar nos favoritos:", err);
    }
    return;
  }

  // 2. Ouvir Trecho
  const speakBtn = e.target.closest('.search-speak-btn');
  if (speakBtn) {
    e.preventDefault();
    e.stopPropagation();
    const item = speakBtn.closest('.search-result-item');
    const text = speakBtn.dataset.txt;

    if (speakBtn.classList.contains('speaking')) {
      await stopSpeech();
      return;
    }

    await stopSpeech();
    speakText(text, null, item);
    return;
  }

  // 3. Copiar
  const copyBtn = e.target.closest('.search-copy-btn');
  if (copyBtn) {
    e.preventDefault();
    e.stopPropagation();
    const verseText = `"${copyBtn.dataset.txt}" — ${copyBtn.dataset.livro} ${copyBtn.dataset.cap},${copyBtn.dataset.ver}`;
    copyToClipboard(verseText).then(ok => {
      if (ok) showToast('📋 Versículo copiado!');
      else showToast('Erro ao copiar versículo');
    });
    return;
  }

  // 4. WhatsApp
  const waBtn = e.target.closest('.search-wa-btn');
  if (waBtn) {
    e.preventDefault();
    e.stopPropagation();
    const msg = `“${waBtn.dataset.txt}”\n\n— ${waBtn.dataset.livro} ${waBtn.dataset.cap},${waBtn.dataset.ver}\n\n_Bíblia Sagrada Católica_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    return;
  }

  // 5. Clicar no card para abrir o livro e capítulo
  const item = e.target.closest('.search-result-item');
  if (item) {
    const cap = parseInt(item.dataset.cap);
    openBook(parseInt(item.dataset.livro), item.dataset.nome, 0);
    setTimeout(() => selectChapter(cap), 100);
  }
});

// ===== GALLERY & SACRED STUDIO =====
let allGalleryItems = [];
let currentGalleryList = [];
let currentGalleryCategory = 'all';
let currentGallerySearch = '';
let currentGallerySort = 'canonical';
let activeLightboxIndex = 0;
let currentLightboxList = [];
let uploadedImageData = '';
let gallerySearchDebounceTimer = null;

window.showGallery = function () {
  showView('galleryView');
  loadGalleryData();
};

async function loadGalleryData(forceRefresh = false) {
  const g = document.getElementById('galleryGrid');
  const statusEl = document.getElementById('galleryStatusText');
  const countAllEl = document.getElementById('galleryCountAll');

  if (!g) return;

  if (g.dataset.loaded && !forceRefresh && currentGalleryList.length > 0) {
    return;
  }

  g.innerHTML = '<div class="loading" style="grid-column:1/-1;padding:80px"><div class="loading-spinner"></div></div>';
  if (statusEl) statusEl.textContent = 'Carregando versículos com imagem...';

  try {
    const rawImgs = await db.getImgVersiculos(currentGallerySearch, currentGalleryCategory);
    allGalleryItems = rawImgs || [];

    if (countAllEl && currentGalleryCategory === 'all' && !currentGallerySearch) {
      countAllEl.textContent = `${allGalleryItems.length}`;
    }

    renderGalleryGrid();
    g.dataset.loaded = '1';
  } catch (e) {
    console.error("Gallery Error:", e);
    g.innerHTML = `<div class="gallery-empty-state">
      <i class="fas fa-exclamation-triangle gallery-empty-icon" style="color:#ef4444;"></i>
      <h3 class="gallery-empty-title">Erro ao carregar imagens</h3>
      <p class="gallery-empty-desc">${e.message || 'Verifique sua conexão ou tente novamente.'}</p>
      <button class="hero-donate-btn" onclick="loadGalleryData(true)"><i class="fas fa-redo"></i> Tentar Novamente</button>
    </div>`;
  }
}

function renderGalleryGrid() {
  const g = document.getElementById('galleryGrid');
  const statusEl = document.getElementById('galleryStatusText');
  if (!g) return;

  let list = [...allGalleryItems];

  // Apply sorting
  if (currentGallerySort === 'recent') {
    list.sort((a, b) => {
      if (a.is_user_upload && !b.is_user_upload) return -1;
      if (!a.is_user_upload && b.is_user_upload) return 1;
      return (b.id || 0) - (a.id || 0);
    });
  } else if (currentGallerySort === 'random') {
    list.sort(() => Math.random() - 0.5);
  } else {
    // Canonical order
    list.sort((a, b) => (a.id_livro || 999) - (b.id_livro || 999) || (a.id_capitulo || 0) - (b.id_capitulo || 0) || (a.id_versiculo || 0) - (b.id_versiculo || 0));
  }

  currentGalleryList = list;
  currentLightboxList = list;

  if (statusEl) {
    if (list.length === 0) {
      statusEl.textContent = 'Nenhuma imagem encontrada';
    } else {
      statusEl.textContent = `Exibindo ${list.length} ${list.length === 1 ? 'imagem' : 'imagens'}`;
    }
  }

  if (list.length === 0) {
    let emptyMsg = 'Nenhuma imagem encontrada com os filtros atuais.';
    let emptyCta = `<button class="hero-donate-btn" onclick="clearGallerySearch()"><i class="fas fa-undo"></i> Limpar Filtros</button>`;
    
    if (currentGalleryCategory === 'uploads') {
      emptyMsg = 'Você ainda não fez upload de imagens nem criou cards bíblicos.';
      emptyCta = `<button class="hero-donate-btn" onclick="openGalleryUploadModal()"><i class="fas fa-plus-circle"></i> Fazer Upload / Criar Card</button>`;
    } else if (currentGalleryCategory === 'favorites') {
      emptyMsg = 'Você ainda não favoritou nenhuma imagem. Clique no coração das fotos que mais gostar!';
      emptyCta = `<button class="hero-donate-btn" onclick="filterGalleryCategory('all', document.querySelector('.gallery-chip[data-category=\\'all\\']'))"><i class="fas fa-images"></i> Ver Todas as Imagens</button>`;
    }

    g.innerHTML = `
      <div class="gallery-empty-state">
        <i class="fas fa-images gallery-empty-icon"></i>
        <h3 class="gallery-empty-title">Galeria Vazia</h3>
        <p class="gallery-empty-desc">${emptyMsg}</p>
        <div>${emptyCta}</div>
      </div>`;
    return;
  }

  let h = '';
  list.forEach((img, idx) => {
    const isFav = img.is_favorite;
    const isUpload = img.is_user_upload;
    const hasBook = img.nome_livro && img.nome_livro !== 'Bíblia' && img.nome_livro !== 'Imagem Devocional' && img.nome_livro !== 'Card Sagrado';
    const ref = hasBook 
      ? `${img.nome_livro} ${img.id_capitulo || ''}${img.id_versiculo ? ',' + img.id_versiculo : ''}`.trim()
      : (img.id_capitulo ? `Bíblia ${img.id_capitulo},${img.id_versiculo || 1}` : (img.nome_livro || 'Imagem Devocional'));
    const txt = (img.texto || '').trim();
    const oracao = (img.oracao || '').trim();
    const imgSrc = img.address || img.url || '';

    h += `
      <div class="gallery-card" onclick="openGalleryLightbox(${idx})">
          <img src="${imgSrc}" alt="${ref}" loading="lazy"
               onerror="this.parentElement.style.background='linear-gradient(135deg, #2D1018 0%, #1A0A0E 100%)';this.style.opacity='0.2'">
          
          <div class="gallery-card-badge">${ref}</div>
          ${isUpload ? '<div class="gallery-card-user-tag"><i class="fas fa-sparkles"></i> Minha Imagem</div>' : ''}
          
          <div class="gallery-card-actions" onclick="event.stopPropagation()">
              <button class="gallery-action-btn btn-heart ${isFav ? 'active' : ''}" 
                      title="${isFav ? 'Remover dos favoritos' : 'Favoritar imagem'}" 
                      onclick="toggleCardFavorite(event, '${img.id}', '${img.nome_livro}_${img.id_capitulo}_${img.id_versiculo}')">
                  <i class="${isFav ? 'fas fa-heart' : 'far fa-heart'}" style="${isFav ? 'color:#ef4444;' : ''}"></i>
              </button>
              <button class="gallery-action-btn" title="Compartilhar no WhatsApp"
                      onclick="shareCardWhatsApp(event, '${escapeHtml(ref)}', '${escapeHtml(txt)}')">
                  <i class="fab fa-whatsapp" style="color:#22c55e;"></i>
              </button>
              ${isUpload ? `
              <button class="gallery-action-btn btn-delete" title="Excluir imagem"
                      onclick="deleteCardImage(event, '${img.id}')">
                  <i class="fas fa-trash-alt"></i>
              </button>` : ''}
          </div>

          <div class="gallery-card-overlay">
              ${txt ? `<div class="gallery-card-text">“${txt}”</div>` : ''}
              ${oracao ? `<div class="gallery-card-oracao-tag"><i class="fas fa-praying-hands"></i> ${oracao}</div>` : ''}
          </div>
      </div>`;
  });

  g.innerHTML = h;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n/g, ' ');
}

// Category filter
window.filterGalleryCategory = function (category, chipEl) {
  currentGalleryCategory = category;
  document.querySelectorAll('.gallery-chip').forEach(c => c.classList.remove('active'));
  if (chipEl) chipEl.classList.add('active');
  loadGalleryData(true);
};

// Search handling
const searchInput = document.getElementById('gallerySearchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    currentGallerySearch = val;
    const clearBtn = document.getElementById('gallerySearchClear');
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', val.length === 0);
    }
    if (gallerySearchDebounceTimer) clearTimeout(gallerySearchDebounceTimer);
    gallerySearchDebounceTimer = setTimeout(() => {
      loadGalleryData(true);
    }, 300);
  });
}

window.clearGallerySearch = function () {
  const input = document.getElementById('gallerySearchInput');
  const clearBtn = document.getElementById('gallerySearchClear');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  currentGallerySearch = '';
  loadGalleryData(true);
};

window.changeGallerySort = function (sortVal) {
  currentGallerySort = sortVal;
  renderGalleryGrid();
};

// Card quick actions
window.toggleCardFavorite = function (e, id, refKey) {
  e.stopPropagation();
  const isNowFav = db.toggleFavoriteImage(id, refKey);
  showToast(isNowFav ? '❤️ Imagem favoritada!' : 'Imagem removida dos favoritos');
  
  // Update local memory flag
  const target = allGalleryItems.find(img => String(img.id) === String(id));
  if (target) target.is_favorite = isNowFav;
  
  if (currentGalleryCategory === 'favorites') {
    loadGalleryData(true);
  } else {
    renderGalleryGrid();
  }
};

window.shareCardWhatsApp = function (e, ref, txt) {
  e.stopPropagation();
  const msg = `\u201C${txt}\u201D\n\n\u2014 ${ref}\n\n_B\u00EDblia Sagrada Cat\u00F3lica_\nhttps://minhabibliacatolica.com`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
};

window.deleteCardImage = async function (e, id) {
  e.stopPropagation();
  if (!confirm('Deseja realmente excluir esta imagem da sua galeria?')) return;

  try {
    await db.deleteImgVersiculo(id);
    showToast('Imagem excluída com sucesso');
    allGalleryItems = allGalleryItems.filter(img => String(img.id) !== String(id));
    loadGalleryData(true);
  } catch (err) {
    showToast('Erro ao excluir imagem');
  }
};

// ===== FULLSCREEN LIGHTBOX =====
window.openGalleryLightbox = function (idx) {
  if (!currentLightboxList || !currentLightboxList[idx]) return;
  activeLightboxIndex = idx;
  updateLightboxContent();

  const modal = document.getElementById('galleryLightboxModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

function updateLightboxContent() {
  const img = currentLightboxList[activeLightboxIndex];
  if (!img) return;

  const modalImg = document.getElementById('lightboxImg');
  const refBadge = document.getElementById('lightboxRefBadge');
  const uploadBadge = document.getElementById('lightboxUploadBadge');
  const title = document.getElementById('lightboxTitle');
  const oracao = document.getElementById('lightboxOracao');
  const verseText = document.getElementById('lightboxVerseText');
  const favIcon = document.getElementById('lightboxFavIcon');
  const favBtn = document.getElementById('lightboxBtnFavorite');
  const delBtn = document.getElementById('lightboxBtnDelete');
  const verseBox = document.getElementById('lightboxVerseBox');
  const copyBtn = document.getElementById('lightboxBtnCopy');
  const readBtn = document.getElementById('lightboxBtnReadChapter');

  const hasBook = img.nome_livro && img.nome_livro !== 'Bíblia' && img.nome_livro !== 'Imagem Devocional' && img.nome_livro !== 'Card Sagrado';
  const ref = hasBook 
    ? `${img.nome_livro} ${img.id_capitulo || ''}${img.id_versiculo ? ',' + img.id_versiculo : ''}`.trim()
    : (img.id_capitulo ? `Bíblia ${img.id_capitulo},${img.id_versiculo || 1}` : (img.nome_livro || 'Imagem Devocional'));
  const txt = (img.texto || '').trim();
  const oracaoTxt = (img.oracao || '').trim();
  const imgSrc = img.address || img.url || '';

  if (modalImg) {
    modalImg.src = imgSrc;
    modalImg.alt = ref;
  }
  if (refBadge) refBadge.textContent = ref;
  if (uploadBadge) uploadBadge.classList.toggle('hidden', !img.is_user_upload);
  if (title) title.textContent = ref;
  if (oracao) {
    oracao.textContent = oracaoTxt ? `Oração: “${oracaoTxt}”` : '';
    oracao.style.display = oracaoTxt ? 'block' : 'none';
  }
  if (verseText) verseText.textContent = txt;
  if (verseBox) verseBox.style.display = txt ? 'block' : 'none';
  if (copyBtn) copyBtn.style.display = txt ? 'inline-flex' : 'none';
  if (readBtn) readBtn.style.display = (img.id_livro && img.id_capitulo) ? 'inline-flex' : 'none';

  const isFav = img.is_favorite || db.isFavoriteImage(img.id, `${img.nome_livro}_${img.id_capitulo}_${img.id_versiculo}`);
  if (favIcon && favBtn) {
    favIcon.className = isFav ? 'fas fa-heart' : 'far fa-heart';
    favIcon.style.color = isFav ? '#ef4444' : '';
    favBtn.classList.toggle('active', isFav);
  }

  if (delBtn) {
    delBtn.classList.toggle('hidden', !img.is_user_upload);
  }
}

window.closeGalleryLightbox = function () {
  const modal = document.getElementById('galleryLightboxModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

window.navigateLightbox = function (direction) {
  if (!currentLightboxList.length) return;
  activeLightboxIndex = (activeLightboxIndex + direction + currentLightboxList.length) % currentLightboxList.length;
  updateLightboxContent();
};

window.shareLightboxWhatsApp = function () {
  const img = currentLightboxList[activeLightboxIndex];
  if (!img) return;
  const ref = `${img.nome_livro || 'Bíblia'} ${img.id_capitulo || ''}${img.id_versiculo ? ',' + img.id_versiculo : ''}`.trim();
  const txt = (img.texto || '').trim();
  const msg = `\u201C${txt}\u201D\n\n\u2014 ${ref}\n\n_B\u00EDblia Sagrada Cat\u00F3lica_\nhttps://minhabibliacatolica.com`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
};

window.downloadLightboxImage = async function () {
  const img = currentLightboxList[activeLightboxIndex];
  if (!img) return;
  const imgSrc = img.address || img.url;
  if (!imgSrc) {
    showToast('Imagem não disponível para download');
    return;
  }

  try {
    showToast('Preparando download da imagem...');
    // If it's a data URL or same origin
    if (imgSrc.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = imgSrc;
      a.download = `versiculo_${img.nome_livro}_${img.id_capitulo}_${img.id_versiculo}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Imagem salva com sucesso! 📥');
      return;
    }

    // Attempt fetch blob for external images
    const res = await fetch(imgSrc, { mode: 'cors' }).catch(() => null);
    if (res && res.ok) {
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `versiculo_${img.nome_livro}_${img.id_capitulo}_${img.id_versiculo}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      showToast('Imagem salva com sucesso! 📥');
    } else {
      // Fallback open in new tab
      window.open(imgSrc, '_blank');
      showToast('Toque e segure na imagem para salvar 📥');
    }
  } catch (e) {
    window.open(imgSrc, '_blank');
    showToast('Toque e segure na imagem para salvar 📥');
  }
};

window.copyLightboxVerse = async function () {
  const img = currentLightboxList[activeLightboxIndex];
  if (!img) return;
  const ref = `${img.nome_livro || 'Bíblia'} ${img.id_capitulo || ''}${img.id_versiculo ? ',' + img.id_versiculo : ''}`.trim();
  const txt = (img.texto || '').trim();
  const textToCopy = `“${txt}” (${ref})`;
  const ok = await copyToClipboard(textToCopy);
  if (ok) showToast('📋 Versículo copiado para a área de transferência!');
  else showToast('Erro ao copiar versículo');
};

window.toggleLightboxFavorite = function () {
  const img = currentLightboxList[activeLightboxIndex];
  if (!img) return;
  const isNowFav = db.toggleFavoriteImage(img.id, `${img.nome_livro}_${img.id_capitulo}_${img.id_versiculo}`);
  img.is_favorite = isNowFav;
  updateLightboxContent();
  showToast(isNowFav ? '❤️ Imagem favoritada!' : 'Imagem removida dos favoritos');
  renderGalleryGrid();
};

window.readLightboxChapter = function () {
  const img = currentLightboxList[activeLightboxIndex];
  if (!img || !img.id_livro) return;
  closeGalleryLightbox();
  openBook(parseInt(img.id_livro), img.nome_livro, 0);
  setTimeout(() => selectChapter(parseInt(img.id_capitulo || 1)), 150);
};

window.deleteCurrentLightboxImage = async function () {
  const img = currentLightboxList[activeLightboxIndex];
  if (!img) return;
  if (!confirm('Deseja excluir esta imagem da sua galeria?')) return;
  
  await db.deleteImgVersiculo(img.id);
  showToast('Imagem excluída');
  closeGalleryLightbox();
  allGalleryItems = allGalleryItems.filter(item => String(item.id) !== String(img.id));
  loadGalleryData(true);
};

// Keyboard navigation for Lightbox
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('galleryLightboxModal');
  if (!modal || modal.classList.contains('hidden')) return;

  if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  } else if (e.key === 'Escape') {
    closeGalleryLightbox();
  }
});

// Canonical list of all 73 Catholic Books for instant synchronous dropdowns
const CATHOLIC_BOOKS = [
  { id_livro: 1, nome_livro: "Gênesis", total_capitulos: 50 },
  { id_livro: 2, nome_livro: "Êxodo", total_capitulos: 40 },
  { id_livro: 3, nome_livro: "Levítico", total_capitulos: 27 },
  { id_livro: 4, nome_livro: "Números", total_capitulos: 36 },
  { id_livro: 5, nome_livro: "Deuteronômio", total_capitulos: 34 },
  { id_livro: 6, nome_livro: "Josué", total_capitulos: 24 },
  { id_livro: 7, nome_livro: "Juízes", total_capitulos: 21 },
  { id_livro: 8, nome_livro: "Rute", total_capitulos: 4 },
  { id_livro: 9, nome_livro: "I Samuel", total_capitulos: 31 },
  { id_livro: 10, nome_livro: "II Samuel", total_capitulos: 24 },
  { id_livro: 11, nome_livro: "I Reis", total_capitulos: 22 },
  { id_livro: 12, nome_livro: "II Reis", total_capitulos: 25 },
  { id_livro: 13, nome_livro: "I Crônicas", total_capitulos: 29 },
  { id_livro: 14, nome_livro: "II Crônicas", total_capitulos: 36 },
  { id_livro: 15, nome_livro: "Esdras", total_capitulos: 10 },
  { id_livro: 16, nome_livro: "Neemias", total_capitulos: 13 },
  { id_livro: 17, nome_livro: "Tobias", total_capitulos: 14 },
  { id_livro: 18, nome_livro: "Judite", total_capitulos: 16 },
  { id_livro: 19, nome_livro: "Ester", total_capitulos: 16 },
  { id_livro: 20, nome_livro: "Jó", total_capitulos: 42 },
  { id_livro: 21, nome_livro: "Salmos", total_capitulos: 150 },
  { id_livro: 22, nome_livro: "I Macabeus", total_capitulos: 16 },
  { id_livro: 23, nome_livro: "II Macabeus", total_capitulos: 15 },
  { id_livro: 24, nome_livro: "Provérbios", total_capitulos: 31 },
  { id_livro: 25, nome_livro: "Eclesiastes", total_capitulos: 12 },
  { id_livro: 26, nome_livro: "Cântico dos Cânticos", total_capitulos: 8 },
  { id_livro: 27, nome_livro: "Sabedoria", total_capitulos: 19 },
  { id_livro: 28, nome_livro: "Eclesiástico", total_capitulos: 29 },
  { id_livro: 29, nome_livro: "Isaías", total_capitulos: 66 },
  { id_livro: 30, nome_livro: "Jeremias", total_capitulos: 52 },
  { id_livro: 31, nome_livro: "Lamentações", total_capitulos: 5 },
  { id_livro: 32, nome_livro: "Baruc", total_capitulos: 6 },
  { id_livro: 33, nome_livro: "Ezequiel", total_capitulos: 48 },
  { id_livro: 34, nome_livro: "Daniel", total_capitulos: 14 },
  { id_livro: 35, nome_livro: "Oséias", total_capitulos: 14 },
  { id_livro: 36, nome_livro: "Joel", total_capitulos: 4 },
  { id_livro: 37, nome_livro: "Amós", total_capitulos: 9 },
  { id_livro: 38, nome_livro: "Abdias", total_capitulos: 1 },
  { id_livro: 39, nome_livro: "Jonas", total_capitulos: 4 },
  { id_livro: 40, nome_livro: "Miquéias", total_capitulos: 7 },
  { id_livro: 41, nome_livro: "Naum", total_capitulos: 3 },
  { id_livro: 42, nome_livro: "Habacuc", total_capitulos: 3 },
  { id_livro: 43, nome_livro: "Sofonias", total_capitulos: 3 },
  { id_livro: 44, nome_livro: "Ageu", total_capitulos: 2 },
  { id_livro: 45, nome_livro: "Zacarias", total_capitulos: 14 },
  { id_livro: 46, nome_livro: "Malaquias", total_capitulos: 3 },
  { id_livro: 47, nome_livro: "São Mateus", total_capitulos: 28 },
  { id_livro: 48, nome_livro: "São Marcos", total_capitulos: 16 },
  { id_livro: 49, nome_livro: "São Lucas", total_capitulos: 24 },
  { id_livro: 50, nome_livro: "São João", total_capitulos: 21 },
  { id_livro: 51, nome_livro: "Atos dos Apóstolos", total_capitulos: 28 },
  { id_livro: 52, nome_livro: "Romanos", total_capitulos: 16 },
  { id_livro: 53, nome_livro: "I Coríntios", total_capitulos: 16 },
  { id_livro: 54, nome_livro: "II Coríntios", total_capitulos: 13 },
  { id_livro: 55, nome_livro: "Gálatas", total_capitulos: 6 },
  { id_livro: 56, nome_livro: "Efésios", total_capitulos: 6 },
  { id_livro: 57, nome_livro: "Filipenses", total_capitulos: 4 },
  { id_livro: 58, nome_livro: "Colossenses", total_capitulos: 4 },
  { id_livro: 59, nome_livro: "I Tessalonicenses", total_capitulos: 5 },
  { id_livro: 60, nome_livro: "II Tessalonicenses", total_capitulos: 16 },
  { id_livro: 61, nome_livro: "I Timóteo", total_capitulos: 6 },
  { id_livro: 62, nome_livro: "II Timóteo", total_capitulos: 4 },
  { id_livro: 63, nome_livro: "Tito", total_capitulos: 3 },
  { id_livro: 64, nome_livro: "Filêmon", total_capitulos: 1 },
  { id_livro: 65, nome_livro: "Hebreus", total_capitulos: 13 },
  { id_livro: 66, nome_livro: "São Tiago", total_capitulos: 5 },
  { id_livro: 67, nome_livro: "I São Pedro", total_capitulos: 5 },
  { id_livro: 68, nome_livro: "II São Pedro", total_capitulos: 16 },
  { id_livro: 69, nome_livro: "I São João", total_capitulos: 5 },
  { id_livro: 70, nome_livro: "II São João", total_capitulos: 1 },
  { id_livro: 71, nome_livro: "III São João", total_capitulos: 1 },
  { id_livro: 72, nome_livro: "São Judas", total_capitulos: 1 },
  { id_livro: 73, nome_livro: "Apocalipse", total_capitulos: 22 }
];

// ===== UPLOAD & CARD STUDIO MODAL =====
window.openGalleryUploadModal = function () {
  const modal = document.getElementById('galleryUploadModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  populateUploadBooksDropdown();
  resetUploadForm();
  switchUploadTab('upload');
};

window.closeGalleryUploadModal = function () {
  const modal = document.getElementById('galleryUploadModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

window.switchUploadTab = function (tabName) {
  const tabBtnUpload = document.getElementById('tabBtnUpload');
  const tabBtnStudio = document.getElementById('tabBtnStudio');
  const uploadSec = document.getElementById('uploadSection');
  const studioSec = document.getElementById('studioSection');

  if (tabName === 'upload') {
    if (tabBtnUpload) tabBtnUpload.classList.add('active');
    if (tabBtnStudio) tabBtnStudio.classList.remove('active');
    if (uploadSec) uploadSec.classList.remove('hidden');
    if (studioSec) studioSec.classList.add('hidden');
  } else {
    if (tabBtnStudio) tabBtnStudio.classList.add('active');
    if (tabBtnUpload) tabBtnUpload.classList.remove('active');
    if (studioSec) studioSec.classList.remove('hidden');
    if (uploadSec) uploadSec.classList.add('hidden');
    
    populateAiInspirations();
    const promptInput = document.getElementById('aiPromptInput');
    if (promptInput && !promptInput.value.trim()) {
      useVerseAsAiPrompt();
    }
    requestAnimationFrame(() => renderStudioAiCanvas());
  }
};

function populateUploadBooksDropdown() {
  const select = document.getElementById('uploadBookSelect');
  if (!select) return;

  if (select.children.length === 0) {
    const list = (allBooks && allBooks.length > 0) ? allBooks : CATHOLIC_BOOKS;
    let h = '<option value="">-- Sem livro específico / Imagem Devocional --</option>';
    list.forEach(b => {
      h += `<option value="${b.id_livro}" data-total="${b.total_capitulos}">${b.nome_livro}</option>`;
    });
    select.innerHTML = h;
  }
}

function resetUploadForm() {
  uploadedImageData = '';
  const fileInput = document.getElementById('fileUploadInput');
  const urlInput = document.getElementById('uploadUrlInput');
  const dropEmpty = document.getElementById('dropzoneEmpty');
  const dropPreview = document.getElementById('dropzonePreview');
  const previewImg = document.getElementById('uploadImgPreview');
  const bookSelect = document.getElementById('uploadBookSelect');
  const capInput = document.getElementById('uploadChapterInput');
  const verInput = document.getElementById('uploadVerseInput');
  const verseText = document.getElementById('uploadVerseText');
  const oracaoInput = document.getElementById('uploadOracaoInput');

  if (fileInput) fileInput.value = '';
  if (urlInput) urlInput.value = '';
  if (dropEmpty) dropEmpty.classList.remove('hidden');
  if (dropPreview) dropPreview.classList.add('hidden');
  if (previewImg) previewImg.src = '';
  if (bookSelect) bookSelect.value = '';
  if (capInput) capInput.value = '';
  if (verInput) verInput.value = '';
  if (verseText) verseText.value = '';
  if (oracaoInput) oracaoInput.value = '';
}

window.handleImageFileSelected = function (input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  if (file.size > 20 * 1024 * 1024) {
    showToast('A imagem deve ter no máximo 20MB');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    uploadedImageData = e.target.result;
    showImagePreview(uploadedImageData);
  };
  reader.readAsDataURL(file);
};

window.handleImageUrlInput = function (url, isManualClick = false) {
  if (!url || !url.trim()) {
    if (isManualClick) showToast('Por favor, cole um link de imagem.');
    return;
  }
  const cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('data:image/')) {
    if (isManualClick) showToast('O link precisa começar com http:// ou https://');
    return;
  }

  // Pre-test image loading to avoid broken preview
  const testImg = new Image();
  testImg.onload = function () {
    uploadedImageData = cleanUrl;
    showImagePreview(cleanUrl);
    if (isManualClick) showToast('Imagem da web carregada com sucesso! 🖼️');
  };
  testImg.onerror = function () {
    if (isManualClick) {
      showToast('Não foi possível carregar a imagem. Verifique se o link direto é público.');
    } else {
      // Direct assignment fallback
      uploadedImageData = cleanUrl;
      showImagePreview(cleanUrl);
    }
  };
  testImg.src = cleanUrl;
};

function showImagePreview(src) {
  const dropEmpty = document.getElementById('dropzoneEmpty');
  const dropPreview = document.getElementById('dropzonePreview');
  const previewImg = document.getElementById('uploadImgPreview');

  if (previewImg) {
    previewImg.onerror = function () {
      console.warn("Image preview load error for:", src);
    };
    previewImg.src = src;
  }
  if (dropEmpty) dropEmpty.classList.add('hidden');
  if (dropPreview) dropPreview.classList.remove('hidden');
}

window.removeUploadImage = function () {
  uploadedImageData = '';
  const fileInput = document.getElementById('fileUploadInput');
  const urlInput = document.getElementById('uploadUrlInput');
  const dropEmpty = document.getElementById('dropzoneEmpty');
  const dropPreview = document.getElementById('dropzonePreview');
  const previewImg = document.getElementById('uploadImgPreview');

  if (fileInput) fileInput.value = '';
  if (urlInput) urlInput.value = '';
  if (previewImg) previewImg.src = '';
  if (dropEmpty) dropEmpty.classList.remove('hidden');
  if (dropPreview) dropPreview.classList.add('hidden');
};

window.handleUploadBookChanged = function () {
  const select = document.getElementById('uploadBookSelect');
  const capInput = document.getElementById('uploadChapterInput');
  const verInput = document.getElementById('uploadVerseInput');
  if (!select || !capInput) return;

  if (!select.value) {
    capInput.value = '';
    if (verInput) verInput.value = '';
    updateStudioCard();
    return;
  }

  const opt = select.options[select.selectedIndex];
  const totalCaps = opt ? parseInt(opt.dataset.total || 50) : 50;
  capInput.max = totalCaps;
  if (!capInput.value || parseInt(capInput.value) > totalCaps) capInput.value = '1';
  if (verInput && !verInput.value) verInput.value = '1';
  updateStudioCard();
};

window.handleUploadCapVerChanged = function () {
  updateStudioCard();
};

window.fetchVerseTextForUpload = async function () {
  const bookSelect = document.getElementById('uploadBookSelect');
  const capInput = document.getElementById('uploadChapterInput');
  const verInput = document.getElementById('uploadVerseInput');
  const verseTextArea = document.getElementById('uploadVerseText');

  if (!bookSelect || !capInput || !verInput) return;

  if (!bookSelect.value) {
    showToast('Selecione primeiro um Livro da Bíblia acima para puxar o versículo.');
    return;
  }

  const bookId = parseInt(bookSelect.value);
  const cap = parseInt(capInput.value) || 1;
  const ver = parseInt(verInput.value) || 1;

  try {
    showToast('Buscando versículo na Bíblia Sagrada...');
    const verses = await db.getVersiculos(bookId, cap);
    const match = verses.find(v => v.id_versiculo === ver);
    if (match && match.texto) {
      if (verseTextArea) verseTextArea.value = match.texto.trim();
      showToast(`Versículo carregado: ${match.texto.substring(0, 30)}... ✨`);
      updateStudioCard();
    } else {
      showToast('Versículo não encontrado para este capítulo.');
    }
  } catch (err) {
    showToast('Erro ao consultar a Bíblia.');
  }
};

window.saveUploadedImage = async function () {
  const bookSelect = document.getElementById('uploadBookSelect');
  const capInput = document.getElementById('uploadChapterInput');
  const verInput = document.getElementById('uploadVerseInput');
  const verseTextArea = document.getElementById('uploadVerseText');
  const oracaoInput = document.getElementById('uploadOracaoInput');

  const selectedVal = bookSelect ? bookSelect.value : '';
  const bookOpt = (bookSelect && selectedVal && bookSelect.selectedIndex >= 0) ? bookSelect.options[bookSelect.selectedIndex] : null;
  const bookName = bookOpt ? bookOpt.text : 'Imagem Devocional';
  const bookId = selectedVal ? parseInt(selectedVal) : null;
  const cap = (bookId && capInput && capInput.value) ? parseInt(capInput.value) : null;
  const ver = (bookId && verInput && verInput.value) ? parseInt(verInput.value) : null;
  const txt = verseTextArea ? verseTextArea.value.trim() : '';
  const oracao = oracaoInput ? oracaoInput.value.trim() : '';

  if (!uploadedImageData && !txt) {
    showToast('Por favor, adicione uma foto ou link de imagem para salvar.');
    return;
  }

  // If no image uploaded, generate a studio canvas card automatically
  let finalImgAddress = uploadedImageData;
  if (!finalImgAddress) {
    updateStudioCard();
    const canvas = document.getElementById('studioCanvas');
    finalImgAddress = canvas ? canvas.toDataURL('image/jpeg', 0.9) : '';
  }

  try {
    showToast('Salvando imagem na sua galeria...');
    await db.addImgVersiculo({
      id_livro: bookId,
      nome_livro: bookName,
      id_capitulo: cap,
      id_versiculo: ver,
      texto: txt,
      address: finalImgAddress,
      oracao: oracao
    });

    closeGalleryUploadModal();
    showToast('✨ Imagem adicionada com sucesso à Galeria!');
    
    // Switch to "Meus Uploads" to immediately show what was added
    filterGalleryCategory('uploads', document.querySelector('.gallery-chip[data-category="uploads"]'));
  } catch (err) {
    console.error("Save image error:", err);
    showToast('Erro ao salvar imagem');
  }
};

// ===== AI SACRED ART & CARD STUDIO =====
let currentAiImageData = null;
let currentAiImageElement = null;
let isGeneratingAiArt = false;

function populateAiInspirations() {
  const container = document.getElementById('aiInspirationChips');
  if (!container || container.children.length > 0) return;

  let h = '';
  SACRED_AI_INSPIRATIONS.forEach((item, idx) => {
    h += `<button type="button" class="ai-chip" onclick="selectAiInspiration(${idx})">${item.label}</button>`;
  });
  container.innerHTML = h;
}

window.selectAiInspiration = function (idx) {
  const item = SACRED_AI_INSPIRATIONS[idx];
  if (!item) return;
  const promptInput = document.getElementById('aiPromptInput');
  if (promptInput) {
    promptInput.value = item.prompt;
  }
  generateAiArt();
};

window.useVerseAsAiPrompt = function () {
  const verseText = document.getElementById('uploadVerseText');
  const bookSelect = document.getElementById('uploadBookSelect');
  const capInput = document.getElementById('uploadChapterInput');
  const promptInput = document.getElementById('aiPromptInput');

  const txt = verseText ? verseText.value.trim() : '';
  const selectedVal = bookSelect ? bookSelect.value : '';
  const bookOpt = (bookSelect && selectedVal && bookSelect.selectedIndex >= 0) ? bookSelect.options[bookSelect.selectedIndex] : null;
  const bookName = bookOpt ? bookOpt.text : '';
  const cap = capInput ? capInput.value : '';

  if (!promptInput) return;

  if (txt) {
    promptInput.value = `Cena sagrada bíblica de ${bookName ? bookName + ' ' + cap + ': ' : ''}“${txt}”`;
    showToast('Versículo inserido no prompt da IA! ✨');
  } else if (bookName) {
    promptInput.value = `Cena bíblica inspirada no livro de ${bookName} ${cap}`;
    showToast('Referência bíblica inserida no prompt da IA! ✨');
  } else {
    promptInput.value = 'Luz divina celestial iluminando a Sagrada Escritura e a Cruz de Cristo';
  }
};

window.toggleAiVerseOverlay = function () {
  renderStudioAiCanvas();
};

window.generateAiArt = async function (isRegen = false) {
  if (isGeneratingAiArt) {
    showToast('Aguarde a IA concluir a pintura atual... 🎨');
    return;
  }

  const promptInput = document.getElementById('aiPromptInput');
  const styleSelect = document.getElementById('aiStyleSelect');
  const loadingContainer = document.getElementById('aiLoadingContainer');
  const resultContainer = document.getElementById('aiResultContainer');
  const generateBtn = document.getElementById('btnGenerateAiArt');

  const prompt = promptInput ? promptInput.value.trim() : '';
  const styleId = styleSelect ? styleSelect.value : 'renaissance';

  const verseTextArea = document.getElementById('uploadVerseText');
  const bookSelect = document.getElementById('uploadBookSelect');
  const capInput = document.getElementById('uploadChapterInput');
  const verInput = document.getElementById('uploadVerseInput');

  const verseText = verseTextArea ? verseTextArea.value.trim() : '';
  const selectedVal = bookSelect ? bookSelect.value : '';
  const bookOpt = (bookSelect && selectedVal && bookSelect.selectedIndex >= 0) ? bookSelect.options[bookSelect.selectedIndex] : null;
  const bookName = bookOpt ? bookOpt.text : '';
  const cap = capInput ? capInput.value : '';
  const ver = verInput ? verInput.value : '';
  const bookRef = (bookName && cap) ? `${bookName} ${cap}${ver ? ',' + ver : ''}` : bookName;

  isGeneratingAiArt = true;
  if (generateBtn) {
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Pintando com IA...</span>`;
  }
  if (loadingContainer) loadingContainer.classList.remove('hidden');
  if (resultContainer) resultContainer.style.opacity = '0.9';

  const studioCanvas = document.getElementById('studioCanvas');
  if (studioCanvas) {
    drawGeneratingStudioCanvas(studioCanvas, prompt || bookRef);
  }

  try {
    showToast(isRegen ? 'Criando nova variação sacra... ✨' : 'Pintando cena bíblica com Inteligência Artificial... ✨');
    
    const dataUrl = await generateSacredAIImage(prompt, styleId, {
      verseText: verseText,
      bookRef: bookRef,
      width: 1080,
      height: 1080
    });

    currentAiImageData = dataUrl;
    
    await new Promise((resolve, reject) => {
      const img = new Image();
      const loadTimer = setTimeout(() => {
        reject(new Error('Tempo limite para decodificar a imagem'));
      }, 15000);
      img.onload = () => {
        clearTimeout(loadTimer);
        currentAiImageElement = img;
        renderStudioAiCanvas();
        resolve();
      };
      img.onerror = () => {
        clearTimeout(loadTimer);
        reject(new Error('Falha ao processar os dados visuais da imagem'));
      };
      img.src = dataUrl;
    });

    showToast('✨ Obra de Arte Sacra criada com sucesso pela IA!');
  } catch (err) {
    console.error("AI Generation error:", err);
    showToast('Falha temporária ao gerar com IA. Tente novamente em alguns instantes.');
  } finally {
    isGeneratingAiArt = false;
    if (loadingContainer) loadingContainer.classList.add('hidden');
    if (resultContainer) resultContainer.style.opacity = '1';
    if (generateBtn) {
      generateBtn.disabled = false;
      generateBtn.innerHTML = `<i class="fas fa-sparkles"></i> <span>Gerar Obra Sacra com IA</span>`;
    }
  }
};

window.copyVerseToNarrative = function () {
  const verseText = document.getElementById('uploadVerseText');
  const bookSelect = document.getElementById('uploadBookSelect');
  const capInput = document.getElementById('uploadChapterInput');
  const verInput = document.getElementById('uploadVerseInput');
  const narrativeInput = document.getElementById('aiNarrativaInput');

  if (!narrativeInput) return;

  const txt = verseText ? verseText.value.trim() : '';
  const selectedVal = bookSelect ? bookSelect.value : '';
  const bookOpt = (bookSelect && selectedVal && bookSelect.selectedIndex >= 0) ? bookSelect.options[bookSelect.selectedIndex] : null;
  const bookName = bookOpt ? bookOpt.text : '';
  const cap = capInput ? capInput.value : '';
  const ver = verInput ? verInput.value : '';

  if (txt) {
    narrativeInput.value = txt;
    showToast('✨ Versículo copiado para a narrativa central!');
  } else if (bookName) {
    narrativeInput.value = `“Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.”`;
    showToast('✨ Citação bíblica inserida na narrativa!');
  } else {
    narrativeInput.value = 'O Senhor é o meu pastor, nada me faltará. Em verdes prados Ele me faz repousar.';
    showToast('✨ Narrativa devocional inserida!');
  }
  renderStudioAiCanvas();
};

window.renderStudioAiCanvas = function () {
  try {
    const canvas = document.getElementById('studioCanvas');
    if (!canvas) return;

    const overlayCheck = document.getElementById('aiOverlayVerseCheck');
    const showOverlay = overlayCheck ? overlayCheck.checked : true;

    const narrativeInput = document.getElementById('aiNarrativaInput');
    const centerHighlightCheck = document.getElementById('aiCenterHighlightCheck');
    const narrativeQuotesCheck = document.getElementById('aiNarrativeQuotesCheck');

    const verseTextArea = document.getElementById('uploadVerseText');
    const bookSelect = document.getElementById('uploadBookSelect');
    const capInput = document.getElementById('uploadChapterInput');
    const verInput = document.getElementById('uploadVerseInput');
    const oracaoInput = document.getElementById('uploadOracaoInput');

    const narrativa = narrativeInput ? narrativeInput.value.trim() : '';
    const centerHighlight = centerHighlightCheck ? centerHighlightCheck.checked : true;
    const useQuotes = narrativeQuotesCheck ? narrativeQuotesCheck.checked : true;

    const verseText = verseTextArea ? verseTextArea.value.trim() : '';
    const selectedVal = bookSelect ? bookSelect.value : '';
    const bookOpt = (bookSelect && selectedVal && bookSelect.selectedIndex >= 0) ? bookSelect.options[bookSelect.selectedIndex] : null;
    const bookName = bookOpt ? bookOpt.text : '';
    const cap = capInput ? capInput.value : '';
    const ver = verInput ? verInput.value : '';
    const bookRef = (bookName && cap) ? `${bookName} ${cap}${ver ? ', ' + ver : ''}` : (bookName || '');
    const oracao = oracaoInput ? oracaoInput.value.trim() : '';

    if (currentAiImageElement) {
      composeCardOnCanvas(canvas, currentAiImageElement, {
        showOverlay: showOverlay,
        narrativa: narrativa,
        centerHighlight: centerHighlight,
        useQuotes: useQuotes,
        verseText: verseText,
        bookRef: bookRef,
        oracaoText: oracao
      });
    } else {
      drawDefaultSacredPlaceholder(canvas, {
        narrativa: narrativa,
        centerHighlight: centerHighlight,
        useQuotes: useQuotes,
        verseText: verseText,
        bookRef: bookRef,
        oracao: oracao
      });
    }
  } catch (err) {
    console.error("renderStudioAiCanvas error:", err);
  }
};

function drawGeneratingStudioCanvas(canvas, prompt) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;

  // Fundo gradiente sagrado escuro
  const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.7);
  bgGrad.addColorStop(0, '#2D1219');
  bgGrad.addColorStop(0.6, '#18070B');
  bgGrad.addColorStop(1, '#080204');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Moldura dourada
  ctx.strokeStyle = 'rgba(212, 168, 83, 0.45)';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  // Aura
  const aura = ctx.createRadialGradient(w / 2, h / 2 - 40, 20, w / 2, h / 2 - 40, 180);
  aura.addColorStop(0, 'rgba(212, 168, 83, 0.35)');
  aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2 - 40, 180, 0, Math.PI * 2);
  ctx.fill();

  // Cruz
  ctx.font = '84px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E8C98A';
  ctx.fillText('✝', w / 2, h / 2 - 15);

  // Mensagem
  ctx.font = 'bold 30px "Cinzel", serif';
  ctx.fillStyle = '#F5E6C8';
  ctx.fillText('CRIANDO OBRA DE ARTE SACRA...', w / 2, h / 2 + 75);

  if (prompt) {
    ctx.font = 'italic 22px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#D4A853';
    const displayP = prompt.length > 55 ? prompt.slice(0, 52) + '...' : prompt;
    ctx.fillText(`“${displayP}”`, w / 2, h / 2 + 120);
  }

  ctx.font = '16px sans-serif';
  ctx.fillStyle = 'rgba(232, 201, 138, 0.7)';
  ctx.fillText('✨ A Inteligência Artificial está pintando sua cena bíblica...', w / 2, h / 2 + 170);
}

function drawDefaultSacredPlaceholder(canvas, options = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;

  let verseText = '';
  let bookRef = '';
  let oracao = '';
  let narrativa = '';
  let centerHighlight = true;
  let useQuotes = true;

  if (typeof options === 'string') {
    verseText = options;
  } else if (options && typeof options === 'object') {
    verseText = options.verseText || '';
    bookRef = options.bookRef || '';
    oracao = options.oracao || '';
    narrativa = options.narrativa || '';
    centerHighlight = options.centerHighlight !== false;
    useQuotes = options.useQuotes !== false;
  }

  const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, w * 0.75);
  bgGrad.addColorStop(0, '#3D1B22');
  bgGrad.addColorStop(0.5, '#250E15');
  bgGrad.addColorStop(1, '#100508');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Borders
  ctx.strokeStyle = 'rgba(212, 168, 83, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, w - 80, h - 80);

  ctx.strokeStyle = 'rgba(212, 168, 83, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(55, 55, w - 110, h - 110);

  // Corner accents
  drawCornerAccents(ctx, 40, 40);
  drawCornerAccents(ctx, w - 40, 40);
  drawCornerAccents(ctx, 40, h - 40);
  drawCornerAccents(ctx, w - 40, h - 40);

  // Top Symbol
  ctx.font = '72px "Cinzel", serif, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E8C98A';
  ctx.fillText('✝', w / 2, 160);

  // Title
  const refTitle = bookRef ? bookRef.toUpperCase() : 'BÍBLIA SAGRADA';
  ctx.font = 'bold 34px "Cinzel", serif';
  ctx.fillStyle = '#F5E6C8';
  ctx.fillText(refTitle, w / 2, 235);

  // Divider
  ctx.strokeStyle = 'rgba(212, 168, 83, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 120, 270);
  ctx.lineTo(w / 2 - 20, 270);
  ctx.moveTo(w / 2 + 20, 270);
  ctx.lineTo(w / 2 + 120, 270);
  ctx.stroke();

  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#D4A853';
  ctx.fillText('✦', w / 2, 276);

  // Text / Narrativa
  const mainHighlight = (narrativa || verseText).trim();
  const isCustom = !!mainHighlight;
  const rawText = mainHighlight || 'Digite um tema sagrado e uma narrativa acima e clique em "Gerar Obra Sacra com IA" para criar arte personalizada!';
  const displayTxt = (useQuotes && isCustom && !rawText.startsWith('“')) ? `“${rawText}”` : rawText;

  if (centerHighlight && isCustom) {
    const boxMaxWidth = w - 160;
    const textPadding = 45;
    const innerTextWidth = boxMaxWidth - (textPadding * 2);

    let fontSize = 36;
    if (displayTxt.length > 280) fontSize = 24;
    else if (displayTxt.length > 180) fontSize = 28;
    else if (displayTxt.length > 100) fontSize = 32;

    ctx.font = `italic ${fontSize}px "Cormorant Garamond", Georgia, serif`;
    const lines = wrapTextLines(ctx, displayTxt, innerTextWidth);
    const lineHeight = fontSize * 1.48;
    const totalTextHeight = lines.length * lineHeight;
    const boxHeight = Math.max(160, totalTextHeight + (textPadding * 2));
    const boxY = (h - boxHeight) / 2 + 15;
    const boxX = 80;

    // Glass backdrop
    ctx.save();
    const glassGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
    glassGrad.addColorStop(0, 'rgba(24, 8, 12, 0.88)');
    glassGrad.addColorStop(1, 'rgba(12, 4, 7, 0.95)');
    ctx.fillStyle = glassGrad;
    ctx.fillRect(boxX, boxY, boxMaxWidth, boxHeight);

    ctx.strokeStyle = 'rgba(212, 168, 83, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(boxX, boxY, boxMaxWidth, boxHeight);

    ctx.strokeStyle = 'rgba(212, 168, 83, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(boxX + 8, boxY + 8, boxMaxWidth - 16, boxHeight - 16);

    drawCornerAccents(ctx, boxX + 8, boxY + 8);
    drawCornerAccents(ctx, boxX + boxMaxWidth - 8, boxY + 8);
    drawCornerAccents(ctx, boxX + 8, boxY + boxHeight - 8);
    drawCornerAccents(ctx, boxX + boxMaxWidth - 8, boxY + boxHeight - 8);

    ctx.font = `italic ${fontSize}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = '#FFFFFF';
    const startY = boxY + textPadding + fontSize;
    lines.forEach((line, i) => {
      ctx.fillText(line, w / 2, startY + i * lineHeight);
    });
    ctx.restore();

  } else {
    ctx.font = `italic ${isCustom ? '38px' : '30px'} "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = isCustom ? '#FFFFFF' : '#E8C98A';
    
    const lines = wrapTextLines(ctx, displayTxt, w - 240);
    const lineHeight = isCustom ? 54 : 44;
    let startY = 360 + (360 - lines.length * lineHeight) / 2;
    if (startY < 330) startY = 330;
    
    lines.forEach((line, i) => {
      ctx.fillText(line, w / 2, startY + i * lineHeight);
    });
  }

  if (oracao) {
    ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#E8C98A';
    ctx.fillText(`“${oracao}”`, w / 2, h - 160);
  }

  // Footer
  ctx.font = '600 20px "Cinzel", serif';
  ctx.fillStyle = 'rgba(212, 168, 83, 0.7)';
  ctx.fillText('✝  ESTÚDIO DE ARTE SACRA COM IA  ✝', w / 2, h - 85);
}

function drawCornerAccents(ctx, x, y) {
  ctx.save();
  ctx.strokeStyle = '#D4A853';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function wrapTextLines(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

window.downloadStudioCard = function () {
  renderStudioAiCanvas();
  const canvas = document.getElementById('studioCanvas');
  if (!canvas) return;

  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `arte_sacra_ia_${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('✨ Arte Sacra baixada com sucesso em alta resolução!');
};

window.saveStudioCardToGallery = async function () {
  renderStudioAiCanvas();
  const canvas = document.getElementById('studioCanvas');
  if (!canvas) return;

  const bookSelect = document.getElementById('uploadBookSelect');
  const capInput = document.getElementById('uploadChapterInput');
  const verInput = document.getElementById('uploadVerseInput');
  const verseTextArea = document.getElementById('uploadVerseText');
  const narrativeInput = document.getElementById('aiNarrativaInput');
  const oracaoInput = document.getElementById('uploadOracaoInput');

  const selectedVal = bookSelect ? bookSelect.value : '';
  const bookOpt = (bookSelect && selectedVal && bookSelect.selectedIndex >= 0) ? bookSelect.options[bookSelect.selectedIndex] : null;
  const bookName = bookOpt ? bookOpt.text : 'Arte Sacra com IA';
  const bookId = selectedVal ? parseInt(selectedVal) : null;
  const cap = (bookId && capInput && capInput.value) ? parseInt(capInput.value) : null;
  const ver = (bookId && verInput && verInput.value) ? parseInt(verInput.value) : null;
  const narrativa = narrativeInput ? narrativeInput.value.trim() : '';
  const txt = verseTextArea ? verseTextArea.value.trim() : '';
  const finalTxt = narrativa || txt;
  const oracao = oracaoInput ? oracaoInput.value.trim() : '';

  // Use canvas dataUrl (which contains the composed artwork with or without overlay)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

  try {
    showToast('Salvando Arte com IA na sua Galeria...');
    await db.addImgVersiculo({
      id_livro: bookId,
      nome_livro: bookName,
      id_capitulo: cap,
      id_versiculo: ver,
      texto: finalTxt,
      address: dataUrl,
      oracao: oracao
    });

    closeGalleryUploadModal();
    showToast('✨ Arte Sacra salva com sucesso na sua Galeria!');
    filterGalleryCategory('uploads', document.querySelector('.gallery-chip[data-category="uploads"]'));
  } catch (err) {
    showToast('Erro ao salvar arte na galeria');
  }
};

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

// ===== ADMIN PANEL & SECURE AI KEY MANAGEMENT =====
let headerCrossClicks = 0;
let lastHeaderCrossClickTime = 0;

window.handleHeaderCrossClick = function () {
  const now = Date.now();
  if (now - lastHeaderCrossClickTime < 1200) {
    headerCrossClicks++;
  } else {
    headerCrossClicks = 1;
  }
  lastHeaderCrossClickTime = now;

  if (headerCrossClicks >= 3) {
    headerCrossClicks = 0;
    openAdminModal();
  }
};

window.openAdminModal = function () {
  const modal = document.getElementById('adminModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  lockAdminPanel();
  setTimeout(() => {
    const pinInput = document.getElementById('adminPinInput');
    if (pinInput) pinInput.focus();
  }, 100);
};

window.closeAdminModal = function () {
  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.add('hidden');
};

function getAdminPin() {
  return localStorage.getItem('biblia_admin_pin') || '7777';
}

window.unlockAdminPanel = function () {
  const pinInput = document.getElementById('adminPinInput');
  const enteredPin = pinInput ? pinInput.value.trim() : '';
  const storedPin = getAdminPin();

  if (enteredPin === storedPin) {
    if (pinInput) pinInput.value = '';
    const pinSec = document.getElementById('adminPinSection');
    const dashSec = document.getElementById('adminDashboardSection');
    if (pinSec) pinSec.classList.add('hidden');
    if (dashSec) dashSec.classList.remove('hidden');

    const keyInput = document.getElementById('adminGeminiKeyInput');
    const currentKey = getGeminiApiKey();
    if (keyInput) keyInput.value = currentKey || '';
    updateAdminKeyBadge(!!currentKey);
    showToast('🔓 Painel do Administrador desbloqueado com sucesso!');
  } else {
    showToast('PIN de Administrador incorreto. Tente novamente.');
    if (pinInput) pinInput.select();
  }
};

window.lockAdminPanel = function () {
  const pinSec = document.getElementById('adminPinSection');
  const dashSec = document.getElementById('adminDashboardSection');
  const pinInput = document.getElementById('adminPinInput');
  if (pinSec) pinSec.classList.remove('hidden');
  if (dashSec) dashSec.classList.add('hidden');
  if (pinInput) pinInput.value = '';
};

function updateAdminKeyBadge(hasKey) {
  const badge = document.getElementById('adminKeyStatusBadge');
  if (!badge) return;
  if (hasKey) {
    badge.textContent = 'Chave Configurada e Ativa ✨';
    badge.style.background = 'rgba(16, 185, 129, 0.15)';
    badge.style.color = '#10b981';
  } else {
    badge.textContent = 'Nenhuma chave ativa (Modo Nativo)';
    badge.style.background = 'rgba(239, 68, 68, 0.15)';
    badge.style.color = '#ef4444';
  }
}

window.saveAdminGeminiKey = async function () {
  const input = document.getElementById('adminGeminiKeyInput');
  if (!input) return;
  const key = input.value.trim();

  if (!key) {
    showToast('Por favor, informe sua chave do Google Gemini.');
    return;
  }

  localStorage.setItem('biblia_gemini_api_key', key);
  updateAdminKeyBadge(true);

  try {
    await fetch('/api/admin/set-gemini-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: getAdminPin(), key: key })
    });
  } catch (e) {}

  showToast('✨ Chave do Google Gemini salva com sucesso pelo Administrador!');
};

window.testAdminGeminiKey = async function () {
  const keyInput = document.getElementById('adminGeminiKeyInput');
  const statusDiv = document.getElementById('adminTestStatus');
  const testKey = keyInput ? keyInput.value.trim() : getGeminiApiKey();

  if (!testKey) {
    showToast('Informe uma chave antes de testar.');
    return;
  }

  if (statusDiv) {
    statusDiv.style.display = 'block';
    statusDiv.innerHTML = '<span style="color: #60a5fa;"><i class="fas fa-spinner fa-spin"></i> Testando comunicação com o Google Gemini IA...</span>';
  }

  const startTime = Date.now();
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${testKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Diga apenas 'OK' para teste de conexao." }] }],
        generationConfig: { maxOutputTokens: 10 }
      })
    });

    const elapsed = Date.now() - startTime;
    if (res.ok) {
      if (statusDiv) {
        statusDiv.innerHTML = `<span style="color: #10b981; font-weight: 600;"><i class="fas fa-check-circle"></i> Conexão com a IA validada com sucesso! (Latência: ${elapsed}ms)</span>`;
      }
      showToast('✨ Conexão com o Google Gemini funcionando perfeitamente!');
    } else {
      if (statusDiv) {
        statusDiv.innerHTML = `<span style="color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Falha: Código HTTP ${res.status}. Verifique se a chave é válida no Google AI Studio.</span>`;
      }
    }
  } catch (err) {
    if (statusDiv) {
      statusDiv.innerHTML = `<span style="color: #ef4444;"><i class="fas fa-times-circle"></i> Erro de rede ao conectar com a API do Gemini.</span>`;
    }
  }
};

window.clearAdminGeminiKey = async function () {
  localStorage.removeItem('biblia_gemini_api_key');
  const keyInput = document.getElementById('adminGeminiKeyInput');
  if (keyInput) keyInput.value = '';
  updateAdminKeyBadge(false);
  try {
    await fetch('/api/admin/set-gemini-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: getAdminPin(), key: '' })
    });
  } catch (e) {}
  showToast('Chave de IA removida do sistema.');
};

window.updateAdminPin = async function () {
  const input = document.getElementById('adminNewPinInput');
  if (!input) return;
  const newPin = input.value.trim();
  if (!newPin || newPin.length < 4) {
    showToast('O novo PIN precisa ter no mínimo 4 caracteres.');
    return;
  }
  localStorage.setItem('biblia_admin_pin', newPin);
  input.value = '';
  try {
    await fetch('/api/admin/set-gemini-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: getAdminPin(), newPin: newPin })
    });
  } catch (e) {}
  showToast('🔑 Senha/PIN de Administrador atualizada com sucesso!');
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

window.generateHomilyForChapter = async function () {
  const verses = await db.getVersiculos(currentBook.id, currentChapter);
  const text = verses.map(v => v.texto).join(" ");
  generateHomily(currentBook.nome, currentChapter, "completo", text);
};

// Gera a homilia devocional católica com exegese bíblica e Tradição da Igreja
window.generateHomily = function (bookName, chapter, verse, text) {
  const modal = document.getElementById('homilyModal');
  const title = document.getElementById('homilyTitle');
  const ref = document.getElementById('homilyReference');
  const excerpt = document.getElementById('homilyTextExcerpt');
  const body = document.getElementById('homilyBody');
  const speakBtn = document.getElementById('homilySpeakBtn');

  window._lastHomilyParams = { bookName, chapter, verse, text };

  modal.classList.remove('hidden');
  if (title) title.textContent = "Homilia & Meditação";
  ref.textContent = `${bookName} ${chapter}${verse === 'completo' ? '' : ':' + verse}`;
  excerpt.textContent = `"${text.length > 150 ? text.substring(0, 150) + '...' : text}"`;

  const apiKey = getGeminiApiKey();
  if (apiKey) {
    generateDynamicGeminiHomily(bookName, chapter, verse, text);
    return;
  }

  // Gera homilia católica profunda e contextualizada via motor exegético nativo
  const devotional = getDevotionalHomily(bookName, chapter, verse, text);
  
  body.innerHTML = `
    ${devotional.html}
    <div style="margin-top: 20px; padding-top: 14px; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <button onclick="generateHomily('${bookName.replace(/'/g, "\\'")}', '${chapter}', '${verse}', '${text.replace(/'/g, "\\'").replace(/"/g, '&quot;')}')"
              style="background: rgba(212, 168, 83, 0.12); border: 1px solid rgba(212, 168, 83, 0.35); color: var(--gold-300); font-size: 11px; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
        <i class="fas fa-redo"></i> Nova Meditação
      </button>
      <span style="font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 5px;">
        <i class="fas fa-church" style="color: var(--gold-400);"></i> Meditação Bíblica Católica
      </span>
    </div>
  `;

  speakBtn.dataset.homily = devotional.textToSpeak;
  speakBtn.classList.remove('hidden');
  updateSpeakBtnState(false);
};

window.generateDynamicGeminiHomily = async function (bookName, chapter, verse, text) {
  const body = document.getElementById('homilyBody');
  const speakBtn = document.getElementById('homilySpeakBtn');

  body.innerHTML = `
    <div style="text-align: center; padding: 30px;">
        <div class="loading-spinner" style="border-color: rgba(212, 168, 83, 0.3); border-top-color: var(--gold-400); width: 40px; height: 40px; margin: 0 auto 15px;"></div>
        <p style="color: var(--gold-300); font-weight: bold; animation: pulse-glow 1.5s infinite;">Preparando a homilia e meditação espiritual...</p>
        <span style="font-size: 12px; color: var(--text-muted);">Consultando a Sagrada Escritura e o Magistério da Igreja...</span>
    </div>
  `;

  try {
    const prompt = `Você é um padre católico acolhedor, profundamente piedoso, sábio e com sólida formação teológica e pastoral.
Faça uma bela e tocante homilia devocional (entre 3 e 4 parágrafos substanciais) para a seguinte passagem bíblica:
${bookName} ${chapter}${verse === 'completo' ? '' : ':' + verse} - "${text}"

Instruções para a homilia:
1. Comece com uma saudação cristã paternal e calorosa.
2. Explique o sentido espiritual profundo e teológico desta passagem no contexto do livro de ${bookName}.
3. Conecte com os ensinamentos dos Santos Padres da Igreja (como Santo Agostinho, São Tomás de Aquino, São João Crisóstomo ou Santa Teresa).
4. Dê 3 ensinamentos ou compromissos práticos para a vida diária do fiel moderno (família, trabalho, oração).
5. Termine com uma oração e bênção sacerdotal solene em nome da Santíssima Trindade.
Destaque frases e conceitos espirituais centrais em negrito.`;

    const data = await callGeminiAPIWithFallback(prompt);
    let homily = data.candidates[0].content.parts[0].text;

    const formattedHomily = homily
      .split('\n\n')
      .map(p => `<p style="margin-bottom: 12px; line-height: 1.65;">${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<strong>$1</strong>')}</p>`)
      .join('');

    body.innerHTML = `
      ${formattedHomily}
      <div style="margin-top: 20px; padding-top: 14px; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <button onclick="generateDynamicGeminiHomily('${bookName.replace(/'/g, "\\'")}', '${chapter}', '${verse}', '${text.replace(/'/g, "\\'").replace(/"/g, '&quot;')}')"
                style="background: rgba(212, 168, 83, 0.12); border: 1px solid rgba(212, 168, 83, 0.35); color: var(--gold-300); font-size: 11px; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
          <i class="fas fa-redo"></i> Nova Meditação
        </button>
        <span style="font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 5px;">
          <i class="fas fa-church" style="color: var(--gold-400);"></i> Meditação Bíblica Católica
        </span>
      </div>
    `;

    speakBtn.dataset.homily = homily.replace(/\*/g, '');
    speakBtn.classList.remove('hidden');
    updateSpeakBtnState(false);

  } catch (err) {
    console.warn("Transição graciosa para o motor exegético católico:", err.message || err);
    // Transição 100% silenciosa e perfeita para o motor exegético nativo
    const devotional = getDevotionalHomily(bookName, chapter, verse, text);
    body.innerHTML = `
      ${devotional.html}
      <div style="margin-top: 20px; padding-top: 14px; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <button onclick="generateHomily('${bookName.replace(/'/g, "\\'")}', '${chapter}', '${verse}', '${text.replace(/'/g, "\\'").replace(/"/g, '&quot;')}')"
                style="background: rgba(212, 168, 83, 0.12); border: 1px solid rgba(212, 168, 83, 0.35); color: var(--gold-300); font-size: 11px; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
          <i class="fas fa-redo"></i> Nova Meditação
        </button>
        <span style="font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 5px;">
          <i class="fas fa-church" style="color: var(--gold-400);"></i> Meditação Bíblica Católica
        </span>
      </div>
    `;
    speakBtn.dataset.homily = devotional.textToSpeak;
    speakBtn.classList.remove('hidden');
    updateSpeakBtnState(false);
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
    btn.style.color = '#ffffff';
  } else {
    btn.innerHTML = '<i class="fas fa-volume-up"></i> Ouvir Homilia';
    btn.style.background = 'linear-gradient(135deg, var(--gold-500, #d4af37) 0%, #b8860b 100%)';
    btn.style.color = '#111827';
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
  let textToSpeak = btn ? btn.dataset.homily : null;

  // Fallback garantido: extrai o texto exato renderizado na tela (ignorando botões de rodapé)
  if (!textToSpeak) {
    const body = document.getElementById('homilyBody');
    if (body) {
      const clone = body.cloneNode(true);
      const footer = clone.querySelector('div[style*="border-top"]');
      if (footer) footer.remove();
      textToSpeak = (clone.innerText || clone.textContent || '').replace(/✝/g, '').trim();
    }
  }

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
