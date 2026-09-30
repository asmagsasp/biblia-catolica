// MOTOR AVANÇADO DE HOMILIAS E REFLEXÕES TEOLÓGICAS CATÓLICAS PERSONALIZADAS
// Exegese bíblica contextual, Padres da Igreja, Magistério Católico e Aplicações Práticas

// 1. REPOSITÓRIO TEOLÓGICO DOS 73 LIVROS CANÔNICOS DA IGREJA CATÓLICA
const CATHOLIC_BOOK_THEOLOGY = {
  // PENTATEUCO
  'gênesis': {
    theme: 'Criação, Aliança e Providência Divina',
    context: 'Gênesis nos revela as origens do universo, a dignidade inalienável do ser humano criado à imagem e semelhança de Deus (Gn 1,26) e a promessa inabalável da Redenção desde o Protoevangelho.',
    keyConcept: 'Deus é o Autor da vida e nada escapa ao Seu desígnio de amor.',
    father: 'Santo Agostinho ensinava nas *Confissões*: "Fizeste-nos para Ti, Senhor, e o nosso coração está inquieto enquanto não descansar em Ti."'
  },
  'êxodo': {
    theme: 'Libertação da Escravidão e Aliança no Sinai',
    context: 'O Êxodo é a grande tipologia da nossa redenção em Cristo: da mesma forma que Deus libertou Seu povo da opressão do Egito através do Cordeiro Pascal, Jesus nos liberta da escravidão do pecado e da morte.',
    keyConcept: 'Deus escuta o clamor dos Seus filhos e caminha à nossa frente como coluna de luz.',
    father: 'São Gregório de Nissa lembrava que a subida de Moisés ao monte é a imagem da subida da alma até a contemplação de Deus.'
  },
  'levítico': {
    theme: 'Santidade, Culto e Consagração a Deus',
    context: 'O Levítico nos ensina o chamado universal à santidade: "Sede santos, porque Eu, o Senhor vosso Deus, sou santo" (Lv 19,2).',
    keyConcept: 'A verdadeira adoração exige pureza de coração e coerência de vida.',
    father: 'São João Crisóstomo afirmava: "Não há nada mais poderoso do que uma alma que ama a Deus com retidão e pureza."'
  },
  'números': {
    theme: 'A Peregrinação no Deserto e a Fidelidade Divina',
    context: 'Números reflete a nossa própria caminhada terrena: no deserto das provações diárias, Deus sustenta Seu povo com o maná e exige confiança perseverante.',
    keyConcept: 'Mesmo nas nossas fraquezas e murmurações, a misericórdia de Deus jamais nos desampara.',
    father: 'São Cipriano destacava que a unidade do povo de Deus no deserto é o alicerce da paz na Igreja.'
  },
  'deuteronômio': {
    theme: 'O Grande Mandamento do Amor e a Fidelidade à Palavra',
    context: 'O Deuteronômio renova o pacto de amor: "Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma e de todas as tuas forças" (Dt 6,5).',
    keyConcept: 'Guardar a Palavra de Deus no coração é a fonte da verdadeira bênção e vida plena.',
    father: 'São Jerônimo dizia com veemência: "Ignorar as Escrituras é ignorar a Cristo."'
  },

  // LIVROS HISTÓRICOS
  'josué': {
    theme: 'Conquista da Esperança e Coragem na Fé',
    context: 'Josué ecoa o imperativo divino para cada um de nós: "Sê forte e corajoso; não temas nem te apavores, pois o Senhor teu Deus está contigo por onde quer que andares" (Js 1,9).',
    keyConcept: 'As batalhas da vida são vencidas quando confiamos no poder de Deus e não nas nossas próprias forças.',
    father: 'São Bernardo de Claraval exortava: "Olha para a Estrela da Manhã, invoca Maria, e nenhuma tempestade te fará vacilar."'
  },
  'juízes': {
    theme: 'Misericórdia no Arrependimento e Socorro Divino',
    context: 'Juízes demonstra a paciência pedagógica de Deus, que sempre suscita libertadores quando o Seu povo se volta com humildade e sincero arrependimento.',
    keyConcept: 'Deus transforma nossa fraqueza em instrumento de salvação.',
    father: 'Santo Ambrósio ensinava: "Onde abundou o pecado, superabundou a graça restauradora de Cristo."'
  },
  'rute': {
    theme: 'Lealdade, Amor Fiel e a Providência nos Pequenos',
    context: 'O livro de Rute celebra a beleza da fidelidade e da piedade familiar, mostrando como das escolhas humildes de uma estrangeira brota a linhagem messiânica do Rei Davi e de Jesus.',
    keyConcept: 'Deus trabalha nos detalhes silenciosos da nossa história cotidiana.',
    father: 'Santa Teresa de Calcutá dizia: "Não podemos fazer grandes coisas nesta terra; podemos apenas fazer pequenas coisas com grande amor."'
  },
  'i samuel': {
    theme: 'A Escuta da Voz de Deus e a Escolha do Coração',
    context: 'Em I Samuel aprendemos com a oração de Ana e com o jovem Samuel a responder com prontidão: "Fala, Senhor, que o teu servo escuta" (1Sm 3,10).',
    keyConcept: 'O homem vê a aparência, mas o Senhor olha o coração (1Sm 16,7).',
    father: 'São Bento de Núrsia ensinava na sua Regra: "Inclina o ouvido do teu coração e acolhe de bom grado o conselho do Pai."'
  },
  'ii samuel': {
    theme: 'Realeza, Humildade e a Graça do Perdão',
    context: 'II Samuel apresenta a grandeza de Davi como homem segundo o coração de Deus, não porque fosse isento de falhas, mas pela sua capacidade de se prostrar em sincero arrependimento e penitência.',
    keyConcept: 'A humildade diante de Deus é a maior nobreza da alma.',
    father: 'Santo Tomás de Aquino afirmava: "A misericórdia de Deus é a plenitude da Sua justiça e a manifestação máxima do Seu poder."'
  },
  'i reis': {
    theme: 'Sabedoria, Fidelidade ao Templo e a Voz Mansa de Deus',
    context: 'Em I Reis contemplamos o dom da sabedoria concedido a Salomão e o profeta Elias encontrando a presença do Senhor não no terremoto ou no fogo, mas na brisa suave (1Rs 19,12).',
    keyConcept: 'É no silêncio interior que a voz suave de Deus transforma nossa alma.',
    father: 'São João da Cruz ensinava: "Para alcançar o Tudo, é preciso saber estar em silêncio diante de Deus."'
  },
  'ii reis': {
    theme: 'Zelo pela Aliança e o Fogo da Fé dos Profetas',
    context: 'II Reis testemunha o ministério profético de Eliseu e as reformas espirituais que nos lembram da urgência de manter a alma livre dos ídolos do mundo.',
    keyConcept: 'O Senhor guarda aqueles que guardam a Sua santa Aliança.',
    father: 'São Basílio Magno dizia: "A alma que busca a Deus é como uma chama viva que nada pode extinguir."'
  },
  'i crônicas': {
    theme: 'Louvor Perpétuo, Liturgia e Consagração',
    context: 'I Crônicas nos convida a bendizer o Senhor com salmos, hinos e cânticos espirituais, reconhecendo que toda a honra e toda a glória pertencem a Deus.',
    keyConcept: 'O louvor purifica o olhar da alma e renova nossa esperança.',
    father: 'Santo Agostinho cantava: "Cantar é próprio de quem ama; quem canta bem, reza duas vezes."'
  },
  'ii crônicas': {
    theme: 'A Casa de Deus, Oração e Reconciliação',
    context: 'Em II Crônicas ecoa a comovente promessa: "Se o meu povo se humilhar, orar e buscar a minha face, Eu ouvirei do céu, perdoarei os seus pecados e sararei a sua terra" (2Cr 7,14).',
    keyConcept: 'A oração sincera tem o poder de restaurar nações, famílias e corações feridos.',
    father: 'São Francisco de Sales ensinava: "A oração abre o entendimento da alma à claridade da luz divina."'
  },
  'esdras': {
    theme: 'Restauração da Fé e Amor à Palavra',
    context: 'Esdras relata o retorno do exílio babilônico e a reconstrução do Templo, mostrando a importância do estudo orante da Lei do Senhor.',
    keyConcept: 'A verdadeira reconstrução de uma vida começa no retorno à Palavra de Deus.',
    father: 'São Jerônimo destacava a dedicação de Esdras como modelo para todos os sacerdotes e catequistas.'
  },
  'neemias': {
    theme: 'Oração, Ação e Reconstrução da Esperança',
    context: 'Neemias une oração perseverante com coragem prática para reconstruir as muralhas de Jerusalém: "A alegria do Senhor é a vossa força" (Ne 8,10).',
    keyConcept: 'Quando Deus nos chama a uma missão, Ele mesmo supre todas as nossas forças.',
    father: 'São João Bosco dizia aos jovens: "Trabalhai com entusiasmo e orai com devoção; a alegria no Senhor é nossa maior couraça."'
  },
  'tobias': {
    theme: 'Piedade Familiar, Caridade e a Proteção dos Santos Anjos',
    context: 'Tobias nos ensina a beleza da fidelidade no matrimônio, a generosidade com as esmolas e a doce companhia do Arcanjo São Rafael nos caminhos da vida.',
    keyConcept: 'A caridade aos pobres cobre uma multidão de pecados e atrai as bênçãos do Céu.',
    father: 'São Pio de Pietrelcina costumava dizer: "Nunca te esqueças do teu Anjo da Guarda; ele é teu irmão, teu guia e teu amigo leal."'
  },
  'judite': {
    theme: 'Coragem na Fé, Oração da Mulher Forte e Vitória Divina',
    context: 'Judite pré-figura a Virgem Maria na sua oração ardente e na vitória esmagadora contra o opressor do povo de Deus.',
    keyConcept: 'Deus escolhe o que é humilde para confundir os soberbos deste mundo.',
    father: 'São Luís Maria Grignion de Montfort via em Judite o modelo da alma consagrada que vence o demônio com a força de Deus.'
  },
  'ester': {
    theme: 'Intercessão, Jejum e a Soberania Providencial',
    context: 'Ester demonstra como a coragem de arriscar a própria vida em intercessão pelo seu povo transformou um decreto de morte em dia de salvação.',
    keyConcept: 'A intercessão fervorosa tem poder diante do trono da graça.',
    father: 'Santa Teresa de Ávila afirmava: "A oração é um trato de amizade com Aquele que sabemos que nos ama."'
  },
  'i macabeus': {
    theme: 'Fidelidade Heroica e Defesa da Fé Católica',
    context: 'I Macabeus testemunha o heroísmo de Matatias e Judas Macabeu que preferiram morrer a trair a Santa Lei de Deus.',
    keyConcept: 'Vale mais viver na graça de Deus do que ceder às pressões do mundo.',
    father: 'São Justino Mártir ensinava: "Podem matar o nosso corpo, mas não podem roubar a nossa união com Cristo."'
  },
  'ii macabeus': {
    theme: 'A Ressurreição dos Mortos, Martírio e Oração pelos Falecidos',
    context: 'II Macabeus fundamenta a doutrina católica da ressurreição dos mortos e a santa prática de oferecer sufrágios e orações pelas almas do Purgatório (2Mac 12,46).',
    keyConcept: 'Nossa esperança não termina na sepultura; estamos destinados à glória eterna.',
    father: 'Santo Agostinho lembrava: "Uma flor sobre uma cova murcha, uma lágrima sobre a sepultura evapora; uma oração pela alma sobe ao altar de Deus."'
  },

  // LIVROS SAPIENCIAIS
  'jó': {
    theme: 'O Mistério do Sofrimento e a Fé Inabalável',
    context: 'O livro de Jó é o monumento à fidelidade no meio da dor incompreensível: "O Senhor deu, o Senhor tirou; bendito seja o nome do Senhor!" (Jó 1,21).',
    keyConcept: 'Nossa fé em Deus não depende do que Ele nos dá, mas de Quem Ele é.',
    father: 'São João Paulo II na *Salvifici Doloris* ensinava que o sofrimento humano unido à Cruz de Cristo torna-se fonte de redenção.'
  },
  'salmos': {
    theme: 'O Hinário da Alma e a Oração da Igreja',
    context: 'Os Salmos abraçam todas as dimensões da existência humana: louvor, gratidão, súplica angustiada, arrependimento e júbilo inabalável.',
    keyConcept: 'Rezar os salmos é deixar que o próprio Espírito Santo molde as palavras do nosso coração.',
    father: 'Santo Ambrósio chamava os Salmos de "a voz da Igreja, a melodia dos anjos e o bálsamo das almas aflitas."'
  },
  'provérbios': {
    theme: 'Sabedoria Prática, Temor do Senhor e Retidão',
    context: 'Provérbios nos orienta na conduta diária: "O temor do Senhor é o princípio da sabedoria" (Pr 9,10).',
    keyConcept: 'A sabedoria cristã se traduz em honestidade, paciência, prudência no falar e caridade no agir.',
    father: 'São Francisco de Sales exortava: "Tem bom ânimo e sê prudente; uma gota de mel atrai mais moscas do que um barril de vinagre."'
  },
  'eclesiastes': {
    theme: 'O Sentido da Vida e a Vaidade das Coisas Terrenas',
    context: 'Eclesiastes desmascara as ilusões mundanas: "Vaidade das vaidades, tudo é vaidade" (Ecl 1,2), orientando nosso olhar para o que permanece eternamente.',
    keyConcept: 'Só Deus pode preencher o vazio infinito do coração humano.',
    father: 'Santo Inácio de Loyola propunha o princípio do *Tanto Quanto*: usar as criaturas apenas na medida em que nos aproximam do Criador.'
  },
  'cântico dos cânticos': {
    theme: 'O Amor Esponsal entre Deus e a Alma / Cristo e a Igreja',
    context: 'O Cântico dos Cânticos celebra o mistério do amor supremo e nupcial que une a alma crente a Jesus, o Divino Esposo.',
    keyConcept: 'O amor de Deus por nós é ciumento, apaixonado e mais forte do que a própria morte.',
    father: 'São Bernardo de Claraval dedicou dezenas de sermões místicos a este livro, revelando a doçura do beijo da graça de Cristo na alma.'
  },
  'sabedoria': {
    theme: 'A Sabedoria Divina, Imortalidade e Justiça',
    context: 'O livro da Sabedoria nos assegura que "as almas dos justos estão na mão de Deus e nenhum tormento as tocará" (Sb 3,1).',
    keyConcept: 'A justiça de Deus triunfa sobre toda aparente derrota terrena.',
    father: 'São Tomás de Aquino definia a Sabedoria como o mais elevado dos dons do Espírito Santo, que nos faz saborear as coisas divinas.'
  },
  'eclesiástico': {
    theme: 'Virtudes Cristãs, Amizade Verdadeira e Honra',
    context: 'O Eclesiástico (ou Sirácida) é um tesouro de ensinamentos morais sobre honrar os pais, cultivar amizades santas e perseverar na paciência.',
    keyConcept: 'Quem honra a seus pais alcançará o perdão de seus pecados e será abençoado por Deus.',
    father: 'São João Crisóstomo recomendava a leitura diária deste livro aos pais de família e jovens.'
  },

  // PROFETAS
  'isaías': {
    theme: 'O Santo de Israel, o Emanuel e o Servo Sofredor',
    context: 'Isaías é chamado de "o quinto Evangelista" por antecipar com precisão impressionante a Natividade da Virgem (Is 7,14), o Menino Deus (Is 9,5) e a Paixão Redentora de Cristo (Is 53).',
    keyConcept: 'Pelas Suas chagas fomos curados e a Sua paz nos foi restituída.',
    father: 'São Jerônimo dizia: "Isaías não parece apenas profetizar sobre o futuro, mas narrar a história do Evangelho já acontecida."'
  },
  'jeremias': {
    theme: 'A Nova Aliança Escrita no Coração e a Fidelidade Profética',
    context: 'Jeremias proclama o amor eterno do Senhor: "Com amor eterno Eu te amei, por isso guardei para ti a minha misericórdia" (Jr 31,3) e anuncia a Nova Aliança gravada no coração.',
    keyConcept: 'Deus é o Oleiro que molda pacientemente os vasos quebrados de nossas vidas.',
    father: 'Santo Afonso Maria de Ligório meditava frequentemente no amor apaixonado de Deus revelado por Jeremias.'
  },
  'lamentações': {
    theme: 'Esperança no Meio das Cinzas e Misericórdias Renováveis',
    context: 'Lamentações encontra a luz nas trevas da dor: "As misericórdias do Senhor são a causa de não sermos consumidos; renovam-se a cada manhã. Grande é a Tua fidelidade!" (Lm 3,22-23).',
    keyConcept: 'A cada novo amanhecer, a graça de Deus nos oferece um recomeço sagrado.',
    father: 'Santa Faustina Kowalska ensinava que a misericórdia de Deus é inesgotável como um oceano sem margens.'
  },
  'baruc': {
    theme: 'Humildade, Conversão e a Fonte da Verdadeira Sabedoria',
    context: 'Baruc convoca à conversão profunda e ensina que a sabedoria divina se manifestou na terra e habitou entre os homens na Encarnação de Jesus.',
    keyConcept: 'A alegria de Deus é ver o Seu povo retornar para os Seus braços de Pai.',
    father: 'Santo Atanásio de Alexandria citava Baruc para defender a divindade eterna de Jesus Cristo.'
  },
  'ezequiel': {
    theme: 'O Coração Novo, o Espírito Santo e o Bom Pastor',
    context: 'Ezequiel profetiza a renovação batismal: "Dar-vos-ei um coração novo e porei dentro de vós um espírito novo; tirarei de vossa carne o coração de pedra e vos darei um coração de carne" (Ez 36,26).',
    keyConcept: 'A graça de Deus tem o poder de vivificar os ossos secos de nossa esperança.',
    father: 'São Cirilo de Jerusalém via nesta profecia a promessa gloriosa dos Sacramentos do Batismo e da Confirmação.'
  },
  'daniel': {
    theme: 'O Reino Eterno de Deus e a Fidelidade nas Provações',
    context: 'Daniel ilustra a vitória da fé sobre as feras e a fornalha ardente, proclamando que o Reino de Cristo não terá fim.',
    keyConcept: 'Quem permanece fiel a Deus na oração jamais é abandonado no meio das fornalhas da vida.',
    father: 'São João Crisóstomo exclamava: "Daniel na cova dos leões era mais livre e seguro do que o rei no seu trono suntuoso."'
  },
  'oséias': {
    theme: 'O Amor Esposo de Deus e o Chamado à Misericórdia',
    context: 'Oséias revela o coração ferido de Deus que atrai a alma com laços de ternura: "Misericórdia quero, e não sacrifício" (Os 6,6).',
    keyConcept: 'O amor de Deus nos busca incansavelmente mesmo quando nos desviamos.',
    father: 'Papa Bento XVI na encíclica *Deus Caritas Est* destacou Oséias como o auge do amor divino apaixonado pela humanidade.'
  },
  'joel': {
    theme: 'A Efusão do Espírito Santo e o Dia da Salvação',
    context: 'Joel antecipa o grande Pentecostes: "Derramarei o meu Espírito sobre toda a carne" (Jl 3,1) e convida ao jejum de coração sincero.',
    keyConcept: 'Rasgai o vosso coração e não as vossas vestes; voltai ao Senhor vosso Deus.',
    father: 'São Pedro no dia de Pentecostes (Atos 2) utilizou as palavras proféticas de Joel para anunciar a vinda do Espírito Santo.'
  },
  'amós': {
    theme: 'Justiça Social, Retidão e Defesa dos Pobres',
    context: 'Amós denuncia a hipocrisia de um culto desvinculado da caridade com os necessitados: "Corra a justiça como um rio, e a retidão como um caudaloso ribeiro" (Am 5,24).',
    keyConcept: 'Nossa comunhão com Deus é inseparável do nosso amor e solidariedade com os mais frágeis.',
    father: 'São Basílio Magno recordava: "O pão que guardas pertence ao faminto; a túnica no teu armário pertence ao nu."'
  },
  'jonas': {
    theme: 'A Universalidade da Salvação e a Misericórdia de Deus',
    context: 'Jonas revela que o amor redentor de Deus se estende a todos os povos e pré-figura os três dias de Cristo no sepulcro antes da Ressurreição.',
    keyConcept: 'Nenhum ser humano está fora do alcance da misericórdia perdoadora de Deus.',
    father: 'Santo Agostinho contemplava em Jonas o mistério da Ressurreição pascal do Redentor.'
  },
  'miquéias': {
    theme: 'O Nascimento em Belém e o Que Deus Exige de Nós',
    context: 'Miquéias profetiza o berço do Messias em Belém de Judá (Mq 5,1) e sintetiza a vida cristã: "Praticar a justiça, amar a misericórdia e caminhar humildemente com o teu Deus" (Mq 6,8).',
    keyConcept: 'A verdadeira grandeza diante de Deus consiste na humildade de coração.',
    father: 'São Leão Magno celebrava na Natividade o cumprimento exato da profecia de Miquéias.'
  },
  'habacuc': {
    theme: 'Viver da Fé e a Certeza do Triunfo de Deus',
    context: 'Habacuc proclama a máxima que sustentou os mártires: "O justo viverá da sua fé" (Hab 2,4).',
    keyConcept: 'Mesmo quando a figueira não floresce, nossa alegria repousa no Deus da nossa salvação.',
    father: 'São Paulo nas cartas aos Romanos e Gálatas fez desta verdade o eixo central da justificação pela graça.'
  },
  'zacarias': {
    theme: 'O Rei Manso que Entra em Jerusalém e a Fonte de Graça',
    context: 'Zacarias anuncia o Messias humilde montado num jumentinho (Zc 9,9) e a fonte aberta para purificar os corações.',
    keyConcept: 'Não pela força nem pela violência, mas pelo Meu Espírito, diz o Senhor dos Exércitos.',
    father: 'São João Evangelista recorda a profecia de Zacarias cumprida no Domingo de Ramos.'
  },
  'malaquias': {
    theme: 'O Sol da Justiça e o Sacrifício Puro em Todo Lugar',
    context: 'Malaquias fecha o Antigo Testamento anunciando o Sol da Justiça com a cura em seus raios (Ml 3,20) e a oblação pura perpétua (a Santa Missa) oferecida em todas as nações (Ml 1,11).',
    keyConcept: 'Na Eucaristia cumpre-se diariamente a promessa da oblação perfeita.',
    father: 'O Concílio de Trento definiu que o sacrifício puro profetizado por Malaquias é o Santo Sacrifício da Missa.'
  },

  // EVANGELHOS
  'mateus': {
    theme: 'Jesus, o Rei Messias, o Reino dos Céus e o Sermão da Montanha',
    context: 'O Evangelho de São Mateus apresenta Jesus como o Emanuel (Deus conosco), o novo Moisés que nos dá a Lei da Graça nas Bem-Aventuranças e estabelece a Sua Igreja sobre Pedro (Mt 16,18).',
    keyConcept: 'Buscai em primeiro lugar o Reino de Deus e a Sua justiça, e tudo o mais vos será acrescentado.',
    father: 'São João Crisóstomo escreveu homilias luminosas sobre Mateus, chamando as Bem-Aventuranças de escada de ouro para o Céu.'
  },
  'marcos': {
    theme: 'Jesus, o Filho de Deus e o Servo que dá a Vida em Resgate',
    context: 'São Marcos nos conduz com dinamismo ao mistério da Cruz: "O Filho do Homem não veio para ser servido, mas para servir e dar a sua vida em resgate por muitos" (Mc 10,45).',
    keyConcept: 'Seguir a Jesus exige tomar a nossa cruz diária e caminhar com fé destemida.',
    father: 'Santo Agostinho via em Marcos o evangelista que nos faz tocar o poder e a compaixão imediata de Cristo.'
  },
  'lucas': {
    theme: 'O Evangelho da Misericórdia, da Alegria, dos Pobres e de Maria',
    context: 'São Lucas destaca o amor acolhedor de Jesus pelo filho pródigo, pela ovelha perdida, o Magnificat de Maria Santíssima e a força do Espírito Santo.',
    keyConcept: 'Hoje a salvação entrou nesta casa: Jesus veio procurar e salvar o que estava perdido.',
    father: 'Santo Ambrósio compôs um dos mais belos comentários sobre Lucas, destacando o coração compassivo de Cristo.'
  },
  'joão': {
    theme: 'O Verbo Eterno Encarnado, a Luz do Mundo e a Vida Eterna',
    context: 'São João nos eleva às alturas da teologia mística: "No princípio era o Verbo... e o Verbo se fez carne e habitou entre nós" (Jo 1,1.14). Jesus é o Pão da Vida, o Bom Pastor, o Caminho, a Verdade e a Vida.',
    keyConcept: 'Quem crê em Jesus tem a vida eterna e passou da morte para a vida.',
    father: 'Santo Agostinho nos seus *Tratados sobre São João* exclamava: "Se o mar fosse tinta e o céu papel, não bastariam para descrever a grandeza do Evangelho de João."'
  },

  // ATOS DOS APÓSTOLOS
  'atos': {
    theme: 'A Força de Pentecostes e a Missão Universal da Igreja Católica',
    context: 'Atos dos Apóstolos é o Evangelho do Espírito Santo em ação na Igreja nascente: os apóstolos testemunham com coragem a Ressurreição até os confins do mundo.',
    keyConcept: 'Recebereis a força do Espírito Santo e sereis minhas testemunhas.',
    father: 'São Leão Magno ensinava que a Igreja, inflamada pelo fogo de Pentecostes, nunca cessa de renovar a face da terra.'
  },

  // CARTAS PAULINAS
  'romanos': {
    theme: 'A Justificação pela Graça, a Fé e a Vida no Espírito',
    context: 'Romanos é a obra-prima teológica de São Paulo: "Se Deus é por nós, quem será contra nós?" (Rm 8,31) e "Nada nos poderá separar do amor de Deus que está em Cristo Jesus" (Rm 8,39).',
    keyConcept: 'A graça de Deus nos liberta da culpa e nos torna filhos amados e herdeiros do Céu.',
    father: 'A leitura de Romanos 13 provocou a conversão definitiva de Santo Agostinho no jardim de Milão.'
  },
  'i coríntios': {
    theme: 'A Eucaristia, os Dons do Espírito e o Hino à Caridade',
    context: 'I Coríntios nos entrega o relato da instituição da Eucaristia (1Cor 11,23-26) e o sublime hino ao Amor (1Cor 13): "O amor é paciente, o amor é bondoso... agora permanecem a fé, a esperança e o amor; mas o maior deles é o amor."',
    keyConcept: 'A caridade é o vínculo da perfeição e o coração da Igreja.',
    father: 'Santa Teresinha do Menino Jesus descobriu sua vocação lendo 1 Coríntios 13: "No coração da Igreja, minha Mãe, eu serei o Amor!"'
  },
  'ii coríntios': {
    theme: 'A Força na Fraqueza e o Ministério da Reconciliação',
    context: 'São Paulo nos revela o segredo espiritual: "Basta-te a minha graça, pois é na fraqueza que a minha força se manifesta plenamente" (2Cor 12,9).',
    keyConcept: 'Nossas feridas e limites tornam-se o canal por onde brilha o poder de Deus.',
    father: 'São Gregório Magno ensinava que a humildade nas tribulações é a escada para a intimidade divina.'
  },
  'gálatas': {
    theme: 'A Liberdade Cristã e os Frutos do Espírito Santo',
    context: 'Gálatas nos chama a viver livres da escravidão do egoísmo: "Já não sou eu que vivo, mas é Cristo que vive em mim" (Gl 2,20).',
    keyConcept: 'O fruto do Espírito é: amor, alegria, paz, paciência, benignidade, bondade, fidelidade, mansidão e domínio próprio.',
    father: 'São Justino ensinava que a vida em Cristo é a verdadeira liberdade dos filhos de Deus.'
  },
  'efésios': {
    theme: 'A Igreja como Corpo de Cristo e a Armadura de Deus',
    context: 'Efésios revela o plano eterno do Pai de recapitular todas as coisas em Cristo e nos exorta a revestir a armadura espiritual da fé, da oração e da verdade (Ef 6,10-18).',
    keyConcept: 'Pela graça fostes salvos por meio da fé; isso não vem de vós, é dom de Deus.',
    father: 'São Tomás de Aquino escreveu um comentário sublime sobre a dignidade da Igreja como Esposa Imaculada de Cristo.'
  },
  'filipenses': {
    theme: 'A Alegria no Senhor e a Humildade de Cristo',
    context: 'Filipenses é a carta da alegria cristã: "Alegrai-vos sempre no Senhor!" (Fl 4,4) e proclama o hino da *kénosis* de Cristo (Fl 2,5-11): "Tudo posso naquele que me fortalece" (Fl 4,13).',
    keyConcept: 'A alegria cristã não depende das circunstâncias externas, mas da presença viva de Cristo na alma.',
    father: 'São João Paulo II exortava constantemente os jovens com o lema: "Tudo posso Naquele que me conforta!"'
  },
  'colossenses': {
    theme: 'A Primazia Absoluta de Cristo e a Vida Nova',
    context: 'Colossenses proclama Jesus como o Primogênito de toda a criação, Cabeça da Igreja e Princípio de tudo o que existe.',
    keyConcept: 'Buscai as coisas do alto, onde Cristo está sentado à direita de Deus.',
    father: 'São Máximo o Confessor afirmava que em Cristo todo o cosmos encontra a sua plenitude e paz.'
  },
  'i tessalonicenses': {
    theme: 'A Esperança na Vinda do Senhor e a Oração Constante',
    context: 'I Tessalonicenses nos exorta: "Orai sem cessar; em tudo dai graças, porque esta é a vontade de Deus para vós em Cristo Jesus" (1Ts 5,17-18).',
    keyConcept: 'A oração contínua mantém a lâmpada da nossa fé acesa à espera do Senhor.',
    father: 'São Teófano o Recluso ensinava que orar sem cessar é caminhar continuamente na presença amorosa de Deus.'
  },
  'ii tessalonicenses': {
    theme: 'Perseverança, Trabalho e Firmeza na Doutrina Católica',
    context: 'II Tessalonicenses nos convida à firmeza e à guarda das tradições transmitidas pela Igreja: "O Senhor da paz vos dê a paz em todo o tempo e de todas as maneiras" (2Ts 3,16).',
    keyConcept: 'Permanecei firmes e guardai os ensinamentos que vos foram transmitidos.',
    father: 'São Vicente de Lérins lembrava a importância de perseverar naquilo que foi crido por todos, em toda parte e sempre.'
  },
  'i timóteo': {
    theme: 'A Guarda do Depósito da Fé e a Oração por Todos',
    context: 'I Timóteo nos ensina que Deus quer que todos os homens sejam salvos e cheguem ao conhecimento da verdade (1Tm 2,4), e que há um só Mediador entre Deus e os homens, Jesus Cristo.',
    keyConcept: 'Combate o bom combate da fé e toma posse da vida eterna.',
    father: 'São Carlos Borromeu usava as cartas pastorais como bússola para a renovação do clero e da Igreja.'
  },
  'ii timóteo': {
    theme: 'Fidelidade até o Fim e o Testemunho Heroico',
    context: 'São Paulo, prestes a ser martirizado em Roma, declara: "Combati o bom combate, completei a corrida, guardei a fé!" (2Tm 4,7).',
    keyConcept: 'Deus não nos deu um espírito de covardia, mas de força, amor e sobriedade.',
    father: 'São Policarpo de Esmirna, diante do martírio, ecoou estas palavras: "Há oitenta e seis anos sirvo a Cristo e Ele nunca me fez mal; como poderia blasfemar contra o meu Rei que me salvou?"'
  },
  'tito': {
    theme: 'A Graça de Deus Educadora e a Prática das Boas Obras',
    context: 'Tito destaca que a graça salvadora de Deus nos educa a renunciar à impiedade e a viver no presente século com sobriedade, justiça e piedade.',
    keyConcept: 'Nossa fé católica deve resplandecer em obras de caridade e vida santa.',
    father: 'Santo Agostinho ensinava: "A fé se professa com o coração, mas se comprova pelas obras."'
  },
  'filemom': {
    theme: 'A Fraternidade Cristã e o Perdão que Transforma',
    context: 'Filemom nos comove ao mostrar São Paulo pedindo que o escravo Onésimo seja acolhido não mais como servo, mas como irmão caríssimo em Cristo.',
    keyConcept: 'Em Cristo, todos somos irmãos chamados à reconciliação e ao amor mútuo.',
    father: 'São Francisco de Assis proclamava: "Onde houver ódio, que eu leve o amor; onde houver ofensa, que eu leve o perdão."'
  },
  'hebreus': {
    theme: 'O Sacerdócio Eterno de Cristo e a Âncora da Esperança',
    context: 'A Carta aos Hebreus nos revela Jesus como o Sumo Sacerdote misericordioso e fiel que penetrou os céus e intercede perpetuamente por nós.',
    keyConcept: 'Aproximemo-nos com confiança do trono da graça para alcançarmos misericórdia e auxílio no momento oportuno (Hb 4,16).',
    father: 'São João Crisóstomo em seus sermões sobre Hebreus maravilhava-se com a eficácia eterna do Sacrifício da Cruz.'
  },

  // EPÍSTOLAS CATÓLICAS
  'tiago': {
    theme: 'A Fé Viva Demonstrada em Obras de Caridade',
    context: 'São Tiago nos ensina a coerência cristã: "A fé sem obras é morta" (Tg 2,26). A religião pura e sem mácula diante de Deus Pai é visitar os órfãos e as viúvas nas suas aflições.',
    keyConcept: 'Sede praticantes da Palavra e não apenas ouvintes.',
    father: 'São Clemente de Roma exortava os fiéis a testemunharem a fé pela santidade e caridade prática no dia a dia.'
  },
  'i pedro': {
    theme: 'Esperança Viva, Firmeza nas Provações e Sacerdócio Real',
    context: 'São Pedro nos lembra da nossa identidade sublime: "Vós sois uma raça eleita, um sacerdócio real, uma nação santa, um povo adquirido para anunciar as grandezas dAquele que vos chamou das trevas para a sua luz admirável" (1Pd 2,9).',
    keyConcept: 'Lançai sobre Ele todas as vossas preocupações, porque Ele tem cuidado de vós (1Pd 5,7).',
    father: 'São Leão Magno dizia: "Reconhece, ó cristão, a tua dignidade!"'
  },
  'ii pedro': {
    theme: 'A Participação na Natureza Divina e a Paciência do Senhor',
    context: 'II Pedro nos assegura que nos foram concedidas preciosas promessas para nos tornarmos participantes da própria natureza divina (2Pd 1,4).',
    keyConcept: 'Crescei na graça e no conhecimento de nosso Senhor e Salvador Jesus Cristo.',
    father: 'São João de Damasco explicava a doutrina católica da divinização da alma (*theosis*) através da graça dos Sacramentos.'
  },
  'i joão': {
    theme: 'Deus é Amor, Comunhão Fraterna e Certeza da Vitória',
    context: 'I João proclama a mais doce verdade da teologia cristã: "Deus é Amor: quem permanece no amor permanece em Deus e Deus nele" (1Jo 4,16).',
    keyConcept: 'O perfeito amor lança fora o medo; amemos a Deus porque Ele nos amou primeiro.',
    father: 'Santo Agostinho escreveu o célebre *Comentário à Carta de São João*: "Ama e faz o que quiseres: se calares, cala por amor; se falares, fala por amor; se corrigires, corrige por amor."'
  },
  'ii joão': {
    theme: 'Caminhar na Verdade e no Amor Mútuo',
    context: 'II João insiste na união indissolúvel entre a Verdade da fé católica e a Caridade fraterna.',
    keyConcept: 'Este é o amor: que caminhemos segundo os Seus mandamentos.',
    father: 'São Francisco de Sales dizia que a verdade sem amor se torna amarga, mas o amor na verdade constrói o Reino de Deus.'
  },
  'iii joão': {
    theme: 'Acolhimento Fraterno e Hospitalidade na Igreja',
    context: 'III João elogia a fidelidade em cooperar com a verdade através do serviço generoso e acolhedor aos irmãos.',
    keyConcept: 'Não tenho maior alegria do que ouvir que os meus filhos andam na verdade.',
    father: 'São João Crisóstomo elogiava os primeiros cristãos pelo acolhimento caloroso aos peregrinos.'
  },
  'judas': {
    theme: 'Defesa da Fé Católica e Perseverança no Amor de Deus',
    context: 'São Judas nos conclama a combater pela fé que foi confiada aos santos de uma vez para sempre, edificando-nos sobre a nossa santíssima fé.',
    keyConcept: 'Àquele que é poderoso para vos guardar de todo tropeço... seja a glória, majestade, domínio e poder.',
    father: 'São Jerônimo destacava a veemência e a fidelidade inquebrantável do apóstolo Judas Tadeu.'
  },

  // APOCALIPSE
  'apocalipse': {
    theme: 'A Vitória Definitiva de Cristo, o Cordeiro Pascal e a Nova Jerusalém',
    context: 'O Apocalipse não é um livro de medo, mas o livro da Esperança Absoluta da Igreja: Cristo, o Cordeiro Vencedor, enxugará toda lágrima dos nossos olhos, e não haverá mais morte, nem luto, nem pranto, nem dor (Ap 21,4).',
    keyConcept: 'Eis que faço novas todas as coisas! O Senhor reina para sempre e a Sua Igreja triunfará.',
    father: 'São João Maria Vianney contemplava o Céu: "Se soubéssemos o que nos espera na eternidade com Deus, nada nos faria desanimar nesta terra."'
  }
};

// 2. DETECTOR SEMÂNTICO DE TEMAS ESPIRITUAIS CATÓLICOS NO TEXTO DA PASSAGEM
function extractThematicInsights(text, bookName) {
  const clean = (text || '').toLowerCase();
  
  if (clean.includes('pai nosso') || clean.includes('orai') || clean.includes('oração') || clean.includes('oracao') || clean.includes('clamou') || clean.includes('suplic')) {
    return {
      title: 'O Poder da Oração Sincera e Filial',
      reflection: 'Esta passagem nos recorda que a <strong>oração cristã</strong> não é uma repetição vazia de palavras, mas um diálogo filial e amoroso com o Pai do Céu. Quando nos colocamos de joelhos com humildade, Deus move montanhas em nosso favor e pacifica as nossas tempestades interiores.',
      patristicQuote: 'Como ensinava Santa Teresa de Ávila: <em>"A oração é a porta de entrada para todas as graças que Deus deseja derramar sobre a nossa alma."</em>',
      actions: [
        'Reserve 10 minutos hoje em um lugar tranquilo para conversar com Deus de coração a coração.',
        'Apresente ao Senhor o nome de alguém que esteja passando por momentos difíceis na família.',
        'Reze um Pai-Nosso pausado, meditando verdadeiramente em cada uma das sete súplicas.'
      ]
    };
  }

  if (clean.includes('amor') || clean.includes('amar') || clean.includes('caridade') || clean.includes('amou') || clean.includes('ágape')) {
    return {
      title: 'O Mandamento Maior: O Amor que Tudo Transforma',
      reflection: 'O centro do Evangelho é o <strong>Amor de Deus derramado em nossos corações</strong>. Fomos criados por amor e para amar. Quem ama como Cristo amou — com doação, paciência, perdão e serviço — já experimenta o Reino de Deus presente no meio de nós.',
      patristicQuote: 'Santo Agostinho nos ensina: <em>"A medida do amor de Deus é amar sem medida; onde existe amor verdadeiro, Deus ali habita."</em>',
      actions: [
        'Tenha um gesto concreto de paciência e carinho com uma pessoa difícil do seu convívio hoje.',
        'Envie uma mensagem de apreço e gratidão a alguém que foi um instrumento de Deus na sua vida.',
        'Faça um ato de caridade discreto e anônimo em benefício de quem necessita de ajuda.'
      ]
    };
  }

  if (clean.includes('eucaristia') || clean.includes('pão') || clean.includes('pao') || clean.includes('cálice') || clean.includes('calice') || clean.includes('corpo') || clean.includes('sangue') || clean.includes('ceia') || clean.includes('comunhão') || clean.includes('comunhao')) {
    return {
      title: 'O Banquete Sagrado da Eucaristia: Presença Real de Cristo',
      reflection: 'Na Sagrada Eucaristia, Jesus não nos deixou apenas uma lembrança ou símbolo, mas <strong>o Seu próprio Corpo, Sangue, Alma e Divindade</strong>. A Santa Missa é a fonte e o ápice de toda a vida da Igreja, o maná celestial que sustenta nossa caminhada rumo à Pátria Celeste.',
      patristicQuote: 'São Tomás de Aquino proclamava no *Adoro Te Devote*: <em>"Ó Memorial da Morte do Senhor! Pão Vivo que dá vida ao homem, faz com que a minha alma viva de Ti e sinta sempre a Tua doçura."</em>',
      actions: [
        'Faça uma visita ao Santíssimo Sacramento em uma igreja ou um momento de Comunhão Espiritual fervorosa.',
        'Participe da Santa Missa com coração preparado, vivendo cada momento com reverência.',
        'Agradeça a Jesus pelo dom incomparável de se fazer alimento e remédio para as nossas almas.'
      ]
    };
  }

  if (clean.includes('cruz') || clean.includes('sofrimento') || clean.includes('calvário') || clean.includes('calvario') || clean.includes('chagas') || clean.includes('paixão') || clean.includes('paixao') || clean.includes('tribula')) {
    return {
      title: 'O Mistério da Cruz Redentora e a Força na Fraqueza',
      reflection: 'A Cruz de Nosso Senhor não é um símbolo de derrota, mas o <strong>trono glorioso da nossa vitória e salvação</strong>. Unindo as nossas dores, cansaços e cruzes cotidianas ao Sacrifício de Cristo, o sofrimento deixa de ser estéril e se transforma em manancial de bênçãos e santificação.',
      patristicQuote: 'São João Paulo II nos lembrava: <em>"A Cruz é o abraço de Deus ao mundo; não tenhais medo da Cruz, pois nela reside a nossa salvação."</em>',
      actions: [
        'Ofereça a Deus com paciência uma contrariedade ou dificuldade do seu dia em reparação.',
        'Abrace a sua cruz diária sem lamentações, confiando que o Senhor caminha ao seu lado.',
        'Reze diante de um Crucifixo, agradecendo a Jesus pelo Seu infinito amor na Paixão.'
      ]
    };
  }

  if (clean.includes('paz') || clean.includes('medo') || clean.includes('temor') || clean.includes('não temas') || clean.includes('nao temas') || clean.includes('acalma') || clean.includes('descanso') || clean.includes('tempestade')) {
    return {
      title: 'Serenidade e Paz: O Senhor Está no Controle do Barco',
      reflection: 'Em meio às tempestades da vida e à agitação do mundo, o Senhor se aproxima e nos diz com autoridade soberana: <strong>"Não temas, sou Eu! A paz vos deixo, a minha paz vos dou."</strong> A paz cristã não é a ausência de problemas, mas a certeza inabalável da presença de Cristo ao nosso lado.',
      patristicQuote: 'Santa Teresa de Jesus nos legou a célebre oração: <em>"Nada te turbe, nada te espante; tudo passa, Deus não muda. A paciência tudo alcança; quem a Deus tem, nada lhe falta: só Deus basta."</em>',
      actions: [
        'Entregue nas mãos de Deus aquela preocupação que tem tirado a sua tranquilidade.',
        'Respire fundo nos momentos de ansiedade, repetindo: "Jesus, eu confio e espero em Vós!"',
        'Seja um promotor de concórdia, mansidão e serenidade em sua casa e trabalho.'
      ]
    };
  }

  if (clean.includes('perdão') || clean.includes('perdao') || clean.includes('pecado') || clean.includes('misericórdia') || clean.includes('misericordia') || clean.includes('arrepend') || clean.includes('confiss')) {
    return {
      title: 'A Infinita Misericórdia de Deus e a Alegria do Perdão',
      reflection: 'Deus nunca se cansa de nos perdoar; nós é que às vezes nos cansamos de pedir a Sua misericórdia. O Senhor nos acolhe como o Pai misericordioso da parábola, restaurando a veste nupcial da nossa alma e cobrindo-nos com o Seu manto de graça e ternura.',
      patristicQuote: 'O Santo Cura d\'Ars, São João Maria Vianney, afirmava: <em>"A nossa miséria diante da Misericórdia Divina é como uma faísca lançada no meio de um imenso oceano."</em>',
      actions: [
        'Examine com honestidade a sua consciência e prepare-se para o Sacramento da Confissão.',
        'Perdoe de coração quem o tenha ofendido, quebrando o ciclo de rancores e mágoas.',
        'Reze o Terço da Divina Misericórdia pelas almas mais necessitadas de conversão.'
      ]
    };
  }

  if (clean.includes('fé') || clean.includes('fe') || clean.includes('crer') || clean.includes('creu') || clean.includes('acreditar') || clean.includes('confiança') || clean.includes('confianca') || clean.includes('esperança') || clean.includes('esperanca')) {
    return {
      title: 'A Fé Viva que Move Montanhas e Vence o Mundo',
      reflection: 'A <strong>fé católica</strong> é uma adesão livre e amorosa a Deus que se revela em Jesus Cristo. Ter fé não é apenas crer que Deus existe, mas confiar a própria vida inteiramente nas Suas mãos paternalíssimas, sabendo que para Ele nada é impossível.',
      patristicQuote: 'São João da Cruz ensinava: <em>"A fé é o único meio próximo e proporcionado para a união da alma com Deus."</em>',
      actions: [
        'Renove conscientemente a sua Profissão de Fé (o Credo) com devoção no início do dia.',
        'Peça ao Senhor com humildade: "Senhor, aumenta a minha fé diante das dúvidas!"',
        'Dê um testemunho corajoso e alegre da sua fé através de palavras edificantes.'
      ]
    };
  }

  if (clean.includes('maria') || clean.includes('mãe') || clean.includes('mae') || clean.includes('virgem') || clean.includes('nossa senhora') || clean.includes('senhora') || clean.includes('ave') || clean.includes('fiat') || clean.includes('magnificat')) {
    return {
      title: 'A Doce Presença e Intercessão de Nossa Senhora',
      reflection: 'A Virgem Maria é a Mãe da Igreja e a nossa Mãe espiritual, entregue por Jesus no alto da Cruz ao apóstolo João. O seu *Fiat* generoso ("Faça-se em mim segundo a Tua palavra") é o modelo perfeitíssimo de consagração e docilidade aos desígnios de Deus.',
      patristicQuote: 'São Bernardo de Claraval exclamava: <em>"Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que recorreram à vossa proteção tenha sido por vós desamparado."</em>',
      actions: [
        'Reze com devoção o Santo Terço ou uma dezena pela paz na sua família e no mundo.',
        'Consagre o seu dia, seus pensamentos e suas ações ao Imaculado Coração de Maria.',
        'Imite a caridade solicita de Nossa Senhora, servindo com prontidão a quem precisa.'
      ]
    };
  }

  if (clean.includes('espírito') || clean.includes('espirito') || clean.includes('pentecostes') || clean.includes('paráclito') || clean.includes('paraclito') || clean.includes('dons') || clean.includes('fruto')) {
    return {
      title: 'A Luz e o Fogo do Espírito Santo em Nossa Vida',
      reflection: 'O Espírito Santo é a alma da Igreja e o Doce Hóspede da nossa alma. Ele nos ilumina na oração, fortalece no bom combate espiritual, unge com os Seus sete dons e produz em nós os frutos benditos da caridade, alegria e paz.',
      patristicQuote: 'São Basílio Magno ensinava: <em>"Pelo Espírito Santo nos é dada a reconciliação com Deus, a volta ao Paraíso e a filiação divina."</em>',
      actions: [
        'Invoque o Espírito Santo antes de tomar decisões importantes: "Vinde, Espírito Santo!"',
        'Peça o dom do discernimento para escolher sempre o que agrada a Deus.',
        'Viva com docilidade interior, ouvindo as santas inspirações que o Espírito sussurra ao coração.'
      ]
    };
  }

  // Fallback temático profundo geral
  return {
    title: 'Acolher a Palavra Viva de Deus no Coração',
    reflection: 'A Sagrada Escritura é a carta de amor que o Pai Celestial enviou aos Seus filhos. Cada versículo bíblico é vivo, eficaz e penetrante, capaz de iluminar as nossas trevas, renovar as nossas esperanças e reorientar os nossos passos na senda da santidade.',
    patristicQuote: 'São Jerônimo ensinava com autoridade apostólica: <em>"Aquele que medita dia e noite na Lei do Senhor é como a árvore plantada junto às correntes de águas vivas, que no devido tempo dá o seu fruto."</em>',
    actions: [
      'Guarde uma frase desta passagem na memória para meditar ao longo do dia.',
      'Agradeça a Deus pelo dom da Sagrada Escritura e pela Santa Igreja que a custodia.',
      'Pratique a *Lectio Divina* (leitura orante) com fidelidade e perseverança.'
    ]
  };
}

// 3. GERADOR DA HOMILIA COMPLETA NATIVA E CATÓLICA
export function getDevotionalHomily(bookName, chapter, verse, text) {
  const reference = `${bookName} ${chapter}${verse && verse !== 'completo' ? ':' + verse : ''}`;
  const cleanText = (text || '').replace(/<[^>]*>?/gm, ' ').trim();
  const lowerBook = (bookName || '').toLowerCase().trim();

  // 1. Busca teologia do livro
  let bookTheology = null;
  for (const [key, val] of Object.entries(CATHOLIC_BOOK_THEOLOGY)) {
    if (lowerBook.includes(key) || key.includes(lowerBook)) {
      bookTheology = val;
      break;
    }
  }

  if (!bookTheology) {
    bookTheology = {
      theme: 'Revelação da Graça e da Aliança Divina',
      context: `Este livro da Sagrada Escritura nos insere no plano salvífico de Deus, revelando a Sua fidelidade eterna e o Seu desígnio de redenção para toda a humanidade.`,
      keyConcept: 'Deus fala pessoalmente a cada um de nós através da Sua Palavra viva.',
      father: 'Santo Agostinho lembrava que a Sagrada Escritura é o espelho onde a alma contempla a sua própria vocação à santidade.'
    };
  }

  // 2. Busca tema semântico do texto
  const themeData = extractThematicInsights(cleanText, lowerBook);

  // 3. Variações de Saudações Litúrgicas
  const GREETINGS = [
    'Amados irmãos e irmãs em Nosso Senhor Jesus Cristo,',
    'Querida família de Deus, reunida pela luz da Sagrada Escritura,',
    'Estimados irmãos em Cristo Jesus, graça e paz vos sejam dadas da parte de Deus nosso Pai,',
    'Amados paroquianos e devotos da Santa Palavra de Deus,'
  ];
  const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];

  // 4. Montagem dos Parágrafos Exegéticos e Pastorais
  const p1 = `<p style="margin-bottom: 12px; font-weight: 600; color: var(--gold-400);">${greeting}</p>`;

  const p2 = `<p style="margin-bottom: 12px; line-height: 1.65;">
    Ao abrirmos as Sagradas Letras em <strong>${reference}</strong>, o Espírito Santo nos conduz a uma profunda contemplação sobre <strong>${themeData.title}</strong>. No contexto do livro de <em>${bookName}</em>, a Tradição Católica nos ensina que ${bookTheology.context}
  </p>`;

  const p3 = `<p style="margin-bottom: 12px; line-height: 1.65;">
    ${themeData.reflection} Como afirma a Sabedoria Divina, <em>${bookTheology.keyConcept}</em> O Santo Padre e os Doutores da Igreja sempre nos exortaram a não sermos apenas ouvintes passivos, mas discípulos apaixonados que encarnam a Palavra no cotidiano da família, do trabalho e da comunidade de fé. ${themeData.patristicQuote}
  </p>`;

  const p4 = `<div style="background: rgba(212, 168, 83, 0.08); border-left: 3px solid var(--gold-400); padding: 12px 14px; border-radius: 6px; margin: 14px 0;">
    <strong style="color: var(--gold-300); display: block; margin-bottom: 8px; font-size: 13px;">
      <i class="fas fa-cross" style="margin-right: 6px;"></i> Compromissos Práticos para a sua Vida Cristã:
    </strong>
    <ul style="padding-left: 18px; margin: 0; line-height: 1.6; font-size: 13.5px; color: var(--text-primary);">
      <li style="margin-bottom: 6px;">${themeData.actions[0]}</li>
      <li style="margin-bottom: 6px;">${themeData.actions[1]}</li>
      <li>${themeData.actions[2]}</li>
    </ul>
  </div>`;

  const p5 = `<p style="margin-top: 14px; margin-bottom: 6px; font-style: italic; color: var(--gold-300); text-align: center; line-height: 1.5;">
    ✝ <strong>Oração e Bênção Sacerdotal:</strong><br>
    "Senhor Jesus Cristo, Verbo Eterno do Pai, gravai esta Vossa Palavra em nossos corações. Dai-nos a graça de viver na Vossa santa paz e de sermos testemunhas radiantes do Vosso amor. Que a bênção de Deus Todo-Poderoso, Pai, Filho ✝ e Espírito Santo, desça sobre vós, vossa família e permaneça para sempre. Amém!"
  </p>`;

  const html = [p1, p2, p3, p4, p5].join('');

  // Texto limpo para síntese de voz (TTS)
  const textToSpeak = [
    greeting,
    `Ao meditarmos na Sagrada Escritura em ${reference}, a Palavra de Deus nos ilumina sobre ${themeData.title}.`,
    `No livro de ${bookName}, a Igreja nos ensina que ${bookTheology.context}`,
    themeData.reflection.replace(/<[^>]*>?/gm, ''),
    bookTheology.keyConcept,
    themeData.patristicQuote.replace(/<[^>]*>?/gm, ''),
    `Como aplicar esta Palavra no seu dia a dia:`,
    `Primeiro: ${themeData.actions[0]}`,
    `Segundo: ${themeData.actions[1]}`,
    `Terceiro: ${themeData.actions[2]}`,
    `Que a bênção de Deus Todo-Poderoso, Pai, Filho e Espírito Santo, desça sobre você e sua família e permaneça para sempre. Amém!`
  ].join('\n\n');

  return {
    reference,
    textExcerpt: cleanText,
    themeTitle: themeData.title,
    html: html,
    textToSpeak
  };
}
