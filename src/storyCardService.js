// src/storyCardService.js
// Gerador de Cards Sacros para Redes Sociais (WhatsApp Status, Instagram Stories, Facebook)
// Renderização em alta definição 1080x1920 (proporção 9:16) com arte sacra, vitrais e tipografia católica nobre.

export const STORY_THEMES = [
  {
    id: 'celeste',
    nome: 'Noite Celeste',
    subtitulo: 'Glória Celestial',
    icone: 'fa-star',
    bgImage: 'assets/social/4_fundo_reels_celeste.jpg',
    overlayGrad: [
      { stop: 0, color: 'rgba(8, 14, 28, 0.68)' },
      { stop: 0.35, color: 'rgba(6, 11, 24, 0.76)' },
      { stop: 0.70, color: 'rgba(4, 8, 18, 0.85)' },
      { stop: 1, color: 'rgba(2, 4, 10, 0.94)' }
    ],
    accentColor: '#F3E5AB',
    goldBorder: 'rgba(212, 175, 55, 0.50)',
    quoteColor: '#E6C36A',
    badgeBg: 'rgba(212, 175, 55, 0.16)',
    badgeBorder: 'rgba(212, 175, 55, 0.50)'
  },
  {
    id: 'velas',
    nome: 'Velas & Oração',
    subtitulo: 'Chama & Intimidade',
    icone: 'fa-fire',
    bgImage: 'assets/social/3_capa_vela_virtual.jpg',
    overlayGrad: [
      { stop: 0, color: 'rgba(28, 12, 5, 0.68)' },
      { stop: 0.35, color: 'rgba(20, 8, 3, 0.78)' },
      { stop: 0.70, color: 'rgba(14, 5, 2, 0.86)' },
      { stop: 1, color: 'rgba(8, 2, 1, 0.94)' }
    ],
    accentColor: '#FFE082',
    goldBorder: 'rgba(255, 183, 77, 0.55)',
    quoteColor: '#FFA726',
    badgeBg: 'rgba(255, 167, 38, 0.18)',
    badgeBorder: 'rgba(255, 183, 77, 0.55)'
  },
  {
    id: 'fatima',
    nome: 'Virgem de Fátima',
    subtitulo: 'Rainha do Rosário',
    icone: 'fa-dove',
    bgImage: 'assets/aparicoes/fatima.jpg',
    overlayGrad: [
      { stop: 0, color: 'rgba(10, 22, 36, 0.70)' },
      { stop: 0.35, color: 'rgba(7, 16, 28, 0.80)' },
      { stop: 0.70, color: 'rgba(4, 10, 20, 0.88)' },
      { stop: 1, color: 'rgba(2, 5, 12, 0.95)' }
    ],
    accentColor: '#E0F2FE',
    goldBorder: 'rgba(56, 189, 248, 0.50)',
    quoteColor: '#7DD3FC',
    badgeBg: 'rgba(56, 189, 248, 0.18)',
    badgeBorder: 'rgba(56, 189, 248, 0.50)'
  },
  {
    id: 'aparecida',
    nome: 'Padroeira Aparecida',
    subtitulo: 'Manto & Coroa Real',
    icone: 'fa-crown',
    bgImage: 'assets/aparicoes/aparecida.jpg',
    overlayGrad: [
      { stop: 0, color: 'rgba(14, 20, 42, 0.70)' },
      { stop: 0.35, color: 'rgba(9, 14, 30, 0.80)' },
      { stop: 0.70, color: 'rgba(5, 9, 22, 0.88)' },
      { stop: 1, color: 'rgba(2, 4, 12, 0.95)' }
    ],
    accentColor: '#FEF08A',
    goldBorder: 'rgba(234, 179, 8, 0.55)',
    quoteColor: '#FACC15',
    badgeBg: 'rgba(234, 179, 8, 0.18)',
    badgeBorder: 'rgba(234, 179, 8, 0.55)'
  },
  {
    id: 'guadalupe',
    nome: 'Virgem de Guadalupe',
    subtitulo: 'Estrela das Américas',
    icone: 'fa-spa',
    bgImage: 'assets/aparicoes/guadalupe.jpg',
    overlayGrad: [
      { stop: 0, color: 'rgba(24, 10, 18, 0.70)' },
      { stop: 0.35, color: 'rgba(18, 7, 14, 0.80)' },
      { stop: 0.70, color: 'rgba(12, 4, 9, 0.88)' },
      { stop: 1, color: 'rgba(6, 2, 5, 0.95)' }
    ],
    accentColor: '#FBCFE8',
    goldBorder: 'rgba(244, 114, 182, 0.50)',
    quoteColor: '#F472B6',
    badgeBg: 'rgba(244, 114, 182, 0.18)',
    badgeBorder: 'rgba(244, 114, 182, 0.50)'
  },
  {
    id: 'catedral',
    nome: 'Catedral & Vitral',
    subtitulo: 'Luz Sagrada Gótica',
    icone: 'fa-church',
    bgImage: null,
    procedural: 'catedral',
    overlayGrad: [
      { stop: 0, color: 'rgba(40, 15, 32, 0.85)' },
      { stop: 0.4, color: 'rgba(22, 8, 20, 0.90)' },
      { stop: 1, color: 'rgba(10, 3, 10, 0.96)' }
    ],
    accentColor: '#FDE68A',
    goldBorder: 'rgba(212, 175, 55, 0.60)',
    quoteColor: '#D4AF37',
    badgeBg: 'rgba(212, 175, 55, 0.20)',
    badgeBorder: 'rgba(212, 175, 55, 0.60)'
  },
  {
    id: 'ouro',
    nome: 'Pergaminho Sacro',
    subtitulo: 'Ouro Real & Manuscrito',
    icone: 'fa-scroll',
    bgImage: null,
    procedural: 'ouro',
    overlayGrad: [
      { stop: 0, color: 'rgba(28, 18, 8, 0.85)' },
      { stop: 0.4, color: 'rgba(16, 10, 4, 0.92)' },
      { stop: 1, color: 'rgba(8, 4, 1, 0.97)' }
    ],
    accentColor: '#FFF1C5',
    goldBorder: 'rgba(245, 158, 11, 0.65)',
    quoteColor: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.20)',
    badgeBorder: 'rgba(245, 158, 11, 0.65)'
  },
  {
    id: 'purpura',
    nome: 'Púrpura Imperial',
    subtitulo: 'Realeza de Cristo Rei',
    icone: 'fa-cross',
    bgImage: null,
    procedural: 'purpura',
    overlayGrad: [
      { stop: 0, color: 'rgba(42, 10, 28, 0.85)' },
      { stop: 0.4, color: 'rgba(22, 4, 16, 0.92)' },
      { stop: 1, color: 'rgba(10, 1, 8, 0.97)' }
    ],
    accentColor: '#F5D0FE',
    goldBorder: 'rgba(216, 180, 254, 0.55)',
    quoteColor: '#C084FC',
    badgeBg: 'rgba(192, 132, 252, 0.18)',
    badgeBorder: 'rgba(216, 180, 254, 0.55)'
  }
];

// Cache de imagens carregadas
const imageCache = new Map();

function preloadImage(url) {
  if (!url) return Promise.resolve(null);
  if (imageCache.has(url)) return Promise.resolve(imageCache.get(url));

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    img.onerror = () => {
      console.warn('[StoryCard] Falha ao carregar imagem:', url);
      resolve(null);
    };
    img.src = url;
  });
}

// Estado do Card Atual
let currentStoryData = {
  livro: 'São Mateus',
  cap: 5,
  ver: 14,
  texto: 'Vós sois a luz do mundo. Não se pode esconder uma cidade situada sobre uma montanha.',
  oracao: '— Senhor Jesus, fazei brilhar a vossa luz em minha vida e em meu lar.',
  temaId: 'celeste',
  fontSizeMode: 'auto', // 'auto', 'normal', 'grande', 'destaque'
  showOracao: true,
  showWatermark: true,
  isRendering: false
};

// Canvas principal offscreen (1080 x 1920)
let renderCanvas = null;

export function initStoryCardService() {
  if (!renderCanvas) {
    renderCanvas = document.createElement('canvas');
    renderCanvas.width = 1080;
    renderCanvas.height = 1920;
  }
  // Pré-carrega temas principais em background
  STORY_THEMES.filter(t => t.bgImage).forEach(t => preloadImage(t.bgImage));
}

/**
 * Abre o modal de personalização e geração do card
 */
export async function openStoryCardModal({ livro, cap, ver, texto, oracao, temaId }) {
  initStoryCardService();

  currentStoryData.livro = livro || 'Bíblia Sagrada';
  currentStoryData.cap = cap || 1;
  currentStoryData.ver = ver || 1;
  currentStoryData.texto = (texto || '').trim();
  currentStoryData.oracao = (oracao || '').trim();
  if (temaId) currentStoryData.temaId = temaId;

  // Atualiza controles na tela
  const modal = document.getElementById('storyCardModal');
  if (!modal) return;

  renderThemeSelector();
  updateModalControls();

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Renderiza imediatamente o preview
  await renderLivePreview();
}

/**
 * Fecha o modal
 */
export function closeStoryCardModal() {
  const modal = document.getElementById('storyCardModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * Renderiza a lista de temas visuais no modal
 */
function renderThemeSelector() {
  const container = document.getElementById('storyThemeList');
  if (!container) return;

  container.innerHTML = STORY_THEMES.map(theme => {
    const isActive = theme.id === currentStoryData.temaId;
    return `
      <button type="button" 
              class="story-theme-chip ${isActive ? 'active' : ''}" 
              data-theme-id="${theme.id}"
              onclick="selectStoryTheme('${theme.id}')"
              title="${theme.nome} — ${theme.subtitulo}">
        <i class="fas ${theme.icone} story-theme-chip-icon"></i>
        <div class="story-theme-chip-info">
          <span class="story-theme-chip-title">${theme.nome}</span>
          <span class="story-theme-chip-sub">${theme.subtitulo}</span>
        </div>
        ${isActive ? '<i class="fas fa-check story-theme-chip-check"></i>' : ''}
      </button>
    `;
  }).join('');
}

/**
 * Atualiza os controles do modal (tamanho da fonte, toggles)
 */
function updateModalControls() {
  // Botoes de tamanho de fonte
  const sizeBtns = document.querySelectorAll('.story-size-btn');
  sizeBtns.forEach(btn => {
    const mode = btn.dataset.sizeMode;
    btn.classList.toggle('active', mode === currentStoryData.fontSizeMode);
  });

  // Checkboxes
  const oracaoCheckbox = document.getElementById('storyToggleOracao');
  const oracaoBox = document.getElementById('storyOracaoOptionBox');
  if (oracaoBox) {
    oracaoBox.style.display = currentStoryData.oracao ? 'flex' : 'none';
  }
  if (oracaoCheckbox) {
    oracaoCheckbox.checked = currentStoryData.showOracao && !!currentStoryData.oracao;
  }

  const watermarkCheckbox = document.getElementById('storyToggleWatermark');
  if (watermarkCheckbox) {
    watermarkCheckbox.checked = currentStoryData.showWatermark;
  }
}

/**
 * Altera o tema selecionado
 */
export function selectStoryTheme(themeId) {
  currentStoryData.temaId = themeId;
  renderThemeSelector();
  renderLivePreview();
}

/**
 * Altera o tamanho da fonte do versículo
 */
export function setStoryFontSizeMode(mode) {
  currentStoryData.fontSizeMode = mode;
  updateModalControls();
  renderLivePreview();
}

/**
 * Alterna a oração/meditação no card
 */
export function toggleStoryOracao(checked) {
  currentStoryData.showOracao = checked;
  renderLivePreview();
}

/**
 * Alterna a marca d'água no card
 */
export function toggleStoryWatermark(checked) {
  currentStoryData.showWatermark = checked;
  renderLivePreview();
}

/**
 * Renderiza o Card em 1080x1920 no Canvas e projeta no preview do Modal
 */
export async function renderLivePreview() {
  if (!renderCanvas) initStoryCardService();
  if (currentStoryData.isRendering) return;
  currentStoryData.isRendering = true;

  const spinner = document.getElementById('storyCardSpinner');
  if (spinner) spinner.classList.remove('hidden');

  try {
    // Aguarda fontes web (Cinzel, Cormorant Garamond) estarem prontas
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const theme = STORY_THEMES.find(t => t.id === currentStoryData.temaId) || STORY_THEMES[0];
    let bgImg = null;
    if (theme.bgImage) {
      bgImg = await preloadImage(theme.bgImage);
    }

    // Desenha tudo no canvas 1080x1920
    drawStoryCard(renderCanvas, currentStoryData, theme, bgImg);

    // Atualiza o canvas de preview na tela
    const previewCanvas = document.getElementById('storyPreviewCanvas');
    if (previewCanvas) {
      previewCanvas.width = 1080;
      previewCanvas.height = 1920;
      const pCtx = previewCanvas.getContext('2d');
      pCtx.drawImage(renderCanvas, 0, 0);
    }
  } catch (err) {
    console.error('[StoryCard] Erro ao renderizar card:', err);
  } finally {
    currentStoryData.isRendering = false;
    if (spinner) spinner.classList.add('hidden');
  }
}

/**
 * Núcleo do Gerador Gráfico 1080x1920
 */
function drawStoryCard(canvas, data, theme, bgImg) {
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1920;

  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // 1. Fundo Base
  if (bgImg) {
    // Desenha imagem cobrindo todo o canvas mantendo aspecto centralizado
    drawImageCover(ctx, bgImg, 0, 0, W, H);
  } else {
    // Fundo Procedural Católico
    drawProceduralBackground(ctx, theme.procedural || 'catedral', W, H);
  }

  // 2. Sobreposição Atmosférica e Vinheta Escura para Contraste Supremo
  const overlay = ctx.createLinearGradient(0, 0, 0, H);
  (theme.overlayGrad || []).forEach(g => {
    overlay.addColorStop(g.stop, g.color);
  });
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  // Vinheta radial central
  const rad = ctx.createRadialGradient(W / 2, H * 0.48, 120, W / 2, H * 0.48, 860);
  rad.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
  rad.addColorStop(0.55, 'rgba(0, 0, 0, 0.05)');
  rad.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, W, H);

  // 3. Moldura Sacra Dupla e Cantoneiras Litúrgicas
  drawSacredFrame(ctx, W, H, theme.goldBorder || 'rgba(212, 175, 55, 0.50)');

  // 4. Cabeçalho Sagrado (Cruz Latina Gloriosa e "SAGRADA ESCRITURA")
  drawSacredHeader(ctx, W, theme);

  // 5. Corpo do Versículo (Cálculo dinâmico de texto e centralização)
  const contentAreaY = drawVerseBody(ctx, W, H, data, theme);

  // 6. Badge da Referência Bíblica (ex: — SÃO JOÃO 14, 6 —)
  drawReferenceBadge(ctx, W, contentAreaY.badgeY, data, theme);

  // 7. Oração / Meditação (se ativa)
  if (data.showOracao && data.oracao) {
    drawOracaoSection(ctx, W, contentAreaY.oracaoY, data.oracao, theme);
  }

  // 8. Rodapé de Evangelização
  if (data.showWatermark) {
    drawSacredFooter(ctx, W, H, theme);
  }

  ctx.restore();
}

/**
 * Desenha imagem mantendo proporção com corte central (estilo cover)
 */
function drawImageCover(ctx, img, x, y, w, h) {
  const imgRatio = img.width / img.height;
  const canvasRatio = w / h;
  let sWidth, sHeight, sx, sy;

  if (imgRatio > canvasRatio) {
    sHeight = img.height;
    sWidth = img.height * canvasRatio;
    sx = (img.width - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = img.width;
    sHeight = img.width / canvasRatio;
    sx = 0;
    sy = (img.height - sHeight) / 2;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}

/**
 * Gera fundos litúrgicos quando não há imagem estática
 */
function drawProceduralBackground(ctx, type, w, h) {
  if (type === 'ouro') {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#1f1406');
    g.addColorStop(0.5, '#120a02');
    g.addColorStop(1, '#080400');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Raios dourados subtis
    ctx.save();
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.05)';
    ctx.lineWidth = 2;
    for (let i = -w; i < w * 2; i += 70) {
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    ctx.restore();
  } else if (type === 'purpura') {
    const g = ctx.createRadialGradient(w / 2, h * 0.3, 100, w / 2, h * 0.5, 900);
    g.addColorStop(0, '#360924');
    g.addColorStop(0.6, '#1a0312');
    g.addColorStop(1, '#090107');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  } else {
    // Catedral & Vitral
    const g = ctx.createRadialGradient(w / 2, h * 0.25, 80, w / 2, h * 0.5, 950);
    g.addColorStop(0, '#3d122c');
    g.addColorStop(0.5, '#1c0715');
    g.addColorStop(1, '#080208');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Arcos ogivais góticos em linhas subtis
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.35, 340, Math.PI, 0, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.35, 380, Math.PI, 0, false);
    ctx.stroke();
    ctx.restore();
  }
}

/**
 * Desenha moldura dupla e ornamentos sacros
 */
function drawSacredFrame(ctx, w, h, goldBorder) {
  ctx.save();

  // Borda Externa (inset 46px)
  ctx.strokeStyle = goldBorder;
  ctx.lineWidth = 3;
  ctx.strokeRect(46, 46, w - 92, h - 92);

  // Borda Interna (inset 60px)
  ctx.strokeStyle = goldBorder.replace(/0\.\d+\)/, '0.22)');
  ctx.lineWidth = 1.5;
  ctx.strokeRect(60, 60, w - 120, h - 120);

  // Cantoneiras decoradas com Cruz Latina
  const corners = [
    { x: 46, y: 46 },
    { x: w - 46, y: 46 },
    { x: 46, y: h - 46 },
    { x: w - 46, y: h - 46 }
  ];

  ctx.fillStyle = '#E6C36A';
  ctx.font = '700 24px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  corners.forEach(c => {
    ctx.fillText('✝', c.x, c.y);
  });

  // Losangos dourados nos pontos cardeais da borda
  const midPoints = [
    { x: w / 2, y: 46 },
    { x: w / 2, y: h - 46 },
    { x: 46, y: h / 2 },
    { x: w - 46, y: h / 2 }
  ];
  ctx.font = '600 18px "Cinzel", Georgia, serif';
  midPoints.forEach(m => {
    ctx.fillText('◆', m.x, m.y);
  });

  ctx.restore();
}

/**
 * Desenha o topo com a Cruz e título
 */
function drawSacredHeader(ctx, w, theme) {
  ctx.save();

  // Halo luminoso atrás da cruz
  const halo = ctx.createRadialGradient(w / 2, 210, 10, w / 2, 210, 110);
  halo.addColorStop(0, 'rgba(212, 175, 55, 0.40)');
  halo.addColorStop(0.6, 'rgba(212, 175, 55, 0.12)');
  halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(w / 2, 210, 110, 0, Math.PI * 2);
  ctx.fill();

  // Cruz Latina Central
  ctx.fillStyle = theme.accentColor || '#F3E5AB';
  ctx.font = '700 68px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
  ctx.shadowBlur = 18;
  ctx.fillText('✝', w / 2, 210);

  // Título em caixa alta espaçado
  ctx.shadowBlur = 0;
  ctx.fillStyle = theme.accentColor || '#F3E5AB';
  ctx.font = '600 24px "Cinzel", Georgia, serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('S A G R A D A   E S C R I T U R A', w / 2, 290);

  // Divisor dourado sutil
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 160, 325);
  ctx.lineTo(w / 2 - 25, 325);
  ctx.moveTo(w / 2 + 25, 325);
  ctx.lineTo(w / 2 + 160, 325);
  ctx.stroke();

  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 16px "Cinzel", serif';
  ctx.fillText('❖', w / 2, 325);

  ctx.restore();
}

/**
 * Quebra e desenha o texto sagrado com aspas clássicas
 */
function drawVerseBody(ctx, w, h, data, theme) {
  ctx.save();

  const text = data.texto;
  const len = text.length;

  // Determina o tamanho da fonte baseado no modo escolhido ou no tamanho do texto
  let fontSize = 42;
  let lineHeight = 64;

  if (data.fontSizeMode === 'destaque') {
    fontSize = 54;
    lineHeight = 78;
  } else if (data.fontSizeMode === 'grande') {
    fontSize = 46;
    lineHeight = 68;
  } else if (data.fontSizeMode === 'normal') {
    fontSize = 38;
    lineHeight = 58;
  } else {
    // Modo automático inteligente
    if (len < 100) {
      fontSize = 50;
      lineHeight = 74;
    } else if (len < 220) {
      fontSize = 42;
      lineHeight = 64;
    } else if (len < 380) {
      fontSize = 36;
      lineHeight = 54;
    } else {
      fontSize = 31;
      lineHeight = 48;
    }
  }

  const maxWidth = 840;
  ctx.font = `italic 500 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  const lines = wrapText(ctx, text, maxWidth);

  const totalTextHeight = lines.length * lineHeight;

  // Centro vertical ajustado para manter equilíbrio
  let centerY = h * 0.48;
  if (data.showOracao && data.oracao) {
    centerY = h * 0.44;
  }

  const textStartY = centerY - totalTextHeight / 2;

  // Aspas de abertura elegantes no topo
  ctx.fillStyle = theme.quoteColor || '#D4AF37';
  ctx.font = '700 88px "Cormorant Garamond", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 12;
  ctx.fillText('“', w / 2, textStartY - 46);

  // Renderiza cada linha do texto sagrado
  ctx.fillStyle = '#FFFDF7';
  ctx.font = `italic 500 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 4;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  lines.forEach((line, index) => {
    const y = textStartY + index * lineHeight + lineHeight / 2;
    ctx.fillText(line, w / 2, y);
  });

  // Aspas de fechamento elegantes
  ctx.fillStyle = theme.quoteColor || '#D4AF37';
  ctx.font = '700 88px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('”', w / 2, textStartY + totalTextHeight + 42);

  ctx.restore();

  const textEndY = textStartY + totalTextHeight + 70;
  const badgeY = textEndY + 45;
  const oracaoY = badgeY + 110;

  return { badgeY, oracaoY };
}

/**
 * Desenha a barra/badge com a referência bíblica (ex: — SÃO JOÃO 14, 6 —)
 */
function drawReferenceBadge(ctx, w, y, data, theme) {
  ctx.save();

  const refText = `— ${data.livro.toUpperCase()} ${data.cap}, ${data.ver} —`;

  ctx.font = '700 28px "Cinzel", Georgia, serif';
  const metrics = ctx.measureText(refText);
  const badgeW = Math.max(metrics.width + 90, 420);
  const badgeH = 64;
  const badgeX = (w - badgeW) / 2;
  const badgeY = y - badgeH / 2;

  // Fundo arredondado estilo pill de luxo
  ctx.fillStyle = theme.badgeBg || 'rgba(212, 175, 55, 0.16)';
  ctx.strokeStyle = theme.badgeBorder || 'rgba(212, 175, 55, 0.50)';
  ctx.lineWidth = 2;

  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 32);
  ctx.fill();
  ctx.stroke();

  // Texto da referência
  ctx.fillStyle = theme.accentColor || '#F3E5AB';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 8;
  ctx.fillText(refText, w / 2, y);

  ctx.restore();
}

/**
 * Desenha a oração ou meditação pessoal (se houver)
 */
function drawOracaoSection(ctx, w, y, oracao, theme) {
  ctx.save();

  const maxWidth = 780;
  const fontSize = 26;
  const lineHeight = 38;

  ctx.font = `italic 400 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  const lines = wrapText(ctx, oracao, maxWidth).slice(0, 3); // max 3 linhas

  ctx.fillStyle = '#E5D8B8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 10;

  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, y + i * lineHeight);
  });

  ctx.restore();
}

/**
 * Desenha o rodapé de evangelização católica
 */
function drawSacredFooter(ctx, w, h, theme) {
  ctx.save();

  const footerY = h - 145;

  // Divisor superior do rodapé
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 140, footerY);
  ctx.lineTo(w / 2 - 20, footerY);
  ctx.moveTo(w / 2 + 20, footerY);
  ctx.lineTo(w / 2 + 140, footerY);
  ctx.stroke();

  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 14px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✝', w / 2, footerY);

  // Nome do App
  ctx.fillStyle = theme.accentColor || '#F3E5AB';
  ctx.font = '700 22px "Cinzel", Georgia, serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('B Í B L I A   S A G R A D A   C A T Ó L I C A', w / 2, footerY + 36);

  // Subtítulo
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '400 17px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('Evangelização & Oração • bibliasagradaavemaria.com.br', w / 2, footerY + 68);

  ctx.restore();
}

/**
 * Algoritmo de Quebra de Linha
 */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Desenha retângulo com cantos arredondados
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Retorna o arquivo de imagem PNG (Blob)
 */
export async function getStoryCardBlob() {
  if (!renderCanvas) initStoryCardService();
  return new Promise((resolve) => {
    renderCanvas.toBlob(resolve, 'image/png', 0.98);
  });
}

/**
 * Ação: Compartilhar no WhatsApp Status / Instagram Stories com Web Share API
 */
export async function shareStoryCard() {
  try {
    const blob = await getStoryCardBlob();
    if (!blob) {
      throw new Error('Falha ao gerar imagem.');
    }

    const filename = `versiculo-${sanitizeFilename(currentStoryData.livro)}-${currentStoryData.cap}-${currentStoryData.ver}.png`;
    const file = new File([blob], filename, { type: 'image/png' });

    const shareTitle = `${currentStoryData.livro} ${currentStoryData.cap},${currentStoryData.ver}`;
    const shareText = `“${currentStoryData.texto}”\n\n— ${currentStoryData.livro} ${currentStoryData.cap},${currentStoryData.ver}\n\n✝ Bíblia Sagrada Católica\nhttps://bibliasagradaavemaria.com.br`;

    // Verifica suporte a compartilhamento de arquivos via Web Share API
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        files: [file]
      });
      if (typeof window.showToast === 'function') {
        window.showToast('✅ Compartilhado com sucesso!');
      }
    } else {
      // Fallback gracioso: baixa o arquivo e instrui o usuário
      downloadStoryCard();
      if (typeof window.showToast === 'function') {
        window.showToast('📥 Imagem baixada! Compartilhando no WhatsApp...');
      }
      setTimeout(() => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
      }, 900);
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.warn('[StoryCard] Falha ao compartilhar nativamente:', err);
      downloadStoryCard();
    }
  }
}

/**
 * Ação: Baixar imagem HD (1080x1920)
 */
export async function downloadStoryCard() {
  try {
    const blob = await getStoryCardBlob();
    if (!blob) return;

    const filename = `versiculo-${sanitizeFilename(currentStoryData.livro)}-${currentStoryData.cap}-${currentStoryData.ver}-story.png`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (typeof window.showToast === 'function') {
      window.showToast('📥 Card HD (1080x1920) baixado!');
    }
  } catch (err) {
    console.error('[StoryCard] Erro no download:', err);
  }
}

/**
 * Ação: Copiar Imagem para Área de Transferência
 */
export async function copyStoryCardToClipboard() {
  try {
    const blob = await getStoryCardBlob();
    if (!blob) return;

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      if (typeof window.showToast === 'function') {
        window.showToast('📋 Imagem copiada para a área de transferência!');
      }
    } else {
      downloadStoryCard();
    }
  } catch (err) {
    console.warn('[StoryCard] Falha ao copiar imagem:', err);
    downloadStoryCard();
  }
}

function sanitizeFilename(name) {
  return (name || 'biblia')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
}

// Expõe globalmente para fácil acesso nos templates HTML
window.openStoryCardModal = openStoryCardModal;
window.closeStoryCardModal = closeStoryCardModal;
window.selectStoryTheme = selectStoryTheme;
window.setStoryFontSizeMode = setStoryFontSizeMode;
window.toggleStoryOracao = toggleStoryOracao;
window.toggleStoryWatermark = toggleStoryWatermark;
window.shareStoryCard = shareStoryCard;
window.downloadStoryCard = downloadStoryCard;
window.copyStoryCardToClipboard = copyStoryCardToClipboard;
