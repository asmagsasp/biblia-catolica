import './style.css';
import * as db from './db.js';

// ===== STATE =====
let allBooks = [];
let currentBook = null;
let currentChapter = 1;
let totalChapters = 0;
let heroData = null;
let planData = null;
let readingPlanDays = JSON.parse(localStorage.getItem('biblia_plan_days') || '{}');

// ===== INIT =====
async function init() {
  // Restore theme
  const savedTheme = localStorage.getItem('biblia_theme') || 'dark';
  setTheme(savedTheme);

  // Load data
  await db.initDB();

  // Remove splash
  const splash = document.getElementById('splash');
  splash.classList.add('fade-out');
  setTimeout(() => splash.remove(), 600);

  // Load UI
  allBooks = db.getLivros();
  renderBooks(allBooks);
  loadVersiculoDoDia();
  loadStats();

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
}

window.toggleTheme = function () {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'dark' ? 'light' : 'dark');
};

// ===== STATS =====
function loadStats() {
  const s = db.getStats();
  document.getElementById('statsBar').innerHTML = `
        <div class="stat-item"><span class="stat-number">${s.total_livros}</span><span class="stat-label">Livros</span></div>
        <div class="stat-item"><span class="stat-number">${(s.total_versiculos / 1000).toFixed(1)}k</span><span class="stat-label">Versículos</span></div>
        <div class="stat-item"><span class="stat-number">${s.total_imagens}</span><span class="stat-label">Imagens</span></div>
        <div class="stat-item"><span class="stat-number">${s.total_favoritos}</span><span class="stat-label">Favoritos</span></div>
    `;
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
function loadVersiculoDoDia() {
  heroData = db.getVersiculoDoDia();
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
function openBook(id, nome, total) {
  if (!total) { const l = allBooks.find(b => b.id_livro === id); total = l ? l.total_capitulos : 1; }
  currentBook = { id, nome, total };
  totalChapters = total;
  currentChapter = 1;
  showView('chapterView');
  document.getElementById('chapterTitle').textContent = nome;
  document.getElementById('chapterSubtitle').textContent = `${total} capítulos`;
  renderChapterSelector();
  loadVerses();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderChapterSelector() {
  let h = '';
  for (let i = 1; i <= totalChapters; i++) h += `<button class="chapter-btn ${i === currentChapter ? 'active' : ''}" data-cap="${i}">${i}</button>`;
  document.getElementById('chaptersSelector').innerHTML = h;
}

// Event delegation para capitulos
document.getElementById('chaptersSelector').addEventListener('click', e => {
  const btn = e.target.closest('.chapter-btn');
  if (btn) selectChapter(parseInt(btn.dataset.cap));
});

function selectChapter(n) {
  currentChapter = n;
  renderChapterSelector();
  loadVerses();
  document.getElementById('versesContainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function loadVerses() {
  const c = document.getElementById('versesContainer');
  const verses = db.getVersiculos(currentBook.id, currentChapter);
  if (verses.length) {
    c.innerHTML = verses.map(v => `
            <div class="verse" data-v="${v.id_versiculo}">
                <span class="verse-number">${v.id_versiculo}</span>
                <span class="verse-text">${v.texto}</span>
                <div class="verse-actions">
                    <button class="verse-action-btn fav-btn ${v.favorito ? 'favorited' : ''}" data-livro="${currentBook.id}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" title="Favoritar"><i class="fas fa-heart"></i></button>
                    <button class="verse-action-btn whatsapp wa-btn" data-livro="${currentBook.nome}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                    <button class="verse-action-btn copy-btn" data-livro="${currentBook.nome}" data-cap="${currentChapter}" data-ver="${v.id_versiculo}" data-txt="${v.texto.replace(/"/g, '&quot;')}" title="Copiar"><i class="fas fa-copy"></i></button>
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
document.getElementById('versesContainer').addEventListener('click', e => {
  const favBtn = e.target.closest('.fav-btn');
  if (favBtn) {
    e.stopPropagation();
    const result = db.toggleFavorito(
      parseInt(favBtn.dataset.livro),
      parseInt(favBtn.dataset.cap),
      parseInt(favBtn.dataset.ver)
    );
    favBtn.classList.toggle('favorited', result === 1);
    showToast(result ? '\u2764\uFE0F Adicionado aos favoritos' : 'Removido dos favoritos');
    loadStats();
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
});

// ===== SEARCH =====
function doSearch() {
  const t = document.getElementById('searchInput').value.trim();
  if (t.length < 3) { showToast('Digite ao menos 3 caracteres'); return; }
  showView('searchView');
  const resultados = db.buscar(t);
  let h = `<div class="chapter-header"><div class="chapter-header-left"><button class="btn-back" onclick="goHome()"><i class="fas fa-arrow-left"></i></button><div><h2 class="chapter-title">Resultados da Busca</h2><p class="chapter-subtitle">${resultados.length} resultado${resultados.length !== 1 ? 's' : ''} para "${t}"</p></div></div></div>`;
  if (!resultados.length) h += '<p style="color:var(--text-muted);text-align:center;padding:40px;">Nenhum resultado encontrado.</p>';
  else resultados.forEach(r => {
    const hl = r.texto.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>');
    h += `<div class="search-result-item" data-livro="${r.id_livro}" data-nome="${r.nome_livro}" data-cap="${r.id_capitulo}">
            <div class="search-result-ref">${r.nome_livro} ${r.id_capitulo},${r.id_versiculo}</div>
            <div class="search-result-text">${hl}</div>
        </div>`;
  });
  document.getElementById('searchResults').innerHTML = h;
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
  const d = db.getFavoritos();
  let h = `<div class="chapter-header"><div class="chapter-header-left"><button class="btn-back" onclick="goHome()"><i class="fas fa-arrow-left"></i></button><div><h2 class="chapter-title">Meus Favoritos</h2><p class="chapter-subtitle">${d.length} versículo${d.length !== 1 ? 's' : ''} salvos</p></div></div></div>`;
  if (!d.length) h += `<div class="favorites-empty"><i class="far fa-heart"></i><p>Nenhum versículo favoritado ainda.</p><p style="margin-top:6px;font-size:11px">Clique no \u2764\uFE0F para salvar versículos aqui.</p></div>`;
  else d.forEach(r => {
    h += `<div class="search-result-item" data-livro="${r.id_livro}" data-nome="${r.nome_livro}" data-cap="${r.id_capitulo}">
            <div class="search-result-ref">${r.nome_livro} ${r.id_capitulo},${r.id_versiculo}</div>
            <div class="search-result-text">${r.texto}</div>
        </div>`;
  });
  document.getElementById('favoritesContainer').innerHTML = h;
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
  const imgs = db.getImgVersiculos();
  g.innerHTML = imgs.map(img => `
        <div class="gallery-card">
            <img src="${img.address}" alt="${img.nome_livro} ${img.id_capitulo},${img.id_versiculo}" loading="lazy"
                 onerror="this.parentElement.style.background='var(--burgundy-700)';this.style.display='none'">
            <div class="gallery-card-overlay">
                <div class="gallery-card-text">${img.texto}</div>
                <div class="gallery-card-ref">${img.nome_livro} ${img.id_capitulo},${img.id_versiculo}</div>
            </div>
            <div class="gallery-card-actions">
                <button class="gallery-action-btn gallery-wa" data-txt="${img.texto.replace(/"/g, '&quot;')}" data-livro="${img.nome_livro}" data-cap="${img.id_capitulo}" data-ver="${img.id_versiculo}" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
            </div>
        </div>
    `).join('');
  g.dataset.loaded = '1';
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
  if (c.dataset.loaded) { updatePlanProgress(); return; }

  const plan = db.getPlanoLeitura();
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
                <div class="plan-day-title">${isToday ? '\uD83D\uDCD6 Leitura de Hoje' : `Dia ${d.dia}`}</div>
                <div class="plan-day-desc">${leituras}</div>
            </div>
            <div class="plan-day-check"><i class="fas fa-check"></i></div>
        </div>`;
  });
  c.innerHTML = h;
  c.dataset.loaded = '1';
  updatePlanProgress();

  setTimeout(() => {
    const todayEl = document.querySelector('.plan-day.today');
    if (todayEl) todayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
};

document.getElementById('planContainer').addEventListener('click', e => {
  const day = e.target.closest('.plan-day');
  if (day) {
    const dia = parseInt(day.dataset.dia);
    readingPlanDays[dia] = !readingPlanDays[dia];
    localStorage.setItem('biblia_plan_days', JSON.stringify(readingPlanDays));
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
  ['homeView', 'chapterView', 'searchView', 'favoritesView', 'galleryView', 'planView'].forEach(v => {
    document.getElementById(v).classList.toggle('hidden', v !== id);
  });
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  const map = { homeView: 'bnHome', galleryView: 'bnGallery', planView: 'bnPlan', favoritesView: 'bnFav' };
  if (map[id]) { const btn = document.getElementById(map[id]); if (btn) btn.classList.add('active'); }
}

window.goHome = function () {
  showView('homeView');
  document.getElementById('searchInput').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
