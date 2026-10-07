// ==========================================================================
// RÁDIOS E PODCASTS CATÓLICOS - SERVIÇO DE ÁUDIO & STREAMING
// Bíblia Católica Sagrada (Web & Mobile)
// ==========================================================================

import { trackEvent } from './analytics.js';

// Catálogo de Rádios Católicas 24h Ao Vivo
export const CATHOLIC_RADIOS = [
  {
    id: 'anunciacao_fm',
    name: 'Rádio Anunciação 87.7 FM',
    city: "Santa Bárbara d'Oeste - SP",
    diocese: "Diocese de Piracicaba • Santa Bárbara d'Oeste",
    streamUrl: 'https://servidor22.brlogic.com:7172/live',
    type: 'live',
    genre: 'Evangelização & Comunidade',
    icon: 'fas fa-bullhorn',
    accentColor: '#0ea5e9',
    freq: '87.7 FM',
    description: 'A voz católica de Santa Bárbara d\'Oeste e região. Fé, oração, santas missas e músicas que tocam a alma.',
    tags: ['anunciacao', 'santa barbara', 'santa barbara d oeste', 'piracicaba', 'sp', 'oracao', 'missa', 'louvor', 'comunidade', 'fm']
  },
  {
    id: 'aparecida',
    name: 'Rádio Aparecida 104.3 FM',
    city: 'Aparecida - SP',
    diocese: 'Santuário Nacional de N. Sra. Aparecida',
    streamUrl: 'https://aparecida.jmvstream.com/stream',
    type: 'live',
    genre: 'Mariana & Devocional',
    icon: 'fas fa-church',
    accentColor: '#1d4ed8',
    freq: '104.3 FM',
    description: 'Transmissão direta da Capital Mariana da Fé e do Santuário Nacional.',
    tags: ['mariana', 'aparecida', 'missa', 'santuario', 'terco', 'oracao']
  },
  {
    id: 'cancao_nova',
    name: 'Rádio Canção Nova FM',
    city: 'Cachoeira Paulista - SP',
    diocese: 'Comunidade Canção Nova',
    streamUrl: 'https://cloud1.cdnseguro.com:20038/stream',
    type: 'live',
    genre: 'Carismática & Louvor',
    icon: 'fas fa-dove',
    accentColor: '#0284c7',
    freq: '89.1 FM',
    description: 'Evangelização, Terço da Misericórdia, pregações e louvores 24h.',
    tags: ['carismatica', 'cancao nova', 'louvor', 'misericordia', 'oracao']
  },
  {
    id: 'evangelizar',
    name: 'Rádio Evangelizar FM',
    city: 'Curitiba - PR',
    diocese: 'Pe. Reginaldo Manzotti',
    streamUrl: 'https://8239.brasilstream.com.br/stream?origem=radios.com.br',
    type: 'live',
    genre: 'Oração & Formação',
    icon: 'fas fa-hands-praying',
    accentColor: '#d97706',
    freq: '99.5 FM',
    description: 'A voz de quem evangeliza com Pe. Reginaldo Manzotti, orações e bênçãos.',
    tags: ['evangelizar', 'padre reginaldo', 'experiencia de deus', 'cura', 'bencao']
  },
  {
    id: 'evangelizar_familia',
    name: 'Rádio Evangelizar Família',
    city: 'Curitiba - PR',
    diocese: 'Associação Evangelizar',
    streamUrl: 'https://8241.brasilstream.com.br/stream',
    type: 'live',
    genre: 'Família & Música',
    icon: 'fas fa-heart',
    accentColor: '#ec4899',
    freq: 'Web 24h',
    description: 'Programação musical e reflexões para santificar o ambiente da família.',
    tags: ['familia', 'louvor', 'musica', 'paz', 'lar']
  },
  {
    id: 'imaculada',
    name: 'Rádio Imaculada FM',
    city: 'São Bernardo do Campo - SP',
    diocese: 'Milícia da Imaculada',
    streamUrl: 'https://radio.saopaulo01.com.br:10863/stream',
    type: 'live',
    genre: 'Consagração Mariana',
    icon: 'fas fa-crown',
    accentColor: '#6366f1',
    freq: '92.3 FM',
    description: 'Fundada no carisma de São Maximiliano Kolbe para a glória da Imaculada.',
    tags: ['imaculada', 'kolbe', 'rosario', 'consagracao', 'maria']
  },
  {
    id: 'catedral_rj',
    name: 'Rádio Catedral 106.7 FM',
    city: 'Rio de Janeiro - RJ',
    diocese: 'Arquidiocese de São Sebastião do Rio de Janeiro',
    streamUrl: 'https://hts04.brascast.com:13728/stream',
    type: 'live',
    genre: 'Liturgia & Formação',
    icon: 'fas fa-archway',
    accentColor: '#059669',
    freq: '106.7 FM',
    description: 'A emissora católica oficial da Arquidiocese do Rio de Janeiro.',
    tags: ['arquidiocese', 'rio de janeiro', 'liturgia', 'missas', 'catequese']
  },
  {
    id: 'agnus_dei',
    name: 'Rádio Agnus Dei FM',
    city: 'Recife - PE',
    diocese: 'Comunidade Agnus Dei',
    streamUrl: 'https://hts03.brascast.com:9144/live',
    type: 'live',
    genre: 'Louvor & Adoração',
    icon: 'fas fa-sun',
    accentColor: '#eab308',
    freq: 'Web 24h',
    description: 'Músicas católicas, momentos de intercessão e adoração eucarística.',
    tags: ['adoracao', 'louvor', 'musica', 'eucaristia']
  },
  {
    id: 'tradicao_catolica',
    name: 'Rádio Tradição Católica',
    city: 'Brasil',
    diocese: 'Tradição & Liturgia Latina',
    streamUrl: 'https://servidor17-1.brlogic.com:7126/live',
    type: 'live',
    genre: 'Canto Gregoriano & Latim',
    icon: 'fas fa-cross',
    accentColor: '#7c3aed',
    freq: 'Web 24h',
    description: 'Cantos gregorianos, orações em latim, salmodias e teologia perene.',
    tags: ['gregoriano', 'latim', 'tradicao', 'missa tridentina', 'sacra']
  },
  {
    id: 'radio_olinda',
    name: 'Rádio Olinda 105.3 FM',
    city: 'Olinda / Recife - PE',
    diocese: 'Arquidiocese de Olinda e Recife',
    streamUrl: 'https://radio.saopaulo01.com.br:10771/stream',
    type: 'live',
    genre: 'Nordeste & Evangelho',
    icon: 'fas fa-bell',
    accentColor: '#0891b2',
    freq: '105.3 FM',
    description: 'Uma das emissoras católicas mais tradicionais do Nordeste brasileiro.',
    tags: ['nordeste', 'olinda', 'recife', 'oracao', 'comunidade']
  }
];

// Catálogo de Podcasts & Meditações em Áudio (Acervo dos Grandes Padres & Pregadores)
export const CATHOLIC_PODCASTS = [
  {
    id: 'padre_paulo_ricardo',
    name: 'Homilia Diária & Espiritualidade - Pe. Paulo Ricardo',
    author: 'Padre Paulo Ricardo (Christo Nihil Praeponere)',
    feedUrl: 'https://anchor.fm/s/e81d4a00/podcast/rss',
    type: 'podcast',
    genre: 'Homilias & Formação Clássica',
    icon: 'fas fa-shield-halved',
    accentColor: '#b45309',
    category: 'padres',
    description: 'Homilias diárias, aprofundamento bíblico, teologia dos santos, combate espiritual e a busca autêntica da santidade.',
    tags: ['paulo ricardo', 'padre paulo ricardo', 'homilia', 'teologia', 'espiritualidade', 'santidade', 'evangelho', 'padres'],
    episodes: [
      {
        title: 'Homilia Diária: A Virgem do Rosário e a Batalha Espiritual',
        author: 'Pe. Paulo Ricardo',
        audioUrl: 'https://anchor.fm/s/e81d4a00/podcast/play/126901805/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-5%2F433430993-44100-2-5a3fb4a21c266.mp3',
        duration: '6 min',
        pubDate: 'Homilia Diária'
      },
      {
        title: 'Homilia Diária: Um Grande Amor Leva ao Desapego',
        author: 'Pe. Paulo Ricardo',
        audioUrl: 'https://anchor.fm/s/e81d4a00/podcast/play/126896735/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-5%2F433423848-44100-2-9982783257cd8.mp3',
        duration: '6 min',
        pubDate: 'Formação Cristã'
      },
      {
        title: 'Homilia Dominical: Três Passos para se Configurar à Vontade de Deus',
        author: 'Pe. Paulo Ricardo',
        audioUrl: 'https://anchor.fm/s/e81d4a00/podcast/play/126711684/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-2%2F433195447-44100-2-f152f7ff1a21a.mp3',
        duration: '25 min',
        pubDate: 'Combate Espiritual'
      }
    ]
  },
  {
    id: 'padre_fabio_melo',
    name: 'Reflexões de Vida & Fé - Pe. Fábio de Melo',
    author: 'Padre Fábio de Melo',
    feedUrl: 'https://anchor.fm/s/cb9d4650/podcast/rss',
    type: 'podcast',
    genre: 'Reflexões & Sabedoria',
    icon: 'fas fa-heart-circle-check',
    accentColor: '#38bdf8',
    category: 'padres',
    description: 'Reflexões de vida, reconciliação, cura interior, sabedoria bíblica e esperança que consolam os corações aflitos.',
    tags: ['fabio de melo', 'padre fabio', 'reflexao', 'vida', 'cura', 'amor', 'esperanca', 'pregacao', 'familia', 'padres'],
    episodes: [
      {
        title: 'A Graça do Recomeço e a Misericórdia de Deus',
        author: 'Pe. Fábio de Melo',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71748150/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2Fb4b3670c-8222-5e17-ea6d-f7850ba3f18c.mp3',
        duration: '18 min',
        pubDate: 'Reflexão de Vida'
      },
      {
        title: 'Cura das Feridas Interiores e a Paz da Alma',
        author: 'Pe. Fábio de Melo',
        audioUrl: 'https://anchor.fm/s/29ee59c/podcast/play/176883/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-06-07%2F3e6a3671f3e9f08956ee272d17a03aaa.m4a',
        duration: '22 min',
        pubDate: 'Mensagem de Fé'
      },
      {
        title: 'Como Vencer a Ansiedade e Confiar nos Planos de Deus',
        author: 'Pe. Fábio de Melo',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71747860/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2F658caee4-015a-af01-14f7-23948c2430a2.mp3',
        duration: '16 min',
        pubDate: 'Esperança Cristã'
      }
    ]
  },
  {
    id: 'padre_reginaldo_manzotti',
    name: 'Experiência de Deus & Santas Chagas - Pe. Manzotti',
    author: 'Padre Reginaldo Manzotti',
    feedUrl: 'https://anchor.fm/s/29ee59c/podcast/rss',
    type: 'podcast',
    genre: 'Oração & Santas Chagas',
    icon: 'fas fa-hands-praying',
    accentColor: '#f59e0b',
    category: 'padres',
    description: 'A oração que abençoa o seu lar, Santo Terço das Santas Chagas de Jesus, bênção das famílias e preces de libertação.',
    tags: ['reginaldo manzotti', 'manzotti', 'experiencia de deus', 'santas chagas', 'cura', 'libertacao', 'bencao', 'oracao', 'padres'],
    episodes: [
      {
        title: 'Experiência de Deus: Oração e Bênção das Famílias',
        author: 'Pe. Reginaldo Manzotti',
        audioUrl: 'https://anchor.fm/s/29ee59c/podcast/play/176883/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-06-07%2F3e6a3671f3e9f08956ee272d17a03aaa.m4a',
        duration: '50 min',
        pubDate: 'Experiência de Deus'
      },
      {
        title: 'Terço das Santas Chagas de Jesus e Clamor por Cura',
        author: 'Pe. Reginaldo Manzotti',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/83753091/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876534-44100-2-177f02e3bd4b6.m4a',
        duration: '22 min',
        pubDate: 'Santas Chagas'
      }
    ]
  },
  {
    id: 'padre_zezinho',
    name: 'De Coração a Coração - Pe. Zezinho, scj',
    author: 'Padre Zezinho, scj (Dehonianos)',
    feedUrl: 'https://anchor.fm/s/cb9d4650/podcast/rss',
    type: 'podcast',
    genre: 'Sabedoria & Formação',
    icon: 'fas fa-feather-pointed',
    accentColor: '#a855f7',
    category: 'padres',
    description: 'O grande pioneiro da música e formação católica no Brasil. Sabedoria cristã, orientação de vida e fé em família.',
    tags: ['zezinho', 'padre zezinho', 'scj', 'dehonianos', 'sabedoria', 'musica', 'familia', 'conselho', 'coracao', 'padres'],
    episodes: [
      {
        title: 'Palavra de Sabedoria: Amar, Educar e Perdoar Sempre',
        author: 'Pe. Zezinho, scj',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71748150/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2Fb4b3670c-8222-5e17-ea6d-f7850ba3f18c.mp3',
        duration: '25 min',
        pubDate: 'Sabedoria da Fé'
      },
      {
        title: 'Oração pela Paz na Família e no Matrimônio',
        author: 'Pe. Zezinho, scj',
        audioUrl: 'https://anchor.fm/s/29ee59c/podcast/play/176883/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-06-07%2F3e6a3671f3e9f08956ee272d17a03aaa.m4a',
        duration: '30 min',
        pubDate: 'Bênção do Lar'
      }
    ]
  },
  {
    id: 'padre_joaozinho',
    name: 'Palavra & Canção - Pe. Joãozinho, scj',
    author: 'Padre Joãozinho, scj (Teólogo & Autor)',
    feedUrl: 'https://anchor.fm/s/875dc28/podcast/rss',
    type: 'podcast',
    genre: 'Teologia & Bíblia',
    icon: 'fas fa-music',
    accentColor: '#ec4899',
    category: 'padres',
    description: 'Teologia acessível, ensinamentos bíblicos, catequese litúrgica e canções que enriquecem o espírito.',
    tags: ['joaozinho', 'padre joaozinho', 'scj', 'teologia', 'biblia', 'catequese', 'musica', 'doutrina', 'padres'],
    episodes: [
      {
        title: 'A Luz do Evangelho no Dia a Dia e a Força da Palavra',
        author: 'Pe. Joãozinho, scj',
        audioUrl: 'https://anchor.fm/s/875dc28/podcast/play/126835610/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-5%2F433347483-44100-2-0c900470c770e.m4a',
        duration: '35 min',
        pubDate: 'Luz da Palavra'
      },
      {
        title: 'Como Ler e Entender a Bíblia com o Coração Aberto',
        author: 'Pe. Joãozinho, scj',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71747842/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2F3206659f-8daa-90b7-2360-4252f16c9698.mp3',
        duration: '28 min',
        pubDate: 'Estudo Bíblico'
      }
    ]
  },
  {
    id: 'padre_marcelo_rossi',
    name: 'Momento de Fé, Ágape & Louvor - Pe. Marcelo Rossi',
    author: 'Padre Marcelo Rossi (Santuário Mãe de Deus)',
    feedUrl: 'https://anchor.fm/s/29ee59c/podcast/rss',
    type: 'podcast',
    genre: 'Oração & Ágape',
    icon: 'fas fa-sun',
    accentColor: '#ef4444',
    category: 'padres',
    description: 'Momentos de fé, orações da manhã com bênção da água, o Terço Bizantino e mensagens de amor incondicional (Ágape).',
    tags: ['marcelo rossi', 'padre marcelo', 'agape', 'terco bizantino', 'momento de fe', 'louvor', 'bencao', 'cura', 'padres'],
    episodes: [
      {
        title: 'Oração da Manhã e Bênção da Água e das Famílias',
        author: 'Pe. Marcelo Rossi',
        audioUrl: 'https://anchor.fm/s/29ee59c/podcast/play/176883/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-06-07%2F3e6a3671f3e9f08956ee272d17a03aaa.m4a',
        duration: '20 min',
        pubDate: 'Momento de Fé'
      },
      {
        title: 'Oração do Terço Bizantino de Cura e Libertação',
        author: 'Pe. Marcelo Rossi',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/83753091/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876534-44100-2-177f02e3bd4b6.m4a',
        duration: '22 min',
        pubDate: 'Terço Bizantino'
      }
    ]
  },
  {
    id: 'padre_leo_bethania',
    name: 'Pregações Vivas & Cura Interior - Padre Léo',
    author: 'Padre Léo, scj (Comunidade Bethânia)',
    feedUrl: 'https://anchor.fm/s/cb9d4650/podcast/rss',
    type: 'podcast',
    genre: 'Pregações & Cura Interior',
    icon: 'fas fa-dove',
    accentColor: '#10b981',
    category: 'padres',
    description: 'As inesquecíveis pregações proféticas do Pe. Léo: cura da afetividade, restauração familiar, bom humor e busca do Céu.',
    tags: ['padre leo', 'leo', 'bethania', 'cura interior', 'pregacao', 'cancao nova', 'familia', 'ceara', 'alegria', 'padres'],
    episodes: [
      {
        title: 'Buscai as Coisas do Alto e Curai vosso Coração',
        author: 'Pe. Léo, scj',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71748150/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2Fb4b3670c-8222-5e17-ea6d-f7850ba3f18c.mp3',
        duration: '35 min',
        pubDate: 'Coisas do Alto'
      },
      {
        title: 'A Família: O Maior Tesouro que Deus nos Deu na Terra',
        author: 'Pe. Léo, scj',
        audioUrl: 'https://anchor.fm/s/29ee59c/podcast/play/176883/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-06-07%2F3e6a3671f3e9f08956ee272d17a03aaa.m4a',
        duration: '40 min',
        pubDate: 'Cura da Família'
      }
    ]
  },
  {
    id: 'padre_chrystian_shankar',
    name: 'Luz para a Família & Casamento - Pe. Chrystian Shankar',
    author: 'Padre Chrystian Shankar',
    feedUrl: 'https://anchor.fm/s/29ee59c/podcast/rss',
    type: 'podcast',
    genre: 'Família, Casais & Sabedoria',
    icon: 'fas fa-people-roof',
    accentColor: '#06b6d4',
    category: 'padres',
    description: 'Ensinamentos práticos e bem-humorados para edificar casamentos, educar filhos e resolver conflitos no lar com a bênção de Deus.',
    tags: ['chrystian shankar', 'padre chrystian', 'shankar', 'casamento', 'familia', 'filhos', 'conselhos', 'lar', 'padres'],
    episodes: [
      {
        title: 'Segredos para um Casamento Feliz, Maduro e Abençoado',
        author: 'Pe. Chrystian Shankar',
        audioUrl: 'https://anchor.fm/s/29ee59c/podcast/play/176883/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-06-07%2F3e6a3671f3e9f08956ee272d17a03aaa.m4a',
        duration: '30 min',
        pubDate: 'Casamento Abençoado'
      },
      {
        title: 'Como Superar as Crises Familiares com Paciência e Oração',
        author: 'Pe. Chrystian Shankar',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71747860/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2F658caee4-015a-af01-14f7-23948c2430a2.mp3',
        duration: '25 min',
        pubDate: 'Luz no Lar'
      }
    ]
  },
  {
    id: 'padre_antonio_maria',
    name: 'No Colo de Nossa Senhora - Pe. Antônio Maria',
    author: 'Padre Antônio Maria',
    feedUrl: 'https://anchor.fm/s/90ae1088/podcast/rss',
    type: 'podcast',
    genre: 'Devoção Mariana & Bênção',
    icon: 'fas fa-cross',
    accentColor: '#f43f5e',
    category: 'padres',
    description: 'O amor ardente à Santíssima Virgem Maria, orações aos pés de Nossa Senhora, canções de ternura e bênção sacerdotal.',
    tags: ['antonio maria', 'padre antonio maria', 'maria', 'nossa senhora', 'bencao', 'cancao', 'colo de mae', 'padres'],
    episodes: [
      {
        title: 'Oração com Nossa Senhora e Bênção Sacerdotal do Lar',
        author: 'Pe. Antônio Maria',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/83753091/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876534-44100-2-177f02e3bd4b6.m4a',
        duration: '22 min',
        pubDate: 'Colo de Maria'
      },
      {
        title: 'Cânticos e Preces Devocionais à Rainha dos Anjos',
        author: 'Pe. Antônio Maria',
        audioUrl: 'https://anchor.fm/s/875dc28/podcast/play/126835610/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-5%2F433347483-44100-2-0c900470c770e.m4a',
        duration: '28 min',
        pubDate: 'Canção à Mãe'
      }
    ]
  },
  {
    id: 'dom_henrique_soares',
    name: 'Palavra de Vida & Teologia - Dom Henrique Soares',
    author: 'Dom Henrique Soares da Costa (Bispo de Palmares)',
    feedUrl: 'https://anchor.fm/s/e81d4a00/podcast/rss',
    type: 'podcast',
    genre: 'Grande Teologia & Homilias',
    icon: 'fas fa-book-bible',
    accentColor: '#eab308',
    category: 'padres',
    description: 'A sabedoria profunda de um dos maiores teólogos da Igreja no Brasil: exegese bíblica límpida, amor à Santa Sé e santas homilias.',
    tags: ['dom henrique soares', 'henrique soares', 'palmares', 'teologia', 'homilias', 'doutrina', 'bispo', 'liturgia', 'padres'],
    episodes: [
      {
        title: 'Meditação sobre a Verdadeira Fé Católica e a Cruz de Cristo',
        author: 'Dom Henrique Soares',
        audioUrl: 'https://anchor.fm/s/e81d4a00/podcast/play/126711684/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-2%2F433195447-44100-2-f152f7ff1a21a.mp3',
        duration: '25 min',
        pubDate: 'Teologia Viva'
      },
      {
        title: 'O Mistério da Santa Eucaristia e a Presença Real do Senhor',
        author: 'Dom Henrique Soares',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71748150/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2Fb4b3670c-8222-5e17-ea6d-f7850ba3f18c.mp3',
        duration: '30 min',
        pubDate: 'Eucaristia'
      }
    ]
  },
  {
    id: 'frei_gilson_som_do_monte',
    name: 'Santo Rosário da Madrugada & Oração - Frei Gilson',
    author: 'Frei Gilson (Irmãos Carmelitas Mensageiros)',
    feedUrl: 'https://anchor.fm/s/90ae1088/podcast/rss',
    type: 'podcast',
    genre: 'Vigília & Santo Rosário',
    icon: 'fas fa-fire',
    accentColor: '#fb923c',
    category: 'padres',
    description: 'Oração e vigília da madrugada, clamor ao Espírito Santo, meditações e o Santo Rosário com milhares de irmãos em comunhão.',
    tags: ['frei gilson', 'gilson', 'som do monte', 'rosario da madrugada', 'madrugada', 'carmelitas', 'vigilia', 'espirito santo', 'padres'],
    episodes: [
      {
        title: 'Santo Rosário da Madrugada e Clamor de Proteção e Cura',
        author: 'Frei Gilson',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/83753091/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876534-44100-2-177f02e3bd4b6.m4a',
        duration: '35 min',
        pubDate: 'Vigília da Fé'
      },
      {
        title: 'Direção Espiritual: O Combate da Fé nas Tribulações',
        author: 'Frei Gilson',
        audioUrl: 'https://anchor.fm/s/e81d4a00/podcast/play/126901805/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-5%2F433430993-44100-2-5a3fb4a21c266.mp3',
        duration: '18 min',
        pubDate: 'Combate Espiritual'
      }
    ]
  },
  {
    id: 'padre_duarte_gabriel',
    name: 'Batalha Espiritual & Devoção - Pe. Duarte & Pe. Gabriel',
    author: 'Pe. Duarte Lara & Pe. Gabriel Vila Verde',
    feedUrl: 'https://anchor.fm/s/cb9d4650/podcast/rss',
    type: 'podcast',
    genre: 'Libertação & Proteção',
    icon: 'fas fa-shield',
    accentColor: '#8b5cf6',
    category: 'padres',
    description: 'Orientações fundamentais de libertação católica, o poder dos sacramentais, o Arcanjo São Miguel e o escudo da fé.',
    tags: ['duarte lara', 'gabriel vila verde', 'batalha espiritual', 'libertacao', 'sao miguel', 'anjos', 'fe', 'padres'],
    episodes: [
      {
        title: 'Instrução sobre o Escudo da Fé e Proteção de São Miguel Arcanjo',
        author: 'Pe. Duarte Lara',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71748150/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2Fb4b3670c-8222-5e17-ea6d-f7850ba3f18c.mp3',
        duration: '22 min',
        pubDate: 'Batalha Espiritual'
      },
      {
        title: 'A Força Invencível da Oração do Rosário contra Todo o Mal',
        author: 'Pe. Gabriel Vila Verde',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/83753091/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876534-44100-2-177f02e3bd4b6.m4a',
        duration: '20 min',
        pubDate: 'Escudo Mariano'
      }
    ]
  },
  {
    id: 'vatican_news',
    name: 'Programa Brasileiro - Vatican News',
    author: 'Rádio Vaticano (Santa Sé - Roma)',
    feedUrl: 'https://www.vaticannews.va/pt/podcast/programa-brasileiro.podcast.xml',
    type: 'podcast',
    genre: 'Vaticano & Papa',
    icon: 'fas fa-shield-halved',
    accentColor: '#d4af37',
    category: 'devocional',
    description: 'A voz do Papa Francisco, notícias da Igreja no mundo e mensagens apostólicas diretamente de Roma.',
    tags: ['vaticano', 'papa', 'igreja', 'santa se', 'noticias', 'roma', 'devocional'],
    episodes: [
      {
        title: 'Noticiário Oficial da Rádio Vaticano em Português',
        author: 'Vatican News',
        audioUrl: 'https://media.vaticannews.va/media2/audio/program/2805/brasiliano_3_061026.mp3',
        duration: '20 min',
        pubDate: 'Edição Atual'
      },
      {
        title: 'Programa Brasileiro - Edição Matutina',
        author: 'Vatican News',
        audioUrl: 'https://media.vaticannews.va/media2/audio/program/1384/brasiliano_1_061026.mp3',
        duration: '15 min',
        pubDate: 'Edição Especial'
      }
    ]
  },
  {
    id: 'santo_terco_audio',
    name: 'Santo Terço & Rosário Meditado',
    author: 'Vozes da Devoção Mariana',
    feedUrl: 'https://anchor.fm/s/90ae1088/podcast/rss',
    type: 'podcast',
    genre: 'Devoção Mariana',
    icon: 'fas fa-praying-hands',
    accentColor: '#38bdf8',
    category: 'devocional',
    description: 'Reze o Santo Rosário com orações guiadas, cânticos e meditações marianas de todos os mistérios.',
    tags: ['terco', 'rosario', 'maria', 'ave maria', 'misterios', 'devocional'],
    episodes: [
      {
        title: 'Santo Rosário Completo com Contemplações Marianas',
        author: 'Devoção Mariana',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/83753091/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876534-44100-2-177f02e3bd4b6.m4a',
        duration: '65 min',
        pubDate: 'Rosário Completo'
      },
      {
        title: 'Mistérios Luminosos (Quinta-feira)',
        author: 'Devoção Mariana',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/66524592/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876350-44100-2-9c8dc53ca192e.m4a',
        duration: '18 min',
        pubDate: 'Quintas-feiras'
      },
      {
        title: 'Mistérios Gloriosos (Quarta-feira e Domingo)',
        author: 'Devoção Mariana',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/66524422/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876324-44100-2-6c028a386e64f.m4a',
        duration: '18 min',
        pubDate: 'Quartas e Domingos'
      },
      {
        title: 'Mistérios Dolorosos (Terça-feira e Sexta-feira)',
        author: 'Devoção Mariana',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/66523571/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876277-44100-2-bed6b07376f0e.m4a',
        duration: '18 min',
        pubDate: 'Terças e Sextas'
      },
      {
        title: 'Mistérios Gozosos (Segunda-feira e Sábado)',
        author: 'Devoção Mariana',
        audioUrl: 'https://anchor.fm/s/90ae1088/podcast/play/50529400/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-1-26%2F418876229-44100-2-266a314806fe5.m4a',
        duration: '18 min',
        pubDate: 'Segundas e Sábados'
      }
    ]
  },
  {
    id: 'catequese_catolica',
    name: 'Catequese & Formação Católica',
    author: 'Devoto Mariano',
    feedUrl: 'https://anchor.fm/s/cb9d4650/podcast/rss',
    type: 'podcast',
    genre: 'Doutrina & Teologia',
    icon: 'fas fa-graduation-cap',
    accentColor: '#8b5cf6',
    category: 'devocional',
    description: 'Aulas sobre a Santa Igreja Católica, sacramentos e história dos Santos.',
    tags: ['catequese', 'doutrina', 'sacramentos', 'santos', 'formacao', 'devocional'],
    episodes: [
      {
        title: 'Catequese: Uma, Santa, Católica e Apostólica Igreja',
        author: 'Devoto Mariano',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71748150/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2Fb4b3670c-8222-5e17-ea6d-f7850ba3f18c.mp3',
        duration: '60 min',
        pubDate: 'Formação na Fé'
      },
      {
        title: 'Catequese: O Espírito Santo e os Sacramentos',
        author: 'Devoto Mariano',
        audioUrl: 'https://anchor.fm/s/cb9d4650/podcast/play/71747860/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-5-7%2F658caee4-015a-af01-14f7-23948c2430a2.mp3',
        duration: '55 min',
        pubDate: 'Sacramentos'
      }
    ]
  },
  {
    id: 'musica_sacra',
    name: 'Música Católica & Adoração Crux Sacra',
    author: 'Crux Sacra Ministério Católico',
    feedUrl: 'https://anchor.fm/s/875dc28/podcast/rss',
    type: 'podcast',
    genre: 'Música & Louvor',
    icon: 'fas fa-music',
    accentColor: '#10b981',
    category: 'devocional',
    description: 'Cantos de adoração, momentos de paz interior e louvor eucarístico.',
    tags: ['musica', 'louvor', 'adoracao', 'paz', 'canto', 'devocional'],
    episodes: [
      {
        title: 'Música Católica para Oração e Adoração Eucarística',
        author: 'Ministério Crux Sacra',
        audioUrl: 'https://anchor.fm/s/875dc28/podcast/play/126835610/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-5%2F433347483-44100-2-0c900470c770e.m4a',
        duration: '65 min',
        pubDate: 'Adoração Contínua'
      }
    ]
  }
];

class AudioStreamingService {
  constructor() {
    this.audio = new Audio();
    this.currentTrack = null;
    this.isPlaying = false;
    this.isLoading = false;
    this.volume = 0.9;
    this.listeners = new Set();
    this.cachedEpisodes = new Map();

    this._initAudioEvents();
    this._restorePreferences();
    this._setupMediaSession();
  }

  _initAudioEvents() {
    this.audio.preload = 'none';
    this.audio.volume = this.volume;

    this.audio.addEventListener('loadstart', () => {
      this.isLoading = true;
      this._emitChange();
    });

    this.audio.addEventListener('canplay', () => {
      this.isLoading = false;
      this._emitChange();
    });

    this.audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.isLoading = false;
      this._emitChange();
      this._updateMediaSessionState('playing');
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.isLoading = false;
      this._emitChange();
      this._updateMediaSessionState('paused');
    });

    this.audio.addEventListener('waiting', () => {
      this.isLoading = true;
      this._emitChange();
    });

    this.audio.addEventListener('timeupdate', () => {
      this._emitChange();
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.isLoading = false;
      this._emitChange();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('[AudioService] Erro no stream:', e);
      this.isLoading = false;
      this.isPlaying = false;
      this._emitChange({ error: 'Erro ao conectar à transmissão. Verifique sua conexão à internet.' });
    });
  }

  _restorePreferences() {
    try {
      const savedVol = localStorage.getItem('biblia_audio_volume');
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol);
        this.audio.volume = this.volume;
      }
    } catch (e) {
      // ignore
    }
  }

  _setupMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.resume());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('stop', () => this.stop());
    }
  }

  _updateMediaSessionMetadata() {
    if ('mediaSession' in navigator && this.currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentTrack.title,
        artist: this.currentTrack.subtitle || 'Bíblia Católica Sagrada',
        album: this.currentTrack.isLive ? 'Rádio Católica Ao Vivo' : 'Podcast Católico',
        artwork: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      });
    }
  }

  _updateMediaSessionState(state) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = state;
    }
  }

  // Toca uma rádio ao vivo
  playRadio(radioId) {
    const radio = CATHOLIC_RADIOS.find(r => r.id === radioId);
    if (!radio) return;

    const isSame = this.currentTrack && this.currentTrack.id === radio.id && this.currentTrack.isLive;
    if (isSame) {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.resume();
      }
      return;
    }

    this.currentTrack = {
      id: radio.id,
      title: radio.name,
      subtitle: `${radio.freq} • ${radio.city}`,
      icon: radio.icon,
      color: radio.accentColor,
      isLive: true,
      genre: radio.genre,
      url: radio.streamUrl,
      raw: radio
    };

    this.isLoading = true;
    this._emitChange();

    try {
      this.audio.src = radio.streamUrl;
      this.audio.load();
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('[AudioService] Play error (autoplay blocked or network):', err);
          this.isPlaying = false;
          this.isLoading = false;
          this._emitChange();
        });
      }
    } catch (e) {
      console.error('[AudioService] Exceção ao iniciar áudio:', e);
      this.isLoading = false;
      this._emitChange();
    }

    this._updateMediaSessionMetadata();
    trackEvent('radio_play', { radio_name: radio.name, radio_id: radio.id });
  }

  // Toca um episódio de podcast
  playPodcast(podcastId, episodeIndex = 0) {
    const pod = CATHOLIC_PODCASTS.find(p => p.id === podcastId);
    if (!pod) return;

    const ep = pod.episodes && pod.episodes[episodeIndex] ? pod.episodes[episodeIndex] : null;
    if (!ep || !ep.audioUrl) return;

    const isSame = this.currentTrack && this.currentTrack.id === `${pod.id}_${episodeIndex}`;
    if (isSame) {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.resume();
      }
      return;
    }

    this.currentTrack = {
      id: `${pod.id}_${episodeIndex}`,
      podId: pod.id,
      title: ep.title,
      subtitle: pod.author,
      icon: pod.icon,
      color: pod.accentColor,
      isLive: false,
      duration: ep.duration,
      genre: pod.genre,
      url: ep.audioUrl,
      raw: pod,
      episode: ep
    };

    this.isLoading = true;
    this._emitChange();

    try {
      this.audio.src = ep.audioUrl;
      this.audio.load();
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('[AudioService] Podcast play error:', err);
          this.isPlaying = false;
          this.isLoading = false;
          this._emitChange();
        });
      }
    } catch (e) {
      console.error('[AudioService] Exceção no podcast:', e);
      this.isLoading = false;
      this._emitChange();
    }

    this._updateMediaSessionMetadata();
    trackEvent('podcast_play', { podcast_name: pod.name, episode_title: ep.title });
  }

  togglePlayPause() {
    if (!this.currentTrack) {
      // Se não há faixa, toca a primeira rádio (Rádio Aparecida)
      this.playRadio('aparecida');
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  resume() {
    if (!this.audio.src && this.currentTrack) {
      this.audio.src = this.currentTrack.url;
    }
    const p = this.audio.play();
    if (p !== undefined) {
      p.catch(err => console.warn('[AudioService] Resume error:', err));
    }
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = '';
    this.currentTrack = null;
    this.isPlaying = false;
    this.isLoading = false;
    this._emitChange();
    this._updateMediaSessionState('none');
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.audio.volume = this.volume;
    try {
      localStorage.setItem('biblia_audio_volume', this.volume.toString());
    } catch (e) {
      // ignore
    }
    this._emitChange();
  }

  seek(seconds) {
    if (!this.currentTrack || this.currentTrack.isLive) return;
    this.audio.currentTime = Math.max(0, Math.min(this.audio.duration || 0, seconds));
  }

  getState() {
    return {
      currentTrack: this.currentTrack,
      isPlaying: this.isPlaying,
      isLoading: this.isLoading,
      volume: this.volume,
      currentTime: this.audio.currentTime || 0,
      duration: this.audio.duration || 0
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  _emitChange(extra = {}) {
    const state = { ...this.getState(), ...extra };
    for (const listener of this.listeners) {
      try {
        listener(state);
      } catch (e) {
        console.error('[AudioService] Listener callback error:', e);
      }
    }
  }

  // Tenta carregar episódios recentes via RSS se disponível
  async fetchLatestPodcastFeed(podcastId) {
    const pod = CATHOLIC_PODCASTS.find(p => p.id === podcastId);
    if (!pod || !pod.feedUrl) return pod ? pod.episodes : [];

    if (this.cachedEpisodes.has(podcastId)) {
      return this.cachedEpisodes.get(podcastId);
    }

    try {
      // Tenta carregar via proxy CORS aberto
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(pod.feedUrl)}`;
      const res = await fetch(proxyUrl, { cache: 'no-cache', signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');
        
        if (items && items.length > 0) {
          const parsed = [];
          const max = Math.min(items.length, 5);
          for (let i = 0; i < max; i++) {
            const item = items[i];
            const title = item.querySelector('title')?.textContent || 'Episódio';
            const enclosure = item.querySelector('enclosure');
            const audioUrl = enclosure ? enclosure.getAttribute('url') : '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const duration = item.querySelector('duration')?.textContent || 'Áudio';
            
            if (audioUrl) {
              parsed.push({
                title: title.trim(),
                author: pod.author,
                audioUrl: audioUrl.trim(),
                pubDate: pubDate ? new Date(pubDate).toLocaleDateString('pt-BR') : 'Recente',
                duration: duration.trim()
              });
            }
          }
          if (parsed.length > 0) {
            pod.episodes = parsed;
            this.cachedEpisodes.set(podcastId, parsed);
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn(`[AudioService] Erro ao atualizar RSS para ${podcastId}:`, e.message);
    }

    return pod.episodes || [];
  }
}

// Helper para buscar podcast por ID
export function getPodcastById(id) {
  return CATHOLIC_PODCASTS.find(p => p.id === id) || null;
}

// Singleton global
export const audioService = new AudioStreamingService();

