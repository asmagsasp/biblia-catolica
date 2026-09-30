// MOTOR TEOLÓGICO CATÓLICO AVANÇADO DE HOMILIAS E EXEGESE GRANULAR CAPÍTULO A CAPÍTULO
// Cobre os 73 livros bíblicos canônicos, capítulos específicos, temas patrísticos e Magistério da Igreja

// 1. MAPEAMENTO GRANULAR DE CAPÍTULOS MARCANTES DA SAGRADA ESCRITURA
const GRANULAR_CHAPTER_THEOLOGY = {
  // GÊNESIS
  'gênesis_1': {
    title: 'A Criação do Cosmo e a Luz Divina que dissipa o Caos',
    theme: 'Deus cria todas as coisas a partir do nada (ex nihilo) com Sua Palavra todo-poderosa, coroando a criação com o ser humano.',
    father: 'Santo Agostinho ensinava que a luz criada no primeiro dia simboliza a iluminação da graça sobre a inteligência e o coração humano.',
    application: 'Coloque Deus em primeiro lugar nas suas decisões diárias para que a Sua ordem e paz iluminem toda desordem interior.'
  },
  'gênesis_2': {
    title: 'O Sopro da Vida, o Éden e o Matrimônio Sagrado',
    theme: 'Deus sopra o fôlego da vida nas narinas do homem e institui o matrimônio como aliança sagrada de amor indissolúvel.',
    father: 'São Tomás de Aquino lembrava que a mulher foi tirada do lado do homem para ser sua companheira em igualdade de dignidade.',
    application: 'Valorize a santidade da família e cultive o respeito e o cuidado com as pessoas que Deus colocou ao seu lado.'
  },
  'gênesis_3': {
    title: 'A Queda Original e a Aurora do Protoevangelho',
    theme: 'A desobediência rompe a harmonia, mas Deus promete imediatamente o Salvador nascido da Mulher (Gn 3,15), anunciando a vitória de Maria e Cristo.',
    father: 'Santo Irineu de Lião ensinava: "O nó da desobediência de Eva foi desatado pela obediência da Virgem Maria."',
    application: 'Não dialogue com as tentações do pecado; busque refúgio na oração e na intercessão materna de Nossa Senhora.'
  },
  'gênesis_4': {
    title: 'Caim e Abel: A Responsabilidade pelo Irmão',
    theme: 'O clamor do sangue de Abel e a pergunta divina que ecoa nos séculos: "Onde está o teu irmão?"',
    father: 'São João Crisóstomo exortava: "Não basta abster-se do mal; é preciso amar ativamente o irmão e afastar todo veneno da inveja."',
    application: 'Elimine qualquer ressentimento ou inveja no seu coração e seja o guardião amoroso do seu irmão.'
  },
  'gênesis_6': {
    title: 'Noé e a Arca: A Justiça na Fé que Salva',
    theme: 'Noé encontra graça aos olhos do Senhor por sua fidelidade e constrói a arca, pré-figuração da Santa Igreja que salva das águas do pecado.',
    father: 'São Cipriano de Cartago afirmava: "A Arca de Noé é a figura da Igreja Católica, fora da qual não há salvação."',
    application: 'Permaneça firme na barca da Igreja Católica mesmo quando os ventos culturais do mundo forem contrários à fé.'
  },
  'gênesis_12': {
    title: 'A Vocação de Abraão: Partir na Confiança da Promessa',
    theme: 'Abraão ouve a voz de Deus ("Sai da tua terra") e obedece sem hesitar, tornando-se o Pai na Fé de todos os crentes.',
    father: 'São Gregório Magno ensinava que a fé verdadeira não exige ver o caminho todo, mas confiar totalmente nAquele que chama.',
    application: 'Tenha coragem de renunciar aos apegos que o impedem de seguir com prontidão os planos que Deus tem para a sua vida.'
  },
  'gênesis_22': {
    title: 'O Sacrifício de Isaac: A Prefiguração do Calvário',
    theme: 'No monte Moriá, Abraão oferece seu único filho, e Deus providencia o cordeiro, anunciando o Sacrifício Supremo de Cristo na Cruz.',
    father: 'Orígenes contemplava nesta passagem a imagem profética do Pai Celestial que não poupou Seu próprio Filho por amor a nós.',
    application: 'Esteja disposto a consagrar a Deus o que você tem de mais precioso, sabendo que o Senhor nunca se deixa vencer em generosidade.'
  },
  'gênesis_37': {
    title: 'José do Egito: A Providência que Transforma o Mal em Bem',
    theme: 'A traição dos irmãos de José torna-se o caminho providencial pelo qual Deus salvará milhares da fome.',
    father: 'Santo Afonso Maria de Ligório ensinava: "Tudo o que Deus permite em nossa vida é ordenado para a nossa salvação eterna."',
    application: 'Confie que mesmo nas maiores injustiças ou sofrimentos, a mão soberana de Deus está tecendo um desígnio de bênção e paz.'
  },

  // ÊXODO
  'êxodo_3': {
    title: 'A Sarça Ardente e o Santo Nome de Deus',
    theme: 'Deus se revela a Moisés como o Deus Santo ("Eu Sou o que Sou") e escuta o clamor do Seu povo oprimido.',
    father: 'São Gregório de Nissa via na sarça que ardia sem se consumir o símbolo da pureza imaculada da Virgem Maria na Encarnação.',
    application: 'Aproxime-se de Deus com reverência e temor santo, tirando as sandálias do orgulho e da vaidade diante do Santíssimo.'
  },
  'êxodo_12': {
    title: 'A Noite da Páscoa e o Sangue do Cordeiro',
    theme: 'A instituição da Páscoa judaica com o sangue do cordeiro nas portas que preserva da morte, tipologia perfeita da Eucaristia.',
    father: 'São João Crisóstomo proclamava: "Se o sangue de um cordeiro figurativo teve tanto poder, quanto mais o Sangue do Filho de Deus!"',
    application: 'Agradeça a Jesus pelo dom infinito da Sua Santa Missa, onde o Cordeiro Imaculado se oferece diariamente pela nossa redenção.'
  },
  'êxodo_14': {
    title: 'A Passagem do Mar Vermelho: O Triunfo da Salvação',
    theme: 'Moisés estende o cajado e Deus abre as águas para o Seu povo passar a pé enxuto, derrotando o exército inimigo.',
    father: 'Santo Ambrósio explicava aos catecúmenos que a travessia do Mar Vermelho é a imagem do Sacramento do Batismo.',
    application: 'Não tenha medo dos obstáculos que parecem intransponíveis; quando você dá o passo da fé, Deus abre os mares diante de você.'
  },
  'êxodo_20': {
    title: 'Os Dez Mandamentos no Monte Sinai: A Lei do Amor',
    theme: 'Deus entrega a Lei no Sinai não como fardo, mas como bússola de liberdade e vida santa para os Seus filhos.',
    father: 'São Bento afirmava na sua Regra que os Mandamentos de Deus são os degraus seguros para a verdadeira sabedoria e paz.',
    application: 'Examine sua consciência à luz dos Dez Mandamentos e busque viver com retidão e fidelidade aos preceitos divinos.'
  },

  // SALMOS
  'salmos_1': {
    title: 'Os Dois Caminhos: A Felicidade do Justo e a Ilusão do Ímpio',
    theme: 'O justo tem seu prazer na Lei do Senhor e é como árvore plantada junto a ribeiros de águas vivas.',
    father: 'Santo Ambrósio ensinava que a meditação diária na Palavra de Deus torna a alma frutuosa e imune às tempestades do mundo.',
    application: 'Alimente a sua alma diariamente com a Sagrada Escritura e evite conselhos que o afastem da vida de graça.'
  },
  'salmos_23': {
    title: 'O Bom Pastor: O Senhor é Meu Pastor e Nada me Faltará',
    theme: 'A alma descansa na ternura do Bom Pastor que a conduz a águas tranquilas e prepara a mesa farta diante dos inimigos.',
    father: 'São Gregório Magno contemplava neste salmo o cuidado incansável de Cristo que carrega a ovelha ferida nos ombros.',
    application: 'Entregue o controle das suas preocupações a Jesus, o Bom Pastor, e viva hoje na paz do Seu amor providente.'
  },
  'salmos_51': {
    title: 'O Miserere: O Clamor da Alma Penitente por Purificação',
    theme: 'A oração de arrependimento profundo de Davi: "Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto."',
    father: 'Santo Agostinho chorava ao rezar o Miserere, encontrando nele a chave da reconciliação com o Pai misericordioso.',
    application: 'Procure o Sacramento da Reconciliação (Confissão) com coração contrito e acolha o abraço perdoador do Senhor.'
  },
  'salmos_91': {
    title: 'Sob as Asas do Altíssimo: A Proteção Absoluta de Deus',
    theme: 'Aquele que habita no esconderijo do Altíssimo descansará à sombra do Todo-Poderoso; Seus anjos guardarão os teus passos.',
    father: 'São Bernardo de Claraval escreveu sermões comoventes sobre os Santos Anjos da Guarda a partir do Salmo 91.',
    application: 'Invoque diariamente a proteção de Deus e do seu Santo Anjo da Guarda para guardar seus pensamentos, palavras e passos.'
  },
  'salmos_119': {
    title: 'Lâmpada para os Meus Pés é a Tua Palavra',
    theme: 'O maior salmo da Bíblia celebra o amor apaixonado pela Palavra de Deus como guia infalível em meio às trevas.',
    father: 'São Jerônimo dizia que este salmo é o oceano da sabedoria onde a alma encontra remédio para todas as dores.',
    application: 'Tome um versículo bíblico no início de cada manhã e repita-o interiormente como oração contínua durante suas tarefas.'
  },
  'salmos_139': {
    title: 'Tu me Sondas e me Conheces: O Olhar de Amor de Deus',
    theme: 'Deus nos conhece antes mesmo de sermos formados no ventre materno e Seu amor nos envolve em qualquer lugar.',
    father: 'Santa Teresa de Ávila maravilhava-se com a intimidade divina descrita neste salmo: "Deus está mais perto de nós do que nós mesmos."',
    application: 'Não se sinta sozinho ou incompreendido; Deus conhece cada batimento do seu coração e ama você com amor eterno.'
  },

  // EVANGELHO DE SÃO MATEUS
  'mateus_1': {
    title: 'A Genealogia de Jesus e a Fidelidade de São José',
    theme: 'Jesus é o herdeiro das promessas feitas a Abraão e Davi, e São José é o homem justo e dócil aos planos de Deus.',
    father: 'São João Crisóstomo elogiava a humildade e a obediência silenciosa de São José diante do mistério da Encarnação.',
    application: 'Imite o silêncio operoso e a fé incondicional de São José nas decisões da sua vida familiar.'
  },
  'mateus_5': {
    title: 'O Sermão da Montanha e as Bem-Aventuranças',
    theme: 'Jesus proclama a Carta Magna do Reino dos Céus: os mansos, os puros de coração e os pacificadores herdarão a terra.',
    father: 'Santo Agostinho escreveu um tratado inteiro sobre o Sermão da Montanha, considerando-o a perfeição máxima da vida moral cristã.',
    application: 'Busque a pureza de coração, a mansidão diante das ofensas e seja fermento de paz onde houver divisão.'
  },
  'mateus_6': {
    title: 'A Oração do Pai-Nosso e a Confiança na Providência',
    theme: 'Jesus nos ensina a orar no segredo do quarto e a não andar ansiosos pelo dia de amanhã: "Olhai as aves do céu e os lírios do campo."',
    father: 'São Cipriano de Cartago chamava o Pai-Nosso de "o resumo de todo o Evangelho".',
    application: 'Reze o Pai-Nosso com reverência e lance fora toda ansiedade angustiante sobre o futuro, descansando no Pai.'
  },
  'mateus_8': {
    title: 'O Poder da Fé do Centurião e a Cura dos Enfermos',
    theme: 'A fé humilde do centurião ("Senhor, eu não sou digno...") e Jesus acalmando a tempestade no mar com uma só palavra.',
    father: 'Santo Ambrósio lembrava que a Igreja repete todos os dias na Santa Missa as palavras do centurião antes da Comunhão.',
    application: 'Aproxime-se de Jesus com fé humilde e sem dúvidas, sabendo que Ele tem autoridade sobre todas as tuas dores.'
  },
  'mateus_13': {
    title: 'As Parábolas do Reino: O Semeador e a Pérola Preciosa',
    theme: 'O Reino dos Céus é como a semente que cai em terra boa e o tesouro escondido pelo qual vale a pena vender tudo.',
    father: 'São João Crisóstomo exortava: "Prepara a terra do teu coração com a oração e a penitência para que a Palavra produza cem por um."',
    application: 'Remova as pedras do orgulho e os espinhos das preocupações mundanas para que a graça de Deus frutifique na sua vida.'
  },
  'mateus_16': {
    title: 'A Confissão de Pedro e as Chaves do Reino',
    theme: 'Pedro proclama "Tu és o Cristo, o Filho do Deus vivo" e Jesus institui o Primado de Pedro sobre a Sua Igreja Santa.',
    father: 'São Leão Magno ensinava que a fé de Pedro é a rocha inabalável sobre a qual a Igreja Católica permanece vitoriosa contra o mal.',
    application: 'Reze pelo Papa e pela Santa Sé Apostólica, permanecendo sempre unido ao Magistério autêntico da Igreja.'
  },
  'mateus_26': {
    title: 'A Sagrada Eucaristia e a Agonia no Getsêmani',
    theme: 'Jesus institui o Sacramento do Seu Corpo e Sangue ("Tomai e comei...") e ora em agonia: "Pai, faça-se a Tua vontade."',
    father: 'São Francisco de Assis chorava de amor ao pensar na humildade de Jesus que se esconde sob as aparências do pão e do vinho.',
    application: 'Participe da Santa Eucaristia com profunda adoração e repita nos momentos de dor: "Seja feita a Vossa vontade, Senhor."'
  },
  'mateus_28': {
    title: 'A Ressurreição Gloriosa e a Grande Comissão Apostólica',
    theme: 'O sepulcro está vazio! Jesus venceu a morte e envia Seus discípulos a batizar todas as nações: "Eis que estou convosco todos os dias."',
    father: 'São João Crisóstomo exclamava no sermão pascal: "Cristo ressuscitou e a morte foi devorada! Cristo ressuscitou e a vida triunfou!"',
    application: 'Viva como testemunha radiante da Ressurreição, levando a esperança e a verdade do Evangelho a todos ao seu redor.'
  },

  // EVANGELHO DE SÃO LUCAS
  'lucas_1': {
    title: 'A Anunciação e o Magnificat de Maria Santíssima',
    theme: 'O Arcanjo Gabriel saúda a Virgem cheia de graça, o "Fiat" que trouxe o Salvador e o cântico sublime do Magnificat.',
    father: 'São Bernardo de Claraval exclamava: "O Céu inteiro aguardava o teu \'Sim\', ó Doce Virgem Maria!"',
    application: 'Consagre sua vida a Nossa Senhora e aprenda com Ela a dizer "Sim" a tudo o que Deus pedir do seu coração.'
  },
  'lucas_2': {
    title: 'A Natividade em Belém e a Luz que Nasce na Humildade',
    theme: 'Jesus nasce na manjedoura em Belém, os anjos cantam "Glória a Deus nas alturas" e os pastores adoram o Menino Deus.',
    father: 'São Francisco de Assis criou o primeiro presépio em Greccio para contemplar a pobreza radiante do Filho de Deus.',
    application: 'Abra o presépio do seu coração para acolher Jesus na simplicidade, na pureza e na caridade com os pequenos.'
  },
  'lucas_15': {
    title: 'As Parábolas da Misericórdia: O Pai das Misericórdias',
    theme: 'A ovelha perdida, a dracma reencontrada e o Filho Pródigo acolhido pelo abraço emocionado do Pai.',
    father: 'Santo Agostinho meditava: "O Pai correu ao encontro do filho porque a misericórdia de Deus é mais rápida do que o nosso pecado."',
    application: 'Nunca duvide do amor perdoador de Deus; retorne aos braços do Pai e seja também misericordioso com quem falhou com você.'
  },
  'lucas_24': {
    title: 'Os Discípulos de Emaús e o Reconhecimento ao Partir do Pão',
    theme: 'Jesus caminha ao lado dos discípulos tristes, explica as Escrituras e é reconhecido na fração do Pão Eucarístico.',
    father: 'São João Paulo II escreveu a carta *Mane Nobiscum Domine* exortando a Igreja a redescobrir o ardor eucarístico de Emaús.',
    application: 'Permita que Jesus caminhe com você nas suas dúvidas e encontre a força viva do Ressuscitado na Sagrada Eucaristia.'
  },

  // EVANGELHO DE SÃO JOÃO
  'joão_1': {
    title: 'O Prólogo Sagrado: O Verbo se Fez Carne',
    theme: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. A Luz resplandece nas trevas.',
    father: 'Santo Agostinho afirmava que o prólogo de São João contém a mais sublime teologia que a mente humana já pôde contemplar.',
    application: 'Acolha Jesus como a Luz soberana da sua inteligência e viva como filho da luz em todas as suas atitudes.'
  },
  'joão_6': {
    title: 'O Discurso do Pão da Vida: Quem Come a Minha Carne Viverá',
    theme: 'Jesus multiplica os pães e revela o mistério eucarístico: "Eu sou o Pão vivo que desceu do céu; quem comer deste pão viverá eternamente."',
    father: 'São Tomás de Aquino compôs os hinos da festa de *Corpus Christi* a partir deste capítulo luminoso de São João.',
    application: 'Nutra a sua alma frequentemente com a Santa Comunhão Eucarística em estado de graça.'
  },
  'joão_14': {
    title: 'Eu Sou o Caminho, a Verdade e a Vida',
    theme: 'Jesus promete a morada celestial, promete o Espírito Santo Consolador e nos dá a Sua paz que o mundo não pode dar.',
    father: 'Santa Teresa do Menino Jesus dizia: "Jesus é o Caminho; não busquemos outro atalho para o Céu senão o Seu Amor."',
    application: 'Não permita que seu coração se perturbe; fixe os olhos em Jesus, o único Caminho seguro para a eternidade.'
  },
  'joão_19': {
    title: 'A Cruz no Calvário e a Maternidade Espiritual de Maria',
    theme: 'Jesus entrega Sua vida até a última gota de sangue e entrega Sua Mãe Santíssima como Mãe de toda a humanidade: "Eis aí a tua mãe."',
    father: 'São João Eudes ensinava que sob a Cruz o Coração de Jesus e o Coração de Maria uniram-se no mesmo sacrifício de amor redentor.',
    application: 'Acolha a Virgem Maria em sua casa e em sua vida espiritual como fez o discípulo amado no Calvário.'
  },

  // CARTAS PAULINAS E APOCALIPSE
  'romanos_8': {
    title: 'A Vida no Espírito e o Amor Inseparável de Cristo',
    theme: 'Nenhuma condenação há para os que estão em Cristo. O Espírito intercede por nós com gemidos inexprimíveis: "Quem nos separará do amor de Cristo?"',
    father: 'Santo Agostinho encontrava em Romanos 8 a certeza absoluta da vitória da graça divina sobre toda fraqueza humana.',
    application: 'Viva na certeza de que nenhuma tribulação, angústia ou perigo pode arrancar você do amor eterno de Deus.'
  },
  'i coríntios_13': {
    title: 'O Hino ao Amor: O Maior dos Dons',
    theme: 'Ainda que eu falasse as línguas dos anjos, se não tiver amor, nada sou. O amor é paciente, é benigno, tudo crê, tudo espera, tudo suporta.',
    father: 'Santa Teresinha de Lisieux descobriu sua vocação neste capítulo: "Minha vocação é o Amor no coração da Igreja!"',
    application: 'Pratique hoje a paciência ativa, a delicadeza no trato com os outros e a caridade que não busca seus próprios interesses.'
  },
  'filipenses_2': {
    title: 'O Hino da Kénosis e a Exaltação do Nome de Jesus',
    theme: 'Cristo esvaziou-se a Si mesmo, assumindo a condição de servo, pelo que Deus O exaltou soberanamente: "Ao Nome de Jesus todo joelho se dobre."',
    father: 'São Bernardo ensinava que o Santo Nome de Jesus é mel na boca, melodia no ouvido e júbilo no coração.',
    application: 'Invoque com reverência o Santo Nome de Jesus em todas as suas dificuldades e pratique a humildade sincera.'
  },
  'filipenses_4': {
    title: 'A Alegria Serena e a Força em Cristo',
    theme: 'Alegrai-vos sempre no Senhor! O Senhor está próximo. "Tudo posso naquele que me fortalece" (Fl 4,13).',
    father: 'São Francisco de Sales dizia que a tristeza obstinada é amiga do demônio, enquanto a alegria em Deus atrai todas as virtudes.',
    application: 'Substitua as reclamações pelo louvor e repita com confiança: "Tudo posso naquele que me fortalece!"'
  },
  'efésios_6': {
    title: 'A Armadura de Deus para o Bom Combate Espiritual',
    theme: 'Revesti-vos da armadura de Deus: o escudo da fé, o capacete da salvação, a couraça da justiça e a espada do Espírito, que é a Palavra.',
    father: 'Santo Inácio de Loyola baseou suas regras de discernimento espiritual na vigilância contra os dardos inflamados do maligno.',
    application: 'Proteja seus sentidos com a oração diária, com a confissão frequente e com o Santo Rosário contra as ciladas do inimigo.'
  },
  'apocalipse_21': {
    title: 'O Novo Céu e a Nova Terra: A Jerusalém Celeste',
    theme: 'Deus habitará com os homens e enxugará toda lágrima dos seus olhos; não haverá mais morte, nem luto, nem dor: "Eis que faço novas todas as coisas."',
    father: 'São João Maria Vianney contemplava a glória do Céu: "Vale a pena lutar e sofrer alguns dias na terra para gozar a eternidade com Deus."',
    application: 'Mantenha seus olhos fitos na Pátria Celeste; as dores do tempo presente não se comparam com a glória que nos está reservada.'
  }
};

// 2. DETECTOR DINÂMICO DE TEXTO BÍBLICO (EXEGESE DO CONTEÚDO REAL)
function analyzeVerseContent(cleanText, bookName, chapter) {
  const lower = cleanText.toLowerCase();

  // Detecta personagens bíblicos e eventos no próprio texto
  const detectedKeywords = [];
  if (lower.includes('jesus') || lower.includes('cristo') || lower.includes('senhor')) detectedKeywords.push('Cristo');
  if (lower.includes('maria') || lower.includes('mãe') || lower.includes('virgem')) detectedKeywords.push('Nossa Senhora');
  if (lower.includes('pedro') || lower.includes('simão')) detectedKeywords.push('São Pedro');
  if (lower.includes('paulo') || lower.includes('saulo')) detectedKeywords.push('São Paulo');
  if (lower.includes('josé') || lower.includes('jose')) detectedKeywords.push('São José');
  if (lower.includes('davi') || lower.includes('salomão')) detectedKeywords.push('Rei Davi');
  if (lower.includes('moisés') || lower.includes('moises')) detectedKeywords.push('Moisés');
  if (lower.includes('abraão') || lower.includes('abraao')) detectedKeywords.push('Abraão');
  if (lower.includes('anjo') || lower.includes('gabriel') || lower.includes('miguel')) detectedKeywords.push('Santos Anjos');
  if (lower.includes('cruz') || lower.includes('calvário') || lower.includes('morreu') || lower.includes('chagas')) detectedKeywords.push('Santo Sacrifício');
  if (lower.includes('ressuscitou') || lower.includes('ressurreição') || lower.includes('sepulcro')) detectedKeywords.push('Ressurreição');
  if (lower.includes('pão') || lower.includes('cálice') || lower.includes('ceia') || lower.includes('sangue')) detectedKeywords.push('Sagrada Eucaristia');
  if (lower.includes('perdão') || lower.includes('misericórdia') || lower.includes('pecados')) detectedKeywords.push('Divina Misericórdia');
  if (lower.includes('curou') || lower.includes('milagre') || lower.includes('cego') || lower.includes('leproso')) detectedKeywords.push('Milagres de Cura');
  if (lower.includes('mar') || lower.includes('tempestade') || lower.includes('vento') || lower.includes('barco')) detectedKeywords.push('Paz na Tempestade');
  if (lower.includes('amor') || lower.includes('amou') || lower.includes('amar')) detectedKeywords.push('Amor Divino');

  // Seleciona as primeiras frases mais expressivas do texto
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 15);
  const coreExcerpt = sentences.length > 0 ? sentences[0].trim() : cleanText.substring(0, 100);

  return {
    keywords: detectedKeywords,
    coreExcerpt
  };
}

// 3. GERADOR DA HOMILIA CATÓLICA COMPLETA E EXCLUSIVA
export function getDevotionalHomily(bookName, chapter, verse, text) {
  const reference = `${bookName} ${chapter}${verse && verse !== 'completo' ? ':' + verse : ''}`;
  const cleanText = (text || '').replace(/<[^>]*>?/gm, ' ').trim();
  const lowerBook = (bookName || '').toLowerCase().trim();
  const chapterKey = `${lowerBook}_${chapter}`;

  // 1. Verifica se temos exegese direta do capítulo
  const chapterData = GRANULAR_CHAPTER_THEOLOGY[chapterKey];

  // 2. Analisa o conteúdo dos versículos reais
  const contentAnalysis = analyzeVerseContent(cleanText, bookName, chapter);

  // 3. Determina Título e Tema Específico do Capítulo / Passagem
  let homilyTitle = '';
  let theologicalTheme = '';
  let patristicTeaching = '';
  let practicalAdvice = [];

  if (chapterData) {
    homilyTitle = chapterData.title;
    theologicalTheme = chapterData.theme;
    patristicTeaching = chapterData.father;
    practicalAdvice = [
      chapterData.application,
      `Medite no versículo: "${contentAnalysis.coreExcerpt}..." e acolha a mensagem pessoal que Deus tem para a sua vida hoje.`,
      `Una suas intenções e orações na Santa Missa, suplicando a graça de viver com fidelidade esta Palavra.`
    ];
  } else {
    // Geração dinâmica personalizada para o livro e capítulo específico
    homilyTitle = `A Revelação da Graça de Deus em ${reference}`;
    theologicalTheme = `No capítulo ${chapter} de ${bookName}, a Sagrada Escritura nos convida a fixar o olhar na soberana providência de Deus, que conduz a história da salvação e fala ao coração daquele que busca a verdade com sincera humildade.`;
    patristicTeaching = `Santo Agostinho nos recorda com sabedoria: "A Sagrada Escritura é a carta de amor que Deus enviou à humanidade para nos guiar com segurança rumo à Pátria Celeste."`;
    practicalAdvice = [
      `Reserve um momento de recolhimento espiritual hoje para meditar nesta passagem de ${reference}.`,
      `Pratique um ato concreto de caridade e paciência com quem estiver ao seu lado, testemunhando o amor de Cristo.`,
      `Reze suplicando ao Espírito Santo que guarde os seus pensamentos e passos na luz da verdade católica.`
    ];

    if (contentAnalysis.keywords.includes('Sagrada Eucaristia')) {
      homilyTitle = `O Pão Vivo da Salvação em ${reference}`;
      theologicalTheme = `Esta passagem nos insere no mistério inefável da Eucaristia, onde o próprio Cristo se faz alimento e remédio para sustentar a nossa alma peregrina.`;
      patristicTeaching = `São Tomás de Aquino ensinava que a Eucaristia é a perfeição de toda a vida espiritual e o penhor da glória futura.`;
    } else if (contentAnalysis.keywords.includes('Divina Misericórdia')) {
      homilyTitle = `A Fonte Inesgotável da Misericórdia em ${reference}`;
      theologicalTheme = `O Senhor nos revela a grandeza do Seu perdão infinito, que acolhe o pecador arrependido e restaura a dignidade da nossa alma.`;
      patristicTeaching = `O Santo Cura d'Ars lembrava que a misericórdia de Deus é como uma torrente transbordante que apaga todas as nossas faltas.`;
    } else if (contentAnalysis.keywords.includes('Paz na Tempestade')) {
      homilyTitle = `A Paz Soberana de Cristo nas Tempestades em ${reference}`;
      theologicalTheme = `Jesus manifesta a Sua soberania sobre as tempestades da vida: Ele acalma os ventos contrários e restaura a serenidade na alma que nEle confia.`;
      patristicTeaching = `Santa Teresa de Jesus nos exorta: "Nada te turbe, nada te espante; quem a Deus tem, nada lhe falta. Só Deus basta!"`;
    }
  }

  // 4. Saudações e Estruturas Variadas
  const GREETINGS = [
    `Amados irmãos e irmãs em Nosso Senhor Jesus Cristo,`,
    `Querida comunidade de fé reunida pela luz da Palavra de Deus,`,
    `Estimados irmãos, a graça e a paz de Cristo Jesus estejam convosco,`,
    `Irmãos caríssimos no Senhor,`
  ];
  const greeting = GREETINGS[Math.abs((parseInt(chapter) || 1) + (verse === 'completo' ? 0 : parseInt(verse) || 0)) % GREETINGS.length];

  // 5. Montagem do HTML da Homilia
  const p1 = `<p style="margin-bottom: 12px; font-weight: bold; color: var(--gold-400); font-size: 15px;">${greeting}</p>`;

  const p2 = `<p style="margin-bottom: 12px; line-height: 1.65; color: var(--text-primary);">
    Ao abrirmos as Sagradas Escrituras em <strong>${reference}</strong>, a Liturgia e a Tradição Católica nos colocam diante de uma verdade profunda: <strong>${homilyTitle}</strong>. ${theologicalTheme}
  </p>`;

  const p3 = `<p style="margin-bottom: 12px; line-height: 1.65; color: var(--text-primary);">
    Ao meditarmos na passagem <em>"${contentAnalysis.coreExcerpt}..."</em>, percebemos que o Senhor não se dirige a nós com palavras distantes ou frias, mas toca diretamente as realidades da nossa existência humana. Como ensinavam os Santos Padres: <strong>${patristicTeaching}</strong> A fé católica nos ensina que toda palavra saída da boca de Deus é viva, eficaz e capaz de transformar nosso coração de pedra em um coração de carne.
  </p>`;

  const p4 = `<div style="background: rgba(212, 168, 83, 0.08); border-left: 3px solid var(--gold-400); padding: 12px 14px; border-radius: 8px; margin: 14px 0;">
    <strong style="color: var(--gold-300); display: block; margin-bottom: 8px; font-size: 13px;">
      <i class="fas fa-cross" style="margin-right: 6px;"></i> Compromissos Práticos para o seu Dia a Dia:
    </strong>
    <ul style="padding-left: 18px; margin: 0; line-height: 1.6; font-size: 13.5px; color: var(--text-primary);">
      <li style="margin-bottom: 6px;">${practicalAdvice[0]}</li>
      <li style="margin-bottom: 6px;">${practicalAdvice[1]}</li>
      <li>${practicalAdvice[2]}</li>
    </ul>
  </div>`;

  const p5 = `<p style="margin-top: 14px; margin-bottom: 6px; font-style: italic; color: var(--gold-300); text-align: center; line-height: 1.5; font-size: 13.5px;">
    ✝ <strong>Oração e Bênção Sacerdotal:</strong><br>
    "Senhor Jesus Cristo, concedei-nos a graça de acolher Vossa Palavra e fazê-la frutificar em santidade e caridade. Que a bênção de Deus Todo-Poderoso, Pai, Filho ✝ e Espírito Santo, desça sobre vós, vossa família e permaneça para sempre. Amém!"
  </p>`;

  const html = [p1, p2, p3, p4, p5].join('');

  // Texto para Síntese de Voz (TTS)
  const textToSpeak = [
    greeting,
    `Ao meditarmos na Sagrada Escritura em ${reference}, contemplamos: ${homilyTitle}.`,
    theologicalTheme,
    `O Senhor nos ensina através desta Palavra que ${contentAnalysis.coreExcerpt}.`,
    patristicTeaching.replace(/<[^>]*>?/gm, ''),
    `Como viver esta Palavra no seu dia a dia:`,
    `Primeiro: ${practicalAdvice[0]}`,
    `Segundo: ${practicalAdvice[1]}`,
    `Terceiro: ${practicalAdvice[2]}`,
    `Que a bênção de Deus Todo-Poderoso, Pai, Filho e Espírito Santo, desça sobre você e sua família e permaneça para sempre. Amém!`
  ].join('\n\n');

  return {
    reference,
    textExcerpt: cleanText,
    themeTitle: homilyTitle,
    html: html,
    textToSpeak
  };
}
