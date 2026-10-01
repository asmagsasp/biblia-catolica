/**
 * teologiaService.js - IA Teológica Católica: "Pergunte aos Doutores da Igreja"
 * Bíblia Sagrada Católica (Edição Ave Maria)
 * Integração com Google Gemini IA + Base Teológica do Magistério da Igreja Católica (CIC, Patrística e Doutores)
 */

export const DOUTORES_PERSONAS = [
  {
    id: 'santo_tomas',
    nome: 'São Tomás de Aquino',
    titulo: 'Doutor Angélico (Suma Teológica)',
    icone: 'fa-feather-pointed',
    cor: '#eab308',
    avatarDesc: 'Mestre da razão, filosofia e clareza da Fé',
    saudacao: 'A graça não destrói a natureza, mas a aperfeiçoa. Qual verdade divina procuras compreender à luz da fé e da razão, meu irmão?'
  },
  {
    id: 'santo_agostinho',
    nome: 'Santo Agostinho',
    titulo: 'Doutor da Graça (Confissões)',
    icone: 'fa-heart-pulse',
    cor: '#ef4444',
    avatarDesc: 'Mestre do amor a Deus, conversão e intimidade espiritual',
    saudacao: 'Fizeste-nos para Ti, Senhor, e o nosso coração está inquieto enquanto não repousa em Ti. Que anseio de tua alma queres partilhar comigo?'
  },
  {
    id: 'catecismo_cic',
    nome: 'Catecismo da Igreja Católica (CIC)',
    titulo: 'Doutrina Oficial do Magistério',
    icone: 'fa-book-bible',
    cor: '#3b82f6',
    avatarDesc: 'A síntese da fé, sacramentos, mandamentos e oração',
    saudacao: 'A fé da Igreja é uma, santa, católica e apostólica. Que dúvida ou ensinamento da doutrina católica gostaria de aprofundar hoje?'
  },
  {
    id: 'padres_igreja',
    nome: 'Santos Padres da Igreja',
    titulo: 'Patrística dos Primeiros Séculos',
    icone: 'fa-monument',
    cor: '#a855f7',
    avatarDesc: 'São João Crisóstomo, São Jerônimo e Santo Inácio',
    saudacao: 'A Tradição Apostólica nos foi transmitida desde os primeiros mártires e apóstolos. O que a Sabedoria Antiga pode iluminar em teus passos?'
  },
  {
    id: 'santa_teresa',
    nome: 'Santa Teresa de Ávila',
    titulo: 'Doutora da Oração & Mística',
    icone: 'fa-hands-praying',
    cor: '#ec4899',
    avatarDesc: 'Mestra do Castelo Interior e da oração contemplativa',
    saudacao: 'Nada te turbe, nada te espante, tudo passa: Deus não muda. A paciência tudo alcança. Vamos falar sobre a vida de oração e intimidade com Jesus?'
  }
];

export const TEOLOGIA_PROMPT_SUGESTOES = [
  {
    titulo: '🍞 A Eucaristia',
    pergunta: 'Como a Igreja Católica explica a presença real de Jesus na Eucaristia (Transubstanciação)?'
  },
  {
    titulo: '🌹 A Virgem Maria',
    pergunta: 'Por que os católicos veneram Maria e o que significa ela ser a Mãe de Deus (Theotokos)?'
  },
  {
    titulo: '🕊️ Santíssima Trindade',
    pergunta: 'Como entender o mistério de um só Deus em três Pessoas divinas?'
  },
  {
    titulo: '🕯️ Purgatório e Finados',
    pergunta: 'O que é o Purgatório e por que a Tradição Católica reza pelas almas dos fiéis defuntos?'
  },
  {
    titulo: '📜 Bíblia e Tradição',
    pergunta: 'Qual a relação entre a Sagrada Escritura, a Sagrada Tradição e o Magistério da Igreja?'
  },
  {
    titulo: '✝️ Sofrimento Humano',
    pergunta: 'Qual o sentido redentor do sofrimento e da cruz na vida do cristão?'
  },
  {
    titulo: '🗝️ Confissão e Perdão',
    pergunta: 'Por que devemos confessar os pecados a um sacerdote e qual a base bíblica do Sacramento da Reconciliação?'
  },
  {
    titulo: '⚔️ Combate Espiritual',
    pergunta: 'Como vencer as tentações e manter a paz de espírito no combate diário da fé?'
  }
];

// RESPOSTAS TEOLÓGICAS DE REFERÊNCIA OFFLINE / FALLBACK
const OFFLINE_TEOLOGIA_KNOWLEDGE = {
  eucaristia: {
    titulo: "A Presença Real de Jesus na Sagrada Eucaristia",
    resposta: `**Ensinamento da Sagrada Tradição & Doutores:**
A Sagrada Eucaristia é *"a fonte e o ápice de toda a vida cristã"* (**CIC §1324**). 

1. **A Transubstanciação (São Tomás de Aquino - Suma Teológica III, q. 75):** Pela consagração sacerdotal, opera-se a conversão de toda a substância do pão na substância do Corpo de Cristo e de toda a substância do vinho na substância do Seu Sangue, permanecendo apenas os acidentes (aparência, sabor e textura de pão e vinho).
2. **Fundamento Bíblico:** *"Isto é o meu corpo, que é dado por vós"* (Lucas 22,19) e o Discurso do Pão da Vida: *"Quem come a minha carne e bebe o meu sangue tem a vida eterna, e eu o ressuscitarei no último dia"* (São João 6,54).
3. **Conselho Espiritual:** Diante do Santíssimo Sacramento, incline seu coração em adoração silenciosa. Cristo está verdadeiramente ali, vivo e ressuscitado.`
  },
  maria: {
    titulo: "A Virgem Maria na Fé Católica",
    resposta: `**Ensinamento da Sagrada Tradição & Doutores:**
A veneração a Maria é chamada pela Igreja de *hiperdulia* (veneração especial de amor filial), distinta da adoração (*latria*), devida somente a Deus (**CIC §971**).

1. **Mãe de Deus (Theotokos - Concílio de Éfeso, 431 d.C.):** Se Jesus é verdadeiro Deus e verdadeiro homem em uma só Pessoa divina, Maria é verdadeiramente a Mãe de Deus encarnado (Lucas 1,43).
2. **Intercessão Maternal:** Como nas Bodas de Caná (*"Fazei tudo o que Ele vos disser"*, Jo 2,5), Maria leva nossas preces a Jesus.
3. **Santo Agostinho ensina:** *"Maria foi mais bem-aventurada por acolher a Cristo pela fé em seu coração do que por concebê-lo fisicamente em seu seio."*`
  },
  purgatorio: {
    titulo: "O Purgatório e a Oração pelos Falecidos",
    resposta: `**Ensinamento da Sagrada Tradição & Doutores:**
O Purgatório não é um "segundo inferno", mas o abraço purificador da misericórdia de Deus para aqueles que morreram na graça divina, mas ainda necessitam de purificação final antes de contemplar a Face de Deus face a face (**CIC §1030-1032**).

1. **Fundamento Bíblico:** *"Santo e salutar pensamento é este de orar pelos mortos, para que sejam livres dos seus pecados"* (II Macabeus 12,46); *"Se a obra de alguém se queimar, sofrerá perda; ele mesmo, porém, será salvo, mas como que através do fogo"* (I Coríntios 3,15).
2. **Comunhão dos Santos:** Os fiéis na terra (Igreja Militante), os que se purificam (Igreja Padecente) e os santos no Céu (Igreja Triunfante) formam um só Corpo Místico em Cristo.`
  },
  trindade: {
    titulo: "O Mistério da Santíssima Trindade",
    resposta: `**Ensinamento da Sagrada Tradição & Doutores:**
A Santíssima Trindade é o mistério central da fé e da vida cristã (**CIC §234**). Deus não é solidão, mas perfeita comunhão de Amor eterno.

1. **Um Só Deus em Três Pessoas:** O Pai gera o Filho; o Filho é eternamente gerado pelo Pai; o Espírito Santo procede do Pai e do Filho como o Amor infinito entre ambos.
2. **Santo Agostinho (De Trinitate):** *"Se vês o amor, vês a Trindade: o que ama (Pai), o que é amado (Filho) e a própria fonte do Amor (Espírito Santo)."*
3. **São Tomás de Aquino:** A mente humana não pode esgotar a plenitude infinita de Deus, mas pela revelação em Jesus Cristo sabemos que Ele é Amor em Si mesmo.`
  }
};

/**
 * Obtém a chave do Google Gemini configurada no app
 */
function getApiKey() {
  try {
    return localStorage.getItem('biblia_gemini_api_key') || '';
  } catch (e) {
    return '';
  }
}

/**
 * Constrói as instruções de sistema (System Prompt) para garantir resposta estritamente católica
 */
function buildSystemInstruction(personaId = 'santo_tomas') {
  let personaStyle = '';
  switch (personaId) {
    case 'santo_agostinho':
      personaStyle = 'Você fala com o tom pastoral, ardente, místico e amoroso de Santo Agostinho de Hipona. Use expressões como "Irmão caríssimo", reflita sobre a graça de Deus, o amor e a inquietude do coração.';
      break;
    case 'catecismo_cic':
      personaStyle = 'Você responde com a autoridade, clareza e estrutura didática do Catecismo da Igreja Católica (CIC). Cite sempre os números dos parágrafos do CIC (§) e documentos conciliares relevantes.';
      break;
    case 'padres_igreja':
      personaStyle = 'Você fala com a sabedoria solene da Patrística e dos primeiros séculos do Cristianismo (São Jerônimo, São João Crisóstomo, Santo Inácio de Antioquia, São Justino).';
      break;
    case 'santa_teresa':
      personaStyle = 'Você fala com o tom maternal, prático e místico de Santa Teresa de Ávila e São João da Cruz, focando na intimidade com Deus, perseverança na oração e confiança total na misericórdia divina.';
      break;
    case 'santo_tomas':
    default:
      personaStyle = 'Você fala com a sabedoria luminosa, serena e estruturada de São Tomás de Aquino (Doutor Angélico). Use distinções claras, una a fé à reta razão e cite a Suma Teológica quando oportuno.';
      break;
  }

  return `Você é um eminente Teólogo Católico e conselheiro espiritual na "Bíblia Sagrada Católica Ave Maria".
${personaStyle}

DIRETRIZES FUNDAMENTAIS:
1. Permaneça 100% fiel à Sagrada Tradição, à Sagrada Escritura (Cânon Católico com os 73 livros bíblicos) e ao Sagrado Magistério da Igreja Católica Apostólica Romana.
2. Explique passagens bíblicas usando os quatro sentidos da Sagrada Escritura da Tradição Católica: Sentido Literal, Alegórico (Cristológico), Moral e Anagógico (Ecológico/Escatológico) segundo o CIC §115-119.
3. Cite passagens bíblicas, o Catecismo da Igreja Católica (CIC §) e Doutores da Igreja sempre que enriquecer a resposta.
4. Mantenha um tom acolhedor, profundamente espiritual, reverente, claro e animador da fé católica.
5. Formate a resposta de maneira elegante usando Markdown (títulos, negrito, listas e citações em itálico). Conclua sempre com uma breve oração ou bênção curta.`;
}

/**
 * Consulta a IA Teológica Católica (Google Gemini ou Fallback Offline)
 */
export async function consultarIaTeologica({ pergunta, livro, capitulo, versiculo, textoPassagem, personaId = 'santo_tomas' }) {
  const apiKey = getApiKey();

  // Se for uma explicação de capítulo ou versículo bíblico específico
  let userMessage = pergunta;
  if (livro && capitulo) {
    if (versiculo && textoPassagem) {
      userMessage = `Por favor, explique teológica e espiritualmente o versículo de ${livro} ${capitulo},${versiculo}: "${textoPassagem}". Como a Tradição Católica e os Santos Doutores interpretam esta passagem bíblica e como podemos aplicá-la em nossa vida espiritual diária?`;
    } else {
      userMessage = `Por favor, faça uma explicação teológica e bíblica católica do capítulo ${capitulo} do livro de ${livro}. Quais são os temas centrais, a visão cristológica e as principais lições para nossa fé segundo o Magistério e a Tradição da Igreja?`;
    }
  }

  // 1. Se possuir chave Gemini, tentar chamar o modelo de IA
  if (apiKey) {
    try {
      const systemInstruction = buildSystemInstruction(personaId);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: userMessage }]
            }
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 1200
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return {
            source: 'gemini_ai',
            resposta: candidate.trim()
          };
        }
      }
    } catch (err) {
      console.warn('[TeologiaService] Erro ao chamar Gemini API, usando base de conhecimento offline:', err);
    }
  }

  // 2. Base de conhecimento integrada offline / local
  const lowerQuery = (userMessage || '').toLowerCase();
  
  if (lowerQuery.includes('eucarist') || lowerQuery.includes('hóstia') || lowerQuery.includes('comunhão') || lowerQuery.includes('joão 6')) {
    return { source: 'offline_knowledge', resposta: OFFLINE_TEOLOGIA_KNOWLEDGE.eucaristia.resposta };
  }
  if (lowerQuery.includes('maria') || lowerQuery.includes('nossa senhora') || lowerQuery.includes('mãe de deus') || lowerQuery.includes('aparecida') || lowerQuery.includes('imaculada')) {
    return { source: 'offline_knowledge', resposta: OFFLINE_TEOLOGIA_KNOWLEDGE.maria.resposta };
  }
  if (lowerQuery.includes('purgat') || lowerQuery.includes('falecid') || lowerQuery.includes('morto') || lowerQuery.includes('alma')) {
    return { source: 'offline_knowledge', resposta: OFFLINE_TEOLOGIA_KNOWLEDGE.purgatorio.resposta };
  }
  if (lowerQuery.includes('trindade') || lowerQuery.includes('pai, filho') || lowerQuery.includes('espírito santo') || lowerQuery.includes('deus uno')) {
    return { source: 'offline_knowledge', resposta: OFFLINE_TEOLOGIA_KNOWLEDGE.trindade.resposta };
  }

  // Resposta estruturada padrão inspirada em São Tomás e no CIC
  return {
    source: 'offline_fallback',
    resposta: `### 🕊️ Resposta dos Doutores da Igreja & Tradição Católica

Sobre a sua questão (*"${pergunta || (livro ? `${livro} ${capitulo}` : 'Doutrina Católica')}"*):

1. **A Sagrada Escritura e o Magistério (CIC §85):** A Igreja nos ensina que a Palavra de Deus escrita e a Tradição viva formam um único depósito sagrado confiado à Igreja. Para compreender qualquer verdade de fé, devemos olhar para a pessoa de Nosso Senhor Jesus Cristo, plenitude de toda a Revelação.

2. **Luz de São Tomás de Aquino:** Tudo o que Deus opera na criação e na história da salvação tem por finalidade a Sua glória e a salvação das nossas almas. A fé busca a inteligência (*fides quaerens intellectum*), e a oração humilde abre as portas para a sabedoria divina.

3. **Aplicação Prática:** Aprofunde sua meditação diária na Sagrada Escritura, frequente os Sacramentos (especialmente a Santa Missa e a Confissão) e reze com confiança filial.

---
*“Senhor Jesus, concedei-nos a sabedoria do vosso Santo Espírito para que conheçamos a vossa verdade e caminhemos na caridade todos os dias de nossa vida. Amém.”*`
  };
}
