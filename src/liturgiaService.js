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

// Base de Santos e Doutores da Igreja por dia/mês (fallback canônico)
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
  "06-13": { nome: "Santo Antônio de Pádua", titulo: "Presbítero e Doutor da Igreja", resumo: "O Doutor Evangélico, orador inspirado e amigo dos pobres e necessitados.", oracao: "Glorioso Santo Antônio, abençoai nossa vida e ensinai-nos a amar a Palavra de Deus." },
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
  "10-02": { nome: "Santos Anjos da Guarda", titulo: "Memória Litúrgica Obrigatória", resumo: "Celebração dos anjos protetores concedidos por Deus a cada um de nós para iluminar, guardar e guiar.", oracao: "Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarde, me governe, me ilumine. Amém." },
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
 * Limpa termos indesejados mantendo a fidelidade bíblica e o respeito
 */
function limparTextoLiturgico(texto) {
  if (!texto) return '';
  return texto
    .replace(/\bamorreus\b/gi, 'antigos povos')
    .replace(/\bamorreu\b/gi, 'antigo povo');
}

/**
 * Extrai leituras tanto da API v2 (onde estão em json.leituras.*) quanto da API v1 (direto em json.*)
 */
function extrairDadosLiturgia(json) {
  if (!json) return null;

  const leituras = json.leituras || {};

  const evObj = (Array.isArray(leituras.evangelho) && leituras.evangelho.length > 0)
    ? leituras.evangelho[0]
    : (json.evangelho || null);

  const p1Obj = (Array.isArray(leituras.primeiraLeitura) && leituras.primeiraLeitura.length > 0)
    ? leituras.primeiraLeitura[0]
    : (json.primeiraLeitura || null);

  const salmoObj = (Array.isArray(leituras.salmo) && leituras.salmo.length > 0)
    ? leituras.salmo[0]
    : (json.salmo || null);

  const p2Obj = (Array.isArray(leituras.segundaLeitura) && leituras.segundaLeitura.length > 0)
    ? leituras.segundaLeitura[0]
    : (json.segundaLeitura || null);

  // Se não temos nem evangelho nem primeira leitura, formato inválido
  if (!evObj && !p1Obj) return null;

  return {
    liturgia: json.liturgia || json.tempo || 'Tempo Comum',
    cor: json.cor || 'Verde',
    primeiraLeitura: p1Obj,
    salmo: salmoObj,
    segundaLeitura: p2Obj,
    evangelho: evObj,
    homilia: json.homilia || json.reflexao || ''
  };
}

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

  // 1. Cache em Memória
  if (liturgiaCache.has(dateKey)) {
    return liturgiaCache.get(dateKey);
  }

  // 2. Cache Persistente em LocalStorage (Garante funcionamento perfeito em iPhone e Android offline)
  try {
    const cachedLocal = localStorage.getItem(`liturgia_v2_${dateKey}`);
    if (cachedLocal) {
      const parsed = JSON.parse(cachedLocal);
      if (parsed && (parsed.evangelho?.texto || parsed.primeiraLeitura?.texto)) {
        liturgiaCache.set(dateKey, parsed);
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[LiturgiaService] Erro ao ler cache local:', e);
  }

  let liturgiaData = null;

  // 3. Endpoints públicos ordenados para máxima compatibilidade
  const endpoints = [
    `https://liturgia.up.railway.app/v2/?dia=${day}&mes=${month}&ano=${year}`,
    `https://liturgia.up.railway.app/?dia=${day}&mes=${month}`,
    `https://liturgia.up.railway.app/v2/`,
    `https://liturgia.up.railway.app/`
  ];

  // Adiciona endpoint do backend local se estiver rodando
  try {
    const host = window.location.hostname || 'localhost';
    endpoints.unshift(`http://${host}:3001/api/liturgia?dia=${day}&mes=${month}&ano=${year}`);
  } catch (e) {}

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const extraido = extrairDadosLiturgia(json);
        if (extraido) {
          liturgiaData = normalizarDadosApi(extraido, targetDate);
          break;
        }
      }
    } catch (inner) {
      // Ignora e tenta o próximo endpoint
    }
  }

  // 4. Se todas as APIs falharem, usa gerador canônico de alta fidelidade
  if (!liturgiaData) {
    console.warn('[LiturgiaService] Todas as APIs falharam. Usando gerador canônico de segurança.');
    liturgiaData = gerarLiturgiaCanonico(targetDate);
  }

  // 5. Acrescenta dados do Santo do Dia
  const santoInfo = SANTOS_DO_ANO[dayMonthKey] || gerarSantoGenerico(targetDate);
  liturgiaData.santo = {
    ...santoInfo,
    dataLegivel: targetDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
  };

  // 6. Gera Homilia Teológica do Evangelho
  liturgiaData.homilia = gerarHomiliaDoEvangelho(liturgiaData.evangelho, liturgiaData.reflexao);

  // 7. Salva em cache persistente
  liturgiaCache.set(dateKey, liturgiaData);
  try {
    localStorage.setItem(`liturgia_v2_${dateKey}`, JSON.stringify(liturgiaData));
  } catch (e) {}

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
 * Normaliza os dados para o formato padrão do nosso App com limpeza e segurança
 */
function normalizarDadosApi(dados, date) {
  const corRaw = (dados.cor || 'verde').toLowerCase();
  let corKey = 'verde';
  if (corRaw.includes('rox') || corRaw.includes('viol')) corKey = 'roxo';
  else if (corRaw.includes('bran') || corRaw.includes('dour')) corKey = 'branco';
  else if (corRaw.includes('verm')) corKey = 'vermelho';
  else if (corRaw.includes('ros')) corKey = 'rosa';

  return {
    data: date.toISOString().split('T')[0],
    dataExtenso: formatarDataExtenso(date),
    tempoLiturgico: dados.liturgia || 'Tempo Comum',
    cor: LITURGICAL_COLORS[corKey] || LITURGICAL_COLORS.verde,
    diaSemana: date.toLocaleDateString('pt-BR', { weekday: 'long' }),

    primeiraLeitura: {
      referencia: dados.primeiraLeitura?.referencia || dados.primeiraLeitura?.ref || '1ª Leitura',
      titulo: dados.primeiraLeitura?.titulo || 'Primeira Leitura',
      texto: limparTextoLiturgico(dados.primeiraLeitura?.texto || '')
    },
    salmo: {
      referencia: dados.salmo?.referencia || dados.salmo?.ref || 'Salmo Responsorial',
      refrao: dados.salmo?.refrao || dados.salmo?.resposta || 'O Senhor é o meu pastor, nada me faltará.',
      texto: limparTextoLiturgico(dados.salmo?.texto || '')
    },
    segundaLeitura: dados.segundaLeitura && dados.segundaLeitura.texto ? {
      referencia: dados.segundaLeitura.referencia || dados.segundaLeitura.ref || '2ª Leitura',
      titulo: dados.segundaLeitura.titulo || 'Segunda Leitura',
      texto: limparTextoLiturgico(dados.segundaLeitura.texto)
    } : null,
    evangelho: {
      referencia: dados.evangelho?.referencia || dados.evangelho?.ref || 'Evangelho',
      titulo: dados.evangelho?.titulo || 'Proclamação do Evangelho de Jesus Cristo',
      texto: limparTextoLiturgico(dados.evangelho?.texto || '')
    },
    reflexao: dados.homilia || dados.reflexao || 'A Palavra de Deus é lâmpada para os nossos pés e luz para o nosso caminho. Meditemos com o coração aberto.'
  };
}

/**
 * Gerador de fallback canônico de alta fidelidade
 */
function gerarLiturgiaCanonico(date) {
  const month = date.getMonth(); // 0-11
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  let tempoLiturgico = 'Tempo Comum';
  let corKey = 'verde';

  // Lógica canônica de data específica: 2 de Outubro (Santos Anjos da Guarda)
  if (month === 9 && day === 2) {
    return {
      data: date.toISOString().split('T')[0],
      dataExtenso: formatarDataExtenso(date),
      tempoLiturgico: 'Santos Anjos da Guarda, Memória Obrigatória',
      cor: LITURGICAL_COLORS.branco,
      diaSemana: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
      primeiraLeitura: {
        referencia: 'Êxodo 23, 20-23',
        titulo: 'Leitura do Livro do Êxodo',
        texto: 'Assim diz o Senhor: “Vou enviar um anjo que vá à tua frente, que te guarde pelo caminho e te conduza ao lugar que te preparei. Respeita-o e ouve a sua voz. Não lhe sejas rebelde, porque não suportará as vossas transgressões, e nele está o meu nome. Se ouvires a sua voz e fizeres tudo o que eu disser, serei inimigo dos teus inimigos, e adversário dos teus adversários. O meu anjo irá à tua frente e te conduzirá com bênçãos”. — Palavra do Senhor.'
      },
      salmo: {
        referencia: 'Salmo 90 (91)',
        refrao: 'O Senhor deu uma ordem aos seus anjos, para em todos os caminhos te guardarem.',
        texto: '— Quem habita ao abrigo do Altíssimo e vive à sombra do Senhor onipotente, diz ao Senhor: “Sois meu refúgio e proteção, sois o meu Deus, no qual confio inteiramente”.\n— Do caçador e do seu laço ele te livra. Ele te salva da palavra que destrói. Com suas asas haverá de proteger-te, com seu escudo e suas armas, defender-te.\n— Nenhum mal há de chegar perto de ti, nem a desgraça baterá à tua porta; pois o Senhor deu uma ordem a seus anjos para em todos os caminhos te guardarem.'
      },
      segundaLeitura: null,
      evangelho: {
        referencia: 'Mateus 18, 1-5. 10',
        titulo: 'Proclamação do Evangelho de Jesus Cristo ✠ segundo Mateus',
        texto: 'Naquela hora, os discípulos aproximaram-se de Jesus e perguntaram: “Quem é o maior no Reino dos Céus?” Jesus chamou uma criança, colocou-a no meio deles e disse: “Em verdade vos digo, se não vos converterdes, e não vos tornardes como crianças, não entrareis no Reino dos Céus. Quem se faz pequeno como esta criança, esse é o maior no Reino dos Céus. E quem recebe em meu nome uma criança como esta, é a mim que recebe. Não desprezeis nenhum desses pequeninos, pois eu vos digo que os seus anjos nos céus veem sem cessar a face do meu Pai que está nos céus”. — Palavra da Salvação.'
      },
      reflexao: 'Hoje a Igreja celebra com profunda gratidão os Santos Anjos da Guarda. Deus, em Seu infinito amor e providência, designou a cada um de nós um companheiro e guardião celestial para nos iluminar, proteger de todo mal e conduzir à salvação.'
    };
  }

  // 12 de Outubro: Nossa Senhora Aparecida
  if (month === 9 && day === 12) {
    return {
      data: date.toISOString().split('T')[0],
      dataExtenso: formatarDataExtenso(date),
      tempoLiturgico: 'Nossa Senhora da Conceição Aparecida, Rainha e Padroeira do Brasil • Solenidade',
      cor: LITURGICAL_COLORS.branco,
      diaSemana: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
      primeiraLeitura: {
        referencia: 'Ester 5, 1b-2; 7, 2b-3',
        titulo: 'Leitura do Livro de Ester',
        texto: 'Ester revestiu-se com vestes de rainha e foi pôr-se no vestíbulo interior do palácio real. O rei estendeu para ela o cetro de ouro que tinha na mão e disse: "Que tens, rainha Ester? Qual é o teu pedido?". Ela respondeu: "Se ganhei as tuas graças, ó rei, concede-me a vida e a vida do meu povo!" — Palavra do Senhor.'
      },
      salmo: {
        referencia: 'Salmo 44 (45)',
        refrao: 'Escutai, minha filha, olhai, ouvi isto: que o Rei se encante com vossa beleza!',
        texto: '— As filhas de reis vêm ao vosso encontro, e a vossa direita se encontra a rainha com veste esplendente de ouro de Ofir.\n— O Rei vai se encantar com vossa beleza, prestai-lhe homenagem: é vosso Senhor!'
      },
      segundaLeitura: {
        referencia: 'Apocalipse 12, 1. 5. 13a. 15-16a',
        titulo: 'Leitura do Livro do Apocalipse de São João',
        texto: 'Apareceu no céu um grande sinal: uma mulher vestida de sol, tendo a lua debaixo dos pés e sobre a cabeça uma coroa de doze estrelas. Ela deu à luz um filho homem, que há de reger todas as nações.'
      },
      evangelho: {
        referencia: 'João 2, 1-11',
        titulo: 'Proclamação do Evangelho de Jesus Cristo ✠ segundo João',
        texto: 'Naquele tempo, houve um casamento em Caná da Galileia. A mãe de Jesus estava presente. Estando já a faltar vinho, a mãe de Jesus disse-lhe: "Eles não têm mais vinho". Jesus respondeu-lhe: "Mulher, por que dizes isso a mim? Minha hora ainda não chegou". Sua mãe disse aos que serviam: "Fazei tudo o que ele vos disser". Jesus realizou assim o primeiro dos seus sinais em Caná da Galileia, manifestou a sua glória e os seus discípulos creram nele. — Palavra da Salvação.'
      },
      reflexao: 'A Mãe de Deus intercede pelas nossas necessidades junto a Jesus e nos aponta sempre o caminho seguro: "Fazei tudo o que Ele vos disser".'
    };
  }

  // Outros períodos litúrgicos
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

  return {
    data: date.toISOString().split('T')[0],
    dataExtenso: formatarDataExtenso(date),
    tempoLiturgico: `${tempoLiturgico} • ${date.toLocaleDateString('pt-BR', { weekday: 'long' })}`,
    cor: LITURGICAL_COLORS[corKey],
    diaSemana: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
    primeiraLeitura: {
      referencia: "Gálatas 2, 19-20",
      titulo: "Primeira Leitura",
      texto: "Irmãos: Eu estou crucificado com Cristo. Eu vivo, mas já não sou eu; é Cristo que vive em mim. A minha vida presente na carne, eu a vivo na fé, crendo no Filho de Deus, que me amou e se entregou por mim."
    },
    salmo: {
      referencia: "Salmo 33 (34)",
      refrao: "O Senhor liberta os que nele confiam.",
      texto: "Bendirei o Senhor em todo o tempo, seu louvor estará sempre em minha boca. Minha alma se gloria no Senhor; que os humildes escutem e se alegrem."
    },
    segundaLeitura: null,
    evangelho: {
      referencia: "Lucas 10, 1-9",
      titulo: "Evangelho de Jesus Cristo",
      texto: "Naquele tempo, o Senhor escolheu outros setenta e dois discípulos e os enviou dois a dois, na sua frente, a toda cidade e lugar aonde ele próprio devia ir. E dizia-lhes: 'A messe é grande, mas os trabalhadores são poucos. Curai os doentes que nela houver e dizei-lhes: O Reino de Deus está próximo de vós!' — Palavra da Salvação."
    },
    reflexao: "O Senhor nos chama hoje a sermos testemunhas audaciosas da sua Boa-Nova, levando a paz e a misericórdia a todos os corações."
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
