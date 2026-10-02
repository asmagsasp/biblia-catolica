/**
 * cartasService.js - Banco de Dados Litúrgico & Teológico das Cartas Apostólicas (Epístolas do NT)
 * Bíblia Sagrada Católica (Edição Ave Maria)
 */

export const CARTAS_APOSTOLICAS = [
  {
    id: 'romanos',
    id_livro: 52,
    nomeCurto: 'Romanos',
    tituloLiturgico: 'Leitura da Carta de São Paulo aos Romanos',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 57–58 d.C. • Corinto (Grécia)',
    destinatario: 'À comunidade dos cristãos em Roma (judeus e gentios convertidos)',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 16,
    icone: 'fa-landmark',
    cor: '#d4af37',
    temaCentral: 'A Justificação pela Fé, a Graça Soberana e a Vida no Espírito',
    proposito: 'Apresentar de forma profunda e sistemática o Evangelho da salvação em Jesus Cristo, revelando que tanto judeus como gentios são justificados não pelas obras da Lei antiga, mas pela graça mediante a fé viva em Cristo.',
    tags: ['amor', 'graça', 'graca', 'fé', 'fe', 'obras', 'obras da lei', 'justificação', 'justificacao', 'esperança', 'esperanca', 'espírito santo', 'espirito santo', 'paz', 'caridade', 'salvação', 'salvacao', 'vida no espirito', 'corpo de cristo', 'renovação', 'paulo', 'são paulo', 'rm', 'rom', 'rm 8', 'rm 12', 'rm 5', 'romanos'],
    passagensDestaque: [
      {
        referencia: 'Romanos 8, 31-39',
        capitulo: 8,
        titulo: 'O Amor Inseparável de Deus em Cristo',
        texto: 'Se Deus é por nós, quem será contra nós? Quem nos separará do amor de Cristo? A tribulação, a angústia, a perseguição, a fome, a nudez, o perigo, a espada? Em todas essas coisas somos mais que vencedores pela virtude daquele que nos amou.'
      },
      {
        referencia: 'Romanos 12, 1-2',
        capitulo: 12,
        titulo: 'O Culto Espiritual e a Renovação da Mente',
        texto: 'Exorto-vos, pois, irmãos, pela misericórdia de Deus, a que ofereçais os vossos corpos em sacrifício vivo, santo e agradável a Deus: este é o vosso culto espiritual. E não vos conformeis com este século, mas transformai-vos pela renovação do vosso espírito.'
      },
      {
        referencia: 'Romanos 5, 1-5',
        capitulo: 5,
        titulo: 'A Paz com Deus e a Esperança que não Engana',
        texto: 'Justificados, pois, pela fé, temos a paz com Deus, por meio de nosso Senhor Jesus Cristo. E a esperança não engana, porque o amor de Deus foi derramado em nossos corações pelo Espírito Santo que nos foi dado.'
      }
    ]
  },
  {
    id: '1corintios',
    id_livro: 53,
    nomeCurto: 'I Coríntios',
    tituloLiturgico: 'Leitura da Primeira Carta de São Paulo aos Coríntios',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 55 d.C. • Éfeso (Ásia Menor)',
    destinatario: 'À Igreja de Deus em Corinto (cidade comercial e portuária da Grécia)',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 16,
    icone: 'fa-heart',
    cor: '#ec4899',
    temaCentral: 'A Unidade da Igreja, a Sagrada Eucaristia, os Carismas e o Hino ao Amor',
    proposito: 'Superar divisões internas na comunidade, instruir sobre a pureza moral cristã, o uso ordenado dos dons do Espírito Santo, a ceia eucarística e a gloriosa certeza da Ressurreição dos mortos.',
    tags: ['amor', 'caridade', 'hino ao amor', 'hino a caridade', 'graça', 'graca', 'fé', 'fe', 'esperança', 'esperanca', 'eucaristia', 'ceia do senhor', 'ressurreição', 'ressurreicao', 'unidade', 'dons', 'carismas', 'corpo de cristo', 'santidade', 'paulo', 'são paulo', '1cor', '1co', '1 cor', '1cor 13', '1cor 11', '1cor 15', 'i corintios', 'corintios'],
    passagensDestaque: [
      {
        referencia: '1 Coríntios 13, 1-13',
        capitulo: 13,
        titulo: 'O Sublime Hino à Caridade (O Amor Maior)',
        texto: 'Ainda que eu falasse as línguas dos homens e dos anjos, se não tiver amor, sou como o bronze que soa. O amor é paciente, é benigno; o amor não é invejoso, não se ufana, não se ensoberbece. O amor jamais acabará. Agora permanecem a fé, a esperança e o amor; mas o maior deles é o amor.'
      },
      {
        referencia: '1 Coríntios 11, 23-26',
        capitulo: 11,
        titulo: 'A Instituição da Sagrada Eucaristia',
        texto: 'Eu recebi do Senhor o que vos transmiti: o Senhor Jesus, na noite em que foi entregue, tomou o pão e, tendo dado graças, partiu-o e disse: Isto é o meu corpo, que é entregue por vós; fazei isto em memória de mim.'
      },
      {
        referencia: '1 Coríntios 15, 54-58',
        capitulo: 15,
        titulo: 'A Vitória sobre a Morte em Cristo',
        texto: 'A morte foi tragada pela vitória! Onde está, ó morte, a tua vitória? Onde está, ó morte, o teu aguilhão? Graças sejam dadas a Deus, que nos dá a vitória por nosso Senhor Jesus Cristo!'
      }
    ]
  },
  {
    id: '2corintios',
    id_livro: 54,
    nomeCurto: 'II Coríntios',
    tituloLiturgico: 'Leitura da Segunda Carta de São Paulo aos Coríntios',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 56 d.C. • Macedônia',
    destinatario: 'À Igreja em Corinto e a todos os santos de toda a Acaia',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 13,
    icone: 'fa-hands-holding-heart',
    cor: '#8b5cf6',
    temaCentral: 'O Ministério da Reconciliação e o Poder de Deus na Fraqueza Humana',
    proposito: 'Expressar a alegria pelo restabelecimento da paz em Corinto, defender a integridade do chamado apostólico e ensinar que a glória e a força do Evangelho brilham precisamente nos vasos de barro da nossa fraqueza.',
    tags: ['graça', 'graca', 'amor', 'fé', 'fe', 'reconciliação', 'reconciliacao', 'fraqueza', 'força de cristo', 'nova criatura', 'generosidade', 'dízimo', 'alegria', 'consolo', 'misericórdia', 'paulo', 'são paulo', '2cor', '2co', '2 cor', '2cor 12', '2cor 5', '2cor 9', 'ii corintios', 'corintios'],
    passagensDestaque: [
      {
        referencia: '2 Coríntios 12, 8-10',
        capitulo: 12,
        titulo: 'A Graça que Basta na Fraqueza',
        texto: 'Ele me disse: Basta-te a minha graça, porque é na fraqueza que a minha força se revela totalmente. De bom grado me gloriarei nas minhas fraquezas, para que habite em mim a força de Cristo. Pois quando sou fraco, é então que sou forte!'
      },
      {
        referencia: '2 Coríntios 5, 17-20',
        capitulo: 5,
        titulo: 'A Nova Criação e o Ministério da Reconciliação',
        texto: 'Se alguém está em Cristo, é uma nova criatura: as coisas antigas passaram, eis que tudo se fez novo. E tudo isso vem de Deus, que nos reconciliou consigo por Cristo e nos confiou o ministério da reconciliação.'
      },
      {
        referencia: '2 Coríntios 9, 6-8',
        capitulo: 9,
        titulo: 'A Generosidade e a Bênção de Deus',
        texto: 'Quem semeia com generosidade, com generosidade também colherá. Dê cada um conforme deliberou em seu coração, não com tristeza ou por constrangimento, pois Deus ama quem dá com alegria.'
      }
    ]
  },
  {
    id: 'galatas',
    id_livro: 55,
    nomeCurto: 'Gálatas',
    tituloLiturgico: 'Leitura da Carta de São Paulo aos Gálatas',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 54–55 d.C. • Éfeso ou Macedônia',
    destinatario: 'Às comunidades cristãs da Galácia (região central da Ásia Menor)',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 6,
    icone: 'fa-dove',
    cor: '#10b981',
    temaCentral: 'A Carta Magna da Liberdade Cristã e os Frutos do Espírito Santo',
    proposito: 'Proclamar com santa firmeza que fomos libertados por Cristo da escravidão da Lei e do pecado. Reafirma que a salvação é puro dom da graça e chama a viver segundo o Espírito na caridade fraterna.',
    tags: ['graça', 'graca', 'fé', 'fe', 'obras', 'obras da lei', 'liberdade cristã', 'liberdade crista', 'frutos do espírito', 'fruto do espirito', 'amor', 'caridade', 'cruz de cristo', 'justificação', 'justificacao', 'filhos de deus', 'paulo', 'são paulo', 'gl', 'gal', 'gl 5', 'gl 2', 'gl 6', 'galatas', 'gálatas'],
    passagensDestaque: [
      {
        referencia: 'Gálatas 5, 22-25',
        capitulo: 5,
        titulo: 'Os Frutos Benditos do Espírito Santo',
        texto: 'O fruto do Espírito é: caridade, alegria, paz, paciência, afabilidade, bondade, fidelidade, brandura, temperança. Contra estas coisas não há lei. Se vivemos pelo Espírito, andemos também segundo o Espírito.'
      },
      {
        referencia: 'Gálatas 2, 19-20',
        capitulo: 2,
        titulo: 'Viver em Cristo Crucificado e Ressuscitado',
        texto: 'Estou crucificado com Cristo. Já não sou eu que vivo, mas é Cristo que vive em mim. A vida que agora vivo na carne, vivo-a na fé no Filho de Deus, que me amou e se entregou por mim.'
      },
      {
        referencia: 'Gálatas 6, 14',
        capitulo: 6,
        titulo: 'A Glória na Cruz de Nosso Senhor',
        texto: 'Quanto a mim, não aconteça que eu me glorie, senão na cruz de nosso Senhor Jesus Cristo, pela qual o mundo está crucificado para mim, e eu para o mundo.'
      }
    ]
  },
  {
    id: 'efesios',
    id_livro: 56,
    nomeCurto: 'Efésios',
    tituloLiturgico: 'Leitura da Carta de São Paulo aos Efésios',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 61–63 d.C. • Prisão em Roma',
    destinatario: 'À Igreja de Éfeso e às comunidades da província da Ásia',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 6,
    icone: 'fa-shield-halved',
    cor: '#3b82f6',
    temaCentral: 'O Mistério da Igreja Corpo de Cristo e a Armadura de Deus',
    proposito: 'Desvendar o desígnio eterno de Deus de reconciliar todas as coisas no Céu e na Terra em Jesus Cristo, convocando as famílias, casais e fiéis a viverem no amor e no santo combate espiritual.',
    tags: ['armadura', 'armadura de deus', 'graça', 'graca', 'fé', 'fe', 'obras', 'boas obras', 'amor', 'unidade', 'corpo de cristo', 'combate espiritual', 'família', 'casamento', 'oração', 'oracao', 'salvação pela graça', 'salvacao', 'igreja', 'paulo', 'são paulo', 'ef', 'efe', 'ef 6', 'ef 2', 'ef 4', 'efesios', 'efésios'],
    passagensDestaque: [
      {
        referencia: 'Efésios 6, 10-18',
        capitulo: 6,
        titulo: 'A Santa Armadura de Deus para o Combate',
        texto: 'Fortalecei-vos no Senhor e na força do seu poder. Revesti-vos da armadura de Deus para que possais resistir às ciladas do demônio. Tomai o escudo da fé, o capacete da salvação e a espada do Espírito, que é a Palavra de Deus.'
      },
      {
        referencia: 'Efésios 2, 4-10',
        capitulo: 2,
        titulo: 'Salvos pela Graça e pela Misericórdia',
        texto: 'Deus, que é rico em misericórdia, pelo grande amor com que nos amou, deu-nos a vida juntamente com Cristo. Pois pela graça fostes salvos, mediante a fé; e isso não vem de vós, é dom de Deus.'
      },
      {
        referencia: 'Efésios 5, 25-32',
        capitulo: 5,
        titulo: 'O Matrimônio como Sacramento da Aliança de Cristo',
        texto: 'Maridos, amai as vossas mulheres, como Cristo amou a Igreja e se entregou por ela. Este mistério é grande; eu o digo em relação a Cristo e à Igreja.'
      }
    ]
  },
  {
    id: 'filipenses',
    id_livro: 57,
    nomeCurto: 'Filipenses',
    tituloLiturgico: 'Leitura da Carta de São Paulo aos Filipenses',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 61–62 d.C. • Prisão em Roma',
    destinatario: 'Aos santos em Cristo Jesus com seus bispos e diáconos em Filipos (Macedônia)',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 4,
    icone: 'fa-sun',
    cor: '#f59e0b',
    temaCentral: 'A Carta da Alegria Cristã e o Sagrado Hino Cristológico',
    proposito: 'Agradecer o carinho constante dos filipenses, encorajando-os à união fraterna, à humildade de Cristo e a uma alegria perene que independe de cadeias ou adversidades externas.',
    tags: ['alegria', 'paz', 'amor', 'graça', 'graca', 'fé', 'fe', 'humildade', 'kenosis', 'hino cristológico', 'tudo posso naquele que me fortalece', 'esperança', 'esperanca', 'perseverança', 'paulo', 'são paulo', 'fp', 'fil', 'fp 4', 'fp 2', 'filipenses'],
    passagensDestaque: [
      {
        referencia: 'Filipenses 4, 4-13',
        capitulo: 4,
        titulo: 'A Alegria no Senhor e a Força da Fé',
        texto: 'Alegrai-vos sempre no Senhor; repito: alegrai-vos! Não vos inquieteis com coisa alguma, mas apresentai vossas orações a Deus. E a paz de Deus guardará os vossos corações. Tudo posso naquele que me fortalece!'
      },
      {
        referencia: 'Filipenses 2, 5-11',
        capitulo: 2,
        titulo: 'O Hino Cristológico do Esvaziamento e Exaltação',
        texto: 'Tende em vós os mesmos sentimentos de Cristo Jesus: Ele, de condição divina, esvaziou-se a si mesmo, tomando a condição de servo. Pelo que Deus o exaltou soberanamente e lhe outorgou o Nome que está acima de todo nome.'
      },
      {
        referencia: 'Filipenses 1, 21',
        capitulo: 1,
        titulo: 'Para mim o Viver é Cristo',
        texto: 'Porque para mim o viver é Cristo, e o morrer é lucro. O que importa é que em tudo Cristo seja engrandecido no meu corpo, quer pela vida, quer pela morte.'
      }
    ]
  },
  {
    id: 'colossenses',
    id_livro: 58,
    nomeCurto: 'Colossenses',
    tituloLiturgico: 'Leitura da Carta de São Paulo aos Colossenses',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 61–63 d.C. • Prisão em Roma',
    destinatario: 'Aos irmãos santos e fiéis em Cristo estabelecidos em Colossos',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 4,
    icone: 'fa-crown',
    cor: '#6366f1',
    temaCentral: 'A Soberania e Primazia Universal de Cristo sobre Toda a Criação',
    proposito: 'Refutar correntes de sincretismo e falsas filosofias, proclamando que em Jesus Cristo reside toda a plenitude da Divindade e que Ele é a cabeça absoluta da Igreja e do Cosmos.',
    tags: ['amor', 'caridade', 'graça', 'graca', 'fé', 'fe', 'primogênito', 'hino a cristo', 'homem novo', 'paz de cristo', 'coisas do alto', 'ressurreição', 'ressurreicao', 'santidade', 'família', 'paulo', 'são paulo', 'cl', 'col', 'cl 3', 'cl 1', 'colossenses'],
    passagensDestaque: [
      {
        referencia: 'Colossenses 1, 15-20',
        capitulo: 1,
        titulo: 'Hino ao Primogênito de Toda a Criação',
        texto: 'Ele é a imagem do Deus invisível, o primogênito de toda a criação; porque nele foram criadas todas as coisas nos céus e na terra. Tudo foi criado por meio dele e para ele. Ele é antes de todas as coisas, e todas as coisas subsistem nele.'
      },
      {
        referencia: 'Colossenses 3, 12-17',
        capitulo: 3,
        titulo: 'O Homem Novo Revestido de Amor e Paz',
        texto: 'Revesti-vos de sincera misericórdia, bondade, humildade, mansidão, paciência. E, acima de tudo, revesti-vos da caridade, que é o vínculo da perfeição. Que a paz de Cristo reine em vossos corações!'
      },
      {
        referencia: 'Colossenses 3, 1-4',
        capitulo: 3,
        titulo: 'Buscai as Coisas do Alto',
        texto: 'Se ressuscitastes com Cristo, buscai as coisas do alto, onde Cristo está sentado à direita de Deus. Afeiçoai-vos às coisas do alto, e não às da terra.'
      }
    ]
  },
  {
    id: '1tessalonicenses',
    id_livro: 59,
    nomeCurto: 'I Tessalonicenses',
    tituloLiturgico: 'Leitura da Primeira Carta de São Paulo aos Tessalonicenses',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 50–51 d.C. • Corinto (O mais antigo documento do NT)',
    destinatario: 'À Igreja dos Tessalonicenses (capital da província romana da Macedônia)',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 5,
    icone: 'fa-clock',
    cor: '#06b6d4',
    temaCentral: 'A Esperança Cristã, a Vigilância Santa e a Vinda Gloriosa do Senhor',
    proposito: 'Instruir e animar a jovem comunidade cristã em tempos de tribulação, trazendo consolação divina a respeito dos fiéis falecidos e conclamando à santidade e à oração incessante.',
    tags: ['esperança', 'esperanca', 'fé', 'fe', 'amor', 'caridade', 'graça', 'graca', 'ressurreição', 'ressurreicao', 'vinda do senhor', 'parusia', 'oração incessante', 'santidade', 'vigilância', 'paulo', 'são paulo', '1ts', '1tes', '1ts 5', '1ts 4', '1 tessalonicenses', 'i tessalonicenses', 'tessalonicenses'],
    passagensDestaque: [
      {
        referencia: '1 Tessalonicenses 5, 16-24',
        capitulo: 5,
        titulo: 'A Regra de Ouro da Vida Cristã',
        texto: 'Estai sempre alegres. Orai sem cessar. Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco. Não extingais o Espírito. O Deus da paz vos santifique totalmente!'
      },
      {
        referencia: '1 Tessalonicenses 4, 13-18',
        capitulo: 4,
        titulo: 'A Esperança na Ressurreição e no Reencontro',
        texto: 'Não queremos que ignoreis a respeito dos que dormem, para não vos entristecerdes como os outros que não têm esperança. Pois, se cremos que Jesus morreu e ressuscitou, assim também Deus trará com Ele os que faleceram em Jesus.'
      }
    ]
  },
  {
    id: '2tessalonicenses',
    id_livro: 60,
    nomeCurto: 'II Tessalonicenses',
    tituloLiturgico: 'Leitura da Segunda Carta de São Paulo aos Tessalonicenses',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 51–52 d.C. • Corinto',
    destinatario: 'À Igreja dos Tessalonicenses',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 3,
    icone: 'fa-shield-heart',
    cor: '#0284c7',
    temaCentral: 'A Firmeza na Verdade, a Vitória sobre o Mal e a Dignidade do Trabalho',
    proposito: 'Esclarecer dúvidas sobre o Dia do Senhor, advertir contra alarmismos e desordens, estimulando os fiéis a perseverarem na oração e a trabalharem dignamente pelo Reino de Deus.',
    tags: ['fé', 'fe', 'amor', 'graça', 'graca', 'perseverança', 'trabalho', 'tradição', 'sagrada tradição', 'vitória sobre o mal', 'firmeza na verdade', 'paulo', 'são paulo', '2ts', '2tes', '2ts 3', '2ts 2', '2 tessalonicenses', 'ii tessalonicenses', 'tessalonicenses'],
    passagensDestaque: [
      {
        referencia: '2 Tessalonicenses 3, 1-5',
        capitulo: 3,
        titulo: 'A Fidelidade do Senhor que nos Guarda',
        texto: 'O Senhor é fiel; Ele vos confirmará e vos guardará do Maligno. Que o Senhor dirija os vossos corações para o amor de Deus e para a constância de Cristo!'
      },
      {
        referencia: '2 Tessalonicenses 2, 13-17',
        capitulo: 2,
        titulo: 'Conservai as Santas Tradições da Fé',
        texto: 'Permanecei firmes e conservai as tradições que vos foram ensinadas, seja por palavra, seja por carta nossa. Que o próprio Jesus Cristo console os vossos corações e os confirme em toda boa obra e palavra.'
      }
    ]
  },
  {
    id: '1timoteo',
    id_livro: 61,
    nomeCurto: 'I Timóteo',
    tituloLiturgico: 'Leitura da Primeira Carta de São Paulo a Timóteo',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 64–65 d.C. • Macedônia',
    destinatario: 'A Timóteo, seu verdadeiro filho na fé e bispo de Éfeso',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 6,
    icone: 'fa-church',
    cor: '#14b8a6',
    temaCentral: 'A Ordem Pastoral da Igreja, a Sã Doutrina e o Bom Combate',
    proposito: 'Orientar o jovem bispo Timóteo na liderança do rebanho, na escolha de presbíteros e diáconos, no valor da oração pública por todos os governantes e no zelo pela sã doutrina católica.',
    tags: ['fé', 'fe', 'amor', 'graça', 'graca', 'caridade', 'bom combate', 'oração universal', 'pastor', 'liderança', 'sã doutrina', 'igreja coluna e fundamento da verdade', 'sacramento da ordem', 'paulo', 'são paulo', '1tm', '1tim', '1tm 2', '1tm 6', '1tm 4', '1 timoteo', 'i timoteo', 'timoteo'],
    passagensDestaque: [
      {
        referencia: '1 Timóteo 2, 1-6',
        capitulo: 2,
        titulo: 'A Vontade Universal de Salvação de Deus',
        texto: 'Recomendo que se façam súplicas, orações e ações de graças por todos os homens e pelas autoridades. Isto é bom e agradável diante de Deus, nosso Salvador, que quer que todos os homens se salvem e cheguem ao conhecimento da verdade.'
      },
      {
        referencia: '1 Timóteo 6, 11-16',
        capitulo: 6,
        titulo: 'Combate o Bom Combate da Fé',
        texto: 'Tu, ó homem de Deus, foge destas coisas e segue a justiça, a piedade, a fé, a caridade, a paciência, a mansidão. Combate o bom combate da fé, conquista a vida eterna para a qual foste chamado!'
      },
      {
        referencia: '1 Timóteo 4, 12-16',
        capitulo: 4,
        titulo: 'O Exemplo do Pastor de Almas',
        texto: 'Ninguém te despreze por seres jovem; sê o modelo dos fiéis na palavra, na conduta, no amor, na fé, na pureza. Aplica-te à leitura, à exortação, ao ensino.'
      }
    ]
  },
  {
    id: '2timoteo',
    id_livro: 62,
    nomeCurto: 'II Timóteo',
    tituloLiturgico: 'Leitura da Segunda Carta de São Paulo a Timóteo',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 67 d.C. • Segunda Prisão em Roma (O Testamento Espiritual de Paulo)',
    destinatario: 'A Timóteo, seu caríssimo filho espiritual',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 4,
    icone: 'fa-medal',
    cor: '#e11d48',
    temaCentral: 'O Testamento de Fé do Apóstolo, a Coragem e a Coroa da Justiça',
    proposito: 'Comovente testamento espiritual de São Paulo às vésperas de seu martírio em Roma, transmitindo a tocha da fé a Timóteo e testemunhando a gloriosa fidelidade a Cristo até o fim.',
    tags: ['fé', 'fe', 'amor', 'graça', 'graca', 'bom combate', 'coroa da justiça', 'sagrada escritura', 'inspirada por deus', 'fortaleza', 'martírio', 'fidelidade', 'testamento espiritual', 'paulo', 'são paulo', '2tm', '2tim', '2tm 4', '2tm 1', '2tm 3', '2 timoteo', 'ii timoteo', 'timoteo'],
    passagensDestaque: [
      {
        referencia: '2 Timóteo 4, 6-8',
        capitulo: 4,
        titulo: 'O Bom Combate e a Coroa da Vitória',
        texto: 'Quanto a mim, o meu sangue já está sendo derramado em libação, e o tempo da minha partida é chegado. Combati o bom combate, terminei a corrida, guardei a fé. Desde agora me está guardada a coroa da justiça, que o Senhor me dará naquele Dia!'
      },
      {
        referencia: '2 Timóteo 1, 6-8',
        capitulo: 1,
        titulo: 'O Espírito de Fortaleza e Amor',
        texto: 'Por este motivo, exorto-te a que reavives o dom de Deus que há em ti pela imposição das minhas mãos. Pois Deus não nos deu um espírito de timidez, mas de fortaleza, de amor e de moderação.'
      },
      {
        referencia: '2 Timóteo 3, 14-17',
        capitulo: 3,
        titulo: 'A Sagrada Escritura Inspirada por Deus',
        texto: 'Toda a Escritura é inspirada por Deus e útil para ensinar, para repreender, para corrigir e para formar na justiça, a fim de que o homem de Deus seja perfeito e apto para toda boa obra.'
      }
    ]
  },
  {
    id: 'tito',
    id_livro: 63,
    nomeCurto: 'Tito',
    tituloLiturgico: 'Leitura da Carta de São Paulo a Tito',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 64–65 d.C. • Nicópolis',
    destinatario: 'A Tito, seu companheiro leal e bispo da ilha de Creta',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 3,
    icone: 'fa-award',
    cor: '#059669',
    temaCentral: 'A Graça Manifestada, a Liderança Pastoral e a Prática das Boas Obras',
    proposito: 'Orientar o bispo Tito na estruturação das igrejas locais de Creta, ensinando a conduta exemplar das famílias cristãs e recordando a manifestação do amor salvador de Deus.',
    tags: ['graça', 'graca', 'obras', 'boas obras', 'amor', 'fé', 'fe', 'esperança', 'esperanca', 'salvação', 'salvacao', 'batismo', 'regeneração', 'vida santa', 'família', 'paulo', 'são paulo', 'tt', 'tit', 'tt 2', 'tt 3', 'tito'],
    passagensDestaque: [
      {
        referencia: 'Tito 2, 11-14',
        capitulo: 2,
        titulo: 'A Graça de Deus Fonte de Salvação',
        texto: 'Manifestou-se a graça de Deus, fonte de salvação para todos os homens, ensinando-nos a renunciar à impiedade e a viver neste mundo com temperança, justiça e piedade, enquanto aguardamos a feliz esperança e a manifestação da glória de nosso grande Deus e Salvador, Jesus Cristo.'
      },
      {
        referencia: 'Tito 3, 4-7',
        capitulo: 3,
        titulo: 'Salvos pelo Banho de Regeneração do Espírito',
        texto: 'Quando se manifestou a bondade de Deus, nosso Salvador, e o seu amor para com os homens, Ele nos salvou não pelas obras de justiça que tivéssemos feito, mas segundo a sua misericórdia, pelo banho de regeneração e renovação do Espírito Santo.'
      }
    ]
  },
  {
    id: 'filemon',
    id_livro: 64,
    nomeCurto: 'Filemon',
    tituloLiturgico: 'Leitura da Carta de São Paulo a Filemon',
    autor: 'São Paulo Apóstolo',
    apostolo: 'São Paulo',
    anoLocal: 'c. 61–63 d.C. • Prisão em Roma',
    destinatario: 'A Filemon, caríssimo colaborador, e à Igreja reunida em sua casa em Colossos',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo',
    totalCapitulos: 1,
    icone: 'fa-handshake-angle',
    cor: '#a855f7',
    temaCentral: 'O Perdão Evangélico, a Reconciliação e a Fraternidade em Cristo',
    proposito: 'Interceder com comovente ternura pelo escravo fugitivo Onésimo, pedindo a Filemon que o acolha não mais como escravo, mas como um irmão amadíssimo em Cristo.',
    tags: ['amor', 'perdão', 'perdao', 'fraternidade', 'reconciliação', 'reconciliacao', 'irmão amado', 'liberdade', 'caridade', 'paulo', 'são paulo', 'fm', 'flm', 'fm 1', 'filemon', 'filêmon'],
    passagensDestaque: [
      {
        referencia: 'Filemon 1, 15-17',
        capitulo: 1,
        titulo: 'Acolher como um Irmão Amadíssimo',
        texto: 'Talvez ele se tenha afastado de ti por algum tempo precisamente para que o recuperasses para sempre, já não como escravo, mas muito mais que escravo: como um irmão caríssimo. Se me tens como irmão, acolhe-o como a mim mesmo.'
      }
    ]
  },
  {
    id: 'hebreus',
    id_livro: 65,
    nomeCurto: 'Hebreus',
    tituloLiturgico: 'Leitura da Carta aos Hebreus',
    autor: 'Tradição Apostólica / Círculo Paulino',
    apostolo: 'Tradição Apostólica',
    anoLocal: 'c. 64–68 d.C. • Roma ou Jerusalém',
    destinatario: 'Aos cristãos de origem judaica tentados a recuar na fé sob provações',
    categoria: 'paulinas',
    categoriaNome: 'Cartas de São Paulo e Círculo Paulino',
    totalCapitulos: 13,
    icone: 'fa-cross',
    cor: '#ea580c',
    temaCentral: 'O Eterno Sumo Sacerdócio de Jesus Cristo e a Grandeza da Nova Aliança',
    proposito: 'Demonstrar a glória e perfeição insuperáveis do sacrifício único de Cristo sobre os antigos rituais levíticos, exortando os fiéis a correrem com perseverança a corrida da fé.',
    tags: ['fé', 'fe', 'heróis da fé', 'graça', 'graca', 'trono da graça', 'esperança', 'esperanca', 'sacerdócio de cristo', 'sumo sacerdote', 'nova aliança', 'sacrifício de cristo', 'altar', 'eucaristia', 'fidelidade', 'hebreus', 'hb', 'heb', 'hb 11', 'hb 4', 'hb 12', 'hb 13'],
    passagensDestaque: [
      {
        referencia: 'Hebreus 11, 1-6',
        capitulo: 11,
        titulo: 'A Definição e a Glória da Santa Fé',
        texto: 'A fé é a garantia dos bens que se esperam, a certeza das realidades que não se veem. Sem fé é impossível agradar a Deus; pois quem dele se aproxima deve crer que Ele existe e recompensa os que o procuram.'
      },
      {
        referencia: 'Hebreus 4, 14-16',
        capitulo: 4,
        titulo: 'O Sumo Sacerdote Compassivo e o Trono da Graça',
        texto: 'Tendo um grande Sumo Sacerdote que penetrou os céus, Jesus, o Filho de Deus, conservemos firme a nossa fé. Pois não temos um sumo sacerdote incapaz de compadecer-se de nossas fraquezas. Aproximemo-nos, pois, confiadamente do trono da graça!'
      },
      {
        referencia: 'Hebreus 12, 1-3',
        capitulo: 12,
        titulo: 'Os Olhos Fixos em Jesus, Autor da Fé',
        texto: 'Rodeados por tão grande nuvem de testemunhas, corramos com perseverança a corrida que nos é proposta, com os olhos fixos em Jesus, autor e consumador da nossa fé.'
      },
      {
        referencia: 'Hebreus 13, 8',
        capitulo: 13,
        titulo: 'A Fidelidade Imutável de Cristo',
        texto: 'Jesus Cristo é o mesmo, ontem, hoje e por toda a eternidade.'
      }
    ]
  },
  {
    id: 'sao_tiago',
    id_livro: 66,
    nomeCurto: 'São Tiago',
    tituloLiturgico: 'Leitura da Carta de São Tiago',
    autor: 'São Tiago Apóstolo (O Justo, Bispo de Jerusalém)',
    apostolo: 'São Tiago',
    anoLocal: 'c. 58–62 d.C. • Jerusalém',
    destinatario: 'Às doze tribos da dispersão (à Igreja Católica Universal)',
    categoria: 'catolicas',
    categoriaNome: 'Cartas Católicas / Universais',
    totalCapitulos: 5,
    icone: 'fa-scale-balanced',
    cor: '#10b981',
    temaCentral: 'A Fé Viva Traduzida em Obras, a Sabedoria do Céu e a Oração dos Enfermos',
    proposito: 'Ensinar com autoridade prática que a fé sem as obras de misericórdia é morta em si mesma, instruindo sobre a santificação da língua, o socorro aos pobres e o sacramento da Unção dos Enfermos.',
    tags: ['obras', 'fé e obras', 'fe sem obras e morta', 'fé', 'fe', 'graça', 'graca', 'oração', 'oracao', 'unção dos enfermos', 'uncao dos enfermos', 'sabedoria', 'justiça', 'pobres', 'misericórdia', 'controle da língua', 'praticantes da palavra', 'tiago', 'são tiago', 'sao tiago', 'tg', 'tia', 'tg 2', 'tg 5', 'tg 1'],
    passagensDestaque: [
      {
        referencia: 'São Tiago 2, 14-26',
        capitulo: 2,
        titulo: 'A Fé que se Revela pelas Obras',
        texto: 'De que aproveitará, irmãos meus, se alguém disser que tem fé, e não tiver obras? Poderá a fé salvá-lo? Assim também a fé, se não tiver obras, está morta em si mesma. Mostra-me a tua fé sem as obras, e eu te mostrarei a minha fé pelas minhas obras!'
      },
      {
        referencia: 'São Tiago 5, 13-16',
        capitulo: 5,
        titulo: 'A Unção dos Enfermos e a Força da Oração',
        texto: 'Está alguém entre vós enfermo? Chame os presbíteros da Igreja, e estes orem sobre ele, ungindo-o com óleo em nome do Senhor. A oração da fé salvará o enfermo e o Senhor o restabelecerá; e, se tiver cometido pecados, ser-lhe-ão perdoados.'
      },
      {
        referencia: 'São Tiago 1, 22-25',
        capitulo: 1,
        titulo: 'Praticantes da Palavra e não Apenas Ouvintes',
        texto: 'Sede praticantes da Palavra e não apenas ouvintes, enganando-vos a vós mesmos. Aquele que põe os olhos na Lei perfeita da liberdade e nela persevera, esse será feliz no que fizer.'
      }
    ]
  },
  {
    id: '1sao_pedro',
    id_livro: 67,
    nomeCurto: 'I São Pedro',
    tituloLiturgico: 'Leitura da Primeira Carta de São Pedro',
    autor: 'São Pedro Apóstolo (O Príncipe dos Apóstolos)',
    apostolo: 'São Pedro',
    anoLocal: 'c. 63–64 d.C. • Roma ("Babilônia")',
    destinatario: 'Aos eleitos e peregrinos espalhados pelo Ponto, Galácia, Capadócia, Ásia e Bitínia',
    categoria: 'catolicas',
    categoriaNome: 'Cartas Católicas / Universais',
    totalCapitulos: 5,
    icone: 'fa-key',
    cor: '#d97706',
    temaCentral: 'A Esperança Viva, o Povo Escolhido e o Sacerdócio Real dos Fiéis',
    proposito: 'Confortar e animar os cristãos perseguidos pelo Império, recordando que foram resgatados pelo Sangue precioso de Cristo e chamados a ser sal, luz e nação santa.',
    tags: ['esperança', 'esperanca', 'esperança viva', 'fé', 'fe', 'amor', 'caridade', 'povo de deus', 'sacerdócio régio', 'sangue de cristo', 'ansiedade', 'humildade', 'sofrimento e vitória', 'salvação', 'pedro', 'são pedro', 'sao pedro', '1pe', '1pd', '1ped', '1pe 2', '1pe 5', '1pe 1', '1 pedro', 'i sao pedro'],
    passagensDestaque: [
      {
        referencia: '1 São Pedro 2, 9-10',
        capitulo: 2,
        titulo: 'O Povo Adquirido e o Sacerdócio Real',
        texto: 'Vós sois a raça eleita, o sacerdócio real, a nação santa, o povo adquirido por Deus, para anunciar as grandezas daquele que vos chamou das trevas para a sua luz admirável. Vós que outrora não éreis povo, agora sois o Povo de Deus!'
      },
      {
        referencia: '1 São Pedro 5, 6-11',
        capitulo: 5,
        titulo: 'Lançar a Ansiedade sobre o Senhor que Cuida de Nós',
        texto: 'Humilhai-vos sob a poderosa mão de Deus, para que no tempo oportuno Ele vos exalte. Lançai sobre Ele toda a vossa ansiedade, porque Ele tem cuidado de vós. Sede sóbrios e vigilantes!'
      },
      {
        referencia: '1 São Pedro 1, 3-9',
        capitulo: 1,
        titulo: 'A Esperança Viva pela Ressurreição',
        texto: 'Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo que, segundo a sua grande misericórdia, nos regenerou para uma viva esperança, pela ressurreição de Jesus Cristo dentre os mortos!'
      }
    ]
  },
  {
    id: '2sao_pedro',
    id_livro: 68,
    nomeCurto: 'II São Pedro',
    tituloLiturgico: 'Leitura da Segunda Carta de São Pedro',
    autor: 'São Pedro Apóstolo',
    apostolo: 'São Pedro',
    anoLocal: 'c. 66–67 d.C. • Roma (Pouco antes de seu martírio)',
    destinatario: 'A todos os que pela justiça de Deus receberam uma fé igualmente preciosa',
    categoria: 'catolicas',
    categoriaNome: 'Cartas Católicas / Universais',
    totalCapitulos: 3,
    icone: 'fa-anchor',
    cor: '#0284c7',
    temaCentral: 'A Participação na Natureza Divina e a Esperança de Novos Céus e Nova Terra',
    proposito: 'Exortar ao constante crescimento espiritual nas virtudes, advertir contra falsos mestres e reafirmar com autoridade a fidelidade de Deus que prepara novos céus e nova terra.',
    tags: ['fé', 'fe', 'natureza divina', 'novos céus e nova terra', 'esperança', 'esperanca', 'virtudes', 'crescimento espiritual', 'paciência de deus', 'vigilância', 'sã doutrina', 'pedro', 'são pedro', 'sao pedro', '2pe', '2pd', '2ped', '2pe 1', '2pe 3', '2 pedro', 'ii sao pedro'],
    passagensDestaque: [
      {
        referencia: '2 São Pedro 1, 3-8',
        capitulo: 1,
        titulo: 'Participantes da Própria Natureza Divina',
        texto: 'Pelo seu divino poder nos foram doadas todas as coisas que conduzem à vida e à piedade. Por elas Ele nos deu as preciosas e grandiosas promessas, para que por elas vos tornásseis participantes da natureza divina.'
      },
      {
        referencia: '2 São Pedro 3, 8-13',
        capitulo: 3,
        titulo: 'A Paciência de Deus e os Novos Céus',
        texto: 'Para o Senhor um dia é como mil anos, e mil anos como um dia. O Senhor não retarda a sua promessa; Ele é paciente para convosco, não querendo que ninguém pereça, mas que todos venham a converter-se. Esperamos novos céus e uma nova terra, onde habitará a justiça!'
      }
    ]
  },
  {
    id: '1sao_joao',
    id_livro: 69,
    nomeCurto: 'I São João',
    tituloLiturgico: 'Leitura da Primeira Carta de São João',
    autor: 'São João Apóstolo e Evangelista (O Discípulo Amado)',
    apostolo: 'São João',
    anoLocal: 'c. 90–95 d.C. • Éfeso',
    destinatario: 'Às comunidades cristãs da Ásia Menor e a toda a Igreja',
    categoria: 'catolicas',
    categoriaNome: 'Cartas Católicas / Universais',
    totalCapitulos: 5,
    icone: 'fa-heart-circle-check',
    cor: '#e11d48',
    temaCentral: 'Deus é Amor (Deus Caritas Est), a Luz Divina e a Comunhão Fraterna',
    proposito: 'Proclamar com unção suprema que Deus é Amor e Luz. Ensinar que a verdadeira comunhão com Deus se comprova no amor concreto aos irmãos e na guarda dos santos mandamentos.',
    tags: ['amor', 'deus é amor', 'deus caritas est', 'caridade', 'mandamento do amor', 'fé', 'fe', 'luz divina', 'filhos de deus', 'comunhão', 'perdão', 'sangue purificador', 'joão', 'são joão', 'sao joao', '1jo', '1jo 4', '1jo 3', '1jo 1', '1 joao', 'i sao joao'],
    passagensDestaque: [
      {
        referencia: '1 São João 4, 7-16',
        capitulo: 4,
        titulo: 'Deus é Amor (Deus Caritas Est)',
        texto: 'Amados, amemo-nos uns aos outros, porque o amor é de Deus; e todo o que ama é nascido de Deus e conhece a Deus. Aquele que não ama não conhece a Deus, porque Deus é amor. No amor não há temor; o perfeito amor lança fora todo o temor.'
      },
      {
        referencia: '1 São João 3, 1-2',
        capitulo: 3,
        titulo: 'Vede que Amor o Pai nos Deu: Filhos de Deus!',
        texto: 'Vede que grande amor o Pai nos concedeu: sermos chamados filhos de Deus! E nós o somos! Amados, agora somos filhos de Deus, e ainda não se manifestou o que havemos de ser. Sabemos que, quando Ele se manifestar, seremos semelhantes a Ele, porque o veremos tal como Ele é.'
      },
      {
        referencia: '1 São João 1, 5-9',
        capitulo: 1,
        titulo: 'Deus é Luz e o Sangue de Jesus nos Purifica',
        texto: 'Deus é luz, e nele não há treva alguma. Se dissermos que estamos em comunhão com Ele e andamos nas trevas, mentimos e não praticamos a verdade. Mas se andamos na luz, temos comunhão uns com os outros e o Sangue de Jesus nos purifica de todo pecado.'
      }
    ]
  },
  {
    id: '2sao_joao',
    id_livro: 70,
    nomeCurto: 'II São João',
    tituloLiturgico: 'Leitura da Segunda Carta de São João',
    autor: 'São João Apóstolo ("O Ancião")',
    apostolo: 'São João',
    anoLocal: 'c. 90–95 d.C. • Éfeso',
    destinatario: 'À Senhora Eleita e aos seus filhos (à Igreja e aos seus fiéis)',
    categoria: 'catolicas',
    categoriaNome: 'Cartas Católicas / Universais',
    totalCapitulos: 1,
    icone: 'fa-envelope-open-text',
    cor: '#ec4899',
    temaCentral: 'A Verdade e o Mandamento do Amor Mútuo',
    proposito: 'Exortar a comunidade a perseverar no mandamento original de Jesus: amar uns aos outros e permanecer firmes na doutrina verdadeira da Encarnação do Filho de Deus.',
    tags: ['amor', 'mandamento do amor', 'amor mútuo', 'fé', 'fe', 'verdade', 'encarnação de cristo', 'joão', 'são joão', 'sao joao', '2jo', '2jo 1', '2 joao', 'ii sao joao'],
    passagensDestaque: [
      {
        referencia: '2 São João 1, 5-6',
        capitulo: 1,
        titulo: 'O Mandamento do Amor Mútuo',
        texto: 'E agora peço-te, Senhora, não como quem te escreve um novo mandamento, mas aquele que tivemos desde o princípio: que nos amemos uns aos outros. E nisto consiste o amor: em andarmos segundo os seus mandamentos.'
      }
    ]
  },
  {
    id: '3sao_joao',
    id_livro: 71,
    nomeCurto: 'III São João',
    tituloLiturgico: 'Leitura da Terceira Carta de São João',
    autor: 'São João Apóstolo ("O Ancião")',
    apostolo: 'São João',
    anoLocal: 'c. 90–95 d.C. • Éfeso',
    destinatario: 'Ao caríssimo Gaio, a quem amo na verdade',
    categoria: 'catolicas',
    categoriaNome: 'Cartas Católicas / Universais',
    totalCapitulos: 1,
    icone: 'fa-user-check',
    cor: '#8b5cf6',
    temaCentral: 'A Hospitalidade Cristã, a Fidelidade e o Bom Exemplo',
    proposito: 'Elogiar Gaio pelo acolhimento caloroso aos missionários e obreiros da fé, recordando que quem pratica o bem é de Deus e glorifica a Igreja.',
    tags: ['hospitalidade', 'amor', 'verdade', 'bom testemunho', 'fazer o bem', 'fidelidade', 'joão', 'são joão', 'sao joao', '3jo', '3jo 1', '3 joao', 'iii sao joao'],
    passagensDestaque: [
      {
        referencia: '3 São João 1, 11',
        capitulo: 1,
        titulo: 'Imitar o Bem que Vem de Deus',
        texto: 'Caríssimo, não imites o mal, mas o bem. Aquele que faz o bem é de Deus; aquele que faz o mal não viu a Deus.'
      }
    ]
  },
  {
    id: 'sao_judas',
    id_livro: 72,
    nomeCurto: 'São Judas',
    tituloLiturgico: 'Leitura da Carta de São Judas',
    autor: 'São Judas Tadeu Apóstolo (O Apóstolo das Causas Impossíveis)',
    apostolo: 'São Judas Tadeu',
    anoLocal: 'c. 65–70 d.C. • Judeia / Palestina',
    destinatario: 'Aos chamados e amados em Deus Pai e guardados para Jesus Cristo',
    categoria: 'catolicas',
    categoriaNome: 'Cartas Católicas / Universais',
    totalCapitulos: 1,
    icone: 'fa-shield-halved',
    cor: '#10b981',
    temaCentral: 'A Batalha pela Fé Católica e a Soberana Doxologia a Deus',
    proposito: 'Exortar com zelo ardente à preservação da fé transmitida de uma vez por todas aos santos, confiando naquele que é poderoso para nos guardar de qualquer tropeço.',
    tags: ['fé', 'fe', 'combate pela fé', 'santíssima fé', 'oração no espírito santo', 'amor de deus', 'doxologia', 'majestade e poder', 'guarda contra tropeços', 'judas', 'são judas', 'sao judas', 'são judas tadeu', 'judas tadeu', 'jd', 'jud', 'jd 1'],
    passagensDestaque: [
      {
        referencia: 'São Judas 1, 20-25',
        capitulo: 1,
        titulo: 'A Doxologia e a Oração no Espírito Santo',
        texto: 'Vós, porém, amados, edificando-vos sobre a vossa santíssima fé, orando no Espírito Santo, conservai-vos no amor de Deus, aguardando a misericórdia de nosso Senhor Jesus Cristo para a vida eterna. Àquele que é poderoso para vos guardar de todo tropeço... seja a glória, a majestade, o império e o poder!'
      }
    ]
  }
];

export function getCartasPorCategoria(cat = 'todas') {
  if (cat === 'paulinas') {
    return CARTAS_APOSTOLICAS.filter(c => c.categoria === 'paulinas');
  }
  if (cat === 'catolicas') {
    return CARTAS_APOSTOLICAS.filter(c => c.categoria === 'catolicas');
  }
  return CARTAS_APOSTOLICAS;
}

export function getCartaPorId(id) {
  return CARTAS_APOSTOLICAS.find(c => c.id === id || String(c.id_livro) === String(id));
}
