/**
 * confissaoService.js - Guia Completo do Exame de Consciência & Santa Confissão
 * Baseado no Catecismo da Igreja Católica (CIC) e na Tradição dos Santos
 * 100% Privado e Seguro: os dados nunca saem do dispositivo.
 */

import { Preferences } from '@capacitor/preferences';

export const MANDAMENTOS_DEUS = [
  {
    id: "m1",
    numero: "1º Mandamento",
    titulo: "Amar a Deus sobre todas as coisas",
    perguntas: [
      { id: "m1_1", texto: "Deixei de orar com frequência ou rezei de maneira apressada e sem atenção?" },
      { id: "m1_2", texto: "Coloquei bens materiais, trabalho, fama, diversões ou pessoas acima de Deus?" },
      { id: "m1_3", texto: "Pratiquei superstições, consultei horóscopos, cartomantes, espiritismo ou magia?" },
      { id: "m1_4", texto: "Tive vergonha de professar minha fé católica ou me calei diante de ofensas à Igreja?" },
      { id: "m1_5", texto: "Duvidei voluntariamente de verdades da fé ensinadas pela Igreja Católica?" }
    ]
  },
  {
    id: "m2",
    numero: "2º Mandamento",
    titulo: "Não tomar Seu Santo Nome em vão",
    perguntas: [
      { id: "m2_1", texto: "Usei o Santo Nome de Deus, de Jesus, da Virgem Maria ou dos Santos sem respeito, em piadas ou momentos de raiva?" },
      { id: "m2_2", texto: "Jurei em falso, jurei por coisas fúteis ou quebrei promessas feitas a Deus?" },
      { id: "m2_3", texto: "Falei com desrespeito sobre coisas sagradas, templos, sacramentos ou ministros de Deus?" }
    ]
  },
  {
    id: "m3",
    numero: "3º Mandamento",
    titulo: "Guardar domingos e festas de guarda",
    perguntas: [
      { id: "m3_1", texto: "Faltei à Santa Missa aos domingos ou dias de preceito por preguiça ou motivos banais?" },
      { id: "m3_2", texto: "Cheguei tarde por desleixo ou assisti à Missa com distrações voluntárias e falta de reverência?" },
      { id: "m3_3", texto: "Comunguei em estado de pecado grave sem antes ter me confessado?" },
      { id: "m3_4", texto: "Realizei trabalhos servis desnecessários aos domingos, prejudicando o dia do Senhor e a convivência familiar?" }
    ]
  },
  {
    id: "m4",
    numero: "4º Mandamento",
    titulo: "Honrar pai e mãe",
    perguntas: [
      { id: "m4_1", texto: "Fui desobediente, desrespeitoso ou ingrato com meus pais ou idosos da família?" },
      { id: "m4_2", texto: "Negligenciei o auxílio material ou espiritual aos meus pais em suas necessidades ou velhice?" },
      { id: "m4_3", texto: "(Para pais) Deixei de educar meus filhos na fé cristã, na oração e nos sacramentos?" },
      { id: "m4_4", texto: "Provoquei desunião, discórdia ou ressentimento na vida familiar?" }
    ]
  },
  {
    id: "m5",
    numero: "5º Mandamento",
    titulo: "Não matar",
    perguntas: [
      { id: "m5_1", texto: "Guardei ódio, rancor, desejo de vingança ou recusei o perdão a quem me ofendeu?" },
      { id: "m5_2", texto: "Prejudiquei minha saúde ou meu corpo com excessos, bebidas alcoólicas, drogas ou descuido voluntário?" },
      { id: "m5_3", texto: "Fiz, incentivei, apoiei ou aconselhei a prática do aborto ou de eutanásia?" },
      { id: "m5_4", texto: "Feri alguém com palavras duras, humilhações, agressões físicas ou violência verbal?" },
      { id: "m5_5", texto: "Fui motivo de escândalo, induzindo outras pessoas ao pecado com meu mau exemplo?" }
    ]
  },
  {
    id: "m6",
    numero: "6º e 9º Mandamentos",
    titulo: "Não pecar contra a castidade / Não cobiçar a mulher do próximo",
    perguntas: [
      { id: "m6_1", texto: "Alimentei pensamentos, desejos ou fantasias impuras deliberadamente?" },
      { id: "m6_2", texto: "Consumi pornografia, imagens, vídeos ou leituras contrárias à pureza cristã?" },
      { id: "m6_3", texto: "Cometi atos impuros sozinho (masturbação) ou com outra pessoa fora do matrimônio?" },
      { id: "m6_4", texto: "Fui infiel ao meu cônjuge por pensamentos, conversas inadequadas ou atitudes?" },
      { id: "m6_5", texto: "Fui imprudente no vestir, falar ou em conversas que desrespeitam o pudor e a modéstia?" }
    ]
  },
  {
    id: "m7",
    numero: "7º e 10º Mandamentos",
    titulo: "Não furtar / Não cobiçar as coisas alheias",
    perguntas: [
      { id: "m7_1", texto: "Peguei algo que não me pertencia sem permissão ou deixei de devolver o que peguei emprestado?" },
      { id: "m7_2", texto: "Fui desonesto no trabalho, nos negócios, nos impostos ou lesei alguém financeiramente?" },
      { id: "m7_3", texto: "Desperdicei dinheiro em jogos de azar ou fui avarento, negando esmola aos necessitados?" },
      { id: "m7_4", texto: "Tive inveja dos bens, do sucesso ou da vida dos outros?" }
    ]
  },
  {
    id: "m8",
    numero: "8º Mandamento",
    titulo: "Não levantar falso testemunho nem mentir",
    perguntas: [
      { id: "m8_1", texto: "Disse mentiras ou omiti a verdade prejudicando os outros?" },
      { id: "m8_2", texto: "Participei de fofocas, calúnias ou espalhei difamações manchando a reputação de alguém?" },
      { id: "m8_3", texto: "Fiz julgamentos precipitados e severos no meu íntimo contra o próximo?" },
      { id: "m8_4", texto: "Revelei segredos confiados a mim sem justa causa?" }
    ]
  }
];

export const PECADOS_CAPITAIS = [
  {
    pecado: "Soberba / Orgulho",
    virtude: "Humildade",
    descricao: "Julgar-se superior aos outros, não reconhecer as próprias fraquezas e querer ser o centro das atenções."
  },
  {
    pecado: "Avareza",
    virtude: "Generosidade / Desapego",
    descricao: "Apego desmedido ao dinheiro e aos bens temporais, fechando as mãos diante das necessidades do irmão."
  },
  {
    pecado: "Luxúria",
    virtude: "Castidade / Pureza",
    descricao: "Busca desordenada pelo prazer carnal e pela sensualidade sem respeito à dignidade humana e ao plano divino."
  },
  {
    pecado: "Ira",
    virtude: "Paciência / Mansidão",
    descricao: "Reações descontroladas de raiva, fúria, agressividade e falta de domínio próprio."
  },
  {
    pecado: "Gula",
    virtude: "Temperança / Sobriedade",
    descricao: "Excesso desordenado no comer, beber ou na busca insaciável por satisfações materiais."
  },
  {
    pecado: "Inveja",
    virtude: "Caridade / Benevolência",
    descricao: "Tristeza pelo bem ou sucesso alheio, ou alegria pelo fracasso do irmão."
  },
  {
    pecado: "Preguiça / Acídia",
    virtude: "Diligência / Fervor Espiritual",
    descricao: "Negligência nos deveres de oração, no trabalho, na vida familiar e na busca pelas coisas de Deus."
  }
];

export const ORACOES_CONFISSAO = {
  atoContricaoTradicional: `Senhor meu Jesus Cristo, Deus e Homem verdadeiro, Criador e Redentor meu, por serdes Vós quem sois, sumamente bom e digno de ser amado sobre todas as coisas, e porque Vos amo e estimo, pesa-me, Senhor, de todo o meu coração, de Vos ter ofendido; pesa-me também de ter perdido o Céu e merecido o Inferno; e proponho firmemente, ajudado com os auxílios da Vossa divina graça, emendar-me e nunca mais Vos tornar a ofender. Espero alcançar o perdão de minhas culpas pela Vossa infinita misericórdia. Amém.`,
  atoContricaoBreve: `Meu Deus, eu me arrependo de todo o coração de Vos ter ofendido, porque sois infinitamente bom e o pecado Vos desagrada. Prometo, com a Vossa graça, nunca mais pecar e fugir das ocasiões de pecado. Senhor, tende piedade de mim. Amém.`,
  atoContricaoLatim: `Deus meus, ex toto corde me paenitet de omnibus quae admisi et de bono quod omisi, quia te offendi, summum bonum et super omnia amabilem. Ideo firmiter propono, adiuvante gratia tua, de cetero me emendare et peccandi occasiones vitare. Domine Iesu Christe, Fili Dei, miserere mei peccatoris. Amen.`
};

const STORAGE_KEY_CONFISSAO_CHECKS = 'confissao_itens_marcados_v1';
const STORAGE_KEY_ULTIMA_CONFISSAO = 'confissao_ultima_data_v1';

/**
 * Retorna os IDs dos pecados selecionados no exame atual
 */
export async function getPecadosMarcados() {
  try {
    const res = await Preferences.get({ key: STORAGE_KEY_CONFISSAO_CHECKS });
    if (res && res.value) {
      return JSON.parse(res.value);
    }
  } catch (e) {
    const raw = localStorage.getItem(STORAGE_KEY_CONFISSAO_CHECKS);
    if (raw) return JSON.parse(raw);
  }
  return [];
}

/**
 * Alterna a marcação de um item de pecado no exame
 */
export async function togglePecadoMarcado(id) {
  let marcados = await getPecadosMarcados();
  if (marcados.includes(id)) {
    marcados = marcados.filter(item => item !== id);
  } else {
    marcados.push(id);
  }
  const str = JSON.stringify(marcados);
  try {
    await Preferences.set({ key: STORAGE_KEY_CONFISSAO_CHECKS, value: str });
  } catch (e) {
    localStorage.setItem(STORAGE_KEY_CONFISSAO_CHECKS, str);
  }
  return marcados;
}

/**
 * Limpa todo o exame após a confissão e atualiza a data da última confissão
 */
export async function registrarConfissaoRealizada() {
  const agora = new Date().toISOString();
  try {
    await Preferences.set({ key: STORAGE_KEY_CONFISSAO_CHECKS, value: JSON.stringify([]) });
    await Preferences.set({ key: STORAGE_KEY_ULTIMA_CONFISSAO, value: agora });
  } catch (e) {
    localStorage.setItem(STORAGE_KEY_CONFISSAO_CHECKS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEY_ULTIMA_CONFISSAO, agora);
  }
  return agora;
}

/**
 * Retorna a data da última confissão realizada
 */
export async function getUltimaConfissaoData() {
  try {
    const res = await Preferences.get({ key: STORAGE_KEY_ULTIMA_CONFISSAO });
    if (res && res.value) return res.value;
  } catch (e) {
    return localStorage.getItem(STORAGE_KEY_ULTIMA_CONFISSAO);
  }
  return null;
}
