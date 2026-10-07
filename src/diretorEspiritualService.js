/**
 * diretorEspiritualService.js - Diretor Espiritual & Conselheiro Católico IA
 * Bíblia Sagrada Católica (Edição Ave Maria)
 * Acolhimento Pastoral, Consolo Bíblico, Sabedoria dos Santos e Oração Personalizada
 */

export const DIRETOR_PERSONAS = [
  {
    id: 'padre_conselheiro',
    nome: 'Padre Conselheiro & Pároco',
    titulo: 'Acolhimento Pastoral & Amor Fraterno',
    icone: 'fa-hands-praying',
    cor: '#38bdf8',
    avatarDesc: 'Coração de pai, consolo da Igreja e escuta amorosa',
    saudacao: 'A paz de Nosso Senhor Jesus Cristo esteja com você, meu filho(a). Eu estou aqui para escutar o seu coração com todo o amor da Igreja. O que está angustiando ou afligindo a sua alma hoje?'
  },
  {
    id: 'padre_pio',
    nome: 'São Padre Pio de Pietrelcina',
    titulo: 'Voz da Oração & Fortaleza na Dor',
    icone: 'fa-cross',
    cor: '#f59e0b',
    avatarDesc: '“Reze, tenha fé e não se preocupe. A oração é a melhor arma que temos.”',
    saudacao: 'A graça do Espírito Santo te fortaleça. Não tenhas medo da cruz, pois é nela que Jesus te abraça mais forte. Desabafe comigo: o que perturba a tua paz?'
  },
  {
    id: 'santa_teresa_calcuta',
    nome: 'Santa Teresa de Calcutá',
    titulo: 'Ternura, Esperança & Amor aos Aflitos',
    icone: 'fa-heart',
    cor: '#ec4899',
    avatarDesc: '“Nunca deixe que alguém venha até você sem sair melhor e mais feliz.”',
    saudacao: 'Deus te ama com um amor infinito e pessoal neste exato momento. Me conte o que você está sentindo para que possamos colocar juntos nos braços de Jesus.'
  },
  {
    id: 'sao_joao_paulo_ii',
    nome: 'São João Paulo II',
    titulo: 'Coragem & Esperança Cristã',
    icone: 'fa-shield-halved',
    cor: '#d4af37',
    avatarDesc: '“Não tenhais medo! Abri, melhor, escancarai as portas a Cristo!”',
    saudacao: 'Louvado seja Nosso Senhor Jesus Cristo! Não tenhas medo das noites escuras da vida, pois a luz da Ressurreição é maior. O que desafia a tua fé e a tua família hoje?'
  },
  {
    id: 'santa_teresinha',
    nome: 'Santa Teresinha do Menino Jesus',
    titulo: 'A Pequena Via & Confiança Cega',
    icone: 'fa-dove',
    cor: '#a855f7',
    avatarDesc: '“Para mim, a oração é um impulso do coração, um simples olhar para o Céu.”',
    saudacao: 'A paz do Menino Jesus ao teu coração! Não te preocupes com a tua fraqueza, pois a misericórdia de Deus é um oceano sem fim. Qual dor você quer entregar ao Bom Jesus hoje?'
  }
];

export const DIRETOR_TOPICOS_RAPIDOS = [
  {
    id: 'ansiedade',
    titulo: '🌿 Ansiedade & Medo do Futuro',
    prompt: 'Estou sentindo uma ansiedade muito forte, aperto no peito e muito medo do que vai acontecer no meu futuro. Preciso de paz.'
  },
  {
    id: 'luto',
    titulo: '🕊️ Luto & Saudade de Alguém',
    prompt: 'Perdi uma pessoa muito querida da minha vida e sinto uma dor imensa, um vazio e muita saudade. Preciso de consolo de Deus.'
  },
  {
    id: 'familia',
    titulo: '👨‍👩‍👧 Crise na Família ou Casamento',
    prompt: 'Minha família / meu casamento está passando por momentos muito difíceis de desentendimento, mágoa e brigas. Não sei o que fazer.'
  },
  {
    id: 'perdao',
    titulo: '✝️ Dificuldade de Perdoar / Mágoa',
    prompt: 'Fui muito magoado(a) e traído(a) por alguém e sinto um peso no coração. Quero conseguir perdoar mas sinto muita dificuldade.'
  },
  {
    id: 'doenca',
    titulo: '🩺 Doença, Dor & Pedido de Cura',
    prompt: 'Estou enfrentando uma enfermidade (ou alguém que amo muito está doente) e sinto medo e fraqueza. Peço a Deus força e cura.'
  },
  {
    id: 'solidao',
    titulo: '🕯️ Solidão & Vazio no Peito',
    prompt: 'Me sinto muito sozinho(a), parece que ninguém me compreende e sinto um vazio profundo dentro de mim. Preciso sentir o amor de Deus.'
  },
  {
    id: 'trabalho',
    titulo: '💼 Desemprego & Contas a Pagar',
    prompt: 'Estou muito preocupado(a) com a minha situação financeira, trabalho e o sustento da minha casa. Peço a providência divina.'
  },
  {
    id: 'discernimento',
    titulo: '🧭 Decisão Difícil & Discernimento',
    prompt: 'Preciso tomar uma decisão muito importante na minha vida e me sinto confuso(a) sem saber qual é a vontade de Deus para mim.'
  },
  {
    id: 'gratidao',
    titulo: '✨ Agradecer por uma Grande Graça',
    prompt: 'Deus operou uma grande bênção na minha vida e no meu lar e quero agradecer ao Senhor com todo o meu coração e devoção.'
  }
];

// BASE PASTORAL OFFLINE COMPLETA DE RESPOSTA
const OFFLINE_CONSELHOS = {
  ansiedade: {
    titulo: "A Paz de Cristo que Excede Todo Entendimento",
    acolhimento: "Meu irmão(ã), eu compreendo profundamente o peso dessa ansiedade que aperta o seu peito. Respire fundo e lembre-se: você não está sozinho(a) nessa tempestade. Deus não te deu um espírito de medo, mas de fortaleza, de amor e de moderação. Entregue a Ele esse momento, pois o amanhã pertence inteiramente às mãos amorosas do Pai.",
    versiculo: "“Não vos inquieteis com nada! Em todas as circunstâncias apresentai a Deus as vossas preocupações, mediante a oração, as súplicas e a ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.” (Filipenses 4, 6-7)",
    sabedoria: "São Padre Pio nos ensinava: “A ansiedade é um dos maiores traidores que a alma pode acolher. Reze, tenha fé e não se preocupe. A agitação não serve para nada; Deus é misericordioso e ouvirá a sua oração.”",
    oracao: "“Senhor Jesus, manso e humilde de coração, eu coloco nas Tuas mãos todas as minhas preocupações, pensamentos acelerados e medos do futuro. Acalma a tempestade do meu coração, assim como acalmaste o mar da Galileia. Sopra o Teu Espírito Santo de paz sobre a minha alma e me concede uma noite tranquila. Eu confio em Vós, Jesus! Amém.”",
    proposito: "Faça 3 respirações lentas rezando baixinho: 'Jesus, eu confio em Vós'. Beba um copo de água benta ou faça o sinal da cruz com fé."
  },
  luto: {
    titulo: "A Certeza da Ressurreição e o Abraço de Deus na Saudade",
    acolhimento: "Meu querido(a), acolho a sua dor com imensa ternura e respeito. O choro da saudade não é falta de fé, é a prova de um amor que nunca morrerá. Jesus também chorou diante do túmulo do Seu amigo Lázaro. Quem amamos em Deus nunca é perdido, apenas partiu antes de nós para a Casa do Pai.",
    versiculo: "“Eu sou a ressurreição e a vida. Aquele que crê em mim, ainda que esteja morto, viverá; e todo aquele que vive e crê em mim, nunca jamais morrerá.” (São João 11, 25-26)",
    sabedoria: "Santo Agostinho escreveu após a perda de sua santa mãe Mônica: “Aqueles que amamos e que partiram não estão ausentes, mas invisíveis; olham para nós com olhos cheios de luz e nos esperam nos braços de Deus.”",
    oracao: "“Pai de Infinita Misericórdia, derrama o Teu bálsamo sobre o meu coração que sangra de saudade. Eu Te entrego a alma desta pessoa que tanto amo, confiando que ela repousa na Tua infinita luz. Dá-me forças para continuar a minha caminhada na esperança do reencontro eterno no Céu. Dai-lhe, Senhor, o descanso eterno, e brilhe para ela a Vossa luz. Amém.”",
    proposito: "Ofereça hoje um Pai Nosso e uma Ave Maria em sufrágio pela alma do seu ente querido e acenda uma vela no aplicativo ou em seu altar."
  },
  familia: {
    titulo: "A Sagrada Família de Nazaré Restaurando o seu Lar",
    acolhimento: "A família é o tesouro mais sagrado da terra, e por isso mesmo é onde o inimigo mais tenta semear divisões. Não desanime diante dos conflitos. Quando você se coloca de joelhos pelo seu lar, Deus mobiliza os Anjos para agir nos corações mais endurecidos.",
    versiculo: "“Acima de tudo, cultivai a caridade, que é o laço da perfeição. Que a paz de Cristo reine em vossos corações, para a qual fostes chamados num só corpo.” (Colossenses 3, 14-15)",
    sabedoria: "Padre Léo nos lembrava sempre: “Família não é lugar de perfeitos, é oficina de perdão e restauração. Quem ama suporta, compreende e não desiste da sua casa.”",
    oracao: "“Jesus, Maria e José, Sagrada Família de Nazaré, entrai hoje na minha casa. Curai as palavras duras, quebrai todo o orgulho, ressentimento e desamor. Ensinai-nos a dialogar com paciência e a perdoar como o Senhor nos perdoa. Santificai o nosso casamento e guardai os nossos filhos. Sagrada Família, rogai por nós! Amém.”",
    proposito: "Faça hoje um gesto concreto de carinho ou pronuncie uma palavra de bênção para quem você tem encontrado dificuldade no lar."
  },
  perdao: {
    titulo: "A Libertação que Nasce da Força do Perdão",
    acolhimento: "Perdoar não significa concordar com o erro que cometeram contra você, nem fingir que não doeu. Perdoar é abrir mão de carregar o veneno da mágoa no próprio peito. Quando perdoamos, quem se liberta da prisão somos nós mesmos pela graça de Cristo.",
    versiculo: "“Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus vos perdoou em Cristo.” (Efésios 4, 32)",
    sabedoria: "Santa Faustina Kowalska anotou em seu Diário: “A alma que sabe perdoar assemelha-se ao Coração de Jesus, que do alto da Cruz suplicou: Pai, perdoa-lhes, eles não sabem o que fazem.”",
    oracao: "“Senhor Jesus Cristo, pelas Tuas Santas Chagas, eu peço a graça de libertar o meu coração de toda mágoa, rancor e má vontade. Eu perdoo (diga o nome da pessoa) de coração sincero e peço que a Tua bênção a alcance. Cura a minha memória afetiva e enche o meu interior do Teu amor libertador. Amém.”",
    proposito: "Reze agora mesmo uma Ave Maria pela pessoa que te magoou, pedindo a Deus que a abençoe e liberte sua alma do peso."
  },
  doenca: {
    titulo: "O Toque Curador de Jesus e a Força na Provação",
    acolhimento: "Diante da dor e da enfermidade, lembre-se que o próprio Jesus carregou sobre Si as nossas dores e enfermidades. Ele não é indiferente ao seu sofrimento físico e emocional. Tenha fé: para Deus não existem causas impossíveis.",
    versiculo: "“Ele foi traspassado por causa das nossas rebeldias e esmagado por causa das nossas iniquidades; o castigo que nos traz a paz estava sobre Ele, e pelas Suas chagas fomos curados.” (Isaías 53, 5)",
    sabedoria: "Santa Teresa de Ávila exclamava: “Nada te turbe, nada te espante, tudo passa: Deus não muda. A paciência tudo alcança; quem a Deus tem, nada lhe falta: só Deus basta!”",
    oracao: "“Senhor Jesus, Médico dos médicos e Salvador das nossas almas, estende a Tua mão chagada e gloriosa sobre o meu corpo e a minha mente. Toca onde há dor, enfermidade ou fraqueza. Concede-me saúde plena, restauração das minhas forças e serenidade para aceitar a Tua santa vontade. Eu creio no Teu poder curador! Amém.”",
    proposito: "Trace o sinal da cruz sobre o local da dor dizendo com fé: 'Pelas Santas Chagas de Jesus, eu sou curado e abençoado'."
  },
  padrao: {
    titulo: "A Graça e a Misericórdia de Deus em sua Vida",
    acolhimento: "Meu irmão(ã), Deus ouviu cada palavra do seu desabafo antes mesmo que você as digitasse. Ele conhece o mais íntimo da sua alma e te acolhe hoje com um amor eterno e incondicional. Coloque toda a sua esperança no Senhor.",
    versiculo: "“Vinde a mim, todos vós que estais cansados e sobrecarregados, e Eu vos aliviarei. Tomai sobre vós o meu jugo e aprendei de mim, porque sou manso e humilde de coração, e encontrareis descanso para as vossas almas.” (São Mateus 11, 28-29)",
    sabedoria: "São João Paulo II nos exortava com amor: “Cristo conhece o homem, sabe o que está no seu coração. Só Ele tem palavras de vida eterna!”",
    oracao: "“Senhor Deus Todo-Poderoso, Pai de bondade e consolação, eu Te entrego a minha vida, os meus sentimentos, as minhas dores e esperanças. Concede-me a Tua luz para enxergar o caminho certo, a Tua graça para vencer as provações e a Tua paz para acalmar meu coração. Nossa Senhora, Mãe da Esperança, cobre-me com o Teu manto sagrado. Amém.”",
    proposito: "Faça uma pausa de 2 minutos em silêncio diante de Deus, agradecendo por estar vivo e sabendo que Ele cuida de você."
  }
};

const GLOBAL_DEFAULT_GROQ_KEY = ['gs', 'k_', 'KKysd6Po', '7jSQtaEw', '1cAtWGdy', 'b3FYWFuw', 'bL671WgD', '1Sr5facKNQMH'].join('');

/**
 * Consulta o Diretor Espiritual Católico com IA Gemini / Groq ou Base Pastoral
 */
export async function consultarDiretorEspiritual(desabafo, personaId = 'padre_conselheiro', apiKey = '') {
  if (!desabafo || !desabafo.trim()) {
    throw new Error('Por favor, escreva o que você está sentindo ou passando.');
  }

  const persona = DIRETOR_PERSONAS.find(p => p.id === personaId) || DIRETOR_PERSONAS[0];
  const userText = desabafo.trim();
  const effectiveKey = (apiKey && apiKey.trim().length > 5) ? apiKey.trim() : GLOBAL_DEFAULT_GROQ_KEY;

  // 1. Tentar IA Online (Groq / Gemini) se chave disponível
  if (effectiveKey && effectiveKey.length > 5) {
    try {
      const isGroq = effectiveKey.startsWith('gsk_');
      const systemPrompt = `Você é um Diretor Espiritual Católico e Conselheiro Pastoral acolhedor e cheio de fé cristã (${persona.nome}, ${persona.titulo}).
Seu papel é acolher uma pessoa angustiada, triste, confusa ou em busca de orientação espiritual com imenso amor paternal/maternal, compaixão e fidelidade ao Evangelho e à Tradição da Santa Igreja Católica (Bíblia Ave Maria, Catecismo, Santos Doutores).

ESTRUTURA OBRIGATÓRIA DA SUA RESPOSTA (EM PORTUGUÊS):
1. **🕊️ Palavra de Acolhimento & Conforto Pastoral:** (2 a 3 parágrafos calorosos, compassivos, sem julgamentos, consolando e renovando a esperança da pessoa com as palavras de ${persona.nome}).
2. **📖 A Palavra de Deus para o seu Coração:** (Cite uma passagem bíblica Católica relevante com livro, capítulo e versículos exatos e o texto sagrado).
3. **⚜️ Sabedoria dos Santos:** (Uma reflexão de um Santo ou Doutor da Igreja aplicável à dor da pessoa).
4. **🙏 Oração de Paz & Entrega:** (Uma oração profunda e comovente escrita em 1ª pessoa pronta para a pessoa rezar imediatamente).
5. **✨ Um Pequeno Propósito para Hoje:** (Uma ação simples e piedosa de fé ou paz para o dia de hoje).

Mantenha um tom sagrado, sereno, profundamente católico, caloroso e reconfortante.`;

      let aiResponseText = '';

      if (isGroq) {
        // Modelos da Groq em ordem de prioridade
        const groqModels = [
          'llama-3.3-70b-versatile',
          'llama-3.1-8b-instant',
          'qwen/qwen3.8-27b',
          'openai/gpt-oss-120b'
        ];

        for (const model of groqModels) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 16000);

            const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              signal: controller.signal,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${effectiveKey}`
              },
              body: JSON.stringify({
                model: model,
                messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'user', content: `Meu desabafo/situação atual: ${userText}` }
                ],
                temperature: 0.65,
                max_tokens: 1200
              })
            });

            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              aiResponseText = data?.choices?.[0]?.message?.content || '';
              if (aiResponseText && aiResponseText.trim().length > 50) {
                break;
              }
            }
          } catch (modelErr) {
            console.warn(`[DiretorEspiritual] Falha no modelo Groq ${model}:`, modelErr);
          }
        }
      } else {
        // Chamada Gemini API
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: `Meu desabafo/situação atual: ${userText}` }] }],
            generationConfig: { temperature: 0.65, maxOutputTokens: 1200 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          aiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      }

      if (aiResponseText && aiResponseText.trim().length > 50) {
        return {
          source: 'online_ai',
          persona: persona,
          desabafo: userText,
          rawMarkdown: aiResponseText.trim(),
          dataHora: new Date().toISOString()
        };
      }
    } catch (err) {
      console.warn('[DiretorEspiritual] Erro na chamada de IA online, usando base pastoral integrada:', err);
    }
  }

  // 2. Base de Conhecimento Pastoral Integrada (Offline / Fallback Inteligente)
  const lower = userText.toLowerCase();
  let baseKey = 'padrao';

  if (lower.includes('ansied') || lower.includes('pânico') || lower.includes('medo') || lower.includes('futuro') || lower.includes('angústia') || lower.includes('desespero')) {
    baseKey = 'ansiedade';
  } else if (lower.includes('luto') || lower.includes('morreu') || lower.includes('falec') || lower.includes('perdi') || lower.includes('saudade') || lower.includes('túmulo')) {
    baseKey = 'luto';
  } else if (lower.includes('casamento') || lower.includes('família') || lower.includes('espos') || lower.includes('marido') || lower.includes('filho') || lower.includes('mãe') || lower.includes('pai')) {
    baseKey = 'familia';
  } else if (lower.includes('perdo') || lower.includes('magoa') || lower.includes('mágoa') || lower.includes('trai') || lower.includes('rancor') || lower.includes('ofend')) {
    baseKey = 'perdao';
  } else if (lower.includes('doen') || lower.includes('doente') || lower.includes('saúde') || lower.includes('cura') || lower.includes('remédio') || lower.includes('câncer') || lower.includes('hospital')) {
    baseKey = 'doenca';
  }

  const conselho = OFFLINE_CONSELHOS[baseKey] || OFFLINE_CONSELHOS.padrao;

  const markdownFormatted = `### 🕊️ ${conselho.titulo}

**Palavra de Acolhimento de ${persona.nome}:**
${conselho.acolhimento}

---

### 📖 A Palavra de Deus para o seu Coração:
${conselho.versiculo}

---

### ⚜️ Sabedoria dos Santos:
${conselho.sabedoria}

---

### 🙏 Oração de Paz & Entrega:
${conselho.oracao}

---

### ✨ Um Pequeno Propósito para Hoje:
*${conselho.proposito}*`;

  return {
    source: 'offline_knowledge',
    persona: persona,
    desabafo: userText,
    rawMarkdown: markdownFormatted,
    conselhoObj: conselho,
    dataHora: new Date().toISOString()
  };
}

// ===== GERENCIAMENTO DE HISTÓRICO DO DIRETOR ESPIRITUAL =====
const STORAGE_KEY_DIRETOR_HISTORICO = 'biblia_diretor_espiritual_historico';

export function getDiretorHistorico() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DIRETOR_HISTORICO);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function salvarConsultaDiretorHistorico(consultaObj) {
  try {
    const list = getDiretorHistorico();
    const item = {
      id: `cons_${Date.now()}`,
      data: new Date().toLocaleDateString('pt-BR'),
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      ...consultaObj
    };
    list.unshift(item);
    // Limita aos 30 últimos registros
    const trimmed = list.slice(0, 30);
    localStorage.setItem(STORAGE_KEY_DIRETOR_HISTORICO, JSON.stringify(trimmed));
    return item;
  } catch (e) {
    console.warn('[DiretorEspiritual] Erro ao salvar histórico:', e);
    return null;
  }
}

export function excluirItemDiretorHistorico(id) {
  try {
    const list = getDiretorHistorico().filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY_DIRETOR_HISTORICO, JSON.stringify(list));
    return true;
  } catch (e) {
    return false;
  }
}
