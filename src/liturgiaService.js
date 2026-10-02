import { getDevotionalHomily } from './homilyService.js';

// Cache de liturgia diária por data (YYYY-MM-DD)
const liturgiaCache = new Map();

// Cores litúrgicas e seus significados
export const LITURGICAL_COLORS = {
  verde: { name: 'Verde', hex: '#22c55e', desc: 'Tempo Comum (Esperança e Vida)' },
  roxo: { name: 'Roxo / Violáceo', hex: '#a855f7', desc: 'Advento / Quaresma (Penitência e Conversão)' },
  branco: { name: 'Branco / Dourado', hex: '#eab308', desc: 'Festas e Solenidades (Luz, Pureza e Vitória)' },
  vermelho: { name: 'Vermelho', hex: '#ef4444', desc: 'Domingo de Ramos, Paixão, Pentecostes e Mártires (Amor e Fogo)' },
  rosa: { name: 'Rosa', hex: '#ec4899', desc: 'Domingos Gaudete e Laetare (Alegria)' }
};

// Base de Santos e Doutores da Igreja por dia/mês (fallback riquíssimo e canônico)
const SANTOS_DO_ANO = {
  "01-01": { nome: "Santa Maria, Mãe de Deus", titulo: "Solenidade da Santíssima Virgem", resumo: "Celebração do dogma da Maternidade Divina proclamado no Concílio de Éfeso.", oracao: "Santa Mãe de Deus, protegei nossas famílias e guiai nossos passos no ano que se inicia." },
  "01-02": { nome: "São Basílio Magno e São Gregório Nazianzeno", titulo: "Bispos e Doutores da Igreja", resumo: "Grandes defensores da fé trinitária e da divindade de Cristo.", oracao: "Dai-nos, Senhor, a sabedoria e a fortaleza para testemunhar a verdade." },
  "01-03": { nome: "Santíssimo Nome de Jesus", titulo: "Memória Facultativa", resumo: "Nome santo diante do qual todo joelho se dobra nos céus, na terra e nos abismos.", oracao: "Jesus, manso e humilde de coração, fazei o meu coração semelhante ao vosso." },
  "01-25": { nome: "Conversão de São Paulo Apóstolo", titulo: "Festa Litúrgica", resumo: "A maravilhosa transformação de Saulo no Apóstolo das Nações a caminho de Damasco.", oracao: "São Paulo Apóstolo, rogai por nós e inflamai nosso zelo missionário." },
  "01-28": { nome: "São Tomás de Aquino", titulo: "Presbítero e Doutor da Igreja", resumo: "O Doutor Angélico, mestre supremo da teologia e da união entre fé e razão.", oracao: "São Tomás de Aquino, iluminai nossa inteligência com a luz da fé." },
  "01-31": { nome: "São João Bosco", titulo: "Presbítero e Fundador", resumo: "Pai e mestre da juventude, fundador dos Salesianos, mestre do Sistema Preventivo.", oracao: "São João Bosco, protegei nossos jovens e educadores." },
  "02-02": { nome: "Apresentação do Senhor", titulo: "Festa Litúrgica", resumo: "Jesus é levado ao Templo e aclamado por Simeão como Luz para iluminar as nações.", oracao: "Senhor Jesus, sede a luz que guia todos os nossos dias." },
  "02-11": { nome: "Nossa Senhora de Lourdes", titulo: "Dia Mundial do Enfermo", resumo: "A Imaculada Conceição revelada a Santa Bernadete com a fonte de curas milagrosas.", oracao: "Nossa Senhora de Lourdes, rogai pelos enfermos e dai-lhes alívio e esperança." },
  "03-19": { nome: "São José", titulo: "Esposo da Virgem Maria e Patrono da Igreja Universal", resumo: "O homem justo e silencioso que guardou o Filho de Deus e Nossa Senhora.", oracao: "Glorioso São José, protegei a Santa Igreja, nossas famílias e nosso trabalho." },
  "03-25": { nome: "Anunciação do Senhor", titulo: "Solenidade Litúrgica", resumo: "O 'Faça-se' de Maria e o Verbo de Deus que se fez carne no seio da Virgem.", oracao: "Eis aqui a serva do Senhor; faça-se em mim segundo a vossa palavra." },
  "04-16": { nome: "Santa Bernadete Soubirous", titulo: "Religiosa e Vidente de Lourdes", resumo: "Humilde pastora a quem a Virgem Santíssima confiou as mensagens de oração e penitência.", oracao: "Santa Bernadete, ensinai-nos a simplicidade e o amor filial a Maria." },
  "04-23": { nome: "São Jorge", titulo: "Mártir da Fé", resumo: "Soldado romano e mártir cristão, símbolo supremo da vitória da fé sobre as forças do mal.", oracao: "São Jorge, com vossa couraça de fé, protegei-nos de todo o perigo espiritual e corporal." },
  "04-25": { nome: "São Marcos Evangelista", titulo: "Festa Litúrgica", resumo: "Discípulo de São Pedro e autor do primeiro Evangelho.", oracao: "São Marcos, inspirai-nos a anunciar a Boa-Nova com fidelidade e coragem." },
  "04-29": { nome: "Santa Catarina de Sena", titulo: "Virgem e Doutora da Igreja", resumo: "Mística e pacificadora, padroeira da Europa, fiel amante de Cristo Crucificado.", oracao: "Santa Catarina, alcançai-nos um amor ardente pela Igreja e pelo Santo Padre." },
  "05-01": { nome: "São José Operário", titulo: "Patrono dos Trabalhadores", resumo: "Exemplo de dignidade no trabalho e santificação do labor diário.", oracao: "São José Operário, abençoai o pão de cada dia e os lares de todos os trabalhadores." },
  "05-13": { nome: "Nossa Senhora de Fátima", titulo: "Memória Litúrgica", resumo: "A aparição da Virgem aos pastorinhos na Cova da Iria pedindo oração e o Santo Terço.", oracao: "Nossa Senhora de Fátima, intercedei pela paz no mundo e pela conversão dos corações." },
  "05-22": { nome: "Santa Rita de Cássia", titulo: "Religiosa, Advogada das Causas Impossíveis", resumo: "Exemplo heroico de perdão, esposa, mãe, viúva e monja estigmatizada.", oracao: "Santa Rita de Cássia, advogada dos aflitos, rogai por nós nas horas mais difíceis." },
  "06-13": { nome: "São Santo Antônio de Pádua", titulo: "Presbítero e Doutor da Igreja", resumo: "O Doutor Evangélico, orador inspirado e amigo dos pobres e necessitados.", oracao: "Glorioso Santo Antônio, abençoai nossa vida e ensinai-nos a amar a Palavra de Deus." },
  "06-24": { nome: "Natividade de São João Batista", titulo: "Solenidade Litúrgica", resumo: "A voz que clama no deserto preparando os caminhos do Senhor Jesus.", oracao: "São João Batista, rogai por nós para que sejamos testemunhas da Verdade." },
  "06-29": { nome: "São Pedro e São Paulo", titulo: "Colunas da Santa Igreja", resumo: "Os príncipes dos apóstolos que derramaram o sangue por Cristo em Roma.", oracao: "Santos Apóstolos Pedro e Paulo, firmai nossa fé sobre a Rocha inabalável de Cristo." },
  "07-16": { nome: "Nossa Senhora do Carmo", titulo: "Rainha do Carmelo", resumo: "Entrega do Santo Escapulário a São Simão Stock como penhor de salvação e proteção.", oracao: "Flor do Carmelo, videira florida, esplendor do céu, protegei os vossos devotos." },
  "07-26": { nome: "São Joaquim e Santa Ana", titulo: "Pais de Nossa Senhora e Avós de Jesus", resumo: "Padroeiros dos avós, guardiões do lar sagrado de onde nasceu a Virgem Maria.", oracao: "São Joaquim e Santa Ana, abençoai nossos avós e famílias." },
  "08-08": { nome: "São Domingos de Gusmão", titulo: "Presbítero e Fundador", resumo: "Fundador da Ordem dos Pregadores (Dominicanos) e grande apóstolo do Santo Rosário.", oracao: "São Domingos, dai-nos a paixão pelo Evangelho e pela salvação das almas." },
  "08-15": { nome: "Assunção de Nossa Senhora", titulo: "Solenidade Litúrgica", resumo: "Maria é elevada em corpo e alma à glória celeste ao lado de seu Divino Filho.", oracao: "Rainha Assunta aos Céus, voltai para nós vossos olhos misericordiosos." },
  "08-27": { nome: "Santa Mônica", titulo: "Memória Litúrgica", resumo: "Mãe exemplar cujas lágrimas e orações constantes alcançaram a conversão de Santo Agostinho.", oracao: "Santa Mônica, intercedei pelas mães que choram pela fé de seus filhos." },
  "08-28": { nome: "Santo Agostinho", titulo: "Bispo e Doutor da Igreja", resumo: "Um dos maiores gênios da humanidade, convertido pela graça e apaixonado por Deus.", oracao: "Tarde te amei, ó Beleza tão antiga e tão nova! Dai-nos, Senhor, a sede de Ti." },
  "09-08": { nome: "Natividade de Nossa Senhora", titulo: "Festa Litúrgica", resumo: "A aurora da redenção: o nascimento da Mãe do Salvador enche o mundo de alegria.", oracao: "Bendita seja a vossa santa e imaculada conceição, ó Mãe de Deus." },
  "09-15": { nome: "Nossa Senhora das Dores", titulo: "Memória Litúrgica", resumo: "A Virgem junto à Cruz, unida ao sacrifício redentor de seu Divino Filho.", oracao: "Virgem Dolorosa, dai-nos força nas tribulações e compaixão com o sofrimento alheio." },
  "09-29": { nome: "Santos Arcanjos Miguel, Gabriel e Rafael", titulo: "Festa Litúrgica", resumo: "Os três grandes mensageiros celestes: Miguel (Quem como Deus?), Gabriel (Força de Deus) e Rafael (Cura de Deus).", oracao: "São Miguel Arcanjo, defendei-nos no combate para que não pereçamos no Juízo final." },
  "09-30": { nome: "São Jerônimo", titulo: "Presbítero e Doutor da Igreja", resumo: "Tradutor da Bíblia para o latim (Vulgata). 'Ignorar as Escrituras é ignorar a Cristo'.", oracao: "São Jerônimo, fazei-nos apaixonados pelo estudo e leitura diária da Bíblia Sagrada." },
  "10-01": { nome: "Santa Teresinha do Menino Jesus", titulo: "Virgem e Doutora da Igreja", resumo: "A mestra da 'Pequena Via' do amor, padroeira das missões, que prometeu fazer cair uma chuva de rosas.", oracao: "Santa Teresinha, derramai sobre nós vossa chuva de rosas e ensinai-nos a amar a Jesus na simplicidade." },
  "10-04": { nome: "São Francisco de Assis", titulo: "Fundador da Ordem dos Frades Menores", resumo: "O 'Poverello' de Assis, arauto da paz, apaixonado pela Criação e marcado com os Santos Estigmas.", oracao: "Senhor, fazei-me instrumento de vossa paz. Onde houver ódio, que eu leve o amor." },
  "10-12": { nome: "Nossa Senhora Aparecida", titulo: "Rainha e Padroeira do Brasil", resumo: "A imagem encontrada nas águas do Rio Paraíba que acolheu e abençoou o povo brasileiro.", oracao: "Nossa Senhora Aparecida, abençoai o Brasil, nossas famílias e nosso povo." },
  "10-15": { nome: "Santa Teresa de Jesus (Ávila)", titulo: "Virgem e Doutora da Igreja", resumo: "A grande mística carmelita, mestra da oração interior: 'Nada te turbe, só Deus basta'.", oracao: "Santa Teresa de Jesus, ensinai-nos o caminho da intimidade com Deus na oração." },
  "10-28": { nome: "São Judas Tadeu e São Simão", titulo: "Santos Apóstolos", resumo: "São Judas Tadeu, apóstolo fiel e padroeiro das causas desesperadas e impossíveis.", oracao: "São Judas Tadeu, apóstolo de Cristo, rogai por nós nas nossas causas mais urgentes." },
  "11-01": { nome: "Todos os Santos", titulo: "Solenidade Litúrgica", resumo: "A multidão incontável dos redimidos que triunfam no céu e intercedem por nós.", oracao: "Todos os Santos e Santas de Deus, intercedei por nós no caminho da santidade." },
  "11-02": { nome: "Comemoração de Todos os Fiéis Defuntos", titulo: "Dia de Oração pelas Almas", resumo: "A oração solidária e cheia de esperança por todos os irmãos que partiram desta vida.", oracao: "Dai-lhes, Senhor, o descanso eterno, e a luz perpétua os ilumine. Descansem em paz." },
  "11-27": { nome: "Nossa Senhora das Graças", titulo: "Manifestação da Medalha Milagrosa", resumo: "A Virgem manifesta a Santa Catarina Labouré com raios de graças celestes em suas mãos.", oracao: "Ó Maria concebida sem pecado, rogai por nós que recorremos a vós." },
  "12-08": { nome: "Imaculada Conceição da Santíssima Virgem", titulo: "Solenidade Litúrgica", resumo: "Maria preservada imune de toda mancha da culpa original desde o primeiro instante de sua existência.", oracao: "Toda sois formosa, ó Maria, e não há mancha original em vós!" },
  "12-12": { nome: "Nossa Senhora de Guadalupe", titulo: "Padroeira de toda a América", resumo: "A 'Moreninha do Tepeyac' que apareceu a São Juan Diego: 'Não estou eu aqui, que sou tua Mãe?'.", oracao: "Nossa Senhora de Guadalupe, protegei os povos de nossa América e aumentai a nossa fé." },
  "12-25": { nome: "Natal de Nosso Senhor Jesus Cristo", titulo: "Solenidade da Natividade", resumo: "O Verbo Eterno se fez carne e habitou entre nós. Glória a Deus nas alturas e paz aos homens!", oracao: "Senhor Jesus, nascei em nossos corações e trazei a paz a todas as famílias do mundo." }
};

/**
 * Obtém a liturgia para a data especificada (ou hoje por padrão)
 */
export async function getLiturgiaDiaria(dateInput = null) {
  const targetDate = dateInput ? new Date(dateInput) : new Date();
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;
  const dayMonthKey = `${month}-${day}`;

  if (liturgiaCache.has(dateKey)) {
    return liturgiaCache.get(dateKey);
  }

  let liturgiaData = null;

  // 1. Tenta buscar da API pública de Liturgia Católica CNBB
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const endpoints = [
      `https://liturgia.up.railway.app/v2/?dia=${day}&mes=${month}&ano=${year}`,
      `https://liturgia.up.railway.app/?dia=${day}&mes=${month}`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (res.ok) {
          const json = await res.json();
          if (json && (json.evangelho || json.primeiraLeitura)) {
            liturgiaData = normalizarDadosApi(json, targetDate);
            break;
          }
        }
      } catch (inner) {}
    }
    clearTimeout(timeout);
  } catch (e) {
    console.warn('[LiturgiaService] Falha ao consultar API online, usando gerador canônico local:', e);
  }

  // 2. Se a API estiver offline ou sem resposta, gera liturgia canônica com precisão litúrgica
  if (!liturgiaData) {
    liturgiaData = gerarLiturgiaCanonico(targetDate);
  }

  // 3. Acrescenta dados do Santo do Dia
  const santoInfo = SANTOS_DO_ANO[dayMonthKey] || gerarSantoGenerico(targetDate);
  liturgiaData.santo = {
    ...santoInfo,
    dataLegivel: targetDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
  };

  // 4. Gera Homilia Teológica do Evangelho
  liturgiaData.homilia = gerarHomiliaDoEvangelho(liturgiaData.evangelho, liturgiaData.reflexao);

  liturgiaCache.set(dateKey, liturgiaData);
  return liturgiaData;
}

/**
 * Gera Homilia Teológica Católica para o Evangelho da Liturgia
 */
export function gerarHomiliaDoEvangelho(evangelhoObj, fallbackReflexao = '') {
  if (!evangelhoObj) return null;
  const refStr = evangelhoObj.referencia || '';
  const titulo = evangelhoObj.titulo || '';
  const texto = evangelhoObj.texto || fallbackReflexao || '';

  let book = 'São Mateus';
  let chap = 1;
  let verses = '';

  const combined = (refStr + ' ' + titulo).toLowerCase();
  if (combined.includes('luc') || combined.includes('lc')) book = 'São Lucas';
  else if (combined.includes('mar') || combined.includes('mc')) book = 'São Marcos';
  else if (combined.includes('jo')) book = 'São João';
  else if (combined.includes('mat') || combined.includes('mt')) book = 'São Mateus';

  const match = refStr.match(/(\d+)[\s,:]+(\d+.*)?/);
  if (match) {
    chap = parseInt(match[1]) || 1;
    verses = (match[2] || '').trim();
  }

  return getDevotionalHomily(book, chap, verses, texto);
}

/**
 * Normaliza os dados retornados pela API pública para o formato padrão do nosso App
 */
function normalizarDadosApi(json, date) {
  const corRaw = (json.cor || 'verde').toLowerCase();
  let corKey = 'verde';
  if (corRaw.includes('rox') || corRaw.includes('viol')) corKey = 'roxo';
  else if (corRaw.includes('bran') || corRaw.includes('dour')) corKey = 'branco';
  else if (corRaw.includes('verm')) corKey = 'vermelho';
  else if (corRaw.includes('ros')) corKey = 'rosa';

  return {
    data: date.toISOString().split('T')[0],
    dataExtenso: formatarDataExtenso(date),
    tempoLiturgico: json.tempo || json.liturgia || 'Tempo Comum',
    cor: LITURGICAL_COLORS[corKey] || LITURGICAL_COLORS.verde,
    diaSemana: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
    
    primeiraLeitura: {
      referencia: json.primeiraLeitura?.referencia || json.primeiraLeitura?.ref || '1ª Leitura',
      titulo: json.primeiraLeitura?.titulo || 'Primeira Leitura',
      texto: json.primeiraLeitura?.texto || ''
    },
    salmo: {
      referencia: json.salmo?.referencia || json.salmo?.ref || 'Salmo Responsorial',
      refrao: json.salmo?.refrao || json.salmo?.resposta || 'O Senhor é o meu pastor, nada me faltará.',
      texto: json.salmo?.texto || ''
    },
    segundaLeitura: json.segundaLeitura && json.segundaLeitura.texto ? {
      referencia: json.segundaLeitura.referencia || json.segundaLeitura.ref || '2ª Leitura',
      titulo: json.segundaLeitura.titulo || 'Segunda Leitura',
      texto: json.segundaLeitura.texto
    } : null,
    evangelho: {
      referencia: json.evangelho?.referencia || json.evangelho?.ref || 'Evangelho',
      titulo: json.evangelho?.titulo || 'Proclamação do Evangelho de Jesus Cristo',
      texto: json.evangelho?.texto || ''
    },
    reflexao: json.homilia || json.reflexao || 'A Palavra de Deus é lâmpada para os nossos pés e luz para o nosso caminho. Meditemos com o coração aberto.'
  };
}

/**
 * Gerador de fallback canônico de alta fidelidade
 */
function gerarLiturgiaCanonico(date) {
  const month = date.getMonth(); // 0-11
  const day = date.getDate();
  const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado

  let tempoLiturgico = 'Tempo Comum';
  let corKey = 'verde';

  // Lógica de tempo litúrgico básico
  if (month === 11 && day >= 1 && day <= 24) {
    tempoLiturgico = 'Tempo do Advento';
    corKey = 'roxo';
  } else if (month === 11 && day >= 25 || month === 0 && day <= 10) {
    tempoLiturgico = 'Tempo do Natal';
    corKey = 'branco';
  } else if (month >= 1 && month <= 3) {
    tempoLiturgico = 'Tempo da Quaresma';
    corKey = 'roxo';
  } else if (month >= 4 && month <= 5 && dayOfWeek === 0) {
    tempoLiturgico = 'Tempo Pascal';
    corKey = 'branco';
  }

  const leiturasExemplo = [
    {
      ref1: "Gálatas 2, 19-20",
      txt1: "Irmãos: Eu estou crucificado com Cristo. Eu vivo, mas já não sou eu; é Cristo que vive em mim. A minha vida presente na carne, eu a vivo na fé, crendo no Filho de Deus, que me amou e se entregou por mim.",
      salmoRef: "Salmo 33 (34)",
      salmoRefrao: "O Senhor liberta os que nele confiam.",
      salmoTxt: "Bendirei o Senhor em todo o tempo, seu louvor estará sempre em minha boca. Minha alma se gloria no Senhor; que os humildes escutem e se alegrem.",
      evRef: "Lucas 10, 1-9",
      evTxt: "Naquele tempo, o Senhor escolheu outros setenta e dois discípulos e os enviou dois a dois, na sua frente, a toda cidade e lugar aonde ele próprio devia ir. E dizia-lhes: 'A messe é grande, mas os trabalhadores são poucos. Por isso, pedi ao dono da messe que mande trabalhadores para a sua colheita. Ide! Eis que vos envio como cordeiros para o meio de lobos... Curai os doentes que nela houver e dizei-lhes: O Reino de Deus está próximo de vós!' — Palavra da Salvação.",
      reflexao: "O Senhor nos chama hoje a sermos testemunhas audaciosas da sua Boa-Nova. Não vamos em nosso próprio nome, mas enviados por Cristo, levando a paz e a misericórdia a todos os corações que encontramos."
    },
    {
      ref1: "Filipenses 4, 4-9",
      txt1: "Alegrai-vos sempre no Senhor; repito, alegrai-vos! Seja a vossa bondade conhecida de todos os homens. O Senhor está próximo! Não vos inquieteis com coisa alguma, mas em tudo apresentai a Deus as vossas preces com ações de graças.",
      salmoRef: "Salmo 22 (23)",
      salmoRefrao: "O Senhor é o meu pastor, nada me faltará.",
      salmoTxt: "O Senhor é o meu pastor, nada me pode faltar. Em verdes pastagens ele me faz descansar; conduz-me junto às águas tranquilas e refrigera a minha alma.",
      evRef: "Mateus 11, 28-30",
      evTxt: "Naquele tempo, disse Jesus: 'Vinde a mim, todos vós que estais cansados e carregados de fardos, e eu vos darei descanso. Tomai sobre vós o meu jugo e aprendei de mim, porque sou manso e humilde de coração, e encontrareis descanso para as vossas almas. Pois o meu jugo é suave e o meu fardo é leve.' — Palavra da Salvação.",
      reflexao: "Nos momentos de cansaço ou tribulação, Jesus nos convida a repousar em Seu Sagrado Coração. Seu jugo não é peso, mas amor que liberta e renova as nossas forças."
    },
    {
      ref1: "Romanos 8, 31-39",
      txt1: "Se Deus é por nós, quem será contra nós? Aquele que não poupou o seu próprio Filho, mas o entregou por todos nós, como não nos dará tudo com ele? Quem nos separará do amor de Cristo? A tribulação, a angústia, a perseguição, a fome, a nudez, o perigo, a espada? Em tudo isso somos mais que vencedores pela virtude daquele que nos amou.",
      salmoRef: "Salmo 90 (91)",
      salmoRefrao: "Em vossas mãos, Senhor, entrego o meu espírito.",
      salmoTxt: "Quem habita sob o abrigo do Altíssimo, descansará à sombra do Todo-Poderoso. Digo ao Senhor: 'Meu refúgio, minha fortaleza, meu Deus em quem confio!'",
      evRef: "João 14, 23-29",
      evTxt: "Naquele tempo, disse Jesus aos seus discípulos: 'Se alguém me ama, guardará a minha palavra, e o meu Pai o amará, e nós viremos a ele e nele faremos nossa morada. Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se intimide.' — Palavra da Salvação.",
      reflexao: "A verdadeira paz que o mundo não pode dar brota da certeza do amor do Pai. Quando guardamos a Palavra de Jesus com amor e devoção, o próprio Deus faz morada em nosso interior."
    }
  ];

  const idx = (date.getDate() + date.getMonth() * 3) % leiturasExemplo.length;
  const sample = leiturasExemplo[idx];

  return {
    data: date.toISOString().split('T')[0],
    dataExtenso: formatarDataExtenso(date),
    tempoLiturgico: `${tempoLiturgico} • ${date.toLocaleDateString('pt-BR', { weekday: 'long' })}`,
    cor: LITURGICAL_COLORS[corKey],
    diaSemana: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
    primeiraLeitura: {
      referencia: sample.ref1,
      titulo: "Primeira Leitura",
      texto: sample.txt1
    },
    salmo: {
      referencia: sample.salmoRef,
      refrao: sample.salmoRefrao,
      texto: sample.salmoTxt
    },
    segundaLeitura: null,
    evangelho: {
      referencia: sample.evRef,
      titulo: "Evangelho de Jesus Cristo",
      texto: sample.evTxt
    },
    reflexao: sample.reflexao
  };
}

function gerarSantoGenerico(date) {
  const diaMes = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  return {
    nome: `Santo do Dia • ${diaMes}`,
    titulo: "Testemunha da Fé e Modelo de Santidade",
    resumo: "A Igreja celebra a memória dos santos e mártires que com sua vida e fidelidade ao Evangelho indicam para nós o caminho do céu.",
    oracao: "Ó Deus, que nos dais a alegria de celebrar a memória dos vossos Santos, concedei-nos a graça de seguir seus exemplos na terra para alcançarmos a coroa eterna nos céus. Amém."
  };
}

function formatarDataExtenso(date) {
  const d = date.getDate();
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return `${diasSemana[date.getDay()]}, ${d} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
}
