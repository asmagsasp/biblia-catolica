/**
 * lectioService.js - Modo Lectio Divina (Oração Contemplativa Católica em 4 Passos)
 * Baseado na tradição monástica de São Bento e Guigo, o Cartuxo
 */

import { Preferences } from '@capacitor/preferences';

export const LECTIO_STEPS = [
  {
    id: 1,
    nome: "Lectio",
    subtitulo: "Leitura Sagrada",
    latin: "O que o texto diz em si mesmo?",
    icone: "fa-book-open-reader",
    cor: "#3b82f6", // Azul Sereno
    fundo: "rgba(59, 130, 246, 0.12)",
    borda: "rgba(59, 130, 246, 0.4)",
    descricao: "Leia o texto sagrado com calma, reverência e atenção amorosa. Não tenha pressa. Deixe que cada frase ecoe em sua alma.",
    instrucao: "Repita a leitura 2 ou 3 vezes se necessário. Observe os personagens, as ações e as palavras que tocam o seu coração.",
    perguntaGuia: "Qual palavra ou frase mais chamou a sua atenção neste trecho bíblico?"
  },
  {
    id: 2,
    nome: "Meditatio",
    subtitulo: "Meditação no Coração",
    latin: "O que Deus me diz através deste texto?",
    icone: "fa-heart",
    cor: "#a855f7", // Púrpura Espiritual
    fundo: "rgba(168, 85, 247, 0.12)",
    borda: "rgba(168, 85, 247, 0.4)",
    descricao: "Ruminar a Palavra de Deus. Traga o texto para a sua vida, para as suas lutas, alegrias, família e decisões do momento.",
    instrucao: "Confronte sua vida com a Palavra. O que o Senhor está revelando sobre você, sobre Seu amor ou sobre o que precisa mudar?",
    perguntaGuia: "Como esta Palavra de Deus se aplica à minha realidade atual?"
  },
  {
    id: 3,
    nome: "Oratio",
    subtitulo: "Oração e Diálogo",
    latin: "O que respondo a Deus?",
    icone: "fa-praying-hands",
    cor: "#eab308", // Dourado Sacro
    fundo: "rgba(234, 179, 8, 0.12)",
    borda: "rgba(234, 179, 8, 0.4)",
    descricao: "Fale com Deus com o coração aberto, como um amigo fala a seu amigo mais íntimo. Responda àquilo que Ele lhe falou na meditação.",
    instrucao: "Apresente seus louvores, pedidos de perdão, gratidão e súplicas confiantes ao Pai celestial.",
    perguntaGuia: "Escreva ou eleve sua prece sincera a Deus em resposta à Sua Palavra:"
  },
  {
    id: 4,
    nome: "Contemplatio & Actio",
    subtitulo: "Contemplação & Propósito de Vida",
    latin: "Como Deus quer que eu viva hoje?",
    icone: "fa-dove",
    cor: "#22c55e", // Verde Esperança
    fundo: "rgba(34, 197, 94, 0.12)",
    borda: "rgba(34, 197, 94, 0.4)",
    descricao: "Fique em silêncio amoroso na presença do Senhor, adorando Sua grandeza. Depois, defina um propósito concreto para seu dia.",
    instrucao: "A contemplação gera frutos. Escolha uma atitude prática de amor, caridade, paciência ou perdão para viver nas próximas horas.",
    perguntaGuia: "Qual é o seu compromisso prático de fé e amor para o dia de hoje?"
  }
];

export const LECTIO_SUGESTOES = [
  {
    titulo: "O Bom Pastor",
    ref: "Salmos 23,1-6",
    tema: "Confiança e amparo divino",
    texto: "O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar e me conduz a águas tranquilas; restaura-me o vigor. Guia-me pelas veredas da justiça por amor do seu nome. Ainda que eu ande pelo vale da sombra da morte, não temerei perigo algum, pois tu estás comigo; a tua vara e o teu cajado me protegem."
  },
  {
    titulo: "A Videira Verdadeira",
    ref: "João 15,1-8",
    tema: "Permanecer em Cristo e dar frutos",
    texto: "Eu sou a videira verdadeira, e meu Pai é o agricultor. Todo ramo que em mim não dá fruto ele corta; e todo ramo que dá fruto ele poda, para que produza ainda mais fruto. Permanecei em mim, e eu permanecerei em vós. Como o ramo não pode dar fruto por si mesmo, se não permanecer na videira, assim também vós não podeis dar fruto, se não permanecerdes em mim."
  },
  {
    titulo: "As Bem-Aventuranças",
    ref: "Mateus 5,3-12",
    tema: "O caminho da santidade e da felicidade cristã",
    texto: "Bem-aventurados os pobres de espírito, porque deles é o Reino dos Céus. Bem-aventurados os mansos, porque possuirão a terra. Bem-aventurados os que choram, porque serão consolados. Bem-aventurados os que têm fome e sede de justiça, porque serão saciados. Bem-aventurados os misericordiosos, porque alcançarão misericórdia. Bem-aventurados os puros de coração, porque verão a Deus."
  },
  {
    titulo: "O Amor Nunca Falha",
    ref: "1 Coríntios 13,1-8",
    tema: "O primado da caridade e do amor cristão",
    texto: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta. O amor nunca falha."
  },
  {
    titulo: "A Anunciação e o Sim de Maria",
    ref: "Lucas 1,26-38",
    tema: "Humildade e obediência à vontade de Deus",
    texto: "O anjo entrou onde ela estava e disse: 'Alegra-te, cheia de graça! O Senhor está contigo.' Ela ficou perturbada com essas palavras, mas o anjo lhe disse: 'Não tenhas medo, Maria! Encontrastes graça diante de Deus.' E Maria respondeu: 'Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra.'"
  },
  {
    titulo: "O Refúgio do Altíssimo",
    ref: "Salmos 91,1-16",
    tema: "Proteção divina e escudo celestial",
    texto: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei. Porque ele te livrará do laço do passarinheiro e da peste perniciosa. Ele te cobrirá com as suas penas, e debaixo das suas asas te confiarás."
  }
];

const STORAGE_KEY_LECTIO_HISTORICO = 'lectio_divina_historico_v1';

/**
 * Recupera o histórico de sessões de Lectio Divina salvas pelo fiel
 */
export async function getLectioHistorico() {
  try {
    const res = await Preferences.get({ key: STORAGE_KEY_LECTIO_HISTORICO });
    if (res && res.value) {
      return JSON.parse(res.value);
    }
  } catch (e) {
    const raw = localStorage.getItem(STORAGE_KEY_LECTIO_HISTORICO);
    if (raw) return JSON.parse(raw);
  }
  return [];
}

/**
 * Salva uma nova sessão de Lectio Divina concluída
 */
export async function salvarSessaoLectio(sessao) {
  const historico = await getLectioHistorico();
  const novaSessao = {
    id: 'lectio_' + Date.now(),
    data: new Date().toISOString(),
    dataFormatada: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
    passagemRef: sessao.passagemRef || 'Passagem Bíblica',
    passagemTexto: sessao.passagemTexto || '',
    meditacao: sessao.meditacao || '',
    oracao: sessao.oracao || '',
    proposito: sessao.proposito || '',
    duracaoMinutos: sessao.duracaoMinutos || 5
  };

  historico.unshift(novaSessao);
  const dataString = JSON.stringify(historico.slice(0, 50)); // Guarda até 50 sessões

  try {
    await Preferences.set({ key: STORAGE_KEY_LECTIO_HISTORICO, value: dataString });
  } catch (e) {
    localStorage.setItem(STORAGE_KEY_LECTIO_HISTORICO, dataString);
  }

  return novaSessao;
}

/**
 * Exclui uma sessão do histórico
 */
export async function excluirSessaoLectio(id) {
  let historico = await getLectioHistorico();
  historico = historico.filter(s => s.id !== id);
  const dataString = JSON.stringify(historico);
  try {
    await Preferences.set({ key: STORAGE_KEY_LECTIO_HISTORICO, value: dataString });
  } catch (e) {
    localStorage.setItem(STORAGE_KEY_LECTIO_HISTORICO, dataString);
  }
  return historico;
}
