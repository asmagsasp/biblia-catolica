// src/mariaService.js
// Base de dados católica completa, teológica e histórica sobre As Aparições da Virgem Maria e Devoções Marianas

export const APARICOES_VIRGEM = [
  {
    id: 'fatima',
    nome: 'Nossa Senhora de Fátima',
    subtitulo: 'Nossa Senhora do Rosário & Os Três Segredos',
    localAno: 'Cova da Iria, Fátima, Portugal — 1917',
    dataFesta: '13 de Maio',
    videntes: 'Lúcia de Jesus (10 anos), São Francisco Marto (9 anos) e Santa Jacinta Marto (7 anos)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé (Vaticano)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-dove',
    cor: '#38bdf8',
    imagemUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A Virgem do Rosário de Fátima com a coroa e o Santo Rosário nas mãos',
    citacaoBiblica: '“Rezai o Terço todos os dias para alcançar a paz para o mundo e o fim da guerra.” (Fátima, 13 de maio de 1917)',
    historia: `Entre 13 de maio e 13 de outubro de 1917, a Santíssima Virgem Maria apareceu seis vezes a três humildes pastorinhos na Cova da Iria, em Fátima, Portugal: Lúcia de Jesus dos Santos e seus primos, os santos irmãos Francisco e Jacinta Marto.

Em plena Primeira Guerra Mundial, Nossa Senhora desceu sobre uma pequena azinheira com um brilho mais resplandecente que o sol. Revelou-se como "A Senhora do Rosário" e fez um apelo urgente à humanidade: a conversão do coração, a penitência, a oração diária do Santo Terço e a consagração do mundo e da Rússia ao seu Imaculado Coração.

Na última aparição, em 13 de outubro de 1917, diante de uma multidão de mais de 70.000 pessoas sob chuva torrencial — incluindo jornalistas céticos, fotógrafos e cientistas —, ocorreu o estarrecedor "Milagre do Sol": as nuvens se abriram e o Sol começou a girar como uma roda de fogo multicolorida, descendo em zigue-zague em direção à Terra. As roupas de todos, antes encharcadas pela tempestade, secaram instantaneamente em poucos segundos.`,
    narracaoTexto: `Em 13 de maio de 1917, na pacata Cova da Iria em Fátima, Portugal, o céu se abriu com relâmpagos de luz divina. Três crianças puras e humildes — Lúcia, Francisco e Jacinta — viram uma Senhora vestida de branco, mais brilhante que o sol, segurando nas mãos um rosário de contas alvas. Com voz doce e maternal, ela disse: "Não tenhais medo. Venho do Céu. Rezai o Terço todos os dias para alcançar a paz para o mundo". 

Ao longo de seis meses, a Mãe de Deus revelou a visão da gravidade do pecado, a urgência da reparação e a certeza de que a oração humilde é capaz de deter guerras e mudar o curso da história humana. Diante de mais de setenta mil testemunhas no Milagre do Sol, o Céu selou para sempre a sua promessa triunfante: "Por fim, o meu Imaculado Coração triunfará!".`,
    segredosProfecias: [
      {
        titulo: 'O 1º Segredo: A Visão do Inferno',
        desc: 'A Virgem abriu as mãos e mostrou aos pastorinhos um mar de fogo subterrâneo com almas de pecadores em desespero, pedindo oração constante e sacrifícios pela salvação dos pecadores.'
      },
      {
        titulo: 'O 2º Segredo: A Devoção ao Imaculado Coração & A Segunda Guerra',
        desc: 'Nossa Senhora profetizou que, se os homens não deixassem de ofender a Deus, uma guerra pior começaria sob o pontificado de Pio XI, anunciada por uma noite iluminada por uma luz desconhecida (a aurora boreal de 1938), e pediu a consagração da Rússia para evitar que espalhasse seus erros pelo mundo.'
      },
      {
        titulo: 'O 3º Segredo: O Bispo Vestido de Branco e o Martírio da Igreja',
        desc: 'A visão profética de uma grande montanha com uma cruz de troncos toscos, onde um Bispo vestido de branco (o Papa), bispos, sacerdotes e fiéis sobem através de uma cidade meio em ruínas rezando pelas almas e sofrem perseguições e martírios sob tiros de soldados (visão ligada ao atentado sofrido por São João Paulo II em 13 de maio de 1981).'
      }
    ],
    mensagem: `Fátima é um farol de esperança e um convite inadiável: a oração diária do Santo Terço, a consagração filial ao Imaculado Coração de Maria e a certeza inabalável de que a graça de Deus é infinitamente superior a todo o mal deste mundo.`,
    oracao: `Ó Santíssima Virgem Maria, Rainha do Santo Rosário de Fátima, que na Cova da Iria vos dignastes revelar aos pastorinhos a doçura e o poder do vosso Imaculado Coração!
    
Ensinai-nos a rezar diariamente com fervor o Santo Terço, alcançai a paz para a nossa família e para todas as nações, e convertei os corações endurecidos.

Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem da vossa infinita misericórdia.

Nossa Senhora de Fátima, rogai por nós! Amém.`,
    tags: ['fatima', 'portugal', 'rosario', 'terco', 'pastorinhos', 'milagre do sol', 'segredos', 'lucia', 'jacinta', 'francisco', 'russia', 'conversao']
  },
  {
    id: 'anguera',
    nome: 'Nossa Senhora de Anguera',
    subtitulo: 'Rainha da Paz de Anguera & Os Apelos Proféticos',
    localAno: 'Fazenda Malhada Nova, Anguera (Bahia), Brasil — 1987 até o presente',
    dataFesta: '29 de Setembro',
    videntes: 'Pedro Régis (humilde trabalhador rural baiano)',
    statusEclesial: 'Em Acompanhamento Pastoral Diocesano (Arquidiocese de Feira de Santana/BA)',
    statusTipo: 'profetica',
    categoria: 'aparicoes',
    subcategoria: 'profecias',
    icone: 'fa-shield-heart',
    cor: '#eab308',
    imagemUrl: 'assets/maria/nossa_senhora_capa.jpg',
    imagemLegenda: 'Imagem venerada de Nossa Senhora Rainha da Paz em Anguera, Bahia',
    citacaoBiblica: '“Queridos filhos, sou a Rainha da Paz. Venho do Céu para chamar-vos à conversão sincera. Não recueis. Deus tem pressa!” (Mensagem de Anguera)',
    historia: `Em 29 de setembro de 1987, na humilde localidade de Anguera, no sertão da Bahia, o jovem Pedro Régis, ao retornar da escola, sentiu-se mal e desmaiou próximo à sua casa. Ao recobrar a consciência, viu diante de si uma belíssima Senhora vestida de branco, com um manto azul celeste e descalça sobre uma nuvem luminosa, que o segurou pelos braços com infinita ternura.

A Virgem apresentou-se como a "Rainha da Paz" e iniciou um ciclo ininterrupto de aparições que já ultrapassa mais de 5.500 mensagens registradas em cadernos e transmitidas publicamente. O local atrai milhares de peregrinos de todos os estados do Brasil e do exterior em busca de cura, reconciliação nos sacramentos e profunda oração.

A espiritualidade de Anguera é estritamente enraizada no Magistério Católico: incentivo diário à Santa Missa, à Confissão frequente, à oração dos 15 mistérios do Rosário, à leitura diária da Sagrada Escritura, ao amor incondicional ao Papa e à Eucaristia.`,
    narracaoTexto: `No coração do sertão baiano, em Anguera, uma luz celeste brilhou no entardecer de setembro de 1987. O jovem Pedro Régis foi acolhido pelo olhar amoroso da Mãe de Jesus, a Rainha da Paz. Com voz suave, ela pediu oração pela Santa Igreja, pela fidelidade dos sacerdotes e pela paz no Brasil e no mundo.

Ao longo de décadas, a Virgem de Anguera tem advertido a humanidade com mensagens proféticas comoventes: apelos contra a perda da fé, alertas sobre as tempestades espirituais que abalariam as famílias e nações, e o chamado incessante para que os fiéis permaneçam firmes na verdadeira doutrina de Jesus Cristo, alimentando-se do Pão Eucarístico e refugiando-se no Imaculado Coração de Maria.`,
    segredosProfecias: [
      {
        titulo: 'Alertas Geopolíticos & Catástrofes da Natureza',
        desc: 'As mensagens de Anguera frequentemente trazem advertências proféticas sobre terremotos, maremotos e tensões no Oriente Médio e na Ásia, pedindo intensa oração de intercessão para atenuar as dores do mundo.'
      },
      {
        titulo: 'A Grande Crise de Fé & Fidelidade ao Santo Padre',
        desc: 'Nossa Senhora adverte com insistência maternal sobre a confusão doutrinária, a apostasia silenciosa e os ataques à moral cristã, exortando os católicos a nunca abandonarem os Sacramentos, a Tradição bimilenar e a união filial com o Papa.'
      },
      {
        titulo: 'O Brasil como Terra de Santa Cruz & O Triunfo',
        desc: 'A Virgem proclama que o Brasil tem uma missão sagrada na evangelização mundial e que, após tempos de grande purificação espiritual e provações, o Imaculado Coração triunfará e uma nova era de paz e santidade florescerá sobre a Terra.'
      }
    ],
    mensagem: `Anguera é um chamado urgente à vigilância espiritual, ao jejum e ao retorno imediato a Deus. Não há tempo a perder: cada oração feita com o coração é um escudo de proteção para a sua família e para o mundo inteiro.`,
    oracao: `Ó Virgem Santíssima, Rainha da Paz de Anguera, Mãe de Deus e nossa Mãe amantíssima!
    
Acolhei sob a vossa proteção maternal a nossa pátria, as nossas famílias, os sacerdotes e a Santa Igreja Católica.

Livrai-nos dos erros do mundo, preservai no nosso coração a pureza da fé, concedei-nos o amor ardente à Sagrada Eucaristia e a força para perseverar até o fim.

Rainha da Paz de Anguera, rogai por nós e dai a paz ao mundo inteiro! Amém.`,
    tags: ['anguera', 'bahia', 'brasil', 'pedro regis', 'profecias', 'rainha da paz', 'terco', 'eucaristia', 'fim dos tempos', 'papa', 'igreja', 'conversao']
  },
  {
    id: 'guadalupe',
    nome: 'Nossa Senhora de Guadalupe',
    subtitulo: 'Estrela da Evangelização & Padroeira de Toda a América',
    localAno: 'Monte Tepeyac, Cidade do México — 1531',
    dataFesta: '12 de Dezembro',
    videntes: 'São Juan Diego Cuauhtlatoatzin (humilde indígena asteca)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé (Vaticano)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-sun',
    cor: '#10b981',
    imagemUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A sagrada e milagrosa Tilma de São Juan Diego com a imagem de Guadalupe',
    citacaoBiblica: '“Não estou eu aqui, que sou tua Mãe? Não estás sob a minha sombra e proteção? De que mais tens necessidade?” (Palavras da Virgem a Juan Diego)',
    historia: `Em dezembro de 1531, nas encostas do Monte Tepeyac, a Virgem Maria apareceu a um humilde indígena recém-convertido, São Juan Diego. Com vestes astecas nobres e resplendor solar, a Senhora celestial falou-lhe em sua língua nativa (Náhuatl), pedindo que fosse construída uma igreja naquele local para acolher as dores e súplicas de todos os povos.

O bispo local, Dom Frei Juan de Zumárraga, pediu um sinal incontestável do Céu. A Virgem orientou Juan Diego a subir ao topo árido da colina no auge do inverno, onde ele colheu milagrosamente rosas de Castela frescas e perfumadas que não existiam no México.

Ao desdobrar sua tilma (manto rústico tecido de fibra de cacto ayate) diante do bispo e das autoridades, as rosas caíram ao chão e a imagem sagrada de Nossa Senhora de Guadalupe apareceu estampada de forma sobrenatural no tecido. A aparição gerou a conversão espontânea de mais de 8 milhões de indígenas em poucos anos.`,
    narracaoTexto: `Na colina de Tepeyac, ecoou o mais doce consolo maternal da história das Américas. A Virgem de Guadalupe apareceu ao humilde Juan Diego como a Mãe Morena dos pequeninos, vestida com o manto estrelado do firmamento e o broche da Santa Cruz no peito. 

Quando Juan Diego abriu seu manto diante do bispo, o milagre se consumou para a eternidade: uma pintura divina, sem pinceladas humanas, gravou-se no manto de cacto que deveria ter se decomposto em vinte anos, mas que resiste há quase cinco séculos intacto, desafiando a ciência e acolhendo nos olhos de Maria os rostos daqueles que creram no sinal do Céu.`,
    segredosProfecias: [
      {
        titulo: 'O Mistério Inexplicável da Tilma',
        desc: 'A fibra de cacto (ayate) dura no máximo 20 anos, mas a tilma permanece perfeita após quase 500 anos. Exames oftalmológicos modernos com microscopia digital revelaram nos olhos da Virgem (em apenas 7 milímetros) o reflexo de 13 pessoas presentes na sala do bispo no instante em que o manto foi aberto.'
      },
      {
        titulo: 'O Mapa Astronômico das Estrelas',
        desc: 'As estrelas estampadas no manto de Maria correspondem com exatidão milimétrica à posição das constelações vistas no céu do México no solstício de inverno de 12 de dezembro de 1531, vistas a partir de fora da abóbada celeste.'
      },
      {
        titulo: 'Protetora dos Nascituros e da Vida',
        desc: 'A faixa escura na cintura de Maria era o símbolo asteca tradicional que indicava que a mulher estava grávida. Por isso, São João Paulo II a proclamou Padroeira e Defensora da Vida e dos Nascituros contra o aborto.'
      }
    ],
    mensagem: `Guadalupe nos ensina que nunca estamos sós: estamos debaixo do manto, no aconchego do colo e sob a proteção amorosa da Mãe de Deus.`,
    oracao: `Ó Virgem Imaculada de Guadalupe, Mãe do verdadeiro Deus por quem se vive!
    
Vós que contemplastes com ternura o vosso servo São Juan Diego e gravastes vossa santa imagem na sua tilma, acolhei com bondade as preces das nossas famílias.

Defendei a vida nascente, protegei os doentes e sofredores, abençoai o nosso continente e dai-nos a graça de seguir sempre a vosso amado Filho Jesus Cristo.

Nossa Senhora de Guadalupe, Padroeira das Américas, rogai por nós! Amém.`,
    tags: ['guadalupe', 'mexico', 'juan diego', 'tilma', 'america latina', 'vida', 'nascituro', 'rosas', 'milagres', 'estrelas']
  },
  {
    id: 'lourdes',
    nome: 'Nossa Senhora de Lourdes',
    subtitulo: 'Saúde dos Enfermos & A Imaculada Conceição',
    localAno: 'Gruta de Massabielle, Lourdes, França — 1858',
    dataFesta: '11 de Fevereiro',
    videntes: 'Santa Bernadete Soubirous (jovem humilde e analfabeta de 14 anos)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé (Vaticano)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-droplet',
    cor: '#0ea5e9',
    imagemUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A Gruta de Massabielle em Lourdes, onde jorra a fonte milagrosa de curas',
    citacaoBiblica: '“Que soy era Immaculada Councepciou — Eu sou a Imaculada Conceição.” (Revelação a Santa Bernadete em 25 de março de 1858)',
    historia: `No ano de 1858, apenas quatro anos após o Papa Pio IX ter proclamado o Dogma da Imaculada Conceição, a Santíssima Virgem apareceu 18 vezes a uma pobre menina asmática e analfabeta de 14 anos, Santa Bernadete Soubirous, na escura e úmida Gruta de Massabielle, às margens do rio Gave.

Vestida de branco com uma faixa azul celeste e uma rosa de ouro reluzente sobre cada pé, a Senhora trazia nas mãos um belo rosário de contas alvas. Maria pediu oração, penitência pela conversão dos pecadores e ordenou que Bernadete cavasse o chão com os dedos e bebesse da lama. Daquele gesto de fé brotou uma fonte de água pura que jorra até hoje ininterruptamente mais de 120.000 litros diários, onde milhares de curas físicas e espirituais foram operadas.

Na 16ª aparição, no dia da Anunciação (25 de março), ao ser questionada sobre quem era, a Senhora juntou as mãos no peito, olhou para o Céu e declarou no dialeto local gascão: "Eu sou a Imaculada Conceição". Bernadete, que desconhecia o termo teológico, correu repetindo a frase para o pároco Padre Peyramale, que caiu de joelhos em lágrimas de emoção.`,
    narracaoTexto: `Na escuridão da Gruta de Massabielle, uma luz celestial mais bela que toda a natureza iluminou os passos de Bernadete. A Virgem Santíssima acolheu a pobreza da jovem e revelou ao mundo o mistério da sua pureza: "Eu sou a Imaculada Conceição".

Ao tocar o solo árido por ordem de Maria, brotou a fonte milagrosa de Lourdes, onde as águas da graça divina continuam lavando as feridas dos doentes e renovando a esperança dos corações abatidos há mais de um século e meio.`,
    segredosProfecias: [
      {
        titulo: 'A Fonte de Curas Médicas Milagrosas',
        desc: 'O Comitê Médico Internacional de Lourdes (formado por médicos de diversas religiões e cientistas ateus) analisa rigorosamente os casos: mais de 70 curas foram declaradas cientificamente inexplicáveis e milagrosas pela Igreja.'
      },
      {
        titulo: 'O Segredo da Humildade e do Sofrimento',
        desc: 'A Virgem disse a Bernadete: "Não vos prometo fazer-vos feliz neste mundo, mas sim no outro", revelando a dignidade sagrada dos enfermos e a força redentora do sofrimento vivido em união com a Cruz de Cristo.'
      }
    ],
    mensagem: `Lourdes é o abraço de misericórdia de Maria sobre todos os que sofrem enfermidades no corpo, depressões na alma e angústias no coração.`,
    oracao: `Ó Virgem Imaculada de Lourdes, Mãe de Misericórdia e Saúde dos Enfermos!
    
Vós que fizestes jorrar na gruta de Massabielle uma fonte milagrosa para alívio dos doentes, olhai com bondade para os nossos sofrimentos e fraquezas.

Alcançai-nos a cura do corpo e da alma, confortai os agonizantes, dai ânimo aos desanimados e ensinai-nos a viver na graça e na santa amizade de Deus.

Nossa Senhora de Lourdes, Saúde dos Enfermos, rogai por nós! Amém.`,
    tags: ['lourdes', 'franca', 'bernadete', 'imaculada conceicao', 'cura', 'enfermos', 'fonte milagrosa', 'agua', 'massabielle']
  },
  {
    id: 'akita',
    nome: 'Nossa Senhora de Akita',
    subtitulo: 'As Lágrimas da Virgem & Os Alertas para o Nosso Tempo',
    localAno: 'Yuzawadai, Akita, Japão — 1973 a 1981',
    dataFesta: '15 de Setembro (Nossa Senhora das Dores)',
    videntes: 'Irmã Agnes Katsuko Sasagawa (religiosa surda do Instituto das Servas da Eucaristia)',
    statusEclesial: 'Reconhecida solenemente pelo Bispo Dom John Shojiro Ito e apoiada pelo Cardeal Joseph Ratzinger (Bento XVI)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'profecias',
    icone: 'fa-fire-flame-curved',
    cor: '#ef4444',
    imagemUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A estátua de madeira de Nossa Senhora de Akita que verteu sangue e lágrimas humanas 101 vezes',
    citacaoBiblica: '“Se os homens não se arrependerem e não melhorarem, o Pai infligirá um terrível castigo a toda a humanidade.” (Mensagem de Akita, 13 de outubro de 1973)',
    historia: `Entre 1973 e 1981, no convento das Servas da Sagrada Eucaristia em Yuzawadai, Akita, Japão, uma estátua de madeira da Virgem Maria esculpida por um artista budista começou a manifestar fenômenos sobrenaturais estarrecedores.

A estátua sangrou na mão direita e verteu lágrimas humanas e suor perfumado por 101 vezes consecutivas diante de centenas de testemunhas, incluindo o bispo diocesano Dom John Shojiro Ito e equipes de televisão japonesas. Amostras de sangue, lágrimas e suor foram recolhidas e submetidas a testes de DNA forense na Universidade de Medicina Legal de Akita, comprovando serem de origem humana legítima de tipos sanguíneos B e AB.

A Irmã Agnes Sasagawa, que era totalmente surda de ambos os ouvidos, foi curada milagrosamente e recebeu mensagens proféticas de extrema gravidade da Mãe de Deus sobre o futuro da Igreja e da humanidade. Em 1984, o Bispo Dom Ito publicou uma carta pastoral autorizando a veneração de Nossa Senhora de Akita, atestando seu caráter sobrenatural e autêntico. Em 1988, o Cardeal Joseph Ratzinger (futuro Papa Bento XVI), como Prefeito da Congregação para a Doutrina da Fé, confirmou que as mensagens de Akita são confiáveis e dignas de fé.`,
    narracaoTexto: `Na terra distante de Akita, no Japão, a Mãe das Dores chorou copiosamente sobre o destino da humanidade. Cento e uma vezes, lágrimas verdadeiras rolaram dos olhos da estátua de madeira sagrada. 

Em 13 de outubro de 1973 — no exato aniversário do Milagre do Sol de Fátima —, a Virgem deu o seu aviso mais pungente: o demônio penetraria até o interior da própria Igreja, semeando discórdia entre bispos e cardeais, mas os que perseverassem no amor ao Santo Rosário e na adoração à Eucaristia encontrariam refúgio seguro sob o seu manto.`,
    segredosProfecias: [
      {
        titulo: 'O Aviso do Fogo que Cairá do Céu',
        desc: 'A Virgem declarou que, se a humanidade não se converter, virá uma purificação maior que o Dilúvio, na qual grande parte dos homens perecerá e os sobreviventes invejarão os que já morreram.'
      },
      {
        titulo: 'A Crise Interna na Igreja e o Abandono dos Altares',
        desc: 'Nossa Senhora profetizou que Satanás se infiltraria nas estruturas eclesiais, fazendo cardeais se oporem a cardeais e bispos contra bispos, com igrejas e altares esvaziados e relaxamento espiritual.'
      },
      {
        titulo: 'O Rosário e a Eucaristia como Armas Únicas',
        desc: '“Rezai muito as orações do Rosário. Eu sou a única que ainda pode salvar-vos das calamidades que se aproximam. Aqueles que colocam sua confiança em Mim serão salvos”.'
      }
    ],
    mensagem: `Akita não é para causar medo, mas para despertar a alma do sono espiritual: a penitência diária, o Santo Rosário e a adoração eucarística são os escudos inexpugnáveis de paz.`,
    oracao: `Santíssima Virgem Maria de Akita, Mãe Dolorosa e Mãe da Esperança, que vertestes lágrimas humanas para nos alertar do perigo da condenação e do afastamento de Deus!
    
Tocai os corações endurecidos, protegei os sacerdotes e bispos na santa fidelidade ao Evangelho, guardai a Santa Igreja e livrai as nossas famílias de todo mal.

Dai-nos a coragem de rezar o Santo Rosário todos os dias e fazer da Eucaristia o centro de nossas vidas.

Nossa Senhora de Akita, consolai a Santa Igreja e rogai por nós! Amém.`,
    tags: ['akita', 'japao', 'lagrimas', 'agnes', 'profecias', 'ratzinger', 'rosario', 'eucaristia', 'fim dos tempos', 'castigo', 'penitencia']
  },
  {
    id: 'kibeho',
    nome: 'Nossa Senhora de Kibeho',
    subtitulo: 'Mãe do Verbo & O Rosário das Sete Dores na África',
    localAno: 'Kibeho, Ruanda (África) — 1981 a 1989',
    dataFesta: '28 de Novembro',
    videntes: 'Alphonsine Mumureke, Anathalie Mukamazimpaka e Marie Claire Mukangango',
    statusEclesial: 'Aprovada solenemente pela Santa Sé e pelo Bispo Diocesano em 2001',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-globe-africa',
    cor: '#f59e0b',
    imagemUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A estátua de Nossa Senhora Mãe do Verbo em Kibeho, Ruanda',
    citacaoBiblica: '“Eu sou a Mãe do Verbo. Venho chamar o mundo ao arrependimento sincero antes que seja tarde.” (Kibeho, 1981)',
    historia: `Em 28 de novembro de 1981, na pequena aldeia montanhosa de Kibeho, no sul de Ruanda, a Virgem Maria apareceu a três jovens estudantes de um colégio interno: Alphonsine Mumureke, Anathalie Mukamazimpaka e Marie Claire Mukangango.

Apresentando-se como "Nyina wa Jambo" (Mãe do Verbo), a Senhora celestial tinha uma beleza incomparável e falava na língua materna kinyarwanda. A Virgem pediu com insistência a reintrodução na Igreja do antigo "Rosário das Sete Dores de Maria", ensinando que a meditação nas dores que traspassaram o seu Imaculado Coração alcança a graça do verdadeiro arrependimento e da conversão dos pecados mais profundos.

Em 19 de agosto de 1982, em uma aparição que durou oito horas seguidas e foi testemunhada por mais de 20.000 pessoas, as videntes choraram convulsivamente enquanto a Virgem lhes mostrava uma visão profética aterrorizante: um "rio de sangue", pessoas se matando mutuamente com ódio desmedido, corpos decapitados e abandonados sem sepultura. Doze anos depois, em 1994, essa profecia cumpriu-se tragicamente com o terrível Genocídio de Ruanda, no qual quase 1 milhão de pessoas foram mortas em apenas 100 dias (inclusive a própria vidente Marie Claire). Em 2001, a Igreja Católica proclamou a autenticidade canônica solene das aparições de Kibeho.`,
    narracaoTexto: `No coração do continente africano, em Kibeho, a Mãe do Verbo desceu dos céus trazendo lágrimas de amor maternal. Ela viu com dor a divisão e o ódio que ameaçavam destruir seus filhos e pediu que rezassem o Rosário das Sete Dores para desarmar os corações.

A Virgem advertiu que sua mensagem em Kibeho não era apenas para Ruanda, mas para a humanidade inteira: um apelo universal à reconciliação fraterna, à oração sincera e à conversão antes que as trevas do ódio e da guerra envolvam a terra.`,
    segredosProfecias: [
      {
        titulo: 'A Profecia do Rio de Sangue e o Genocídio',
        desc: 'A Virgem mostrou às videntes visões detalhadas de carnificina que se concretizaram no genocídio de 1994, provando que as advertências celestes eram reais e que o pecado do ódio étnico e da vingança destrói nações.'
      },
      {
        titulo: 'O Renascimento do Rosário das Sete Dores',
        desc: 'Nossa Senhora pediu explicitamente que todas as terças e sextas-feiras os fiéis meditem nos sete sofrimentos de Maria para obter compunção de coração e salvação das famílias.'
      }
    ],
    mensagem: `Kibeho nos ensina que a oração fervorosa e o perdão sincero são os únicos remédios capazes de curar o ódio e trazer a verdadeira paz a um país e a um lar.`,
    oracao: `Nossa Senhora de Kibeho, Mãe do Verbo e Rainha da Reconciliação!
    
Vós que viestes à terra da África para nos ensinar a meditar nas vossas Sete Dores e desarmar o ódio dos corações humanos, derramai a vossa paz sobre as nossas famílias.

Afastai das nossas vidas o rancor, a divisão e a vingança. Ensinai-nos o perdão de Cristo e concedei a paz ao mundo inteiro.

Mãe do Verbo de Kibeho, rogai por nós! Amém.`,
    tags: ['kibeho', 'ruanda', 'africa', 'mae do verbo', 'sete dores', 'genocidio', 'profecias', 'perdao', 'paz', 'conversao']
  },
  {
    id: 'la_salette',
    nome: 'Nossa Senhora de La Salette',
    subtitulo: 'A Reconciliadora dos Pecadores & O Pranto Profético',
    localAno: 'Montanhas de La Salette, Isère, França — 1846',
    dataFesta: '19 de Setembro',
    videntes: 'Maximino Giraud (11 anos) e Melânia Calvat (14 anos)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé (Vaticano)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-mountain',
    cor: '#7c3aed',
    imagemUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A Aparição de La Salette com a Virgem sentada chorando com as mãos no rosto',
    citacaoBiblica: '“Se o meu povo não quer submeter-se, sou forçada a deixar cair o braço de meu Filho. Ele é tão forte e pesado que não posso mais sustentá-lo.” (La Salette, 1846)',
    historia: `Em 19 de setembro de 1846, no alto dos Alpes franceses, a 1.800 metros de altitude em La Salette, dois pastorinhos extremamente humildes — Maximino Giraud e Melânia Calvat — avistaram um globo de luz resplandecente. No centro da luz, viram uma bela Senhora sentada sobre uma rocha, chorando amargamente com o rosto sepultado nas mãos.

No peito de Maria pendia um grande crucifixo com torquês e martelo (símbolos dos instrumentos da Paixão que prendem ou soltam os cravos de Jesus pelos nossos pecados e boas obras).

A Virgem levantou-se e transmitiu-lhes uma mensagem profunda e vigorosa: denunciou o desrespeito ao repouso sagrado do Domingo, a blasfêmia contra o Santo Nome de Deus e o desprezo pela oração. Profetizou a perda das colheitas de batatas, uvas e trigo que causou a grande fome na Europa nos anos seguintes, e confiou a cada um dos videntes segredos proféticos de enorme impacto sobre a Igreja e as nações.`,
    narracaoTexto: `No alto das montanhas alpinas, a Rainha do Céu apareceu vestida de luz, mas banhada em lágrimas. Sentada sobre uma pedra, com o coração partido pelas ofensas que ferem a Deus, ela revelou aos jovens pastores o peso da justiça divina que ela própria, com sua intercessão de Mãe, segurava incansavelmente.

"Aproximai-vos, meus filhos, não tenhais medo; estou aqui para vos anunciar uma grande notícia", disse Maria. As lágrimas que vertiam de seus olhos transformavam-se em raios de luz viva, convidando o mundo à penitência e ao retorno a Cristo.`,
    segredosProfecias: [
      {
        titulo: 'A Profecia das Colheitas e da Grande Fome',
        desc: 'A Virgem previu com exatidão a praga da batata e a ruína dos vinhedos que atingiram a França e a Europa (como a Grande Fome na Irlanda), alertando que os homens colheriam os frutos amargos de seu próprio pecado.'
      },
      {
        titulo: 'O Segredo de Melânia e as Crises na Igreja',
        desc: 'O texto profético entregue por Melânia alertava sobre o relaxamento dos costumes, a corrupção do mundo secular e a necessidade de que os sacerdotes vivessem em santidade autêntica.'
      }
    ],
    mensagem: `La Salette nos ensina o respeito sagrado ao Dia do Senhor (o Domingo), o abandono das blasfêmias e a fidelidade diária à oração da manhã e da noite.`,
    oracao: `Lembrai-vos, ó Nossa Senhora de La Salette, verdadeira Mãe de Dores, das lágrimas que derramastes por mim no Calvário e sobre as montanhas dos Alpes!
    
Lembrai-vos dos cuidados incessantes que tendes por vosso povo, a fim de que não pereça nas garras do pecado e do afastamento de Deus.

Alcançai-nos a graça de honrar o Domingo com a Santa Missa, purificar a nossa linguagem de toda ofensa e servir a Jesus com coração penitente e sincero.

Nossa Senhora de La Salette, Reconciliadora dos Pecadores, rogai por nós que recorremos a vós! Amém.`,
    tags: ['la salette', 'franca', 'lagrimas', 'pastorinhos', 'melania', 'maximino', 'domingo', 'profecias', 'crucifixo', 'penitencia']
  },
  {
    id: 'medjugorje',
    nome: 'Nossa Senhora Rainha da Paz',
    subtitulo: 'Os Cinco Pilares da Paz & Os Dez Segredos',
    localAno: 'Podbrdo / Monte das Aparições, Medjugorje (Bósnia-Herzegovina) — 1981 até hoje',
    dataFesta: '25 de Junho',
    videntes: 'Ivanka, Mirjana, Vicka, Ivan, Marija e Jakov',
    statusEclesial: 'Reconhecimento oficial do Vaticano: Decreto de "Nihil Obstat" emitido pelo Dicastério para a Doutrina da Fé em setembro de 2024',
    statusTipo: 'nihil_obstat',
    categoria: 'aparicoes',
    subcategoria: 'profecias',
    icone: 'fa-peace',
    cor: '#06b6d4',
    imagemUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem da Rainha da Paz no Monte Podbrdo em Medjugorje',
    citacaoBiblica: '“Paz, paz, paz e somente paz! A paz deve reinar entre Deus e os homens, e entre os homens entre si!” (Medjugorje, 26 de junho de 1981)',
    historia: `Em 24 de junho de 1981, na pequena aldeia rural de Medjugorje, entre as colinas rochosas da antiga Iugoslávia comunista, seis jovens adolescentes — Ivanka Ivanković, Mirjana Dragičević, Vicka Ivanković, Ivan Dragičević, Marija Pavlović e Jakov Čolo — viram sobre a colina do Podbrdo uma jovem de indescritível beleza com uma criança nos braços que lhes acenava com carinho.

A Senhora revelou-se como "A Rainha da Paz" (*Kraljica Mira*) e afirmou que vinha para reconciliar a humanidade com Deus antes do cumprimento dos tempos.

Medjugorje tornou-se um dos maiores centros de peregrinação e conversão da história da Igreja: milhões de fiéis de todas as nações viajam ao local, onde se testemunham incontáveis confissões duradouras, vocações sacerdotais e curas milagrosas. Em 19 de setembro de 2024, o Vaticano, através do Dicastério para a Doutrina da Fé aprovado pelo Papa Francisco, emitiu a solene nota *A Rainha da Paz*, concedendo o status canônico de *Nihil Obstat*, reconhecendo plenamente os abundantes frutos espirituais do santuário e incentivando a devoção pastoral dos fiéis no mundo inteiro.`,
    narracaoTexto: `Sobre as pedras áridas do Monte Podbrdo, a Rainha da Paz desceu como mensageira da reconciliação divina. Em meio a um mundo dilacerado por conflitos e guerras, Maria trouxe uma receita simples e poderosa para vencer o mal: as cinco pedrinhas de Davi contra o gigante Golias — o Rosário com o coração, a Eucaristia dominical, a Bíblia aberta no lar, o jejum a pão e água e a Confissão sacramental mensal.

"Se soubésseis quanto vos amo, choraríeis de alegria!", repete a Virgem em seus apelos maternais que continuam atraindo milhões de peregrinos para a graça do reencontro com Cristo.`,
    segredosProfecias: [
      {
        titulo: 'Os Dez Segredos para a Humanidade',
        desc: 'A Virgem confiou aos videntes dez segredos sobre eventos que transformarão o mundo, incluindo um sinal visível, permanente e indestrutível que será deixado no Monte das Aparições para comprovar que Deus existe.'
      },
      {
        titulo: 'As Cinco Pedrinhas de Davi',
        desc: '1. Oração diária do Rosário com o coração;\n2. Jejum às quartas e sextas-feiras (a pão e água para os que podem);\n3. Leitura diária da Sagrada Escritura;\n4. Confissão sacramental ao menos uma vez ao mês;\n5. Participação fervorosa na Santa Missa e Comunhão Eucarística.'
      }
    ],
    mensagem: `A paz no mundo começa no coração do indivíduo e na mesa da família através da reconciliação sincera e da oração diária.`,
    oracao: `Mãe de Deus e Rainha da Paz de Medjugorje, que viestes ao mundo nos ensinar o caminho da oração, do jejum e da conversão!
    
Colocamos em vossas mãos maternais os nossos lares, os nossos projetos e todas as nossas aflições.

Afastai as guerras, reconciliai as famílias desunidas, convertei os pecadores e dai-nos a força de rezar o Santo Rosário todos os dias com o coração.

Nossa Senhora, Rainha da Paz, rogai por nós e dai a paz ao mundo inteiro! Amém.`,
    tags: ['medjugorje', 'rainha da paz', 'bosnia', 'nihil obstat', 'vaticano', 'dez segredos', 'rosario', 'jejum', 'conversao', 'podbrdo', 'videntes']
  },
  {
    id: 'garabandal',
    nome: 'Nossa Senhora de Garabandal',
    subtitulo: 'O Aviso, O Grande Milagre e O Chamado à Eucaristia',
    localAno: 'San Sebastián de Garabandal, Cantábria, Espanha — 1961 a 1965',
    dataFesta: '18 de Julho',
    videntes: 'Conchita González, Jacinta González, Mari Loli Mazón e Mari Cruz González',
    statusEclesial: 'Fenômeno em discernimento eclesial (Peregrinações e Missas no local autorizadas pelos Bispos de Santander)',
    statusTipo: 'profetica',
    categoria: 'aparicoes',
    subcategoria: 'profecias',
    icone: 'fa-shield-halved',
    cor: '#b45309',
    imagemUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'Nossa Senhora do Monte Carmelo de Garabandal com o escapulário e coroa de estrelas',
    citacaoBiblica: '“Como não se cumpriu a minha mensagem anterior, anuncio-vos que esta é a última: antes a taça estava se enchendo, agora ela transborda.” (Garabandal, 18 de junho de 1965)',
    historia: `Entre 1961 e 1965, na isolada aldeia montanhosa de San Sebastián de Garabandal, no norte da Espanha, a Virgem Maria apareceu centenas de vezes sob a invocação de Nossa Senhora do Carmo a quatro jovens meninas: Conchita (12), Jacinta (12), Mari Loli (12) e Mari Cruz (11), precedida por aparições de São Miguel Arcanjo.

As meninas entravam em êxtases prolongados de olhos fixos no Céu, caminhando de costas em terrenos íngremes sem tropeçar e resistindo a testes de médicos de renome com agulhas e luzes potentes. Em um dos episódios mais célebres, na noite de 18 de julho de 1962, ocorreu o "Milagre da Hóstia Visível": uma hóstia consagrada materializou-se milagrosamente sobre a língua de Conchita no meio de uma multidão e foi fotografada por câmeras da época.

Grandes santos do século XX mantiveram laços espirituais profundos e manifestaram apoio a Garabandal, entre eles o Santo Padre Pio de Pietrelcina e a Santa Madre Teresa de Calcutá. A mensagem central é um apelo veemente à devoção à Sagrada Eucaristia, ao valor da penitência e à necessidade de visitar com amor o Santíssimo Sacramento.`,
    narracaoTexto: `Nas montanhas misteriosas de Garabandal, São Miguel Arcanjo preparou os corações das quatro crianças para a chegada da Mãe de Deus. Vestida com o hábito marrom do Carmo e manto branco, Maria trouxe profecias solenes para preparar a humanidade para os acontecimentos futuros.

A Virgem advertiu que viria um "Aviso do Céu" — uma iluminação universal onde cada alma humana verá o estado real da sua consciência diante de Deus —, seguido de um "Grande Milagre" e de um "Castigo condicional" caso o mundo não abandone o pecado e não retorne a Jesus Eucarístico.`,
    segredosProfecias: [
      {
        titulo: 'O Aviso Universal (A Iluminação das Consciências)',
        desc: 'Um fenômeno espiritual e astronômico sobrenatural no qual o tempo parecerá parar e cada ser humano na Terra verá interiormente todos os seus pecados e o bem que deixou de fazer, tal como Deus os vê, como um ato supremo de misericórdia divina para a conversão.'
      },
      {
        titulo: 'O Grande Milagre nos Pinheiros',
        desc: 'Um milagre grandioso que ocorrerá nos Pinheiros de Garabandal em uma quinta-feira às 20h30 (que coincidirá com a festa de um santo mártir da Eucaristia), que curará os doentes presentes e deixará um sinal permanente até o fim do mundo.'
      },
      {
        titulo: 'O Castigo Condicional',
        desc: 'Uma purificação que só ocorrerá se a humanidade, mesmo após o Aviso e o Milagre, recusar-se a abandonar o caminho da iniquidade e do pecado.'
      }
    ],
    mensagem: `Garabandal nos chama à adoração reverente a Jesus no Sacrário, ao uso piedoso do Santo Escapulário e à busca sincera pela pureza de coração.`,
    oracao: `Santíssima Virgem Maria, Mãe do Carmelo de Garabandal!
    
Vós que nos convidastes com tanta ternura a visitar com frequência Jesus no Santíssimo Sacramento do Altar e a mudar de vida, iluminai a nossa consciência com a vossa pureza celestial.

Preservai as nossas famílias do pecado, dai-nos a graça de amar a Santa Missa e protegei-nos sob o vosso manto sagrado.

Nossa Senhora do Carmo de Garabandal, rogai por nós! Amém.`,
    tags: ['garabandal', 'espanha', 'conchita', 'o aviso', 'o milagre', 'o castigo', 'padre pio', 'eucaristia', 'escapulario', 'profecias']
  },
  {
    id: 'rosa_mistica',
    nome: 'Nossa Senhora Rosa Mística',
    subtitulo: 'Mãe da Igreja & As Três Rosas de Reparação pelo Clero',
    localAno: 'Montichiari & Fontanelle (Brescia), Itália — 1947 a 1966',
    dataFesta: '13 de Julho',
    videntes: 'Pierina Gilli (humilde enfermeira e terciária franciscana)',
    statusEclesial: 'Julgamento Positivo e Nihil Obstat emitido pelo Dicastério para a Doutrina da Fé / Vaticano em 2024',
    statusTipo: 'nihil_obstat',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-fan',
    cor: '#ec4899',
    imagemUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem de Nossa Senhora Rosa Mística com as três rosas: Branca, Vermelha e Dourada',
    citacaoBiblica: '“Eu sou a Rosa Mística, Mãe da Igreja. Desejo que o dia 13 de cada mês seja dedicado a orações marianas de reparação.” (Montichiari, 1947)',
    historia: `Na primavera de 1947, no hospital de Montichiari, na Itália, a Virgem Maria apareceu à enfermeira Pierina Gilli. Em sua primeira visão, a Senhora celestial tinha o rosto triste e três grandes espadas cravadas no peito, vestindo uma túnica violeta de penitência.

Na segunda aparição, em 13 de julho de 1947, a Virgem reapareceu vestida de branco radiante, e no lugar das três espadas reluziam em seu peito três rosas sublimes: uma Rosa Branca, uma Rosa Vermelha e uma Rosa Dourada.

A Senhora explicou o significado das três espadas e das três rosas: o sofrimento do Coração de Jesus pelas vocações sacerdotais e religiosas infiéis, e o remédio celestial baseado em:
1. **Rosa Branca**: Espírito de Oração pelos sacerdotes;
2. **Rosa Vermelha**: Espírito de Sacrifício e generosidade;
3. **Rosa Dourada/Amarela**: Espírito de Penitência e Reparação.

A Virgem pediu também a instituição da "Hora da Graça Universal", a ser rezada todos os anos no dia 8 de dezembro, das 12h às 13h, prometendo graças copiosas a quem rezar com fé diante do Santíssimo Sacramento ou em seu lar. Em 2024, a Santa Sé reconheceu formalmente a beleza e os frutos pastorais da devoção a Maria Rosa Mística.`,
    narracaoTexto: `Com o peito traspassado pelas dores dos filhos consagrados que se afastavam da santidade, Maria apareceu a Pierina Gilli em Montichiari como a Rosa Mística. Suas lágrimas pediram um exército de almas orantes para sustentar com sacrifícios e orações os sacerdotes e religiosos da Santa Igreja.

Transformando espadas em rosas de amor e reparação, a Virgem prometeu que todo aquele que rezar a Hora da Graça no dia 8 de dezembro receberá do Céu torrentes de misericórdia para si e para toda a sua família.`,
    segredosProfecias: [
      {
        titulo: 'O Significado das Três Espadas',
        desc: '1ª Espada: A perda das vocações sacerdotais e religiosas;\n2ª Espada: Sacerdotes e consagrados vivendo em estado de pecado mortal;\n3ª Espada: A traição espiritual de sacerdotes que perdem a fé e perseguem a Igreja.'
      },
      {
        titulo: 'A Hora da Graça Universal (8 de Dezembro, 12h às 13h)',
        desc: 'Promessa da Virgem: “Com esta prática se obterão muitas graças espirituais e corporais. Mesmo o coração mais endurecido será tocado pela graça divina se recorrer a esta oração”.'
      }
    ],
    mensagem: `A oração contínua pelos nossos padres, bispos e religiosos é um dever sagrado de todo católico que ama a Igreja e o Coração de Maria.`,
    oracao: `Virgem Imaculada, Rosa Mística, em honra do vosso Divino Filho nós nos prostramos diante de vós para implorar a misericórdia de Deus!
    
Não por nossos méritos, mas pela bondade do vosso Coração maternal, pedimos auxílio e graças com a certeza de sermos atendidos.

Abençoai os sacerdotes e consagrados, sustentai-os na fidelidade à cruz de Cristo e infundi na Igreja o espírito de oração, sacrifício e penitência.

Rosa Mística, Mãe da Igreja, rogai por nós! Amém.`,
    tags: ['rosa mistica', 'montichiari', 'italia', 'pierina gilli', 'tres rosas', 'sacerdotes', 'hora da graca', 'reparacao', 'clero', 'nihil obstat']
  },
  {
    id: 'bom_sucesso',
    nome: 'Nossa Senhora do Bom Sucesso',
    subtitulo: 'As Profecias para os Séculos XX e XXI & A Restauração da Fé',
    localAno: 'Convento Real da Imaculada Conceição, Quito, Equador — 1594 a 1634',
    dataFesta: '2 de Fevereiro',
    videntes: 'Madre Mariana de Jesus Torres (religiosa concepcionista espanhola)',
    statusEclesial: 'Aprovada solenemente pela Igreja Católica e pelos Bispos de Quito desde o século XVII',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'profecias',
    icone: 'fa-church',
    cor: '#d97706',
    imagemUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A milagrosa imagem de Nossa Senhora do Bom Sucesso esculpida por anjos em Quito',
    citacaoBiblica: '“Quando tudo parecer perdido e a iniquidade triunfar, então soará a minha hora feliz: Eu destruirei a soberba de Satanás e o esmagarei sob os meus pés!” (Quito, 1634)',
    historia: `Entre 1594 e 1634, no Mosteiro Real da Imaculada Conceição em Quito, Equador, a Madre Mariana de Jesus Torres recebeu inúmeras aparições da Virgem Maria segurando o Menino Jesus no braço esquerdo e um báculo pastoral na mão direita.

A Senhora apresentou-se com o título de "Nossa Senhora do Bom Sucesso" (da Boa Sorte e da Santa Esperança) e revelou visões proféticas com uma precisão cirúrgica estarrecedora sobre o futuro da sociedade e da Igreja nos séculos XIX, XX e XXI.

Maria revelou que no final do século XX e no século XXI ocorreria uma crise espiritual sem precedentes: a corrupção moral generalizada, o ataque à inocência das crianças, o desprezo pelo Sacramento do Matrimônio e a perda da fé em muitas almas consagradas. A estátua da Virgem no convento foi milagrosamente completada e retocada pelos Santos Arcanjos Miguel, Gabriel e Rafael em 1611, enquanto a Madre Mariana orava.`,
    narracaoTexto: `Séculos antes do advento do mundo moderno, a Virgem do Bom Sucesso apareceu em Quito para trazer uma mensagem de conforto e aviso profético para as futuras gerações. Ela revelou a escuridão que envolveria o mundo, a quebra dos valores familiares e o sofrimento da Igreja.

Mas a sua profecia não termina na tribulação: Maria prometeu que, quando as forças do mal acreditarem que venceram, a Mãe de Deus intervirá com poder irresistível para restaurar a beleza da fé católica, a santidade sacerdotal e a pureza nos corações dos pequeninos.`,
    segredosProfecias: [
      {
        titulo: 'A Profecia da Apagamento da Lâmpada do Santuário',
        desc: 'A lâmpada do altar que se apagou simbolizava: 1) A heresia que se espalharia; 2) A perda de vocações; 3) O clima de impureza que cobriria o mundo; 4) O relaxamento nas ordens religiosas; 5) A tibieza dos fiéis.'
      },
      {
        titulo: 'A Destruição do Sacramento do Matrimônio e da Pureza Infantil',
        desc: 'Nossa Senhora predisse que leis ímpias destruiriam a sacralidade da família e do matrimônio e que a pureza das crianças quase desapareceria.'
      },
      {
        titulo: 'A Grande Restauração Eclesial',
        desc: '“Esta restauração triunfante será operada por almas humildes e fiéis que, no silêncio e na oração, permanecerão firmes guardando a fé”.'
      }
    ],
    mensagem: `Mesmo nas horas de maior confusão no mundo, a promessa de Maria permanece de pé: a vitória de Cristo é certa e o Bom Sucesso coroará aqueles que perseverarem na fé.`,
    oracao: `Ó Soberana Virgem Maria, Nossa Senhora do Bom Sucesso, Rainha do Céu e da Terra!
    
Vós que prometestes vosso socorro quando a fé parecesse vacilar no mundo, olhai com misericórdia para a nossa geração, para as nossas crianças e para as nossas famílias.

Guardai a pureza em nossos corações, concedei sacerdotes santos e fervorosos à Santa Igreja e fazei brilhar sobre nós a luz da vossa esperança divina.

Nossa Senhora do Bom Sucesso, rogai por nós e salvai a nossa fé! Amém.`,
    tags: ['bom sucesso', 'quito', 'equador', 'madre mariana', 'profecias', 'seculo xx', 'matrimonio', 'familia', 'arcanjos', 'restauracao']
  },
  {
    id: 'gracas_rue_du_bac',
    nome: 'Nossa Senhora das Graças',
    subtitulo: 'A Revelação da Medalha Milagrosa',
    localAno: 'Capela da Rue du Bac, Paris, França — 1830',
    dataFesta: '27 de Novembro',
    videntes: 'Santa Catarina Labouré (humilde noviça das Filhas da Caridade)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé (Vaticano)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-gem',
    cor: '#818cf8',
    imagemUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem da Virgem da Medalha Milagrosa na Capela de Paris',
    citacaoBiblica: '“Fazei cunhar uma medalha com este modelo. As pessoas que a usarem com confiança receberão grandes graças.” (Rue du Bac, 1830)',
    historia: `Em 27 de novembro de 1830, na Capela das Filhas da Caridade na Rue du Bac em Paris, a Virgem Santíssima apareceu à jovem noviça Santa Catarina Labouré.

Maria estava de pé sobre um globo terrestre, esmagando a cabeça da serpente maligna. De anéis repletos de pedras preciosas em suas mãos estendidas saíam raios luminosos e deslumbrantes que iluminavam a Terra. A Virgem explicou: "Estes raios são o símbolo das graças que derramo sobre as pessoas que me pedem. Mas algumas pedras permanecem sem raios, que são as graças que ninguém se lembra de me pedir!".

Ao redor de Nossa Senhora formou-se uma moldura oval com letras de ouro resplandecentes trazendo a oração: "Ó Maria concebida sem pecado, rogai por nós que recorremos a vós". Em seguida, o quadro virou-se e mostrou o verso da medalha: a letra 'M' entrelaçada a uma Cruz, e abaixo o Sagrado Coração de Jesus cercado de espinhos e o Imaculado Coração de Maria traspassado por uma espada, rodeados por 12 estrelas. As curas e conversões operadas pelo uso piedoso da medalha foram tão impressionantes que o povo parisiense a consagrou com o nome de "A Medalha Milagrosa".`,
    narracaoTexto: `Na calada da noite na Capela de Paris, Santa Catarina foi acordada por um anjo em forma de criança luminosa e levada até os pés do altar. Ali sentou-se a Rainha dos Céus, com as mãos abertas derramando cascatas de luz sobre o mundo.

A Virgem revelou a Medalha Milagrosa como um penhor de proteção e cura para todos os seus filhos. "Tragam-na ao pescoço com fé", prometeu a Mãe Celeste, "e as graças de Deus inundarão vossa vida e o vosso lar".`,
    segredosProfecias: [
      {
        titulo: 'A Antecipação do Dogma da Imaculada Conceição',
        desc: 'A jaculatória “Ó Maria concebida sem pecado” foi dada 24 anos antes da proclamação oficial do Dogma em 1854 pelo Papa Pio IX, confirmando o privilégio singular da pureza original de Maria.'
      },
      {
        titulo: 'As Graças Não Pedidas',
        desc: 'A revelação comovente de que Maria possui inúmeras bênçãos prontas para distribuir, mas que ficam retidas porque os homens deixam de rezar e pedir com confiança de filhos.'
      }
    ],
    mensagem: `Nossa Senhora tem as mãos cheias de bênçãos materiais e espirituais: basta nos aproximarmos dela com fé, oração sincera e coração humilde.`,
    oracao: `Ó Imaculada Virgem Maria, Mãe de Deus e nossa Mãe, ao contemplar-vos com os braços abertos derramando torrentes de bênçãos, recorremos confiantes à vossa intercessão!
    
Alcançai-nos as graças espirituais e temporais de que tanto necessitamos em nossos lares. Livrai-nos de todos os perigos da alma e do corpo e guardai-nos sob o vosso manto sagrado.

Ó Maria concebida sem pecado, rogai por nós que recorremos a vós! Amém.`,
    tags: ['gracas', 'medalha milagrosa', 'paris', 'rue du bac', 'catarina laboure', 'raios de luz', 'imaculada conceicao', 'cura', 'protecao']
  },
  {
    id: 'zeitoun',
    nome: 'Nossa Senhora de Zeitoun',
    subtitulo: 'A Aparição Luminosa Vista por Milhões no Egito',
    localAno: 'Igreja de Santa Maria, Zeitoun (Cairo), Egito — 1968 a 1971',
    dataFesta: '2 de Abril',
    videntes: 'Milhões de testemunhas oculares (cristãos católicos e coptas, muçulmanos, judeus, ateus e autoridades)',
    statusEclesial: 'Aprovada formalmente pelo Patriarcado Copta Ortodoxo e pela Igreja Católica',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-lightbulb',
    cor: '#3b82f6',
    imagemUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'Foto real tirada em 1968 da Virgem Maria sobre a cúpula da igreja em Zeitoun',
    citacaoBiblica: '“Eis que o Senhor cavalga numa nuvem ligeira e entra no Egito.” (Isaías 19, 1)',
    historia: `Na noite de 2 de abril de 1968, operários muçulmanos de uma garagem de ônibus no bairro de Zeitoun, no Cairo (segundo a tradição cristã, um dos locais onde a Sagrada Família repousou na fuga para o Egito), avistaram uma mulher radiante vestida de branco sobre a cúpula da Igreja de Santa Maria. Pensando ser uma jovem tentando o suicídio, gritaram: "Moça, cuidado, não se jogue!".

Logo a figura começou a flutuar majestosamente sobre a cúpula, irradiando uma luz celestial azulada e prateada. Era a Santíssima Virgem Maria.

As aparições repetiram-se semanalmente durante mais de 3 anos consecutivos (de 1968 a 1971), durando desde alguns minutos até nove horas inteiras em uma única noite. Milhões de pessoas de todas as fés acorreram ao local. A Virgem aparecia silenciosa, inclinando-se com reverência diante da Cruz do campanário, abençoando a multidão com ramos de oliveira e acompanhada por pombas luminosas que voavam em formação sem bater asas. As aparições foram fotografadas por repórteres de todo o mundo, filmadas pela TV egípcia e confirmadas por relatórios da polícia e do governo egípcio, que constataram que nenhuma fonte de luz artificial terrestre existia no local.`,
    narracaoTexto: `Na terra milenar do Egito, sobre as cúpulas da Igreja de Zeitoun, a Mãe de Deus manifestou-se diante de multidões incontáveis como a Rainha da Luz e da Paz.

Durante três anos, sem palavras, mas com gestos de infinito amor e bênçãos luminosas, Maria uniu cristãos e muçulmanos em um mesmo clamor de reverência a Deus, operando curas de cegos, paralíticos e doentes terminais e demonstrando que o Céu está vivo e próximo da humanidade.`,
    segredosProfecias: [
      {
        titulo: 'A Aparição Mais Documentada Fotograficamente',
        desc: 'Dezenas de fotos nítidas e filmagens foram feitas por pessoas comuns, jornais mundiais e pela televisão estatal egípcia, tornando Zeitoun uma das manifestações marianas mais incontestáveis da era moderna.'
      },
      {
        titulo: 'O Triunfo da Paz Inter-religiosa',
        desc: 'Em um momento de tensões bélicas no Oriente Médio (após a Guerra dos Seis Dias de 1967), a Virgem apareceu no solo árabe para trazer consolo, reconciliação e cura a todos os povos.'
      }
    ],
    mensagem: `Maria é a Mãe de todos os homens: sua presença silenciosa e luminosa nos convida à fraternidade, à oração e à paz universal.`,
    oracao: `Ó Virgem Santíssima de Zeitoun, Mãe da Luz e Rainha da Paz!
    
Vós que iluminastes a noite do Egito com a vossa presença gloriosa e abençoastes milhões de corações, derramai a vossa luz sobre a escuridão do nosso mundo.

Curai os enfermos, pacificai os países em conflito, quebrai as barreiras do ódio e guiai a todos os povos no caminho do amor a Deus.

Nossa Senhora de Zeitoun, rogai por nós! Amém.`,
    tags: ['zeitoun', 'egito', 'cairo', 'fotos reais', 'aparição luminosa', 'pombas', 'milagres', 'muçulmanos', 'cura', 'igreja copta']
  },
  {
    id: 'knock',
    nome: 'Nossa Senhora de Knock',
    subtitulo: 'A Aparição Silenciosa do Cordeiro e da Sagrada Família',
    localAno: 'Knock, Condado de Mayo, Irlanda — 1879',
    dataFesta: '17 de Agosto',
    videntes: '15 testemunhas oculares de todas as idades (de 5 a 75 anos)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé (Visitada por São João Paulo II e Papa Francisco)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-clover',
    cor: '#059669',
    imagemUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'O Santuário de Knock com a cena da aparição do Cordeiro, de Maria, São José e São João',
    citacaoBiblica: '“Eis o Cordeiro de Deus, que tira o pecado do mundo!” (João 1, 29)',
    historia: `Na chuvosa noite de 21 de agosto de 1879, na pequena aldeia de Knock, no oeste da Irlanda, 15 moradores simples presenciaram uma extraordinária visão luminosa na parede exterior da igreja paroquial de São João Batista.

Sob chuva torrencial, a parede permaneceu perfeitamente seca. A aparição durou cerca de duas horas e era composta por quatro figuras celestiais silenciosas:
1. **O Cordeiro Imaculado**: De pé sobre um altar celestial envolto em luz dourada, diante de uma grande Cruz, cercado por anjos em adoração;
2. **A Virgem Maria**: De túnica e manto brancos reluzentes com uma coroa dourada, com os olhos elevados aos céus e as mãos postas em oração de intercessão;
3. **São José**: À direita de Maria, com a cabeça inclinada respeitosamente em direção à sua Santa Esposa;
4. **São João Evangelista**: Vestido como bispo com mitra, segurando o livro dos Santos Evangelhos com a mão direita erguida ensinando a Palavra de Deus.

Nenhuma palavra foi dita: foi a aparição do silêncio eloqüente da Sagrada Eucaristia e da comunhão dos santos, confortando o sofrido povo irlandês após décadas de perseguições religiosas e da Grande Fome.`,
    narracaoTexto: `Sob a chuva fria da Irlanda, a parede de pedra da igreja de Knock se transformou em um altar de glória celestial. O Cordeiro Pascal brilhava sobre o altar, guardado por anjos e contemplado por Nossa Senhora, São José e São João.

No silêncio sagrado da aparição, o Céu ensinou aos homens o valor infinito da Santa Missa: Cristo presente no altar é o refúgio, a fortaleza e a vida eterna para os que sofrem.`,
    segredosProfecias: [
      {
        titulo: 'A Teologia Eucarística e Litúrgica',
        desc: 'Knock é a única aparição na história onde o próprio Cristo aparece como o Cordeiro imolado sobre o Altar, destacando a Santa Missa como o ápice de toda a fé cristã.'
      },
      {
        titulo: 'A Força do Silêncio e da Fidelidade',
        desc: 'Em uma época de sofrimento e fome na Irlanda, o Céu veio mostrar que Deus não esquece seu povo fiel e que o silêncio orante é a maior oração diante do Mistério Divino.'
      }
    ],
    mensagem: `O silêncio diante do Santíssimo Sacramento e a participação fervorosa na Santa Missa são fontes inesgotáveis de renovação espiritual.`,
    oracao: `Nossa Senhora de Knock, Rainha da Irlanda e Mãe da Santa Esperança!
    
Vós que, junto a São José e a São João Evangelista, contemplastes com reverência o Cordeiro de Deus sobre o altar, ensinai-nos a amar profundamente a Sagrada Eucaristia.

Abençoai os nossos lares, confortai os aflitos e fazei da nossa vida um hino perpétuo de louvor ao Coração de Jesus.

Nossa Senhora de Knock, rogai por nós! Amém.`,
    tags: ['knock', 'irlanda', 'cordeiro de deus', 'sao jose', 'sao joao', 'eucaristia', 'silencio', 'missa', 'milagres']
  },
  {
    id: 'pilar',
    nome: 'Nossa Senhora do Pilar',
    subtitulo: 'A Primeira Aparição da História & O Pilar Inabalável da Fé',
    localAno: 'Saragoça, Espanha — Ano 40 d.C.',
    dataFesta: '12 de Outubro',
    videntes: 'São Tiago Maior (Apóstolo de Jesus Cristo) e seus discípulos',
    statusEclesial: 'Tradição Apostólica Universal e venerada por Papas através dos séculos',
    statusTipo: 'tradicao',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-monument',
    cor: '#dc2626',
    imagemUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem sagrada de Nossa Senhora do Pilar sobre a coluna de jaspe em Saragoça',
    citacaoBiblica: '“Eis aqui a coluna sobre a qual será edificado o meu templo: a fé deste povo permanecerá inabalável até o fim dos tempos.” (Saragoça, 40 d.C.)',
    historia: `No ano 40 da era cristã, o Apóstolo São Tiago Maior (irmão de São João Evangelista) encontrava-se às margens do rio Ebro, em Cesaraugusta (atual Saragoça, Espanha), desanimado com a extrema dureza de coração e resistência dos povos pagãos na evangelização da Península Ibérica.

Na noite de 2 de janeiro do ano 40, enquanto Maria ainda vivia fisicamente em Jerusalém, a Mãe de Jesus bilocou-se sobrenaturalmente e apareceu a São Tiago rodeada por coros de anjos.

A Virgem trazia nas mãos uma coluna (pilar) de jaspe precioso e entregou-a ao Apóstolo, dizendo-lhe que construísse uma capela naquele local e consolando-o com a promessa profética de que a Espanha se tornaria um baluarte inabalável da fé católica e levaria o Evangelho aos confins do Novo Mundo. A Basílica do Pilar em Saragoça é o templo mariano mais antigo de toda a Cristandade. Durante a Guerra Civil Espanhola (1936), três bombas aéreas foram lançadas diretamente sobre a cúpula da Basílica e nenhuma delas explodiu, ficando expostas no santuário até hoje como prova do milagre contínuo de proteção mariana.`,
    narracaoTexto: `Às margens do rio Ebro, quando as forças do Apóstolo São Tiago pareciam esgotadas na pregação do Evangelho, a Virgem Maria veio em seu auxílio ainda em vida terrena.

Trazendo consigo o pilar de jaspe como símbolo de fortaleza celestial, a Mãe de Deus encorajou o Apóstolo a nunca desanimar diante das adversidades: "Permanece firme, pois sobre esta pedra a fé há de triunfar!".`,
    segredosProfecias: [
      {
        titulo: 'O Mistério da Bilocação de Maria em Vida',
        desc: 'Nossa Senhora apareceu a São Tiago antes mesmo de sua Assunção aos Céus, tornando o Pilar a mais antiga e primeira manifestação mariana da história da Igreja.'
      },
      {
        titulo: 'A Profecia da Evangelização das Américas',
        desc: 'A promessa de que a fé hispânica floresceria e atravessaria oceanos cumpriu-se quando, exatamente no dia da festa de Nossa Senhora do Pilar (12 de outubro de 1492), Cristóvão Colombo avistou as terras do Novo Mundo.'
      }
    ],
    mensagem: `O Pilar de Maria nos ensina a permanecer firmes e inabaláveis na fé católica, mesmo quando todas as circunstâncias ao nosso redor parecerem difíceis.`,
    oracao: `Ó Virgem Santíssima do Pilar, Mãe de Deus e nossa fortaleza invencível!
    
Vós que viestes em socorro do Santo Apóstolo São Tiago para confortá-lo e sustentá-lo na missão de pregar o Evangelho, sustentai também a nossa fé.

Fazei com que o nosso coração seja como o vosso sagrado pilar: firme na verdade, generoso na caridade e inabalável diante de todas as tempestades da vida.

Nossa Senhora do Pilar, rogai por nós! Amém.`,
    tags: ['pilar', 'saragoca', 'espanha', 'sao tiago', 'apostolo', 'primeira aparicao', 'bilocacao', 'fe', 'fortaleza', 'bombas']
  },
  {
    id: 'beauraing',
    nome: 'Nossa Senhora de Beauraing',
    subtitulo: 'A Virgem do Coração de Ouro & O Apelo à Oração Contínua',
    localAno: 'Beauraing, Bélgica — 1932 a 1933',
    dataFesta: '29 de Novembro',
    videntes: 'Fernande, Gilberte e Albert Voisin, Andrée e Gilberte Degeimbre (5 crianças)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé (Vaticano)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-heart',
    cor: '#e11d48',
    imagemUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'Nossa Senhora de Beauraing com os braços abertos revelando o Coração de Ouro',
    citacaoBiblica: '“Eu sou a Virgem Imaculada. Amai o meu Filho? Amai a Mim? Então sacrificai-vos por Mim e rezai sempre!” (Beauraing, 1933)',
    historia: `Entre 29 de novembro de 1932 e 3 de janeiro de 1933, na pequena cidade de Beauraing, na Bélgica, a Virgem Maria apareceu 33 vezes a cinco crianças simples de famílias trabalhadoras próximas a uma ponte ferroviária e a uma gruta de Lourdes.

A Senhora celestial trazia um longo vestido branco com reflexos azuis e uma coroa com raios de sol na fronte. Nas últimas aparições, ao abrir os braços para abençoar as crianças, revelou em seu peito um coração resplandecente como ouro puro, emitindo raios intensos de luz amorosa: "O Coração de Ouro".

Em um momento em que a Europa começava a ser ameaçada pela ascensão dos totalitarismos que levariam à Segunda Guerra Mundial, Maria fez um apelo simples, direto e profundamente evangélico: "Rezai, rezai muito! Rezai sempre!". Em 1949, a Igreja Católica aprovou formalmente o culto e a autenticidade sobrenatural das aparições de Beauraing.`,
    narracaoTexto: `Nas noites frias de Beauraing, a Virgem Imaculada desceu com o seu Coração de Ouro aberto para aquecer a humanidade. Diante de cinco crianças inocentes, a Mãe de Deus revelou que o seu amor maternal é um tesouro inesgotável para quem a ele recorre.

"Amai o meu Filho? Então rezai, rezai sempre!", pediu a Senhora dos Céus, deixando a certeza de que a oração constante é a chave para a paz na terra.`,
    segredosProfecias: [
      {
        titulo: 'A Revelação do Coração de Ouro',
        desc: 'O Coração de Maria iluminado em ouro representa a pureza perfeita de seu amor e a misericórdia que ela derrama sobre os pecadores que buscam reconciliação.'
      },
      {
        titulo: 'A Promessa da Conversão dos Pecadores',
        desc: 'Nossa Senhora prometeu explicitamente: “Eu converterei os pecadores!”, assegurando que nenhuma alma está perdida quando entregue com fé às suas mãos maternais.'
      }
    ],
    mensagem: `O Coração de Maria é um refúgio dourado de paz onde encontramos consolo nas maiores dificuldades da vida.`,
    oracao: `Ó Nossa Senhora de Beauraing, Virgem Imaculada do Coração de Ouro!
    
Vós que viestes pedir oração contínua e prometestes converter os pecadores, olhai com misericórdia para a nossa alma e para a nossa família.

Abrasai o nosso coração no santo amor a vosso Filho Jesus, ensinai-nos a rezar sem cessar e convertei os que estão longe da graça de Deus.

Nossa Senhora de Beauraing, Coração de Ouro, rogai por nós! Amém.`,
    tags: ['beauraing', 'belgica', 'coracao de ouro', 'oracao', 'criancas', 'conversao', 'virgem imaculada', 'paz']
  },
  {
    id: 'banneux',
    nome: 'Nossa Senhora de Banneux',
    subtitulo: 'A Virgem dos Pobres & A Fonte para Alívio dos Enfermos',
    localAno: 'Banneux, Bélgica — 1933',
    dataFesta: '15 de Janeiro',
    videntes: 'Mariette Beco (humilde jovem camponesa de 11 anos)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé (Vaticano)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-hands-holding',
    cor: '#0284c7',
    imagemUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem de Nossa Senhora Virgem dos Pobres de Banneux',
    citacaoBiblica: '“Eu sou a Virgem dos Pobres. Esta fonte é reservada para todas as nações, para aliviar os doentes. Vinde a Mim e Eu vos aliviarei.” (Banneux, 1933)',
    historia: `Apenas doze dias após o término das aparições de Beauraing, em 15 de janeiro de 1933, no humilde vilarejo de Banneux, na Bélgica, a Virgem Maria apareceu oito vezes a Mariette Beco, uma menina de 11 anos filha de uma família muito pobre e afastada da prática religiosa.

Mariette viu no jardim da casa uma Senhora radiante vestida de branco com uma faixa azul e uma rosa dourada no pé direito, que lhe sorria com amor e fez sinal para que a seguisse. A Virgem conduziu a menina até uma pequena nascente de água à beira da estrada e disse: "Mete tuas mãos na água. Esta fonte é reservada para Mim. Ela é para aliviar o sofrimento de todas as nações e de todos os doentes".

Ao ser perguntada sobre o seu nome, a Senhora respondeu: "Eu sou a Virgem dos Pobres". A conversão da família de Mariette e de toda a região foi imediata. A fonte tornou-se um manancial de curas extraordinárias e a Igreja Católica reconheceu solenemente as aparições em 1949.`,
    narracaoTexto: `Na noite gelada de inverno em Banneux, a Rainha dos Anjos apresentou-se com o título mais comovente: "A Virgem dos Pobres". Conduzindo a jovem Mariette à fonte de água cristalina, Maria ensinou que veio para acolher os necessitados, os esquecidos e os sofredores de todas as nações.

"Crede em Mim, Eu acreditarei em vós. Rezai muito", disse a Mãe Celeste, deixando uma fonte de alívio e esperança inabalável para a humanidade.`,
    segredosProfecias: [
      {
        titulo: 'A Fonte Universal de Misericórdia',
        desc: 'A bênção da nascente de Banneux não se destinava a uma única região, mas a todas as nações da Terra, anunciando a universalidade do amparo da Mãe de Deus.'
      },
      {
        titulo: 'A Mãe dos Pequenos e Marginalizados',
        desc: 'O título de “Virgem dos Pobres” reafirma o compromisso eterno de Deus e de Maria com aqueles que são desprovidos de bens materiais ou necessitados de graça espiritual.'
      }
    ],
    mensagem: `Por mais pobres ou limitados que nos sintamos, a Virgem dos Pobres nos acolhe com ternura e alivia as nossas dores.`,
    oracao: `Nossa Senhora de Banneux, Doce Virgem dos Pobres!
    
Vós que descestes à terra para aliviar os doentes e consolar os aflitos de todas as nações, olhai para a nossa pobreza espiritual e para as nossas necessidades cotidianas.

Conduzi-nos às fontes da graça de Cristo, aliviai as nossas enfermidades, abençoai o nosso trabalho e ensinai-nos a confiar sempre na vossa proteção maternal.

Nossa Senhora de Banneux, Virgem dos Pobres, rogai por nós! Amém.`,
    tags: ['banneux', 'belgica', 'virgem dos pobres', 'fonte', 'alivio', 'doentes', 'mariette beco', 'cura', 'pobres']
  },
  {
    id: 'aparecida',
    nome: 'Nossa Senhora Aparecida',
    subtitulo: 'Rainha e Padroeira do Brasil & Mãe dos Pescadores',
    localAno: 'Rio Paraíba do Sul, Aparecida (São Paulo), Brasil — 1717',
    dataFesta: '12 de Outubro',
    videntes: 'Domingos Garcia, Filipe Pedroso e João Alves (humildes pescadores)',
    statusEclesial: 'Proclamada Solenemente Rainha e Padroeira Principal do Brasil pela Santa Sé (Papa Pio XI)',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'latinoamerica',
    icone: 'fa-crown',
    cor: '#d4af37',
    imagemUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem original de terracota da Imaculada Conceição Aparecida',
    citacaoBiblica: '“E a mãe de Jesus disse aos que serviam: Fazei tudo o que Ele vos disser.” (João 2, 5)',
    historia: `No mês de outubro de 1717, três humildes pescadores — Domingos Garcia, Filipe Pedroso e João Alves — navegavam pelo Rio Paraíba do Sul com a difícil missão de conseguir peixes para o banquete do Conde de Assumar, Governador das capitanias de São Paulo e Minas de Ouro.

Após horas de tentativas infrutíferas e redes vazias, no Porto de Itaguaçu, lançaram a rede e recolheram o corpo de uma pequena imagem de barro escurecido da Imaculada Conceição, sem a cabeça. Ao lançarem a rede mais adiante, recolheram a cabeça da mesma imagem, que se encaixou perfeitamente.

A partir daquele instante, as redes se encheram de tal abundância de peixes que os barcos quase afundaram. A imagem foi guardada na casa de Filipe Pedroso, onde vizinhos começaram a se reunir para rezar o Terço. Ali ocorreram os célebres milagres: as velas que se acenderam sozinhas durante o vento, as correntes do escravo Zacarias que se soltaram milagrosamente ao rezar diante da imagem e a cura da menina cega que enxergou pela primeira vez. Em 1930, o Papa Pio XI proclamou Nossa Senhora Aparecida como Rainha e Padroeira Principal do Brasil. Seu Santuário Nacional é o maior templo mariano do mundo.`,
    narracaoTexto: `Nas águas mansas do Rio Paraíba do Sul, a Mãe de Deus manifestou-se na fragilidade de uma pequena imagem de barro negro recolhida pelas redes dos pobres pescadores. O que estava quebrado foi unido, o que estava vazio foi farto, e a escravidão foi desatada pelo amor da Virgem Imaculada.

Desde aquele dia sagrado de 1717, Nossa Senhora Aparecida abraça o povo brasileiro como sua Rainha e Padroeira, ouvindo as preces de milhões de romeiros que caminham com fé ao seu Santuário para agradecer e pedir a sua bênção.`,
    segredosProfecias: [
      {
        titulo: 'O Milagre das Redes e da União',
        desc: 'A cabeça e o corpo encontrados separadamente simbolizam a união de um povo que precisa ser reconciliado e abençoado na fé de Cristo.'
      },
      {
        titulo: 'A Libertação do Escravo Zacarias e os Milagres Fundamentais',
        desc: 'O rompimento espontâneo das pesadas correntes de ferro diante do altar de Maria marcou para sempre o papel da Mãe de Deus como defensora da dignidade, da liberdade e dos oprimidos.'
      }
    ],
    mensagem: `A Virgem Aparecida nos ensina a humildade, o valor da oração simples do Terço em família e a certeza de que Deus preenche as nossas redes com abundância quando confiamos Nele.`,
    oracao: `Ó incomparável Senhora da Conceição Aparecida, Rainha e Padroeira do Brasil e Mãe de todos nós!
    
Volvei sobre as nossas famílias, sobre os enfermos, sobre os trabalhadores e sobre a nossa pátria os vossos olhos misericordiosos.

Alcançai-nos de vosso amado Filho Jesus a paz nos lares, a saúde do corpo e da alma e a graça da salvação eterna.

Nossa Senhora Aparecida, Padroeira do Brasil, rogai por nós! Amém.`,
    tags: ['aparecida', 'brasil', 'rio paraiba', 'pescadores', 'padroeira', 'milagre das velas', 'escravo zacarias', 'santuario nacional', 'terracota']
  },
  {
    id: 'san_nicolas',
    nome: 'Nossa Senhora de San Nicolás',
    subtitulo: 'A Virgem do Rosário na Argentina & A Renovação da Fé',
    localAno: 'San Nicolás de los Arroyos (Buenos Aires), Argentina — 1983 a 1990',
    dataFesta: '25 de Setembro',
    videntes: 'Gladys Quiroga de Motta (humilde dona de casa e mãe de família)',
    statusEclesial: 'Aprovada formalmente pelo Bispo Diocesano Dom Héctor Cardelli em 2016 com reconhecimento eclesiástico pleno',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'latinoamerica',
    icone: 'fa-sun',
    cor: '#38bdf8',
    imagemUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem de Nossa Senhora do Rosário de San Nicolás na Argentina',
    citacaoBiblica: '“Sou a Virgem do Rosário. Que este lugar seja uma casa onde o meu Filho acolha os corações aflitos.” (San Nicolás, 1983)',
    historia: `Em setembro de 1983, na cidade de San Nicolás de los Arroyos, às margens do Rio Paraná na Argentina, uma humilde dona de casa com pouca instrução escolar, Gladys Quiroga de Motta, começou a ver seu rosário se iluminar milagrosamente enquanto rezava em seu quarto.

Em 25 de setembro de 1983, a Virgem Maria apareceu-lhe segurando o Menino Jesus no colo e vestindo uma túnica cor de salmão com manto azul celeste, estendendo-lhe um rosário de contas luminosas. A Virgem pediu a construção de um templo à beira do rio e transmitiu mensagens profundamente bíblicas (indicando capítulos e versículos exatos da Bíblia que a vidente desconhecia).

O local tornou-se o maior centro de peregrinação mariana da Argentina moderna, reunindo centenas de milhares de pessoas todo dia 25 de setembro. Em 22 de maio de 2016, após mais de 30 anos de rigorosos estudos teológicos, psicológicos e médicos de curas, o Bispo Diocesano Dom Héctor Sabatino Cardelli declarou em solene decreto pastoral que as aparições de San Nicolás possuem "caráter sobrenatural e são de origem divina".`,
    narracaoTexto: `Na terra argentina de San Nicolás, o Santo Rosário resplandeceu nas mãos de uma mãe de família. A Virgem Maria desceu com o Menino Jesus para trazer uma mensagem de reconexão profunda com a Palavra de Deus e com os Sacramentos.

Com palavras simples e maternais, Nossa Senhora convidou os fiéis a redescobrir a beleza da Eucaristia e a força invencível da oração do Terço contra o desânimo espiritual.`,
    segredosProfecias: [
      {
        titulo: 'A Conexão Bíblica Sobrenatural',
        desc: 'A vidente recebia referências bíblicas precisas que correspondiam com exatidão às mensagens espirituais transmitidas, demonstrando a perfeita harmonia com o Evangelho.'
      },
      {
        titulo: 'O Santuário às Margens do Rio Paraná',
        desc: 'A construção do grandioso santuário cumpriu-se exatamente nas dimensões indicadas por Maria, tornando-se fonte ininterrupta de conversões e confissões.'
      }
    ],
    mensagem: `A leitura diária da Bíblia unida à oração do Rosário é a luz que ilumina o caminho das famílias cristãs.`,
    oracao: `Santa Maria, Mãe de Deus e Senhora do Rosário de San Nicolás!
    
Abençoai os nossos lares, acolhei as nossas súplicas e renovai em nós o amor à Sagrada Escritura e aos Sacramentos.

Conduzi-nos sempre a Jesus Cristo e fazei brilhar sobre a nossa terra a paz e a concórdia entre irmãos.

Nossa Senhora de San Nicolás, rogai por nós! Amém.`,
    tags: ['san nicolas', 'argentina', 'gladys motta', 'rosario', 'rio parana', 'aprovada', 'biblia', 'conversao', 'america latina']
  },
  {
    id: 'cuapa',
    nome: 'Nossa Senhora de Cuapa',
    subtitulo: 'A Pacificadora da Nicarágua & O Chamado à Paz em Família',
    localAno: 'San Francisco de Cuapa, Chontales, Nicarágua — 1980',
    dataFesta: '8 de Maio',
    videntes: 'Bernardo Martínez (humilde sacristão e camponês que mais tarde foi ordenado sacerdote)',
    statusEclesial: 'Aprovada formalmente pelo Bispo Dom Pablo Antonio Vega e pela Conferência Episcopal da Nicarágua',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'latinoamerica',
    icone: 'fa-dove',
    cor: '#10b981',
    imagemUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem de Nossa Senhora de Cuapa na Nicarágua',
    citacaoBiblica: '“Rezai o Rosário em família e em horas marcadas. Não peçais apenas a paz: sede vós mesmos os construtores da paz!” (Cuapa, 1980)',
    historia: `Em 15 de abril de 1980, no vilarejo rural de San Francisco de Cuapa, na Nicarágua — em meio a um contexto de terrível guerra civil, perseguição ideológica e dor no país —, o humilde sacristão Bernardo Martínez viu a estátua da Virgem na capela brilhar com luz sobrenatural.

Em 8 de maio de 1980, enquanto caminhava no campo, Bernardo viu uma nuvem luminosa descer sobre uma árvore e a Virgem Maria apareceu-lhe vestida de branco e dourado, com as mãos postas em oração.

A Senhora deu conselhos práticos e urgentes: pediu que as famílias rezassem o Rosário diariamente em horários marcados, que os membros da família fizessem as pazes entre si antes de dormir, que não guardassem rancor e que amassem a Deus através do cumprimento dos deveres cotidianos. Em 1982, o bispo local Dom Pablo Antonio Vega aprovou solenemente as aparições e a mensagem de Cuapa, e o próprio vidente Bernardo Martínez, após discernimento e estudos, foi ordenado sacerdote da Igreja Católica em 1995.`,
    narracaoTexto: `Em meio aos conflitos da Nicarágua, Nossa Senhora de Cuapa apareceu a um sacristão humilde com uma mensagem inesquecível: "Não peçais a paz sem construí-la primeiro dentro da vossa própria casa".

A Virgem ensinou que o amor a Deus se prova na reconciliação diária com o próximo, no perdão aos inimigos e na recitação sincera do Santo Rosário em família.`,
    segredosProfecias: [
      {
        titulo: 'O Aviso sobre a Terceira Guerra Mundial e a Paz',
        desc: 'Nossa Senhora alertou que, se a humanidade não mudar de vida e não buscar a paz verdadeira em Deus, o mundo caminhará para conflitos catastróficos, mas que a oração familiar pode desarmar as guerras.'
      },
      {
        titulo: 'A Vocação Sacerdotal do Vidente',
        desc: 'A autenticidade de Cuapa foi selada pela vida humilde, obediente e santa de Bernardo Martínez, que se tornou um sacerdote exemplar até o fim da vida.'
      }
    ],
    mensagem: `A verdadeira paz não é apenas a ausência de guerra: é a presença de Deus e o perdão mútuo dentro do nosso próprio lar.`,
    oracao: `Santíssima Virgem Maria de Cuapa, Mãe da Paz e Consoladora dos Aflitos!
    
Ensinai-nos a rezar o Santo Rosário com o coração e a sermos verdadeiros construtores da paz em nossas famílias.

Afastai todo rancor, perdoai as nossas faltas e fazei do nosso lar um reflexo do amor de Deus.

Nossa Senhora de Cuapa, rogai por nós e dai a paz ao mundo inteiro! Amém.`,
    tags: ['cuapa', 'nicaragua', 'bernardo martinez', 'paz', 'rosario em familia', 'perdao', 'guerra civil', 'america latina', 'aprovada']
  },
  {
    id: 'caravaggio',
    nome: 'Nossa Senhora de Caravaggio',
    subtitulo: 'A Fonte de Misericórdia & A Paz nas Famílias',
    localAno: 'Caravaggio (Bérgamo), Itália — 1432',
    dataFesta: '26 de Maio',
    videntes: 'Giannetta de\' Vacchi (humilde camponesa e esposa sofrida)',
    statusEclesial: 'Aprovada solenemente pela Santa Sé e profundamente venerada no Brasil e na Itália',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-water',
    cor: '#059669',
    imagemUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A aparição de Nossa Senhora de Caravaggio à camponesa Giannetta',
    citacaoBiblica: '“O Todo-Poderoso quis fazer grandes coisas por meio de Mim. Venho trazer-te a paz e o fim das discórdias.” (Caravaggio, 1432)',
    historia: `Na tarde de 26 de maio de 1432, nos campos de Caravaggio, na Itália, Giannetta de' Vacchi, uma piedosa mulher que sofria terríveis humilhações e maus-tratos de seu esposo violento e angustiava-se com as guerras sangrentas que dividiam as cidades da Lombardia, ajoelhou-se no prado para colher ervas e rezar em lágrimas a Maria.

De repente, viu diante de si uma Senhora majestosa e altíssima vestida de azul e dourado, com um manto alvo e olhar cheio de compaixão maternal. A Virgem tocou-lhe o ombro com doçura e disse: "Não temas, Giannetta. Consegui do meu amado Filho a paz e a misericórdia para a tua terra".

Nossa Senhora pediu que os fiéis jejuassem às sextas-feiras a pão e água e guardassem o sábado em oração reparadora. Onde os pés sagrados da Virgem tocaram o solo, brotou imediatamente uma fonte límpida e caudalosa de água pura, que operou curas instantâneas em leprosos, paralíticos e cegos. A devoção a Caravaggio atravessou oceanos com os imigrantes italianos e gerou no Brasil um dos mais belos e frequentados santuários nacionais, em Farroupilha/RS.`,
    narracaoTexto: `No prado verdejante de Caravaggio, o choro de uma mulher humilde e aflita encontrou o abraço amoroso da Rainha dos Céus. A Virgem Maria desceu para consolar os que sofrem violência e restaurar a paz nas famílias divididas.

Da terra tocada pelos pés de Maria brotou a fonte sagrada de água pura que até hoje cura os corpos e lava as almas de milhões de peregrinos.`,
    segredosProfecias: [
      {
        titulo: 'A Paz nas Guerras e nas Famílias',
        desc: 'A aparição de Caravaggio pacificou as repúblicas italianas em guerra e converteu milagrosamente o marido de Giannetta, demonstrando que a oração da mulher de fé transforma realidades impossíveis.'
      },
      {
        titulo: 'A Fonte Perene de Curas',
        desc: 'A água milagrosa de Caravaggio tornou-se símbolo da graça divina que nunca cessa de jorrar para os que recorrem à intercessão da Virgem.'
      }
    ],
    mensagem: `Maria escuta o choro silencioso dos que sofrem em seus lares e é capaz de transformar discórdias em mananciais de reconciliação e paz.`,
    oracao: `Ó Santíssima Virgem de Caravaggio, Mãe de Misericórdia e Consoladora dos Aflitos!
    
Vós que ouvistes as súplicas da humilde Giannetta e fizestes brotar no prado uma fonte de águas milagrosas, olhai para as nossas dores familiares e para as nossas cruzes.

Pacificai os nossos lares, curai os nossos doentes, dai fortaleza aos que sofrem e guiai-nos no caminho do amor e do perdão de Jesus Cristo.

Nossa Senhora de Caravaggio, rogai por nós! Amém.`,
    tags: ['caravaggio', 'italia', 'farroupilha', 'giannetta', 'fonte milagrosa', 'paz na familia', 'cura', 'agua sagrada']
  },
  {
    id: 'tre_fontane',
    nome: 'Nossa Senhora da Revelação',
    subtitulo: 'A Conversão de Tre Fontane & A Protetora da Eucaristia',
    localAno: 'Tre Fontane (Roma), Itália — 1947',
    dataFesta: '12 de Abril',
    videntes: 'Bruno Cornacchiola (ex-católico anticlerical que planejava assassinar o Papa Pio XII)',
    statusEclesial: 'Aprovada formalmente pelo Papa Pio XII e pela Diocese de Roma',
    statusTipo: 'aprovada',
    categoria: 'aparicoes',
    subcategoria: 'aprovadas',
    icone: 'fa-book-bible',
    cor: '#7c3aed',
    imagemUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    imagemLegenda: 'A imagem da Virgem da Revelação na gruta de Tre Fontane em Roma',
    citacaoBiblica: '“Eu sou a Virgem da Revelação. Tu me persegues; cessa agora! Volta ao rebanho santo da Igreja.” (Tre Fontane, 12 de abril de 1947)',
    historia: `Em 12 de abril de 1947, na colina de Tre Fontane, em Roma (local sagrado onde o Apóstolo São Paulo foi decapitado no século I), Bruno Cornacchiola — um homem dominado por profundo ódio contra a Igreja Católica e que guardava em sua bolsa um punhal com a inscrição gravada "Morte ao Papa" para assassinar o Papa Pio XII — levou seus três filhos pequenos para um piquenique.

Enquanto Bruno preparava um discurso contra o Dogma da Imaculada Conceição e da virgindade de Maria, as crianças desapareceram no interior de uma gruta de eucaliptos. Ao procurá-las, encontrou seus três filhos de joelhos, em êxtase luminoso, sussurrando repetidamente: "Bela Senhora! Bela Senhora!".

Ao entrar na gruta, Bruno foi envolvido por uma luz ofuscante e viu uma jovem resplandecente vestida com uma túnica branca, manto verde e uma faixa rosa, segurando no peito um livro encadernado em cinza: a Bíblia / Sagrada Escritura. A Senhora disse com voz de majestade e doçura: "Eu sou aquela que está na Trindade Divina: a Virgem da Revelação. Tu me persegues; cessa agora! Entra para o redil santo da Igreja Católica, fundada por meu Filho!". Bruno converteu-se instantaneamente em lágrimas, entregou o punhal e a Bíblia protestante pessoalmente ao Papa Pio XII e tornou-se um missionário fervoroso até o fim da vida.`,
    narracaoTexto: `Na colina onde São Paulo deu a vida por Cristo, a Virgem da Revelação desceu para desarmar o ódio e converter o coração de um perseguidor. 

Segurando a Bíblia junto ao coração, Maria mostrou que a verdadeira Palavra de Deus não divide, mas conduz à comunhão com a Santa Sé, com a Eucaristia e com a Igreja fundada por Jesus.`,
    segredosProfecias: [
      {
        titulo: 'A Profecia da Assunção em Corpo e Alma',
        desc: 'A Virgem declarou a Bruno em 1947: “O meu corpo não conheceu a corrupção do túmulo; o meu divino Filho veio me buscar com os seus anjos”, confirmando o Dogma da Assunção proclamado por Pio XII em 1950.'
      },
      {
        titulo: 'A Entrega do Punhal ao Papa Pio XII',
        desc: 'O encontro emocionante em que o Papa abraçou o ex-inimigo perdoado, abençoou a imagem de Tre Fontane e autorizou o culto na gruta.'
      }
    ],
    mensagem: `Não há coração tão endurecido ou perdido que o amor maternal de Maria e a graça de Cristo não possam resgatar e transformar em apóstolo da fé.`,
    oracao: `Santíssima Virgem da Revelação, Mãe da Igreja e Refúgio dos Pecadores!
    
Vós que tocastes o coração de Bruno Cornacchiola e transformastes o ódio em amor fervoroso a Jesus e à Santa Sé, olhai por aqueles que vivem afastados da fé e da verdade.

Convertei os pecadores, guardai os sacerdotes na fidelidade, abençoai o Papa e dai-nos a graça de amar a Palavra de Deus e a Sagrada Eucaristia.

Nossa Senhora da Revelação de Tre Fontane, rogai por nós! Amém.`,
    tags: ['tre fontane', 'roma', 'bruno cornacchiola', 'virgem da revelacao', 'pio xii', 'conversao', 'biblia', 'assuncao', 'milagres']
  }
];

// Compatibilidade de Títulos Tradicionais Marianos
export const MARIA_TITULOS = APARICOES_VIRGEM;

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

(Glória ao Pai... 3 vezes pelas intenções do Santo Padre e pelas almas dos fiéis defuntos).`
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

A Igreja definiu que Jesus Cristo possui duas naturezas (a divina e a humana) unidas na única Pessoa Divina do Filho de Deus. Como as mães dão à luz a pessoa de seus filhos e não apenas a sua carne, Maria, ao dar à luz a Jesus, é verdadeiramente a Mãe de Deus (Theotokos).

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
    explicacaoTeologica: `A Tradição ininterrupta da Igreja professa que a Santíssima Virgem Maria é Aeiparthenos (Sempre Virgem).

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
export function getAparicoesVirgem() {
  return APARICOES_VIRGEM;
}

export function getAparicoesPorCategoria(cat) {
  if (!cat || cat === 'todas') return APARICOES_VIRGEM;
  if (cat === 'aprovadas') return APARICOES_VIRGEM.filter(a => a.statusTipo === 'aprovada' || a.statusTipo === 'tradicao');
  if (cat === 'profecias') return APARICOES_VIRGEM.filter(a => a.subcategoria === 'profecias' || a.statusTipo === 'profetica' || a.statusTipo === 'nihil_obstat');
  if (cat === 'latinoamerica') return APARICOES_VIRGEM.filter(a => a.subcategoria === 'latinoamerica' || a.id === 'anguera' || a.id === 'aparecida' || a.id === 'guadalupe' || a.id === 'bom_sucesso' || a.id === 'san_nicolas' || a.id === 'cuapa');
  return APARICOES_VIRGEM;
}

export function getAparicaoPorId(id) {
  return APARICOES_VIRGEM.find(a => a.id === id);
}

export function getMariaTitulos() {
  return APARICOES_VIRGEM;
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
  return APARICOES_VIRGEM.find(a => a.id === id) || 
         MARIA_ORACOES.find(o => o.id === id) || 
         MARIA_DOGMAS.find(d => d.id === id) || 
         MARIA_PRATICAS.find(p => p.id === id);
}
