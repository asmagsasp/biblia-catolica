// src/mariaService.js
// Base de dados católica completa e profunda sobre Devoção à Santíssima Virgem Maria

export const MARIA_TITULOS = [
  {
    id: 'aparecida',
    nome: 'Nossa Senhora Aparecida',
    subtitulo: 'Rainha e Padroeira do Brasil',
    categoria: 'aparicoes',
    dataFesta: '12 de Outubro',
    icone: 'fa-crown',
    cor: '#d4af37',
    tags: ['brasil', 'padroeira', 'milagres', 'protecao', 'familia', 'rio paraiba', 'pescadores', 'aparecida'],
    localAno: 'Rio Paraíba do Sul (SP), Brasil — 1717',
    citacaoBiblica: '“E a mãe de Jesus disse aos que serviam: Fazei tudo o que Ele vos disser.” (Jo 2, 5)',
    historia: `No mês de outubro de 1717, três humildes pescadores — Domingos Garcia, Filipe Pedroso e João Alves — navegavam pelas águas do Rio Paraíba do Sul com a missão de conseguir peixes para o banquete do Conde de Assumar, Governador das capitanias de São Paulo e Minas de Ouro.
    
Após horas sem pescar nada, lançaram a rede no Porto de Itaguaçu e puxaram o corpo de uma pequena imagem de terracota da Imaculada Conceição, sem a cabeça. Ao lançarem a rede mais adiante, recolheram a cabeça da imagem. Em seguida, as redes se encheram de tal abundância de peixes que os barcos quase afundaram.

Em 1930, o Papa Pio XI proclamou solenemente Nossa Senhora Aparecida como Rainha e Padroeira Principal do Brasil. Seu Santuário Nacional em Aparecida/SP é o maior templo mariano do mundo.`,
    mensagem: `A Virgem Aparecida nos ensina a humildade, o acolhimento dos pequenos e a confiança inabalável em Deus nos momentos de escassez e dificuldade.`,
    oracao: `Ó incomparável Senhora da Conceição Aparecida, Mãe de Deus e minha Mãe, volvei sobre o Brasil e sobre cada um de nós os vossos olhos misericordiosos.

Protegei as nossas famílias, amparai os enfermos, iluminai os governantes e guiai a Santa Igreja. Alcançai-nos de vosso amado Filho Jesus a graça da fidelidade, a paz nos lares e a salvação eterna.

Nossa Senhora Aparecida, Padroeira do Brasil, rogai por nós! Amém.`
  },
  {
    id: 'fatima',
    nome: 'Nossa Senhora de Fátima',
    subtitulo: 'Nossa Senhora do Rosário',
    categoria: 'aparicoes',
    dataFesta: '13 de Maio',
    icone: 'fa-dove',
    cor: '#38bdf8',
    tags: ['fatima', 'portugal', 'rosario', 'terco', 'oracao', 'pastorinhos', 'conversao', 'paz', 'segredo'],
    localAno: 'Cova da Iria, Fátima, Portugal — 1917',
    citacaoBiblica: '“Rezai o Terço todos os dias para alcançar a paz para o mundo e o fim da guerra.” (Mensagem de Fátima)',
    historia: `Entre 13 de maio e 13 de outubro de 1917, a Santíssima Virgem Maria apareceu seis vezes a três pastorinhos — Lúcia de Jesus (10 anos), Francisco Marto (9 anos) e Jacinta Marto (7 anos) — sobre uma pequena azinheira na Cova da Iria, em Portugal.

Na última aparição, em 13 de outubro de 1917, diante de uma multidão de mais de 70.000 pessoas sob forte chuva, ocorreu o extraordinário "Milagre do Sol", testemunhado inclusive por jornalistas e céticos da época: o Sol girou no firmamento como uma roda de fogo e desceu em zigue-zague em direção à Terra.

A Virgem revelou-se como "A Senhora do Rosário" e pediu oração, penitência pela conversão dos pecadores e consagração do mundo ao seu Imaculado Coração.`,
    mensagem: `Fátima é um apelo urgente de Mãe: a oração diária do Santo Terço, a conversão do coração, a reparação dos pecados e a certeza de que "Por fim, o meu Imaculado Coração triunfará!".`,
    oracao: `Santíssima Virgem de Fátima, que na Cova da Iria vos dignastes revelar aos três pastorinhos os tesouros de graças contidos na oração do Santo Rosário, infundi em nossa alma um profundo amor a esta santa devoção.

Para que, meditando os mistérios da Redenção de vosso divino Filho, alcancemos as graças que com fervor vos pedimos, a paz no mundo, a conversão dos pecadores e a salvação de nossas almas.

Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem.

Nossa Senhora do Rosário de Fátima, rogai por nós! Amém.`
  },
  {
    id: 'guadalupe',
    nome: 'Nossa Senhora de Guadalupe',
    subtitulo: 'Estrela da Evangelização & Padroeira da América Latina',
    categoria: 'aparicoes',
    dataFesta: '12 de Dezembro',
    icone: 'fa-sun',
    cor: '#10b981',
    tags: ['guadalupe', 'mexico', 'america latina', 'juan diego', 'manto', 'tilma', 'evangelizacao', 'vida', 'familia'],
    localAno: 'Monte Tepeyac, Cidade do México — 1531',
    citacaoBiblica: '“Não estou eu aqui, que sou tua Mãe? Não estás sob a minha sombra e proteção?” (Palavras da Virgem a Juan Diego)',
    historia: `Em dezembro de 1531, a Virgem Maria apareceu no Monte Tepeyac ao humilde indígena São Juan Diego Cuauhtlatoatzin. A Virgem pediu que fosse construído um templo naquele local para manifestar todo o amor e compaixão de Deus.

O bispo Dom Frei Juan de Zumárraga pediu um sinal divino. A Virgem orientou Juan Diego a subir ao topo árido da colina no inverno, onde ele encontrou milagrosamente rosas de Castela frescas e perfumadas.

Ao abrir sua tilma (manto de fibra de cacto) diante do bispo para entregar as rosas, a imagem sagrada e radiante de Nossa Senhora de Guadalupe apareceu milagrosamente estampada no tecido. A tilma permanece intacta há quase 500 anos, desafiando todas as leis da ciência.

O Papa São João Paulo II proclamou Nossa Senhora de Guadalupe como Padroeira de toda a América e Estrela da Primeira e Nova Evangelização.`,
    mensagem: `Maria se apresenta como a Mãe carinhosa que consola os aflitos, defende os pequeninos e protege a sacralidade de toda vida humana desde o ventre materno.`,
    oracao: `Ó Virgem Imaculada de Guadalupe, Mãe do verdadeiro Deus por quem se vive! Vós que, com ternura de Mãe, ouvistes as súplicas do vosso servo São Juan Diego, acolhei as nossas orações.

Guardai a fé de nossas famílias, defendei os nascituros e os inocentes, abençoai o nosso continente latino-americano e fazei-nos discípulos missionários de vosso Filho Jesus Cristo.

Nossa Senhora de Guadalupe, Padroeira da América Latina, rogai por nós! Amém.`
  },
  {
    id: 'lourdes',
    nome: 'Nossa Senhora de Lourdes',
    subtitulo: 'Saúde dos Enfermos & A Imaculada Conceição',
    categoria: 'aparicoes',
    dataFesta: '11 de Fevereiro',
    icone: 'fa-droplet',
    cor: '#0ea5e9',
    tags: ['lourdes', 'franca', 'cura', 'enfermos', 'saude', 'imaculada conceicao', 'bernadete', 'fonte milagrosa'],
    localAno: 'Gruta de Massabielle, Lourdes, França — 1858',
    citacaoBiblica: '“Eu sou a Imaculada Conceição.” (Revelação à Santa Bernadete em 25 de março de 1858)',
    historia: `No ano de 1858, apenas quatro anos após o Papa Pio IX proclamar o Dogma da Imaculada Conceição, a Virgem Santíssima apareceu 18 vezes a uma jovem pobre e analfabeta de 14 anos, Santa Bernadete Soubirous, na Gruta de Massabielle.

Vestida de branco com uma faixa azul e uma rosa dourada sobre cada pé, a Virgem trazia nas mãos um belo rosário de contas brancas. Durante as aparições, Maria pediu penitência e oração pelos pecadores e indicou a Bernadete que cavasse o chão com as mãos. Dali brotou uma fonte de água pura que jorra até hoje, onde milhares de curas físicas e espirituais foram e continuam sendo milagrosamente atestadas pela medicina.

Na 16ª aparição, em 25 de março de 1858, a Virgem revelou seu nome: "Que soy era Immaculada Councepciou" (Eu sou a Imaculada Conceição).`,
    mensagem: `Lourdes é o refúgio dos doentes e sofredores, um manancial de misericórdia divina que convida à pureza de coração, ao perdão e à esperança da cura física e espiritual.`,
    oracao: `Ó Virgem Imaculada de Lourdes, Mãe de misericórdia e Saúde dos Enfermos, refúgio dos pecadores e consoladora dos aflitos!

Conheceis as minhas dores, os meus sofrimentos e as minhas fraquezas. Olhai com bondade para mim e para todos os enfermos que sofrem no corpo e na alma.

Alcançai-me a graça da cura, da serenidade e da santa conformidade com a vontade de Deus. Fazei jorrar no meu coração as fontes da graça e do amor de Cristo.

Nossa Senhora de Lourdes, Saúde dos Enfermos, rogai por nós! Amém.`
  },
  {
    id: 'gracas',
    nome: 'Nossa Senhora das Graças',
    subtitulo: 'A Revelação da Medalha Milagrosa',
    categoria: 'aparicoes',
    dataFesta: '27 de Novembro',
    icone: 'fa-gem',
    cor: '#818cf8',
    tags: ['gracas', 'medalha milagrosa', 'paris', 'catarina laboure', 'raios de luz', 'protecao', 'cura'],
    localAno: 'Capela da Rue du Bac, Paris, França — 1830',
    citacaoBiblica: '“Fazei cunhar uma medalha com este modelo. As pessoas que a usarem com confiança receberão grandes graças.” (Promessa da Virgem)',
    historia: `Em 27 de novembro de 1830, na Capela das Filhas da Caridade em Paris, a Virgem Maria apareceu à noviça Santa Catarina Labouré.

Maria estava de pé sobre um globo terrestre, esmagando a cabeça de uma serpente. De suas mãos estendidas saíam raios luminosos e resplandecentes em direção à Terra. A Virgem explicou: "Estes raios são o símbolo das graças que derramo sobre as pessoas que me pedem".

Ao redor da aparição formou-se uma moldura oval com a jaculatória em letras de ouro: "Ó Maria concebida sem pecado, rogai por nós que recorremos a vós". Em seguida, o quadro girou e mostrou a letra 'M' encimada por uma cruz, e abaixo o Sagrado Coração de Jesus coroado de espinhos e o Imaculado Coração de Maria traspassado por uma espada.

As curas e conversões obtidas pelo uso piedoso da medalha foram tão numerosas que o povo a batizou de "A Medalha Milagrosa".`,
    mensagem: `Nossa Senhora tem as mãos repletas de graças prontas para derramar sobre todos os que a invocarem com fé e devoção filial.`,
    oracao: `Ó Imaculada Virgem Maria, Mãe de Deus e nossa Mãe, ao contemplar-vos com os braços abertos derramando torrentes de graças, acudimos cheios de confiança à vossa poderosa intercessão.

Alcançai-nos as graças espirituais e temporais de que tanto necessitamos para nossa santificação e para o bem de nossos entes queridos. Livrai-nos do pecado, guardai-nos sob o vosso manto e dai-nos a graça de perseverar até o fim.

Ó Maria concebida sem pecado, rogai por nós que recorremos a vós! Amém.`
  },
  {
    id: 'carmo',
    nome: 'Nossa Senhora do Carmo',
    subtitulo: 'Mãe e Esplendor do Carmelo & O Santo Escapulário',
    categoria: 'aparicoes',
    dataFesta: '16 de Julho',
    icone: 'fa-shield-halved',
    cor: '#b45309',
    tags: ['carmo', 'escapulario', 'simao stock', 'carmelo', 'salvacao', 'purgatorio', 'protecao', 'habito'],
    localAno: 'Cambridge, Inglaterra — 1251 (Origem no Monte Carmelo, Terra Santa)',
    citacaoBiblica: '“Recebe, meu filho caríssimo, este escapulário da tua Ordem: quem morrer revestido dele não padecerá o fogo eterno.” (Promessa a São Simão Stock)',
    historia: `A Ordem dos Carmelitas remonta aos santos eremitas que habitavam as encostas do Monte Carmelo, na Terra Santa, inspirados pelo profeta Elias.

Em 16 de julho de 1251, quando a Ordem enfrentava graves perseguições na Europa, a Virgem Maria apareceu ao Superior Geral, São Simão Stock, segurando o Santo Escapulário e prometendo sua proteção maternal especial na vida, na hora da morte e após a morte (o privilégio sabatino, pelo qual Maria livra do purgatório no primeiro sábado após a morte os fiéis que usarem piedosamente o escapulário).

O Escapulário não é um amuleto mágico, mas sim um sinal visível de consagração e filiação mariana, que nos convida a revestir-nos das virtudes de Cristo e de Maria.`,
    mensagem: `O Escapulário é a veste de proteção maternal de Maria que nos lembra diariamente o chamado à santidade, à pureza e à oração contínua.`,
    oracao: `Ó Flor do Carmelo, videira florida, esplendor do Céu, Virgem fecunda e singular!

Mãe mansa e pura, aos carmelitas sede propícia, Estrela do Mar! Acolhei-nos sob a vossa santa proteção e fazei com que, trazendo dignamente o vosso Santo Escapulário, alcancemos as promessas de salvação e sejamos conduzidos à pátria celeste.

Nossa Senhora do Carmo, rogai por nós! Amém.`
  },
  {
    id: 'desatadora',
    nome: 'Nossa Senhora Desatadora dos Nós',
    subtitulo: 'Intercessora nas Causas Difíceis e Emaranhadas',
    categoria: 'titulos',
    dataFesta: '28 de Setembro',
    icone: 'fa-hands-holding',
    cor: '#ec4899',
    tags: ['desatadora dos nos', 'nos', 'problemas', 'familia', 'casamento', 'papa francisco', 'causas dificeis', 'libertacao'],
    localAno: 'Augsburgo, Alemanha — c. 1700 (Pintura de Johann Georg Melchior Schmidtner)',
    citacaoBiblica: '“O nó da desobediência de Eva foi desatado pela obediência de Maria; o que a virgem Eva atou pela incredulidade, a Virgem Maria desatou pela fé.” (Santo Irineu de Lyon, séc. II)',
    historia: `A devoção a Nossa Senhora Desatadora dos Nós (*Knotenlöserin*) nasceu a partir de uma pintura a óleo barroca do ano de 1700, venerada na Igreja de São Pedro am Perlach, em Augsburgo, na Alemanha.

O quadro foi encomendado como agradecimento pela reconciliação milagrosa do nobre Wolfgang Langenmantel e sua esposa Sophie, cujo casamento estava prestes a ruir. O casal levou a fita nupcial matrimonial ao padre jesuíta Jakob Rem, que a consagrou à Virgem Maria. Ao fazer isso, todos os nós da fita se desataram suavemente.

A imagem retrata a Virgem Maria pisando na cabeça da serpente, cercada por anjos, desfazendo com extrema doçura os nós de uma longa fita. Esta devoção ganhou o mundo inteiro ao ser profundamente difundida pelo Papa Francisco (Cardeal Jorge Mario Bergoglio).`,
    mensagem: `Não há nó ou problema em nossa vida familiar, espiritual, financeira ou de saúde que o amor e as mãos maternais de Maria não possam desatar.`,
    oracao: `Santa Maria, cheia da presença de Deus, durante vossa vida aceitastes com grande humildade a vontade do Pai e o maligno nunca foi capaz de vos envolver em suas confusões.

Junto a vosso Filho intercedestes por nossas dificuldades e, com paciência e amor, destes-nos exemplo de como desenredar as linhas de nossa vida.

Mãe do Amor Formoso, desatai os nós que sufocam o meu coração e a minha família (mencionar o nó/problema). Por vossa intercessão e vosso poder, livrai-me de todas as amarras do inimigo e conduzi-me à liberdade dos filhos de Deus.

Nossa Senhora Desatadora dos Nós, rogai por nós! Amém.`
  },
  {
    id: 'perpetuo_socorro',
    nome: 'Nossa Senhora do Perpétuo Socorro',
    subtitulo: 'O Santo Ícone da Misericórdia e Amparo Maternal',
    categoria: 'titulos',
    dataFesta: '27 de Junho',
    icone: 'fa-hands-praying',
    cor: '#d97706',
    tags: ['perpetuo socorro', 'icone', 'socorro', 'protecao', 'redentoristas', 'menino jesus', 'arcanjo miguel', 'arcanjo gabriel'],
    localAno: 'Creta / Roma — Século XV',
    citacaoBiblica: '“Eis aí a tua mãe! E dessa hora em diante o discípulo a recebeu em sua casa.” (Jo 19, 27)',
    historia: `O ícone bizantino milagroso de Nossa Senhora do Perpétuo Socorro é uma das representações mais ricas e veneradas em toda a Igreja Católica.

Na pintura, o Menino Jesus contempla a visão dos santos arcanjos Miguel e Gabriel, que sustentam os instrumentos da sua Paixão (a cruz, a lança, a esponja e os cravos). Aflito com o destino da redenção da humanidade, Jesus corre apressadamente para o colo de Maria, segurando a mão de sua Mãe com tanta força que uma de suas sandálias se desprende do pé.

Os olhos de Maria não olham para o Filho, mas fitam com compaixão o fiel que a contempla, como a dizer: "Eu sou o vosso Perpétuo Socorro em todas as aflições". Em 1866, o Papa Pio IX entregou o ícone aos Missionários Redentoristas com a missão: "Fazei-a conhecida no mundo inteiro!".`,
    mensagem: `Maria é o Perpétuo Socorro nas horas de tentação, angústia e dor; ela nunca desampara aquele que a ela recorre com fé e confiança de filho.`,
    oracao: `Ó Mãe do Perpétuo Socorro, eis a vossos pés um pobre pecador que a vós recorre e em vós confia.

Mãe de misericórdia, tende compaixão de mim! Ouço que todos vos chamam de refúgio e esperança dos pecadores: sede, pois, o meu refúgio e a minha esperança.

Socorrei-me pelo amor de Jesus Cristo; estendei a mão a um pobre desvalido que a vós se entrega e consagra. Se vós me protegerdes, nada temerei: nem meus pecados, nem os demônios, nem o juízo divino, porque o vosso amparo é mais forte que todo o inferno.

Nossa Senhora do Perpétuo Socorro, socorrei-nos sempre! Amém.`
  },
  {
    id: 'imaculado_coracao',
    nome: 'Imaculado Coração de Maria',
    subtitulo: 'Refúgio Seguro e Caminho que Conduz a Deus',
    categoria: 'titulos',
    dataFesta: 'Sábado seguinte ao Sagrado Coração de Jesus',
    icone: 'fa-heart',
    cor: '#ef4444',
    tags: ['imaculado coracao', 'coracao de maria', 'reparacao', 'cinco sabados', 'pureza', 'amor maternal', 'fatima'],
    localAno: 'Devoção Tradicional / Confirmada em Fátima (1917)',
    citacaoBiblica: '“Maria, porém, conservava todas estas palavras, meditando-as no seu coração.” (Lc 2, 19)',
    historia: `A devoção ao Imaculado Coração de Maria tem suas raízes mais profundas nos Santos Evangelhos, onde vemos o Coração de Maria como o tabernáculo silencioso onde a Palavra de Deus se fez carne e foi amorosamente meditada e guardada.

Ao longo dos séculos, grandes santos como São João Eudes, São Bernardo e São Luís de Montfort exaltaram o amor santíssimo de Maria. Em Fátima (1917), Nossa Senhora disse explicitamente a Lúcia: "Jesus quer estabelecer no mundo a devoção ao meu Imaculado Coração. A quem a abraçar prometo a salvação".

O Coração de Maria é representado cercado de rosas brancas (símbolo de sua virgindade e pureza), traspassado por uma espada de dores (segundo a profecia do velho Simeão em Lc 2, 35) e encimado por chamas ardentes de caridade por Deus e pelos homens.`,
    mensagem: `O Imaculado Coração de Maria é a morada de pureza e paz onde podemos encontrar refúgio seguro contra os males do mundo moderno.`,
    oracao: `Ó Coração Imaculado de Maria, repleto de bondade e amor a Deus e aos homens, abrasai o meu coração no fogo do vosso santo amor.

Consagro-vos hoje e para sempre a minha mente, o meu coração, o meu corpo e toda a minha vida. Guardai-me na pureza, livrai-me do pecado e concedei-me um coração semelhante ao vosso: manso, humilde, orante e obediente à santa vontade do Senhor.

Por fim, fazei triunfar o vosso Imaculado Coração em minha vida e no mundo inteiro.

Doce Coração de Maria, sede a nossa salvação! Amém.`
  },
  {
    id: 'nazare',
    nome: 'Nossa Senhora de Nazaré',
    subtitulo: 'A Rainha da Amazônia & A Grande Festa da Fé',
    categoria: 'titulos',
    dataFesta: 'Segundo Domingo de Outubro (Círio de Nazaré)',
    icone: 'fa-water',
    cor: '#059669',
    tags: ['nazare', 'cirio', 'para', 'amazonia', 'belem', 'placido', 'corda do cirio', 'devocao popular'],
    localAno: 'Belém do Pará, Brasil — 1700 (Origem em Nazaré, Galileia)',
    citacaoBiblica: '“O Verbo se fez carne e habitou entre nós.” (Mistério da Encarnação em Nazaré - Jo 1, 14)',
    historia: `A devoção remonta à Sagrada Família na pequena cidade de Nazaré. No Brasil, em 1700, o caboclo Plácido José de Souza encontrou uma pequena imagem de Nossa Senhora de Nazaré esculpida em madeira às margens do igarapé Murucutu, em Belém do Pará.

Plácido levou a imagem para sua choupana, mas misteriosamente a imagem voltava ao local onde fora encontrada. O povo passou a construir uma ermida no local exato, que mais tarde se tornou a grandiosa Basílica Santuário de Nazaré.

Em 1793 realizou-se o primeiro Círio de Nazaré. Hoje, o Círio reúne mais de 2 milhões de pessoas nas ruas de Belém em uma das maiores e mais emocionantes manifestações de fé católica de todo o planeta, onde fiéis seguram com lágrimas de gratidão e devoção a corda sagrada da berlinda de Nossa Senhora.`,
    mensagem: `Nossa Senhora de Nazaré nos ensina a santificar a vida simples do lar e nos une em comunhão fraternal e fervor de povo de Deus.`,
    oracao: `Ó Virgem Mãe de Nazaré, Rainha da Amazônia e Mãe de todos os brasileiros!

Olhai com amor para o vosso povo que a vós acorre com fé inabalável. Abençoai as nossas famílias, protegei os trabalhadores, amparai os necessitados e guardai a nossa terra.

Conduzi-nos sempre a vosso amado Filho Jesus e fazei de nossos lares um reflexo da Santa Casa de Nazaré: cheios de paz, oração, caridade e trabalho abençoado.

Nossa Senhora de Nazaré, rogai por nós! Amém.`
  },
  {
    id: 'piedade',
    nome: 'Nossa Senhora da Piedade',
    subtitulo: 'Nossa Senhora das Dores • Padroeira de Minas Gerais',
    categoria: 'titulos',
    dataFesta: '15 de Setembro',
    icone: 'fa-cross',
    cor: '#7c3aed',
    tags: ['piedade', 'dores', 'mater dolorosa', 'minas gerais', 'serra da piedade', 'cruz', 'compaixao', 'sofrimento'],
    localAno: 'Serra da Piedade (MG), Brasil / Jerusalém no Calvário',
    citacaoBiblica: '“Estava de pé, junto à cruz de Jesus, sua Mãe.” (Jo 19, 25)',
    historia: `A invocação de Nossa Senhora da Piedade retrata o comovente momento em que a Santíssima Virgem acolhe em seus braços maternais o corpo sem vida de seu Filho Jesus descido da Cruz.

Em Minas Gerais, no alto da majestosa Serra da Piedade (a mais de 1.700 metros de altitude), ergueu-se no século XVIII uma ermida dedicada à Virgem da Piedade, cuja belíssima escultura em cedro foi esculpida pelo insigne mestre Aleijadinho. O Papa São João XXIII proclamou Nossa Senhora da Piedade como Padroeira do Estado de Minas Gerais.

A espiritualidade das Sete Dores de Maria nos ensina o valor redentor do sofrimento unido à Cruz de Cristo e a compaixão maternal que nunca nos abandona nos momentos de maior provação.`,
    mensagem: `Maria nos ensina a perseverar de pé junto à cruz, transformando nossas dores e lágrimas em oferenda de amor e redenção com Jesus.`,
    oracao: `Ó Senhora da Piedade, Mãe das Dores e Mãe da Esperança, que acolhestes em vosso seio o corpo sacrificado de Jesus por nossa salvação!

Acolhei também as nossas dores, as nossas angústias e as nossas cruzes cotidianas. Ensinai-nos a permanecer firmes na fé quando a dor bater à nossa porta e dai-nos a certeza de que a Cruz deságua na glória da Ressurreição.

Nossa Senhora da Piedade, rogai por nós! Amém.`
  },
  {
    id: 'auxiliadora',
    nome: 'Nossa Senhora Auxiliadora',
    subtitulo: 'Auxílio dos Cristãos & Guia da Juventude e Famílias',
    categoria: 'titulos',
    dataFesta: '24 de Maio',
    icone: 'fa-shield-heart',
    cor: '#e11d48',
    tags: ['auxiliadora', 'auxilio dos cristaos', 'dom bosco', 'salesianos', 'juventude', 'vitoria', 'batalha'],
    localAno: 'Roma / Turim, Itália (São João Bosco) — 1868',
    citacaoBiblica: '“Quem confia em Maria nunca será iludido. Tende fé em Maria Auxiliadora e vereis o que são milagres!” (São João Bosco)',
    historia: `O título "Auxílio dos Cristãos" (*Auxilium Christianorum*) foi acrescentado à Ladainha Lauretana pelo Papa São Pio V após a célebre vitória na Batalha de Lepanto (1571), onde as forças cristãs triunfaram invocando o Santo Rosário.

Mais tarde, o Papa Pio VII instituiu a festa litúrgica de Nossa Senhora Auxiliadora em 1814, em ação de graças por sua libertação após cinco anos de cativeiro imposto por Napoleão Bonaparte.

Foi, contudo, com São João Bosco que a devoção atingiu o ápice de popularidade. Dom Bosco teve inúmeros sonhos proféticos com a Virgem e ergueu a monumental Basílica de Maria Auxiliadora em Turim, fundando a Família Salesiana sob o seu manto protetor. Dom Bosco repetia aos seus jovens: "Foi Ela quem tudo fez!".`,
    mensagem: `Maria é o socorro certo e potente da Igreja e de cada cristão contra todos os perigos e ataques espirituais.`,
    oracao: `Santíssima Virgem Maria, Auxílio dos Cristãos, como é consolador acolher-se sob o vosso manto maternal!

Vós sois o refúgio dos pecadores, a fortaleza dos fracos, o consolo dos aflitos e o socorro dos moribundos. Alcançai-nos a graça de vencer as tentações, perseverar na graça divina e amar a Jesus Cristo com ardor.

Abençoai os nossos jovens, guardai as nossas famílias e defendei a Santa Igreja Católica.

Maria, Auxílio dos Cristãos, rogai por nós! Amém.`
  }
];

export const MARIA_ORACOES = [
  {
    id: 'consagracao_tradicional',
    titulo: 'Consagração Tradicional a Nossa Senhora',
    subtitulo: 'A mais famosa e rezada consagração mariana',
    icone: 'fa-hands-praying',
    cor: '#d4af37',
    tags: ['consagracao', 'diaria', 'manha', 'noite', 'tradicional', 'protecao'],
    tempoLeitura: '1 min',
    texto: `Ó Minha Senhora e minha Mãe,
eu me ofereço todo a vós,
e em prova da minha devoção para convosco,
vos consagro neste dia (e nesta noite),
os meus olhos, os meus ouvidos,
a minha boca, o meu coração
e inteiramente todo o meu ser.

E porque assim sou vosso, ó incomparável Mãe,
guardai-me e defendei-me
como coisa e propriedade vossa.
Amém.`
  },
  {
    id: 'angelus',
    titulo: 'O Ângelus (Oração das 6h, 12h e 18h)',
    subtitulo: 'Memória do Mistério da Encarnação do Verbo',
    icone: 'fa-bell',
    cor: '#38bdf8',
    tags: ['angelus', 'meio dia', 'encarnacao', 'anjo', 'tradicional', 'diaria'],
    tempoLeitura: '2 min',
    texto: `— O Anjo do Senhor anunciou a Maria.
— E Ela concebeu do Espírito Santo.

Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.

— Eis aqui a serva do Senhor.
— Faça-se em mim segundo a vossa palavra.

Ave Maria...

— E o Verbo se fez carne.
— E habitou entre nós.

Ave Maria...

— Rogai por nós, Santa Mãe de Deus.
— Para que sejamos dignos das promessas de Cristo.

Oremos:
Infundi, Senhor, a vossa graça em nossas almas, para que nós, que pela anunciação do Anjo conhecemos a Encarnação de Jesus Cristo, vosso Filho, pela sua Paixão e Cruz sejamos conduzidos à glória da Ressurreição. Por Cristo, nosso Senhor. Amém.

(Glória ao Pai... 3 vezes pelas almas dos fiéis defuntos).`
  },
  {
    id: 'regina_caeli',
    titulo: 'Regina Caeli (Rainha do Céu)',
    subtitulo: 'Antífona Mariana Rezada no Tempo Pascal (da Páscoa a Pentecostes)',
    icone: 'fa-sun',
    cor: '#10b981',
    tags: ['regina caeli', 'pascoa', 'ressurreicao', 'alegria', 'tempo pascal'],
    tempoLeitura: '1 min',
    texto: `— Rainha do Céu, alegrai-vos, aleluia!
— Porque Aquele que merecestes trazer em vosso seio, aleluia!

— Ressuscitou como disse, aleluia!
— Rogai por nós a Deus, aleluia!

— Exultai e alegrai-vos, ó Virgem Maria, aleluia!
— Porque o Senhor ressuscitou verdadeiramente, aleluia!

Oremos:
Ó Deus, que vos dignastes alegrar o mundo com a Ressurreição do vosso Filho, nosso Senhor Jesus Cristo, concedei-nos, nós vo-lo pedimos, que pela intercessão da Virgem Maria, sua Mãe, alcancemos as alegrias da vida eterna. Por Cristo, nosso Senhor. Amém.`
  },
  {
    id: 'magnificat',
    titulo: 'O Magnificat (Cântico de Maria)',
    subtitulo: 'Evangelho de São Lucas 1, 46-55',
    icone: 'fa-music',
    cor: '#f59e0b',
    tags: ['magnificat', 'cantico', 'biblia', 'evangelho', 'lucas', 'louvor', 'gratidao'],
    tempoLeitura: '2 min',
    texto: `A minha alma engrandece o Senhor,
e o meu espírito se alegra em Deus, meu Salvador,
porque olhou para a humildade de sua serva.
Doravante todas as gerações me chamarão bem-aventurada,
porque o Todo-Poderoso fez em mim grandes coisas.
Santo é o seu nome!

A sua misericórdia se estende de geração em geração
sobre os que o temem.
Manifestou o poder do seu braço:
dispersou os soberbos de coração.
Derrubou dos tronos os poderosos
e elevou os humildes.
Encheu de bens os famintos
e despediu os ricos de mãos vazias.

Acolheu a Israel, seu servo,
lembrado da sua misericórdia,
como havia prometido a nossos pais,
em favor de Abraão e de sua descendência para sempre.

Glória ao Pai, ao Filho e ao Espírito Santo,
como era no princípio, agora e sempre. Amém.`
  },
  {
    id: 'salve_rainha',
    titulo: 'Salve Rainha (Salve Regina)',
    subtitulo: 'A mais doce oração de súplica e misericórdia',
    icone: 'fa-crown',
    cor: '#ec4899',
    tags: ['salve rainha', 'misericordia', 'terco', 'oracao', 'rosario'],
    tempoLeitura: '1 min',
    texto: `Salve, Rainha, Mãe de misericórdia,
vida, doçura e esperança nossa, salve!
A vós bradamos, os degredados filhos de Eva.
A vós suspiramos, gemendo e chorando
neste vale de lágrimas.

Eia, pois, advogada nossa,
esses vossos olhos misericordiosos a nós volvei,
e depois deste desterro mostrai-nos Jesus,
bendito fruto do vosso ventre,
ó clemente, ó piedosa, ó doce sempre Virgem Maria.

— Rogai por nós, Santa Mãe de Deus.
— Para que sejamos dignos das promessas de Cristo. Amém.`
  },
  {
    id: 'lembrai_vos',
    titulo: 'Lembrai-vos (Memorare)',
    subtitulo: 'Oração de São Bernardo de Claraval',
    icone: 'fa-feather-pointed',
    cor: '#0ea5e9',
    tags: ['lembrai vos', 'sao bernardo', 'confianca', 'protecao', 'intercessao'],
    tempoLeitura: '1 min',
    texto: `Lembrai-vos, ó puríssima Virgem Maria,
que nunca se ouviu dizer que algum daqueles
que têm recorrido à vossa proteção,
implorado a vossa assistência
e reclamado o vosso socorro,
tenha sido por vós desamparado.

Animado eu, pois, de igual confiança,
a vós, ó Virgem entre todas singular,
como a Mãe recorro, de vós me valho
e, gemendo sob o peso dos meus pecados,
me prostro a vossos pés.

Não desprezeis as minhas súplicas,
ó Mãe do Filho de Deus humanado,
mas dignai-vos de as ouvir propícia
e de me alcançar o que vos peço.
Amém.`
  },
  {
    id: 'ladainha_lauretana',
    titulo: 'Ladainha Lauretana Completa',
    subtitulo: 'Todas as invocações oficiais de louvor a Nossa Senhora',
    icone: 'fa-list-ol',
    cor: '#d4af37',
    tags: ['ladainha', 'lauretana', 'invocacoes', 'titulos', 'santa missa', 'solene'],
    tempoLeitura: '4 min',
    texto: `Senhor, tende piedade de nós.
Cristo, tende piedade de nós.
Senhor, tende piedade de nós.
Jesus Cristo, ouvi-nos.
Jesus Cristo, atendei-nos.

Pai Celeste, que sois Deus, tende piedade de nós.
Filho, Redentor do mundo, que sois Deus, tende piedade de nós.
Espírito Santo, que sois Deus, tende piedade de nós.
Santíssima Trindade, que sois um só Deus, tende piedade de nós.

Santa Maria, rogai por nós.
Santa Mãe de Deus, rogai por nós.
Santa Virgem das Virgens, rogai por nós.
Mãe de Cristo, rogai por nós.
Mãe da Igreja, rogai por nós.
Mãe da Misericórdia, rogai por nós.
Mãe da divina graça, rogai por nós.
Mãe da Esperança, rogai por nós.
Mãe puríssima, rogai por nós.
Mãe castíssima, rogai por nós.
Mãe sempre virgem, rogai por nós.
Mãe imaculada, rogai por nós.
Mãe amável, rogai por nós.
Mãe admirável, rogai por nós.
Mãe do bom conselho, rogai por nós.
Mãe do Criador, rogai por nós.
Mãe do Salvador, rogai por nós.

Virgem prudentíssima, rogai por nós.
Virgem venerável, rogai por nós.
Virgem louvável, rogai por nós.
Virgem poderosa, rogai por nós.
Virgem benigna, rogai por nós.
Virgem fiel, rogai por nós.

Espelho de justiça, rogai por nós.
Sede da sabedoria, rogai por nós.
Causa de nossa alegria, rogai por nós.
Vaso espiritual, rogai por nós.
Vaso honorífico, rogai por nós.
Vaso insigne de devoção, rogai por nós.
Rosa Mística, rogai por nós.
Torre de Davi, rogai por nós.
Torre de marfim, rogai por nós.
Casa de ouro, rogai por nós.
Arca da aliança, rogai por nós.
Porta do Céu, rogai por nós.
Estrela da manhã, rogai por nós.
Saúde dos enfermos, rogai por nós.
Refúgio dos pecadores, rogai por nós.
Conforto dos migrantes, rogai por nós.
Consoladora dos aflitos, rogai por nós.
Auxílio dos cristãos, rogai por nós.

Rainha dos Anjos, rogai por nós.
Rainha dos Patriarcas, rogai por nós.
Rainha dos Profetas, rogai por nós.
Rainha dos Apóstolos, rogai por nós.
Rainha dos Mártires, rogai por nós.
Rainha dos Confessores, rogai por nós.
Rainha das Virgens, rogai por nós.
Rainha de todos os Santos, rogai por nós.
Rainha concebida sem pecado original, rogai por nós.
Rainha assunta ao Céu, rogai por nós.
Rainha do Santo Rosário, rogai por nós.
Rainha da Família, rogai por nós.
Rainha da Paz, rogai por nós.

Cordeiro de Deus, que tirais os pecados do mundo, perdoai-nos, Senhor.
Cordeiro de Deus, que tirais os pecados do mundo, ouvi-nos, Senhor.
Cordeiro de Deus, que tirais os pecados do mundo, tende piedade de nós.

— Rogai por nós, Santa Mãe de Deus.
— Para que sejamos dignos das promessas de Cristo.

Oremos:
Senhor Deus, concedei a nós, vossos servos, a graça de gozar de perpétua saúde de alma e corpo; e que, pela gloriosa intercessão da bem-aventurada sempre Virgem Maria, sejamos livres das tristezas da vida presente e alcancemos a alegria da vida eterna. Por Cristo, nosso Senhor. Amém.`
  },
  {
    id: 'consagracao_montfort',
    titulo: 'Consagração de São Luís Maria de Montfort',
    subtitulo: 'A Santa Escravidão de Amor a Jesus por Maria',
    icone: 'fa-link',
    cor: '#8b5cf6',
    tags: ['montfort', 'tratado', 'escravidao de amor', 'totus tuus', 'sao joao paulo ii'],
    tempoLeitura: '3 min',
    texto: `Ó Sabedoria eterna e encarnada! Ó amabilíssimo e adorável Jesus, verdadeiro Deus e verdadeiro homem, Filho único do Pai Eterno e de Maria, sempre Virgem!

Eu vos adoro profundamente no seio e nos esplendores de vosso Pai, durante a eternidade, e no seio virginal de Maria, vossa digníssima Mãe, no tempo de vossa Encarnação.

Eu vos dou graças por vos terdes aniquilado a vós mesmo, tomando a forma de escravo, para livrar-me do cruel cativeiro do demônio.

Renovo e ratifico hoje, em vossas mãos, os votos do meu Batismo: renuncio para sempre a Satanás, às suas pompas e às suas obras, e dou-me inteiramente a Jesus Cristo, Sabedoria encarnada, para segui-lo levando a minha cruz todos os dias da minha vida.

E, para ser-lhe mais fiel do que tenho sido até aqui, escolho-vos hoje, ó Maria, na presença de toda a corte celeste, por minha Mãe e Senhora. Entrego-vos e consagro-vos, na qualidade de escravo de amor, o meu corpo e a minha alma, os meus bens interiores e exteriores, e o próprio valor de minhas boas ações passadas, presentes e futuras.

Totus Tuus ego sum, et omnia mea tua sunt! (Eu sou todo vosso, e tudo o que é meu vos pertence!). Amém.`
  }
];

export const MARIA_DOGMAS = [
  {
    id: 'maternidade_divina',
    numero: '1º Dogma',
    titulo: 'Maternidade Divina (Theotokos)',
    proclamacao: 'Concílio de Éfeso — Ano 431',
    papaConcilio: 'São Cirilo de Alexandria & Papa Celestino I',
    icone: 'fa-baby',
    cor: '#d4af37',
    badge: 'Mãe de Deus',
    resumo: 'Maria é verdadeiramente a Mãe de Deus, pois gerou em seu ventre a Pessoa Divina do Verbo Encarnado.',
    fundamentoBiblico: '“Donde me vem a honra de vir a mim a mãe do meu Senhor?” (Lc 1, 43) • “Deus enviou o seu Filho, nascido de mulher.” (Gl 4, 4)',
    explicacaoTeologica: `O dogma da Maternidade Divina é a raiz de todas as outras grandezas marianas. 

A Igreja definiu que Jesus Cristo possui duas naturezas (a divina e a humana) unidas na única Pessoa Divina do Filho de Deus. Como as mães dão à luz a pessoa de seus filhos e não apenas a sua carne, Maria, ao dar à luz a Jesus, é verdadeiramente a Mãe de Deus (*Theotokos*).

Negar que Maria é Mãe de Deus equivaleria a negar que Jesus Cristo é verdadeiro Deus feito homem.`
  },
  {
    id: 'virgindade_perpetua',
    numero: '2º Dogma',
    titulo: 'Virgindade Perpétua (Aeiparthenos)',
    proclamacao: 'Concílio de Latrão — Ano 649',
    papaConcilio: 'Papa São Martinho I & Concílio de Constantinopla II (553)',
    icone: 'fa-certificate',
    cor: '#38bdf8',
    badge: 'Sempre Virgem',
    resumo: 'Maria permaneceu virgem antes do parto, durante o parto e perpétua e inviolavelmente após o parto de Jesus.',
    fundamentoBiblico: '“Como se fará isso, se eu não conheço homem?” (Lc 1, 34) • “Eis que uma virgem conceberá e dará à luz um filho.” (Is 7, 14)',
    explicacaoTeologica: `A Tradição ininterrupta da Igreja professa que a Santíssima Virgem Maria é *Aeiparthenos* (Sempre Virgem).

A concepção virginal de Jesus operou-se sem semente humana, pelo poder exclusivo do Espírito Santo. O nascimento milagroso de Cristo não violou, mas sagrou a virgindade de sua Mãe. 

Ao longo de toda a sua vida terrena, Maria manteve intacta a sua perfeita e consagrada virgindade, símbolo da integridade da fé e do dom total de si mesma a Deus.`
  },
  {
    id: 'imaculada_conceicao',
    numero: '3º Dogma',
    titulo: 'Imaculada Conceição',
    proclamacao: 'Bula Ineffabilis Deus — 8 de Dezembro de 1854',
    papaConcilio: 'Papa Beato Pio IX',
    icone: 'fa-sparkles',
    cor: '#10b981',
    badge: 'Sem Pecado Original',
    resumo: 'Desde o primeiro instante de sua concepção, Maria foi preservada imune de toda mancha da culpa original por privilégio singular de Deus.',
    fundamentoBiblico: '“Ave, cheia de graça (Kecharitomene), o Senhor é convosco!” (Lc 1, 28) • “Porei inimizade entre ti e a mulher, entre a tua descendência e a dela.” (Gn 3, 15)',
    explicacaoTeologica: `Em vista dos méritos redentores de Jesus Cristo, Salvador de toda a humanidade, Deus aplicou a Maria antecipadamente a redenção na forma mais sublime: a redenção preservativa.

Enquanto todos nós somos curados da mancha do pecado original após o nascimento pelo Batismo, Maria foi preservada de contrair qualquer mancha do pecado desde o primeiro instante de sua animação no ventre de sua mãe, Santa Ana, tornando-se morada digníssima e puríssima para o Filho de Deus.`
  },
  {
    id: 'assuncao_ceu',
    numero: '4º Dogma',
    titulo: 'Assunção aos Céus em Corpo e Alma',
    proclamacao: 'Constituição Munificentissimus Deus — 1º de Novembro de 1950',
    papaConcilio: 'Papa Venerável Pio XII',
    icone: 'fa-cloud-arrow-up',
    cor: '#ec4899',
    badge: 'Corpo e Alma na Glória',
    resumo: 'Terminado o curso de sua vida terrena, a Imaculada Mãe de Deus foi elevada em corpo e alma à glória celestial.',
    fundamentoBiblico: '“Apareceu no céu um grande sinal: uma mulher vestida de sol, tendo a lua debaixo dos pés e uma coroa de doze estrelas sobre a cabeça.” (Ap 12, 1)',
    explicacaoTeologica: `Como a corrupção do sepulcro e a morte são consequências diretas do pecado original (do qual Maria foi plenamente imune), não convinha que o corpo virginal que deu carne ao Verbo Divino conhecesse a corrupção da terra.

Jesus elevou sua Mãe à glória do Céu, onde ela já experimenta a glorificação plena e definitiva que todos os justos hão de experimentar na ressurreição final da carne no último dia.`
  }
];

export const MARIA_PRATICAS = [
  {
    id: 'cinco_sabados',
    titulo: 'A Devoção dos 5 Primeiros Sábados de Reparação',
    subtitulo: 'Pedido solene de Nossa Senhora em Fátima e Pontevedra',
    icone: 'fa-calendar-check',
    cor: '#0284c7',
    passos: [
      { num: 1, titulo: 'Confissão Sacramental', desc: 'Feita com a intenção de desagravar o Imaculado Coração de Maria (pode ser feita até 8 dias antes ou depois).' },
      { num: 2, titulo: 'Comunhão Reparadora', desc: 'Receber a Sagrada Eucaristia em estado de graça no 1º sábado do mês oferecendo em desagravo.' },
      { num: 3, titulo: 'Reza do Santo Terço', desc: 'Rezar os 5 mistérios do Terço com recolhimento e amor filial.' },
      { num: 4, titulo: '15 Minutos de Meditação', desc: 'Fazer companhia a Nossa Senhora meditando em um ou mais mistérios do Rosário.' }
    ],
    promessa: '“A todos aqueles que durante 5 meses, no 1º sábado, se confessarem, receberem a Sagrada Comunhão, rezarem um Terço e me fizerem 15 minutos de companhia meditando nos mistérios do Rosário com o fim de me desagravarem, prometo assistir-lhes na hora da morte com todas as graças necessárias para a salvação.”'
  },
  {
    id: 'escapulario_pratica',
    titulo: 'Uso e Espiritualidade do Santo Escapulário',
    subtitulo: 'O Hábito de Maria e o Privilégio Sabatino',
    icone: 'fa-shield-halved',
    cor: '#b45309',
    passos: [
      { num: 1, titulo: 'Imposição Sacerdotal', desc: 'O primeiro escapulário de tecido (lã marrom) deve ser imposto por um sacerdote ou diácono com a fórmula da Igreja.' },
      { num: 2, titulo: 'Uso Contínuo', desc: 'Usar o escapulário dia e noite como sinal de pertença a Maria (após a imposição, pode ser substituído por medalha-escapulário).' },
      { num: 3, titulo: 'Vida de Pureza e Oração', desc: 'Viver a castidade de acordo com seu estado de vida e cultivar a oração diária (como o Terço ou o Pequeno Ofício).' }
    ],
    promessa: 'Sinal de aliança e salvação eterna (“Quem morrer com ele não padecerá o fogo do inferno”) e libertação do purgatório no primeiro sábado após a morte (Privilégio Sabatino).'
  }
];

// Helper functions
export function getMariaTitulos() {
  return MARIA_TITULOS;
}

export function getMariaOracoes() {
  return MARIA_ORACOES;
}

export function getMariaDogmas() {
  return MARIA_DOGMAS;
}

export function getMariaPraticas() {
  return MARIA_PRATICAS;
}

export function getMariaItemPorId(id) {
  return MARIA_TITULOS.find(t => t.id === id) || 
         MARIA_ORACOES.find(o => o.id === id) || 
         MARIA_DOGMAS.find(d => d.id === id) || 
         MARIA_PRATICAS.find(p => p.id === id);
}
