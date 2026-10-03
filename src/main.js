import './style.css';
import * as db from './db.js';
import { getDevotionalHomily } from './homilyService.js';
import { generateSacredAIImage, composeCardOnCanvas, SACRED_AI_INSPIRATIONS, SACRED_AI_STYLES } from './aiImageService.js';
import { subscribeToFirebaseGallery } from './firebaseGallery.js';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Clipboard } from '@capacitor/clipboard';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { getLiturgiaDiaria, LITURGICAL_COLORS } from './liturgiaService.js';
import { buildRosarySteps, getMisterioDoDia, MISTERIOS_DATA, ORACOES_TEXTOS } from './rosarioService.js';
import { getVelasOracao, acenderNovaVela, rezarPorVela, getVelasRezadasLocal, formatarStatusVela, VELAS_CATEGORIAS } from './velasService.js';
import { DOUTORES_PERSONAS, TEOLOGIA_PROMPT_SUGESTOES, consultarIaTeologica } from './teologiaService.js';
import { LECTIO_STEPS, LECTIO_SUGESTOES, getLectioHistorico, salvarSessaoLectio, excluirSessaoLectio } from './lectioService.js';
import { MANDAMENTOS_DEUS, PECADOS_CAPITAIS, ORACOES_CONFISSAO, getPecadosMarcados, togglePecadoMarcado, registrarConfissaoRealizada, getUltimaConfissaoData } from './confissaoService.js';
import { DIARIO_CATEGORIAS, getDiarioItens, salvarNovoItemDiario, marcarGracaAlcancada, reabrirEmOracao, excluirItemDiario, getEstatisticasDiario, formatarTestemunhoWhatsApp } from './diarioService.js';
import { NOVENAS_LIST, getNovenasComProgresso, iniciarNovena, marcarDiaNovenaConcluido, reiniciarNovena } from './novenasService.js';
import { CARTAS_APOSTOLICAS, getCartasPorCategoria, getCartaPorId } from './cartasService.js';
import { getMariaTitulos, getMariaOracoes, getMariaDogmas, getMariaPraticas, getMariaItemPorId } from './mariaService.js';

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
  const splashStartTime = performance.now();

  // Inicia timer de doação e brilho periódico a cada 1 minuto
  checkAndStartDonateTimer();
  initDonateButtonShimmer();

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

  // Subscribe to real-time Firebase gallery sync across all devices
  try {
    subscribeToFirebaseGallery(async () => {
      const galleryView = document.getElementById('galleryView');
      if (galleryView && !galleryView.classList.contains('hidden')) {
        const fresh = await db.getImgVersiculos(currentGallerySearch, currentGalleryCategory);
        allGalleryItems = fresh || [];
        renderGalleryGrid();
      }
    });
  } catch (e) {
    console.warn('[RealtimeSync] Falha ao iniciar listener:', e);
  }

  // Load UI
  allBooks = await db.getLivros() || [];
  renderBooks(allBooks);
  await loadVersiculoDoDia();
  await loadStats();

  // Remove splash com no mínimo 1.8 segundos de exibição suave para destacar o ícone
  const MIN_SPLASH_TIME_MS = 1800;
  const elapsed = performance.now() - splashStartTime;
  const remainingTime = Math.max(0, MIN_SPLASH_TIME_MS - elapsed);

  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 700);
    }
  }, remainingTime);

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
  txt += `\n\n_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, '_blank');
};

// ===== OPEN BOOK =====
async function openBook(id, nome, total, initialChapter = 1) {
  if (!db.isReady()) return;
  try {
    if (!total) { const l = allBooks.find(b => b.id_livro === id); total = l ? l.total_capitulos : 1; }
    currentBook = { id, nome, total };
    totalChapters = total;
    const targetCap = Math.max(1, Math.min(total, parseInt(initialChapter) || 1));
    currentChapter = targetCap;
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
      <div class="chapter-actions-top" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn-read-all" id="btnReadChapter" onclick="readFullChapter()">
          <i class="fas fa-volume-up"></i> Ouvir Capítulo
        </button>
        <button class="btn-read-all" onclick="explicarCapituloTeologia()" style="background: rgba(168, 85, 247, 0.15); border-color: rgba(168, 85, 247, 0.4); color: #c084fc;" title="Explicar segundo a Tradição Católica">
          <i class="fas fa-feather-pointed"></i> Explicar pela Tradição
        </button>
        <button class="btn-read-all" onclick="startLectioDivinaCurrentChapter()" style="background: rgba(56, 189, 248, 0.15); border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;" title="Rezar este Capítulo com Lectio Divina">
          <i class="fas fa-dove"></i> Lectio Divina
        </button>
        <button class="btn-read-all pulse-animation" onclick="generateHomilyForChapter()" style="background: linear-gradient(135deg, var(--gold-500, #d4af37) 0%, #b8860b 100%); color: #111827; font-weight: 600; border-color: transparent;">
          <i class="fas fa-church"></i> Homilia do Capítulo
        </button>
      </div>
    ` + verses.map(v => `
            <div class="verse" data-v="${v.id_versiculo}" id="v-${v.id_versiculo}">
                <div class="verse-content">
                    <span class="verse-number">${v.id_versiculo}</span>
                    <span class="verse-text">${v.texto}</span>
                </div>
                <div class="verse-actions">
                    <button class="verse-action-btn speak-btn" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="Ouvir"><i class="fas fa-volume-up"></i></button>
                    <button class="verse-action-btn fav-btn ${v.favorito ? 'favorited' : ''}" data-livro="${currentBook.id}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" title="Favoritar"><i class="fas fa-heart"></i></button>
                    <button class="verse-action-btn teologia-btn" data-livro="${currentBook.nome}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="Explicar pela Tradição Católica" style="color: #c084fc;"><i class="fas fa-feather-pointed"></i></button>
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
  const teologiaBtn = e.target.closest('.teologia-btn');
  if (teologiaBtn) {
    e.stopPropagation();
    explicarVersiculoTeologia(teologiaBtn.dataset.livro, teologiaBtn.dataset.cap, teologiaBtn.dataset.ver, teologiaBtn.dataset.txt);
    return;
  }
  const waBtn = e.target.closest('.wa-btn');
  if (waBtn) {
    e.stopPropagation();
    const msg = `\u201C${waBtn.dataset.txt}\u201D\n\n\u2014 ${waBtn.dataset.livro} ${waBtn.dataset.cap},${waBtn.dataset.ver}\n\n_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
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

let activeVerseUtterance = null;
async function speakSingleVerseText(text) {
  if (!text || stopRequested) return;

  // 1. Capacitor Native TTS (Android / iOS app compilado)
  if (Capacitor?.isNativePlatform() && TextToSpeech) {
    try {
      await TextToSpeech.speak({
        text: text,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient'
      });
      return;
    } catch (e) {
      console.warn('[TTS Native] Falha, tentando Web Speech:', e);
    }
  }

  // 2. Web Speech Synthesis (iPhone Safari / Web Browser)
  if ('speechSynthesis' in window && !stopRequested) {
    return new Promise((resolve) => {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        const ptVoice = getBestPortugueseVoice();
        if (ptVoice) {
          utterance.voice = ptVoice;
        }

        activeVerseUtterance = utterance;

        utterance.onstart = () => {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        };

        utterance.onend = () => {
          activeVerseUtterance = null;
          resolve();
        };
        utterance.onerror = (e) => {
          console.warn('[WebSpeech] Erro no versículo:', e);
          activeVerseUtterance = null;
          resolve();
        };

        window.speechSynthesis.speak(utterance);
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (err) {
        console.error('[WebSpeech] Exceção ao falar versículo:', err);
        resolve();
      }
    });
  }
}

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
    await speakSingleVerseText(text);
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

window.readVersesRange = async function (verseNumbers = null) {
  await stopSpeech();
  stopRequested = false;
  isSpeaking = true;
  isChapterReading = true;
  updateChapterReadBtnState(true);

  try {
    if (Array.isArray(verseNumbers) && verseNumbers.length > 0) {
      // Lê sequencialmente a lista exata de versículos (ex: [1, 2, 3, 4, 5])
      for (const vNum of verseNumbers) {
        if (stopRequested) break;

        const v = document.getElementById(`v-${vNum}`);
        if (!v) continue;

        const textEl = v.querySelector('.verse-text');
        if (!textEl) continue;
        const text = textEl.textContent.trim();

        v.classList.add('reading');
        v.scrollIntoView({ behavior: 'smooth', block: 'center' });

        try {
          await speakSingleVerseText(text);
        } finally {
          v.classList.remove('reading');
        }
      }
    } else {
      // Lê todos os versículos do capítulo
      const verses = document.querySelectorAll('.verse');
      for (let i = 0; i < verses.length; i++) {
        if (stopRequested) break;
        const v = verses[i];
        const textEl = v.querySelector('.verse-text');
        if (!textEl) continue;
        const text = textEl.textContent.trim();

        v.classList.add('reading');
        v.scrollIntoView({ behavior: 'smooth', block: 'center' });

        try {
          await speakSingleVerseText(text);
        } finally {
          v.classList.remove('reading');
        }
      }
    }
  } finally {
    document.querySelectorAll('.verse.reading').forEach(v => v.classList.remove('reading'));
    isSpeaking = false;
    isChapterReading = false;
    updateChapterReadBtnState(false);
  }
};

window.readFullChapter = async function () {
  if (isChapterReading) {
    await stopSpeech();
    return;
  }
  await readVersesRange(null);
};

// ===== SEARCH HIGHLIGHTING HELPER =====
export function highlightSearchTerms(text, query) {
  if (!text || !query) return text || '';

  try {
    const accentMap = {
      'a': '[aáàâãäAÁÀÂÃÄ]',
      'e': '[eéèêëEÉÈÊË]',
      'i': '[iíìîïIÍÌÎÏ]',
      'o': '[oóòôõöOÓÒÔÕÖ]',
      'u': '[uúùûüUÚÙÛÜ]',
      'c': '[cçCÇ]',
      'n': '[nñNÑ]'
    };

    const escapeRegex = (s) => (s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const makeFlexPattern = (phrase) => {
      const cleaned = phrase.trim().replace(/^["'«“\s]+|["'»”:,.;!?\s]+$/g, '');
      return cleaned
        .split('')
        .map(ch => {
          if (/\s+/.test(ch)) return '[\\s,.:;!?"\'«“»”]+';
          const lower = ch.toLowerCase();
          return accentMap[lower] || escapeRegex(ch);
        })
        .join('');
    };

    const cleanQuery = query.trim().replace(/^["'«“\s]+|["'»”:,.;!?\s]+$/g, '');
    if (cleanQuery.length === 0) return text;

    // Limites exatos de palavra respeitando letras acentuadas e pontuação
    const leftBound = '(?:^|(?<=[^a-zA-Z0-9áéíóúâêîôûãõçÁÉÍÓÚÂÊÎÔÛÃÕÇ]))';
    const rightBound = '(?=[^a-zA-Z0-9áéíóúâêîôûãõçÁÉÍÓÚÂÊÎÔÛÃÕÇ]|$)';

    // 1. Tentar casar a frase inteira com limite de palavra exata
    const phrasePattern = makeFlexPattern(cleanQuery);
    const phraseRegex = new RegExp(leftBound + '(' + phrasePattern + ')' + rightBound, 'gi');

    if (phraseRegex.test(text)) {
      return text.replace(phraseRegex, '<mark class="search-highlight">$1</mark>');
    }

    // 2. Se a frase completa contínua não casar, casar palavras individuais com limites exatos
    const words = cleanQuery
      .split(/\s+/)
      .map(w => w.replace(/^[^a-zA-Z0-9áéíóúâêîôûãõçÁÉÍÓÚÂÊÎÔÛÃÕÇ]+|[^a-zA-Z0-9áéíóúâêîôûãõçÁÉÍÓÚÂÊÎÔÛÃÕÇ]+$/g, ''))
      .filter(w => w.length >= 2);

    if (words.length === 0) return text;

    const wordPatterns = words
      .sort((a, b) => b.length - a.length)
      .map(w => makeFlexPattern(w));

    const wordsRegex = new RegExp(leftBound + '((?:' + wordPatterns.join('|') + '))' + rightBound, 'gi');
    return text.replace(wordsRegex, '<mark class="search-highlight">$1</mark>');
  } catch (err) {
    return text;
  }
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
    const msg = `“${waBtn.dataset.txt}”\n\n— ${waBtn.dataset.livro} ${waBtn.dataset.cap},${waBtn.dataset.ver}\n\n_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
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
    const msg = `“${waBtn.dataset.txt}”\n\n— ${waBtn.dataset.livro} ${waBtn.dataset.cap},${waBtn.dataset.ver}\n\n_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
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
  loadGalleryData(true);
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
    // Canonical order with user uploads featured first
    list.sort((a, b) => {
      if (a.is_user_upload && !b.is_user_upload) return -1;
      if (!a.is_user_upload && b.is_user_upload) return 1;
      if (a.is_user_upload && b.is_user_upload) return (b.id || 0) - (a.id || 0);
      return (a.id_livro || 999) - (b.id_livro || 999) || (a.id_capitulo || 0) - (b.id_capitulo || 0) || (a.id_versiculo || 0) - (b.id_versiculo || 0);
    });
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
    const hasYt = img.youtube_url && img.youtube_url.trim().length > 0;
    const hasBook = img.nome_livro && img.nome_livro !== 'Bíblia' && img.nome_livro !== 'Imagem Devocional' && img.nome_livro !== 'Card Sagrado';
    const ref = hasBook 
      ? `${img.nome_livro} ${img.id_capitulo || ''}${img.id_versiculo ? ',' + img.id_versiculo : ''}`.trim()
      : (img.id_capitulo ? `Bíblia ${img.id_capitulo},${img.id_versiculo || 1}` : (img.nome_livro || 'Imagem Devocional'));
    const txt = (img.texto || '').trim();
    const oracao = (img.oracao || '').trim();
    const ytUrl = (img.youtube_url || '').trim();
    const ytId = hasYt ? getYouTubeVideoId(ytUrl) : null;
    const imgSrc = img.address || img.url || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '');

    h += `
      <div class="gallery-card" onclick="openGalleryLightbox(${idx})">
          <img src="${imgSrc}" alt="${ref}" loading="lazy"
               onerror="this.parentElement.style.background='linear-gradient(135deg, #2D1018 0%, #1A0A0E 100%)';this.style.opacity='0.2'">
          
          <div class="gallery-card-badge">${ref}</div>
          ${hasYt ? `<div class="gallery-card-yt-badge"><i class="fab fa-youtube"></i> Vídeo</div>` : ''}
          
          <div class="gallery-card-actions" onclick="event.stopPropagation()">
              ${hasYt ? `
              <button class="gallery-action-btn btn-youtube" title="Assistir Vídeo no App"
                      onclick="openYouTubePlayer(event, '${escapeHtml(ytUrl)}', '${escapeHtml(ref)}', '${escapeHtml(txt)}', '${escapeHtml(oracao)}')">
                  <i class="fab fa-youtube" style="color:#ff0000;"></i>
              </button>` : ''}
              <button class="gallery-action-btn btn-heart ${isFav ? 'active' : ''}" 
                      title="${isFav ? 'Remover dos favoritos' : 'Favoritar imagem'}" 
                      onclick="toggleCardFavorite(event, '${img.id}', '${img.nome_livro}_${img.id_capitulo}_${img.id_versiculo}')">
                  <i class="${isFav ? 'fas fa-heart' : 'far fa-heart'}" style="${isFav ? 'color:#ef4444;' : ''}"></i>
              </button>
              <button class="gallery-action-btn" title="Compartilhar no WhatsApp"
                      onclick="shareCardWhatsApp(event, '${escapeHtml(ref)}', '${escapeHtml(txt)}', '${escapeHtml(ytUrl)}')">
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

window.shareCardWhatsApp = function (e, ref, txt, youtubeUrl = '') {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  let msg = '';
  if (txt) msg += `“${txt}”\n\n`;
  if (ref) msg += `— ${ref}\n\n`;
  if (youtubeUrl && youtubeUrl.trim()) {
    msg += `▶ Assista ao vídeo de reflexão: ${youtubeUrl.trim()}\n\n`;
  }
  msg += `_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
};

window.deleteCardImage = async function (e, id) {
  e.stopPropagation();
  if (!confirm('Deseja realmente excluir esta imagem da sua galeria?')) return;

  const idStr = String(id);
  const targetImg = allGalleryItems.find(img => String(img.id) === idStr);

  // 1. Instant visual removal (0ms feedback)
  allGalleryItems = allGalleryItems.filter(img => {
    if (String(img.id) === idStr) return false;
    if (targetImg && targetImg.address && img.address === targetImg.address) return false;
    return true;
  });
  renderGalleryGrid();
  showToast('Imagem excluída com sucesso');

  // 2. Persist deletion in Firebase Cloud & Local Storage
  try {
    await db.deleteImgVersiculo(id, targetImg);
    const refreshedImgs = await db.getImgVersiculos(currentGallerySearch, currentGalleryCategory);
    allGalleryItems = refreshedImgs || [];
    renderGalleryGrid();
  } catch (err) {
    console.warn('Erro ao persistir exclusão:', err);
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

  const ytBtn = document.getElementById('lightboxBtnYouTube');
  if (ytBtn) {
    ytBtn.classList.toggle('hidden', !img.youtube_url);
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
  const hasBook = img.nome_livro && img.nome_livro !== 'Bíblia' && img.nome_livro !== 'Imagem Devocional' && img.nome_livro !== 'Card Sagrado';
  const ref = hasBook 
    ? `${img.nome_livro} ${img.id_capitulo || ''}${img.id_versiculo ? ',' + img.id_versiculo : ''}`.trim()
    : (img.id_capitulo ? `Bíblia ${img.id_capitulo},${img.id_versiculo || 1}` : (img.nome_livro || 'Imagem Devocional'));
  const txt = (img.texto || '').trim();
  let msg = '';
  if (txt) msg += `“${txt}”\n\n`;
  if (ref) msg += `— ${ref}\n\n`;
  if (img.oracao && img.oracao.trim()) msg += `_${img.oracao.trim()}_\n\n`;
  if (img.youtube_url && img.youtube_url.trim()) {
    msg += `▶ Assista ao vídeo de reflexão: ${img.youtube_url.trim()}\n\n`;
  }
  msg += `_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
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
  
  const idStr = String(img.id);
  const targetImg = img;

  closeGalleryLightbox();

  // 1. Instant visual removal (0ms feedback)
  allGalleryItems = allGalleryItems.filter(item => {
    if (String(item.id) === idStr) return false;
    if (targetImg.address && item.address === targetImg.address) return false;
    return true;
  });
  renderGalleryGrid();
  showToast('Imagem excluída com sucesso');

  // 2. Persist deletion in Firebase Cloud & Local Storage
  try {
    await db.deleteImgVersiculo(img.id, targetImg);
    const refreshedImgs = await db.getImgVersiculos(currentGallerySearch, currentGalleryCategory);
    allGalleryItems = refreshedImgs || [];
    renderGalleryGrid();
  } catch (err) {
    console.warn('Erro ao persistir exclusão no lightbox:', err);
  }
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
    closeYouTubePlayer();
  }
});

// ===== IN-APP YOUTUBE THEATER PLAYER =====
export function getYouTubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  const str = url.trim();
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = str.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
}

window.handleStudioYtInput = function (val) {
  const previewBox = document.getElementById('studioYtPreviewBox');
  if (!val || !val.trim()) {
    if (previewBox) {
      previewBox.innerHTML = '';
      previewBox.classList.add('hidden');
    }
  }
};

window.testStudioYtVideo = function (url) {
  const previewBox = document.getElementById('studioYtPreviewBox');
  if (!url || !url.trim()) {
    showToast('Insira um link do YouTube para testar');
    return;
  }
  const videoId = getYouTubeVideoId(url);
  if (!videoId) {
    showToast('Link do YouTube inválido ou não reconhecido');
    return;
  }
  if (previewBox) {
    previewBox.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" title="Prévia YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    previewBox.classList.remove('hidden');
    showToast('▶ Vídeo do YouTube carregado com sucesso!');
  }
};

let currentPlayingVideoData = null;

window.openYouTubePlayer = function (e, youtubeUrl, ref = '', txt = '', oracao = '') {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  if (!youtubeUrl) return;

  const videoId = getYouTubeVideoId(youtubeUrl);
  if (!videoId) {
    showToast('Link do YouTube inválido');
    return;
  }

  currentPlayingVideoData = { youtubeUrl, ref, txt, oracao };

  const modal = document.getElementById('youtubePlayerModal');
  const iframe = document.getElementById('youtubeIframe');
  const titleEl = document.getElementById('ytPlayerTitle');
  const refEl = document.getElementById('ytPlayerRef');
  const verseBox = document.getElementById('ytPlayerVerseBox');
  const verseTextEl = document.getElementById('ytPlayerVerseText');
  const oracaoEl = document.getElementById('ytPlayerOracao');

  if (titleEl) titleEl.textContent = ref || 'Vídeo Sagrado';
  if (refEl) refEl.textContent = ref ? `Passagem: ${ref}` : 'Louvor & Meditação Católica';
  if (verseTextEl) verseTextEl.textContent = txt ? `“${txt}”` : '';
  if (oracaoEl) oracaoEl.textContent = oracao ? `Oração: ${oracao}` : '';
  if (verseBox) verseBox.classList.toggle('hidden', !txt && !oracao);

  if (iframe) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closeYouTubePlayer = function () {
  currentPlayingVideoData = null;
  const modal = document.getElementById('youtubePlayerModal');
  const iframe = document.getElementById('youtubeIframe');
  if (iframe) iframe.src = '';
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
};

window.shareCurrentYouTubeVideo = function () {
  if (!currentPlayingVideoData) return;
  const { youtubeUrl, ref, txt, oracao } = currentPlayingVideoData;
  let msg = '';
  if (txt) msg += `“${txt}”\n\n`;
  if (ref) msg += `— ${ref}\n\n`;
  if (oracao) msg += `_${oracao}_\n\n`;
  if (youtubeUrl) msg += `▶ Assista ao vídeo de reflexão: ${youtubeUrl}\n\n`;
  msg += `_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
};

window.openLightboxYouTube = function () {
  const img = currentLightboxList[activeLightboxIndex];
  if (!img || !img.youtube_url) return;
  const hasBook = img.nome_livro && img.nome_livro !== 'Bíblia' && img.nome_livro !== 'Imagem Devocional' && img.nome_livro !== 'Card Sagrado';
  const ref = hasBook 
    ? `${img.nome_livro} ${img.id_capitulo || ''}${img.id_versiculo ? ',' + img.id_versiculo : ''}`.trim()
    : (img.id_capitulo ? `Bíblia ${img.id_capitulo},${img.id_versiculo || 1}` : (img.nome_livro || 'Imagem Devocional'));
  openYouTubePlayer(null, img.youtube_url, ref, img.texto, img.oracao);
};

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

window.handleImageFileSelected = async function (input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  if (file.size > 25 * 1024 * 1024) {
    showToast('A imagem deve ter no máximo 25MB');
    return;
  }

  showToast('Otimizando imagem...');
  try {
    const compressedDataUrl = await compressImageFile(file, 1280, 0.88);
    uploadedImageData = compressedDataUrl;
    showImagePreview(uploadedImageData);
  } catch (err) {
    console.warn("Erro ao comprimir imagem, usando original:", err);
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImageData = e.target.result;
      showImagePreview(uploadedImageData);
    };
    reader.readAsDataURL(file);
  }
};

function compressImageFile(file, maxDimension = 1280, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

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
  const ytInput = document.getElementById('uploadYoutubeUrl');
  const ytUrl = ytInput ? ytInput.value.trim() : '';
  const ytId = getYouTubeVideoId(ytUrl);

  if (!uploadedImageData && !txt && !ytId) {
    showToast('Por favor, adicione uma foto, versículo ou link do YouTube para salvar.');
    return;
  }

  // If no image uploaded, use YouTube thumbnail or generate a studio canvas card automatically
  let finalImgAddress = uploadedImageData;
  if (!finalImgAddress && ytId) {
    finalImgAddress = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  } else if (!finalImgAddress) {
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
      oracao: oracao,
      youtube_url: ytUrl
    });

    closeGalleryUploadModal();
    showToast('✨ Imagem adicionada com sucesso à Galeria!');
    
    // Switch to "Meus Uploads" or "Com Vídeo" to immediately show what was added
    const targetCategory = ytUrl ? 'videos' : 'uploads';
    const chipSelector = `.gallery-chip[data-category="${targetCategory}"]`;
    filterGalleryCategory(targetCategory, document.querySelector(chipSelector));
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
  const aiYtInput = document.getElementById('aiYoutubeUrl');
  const aiYtUrl = aiYtInput ? aiYtInput.value.trim() : '';

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
      oracao: oracao,
      youtube_url: aiYtUrl
    });

    closeGalleryUploadModal();
    showToast('✨ Arte Sacra salva com sucesso na sua Galeria!');
    const targetCategory = aiYtUrl ? 'videos' : 'uploads';
    filterGalleryCategory(targetCategory, document.querySelector(`.gallery-chip[data-category="${targetCategory}"]`));
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
  stopLiturgiaSpeech();
  stopHomiliaLiturgiaSpeech();
  stopRosarioSpeech();
  stopTeologiaSpeech();
  stopNovenaSpeech();
  stopMariaSpeech();
  ['homeView', 'chapterView', 'searchView', 'favoritesView', 'galleryView', 'planView', 'liturgiaView', 'rosarioView', 'velasView', 'teologiaView', 'lectioView', 'confissaoView', 'diarioView', 'novenasView', 'cartasView', 'mariaView'].forEach(v => {
    const el = document.getElementById(v);
    if (el) el.classList.toggle('hidden', v !== id);
  });
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  const map = { homeView: 'bnHome', liturgiaView: 'bnLiturgia', rosarioView: 'bnRosario', velasView: 'bnVelas', galleryView: 'bnGallery', planView: 'bnPlan', favoritesView: 'bnFav' };
  if (map[id]) { const btn = document.getElementById(map[id]); if (btn) btn.classList.add('active'); }
  window.scrollTo(0, 0);
}

window.doSearchWithQuery = function (query) {
  const input = document.getElementById('searchInput');
  if (input) input.value = query;
  doSearch();
};

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

// ===== IOS & WEB SPEECH SYNTHESIS ENGINE PRIMER =====
let cachedSpeechVoices = [];
function updateSpeechVoices() {
  if ('speechSynthesis' in window) {
    try {
      cachedSpeechVoices = window.speechSynthesis.getVoices() || [];
    } catch (e) {}
  }
}
if ('speechSynthesis' in window) {
  updateSpeechVoices();
  window.speechSynthesis.onvoiceschanged = updateSpeechVoices;
}

function getBestPortugueseVoice() {
  if (!cachedSpeechVoices.length && 'speechSynthesis' in window) {
    updateSpeechVoices();
  }
  return cachedSpeechVoices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR') ||
         cachedSpeechVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('pt')) || null;
}

// Unlocks iOS WebKit audio/speech synthesis restriction on first user interaction anywhere in the app
let isSpeechSynthesizerPrimed = false;
function primeSpeechForIos() {
  if (isSpeechSynthesizerPrimed) return;
  isSpeechSynthesizerPrimed = true;
  if ('speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      const silentUtterance = new SpeechSynthesisUtterance(' ');
      silentUtterance.volume = 0.01;
      silentUtterance.rate = 10;
      window.speechSynthesis.speak(silentUtterance);
    } catch (e) {}
  }
}
['touchstart', 'touchend', 'click', 'pointerdown'].forEach(evt => {
  document.addEventListener(evt, primeSpeechForIos, { once: true, passive: true });
});

// ===== DONATE MODAL & RECURRING REMINDER =====
const DONATE_AUDIO_TEXT = "A Paz de Jesus e o amor de Maria esteja contigo! Este aplicativo é mantido sem propagandas para preservar a santidade da sua oração. Ajude este projeto de evangelização a continuar no ar com qualquer valor: 2 reais, 5 reais, 10 reais ou o que o seu coração desejar. Deus abençoe imensamente a sua generosidade!";
let isDonateAudioSpeaking = false;
let activeDonateUtterance = null;
let donateHeartbeatResumeTimer = null;
let donateAutoCloseTimer = null;

// Chave PIX oficial e credenciais do projeto
const PIX_KEY = 'minhabibliacatolica1@gmail.com';
const PIX_MERCHANT_NAME = 'Biblia Catolica';
const PIX_MERCHANT_CITY = 'SAO PAULO';

// Valor selecionado atualmente (2, 5, 10 ou 0 para Livre)
let selectedDonateAmount = 2;

/**
 * Formata um campo no padrão EMV / Pix do Banco Central (ID + Tamanho 2 dígitos + Conteúdo)
 */
function formatPixField(id, val) {
  const len = String(val.length).padStart(2, '0');
  return id + len + val;
}

/**
 * Calcula o checksum CRC16-CCITT (Polinômio 0x1021, valor inicial 0xFFFF)
 */
function crc16Pix(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= (str.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Gera a string Pix Copia e Cola (BR Code) homologada pelo BACEN
 */
function generatePixBrCode(amount) {
  let payload = formatPixField('00', '01');
  const merchantAccount = formatPixField('00', 'br.gov.bcb.pix') + formatPixField('01', PIX_KEY);
  payload += formatPixField('26', merchantAccount);
  payload += formatPixField('52', '0000');
  payload += formatPixField('53', '986');
  if (amount > 0) {
    payload += formatPixField('54', Number(amount).toFixed(2));
  }
  payload += formatPixField('58', 'BR');
  payload += formatPixField('59', PIX_MERCHANT_NAME);
  payload += formatPixField('60', PIX_MERCHANT_CITY);
  payload += formatPixField('62', formatPixField('05', '***'));
  payload += '6304';
  const crc = crc16Pix(payload);
  return payload + crc;
}

/**
 * Seleciona um valor sugerido (2, 5, 10 ou 0 para livre) e atualiza QR Code e Pix Copia e Cola
 */
window.selectDonateValue = function (amount, btnEl) {
  selectedDonateAmount = Number(amount);
  document.querySelectorAll('.donate-value-chip').forEach(btn => btn.classList.remove('active'));
  if (btnEl) {
    btnEl.classList.add('active');
  }
  updatePixDisplay();
};

/**
 * Atualiza visualmente o QR Code e os textos do modal conforme o valor selecionado
 */
window.updatePixDisplay = function () {
  const brCode = generatePixBrCode(selectedDonateAmount);

  // Texto da instrução
  const instructionEl = document.getElementById('pixInstructionText');
  if (instructionEl) {
    if (selectedDonateAmount > 0) {
      instructionEl.innerHTML = `Código Pix Copia e Cola de <strong>R$ ${selectedDonateAmount},00</strong>:`;
    } else {
      instructionEl.innerHTML = `Código Pix Copia e Cola com <strong>Valor Livre</strong>:`;
    }
  }

  // QR Code Dinâmico
  const qrImg = document.getElementById('pixQrImg');
  if (qrImg) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(brCode)}&margin=4`;
    qrImg.src = qrUrl;
  }

  // Texto exibido na caixinha
  const keyDisplay = document.getElementById('pixKeyDisplay');
  if (keyDisplay) {
    keyDisplay.innerText = brCode;
  }

  // Botão principal de copiar
  const copyBtn = document.getElementById('pixCopyBtn');
  if (copyBtn) {
    if (selectedDonateAmount > 0) {
      copyBtn.innerHTML = `<i class="far fa-copy"></i> <span>Copiar Pix Copia e Cola (R$ ${selectedDonateAmount},00)</span>`;
    } else {
      copyBtn.innerHTML = `<i class="far fa-copy"></i> <span>Copiar Pix Copia e Cola (Valor Livre)</span>`;
    }
  }
};

/**
 * Copia o código Pix Copia e Cola atualmente selecionado
 */
window.copyCurrentPixSelection = async function () {
  const brCode = generatePixBrCode(selectedDonateAmount);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(brCode);
    } else {
      const ta = document.createElement('textarea');
      ta.value = brCode;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    const valStr = selectedDonateAmount > 0 ? `R$ ${selectedDonateAmount},00` : 'Valor Livre';
    showToast(`📋 Pix Copia e Cola (${valStr}) copiado com sucesso! Abra o app do seu banco.`);

    const copyBtn = document.getElementById('pixCopyBtn');
    if (copyBtn) {
      const origHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> <span>Código Copiado!</span>';
      copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      setTimeout(() => {
        copyBtn.innerHTML = origHtml;
        copyBtn.style.background = '';
      }, 2500);
    }
  } catch (err) {
    console.error('[Donate] Erro ao copiar código Pix:', err);
    showToast('Falha ao copiar automaticamente. Selecione e copie o código acima.');
  }
};

/**
 * Copia a chave de e-mail direta (sem valor fixo)
 */
window.copyDirectEmailKey = async function () {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(PIX_KEY);
    } else {
      const ta = document.createElement('textarea');
      ta.value = PIX_KEY;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast(`✉️ Chave e-mail (${PIX_KEY}) copiada com sucesso!`);
  } catch (err) {
    showToast(`Chave Pix: ${PIX_KEY}`);
  }
};

function clearDonateHeartbeat() {
  if (donateHeartbeatResumeTimer) {
    clearInterval(donateHeartbeatResumeTimer);
    donateHeartbeatResumeTimer = null;
  }
}

function updateDonateAudioBtnState(speaking) {
  isDonateAudioSpeaking = speaking;
  const btn = document.getElementById('btnDonateAudio');
  if (!btn) return;
  if (speaking) {
    btn.classList.remove('pulse-ready');
    btn.classList.add('speaking');
    btn.innerHTML = '<i class="fas fa-stop"></i> <span>Parar</span>';
  } else {
    btn.classList.remove('speaking');
    btn.innerHTML = '<i class="fas fa-volume-up"></i> <span>Ouvir</span>';
  }
}

function clearDonateAutoCloseTimer() {
  if (donateAutoCloseTimer) {
    clearTimeout(donateAutoCloseTimer);
    donateAutoCloseTimer = null;
  }
}

function handleDonateAudioFinished() {
  clearDonateHeartbeat();
  activeDonateUtterance = null;
  updateDonateAudioBtnState(false);
  clearDonateAutoCloseTimer();
  console.log('[Donate] Leitura do texto concluída. Modal permanece aberto para interação do usuário.');
}

window.stopDonateAudio = function () {
  isDonateAudioSpeaking = false;
  clearDonateAutoCloseTimer();
  clearDonateHeartbeat();
  activeDonateUtterance = null;
  updateDonateAudioBtnState(false);

  try {
    if (Capacitor?.isNativePlatform() && TextToSpeech) {
      TextToSpeech.stop();
    }
  } catch (e) {}

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};

window.playDonateAudio = async function () {
  clearDonateAutoCloseTimer();
  clearDonateHeartbeat();

  // 1. Native platform (Android / iOS app compiled via Capacitor)
  if (Capacitor?.isNativePlatform() && TextToSpeech) {
    try {
      updateDonateAudioBtnState(true);
      await TextToSpeech.speak({
        text: DONATE_AUDIO_TEXT,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient'
      });
      handleDonateAudioFinished();
      return;
    } catch (e) {
      console.warn("[Donate] TTS Capacitor falhou, tentando Web Speech fallback:", e);
      updateDonateAudioBtnState(false);
    }
  }

  // 2. Web Speech Synthesis (iPhone Safari / iPad / PWA / Web Browser)
  if ('speechSynthesis' in window) {
    speakDonateWithWebSpeech();
  } else {
    updateDonateAudioBtnState(false);
  }
};

function speakDonateWithWebSpeech() {
  if (!('speechSynthesis' in window)) {
    updateDonateAudioBtnState(false);
    return;
  }

  // Unpause WebKit synthesis if stalled
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch (e) {}

  // If already speaking, cancel previous speech
  if (window.speechSynthesis.speaking) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }

  const utterance = new SpeechSynthesisUtterance(DONATE_AUDIO_TEXT);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const ptVoice = getBestPortugueseVoice();
  if (ptVoice) {
    utterance.voice = ptVoice;
  }

  // Preserve global reference to avoid WebKit garbage collection
  activeDonateUtterance = utterance;

  utterance.onstart = () => {
    console.log('[Donate] Leitura de apoio iniciada via Web Speech.');
    updateDonateAudioBtnState(true);

    // Heartbeat to prevent WebKit 15-second speech synthesis pause bug
    clearDonateHeartbeat();
    donateHeartbeatResumeTimer = setInterval(() => {
      if (!isDonateAudioSpeaking) {
        clearDonateHeartbeat();
        return;
      }
      if ('speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 2500);
  };

  utterance.onend = () => {
    clearDonateHeartbeat();
    activeDonateUtterance = null;
    handleDonateAudioFinished();
  };

  utterance.onerror = (evt) => {
    console.warn('[Donate] Web Speech error:', evt);
    clearDonateHeartbeat();
    activeDonateUtterance = null;
    updateDonateAudioBtnState(false);
  };

  // 40ms safety timeout to let WebKit finish any previous cancellation before queueing
  setTimeout(() => {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      console.warn('[Donate] Erro ao invocar speechSynthesis.speak:', e);
      updateDonateAudioBtnState(false);
    }
  }, 40);
}

window.toggleDonateAudio = function () {
  if (isDonateAudioSpeaking) {
    stopDonateAudio();
  } else {
    playDonateAudio();
  }
};

let donateHeartbeatInterval = null;
// Intervalo de 20 minutos de uso contínuo (respeitoso e equilibrado para oração)
const DONATE_INTERVAL_MS = 20 * 60 * 1000;
let lastDonateTime = Date.now();

export async function isDonatePopupDisabledByAdmin() {
  try {
    const res = await Preferences.get({ key: 'biblia_admin_disable_donate_popup' });
    return res && (res.value === 'true' || res.value === true);
  } catch (e) {
    return false;
  }
}

/**
 * Verifica se o usuário já viu o popup de apoio na data de hoje
 */
export async function hasAlreadySeenDonateToday() {
  try {
    const res = await Preferences.get({ key: 'biblia_last_donate_popup_date' });
    const today = new Date().toISOString().slice(0, 10);
    return res && res.value === today;
  } catch (e) {
    return false;
  }
}

/**
 * Registra que o popup foi visualizado hoje
 */
export async function markDonateSeenToday() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    await Preferences.set({ key: 'biblia_last_donate_popup_date', value: today });
  } catch (e) {}
}

/**
 * Salvaguarda da oração: verifica se o usuário está em momento profundo de oração ou áudio
 */
export function isUserInDeepPrayer() {
  // Áudios ativos
  if (isSpeaking || isChapterReading || isRosarioSpeaking || isDonateAudioSpeaking) return true;
  if ('speechSynthesis' in window && window.speechSynthesis.speaking) return true;

  // Telas devocionais que não devem ser interrompidas
  const prayerViews = ['rosarioView', 'novenasView', 'lectioView', 'confissaoView'];
  for (const vId of prayerViews) {
    const el = document.getElementById(vId);
    if (el && !el.classList.contains('hidden')) {
      return true;
    }
  }

  // Modal de homilia aberto
  const homilyModal = document.getElementById('homilyModal');
  if (homilyModal && !homilyModal.classList.contains('hidden')) return true;

  return false;
}

async function checkAndStartDonateTimer() {
  try {
    const disabledByAdmin = await isDonatePopupDisabledByAdmin();
    if (disabledByAdmin) {
      console.log('[Donate] Popup de apoio desativado pelo Administrador (Modo Apresentação). Timer inativo.');
      if (donateHeartbeatInterval) {
        clearInterval(donateHeartbeatInterval);
        donateHeartbeatInterval = null;
      }
      updateAdminDonateBadge();
      return;
    }

    const res = await Preferences.get({ key: 'biblia_already_donated' });
    const alreadyDonated = res && (res.value === 'true' || res.value === true);
    if (alreadyDonated) {
      console.log('[Donate] Usuário já marcou como doado anteriormente. Timer inativo.');
      updateAdminDonateBadge();
      return;
    }

    const alreadySeenToday = await hasAlreadySeenDonateToday();
    if (alreadySeenToday) {
      console.log('[Donate] Usuário já visualizou o apoio hoje. Respeitando limite diário.');
      updateAdminDonateBadge();
      return;
    }

    if (donateHeartbeatInterval) clearInterval(donateHeartbeatInterval);
    lastDonateTime = Date.now();
    console.log('[Donate] Timer de apoio ativado: abrirá após 20 minutos de uso contínuo (máx. 1x/dia).');
    updateAdminDonateBadge();

    // Verificação contínua e imune a throttling e recarregamentos
    donateHeartbeatInterval = setInterval(async () => {
      try {
        const adminOff = await isDonatePopupDisabledByAdmin();
        if (adminOff) {
          if (donateHeartbeatInterval) clearInterval(donateHeartbeatInterval);
          donateHeartbeatInterval = null;
          updateAdminDonateBadge();
          return;
        }

        const check = await Preferences.get({ key: 'biblia_already_donated' });
        if (check && (check.value === 'true' || check.value === true)) {
          if (donateHeartbeatInterval) clearInterval(donateHeartbeatInterval);
          donateHeartbeatInterval = null;
          updateAdminDonateBadge();
          return;
        }

        const seenToday = await hasAlreadySeenDonateToday();
        if (seenToday) {
          if (donateHeartbeatInterval) clearInterval(donateHeartbeatInterval);
          donateHeartbeatInterval = null;
          return;
        }

        const elapsed = Date.now() - lastDonateTime;
        if (elapsed >= DONATE_INTERVAL_MS) {
          // Salvaguarda da oração: se estiver rezando, aguarda terminar
          if (isUserInDeepPrayer()) {
            console.log('[Donate] 20 minutos decorridos, mas usuário está rezando ou ouvindo áudio. Aguardando...');
            return;
          }

          const modal = document.getElementById('donateModal');
          if (modal && modal.classList.contains('hidden')) {
            console.log('[Donate] 20 minutos decorridos. Exibindo banner de apoio fraterno.');
            lastDonateTime = Date.now();
            showDonateModal();
          }
        }
      } catch (err) {
        console.error('[Donate] Erro no ciclo do timer:', err);
      }
    }, 10000); // Heartbeat a cada 10 segundos
  } catch (err) {
    console.error("[Donate] Erro ao verificar timer de doação:", err);
  }
}

// Ao voltar para a aba ou desbloquear celular, verifica tempo decorrido com salvaguarda
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible') {
    const disabledByAdmin = await isDonatePopupDisabledByAdmin();
    if (disabledByAdmin) return;

    const seenToday = await hasAlreadySeenDonateToday();
    if (seenToday) return;

    const elapsed = Date.now() - lastDonateTime;
    if (elapsed >= DONATE_INTERVAL_MS) {
      if (isUserInDeepPrayer()) return;

      const modal = document.getElementById('donateModal');
      if (modal && modal.classList.contains('hidden')) {
        Preferences.get({ key: 'biblia_already_donated' }).then(res => {
          const already = res && (res.value === 'true' || res.value === true);
          if (!already) {
            lastDonateTime = Date.now();
            showDonateModal();
          }
        }).catch(() => {});
      }
    }
  }
});

window.toggleAdminDonatePopupState = async function () {
  try {
    const currentlyDisabled = await isDonatePopupDisabledByAdmin();
    const willEnable = currentlyDisabled;
    
    await Preferences.set({
      key: 'biblia_admin_disable_donate_popup',
      value: willEnable ? 'false' : 'true'
    });

    if (!willEnable) {
      if (donateHeartbeatInterval) {
        clearInterval(donateHeartbeatInterval);
        donateHeartbeatInterval = null;
      }
      stopDonateAudio();
      const modal = document.getElementById('donateModal');
      if (modal) modal.classList.add('hidden');
      document.body.style.overflow = '';
      showToast('🔕 Banner de apoio DESATIVADO (Modo Apresentação)!');
    } else {
      await Preferences.remove({ key: 'biblia_already_donated' });
      await Preferences.remove({ key: 'biblia_last_donate_popup_date' });
      lastDonateTime = Date.now();
      await checkAndStartDonateTimer();
      showToast('🔔 Banner de apoio ATIVADO (a cada 20 min de oração, máx 1x/dia)!');
    }
    await updateAdminDonateBadge();
  } catch (err) {
    console.error('[AdminDonate] Erro ao alternar estado do popup:', err);
  }
};

window.showDonateModal = function () {
  const modal = document.getElementById('donateModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Marca como visto na data de hoje
    markDonateSeenToday();

    // Atualiza QR Code e valores
    updatePixDisplay();

    clearDonateAutoCloseTimer();

    // In case speech engine was paused on iOS Safari, unpause it
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      try { window.speechSynthesis.resume(); } catch (e) {}
    }

    // Call immediately to preserve any user gesture (when opened via button)
    playDonateAudio();

    const btn = document.getElementById('btnDonateAudio');
    if (btn && !isDonateAudioSpeaking) {
      btn.classList.add('pulse-ready');
    }

    const onModalFirstTouch = (e) => {
      if (e.target.closest('.donate-close-btn') || e.target.closest('.donate-already-btn') || e.target.closest('.donate-remind-btn') || e.target.closest('.pix-key-box') || e.target.closest('.donate-value-chip')) {
        return;
      }
      if (!isDonateAudioSpeaking) {
        console.log('[Donate] Disparando leitura ao primeiro toque no modal.');
        playDonateAudio();
      }
    };
    modal.addEventListener('pointerdown', onModalFirstTouch, { once: true });
    modal.addEventListener('touchstart', onModalFirstTouch, { once: true, passive: true });
  }
};

window.closeDonateModal = function () {
  clearDonateAutoCloseTimer();
  const modal = document.getElementById('donateModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
  stopDonateAudio();
};

window.markAsDonated = async function () {
  try {
    stopDonateAudio();
    await Preferences.set({ key: 'biblia_already_donated', value: 'true' });
    if (donateHeartbeatInterval) {
      clearInterval(donateHeartbeatInterval);
      donateHeartbeatInterval = null;
    }
    closeDonateModal();
    updateAdminDonateBadge();
    showToast('🙏 Deus abençoe imensamente sua generosidade! Muito obrigado por apoiar este projeto sagrado.');
  } catch (err) {
    console.error("[Donate] Erro ao salvar status de doação:", err);
    closeDonateModal();
  }
};

window.remindDonateLater = async function () {
  await markDonateSeenToday();
  closeDonateModal();
  showToast('🕊️ Que a paz de Jesus esteja com você! Lembraremos em outro momento.');
};

window.resetDonateStatusAndTimer = async function () {
  try {
    await Preferences.remove({ key: 'biblia_already_donated' });
    await Preferences.remove({ key: 'biblia_last_donate_popup_date' });
    await Preferences.set({ key: 'biblia_admin_disable_donate_popup', value: 'false' });
    lastDonateTime = Date.now();
    await checkAndStartDonateTimer();
    showToast('✨ Preferências de apoio reiniciadas: ativo a cada 20 min (máx. 1x/dia).');
    updateAdminDonateBadge();
  } catch (e) {
    console.error(e);
  }
};

window.resetDonateStatus = window.resetDonateStatusAndTimer;

window.testDonateModalNow = function () {
  showDonateModal();
};

window.triggerDonateBtnShimmer = function () {
  const btns = document.querySelectorAll('#heroDonateBtn, .donate-sweep-effect');
  btns.forEach(btn => {
    btn.classList.remove('donate-shimmer-active');
    // Force reflow
    void btn.offsetWidth;
    btn.classList.add('donate-shimmer-active');
    setTimeout(() => {
      btn.classList.remove('donate-shimmer-active');
    }, 1800);
  });
};

let donateShimmerInterval = null;
function initDonateButtonShimmer() {
  if (donateShimmerInterval) clearInterval(donateShimmerInterval);
  // Executa o brilho intenso a cada 1 minuto (60.000 ms)
  donateShimmerInterval = setInterval(() => {
    window.triggerDonateBtnShimmer();
  }, 60000);

  // Primeiro brilho suave 3.5 segundos após iniciar o app
  setTimeout(() => {
    window.triggerDonateBtnShimmer();
  }, 3500);
}

async function updateAdminDonateBadge() {
  const badge = document.getElementById('adminDonateStatusBadge');
  const toggleBtn = document.getElementById('adminDonateToggleBtn');
  if (!badge && !toggleBtn) return;

  try {
    const disabledByAdmin = await isDonatePopupDisabledByAdmin();
    const res = await Preferences.get({ key: 'biblia_already_donated' });
    const already = res && (res.value === 'true' || res.value === true);

    if (toggleBtn) {
      if (disabledByAdmin) {
        toggleBtn.innerHTML = '<i class="fas fa-toggle-off" style="color: #ef4444; font-size: 16px;"></i> <span>Desativado</span>';
        toggleBtn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        toggleBtn.style.background = 'rgba(239, 68, 68, 0.12)';
        toggleBtn.title = 'Clique para ativar o popup a cada 20 minutos (máx 1x/dia)';
      } else {
        toggleBtn.innerHTML = '<i class="fas fa-toggle-on" style="color: #10b981; font-size: 16px;"></i> <span>Ativo</span>';
        toggleBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        toggleBtn.style.background = 'rgba(16, 185, 129, 0.12)';
        toggleBtn.title = 'Clique para desativar (Modo Apresentação para Padres)';
      }
    }

    if (badge) {
      if (disabledByAdmin) {
        badge.textContent = 'Desativado (Modo Apresentação)';
        badge.style.background = 'rgba(239, 68, 68, 0.15)';
        badge.style.color = '#ef4444';
      } else if (already) {
        badge.textContent = 'Já Apoiado (Pausado)';
        badge.style.background = 'rgba(16, 185, 129, 0.15)';
        badge.style.color = '#10b981';
      } else {
        const seenToday = await hasAlreadySeenDonateToday();
        const elapsedMins = Math.floor((Date.now() - lastDonateTime) / 60000);
        if (seenToday) {
          badge.textContent = 'Exibido hoje (máx. 1x/dia)';
          badge.style.background = 'rgba(59, 130, 246, 0.15)';
          badge.style.color = '#3b82f6';
        } else {
          badge.textContent = `Ativo (20 min • ${elapsedMins}m)`;
          badge.style.background = 'rgba(234, 179, 8, 0.15)';
          badge.style.color = 'var(--gold-400)';
        }
      }
    }
  } catch (e) {
    console.warn('[AdminDonate] Erro no updateAdminDonateBadge:', e);
  }
}

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
    updateAdminDonateBadge();
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
    await fetch(db.getApiUrl('/api/admin/set-gemini-key'), {
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
    await fetch(db.getApiUrl('/api/admin/set-gemini-key'), {
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
    await fetch(db.getApiUrl('/api/admin/set-gemini-key'), {
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

// ==========================================================================
// LITURGIA DIÁRIA & SANTO DO DIA
// ==========================================================================
let currentLiturgiaDate = new Date();
let currentLiturgiaData = null;
let isLiturgiaSpeaking = false;

window.showLiturgia = function (date = null) {
  showView('liturgiaView');
  currentLiturgiaDate = date ? new Date(date) : new Date();
  loadLiturgiaData();
};

window.loadLiturgiaHoje = function () {
  currentLiturgiaDate = new Date();
  const dateInput = document.getElementById('liturgiaDateInput');
  if (dateInput) dateInput.value = '';
  loadLiturgiaData();
};

window.changeLiturgiaDay = function (offset) {
  const newD = new Date(currentLiturgiaDate);
  newD.setDate(newD.getDate() + offset);
  currentLiturgiaDate = newD;
  loadLiturgiaData();
};

window.loadLiturgiaCustomDate = function (val) {
  if (!val) return;
  const parts = val.split('-');
  if (parts.length === 3) {
    currentLiturgiaDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    loadLiturgiaData();
  }
};

async function loadLiturgiaData() {
  const container = document.getElementById('liturgiaContentContainer');
  const todayBtn = document.getElementById('btnLiturgiaToday');
  const dateInput = document.getElementById('liturgiaDateInput');
  const subtitleEl = document.getElementById('liturgiaSubtitle');

  if (!container) return;

  stopLiturgiaSpeech();
  stopHomiliaLiturgiaSpeech();

  const now = new Date();
  const isToday = currentLiturgiaDate.toDateString() === now.toDateString();
  if (todayBtn) todayBtn.classList.toggle('active', isToday);
  if (dateInput) {
    const y = currentLiturgiaDate.getFullYear();
    const m = String(currentLiturgiaDate.getMonth() + 1).padStart(2, '0');
    const d = String(currentLiturgiaDate.getDate()).padStart(2, '0');
    dateInput.value = `${y}-${m}-${d}`;
  }

  container.innerHTML = '<div class="loading" style="padding:80px"><div class="loading-spinner"></div></div>';

  try {
    currentLiturgiaData = await getLiturgiaDiaria(currentLiturgiaDate);
    if (!currentLiturgiaData) throw new Error('Não foi possível carregar a liturgia');

    if (subtitleEl) subtitleEl.textContent = `${currentLiturgiaData.dataExtenso}`;

    renderLiturgiaView(currentLiturgiaData);
  } catch (err) {
    console.error("Liturgia error:", err);
    container.innerHTML = `
      <div class="gallery-empty-state">
        <i class="fas fa-exclamation-triangle gallery-empty-icon" style="color:#ef4444;"></i>
        <h3 class="gallery-empty-title">Falha ao carregar Liturgia</h3>
        <p class="gallery-empty-desc">Verifique sua conexão e tente novamente.</p>
        <button class="hero-donate-btn" onclick="loadLiturgiaData()"><i class="fas fa-redo"></i> Tentar Novamente</button>
      </div>
    `;
  }
}

function renderLiturgiaView(data) {
  const container = document.getElementById('liturgiaContentContainer');
  if (!container) return;

  const corHex = data.cor?.hex || '#22c55e';
  const corNome = data.cor?.name || 'Verde';
  const corDesc = data.cor?.desc || 'Tempo Comum';

  let html = `
    <!-- Top Liturgical Header -->
    <div class="liturgia-header-banner" style="border-left: 5px solid ${corHex};">
      <div class="liturgia-color-tag" style="background: ${corHex}22; color: ${corHex}; border: 1px solid ${corHex}55;">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: ${corHex}; display: inline-block;"></span>
        Cor Litúrgica: ${corNome} (${corDesc})
      </div>
      <div class="liturgia-date-display">${data.dataExtenso}</div>
      <div class="liturgia-tempo-display"><i class="fas fa-church"></i> ${data.tempoLiturgico}</div>
    </div>

    <!-- Primeira Leitura -->
    <div class="liturgia-section-card">
      <div class="liturgia-section-header">
        <h3 class="liturgia-section-title"><i class="fas fa-book-open"></i> ${data.primeiraLeitura?.titulo || 'Primeira Leitura'}</h3>
        <span class="liturgia-section-ref">${data.primeiraLeitura?.referencia || ''}</span>
      </div>
      <p class="liturgia-reading-text">${data.primeiraLeitura?.texto || ''}</p>
      <div style="display:flex; justify-content: flex-end; margin-top: 8px;">
        <button class="upload-btn-secondary" style="padding: 6px 12px; font-size: 11.5px;" onclick="openBibleByRef('${(data.primeiraLeitura?.referencia || '').replace(/'/g, "\\'")}')">
          <i class="fas fa-bible"></i> Ler na Bíblia
        </button>
      </div>
    </div>

    <!-- Salmo Responsorial -->
    <div class="liturgia-section-card">
      <div class="liturgia-section-header">
        <h3 class="liturgia-section-title"><i class="fas fa-music"></i> Salmo Responsorial</h3>
        <span class="liturgia-section-ref">${data.salmo?.referencia || ''}</span>
      </div>
      <div class="liturgia-psalm-refrao">
        <strong>Refrão:</strong> ${data.salmo?.refrao || ''}
      </div>
      <p class="liturgia-reading-text" style="white-space: pre-line;">${data.salmo?.texto || ''}</p>
      ${data.salmo?.referencia ? `
      <div style="display:flex; justify-content: flex-end; margin-top: 8px;">
        <button class="upload-btn-secondary" style="padding: 6px 12px; font-size: 11.5px;" onclick="openBibleByRef('${(data.salmo.referencia || '').replace(/'/g, "\\'")}')">
          <i class="fas fa-bible"></i> Ler Salmo na Bíblia
        </button>
      </div>` : ''}
    </div>
  `;

  // Segunda Leitura (se houver)
  if (data.segundaLeitura && data.segundaLeitura.texto) {
    html += `
      <div class="liturgia-section-card">
        <div class="liturgia-section-header">
          <h3 class="liturgia-section-title"><i class="fas fa-book-open"></i> ${data.segundaLeitura.titulo || 'Segunda Leitura'}</h3>
          <span class="liturgia-section-ref">${data.segundaLeitura.referencia || ''}</span>
        </div>
        <p class="liturgia-reading-text">${data.segundaLeitura.texto}</p>
        <div style="display:flex; justify-content: flex-end; margin-top: 8px;">
          <button class="upload-btn-secondary" style="padding: 6px 12px; font-size: 11.5px;" onclick="openBibleByRef('${(data.segundaLeitura?.referencia || '').replace(/'/g, "\\'")}')">
            <i class="fas fa-bible"></i> Ler na Bíblia
          </button>
        </div>
      </div>
    `;
  }

  // Evangelho
  html += `
    <div class="liturgia-section-card" style="border: 1px solid rgba(212, 175, 55, 0.45); background: radial-gradient(circle at top right, rgba(212, 175, 55, 0.08) 0%, var(--bg-card) 70%);">
      <div class="liturgia-section-header">
        <h3 class="liturgia-section-title" style="color: var(--gold-400);"><i class="fas fa-cross"></i> ${data.evangelho?.titulo || 'Evangelho'}</h3>
        <span class="liturgia-section-ref" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-300);">${data.evangelho?.referencia || ''}</span>
      </div>
      <p class="liturgia-reading-text" style="font-weight: 500;">${data.evangelho?.texto || ''}</p>
      <div style="display:flex; justify-content: flex-end; margin-top: 8px;">
        <button class="upload-btn-secondary" style="padding: 6px 12px; font-size: 11.5px;" onclick="openBibleByRef('${(data.evangelho?.referencia || '').replace(/'/g, "\\'")}')">
          <i class="fas fa-bible"></i> Ler Evangelho na Bíblia
        </button>
      </div>
    </div>

    <!-- Homilia Teológica do Santo Evangelho -->
    ${data.homilia ? `
    <div class="liturgia-section-card homilia-evangelho-card" style="border: 1px solid rgba(212, 175, 55, 0.45); background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.1) 0%, var(--bg-card) 75%);">
      <div class="liturgia-section-header" style="border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div>
          <h3 class="liturgia-section-title" style="color: var(--gold-400); font-family: 'Cinzel', serif; font-size: 16px; margin: 0;">
            <i class="fas fa-cross" style="color: var(--gold-400); margin-right: 6px;"></i> Homilia do Evangelho
          </h3>
          <span style="font-size: 11px; color: var(--gold-300); display: block; margin-top: 2px;">
            <i class="fas fa-church"></i> Tradição, Doutrina & Patrística Católica
          </span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="upload-btn-secondary" id="btnSpeakHomiliaLiturgia" style="padding: 5px 11px; font-size: 11.5px;" onclick="toggleSpeakHomiliaLiturgia()" title="Ouvir Homilia do Evangelho">
            <i class="fas fa-volume-up"></i> Ouvir Homilia
          </button>
          <button type="button" class="hero-share-btn" style="padding: 5px 11px; font-size: 11.5px;" onclick="shareHomiliaLiturgiaWhatsApp()" title="Compartilhar Homilia no WhatsApp">
            <i class="fab fa-whatsapp"></i> Compartilhar
          </button>
        </div>
      </div>
      <div class="homilia-content-body" style="font-size: 14.5px; line-height: 1.68; color: var(--text-primary);">
        ${data.homilia.html || `<p>${data.reflexao || ''}</p>`}
      </div>
    </div>
    ` : (data.reflexao ? `
    <div class="liturgia-section-card" style="background: rgba(0,0,0,0.18);">
      <div class="liturgia-section-header">
        <h3 class="liturgia-section-title"><i class="fas fa-cross"></i> Homilia do Evangelho</h3>
      </div>
      <p class="liturgia-reading-text" style="font-style: italic; font-size: 15.5px;">“${data.reflexao}”</p>
    </div>
    ` : '')}

    <!-- Santo do Dia -->
    ${data.santo ? `
    <div class="santo-card">
      <div class="santo-badge-tag"><i class="fas fa-halo"></i> Santo do Dia • ${data.santo.dataLegivel || ''}</div>
      <h3 class="santo-name">${data.santo.nome}</h3>
      <div class="santo-title-sub">${data.santo.titulo}</div>
      <p class="liturgia-reading-text" style="font-size: 15px;">${data.santo.resumo}</p>
      <div class="santo-oracao-box">
        <div class="santo-oracao-label"><i class="fas fa-praying-hands"></i> Oração de Intercessão:</div>
        <p class="santo-oracao-text">“${data.santo.oracao}”</p>
      </div>
      <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 14px;">
        <button class="hero-share-btn" style="padding: 8px 14px; font-size: 12px;" onclick="shareSantoWhatsApp()">
          <i class="fab fa-whatsapp"></i> Compartilhar Santo do Dia
        </button>
      </div>
    </div>
    ` : ''}
  `;

  container.innerHTML = html;
}

// Ouvir Liturgia Completa por Voz (TTS)
function stopLiturgiaSpeech() {
  isLiturgiaSpeaking = false;
  const btn = document.getElementById('btnReadLiturgia');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-volume-up"></i> Ouvir Liturgia';
    btn.style.background = '';
    btn.style.color = '';
  }
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    try { window.Capacitor.Plugins.TextToSpeech.stop(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}

window.toggleSpeakLiturgia = async function () {
  if (isLiturgiaSpeaking) {
    stopLiturgiaSpeech();
    return;
  }
  stopHomiliaLiturgiaSpeech();
  if (!currentLiturgiaData) return;

  const btn = document.getElementById('btnReadLiturgia');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-stop"></i> Parar';
    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
    btn.style.color = '#ffffff';
  }
  isLiturgiaSpeaking = true;

  const fullText = `Liturgia Diária. ${currentLiturgiaData.dataExtenso}. ${currentLiturgiaData.tempoLiturgico}. Primeira Leitura: ${currentLiturgiaData.primeiraLeitura?.referencia || ''}. ${currentLiturgiaData.primeiraLeitura?.texto || ''}. Salmo Responsorial. Refrão: ${currentLiturgiaData.salmo?.refrao || ''}. Evangelho de Nosso Senhor Jesus Cristo: ${currentLiturgiaData.evangelho?.referencia || ''}. ${currentLiturgiaData.evangelho?.texto || ''}.`;

  try {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
      await window.Capacitor.Plugins.TextToSpeech.speak({
        text: fullText,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        category: 'ambient'
      });
      stopLiturgiaSpeech();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = () => stopLiturgiaSpeech();
      utterance.onerror = () => stopLiturgiaSpeech();
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.error("Liturgia TTS Error:", e);
    stopLiturgiaSpeech();
  }
};

// Ouvir Homilia do Evangelho Separadamente (TTS)
let isHomiliaLiturgiaSpeaking = false;

function stopHomiliaLiturgiaSpeech() {
  isHomiliaLiturgiaSpeaking = false;
  const btn = document.getElementById('btnSpeakHomiliaLiturgia');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-volume-up"></i> Ouvir Homilia';
    btn.style.background = '';
    btn.style.color = '';
  }
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    try { window.Capacitor.Plugins.TextToSpeech.stop(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}

window.toggleSpeakHomiliaLiturgia = async function () {
  if (isHomiliaLiturgiaSpeaking) {
    stopHomiliaLiturgiaSpeech();
    return;
  }
  stopLiturgiaSpeech();
  if (!currentLiturgiaData || !currentLiturgiaData.homilia) return;

  const btn = document.getElementById('btnSpeakHomiliaLiturgia');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-stop"></i> Parar';
    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
    btn.style.color = '#ffffff';
  }
  isHomiliaLiturgiaSpeaking = true;

  const homilyText = `Homilia do Santo Evangelho. ${currentLiturgiaData.homilia.themeTitle || ''}.\n\n${currentLiturgiaData.homilia.textToSpeak || currentLiturgiaData.reflexao || ''}`;

  try {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
      await window.Capacitor.Plugins.TextToSpeech.speak({
        text: homilyText,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        category: 'ambient'
      });
      stopHomiliaLiturgiaSpeech();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(homilyText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = () => stopHomiliaLiturgiaSpeech();
      utterance.onerror = () => stopHomiliaLiturgiaSpeech();
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.error("Homilia TTS Error:", e);
    stopHomiliaLiturgiaSpeech();
  }
};

window.shareHomiliaLiturgiaWhatsApp = function () {
  if (!currentLiturgiaData || !currentLiturgiaData.homilia) return;
  const d = currentLiturgiaData;
  const h = d.homilia;
  let msg = `✝️ *Homilia do Evangelho — ${d.evangelho?.referencia || ''}*\n_${d.dataExtenso} • ${d.tempoLiturgico}_\n\n`;
  msg += `📖 *${h.themeTitle || 'Meditação e Doutrina Católica'}*\n\n`;
  msg += `${h.textToSpeak || d.reflexao}\n\n`;
  msg += `_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
};

window.shareLiturgiaWhatsApp = function () {
  if (!currentLiturgiaData) return;
  const d = currentLiturgiaData;
  let msg = `📅 *Liturgia Diária — ${d.dataExtenso}*\n_${d.tempoLiturgico}_\n\n`;
  if (d.primeiraLeitura) {
    msg += `📖 *1ª Leitura (${d.primeiraLeitura.referencia})*\n${d.primeiraLeitura.texto}\n\n`;
  }
  if (d.salmo) {
    msg += `🎶 *Salmo Responsorial*\n_Refrão:_ ${d.salmo.refrao}\n\n`;
  }
  if (d.evangelho) {
    msg += `✝️ *Evangelho (${d.evangelho.referencia})*\n${d.evangelho.texto}\n\n`;
  }
  if (d.homilia && d.homilia.themeTitle) {
    msg += `🕊️ *Homilia:* ${d.homilia.themeTitle}\n\n`;
  }
  if (d.santo) {
    msg += `🕊️ *Santo do Dia: ${d.santo.nome}*\n_${d.santo.oracao}_\n\n`;
  }
  msg += `_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
};

window.shareSantoWhatsApp = function () {
  if (!currentLiturgiaData || !currentLiturgiaData.santo) return;
  const s = currentLiturgiaData.santo;
  let msg = `🕊️ *Santo do Dia: ${s.nome}*\n_${s.titulo}_\n\n${s.resumo}\n\n🙏 *Oração de Intercessão:*\n“${s.oracao}”\n\n_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
};

// ==========================================================================
// CANONICAL CATHOLIC BIBLE BOOK RESOLVER & REFERENCE PARSER
// ==========================================================================
const BIBLE_BOOK_MAP = [
  // Antigo Testamento (46 livros)
  { id: 1, aliases: ['genesis', 'genese', 'gn', 'gen', 'ge'] },
  { id: 2, aliases: ['exodo', 'ex', 'êx', 'exo'] },
  { id: 3, aliases: ['levitico', 'lv', 'lev'] },
  { id: 4, aliases: ['numeros', 'nm', 'num', 'nu'] },
  { id: 5, aliases: ['deuteronomio', 'dt', 'deut', 'de'] },
  { id: 6, aliases: ['josue', 'js', 'jos'] },
  { id: 7, aliases: ['juizes', 'jz', 'juiz', 'jui'] },
  { id: 8, aliases: ['rute', 'rt', 'rut'] },
  { id: 9, aliases: ['1 samuel', '1samuel', '1sm', '1 sm', '1sam', '1 s', 'i samuel', 'isamuel', 'ism', 'i sm', '1º samuel', 'primeiro samuel'] },
  { id: 10, aliases: ['2 samuel', '2samuel', '2sm', '2 sm', '2sam', '2 s', 'ii samuel', 'iisamuel', 'iism', 'ii sm', '2º samuel', 'segundo samuel'] },
  { id: 11, aliases: ['1 reis', '1reis', '1rs', '1 rs', '1re', '1 re', 'i reis', 'ireis', 'irs', 'i rs', '1º reis', 'primeiro reis'] },
  { id: 12, aliases: ['2 reis', '2reis', '2rs', '2 rs', '2re', '2 re', 'ii reis', 'iireis', 'iirs', 'ii rs', '2º reis', 'segundo reis'] },
  { id: 13, aliases: ['1 cronicas', '1cronicas', '1cr', '1 cr', '1cro', 'i cronicas', 'icronicas', 'icr', 'i cr', '1º cronicas', 'primeiro cronicas'] },
  { id: 14, aliases: ['2 cronicas', '2cronicas', '2cr', '2 cr', '2cro', 'ii cronicas', 'iicronicas', 'iicr', 'ii cr', '2º cronicas', 'segundo cronicas'] },
  { id: 15, aliases: ['esdras', 'esd', 'ed', 'es'] },
  { id: 16, aliases: ['neemias', 'ne', 'neem'] },
  { id: 17, aliases: ['tobias', 'tb', 'tob'] },
  { id: 18, aliases: ['judite', 'jdt', 'jt', 'jud'] },
  { id: 19, aliases: ['ester', 'est', 'et'] },
  { id: 20, aliases: ['jó', 'job'] },
  { id: 21, aliases: ['salmos', 'salmo', 'sl', 'psm', 'ps'] },
  { id: 22, aliases: ['1 macabeus', '1macabeus', '1mc', '1 mc', '1mac', '1 mac', 'i macabeus', 'imacabeus', 'imc', 'i mc', '1º macabeus', 'primeiro macabeus'] },
  { id: 23, aliases: ['2 macabeus', '2macabeus', '2mc', '2 mc', '2mac', '2 mac', 'ii macabeus', 'iimacabeus', 'iimc', 'ii mc', '2º macabeus', 'segundo macabeus'] },
  { id: 24, aliases: ['proverbios', 'pr', 'prov', 'pro'] },
  { id: 25, aliases: ['eclesiastes', 'ec', 'ecl', 'qo', 'qoh'] },
  { id: 26, aliases: ['cantico dos canticos', 'canticos', 'cantico', 'ct', 'cnt', 'cant', 'can'] },
  { id: 27, aliases: ['sabedoria', 'sb', 'sab'] },
  { id: 28, aliases: ['eclesiastico', 'eclo', 'sir', 'eclasiastico'] },
  { id: 29, aliases: ['isaias', 'is', 'isa'] },
  { id: 30, aliases: ['jeremias', 'jr', 'jer'] },
  { id: 31, aliases: ['lamentacoes', 'lamentacao', 'lm', 'lam'] },
  { id: 32, aliases: ['baruc', 'baruque', 'br', 'bar'] },
  { id: 33, aliases: ['ezequiel', 'ez', 'eze'] },
  { id: 34, aliases: ['daniel', 'dn', 'dan'] },
  { id: 35, aliases: ['oseias', 'oséias', 'os', 'ose'] },
  { id: 36, aliases: ['joel', 'jl', 'joe'] },
  { id: 37, aliases: ['amos', 'amós', 'am'] },
  { id: 38, aliases: ['abdias', 'ab', 'abd', 'ob'] },
  { id: 39, aliases: ['jonas', 'jn', 'jon'] },
  { id: 40, aliases: ['miqueias', 'miquéias', 'mq', 'miq', 'mic'] },
  { id: 41, aliases: ['naum', 'na', 'nah'] },
  { id: 42, aliases: ['habacuc', 'habacuque', 'hab', 'hc'] },
  { id: 43, aliases: ['sofonias', 'sf', 'sof'] },
  { id: 44, aliases: ['ageu', 'ag', 'hag'] },
  { id: 45, aliases: ['zacarias', 'zc', 'zac'] },
  { id: 46, aliases: ['malaquias', 'ml', 'mal'] },

  // Novo Testamento (27 livros)
  { id: 47, aliases: ['sao mateus', 'mateus', 'mt', 'mat', 's. mateus', 'evangelho de mateus', 'evangelho de sao mateus'] },
  { id: 48, aliases: ['sao marcos', 'marcos', 'mc', 'mar', 's. marcos', 'evangelho de marcos', 'evangelho de sao marcos'] },
  { id: 49, aliases: ['sao lucas', 'lucas', 'lc', 'luc', 's. lucas', 'evangelho de lucas', 'evangelho de sao lucas'] },
  { id: 50, aliases: ['sao joao', 'joao', 'jo', 'joh', 's. joao', 'evangelho de joao', 'evangelho de sao joao'] },
  { id: 51, aliases: ['atos dos apostolos', 'atos', 'at', 'act'] },
  { id: 52, aliases: ['romanos', 'rm', 'rom', 'ro'] },
  { id: 53, aliases: ['1 corintios', '1corintios', '1cor', '1 cor', '1co', '1 co', 'i corintios', 'icorintios', 'icor', 'i cor', '1º corintios', 'primeiro corintios'] },
  { id: 54, aliases: ['2 corintios', '2corintios', '2cor', '2 cor', '2co', '2 co', 'ii corintios', 'iicorintios', 'iicor', 'ii cor', '2º corintios', 'segundo corintios'] },
  { id: 55, aliases: ['galatas', 'gl', 'gal'] },
  { id: 56, aliases: ['efesios', 'ef', 'efe', 'ep'] },
  { id: 57, aliases: ['filipenses', 'fl', 'flp', 'fp', 'fil'] },
  { id: 58, aliases: ['colossenses', 'cl', 'col'] },
  { id: 59, aliases: ['1 tessalonicenses', '1tessalonicenses', '1ts', '1 ts', '1tes', '1 tes', 'i tessalonicenses', 'itessalonicenses', 'its', 'i ts', '1º tessalonicenses', 'primeiro tessalonicenses'] },
  { id: 60, aliases: ['2 tessalonicenses', '2tessalonicenses', '2ts', '2 ts', '2tes', '2 tes', 'ii tessalonicenses', 'iitessalonicenses', 'iits', 'ii ts', '2º tessalonicenses', 'segundo tessalonicenses'] },
  { id: 61, aliases: ['1 timoteo', '1timoteo', '1tm', '1 tm', '1ti', '1 ti', 'i timoteo', 'itimoteo', 'itm', 'i tm', '1º timoteo', 'primeiro timoteo'] },
  { id: 62, aliases: ['2 timoteo', '2timoteo', '2tm', '2 tm', '2ti', '2 ti', 'ii timoteo', 'iitimoteo', 'iitm', 'ii tm', '2º timoteo', 'segundo timoteo'] },
  { id: 63, aliases: ['tito', 'tt', 'tit'] },
  { id: 64, aliases: ['filemon', 'filêmon', 'fm', 'flm', 'phm'] },
  { id: 65, aliases: ['hebreus', 'hb', 'heb'] },
  { id: 66, aliases: ['sao tiago', 'tiago', 'tg', 'tia', 's. tiago', 'epistola de tiago'] },
  { id: 67, aliases: ['1 pedro', '1pedro', '1pd', '1 pd', '1pe', '1 pe', '1p', '1 p', '1 sao pedro', '1sao pedro', 'i pedro', 'ipedro', 'ipd', 'i pd', 'ipe', 'i pe', 'i sao pedro', 'isao pedro', '1º pedro', 'primeiro pedro'] },
  { id: 68, aliases: ['2 pedro', '2pedro', '2pd', '2 pd', '2pe', '2 pe', '2p', '2 p', '2 sao pedro', '2sao pedro', 'ii pedro', 'iipedro', 'iipd', 'ii pd', 'iipe', 'ii pe', 'ii sao pedro', 'iisao pedro', '2º pedro', 'segundo pedro'] },
  { id: 69, aliases: ['1 joao', '1joao', '1jo', '1 jo', '1j', '1 j', '1 sao joao', '1sao joao', 'i joao', 'ijoao', 'ijo', 'i jo', 'i sao joao', 'isao joao', '1º joao', 'primeiro joao'] },
  { id: 70, aliases: ['2 joao', '2joao', '2jo', '2 jo', '2j', '2 j', '2 sao joao', '2sao joao', 'ii joao', 'iijoao', 'iijo', 'ii jo', 'ii sao joao', 'iisao joao', '2º joao', 'segundo joao'] },
  { id: 71, aliases: ['3 joao', '3joao', '3jo', '3 jo', '3j', '3 j', '3 sao joao', '3sao joao', 'iii joao', 'iiijoao', 'iiijo', 'iii jo', 'iii sao joao', 'iiisao joao', '3º joao', 'terceiro joao'] },
  { id: 72, aliases: ['sao judas', 'judas', 'jd', 'jud', 's. judas', 'epistola de judas'] },
  { id: 73, aliases: ['apocalipse', 'ap', 'apoc', 'apc', 'rev'] }
];

function normalizeBibleStr(s) {
  return (s || '')
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function findBiblicalBook(rawQuery) {
  if (!rawQuery) return null;
  const trimmed = rawQuery.trim();
  const lower = trimmed.toLowerCase();

  // Desambiguação explícita de Jó vs João
  if (lower === 'jó' || lower === 'job') {
    return allBooks.find(b => b.id_livro === 20) || null;
  }
  if (lower === 'jo' || lower === 'joao' || lower === 'joão') {
    return allBooks.find(b => b.id_livro === 50) || null;
  }

  // Desambiguação explícita de Judas vs Judite
  if (lower === 'jd') {
    return allBooks.find(b => b.id_livro === 72) || null; // São Judas
  }
  if (lower === 'jdt' || lower === 'jt') {
    return allBooks.find(b => b.id_livro === 18) || null; // Judite
  }

  const cleanQ = normalizeBibleStr(trimmed);

  // 1. Busca exata pelos aliases mapeados
  for (const item of BIBLE_BOOK_MAP) {
    for (const al of item.aliases) {
      if (normalizeBibleStr(al) === cleanQ) {
        return allBooks.find(b => b.id_livro === item.id) || null;
      }
    }
  }

  // 2. Busca exata pelo nome do livro no banco
  for (const b of allBooks) {
    if (normalizeBibleStr(b.nome_livro) === cleanQ) {
      return b;
    }
  }

  // 3. Busca por correspondência de prefixo
  for (const item of BIBLE_BOOK_MAP) {
    for (const al of item.aliases) {
      const na = normalizeBibleStr(al);
      if (na.length >= 2 && (cleanQ === na || cleanQ.startsWith(na) || na.startsWith(cleanQ))) {
        return allBooks.find(b => b.id_livro === item.id) || null;
      }
    }
  }

  // 4. Busca parcial no nome do banco
  for (const b of allBooks) {
    const nb = normalizeBibleStr(b.nome_livro);
    if (nb.includes(cleanQ) || cleanQ.includes(nb)) {
      return b;
    }
  }

  return null;
}

function parseVerseNumbers(versePart) {
  if (!versePart) return [];
  // Considera a primeira cláusula antes de ponto-e-vírgula caso haja múltiplos capítulos
  const clause = versePart.split(';')[0].trim();
  const tokens = clause.split(/[\.\s,]+/).filter(Boolean);
  const verses = new Set();
  
  tokens.forEach(tok => {
    // Trata intervalos como 1-5, 20-23, 5b-14 ou 7-12a
    const rangeMatch = tok.match(/^(\d+)[a-z]?-(\d+)[a-z]?$/i);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      for (let i = start; i <= end; i++) verses.add(i);
    } else {
      const singleMatch = tok.match(/^(\d+)[a-z]?$/i);
      if (singleMatch) {
        verses.add(parseInt(singleMatch[1], 10));
      }
    }
  });

  return Array.from(verses).sort((a, b) => a - b);
}

function parseBiblicalRef(refStr) {
  if (!refStr || typeof refStr !== 'string') return null;

  // 1. Remove notas litúrgicas de resposta como (R. 11), (R. 1a) ou (ou ...)
  let clean = refStr.replace(/\(\s*r\.?\s*\d+[^)]*\)/gi, '').trim();
  clean = clean.replace(/\(\s*ou\s+[^)]+\)/gi, '').trim();

  // 2. Trata numeração dupla de Salmos: "Sl 90(91)" -> "Sl 90"
  clean = clean.replace(/(\d+)\s*\(\s*\d+\s*\)/g, (m, p1) => p1);

  // 3. Captura Livro, Capítulo e Versículos
  // Ex: "Êx 23, 20-23" -> Book: "Êx", Cap: 23, VersesPart: "20-23"
  // Ex: "Mt 18, 1-5. 10" -> Book: "Mt", Cap: 18, VersesPart: "1-5. 10"
  const regex = /^([1-3iI]{0,3}\s*[a-zA-ZÀ-ÿ\.\s]+?)\s*(\d+)(?:[,\s:]+([\d\w\s\.\-;]+))?/;
  const match = clean.match(regex);

  if (match) {
    const rawBook = match[1].trim();
    const cap = parseInt(match[2], 10) || 1;
    const versePart = match[3] ? match[3].trim() : '';
    const verseList = parseVerseNumbers(versePart);
    const startVer = verseList.length > 0 ? verseList[0] : 1;
    const endVer = verseList.length > 0 ? verseList[verseList.length - 1] : null;

    return { rawBook, cap, verseList, startVer, endVer, cleanRef: clean };
  }

  // 4. Fallback para livros de capítulo único (ex: Fm 9-10, Jd 17-25)
  const singleCapRegex = /^([1-3iI]{0,3}\s*[a-zA-ZÀ-ÿ\.\s]+?)\s*(\d+)/;
  const singleMatch = clean.match(singleCapRegex);
  if (singleMatch) {
    const rawBook = singleMatch[1].trim();
    const num = parseInt(singleMatch[2], 10) || 1;
    return { rawBook, cap: 1, verseList: [num], startVer: num, endVer: num, cleanRef: clean };
  }

  return null;
}

// Abrir livro e capítulo diretamente pela referência da leitura litúrgica com áudio e destaque contínuo
window.openBibleByRef = async function (refStr) {
  if (!refStr) return;

  // Garante que a lista de livros esteja carregada
  if (!allBooks || !allBooks.length) {
    try {
      allBooks = await db.getLivros() || [];
    } catch (e) {
      console.warn('[openBibleByRef] Erro ao carregar livros:', e);
    }
  }

  const parsed = parseBiblicalRef(refStr);
  if (!parsed) {
    showToast(`Referência bíblica: ${refStr}`);
    return;
  }

  const targetBook = findBiblicalBook(parsed.rawBook);
  if (targetBook) {
    const cap = Math.max(1, Math.min(targetBook.total_capitulos, parsed.cap));
    console.log(`[openBibleByRef] Abrindo ${targetBook.nome_livro} capítulo ${cap} (ref: ${refStr})`);
    
    // Abre diretamente o livro e o capítulo correto
    await openBook(targetBook.id_livro, targetBook.nome_livro, targetBook.total_capitulos, cap);
    
    const rangeLabel = (parsed.verseList && parsed.verseList.length > 0)
      ? `${parsed.verseList[0]}${parsed.verseList.length > 1 ? '-' + parsed.verseList[parsed.verseList.length - 1] : ''}`
      : `${parsed.startVer}`;

    showToast(`🔊 Lendo ${targetBook.nome_livro} ${cap}, ${rangeLabel}...`);

    // Inicia a leitura sequencial em áudio percorrendo versículo por versículo até o final da passagem
    setTimeout(() => {
      readVersesRange(parsed.verseList);
    }, 350);
  } else {
    console.warn(`[openBibleByRef] Livro não reconhecido para "${parsed.rawBook}" (ref: ${refStr})`);
    showToast(`Livro não localizado: ${refStr}`);
  }
};

// ==========================================================================
// SANTO ROSÁRIO & TERÇO INTERATIVO
// ==========================================================================
let currentRosarioState = null;
let currentRosarioStepIndex = 0;
let isRosarioSpeaking = false;
let liveCommunityCount = 2840;

window.showRosario = function (misterioKey = null) {
  showView('rosarioView');
  initRosary(misterioKey);
};

function initRosary(misterioKey = null) {
  currentRosarioState = buildRosarySteps(misterioKey);
  currentRosarioStepIndex = 0;

  // Update tabs
  document.querySelectorAll('#rosarioTabs .rosario-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.misterio === currentRosarioState.misterio.id);
  });

  // Randomize subtle realistic live community prayer count
  liveCommunityCount = Math.floor(2700 + Math.random() * 350);
  updateRosarioLiveCounter();

  // Render bead tracker and current step
  renderRosarioStep();
}

window.switchRosarioMisterio = function (misterioKey) {
  initRosary(misterioKey);
  showToast(`Mistérios ${MISTERIOS_DATA[misterioKey].nome} selecionados`);
};

function updateRosarioLiveCounter() {
  const el = document.getElementById('rosarioLiveCountText');
  if (el) {
    el.innerHTML = `<i class="fas fa-praying-hands" style="color: var(--gold-400);"></i> <strong>${liveCommunityCount.toLocaleString('pt-BR')} fiéis</strong> rezando este Santo Terço em comunhão com você agora`;
  }
}

function renderRosarioStep() {
  if (!currentRosarioState || !currentRosarioState.steps) return;

  const step = currentRosarioState.steps[currentRosarioStepIndex];
  const total = currentRosarioState.totalSteps;
  const pct = Math.round(((currentRosarioStepIndex + 1) / total) * 100);

  const badgeEl = document.getElementById('rosarioStepBadge');
  const counterEl = document.getElementById('rosarioStepCounter');
  const barEl = document.getElementById('rosarioProgressBar');
  const titleEl = document.getElementById('rosarioPrayerTitle');
  const subEl = document.getElementById('rosarioPrayerSub');
  const textEl = document.getElementById('rosarioPrayerText');
  const medBox = document.getElementById('rosarioMeditationBox');
  const scriptRefEl = document.getElementById('rosarioScriptureRef');
  const medTextEl = document.getElementById('rosarioMeditationText');
  const prevBtn = document.getElementById('btnPrevStep');
  const nextBtn = document.getElementById('btnNextStep');

  if (badgeEl) badgeEl.textContent = step.progressLabel || 'Oração';
  if (counterEl) counterEl.textContent = `Passo ${currentRosarioStepIndex + 1} de ${total}`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (titleEl) titleEl.textContent = step.titulo;
  if (subEl) subEl.textContent = step.subtitulo;
  if (textEl) textEl.textContent = step.oracao;

  if (step.passagem && step.type === 'misterioAnuncio') {
    if (medBox) medBox.classList.remove('hidden');
    if (scriptRefEl) scriptRefEl.textContent = step.passagem;
    if (medTextEl) medTextEl.textContent = step.oracao;
  } else {
    if (medBox) medBox.classList.add('hidden');
  }

  if (prevBtn) prevBtn.disabled = currentRosarioStepIndex === 0;
  if (nextBtn) {
    if (currentRosarioStepIndex >= total - 1) {
      nextBtn.innerHTML = '<i class="fas fa-check-circle"></i> Concluir Terço';
    } else {
      nextBtn.innerHTML = 'Avançar Conta <i class="fas fa-chevron-right"></i>';
    }
  }

  renderRosarioBeadChain();
}

function renderRosarioBeadChain() {
  const container = document.getElementById('rosarioBeadsChain');
  if (!container || !currentRosarioState) return;

  const steps = currentRosarioState.steps;
  let html = '';
  steps.forEach((s, idx) => {
    const isCompleted = idx < currentRosarioStepIndex;
    const isCurrent = idx === currentRosarioStepIndex;
    const isPater = s.type === 'paiNosso' || s.type === 'paiNossoDezena' || s.type === 'misterioAnuncio';

    html += `<span class="rosario-bead-dot ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isPater ? 'pater' : ''}" 
                   title="${s.progressLabel}" 
                   onclick="jumpToRosarioStep(${idx})"></span>`;
  });
  container.innerHTML = html;
}

window.nextRosarioStep = function () {
  if (!currentRosarioState) return;

  // Haptic feedback for tactile prayer experience on mobile devices
  if (navigator?.vibrate) {
    try { navigator.vibrate(25); } catch (e) {}
  }

  if (currentRosarioStepIndex < currentRosarioState.totalSteps - 1) {
    currentRosarioStepIndex++;
    renderRosarioStep();
    if (isRosarioSpeaking) {
      speakCurrentRosarioStep();
    }
  } else {
    showToast('🙏 Terço concluído com as bênçãos de Deus e Nossa Senhora!');
    showRosaryCompletedModal();
  }
};

window.prevRosarioStep = function () {
  if (currentRosarioStepIndex > 0) {
    currentRosarioStepIndex--;
    renderRosarioStep();
    if (isRosarioSpeaking) {
      speakCurrentRosarioStep();
    }
  }
};

window.jumpToRosarioStep = function (idx) {
  if (!currentRosarioState || idx < 0 || idx >= currentRosarioState.totalSteps) return;
  currentRosarioStepIndex = idx;
  renderRosarioStep();
  if (isRosarioSpeaking) {
    speakCurrentRosarioStep();
  }
};

window.restartRosary = function () {
  if (confirm('Deseja reiniciar a oração do Terço desde o início?')) {
    initRosary(currentRosarioState?.misterio?.id);
    showToast('Terço reiniciado.');
  }
};

function stopRosarioSpeech() {
  isRosarioSpeaking = false;
  const btn = document.getElementById('btnReadRosarioStep');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-volume-up"></i> Ouvir Oração';
    btn.style.background = '';
    btn.style.color = '';
  }
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    try { window.Capacitor.Plugins.TextToSpeech.stop(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}

async function speakCurrentRosarioStep() {
  if (!currentRosarioState) return;
  const step = currentRosarioState.steps[currentRosarioStepIndex];
  const textToRead = `${step.titulo}. ${step.oracao}`;

  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    try {
      await window.Capacitor.Plugins.TextToSpeech.speak({
        text: textToRead,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        category: 'ambient'
      });
    } catch (e) {}
  } else if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
}

window.toggleSpeakRosarioStep = function () {
  if (isRosarioSpeaking) {
    stopRosarioSpeech();
    return;
  }
  isRosarioSpeaking = true;
  const btn = document.getElementById('btnReadRosarioStep');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-stop"></i> Parar';
    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
    btn.style.color = '#ffffff';
  }
  speakCurrentRosarioStep();
};

window.shareRosarioWhatsApp = function () {
  if (!currentRosarioState) return;
  const m = currentRosarioState.misterio;
  const msg = `📿 *Santo Rosário & Terço Católico*\n_${m.nome} (${m.diasTexto})_\n\n“${m.descricao}”\n\nEstou rezando o Santo Terço na Bíblia Sagrada Católica. Reze você também e sinta a paz de Nossa Senhora!\n\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
};

function showRosaryCompletedModal() {
  const m = currentRosarioState?.misterio?.nome || 'Santo Rosário';
  showToast(`🎉 Você concluiu a oração dos ${m}! Que Deus te abençoe! 🙏`);

  // Convite fraterno pós-oração: após concluir o Terço, convida suavemente a apoiar o projeto (se não viu hoje)
  setTimeout(async () => {
    try {
      const disabled = await isDonatePopupDisabledByAdmin();
      if (disabled) return;
      const resDonated = await Preferences.get({ key: 'biblia_already_donated' });
      if (resDonated && (resDonated.value === 'true' || resDonated.value === true)) return;
      const seenToday = await hasAlreadySeenDonateToday();
      if (!seenToday) {
        showDonateModal();
      }
    } catch (e) {}
  }, 2500);
}

// ==========================================================================
// MURAL DE INTENÇÕES: "ACENDA UMA VELA VIRTUAL"
// ==========================================================================
let allVelasList = [];
let currentVelasCategory = 'todos';
let velasRezadasCache = [];

window.showVelas = async function () {
  showView('velasView');
  await loadVelasData(true);
};

async function loadVelasData(forceRefresh = false) {
  const grid = document.getElementById('velasGrid');
  const statVelasEl = document.getElementById('statVelasAcesas');
  const statOracoesEl = document.getElementById('statTotalOracoes');

  if (!grid) return;

  if (grid.dataset.loaded && !forceRefresh && allVelasList.length > 0) {
    return;
  }

  grid.innerHTML = '<div class="loading" style="grid-column: 1 / -1; padding: 60px;"><div class="loading-spinner"></div></div>';

  try {
    const [velas, rezadas] = await Promise.all([
      getVelasOracao(),
      getVelasRezadasLocal()
    ]);

    allVelasList = velas || [];
    velasRezadasCache = rezadas || [];

    // Calculate community stats
    const totalAcesas = allVelasList.length;
    const totalOracoes = allVelasList.reduce((acc, v) => acc + (parseInt(v.oracoesCount) || 0), 0);

    if (statVelasEl) statVelasEl.textContent = totalAcesas.toLocaleString('pt-BR');
    if (statOracoesEl) statOracoesEl.textContent = totalOracoes.toLocaleString('pt-BR');

    renderVelasGrid();
    grid.dataset.loaded = '1';
  } catch (err) {
    console.error('[Velas] Erro ao carregar velas de oração:', err);
    grid.innerHTML = `<div class="gallery-empty-state" style="grid-column: 1 / -1;">
      <i class="fas fa-exclamation-triangle" style="font-size: 32px; color: #ef4444; margin-bottom: 12px;"></i>
      <h3 style="font-size: 16px; margin-bottom: 6px;">Não foi possível carregar o mural</h3>
      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">Verifique sua conexão e tente novamente.</p>
      <button class="hero-donate-btn" onclick="loadVelasData(true)"><i class="fas fa-redo"></i> Recarregar</button>
    </div>`;
  }
}

function renderVelasGrid() {
  const grid = document.getElementById('velasGrid');
  if (!grid) return;

  let list = allVelasList;
  if (currentVelasCategory && currentVelasCategory !== 'todos') {
    list = allVelasList.filter(v => v.categoria === currentVelasCategory);
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="gallery-empty-state" style="grid-column: 1 / -1; padding: 50px 20px;">
        <i class="fas fa-fire" style="font-size: 36px; color: var(--gold-400); margin-bottom: 12px;"></i>
        <h3 style="font-size: 17px; margin-bottom: 6px; font-family: var(--font-display);">Nenhuma vela nesta categoria</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Seja o primeiro a acender uma vela e partilhar sua intenção de oração!</p>
        <button class="hero-donate-btn pulse-animation" onclick="openAcenderVelaModal()"><i class="fas fa-fire"></i> Acender Primeira Vela</button>
      </div>`;
    return;
  }

  let html = '';
  list.forEach(v => {
    const catInfo = VELAS_CATEGORIAS[v.categoria] || VELAS_CATEGORIAS.graca;
    const isRezado = velasRezadasCache.includes(v.id);
    const statusTxt = formatarStatusVela(v.dataCriacao);
    const count = parseInt(v.oracoesCount) || 0;
    const autor = v.autor || 'Anônimo';
    const local = v.cidade ? ` • ${v.cidade}` : '';

    html += `
      <div class="vela-card" id="card_${v.id}">
        <div>
          <div class="vela-top-bar">
            <span class="vela-cat-tag" style="color: ${catInfo.color || 'var(--gold-400)'};">
              <i class="fas ${catInfo.icon}"></i> ${catInfo.label}
            </span>
            <span class="vela-status-tag"><i class="far fa-clock"></i> ${statusTxt}</span>
          </div>

          <!-- Realistic Animated Candle Flame -->
          <div class="candle-visual-wrapper">
            <div class="candle-aura"></div>
            <div class="candle-flame">
              <div class="candle-flame-inner"></div>
            </div>
            <div class="candle-wick"></div>
            <div class="candle-pillar">
              <div class="candle-wax-melt"></div>
            </div>
          </div>

          <div class="vela-intencao-box">
            <p class="vela-intencao-text">“${v.intencao}”</p>
          </div>
        </div>

        <div>
          <div class="vela-meta-info">
            <span class="vela-autor"><i class="fas fa-user-circle"></i> ${autor}${local}</span>
            <span id="count_txt_${v.id}" style="color: ${isRezado ? '#22c55e' : 'var(--text-muted)'}; font-weight: 600;">
              <i class="fas fa-praying-hands"></i> ${count} ${count === 1 ? 'oração' : 'orações'}
            </span>
          </div>

          <div class="vela-actions">
            <button class="vela-btn-interceder ${isRezado ? 'rezado' : ''}" 
                    id="btn_rezar_${v.id}"
                    onclick="intercederPorVela(event, '${v.id}', ${count})">
              <i class="fas fa-hands-praying"></i> <span>${isRezado ? 'Rezei 🙏' : 'Rezei por você 🙏'}</span>
            </button>
            <button class="vela-btn-share" 
                    title="Compartilhar no WhatsApp" 
                    onclick="shareVelaWhatsApp(event, '${v.id}')">
              <i class="fab fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>`;
  });

  grid.innerHTML = html;
}

window.filterVelasCategoria = function (cat, btn) {
  currentVelasCategory = cat;
  document.querySelectorAll('#velasCategoryTabs .velas-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderVelasGrid();
};

window.openAcenderVelaModal = function () {
  const modal = document.getElementById('acenderVelaModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const input = document.getElementById('velaIntencaoInput');
      if (input) input.focus();
    }, 100);
  }
};

window.closeAcenderVelaModal = function () {
  const modal = document.getElementById('acenderVelaModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

window.handleAcenderVelaSubmit = async function (e) {
  if (e) e.preventDefault();

  const nome = document.getElementById('velaNomeInput')?.value || '';
  const cidade = document.getElementById('velaCidadeInput')?.value || '';
  const categoria = document.getElementById('velaCategoriaSelect')?.value || 'graca';
  const intencao = document.getElementById('velaIntencaoInput')?.value || '';

  if (!intencao.trim()) {
    showToast('Por favor, escreva sua intenção de oração.');
    return;
  }

  const submitBtn = document.getElementById('btnSubmitVela');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Acendendo Vela...';
  }

  try {
    const nova = await acenderNovaVela({
      autor: nome,
      cidade: cidade,
      categoria: categoria,
      intencao: intencao
    });

    closeAcenderVelaModal();
    // Clear form
    const form = document.getElementById('acenderVelaForm');
    if (form) form.reset();

    showToast('🔥 Sua vela virtual foi acesa! Que Deus abençoe sua intenção.');
    await loadVelasData(true);
  } catch (err) {
    console.error('[Velas] Erro ao acender vela:', err);
    showToast('Erro ao acender vela. Tente novamente.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-fire"></i> Acender Vela Sagrada';
    }
  }
};

window.intercederPorVela = async function (e, id, currentCount) {
  if (e) e.stopPropagation();

  if (velasRezadasCache.includes(id)) {
    showToast('Você já se uniu em oração por esta intenção 🙏');
    return;
  }

  // Instant optimistic UI update
  velasRezadasCache.push(id);
  const newCount = currentCount + 1;

  const btn = document.getElementById(`btn_rezar_${id}`);
  if (btn) {
    btn.classList.add('rezado');
    btn.innerHTML = '<i class="fas fa-hands-praying"></i> <span>Rezei 🙏</span>';
  }

  const countTxt = document.getElementById(`count_txt_${id}`);
  if (countTxt) {
    countTxt.style.color = '#22c55e';
    countTxt.innerHTML = `<i class="fas fa-praying-hands"></i> ${newCount} ${newCount === 1 ? 'oração' : 'orações'}`;
  }

  // Update total prayers stat
  const statOracoesEl = document.getElementById('statTotalOracoes');
  if (statOracoesEl) {
    const curVal = parseInt(statOracoesEl.textContent.replace(/\./g, '')) || 0;
    statOracoesEl.textContent = (curVal + 1).toLocaleString('pt-BR');
  }

  showToast('🙏 Oração registrada! Que Deus ouça esta intercessão.');

  // Sync with cloud
  try {
    await rezarPorVela(id, currentCount);
  } catch (err) {
    console.warn('[Velas] Erro ao sincronizar prece:', err);
  }
};

window.shareVelaWhatsApp = function (e, id) {
  if (e) e.stopPropagation();
  const vela = allVelasList.find(v => v.id === id);
  if (!vela) return;

  const catInfo = VELAS_CATEGORIAS[vela.categoria] || VELAS_CATEGORIAS.graca;
  const autor = vela.autor || 'Anônimo';
  const local = vela.cidade ? ` (${vela.cidade})` : '';

  let msg = `🔥 *Vela Virtual Acesa no Mural de Intenções*\n`;
  msg += `🙏 *Prece de:* ${autor}${local}\n`;
  msg += `✨ *Intenção (${catInfo.label}):*\n“${vela.intencao}”\n\n`;
  msg += `Una-se em oração e clique em "Rezei por você 🙏" no aplicativo da Bíblia Sagrada Católica:\n`;
  msg += `https://bibliasagradaavemaria.com.br`;

  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
};


// ==========================================================================
// IA TEOLÓGICA CATÓLICA: DOUTORES DA IGREJA & MAGISTÉRIO
// ==========================================================================
let currentTeologiaPersona = 'santo_tomas';
let lastTeologiaResponseText = '';
let isTeologiaSpeaking = false;

window.showTeologia = function () {
  showView('teologiaView');
  initTeologiaUI();
};

function initTeologiaUI() {
  const tabsContainer = document.getElementById('teologiaPersonaTabs');
  const chipsContainer = document.getElementById('teologiaPromptChips');

  if (tabsContainer && tabsContainer.children.length === 0) {
    let tabsHtml = '';
    DOUTORES_PERSONAS.forEach(p => {
      const isActive = p.id === currentTeologiaPersona;
      tabsHtml += `
        <button class="teologia-persona-btn ${isActive ? 'active' : ''}" 
                id="persona_tab_${p.id}"
                onclick="selectTeologiaPersona('${p.id}')">
          <i class="fas ${p.icone}" style="color: ${p.cor};"></i>
          <span>${p.nome}</span>
        </button>`;
    });
    tabsContainer.innerHTML = tabsHtml;
  }

  if (chipsContainer && chipsContainer.children.length === 0) {
    let chipsHtml = '';
    TEOLOGIA_PROMPT_SUGESTOES.forEach(s => {
      chipsHtml += `
        <button class="teologia-chip" onclick="askTeologiaQuickPrompt('${s.pergunta.replace(/'/g, "\\'")}')">
          ${s.titulo}
        </button>`;
    });
    chipsContainer.innerHTML = chipsHtml;
  }

  updateTeologiaPersonaBanner();
}

function updateTeologiaPersonaBanner() {
  const p = DOUTORES_PERSONAS.find(item => item.id === currentTeologiaPersona) || DOUTORES_PERSONAS[0];

  const iconEl = document.getElementById('personaAvatarIcon');
  const nameEl = document.getElementById('personaBannerName');
  const titleEl = document.getElementById('personaBannerTitle');
  const badgeEl = document.getElementById('personaBannerBadge');
  const saudacaoEl = document.getElementById('personaBannerSaudacao');

  if (iconEl) iconEl.className = `fas ${p.icone}`;
  if (nameEl) nameEl.textContent = p.nome;
  if (titleEl) titleEl.textContent = p.avatarDesc;
  if (badgeEl) badgeEl.textContent = p.titulo;
  if (saudacaoEl) saudacaoEl.textContent = `“${p.saudacao}”`;

  // Update tabs
  document.querySelectorAll('.teologia-persona-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `persona_tab_${p.id}`);
  });
}

window.selectTeologiaPersona = function (personaId) {
  currentTeologiaPersona = personaId;
  updateTeologiaPersonaBanner();
  const p = DOUTORES_PERSONAS.find(item => item.id === personaId);
  if (p) {
    showToast(`Doutor selecionado: ${p.nome}`);
  }
};

window.askTeologiaQuickPrompt = function (pergunta) {
  const input = document.getElementById('teologiaInput');
  if (input) {
    input.value = pergunta;
    handleTeologiaSubmit();
  }
};

window.handleTeologiaSubmit = async function (e) {
  if (e) e.preventDefault();
  const input = document.getElementById('teologiaInput');
  const pergunta = input ? input.value.trim() : '';

  if (!pergunta) {
    showToast('Por favor, digite sua pergunta teológica.');
    return;
  }

  const container = document.getElementById('teologiaResponseContainer');
  const submitBtn = document.getElementById('btnSubmitTeologia');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  }

  // Render question and loading indicator
  if (container) {
    container.innerHTML = `
      <div style="margin-bottom: 18px; padding: 12px 16px; background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold-400); border-radius: 0 12px 12px 0;">
        <span style="font-size: 11.5px; font-weight: 700; color: var(--gold-400); text-transform: uppercase;"><i class="fas fa-question-circle"></i> Sua Pergunta:</span>
        <p style="margin: 4px 0 0; font-size: 14.5px; font-weight: 600; color: var(--text-primary);">“${pergunta}”</p>
      </div>

      <div style="text-align: center; padding: 30px 20px;">
        <div class="ai-spinner-ring" style="width: 48px; height: 48px; margin: 0 auto 12px;"></div>
        <p style="font-family: var(--font-display); font-size: 15px; color: var(--gold-300); margin-bottom: 4px;">Consultando a Tradição Católica & Doutores da Igreja...</p>
        <span style="font-size: 12px; color: var(--text-muted);">Buscando ensinamentos na Sagrada Escritura, no Magistério e no CIC</span>
      </div>`;
  }

  try {
    const res = await consultarIaTeologica({
      pergunta: pergunta,
      personaId: currentTeologiaPersona
    });

    const markdownText = res.resposta;
    lastTeologiaResponseText = markdownText;

    // Convert basic markdown to rich HTML
    const formattedHtml = formatTeologiaMarkdown(markdownText);

    if (container) {
      container.innerHTML = `
        <div style="margin-bottom: 18px; padding: 12px 16px; background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold-400); border-radius: 0 12px 12px 0;">
          <span style="font-size: 11.5px; font-weight: 700; color: var(--gold-400); text-transform: uppercase;"><i class="fas fa-question-circle"></i> Sua Pergunta:</span>
          <p style="margin: 4px 0 0; font-size: 14.5px; font-weight: 600; color: var(--text-primary);">“${pergunta}”</p>
        </div>

        <div class="teologia-answer-box" style="animation: modalEnter 0.3s ease;">
          ${formattedHtml}
        </div>

        <div style="display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end;">
          <button class="upload-btn-secondary" onclick="shareTeologiaWhatsApp('${pergunta.replace(/'/g, "\\'")}')" style="font-size: 12.5px; padding: 8px 14px;">
            <i class="fab fa-whatsapp" style="color: #22c55e;"></i> Compartilhar no WhatsApp
          </button>
        </div>`;
    }

    if (input) input.value = '';
  } catch (err) {
    console.error('[Teologia] Erro:', err);
    if (container) {
      container.innerHTML = `<p style="color: #ef4444; text-align: center; padding: 30px;">Não foi possível obter a resposta teológica no momento. Tente novamente.</p>`;
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
  }
};

function formatTeologiaMarkdown(md) {
  if (!md) return '';
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/^\s*\-\s(.*$)/gim, '<li>$1</li>')
    .replace(/^\s*\d\.\s(.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/g, '<br><br>');

  return html;
}

window.explicarCapituloTeologia = async function () {
  if (!currentBook) return;
  showTeologia();

  const container = document.getElementById('teologiaResponseContainer');
  const nome = currentBook.nome;
  const cap = currentChapter;

  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div class="ai-spinner-ring" style="width: 48px; height: 48px; margin: 0 auto 12px;"></div>
        <p style="font-family: var(--font-display); font-size: 16px; color: var(--gold-300); margin-bottom: 4px;">Explicando ${nome} Capítulo ${cap} segundo a Tradição Católica...</p>
        <span style="font-size: 12px; color: var(--text-muted);">Consultando Doutores da Igreja, Sentido Espiritual e Magistério</span>
      </div>`;
  }

  try {
    const res = await consultarIaTeologica({
      livro: nome,
      capitulo: cap,
      personaId: currentTeologiaPersona
    });

    lastTeologiaResponseText = res.resposta;
    const formattedHtml = formatTeologiaMarkdown(res.resposta);

    if (container) {
      container.innerHTML = `
        <div style="margin-bottom: 18px; padding: 12px 16px; background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold-400); border-radius: 0 12px 12px 0;">
          <span style="font-size: 11.5px; font-weight: 700; color: var(--gold-400); text-transform: uppercase;"><i class="fas fa-book-bible"></i> Estudo Bíblico Católico:</span>
          <h3 style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: var(--gold-300);">${nome} — Capítulo ${cap}</h3>
        </div>
        <div class="teologia-answer-box" style="animation: modalEnter 0.3s ease;">
          ${formattedHtml}
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end;">
          <button class="upload-btn-secondary" onclick="shareTeologiaWhatsApp('Explicação de ${nome} ${cap}')" style="font-size: 12.5px; padding: 8px 14px;">
            <i class="fab fa-whatsapp" style="color: #22c55e;"></i> WhatsApp
          </button>
        </div>`;
    }
  } catch (err) {
    if (container) {
      container.innerHTML = `<p style="color: #ef4444; text-align: center; padding: 30px;">Erro ao carregar estudo teológico.</p>`;
    }
  }
};

window.explicarVersiculoTeologia = async function (livro, cap, ver, txt) {
  showTeologia();

  const container = document.getElementById('teologiaResponseContainer');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div class="ai-spinner-ring" style="width: 48px; height: 48px; margin: 0 auto 12px;"></div>
        <p style="font-family: var(--font-display); font-size: 16px; color: var(--gold-300); margin-bottom: 4px;">Explicando ${livro} ${cap},${ver} segundo a Tradição Católica...</p>
        <span style="font-size: 12px; color: var(--text-muted);">“${txt}”</span>
      </div>`;
  }

  try {
    const res = await consultarIaTeologica({
      livro: livro,
      capitulo: cap,
      versiculo: ver,
      textoPassagem: txt,
      personaId: currentTeologiaPersona
    });

    lastTeologiaResponseText = res.resposta;
    const formattedHtml = formatTeologiaMarkdown(res.resposta);

    if (container) {
      container.innerHTML = `
        <div style="margin-bottom: 18px; padding: 12px 16px; background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold-400); border-radius: 0 12px 12px 0;">
          <span style="font-size: 11.5px; font-weight: 700; color: var(--gold-400); text-transform: uppercase;"><i class="fas fa-bible"></i> Passagem Explicada:</span>
          <h3 style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: var(--gold-300);">${livro} ${cap},${ver}</h3>
          <p style="margin: 4px 0 0; font-size: 13.5px; font-style: italic; color: var(--text-secondary);">“${txt}”</p>
        </div>
        <div class="teologia-answer-box" style="animation: modalEnter 0.3s ease;">
          ${formattedHtml}
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end;">
          <button class="upload-btn-secondary" onclick="shareTeologiaWhatsApp('${livro} ${cap},${ver}')" style="font-size: 12.5px; padding: 8px 14px;">
            <i class="fab fa-whatsapp" style="color: #22c55e;"></i> WhatsApp
          </button>
        </div>`;
    }
  } catch (err) {
    if (container) {
      container.innerHTML = `<p style="color: #ef4444; text-align: center; padding: 30px;">Erro ao carregar explicação do versículo.</p>`;
    }
  }
};

window.stopTeologiaSpeech = function () {
  isTeologiaSpeaking = false;
  const btn = document.getElementById('btnSpeakTeologia');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-volume-up"></i> Ouvir Resposta';
    btn.style.background = '';
    btn.style.color = '';
  }
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    try { window.Capacitor.Plugins.TextToSpeech.stop(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
};

window.toggleSpeakTeologiaResponse = async function () {
  if (isTeologiaSpeaking) {
    stopTeologiaSpeech();
    return;
  }
  if (!lastTeologiaResponseText) {
    showToast('Nenhuma resposta para ouvir no momento.');
    return;
  }

  isTeologiaSpeaking = true;
  const btn = document.getElementById('btnSpeakTeologia');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-stop"></i> Parar';
    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
    btn.style.color = '#ffffff';
  }

  const cleanText = lastTeologiaResponseText.replace(/[#*`_>]/g, '').replace(/\n+/g, ' ');

  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    try {
      await window.Capacitor.Plugins.TextToSpeech.speak({
        text: cleanText,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        category: 'ambient'
      });
      stopTeologiaSpeech();
    } catch (e) {
      stopTeologiaSpeech();
    }
  } else if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.onend = () => stopTeologiaSpeech();
    utterance.onerror = () => stopTeologiaSpeech();
    window.speechSynthesis.speak(utterance);
  }
};

window.shareTeologiaWhatsApp = function (titulo) {
  if (!lastTeologiaResponseText) return;
  const clean = lastTeologiaResponseText.replace(/[#*`_>]/g, '').slice(0, 700);
  let msg = `🕊️ *Reflexão & Teologia Católica — ${titulo}*\n\n${clean}...\n\n_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
};


// ==========================================================================
// 1. MODO LECTIO DIVINA GUIADA (ORAÇÃO DOS MONGES EM 4 PASSOS)
// ==========================================================================
let currentLectioStep = 1;
let currentLectioPassagem = LECTIO_SUGESTOES[0];
let lectioSessionNotes = { 1: '', 2: '', 3: '', 4: '' };
let lectioTimerSeconds = 180;
let lectioTimerInterval = null;
let isLectioTimerRunning = false;

window.showLectio = function (customPassagem = null) {
  showView('lectioView');
  initLectioPassagensChips();

  if (customPassagem) {
    loadLectioPassagem(customPassagem);
  } else if (!currentLectioPassagem) {
    loadLectioPassagem(LECTIO_SUGESTOES[0]);
  } else {
    loadLectioPassagem(currentLectioPassagem);
  }
};

function initLectioPassagensChips() {
  const container = document.getElementById('lectioPassagensChips');
  if (!container) return;

  let html = '';
  LECTIO_SUGESTOES.forEach((sug, idx) => {
    const isAct = currentLectioPassagem && currentLectioPassagem.ref === sug.ref;
    html += `
      <button class="lectio-passage-chip ${isAct ? 'active' : ''}" onclick="selectLectioSugestao(${idx})">
        ${sug.titulo} (${sug.ref})
      </button>
    `;
  });

  // Se tivermos capítulo bíblico aberto, adiciona chip rápido
  if (currentBook) {
    html = `<button class="lectio-passage-chip" onclick="startLectioDivinaCurrentChapter()" style="border-color: #38bdf8; color: #38bdf8;">
      📖 ${currentBook.nome} ${currentChapter}
    </button>` + html;
  }

  container.innerHTML = html;
}

window.selectLectioSugestao = function (index) {
  if (LECTIO_SUGESTOES[index]) {
    loadLectioPassagem(LECTIO_SUGESTOES[index]);
    initLectioPassagensChips();
  }
};

window.loadLectioPassagem = function (passagem) {
  currentLectioPassagem = passagem;
  const refEl = document.getElementById('lectioScriptureRef');
  const txtEl = document.getElementById('lectioScriptureText');
  if (refEl) refEl.textContent = passagem.ref || passagem.titulo || 'Palavra de Deus';
  if (txtEl) txtEl.textContent = passagem.texto || '';

  // Reseta para o passo 1
  lectioSessionNotes = { 1: '', 2: '', 3: '', 4: '' };
  goToLectioStep(1);
};

window.goToLectioStep = function (stepNum) {
  // Salva texto digitado no passo anterior
  const input = document.getElementById('lectioStepInput');
  if (input) {
    lectioSessionNotes[currentLectioStep] = input.value;
  }

  currentLectioStep = stepNum;
  const step = LECTIO_STEPS.find(s => s.id === stepNum) || LECTIO_STEPS[0];

  // Atualiza botões de passos
  document.querySelectorAll('.lectio-step-tab').forEach(tab => {
    tab.classList.toggle('active', parseInt(tab.dataset.step) === stepNum);
  });

  // Atualiza cabeçalho do passo
  const iconWrap = document.getElementById('lectioStepIconWrap');
  const icon = document.getElementById('lectioStepIcon');
  const title = document.getElementById('lectioStepTitle');
  const latin = document.getElementById('lectioStepLatin');
  const desc = document.getElementById('lectioStepDesc');
  const instr = document.getElementById('lectioStepInstr');
  const promptLabel = document.getElementById('lectioPromptLabel');

  if (iconWrap) {
    iconWrap.style.background = step.fundo;
    iconWrap.style.color = step.cor;
  }
  if (icon) icon.className = `fas ${step.icone}`;
  if (title) title.textContent = `${step.id}. ${step.nome} — ${step.subtitulo}`;
  if (latin) latin.textContent = step.latin;
  if (desc) desc.textContent = step.descricao;
  if (instr) instr.textContent = step.instrucao;
  if (promptLabel) promptLabel.textContent = step.perguntaGuia;

  if (input) {
    input.value = lectioSessionNotes[stepNum] || '';
    input.placeholder = stepNum === 4 ? "Ex: Hoje serei paciente com minha família e rezarei pelas pessoas necessitadas..." : "Escreva suas impressões espirituais aqui...";
  }

  // Atualiza botões Anterior / Próximo
  const btnPrev = document.getElementById('btnLectioPrev');
  const btnNext = document.getElementById('btnLectioNext');
  const btnFinish = document.getElementById('btnLectioFinish');

  if (btnPrev) {
    btnPrev.disabled = stepNum === 1;
    btnPrev.style.opacity = stepNum === 1 ? '0.5' : '1';
  }

  if (stepNum === 4) {
    if (btnNext) btnNext.classList.add('hidden');
    if (btnFinish) btnFinish.classList.remove('hidden');
  } else {
    if (btnNext) {
      btnNext.classList.remove('hidden');
      const nextStep = LECTIO_STEPS.find(s => s.id === stepNum + 1);
      btnNext.innerHTML = `<span>Avançar para ${nextStep ? nextStep.nome : 'Próximo'}</span> <i class="fas fa-chevron-right"></i>`;
    }
    if (btnFinish) btnFinish.classList.add('hidden');
  }
};

window.nextLectioStep = function () {
  if (currentLectioStep < 4) {
    goToLectioStep(currentLectioStep + 1);
  }
};

window.prevLectioStep = function () {
  if (currentLectioStep > 1) {
    goToLectioStep(currentLectioStep - 1);
  }
};

window.setLectioTimerDuration = function (seconds) {
  resetLectioTimer(seconds);
};

function resetLectioTimer(seconds) {
  if (lectioTimerInterval) {
    clearInterval(lectioTimerInterval);
    lectioTimerInterval = null;
  }
  isLectioTimerRunning = false;
  lectioTimerSeconds = seconds;
  updateLectioTimerDisplay();
  const icon = document.getElementById('lectioTimerIcon');
  if (icon) icon.className = 'fas fa-play';
}

window.toggleLectioTimer = function () {
  const icon = document.getElementById('lectioTimerIcon');
  if (isLectioTimerRunning) {
    clearInterval(lectioTimerInterval);
    lectioTimerInterval = null;
    isLectioTimerRunning = false;
    if (icon) icon.className = 'fas fa-play';
  } else {
    if (lectioTimerSeconds <= 0) lectioTimerSeconds = 180;
    isLectioTimerRunning = true;
    if (icon) icon.className = 'fas fa-pause';
    lectioTimerInterval = setInterval(() => {
      lectioTimerSeconds--;
      updateLectioTimerDisplay();
      if (lectioTimerSeconds <= 0) {
        clearInterval(lectioTimerInterval);
        lectioTimerInterval = null;
        isLectioTimerRunning = false;
        if (icon) icon.className = 'fas fa-play';
        showToast('🕊️ Tempo de Silêncio concluído. Em nome do Pai, do Filho e do Espírito Santo.');
      }
    }, 1000);
  }
};

function updateLectioTimerDisplay() {
  const textEl = document.getElementById('lectioTimerText');
  if (!textEl) return;
  const m = Math.floor(lectioTimerSeconds / 60);
  const s = lectioTimerSeconds % 60;
  textEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

window.concluirLectioDivina = async function () {
  const input = document.getElementById('lectioStepInput');
  if (input) lectioSessionNotes[4] = input.value;

  try {
    await salvarSessaoLectio({
      passagemRef: currentLectioPassagem.ref || currentLectioPassagem.titulo || 'Passagem Bíblica',
      passagemTexto: currentLectioPassagem.texto || '',
      meditacao: lectioSessionNotes[2] || lectioSessionNotes[1] || '',
      oracao: lectioSessionNotes[3] || '',
      proposito: lectioSessionNotes[4] || ''
    });

    showToast('✨ Lectio Divina concluída e salva no seu histórico com as bênçãos de Deus!');
    setTimeout(() => {
      goHome();
    }, 1200);
  } catch (e) {
    showToast('✨ Lectio Divina concluída com sucesso!');
    goHome();
  }
};

window.openLectioHistoricoModal = async function () {
  const listEl = document.getElementById('lectioHistoricoList');
  const modal = document.getElementById('lectioHistoricoModal');
  if (modal) modal.classList.remove('hidden');

  if (listEl) {
    const historico = await getLectioHistorico();
    if (historico && historico.length > 0) {
      listEl.innerHTML = historico.map(item => `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-left: 3px solid #38bdf8; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="color: var(--gold-300); font-size: 14.5px;">${item.passagemRef}</strong>
            <span style="font-size: 11px; color: var(--text-muted);">${item.dataFormatada || ''}</span>
          </div>
          ${item.meditacao ? `<p style="font-size: 13px; color: var(--text-secondary); margin: 4px 0;"><strong>Meditação:</strong> “${item.meditacao}”</p>` : ''}
          ${item.oracao ? `<p style="font-size: 13px; color: var(--text-secondary); margin: 4px 0;"><strong>Oração:</strong> “${item.oracao}”</p>` : ''}
          ${item.proposito ? `<p style="font-size: 13px; color: #22c55e; margin: 4px 0;"><strong>Propósito do Dia:</strong> “${item.proposito}”</p>` : ''}
          <div style="text-align: right; margin-top: 8px;">
            <button onclick="deletarLectioHistorico('${item.id}')" style="background: none; border: none; color: #ef4444; font-size: 11.5px; cursor: pointer;">
              <i class="fas fa-trash-alt"></i> Excluir
            </button>
          </div>
        </div>
      `).join('');
    } else {
      listEl.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 30px;">Nenhuma sessão de Lectio Divina registrada ainda.</p>';
    }
  }
};

window.closeLectioHistoricoModal = function () {
  const modal = document.getElementById('lectioHistoricoModal');
  if (modal) modal.classList.add('hidden');
};

window.deletarLectioHistorico = async function (id) {
  await excluirSessaoLectio(id);
  openLectioHistoricoModal();
  showToast('Sessão removida do histórico.');
};

window.startLectioDivinaCurrentChapter = async function () {
  if (!currentBook) {
    showLectio();
    return;
  }
  const verses = await db.getVersiculos(currentBook.id, currentChapter);
  const texto = verses && verses.length > 0 ? verses.slice(0, 10).map(v => `${v.id_versiculo}. ${v.texto}`).join(' ') : 'Palavra do Senhor.';
  showLectio({
    titulo: `${currentBook.nome} ${currentChapter}`,
    ref: `${currentBook.nome} ${currentChapter}`,
    texto: texto
  });
};


// ==========================================================================
// 2. EXAME DE CONSCIÊNCIA & SANTA CONFISSÃO
// ==========================================================================
let pecadosMarcadosCache = [];

window.showConfissao = async function () {
  showView('confissaoView');
  pecadosMarcadosCache = await getPecadosMarcados();
  renderMandamentosList();
  renderPecadosCapitais();
  renderConfissaoOracoes();
  updateConfissaoStatusBanner();
};

async function updateConfissaoStatusBanner() {
  const badgeContador = document.getElementById('confissaoBadgeContador');
  const ultimaDataTexto = document.getElementById('confissaoUltimaDataTexto');

  pecadosMarcadosCache = await getPecadosMarcados();
  const count = pecadosMarcadosCache.length;

  if (badgeContador) {
    badgeContador.textContent = `${count} ${count === 1 ? 'falta anotada' : 'faltas anotadas'}`;
  }

  const ultimaData = await getUltimaConfissaoData();
  if (ultimaDataTexto) {
    if (ultimaData) {
      const dataFormatada = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(ultimaData));
      ultimaDataTexto.innerHTML = `<strong>Última confissão:</strong> ${dataFormatada}. Que a misericórdia de Deus renove seu coração!`;
    } else {
      ultimaDataTexto.textContent = "“Ainda que os vossos pecados sejam como o escarlate, eles se tornarão brancos como a neve.” (Is 1,18)";
    }
  }
}

function renderMandamentosList() {
  const container = document.getElementById('mandamentosAccordionList');
  if (!container) return;

  container.innerHTML = MANDAMENTOS_DEUS.map(m => `
    <div class="mandamento-card">
      <div class="mandamento-card-header">
        <span class="mandamento-num-badge">${m.numero}</span>
        <h4 class="mandamento-titulo">${m.titulo}</h4>
      </div>
      <div class="mandamento-perguntas-list">
        ${m.perguntas.map(p => {
    const isChecked = pecadosMarcadosCache.includes(p.id);
    return `
            <div class="confissao-check-row ${isChecked ? 'checked' : ''}" onclick="togglePecadoCheck('${p.id}')">
              <div class="confissao-check-box">
                ${isChecked ? '<i class="fas fa-check" style="font-size: 11px;"></i>' : ''}
              </div>
              <span class="confissao-check-txt">${p.texto}</span>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `).join('');
}

function renderPecadosCapitais() {
  const container = document.getElementById('pecadosCapitaisGrid');
  if (!container) return;

  container.innerHTML = PECADOS_CAPITAIS.map(p => `
    <div class="pecado-card">
      <div class="pecado-card-header">
        <span class="pecado-badge">${p.pecado}</span>
        <span class="virtude-badge">Virtude: ${p.virtude}</span>
      </div>
      <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; margin: 0;">${p.descricao}</p>
    </div>
  `).join('');
}

function renderConfissaoOracoes() {
  const tTrad = document.getElementById('txtAtoContricaoTradicional');
  const tBrev = document.getElementById('txtAtoContricaoBreve');
  const tLat = document.getElementById('txtAtoContricaoLatim');

  if (tTrad) tTrad.textContent = ORACOES_CONFISSAO.atoContricaoTradicional;
  if (tBrev) tBrev.textContent = ORACOES_CONFISSAO.atoContricaoBreve;
  if (tLat) tLat.textContent = ORACOES_CONFISSAO.atoContricaoLatim;
}

window.switchConfissaoTab = function (tabName, btn) {
  document.querySelectorAll('.confissao-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.getElementById('confTabMandamentos').classList.toggle('hidden', tabName !== 'mandamentos');
  document.getElementById('confTabPecados').classList.toggle('hidden', tabName !== 'pecados');
  document.getElementById('confTabRoteiro').classList.toggle('hidden', tabName !== 'roteiro');
  document.getElementById('confTabOracoes').classList.toggle('hidden', tabName !== 'oracoes');
};

window.togglePecadoCheck = async function (id) {
  pecadosMarcadosCache = await togglePecadoMarcado(id);
  renderMandamentosList();
  updateConfissaoStatusBanner();
};

window.abrirResumoConfissao = async function () {
  pecadosMarcadosCache = await getPecadosMarcados();
  const listEl = document.getElementById('confissaoResumoList');
  const modal = document.getElementById('confissaoResumoModal');

  if (modal) modal.classList.remove('hidden');

  if (listEl) {
    if (pecadosMarcadosCache.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted);">
          <i class="fas fa-dove" style="font-size: 32px; color: var(--gold-400); margin-bottom: 12px; display: block;"></i>
          <p>Nenhum item marcado no exame de consciência.</p>
          <p style="font-size: 12.5px;">Se você já realizou seu exame mentalmente, vá com confiança e paz ao confessionário!</p>
        </div>
      `;
    } else {
      let html = '<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">';
      MANDAMENTOS_DEUS.forEach(m => {
        const itensDesteMandamento = m.perguntas.filter(p => pecadosMarcadosCache.includes(p.id));
        if (itensDesteMandamento.length > 0) {
          html += `
            <li style="margin-top: 8px;">
              <span style="font-size: 12px; font-weight: 800; color: var(--gold-400); text-transform: uppercase;">${m.numero} — ${m.titulo}</span>
              ${itensDesteMandamento.map(item => `
                <div style="background: rgba(244, 63, 94, 0.08); border-left: 2px solid #f43f5e; padding: 8px 12px; border-radius: 0 8px 8px 0; margin-top: 4px; font-size: 13.5px; color: var(--text-primary);">
                  • ${item.texto}
                </div>
              `).join('')}
            </li>
          `;
        }
      });
      html += '</ul>';
      listEl.innerHTML = html;
    }
  }
};

window.closeConfissaoResumoModal = function () {
  const modal = document.getElementById('confissaoResumoModal');
  if (modal) modal.classList.add('hidden');
};

window.marcarConfissaoConcluida = async function () {
  await registrarConfissaoRealizada();
  pecadosMarcadosCache = [];
  closeConfissaoResumoModal();
  renderMandamentosList();
  updateConfissaoStatusBanner();
  showToast('🕊️ Louvado seja Nosso Senhor Jesus Cristo! Sua confissão foi registrada.');
};


// ==========================================================================
// 3. DIÁRIO ESPIRITUAL & MURAL DE GRAÇAS ALCANÇADAS ("LIVRO DA GRATIDÃO")
// ==========================================================================
let diarioFilterActive = 'todos';

window.showDiario = async function () {
  showView('diarioView');
  await renderDiarioItens();
};

window.filterDiario = function (filter, btn) {
  diarioFilterActive = filter;
  document.querySelectorAll('.diario-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderDiarioItens();
};

async function renderDiarioItens() {
  const container = document.getElementById('diarioItensList');
  const metricTotal = document.getElementById('metricDiarioTotal');
  const metricEmOracao = document.getElementById('metricDiarioEmOracao');
  const metricGracas = document.getElementById('metricDiarioGracas');

  const stats = await getEstatisticasDiario();
  if (metricTotal) metricTotal.textContent = stats.total;
  if (metricEmOracao) metricEmOracao.textContent = stats.emOracao;
  if (metricGracas) metricGracas.textContent = stats.alcancadas;

  const itens = await getDiarioItens();
  const filtrados = itens.filter(i => {
    if (diarioFilterActive === 'em_oracao') return i.status === 'em_oracao';
    if (diarioFilterActive === 'graca_alcancada') return i.status === 'graca_alcancada';
    return true;
  });

  if (!container) return;

  if (filtrados.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fas fa-book-bookmark" style="font-size: 32px; color: var(--gold-400); margin-bottom: 12px; display: block;"></i>
        <p>Nenhuma oração encontrada nesta categoria.</p>
        <button class="hero-donate-btn pulse-animation" onclick="abrirModalNovaOracao()" style="margin-top: 10px; padding: 8px 18px; font-size: 13px;">
          <i class="fas fa-plus-circle"></i> Adicionar Nova Prece
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtrados.map(item => {
    const isGraca = item.status === 'graca_alcancada';
    const cat = DIARIO_CATEGORIAS.find(c => c.id === item.categoria) || DIARIO_CATEGORIAS[0];
    const dataInicioFmt = item.dataInicio ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(item.dataInicio)) : '';
    const dataGracaFmt = item.dataGraca ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(item.dataGraca)) : '';

    return `
      <div class="diario-item-card ${isGraca ? 'graca' : ''}">
        <div class="diario-card-top">
          <div class="diario-badges-wrap">
            <span style="background: rgba(255, 255, 255, 0.06); color: ${cat.cor}; font-size: 11.5px; font-weight: 700; padding: 3px 8px; border-radius: 8px;">
              <i class="fas ${cat.icone}"></i> ${cat.nome}
            </span>
            <span class="diario-status-badge ${isGraca ? 'alcancada' : 'em-oracao'}">
              ${isGraca ? '✨ Graça Alcançada!' : '⏳ Em Oração'}
            </span>
          </div>
          <span style="font-size: 11px; color: var(--text-muted);"><i class="fas fa-calendar-alt"></i> Desde ${dataInicioFmt}</span>
        </div>

        <h4 class="diario-card-title">${item.titulo}</h4>
        <p class="diario-card-pedido">${item.pedido}</p>

        ${isGraca ? `
          <div class="diario-graca-box">
            <strong><i class="fas fa-sparkles"></i> Testemunho da Graça (${dataGracaFmt}):</strong>
            <p style="font-size: 13.5px; color: var(--text-primary); margin: 2px 0 6px; font-style: italic;">“${item.testemunho}”</p>
            ${item.versiculo ? `<span style="font-size: 12px; color: var(--gold-300); font-weight: 600;"><i class="fas fa-book-bible"></i> ${item.versiculo}</span>` : ''}
          </div>
        ` : ''}

        <div class="diario-card-actions">
          ${!isGraca ? `
            <button class="hero-donate-btn" onclick="abrirModalGracaAlcancada('${item.id}', '${item.titulo.replace(/'/g, "\\'")}')" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff; padding: 6px 14px; font-size: 12px;">
              <i class="fas fa-sparkles"></i> Graça Alcançada!
            </button>
          ` : `
            <button class="upload-btn-secondary" onclick="compartilharTestemunhoWhatsApp('${item.id}')" style="font-size: 12px; padding: 6px 14px;">
              <i class="fab fa-whatsapp" style="color: #22c55e;"></i> Compartilhar
            </button>
            <button class="upload-btn-secondary" onclick="toggleReabrirOracao('${item.id}')" style="font-size: 11.5px; padding: 6px 10px;">
              <i class="fas fa-rotate-left"></i> Reabrir
            </button>
          `}
          <button onclick="deletarItemDiario('${item.id}')" style="background: none; border: none; color: #ef4444; font-size: 12px; cursor: pointer; padding: 6px 8px;" title="Excluir">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.abrirModalNovaOracao = function () {
  const modal = document.getElementById('diarioNovoModal');
  const form = document.getElementById('diarioNovoForm');
  if (form) form.reset();
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('diarioTituloInput')?.focus();
    }, 100);
  }
};

window.closeDiarioNovoModal = function () {
  const modal = document.getElementById('diarioNovoModal');
  if (modal) modal.classList.add('hidden');
};

window.handleSalvarNovaOracao = async function (e) {
  if (e) e.preventDefault();
  const titulo = document.getElementById('diarioTituloInput')?.value;
  const categoria = document.getElementById('diarioCategoriaSelect')?.value;
  const versiculo = document.getElementById('diarioVersiculoInput')?.value;
  const pedido = document.getElementById('diarioPedidoTextarea')?.value;

  if (!titulo || !titulo.trim()) {
    showToast('Por favor, informe o título da sua intenção.');
    return;
  }
  if (!pedido || !pedido.trim()) {
    showToast('Por favor, escreva os detalhes da sua oração.');
    return;
  }

  try {
    await salvarNovoItemDiario({
      titulo: titulo.trim(),
      categoria: categoria || 'agradecimento',
      versiculo: versiculo ? versiculo.trim() : '',
      pedido: pedido.trim()
    });

    closeDiarioNovoModal();
    const form = document.getElementById('diarioNovoForm');
    if (form) form.reset();
    await renderDiarioItens();
    showToast('🙏 Intenção guardada no seu Diário Espiritual.');
  } catch (err) {
    console.error('[Diario] Erro ao salvar prece:', err);
    showToast('Não foi possível salvar a prece. Tente novamente.');
  }
};

window.abrirModalGracaAlcancada = function (id, titulo) {
  const modal = document.getElementById('diarioGracaModal');
  const idInput = document.getElementById('diarioGracaItemId');
  const preview = document.getElementById('diarioGracaTituloPreview');

  if (idInput) idInput.value = id;
  if (preview) preview.textContent = titulo;
  if (modal) modal.classList.remove('hidden');
};

window.closeDiarioGracaModal = function () {
  const modal = document.getElementById('diarioGracaModal');
  if (modal) modal.classList.add('hidden');
};

window.handleSalvarGracaAlcancada = async function (e) {
  if (e) e.preventDefault();
  const id = document.getElementById('diarioGracaItemId')?.value;
  const testemunho = document.getElementById('diarioTestemunhoInput')?.value;
  const versiculo = document.getElementById('diarioGracaVersiculoInput')?.value;

  if (!id) {
    showToast('Identificador de oração inválido.');
    return;
  }
  if (!testemunho || !testemunho.trim()) {
    showToast('Por favor, relate o testemunho da graça alcançada.');
    return;
  }

  try {
    await marcarGracaAlcancada(id, testemunho.trim(), versiculo ? versiculo.trim() : '');
    closeDiarioGracaModal();
    const form = document.getElementById('diarioGracaForm');
    if (form) form.reset();
    await renderDiarioItens();
    showToast('🎉 Glória a Deus! Graça alcançada registrada com sucesso!');
  } catch (err) {
    console.error('[Diario] Erro ao marcar graça:', err);
    showToast('Não foi possível registrar a graça. Tente novamente.');
  }
};

window.toggleReabrirOracao = async function (id) {
  await reabrirEmOracao(id);
  await renderDiarioItens();
  showToast('Intenção reaberta em oração.');
};

window.deletarItemDiario = async function (id) {
  await excluirItemDiario(id);
  await renderDiarioItens();
  showToast('Registro removido do diário.');
};

window.compartilharTestemunhoWhatsApp = async function (id) {
  const itens = await getDiarioItens();
  const item = itens.find(i => i.id === id);
  if (!item) return;

  const msg = formatarTestemunhoWhatsApp(item);
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
};

// ==========================================================================
// 4. NOVENAS TRADICIONAIS DA IGREJA (GUIA 9 DIAS)
// ==========================================================================
let currentNovenaActive = null;
let currentNovenaDiaActive = 1;
let isNovenaSpeaking = false;

window.showNovenas = async function () {
  showView('novenasView');
  await renderNovenasGrid();
};

async function renderNovenasGrid() {
  const container = document.getElementById('novenasGridList');
  if (!container) return;

  const novenas = await getNovenasComProgresso();

  container.innerHTML = novenas.map(n => {
    const isEmAndamento = n.emAndamento;
    const isConcluida = n.concluida;
    const diaAtual = n.diaAtual || 1;
    const historico = n.historicoDias || [];

    return `
      <div class="novena-card ${isEmAndamento ? 'em-andamento' : ''} ${isConcluida ? 'concluida' : ''}">
        <div>
          <div class="novena-card-header">
            <div class="novena-icon-box" style="background: ${n.cor}22; color: ${n.cor}; border: 1px solid ${n.cor}44;">
              <i class="fas ${n.icone}"></i>
            </div>
            <div style="flex: 1;">
              <h3 class="novena-card-title">${n.titulo}</h3>
              <span class="novena-card-padroeiro">${n.padroeiro}</span>
            </div>
          </div>
          <p class="novena-card-desc">${n.subtitulo}</p>
        </div>

        <div>
          <div class="novena-beads-wrap">
            <div class="novena-beads-header">
              <span><i class="fas fa-calendar-check"></i> Progresso da Novena</span>
              <span style="color: ${isConcluida ? '#22c55e' : (isEmAndamento ? 'var(--gold-400)' : 'var(--text-muted)')}; font-weight: 800;">
                ${isConcluida ? '9 de 9 (Concluída)' : (isEmAndamento ? `Dia ${diaAtual} de 9` : 'Não Iniciada')}
              </span>
            </div>
            <div class="novena-beads-row">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => {
                const isCompleted = historico.includes(d);
                const isCurrent = isEmAndamento && d === diaAtual;
                return `<div class="novena-bead ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}" title="Dia ${d}">
                  ${isCompleted ? '<i class="fas fa-check"></i>' : d}
                </div>`;
              }).join('')}
            </div>
          </div>

          <div class="novena-card-actions">
            ${isEmAndamento ? `
              <button type="button" class="hero-donate-btn pulse-animation" onclick="abrirNovenaDia('${n.id}', ${diaAtual})" style="width: 100%; justify-content: center; font-size: 13px; padding: 10px 16px;">
                <i class="fas fa-hands-praying"></i> Rezar Dia ${diaAtual} de 9
              </button>
            ` : (isConcluida ? `
              <button type="button" class="hero-donate-btn" onclick="verConclusaoNovena('${n.id}')" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff; flex: 1; justify-content: center; font-size: 12.5px; padding: 10px 12px;">
                <i class="fas fa-crown"></i> Ver Conclusão
              </button>
              <button type="button" class="upload-btn-secondary" onclick="reiniciarNovenaConfirm('${n.id}')" title="Rezar Novamente" style="padding: 10px 14px;">
                <i class="fas fa-redo"></i>
              </button>
            ` : `
              <button type="button" class="hero-donate-btn" onclick="iniciarENovena('${n.id}')" style="width: 100%; justify-content: center; font-size: 13px; padding: 10px 16px;">
                <i class="fas fa-play"></i> Iniciar Novena (Dia 1)
              </button>
            `)}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.iniciarENovena = async function (novenaId) {
  await iniciarNovena(novenaId);
  await renderNovenasGrid();
  abrirNovenaDia(novenaId, 1);
};

window.reiniciarNovenaConfirm = async function (novenaId) {
  await reiniciarNovena(novenaId);
  await renderNovenasGrid();
  showToast('Novena reiniciada. Que Deus abençoe suas orações!');
  abrirNovenaDia(novenaId, 1);
};

window.abrirNovenaDia = function (novenaId, diaNum) {
  stopNovenaSpeech();
  const novena = NOVENAS_LIST.find(n => n.id === novenaId);
  if (!novena) return;

  currentNovenaActive = novena;
  currentNovenaDiaActive = diaNum;
  const diaData = novena.dias.find(d => d.dia === diaNum) || novena.dias[0];

  const contentEl = document.getElementById('novenaModalContent');
  const modal = document.getElementById('novenaPrayerModal');

  if (contentEl) {
    contentEl.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 14px;">
        <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: ${novena.cor}; background: ${novena.cor}18; padding: 4px 10px; border-radius: 8px;">
          ${novena.padroeiro}
        </span>
        <h2 style="font-family: 'Cinzel', serif; color: var(--gold-300); font-size: 20px; margin: 8px 0 4px;">${novena.titulo}</h2>
        <div style="font-size: 13.5px; font-weight: 700; color: var(--gold-400);">
          <i class="fas fa-calendar-day"></i> Dia ${diaNum} de 9: ${diaData.tema}
        </div>
      </div>

      <!-- 1. Oração Inicial -->
      <div class="novena-prayer-box initial">
        <div class="novena-prayer-title"><i class="fas fa-cross"></i> Oração Preparatória Inicial:</div>
        <p class="novena-prayer-text">${novena.oracaoInicial}</p>
      </div>

      <!-- 2. Meditação do Dia -->
      <div class="novena-prayer-box specific">
        <div class="novena-prayer-title" style="color: ${novena.cor};"><i class="fas fa-dove"></i> Meditação do Dia ${diaNum}:</div>
        <p class="novena-prayer-text" style="font-style: italic; margin-bottom: 12px;">“${diaData.reflexao}”</p>
        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px;">
          <strong style="color: var(--text-primary); font-size: 13.5px; display: block; margin-bottom: 6px;">Oração do ${diaNum}º Dia:</strong>
          <p class="novena-prayer-text">${diaData.oracao}</p>
        </div>
      </div>

      <!-- 3. Jaculatória -->
      <div class="novena-jaculatoria-box">
        <p class="novena-jaculatoria-text">“${diaData.jaculatoria}”</p>
      </div>

      <!-- 4. Oração Final -->
      <div class="novena-prayer-box final">
        <div class="novena-prayer-title" style="color: #c084fc;"><i class="fas fa-hands-praying"></i> Oração Final & Bênção:</div>
        <p class="novena-prayer-text">${novena.oracaoFinal}</p>
      </div>

      <!-- Ações do Modal -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 16px;">
        <button type="button" class="upload-btn-secondary" id="btnSpeakNovena" style="padding: 10px 14px; font-size: 12.5px;" onclick="toggleSpeakNovena()">
          <i class="fas fa-volume-up"></i> Ouvir Oração
        </button>
        <button type="button" class="hero-share-btn" style="padding: 10px 14px; font-size: 12.5px;" onclick="shareNovenaWhatsApp()">
          <i class="fab fa-whatsapp"></i> Compartilhar
        </button>
        <button type="button" class="hero-donate-btn pulse-animation" onclick="executarConcluirDiaNovena('${novena.id}', ${diaNum})" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff; flex: 1; min-width: 170px; justify-content: center; font-size: 13px;">
          <i class="fas fa-check-circle"></i> Concluir Dia ${diaNum}
        </button>
      </div>
    `;
  }

  if (modal) modal.classList.remove('hidden');
};

window.closeNovenaPrayerModal = function () {
  stopNovenaSpeech();
  const modal = document.getElementById('novenaPrayerModal');
  if (modal) modal.classList.add('hidden');
};

window.executarConcluirDiaNovena = async function (novenaId, diaNum) {
  stopNovenaSpeech();
  closeNovenaPrayerModal();

  const p = await marcarDiaNovenaConcluido(novenaId, diaNum);
  await renderNovenasGrid();

  if (diaNum >= 9) {
    verConclusaoNovena(novenaId);
  } else {
    showToast(`🙏 Dia ${diaNum} concluído com sucesso! Amanhã reze o Dia ${diaNum + 1}.`);
  }
};

window.verConclusaoNovena = function (novenaId) {
  const novena = NOVENAS_LIST.find(n => n.id === novenaId);
  if (!novena) return;
  currentNovenaActive = novena;

  const modal = document.getElementById('novenaConcluidaModal');
  const sub = document.getElementById('novenaConcluidaSub');
  const oracao = document.getElementById('novenaConcluidaOracao');

  if (sub) sub.textContent = `Parabéns por perseverar nos 9 dias da Novena de ${novena.titulo}!`;
  if (oracao) oracao.textContent = `“${novena.oracaoAcaoDeGracas}”`;

  if (modal) modal.classList.remove('hidden');
};

window.closeNovenaConcluidaModal = function () {
  const modal = document.getElementById('novenaConcluidaModal');
  if (modal) modal.classList.add('hidden');
};

function stopNovenaSpeech() {
  isNovenaSpeaking = false;
  const btn = document.getElementById('btnSpeakNovena');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-volume-up"></i> Ouvir Oração';
    btn.style.background = '';
    btn.style.color = '';
  }
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    try { window.Capacitor.Plugins.TextToSpeech.stop(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}

window.toggleSpeakNovena = async function () {
  if (isNovenaSpeaking) {
    stopNovenaSpeech();
    return;
  }
  if (!currentNovenaActive) return;

  const novena = currentNovenaActive;
  const diaData = novena.dias.find(d => d.dia === currentNovenaDiaActive) || novena.dias[0];

  const btn = document.getElementById('btnSpeakNovena');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-stop"></i> Parar';
    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
    btn.style.color = '#ffffff';
  }
  isNovenaSpeaking = true;

  const fullText = `Novena de ${novena.titulo}. Dia ${currentNovenaDiaActive}. ${diaData.tema}.\n\nOração Inicial: ${novena.oracaoInicial}.\n\nMeditação: ${diaData.reflexao}.\n\nOração do Dia: ${diaData.oracao}.\n\nJaculatória: ${diaData.jaculatoria}.\n\nOração Final: ${novena.oracaoFinal}.`;

  try {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
      await window.Capacitor.Plugins.TextToSpeech.speak({
        text: fullText,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        category: 'ambient'
      });
      stopNovenaSpeech();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = () => stopNovenaSpeech();
      utterance.onerror = () => stopNovenaSpeech();
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.error("Novena TTS Error:", e);
    stopNovenaSpeech();
  }
};

window.shareNovenaWhatsApp = function () {
  if (!currentNovenaActive) return;
  const novena = currentNovenaActive;
  const diaData = novena.dias.find(d => d.dia === currentNovenaDiaActive) || novena.dias[0];

  let msg = `🕊️ *Novena de ${novena.titulo}*\n📅 *Dia ${currentNovenaDiaActive} de 9: ${diaData.tema}*\n\n`;
  msg += `✝️ *Oração do Dia:*\n${diaData.oracao}\n\n`;
  msg += `🙏 *Jaculatória:*\n“${diaData.jaculatoria}”\n\n`;
  msg += `_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
};

window.shareNovenaConcluidaWhatsApp = function () {
  if (!currentNovenaActive) return;
  const novena = currentNovenaActive;

  let msg = `✨ *Novena Concluída com Fé!* ✨\n\n`;
  msg += `Concluí hoje os 9 dias de oração da *Novena de ${novena.titulo}*! 🙏🕊️\n\n`;
  msg += `“${novena.oracaoAcaoDeGracas}”\n\n`;
  msg += `_Bíblia Sagrada Católica_\nhttps://bibliasagradaavemaria.com.br`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg.trim())}`, '_blank');
};

// ===== CARTAS APOSTÓLICAS (EPÍSTOLAS DO NOVO TESTAMENTO) =====
let currentCartasCategoria = 'todas';
let currentCartasSearch = '';

function normalizeSearchText(str) {
  if (!str) return '';
  return str
    .replace(/[\u00AD\u200B\u200C\u200D\uFEFF\u2060]/g, '')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

window.showCartasApostolicas = function () {
  showView('cartasView');
  currentCartasCategoria = 'todas';
  currentCartasSearch = '';
  const searchInput = document.getElementById('cartasSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('cartasSearchClear');
  if (clearBtn) clearBtn.classList.add('hidden');

  document.querySelectorAll('#cartasView .nav-tabs .nav-tab').forEach(t => t.classList.remove('active'));
  const tabTodas = document.getElementById('tabCartasTodas');
  if (tabTodas) tabTodas.classList.add('active');

  renderCartasGrid();
};

window.filterCartasCategoria = function (cat, btnEl) {
  currentCartasCategoria = cat;
  if (btnEl) {
    document.querySelectorAll('#cartasView .nav-tabs .nav-tab').forEach(t => t.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderCartasGrid();
};

window.handleCartasSearch = function (query) {
  currentCartasSearch = (query || '').trim();
  const clearBtn = document.getElementById('cartasSearchClear');
  if (clearBtn) clearBtn.classList.toggle('hidden', currentCartasSearch.length === 0);
  renderCartasGrid();
};

window.clearCartasSearch = function () {
  currentCartasSearch = '';
  const input = document.getElementById('cartasSearchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  const clearBtn = document.getElementById('cartasSearchClear');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderCartasGrid();
};

const cartasSearchInputEl = document.getElementById('cartasSearchInput');
if (cartasSearchInputEl) {
  cartasSearchInputEl.addEventListener('input', (e) => {
    window.handleCartasSearch(e.target.value);
  });
  cartasSearchInputEl.addEventListener('keyup', (e) => {
    window.handleCartasSearch(e.target.value);
  });
}

window.abrirCartaCapitulo = function (idLivro, nomeLivro, cap = 1) {
  openBook(idLivro, nomeLivro, 0);
  setTimeout(() => selectChapter(cap), 100);
};

window.setCartasQuickSearch = function (term) {
  const input = document.getElementById('cartasSearchInput');
  if (input) {
    input.value = term;
    input.focus();
  }
  window.handleCartasSearch(term);
};

window.renderCartasGrid = function () {
  const container = document.getElementById('cartasGridList');
  if (!container) return;

  let cartas = getCartasPorCategoria(currentCartasCategoria);

  if (currentCartasSearch.length > 0) {
    const normQ = normalizeSearchText(currentCartasSearch);
    const searchTerms = normQ.split(/\s+/).filter(Boolean);

    let filtered = cartas.filter(c => {
      const fullContent = normalizeSearchText(`
        ${c.nomeCurto} 
        ${c.tituloLiturgico} 
        ${c.autor} 
        ${c.apostolo || ''} 
        ${c.destinatario} 
        ${c.anoLocal} 
        ${c.categoriaNome} 
        ${c.temaCentral} 
        ${c.proposito} 
        ${(c.tags || []).join(' ')} 
        ${(c.passagensDestaque || []).map(p => `${p.referencia} ${p.titulo} ${p.texto}`).join(' ')}
      `);
      return searchTerms.every(term => fullContent.includes(term));
    });

    // Se não encontrou na categoria atual, busca em todas as 21 cartas
    if (filtered.length === 0 && currentCartasCategoria !== 'todas') {
      const allCartas = getCartasPorCategoria('todas');
      filtered = allCartas.filter(c => {
        const fullContent = normalizeSearchText(`
          ${c.nomeCurto} 
          ${c.tituloLiturgico} 
          ${c.autor} 
          ${c.apostolo || ''} 
          ${c.destinatario} 
          ${c.anoLocal} 
          ${c.categoriaNome} 
          ${c.temaCentral} 
          ${c.proposito} 
          ${(c.tags || []).join(' ')} 
          ${(c.passagensDestaque || []).map(p => `${p.referencia} ${p.titulo} ${p.texto}`).join(' ')}
        `);
        return searchTerms.every(term => fullContent.includes(term));
      });
    }

    cartas = filtered;
  }

  if (cartas.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <i class="fas fa-scroll" style="font-size: 36px; opacity: 0.4; margin-bottom: 12px; display: block;"></i>
        <p style="font-size: 15px; font-weight: 600; color: var(--text-primary);">Nenhuma carta encontrada para "${currentCartasSearch}"</p>
        <p style="font-size: 12.5px; margin-top: 4px;">Tente pesquisar por temas como <em>amor, fé, graça, obras, armadura, união, ressurreição</em> ou por apóstolos como <em>São Paulo, São Pedro, São João, Tiago, Judas</em>.</p>
        <button class="upload-btn-secondary" onclick="clearCartasSearch()" style="margin-top: 14px; font-size: 12px; padding: 7px 16px;">
          <i class="fas fa-times"></i> Limpar Busca
        </button>
      </div>
    `;
    return;
  }

  let html = '';
  const isSearching = currentCartasSearch.length > 0;
  
  cartas.forEach(carta => {
    let passagensHtml = '';
    if (carta.passagensDestaque && carta.passagensDestaque.length > 0) {
      passagensHtml = `
        <div class="carta-highlights-wrap">
          <div class="carta-highlights-header">
            <i class="fas fa-bookmark" style="color: var(--gold-400);"></i> Destaques Litúrgicos na Santa Missa
          </div>
          ${carta.passagensDestaque.map(p => `
            <div class="carta-highlight-item">
              <div class="carta-highlight-top">
                <span class="carta-highlight-ref"><i class="fas fa-quote-left"></i> ${p.referencia} — ${isSearching ? highlightSearchTerms(p.titulo, currentCartasSearch) : p.titulo}</span>
                <button class="carta-highlight-btn" onclick="abrirCartaCapitulo(${carta.id_livro}, '${carta.nomeCurto}', ${p.capitulo})" title="Ler este capítulo na Bíblia">
                  <i class="fas fa-book-open"></i> Cap. ${p.capitulo}
                </button>
              </div>
              <p class="carta-highlight-quote">“${isSearching ? highlightSearchTerms(p.texto, currentCartasSearch) : p.texto}”</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    const titleHl = isSearching ? highlightSearchTerms(carta.tituloLiturgico, currentCartasSearch) : carta.tituloLiturgico;
    const autorHl = isSearching ? highlightSearchTerms(carta.autor, currentCartasSearch) : carta.autor;
    const temaHl = isSearching ? highlightSearchTerms(carta.temaCentral, currentCartasSearch) : carta.temaCentral;
    const propositoHl = isSearching ? highlightSearchTerms(carta.proposito, currentCartasSearch) : carta.proposito;

    html += `
      <div class="carta-item-card">
        <div class="carta-card-top">
          <div class="carta-icon-box" style="background: rgba(212, 175, 55, 0.15); color: ${carta.cor || 'var(--gold-400)'}; border: 1px solid rgba(212, 175, 55, 0.3);">
            <i class="fas ${carta.icone}"></i>
          </div>
          <div class="carta-card-title-group">
            <span class="carta-liturgical-badge">${carta.categoriaNome} • ${carta.totalCapitulos} Cap${carta.totalCapitulos > 1 ? 'ítulos' : 'ítulo'}</span>
            <h3 class="carta-card-title">${titleHl}</h3>
            <div class="carta-card-meta">
              <span><i class="fas fa-pen-nib" style="color: var(--gold-400);"></i> ${autorHl}</span>
              <span><i class="fas fa-calendar" style="color: var(--gold-400);"></i> ${carta.anoLocal}</span>
              <span><i class="fas fa-users" style="color: var(--gold-400);"></i> ${carta.destinatario}</span>
            </div>
          </div>
        </div>

        <div class="carta-theme-box">
          <div class="carta-theme-label"><i class="fas fa-star"></i> Tema Central & Teologia</div>
          <div class="carta-theme-text">${temaHl}</div>
        </div>

        <p class="carta-proposito-text">${propositoHl}</p>

        ${passagensHtml}

        <div class="carta-card-actions">
          <button class="carta-read-btn" onclick="abrirCartaCapitulo(${carta.id_livro}, '${carta.nomeCurto}', 1)">
            <i class="fas fa-book-bible"></i> Ler Carta Completa
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
};


// ==========================================================================
// DEVOÇÃO A MARIA (SANTÍSSIMA VIRGEM)
// ==========================================================================
let currentMariaAba = 'titulos';
let currentMariaSearch = '';
let isMariaAudioSpeaking = false;
let currentMariaSpeakingId = null;

window.showMariaDevocao = function () {
  showView('mariaView');
  currentMariaAba = 'titulos';
  currentMariaSearch = '';
  const searchInput = document.getElementById('mariaSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('mariaSearchClear');
  if (clearBtn) clearBtn.classList.add('hidden');

  document.querySelectorAll('#mariaView .nav-tabs .nav-tab').forEach(t => t.classList.remove('active'));
  const tabTitulos = document.getElementById('tabMariaTitulos');
  if (tabTitulos) tabTitulos.classList.add('active');

  renderMariaGrid();
};

window.filterMariaAba = function (aba, btnEl) {
  currentMariaAba = aba;
  if (btnEl) {
    document.querySelectorAll('#mariaView .nav-tabs .nav-tab').forEach(t => t.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderMariaGrid();
};

window.handleMariaSearch = function (query) {
  currentMariaSearch = (query || '').trim();
  const clearBtn = document.getElementById('mariaSearchClear');
  if (clearBtn) clearBtn.classList.toggle('hidden', currentMariaSearch.length === 0);
  renderMariaGrid();
};

window.clearMariaSearch = function () {
  currentMariaSearch = '';
  const input = document.getElementById('mariaSearchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  const clearBtn = document.getElementById('mariaSearchClear');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderMariaGrid();
};

window.setMariaQuickSearch = function (term) {
  const input = document.getElementById('mariaSearchInput');
  if (input) {
    input.value = term;
    input.focus();
  }
  window.handleMariaSearch(term);
};

window.renderMariaGrid = function () {
  const container = document.getElementById('mariaContentGrid');
  if (!container) return;

  const isSearching = currentMariaSearch.length > 0;
  const normQ = isSearching ? normalizeSearchText(currentMariaSearch) : '';
  const searchTerms = isSearching ? normQ.split(/\s+/).filter(Boolean) : [];

  let html = '';

  if (currentMariaAba === 'titulos') {
    let titulos = getMariaTitulos();
    if (isSearching) {
      titulos = titulos.filter(t => {
        const full = normalizeSearchText(`${t.nome} ${t.subtitulo} ${t.localAno} ${t.historia} ${t.mensagem} ${t.oracao} ${(t.tags || []).join(' ')}`);
        return searchTerms.every(term => full.includes(term));
      });
    }

    if (titulos.length === 0) {
      container.innerHTML = renderMariaEmptySearch();
      return;
    }

    titulos.forEach(t => {
      const nomeHl = isSearching ? highlightSearchTerms(t.nome, currentMariaSearch) : t.nome;
      const subHl = isSearching ? highlightSearchTerms(t.subtitulo, currentMariaSearch) : t.subtitulo;

      html += `
        <div class="maria-item-card">
          <div class="maria-card-top">
            <div class="maria-icon-box" style="background: rgba(59, 130, 246, 0.15); color: ${t.cor || '#60a5fa'}; border: 1px solid rgba(96, 165, 250, 0.3);">
              <i class="fas ${t.icone}"></i>
            </div>
            <div class="maria-card-title-group">
              <span class="maria-liturgical-badge">Festa: ${t.dataFesta}</span>
              <h3 class="maria-card-title">${nomeHl}</h3>
              <div class="maria-card-meta">
                <span><i class="fas fa-location-dot" style="color: ${t.cor};"></i> ${t.localAno}</span>
              </div>
            </div>
          </div>

          <div class="maria-quote-box">
            ${t.citacaoBiblica}
          </div>

          <p class="maria-historia-excerpt">${t.historia}</p>

          <div class="maria-card-actions">
            <button class="maria-read-btn" onclick="openMariaDetail('${t.id}', 'titulo')">
              <i class="fas fa-book-open"></i> História & Oração
            </button>
            <button class="maria-action-icon-btn ${isMariaAudioSpeaking && currentMariaSpeakingId === t.id ? 'playing' : ''}" 
                    onclick="speakMariaItem('${t.id}', 'titulo')" title="Ouvir Oração">
              <i class="fas ${isMariaAudioSpeaking && currentMariaSpeakingId === t.id ? 'fa-stop' : 'fa-volume-up'}"></i>
            </button>
            <button class="maria-action-icon-btn whatsapp-btn" onclick="shareMariaWhatsApp('${t.id}', 'titulo')" title="Compartilhar no WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </button>
          </div>
        </div>
      `;
    });
  } else if (currentMariaAba === 'oracoes') {
    let oracoes = getMariaOracoes();
    if (isSearching) {
      oracoes = oracoes.filter(o => {
        const full = normalizeSearchText(`${o.titulo} ${o.subtitulo} ${o.texto} ${(o.tags || []).join(' ')}`);
        return searchTerms.every(term => full.includes(term));
      });
    }

    if (oracoes.length === 0) {
      container.innerHTML = renderMariaEmptySearch();
      return;
    }

    oracoes.forEach(o => {
      const titleHl = isSearching ? highlightSearchTerms(o.titulo, currentMariaSearch) : o.titulo;
      const subHl = isSearching ? highlightSearchTerms(o.subtitulo, currentMariaSearch) : o.subtitulo;

      html += `
        <div class="maria-item-card">
          <div class="maria-card-top">
            <div class="maria-icon-box" style="background: rgba(212, 175, 55, 0.15); color: ${o.cor || 'var(--gold-400)'}; border: 1px solid rgba(212, 175, 55, 0.3);">
              <i class="fas ${o.icone}"></i>
            </div>
            <div class="maria-card-title-group">
              <span class="maria-liturgical-badge" style="color: var(--gold-400); border-color: rgba(212, 175, 55, 0.3); background: rgba(212, 175, 55, 0.1);">Tempo: ${o.tempoLeitura}</span>
              <h3 class="maria-card-title">${titleHl}</h3>
              <div class="maria-card-meta">
                <span><i class="fas fa-hands-praying" style="color: var(--gold-400);"></i> ${subHl}</span>
              </div>
            </div>
          </div>

          <div class="maria-prayer-preview">${o.texto}</div>

          <div class="maria-card-actions">
            <button class="maria-read-btn" style="background: linear-gradient(135deg, var(--gold-500), var(--gold-600)); color: #111;" onclick="openMariaDetail('${o.id}', 'oracao')">
              <i class="fas fa-hands-praying"></i> Rezar Completa
            </button>
            <button class="maria-action-icon-btn ${isMariaAudioSpeaking && currentMariaSpeakingId === o.id ? 'playing' : ''}" 
                    onclick="speakMariaItem('${o.id}', 'oracao')" title="Ouvir em Voz Alta">
              <i class="fas ${isMariaAudioSpeaking && currentMariaSpeakingId === o.id ? 'fa-stop' : 'fa-volume-up'}"></i>
            </button>
            <button class="maria-action-icon-btn" onclick="copyMariaText('${o.id}', 'oracao')" title="Copiar Oração">
              <i class="fas fa-copy"></i>
            </button>
            <button class="maria-action-icon-btn whatsapp-btn" onclick="shareMariaWhatsApp('${o.id}', 'oracao')" title="Compartilhar no WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </button>
          </div>
        </div>
      `;
    });
  } else if (currentMariaAba === 'dogmas') {
    let dogmas = getMariaDogmas();
    if (isSearching) {
      dogmas = dogmas.filter(d => {
        const full = normalizeSearchText(`${d.titulo} ${d.proclamacao} ${d.papaConcilio} ${d.resumo} ${d.fundamentoBiblico} ${d.explicacaoTeologica}`);
        return searchTerms.every(term => full.includes(term));
      });
    }

    if (dogmas.length === 0) {
      container.innerHTML = renderMariaEmptySearch();
      return;
    }

    dogmas.forEach(d => {
      html += `
        <div class="maria-dogma-card">
          <div class="maria-dogma-header">
            <span class="maria-dogma-num-badge">${d.numero}</span>
            <div>
              <h3 class="maria-dogma-title">${d.titulo}</h3>
              <div class="maria-dogma-meta"><i class="fas fa-scroll"></i> ${d.proclamacao} • ${d.papaConcilio}</div>
            </div>
          </div>

          <div class="maria-dogma-resumo">
            ${d.resumo}
          </div>

          <div class="maria-dogma-section-title"><i class="fas fa-book-bible"></i> Fundamento Bíblico</div>
          <p class="maria-dogma-text" style="font-style: italic; color: var(--gold-300);">${d.fundamentoBiblico}</p>

          <div class="maria-dogma-section-title"><i class="fas fa-church"></i> Explicação Teológica & Magistério</div>
          <p class="maria-dogma-text">${d.explicacaoTeologica}</p>

          <div class="maria-card-actions" style="margin-top: 14px;">
            <button class="maria-read-btn" onclick="speakMariaItem('${d.id}', 'dogma')">
              <i class="fas ${isMariaAudioSpeaking && currentMariaSpeakingId === d.id ? 'fa-stop' : 'fa-volume-up'}"></i> Ouvir Explicação
            </button>
            <button class="maria-action-icon-btn whatsapp-btn" onclick="shareMariaWhatsApp('${d.id}', 'dogma')" title="Compartilhar no WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </button>
          </div>
        </div>
      `;
    });
  } else if (currentMariaAba === 'praticas') {
    let praticas = getMariaPraticas();
    praticas.forEach(p => {
      html += `
        <div class="maria-item-card">
          <div class="maria-card-top">
            <div class="maria-icon-box" style="background: rgba(2, 132, 199, 0.15); color: ${p.cor}; border: 1px solid rgba(2, 132, 199, 0.3);">
              <i class="fas ${p.icone}"></i>
            </div>
            <div class="maria-card-title-group">
              <span class="maria-liturgical-badge">Devoção Solene</span>
              <h3 class="maria-card-title">${p.titulo}</h3>
              <div class="maria-card-meta"><span>${p.subtitulo}</span></div>
            </div>
          </div>

          <div style="margin: 12px 0;">
            <h4 style="font-size: 12px; font-weight: 700; color: var(--gold-400); text-transform: uppercase; margin-bottom: 8px;">
              <i class="fas fa-list-check"></i> Como Praticar os Passos:
            </h4>
            ${p.passos.map(s => `
              <div style="display: flex; gap: 8px; margin-bottom: 8px; font-size: 13px; line-height: 1.45;">
                <span style="font-weight: 800; color: #38bdf8; min-width: 18px;">${s.num}.</span>
                <div><strong style="color: var(--text-primary);">${s.titulo}:</strong> <span style="color: var(--text-secondary);">${s.desc}</span></div>
              </div>
            `).join('')}
          </div>

          <div class="maria-quote-box" style="border-left-color: var(--gold-400); background: rgba(212, 175, 55, 0.08);">
            <strong>Promessa da Virgem:</strong> ${p.promessa}
          </div>

          <div class="maria-card-actions">
            <button class="maria-read-btn" onclick="speakMariaItem('${p.id}', 'pratica')">
              <i class="fas ${isMariaAudioSpeaking && currentMariaSpeakingId === p.id ? 'fa-stop' : 'fa-volume-up'}"></i> Ouvir Devoção
            </button>
            <button class="maria-action-icon-btn whatsapp-btn" onclick="shareMariaWhatsApp('${p.id}', 'pratica')" title="Compartilhar no WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </button>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
};

function renderMariaEmptySearch() {
  return `
    <div style="text-align: center; padding: 40px 20px; color: var(--text-muted); grid-column: 1 / -1;">
      <i class="fas fa-crown" style="font-size: 36px; opacity: 0.4; margin-bottom: 12px; display: block; color: #60a5fa;"></i>
      <p style="font-size: 15px; font-weight: 600; color: var(--text-primary);">Nenhum conteúdo mariano encontrado para "${currentMariaSearch}"</p>
      <p style="font-size: 12.5px; margin-top: 4px;">Tente buscar por <em>Aparecida, Fátima, Guadalupe, Lourdes, Desatadora, Ângelus, Consagração, Dogmas</em>.</p>
      <button class="upload-btn-secondary" onclick="clearMariaSearch()" style="margin-top: 14px; font-size: 12px; padding: 7px 16px;">
        <i class="fas fa-times"></i> Limpar Busca
      </button>
    </div>
  `;
}

window.openMariaDetail = function (id, tipo) {
  const item = getMariaItemPorId(id);
  if (!item) return;

  const modal = document.getElementById('mariaDetailModal');
  const modalContent = document.getElementById('mariaModalContent');
  if (!modal || !modalContent) return;

  let html = '';
  if (tipo === 'titulo') {
    html = `
      <div class="maria-modal-header-banner">
        <div class="maria-modal-icon-wrap" style="background: rgba(59, 130, 246, 0.15); color: ${item.cor}; border: 1px solid rgba(96, 165, 250, 0.3);">
          <i class="fas ${item.icone}"></i>
        </div>
        <div class="maria-modal-title-wrap">
          <span class="maria-liturgical-badge">Festa: ${item.dataFesta}</span>
          <h3>${item.nome}</h3>
          <span class="maria-modal-subtitle">${item.subtitulo} • ${item.localAno}</span>
        </div>
      </div>

      <div class="maria-quote-box">${item.citacaoBiblica}</div>

      <h4 style="font-size: 13px; font-weight: 700; color: var(--gold-400); text-transform: uppercase; margin-top: 14px;">
        <i class="fas fa-scroll"></i> História Sagrada & Aparição
      </h4>
      <div class="maria-modal-full-text">${item.historia}</div>

      <div class="maria-theme-box">
        <div class="maria-theme-label"><i class="fas fa-heart"></i> Mensagem para Nossas Vidas</div>
        <div class="maria-theme-text">${item.mensagem}</div>
      </div>

      <h4 style="font-size: 13px; font-weight: 700; color: #60a5fa; text-transform: uppercase; margin-top: 16px;">
        <i class="fas fa-hands-praying"></i> Oração Própria
      </h4>
      <div class="maria-modal-oracao-highlight">${item.oracao}</div>

      <div class="maria-modal-bottom-actions">
        <button class="maria-read-btn" onclick="speakMariaItem('${item.id}', 'titulo')">
          <i class="fas ${isMariaAudioSpeaking && currentMariaSpeakingId === item.id ? 'fa-stop' : 'fa-volume-up'}"></i> Ouvir Oração
        </button>
        <button class="hero-share-btn" onclick="shareMariaWhatsApp('${item.id}', 'titulo')">
          <i class="fab fa-whatsapp"></i> Enviar no WhatsApp
        </button>
        <button class="upload-btn-secondary" onclick="copyMariaText('${item.id}', 'titulo')">
          <i class="fas fa-copy"></i> Copiar
        </button>
      </div>
    `;
  } else if (tipo === 'oracao') {
    html = `
      <div class="maria-modal-header-banner">
        <div class="maria-modal-icon-wrap" style="background: rgba(212, 175, 55, 0.15); color: ${item.cor || 'var(--gold-400)'}; border: 1px solid rgba(212, 175, 55, 0.3);">
          <i class="fas ${item.icone}"></i>
        </div>
        <div class="maria-modal-title-wrap">
          <span class="maria-liturgical-badge" style="color: var(--gold-400); border-color: rgba(212, 175, 55, 0.3); background: rgba(212, 175, 55, 0.1);">Tempo: ${item.tempoLeitura}</span>
          <h3>${item.titulo}</h3>
          <span class="maria-modal-subtitle">${item.subtitulo}</span>
        </div>
      </div>

      <div class="maria-modal-oracao-highlight" style="font-size: 15px; line-height: 1.75;">
        ${item.texto}
      </div>

      <div class="maria-modal-bottom-actions">
        <button class="maria-read-btn" style="background: linear-gradient(135deg, var(--gold-500), var(--gold-600)); color: #111;" onclick="speakMariaItem('${item.id}', 'oracao')">
          <i class="fas ${isMariaAudioSpeaking && currentMariaSpeakingId === item.id ? 'fa-stop' : 'fa-volume-up'}"></i> Ouvir Oração
        </button>
        <button class="hero-share-btn" onclick="shareMariaWhatsApp('${item.id}', 'oracao')">
          <i class="fab fa-whatsapp"></i> Compartilhar no WhatsApp
        </button>
        <button class="upload-btn-secondary" onclick="copyMariaText('${item.id}', 'oracao')">
          <i class="fas fa-copy"></i> Copiar Texto
        </button>
      </div>
    `;
  } else if (tipo === 'dogma') {
    html = `
      <div class="maria-modal-header-banner">
        <div class="maria-modal-icon-wrap" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3);">
          <i class="fas ${item.icone}"></i>
        </div>
        <div class="maria-modal-title-wrap">
          <span class="maria-liturgical-badge" style="color: #8b5cf6; border-color: rgba(139, 92, 246, 0.3); background: rgba(139, 92, 246, 0.1);">${item.numero}</span>
          <h3>${item.titulo}</h3>
          <span class="maria-modal-subtitle">${item.proclamacao} • ${item.papaConcilio}</span>
        </div>
      </div>

      <div class="maria-dogma-resumo" style="margin: 12px 0;">${item.resumo}</div>

      <h4 style="font-size: 13px; font-weight: 700; color: var(--gold-400); text-transform: uppercase; margin-top: 14px;">
        <i class="fas fa-book-bible"></i> Fundamento Bíblico
      </h4>
      <div class="maria-modal-full-text" style="font-style: italic; color: var(--gold-300);">${item.fundamentoBiblico}</div>

      <h4 style="font-size: 13px; font-weight: 700; color: #8b5cf6; text-transform: uppercase; margin-top: 14px;">
        <i class="fas fa-church"></i> Explicação Teológica & Magistério
      </h4>
      <div class="maria-modal-full-text">${item.explicacaoTeologica}</div>

      <div class="maria-modal-bottom-actions">
        <button class="maria-read-btn" onclick="speakMariaItem('${item.id}', 'dogma')">
          <i class="fas ${isMariaAudioSpeaking && currentMariaSpeakingId === item.id ? 'fa-stop' : 'fa-volume-up'}"></i> Ouvir Explicação
        </button>
        <button class="hero-share-btn" onclick="shareMariaWhatsApp('${item.id}', 'dogma')">
          <i class="fab fa-whatsapp"></i> Compartilhar no WhatsApp
        </button>
      </div>
    `;
  }

  modalContent.innerHTML = html;
  modal.classList.remove('hidden');
};

window.closeMariaModal = function () {
  const modal = document.getElementById('mariaDetailModal');
  if (modal) modal.classList.add('hidden');
};

window.stopMariaSpeech = async function () {
  isMariaAudioSpeaking = false;
  currentMariaSpeakingId = null;
  try {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
      await window.Capacitor.Plugins.TextToSpeech.stop();
    }
  } catch (e) {}
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  renderMariaGrid();
};

window.speakMariaItem = async function (id, tipo) {
  if (isMariaAudioSpeaking && currentMariaSpeakingId === id) {
    await stopMariaSpeech();
    return;
  }

  await stopMariaSpeech();

  const item = getMariaItemPorId(id);
  if (!item) return;

  let speakText = '';
  if (tipo === 'titulo') {
    speakText = `${item.nome}. ${item.subtitulo}. ${item.citacaoBiblica}. Oração: ${item.oracao}`;
  } else if (tipo === 'oracao') {
    speakText = `${item.titulo}. ${item.subtitulo}. ${item.texto}`;
  } else if (tipo === 'dogma') {
    speakText = `${item.numero}. ${item.titulo}. ${item.proclamacao}. Resumo: ${item.resumo}. Fundamento Bíblico: ${item.fundamentoBiblico}. Explicação Teológica: ${item.explicacaoTeologica}`;
  } else if (tipo === 'pratica') {
    speakText = `${item.titulo}. ${item.subtitulo}. Promessa: ${item.promessa}`;
  }

  isMariaAudioSpeaking = true;
  currentMariaSpeakingId = id;
  renderMariaGrid();

  try {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
      await window.Capacitor.Plugins.TextToSpeech.speak({
        text: speakText,
        lang: 'pt-BR',
        rate: 0.95,
        pitch: 1.0,
        category: 'ambient'
      });
      stopMariaSpeech();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speakText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = () => stopMariaSpeech();
      utterance.onerror = () => stopMariaSpeech();
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.error("Maria TTS Error:", e);
    stopMariaSpeech();
  }
};

window.copyMariaText = async function (id, tipo) {
  const item = getMariaItemPorId(id);
  if (!item) return;

  let textToCopy = '';
  if (tipo === 'titulo') {
    textToCopy = `🌹 *${item.nome}* (${item.subtitulo})\n\n${item.citacaoBiblica}\n\n🙏 *Oração:*\n${item.oracao}\n\n📲 *Aplicativo Bíblia Sagrada Católica*\nhttps://bibliasagradaavemaria.com.br`;
  } else if (tipo === 'oracao') {
    textToCopy = `📿 *${item.titulo}*\n_${item.subtitulo}_\n\n${item.texto}\n\n📲 *Aplicativo Bíblia Sagrada Católica*\nhttps://bibliasagradaavemaria.com.br`;
  }

  const ok = await copyToClipboard(textToCopy);
  if (ok) {
    showToast('✨ Oração copiada com sucesso!');
  } else {
    showToast('❌ Não foi possível copiar.');
  }
};

window.shareMariaWhatsApp = function (id, tipo) {
  const item = getMariaItemPorId(id);
  if (!item) return;

  let msg = '';
  if (tipo === 'titulo') {
    msg = `🌹 *${item.nome}* — ${item.subtitulo}\n\n`;
    msg += `📖 *Palavra de Deus:*\n${item.citacaoBiblica}\n\n`;
    msg += `🙏 *Oração Própria:*\n${item.oracao}\n\n`;
    msg += `✨ *Reze com o App da Bíblia Sagrada Católica:*\nhttps://bibliasagradaavemaria.com.br`;
  } else if (tipo === 'oracao') {
    msg = `📿 *${item.titulo}*\n_${item.subtitulo}_\n\n`;
    msg += `${item.texto}\n\n`;
    msg += `✨ *Reze com o App da Bíblia Sagrada Católica:*\nhttps://bibliasagradaavemaria.com.br`;
  } else if (tipo === 'dogma') {
    msg = `🕊️ *${item.numero}: ${item.titulo}*\n_${item.proclamacao}_\n\n`;
    msg += `✨ *Doutrina da Igreja:*\n${item.resumo}\n\n`;
    msg += `📖 *Fundamento Bíblico:*\n${item.fundamentoBiblico}\n\n`;
    msg += `📲 *Aplicativo Bíblia Sagrada Católica:*\nhttps://bibliasagradaavemaria.com.br`;
  } else if (tipo === 'pratica') {
    msg = `📜 *${item.titulo}*\n_${item.subtitulo}_\n\n`;
    msg += `✨ *Promessa de Nossa Senhora:*\n${item.promessa}\n\n`;
    msg += `📲 *Aplicativo Bíblia Sagrada Católica:*\nhttps://bibliasagradaavemaria.com.br`;
  }

  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
};







