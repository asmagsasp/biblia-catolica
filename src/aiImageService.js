// SERVIÇO DE GERAÇÃO DE IMAGENS SACRAS E ARTE BÍBLICA COM INTELIGÊNCIA ARTIFICIAL

export const SACRED_AI_STYLES = [
  {
    id: 'renaissance',
    name: '🎨 Renascimento Sacro (Rafael & Caravaggio)',
    suffix: 'masterpiece Catholic sacred art, classical Italian Renaissance oil painting, Caravaggio chiaroscuro, Raphael divine composition, warm holy golden light, rich textures, ultra detailed 8k, museum quality, reverent and solemn'
  },
  {
    id: 'stained_glass',
    name: '🏰 Vitral Gótico de Catedral (Notre-Dame)',
    suffix: 'breathtaking medieval gothic stained glass art, cathedral window, glowing translucent colors, Sainte-Chapelle style, intricate lead line work, radiant heavenly sunlight streaming through sacred glass, luminous gold and ruby red'
  },
  {
    id: 'baroque',
    name: '🖌️ Barroco Sacro Iluminado (Murillo & Rembrandt)',
    suffix: 'dramatic Baroque religious oil painting, deep rich shadows, luminous divine rays, Murillo and Rembrandt holy atmosphere, pious and emotional, gold highlights, fine art masterpiece'
  },
  {
    id: 'realism',
    name: '✨ Realismo Sagrado Cinematográfico (8K)',
    suffix: 'cinematic photorealistic 8k sacred biblical scene, soft divine atmospheric light, ethereal golden glow, holy presence, volumetric dust rays, detailed realism, majestic and awe-inspiring'
  },
  {
    id: 'byzantine',
    name: '📜 Ícone Bizantino & Folha de Ouro',
    suffix: 'ancient holy Byzantine Christian icon, radiant gold leaf background, traditional sacred Christian iconography, ornate halo, mosaic gold texture, reverent Orthodox Catholic sacred art'
  },
  {
    id: 'watercolor',
    name: '🌅 Aquarela Celestial & Luz Suave',
    suffix: 'soft gentle heavenly watercolor painting, ethereal celestial colors, glowing holy illumination, peaceful divine aura, peaceful serene Christian art'
  }
];

export const SACRED_AI_INSPIRATIONS = [
  { label: '🕊️ Espírito Santo', prompt: 'O Espírito Santo em forma de pomba celestial descendo do céu em raios de luz divina dourada e chamas suaves de amor' },
  { label: '🐑 O Bom Pastor', prompt: 'Jesus Cristo como o Bom Pastor em uma colina verdejante segurando uma ovelha com amor e ternura, luz dourada do entardecer' },
  { label: '🌊 Jesus Acalma o Mar', prompt: 'Jesus Cristo em pé no barco acalmando a tempestade e as ondas no Mar da Galileia, paz soberana e luz rompendo as nuvens' },
  { label: '✨ Fiat Lux (Criação)', prompt: 'Deus criando a luz no universo, separando a luz das trevas, cosmos glorioso com esplendor celestial no Gênesis' },
  { label: '🌹 Imaculado Coração', prompt: 'Nossa Senhora com o Imaculado Coração de Maria radiante de graça, manto azul celestial, coroa de estrelas e rosas' },
  { label: '⚔️ São Miguel Arcanjo', prompt: 'São Miguel Arcanjo glorioso com armadura dourada, espada de fogo divino e asas celestiais protegendo o povo de Deus' },
  { label: '🍞 A Última Ceia', prompt: 'A Sagrada Eucaristia com o cálice de ouro transbordando luz celestial, pão sagrado e uvas em mesa iluminada pela graça' },
  { label: '⛰️ Sermão da Montanha', prompt: 'Jesus Cristo ensinando as Bem-Aventuranças sobre uma colina florida da Galileia com uma multidão atenta ao entardecer' },
  { label: '🌟 A Natividade em Belém', prompt: 'O Menino Jesus na manjedoura em Belém, cercado pela Virgem Maria e São José sob a brilhante Estrela do Oriente' },
  { label: '🛡️ Cruz Gloriosa no Monte', prompt: 'A Santa Cruz de Cristo luminosa no topo do monte com o sol nascente ao fundo, símbolo da vitória e redenção' }
];

/**
 * Gera uma imagem bíblica sacra de alta definição com IA (Flux / Stable Diffusion).
 * @param {string} userPrompt - Descrição do tema bíblico ou citação
 * @param {string} styleId - ID do estilo artístico
 * @param {object} options - Opções (width, height, verseText, bookRef)
 * @returns {Promise<string>} Data URL base64 da imagem gerada
 */
export async function generateSacredAIImage(userPrompt, styleId = 'renaissance', options = {}) {
  const width = options.width || 1024;
  const height = options.height || 1024;
  const seed = Math.floor(Math.random() * 10000000);

  const style = SACRED_AI_STYLES.find(s => s.id === styleId) || SACRED_AI_STYLES[0];
  
  // Refinamento do prompt para arte sacra
  let cleanPrompt = (userPrompt || '').trim();
  if (!cleanPrompt && options.verseText) {
    cleanPrompt = `Cena bíblica inspirada no versículo: ${options.verseText}`;
  }
  if (!cleanPrompt) {
    cleanPrompt = 'Luz divina celestial iluminando a Bíblia Sagrada e a Cruz de Cristo';
  }

  const fullPrompt = `${cleanPrompt}, ${style.suffix}, no modern text, no watermark, pious, religious Catholic art`;

  const encodedPrompt = encodeURIComponent(fullPrompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=flux&seed=${seed}&nologo=true`;

  console.log('[SacredAI] Solicitando arte sacra com IA:', imageUrl);

  // Fetch com timeout de 35 segundos para a IA desenhar
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 35000);

  try {
    const response = await fetch(imageUrl, { signal: controller.signal });
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`Falha ao gerar imagem com IA (Status ${response.status})`);
    }

    const blob = await response.blob();
    return await blobToDataURL(blob);
  } catch (err) {
    clearTimeout(timer);
    console.error('[SacredAI] Erro na geração com IA:', err);
    throw err;
  }
}

/**
 * Converte um Blob em Base64 Data URL para armazenamento persistente
 */
export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Compõe um Card Sagrado sofisticado sobrepondo o versículo sobre a imagem de IA no Canvas
 */
export function composeCardOnCanvas(canvas, imgElement, config = {}) {
  if (!canvas || !imgElement) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // 1. Desenhar a imagem de IA cobrindo o canvas
  ctx.drawImage(imgElement, 0, 0, w, h);

  const showOverlay = config.showOverlay !== false;
  const verseText = (config.verseText || '').trim();
  const bookRef = (config.bookRef || '').trim();
  const oracaoText = (config.oracaoText || '').trim();

  if (!showOverlay || (!verseText && !bookRef && !oracaoText)) {
    return; // Se o usuário não quiser sobreposição, deixa a arte pura
  }

  // 2. Vinheta gradiente de iluminação cinematográfica para legibilidade sublime
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(10, 4, 6, 0.7)');
  grad.addColorStop(0.2, 'rgba(10, 4, 6, 0.25)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
  grad.addColorStop(0.7, 'rgba(10, 4, 6, 0.4)');
  grad.addColorStop(1, 'rgba(10, 4, 6, 0.88)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 3. Moldura dourada fina com aura sagrada
  ctx.strokeStyle = 'rgba(212, 168, 83, 0.55)';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  ctx.strokeStyle = 'rgba(212, 168, 83, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(46, 46, w - 92, h - 92);

  // 4. Símbolo Topo (Cruz Dourada)
  ctx.font = '48px "Cinzel", serif, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E8C98A';
  try {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 12;
  } catch (e) {}
  ctx.fillText('✝', w / 2, 110);

  // 5. Título de Referência no Topo
  if (bookRef) {
    ctx.font = 'bold 30px "Cinzel", serif';
    ctx.fillStyle = '#F5E6C8';
    ctx.fillText(bookRef.toUpperCase(), w / 2, 160);

    // Divisor com estrela
    ctx.strokeStyle = 'rgba(212, 168, 83, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 100, 185);
    ctx.lineTo(w / 2 - 15, 185);
    ctx.moveTo(w / 2 + 15, 185);
    ctx.lineTo(w / 2 + 100, 185);
    ctx.stroke();

    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#D4A853';
    ctx.fillText('✦', w / 2, 190);
  }

  // 6. Texto do Versículo no Centro/Base
  if (verseText) {
    const maxTextWidth = w - 180;
    let fontSize = 38;
    if (verseText.length > 200) fontSize = 28;
    else if (verseText.length > 130) fontSize = 32;

    ctx.font = `italic ${fontSize}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = '#FFFFFF';
    try {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
      ctx.shadowBlur = 14;
    } catch (e) {}

    const lines = wrapCanvasText(ctx, `“${verseText}”`, maxTextWidth);
    const lineHeight = fontSize * 1.45;
    const totalTextHeight = lines.length * lineHeight;

    let startY = h - 220 - totalTextHeight;
    if (startY < 280) startY = 280;

    lines.forEach((line, i) => {
      ctx.fillText(line, w / 2, startY + i * lineHeight);
    });
  }

  // 7. Oração ou Mensagem devocional na base
  if (oracaoText) {
    ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#E8C98A';
    try {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 10;
    } catch (e) {}
    ctx.fillText(`“${oracaoText}”`, w / 2, h - 115);
  }

  // 8. Rodapé do Aplicativo
  ctx.font = '600 18px "Cinzel", serif';
  ctx.fillStyle = 'rgba(212, 168, 83, 0.85)';
  try {
    ctx.shadowBlur = 6;
  } catch (e) {}
  ctx.fillText('✝  BÍBLIA SAGRADA CATÓLICA  ✝', w / 2, h - 60);
  try {
    ctx.shadowBlur = 0;
  } catch (e) {}
}

function wrapCanvasText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + ' ' + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width < maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
