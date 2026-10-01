/**
 * storiesGeneratorService.js - Gerador de Cards / Stories (Formato Vertical 9:16)
 * Otimizado para WhatsApp Status, Instagram Stories e TikTok
 * Bíblia Sagrada Católica (Edição Ave Maria)
 */

export const STORY_THEMES = [
  {
    id: 'ouro_imperial',
    nome: '👑 Ouro Sacro & Veludo Imperial',
    bg1: '#2A0E18',
    bg2: '#12050A',
    accentColor: '#D4AF37',
    textColor: '#FFFFFF',
    desc: 'Bordô profundo com auréola dourada e detalhes imperiais'
  },
  {
    id: 'vitral_catedral',
    nome: '🏰 Vitral Noturno de Catedral',
    bg1: '#1A1838',
    bg2: '#080614',
    accentColor: '#60A5FA',
    textColor: '#FFFFFF',
    desc: 'Azul cobalto místico com reflexos de vitrais góticos'
  },
  {
    id: 'luz_celestial',
    nome: '✨ Luz Divina & Aurora Celeste',
    bg1: '#1F2937',
    bg2: '#0F172A',
    accentColor: '#38BDF8',
    textColor: '#F8FAFC',
    desc: 'Raios celestes de esperança e paz espiritual'
  },
  {
    id: 'pergaminho_antigo',
    nome: '📜 Pergaminho Monástico Dourado',
    bg1: '#382312',
    bg2: '#170E07',
    accentColor: '#F59E0B',
    textColor: '#FEF3C7',
    desc: 'Estilo clássico de manuscrito e abadia medieval'
  }
];

/**
 * Renderiza um Story vertical 9:16 (1080 x 1920) no canvas HTML5
 */
export function renderStoryCanvas(canvas, {
  themeId = 'ouro_imperial',
  bgImage = null,
  verseText = '',
  bookRef = '',
  oracaoText = '',
  customText = ''
}) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = 1080;
  const h = 1920;
  canvas.width = w;
  canvas.height = h;

  const theme = STORY_THEMES.find(t => t.id === themeId) || STORY_THEMES[0];

  // 1. Fundo (Imagem personalizada ou Gradiente Sacro)
  if (bgImage && bgImage.complete && bgImage.naturalWidth > 0) {
    // Desenha imagem preenchendo a tela 9:16
    const imgRatio = bgImage.naturalWidth / bgImage.naturalHeight;
    const canvasRatio = w / h;
    let sWidth, sHeight, sx, sy;

    if (imgRatio > canvasRatio) {
      sHeight = bgImage.naturalHeight;
      sWidth = sHeight * canvasRatio;
      sx = (bgImage.naturalWidth - sWidth) / 2;
      sy = 0;
    } else {
      sWidth = bgImage.naturalWidth;
      sHeight = sWidth / canvasRatio;
      sx = 0;
      sy = (bgImage.naturalHeight - sHeight) / 2;
    }

    ctx.drawImage(bgImage, sx, sy, sWidth, sHeight, 0, 0, w, h);

    // Camada de escurecimento suave para legibilidade absoluta do texto
    const vignette = ctx.createLinearGradient(0, 0, 0, h);
    vignette.addColorStop(0, 'rgba(10, 4, 8, 0.7)');
    vignette.addColorStop(0.3, 'rgba(10, 4, 8, 0.55)');
    vignette.addColorStop(0.7, 'rgba(10, 4, 8, 0.75)');
    vignette.addColorStop(1, 'rgba(8, 2, 6, 0.95)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
  } else {
    // Fundo Gradiente Sacro
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.45, 120, w / 2, h * 0.45, w * 1.1);
    bgGrad.addColorStop(0, theme.bg1);
    bgGrad.addColorStop(0.65, theme.bg2);
    bgGrad.addColorStop(1, '#050204');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Aura Divina central
    const aura = ctx.createRadialGradient(w / 2, h * 0.45, 30, w / 2, h * 0.45, 450);
    aura.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
    aura.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
    aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.45, 450, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Moldura Ornamental Dourada
  const pad = 50;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(pad + 16, pad + 16, w - (pad + 16) * 2, h - (pad + 16) * 2);

  // Cantoneiras douradas decorativas
  drawStoryCorner(ctx, pad, pad);
  drawStoryCorner(ctx, w - pad, pad);
  drawStoryCorner(ctx, pad, h - pad);
  drawStoryCorner(ctx, w - pad, h - pad);

  // 3. Topo: Cruz Sagrada & Nome da Aplicação
  ctx.font = '76px "Cinzel", Georgia, serif';
  ctx.fillStyle = '#E8C98A';
  ctx.textAlign = 'center';
  ctx.fillText('✝', w / 2, 230);

  ctx.font = '700 24px "Cinzel", Georgia, serif';
  ctx.fillStyle = 'rgba(232, 201, 138, 0.9)';
  ctx.letterSpacing = '3px';
  ctx.fillText('BÍBLIA SAGRADA CATÓLICA', w / 2, 290);

  // Linha divisória com estrela
  drawStoryDivider(ctx, w / 2, 340, 160);

  // 4. Referência Bíblica no Topo (Badge Dourado)
  const mainRef = (bookRef || 'PALAVRA DE DEUS').toUpperCase();
  ctx.font = '800 36px "Cinzel", Georgia, serif';
  ctx.fillStyle = theme.accentColor || '#D4AF37';
  ctx.fillText(mainRef, w / 2, 430);

  // 5. Caixa de Vidro Sagrado Central com o Versículo
  const displayText = (customText || verseText || 'O Senhor é o meu pastor; nada me faltará. Em verdes prados me faz repousar.').trim();
  const formattedText = displayText.startsWith('“') ? displayText : `“${displayText}”`;

  // Cálculo de tamanho de fonte dinâmico
  let fontSize = 46;
  if (formattedText.length > 300) fontSize = 32;
  else if (formattedText.length > 200) fontSize = 38;
  else if (formattedText.length > 120) fontSize = 42;

  const boxMaxWidth = w - 180;
  const textPadding = 60;
  const innerTextWidth = boxMaxWidth - textPadding * 2;

  ctx.font = `italic 500 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  const lines = wrapStoryText(ctx, formattedText, innerTextWidth);
  const lineHeight = fontSize * 1.5;
  const totalTextHeight = lines.length * lineHeight;
  const boxHeight = Math.max(320, totalTextHeight + textPadding * 2);
  const boxY = Math.max(500, (h - boxHeight) / 2 - 40);
  const boxX = 90;

  // Fundo com vidro escuro translúcido
  ctx.save();
  const glass = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
  glass.addColorStop(0, 'rgba(18, 8, 14, 0.82)');
  glass.addColorStop(1, 'rgba(10, 4, 8, 0.92)');
  ctx.fillStyle = glass;
  ctx.fillRect(boxX, boxY, boxMaxWidth, boxHeight);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(boxX, boxY, boxMaxWidth, boxHeight);

  // Aspas elegantes no topo da caixa
  ctx.font = '72px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.35)';
  ctx.fillText('“', boxX + 45, boxY + 65);

  // Versículos desenhados
  ctx.font = `italic 500 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillStyle = theme.textColor || '#FFFFFF';
  ctx.textAlign = 'center';

  const startY = boxY + textPadding + fontSize * 0.9 + (boxHeight - (textPadding * 2 + lines.length * lineHeight)) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, startY + i * lineHeight);
  });
  ctx.restore();

  // 6. Oração / Meditação (se houver)
  const oracao = (oracaoText || '').trim();
  if (oracao) {
    const oracaoY = boxY + boxHeight + 60;
    ctx.font = 'italic 28px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#E8C98A';
    ctx.textAlign = 'center';

    const oracaoLines = wrapStoryText(ctx, `— ${oracao}`, w - 240);
    oracaoLines.slice(0, 3).forEach((line, idx) => {
      ctx.fillText(line, w / 2, oracaoY + idx * 40);
    });
  }

  // 7. Rodapé com Chamada para Evangelização & Link
  drawStoryDivider(ctx, w / 2, h - 230, 140);

  ctx.font = '600 22px "Cinzel", Georgia, serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
  ctx.textAlign = 'center';
  ctx.fillText('LEIA A PALAVRA DE DEUS DIARIAMENTE', w / 2, h - 170);

  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('bibliasagradaavemaria.com.br', w / 2, h - 130);
}

function drawStoryCorner(ctx, x, y) {
  ctx.save();
  ctx.strokeStyle = '#D4AF37';
  ctx.fillStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawStoryDivider(ctx, x, y, width) {
  ctx.save();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x - width, y);
  ctx.lineTo(x - 20, y);
  ctx.moveTo(x + 20, y);
  ctx.lineTo(x + width, y);
  ctx.stroke();

  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.textAlign = 'center';
  ctx.fillText('✦', x, y + 6);
  ctx.restore();
}

function wrapStoryText(ctx, text, maxWidth) {
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
