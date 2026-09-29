// SERVIÇO DE HOMILIA E REFLEXÃO ESPIRITUAL CATÓLICA

/**
 * Gera uma reflexão devocional/homilia católica personalizada e contextualizada para qualquer passagem bíblica.
 * Funciona de forma 100% nativa, instantânea e offline (sem depender de APIs externas ou chaves que expiram).
 */
export function getDevotionalHomily(bookName, chapter, verse, text) {
  const reference = `${bookName} ${chapter}${verse && verse !== 'completo' ? ':' + verse : ''}`;
  const cleanText = (text || '').replace(/<[^>]*>?/gm, ' ').trim();
  const lowerText = cleanText.toLowerCase();
  const lowerBook = (bookName || '').toLowerCase();

  // Categorização teológica do livro
  let category = 'geral';
  if (['mateus', 'marcos', 'lucas', 'joão', 'joao'].some(b => lowerBook.includes(b))) {
    category = 'evangelho';
  } else if (['salmo', 'salmos', 'cântico', 'cantico', 'lamentações', 'lamentacoes'].some(b => lowerBook.includes(b))) {
    category = 'salmos';
  } else if (['atos', 'romanos', 'coríntios', 'corintios', 'gálatas', 'galatas', 'efésios', 'efesios', 'filipenses', 'colossenses', 'tessalonicenses', 'timóteo', 'timoteo', 'tito', 'filemom', 'hebreus', 'tiago', 'pedro', 'judas'].some(b => lowerBook.includes(b))) {
    category = 'cartas';
  } else if (['provérbios', 'proverbios', 'eclesiastes', 'sabedoria', 'eclesiástico', 'eclesiastico', 'jó', 'jo'].some(b => lowerBook.includes(b))) {
    category = 'sabedoria';
  } else if (['isaías', 'isaias', 'jeremias', 'ezequiel', 'daniel', 'oséias', 'oseias', 'joel', 'amós', 'amos', 'obadias', 'jonas', 'miquéias', 'miqueias', 'naum', 'habacuc', 'sofonias', 'ageu', 'zacarias', 'malaquias', 'baruc'].some(b => lowerBook.includes(b))) {
    category = 'profetas';
  } else if (['apocalipse'].some(b => lowerBook.includes(b))) {
    category = 'apocalipse';
  } else {
    category = 'historico';
  }

  // Destaque de tema espiritual principal presente no texto
  let themeInsight = "nos convida a acolher a presença viva de Deus e a renovar nossa confiança em Sua Providência.";
  let practicalAdvice = [
    "Reserve alguns minutos de silêncio hoje para colocar suas intenções nas mãos de Deus.",
    "Pratique um gesto concreto de caridade e paciência com alguém ao seu redor.",
    "Agradeça ao Senhor pelas pequenas graças recebidas no dia de hoje."
  ];

  if (lowerText.includes('amor') || lowerText.includes('amar')) {
    themeInsight = "nos recorda que o <strong>Amor de Deus</strong> é o fundamento de toda a vida cristã. Amar como Cristo amou é a maior vocação do ser humano.";
    practicalAdvice = [
      "Demonstre amor e apreço a um familiar ou amigo com palavras sinceras.",
      "Perdoe de coração qualquer ofensa ou mágoa que possa estar pesando em sua alma.",
      "Faça uma oração especial de intercessão por aqueles que mais precisam de auxílio."
    ];
  } else if (lowerText.includes('paz') || lowerText.includes('medo') || lowerText.includes('temei')) {
    themeInsight = "traz um bálsamo de <strong>serenidade e confiança</strong>: o Senhor nos pede para não temer, pois Ele caminha conosco em cada tempestade.";
    practicalAdvice = [
      "Entregue as incertezas e preocupações nas mãos de Nossa Senhora em oração.",
      "Respire fundo nos momentos de tensão, lembrando que Deus tem o controle de tudo.",
      "Seja um instrumento de reconciliação e calma onde houver conflito."
    ];
  } else if (lowerText.includes('fé') || lowerText.includes('crer') || lowerText.includes('acreditar')) {
    themeInsight = "nos impulsiona a fortalecer a nossa <strong>fé viva e atuante</strong>, aquela que enxerga além das aparências e repousa na fidelidade divina.";
    practicalAdvice = [
      "Faça um ato de fé ao iniciar suas tarefas diárias: <em>'Jesus, eu confio em Vós!'</em>",
      "Busque alimentar sua espiritualidade com a leitura diária da Sagrada Escritura.",
      "Dê testemunho de esperança cristã através de um sorriso e atitude positiva."
    ];
  } else if (lowerText.includes('perdão') || lowerText.includes('pecado') || lowerText.includes('misericórdia')) {
    themeInsight = "revela a grandeza da <strong>Misericórdia Divina</strong>, sempre pronta a acolher o coração arrependido e a restaurar a nossa dignidade de filhos de Deus.";
    practicalAdvice = [
      "Examine sua consciência e renove o propósito de viver em graça e comunhão.",
      "Seja generoso em perdoar quem falhou com você, assim como Deus nos perdoa.",
      "Reze um Pai-Nosso suplicando a graça de um coração manso e humilde."
    ];
  } else if (lowerText.includes('luz') || lowerText.includes('caminho') || lowerText.includes('verdade')) {
    themeInsight = "ilumina nossos passos com a certeza de que a <strong>Palavra de Deus é lâmpada para os nossos pés</strong> e guia seguro em meio às trevas do mundo.";
    practicalAdvice = [
      "Peça discernimento ao Espírito Santo antes de tomar qualquer decisão importante.",
      "Evite conversas infrutíferas e busque ser luz e verdade em seu ambiente de trabalho ou estudo.",
      "Mantenha um versículo no coração para meditar durante todo o dia."
    ];
  } else if (category === 'salmos') {
    themeInsight = "eleva nossa alma em <strong>louvor e súplica confiante</strong>, transformando as alegrias e angústias da vida em oração sincera ao Pai Celestial.";
    practicalAdvice = [
      "Use as palavras deste salmo como sua oração pessoal durante as pausas do dia.",
      "Louve a Deus não apenas pelo que Ele faz, mas por Quem Ele é: Pai bondoso e fiel.",
      "Confie que nenhuma oração feita com fé sincera fica sem resposta."
    ];
  } else if (category === 'evangelho') {
    themeInsight = "nos coloca face a face com <strong>Jesus Cristo</strong>, que nos chama pessoalmente a segui-Lo e a fazer de nossa vida um reflexo do Seu Evangelho.";
    practicalAdvice = [
      "Pergunte-se diante das situações de hoje: <em>'Como Jesus agiria em meu lugar?'</em>",
      "Acolha com carinho quem cruzar o seu caminho, vendo Cristo no próximo.",
      "Faça uma visita ou momento de adoração ao Santíssimo Sacramento, se possível."
    ];
  } else if (category === 'cartas') {
    themeInsight = "exorta nossa comunidade à <strong>perseverança e unidade fraterna</strong>, lembrando-nos de viver com dignidade a nossa vocação cristã no dia a dia.";
    practicalAdvice = [
      "Fortaleça os laços de fraternidade em sua família e comunidade de fé.",
      "Reze pela Santa Igreja, pelos sacerdotes e pelas vocações religiosas.",
      "Pratique a paciência diante das fraquezas e limitações dos irmãos."
    ];
  } else if (category === 'sabedoria') {
    themeInsight = "nos ensina a <strong>verdadeira Sabedoria</strong> que vem do alto, guiando nossas escolhas, pensamentos e palavras com retidão e prudência.";
    practicalAdvice = [
      "Pense bem antes de falar, usando suas palavras para edificar e consolar.",
      "Busque a moderação e fuja da pressa e do orgulho.",
      "Peça ao Senhor a virtude da humildade para acolher conselhos sábios."
    ];
  }

  const paragraphs = [
    `<p style="margin-bottom: 12px;"><strong>Queridos irmãos e irmãs em Cristo,</strong></p>`,
    
    `<p style="margin-bottom: 12px;">Ao meditarmos na Sagrada Escritura em <strong>${reference}</strong>, a Palavra de Deus ${themeInsight}</p>`,
    
    `<p style="margin-bottom: 12px;">O Senhor nos ensina que a fé católica não é apenas uma teoria distante, mas uma <strong>experiência viva e transformadora</strong>. No silêncio do coração, Deus nos chama a sermos sal da terra e luz do mundo, testemunhando a esperança que nunca decepciona mesmo em tempos desafiadores.</p>`,
    
    `<p style="margin-bottom: 8px;"><strong>Como aplicar esta Palavra no seu dia a dia:</strong></p>
     <ul style="padding-left: 20px; margin-bottom: 14px; line-height: 1.6;">
       <li style="margin-bottom: 6px;">${practicalAdvice[0]}</li>
       <li style="margin-bottom: 6px;">${practicalAdvice[1]}</li>
       <li>${practicalAdvice[2]}</li>
     </ul>`,
     
    `<p style="margin-bottom: 12px; font-style: italic; color: var(--gold-300);">Que a bênção de Deus Todo-Poderoso, Pai, Filho e Espírito Santo, desça sobre você, sua família e ilumine seus caminhos hoje e sempre. Amém.</p>`
  ];

  const cleanInsight = themeInsight.replace(/<[^>]*>?/gm, '');

  const textToSpeak = [
    `Queridos irmãos e irmãs em Cristo.`,
    `Ao meditarmos na Sagrada Escritura em ${reference}, a Palavra de Deus ${cleanInsight}`,
    `O Senhor nos ensina que a fé católica não é apenas uma teoria distante, mas uma experiência viva e transformadora. No silêncio do coração, Deus nos chama a sermos sal da terra e luz do mundo, testemunhando a esperança que nunca decepciona mesmo em tempos desafiadores.`,
    `Como aplicar esta Palavra no seu dia a dia:`,
    `Primeiro: ${practicalAdvice[0]}`,
    `Segundo: ${practicalAdvice[1]}`,
    `Terceiro: ${practicalAdvice[2]}`,
    `Que a bênção de Deus Todo-Poderoso, Pai, Filho e Espírito Santo, desça sobre você, sua família e ilumine seus caminhos hoje e sempre. Amém.`
  ].join('\n\n');

  return {
    reference,
    textExcerpt: cleanText,
    html: paragraphs.join(''),
    textToSpeak
  };
}
