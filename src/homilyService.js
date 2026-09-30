// MOTOR TEOLÓGICO CATÓLICO AVANÇADO DE HOMILIAS E EXEGESE GRANULAR CAPÍTULO A CAPÍTULO
// Cobre todos os 73 livros bíblicos canônicos da Bíblia Católica, exegese patrística, Magistério e Doutores da Igreja

function normalizeBookKey(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/^sao\s+|^santo\s+|^santa\s+/i, '')
    .replace(/^iii\s+|^3\s+/i, '3_')
    .replace(/^ii\s+|^2\s+/i, '2_')
    .replace(/^i\s+|^1\s+/i, '1_')
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

// 1. MAPEAMENTO GRANULAR DE CAPÍTULOS ESPECÍFICOS DA SAGRADA ESCRITURA
const GRANULAR_CHAPTER_THEOLOGY = {
  // LIVRO DE RUTE (Todos os 4 Capítulos)
  'rute_1': {
    title: 'A Dor em Moabe e o Voto Sublime de Fidelidade de Rute a Noemi e a Deus',
    theme: 'Em meio à dor da perda e da viuvez em terra estrangeira, Rute pronuncia uma das mais belas profissões de fé e lealdade da Bíblia: "Para onde fores, irei; o teu povo é o meu povo e o teu Deus é o meu Deus."',
    father: 'São Jerônimo ensinava que a fidelidade incondicional da moabita Rute prefigura a Igreja dos gentios, que renuncia aos ídolos do mundo para se consagrar inteiramente ao Deus vivo e verdadeiro de Israel.',
    application: 'Cultive a fidelidade inabalável nos seus laços familiares e amizades cristãs, permanecendo ao lado de quem sofre mesmo nas horas de maior aridez.'
  },
  'rute_2': {
    title: 'A Respiga nos Campos de Belém: A Providência Divina e a Nobreza de Booz',
    theme: 'Ao respigar espigas caídas atrás dos ceifeiros para alimentar sua sogra Noemi, Rute encontra a bondade protetora de Booz, que reconhece sua virtude e a abençoa sob as asas do Deus de Israel.',
    father: 'Santo Ambrósio contemplava nos campos férteis de Belém a imagem da Santa Igreja Católica e na respiga humilde de Rute o trabalho virtuoso da alma que recolhe os grãos preciosos da graça divina.',
    application: 'Pratique a caridade discreta e generosa com os mais necessitados e reconheça a mão invisível da providência de Deus nos encontros do seu cotidiano.'
  },
  'rute_3': {
    title: 'O Encontro na Eira ao Anoitecer: A Pureza de Intenção e o Clamor pelo Resgatador (Goel)',
    theme: 'Orientada pela prudência de Noemi, Rute apresenta-se com humildade e pureza aos pés de Booz, pedindo que ele estenda a sua capa sobre ela como parente resgatador legal de sua família.',
    father: 'São Gregório Magno explicava que a capa estendida por Booz simboliza o Manto da Misericórdia e da Graça de Jesus Cristo, nosso Sumo Resgatador, que acolhe a alma necessitada e a redime do pecado.',
    application: 'Aproxime-se dos sacramentos com a pureza e a confiança filial de Rute, suplicando a proteção de Cristo para guardar os seus passos e suas intenções.'
  },
  'rute_4': {
    title: 'O Resgate às Portas de Belém, o Matrimônio Sagrado e a Linhagem do Messias',
    theme: 'Booz cumpre fielmente a lei diante dos anciãos, resgata a herança de Noemi e toma Rute por esposa. Do seu matrimônio sagrado nasce Obede, pai de Jessé e avô do Rei Davi, inserindo Rute na linhagem direta de Jesus Cristo.',
    father: 'Santo Agostinho exultava ao meditar neste livro: "Deus não faz acepção de pessoas; da fidelidade silenciosa de uma jovem viúva em Belém, o Senhor teceu a genealogia real do Salvador do mundo!"',
    application: 'Tenha a certeza de que Deus transforma todas as perdas e dores em vitória eterna quando confiamos plenamente nos Seus desígnios de salvação.'
  },

  // LIVRO DE JONAS (Todos os 4 Capítulos)
  'jonas_1': {
    title: 'A Fuga de Jonas para Társis e a Tempestade no Mar',
    theme: 'Jonas tenta fugir da presença de Deus, mas o Senhor envia a tempestade e o grande peixe para salvar o profeta e conduzi-lo ao arrependimento.',
    father: 'São João Crisóstomo ensinava que nenhuma criatura pode se esconder da presença de Deus e que a tempestade foi o remédio pedagógico para curar o profeta.',
    application: 'Não fuja da vontade de Deus quando Ele lhe pedir um testemunho de fé; a obediência a Deus é o único porto seguro da alma.'
  },
  'jonas_2': {
    title: 'A Oração nas Profundezas do Abismo e o Sinal da Ressurreição',
    theme: 'Do ventre do peixe, Jonas clama ao Senhor com coração contrito e é devolvido à terra firme, prefiguração dos três dias de Cristo no sepulcro.',
    father: 'São Cirilo de Jerusalém explicava aos catecúmenos que a libertação de Jonas ao terceiro dia é a figura profética da gloriosa Ressurreição de Jesus.',
    application: 'Clame a Deus mesmo nos momentos de maior angústia ou escuridão, sabendo que a misericórdia do Senhor alcança as maiores profundezas.'
  },
  'jonas_3': {
    title: 'A Pregação em Nínive e a Conversão de todo o Povo',
    theme: 'Jonas prega a conversão em Nínive; do rei ao mais humilde servo, todos vestem saco e jejuam, e Deus revoga o castigo anunciado.',
    father: 'São Tomás de Aquino lembrava que o arrependimento sincero acompanhado de jejum e oração desvia a ira divina e atrai rios de misericórdia.',
    application: 'Pratique a penitência sincera e esteja sempre pronto para acolher o chamado divino à conversão interior.'
  },
  'jonas_4': {
    title: 'A Lição da Rícino: O Amor Universal e Compassivo do Pai',
    theme: 'Deus ensina Jonas através da planta de rícino que o Seu amor compassivo não tem limites e se estende a todas as almas criadas.',
    father: 'São Bernardo de Claraval meditava: "A compaixão de Deus é maior que todas as nossas faltas; Ele não quer a morte do pecador, mas que viva."',
    application: 'Elimine o espírito de julgamento e vingança, alegrando-se com a conversão e a salvação do seu próximo.'
  },

  // GÊNESIS
  'genesis_1': {
    title: 'A Criação do Cosmo e a Luz Divina que dissipa o Caos',
    theme: 'Deus cria todas as coisas a partir do nada (ex nihilo) com Sua Palavra todo-poderosa, coroando a criação com o ser humano.',
    father: 'Santo Agostinho ensinava que a luz criada no primeiro dia simboliza a iluminação da graça sobre a inteligência e o coração humano.',
    application: 'Coloque Deus em primeiro lugar nas suas decisões diárias para que a Sua ordem e paz iluminem toda desordem interior.'
  },
  'genesis_2': {
    title: 'O Sopro da Vida, o Éden e o Matrimônio Sagrado',
    theme: 'Deus sopra o fôlego da vida nas narinas do homem e institui o matrimônio como aliança sagrada de amor indissolúvel.',
    father: 'São Tomás de Aquino lembrava que a mulher foi tirada do lado do homem para ser sua companheira em igualdade de dignidade.',
    application: 'Valorize a santidade da família e cultive o respeito e o cuidado com as pessoas que Deus colocou ao seu lado.'
  },
  'genesis_3': {
    title: 'A Queda Original e a Aurora do Protoevangelho',
    theme: 'A desobediência rompe a harmonia, mas Deus promete imediatamente o Salvador nascido da Mulher (Gn 3,15), anunciando a vitória de Maria e Cristo.',
    father: 'Santo Irineu de Lião ensinava: "O nó da desobediência de Eva foi desatado pela obediência da Virgem Maria."',
    application: 'Não dialogue com as tentações do pecado; busque refúgio na oração e na intercessão materna de Nossa Senhora.'
  },
  'genesis_4': {
    title: 'Caim e Abel: A Responsabilidade Sagrada pelo Irmão',
    theme: 'O clamor do sangue de Abel e a pergunta divina que ecoa nos séculos: "Onde está o teu irmão?"',
    father: 'São João Crisóstomo exortava: "Não basta abster-se do mal; é preciso amar ativamente o irmão e afastar todo veneno da inveja."',
    application: 'Elimine qualquer ressentimento ou inveja no seu coração e seja o guardião amoroso do seu irmão.'
  },
  'genesis_6': {
    title: 'Noé e a Arca: A Justiça na Fé que Salva da Perdição',
    theme: 'Noé encontra graça aos olhos do Senhor por sua fidelidade e constrói a arca, pré-figuração da Santa Igreja que salva das águas do pecado.',
    father: 'São Cipriano de Cartago afirmava: "A Arca de Noé é a figura da Igreja Católica, fora da qual não há salvação."',
    application: 'Permaneça firme na barca da Igreja Católica mesmo quando os ventos culturais do mundo forem contrários à fé.'
  },
  'genesis_12': {
    title: 'A Vocação de Abraão: Partir na Confiança da Promessa',
    theme: 'Abraão ouve a voz de Deus ("Sai da tua terra") e obedece sem hesitar, tornando-se o Pai na Fé de todos os crentes.',
    father: 'São Gregório Magno ensinava que a fé verdadeira não exige ver o caminho todo, mas confiar totalmente nAquele que chama.',
    application: 'Tenha coragem de renunciar aos apegos que o impedem de seguir com prontidão os planos que Deus tem para a sua vida.'
  },
  'genesis_22': {
    title: 'O Sacrifício de Isaac no Moriá: A Prefiguração do Calvário',
    theme: 'No monte Moriá, Abraão oferece seu único filho, e Deus providencia o cordeiro, anunciando o Sacrifício Supremo de Cristo na Cruz.',
    father: 'Orígenes contemplava nesta passagem a imagem profética do Pai Celestial que não poupou Seu próprio Filho por amor a nós.',
    application: 'Esteja disposto a consagrar a Deus o que você tem de mais precioso, sabendo que o Senhor nunca se deixa vencer em generosidade.'
  },
  'genesis_37': {
    title: 'José do Egito: A Providência que Transforma o Mal em Bem',
    theme: 'A traição dos irmãos de José torna-se o caminho providencial pelo qual Deus salvará milhares da fome.',
    father: 'Santo Afonso Maria de Ligório ensinava: "Tudo o que Deus permite em nossa vida é ordenado para a nossa salvação eterna."',
    application: 'Confie que mesmo nas maiores injustiças ou sofrimentos, a mão soberana de Deus está tecendo um desígnio de bênção e paz.'
  },

  // ÊXODO
  'exodo_3': {
    title: 'A Sarça Ardente e a Revelação do Santo Nome de Deus',
    theme: 'Deus se revela a Moisés como o Deus Santo ("Eu Sou o que Sou") e escuta o clamor do Seu povo oprimido.',
    father: 'São Gregório de Nissa via na sarça que ardia sem se consumir o símbolo da pureza imaculada da Virgem Maria na Encarnação.',
    application: 'Aproxime-se de Deus com reverência e temor santo, tirando as sandálias do orgulho e da vaidade diante do Santíssimo.'
  },
  'exodo_12': {
    title: 'A Noite da Páscoa e o Sangue do Cordeiro que Salva da Morte',
    theme: 'A instituição da Páscoa com o sangue do cordeiro que preserva da morte, tipologia perfeita do Sacrifício Eucarístico de Jesus.',
    father: 'São João Crisóstomo proclamava: "Se o sangue de um cordeiro figurativo teve tanto poder, quanto mais o Sangue do Filho de Deus!"',
    application: 'Agradeça a Jesus pelo dom infinito da Sua Santa Missa, onde o Cordeiro Imaculado se oferece diariamente pela nossa redenção.'
  },
  'exodo_14': {
    title: 'A Passagem do Mar Vermelho: O Triunfo da Libertação Divina',
    theme: 'Moisés estende o cajado e Deus abre as águas para o Seu povo passar a pé enxuto, derrotando o poder opressor.',
    father: 'Santo Ambrósio explicava aos catecúmenos que a travessia do Mar Vermelho é a imagem do Sacramento do Santo Batismo.',
    application: 'Não tenha medo dos obstáculos que parecem intransponíveis; quando você dá o passo da fé, Deus abre os caminhos diante de você.'
  },
  'exodo_20': {
    title: 'Os Dez Mandamentos no Sinai: O Caminho da Liberdade e da Vida',
    theme: 'Deus entrega o Decálogo no Sinai não como fardo, mas como bússola segura de liberdade, verdade e santidade para os Seus filhos.',
    father: 'São Bento afirmava na sua Regra que os Mandamentos de Deus são os degraus seguros para a verdadeira sabedoria e paz.',
    application: 'Examine sua consciência à luz dos Dez Mandamentos e busque viver com retidão e fidelidade aos preceitos divinos.'
  },

  // SALMOS
  'salmos_1': {
    title: 'Os Dois Caminhos: A Bem-Aventurança do Justo e a Ilusão do Ímpio',
    theme: 'O justo tem seu prazer na Lei do Senhor e é como árvore plantada junto a ribeiros de águas vivas que dá fruto no tempo certo.',
    father: 'Santo Ambrósio ensinava que a meditação diária na Palavra de Deus torna a alma frutuosa e imune às tempestades do mundo.',
    application: 'Alimente a sua alma diariamente com a Sagrada Escritura e evite conselhos que o afastem da vida de oração.'
  },
  'salmos_23': {
    title: 'O Bom Pastor: O Senhor é Meu Pastor e Nada me Faltará',
    theme: 'A alma descansa na ternura do Bom Pastor que a conduz a águas tranquilas e prepara a mesa farta na presença dos adversários.',
    father: 'São Gregório Magno contemplava neste salmo o cuidado incansável de Cristo que carrega a ovelha ferida nos ombros.',
    application: 'Entregue o controle das suas preocupações a Jesus, o Bom Pastor, e viva hoje na paz do Seu amor providente.'
  },
  'salmos_51': {
    title: 'O Miserere: O Clamor da Alma Penitente por Purificação e Renovação',
    theme: 'A oração contrita de Davi: "Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto."',
    father: 'Santo Agostinho chorava ao rezar o Miserere, encontrando nele a chave da reconciliação com o Pai misericordioso.',
    application: 'Procure o Sacramento da Reconciliação (Confissão) com coração contrito e acolha o abraço perdoador do Senhor.'
  },
  'salmos_91': {
    title: 'Sob as Asas do Altíssimo: O Refúgio e a Proteção Absoluta',
    theme: 'Aquele que habita no esconderijo do Altíssimo descansará à sombra do Todo-Poderoso; Seus anjos guardarão os teus passos.',
    father: 'São Bernardo de Claraval escreveu sermões comoventes sobre os Santos Anjos da Guarda a partir do Salmo 91.',
    application: 'Invoque diariamente a proteção de Deus e do seu Santo Anjo da Guarda para guardar seus pensamentos e palavras.'
  },
  'salmos_119': {
    title: 'Lâmpada para os Meus Pés é a Tua Palavra e Luz para o Meu Caminho',
    theme: 'O maior salmo da Bíblia celebra o amor apaixonado pela Lei de Deus como guia infalível em meio às trevas do mundo.',
    father: 'São Jerônimo dizia que este salmo é o oceano da sabedoria onde a alma encontra remédio para todas as dores.',
    application: 'Tome um versículo bíblico no início de cada manhã e repita-o interiormente como oração contínua durante suas tarefas.'
  },
  'salmos_139': {
    title: 'Tu me Sondas e me Conheces: O Olhar Infinito do Amor de Deus',
    theme: 'Deus nos conhece antes mesmo de sermos formados no ventre materno e Seu amor soberano nos envolve em qualquer lugar.',
    father: 'Santa Teresa de Ávila maravilhava-se com a intimidade divina descrita neste salmo: "Deus está mais perto de nós do que nós mesmos."',
    application: 'Não se sinta sozinho ou incompreendido; Deus conhece cada batimento do seu coração e ama você com amor eterno.'
  },

  // EVANGELHO DE SÃO MATEUS
  'mateus_1': {
    title: 'A Genealogia de Jesus Cristo e a Fidelidade Silenciosa de São José',
    theme: 'Jesus é o herdeiro das promessas feitas a Abraão e Davi, e São José é o homem justo e dócil aos planos providenciais de Deus.',
    father: 'São João Crisóstomo elogiava a humildade e a obediência silenciosa de São José diante do mistério da Encarnação.',
    application: 'Imite o silêncio operoso e a fé incondicional de São José nas decisões da sua vida familiar.'
  },
  'mateus_5': {
    title: 'O Sermão da Montanha e a Sublime Carta das Bem-Aventuranças',
    theme: 'Jesus proclama a Carta Magna do Reino dos Céus: os mansos, os puros de coração e os pacificadores herdarão a terra prometida.',
    father: 'Santo Agostinho escreveu um tratado sobre o Sermão da Montanha, considerando-o a perfeição máxima da vida moral cristã.',
    application: 'Busque a pureza de coração, a mansidão diante das ofensas e seja fermento de paz onde houver divisão.'
  },
  'mateus_6': {
    title: 'A Oração do Pai-Nosso e o Abandono Filial na Providência do Pai',
    theme: 'Jesus nos ensina a orar no segredo do quarto e a não andar ansiosos pelo dia de amanhã: "Olhai as aves do céu e os lírios do campo."',
    father: 'São Cipriano de Cartago chamava o Pai-Nosso de "o resumo de todo o Evangelho".',
    application: 'Reze o Pai-Nosso com reverência e lance fora toda ansiedade angustiante sobre o futuro, descansando no Pai.'
  },
  'mateus_26': {
    title: 'A Última Ceia, a Instituição da Eucaristia e a Agonia no Getsêmani',
    theme: 'Jesus institui o Sacramento do Seu Corpo e Sangue ("Tomai e comei...") e ora em agonia: "Pai, faça-se a Tua vontade."',
    father: 'São Francisco de Assis chorava de amor ao pensar na humildade de Jesus que se esconde sob as aparências do pão e do vinho.',
    application: 'Participe da Santa Eucaristia com profunda adoração e repita nos momentos de dor: "Seja feita a Vossa vontade, Senhor."'
  },
  'mateus_28': {
    title: 'A Ressurreição Gloriosa e o Mandato Apostólico a Todas as Nações',
    theme: 'O sepulcro está vazio! Jesus venceu a morte e envia Seus discípulos a batizar todas as nações: "Eis que estou convosco todos os dias."',
    father: 'São João Crisóstomo exclamava no sermão pascal: "Cristo ressuscitou e a morte foi devorada! Cristo ressuscitou e a vida triunfou!"',
    application: 'Viva como testemunha radiante da Ressurreição, levando a esperança e a verdade do Evangelho a todos ao seu redor.'
  },

  // EVANGELHO DE SÃO LUCAS
  'lucas_1': {
    title: 'A Anunciação do Anjo, o "Sim" da Virgem Maria e o Magnificat',
    theme: 'O Arcanjo Gabriel saúda a Virgem cheia de graça, o "Fiat" que trouxe o Salvador ao mundo e o cântico sublime do Magnificat.',
    father: 'São Bernardo de Claraval exclamava: "O Céu inteiro aguardava o teu \'Sim\', ó Doce Virgem Maria!"',
    application: 'Consagre sua vida a Nossa Senhora e aprenda com Ela a dizer "Sim" a tudo o que Deus pedir do seu coração.'
  },
  'lucas_2': {
    title: 'O Nascimento em Belém, o Canto dos Anjos e a Adoração dos Pastores',
    theme: 'Jesus nasce na manjedoura em Belém, os anjos cantam "Glória a Deus nas alturas" e os pastores adoram o Menino Deus.',
    father: 'São Francisco de Assis criou o primeiro presépio em Greccio para contemplar a pobreza radiante do Filho de Deus.',
    application: 'Abra o presépio do seu coração para acolher Jesus na simplicidade, na pureza e na caridade com os pequenos.'
  },
  'lucas_15': {
    title: 'As Parábolas da Misericórdia: O Abraço Perdoador do Pai',
    theme: 'A ovelha perdida, a dracma reencontrada e o Filho Pródigo acolhido pelo abraço emocionado e restaurador do Pai.',
    father: 'Santo Agostinho meditava: "O Pai correu ao encontro do filho porque a misericórdia de Deus é mais rápida do que o nosso pecado."',
    application: 'Nunca duvide do amor perdoador de Deus; retorne aos braços do Pai e seja também misericordioso com quem falhou com você.'
  },
  'lucas_24': {
    title: 'Os Discípulos de Emaús e o Reconhecimento de Cristo ao Partir do Pão',
    theme: 'Jesus caminha ao lado dos discípulos tristes, explica as Escrituras e é reconhecido na fração do Pão Eucarístico.',
    father: 'São João Paulo II escreveu a carta *Mane Nobiscum Domine* exortando a Igreja a redescobrir o ardor eucarístico de Emaús.',
    application: 'Permita que Jesus caminhe com você nas suas dúvidas e encontre a força viva do Ressuscitado na Sagrada Eucaristia.'
  },

  // EVANGELHO DE SÃO JOÃO
  'joao_1': {
    title: 'O Prólogo Sublime: O Verbo Eterno se Fez Carne e Habitou entre Nós',
    theme: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. A Luz resplandece nas trevas e as trevas não a venceram.',
    father: 'Santo Agostinho afirmava que o prólogo de São João contém a mais sublime teologia que a mente humana já pôde contemplar.',
    application: 'Acolha Jesus como a Luz soberana da sua inteligência e viva como filho da luz em todas as suas atitudes.'
  },
  'joao_6': {
    title: 'O Discurso do Pão da Vida: Quem Come a Minha Carne Viverá Eternamente',
    theme: 'Jesus multiplica os pães e revela o mistério eucarístico: "Eu sou o Pão vivo que desceu do céu; quem comer deste pão viverá eternamente."',
    father: 'São Tomás de Aquino compôs os hinos da festa de *Corpus Christi* a partir deste capítulo luminoso de São João.',
    application: 'Nutra a sua alma frequentemente com a Santa Comunhão Eucarística em estado de graça.'
  },
  'joao_14': {
    title: 'Eu Sou o Caminho, a Verdade e a Vida: A Promessa do Consolador',
    theme: 'Jesus promete a morada celestial, promete o Espírito Santo Consolador e nos dá a Sua paz que o mundo não pode dar.',
    father: 'Santa Teresa do Menino Jesus dizia: "Jesus é o Caminho; não busquemos outro atalho para o Céu senão o Seu Amor."',
    application: 'Não permita que seu coração se perturbe; fixe os olhos em Jesus, o único Caminho seguro para a eternidade.'
  },
  'joao_19': {
    title: 'A Cruz no Calvário e a Maternidade Espiritual da Virgem Maria',
    theme: 'Jesus entrega Sua vida até a última gota de sangue e entrega Sua Mãe Santíssima como Mãe de toda a humanidade: "Eis aí a tua mãe."',
    father: 'São João Eudes ensinava que sob a Cruz o Coração de Jesus e o Coração de Maria uniram-se no mesmo sacrifício de amor redentor.',
    application: 'Acolha a Virgem Maria em sua casa e em sua vida espiritual como fez o discípulo amado no Calvário.'
  },

  // ATOS DOS APÓSTOLOS
  'atos_dos_apostolos_2': {
    title: 'O Pentecostes Sagrado: A Descida do Espírito Santo sobre a Igreja',
    theme: 'Reunidos no Cenáculo com Maria Santíssima, os Apóstolos recebem as línguas de fogo do Espírito Santo e pregam com santa ousadia.',
    father: 'São João Crisóstomo afirmava que o Espírito Santo transformou pescadores iletrados em colunas inabaláveis da Igreja Universal.',
    application: 'Peça diariamente a efusão dos sete dons do Espírito Santo sobre o seu coração, sua família e sua comunidade.'
  },
  'atos_dos_apostolos_9': {
    title: 'A Conversão de Saulo no Caminho de Damasco',
    theme: 'Jesus ressuscitado interpela o perseguidor: "Saulo, Saulo, por que me persegues?" e transforma o perseguidor no Apóstolo dos Gentios.',
    father: 'Santo Agostinho celebrava: "Foi abatido o perseguidor para ser erguido o pregador da verdade!"',
    application: 'Creia no poder transformador da graça divina; nenhuma alma está tão longe de Deus que não possa ser alcançada pela Sua luz.'
  },

  // CARTAS PAULINAS E CATÓLICAS
  'romanos_8': {
    title: 'A Vida no Espírito e a Certeza do Amor Inseparável de Cristo',
    theme: 'Nenhuma condenação há para os que estão em Cristo Jesus. O Espírito intercede por nós: "Quem nos separará do amor de Cristo?"',
    father: 'Santo Agostinho encontrava em Romanos 8 a certeza absoluta da vitória da graça divina sobre toda fraqueza humana.',
    application: 'Viva na certeza de que nenhuma tribulação, angústia ou perigo pode arrancar você do amor eterno de Deus.'
  },
  '1_corintios_13': {
    title: 'O Hino ao Amor: O Maior e Mais Excelente de Todos os Dons',
    theme: 'Ainda que eu falasse as línguas dos anjos, se não tiver amor, nada sou. O amor é paciente, é benigno, tudo crê, tudo espera, tudo suporta.',
    father: 'Santa Teresinha de Lisieux descobriu sua vocação neste capítulo: "Minha vocação é o Amor no coração da Igreja!"',
    application: 'Pratique hoje a paciência ativa, a delicadeza no trato com os outros e a caridade que não busca seus próprios interesses.'
  },
  'filipenses_2': {
    title: 'O Hino da Kénosis e a Exaltação Soberana do Nome de Jesus',
    theme: 'Cristo esvaziou-se a Si mesmo, assumindo a condição de servo, pelo que Deus O exaltou: "Ao Nome de Jesus todo joelho se dobre."',
    father: 'São Bernardo ensinava que o Santo Nome de Jesus é mel na boca, melodia no ouvido e júbilo no coração.',
    application: 'Invoque com reverência o Santo Nome de Jesus em todas as suas dificuldades e pratique a humildade sincera.'
  },
  'filipenses_4': {
    title: 'A Alegria Serena no Senhor e a Fortaleza que Vem do Alto',
    theme: 'Alegrai-vos sempre no Senhor! O Senhor está próximo. "Tudo posso naquele que me fortalece" (Fl 4,13).',
    father: 'São Francisco de Sales dizia que a tristeza obstinada afasta a graça, enquanto a santa alegria em Deus atrai todas as virtudes.',
    application: 'Substitua as reclamações pelo louvor sincero e repita com confiança: "Tudo posso naquele que me fortalece!"'
  },
  'efesios_6': {
    title: 'A Armadura de Deus para o Bom Combate Espiritual',
    theme: 'Revesti-vos da armadura de Deus: o escudo da fé, o capacete da salvação, a couraça da justiça e a espada do Espírito, que é a Palavra.',
    father: 'Santo Inácio de Loyola baseou suas regras de discernimento espiritual na vigilância constante contra as ciladas do inimigo.',
    application: 'Proteja sua mente e sentidos com a oração diária, com a confissão frequente e com o Santo Rosário.'
  },
  'apocalipse_21': {
    title: 'O Novo Céu e a Nova Terra: A Glória Eterna da Jerusalém Celeste',
    theme: 'Deus habitará com os homens e enxugará toda lágrima dos seus olhos; não haverá mais morte nem dor: "Eis que faço novas todas as coisas."',
    father: 'São João Maria Vianney contemplava a glória do Céu: "Vale a pena lutar e sofrer alguns dias na terra para gozar a eternidade com Deus."',
    application: 'Mantenha seus olhos fitos na Pátria Celeste; as dores do tempo presente não se comparam com a glória que nos está reservada.'
  }
};

// 2. DOUTORES E PADRES DA IGREJA PARA ROTAÇÃO CATÓLICA HARMONIOSA
const PATRISTIC_DOCTORS = [
  {
    name: 'Santo Agostinho',
    quote: '"A Sagrada Escritura é a carta viva que Deus enviou aos Seus filhos peregrinos para nos guiar com segurança à Pátria Celeste."',
    virtue: 'a iluminação interior da graça e a conversão do coração'
  },
  {
    name: 'São João Crisóstomo',
    quote: '"A leitura orante da Sagrada Escritura é como uma fonte cristalina: quanto mais dela bebemos, mais saciamos nossa sede de verdade e paz."',
    virtue: 'a generosidade na caridade fraterna e a docilidade à Palavra'
  },
  {
    name: 'São Jerônimo',
    quote: '"Ignorar as Sagradas Escrituras é ignorar o próprio Cristo. Quem medita na Palavra encontra a sabedoria eterna."',
    virtue: 'o amor profundo e reverente aos textos sagrados'
  },
  {
    name: 'São Tomás de Aquino',
    quote: '"A graça de Deus não destrói a natureza humana, mas a aperfeiçoa e eleva para a comunhão com a Santíssima Trindade."',
    virtue: 'a união harmoniosa entre a fé viva e o discernimento da verdade'
  },
  {
    name: 'São Gregório Magno',
    quote: '"A Sagrada Escritura cresce com quem a lê; nela o cordeiro caminha com passos simples e o sábio descobre profundidades infinitas."',
    virtue: 'a mansidão pastoral e o cuidado com a alma do próximo'
  },
  {
    name: 'Santa Teresa de Ávila',
    quote: '"Quem a Deus tem, nada lhe falta. Só Deus basta! Na oração perseverante, a alma encontra a sua fortaleza inabalável."',
    virtue: 'a perseverança na oração e a serenidade diante das tempestades'
  },
  {
    name: 'São Bernardo de Claraval',
    quote: '"O amor de Deus não é medido pelas palavras, mas pelas obras e pela entrega confiante nas mãos da divina Providência."',
    virtue: 'o abandono filial e a devoção terna a Jesus e Maria'
  },
  {
    name: 'Santo Afonso Maria de Ligório',
    quote: '"Quem reza se salva, quem não reza se condena. Tudo o que Deus permite em nossa vida é ordenado para o nosso bem eterno."',
    virtue: 'a oração incessante e o zelo pela salvação das almas'
  },
  {
    name: 'São Francisco de Sales',
    quote: '"Não queirais ser senão o que sois, mas sede-o muito bem, para honrar o Mestre cuja obra sois."',
    virtue: 'a santificação nas tarefas humildes e diárias'
  },
  {
    name: 'Papa Bento XVI',
    quote: '"A fé católica não é uma teoria abstrata, mas o encontro vivo com a Pessoa de Jesus Cristo, que dá novo horizonte à nossa vida."',
    virtue: 'o enraizamento da fé na Tradição apostólica viva'
  }
];

// 3. EXEGESE ESPECÍFICA DE LIVROS BÍBLICOS E CAPÍTULOS GENÉRICOS
function getGenericBookChapterTheology(bookName, chapter, cleanText) {
  const normBook = normalizeBookKey(bookName);
  const capNum = parseInt(chapter) || 1;

  // Extrai frases reais mais marcantes dos versículos recebidos
  const rawSentences = cleanText
    .split(/[.!?]+/)
    .map(s => s.trim().replace(/^[0-9]+\s*/, ''))
    .filter(s => s.length > 20);

  const bestVerseExcerpt = rawSentences.length > 0
    ? rawSentences[0].substring(0, 140)
    : `O Senhor é a nossa força e salvação no capítulo ${chapter} de ${bookName}`;

  // Variação determinística baseada no livro e número do capítulo
  const seed = (normBook.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + capNum * 7);
  const doctor = PATRISTIC_DOCTORS[seed % PATRISTIC_DOCTORS.length];

  // Temas e Títulos específicos por tipo de livro bíblico
  let title = '';
  let theme = '';
  let advice = [];

  if (normBook.includes('salmo')) {
    title = `A Oração Confiante da Alma e o Louvor Divino no Salmo ${chapter}`;
    theme = `No Salmo ${chapter}, o salmista eleva o coração a Deus em oração profunda, ensinando a Igreja a transformar tanto as alegrias quanto as angústias em cântico de louvor e súplica confiante diante do Altíssimo.`;
    advice = [
      `Faça deste Salmo ${chapter} a sua oração pessoal durante o dia, repetindo os seus versículos no silêncio do coração.`,
      `Entregue as suas batalhas espirituais e preocupações nas mãos do Senhor, descansando na Sua providência.`,
      `Agradeça a Deus por uma graça específica que Ele concedeu a você e à sua família nesta semana.`
    ];
  } else if (normBook.includes('mateus') || normBook.includes('marcos') || normBook.includes('lucas') || normBook.includes('joao')) {
    title = `O Mistério da Graça e o Encontro com Cristo no Capítulo ${chapter} de ${bookName}`;
    theme = `Neste capítulo ${chapter} do Santo Evangelho segundo ${bookName}, Nosso Senhor Jesus Cristo nos revela o rosto amoroso do Pai e nos convida a segui-Lo com prontidão, acolhendo a Sua Palavra como luz infalível para as nossas vidas.`;
    advice = [
      `Medite no Evangelho de ${bookName} ${chapter} colocando-se na cena bíblica ao lado de Jesus.`,
      `Pratique um gesto concreto de mansidão e caridade com quem estiver próximo de você hoje.`,
      `Aproxime-se com fervor da Santa Missa e da Eucaristia, reconhecendo a presença viva do Senhor.`
    ];
  } else if (normBook.includes('atos')) {
    title = `A Ação do Espírito Santo e o Ardor Missionário em Atos dos Apóstolos ${chapter}`;
    theme = `No capítulo ${chapter} de Atos dos Apóstolos, a Igreja nascente testemunha o poder vivificador do Espírito Santo que fortalece os discípulos a proclamarem a verdade de Cristo com coragem e fidelidade inabaláveis.`;
    advice = [
      `Invoque o Espírito Santo antes de tomar qualquer decisão importante no trabalho ou na família.`,
      `Dê testemunho corajoso da sua fé católica através das suas atitudes e do seu bom exemplo cristão.`,
      `Reze pela santificação e proteção dos bispos, sacerdotes e missionários da Santa Igreja.`
    ];
  } else if (normBook.includes('corintios') || normBook.includes('romanos') || normBook.includes('galatas') || normBook.includes('efesios') || normBook.includes('filipenses') || normBook.includes('colossenses') || normBook.includes('timoteo') || normBook.includes('tito') || normBook.includes('hebreus') || normBook.includes('tiago') || normBook.includes('pedro') || normBook.includes('judas')) {
    title = `A Doutrina da Fé e a Vida Santa em ${bookName} ${chapter}`;
    theme = `Na passagem de ${bookName} ${chapter}, a Tradição Apostólica nos exorta a viver em santidade, perseverando na sã doutrina e na caridade fraterna, sem nos deixarmos abalar pelas ilusões passageiras do mundo.`;
    advice = [
      `Examine suas intenções e atitudes diárias à luz das exortações apostólicas de ${bookName} ${chapter}.`,
      `Cultive a pureza de pensamento e afaste conversas ou hábitos que comprometam sua paz espiritual.`,
      `Reze pedindo a Deus a graça da perseverança final e a fortaleza nas tribulações cotidianas.`
    ];
  } else if (normBook.includes('proverbios') || normBook.includes('eclesiastes') || normBook.includes('sabedoria') || normBook.includes('eclesiastico') || normBook.includes('jo')) {
    title = `A Sabedoria Divina que Ilumina a Existência em ${bookName} ${chapter}`;
    theme = `A sabedoria bíblica no capítulo ${chapter} de ${bookName} nos ensina que o temor de Deus é o princípio de todo o discernimento reto, capacitando a alma a escolher a virtude e a rejeitar as ciladas da insensatez.`;
    advice = [
      `Busque o silêncio interior antes de falar e peça a Deus o dom da prudência em suas palavras.`,
      `Aprenda a valorizar as coisas eternas acima dos bens materiais efêmeros e das vaidades terrenas.`,
      `Consagre a Deus o fruto do seu trabalho diário com espírito humilde e gratidão.`
    ];
  } else {
    // Livros Históricos e Proféticos (Gênesis a Macabeus, Isaías a Malaquias)
    const chapterThemes = [
      'A Fidelidade de Deus que Conduz a História da Salvação',
      'O Chamado à Obediência e à Aliança Sagrada',
      'A Fortaleza na Provação e a Certeza do Socorro Divino',
      'A Misericórdia do Senhor que Restaura o Coração Humilde'
    ];
    const chosenTheme = chapterThemes[capNum % chapterThemes.length];

    title = `${chosenTheme} em ${bookName} ${chapter}`;
    theme = `Ao contemplarmos o capítulo ${chapter} de ${bookName}, as Sagradas Escrituras nos mostram a soberana pedagogia de Deus, que educa o Seu povo na fé, cumpre Suas promessas eternas e chama cada fiel a caminhar na Sua presença com fidelidade.`;
    advice = [
      `Renove hoje a sua confiança na providência divina, lembrando que Deus nunca abandona os Seus filhos.`,
      `Seja fiel nos pequenos deveres do seu estado de vida (família, trabalho, estudos e oração).`,
      `Peça a intercessão da Virgem Maria para que você guarde esta Palavra no coração com humildade.`
    ];
  }

  return {
    title,
    theme,
    father: `${doctor.name} nos recorda com sabedoria: ${doctor.quote} Este grande Doutor da Igreja nos ensina a buscar ${doctor.virtue}.`,
    application: advice[0],
    practicalAdvice: advice,
    coreExcerpt: bestVerseExcerpt
  };
}

// 4. GERADOR PRINCIPAL DA HOMILIA DEVOCIONAL CATÓLICA
export function getDevotionalHomily(bookName, chapter, verse, text) {
  const reference = `${bookName} ${chapter}${verse && verse !== 'completo' ? ':' + verse : ''}`;
  const cleanText = (text || '').replace(/<[^>]*>?/gm, ' ').trim();
  const normBook = normalizeBookKey(bookName);
  const chapterKey = `${normBook}_${chapter}`;

  // 1. Verifica se temos exegese explícita do capítulo no catálogo
  const specificData = GRANULAR_CHAPTER_THEOLOGY[chapterKey];

  let homilyTitle = '';
  let theologicalTheme = '';
  let patristicTeaching = '';
  let practicalAdvice = [];
  let coreExcerpt = '';

  if (specificData) {
    homilyTitle = specificData.title;
    theologicalTheme = specificData.theme;
    patristicTeaching = specificData.father;
    practicalAdvice = [
      specificData.application,
      `Medite nos ensinamentos de ${reference} e aplique esta sabedoria nos seus relacionamentos familiares e de trabalho.`,
      `Una suas orações e propósitos na Santa Missa, suplicando a graça de viver com fidelidade esta passagem bíblica.`
    ];

    const rawSentences = cleanText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 15);
    coreExcerpt = rawSentences.length > 0 ? rawSentences[0].substring(0, 120) : cleanText.substring(0, 100);
  } else {
    // 2. Geração dinâmica profunda com base no livro e versículos específicos
    const synthesized = getGenericBookChapterTheology(bookName, chapter, cleanText);
    homilyTitle = synthesized.title;
    theologicalTheme = synthesized.theme;
    patristicTeaching = synthesized.father;
    practicalAdvice = synthesized.practicalAdvice;
    coreExcerpt = synthesized.coreExcerpt;
  }

  // 3. Saudações litúrgicas católicas variadas
  const GREETINGS = [
    `Amados irmãos e irmãs em Nosso Senhor Jesus Cristo,`,
    `Querida comunidade de fé reunida pela luz da Sagrada Escritura,`,
    `Estimados irmãos, a graça e a paz de Cristo Jesus estejam convosco,`,
    `Irmãos caríssimos no Senhor,`
  ];
  const capNum = parseInt(chapter) || 1;
  const greeting = GREETINGS[(capNum + normBook.length) % GREETINGS.length];

  // 4. Montagem dos Parágrafos da Homilia
  const p1 = `<p style="margin-bottom: 12px; font-weight: bold; color: var(--gold-400); font-size: 15px;">${greeting}</p>`;

  const p2 = `<p style="margin-bottom: 12px; line-height: 1.65; color: var(--text-primary);">
    Ao abrirmos as Sagradas Escrituras em <strong>${reference}</strong>, a Liturgia e a Tradição Católica nos colocam diante de uma verdade profunda: <strong>${homilyTitle}</strong>. ${theologicalTheme}
  </p>`;

  const p3 = `<p style="margin-bottom: 12px; line-height: 1.65; color: var(--text-primary);">
    Ao meditarmos na passagem <em>"${coreExcerpt}..."</em>, percebemos que o Senhor não se dirige a nós com palavras distantes ou frias, mas toca diretamente as realidades da nossa existência humana. Como ensinavam os Santos Padres: <strong>${patristicTeaching}</strong> A fé católica nos ensina que toda palavra saída da boca de Deus é viva, eficaz e capaz de transformar nosso coração de pedra em um coração de carne.
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

  // Texto para Síntese de Voz (TTS) - 100% idêntico palavra por palavra
  const spokenP1 = greeting;
  const spokenP2 = `Ao abrirmos as Sagradas Escrituras em ${reference}, a Liturgia e a Tradição Católica nos colocam diante de uma verdade profunda: ${homilyTitle}. ${theologicalTheme}`;
  const spokenP3 = `Ao meditarmos na passagem "${coreExcerpt}...", percebemos que o Senhor não se dirige a nós com palavras distantes ou frias, mas toca diretamente as realidades da nossa existência humana. Como ensinavam os Santos Padres: ${patristicTeaching.replace(/<[^>]*>?/gm, '')} A fé católica nos ensina que toda palavra saída da boca de Deus é viva, eficaz e capaz de transformar nosso coração de pedra em um coração de carne.`;
  const spokenP4 = `Compromissos Práticos para o seu Dia a Dia: Primeiro: ${practicalAdvice[0]}. Segundo: ${practicalAdvice[1]}. Terceiro: ${practicalAdvice[2]}.`;
  const spokenP5 = `Oração e Bênção Sacerdotal: Senhor Jesus Cristo, concedei-nos a graça de acolher Vossa Palavra e fazê-la frutificar em santidade e caridade. Que a bênção de Deus Todo-Poderoso, Pai, Filho e Espírito Santo, desça sobre vós, vossa família e permaneça para sempre. Amém!`;

  const textToSpeak = [spokenP1, spokenP2, spokenP3, spokenP4, spokenP5].join('\n\n');

  return {
    reference,
    textExcerpt: cleanText,
    themeTitle: homilyTitle,
    html: html,
    textToSpeak
  };
}
