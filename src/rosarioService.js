/**
 * rosarioService.js - Santo Rosário & Terço Interativo
 * Bíblia Sagrada Católica (Edição Ave Maria)
 */

export const MISTERIOS_DATA = {
  gozosos: {
    id: 'gozosos',
    nome: 'Mistérios Gozosos',
    diasSemana: [1, 6], // Segunda-feira (1) e Sábado (6)
    diasTexto: 'Segundas e Sábados',
    cor: '#eab308',
    descricao: 'Celebramos a alegria da Encarnação do Verbo e a Infância de Jesus.',
    misterios: [
      {
        num: 1,
        titulo: 'A Anunciação do Arcanjo Gabriel a Maria',
        fruto: 'A Humildade e a submissão à vontade de Deus',
        passagem: 'Lucas 1, 26-38',
        meditacao: 'O Arcanjo Gabriel anuncia à Virgem Maria que ela conceberá e dará à luz o Filho do Altíssimo pelo poder do Espírito Santo. Maria responde com fé: "Eis aqui a serva do Senhor; faça-se em mim segundo a vossa palavra".'
      },
      {
        num: 2,
        titulo: 'A Visitação de Maria a sua prima Santa Isabel',
        fruto: 'O Amor ao próximo e a Caridade fraterna',
        passagem: 'Lucas 1, 39-56',
        meditacao: 'Maria parte apressadamente para as montanhas da Judeia para servir a Isabel. Ao ouvir a saudação de Maria, o menino saltou de alegria no ventre de Isabel, e Maria proclamou o cântico do Magnificat.'
      },
      {
        num: 3,
        titulo: 'O Nascimento do Menino Jesus em Belém',
        fruto: 'O Desapego dos bens terrenos e a Pobreza de espírito',
        passagem: 'Lucas 2, 1-20',
        meditacao: 'Na pobreza de uma gruta em Belém, nasce o Salvador do mundo. Maria o envolve em faixas e o deita numa manjedoura, enquanto os anjos cantam nos céus: "Glória a Deus nas alturas e paz na terra aos homens por Ele amados".'
      },
      {
        num: 4,
        titulo: 'A Apresentação de Jesus no Templo',
        fruto: 'A Pureza de coração e a Obediência à lei de Deus',
        passagem: 'Lucas 2, 22-38',
        meditacao: 'Maria e José levam o Menino Jesus a Jerusalém para apresentá-Lo ao Senhor. O santo ancião Simeão o toma nos braços e profetiza que uma espada de dor transpassará a alma de Maria.'
      },
      {
        num: 5,
        titulo: 'A Perda e o Encontro de Jesus no Templo',
        fruto: 'A Busca de Jesus em nossa vida e a Sabedoria divina',
        passagem: 'Lucas 2, 41-52',
        meditacao: 'Aos doze anos, após três dias de angústia procurando Jesus, Maria e José o encontram no Templo, sentado entre os doutores, ouvindo-os e fazendo-lhes perguntas sobre as coisas do Pai.'
      }
    ]
  },
  dolorosos: {
    id: 'dolorosos',
    nome: 'Mistérios Dolorosos',
    diasSemana: [2, 5], // Terça-feira (2) e Sexta-feira (5)
    diasTexto: 'Terças e Sextas-feiras',
    cor: '#ef4444',
    descricao: 'Contemplamos a Paixão e Morte redentora de Nosso Senhor Jesus Cristo.',
    misterios: [
      {
        num: 1,
        titulo: 'A Agonia de Jesus no Horto das Oliveiras',
        fruto: 'A Dor pelos pecados e a Oração perseverante',
        passagem: 'Mateus 26, 36-46',
        meditacao: 'No Jardim do Getsêmani, Jesus experimenta a angústia de carregar os pecados da humanidade e suou sangue. Ele ora ao Pai: "Meu Pai, se é possível, afasta de mim este cálice; contudo, não seja como Eu quero, mas como Tu queres".'
      },
      {
        num: 2,
        titulo: 'A Flagelação de Nosso Senhor na coluna',
        fruto: 'A Mortificação dos sentidos e a Pureza',
        passagem: 'Mateus 27, 26',
        meditacao: 'Por ordem de Pilatos, Jesus é atado a uma coluna de pedra e cruelmente açoitado por nossos pecados da carne e faltas de pureza. "Ele foi ferido por causa de nossas iniquidades e moído por nossos pecados".'
      },
      {
        num: 3,
        titulo: 'A Coroação de Espinhos',
        fruto: 'A Humildade contra o orgulho e o respeito humano',
        passagem: 'Mateus 27, 27-31',
        meditacao: 'Os soldados tecem uma coroa de espinhos pontiagudos e a cravam na cabeça do Rei dos Reis. Colocam-lhe uma cana na mão, cobrem-no com um manto de púrpura e escarnecem dele: "Salve, Rei dos Judeus!".'
      },
      {
        num: 4,
        titulo: 'Jesus carrega a pesada Cruz até o Calvário',
        fruto: 'A Paciência no sofrimento e resignação nas cruzes diárias',
        passagem: 'João 19, 17',
        meditacao: 'Com os ombros dilacerados, Jesus toma a pesada Cruz e sobe a colina do Calvário. No caminho, Ele encontra Sua Mãe Santíssima e aceita o auxílio de Simão Cirineu.'
      },
      {
        num: 5,
        titulo: 'A Crucificação e Morte de Jesus na Cruz',
        fruto: 'O Perdão dos inimigos e o Amor supremo a Deus',
        passagem: 'Lucas 23, 33-46',
        meditacao: 'Pregado na Cruz entre dois ladrões, Jesus nos dá Maria por Mãe: "Mulher, eis aí o teu filho... Eis aí a tua mãe". Após perdoar seus algozes, exclama: "Tudo está consumado! Pai, em Tuas mãos entrego o Meu espírito".'
      }
    ]
  },
  gloriosos: {
    id: 'gloriosos',
    nome: 'Mistérios Gloriosos',
    diasSemana: [0, 3], // Domingo (0) e Quarta-feira (3)
    diasTexto: 'Quartas-feiras e Domingos',
    cor: '#3b82f6',
    descricao: 'Celebramos a Ressurreição triunfante de Cristo e a Glória celestial.',
    misterios: [
      {
        num: 1,
        titulo: 'A Ressurreição Triunfante de Jesus Cristo',
        fruto: 'A Fé viva e a Esperança na vida eterna',
        passagem: 'Mateus 28, 1-10',
        meditacao: 'Ao terceiro dia, Cristo vence a morte e sai glorioso do sepulcro! A morte foi tragada pela vitória. "Por que procurais entre os mortos Aquele que está vivo? Ele ressuscitou!".'
      },
      {
        num: 2,
        titulo: 'A Ascensão Gloriosa de Jesus ao Céu',
        fruto: 'O Desejo do Céu e o Desapego do mundo',
        passagem: 'Marcos 16, 19-20',
        meditacao: 'Quarenta dias após a Ressurreição, diante dos Apóstolos, Jesus sobe aos Céus e senta-se à direita de Deus Pai Todo-Poderoso, prometendo: "Eis que estou convosco todos os dias, até o fim dos tempos".'
      },
      {
        num: 3,
        titulo: 'A Descida do Espírito Santo em Pentecostes',
        fruto: 'O Zelo apostólico e a Dócil escuta ao Espírito Santo',
        passagem: 'Atos 2, 1-4',
        meditacao: 'Reunidos no Cenáculo com Maria Santíssima em oração, os discípulos recebem o Espírito Santo em forma de línguas de fogo, nascendo a Santa Igreja Missionária.'
      },
      {
        num: 4,
        titulo: 'A Assunção de Nossa Senhora ao Céu',
        fruto: 'A Devoção filial a Maria e a Boa morte',
        passagem: 'Tradição e Dogma da Igreja',
        meditacao: 'Terminado o curso de sua vida terrena, a Virgem Imaculada foi elevada em corpo e alma à glória celeste, para ser mais plenamente conformada ao Seu Filho Ressuscitado.'
      },
      {
        num: 5,
        titulo: 'A Coroação de Maria Rainha do Céu e da Terra',
        fruto: 'A Confiança total na poderosa intercessão da Mãe de Deus',
        passagem: 'Apocalipse 12, 1',
        meditacao: 'A Santíssima Virgem é coroada pela Santíssima Trindade como Rainha dos Anjos, dos Santos e de todo o Universo: "Apareceu no céu um grande sinal: uma Mulher revestida de sol, com a lua debaixo dos pés e uma coroa de doze estrelas".'
      }
    ]
  },
  luminosos: {
    id: 'luminosos',
    nome: 'Mistérios Luminosos (da Luz)',
    diasSemana: [4], // Quinta-feira (4)
    diasTexto: 'Quintas-feiras',
    cor: '#a855f7',
    descricao: 'Contemplamos a vida pública e o ministério luminoso de Jesus Cristo.',
    misterios: [
      {
        num: 1,
        titulo: 'O Batismo de Jesus no Rio Jordão',
        fruto: 'A Fidelidade às promessas do nosso Batismo',
        passagem: 'Mateus 3, 13-17',
        meditacao: 'Jesus, o Inocente, faz-se pecado por nós e desce às águas do Jordão. Os céus se abrem, o Espírito Santo desce em forma de pomba e a voz do Pai declara: "Este é o Meu Filho amado, em Quem me comprazo".'
      },
      {
        num: 2,
        titulo: 'A Auto-revelação nas Bodas de Caná',
        fruto: 'A Confiança na poderosa intercessão de Maria Santíssima',
        passagem: 'João 2, 1-12',
        meditacao: 'A pedido de Sua Mãe: "Fazei tudo o que Ele vos disser", Jesus realiza Seu primeiro milagre, transformando a água em vinho de altíssima qualidade e manifestando a Sua glória.'
      },
      {
        num: 3,
        titulo: 'O Anúncio do Reino de Deus e o Chamado à Conversão',
        fruto: 'A Conversão contínua do coração e Confissão frequente',
        passagem: 'Marcos 1, 14-15',
        meditacao: 'Jesus percorre a Galileia anunciando: "O tempo completou-se e o Reino de Deus está próximo; arrependei-vos e crede no Evangelho", perdoando os pecados e curando as enfermidades.'
      },
      {
        num: 4,
        titulo: 'A Transfiguração no Monte Tabor',
        fruto: 'A Contemplação de Cristo e a coragem na Cruz',
        passagem: 'Mateus 17, 1-8',
        meditacao: 'No alto do monte Tabor, diante de Pedro, Tiago e João, o rosto de Jesus brilha como o sol e Suas vestes tornam-se alvas como a luz, revelando o esplendor de Sua glória divina.'
      },
      {
        num: 5,
        titulo: 'A Instituição da Santíssima Eucaristia',
        fruto: 'O Amor ardente à Santa Missa e Adoração Eucarística',
        passagem: 'Mateus 26, 26-29',
        meditacao: 'Na Última Ceia, Jesus toma o pão e o vinho e diz: "Tomai e comei: isto é o Meu Corpo... Tomai e bebei: este é o Meu Sangue derramado por vós". Ele se faz nosso Alimento eterno no Santíssimo Sacramento.'
      }
    ]
  }
};

export const ORACOES_TEXTOS = {
  sinalDaCruz: {
    titulo: 'Sinal da Cruz & Oferecimento',
    texto: 'Em nome do Pai, e do Filho e do Espírito Santo. Amém.\n\nDivino Jesus, nós Vos oferecemos este Terço que vamos rezar, contemplando os mistérios de nossa Redenção. Concedei-nos, pela intercessão de Maria, Vossa Mãe Santíssima, a quem nos dirigimos, as graças necessárias para bem rezá-lo e para ganharmos as indulgências desta santa devoção.'
  },
  credo: {
    titulo: 'Creio em Deus Pai (Credo dos Apóstolos)',
    texto: 'Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.'
  },
  paiNosso: {
    titulo: 'Pai Nosso',
    texto: 'Pai Nosso que estais nos Céus, santificado seja o Vosso Nome, venha a nós o Vosso Reino, seja feita a Vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém.'
  },
  aveMaria: {
    titulo: 'Ave Maria',
    texto: 'Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.'
  },
  gloria: {
    titulo: 'Glória ao Pai & Jaculatória de Fátima',
    texto: 'Glória ao Pai, e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.\n\nÓ meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem da Vossa misericórdia.'
  },
  salveRainha: {
    titulo: 'Salve Rainha & Agradecimento',
    texto: 'Salve, Rainha, Mãe de Misericórdia, vida, doçura e esperança nossa, Salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, Advogada nossa, esses vossos olhos misericordiosos a nós volvei; e, depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.'
  }
};

/**
 * Retorna os Mistérios adequados para o dia da semana de uma data
 */
export function getMisterioDoDia(date = new Date()) {
  const day = date.getDay(); // 0 Dom, 1 Seg, 2 Ter, 3 Qua, 4 Qui, 5 Sex, 6 Sab
  if (day === 1 || day === 6) return MISTERIOS_DATA.gozosos;
  if (day === 2 || day === 5) return MISTERIOS_DATA.dolorosos;
  if (day === 4) return MISTERIOS_DATA.luminosos;
  return MISTERIOS_DATA.gloriosos;
}

/**
 * Constrói a lista completa de passos (contas) para rezar o Terço do início ao fim
 */
export function buildRosarySteps(misterioKey = null) {
  const misterioData = (misterioKey && MISTERIOS_DATA[misterioKey]) 
    ? MISTERIOS_DATA[misterioKey] 
    : getMisterioDoDia();

  const steps = [];

  // Passo 0: Sinal da Cruz e Oferecimento
  steps.push({
    stepIndex: 0,
    type: 'intro',
    titulo: ORACOES_TEXTOS.sinalDaCruz.titulo,
    subtitulo: `${misterioData.nome} • Início da Oração`,
    oracao: ORACOES_TEXTOS.sinalDaCruz.texto,
    progressLabel: 'Sinal da Cruz'
  });

  // Passo 1: Credo
  steps.push({
    stepIndex: 1,
    type: 'credo',
    titulo: ORACOES_TEXTOS.credo.titulo,
    subtitulo: 'Profissão de Fé Católica',
    oracao: ORACOES_TEXTOS.credo.texto,
    progressLabel: 'Creio'
  });

  // Passo 2: 1º Pai Nosso Inicial
  steps.push({
    stepIndex: 2,
    type: 'paiNosso',
    titulo: 'Pai Nosso',
    subtitulo: 'Pelas intenções do Santo Padre e da Igreja',
    oracao: ORACOES_TEXTOS.paiNosso.texto,
    progressLabel: 'Pai Nosso'
  });

  // Passos 3, 4, 5: 3 Ave Marias (Fé, Esperança e Caridade)
  const virtudes = ['Em honra a Deus Pai e pela Virtude da Fé', 'Em honra a Deus Filho e pela Virtude da Esperança', 'Em honra ao Espírito Santo e pela Virtude da Caridade'];
  for (let i = 0; i < 3; i++) {
    steps.push({
      stepIndex: steps.length,
      type: 'aveMariaIntro',
      titulo: `Ave Maria (${i + 1}ª de 3)`,
      subtitulo: virtudes[i],
      oracao: ORACOES_TEXTOS.aveMaria.texto,
      progressLabel: `Ave Maria ${i + 1}/3`
    });
  }

  // Passo 6: Glória Inicial
  steps.push({
    stepIndex: steps.length,
    type: 'gloriaIntro',
    titulo: 'Glória ao Pai',
    subtitulo: 'Louvor à Santíssima Trindade',
    oracao: ORACOES_TEXTOS.gloria.texto,
    progressLabel: 'Glória'
  });

  // Dezenas dos 5 Mistérios
  misterioData.misterios.forEach((m, mIdx) => {
    // Anúncio do Mistério
    steps.push({
      stepIndex: steps.length,
      type: 'misterioAnuncio',
      dezena: mIdx + 1,
      titulo: `${mIdx + 1}º Mistério: ${m.titulo}`,
      subtitulo: `Fruto: ${m.fruto} (${m.passagem})`,
      oracao: m.meditacao,
      passagem: m.passagem,
      progressLabel: `${mIdx + 1}º Mistério`
    });

    // Pai Nosso da Dezena
    steps.push({
      stepIndex: steps.length,
      type: 'paiNossoDezena',
      dezena: mIdx + 1,
      titulo: `Pai Nosso • ${mIdx + 1}ª Dezena`,
      subtitulo: m.titulo,
      oracao: ORACOES_TEXTOS.paiNosso.texto,
      progressLabel: `${mIdx + 1}ª Dezena • Pai Nosso`
    });

    // 10 Ave Marias da Dezena
    for (let ave = 1; ave <= 10; ave++) {
      steps.push({
        stepIndex: steps.length,
        type: 'aveMariaDezena',
        dezena: mIdx + 1,
        aveNum: ave,
        titulo: `${ave}ª Ave Maria • ${mIdx + 1}º Mistério`,
        subtitulo: m.titulo,
        oracao: ORACOES_TEXTOS.aveMaria.texto,
        progressLabel: `${mIdx + 1}ª Dez. • Ave Maria ${ave}/10`
      });
    }

    // Glória & Jaculatória da Dezena
    steps.push({
      stepIndex: steps.length,
      type: 'gloriaDezena',
      dezena: mIdx + 1,
      titulo: `Glória & Jaculatória • ${mIdx + 1}ª Dezena`,
      subtitulo: 'Ó meu Jesus, perdoai-nos...',
      oracao: ORACOES_TEXTOS.gloria.texto,
      progressLabel: `${mIdx + 1}ª Dez. • Glória`
    });
  });

  // Salve Rainha e Agradecimento Final
  steps.push({
    stepIndex: steps.length,
    type: 'salveRainha',
    titulo: ORACOES_TEXTOS.salveRainha.titulo,
    subtitulo: 'Consagração e Louvor Final à Virgem Maria',
    oracao: ORACOES_TEXTOS.salveRainha.texto,
    progressLabel: 'Salve Rainha'
  });

  return {
    misterio: misterioData,
    steps: steps,
    totalSteps: steps.length
  };
}
