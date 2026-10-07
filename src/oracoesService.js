// ==========================================================================
// LIVRO DE ORAÇÕES CATÓLICAS & DEVOCIONÁRIO TRADICIONAL (SALVAI ALMAS)
// Compilação completa de orações públicas, santos, proteção e sufrágios
// ==========================================================================

export const ORACOES_CATEGORIAS = [
  { id: 'all', label: '🌟 Todas', icon: 'fas fa-book-bible' },
  { id: 'almas', label: '🕯️ Salvai Almas (Purgatório)', icon: 'fas fa-fire' },
  { id: 'santos', label: '🕊️ Santos da Igreja', icon: 'fas fa-dove' },
  { id: 'manha_noite', label: '☀️ Manhã & Noite', icon: 'fas fa-sun' },
  { id: 'jesus', label: '✝️ Jesus & Misericórdia', icon: 'fas fa-cross' },
  { id: 'maria', label: '🌹 Marianas', icon: 'fas fa-crown' },
  { id: 'protecao', label: '🛡️ Proteção & Libertação', icon: 'fas fa-shield-halved' },
  { id: 'familia_cura', label: '🏠 Família, Cura & Trabalho', icon: 'fas fa-heart' },
  { id: 'espiritosanto', label: '🕊️ Espírito Santo & Missa', icon: 'fas fa-feather-pointed' }
];

export const LIVRO_ORACOES = [
  // ========================================================================
  // 1. SALVAI ALMAS & PURGATÓRIO
  // ========================================================================
  {
    id: 'jaculatoria_salvai_almas',
    titulo: 'Jaculatória Salvai Almas',
    subtitulo: 'A Oração do Coração e Amor a Jesus e Maria',
    categoria: 'almas',
    autor: 'Irmã Consolata Betrone & Tradição Católica',
    latim: 'Iesu, Maria, amo vos, salvate animas',
    tags: ['salvai almas', 'jaculatoria', 'consolata betrone', 'purgatorio', 'amor', 'jesus', 'maria', 'jose'],
    introducao: 'Revelada como uma das orações mais doces e eficazes para manter o coração em contínua união com Deus e alcançar a salvação de milhares de almas.',
    promessa: 'A cada ato de amor repetido com o coração, alcança-se a conversão dos pecadores e alívio para as benditas almas do Purgatório.',
    texto: `Jesus, Maria e José, eu vos amo, salvai almas!\n\nÓ meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem da vossa infinita misericórdia.\n\nDai-lhes, Senhor, o descanso eterno, e brilhe para elas a vossa luz perpétua. Descansem em paz. Amém.`
  },
  {
    id: 'santa_gertrudes_almas',
    titulo: 'Oração de Santa Gertrudes pelas Almas',
    subtitulo: 'Promessa de libertação de 1.000 almas a cada recitação',
    categoria: 'almas',
    autor: 'Santa Gertrudes Magna (1256 - 1302)',
    latim: 'Oratio Sanctae Gertrudis',
    tags: ['santa gertrudes', 'almas', 'purgatorio', 'preciosissimo sangue', 'salvai almas', 'missa'],
    introducao: 'Nosso Senhor revelou a Santa Gertrudes que esta oração libertaria mil almas do Purgatório cada vez que fosse rezada com devoção.',
    promessa: 'Libertação de mil almas do Purgatório e graças abundantes para os pecadores vivos.',
    texto: `Eterno Pai, eu Vos ofereço o Preciosíssimo Sangue de Vosso Divino Filho Jesus, em união com todas as Santas Missas celebradas hoje em todo o mundo, por todas as santas almas do Purgatório, pelos pecadores em todos os lugares, pelos pecadores na Igreja universal, por aqueles em minha própria casa e dentro de minha família.\n\nAmém.`
  },
  {
    id: 'de_profundis_sl129',
    titulo: 'Salmo 129 (De Profundis)',
    subtitulo: 'O Clamor das Profundezas pelas Almas do Purgatório',
    categoria: 'almas',
    autor: 'Salmo Penitencial de Davi',
    latim: 'De profundis clamavi ad te, Domine',
    tags: ['de profundis', 'salmo 129', 'purgatorio', 'almas', 'salvai almas', 'penitencia'],
    introducao: 'O mais célebre salmo penitencial rezado pela Igreja Católica em sufrágio de todos os fiéis defuntos.',
    texto: `Das profundezas clamo a Vós, Senhor; Senhor, escutai a minha voz!\nEstejam os vossos ouvidos atentos à voz da minha súplica.\n\nSe tiverdes em conta os nossos pecados, Senhor, Senhor, quem poderá subsistir?\nMas em Vós se encontra o perdão, para que sejais temido com respeito.\n\nEu confio no Senhor, a minha alma espera na sua Palavra.\nA minha alma anseia pelo Senhor, mais do que as sentinelas pela aurora.\n\nMais do que as sentinelas pela aurora, espere Israel no Senhor;\nporque no Senhor está a misericórdia e nele é copiosa a redenção.\nEle há de redimir Israel de todas as suas iniquidades.\n\nDai-lhes, Senhor, o repouso eterno, e brilhe para elas a luz perpétua.\nDescansem em paz. Amém.`
  },
  {
    id: 'almas_mais_abandonadas',
    titulo: 'Oração pelas Almas mais Abandonadas',
    subtitulo: 'Sufrágio por quem não tem ninguém na terra para rezar',
    categoria: 'almas',
    autor: 'Devocionário Tradicional',
    tags: ['almas esquecidas', 'purgatorio', 'caridade', 'salvai almas', 'misericordia'],
    introducao: 'Reze por aquelas almas benditas que há mais tempo sofrem no Purgatório e das quais nenhum parente se lembra.',
    texto: `Ó Jesus compassivo, que na Cruz sofrestes o abandono supremo, olhai com misericórdia para as almas do Purgatório mais esquecidas e abandonadas, por quem ninguém reza nem oferece o Santo Sacrifício da Missa.\n\nPor vossa Santa Agonia e Chagas Sagradas, abri-lhes as portas do Paraíso para que possam contemplar para sempre a vossa glória face a face. E quando chegar a nossa hora, fazei que sejamos socorridos pela vossa graça e pela intercessão da Virgem Maria.\n\nDai-lhes, Senhor, o descanso eterno, e brilhe para elas a luz perpétua. Amém.`
  },
  {
    id: 'heroico_ato_caridade',
    titulo: 'Heróico Ato de Caridade pelas Almas',
    subtitulo: 'Entrega voluntária de todas as obras satisfatórias',
    categoria: 'almas',
    autor: 'Tradição Mística Católica',
    tags: ['ato heroico', 'caridade', 'purgatorio', 'salvai almas', 'maria'],
    introducao: 'Uma das mais elevadas práticas espirituais: doar todas as indulgências e méritos à Santíssima Virgem para que Ela os distribua às almas do Purgatório.',
    texto: `Ó meu Deus, em união com os méritos de Jesus e de Maria, eu Vos ofereço, pelas almas do Purgatório, todas as minhas obras satisfatórias de toda a minha vida, assim como também todas aquelas que me forem aplicadas depois da minha morte.\n\nColoco tudo nas mãos puríssimas da Virgem Maria, para que Ela as aplique àquelas santas almas que na sua sabedoria e maternal amor desejar libertar primeiro do Purgatório. Dignai-Vos, meu Deus, aceitar esta minha humilde oferta por amor a Vós e à salvação das almas. Amém.`
  },

  // ========================================================================
  // 2. SANTOS DA IGREJA
  // ========================================================================
  {
    id: 'sao_bento_cruz',
    titulo: 'Oração e Medalha de São Bento',
    subtitulo: 'Poderoso Exorcismo contra as ciladas e venenos do demônio',
    categoria: 'santos',
    autor: 'São Bento de Núrsia (480 - 547)',
    latim: 'Crux Sacra Sit Mihi Lux',
    tags: ['sao bento', 'cruz sagrada', 'protecao', 'libertacao', 'inimigo', 'mal', 'exorcismo'],
    introducao: 'A oração gravada na sagrada Medalha de São Bento, usada há mais de 1500 anos pela Igreja Católica para afastar o mal.',
    texto: `A Cruz Sagrada seja a minha luz,\nNão seja o dragão meu guia.\nRetira-te, satanás!\nNunca me aconselhes coisas vãs.\nÉ mau o que tu me ofereces,\nBebe tu mesmo o teu veneno!\n\nPaz, bênção e vitória pela Cruz de Nosso Senhor Jesus Cristo. Em nome do Pai, do Filho e do Espírito Santo. Amém.`
  },
  {
    id: 'sao_miguel_leao_xiii',
    titulo: 'Oração a São Miguel Arcanjo',
    subtitulo: 'Oração de Batalha Espiritual composta pelo Papa Leão XIII',
    categoria: 'santos',
    autor: 'Papa Leão XIII (1886)',
    latim: 'Sancte Michael Archangele, defende nos in proelio',
    tags: ['sao miguel', 'arcanjo', 'batalha espiritual', 'leao xiii', 'protecao', 'anjos'],
    introducao: 'Composta após uma visão profética das batalhas espirituais dos últimos tempos. O Príncipe da Milícia Celeste defende o povo de Deus.',
    texto: `São Miguel Arcanjo, defendei-nos no combate.\nSede o nosso refúgio contra as maldades e as ciladas do demônio.\n\nOrdene-lhe Deus, instantemente o pedimos, e vós, Príncipe da Milícia Celeste, pelo divino poder, precipitai no inferno a satanás e a todos os espíritos malignos que andam pelo mundo para perder as almas.\n\nAmém.`
  },
  {
    id: 'sao_francisco_paz',
    titulo: 'Oração da Paz de São Francisco de Assis',
    subtitulo: 'Instrumento do Amor, Perdão e Luz Divina',
    categoria: 'santos',
    autor: 'São Francisco de Assis (1182 - 1226)',
    tags: ['sao francisco', 'paz', 'amor', 'perdao', 'esperanca', 'luz', 'alegria'],
    introducao: 'Uma das preces mais comoventes da cristandade, ensina a amar mais do que ser amado e a perdoar para ser perdoado.',
    texto: `Senhor, fazei-me um instrumento de vossa paz.\nOnde houver ódio, que eu leve o amor;\nOnde houver ofensa, que eu leve o perdão;\nOnde houver discórdia, que eu leve a união;\nOnde houver dúvida, que eu leve a fé;\nOnde houver erro, que eu leve a verdade;\nOnde houver desespero, que eu leve a esperança;\nOnde houver tristeza, que eu leve a alegria;\nOnde houver trevas, que eu leve a luz.\n\nÓ Mestre, fazei que eu procure mais consolar que ser consolado;\nCompreender que ser compreendido;\nAmar que ser amado.\nPois é dando que se recebe;\nÉ perdoando que se é perdoado;\nE é morrendo que se vive para a vida eterna. Amém.`
  },
  {
    id: 'santo_expedito_urgente',
    titulo: 'Oração a Santo Expedito',
    subtitulo: 'Padroeiro das Causas Justas e Urgentes',
    categoria: 'santos',
    autor: 'Santo Expedito Mártir (Século IV)',
    tags: ['santo expedito', 'causas urgentes', 'socorro imediato', 'aflicao', 'trabalho', 'tribulacao'],
    introducao: 'Invocado em momentos de aperto, desespero e necessidades imediatas que não podem esperar.',
    texto: `Meu Santo Expedito das causas justas e urgentes, intercedei por mim junto a Nosso Senhor Jesus Cristo, para que venha em meu socorro nesta hora de aflição e desespero.\n\nVós que sois o Santo guerreiro, vós que sois o Santo dos aflitos e desesperados, vós que sois o Santo das causas urgentes, protegei-me, ajudai-me, concedei-me força, coragem e serenidade.\n\nAtendei ao meu pedido (fazer o pedido com fé). Ajudai-me a superar estas horas difíceis, protegei-me de todos que possam me prejudicar, protegei a minha família e devolvei-me a paz e a tranquilidade. Serei grato pelo resto de minha vida e levarei vosso nome a todos os que têm fé.\n\nSanto Expedito, rogai por nós! Amém.`
  },
  {
    id: 'santo_antonio_bencao',
    titulo: 'Responsório e Oração a Santo Antônio',
    subtitulo: 'Padroeiro dos Pobres, das Famílias e das Coisas Perdidas',
    categoria: 'santos',
    autor: 'Santo Antônio de Pádua / Lisboa (1195 - 1231)',
    tags: ['santo antonio', 'milagres', 'familias', 'perdas', 'bencao', 'paodeantonio'],
    introducao: 'Doutor do Evangelho e grande taumaturgo, conhecido pelos prodígios e socorro às famílias.',
    texto: `Se milagres desejais, recorrei a Santo Antônio;\nVereis fugir o demônio e as tentações infernais.\nRecupera-se o perdido, rompe-se a dura prisão,\nE no auge do furacão cede o mar embravecido.\n\nÓ glorioso Santo Antônio, amigo de Menino Jesus e servo fiel de Maria Santíssima, colocai sob a vossa santa proteção a minha vida, a minha família e o meu trabalho. Alcançai-me de Deus a graça que tanto necessito (fazer o pedido), e dai-me a graça de viver santamente nos mandamentos do Senhor.\n\nSanto Antônio de Pádua, rogai por nós! Amém.`
  },
  {
    id: 'santa_rita_impossiveis',
    titulo: 'Oração a Santa Rita de Cássia',
    subtitulo: 'Advogada das Causas Impossíveis e Desesperadas',
    categoria: 'santos',
    autor: 'Santa Rita de Cássia (1381 - 1457)',
    tags: ['santa rita', 'causas impossiveis', 'espinhos', 'cura', 'matrimonio', 'reconciliacao'],
    introducao: 'Santa Rita suportou com amor heroico o sofrimento e foi agraciada com um espinho da Coroa de Cristo.',
    texto: `Ó poderosa e gloriosa Santa Rita de Cássia, eis a vossos pés uma alma desamparada que, necessitando de auxílio, a vós recorre com a doce esperança de ser atendida por vós, que tendes o título de Santa dos Casos Impossíveis e Desesperados.\n\nÓ sagrada advogada, tomai a peito a minha causa, intercedei junto a Deus para que me conceda a graça de que tanto necessito (fazer o pedido). Não permitais que eu tenha de me afastar de vossos pés sem ser atendido.\n\nSe houver em mim algum obstáculo que impeça a graça, ajudai-me a retirá-lo. Olhai para as minhas lágrimas e confiante na vossa intercessão junto ao Coração de Jesus, bendirei a vossa bondade por toda a eternidade. Amém.`
  },
  {
    id: 'sao_judas_tadeu_aflicao',
    titulo: 'Oração a São Judas Tadeu',
    subtitulo: 'Apóstolo fiel e Patrono dos Casos Aflitos e Desesperados',
    categoria: 'santos',
    autor: 'São Judas Tadeu Apóstolo',
    tags: ['sao judas tadeu', 'apostolo', 'casos desesperados', 'cura', 'angustia', 'esperanca'],
    introducao: 'Primo de Jesus e irmão de São Tiago Menor, é o padroeiro dos que se encontram em tribulações extremas.',
    texto: `São Judas Tadeu, glorioso Apóstolo, fiel servo e amigo de Jesus, o nome do traidor tem sido a causa de que fôsseis esquecido por muitos, mas a Igreja vos honra e invoca universalmente como o patrono dos casos desesperados e dos negócios sem remédio.\n\nRogai por mim, que sou tão miserável. Fazei uso, eu vos peço, desse particular privilégio que vos foi concedido, de trazer socorro visível e rápido onde quase não há esperança. Vinde em meu auxílio nesta grande aflição, para que eu possa receber o consolo e o socorro do Céu em todas as minhas necessidades, provações e sofrimentos (fazer o pedido), e que eu possa bendizer a Deus convosco e com todos os eleitos por toda a eternidade.\n\nPrometo, ó bendito São Judas, lembrar-me sempre desta grande graça, honrar-vos sempre como meu especial e poderoso patrono e com fervor encorajar a devoção a vós. Amém.`
  },
  {
    id: 'padre_pio_fica_comigo',
    titulo: 'Fica Comigo, Senhor (Oração de Padre Pio)',
    subtitulo: 'Oração após a Comunhão de São Pio de Pietrelcina',
    categoria: 'santos',
    autor: 'São Pio de Pietrelcina (1887 - 1968)',
    tags: ['padre pio', 'fica comigo senhor', 'comunhao', 'eucaristia', 'fe', 'trevas', 'luz'],
    introducao: 'Padre Pio rezava esta comovente súplica após a Santa Missa, pedindo a presença constante de Jesus.',
    texto: `Fica comigo, Senhor, porque é necessária a tua presença para não te esquecer. Sabes quão facilmente te abandono.\nFica comigo, Senhor, porque sou fraco e preciso da tua força para não cair tantas vezes.\nFica comigo, Senhor, porque tu és a minha vida e sem ti esmorece o meu fervor.\nFica comigo, Senhor, porque tu és a minha luz e sem ti reinam as trevas.\n\nFica comigo, Senhor, para me dares a conhecer a tua vontade.\nFica comigo, Senhor, para que ouça a tua voz e a siga.\nFica comigo, Senhor, porque desejo amar-te muito e estar sempre em tua companhia.\nFica comigo, Jesus, porque, por mais pobre que seja a minha alma, deseja ser para ti um lugar de consolo e um ninho de amor.\n\nDeixa-me reconhecer-te, como os teus discípulos, ao partir do pão, para que a Comunhão Eucarística seja a luz que dissipa as trevas, a força que me sustenta e a única alegria do meu coração.\n\nFica comigo, Senhor, na hora da morte, ou se não pela Comunhão, ao menos pela graça e pelo amor. Amém.`
  },
  {
    id: 'sao_jose_terror_demonios',
    titulo: 'Oração ao Glorioso São José',
    subtitulo: 'Patrono da Igreja Universal e Terror dos Demônios',
    categoria: 'santos',
    autor: 'Tradição da Igreja Católica',
    tags: ['sao jose', 'pai adotivo', 'familias', 'trabalho', 'boa morte', 'terror dos demonios'],
    introducao: 'Esposo puríssimo da Virgem Maria e pai nutrício do Filho de Deus, a quem nada Jesus recusa no Céu.',
    texto: `Ó glorioso São José, a quem foi dado o poder de tornar possíveis as coisas humanamente impossíveis, vinde em nosso auxílio nas dificuldades em que nos encontramos.\n\nTomai sob a vossa proteção a causa tão importante e difícil que vos confiamos (fazer o pedido), para que tenha um êxito favorável. Ó Pai amado, em vós depositamos toda a nossa confiança. Que não se diga que vos invocamos em vão.\n\nE já que tudo podeis junto a Jesus e Maria, mostrai-nos que a vossa bondade é tão grande quanto o vosso poder. São José, terror dos demônios e protetor das famílias, rogai por nós! Amém.`
  },

  // ========================================================================
  // 3. MANHÃ & NOITE (ORAÇÕES COTIDIANAS)
  // ========================================================================
  {
    id: 'oracao_da_manha_oferecimento',
    titulo: 'Oração da Manhã & Oferecimento do Dia',
    subtitulo: 'Consagração dos primeiros pensamentos a Deus',
    categoria: 'manha_noite',
    autor: 'Apostolado da Oração',
    tags: ['manha', 'oferecimento do dia', 'sagrado coracao', 'acordar', 'bencao'],
    introducao: 'Reze ao acordar para santificar cada hora de trabalho, estudo e convivência do seu dia.',
    texto: `Senhor, no silêncio deste dia que amanhece, venho pedir-Vos a paz, a sabedoria, a força.\nQuero olhar hoje o mundo com olhos cheios de amor, ser paciente, compreensivo, manso e prudente.\n\nQuero ver, além das aparências, vossos filhos como Vós mesmos os vedes, e assim não ver senão o bem em cada um.\nCerrai meus ouvidos a toda calúnia. Guardai minha língua de toda maldade.\nQue só de bênçãos se encha meu espírito.\n\nQue eu seja tão bom e tão alegre, que todos aqueles que se aproximarem de mim sintam a vossa presença.\nRevesti-me de vossa beleza, Senhor, e que, no decurso deste dia, eu Vos revele a todos.\n\nDivino Coração de Jesus, por meio do Imaculado Coração de Maria, eu Vos ofereço as orações, obras, trabalhos, sofrimentos e alegrias deste dia. Amém.`
  },
  {
    id: 'oracao_da_noite_exame',
    titulo: 'Oração da Noite & Repouso em Deus',
    subtitulo: 'Agradecimento, perdão e entrega antes de dormir',
    categoria: 'manha_noite',
    autor: 'Liturgia das Horas (Completas)',
    tags: ['noite', 'dormir', 'exame de consciencia', 'paz', 'sono', 'anjodaguarda'],
    introducao: 'Reze antes de repousar, entregando o seu sono e sua alma nas mãos do Criador.',
    texto: `Meu Deus e meu Pai, eu Vos agradeço por todas as graças e benefícios que hoje me concedestes.\n\nPeço-Vos perdão de todo o coração por todas as faltas, pecados e negligências que cometi neste dia, por pensamentos, palavras, atos e omissões (momento de silêncio para recordar o dia). Concedei-me o vosso perdão e a graça de não mais pecar.\n\nEm vossas mãos, Senhor, entrego o meu espírito. Vós nos redimistes, Senhor, Deus da verdade.\nGuardai-nos, Senhor, como a pupila dos olhos; à sombra de vossas asas protegei-nos.\n\nSanto Anjo da Guarda, velai pelo meu sono e defendei-me de todo o mal. Sagrado Coração de Jesus, em Vós confio. Amém.`
  },
  {
    id: 'oracao_ao_anjo_guarda',
    titulo: 'Oração ao Santo Anjo da Guarda',
    subtitulo: 'Invocação ao guia celeste protetor da nossa alma',
    categoria: 'manha_noite',
    autor: 'Tradição Católica Tradicional',
    latim: 'Angele Dei, qui custos es mei',
    tags: ['anjo da guarda', 'protecao', 'guia', 'custodio', 'criancas', 'familia'],
    introducao: 'Deus confiou a cada um de nós um Santo Anjo Custódio para nos iluminar, guardar, reger e governar.',
    texto: `Santo Anjo do Senhor, meu zeloso guardador,\nse a ti me confiou a piedade divina,\nsempre me rege, me guarde, me governe e me ilumine.\n\nAmém.`
  },
  {
    id: 'angelus_domini',
    titulo: 'Oração do Ângelus',
    subtitulo: 'A Memória da Encarnação do Verbo (6h, 12h e 18h)',
    categoria: 'manha_noite',
    autor: 'Tradição Mariana dos Papas',
    latim: 'Angelus Domini nuntiavit Mariae',
    tags: ['angelus', 'encarnacao', 'ave maria', 'meio dia', '18h', 'sino'],
    introducao: 'Rezada tradicionalmente às 6h da manhã, ao meio-dia e às 18h ao toque dos sinos das igrejas.',
    texto: `— O Anjo do Senhor anunciou a Maria.\n— E Ela concebeu do Espírito Santo.\n\n(Reza-se uma Ave-Maria)\n\n— Eis aqui a serva do Senhor.\n— Faça-se em mim segundo a vossa palavra.\n\n(Reza-se uma Ave-Maria)\n\n— E o Verbo divino se fez carne.\n— E habitou entre nós.\n\n(Reza-se uma Ave-Maria)\n\n— Rogai por nós, Santa Mãe de Deus.\n— Para que sejamos dignos das promessas de Cristo.\n\nOremos: Infundi, Senhor, nós Vos pedimos, a vossa graça em nossas almas, para que nós, que conhecemos pela Anunciação do Anjo a Encarnação de Jesus Cristo, vosso Filho, pela sua Paixão e Cruz sejamos conduzidos à glória da Ressurreição. Por Cristo, Nosso Senhor. Amém.`
  },

  // ========================================================================
  // 4. JESUS & SAGRADO CORAÇÃO
  // ========================================================================
  {
    id: 'alma_de_cristo_anima_christi',
    titulo: 'Alma de Cristo (Anima Christi)',
    subtitulo: 'Súplica ardente de intimidade e proteção com o Salvador',
    categoria: 'jesus',
    autor: 'Papa João XXII (Século XIV) / Santo Inácio de Loyola',
    latim: 'Anima Christi, sanctifica me',
    tags: ['alma de cristo', 'anima christi', 'comunhao', 'chagas de cristo', 'sangue de cristo'],
    introducao: 'Uma das orações mais amadas da Igreja, enriquecida com indulgências e profundamente mística.',
    texto: `Alma de Cristo, santificai-me.\nCorpo de Cristo, salvai-me.\nSangue de Cristo, inebriai-me.\nÁgua do lado de Cristo, lavai-me.\nPaixão de Cristo, confortai-me.\n\nÓ bom Jesus, ouvi-me.\nDentro de vossas Chagas, escondei-me.\nNão permitais que me separe de Vós.\nDo inimigo maligno, defendei-me.\nNa hora da minha morte, chamai-me.\n\nE mandai-me ir para Vós,\nPara que com os vossos Santos Vos louve\nPor todos os séculos dos séculos.\n\nAmém.`
  },
  {
    id: 'sagrado_coracao_jesus_ato',
    titulo: 'Consagração ao Sagrado Coração de Jesus',
    subtitulo: 'Entrega total de amor e reparação',
    categoria: 'jesus',
    autor: 'Santa Margarida Maria Alacoque (1647 - 1690)',
    tags: ['sagrado coracao', 'consagracao', 'reparacao', 'margarida maria', 'amor divino'],
    introducao: 'Nosso Senhor prometeu que abençoaria as casas onde a imagem do Seu Coração fosse exposta e venerada.',
    texto: `Eu vos dou e consagro, ó Sagrado Coração de Jesus Cristo, a minha pessoa e a minha vida, as minhas ações, penas e sofrimentos, para não querer mais servir-me de nenhuma parte de meu ser senão para vos honrar, amar e glorificar.\n\nÉ esta a minha vontade irrevogável: ser todo vosso e tudo fazer por vosso amor, renunciando de todo o meu coração a tudo quanto vos possa desagradar.\n\nSede, pois, ó Coração Divino, o único objeto de meu amor, o protetor de minha vida, a garantia de minha salvação, o remédio de minha fragilidade e inconstância, o reparador de todos os defeitos de minha vida e o meu asilo seguro na hora da minha morte.\n\nSagrado Coração de Jesus, em Vós confio e espero! Amém.`
  },
  {
    id: 'santas_chagas_jesus',
    titulo: 'Oração das Santas Chagas de Jesus',
    subtitulo: 'Oferecimento reparador das feridas sagradas de Cristo',
    categoria: 'jesus',
    autor: 'Irmã Maria Marta Chambon (1841 - 1907)',
    tags: ['santas chagas', 'sangue', 'reparacao', 'cura', 'perdao', 'misericordia'],
    introducao: 'Promessas extraordinárias de cura, perdão e alívio das almas concedidas por Jesus a quem honrar suas Santas Chagas.',
    texto: `Pai Eterno, eu Vos ofereço as Chagas de Nosso Senhor Jesus Cristo para curar as de nossas almas.\n\nMeu Jesus, perdão e misericórdia, pelos méritos de vossas Santas Chagas.\n\nPai Santo, pelas Chagas das vossas mãos sagradas, perdoai as obras pecaminosas de nossas mãos;\nPelas Chagas dos vossos pés sagrados, perdoai os maus caminhos que percorremos;\nPela Chaga do vosso ombro doloroso, aliviai o peso de nossas cruzes;\nPela Chaga do vosso Sagrado Lado aberto pela lança, fazei brotar rios de água viva e misericórdia sobre nós e sobre o mundo inteiro.\n\nAmém.`
  },

  // ========================================================================
  // 5. MARIANAS (NOSSA SENHORA)
  // ========================================================================
  {
    id: 'memorare_lembraivos',
    titulo: 'Lembrai-vos (Memorare)',
    subtitulo: 'A Oração de Confiança Total em Maria que nunca falha',
    categoria: 'maria',
    autor: 'São Bernardo de Claraval (1090 - 1153)',
    latim: 'Memorare, o piissima Virgo Maria',
    tags: ['memorare', 'lembrai-vos', 'sao bernardo', 'confianca', 'maria', 'mae'],
    introducao: 'Nunca se ouviu dizer no mundo que alguém que tenha recorrido à proteção da Mãe de Deus tenha sido por Ela desamparado.',
    texto: `Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que têm recorrido à vossa proteção, implorado a vossa assistência e reclamado o vosso socorro, fosse por Vós desamparado.\n\nAnimado eu, pois, de igual confiança, a Vós, ó Virgem das virgens, como a Mãe recorro; de Vós me valho e, gemendo sob o peso dos meus pecados, me prostro a vossos pés.\n\nNão desprezeis as minhas súplicas, ó Mãe do Verbo de Deus humanado, mas acolhei-as propícia e ouvi-me.\n\nAmém.`
  },
  {
    id: 'magnificat_cantico_maria',
    titulo: 'Magnificat (Cântico de Nossa Senhora)',
    subtitulo: 'A Minha Alma Engrandece o Senhor (Lc 1, 46-55)',
    categoria: 'maria',
    autor: 'Evangelho de São Lucas / Santíssima Virgem Maria',
    latim: 'Magnificat anima mea Dominum',
    tags: ['magnificat', 'cantico', 'evangelho', 'lucas', 'louvor', 'humildade'],
    introducao: 'O cântico entoado por Maria na Visitação a Santa Isabel, exaltando a misericórdia e as maravilhas do Todo-Poderoso.',
    texto: `A minha alma engrandece o Senhor,\nE o meu espírito se alegra em Deus, meu Salvador;\nPorque olhou para a humildade de sua serva;\nEis que desde agora todas as gerações me chamarão bem-aventurada.\n\nPorque o Todo-Poderoso me fez grandes coisas, e Santo é o seu nome;\nA sua misericórdia se estende de geração em geração sobre os que o temem.\nManifestou o poder do seu braço;\nDispersou os soberbos nos pensamentos dos seus corações.\n\nDerrubou dos tronos os poderosos e elevou os humildes;\nEncheu de bens os famintos e despediu os ricos de mãos vazias.\nAcolheu a Israel, seu servo, lembrado de sua misericórdia,\nComo havia prometido a nossos pais, em favor de Abraão e de sua descendência para sempre.\n\nGlória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.`
  },
  {
    id: 'oracao_desatadora_dos_nos',
    titulo: 'Oração a Nossa Senhora Desatadora dos Nós',
    subtitulo: 'Para desatar os nós da vida familiar, financeira e espiritual',
    categoria: 'maria',
    autor: 'Devoção Mariana Tradicional',
    tags: ['desatadora dos nos', 'dificuldades', 'angustia', 'problemas', 'cura', 'maria'],
    introducao: 'Nossa Senhora desata com suas mãos maternais os nós de discórdia, doenças e aflições que parecem insolúveis.',
    texto: `Virgem Maria, Mãe do belo amor, Mãe que nunca recusa socorrer a um filho aflito, Mãe cujas mãos não param nunca de servir aos seus filhos amados, porque estão cheias do divino amor e da imensa misericórdia que brotam do vosso Coração, voltai o vosso olhar compassivo sobre mim e vede o nó das dificuldades que sufocam a minha vida.\n\nVós bem conheceis o meu desespero e a minha dor. Vós sabeis o quanto esses nós me paralisam. Maria, Mãe que Deus encarregou de desatar os nós da vida dos seus filhos, confio hoje a fita da minha vida em vossas mãos.\n\nNinguém, nem mesmo o maligno, pode tirá-la do vosso precioso amparo. Em vossas mãos não há nó que não possa ser desfeito. Mãe poderosa, por vossa graça e vosso poder intercessor junto a vosso Filho Jesus, meu Salvador, recebei hoje em vossas mãos este nó (fazer o pedido).\n\nPeço-vos que o desateis para a glória de Deus, e por todo o sempre. Vós sois a minha esperança. Vós sois o meu consolo e a fortaleza das minhas fracas forças. Amém.`
  },

  // ========================================================================
  // 6. PROTEÇÃO & LIBERTAÇÃO
  // ========================================================================
  {
    id: 'selamento_preciosissimo_sangue',
    titulo: 'Oração de Selamento no Preciosíssimo Sangue',
    subtitulo: 'Proteção invisível para a casa, família e pensamentos',
    categoria: 'protecao',
    autor: 'Tradição da Batalha Espiritual Católica',
    tags: ['sangue de jesus', 'selamento', 'protecao', 'casa', 'familia', 'libertacao', 'mal'],
    introducao: 'Clamor bíblico baseado no sangue do Cordeiro que protege o povo de Deus contra qualquer investida das trevas.',
    texto: `Senhor Jesus, pelo poder do Vosso Preciosíssimo Sangue derramado na Cruz, eu selo e cubro a minha mente, o meu coração, o meu corpo, a minha alma e todo o meu ser.\n\nSelo a minha casa, a minha família, as portas, as janelas, o teto, o chão e todos os bens que o Senhor me confiou. Selo os meus caminhos, o meu trabalho, a minha saúde e as pessoas que amo.\n\nNenhum mal, nenhuma inveja, nenhum dardo inflamado do maligno, nenhuma praga ou enfermidade poderá ultrapassar a barreira sagrada do Sangue de Jesus.\n\nO Sangue de Jesus tem poder! O Sangue de Cristo nos protege, nos liberta e nos dá a vitória. Em nome do Pai, do Filho e do Espírito Santo. Amém.`
  },
  {
    id: 'armadura_de_deus_efesios',
    titulo: 'A Armadura de Deus (Efésios 6)',
    subtitulo: 'Revestimento espiritual contra as forças das trevas',
    categoria: 'protecao',
    autor: 'São Paulo Apóstolo (Ef 6, 10-18)',
    tags: ['armadura de deus', 'sao paulo', 'efesios', 'batalha', 'espada do espirito', 'capacete'],
    introducao: 'O conselho apostólico de São Paulo para nos mantermos firmes e inabaláveis nos dias difíceis.',
    texto: `Fortalecei-vos no Senhor e na força do seu poder soberano.\nRevesti-vos da armadura de Deus, para que possais resistir às ciladas do demônio;\nPois não é contra homens de carne e sangue que temos de lutar, mas contra os principados e potestades, contra os príncipes deste mundo tenebroso, contra as forças espirituais do mal espalhadas pelos ares.\n\nTomai, pois, a armadura de Deus, a fim de que possais resistir no dia mau e ficar de pé após ter tudo superado.\n\nFicai alerta, à cinta com o cinto da verdade, o peito protegido com a couraça da justiça, e os pés calçados com o zelo para propagar o Evangelho da paz.\nEmbraçai em tudo o escudo da fé, com o qual podereis apagar todos os dardos inflamados do maligno.\nTomai o capacete da salvação e a espada do Espírito, que é a Palavra de Deus.\n\nAmém.`
  },
  {
    id: 'augusta_rainha_dos_ceus',
    titulo: 'Augusta Rainha dos Céus',
    subtitulo: 'Envio das Legiões Angélicas para derrotar o inferno',
    categoria: 'protecao',
    autor: 'Padre Luís Cestac (1863) / Papa São Pio X',
    tags: ['augusta rainha', 'anjos', 'legioes celestes', 'vitoria', 'sao miguel', 'maria'],
    introducao: 'Ditada por Nossa Senhora com a promessa de afastar e esmagar os espíritos das trevas onde quer que seja rezada.',
    texto: `Augusta Rainha dos Céus e Soberana Senhora dos Anjos, Vós que recebestes de Deus o poder e a missão de esmagar a cabeça de satanás, nós vos pedimos humildemente: enviai as vossas Santas Legiões celestes, para que, sob as vossas ordens e pelo vosso poder, persigam os demônios, combatam-nos por toda a parte, reprimam a sua audácia e os precipitem no abismo.\n\nQuem como Deus? Ninguém como Deus!\n\nÓ boa e terna Mãe, Vós sereis sempre o nosso amor e a nossa esperança.\nÓ Mãe Divina, enviai os Santos Anjos para me defender e repelir para longe de mim o cruel inimigo.\n\nSantos Anjos e Arcanjos, defendei-nos e guardai-nos. Amém.`
  },

  // ========================================================================
  // 7. FAMÍLIA, CURA & TRABALHO
  // ========================================================================
  {
    id: 'bencao_do_lar_familia',
    titulo: 'Bênção e Proteção do Lar e da Família',
    subtitulo: 'Consagração da casa como uma verdadeira Igreja Doméstica',
    categoria: 'familia_cura',
    autor: 'Devocionário das Famílias Católicas',
    tags: ['familia', 'casa', 'lar', 'bencao', 'paz', 'filhos', 'matrimonio'],
    introducao: 'Reze pelos cômodos de sua casa, consagrando cada ambiente à presença e proteção da Sagrada Família de Nazaré.',
    texto: `Senhor Deus de infinita bondade, abençoai a nossa casa e a nossa família. Fazei que este lar seja um santuário de paz, harmonia, respeito e amor mútuo.\n\nAfastai daqui toda a discórdia, ressentimento, inveja, orgulho e qualquer influência contrária à vossa santa vontade.\n\nJesus, Maria e José, Sagrada Família de Nazaré, habitai conosco. Que a vossa santa presença encha nossos corações de paciência e consolo. Que nossos filhos cresçam em graça e sabedoria, e que os pais sejam espelhos de fidelidade e fé.\n\nQue a vossa bênção permaneça sempre sobre nós. Em nome do Pai, do Filho e do Espírito Santo. Amém.`
  },
  {
    id: 'cura_e_libertacao_enfermos',
    titulo: 'Oração pela Cura dos Enfermos e Alívio da Dor',
    subtitulo: 'Súplica pelas enfermidades do corpo, da alma e da mente',
    categoria: 'familia_cura',
    autor: 'Tradição de Oração por Cura da Igreja',
    tags: ['cura', 'doenca', 'saude', 'enfermos', 'medicos', 'hospital', 'milagre'],
    introducao: 'Jesus passou pelo mundo curando todas as enfermidades e consolando os que sofrem.',
    texto: `Senhor Jesus, Vós que tomastes sobre Vós as nossas dores e carregastes as nossas enfermidades, olho para Vós com fé e esperança.\n\nColoco em vossas mãos benditas a minha saúde (ou a saúde de [dizer o nome do enfermo]). Vós sois o Médico dos médicos. Pelo poder das vossas Chagas e pelo sopro do vosso Espírito Santo, curai o corpo, a mente e o coração deste vosso filho.\n\nSe for da vossa vontade divina que esta cruz seja carregada por mais tempo, dai-nos a força, a paciência e a paz que ultrapassa todo o entendimento humano. Mas se for para a vossa maior glória, mandai a vossa palavra de cura, e ficaremos sãos.\n\nJesus, manso e humilde de coração, fazei o nosso coração semelhante ao vosso. Amém.`
  },
  {
    id: 'oracao_para_trabalho_emprego',
    titulo: 'Oração para Obter Trabalho e Prosperidade Honesta',
    subtitulo: 'Súplica pela dignidade do sustento e bênção financeira',
    categoria: 'familia_cura',
    autor: 'Oração Católica ao Santo Trabalhador',
    tags: ['trabalho', 'emprego', 'sustento', 'dividas', 'prosperidade', 'sao jose operario'],
    introducao: 'Invocação a Deus Pai e a São José Operário para abrir portas de trabalho e prover o pão de cada dia.',
    texto: `Senhor meu Deus, Criador de todas as coisas, Vós que destes ao homem a dignidade do trabalho para sustentar a si e a sua família, ouvi a minha humilde oração.\n\nVós conheceis as minhas necessidades e preocupações financeiras. Abri, Senhor, as portas de um trabalho justo, honesto e digno, onde eu possa colocar meus talentos a serviço do bem e ganhar o pão de cada dia com a vossa bênção.\n\nAbençoai também os que já estão trabalhando, para que haja justiça, serenidade e paz no ambiente de trabalho. Livrai-nos de toda ganância e desespero, e concedei-nos a sabedoria para administrar retamente tudo o que vier às nossas mãos.\n\nSão José Operário, providenciai o nosso sustento! Amém.`
  },

  // ========================================================================
  // 8. ESPÍRITO SANTO & MISSA
  // ========================================================================
  {
    id: 'veni_creator_spiritus',
    titulo: 'Vinde, Espírito Criador (Veni Creator Spiritus)',
    subtitulo: 'O Hino solene de Invocação dos 7 Dons do Espírito Santo',
    categoria: 'espiritosanto',
    autor: 'Rábano Mauro (Século IX)',
    latim: 'Veni, Creator Spiritus, mentes tuorum visita',
    tags: ['espirito santo', 'veni creator', '7 dons', 'pentecostes', 'luz', 'sabedoria'],
    introducao: 'Entoado nos conclaves dos cardeais, ordenações sacerdotais e em todos os grandes momentos da Igreja.',
    texto: `Vinde, Espírito Criador, visitai as almas dos vossos fiéis;\nEnchei de graça celestial os corações que criastes.\n\nVós sois chamado o Consolador, dom do Deus Altíssimo,\nFonte viva, fogo, caridade e unção espiritual.\n\nVós sois septiforme em vossos dons, dedo da destra paterna,\nVós, solene promessa do Pai, que inspirais a nossa voz.\n\nAcendei a luz nos sentidos, infundi o amor nos corações,\nFortalecei a nossa fraqueza com a vossa perpétua fortaleza.\n\nAfastai para longe o inimigo, dai-nos prontamente a paz;\nSendo Vós o nosso guia, evitaremos todo o mal.\n\nFazei-nos conhecer o Pai, e também o Filho,\nE em Vós, Espírito de ambos, façamos crer em todo o tempo.\n\nGlória a Deus Pai, e ao Filho que ressuscitou dos mortos,\nE ao Consolador, por todos os séculos dos séculos. Amém.`
  },
  {
    id: 'oracao_antes_comunhao',
    titulo: 'Oração de Preparação para a Santa Comunhão',
    subtitulo: 'Para receber o Santíssimo Sacramento com pureza e amor',
    categoria: 'espiritosanto',
    autor: 'São Tomás de Aquino (1225 - 1274)',
    latim: 'Oratio ante Missam Sancti Thomae Aquinatis',
    tags: ['santa missa', 'comunhao', 'sao tomas de aquino', 'eucaristia', 'sacramento'],
    introducao: 'Composta pelo Doutor Angélico para preparar o coração do fiel antes de se aproximar do Altar.',
    texto: `Onipotente e sempiterno Deus, eis que me aproximo do Sacramento do vosso Filho Unigênito, Nosso Senhor Jesus Cristo. Aproximo-me como enfermo ao médico da vida, como impuro à fonte da misericórdia, como cego à luz da claridade eterna, como pobre e indigente ao Senhor do Céu e da Terra.\n\nPeço-Vos, pois, pela vossa infinita generosidade, que cureis a minha enfermidade, laveis as minhas manchas, ilumineis a minha cegueira, enriqueçais a minha pobreza e revistais a minha nudez, para que eu receba o Pão dos Anjos, o Rei dos reis e o Senhor dos senhores, com tanta reverência e humildade, tanta contrição e devoção, tanta pureza e fé, tal propósito e intenção, como convém à salvação de minha alma.\n\nAmém.`
  },
  {
    id: 'oracao_antes_leitura_biblia',
    titulo: 'Oração antes de Ler a Sagrada Escritura',
    subtitulo: 'Para que a Palavra de Deus ilumine e transforme a vida',
    categoria: 'espiritosanto',
    autor: 'Tradição da Igreja Católica',
    tags: ['biblia', 'sagrada escritura', 'leitura', 'estudo', 'palavra de deus', 'espirito santo'],
    introducao: 'Reze sempre antes de abrir a Bíblia para que o Espírito Santo abra a sua mente e seu coração.',
    texto: `Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor.\n\nSenhor Jesus, abri os meus olhos e o meu coração para compreender as vossas Sagradas Escrituras. Que esta Palavra não seja para mim apenas letra escrita, mas semente viva de salvação, luz para os meus passos e consolo nas minhas aflições.\n\nDai-me a humildade para escutar o que o Senhor tem a me dizer hoje, e a força para colocar em prática os vossos santos ensinamentos na minha vida diária.\n\nNossa Senhora, Sede da Sabedoria, rogai por nós! Amém.`
  }
];

// Helper para buscar por ID
export function getOracaoPorId(id) {
  return LIVRO_ORACOES.find(o => o.id === id);
}

// Helper para filtrar orações por categoria e termo de busca
export function getOracoesFiltradas(categoria = 'all', termoBusca = '') {
  const query = (termoBusca || '').trim().toLowerCase();

  return LIVRO_ORACOES.filter(o => {
    // Filtro por categoria
    if (categoria !== 'all' && o.categoria !== categoria) {
      return false;
    }

    // Filtro por busca
    if (!query) return true;

    const matchTitulo = o.titulo.toLowerCase().includes(query);
    const matchSubtitulo = o.subtitulo.toLowerCase().includes(query);
    const matchAutor = o.autor.toLowerCase().includes(query);
    const matchTexto = o.texto.toLowerCase().includes(query);
    const matchTags = o.tags.some(t => t.toLowerCase().includes(query));
    const matchLatim = o.latim ? o.latim.toLowerCase().includes(query) : false;

    return matchTitulo || matchSubtitulo || matchAutor || matchTexto || matchTags || matchLatim;
  });
}
