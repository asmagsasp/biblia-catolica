// ==========================================================================
// LIVRO DE ORAÇÕES CATÓLICAS & DEVOCIONÁRIO TRADICIONAL (SALVAI ALMAS)
// Compilação completa de grandes orações, ladainhas solenes, coroas e súplicas
// ==========================================================================

export const ORACOES_CATEGORIAS = [
  { id: 'all', label: '🌟 Todas', icon: 'fas fa-book-bible' },
  { id: 'longas', label: '📜 Grandes Ladainhas & Terços', icon: 'fas fa-scroll' },
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
  // 1. GRANDES LADAINHAS & DEVOCIONÁRIOS EXTENSOS (ORAÇÕES LONGAS)
  // ========================================================================
  {
    id: 'ladainha_lauretana_completa',
    titulo: 'Ladainha Lauretana de Nossa Senhora (Completa)',
    subtitulo: 'As Solenes e Poéticas Invocações à Mãe de Deus',
    categoria: 'longas',
    autor: 'Tradição do Santuário da Santa Casa de Loreto',
    latim: 'Litaniae Lauretanae Beatae Mariae Virginis',
    tempo: '⏱️ 8 min',
    tipoBadge: '⛪ Ladainha Solene',
    tags: ['ladainha', 'nossa senhora', 'loreto', 'lauretana', 'rosario', 'maria', 'longa'],
    introducao: 'Aprovada solenemente pelo Papa Clemente VIII em 1601, é a mais bela e completa coroa de títulos bíblicos, poéticos e dogmáticos dedicados à Mãe do Salvador.',
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
Santa Virgem das virgens, rogai por nós.
Mãe de Cristo, rogai por nós.
Mãe da Igreja, rogai por nós.
Mãe da divina graça, rogai por nós.
Mãe da esperança, rogai por nós.
Mãe puríssima, rogai por nós.
Mãe castíssima, rogai por nós.
Mãe sempre virgem, rogai por nós.
Mãe imaculada, rogai por nós.
Mãe digna de amor, rogai por nós.
Mãe admirável, rogai por nós.
Mãe do bom conselho, rogai por nós.
Mãe do Criador, rogai por nós.
Mãe do Salvador, rogai por nós.
Mãe de misericórdia, rogai por nós.

Virgem prudentíssima, rogai por nós.
Virgem venerável, rogai por nós.
Virgem louvável, rogai por nós.
Virgem poderosa, rogai por nós.
Virgem clemente, rogai por nós.
Virgem fiel, rogai por nós.

Espelho de justiça, rogai por nós.
Sede da sabedoria, rogai por nós.
Causa da nossa alegria, rogai por nós.
Vaso espiritual, rogai por nós.
Vaso honorífico, rogai por nós.
Vaso insigne de devoção, rogai por nós.
Rosa mística, rogai por nós.
Torre de Davi, rogai por nós.
Torre de marfim, rogai por nós.
Casa de ouro, rogai por nós.
Arca da aliança, rogai por nós.
Porta do Céu, rogai por nós.
Estrela da manhã, rogai por nós.
Saúde dos enfermos, rogai por nós.
Refúgio dos pecadores, rogai por nós.
Socorro dos migrantes, rogai por nós.
Consoladora dos aflitos, rogai por nós.
Auxílio dos cristãos, rogai por nós.

Rainha dos Anjos, rogai por nós.
Rainha dos Patriarcas, rogai por nós.
Rainha dos Profetas, rogai por nós.
Rainha dos Apóstolos, rogai por nós.
Rainha dos Mártires, rogai por nós.
Rainha dos Confessores da fé, rogai por nós.
Rainha das Virgens, rogai por nós.
Rainha de todos os Santos, rogai por nós.
Rainha concebida sem pecado original, rogai por nós.
Rainha assunta ao Céu, rogai por nós.
Rainha do Santo Rosário, rogai por nós.
Rainha da família, rogai por nós.
Rainha da paz, rogai por nós.

Cordeiro de Deus, que tirais os pecados do mundo, perdoai-nos, Senhor.
Cordeiro de Deus, que tirais os pecados do mundo, ouvi-nos, Senhor.
Cordeiro de Deus, que tirais os pecados do mundo, tende piedade de nós.

— Rogai por nós, Santa Mãe de Deus.
— Para que sejamos dignos das promessas de Cristo.

Oremos: Senhor Deus, nós Vos suplicamos que concedais a nós, vossos servos, perpétua saúde de alma e de corpo, e que, pela gloriosa intercessão da bem-aventurada sempre Virgem Maria, sejamos livres da tristeza presente e gozemos da eterna alegria. Por Cristo, Nosso Senhor. Amém.`
  },
  {
    id: 'ladainha_sagrado_coracao_completa',
    titulo: 'Ladainha do Sagrado Coração de Jesus (Completa)',
    subtitulo: 'As 33 Invocações aos Tesouros de Amor e Misericórdia Divina',
    categoria: 'longas',
    autor: 'Papa Leão XIII (1899)',
    latim: 'Litaniae de Sacratissimo Corde Iesu',
    tempo: '⏱️ 7 min',
    tipoBadge: '✝️ Ladainha Maior',
    tags: ['sagrado coracao', 'ladainha', 'jesus', 'reparacao', 'misericordia', 'leao xiii', 'longa'],
    introducao: 'Composta com base nos escritos de Santa Margarida Maria Alacoque, cada invocação medita um mistério do infinito amor de Cristo pela humanidade.',
    texto: `Senhor, tende piedade de nós.
Cristo, tende piedade de nós.
Senhor, tende piedade de nós.
Jesus Cristo, ouvi-nos.
Jesus Cristo, atendei-nos.

Pai Celeste, que sois Deus, tende piedade de nós.
Filho, Redentor do mundo, que sois Deus, tende piedade de nós.
Espírito Santo, que sois Deus, tende piedade de nós.
Santíssima Trindade, que sois um só Deus, tende piedade de nós.

Coração de Jesus, Filho do Pai Eterno, tende piedade de nós.
Coração de Jesus, formado pelo Espírito Santo no seio da Virgem Mãe, tende piedade de nós.
Coração de Jesus, unido substancialmente ao Verbo de Deus, tende piedade de nós.
Coração de Jesus, de majestade infinita, tende piedade de nós.
Coração de Jesus, templo santo de Deus, tende piedade de nós.
Coração de Jesus, tabernáculo do Altíssimo, tende piedade de nós.
Coração de Jesus, casa de Deus e porta do Céu, tende piedade de nós.
Coração de Jesus, fornalha ardente de caridade, tende piedade de nós.
Coração de Jesus, santuário de justiça e de amor, tende piedade de nós.
Coração de Jesus, cheio de bondade e de amor, tende piedade de nós.
Coração de Jesus, abismo de todas as virtudes, tende piedade de nós.
Coração de Jesus, digníssimo de todo o louvor, tende piedade de nós.
Coração de Jesus, Rei e centro de todos os corações, tende piedade de nós.
Coração de Jesus, no qual estão todos os tesouros da sabedoria e da ciência, tende piedade de nós.
Coração de Jesus, no qual habita toda a plenitude da divindade, tende piedade de nós.
Coração de Jesus, no qual o Pai pôs as suas complacências, tende piedade de nós.
Coração de Jesus, de cuja plenitude todos nós recebemos, tende piedade de nós.
Coração de Jesus, paciente e de muita misericórdia, tende piedade de nós.
Coração de Jesus, rico para todos os que Vos invocam, tende piedade de nós.
Coração de Jesus, fonte de vida e de santidade, tende piedade de nós.
Coração de Jesus, propiciação pelos nossos pecados, tende piedade de nós.
Coração de Jesus, saciado de opróbrios, tende piedade de nós.
Coração de Jesus, esmagado de dor por causa dos nossos crimes, tende piedade de nós.
Coração de Jesus, feito obediente até à morte, tende piedade de nós.
Coração de Jesus, transpassado pela lança, tende piedade de nós.
Coração de Jesus, fonte de toda a consolação, tende piedade de nós.
Coração de Jesus, nossa vida e ressurreição, tende piedade de nós.
Coração de Jesus, nossa paz e reconciliação, tende piedade de nós.
Coração de Jesus, vítima dos pecadores, tende piedade de nós.
Coração de Jesus, salvação dos que em Vós esperam, tende piedade de nós.
Coração de Jesus, esperança dos que expiram em Vós, tende piedade de nós.
Coração de Jesus, delícia de todos os Santos, tende piedade de nós.

Cordeiro de Deus, que tirais os pecados do mundo, perdoai-nos, Senhor.
Cordeiro de Deus, que tirais os pecados do mundo, ouvi-nos, Senhor.
Cordeiro de Deus, que tirais os pecados do mundo, tende piedade de nós.

— Jesus, manso e humilde de coração.
— Fazei o nosso coração semelhante ao vosso.

Oremos: Deus onipotente e eterno, olhai para o Coração do vosso Filho diletíssimo e para os louvores e satisfações que Ele Vos tributou em nome dos pecadores; e aos que imploram a vossa misericórdia, concedei benigno o perdão em nome do mesmo vosso Filho Jesus Cristo, que convosco vive e reina por todos os séculos dos séculos. Amém.`
  },
  {
    id: 'terco_das_lagrimas_completo',
    titulo: 'Coroa de Nossa Senhora das Lágrimas (Terço das Lágrimas)',
    subtitulo: 'Devoção Revelada em Campinas - SP com Promessas Extraordinárias',
    categoria: 'longas',
    autor: 'Revelada à Irmã Amália de Jesus Flagelado (1930)',
    tempo: '⏱️ 10 min',
    tipoBadge: '📿 Coroa / Terço Completo',
    tags: ['terco das lagrimas', 'coroa', 'irma amalia', 'campinas', 'salvai almas', 'conversao', 'cura', 'longa'],
    introducao: 'Nosso Senhor disse à Irmã Amália: "Minha filha, tudo o que os homens Me pedem pelas Lágrimas de Minha Mãe, Eu amorosamente concedo". É uma das orações mais fortes para alcançar a conversão de familiares e a libertação dos aflitos.',
    promessa: 'Nenhum pedido feito pelas Lágrimas da Virgem Maria é recusado pelo Coração de Jesus. O demônio foge desarmado diante desta oração.',
    texto: `ORAÇÃO INICIAL:
Eis-nos aqui aos vossos pés, ó dulcíssimo Jesus Crucificado, para Vos oferecer as Lágrimas Daquela que, com tanto amor, Vos acompanhou no caminho doloroso do Calvário. Fazei, ó bom Mestre, que nós saibamos aproveitar as lições que elas nos dão, a fim de que, realizando a vossa santíssima vontade aqui na terra, sejamos dignos de Vos louvar no Céu por toda a eternidade. Amém.

(Nas contas grandes do Rosário, reza-se):
— Vede, ó Jesus, que são as Lágrimas Daquela que mais Vos amou na terra...
— E que mais intensamente Vos ama no Céu!

(Nas contas pequenas - 7 dezenas de 7 contas, reza-se):
— Meu Jesus, ouvi os nossos rogos...
— Pelas Lágrimas de vossa Mãe Santíssima!

(Ao final das 7 dezenas, repete-se 3 vezes nas 3 contas finais):
— Vede, ó Jesus, que são as Lágrimas Daquela que mais Vos amou na terra...
— E que mais intensamente Vos ama no Céu!

ORAÇÃO FINAL:
Ó Maria, Mãe de amor, de dores e de misericórdia, nós vos suplicamos: uni as vossas súplicas às nossas, a fim de que Jesus, vosso Divino Filho, a quem nos dirigimos, em nome das vossas Lágrimas maternais, ouça as nossas preces e nos conceda, com as graças que desejamos, a coroa da vida eterna.

Por vossa divina mansidão, ó Jesus Manietado, salvai o mundo do erro que o ameaça!
Ó Virgem Dolorosíssima, as vossas Lágrimas derrubem o império infernal!
Coração de Jesus Crucificado, tende piedade de nós e salvai as almas! Amém.`
  },
  {
    id: 'terco_misericordia_completo',
    titulo: 'Terço da Divina Misericórdia (Completo com Hora da Graça)',
    subtitulo: 'Revelado por Jesus a Santa Faustina Kowalska',
    categoria: 'longas',
    autor: 'Santa Maria Faustina Kowalska (1905 - 1938)',
    tempo: '⏱️ 8 min',
    tipoBadge: '✝️ Terço Completo',
    tags: ['misericordia', 'santa faustina', 'terco', '3 da tarde', 'chagas', 'perdao', 'salvai almas', 'longa'],
    introducao: 'Jesus prometeu: "Pela recitação deste Terço, agrada-me conceder tudo o que me pedirem. Quando os pecadores empedernidos o rezarem, encherei as suas almas de paz e a hora da sua morte será feliz".',
    promessa: 'Graça da conversão na hora da morte, proteção das cidades e alívio para as almas agonizantes.',
    texto: `ORAÇÃO DA HORA DA MISERICÓRDIA (15h):
Expirastes, Jesus, mas a fonte da vida brotou para as almas e o oceano da misericórdia abriu-se para o mundo inteiro. Ó Fonte de Vida, insondável Misericórdia Divina, envolvei o mundo todo e derramai-Vos sobre nós.

Ó Sangue e Água, que brotastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós! (3 vezes)

ORAÇÕES INICIAIS:
Reza-se: 1 Pai-Nosso, 1 Ave-Maria e o Credo Apostólico.

(Nas contas grandes do Pai-Nosso):
Eterno Pai, eu Vos ofereço o Corpo e o Sangue, a Alma e a Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.

(Nas 10 contas pequenas da Ave-Maria):
Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.

(Ao final das 5 dezenas, reza-se 3 vezes):
Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro!

ORAÇÃO DE ENCERRAMENTO:
Ó Deus Eterno, em quem a misericórdia é insondável e o tesouro da compaixão inesgotável, olhai propício para nós e multiplicai em nós a vossa misericórdia, para que, nos momentos difíceis, não desesperemos nem desanimemos, mas com grande confiança nos entreguemos à vossa santa vontade, que é o próprio Amor e a própria Misericórdia.

Jesus, eu confio em Vós! (3 vezes)
Santa Faustina, rogai por nós!`
  },
  {
    id: 'coroa_sao_miguel_9_coros',
    titulo: 'Coroa de São Miguel Arcanjo e dos 9 Coros dos Anjos',
    subtitulo: 'As 9 Saudações com Promessa de Escolhida Guarda Angélica',
    categoria: 'longas',
    autor: 'Revelada à Serva de Deus Antónia de Astónaco (Portugal, 1751)',
    tempo: '⏱️ 12 min',
    tipoBadge: '🛡️ Coroa Angélica',
    tags: ['sao miguel', 'anjos', '9 coros', 'serafins', 'querubins', 'batalha', 'protecao', 'longa'],
    introducao: 'São Miguel prometeu a quem rezar esta Coroa uma escolta de 9 anjos (um de cada coro) durante a Comunhão e contínua proteção na vida e no Purgatório.',
    texto: `Vinde, ó Deus, em meu auxílio. Senhor, apressai-Vos em me socorrer.
Glória ao Pai, ao Filho e ao Espírito Santo...

1ª SAUDAÇÃO (Serafins):
Pela intercessão de São Miguel e do Coro Celeste dos Serafins, o Senhor nos faça dignos do fogo da perfeita caridade.
(1 Pai-Nosso, 3 Ave-Marias)

2ª SAUDAÇÃO (Querubins):
Pela intercessão de São Miguel e do Coro Celeste dos Querubins, o Senhor nos conceda a graça de abandonar o caminho do pecado e seguir o da perfeição cristã.
(1 Pai-Nosso, 3 Ave-Marias)

3ª SAUDAÇÃO (Tronos):
Pela intercessão de São Miguel e do Coro Celeste dos Tronos, o Senhor infunda em nossos corações o espírito de verdadeira e sincera humildade.
(1 Pai-Nosso, 3 Ave-Marias)

4ª SAUDAÇÃO (Dominações):
Pela intercessão de São Miguel e do Coro Celeste das Dominações, o Senhor nos dê a graça de dominar os nossos sentidos e corrigir as más paixões.
(1 Pai-Nosso, 3 Ave-Marias)

5ª SAUDAÇÃO (Potestades):
Pela intercessão de São Miguel e do Coro Celeste das Potestades, o Senhor se digne proteger as nossas almas contra as ciladas e tentações de satanás.
(1 Pai-Nosso, 3 Ave-Marias)

6ª SAUDAÇÃO (Virtudes):
Pela intercessão de São Miguel e do Coro Celeste das Virtudes, o Senhor não nos deixe cair em tentação, mas nos livre de todo o mal.
(1 Pai-Nosso, 3 Ave-Marias)

7ª SAUDAÇÃO (Principados):
Pela intercessão de São Miguel e do Coro Celeste dos Principados, o Senhor encha as nossas almas do espírito de verdadeira e sincera obediência.
(1 Pai-Nosso, 3 Ave-Marias)

8ª SAUDAÇÃO (Arcanjos):
Pela intercessão de São Miguel e do Coro Celeste dos Arcanjos, o Senhor nos conceda a perseverança na fé e em todas as boas obras.
(1 Pai-Nosso, 3 Ave-Marias)

9ª SAUDAÇÃO (Anjos):
Pela intercessão de São Miguel e do Coro Celeste dos Anjos, o Senhor nos conceda sermos guardados por eles nesta vida e conduzidos à glória eterna.
(1 Pai-Nosso, 3 Ave-Marias)

(Rezam-se 4 Pai-Nossos finais):
1º Pai-Nosso em honra de São Miguel Arcanjo.
2º Pai-Nosso em honra de São Gabriel Arcanjo.
3º Pai-Nosso em honra de São Rafael Arcanjo.
4º Pai-Nosso em honra do Santo Anjo da Guarda.

ORAÇÃO FINAL:
Glorioso São Miguel, chefe e príncipe dos exércitos celestes, fiel guardião das almas, vencedor dos espíritos rebeldes, amado da casa de Deus, nosso admirável guia depois de Cristo; vós, cuja excelência e virtudes são eminentes, dignai-vos livrar-nos de todos os males, a nós que recorremos a vós com confiança, e fazei, pela vossa incomparável proteção, que avancemos a cada dia na fidelidade e no amor a Deus.

Rogai por nós, ó bem-aventurado São Miguel, príncipe da Igreja de Jesus Cristo.
Para que sejamos dignos de suas promessas. Amém.`
  },
  {
    id: 'consagracao_montfort_integral',
    titulo: 'Consagração Solene a Jesus por Maria (Tratado de São Luís)',
    subtitulo: 'Fórmula Integral de Consagração como Escravo de Amor',
    categoria: 'longas',
    autor: 'São Luís Maria Grignion de Montfort (1673 - 1716)',
    tempo: '⏱️ 9 min',
    tipoBadge: '📜 Tratado Solene',
    tags: ['consagracao', 'escravidao de amor', 'montfort', 'tratado', 'maria', 'jesus', 'totus tuus', 'longa'],
    introducao: 'A consagração total descrita no célebre Tratado da Verdadeira Devoção, adotada por grandes santos como São João Paulo II (Totus Tuus).',
    texto: `Ó Sabedoria eterna e encarnada! Ó amabilíssimo e adorável Jesus, verdadeiro Deus e verdadeiro homem, Filho único do Eterno Pai e de Maria sempre Virgem!

Eu Vos adoro profundamente no seio e nos esplendores de vosso Pai, durante a eternidade, e no seio virginal de Maria, vossa digníssima Mãe, no tempo da vossa Encarnação.

Eu Vos dou graças por Vos terdes aniquilado a Vós mesmo, tomando a forma de escravo, para me livrar do cruel cativeiro do demônio. Eu Vos louvo e glorifico por Vos terdes querido submeter a Maria, vossa Mãe Santíssima, em todas as coisas, a fim de me tornar, por Ela, vosso fiel escravo.

Mas, ai de mim! Ingrato e infiel como tenho sido, não cumpri as promessas que tão solenemente Vos fiz no meu Batismo; não cumpri os meus deveres; não mereço ser chamado vosso filho, nem vosso escravo; e, como nada há em mim que não mereça a vossa repulsa e a vossa cólera, não ouso aproximar-me por mim mesmo da vossa santa e augusta Majestade.

É por isso que recorro à intercessão de vossa Mãe Santíssima, que me destes por Medianeira junto de Vós; e é por seu intermédio que espero obter de Vós a contrição e o perdão dos meus pecados, a aquisição e a conservação da Sabedoria.

Eu vos saúdo, pois, ó Maria Imaculada, tabernáculo vivo da Divindade, onde a Sabedoria eterna escondida quer ser adorada pelos anjos e pelos homens. Eu vos saúdo, ó Rainha do Céu e da Terra, a cujo império tudo está submetido, abaixo de Deus. Eu vos saúdo, ó refúgio seguro dos pecadores, cuja misericórdia a ninguém falta. Atendei aos desejos que tenho da divina Sabedoria, e recebei para isso os votos e as ofertas que a minha baixeza vos apresenta.

Eu, pecador infiel, renovo e ratifico hoje, em vossas mãos, os votos do meu Batismo: renuncio para sempre a satanás, às suas pompas e às suas obras; e dou-me inteiramente a Jesus Cristo, Sabedoria encarnada, para levar a minha cruz após Ele, todos os dias de minha vida, e para Lhe ser mais fiel do que fui até agora.

Na presença de toda a corte celeste, eu vos escolho hoje para minha Mãe e Senhora. Eu vos entrego e consagro, na qualidade de escravo, o meu corpo e a minha alma, os meus bens interiores e exteriores, e o próprio valor das minhas boas obras passadas, presentes e futuras, deixando-vos pleno e inteiro direito de dispor de mim e de tudo o que me pertence, sem reserva, segundo o vosso beneplácito, para a maior glória de Deus, no tempo e na eternidade.

Recebei, ó Virgem benigna, esta pequena oferta da minha escravidão, em honra e união da submissão que a Sabedoria eterna quis ter à vossa maternidade; em homenagem ao poder que tendes ambos sobre este miserável pecador; e em ação de graças pelos privilégios com que a Santíssima Trindade vos favoreceu.

Protesto que quero doravante, como vosso verdadeiro escravo, procurar a vossa honra e obedecer-vos em todas as coisas. Ó Mãe admirável, apresentai-me ao vosso querido Filho, na qualidade de escravo perpétuo, para que, tendo-me Ele resgatado por vós, por vós me receba.

Ó Mãe de misericórdia, concedei-me a graça de obter a verdadeira Sabedoria de Deus, e de me colocar, para isso, no número daqueles a quem amais, ensinais, guiais, sustentais e protegeis como vossos filhos e vossos escravos.

Ó Virgem fiel, tornai-me em todas as coisas um tão perfeito discípulo, imitador e escravo da Sabedoria encarnada, Jesus Cristo, vosso Filho, que eu chegue, por vossa intercessão e a vosso exemplo, à plenitude da sua idade na terra e da sua glória no Céu. Amém.`
  },
  {
    id: 'couraca_sao_patricio_completa',
    titulo: 'A Couraça de São Patrício (Texto Integral)',
    subtitulo: 'A Grande Oração de Blindagem Espiritual contra todo o Mal',
    categoria: 'longas',
    autor: 'São Patrício (387 - 461), Apóstolo da Irlanda',
    latim: 'Lorica Sancti Patricii',
    tempo: '⏱️ 6 min',
    tipoBadge: '🛡️ Blindagem Mística',
    tags: ['sao patricio', 'couraca', 'blindagem', 'protecao', 'inimigo', 'mal', 'trindade', 'longa'],
    introducao: 'Composta para enfrentar os feiticeiros e reis pagãos da Irlanda antiga. É uma das mais poderosas orações de selamento contra qualquer feitiçaria, perigo ou inveja.',
    texto: `Levanto-me hoje por uma poderosa força: a invocação da Trindade, a fé nas Três Pessoas, a confissão da Unidade do Criador da Criação.

Levanto-me hoje pela força do nascimento de Cristo e de seu batismo, pela força de sua crucifixão e de seu sepultamento, pela força de sua ressurreição e ascensão, pela força de sua descida para o julgamento final.

Levanto-me hoje pela força do amor dos Querubins, na obediência dos Anjos, no serviço dos Arcanjos, na esperança da ressurreição para o prêmio, nas orações dos Patriarcas, nas profecias dos Profetas, nas pregações dos Apóstolos, na fé dos Confessores, na pureza das Virgens santas, nas boas obras de todos os homens justos.

Levanto-me hoje pela força dos céus: a luz do sol, o brilho da lua, o resplendor do fogo, a velocidade do relâmpago, a rapidez do vento, a profundeza dos mares, a firmeza da terra, a solidez das rochas.

Levanto-me hoje pela força de Deus que me guia:
O poder de Deus para me suster,
A sabedoria de Deus para me conduzir,
O olhar de Deus para vigiar sobre mim,
O ouvido de Deus para me escutar,
A palavra de Deus para falar por mim,
A mão de Deus para me guardar,
O caminho de Deus estendido diante de mim,
O escudo de Deus para me proteger,
O exército de Deus para me salvar:
Contra as ciladas dos demônios,
Contra as tentações dos vícios,
Contra todos os que me desejam o mal, longe ou perto, na solidão ou na multidão.

Convoco hoje todas estas forças entre mim e o maligno:
Contra todo poder cruel e impiedoso que possa atacar o meu corpo e a minha alma,
Contra as profecias dos falsos profetas,
Contra as leis negras do paganismo,
Contra as leis falsas dos hereges,
Contra o engano da idolatria,
Contra feitiços, bruxarias e malefícios,
Contra qualquer conhecimento que corrompa o corpo e a alma do homem.

Cristo me proteja hoje:
Contra o veneno, contra o fogo,
Contra o afogamento, contra a ferida mortal,
Para que venha a mim abundante recompensa.

Cristo comigo, Cristo à minha frente, Cristo atrás de mim,
Cristo em mim, Cristo abaixo de mim, Cristo acima de mim,
Cristo à minha direita, Cristo à minha esquerda,
Cristo quando me deito, Cristo quando me sento, Cristo quando me levanto,
Cristo no coração de todo homem que pensar em mim,
Cristo na boca de todo homem que falar de mim,
Cristo em todo olho que me vê,
Cristo em todo ouvido que me ouve.

Levanto-me hoje por uma poderosa força: a invocação da Trindade, a fé nas Três Pessoas, a confissão da Unidade do Criador da Criação.

A salvação é do Senhor! A salvação é do Senhor! A salvação é de Cristo!
Que a vossa salvação, Senhor, esteja sempre conosco. Amém.`
  },
  {
    id: 'ladainha_da_humildade_completa',
    titulo: 'Ladainha da Humildade (Cardeal Merry del Val)',
    subtitulo: 'Para Curar o Orgulho e Alcançar a Santidade do Coração',
    categoria: 'longas',
    autor: 'Servo de Deus Rafael Cardeal Merry del Val (1865 - 1930)',
    latim: 'Litaniae Humilitatis',
    tempo: '⏱️ 5 min',
    tipoBadge: '🕊️ Cura Interior',
    tags: ['humildade', 'orgulho', 'cura interior', 'santidade', 'merry del val', 'jesus'],
    introducao: 'O Secretário de Estado de São Pio X rezava esta oração todos os dias após a Santa Missa para manter o coração perfeitamente desprendido das vaidades humanas.',
    texto: `Ó Jesus, manso e humilde de coração, ouvi-me:

Do desejo de ser estimado, livrai-me, Jesus.
Do desejo de ser amado, livrai-me, Jesus.
Do desejo de ser exaltado, livrai-me, Jesus.
Do desejo de ser honrado, livrai-me, Jesus.
Do desejo de ser louvado, livrai-me, Jesus.
Do desejo de ser preferido, livrai-me, Jesus.
Do desejo de ser consultado, livrai-me, Jesus.
Do desejo de ser aprovado, livrai-me, Jesus.

Do receio de ser humilhado, livrai-me, Jesus.
Do receio de ser desprezado, livrai-me, Jesus.
Do receio de sofrer repulsas, livrai-me, Jesus.
Do receio de ser caluniado, livrai-me, Jesus.
Do receio de ser esquecido, livrai-me, Jesus.
Do receio de ser ridicularizado, livrai-me, Jesus.
Do receio de ser injuriado, livrai-me, Jesus.
Do receio de ser suspeitado, livrai-me, Jesus.

E dai-me, Jesus, a graça de desejar:
Que os outros sejam mais amados do que eu, Jesus, dai-me a graça de desejá-lo.
Que os outros sejam mais estimados do que eu, Jesus, dai-me a graça de desejá-lo.
Que, na opinião do mundo, os outros cresçam e eu diminua, Jesus, dai-me a graça de desejá-lo.
Que os outros sejam escolhidos e eu posto de lado, Jesus, dai-me a graça de desejá-lo.
Que os outros sejam louvados e eu esquecido, Jesus, dai-me a graça de desejá-lo.
Que os outros sejam preferidos a mim em tudo, Jesus, dai-me a graça de desejá-lo.
Que os outros sejam mais santos do que eu, contanto que eu seja tão santo quanto me for possível, Jesus, dai-me a graça de desejá-lo.

Amém.`
  },
  {
    id: 'ladainha_sao_jose_completa',
    titulo: 'Ladainha de São José (Completa)',
    subtitulo: 'As 25 Invocações Oficiais ao Patrono da Igreja Universal',
    categoria: 'longas',
    autor: 'Papa São Pio X (1909)',
    latim: 'Litaniae Sancti Ioseph',
    tempo: '⏱️ 6 min',
    tipoBadge: '🕊️ Ladainha de São José',
    tags: ['sao jose', 'ladainha', 'trabalho', 'familias', 'terror dos demonios', 'boa morte', 'longa'],
    introducao: 'Aprovada pela Igreja com indulgências plenárias, invoca São José em todas as suas virtudes heroicas de pai e guardião.',
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
São José, rogai por nós.
Ilustre filho de Davi, rogai por nós.
Luz dos Patriarcas, rogai por nós.
Esposo da Mãe de Deus, rogai por nós.
Casto guarda da Virgem, rogai por nós.
Nutrício do Filho de Deus, rogai por nós.
Zeloso defensor de Cristo, rogai por nós.
Chefe da Sagrada Família, rogai por nós.

José justíssimo, rogai por nós.
José castíssimo, rogai por nós.
José prudentíssimo, rogai por nós.
José fortíssimo, rogai por nós.
José obedientíssimo, rogai por nós.
José fidelíssimo, rogai por nós.

Espelho de paciência, rogai por nós.
Amante da pobreza, rogai por nós.
Modelo dos operários, rogai por nós.
Glória da vida doméstica, rogai por nós.
Guarda das virgens, rogai por nós.
Sustentáculo das famílias, rogai por nós.
Alívio dos desgraçados, rogai por nós.
Esperança dos enfermos, rogai por nós.
Patrono dos moribundos, rogai por nós.
Terror dos demônios, rogai por nós.
Protetor da Santa Igreja, rogai por nós.

Cordeiro de Deus, que tirais os pecados do mundo, perdoai-nos, Senhor.
Cordeiro de Deus, que tirais os pecados do mundo, ouvi-nos, Senhor.
Cordeiro de Deus, que tirais os pecados do mundo, tende piedade de nós.

— Ele o constituiu senhor de sua casa.
— E fê-lo príncipe de todos os seus bens.

Oremos: Ó Deus, que por inefável providência Vos dignastes escolher o bem-aventurado São José para esposo de vossa Mãe Santíssima, concedei-nos que, venerando-o na terra como protetor, mereçamos tê-lo como intercessor nos Céus. Vós que viveis e reinais por todos os séculos dos séculos. Amém.`
  },
  {
    id: 'te_deum_laudamus_completo',
    titulo: 'Te Deum Laudamus (A Vós, ó Deus, Louvamos)',
    subtitulo: 'O Hino Solene de Ação de Graças da Igreja Católica',
    categoria: 'longas',
    autor: 'Santo Ambrósio e Santo Agostinho (Século IV)',
    latim: 'Te Deum laudamus, te Dominum confitemur',
    tempo: '⏱️ 6 min',
    tipoBadge: '🎶 Hino Triunfal',
    tags: ['te deum', 'acao de gracas', 'agostinho', 'ambrosio', 'gloria', 'vitoria', 'louvor', 'longa'],
    introducao: 'Cantado nas catedrais e mosteiros no encerramento do ano, nas vitórias e após grandes graças recebidas de Deus.',
    texto: `A Vós, ó Deus, louvamos, a Vós, Senhor, bendizemos.
A Vós, Eterno Pai, venera toda a terra.
A Vós os Anjos, a Vós todos os Céus e todas as Potestades,
A Vós os Querubins e Serafins proclamam em coro incessante:

Santo, Santo, Santo, Senhor Deus dos Exércitos!
Cheios estão os Céus e a terra da majestade da vossa glória!

A Vós o glorioso coro dos Apóstolos,
A Vós a louvável multidão dos Profetas,
A Vós o exército cândido dos Mártires louva.
Por toda a terra a Santa Igreja confessa a vossa glória:
Pai de infinita majestade,
Vosso adorável, verdadeiro e único Filho,
E o Espírito Santo Consolador.

Vós sois o Rei da glória, ó Cristo!
Vós sois o Filho eterno do Pai!
Vós, para libertar o homem, não desdenhastes o seio da Virgem.
Vós, vencendo o aguilhão da morte, abristes aos crentes o Reino dos Céus.
Vós estais sentado à direita de Deus, na glória do Pai.
Cremos que haveis de vir como nosso Juiz.

Nós Vos suplicamos, pois, que socorrais os vossos servos, que remistes com o vosso Preciosíssimo Sangue.
Fazei que sejamos contados com os vossos Santos na glória eterna.

Salvai o vosso povo, Senhor, e abençoai a vossa herança!
Governai-os e exaltai-os para sempre!
Dia a dia Vos bendizemos, e louvamos o vosso nome pelos séculos dos séculos.

Dignai-Vos, Senhor, neste dia, guardar-nos do pecado.
Tende piedade de nós, Senhor, tende piedade de nós.
Venha sobre nós a vossa misericórdia, Senhor, como em Vós esperamos.
Em Vós, Senhor, esperei; não serei confundido eternamente. Amém.`
  },
  {
    id: 'oracao_pelos_agonizantes_moribundos',
    titulo: 'Oração Solene pelos Agonizantes e Moribundos',
    subtitulo: 'Para Salvar as Almas que Falecem no Dia de Hoje',
    categoria: 'longas',
    autor: 'Devocionário Salvai Almas & Tradição Sacerdotal',
    tempo: '⏱️ 5 min',
    tipoBadge: '🕯️ Salvai Almas',
    tags: ['agonizantes', 'moribundos', 'morte', 'salvai almas', 'purgatorio', 'misericordia', 'longa'],
    introducao: 'Cerca de 150 mil pessoas morrem todos os dias no mundo. Esta oração alcança a graça da contrição e salvação final para aqueles que estão dando o último suspiro neste exato instante.',
    texto: `Ó clementíssimo Jesus, amante das almas, eu Vos suplico pela agonia do vosso Sagrado Coração e pelas dores de vossa Mãe Imaculada: lavai no vosso Preciosíssimo Sangue os pecadores de todo o mundo que estão em agonia e que hão de morrer no dia de hoje.

Coração agonizante de Jesus, tende piedade dos moribundos.

Ó São José, pai nutrício de Jesus e verdadeiro esposo da Virgem Maria, rogai por nós e pelos agonizantes deste dia e desta noite.

Ó Maria, Mãe de misericórdia e Refúgio dos pecadores, assisti com a vossa doçura e maternal presença todas as almas que hoje comparecerão perante o Tribunal de Deus. Afastai delas o terror dos demônios, impetrai-lhes a graça do arrependimento perfeito e abri-lhes as portas do Paraíso.

São Miguel Arcanjo, defendei-os no combate final. Que os espíritos malignos não tenham poder sobre os que foram resgatados pelo Sangue do Cordeiro.

Jesus, Maria e José, em vossas mãos encomendamos o espírito de todos os que hoje vão partir deste mundo. Dai-lhes o descanso eterno e a luz perpétua. Amém.`
  },

  // ========================================================================
  // 2. SALVAI ALMAS & PURGATÓRIO (ORAÇÕES DO DEVOCIONÁRIO)
  // ========================================================================
  {
    id: 'jaculatoria_salvai_almas',
    titulo: 'Jaculatória Salvai Almas',
    subtitulo: 'A Oração do Coração e Amor a Jesus e Maria',
    categoria: 'almas',
    autor: 'Irmã Consolata Betrone & Tradição Católica',
    latim: 'Iesu, Maria, amo vos, salvate animas',
    tempo: '⏱️ 2 min',
    tipoBadge: '🕯️ Salvai Almas',
    tags: ['salvai almas', 'jaculatoria', 'consolata betrone', 'purgatorio', 'amor', 'jesus', 'maria', 'jose'],
    introducao: 'Revelada como uma das orações mais doces e eficazes para manter o coração em contínua união com Deus e alcançar a salvação de milhares de almas.',
    promessa: 'A cada ato de amor repetido com o coração, alcança-se a conversão dos pecadores e alívio para as benditas almas do Purgatório.',
    texto: `Jesus, Maria e José, eu vos amo, salvai almas!

Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem da vossa infinita misericórdia.

Dai-lhes, Senhor, o descanso eterno, e brilhe para elas a vossa luz perpétua. Descansem em paz. Amém.`
  },
  {
    id: 'santa_gertrudes_almas',
    titulo: 'Oração de Santa Gertrudes pelas Almas',
    subtitulo: 'Promessa de libertação de 1.000 almas a cada recitação',
    categoria: 'almas',
    autor: 'Santa Gertrudes Magna (1256 - 1302)',
    latim: 'Oratio Sanctae Gertrudis',
    tempo: '⏱️ 2 min',
    tipoBadge: '🕯️ Salvai Almas',
    tags: ['santa gertrudes', 'almas', 'purgatorio', 'preciosissimo sangue', 'salvai almas', 'missa'],
    introducao: 'Nosso Senhor revelou a Santa Gertrudes que esta oração libertaria mil almas do Purgatório cada vez que fosse rezada com devoção.',
    promessa: 'Libertação de mil almas do Purgatório e graças abundantes para os pecadores vivos.',
    texto: `Eterno Pai, eu Vos ofereço o Preciosíssimo Sangue de Vosso Divino Filho Jesus, em união com todas as Santas Missas celebradas hoje em todo o mundo, por todas as santas almas do Purgatório, pelos pecadores em todos os lugares, pelos pecadores na Igreja universal, por aqueles em minha própria casa e dentro de minha família.

Amém.`
  },
  {
    id: 'de_profundis_sl129',
    titulo: 'Salmo 129 (De Profundis)',
    subtitulo: 'O Clamor das Profundezas pelas Almas do Purgatório',
    categoria: 'almas',
    autor: 'Salmo Penitencial de Davi',
    latim: 'De profundis clamavi ad te, Domine',
    tempo: '⏱️ 3 min',
    tipoBadge: '🕯️ Penitencial',
    tags: ['de profundis', 'salmo 129', 'purgatorio', 'almas', 'salvai almas', 'penitencia'],
    introducao: 'O mais célebre salmo penitencial rezado pela Igreja Católica em sufrágio de todos os fiéis defuntos.',
    texto: `Das profundezas clamo a Vós, Senhor; Senhor, escutai a minha voz!
Estejam os vossos ouvidos atentos à voz da minha súplica.

Se tiverdes em conta os nossos pecados, Senhor, Senhor, quem poderá subsistir?
Mas em Vós se encontra o perdão, para que sejais temido com respeito.

Eu confio no Senhor, a minha alma espera na sua Palavra.
A minha alma anseia pelo Senhor, mais do que as sentinelas pela aurora.

Mais do que as sentinelas pela aurora, espere Israel no Senhor;
porque no Senhor está a misericórdia e nele é copiosa a redenção.
Ele há de redimir Israel de todas as suas iniquidades.

Dai-lhes, Senhor, o repouso eterno, e brilhe para elas a luz perpétua.
Descansem em paz. Amém.`
  },
  {
    id: 'almas_mais_abandonadas',
    titulo: 'Oração pelas Almas mais Abandonadas',
    subtitulo: 'Sufrágio por quem não tem ninguém na terra para rezar',
    categoria: 'almas',
    autor: 'Devocionário Tradicional',
    tempo: '⏱️ 2 min',
    tipoBadge: '🕯️ Salvai Almas',
    tags: ['almas esquecidas', 'purgatorio', 'caridade', 'salvai almas', 'misericordia'],
    introducao: 'Reze por aquelas almas benditas que há mais tempo sofrem no Purgatório e das quais nenhum parente se lembra.',
    texto: `Ó Jesus compassivo, que na Cruz sofrestes o abandono supremo, olhai com misericórdia para as almas do Purgatório mais esquecidas e abandonadas, por quem ninguém reza nem oferece o Santo Sacrifício da Missa.

Por vossa Santa Agonia e Chagas Sagradas, abri-lhes as portas do Paraíso para que possam contemplar para sempre a vossa glória face a face. E quando chegar a nossa hora, fazei que sejamos socorridos pela vossa graça e pela intercessão da Virgem Maria.

Dai-lhes, Senhor, o descanso eterno, e brilhe para elas a luz perpétua. Amém.`
  },
  {
    id: 'heroico_ato_caridade',
    titulo: 'Heróico Ato de Caridade pelas Almas',
    subtitulo: 'Entrega voluntária de todas as obras satisfatórias',
    categoria: 'almas',
    autor: 'Tradição Mística Católica',
    tempo: '⏱️ 3 min',
    tipoBadge: '🕯️ Ato de Amor',
    tags: ['ato heroico', 'caridade', 'purgatorio', 'salvai almas', 'maria'],
    introducao: 'Uma das mais elevadas práticas espirituais: doar todas as indulgências e méritos à Santíssima Virgem para que Ela os distribua às almas do Purgatório.',
    texto: `Ó meu Deus, em união com os méritos de Jesus e de Maria, eu Vos ofereço, pelas almas do Purgatório, todas as minhas obras satisfatórias de toda a minha vida, assim como também todas aquelas que me forem aplicadas depois da minha morte.

Coloco tudo nas mãos puríssimas da Virgem Maria, para que Ela as aplique àquelas santas almas que na sua sabedoria e maternal amor desejar libertar primeiro do Purgatório. Dignai-Vos, meu Deus, aceitar esta minha humilde oferta por amor a Vós e à salvação das almas. Amém.`
  },

  // ========================================================================
  // 3. SANTOS DA IGREJA
  // ========================================================================
  {
    id: 'sao_bento_cruz',
    titulo: 'Oração e Medalha de São Bento',
    subtitulo: 'Poderoso Exorcismo contra as ciladas e venenos do demônio',
    categoria: 'santos',
    autor: 'São Bento de Núrsia (480 - 547)',
    latim: 'Crux Sacra Sit Mihi Lux',
    tempo: '⏱️ 2 min',
    tipoBadge: '🕊️ Santo da Igreja',
    tags: ['sao bento', 'cruz sagrada', 'protecao', 'libertacao', 'inimigo', 'mal', 'exorcismo'],
    introducao: 'A oração gravada na sagrada Medalha de São Bento, usada há mais de 1500 anos pela Igreja Católica para afastar o mal.',
    texto: `A Cruz Sagrada seja a minha luz,
Não seja o dragão meu guia.
Retira-te, satanás!
Nunca me aconselhes coisas vãs.
É mau o que tu me ofereces,
Bebe tu mesmo o teu veneno!

Paz, bênção e vitória pela Cruz de Nosso Senhor Jesus Cristo. Em nome do Pai, do Filho e do Espírito Santo. Amém.`
  },
  {
    id: 'sao_miguel_leao_xiii',
    titulo: 'Oração a São Miguel Arcanjo',
    subtitulo: 'Oração de Batalha Espiritual composta pelo Papa Leão XIII',
    categoria: 'santos',
    autor: 'Papa Leão XIII (1886)',
    latim: 'Sancte Michael Archangele, defende nos in proelio',
    tempo: '⏱️ 2 min',
    tipoBadge: '🛡️ Batalha Espiritual',
    tags: ['sao miguel', 'arcanjo', 'batalha espiritual', 'leao xiii', 'protecao', 'anjos'],
    introducao: 'Composta após uma visão profética das batalhas espirituais dos últimos tempos. O Príncipe da Milícia Celeste defende o povo de Deus.',
    texto: `São Miguel Arcanjo, defendei-nos no combate.
Sede o nosso refúgio contra as maldades e as ciladas do demônio.

Ordene-lhe Deus, instantemente o pedimos, e vós, Príncipe da Milícia Celeste, pelo divino poder, precipitai no inferno a satanás e a todos os espíritos malignos que andam pelo mundo para perder as almas.

Amém.`
  },
  {
    id: 'sao_francisco_paz',
    titulo: 'Oração da Paz de São Francisco de Assis',
    subtitulo: 'Instrumento do Amor, Perdão e Luz Divina',
    categoria: 'santos',
    autor: 'São Francisco de Assis (1182 - 1226)',
    tempo: '⏱️ 3 min',
    tipoBadge: '🕊️ Oração da Paz',
    tags: ['sao francisco', 'paz', 'amor', 'perdao', 'esperanca', 'luz', 'alegria'],
    introducao: 'Uma das preces mais comoventes da cristandade, ensina a amar mais do que ser amado e a perdoar para ser perdoado.',
    texto: `Senhor, fazei-me um instrumento de vossa paz.
Onde houver ódio, que eu leve o amor;
Onde houver ofensa, que eu leve o perdão;
Onde houver discórdia, que eu leve a união;
Onde houver dúvida, que eu leve a fé;
Onde houver erro, que eu leve a verdade;
Onde houver desespero, que eu leve a esperança;
Onde houver tristeza, que eu leve a alegria;
Onde houver trevas, que eu leve a luz.

Ó Mestre, fazei que eu procure mais consolar que ser consolado;
Compreender que ser compreendido;
Amar que ser amado.
Pois é dando que se recebe;
É perdoando que se é perdoado;
E é morrendo que se vive para a vida eterna. Amém.`
  },
  {
    id: 'santo_expedito_urgente',
    titulo: 'Oração a Santo Expedito',
    subtitulo: 'Padroeiro das Causas Justas e Urgentes',
    categoria: 'santos',
    autor: 'Santo Expedito Mártir (Século IV)',
    tempo: '⏱️ 3 min',
    tipoBadge: '⚡ Causas Urgentes',
    tags: ['santo expedito', 'causas urgentes', 'socorro imediato', 'aflicao', 'trabalho', 'tribulacao'],
    introducao: 'Invocado em momentos de aperto, desespero e necessidades imediatas que não podem esperar.',
    texto: `Meu Santo Expedito das causas justas e urgentes, intercedei por mim junto a Nosso Senhor Jesus Cristo, para que venha em meu socorro nesta hora de aflição e desespero.

Vós que sois o Santo guerreiro, vós que sois o Santo dos aflitos e desesperados, vós que sois o Santo das causas urgentes, protegei-me, ajudai-me, concedei-me força, coragem e serenidade.

Atendei ao meu pedido (fazer o pedido com fé). Ajudai-me a superar estas horas difíceis, protegei-me de todos que possam me prejudicar, protegei a minha família e devolvei-me a paz e a tranquilidade. Serei grato pelo resto de minha vida e levarei vosso nome a todos os que têm fé.

Santo Expedito, rogai por nós! Amém.`
  },
  {
    id: 'santo_antonio_bencao',
    titulo: 'Responsório e Oração a Santo Antônio',
    subtitulo: 'Padroeiro dos Pobres, das Famílias e das Coisas Perdidas',
    categoria: 'santos',
    autor: 'Santo Antônio de Pádua / Lisboa (1195 - 1231)',
    tempo: '⏱️ 3 min',
    tipoBadge: '🕊️ Doutor da Igreja',
    tags: ['santo antonio', 'milagres', 'familias', 'perdas', 'bencao', 'paodeantonio'],
    introducao: 'Doutor do Evangelho e grande taumaturgo, conhecido pelos prodígios e socorro às famílias.',
    texto: `Se milagres desejais, recorrei a Santo Antônio;
Vereis fugir o demônio e as tentações infernais.
Recupera-se o perdido, rompe-se a dura prisão,
E no auge do furacão cede o mar embravecido.

Ó glorioso Santo Antônio, amigo do Menino Jesus e servo fiel de Maria Santíssima, colocai sob a vossa santa proteção a minha vida, a minha família e o meu trabalho. Alcançai-me de Deus a graça que tanto necessito (fazer o pedido), e dai-me a graça de viver santamente nos mandamentos do Senhor.

Santo Antônio de Pádua, rogai por nós! Amém.`
  },
  {
    id: 'santa_rita_impossiveis',
    titulo: 'Oração a Santa Rita de Cássia',
    subtitulo: 'Advogada das Causas Impossíveis e Desesperadas',
    categoria: 'santos',
    autor: 'Santa Rita de Cássia (1381 - 1457)',
    tempo: '⏱️ 3 min',
    tipoBadge: '🌹 Causas Impossíveis',
    tags: ['santa rita', 'causas impossiveis', 'espinhos', 'cura', 'matrimonio', 'reconciliacao'],
    introducao: 'Santa Rita suportou com amor heroico o sofrimento e foi agraciada com um espinho da Coroa de Cristo.',
    texto: `Ó poderosa e gloriosa Santa Rita de Cássia, eis a vossos pés uma alma desamparada que, necessitando de auxílio, a vós recorre com a doce esperança de ser atendida por vós, que tendes o título de Santa dos Casos Impossíveis e Desesperados.

Ó sagrada advogada, tomai a peito a minha causa, intercedei junto a Deus para que me conceda a graça de que tanto necessito (fazer o pedido). Não permitais que eu tenha de me afastar de vossos pés sem ser atendido.

Se houver em mim algum obstáculo que impeça a graça, ajudai-me a retirá-lo. Olhai para as minhas lágrimas e confiante na vossa intercessão junto ao Coração de Jesus, bendirei a vossa bondade por toda a eternidade. Amém.`
  },
  {
    id: 'sao_judas_tadeu_aflicao',
    titulo: 'Oração a São Judas Tadeu',
    subtitulo: 'Apóstolo fiel e Patrono dos Casos Aflitos e Desesperados',
    categoria: 'santos',
    autor: 'São Judas Tadeu Apóstolo',
    tempo: '⏱️ 3 min',
    tipoBadge: '✝️ Apóstolo de Cristo',
    tags: ['sao judas tadeu', 'apostolo', 'casos desesperados', 'cura', 'angustia', 'esperanca'],
    introducao: 'Primo de Jesus e irmão de São Tiago Menor, é o padroeiro dos que se encontram em tribulações extremas.',
    texto: `São Judas Tadeu, glorioso Apóstolo, fiel servo e amigo de Jesus, o nome do traidor tem sido a causa de que fôsseis esquecido por muitos, mas a Igreja vos honra e invoca universalmente como o patrono dos casos desesperados e dos negócios sem remédio.

Rogai por mim, que sou tão miserável. Fazei uso, eu vos peço, desse particular privilégio que vos foi concedido, de trazer socorro visível e rápido onde quase não há esperança. Vinde em meu auxílio nesta grande aflição, para que eu possa receber o consolo e o socorro do Céu em todas as minhas necessidades, provações e sofrimentos (fazer o pedido), e que eu possa bendizer a Deus convosco e com todos os eleitos por toda a eternidade.

Prometo, ó bendito São Judas, lembrar-me sempre desta grande graça, honrar-vos sempre como meu especial e poderoso patrono e com fervor encorajar a devoção a vós. Amém.`
  },
  {
    id: 'padre_pio_fica_comigo',
    titulo: 'Fica Comigo, Senhor (Oração de Padre Pio)',
    subtitulo: 'Oração após a Comunhão de São Pio de Pietrelcina',
    categoria: 'santos',
    autor: 'São Pio de Pietrelcina (1887 - 1968)',
    tempo: '⏱️ 4 min',
    tipoBadge: '🕊️ Mística & Comunhão',
    tags: ['padre pio', 'fica comigo senhor', 'comunhao', 'eucaristia', 'fe', 'trevas', 'luz'],
    introducao: 'Padre Pio rezava esta comovente súplica após a Santa Missa, pedindo a presença constante de Jesus.',
    texto: `Fica comigo, Senhor, porque é necessária a tua presença para não te esquecer. Sabes quão facilmente te abandono.
Fica comigo, Senhor, porque sou fraco e preciso da tua força para não cair tantas vezes.
Fica comigo, Senhor, porque tu és a minha vida e sem ti esmorece o meu fervor.
Fica comigo, Senhor, porque tu és a minha luz e sem ti reinam as trevas.

Fica comigo, Senhor, para me dares a conhecer a tua vontade.
Fica comigo, Senhor, para que ouça a tua voz e a siga.
Fica comigo, Senhor, porque desejo amar-te muito e estar sempre em tua companhia.
Fica comigo, Jesus, porque, por mais pobre que seja a minha alma, deseja ser para ti um lugar de consolo e um ninho de amor.

Deixa-me reconhecer-te, como os teus discípulos, ao partir do pão, para que a Comunhão Eucarística seja a luz que dissipa as trevas, a força que me sustenta e a única alegria do meu coração.

Fica comigo, Senhor, na hora da morte, ou se não pela Comunhão, ao menos pela graça e pelo amor. Amém.`
  },
  {
    id: 'sao_jose_terror_demonios',
    titulo: 'Oração ao Glorioso São José',
    subtitulo: 'Patrono da Igreja Universal e Terror dos Demônios',
    categoria: 'santos',
    autor: 'Tradição da Igreja Católica',
    tempo: '⏱️ 3 min',
    tipoBadge: '🕊️ Patrono Universal',
    tags: ['sao jose', 'pai adotivo', 'familias', 'trabalho', 'boa morte', 'terror dos demonios'],
    introducao: 'Esposo puríssimo da Virgem Maria e pai nutrício do Filho de Deus, a quem nada Jesus recusa no Céu.',
    texto: `Ó glorioso São José, a quem foi dado o poder de tornar possíveis as coisas humanamente impossíveis, vinde em nosso auxílio nas dificuldades em que nos encontramos.

Tomai sob a vossa proteção a causa tão importante e difícil que vos confiamos (fazer o pedido), para que tenha um êxito favorável. Ó Pai amado, em vós depositamos toda a nossa confiança. Que não se diga que vos invocamos em vão.

E já que tudo podeis junto a Jesus e Maria, mostrai-nos que a vossa bondade é tão grande quanto o vosso poder. São José, terror dos demônios e protetor das famílias, rogai por nós! Amém.`
  },

  // ========================================================================
  // 4. MANHÃ & NOITE (ORAÇÕES COTIDIANAS)
  // ========================================================================
  {
    id: 'oracao_da_manha_oferecimento',
    titulo: 'Oração da Manhã & Oferecimento do Dia',
    subtitulo: 'Consagração dos primeiros pensamentos a Deus',
    categoria: 'manha_noite',
    autor: 'Apostolado da Oração',
    tempo: '⏱️ 2 min',
    tipoBadge: '☀️ Oração da Manhã',
    tags: ['manha', 'oferecimento do dia', 'sagrado coracao', 'acordar', 'bencao'],
    introducao: 'Reze ao acordar para santificar cada hora de trabalho, estudo e convivência do seu dia.',
    texto: `Senhor, no silêncio deste dia que amanhece, venho pedir-Vos a paz, a sabedoria, a força.
Quero olhar hoje o mundo com olhos cheios de amor, ser paciente, compreensivo, manso e prudente.

Quero ver, além das aparências, vossos filhos como Vós mesmos os vedes, e assim não ver senão o bem em cada um.
Cerrai meus ouvidos a toda calúnia. Guardai minha língua de toda maldade.
Que só de bênçãos se encha meu espírito.

Que eu seja tão bom e tão alegre, que todos aqueles que se aproximarem de mim sintam a vossa presença.
Revesti-me de vossa beleza, Senhor, e que, no decurso deste dia, eu Vos revele a todos.

Divino Coração de Jesus, por meio do Imaculado Coração de Maria, eu Vos ofereço as orações, obras, trabalhos, sofrimentos e alegrias deste dia. Amém.`
  },
  {
    id: 'oracao_da_noite_exame',
    titulo: 'Oração da Noite & Repouso em Deus',
    subtitulo: 'Agradecimento, perdão e entrega antes de dormir',
    categoria: 'manha_noite',
    autor: 'Liturgia das Horas (Completas)',
    tempo: '⏱️ 3 min',
    tipoBadge: '🌙 Oração da Noite',
    tags: ['noite', 'dormir', 'exame de consciencia', 'paz', 'sono', 'anjodaguarda'],
    introducao: 'Reze antes de repousar, entregando o seu sono e sua alma nas mãos do Criador.',
    texto: `Meu Deus e meu Pai, eu Vos agradeço por todas as graças e benefícios que hoje me concedestes.

Peço-Vos perdão de todo o coração por todas as faltas, pecados e negligências que cometi neste dia, por pensamentos, palavras, atos e omissões (momento de silêncio para recordar o dia). Concedei-me o vosso perdão e a graça de não mais pecar.

Em vossas mãos, Senhor, entrego o meu espírito. Vós nos redimistes, Senhor, Deus da verdade.
Guardai-nos, Senhor, como a pupila dos olhos; à sombra de vossas asas protegei-nos.

Santo Anjo da Guarda, velai pelo meu sono e defendei-me de todo o mal. Sagrado Coração de Jesus, em Vós confio. Amém.`
  },
  {
    id: 'oracao_ao_anjo_guarda',
    titulo: 'Oração ao Santo Anjo da Guarda',
    subtitulo: 'Invocação ao guia celeste protetor da nossa alma',
    categoria: 'manha_noite',
    autor: 'Tradição Católica Tradicional',
    latim: 'Angele Dei, qui custos es mei',
    tempo: '⏱️ 1 min',
    tipoBadge: '👼 Anjo Custódio',
    tags: ['anjo da guarda', 'protecao', 'guia', 'custodio', 'criancas', 'familia'],
    introducao: 'Deus confiou a cada um de nós um Santo Anjo Custódio para nos iluminar, guardar, reger e governar.',
    texto: `Santo Anjo do Senhor, meu zeloso guardador,
se a ti me confiou a piedade divina,
sempre me rege, me guarde, me governe e me ilumine.

Amém.`
  },
  {
    id: 'angelus_domini',
    titulo: 'Oração do Ângelus',
    subtitulo: 'A Memória da Encarnação do Verbo (6h, 12h e 18h)',
    categoria: 'manha_noite',
    autor: 'Tradição Mariana dos Papas',
    latim: 'Angelus Domini nuntiavit Mariae',
    tempo: '⏱️ 3 min',
    tipoBadge: '🌹 Ângelus Diário',
    tags: ['angelus', 'encarnacao', 'ave maria', 'meio dia', '18h', 'sino'],
    introducao: 'Rezada tradicionalmente às 6h da manhã, ao meio-dia e às 18h ao toque dos sinos das igrejas.',
    texto: `— O Anjo do Senhor anunciou a Maria.
— E Ela concebeu do Espírito Santo.

(Reza-se uma Ave-Maria)

— Eis aqui a serva do Senhor.
— Faça-se em mim segundo a vossa palavra.

(Reza-se uma Ave-Maria)

— E o Verbo divino se fez carne.
— E habitou entre nós.

(Reza-se uma Ave-Maria)

— Rogai por nós, Santa Mãe de Deus.
— Para que sejamos dignos das promessas de Cristo.

Oremos: Infundi, Senhor, nós Vos pedimos, a vossa graça em nossas almas, para que nós, que conhecemos pela Anunciação do Anjo a Encarnação de Jesus Cristo, vosso Filho, pela sua Paixão e Cruz sejamos conduzidos à glória da Ressurreição. Por Cristo, Nosso Senhor. Amém.`
  },

  // ========================================================================
  // 5. JESUS & SAGRADO CORAÇÃO
  // ========================================================================
  {
    id: 'alma_de_cristo_anima_christi',
    titulo: 'Alma de Cristo (Anima Christi)',
    subtitulo: 'Súplica ardente de intimidade e proteção com o Salvador',
    categoria: 'jesus',
    autor: 'Papa João XXII (Século XIV) / Santo Inácio de Loyola',
    latim: 'Anima Christi, sanctifica me',
    tempo: '⏱️ 2 min',
    tipoBadge: '✝️ Mística Eucarística',
    tags: ['alma de cristo', 'anima christi', 'comunhao', 'chagas de cristo', 'sangue de cristo'],
    introducao: 'Uma das orações mais amadas da Igreja, enriquecida com indulgências e profundamente mística.',
    texto: `Alma de Cristo, santificai-me.
Corpo de Cristo, salvai-me.
Sangue de Cristo, inebriai-me.
Água do lado de Cristo, lavai-me.
Paixão de Cristo, confortai-me.

Ó bom Jesus, ouvi-me.
Dentro de vossas Chagas, escondei-me.
Não permitais que me separe de Vós.
Do inimigo maligno, defendei-me.
Na hora da minha morte, chamai-me.

E mandai-me ir para Vós,
Para que com os vossos Santos Vos louve
Por todos os séculos dos séculos.

Amém.`
  },
  {
    id: 'sagrado_coracao_jesus_ato',
    titulo: 'Consagração ao Sagrado Coração de Jesus',
    subtitulo: 'Entrega total de amor e reparação',
    categoria: 'jesus',
    autor: 'Santa Margarida Maria Alacoque (1647 - 1690)',
    tempo: '⏱️ 3 min',
    tipoBadge: '❤️ Sagrado Coração',
    tags: ['sagrado coracao', 'consagracao', 'reparacao', 'margarida maria', 'amor divino'],
    introducao: 'Nosso Senhor prometeu que abençoaria as casas onde a imagem do Seu Coração fosse exposta e venerada.',
    texto: `Eu vos dou e consagro, ó Sagrado Coração de Jesus Cristo, a minha pessoa e a minha vida, as minhas ações, penas e sofrimentos, para não querer mais servir-me de nenhuma parte de meu ser senão para vos honrar, amar e glorificar.

É esta a minha vontade irrevogável: ser todo vosso e tudo fazer por vosso amor, renunciando de todo o meu coração a tudo quanto vos possa desagradar.

Sede, pois, ó Coração Divino, o único objeto de meu amor, o protetor de minha vida, a garantia de minha salvação, o remédio de minha fragilidade e inconstância, o reparador de todos os defeitos de minha vida e o meu asilo seguro na hora da minha morte.

Sagrado Coração de Jesus, em Vós confio e espero! Amém.`
  },
  {
    id: 'santas_chagas_jesus',
    titulo: 'Oração das Santas Chagas de Jesus',
    subtitulo: 'Oferecimento reparador das feridas sagradas de Cristo',
    categoria: 'jesus',
    autor: 'Irmã Maria Marta Chambon (1841 - 1907)',
    tempo: '⏱️ 3 min',
    tipoBadge: '✝️ Santas Chagas',
    tags: ['santas chagas', 'sangue', 'reparacao', 'cura', 'perdao', 'misericordia'],
    introducao: 'Promessas extraordinárias de cura, perdão e alívio das almas concedidas por Jesus a quem honrar suas Santas Chagas.',
    texto: `Pai Eterno, eu Vos ofereço as Chagas de Nosso Senhor Jesus Cristo para curar as de nossas almas.

Meu Jesus, perdão e misericórdia, pelos méritos de vossas Santas Chagas.

Pai Santo, pelas Chagas das vossas mãos sagradas, perdoai as obras pecaminosas de nossas mãos;
Pelas Chagas dos vossos pés sagrados, perdoai os maus caminhos que percorremos;
Pela Chaga do vosso ombro doloroso, aliviai o peso de nossas cruzes;
Pela Chaga do vosso Sagrado Lado aberto pela lança, fazei brotar rios de água viva e misericórdia sobre nós e sobre o mundo inteiro.

Amém.`
  },

  // ========================================================================
  // 6. MARIANAS (NOSSA SENHORA)
  // ========================================================================
  {
    id: 'memorare_lembraivos',
    titulo: 'Lembrai-vos (Memorare)',
    subtitulo: 'A Oração de Confiança Total em Maria que nunca falha',
    categoria: 'maria',
    autor: 'São Bernardo de Claraval (1090 - 1153)',
    latim: 'Memorare, o piissima Virgo Maria',
    tempo: '⏱️ 2 min',
    tipoBadge: '🌹 Oração Mariana',
    tags: ['memorare', 'lembrai-vos', 'sao bernardo', 'confianca', 'maria', 'mae'],
    introducao: 'Nunca se ouviu dizer no mundo que alguém que tenha recorrido à proteção da Mãe de Deus tenha sido por Ela desamparado.',
    texto: `Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que têm recorrido à vossa proteção, implorado a vossa assistência e reclamado o vosso socorro, fosse por Vós desamparado.

Animado eu, pois, de igual confiança, a Vós, ó Virgem das virgens, como a Mãe recorro; de Vós me valho e, gemendo sob o peso dos meus pecados, me prostro a vossos pés.

Não desprezeis as minhas súplicas, ó Mãe do Verbo de Deus humanado, mas acolhei-as propícia e ouvi-me.

Amém.`
  },
  {
    id: 'magnificat_cantico_maria',
    titulo: 'Magnificat (Cântico de Nossa Senhora)',
    subtitulo: 'A Minha Alma Engrandece o Senhor (Lc 1, 46-55)',
    categoria: 'maria',
    autor: 'Evangelho de São Lucas / Santíssima Virgem Maria',
    latim: 'Magnificat anima mea Dominum',
    tempo: '⏱️ 3 min',
    tipoBadge: '📖 Cântico Bíblico',
    tags: ['magnificat', 'cantico', 'evangelho', 'lucas', 'louvor', 'humildade'],
    introducao: 'O cântico entoado por Maria na Visitação a Santa Isabel, exaltando a misericórdia e as maravilhas do Todo-Poderoso.',
    texto: `A minha alma engrandece o Senhor,
E o meu espírito se alegra em Deus, meu Salvador;
Porque olhou para a humildade de sua serva;
Eis que desde agora todas as gerações me chamarão bem-aventurada.

Porque o Todo-Poderoso me fez grandes coisas, e Santo é o seu nome;
A sua misericórdia se estende de geração em geração sobre os que o temem.
Manifestou o poder do seu braço;
Dispersou os soberbos nos pensamentos dos seus corações.

Derrubou dos tronos os poderosos e elevou os humildes;
Encheu de bens os famintos e despediu os ricos de mãos vazias.
Acolheu a Israel, seu servo, lembrado de sua misericórdia,
Como havia prometido a nossos pais, em favor de Abraão e de sua descendência para sempre.

Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.`
  },
  {
    id: 'oracao_desatadora_dos_nos',
    titulo: 'Oração a Nossa Senhora Desatadora dos Nós',
    subtitulo: 'Para desatar os nós da vida familiar, financeira e espiritual',
    categoria: 'maria',
    autor: 'Devoção Mariana Tradicional',
    tempo: '⏱️ 3 min',
    tipoBadge: '🌹 Devoção Mariana',
    tags: ['desatadora dos nos', 'dificuldades', 'angustia', 'problemas', 'cura', 'maria'],
    introducao: 'Nossa Senhora desata com suas mãos maternais os nós de discórdia, doenças e aflições que parecem insolúveis.',
    texto: `Virgem Maria, Mãe do belo amor, Mãe que nunca recusa socorrer a um filho aflito, Mãe cujas mãos não param nunca de servir aos seus filhos amados, porque estão cheias do divino amor e da imensa misericórdia que brotam do vosso Coração, voltai o vosso olhar compassivo sobre mim e vede o nó das dificuldades que sufocam a minha vida.

Vós bem conheceis o meu desespero e a minha dor. Vós sabeis o quanto esses nós me paralisam. Maria, Mãe que Deus encarregou de desatar os nós da vida dos seus filhos, confio hoje a fita da minha vida em vossas mãos.

Ninguém, nem mesmo o maligno, pode tirá-la do vosso precioso amparo. Em vossas mãos não há nó que não possa ser desfeito. Mãe poderosa, por vossa graça e vosso poder intercessor junto a vosso Filho Jesus, meu Salvador, recebei hoje em vossas mãos este nó (fazer o pedido).

Peço-vos que o desateis para a glória de Deus, e por todo o sempre. Vós sois a minha esperança. Vós sois o meu consolo e a fortaleza das minhas fracas forças. Amém.`
  },

  // ========================================================================
  // 7. PROTEÇÃO & LIBERTAÇÃO
  // ========================================================================
  {
    id: 'selamento_preciosissimo_sangue',
    titulo: 'Oração de Selamento no Preciosíssimo Sangue',
    subtitulo: 'Proteção invisível para a casa, família e pensamentos',
    categoria: 'protecao',
    autor: 'Tradição da Batalha Espiritual Católica',
    tempo: '⏱️ 3 min',
    tipoBadge: '🛡️ Selamento Sagrado',
    tags: ['sangue de jesus', 'selamento', 'protecao', 'casa', 'familia', 'libertacao', 'mal'],
    introducao: 'Clamor bíblico baseado no sangue do Cordeiro que protege o povo de Deus contra qualquer investida das trevas.',
    texto: `Senhor Jesus, pelo poder do Vosso Preciosíssimo Sangue derramado na Cruz, eu selo e cubro a minha mente, o meu coração, o meu corpo, a minha alma e todo o meu ser.

Selo a minha casa, a minha família, as portas, as janelas, o teto, o chão e todos os bens que o Senhor me confiou. Selo os meus caminhos, o meu trabalho, a minha saúde e as pessoas que amo.

Nenhum mal, nenhuma inveja, nenhum dardo inflamado do maligno, nenhuma praga ou enfermidade poderá ultrapassar a barreira sagrada do Sangue de Jesus.

O Sangue de Jesus tem poder! O Sangue de Cristo nos protege, nos liberta e nos dá a vitória. Em nome do Pai, do Filho e do Espírito Santo. Amém.`
  },
  {
    id: 'armadura_de_deus_efesios',
    titulo: 'A Armadura de Deus (Efésios 6)',
    subtitulo: 'Revestimento espiritual contra as forças das trevas',
    categoria: 'protecao',
    autor: 'São Paulo Apóstolo (Ef 6, 10-18)',
    tempo: '⏱️ 3 min',
    tipoBadge: '🛡️ Armadura Divina',
    tags: ['armadura de deus', 'sao paulo', 'efesios', 'batalha', 'espada do espirito', 'capacete'],
    introducao: 'O conselho apostólico de São Paulo para nos mantermos firmes e inabaláveis nos dias difíceis.',
    texto: `Fortalecei-vos no Senhor e na força do seu poder soberano.
Revesti-vos da armadura de Deus, para que possais resistir às ciladas do demônio;
Pois não é contra homens de carne e sangue que temos de lutar, mas contra os principados e potestades, contra os príncipes deste mundo tenebroso, contra as forças espirituais do mal espalhadas pelos ares.

Tomai, pois, a armadura de Deus, a fim de que possais resistir no dia mau e ficar de pé após ter tudo superado.

Ficai alerta, à cinta com o cinto da verdade, o peito protegido com a couraça da justiça, e os pés calçados com o zelo para propagar o Evangelho da paz.
Embraçai em tudo o escudo da fé, com o qual podereis apagar todos os dardos inflamados do maligno.
Tomai o capacete da salvação e a espada do Espírito, que é a Palavra de Deus.

Amém.`
  },
  {
    id: 'augusta_rainha_dos_ceus',
    titulo: 'Augusta Rainha dos Céus',
    subtitulo: 'Envio das Legiões Angélicas para derrotar o inferno',
    categoria: 'protecao',
    autor: 'Padre Luís Cestac (1863) / Papa São Pio X',
    tempo: '⏱️ 2 min',
    tipoBadge: '🛡️ Proteção Angélica',
    tags: ['augusta rainha', 'anjos', 'legioes celestes', 'vitoria', 'sao miguel', 'maria'],
    introducao: 'Ditada por Nossa Senhora com a promessa de afastar e esmagar os espíritos das trevas onde quer que seja rezada.',
    texto: `Augusta Rainha dos Céus e Soberana Senhora dos Anjos, Vós que recebestes de Deus o poder e a missão de esmagar a cabeça de satanás, nós vos pedimos humildemente: enviai as vossas Santas Legiões celestes, para que, sob as vossas ordens e pelo vosso poder, persigam os demônios, combatam-nos por toda a parte, reprimam a sua audácia e os precipitem no abismo.

Quem como Deus? Ninguém como Deus!

Ó boa e terna Mãe, Vós sereis sempre o nosso amor e a nossa esperança.
Ó Mãe Divina, enviai os Santos Anjos para me defender e repelir para longe de mim o cruel inimigo.

Santos Anjos e Arcanjos, defendei-nos e guardai-nos. Amém.`
  },

  // ========================================================================
  // 8. FAMÍLIA, CURA & TRABALHO
  // ========================================================================
  {
    id: 'bencao_do_lar_familia',
    titulo: 'Bênção e Proteção do Lar e da Família',
    subtitulo: 'Consagração da casa como uma verdadeira Igreja Doméstica',
    categoria: 'familia_cura',
    autor: 'Devocionário das Famílias Católicas',
    tempo: '⏱️ 3 min',
    tipoBadge: '🏠 Bênção do Lar',
    tags: ['familia', 'casa', 'lar', 'bencao', 'paz', 'filhos', 'matrimonio'],
    introducao: 'Reze pelos cômodos de sua casa, consagrando cada ambiente à presença e proteção da Sagrada Família de Nazaré.',
    texto: `Senhor Deus de infinita bondade, abençoai a nossa casa e a nossa família. Fazei que este lar seja um santuário de paz, harmonia, respeito e amor mútuo.

Afastai daqui toda a discórdia, ressentimento, inveja, orgulho e qualquer influência contrária à vossa santa vontade.

Jesus, Maria e José, Sagrada Família de Nazaré, habitai conosco. Que a vossa santa presença encha nossos corações de paciência e consolo. Que nossos filhos cresçam em graça e sabedoria, e que os pais sejam espelhos de fidelidade e fé.

Que a vossa bênção permaneça sempre sobre nós. Em nome do Pai, do Filho e do Espírito Santo. Amém.`
  },
  {
    id: 'cura_e_libertacao_enfermos',
    titulo: 'Oração pela Cura dos Enfermos e Alívio da Dor',
    subtitulo: 'Súplica pelas enfermidades do corpo, da alma e da mente',
    categoria: 'familia_cura',
    autor: 'Tradição de Oração por Cura da Igreja',
    tempo: '⏱️ 3 min',
    tipoBadge: '🌿 Oração por Cura',
    tags: ['cura', 'doenca', 'saude', 'enfermos', 'medicos', 'hospital', 'milagre'],
    introducao: 'Jesus passou pelo mundo curando todas as enfermidades e consolando os que sofrem.',
    texto: `Senhor Jesus, Vós que tomastes sobre Vós as nossas dores e carregastes as nossas enfermidades, olho para Vós com fé e esperança.

Coloco em vossas mãos benditas a minha saúde (ou a saúde de [dizer o nome do enfermo]). Vós sois o Médico dos médicos. Pelo poder das vossas Chagas e pelo sopro do vosso Espírito Santo, curai o corpo, a mente e o coração deste vosso filho.

Se for da vossa vontade divina que esta cruz seja carregada por mais tempo, dai-nos a força, a paciência e a paz que ultrapassa todo o entendimento humano. Mas se for para a vossa maior glória, mandai a vossa palavra de cura, e ficaremos sãos.

Jesus, manso e humilde de coração, fazei o nosso coração semelhante ao vosso. Amém.`
  },
  {
    id: 'oracao_para_trabalho_emprego',
    titulo: 'Oração para Obter Trabalho e Prosperidade Honesta',
    subtitulo: 'Súplica pela dignidade do sustento e bênção financeira',
    categoria: 'familia_cura',
    autor: 'Oração Católica ao Santo Trabalhador',
    tempo: '⏱️ 3 min',
    tipoBadge: '💼 Trabalho & Sustento',
    tags: ['trabalho', 'emprego', 'sustento', 'dividas', 'prosperidade', 'sao jose operario'],
    introducao: 'Invocação a Deus Pai e a São José Operário para abrir portas de trabalho e prover o pão de cada dia.',
    texto: `Senhor meu Deus, Criador de todas as coisas, Vós que destes ao homem a dignidade do trabalho para sustentar a si e a sua família, ouvi a minha humilde oração.

Vós conheceis as minhas necessidades e preocupações financeiras. Abri, Senhor, as portas de um trabalho justo, honesto e digno, onde eu possa colocar meus talentos a serviço do bem e ganhar o pão de cada dia com a vossa bênção.

Abençoai também os que já estão trabalhando, para que haja justiça, serenidade e paz no ambiente de trabalho. Livrai-nos de toda ganância e desespero, e concedei-nos a sabedoria para administrar retamente tudo o que vier às nossas mãos.

São José Operário, providenciai o nosso sustento! Amém.`
  },

  // ========================================================================
  // 9. ESPÍRITO SANTO & MISSA
  // ========================================================================
  {
    id: 'veni_creator_spiritus',
    titulo: 'Vinde, Espírito Criador (Veni Creator Spiritus)',
    subtitulo: 'O Hino solene de Invocação dos 7 Dons do Espírito Santo',
    categoria: 'espiritosanto',
    autor: 'Rábano Mauro (Século IX)',
    latim: 'Veni, Creator Spiritus, mentes tuorum visita',
    tempo: '⏱️ 3 min',
    tipoBadge: '🕊️ Espírito Santo',
    tags: ['espirito santo', 'veni creator', '7 dons', 'pentecostes', 'luz', 'sabedoria'],
    introducao: 'Entoado nos conclaves dos cardeais, ordenações sacerdotais e em todos os grandes momentos da Igreja.',
    texto: `Vinde, Espírito Criador, visitai as almas dos vossos fiéis;
Enchei de graça celestial os corações que criastes.

Vós sois chamado o Consolador, dom do Deus Altíssimo,
Fonte viva, fogo, caridade e unção espiritual.

Vós sois septiforme em vossos dons, dedo da destra paterna,
Vós, solene promessa do Pai, que inspirais a nossa voz.

Acendei a luz nos sentidos, infundi o amor nos corações,
Fortalecei a nossa fraqueza com a vossa perpétua fortaleza.

Afastai para longe o inimigo, dai-nos prontamente a paz;
Sendo Vós o nosso guia, evitaremos todo o mal.

Fazei-nos conhecer o Pai, e também o Filho,
E em Vós, Espírito de ambos, façamos crer em todo o tempo.

Glória a Deus Pai, e ao Filho que ressuscitou dos mortos,
E ao Consolador, por todos os séculos dos séculos. Amém.`
  },
  {
    id: 'oracao_antes_comunhao',
    titulo: 'Oração de Preparação para a Santa Comunhão',
    subtitulo: 'Para receber o Santíssimo Sacramento com pureza e amor',
    categoria: 'espiritosanto',
    autor: 'São Tomás de Aquino (1225 - 1274)',
    latim: 'Oratio ante Missam Sancti Thomae Aquinatis',
    tempo: '⏱️ 3 min',
    tipoBadge: '⛪ Santa Missa',
    tags: ['santa missa', 'comunhao', 'sao tomas de aquino', 'eucaristia', 'sacramento'],
    introducao: 'Composta pelo Doutor Angélico para preparar o coração do fiel antes de se aproximar do Altar.',
    texto: `Onipotente e sempiterno Deus, eis que me aproximo do Sacramento do vosso Filho Unigênito, Nosso Senhor Jesus Cristo. Aproximo-me como enfermo ao médico da vida, como impuro à fonte da misericórdia, como cego à luz da claridade eterna, como pobre e indigente ao Senhor do Céu e da Terra.

Peço-Vos, pois, pela vossa infinita generosidade, que cureis a minha enfermidade, laveis as minhas manchas, ilumineis a minha cegueira, enriqueçais a minha pobreza e revistais a minha nudez, para que eu receba o Pão dos Anjos, o Rei dos reis e o Senhor dos senhores, com tanta reverência e humildade, tanta contrição e devoção, tanta pureza e fé, tal propósito e intenção, como convém à salvação de minha alma.

Amém.`
  },
  {
    id: 'oracao_antes_leitura_biblia',
    titulo: 'Oração antes de Ler a Sagrada Escritura',
    subtitulo: 'Para que a Palavra de Deus ilumine e transforme a vida',
    categoria: 'espiritosanto',
    autor: 'Tradição da Igreja Católica',
    tempo: '⏱️ 2 min',
    tipoBadge: '📖 Palavra de Deus',
    tags: ['biblia', 'sagrada escritura', 'leitura', 'estudo', 'palavra de deus', 'espirito santo'],
    introducao: 'Reze sempre antes de abrir a Bíblia para que o Espírito Santo abra a sua mente e seu coração.',
    texto: `Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor.

Senhor Jesus, abri os meus olhos e o meu coração para compreender as vossas Sagradas Escrituras. Que esta Palavra não seja para mim apenas letra escrita, mas semente viva de salvação, luz para os meus passos e consolo nas minhas aflições.

Dai-me a humildade para escutar o que o Senhor tem a me dizer hoje, e a força para colocar em prática os vossos santos ensinamentos na minha vida diária.

Nossa Senhora, Sede da Sabedoria, rogai por nós! Amém.`
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
    if (categoria !== 'all') {
      if (categoria === 'longas') {
        if (o.categoria !== 'longas' && !o.tipoBadge?.includes('Completo') && !o.tipoBadge?.includes('Ladainha') && !o.tipoBadge?.includes('Coroa')) {
          return false;
        }
      } else if (o.categoria !== categoria) {
        return false;
      }
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
