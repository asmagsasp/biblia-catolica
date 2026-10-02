/**
 * novenasService.js - Novenas Tradicionais da Santa Igreja Católica
 * Bíblia Sagrada Católica (Edição Ave Maria)
 */
import { Preferences } from '@capacitor/preferences';

export const NOVENAS_LIST = [
  {
    id: 'desatadora_dos_nos',
    titulo: 'Nossa Senhora Desatadora dos Nós',
    padroeiro: 'Santíssima Virgem Maria',
    subtitulo: 'Para desatar os nós da vida, da família, saúde, causas difíceis e espirituais',
    icone: 'fa-hands-holding-circle',
    cor: '#38bdf8',
    oracaoInicial: `Em nome do Pai, do Filho e do Espírito Santo. Amém.\n\nÓ Virgem Maria, Mãe do belo amor, Mãe que nunca recusa socorrer a um filho que clama por ajuda, Mãe cujas mãos não cessam de servir seus amados filhos, derramai sobre mim o vosso olhar de misericórdia e vede o emaranhado de nós que sufoca a minha vida. Vós sabeis o meu desespero e a minha dor. Vós sabeis quanto esses nós me paralisam. Maria, Mãe que Deus encarregou de desatar os nós da vida de Seus filhos, confio hoje a fita da minha vida em vossas santas mãos.`,
    oracaoFinal: `Maria, Desatadora dos Nós, rogai por mim.\n\nÓ Maria, com vosso poder maternal junto ao Vosso Divino Filho Jesus, desatai este nó que vos apresento em minha oração. Por vossa graça, vossa intercessão e vosso exemplo, livrai-nos de todo o mal e desatai os nós que nos impedem de nos unir a Deus. Amém.\n\n(Rezar 1 Pai-Nosso, 1 Ave-Maria e 1 Glória ao Pai)`,
    oracaoAcaoDeGracas: `Ó Mãe Santíssima, com o coração repleto de júbilo e gratidão, concluo estes 9 dias de oração filial aos vossos pés. Creio firmemente que pelas vossas mãos maternais este nó já foi desfeito no Céu e a graça de Deus está operando em meu favor. Guardai-me sempre sob o vosso manto sagrado. Amém!`,
    dias: [
      {
        dia: 1,
        tema: 'Acolhimento da Graça e Confiança Materna',
        reflexao: 'Santa Maria, Mãe amada, acolhei a minha súplica humilde. Apresento-vos os nós que me impedem de viver na plena paz de Cristo.',
        oracao: 'Santa Maria, cheia da presença de Deus, durante os dias de vossa vida aceitastes com grande humildade a santa vontade do Pai. Desatai, ó Mãe amorosa, o nó da dúvida e do desespero em meu coração.',
        jaculatoria: 'Nossa Senhora Desatadora dos Nós, rogai por nós!'
      },
      {
        dia: 2,
        tema: 'Libertação das Amarras do Medo e da Insegurança',
        reflexao: 'O medo paralisa a nossa fé. Maria nos convida a lançar todas as nossas preocupações no Sagrado Coração de Jesus.',
        oracao: 'Maria, Mãe querida, canal de todas as graças, volto meu coração para vós. Sei que sois generosa com aqueles que vos buscam. Desatai o nó do medo, da ansiedade e da incerteza que me aflige.',
        jaculatoria: 'Maria, Mãe de Misericórdia, desatai os nós da minha vida!'
      },
      {
        dia: 3,
        tema: 'Cura das Feridas Familiares e Relacionamentos',
        reflexao: 'Na Sagrada Família de Nazaré, o amor e a paciência triunfaram sobre todas as adversidades. Entreguemos nossa família a Maria.',
        oracao: 'Mãe Medianeira, Rainha do Céu, cujas mãos partilham os tesouros do Rei, volvei vossos olhos compassivos para a minha família. Desatai todo nó de discórdia, mágoa, ressentimento ou divisão.',
        jaculatoria: 'Nossa Senhora, Rainha da Paz e da Família, rogai por nós!'
      },
      {
        dia: 4,
        tema: 'Perdão Sincero e Purificação do Coração',
        reflexao: 'O perdão é a chave que abre as portas do Céu e desata os nós mais apertados da nossa alma.',
        oracao: 'Santa Mãe de Deus e nossa Mãe, ensinai-me a perdoar de coração a todos aqueles que me ofenderam, assim como Jesus perdoou na Cruz. Desatai todo nó de rancor e amargura.',
        jaculatoria: 'Coração Imaculado de Maria, sede a nossa salvação!'
      },
      {
        dia: 5,
        tema: 'Providência nas Dificuldades Financeiras e de Trabalho',
        reflexao: 'Em Caná da Galileia, Maria percebeu a necessidade dos noivos e antecipou o milagre de Jesus. Ela cuida do nosso pão diário.',
        oracao: 'Mãe bondosa e solícita, apresentai a Jesus as minhas necessidades materiais, meu trabalho e as dívidas que me angustiam. Desatai os nós da escassez e abri caminhos de providência santa.',
        jaculatoria: 'Nossa Senhora da Providência, providenciai o que nos falta!'
      },
      {
        dia: 6,
        tema: 'Saúde do Corpo e da Alma',
        reflexao: 'Jesus passou pelo mundo curando todas as enfermidades. Maria esteve de pé junto à Cruz consolando os aflitos.',
        oracao: 'Ó Mãe Consoladora dos Aflitos e Saúde dos Enfermos, coloco em vossas mãos a minha saúde física, mental e espiritual. Desatai todo nó de doença, cansaço ou enfermidade.',
        jaculatoria: 'Nossa Senhora da Saúde, rogai por nós e por nossos enfermos!'
      },
      {
        dia: 7,
        tema: 'Proteção contra as Ciladas do Inimigo',
        reflexao: 'Maria esmaga a cabeça da serpente infernal com sua pureza e obediência incondicional a Deus.',
        oracao: 'Virgem Puríssima, Mãe invencível na batalha espiritual, defendei-me das tentações, do desânimo e de todo mal oculto. Desatai qualquer nó de opressão espiritual em minha vida.',
        jaculatoria: 'Virgem Poderosa, refúgio dos pecadores, protegei-nos sempre!'
      },
      {
        dia: 8,
        tema: 'Fortalecimento da Fé e Perseverança na Oração',
        reflexao: 'Perseverar na oração diária é o segredo dos santos para alcançar as maiores vitórias no Céu.',
        oracao: 'Mãe admirável, dai-me um coração constante e fiel à Santa Igreja e aos Sacramentos. Desatai o nó da tibieza espiritual e fazei arder em mim a chama da caridade divina.',
        jaculatoria: 'Mãe do Bom Conselho, guiai todos os meus passos!'
      },
      {
        dia: 9,
        tema: 'Vitória da Graça, Gratidão e Consagração',
        reflexao: 'Chegamos ao nono dia contemplando a fita de nossa vida inteiramente desatada e restaurada pela graça de Deus.',
        oracao: 'Santíssima Virgem Maria, Desatadora dos Nós, bendita sois vós entre todas as mulheres! Recebei hoje minha consagração total. Creio no milagre que o Vosso Filho operou por vossa intercessão.',
        jaculatoria: 'Glória ao Pai, ao Filho e ao Espírito Santo. Amém!'
      }
    ]
  },
  {
    id: 'sao_bento',
    titulo: 'São Bento de Núrsia',
    padroeiro: 'Patriarca dos Monges do Ocidente',
    subtitulo: 'Para proteção contra todo mal, inveja, ciladas do inimigo e fortalecimento da paz',
    icone: 'fa-shield-halved',
    cor: '#a855f7',
    oracaoInicial: `Em nome do Pai, do Filho e do Espírito Santo. Amém.\n\nÓ glorioso Patriarca São Bento, que fostes elevado por Deus para ser mestre de vida espiritual e escudo impenetrável contra as ciladas do demônio, nós vos suplicamos: olhai com benevolência para nós que imploramos vosso valioso patrocínio. Com vossa santa Cruz, afastai de nossa vida, de nossos lares e de nosso trabalho toda influência maligna, toda praga, feitiçaria, inveja e discórdia.`,
    oracaoFinal: `A Cruz Sagrada seja a minha luz, não seja o dragão meu guia. Retira-te, satanás! Nunca me aconselhes coisas vãs; é mau o que tu me ofereces, bebe tu mesmo o teu veneno!\n\nSão Bento, rogai por nós para que sejamos dignos das promessas de Cristo. Amém.\n\n(Rezar 1 Pai-Nosso, 1 Ave-Maria e 1 Glória ao Pai)`,
    oracaoAcaoDeGracas: `Glorioso São Bento, com o coração agradecido celebro o encerramento desta novena em vossa honra. Confiante em vosso socorro celeste, levarei a paz de Cristo onde houver discórdia e viverei sob o escudo protetor da Santa Cruz. Amém!`,
    dias: [
      {
        dia: 1,
        tema: 'A Cruz Sagrada como Guia e Fortaleza',
        reflexao: 'A Cruz de Cristo não é sinal de derrota, mas a árvore da vida onde o mal foi vencido para sempre.',
        oracao: 'Glorioso São Bento, que colocastes a Santa Cruz no centro de toda a vossa vida e operastes por meio dela milagres admiráveis, alcançai-nos um amor ardente por Cristo Crucificado.',
        jaculatoria: 'São Bento abençoado, protegei-nos com a Santa Cruz!'
      },
      {
        dia: 2,
        tema: 'A Oração Fiel e o Silêncio da Alma (Ora et Labora)',
        reflexao: 'A oração contínua aliada ao trabalho santificado constrói o templo de Deus em nosso interior.',
        oracao: 'São Bento, mestre da oração interior e do trabalho santificado, ensinai-nos a colocar Deus em primeiro lugar em todos os nossos afazeres cotidianos.',
        jaculatoria: 'São Bento, ensinai-nos a orar e trabalhar para a glória de Deus!'
      },
      {
        dia: 3,
        tema: 'Libertação de Invejas, Maldições e Venenos Espirituais',
        reflexao: 'Pela bênção do sinal da Cruz, o cálice com veneno quebrado revelou o poder de Deus guardando o Seu servo Bento.',
        oracao: 'São Bento, que quebrastes o cálice envenenado com o sinal da Cruz, quebrai em nossa vida todo veneno da inveja, da calúnia, do mau-olhado e de palavras maliciosas.',
        jaculatoria: 'Pelo sinal da Santa Cruz, livrai-nos, Deus Nosso Senhor, dos nossos inimigos!'
      },
      {
        dia: 4,
        tema: 'Vitória contra as Tentações da Carne e do Mundo',
        reflexao: 'Na caverna de Subiaco, São Bento lançou-se nos espinhos para vencer a tentação, mantendo sua pureza imaculada.',
        oracao: 'Castíssimo Pai São Bento, alcançai-nos a pureza de mente, corpo e coração. Dai-nos força para repudiar imediatamente toda tentação que nos afaste da graça santificante.',
        jaculatoria: 'São Bento, modelo de pureza e santidade, rogai por nós!'
      },
      {
        dia: 5,
        tema: 'Paz nos Lares e Harmonia entre os Irmãos',
        reflexao: 'A Regra de São Bento tem como lema a palavra "PAX". Onde reina a paz de Deus, o inimigo não tem morada.',
        oracao: 'Arauto da Paz, São Bento, entrai em nossa casa e expulsai toda contenda, agressividade e desunião. Fazei reinar no seio de nossa família a caridade e a mansidão cristã.',
        jaculatoria: 'Paz de Cristo, reinai em nosso lar e em nossos corações!'
      },
      {
        dia: 6,
        tema: 'Proteção nos Caminhos, Viagens e Negócios',
        reflexao: 'Os anjos do Senhor acampam ao redor dos que O temem para livrá-los de todo perigo.',
        oracao: 'Protetor infalível, São Bento, guardai os nossos passos ao sair e ao entrar. Livrai-nos de assaltos, acidentes, emboscadas e de pessoas de má índole.',
        jaculatoria: 'São Bento, sede nosso escudo protetor em todos os caminhos!'
      },
      {
        dia: 7,
        tema: 'Fortaleza nos Momentos de Doença e Tribulação',
        reflexao: 'Nas horas mais escuras do sofrimento, a fé em Deus é a rocha inabalável que sustenta a alma.',
        oracao: 'Misericordioso São Bento, consolai os doentes, os aflitos e os que sofrem dores físicas ou espirituais. Concedei-nos a paciência e a cura segundo a vontade do Altíssimo.',
        jaculatoria: 'São Bento, auxílio dos enfermos e aflitos, rogai por nós!'
      },
      {
        dia: 8,
        tema: 'Zelo pela Santa Igreja e Fidelidade à Fé Católica',
        reflexao: 'A Santa Igreja é a barca inabalável que nos conduz às praias da vida eterna.',
        oracao: 'Grande Patriarca da Cristandade, guardai o Santo Padre, os bispos e sacerdotes. Firmai a nossa fé católica contra as ilusões e falsas doutrinas do mundo.',
        jaculatoria: 'São Bento, coluna da Igreja Católica, rogai por nós!'
      },
      {
        dia: 9,
        tema: 'A Graça da Boa Morte e a Glória Eterna',
        reflexao: 'São Bento partiu desta vida de pé, no oratório de Monte Cassino, sustentado pelos braços dos seus monges em oração.',
        oracao: 'Glorioso São Bento, assim como morrestes de pé louvando a Deus no altar, alcançai-nos a graça de perseverar na fé até o último suspiro e sermos acolhidos nos Céus.',
        jaculatoria: 'A Cruz Sagrada seja a minha luz para todo o sempre. Amém!'
      }
    ]
  },
  {
    id: 'sao_miguel_arcanjo',
    titulo: 'São Miguel Arcanjo',
    padroeiro: 'Príncipe da Milícia Celeste',
    subtitulo: 'Para combate espiritual, defesa da família, vitória sobre as forças das trevas e coragem',
    icone: 'fa-shield-halved',
    cor: '#ef4444',
    oracaoInicial: `Em nome do Pai, do Filho e do Espírito Santo. Amém.\n\nSão Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos, e vós, Príncipe da Milícia Celeste, pela virtude divina, precipitai no inferno a satanás e a todos os espíritos malignos que andam pelo mundo para perder as almas. Amém.`,
    oracaoFinal: `Glorioso São Miguel Arcanjo, com vossa espada de fogo e vosso escudo da verdade, protegei-nos de todo perigo e cobri nossa família sob vossas asas celestes. Quem como Deus? Ninguém como Deus!\n\n(Rezar 1 Pai-Nosso, 1 Ave-Maria e 1 Glória ao Pai)`,
    oracaoAcaoDeGracas: `São Miguel Arcanjo, agradeço-vos por terdes combatido ao meu lado durante esta santa novena. Na certeza da vitória de Deus sobre toda treva, consagro a vós minha vida, meus passos e meu coração. Quem como Deus! Amém!`,
    dias: [
      {
        dia: 1,
        tema: 'O Clamor Sagrado: Quem como Deus?',
        reflexao: 'Diante do orgulho de Lúcifer, São Miguel levantou a bandeira da humildade e da soberania absoluta de Deus.',
        oracao: 'Ó glorioso São Miguel Arcanjo, primeiro defensor da realeza de Cristo, ensinai-nos a adorar a Deus em espírito e verdade, expulsando todo orgulho de nossa alma.',
        jaculatoria: 'Quem como Deus? Ninguém como Deus!'
      },
      {
        dia: 2,
        tema: 'Defesa contra as Opressões e Angústias',
        reflexao: 'Nos momentos de angústia espiritual, o Arcanjo Miguel é o enviado do Altíssimo para quebrar as correntes do medo.',
        oracao: 'Príncipe da Paz Celeste, dissipai as nuvens do desespero e da ansiedade em meu coração. Que a vossa presença me traga a serenidade dos filhos de Deus.',
        jaculatoria: 'São Miguel Arcanjo, guardião da minha alma, defendei-me!'
      },
      {
        dia: 3,
        tema: 'Proteção de Nossos Lares e Filhos',
        reflexao: 'O Arcanjo Miguel é o guardião das famílias cristãs e dos lares consagrados ao Sangue de Jesus.',
        oracao: 'São Miguel Arcanjo, colocai vossos anjos de sentinela às portas da minha casa. Que nenhum mal ou influência inimiga consiga ultrapassar o limiar de nosso lar.',
        jaculatoria: 'São Miguel Arcanjo, protegei nossos lares e nossas famílias!'
      },
      {
        dia: 4,
        tema: 'Vitória nas Batalhas do Trabalho e da Justiça',
        reflexao: 'A espada de São Miguel corta as amarras da injustiça, da falsidade e das perseguições no ambiente de trabalho.',
        oracao: 'Guardião da Justiça Divina, abri caminhos justos e honrados em minha vida profissional e financeira. Defendei-me dos que maquinam o mal contra mim.',
        jaculatoria: 'Com a força de Deus e o socorro de São Miguel, somos mais que vencedores!'
      },
      {
        dia: 5,
        tema: 'Cura das Feridas do Pecado e Conversão',
        reflexao: 'O Arcanjo Miguel nos conduz aos Sacramentos da Confissão e da Eucaristia para a purificação total da alma.',
        oracao: 'São Miguel, ajudai-me a detestar o pecado e a buscar com sincero arrependimento o perdão de Deus no Sacramento da Confissão.',
        jaculatoria: 'São Miguel Arcanjo, inflamai meu coração no amor de Deus!'
      },
      {
        dia: 6,
        tema: 'Libertação de Vícios e Más Inclinações',
        reflexao: 'Nenhuma corrente é forte demais para o poder do Sangue do Cordeiro e o braço forte do Arcanjo Miguel.',
        oracao: 'Guerreiro Invencível de Cristo, cortai os laços de todo vício, dependência, mágoa ou hábito que escraviza a minha liberdade cristã.',
        jaculatoria: 'Pelo Sangue de Jesus, quebrai todas as correntes do mal!'
      },
      {
        dia: 7,
        tema: 'Defesa da Santa Igreja e dos Sacerdotes',
        reflexao: 'São Miguel é o protetor supremo da Igreja Católica, povo de Deus resgatado na Cruz.',
        oracao: 'Defensor do Povo de Deus, sustentai os nossos sacerdotes, o Santo Padre e todos os consagrados na fidelidade inabalável ao Evangelho.',
        jaculatoria: 'São Miguel Arcanjo, protegei a Santa Igreja Católica!'
      },
      {
        dia: 8,
        tema: 'Companhia dos Santos Anjos da Guarda',
        reflexao: 'Os nove coros dos Santos Anjos louvam a Deus sem cessar e nos acompanham dia e noite.',
        oracao: 'Príncipe dos Anjos, uni as minhas humildes preces ao coro celeste de Serafins, Querubins e Arcanjos para maior glória de Deus Pai.',
        jaculatoria: 'Santos Anjos e Arcanjos de Deus, rogai por nós!'
      },
      {
        dia: 9,
        tema: 'A Coroa da Vitória e a Glória Eterna',
        reflexao: 'Combati o bom combate, terminei a corrida, guardei a fé! Nos Céus nos espera a coroa da justiça.',
        oracao: 'Glorioso Arcanjo São Miguel, quando chegar a minha última hora nesta terra, sede o meu advogado e guiai minha alma até o abraço eterno da Santíssima Trindade.',
        jaculatoria: 'São Miguel Arcanjo, triunfai em nós e conosco por toda a eternidade. Amém!'
      }
    ]
  },
  {
    id: 'santa_teresinha',
    titulo: 'Santa Teresinha do Menino Jesus',
    padroeiro: 'Doutora da Igreja e Padroeira das Missões',
    subtitulo: 'A Novena das Rosas para alcançar graças impossíveis pela Pequena Via do Amor e Confiança',
    icone: 'fa-clover',
    cor: '#ec4899',
    oracaoInicial: `Em nome do Pai, do Filho e do Espírito Santo. Amém.\n\nSantíssima Trindade, Pai, Filho e Espírito Santo, eu Vos agradeço por todas as graças e dons com que enriquecestes a alma de Vossa serva Santa Teresinha do Menino Jesus e da Sagrada Face durante os seus vinte e quatro anos na terra. E, pelos méritos de tão querida Santinha, concedei-me a graça que ardentemente Vos peço nesta novena, se for para maior glória Vossa e bem de minha alma.`,
    oracaoFinal: `Santa Teresinha do Menino Jesus, que prometestes fazer cair uma chuva de rosas sobre a terra, olhai para mim com ternura e alcançai-me de Jesus a rosa da graça que tanto necessito.\n\nSanta Teresinha do Menino Jesus, rogai por nós!\n\n(Rezar 24 Glórias ao Pai em honra dos 24 anos de vida de Santa Teresinha na terra, ou 1 Pai-Nosso, 1 Ave-Maria e 1 Glória)`,
    oracaoAcaoDeGracas: `Ó Santa Teresinha, minha doce intercessora, com o coração agradecido e cheio de confiança filial termino esta novena das rosas. Sei que vossa promessa não falha e que vossa chuva de bênçãos já está se derramando sobre mim e sobre minha família. Amém!`,
    dias: [
      {
        dia: 1,
        tema: 'A Pequena Via da Confiança e do Abandono',
        reflexao: 'A santidade não consiste nesta ou naquela prática, mas numa disposição do coração que nos torna humildes e pequenos nas mãos de Deus.',
        oracao: 'Santa Teresinha, ensinai-me a ser pequenino e a confiar cegamente no amor misericordioso do Pai Celeste em todas as circunstâncias.',
        jaculatoria: 'Santa Teresinha, derramai sobre nós vossa chuva de rosas!'
      },
      {
        dia: 2,
        tema: 'O Amor como Vocação Suprema no Coração da Igreja',
        reflexao: '"No coração da Igreja, minha Mãe, eu serei o Amor! Assim serei tudo e meu sonho será realizado!"',
        oracao: 'Querida Santinha, acendei em minha alma o fogo da caridade divina, para que todas as minhas ações sejam motivadas pelo amor a Deus e ao próximo.',
        jaculatoria: 'No coração da Igreja, ó Jesus, eu serei o amor!'
      },
      {
        dia: 3,
        tema: 'Oferecimento dos Pequenos Sacrifícios com Sorriso',
        reflexao: 'Apanhar um alfinete por amor a Deus pode converter uma alma. O valor das nossas obras está na intensidade do amor com que são feitas.',
        oracao: 'Santa Teresinha, dai-me a generosidade de suportar as pequenas contrariedades do dia a dia com paciência, mansidão e alegria interior.',
        jaculatoria: 'Jesus, manso e humilde de coração, fazei o meu coração semelhante ao vosso!'
      },
      {
        dia: 4,
        tema: 'Confiança Inabalável na Misericórdia Divina',
        reflexao: '"Mesmo que eu tivesse na minha consciência todos os crimes que se podem cometer, iria com o coração quebrado de arrependimento lançar-me nos braços de Jesus."',
        oracao: 'Ó doce Teresinha, arrancai do meu coração todo medo servil e fazei-me correr com audácia para os braços do Salvador misericordioso.',
        jaculatoria: 'Santa Teresinha, mestra da confiança filial, rogai por nós!'
      },
      {
        dia: 5,
        tema: 'Oração pelos Sacerdotes e pelas Missões',
        reflexao: 'Do Carmelo de Lisieux, Santa Teresinha abraçou o mundo inteiro, sustentando com suas orações os missionários e sacerdotes.',
        oracao: 'Padroeira das Missões, abençoai todos os sacerdotes, missionários e pregadores do Evangelho. Fazei de mim também um apóstolo pelo fervor da minha oração.',
        jaculatoria: 'Santa Teresinha, protegei os sacerdotes e missionários da Igreja!'
      },
      {
        dia: 6,
        tema: 'Paz no Sofrimento e na Noite Escura da Fé',
        reflexao: 'Nos últimos meses de vida, Teresinha experimentou dores terríveis e a provação da fé, mas manteve o olhar fixo no Céu.',
        oracao: 'Amada Doutora da Igreja, quando as dores, a tristeza ou a enfermidade baterem à minha porta, sustentai a minha esperança nas promessas eternas de Cristo.',
        jaculatoria: 'Tudo é graça quando acolhido com amor nas mãos de Deus!'
      },
      {
        dia: 7,
        tema: 'Amor Filial e Ternura à Santíssima Virgem Maria',
        reflexao: '"Ela é mais Mãe do que Rainha!" Contemplar Maria enchia o coração de Teresinha de santa consolação.',
        oracao: 'Santa Teresinha, que fostes curada na infância pelo doce sorriso da Virgem Maria, ensinai-me a amar e honrar Nossa Senhora como mãe carinhosa.',
        jaculatoria: 'Ó Maria, Mãe de Jesus e nossa Mãe, sorri para nós!'
      },
      {
        dia: 8,
        tema: 'A Promessa de Passar o Céu Fazendo o Bem na Terra',
        reflexao: '"Quero passar o meu Céu fazendo o bem sobre a terra. Não posso ser feliz descansando enquanto houver almas a salvar."',
        oracao: 'Ó bondosa Teresinha, lembrai-vos da vossa promessa e fazei descer hoje sobre minha vida as rosas da cura, da reconciliação e da graça que vos suplico.',
        jaculatoria: 'Santa Teresinha, fazei cair sobre nós a vossa chuva de rosas!'
      },
      {
        dia: 9,
        tema: 'Alegria da Pátria Celeste e Vitória da Fé',
        reflexao: '"Eu não morro, entro na vida!" Ao findar da nossa peregrinação terrena, contemplaremos a Face do nosso Deus.',
        oracao: 'Santa Teresinha do Menino Jesus e da Sagrada Face, recebei minha eterna gratidão por estes 9 dias de intimidade e oração. Intercedei por mim até que nos encontremos no Céu.',
        jaculatoria: 'Meu Deus, eu Vos amo! Amém!'
      }
    ]
  },
  {
    id: 'sao_jose',
    titulo: 'São José Operário e Esposo da Virgem',
    padroeiro: 'Patrono da Igreja Universal e das Famílias',
    subtitulo: 'Para alcançar trabalho, providência, proteção familiar, habitação e causas urgentes',
    icone: 'fa-hammer',
    cor: '#eab308',
    oracaoInicial: `Em nome do Pai, do Filho e do Espírito Santo. Amém.\n\nÓ glorioso São José, pai nutrício de Jesus e castíssimo esposo da Virgem Maria, a quem o Pai Eterno confiou a custódia dos seus maiores tesouros, recorremos a vós com filial confiança. Vós que fostes o protetor silencioso e fiel da Sagrada Família de Nazaré, acolhei a nossa súplica e apresentai nossas necessidades diante do Trono de Deus.`,
    oracaoFinal: `Lembrai-vos, ó puríssimo Esposo da Virgem Maria, que nunca se ouviu dizer que algum daqueles que recorreram à vossa proteção e imploraram o vosso socorro tenha ficado sem alívio. Com esta confiança venho à vossa presença. Não desprezeis as minhas súplicas, ó pai adotivo do Redentor, mas acolhei-as com bondade. Amém.\n\nSão José, terror dos demônios e protetor das famílias, rogai por nós!\n\n(Rezar 1 Pai-Nosso, 1 Ave-Maria e 1 Glória ao Pai)`,
    oracaoAcaoDeGracas: `São José bendito, pai amável e protetor poderoso, encerro com júbilo esta novena consagrando a vós o meu trabalho, minha casa e todos os meus entes queridos. Confiando na vossa providência, caminho na paz de Cristo. Amém!`,
    dias: [
      {
        dia: 1,
        tema: 'São José, o Homem Justo e Silencioso',
        reflexao: 'A Sagrada Escritura chama José de "Justo". Seu silêncio foi o solo sagrado onde a Palavra de Deus frutificou.',
        oracao: 'São José Justo e Santo, ensinai-me a silenciar o tumulto das minhas palavras para escutar a voz suave de Deus em meu coração.',
        jaculatoria: 'São José Justo e Fiel, rogai por nós!'
      },
      {
        dia: 2,
        tema: 'Esposo Castíssimo da Mãe de Deus',
        reflexao: 'São José guardou a virgindade e a santidade de Maria com respeito e ternura incomparáveis.',
        oracao: 'São José, protetor da Virgem Imaculada, protegei a dignidade do matrimônio e a pureza de todos os lares cristãos.',
        jaculatoria: 'São José, esposo casto de Maria, guardai nossas famílias!'
      },
      {
        dia: 3,
        tema: 'Pai Nutrício e Protetor do Menino Jesus',
        reflexao: 'Segurar nos braços o Criador do Universo: que honra e que responsabilidade viveu São José com Jesus!',
        oracao: 'São José, pai carinhoso do Menino Deus, acolhei sob vossa proteção os nossos filhos e jovens, livrando-os de todo perigo espiritual e temporal.',
        jaculatoria: 'São José, pai adotivo de Jesus, abençoai nossos filhos!'
      },
      {
        dia: 4,
        tema: 'A Obediência Pronta e a Fuga para o Egito',
        reflexao: 'No meio da noite, ao aviso do Anjo, José levantou-se e partiu para salvar o Menino das garras de Herodes.',
        oracao: 'São José obediente, dai-me prontidão para fazer a vontade de Deus mesmo quando os planos humanos parecerem desmoronar.',
        jaculatoria: 'São José, obediente aos desígnios do Pai, rogai por nós!'
      },
      {
        dia: 5,
        tema: 'O Trabalho Digno e a Providência no Lar',
        reflexao: 'Na carpintaria de Nazaré, o trabalho manual foi santificado pelo suor de José e pelas mãos de Jesus.',
        oracao: 'São José Operário, olhai para os que buscam emprego, dignidade e sustento para suas famílias. Abençoai o nosso pão de cada dia.',
        jaculatoria: 'São José Operário, abençoai o nosso trabalho!'
      },
      {
        dia: 6,
        tema: 'Mestre da Vida Interior e da Humildade',
        reflexao: 'A maior santidade da história oculta na simplicidade de uma pequena oficina em Nazaré.',
        oracao: 'São José humilde, curai-me do veneno da vaidade e do desejo de reconhecimento mundano. Fazei-me amar o que é oculto aos olhos do mundo e precioso aos olhos de Deus.',
        jaculatoria: 'São José, mestre da humildade, rogai por nós!'
      },
      {
        dia: 7,
        tema: 'Terror dos Demônios e Escudo contra as Trevas',
        reflexao: 'A pureza e a autoridade paterna de São José fazem tremer todos os espíritos infernais.',
        oracao: 'São José, terror dos demônios, expulsai da minha vida e da minha casa qualquer armadilha ou perturbação das forças do mal.',
        jaculatoria: 'São José, terror dos demônios, defendei-nos no combate!'
      },
      {
        dia: 8,
        tema: 'Patrono da Santa Igreja Católica Universal',
        reflexao: 'Aquele que guardou a Sagrada Família guarda hoje a Igreja de Cristo em todo o mundo.',
        oracao: 'Guardião da Igreja Universal, protegei os nossos bispos e padres, e concedei a toda a Igreja a fidelidade incondicional à Verdade.',
        jaculatoria: 'São José, patrono da Santa Igreja, protegei o povo de Deus!'
      },
      {
        dia: 9,
        tema: 'Padroeiro da Boa Morte e Entrada no Reino',
        reflexao: 'São José partiu desta vida expirando suavemente nos braços de Jesus e de Maria.',
        oracao: 'São José, padroeiro da boa morte, assisti-nos em nossas horas mais difíceis e alcançai-nos a graça de partir desta vida em paz com Deus.',
        jaculatoria: 'Jesus, Maria e José, em vossas mãos entrego a minha alma. Amém!'
      }
    ]
  },
  {
    id: 'sagrado_coracao',
    titulo: 'Sagrado Coração de Jesus',
    padroeiro: 'Nosso Senhor Jesus Cristo',
    subtitulo: 'Para cura interior, paz nos corações, consolo nas dores, reconciliação e bênção sobre o lar',
    icone: 'fa-heart',
    cor: '#dc2626',
    oracaoInicial: `Em nome do Pai, do Filho e do Espírito Santo. Amém.\n\nÓ Coração Sacratíssimo de Jesus, fornalha ardente de caridade, abismo de todas as virtudes, fonte inesgotável de paz e misericórdia, venho a Vós com o coração repleto de confiança. Vós que prometestes a Santa Margarida Maria Alacoque derramar bênçãos abundantes sobre as famílias e pessoas que honrarem o Vosso Divino Coração, acolhei a minha prece.`,
    oracaoFinal: `Sagrado Coração de Jesus, manso e humilde de coração, fazei o meu coração semelhante ao vosso!\n\nSagrado Coração de Jesus, eu confio em Vós!\n\n(Rezar 1 Pai-Nosso, 1 Ave-Maria e 1 Glória ao Pai)`,
    oracaoAcaoDeGracas: `Coração Divino de Jesus, fonte de vida e santidade, Vos dou infinitas graças por estes 9 dias de comunhão e oração. Consagro a Vós o meu coração, minha família e meu futuro. Reinai para sempre em meu ser! Amém!`,
    dias: [
      {
        dia: 1,
        tema: 'Eis o Coração que tanto amou a humanidade',
        reflexao: 'Jesus nos mostra Seu Coração traspassado na Cruz, derramando Sangue e Água pela nossa salvação.',
        oracao: 'Ó Jesus, que nos destes o Vosso Coração ferido de amor, perdoai as nossas ingratidões e fazei-nos responder com amor ao Vosso imenso amor.',
        jaculatoria: 'Sagrado Coração de Jesus, eu confio em Vós!'
      },
      {
        dia: 2,
        tema: 'Refúgio Seguro nas Tribulações e Aflições',
        reflexao: '"Vinde a mim, vós todos que estais cansados e sobrecarregados, e eu vos aliviarei."',
        oracao: 'Doce Jesus, abrigo seguro nas tempestades, entrego em Vosso Coração as minhas angústias, cansaço e dores. Renovai as minhas forças.',
        jaculatoria: 'Coração de Jesus, alívio dos aflitos, tende piedade de nós!'
      },
      {
        dia: 3,
        tema: 'Paz e Reconciliação nas Famílias',
        reflexao: 'A promessa de Jesus: "Porei a paz em suas famílias e unirei os corações divididos."',
        oracao: 'Senhor Jesus, entrai em meu lar com a bênção do Vosso Sagrado Coração. Curai as feridas do passado, eliminai as discórdias e firmai a união entre nós.',
        jaculatoria: 'Sagrado Coração de Jesus, abençoai o nosso lar!'
      },
      {
        dia: 4,
        tema: 'Cura das Feridas Emocionais e da Alma',
        reflexao: 'O Coração de Jesus é o bálsamo celeste que cicatriza as mágoas mais profundas.',
        oracao: 'Divino Médico das Almas, tocai com o Vosso amor as feridas da rejeição, da solidão ou da tristeza em meu ser. Enchei-me com a Vossa alegria.',
        jaculatoria: 'Coração ferido de amor por nós, curai os nossos corações!'
      },
      {
        dia: 5,
        tema: 'Perdão dos Pecados e Reparação ao Santíssimo',
        reflexao: 'Reconhecer nossa fraqueza e buscar refúgio no Sacramento da Misericórdia e na Santa Eucaristia.',
        oracao: 'Jesus Eucarístico, presente no Sacrário de todas as igrejas da terra, aceitai o meu louvor em reparação pelas ofensas e indiferenças da humanidade.',
        jaculatoria: 'Bendito e louvado seja o Santíssimo Sacramento do Altar!'
      },
      {
        dia: 6,
        tema: 'A Graça da Mansidão e da Humildade de Coração',
        reflexao: '"Aprendei de mim, porque sou manso e humilde de coração, e encontrareis repouso para vossas almas."',
        oracao: 'Senhor Jesus, libertai-me da soberba, da irritação e da dureza de julgamento. Fazei o meu coração compassivo como o Vosso.',
        jaculatoria: 'Jesus manso e humilde, transformai o meu coração!'
      },
      {
        dia: 7,
        tema: 'Promessa de Prosperidade Espiritual e Temporal',
        reflexao: '"Abençoarei as empresas e negócios dos que se dedicarem a esta devoção."',
        oracao: 'Ó Coração Providente, abençoai as minhas mãos, meus estudos, meu trabalho e as decisões financeiras da minha família segundo a Vossa justiça.',
        jaculatoria: 'Coração de Jesus, providência dos pobres, supri as nossas necessidades!'
      },
      {
        dia: 8,
        tema: 'A Grande Promessa da Comunhão Reparadora das Primeiras Sextas-feiras',
        reflexao: 'A misericórdia superabundante de Jesus que garante a graça da salvação final a quem persevera no amor.',
        oracao: 'Amado Jesus, concedei-me a fidelidade aos Santos Sacramentos e o fervor de Vos receber dignamente na Santa Missa.',
        jaculatoria: 'Coração Eucarístico de Jesus, aumentai a nossa fé!'
      },
      {
        dia: 9,
        tema: 'Reinado do Amor de Cristo para Todo o Sempre',
        reflexao: '"Eu reinarei pelo amor misericordioso do meu Coração!" A vitória definitiva de Cristo.',
        oracao: 'Sagrado Coração de Jesus, Rei e centro de todos os corações, a Vós consagro minha vida presente e meu destino eterno. Reinai soberano em meu coração!',
        jaculatoria: 'Sagrado Coração de Jesus, venha a nós o Vosso Reino! Amém!'
      }
    ]
  }
];

const PREF_KEY_NOVENAS = 'biblia_novenas_ativas_v1';

/**
 * Obtém o mapa de novenas salvas com o progresso do usuário
 */
export async function getProgressoNovenas() {
  try {
    const res = await Preferences.get({ key: PREF_KEY_NOVENAS });
    if (res && res.value) {
      return JSON.parse(res.value);
    }
  } catch (e) {
    console.warn('[Novenas] Erro ao carregar progresso:', e);
  }
  return {};
}

/**
 * Salva o estado de progresso das novenas
 */
export async function salvarProgressoNovenas(progressoMap) {
  try {
    await Preferences.set({
      key: PREF_KEY_NOVENAS,
      value: JSON.stringify(progressoMap)
    });
  } catch (e) {
    console.error('[Novenas] Erro ao salvar progresso:', e);
  }
}

/**
 * Retorna a lista de todas as novenas com o estado de progresso mesclado
 */
export async function getNovenasComProgresso() {
  const progresso = await getProgressoNovenas();
  return NOVENAS_LIST.map(novena => {
    const p = progresso[novena.id];
    return {
      ...novena,
      emAndamento: !!p && !p.concluida,
      diaAtual: p ? p.diaAtual : 1,
      concluida: p ? !!p.concluida : false,
      ultimoDiaRezado: p ? p.ultimoDiaRezado : null,
      dataInicio: p ? p.dataInicio : null,
      dataConclusao: p ? p.dataConclusao : null,
      historicoDias: p && p.historicoDias ? p.historicoDias : []
    };
  });
}

/**
 * Inicia uma novena
 */
export async function iniciarNovena(novenaId) {
  const progresso = await getProgressoNovenas();
  const hojeIso = new Date().toISOString();
  progresso[novenaId] = {
    id: novenaId,
    diaAtual: 1,
    dataInicio: hojeIso,
    ultimoDiaRezado: null,
    concluida: false,
    historicoDias: []
  };
  await salvarProgressoNovenas(progresso);
  return progresso[novenaId];
}

/**
 * Marca o dia da novena como concluído e avança para o próximo
 */
export async function marcarDiaNovenaConcluido(novenaId, diaConcluido) {
  const progresso = await getProgressoNovenas();
  let p = progresso[novenaId];
  const hoje = new Date().toLocaleDateString('pt-BR');
  const hojeIso = new Date().toISOString();

  if (!p) {
    p = {
      id: novenaId,
      diaAtual: 1,
      dataInicio: hojeIso,
      ultimoDiaRezado: null,
      concluida: false,
      historicoDias: []
    };
  }

  if (!p.historicoDias.includes(diaConcluido)) {
    p.historicoDias.push(diaConcluido);
  }
  p.ultimoDiaRezado = hoje;

  if (diaConcluido >= 9) {
    p.concluida = true;
    p.dataConclusao = hojeIso;
    p.diaAtual = 9;
  } else {
    p.diaAtual = diaConcluido + 1;
    p.concluida = false;
  }

  progresso[novenaId] = p;
  await salvarProgressoNovenas(progresso);
  return p;
}

/**
 * Reinicia uma novena
 */
export async function reiniciarNovena(novenaId) {
  return await iniciarNovena(novenaId);
}
