// SERVIÇO AVANÇADO DE GERAÇÃO DE IMAGENS SACRAS E ARTE BÍBLICA COM INTELIGÊNCIA ARTIFICIAL MULTI-TIER

export const SACRED_AI_STYLES = [
  {
    id: 'renaissance',
    name: '🎨 Renascimento Sacro (Rafael & Caravaggio)',
    suffix: 'masterpiece Catholic sacred art, classical Italian Renaissance oil painting, Caravaggio chiaroscuro, Raphael divine composition, warm holy golden light, rich textures, ultra detailed 8k, museum quality, reverent and solemn'
  },
  {
    id: 'stained_glass',
    name: '🏰 Vitral Gótico de Catedral (Notre-Dame)',
    suffix: 'breathtaking medieval gothic stained glass art, cathedral window, glowing translucent colors, Sainte-Chapelle style, intricate lead line work, radiant heavenly sunlight streaming through sacred glass, luminous gold and ruby red'
  },
  {
    id: 'baroque',
    name: '🖌️ Barroco Sacro Iluminado (Murillo & Rembrandt)',
    suffix: 'dramatic Baroque religious oil painting, deep rich shadows, luminous divine rays, Murillo and Rembrandt holy atmosphere, pious and emotional, gold highlights, fine art masterpiece'
  },
  {
    id: 'realism',
    name: '✨ Realismo Sagrado Cinematográfico (8K)',
    suffix: 'cinematic photorealistic 8k sacred biblical scene, soft divine atmospheric light, ethereal golden glow, holy presence, volumetric dust rays, detailed realism, majestic and awe-inspiring'
  },
  {
    id: 'byzantine',
    name: '📜 Ícone Bizantino & Folha de Ouro',
    suffix: 'ancient holy Byzantine Christian icon, radiant gold leaf background, traditional sacred Christian iconography, ornate halo, mosaic gold texture, reverent Orthodox Catholic sacred art'
  },
  {
    id: 'watercolor',
    name: '🌅 Aquarela Celestial & Luz Suave',
    suffix: 'soft gentle heavenly watercolor painting, ethereal celestial colors, glowing holy illumination, peaceful divine aura, peaceful serene Christian art'
  }
];

export const SACRED_AI_INSPIRATIONS = [
  { label: '🕊️ Espírito Santo', prompt: 'O Espírito Santo em forma de pomba celestial descendo do céu em raios de luz divina dourada e chamas suaves de amor' },
  { label: '🐑 O Bom Pastor', prompt: 'Jesus Cristo como o Bom Pastor em uma colina verdejante segurando uma ovelha com amor e ternura, luz dourada do entardecer' },
  { label: '🌊 Jesus Acalma o Mar', prompt: 'Jesus Cristo em pé no barco acalmando a tempestade e as ondas no Mar da Galileia, paz soberana e luz rompendo as nuvens' },
  { label: '✨ Fiat Lux (Criação)', prompt: 'Deus criando a luz no universo, separando a luz das trevas, cosmos glorioso com esplendor celestial no Gênesis' },
  { label: '🌹 Imaculado Coração', prompt: 'Nossa Senhora com o Imaculado Coração de Maria radiante de graça, manto azul celestial, coroa de estrelas e rosas' },
  { label: '⚔️ São Miguel Arcanjo', prompt: 'São Miguel Arcanjo glorioso com armadura dourada, espada de fogo divino e asas celestiais protegendo o povo de Deus' },
  { label: '🍞 A Última Ceia', prompt: 'A Sagrada Eucaristia com o cálice de ouro transbordando luz celestial, pão sagrado e uvas em mesa iluminada pela graça' },
  { label: '⛰️ Sermão da Montanha', prompt: 'Jesus Cristo ensinando as Bem-Aventuranças sobre uma colina florida da Galileia com uma multidão atenta ao entardecer' },
  { label: '🌟 A Natividade em Belém', prompt: 'O Menino Jesus na manjedoura em Belém, cercado pela Virgem Maria e São José sob a brilhante Estrela do Oriente' },
  { label: '🛡️ Cruz Gloriosa no Monte', prompt: 'A Santa Cruz de Cristo luminosa no topo do monte com o sol nascente ao fundo, símbolo da vitória e redenção' },
  { label: '👣 Andando sobre as Águas', prompt: 'Jesus Cristo caminhando sobre as águas do mar e estendendo a mão para salvar Pedro' },
  { label: '🌊 Moisés no Mar Vermelho', prompt: 'Moisés erguendo o cajado e abrindo as águas do Mar Vermelho sob nuvens e fogo divino' },
  { label: '🦁 Daniel na Cova dos Leões', prompt: 'Daniel em oração serena cercado de leões mansos dentro da cova iluminada por luz celestial' },
  { label: '🌈 A Arca de Noé', prompt: 'A Arca de Noé pousada no Monte Ararate com o arco-íris resplandecente no céu e a pomba da paz' },
  { label: '👑 Ressurreição de Jesus', prompt: 'A gloriosa Ressurreição de Jesus Cristo saindo vitorioso do sepulcro aberto em luz celestial' }
];

// REGRAS SEMÂNTICAS DE CENAS BÍBLICAS ESPECÍFICAS
export const SACRED_SCENE_RULES = [
  // 1. Jesus acalmando a tempestade
  {
    id: 'calm_storm',
    regex: /(acalma|tempestade|barco.*mar|mar.*galileia|ondas.*vento|vento.*mar|socorre.*afundando|mar.*tempestuoso)/i,
    build: () => 'Jesus Christ standing majestically in a wooden fishing boat on the stormy Sea of Galilee, raising His hand with divine authority commanding the violent raging waves and tempest to be still, dramatic storm clouds parting with golden celestial sunlight breaking through, disciples looking in reverent awe',
    palette: ['#0B1B3D', '#1A365D', '#D4AF37', '#E2E8F0', '#0F172A'],
    title: 'Jesus Acalma a Tempestade'
  },
  // 2. Jesus andando sobre as águas
  {
    id: 'walk_water',
    regex: /(andando sobre as [aá]guas|caminha(r|ndo)? sobre (as )?[aá]guas|pedro.*afundando|salva-me.*senhor|homem de pouca f[eé]|mar.*noite.*jesus|salvar pedro)/i,
    build: () => 'Jesus Christ walking serenely on the surface of the dark stormy sea, extending His luminous hand to rescue Saint Peter from the waves, divine glowing golden halo, majestic celestial moonlight and ocean spray',
    palette: ['#051923', '#003554', '#006494', '#E8C98A', '#051923'],
    title: 'Jesus Anda Sobre as Águas'
  },
  // 3. O Bom Pastor / Salmo 23
  {
    id: 'good_shepherd',
    regex: /(bom pastor|ovelha|pastoreia|salmo\s*23|pastor.*nada|verdes prados|[aá]guas tranquilas|[aá]guas de repouso|rebanho)/i,
    build: () => 'Jesus Christ as the Good Shepherd in flowing holy robes, tenderly cradling a gentle white lamb in His arms, walking through lush green biblical pastures with a peaceful flowing crystal stream, rolling Galilean hills, warm golden hour sunlight, divine halo',
    palette: ['#1E3F20', '#2D5A27', '#D4A853', '#F5E6C8', '#0F2410'],
    title: 'O Bom Pastor'
  },
  // 4. Moisés abrindo o Mar Vermelho
  {
    id: 'red_sea',
    regex: /(mar vermelho|abriu o mar|partir o mar|moises.*mar|mois[eé]s.*cajado|[eê]xodo 14|travessia do mar)/i,
    build: () => 'Moses with glowing white beard holding his wooden staff aloft, miraculously parting the towering walls of the Red Sea, illuminated dry seabed pathway, dramatic pillar of celestial fire, towering churning ocean walls, awe-inspiring biblical Exodus narrative',
    palette: ['#4A1525', '#1B3A4B', '#E8B923', '#E0FBFC', '#210912'],
    title: 'Abertura do Mar Vermelho'
  },
  // 5. Arca de Noé / Dilúvio
  {
    id: 'noah_ark',
    regex: /(arca de no[eé]|dil[uú]vio|ararate|no[eé].*animais|g[eê]nesis 6|g[eê]nesis 7|g[eê]nesis 8|monte ararate)/i,
    build: () => 'Noah\'s Ark ancient wooden ship resting on the mountains of Ararat after the great flood, pairs of diverse animals descending peacefully, brilliant radiant rainbow glowing across dramatic celestial sky, white dove holding green olive branch',
    palette: ['#1C3144', '#3F88C5', '#F49D37', '#A2D2FF', '#0D1B2A'],
    title: 'A Arca de Noé'
  },
  // 6. A Criação / Fiat Lux / Gênesis 1
  {
    id: 'creation',
    regex: /(cria[cç][aã]o|fiat lux|g[eê]nesis 1|fa[cç]a-se a luz|haja luz|luz das trevas|universo.*deus|no princ[ií]pio criou deus)/i,
    build: () => 'The Creation of the Universe, God creating celestial light separating light from darkness in the cosmic deep, luminous glowing stars, planets and swirling galaxies forming, majestic divine golden rays of Fiat Lux, sacred Genesis',
    palette: ['#03071E', '#370617', '#9D0208', '#FFBA08', '#000000'],
    title: 'A Criação do Mundo'
  },
  // 7. A Última Ceia / Eucaristia
  {
    id: 'last_supper',
    regex: /(ceia|[uú]ltima ceia|eucaristia|sagrada comunh[aã]o|p[aã]o e vinho|c[aá]lice|este [eé] o meu corpo|sangue da nova alian[cç]a|ostens[oó]rio|h[oó]stia|sant[ií]ssimo sacramento)/i,
    build: () => 'Jesus Christ at the Last Supper table with the twelve Apostles, elevating the sacred unleavened bread and golden chalice of wine with heavenly light radiating from His holy hands, warm reverent candlelight, sacred communion',
    palette: ['#3A0E16', '#581825', '#D4AF37', '#FCEADE', '#1B0509'],
    title: 'A Sagrada Eucaristia'
  },
  // 8. São Miguel Arcanjo
  {
    id: 'st_michael',
    regex: /(s[aã]o miguel|arcanjo miguel|quem como deus|derrotando o drag[aã]o|espada de fogo|arcanjo.*armadura|batalha celestial)/i,
    build: () => 'Archangel Saint Michael in radiant ornate golden armor with majestic feathered wings, holding a glowing blazing sword of holy fire, standing triumphant over darkness, celestial divine light beams shining from heaven, heroic and sacred',
    palette: ['#1F1A3A', '#483C7E', '#E8C98A', '#FF5A36', '#0E0B1A'],
    title: 'São Miguel Arcanjo'
  },
  // 9. A Natividade / Menino Jesus / Belém
  {
    id: 'nativity',
    regex: /(natividade|nascimento de jesus|menino jesus|pres[eé]pio|bel[eé]m|estrela do oriente|s[aã]o jos[eé].*maria.*manjedoura|noite feliz|menino na manjedoura)/i,
    build: () => 'The Holy Nativity in Bethlehem, baby Jesus asleep in the humble manger radiant with divine light, Virgin Mary and Saint Joseph looking down with tender love, shining Star of Bethlehem glowing above the stable, peaceful adoration',
    palette: ['#18233C', '#283B66', '#E9C46A', '#F4A261', '#0B111E'],
    title: 'A Natividade em Belém'
  },
  // 10. Ressurreição de Jesus / Sepulcro Vazio
  {
    id: 'resurrection',
    regex: /(ressurrei[cç][aã]o|t[uú]mulo vazio|sepulcro vazio|ressuscitou|ele vive|vit[oó]ria sobre a morte|domingo de p[aá]scoa|ressurreic[aã]o)/i,
    build: () => 'The Glorious Resurrection of Jesus Christ, triumphant Christ clothed in radiant blinding white and gold rising from the open stone tomb, holding the banner of victory, angelic light, Roman guards in awe, dawn golden morning light',
    palette: ['#2B1B17', '#6E473B', '#F5DFBB', '#FFE494', '#140C0A'],
    title: 'A Gloriosa Ressurreição'
  },
  // 11. Imaculado Coração de Maria / Virgem Maria
  {
    id: 'immaculate_heart',
    regex: /(imaculado cora[cç][aã]o|nossa senhora|virgem maria|m[aã]e de deus|aparecida|f[aá]tima|guadalupe|lourdes|ave maria|rainha do c[eé]u)/i,
    build: () => 'The Blessed Virgin Mary Queen of Heaven in celestial blue and radiant white mantle, gentle loving motherly gaze, golden halo of twelve stars, surrounded by white roses and soft divine light rays',
    palette: ['#0A2463', '#1E3888', '#F5E6C8', '#D8315B', '#04102B'],
    title: 'Imaculado Coração de Maria'
  },
  // 12. Sagrado Coração de Jesus / Misericórdia
  {
    id: 'sacred_heart',
    regex: /(sagrado cora[cç][aã]o|cora[cç][aã]o de jesus|miseric[oó]rdia divina|jesus misericordioso|raios da miseric[oó]rdia)/i,
    build: () => 'The Sacred Heart of Jesus Christ with glowing flames and crown of thorns, gentle hand raised in blessing, compassionate divine gaze, rays of red and pale light radiating from His heart',
    palette: ['#38040E', '#640D14', '#D4AF37', '#FFCCD5', '#190005'],
    title: 'Sagrado Coração de Jesus'
  },
  // 13. Pentecostes / Espírito Santo
  {
    id: 'pentecost',
    regex: /(pentecostes|esp[ií]rito santo|pomba celestial|l[ií]nguas de fogo|cen[aá]culo|dons do esp[ií]rito|par[aá]clito)/i,
    build: () => 'The Holy Spirit descending as a glowing white dove surrounded by seven rays of golden light and gentle divine flames, Pentecost upper room with apostles, heavenly illumination',
    palette: ['#300C12', '#7A1C29', '#E09F3E', '#FFF3B0', '#150407'],
    title: 'O Espírito Santo'
  },
  // 14. Anunciação
  {
    id: 'annunciation',
    regex: /(anuncia[cç][aã]o|anjo gabriel|arcanjo gabriel|fa[cç]a-se em mim|eis a serva|anuncia[cç]ao)/i,
    build: () => 'The Annunciation, Archangel Gabriel with golden wings appearing before kneeling Virgin Mary with white lilies, Holy Spirit dove in divine light, intimate holy revelation',
    palette: ['#1A2536', '#2F4858', '#E5C687', '#F6F7F8', '#0D131C'],
    title: 'A Anunciação do Senhor'
  },
  // 15. Crucificação / Calvário / Cruz
  {
    id: 'crucifixion',
    regex: /(crucifica[cç][aã]o|na cruz|monte calv[aá]rio|g[oó]lgota|santa cruz|paix[aã]o de cristo|consumado est[aá]|cruz de cristo)/i,
    build: () => 'Jesus Christ on the Holy Cross at Mount Calvary, heavenly light breaking through dark storm clouds, sacred solemn redemption, reverent and profound',
    palette: ['#1F161A', '#38262E', '#D4A853', '#F3E9DC', '#100B0D'],
    title: 'A Santa Cruz Redentora'
  },
  // 16. Davi e Golias
  {
    id: 'david_goliath',
    regex: /(davi.*golias|golias|funda.*pedra|gigante filisteu|davi.*pastor)/i,
    build: () => 'Young David holding sling and stone facing giant Goliath in the Valley of Elah, dramatic ancient biblical battlefield, golden light of faith',
    palette: ['#283618', '#606C38', '#DDA15E', '#FEFAE0', '#141B0C'],
    title: 'Davi e Golias'
  },
  // 17. Daniel na Cova dos Leões
  {
    id: 'daniel_lions',
    regex: /(daniel.*le[oõ]es|cova dos le[oõ]es|le[aã]o.*daniel)/i,
    build: () => 'Daniel in the Lions\' Den, kneeling in peaceful prayer unharmed among resting majestic lions, beam of celestial divine light shining from above',
    palette: ['#291D13', '#5E432C', '#D4A373', '#FAEDCD', '#140E09'],
    title: 'Daniel na Cova dos Leões'
  },
  // 18. Sermão da Montanha / Bem-Aventuranças
  {
    id: 'sermon_mount',
    regex: /(serm[aã]o da montanha|bem-aventurados|colina.*galileia|mateus 5|ensinando a multid[aã]o)/i,
    build: () => 'Jesus Christ delivering the Sermon on the Mount, teaching the disciples and multitude on a wildflower hillside overlooking the Sea of Galilee, soft morning sunlight',
    palette: ['#1C3127', '#2E5339', '#E9C46A', '#F4F1DE', '#0E1914'],
    title: 'O Sermão da Montanha'
  },
  // 19. São José e o Menino Jesus
  {
    id: 'st_joseph',
    regex: /(s[aã]o jos[eé]|jos[eé] oper[aá]rio|carpintaria.*jesus|pai adotivo|jos[eé].*menino)/i,
    build: () => 'Saint Joseph holding infant Jesus with fatherly love and holding a flowering white lily staff, warm carpenter workshop light with sunbeams and wood shavings',
    palette: ['#2E1C14', '#593822', '#DDB892', '#FFF1E6', '#170E0A'],
    title: 'São José com o Menino Jesus'
  },
  // 20. O Verbo Divino / Prólogo de São João
  {
    id: 'logos',
    regex: /(no princ[ií]pio era o verbo|o verbo se fez carne|o verbo estava com deus|jo[aã]o 1,?\s*1|luz resplandece nas trevas)/i,
    build: () => 'Jesus Christ as the Divine Logos and Eternal Word of God, radiant in heavenly celestial glory, open Holy Scripture with golden letters of light, surrounded by the cosmic creation and angelic choir',
    palette: ['#0A1128', '#1C2541', '#E8C98A', '#FFFFFF', '#050814'],
    title: 'O Verbo Divino'
  },
  // 21. Força e Vitória / Filipenses 4:13
  {
    id: 'strength',
    regex: /(tudo posso naquele que me fortalece|filipenses 4,?\s*13|minha for[cç]a [eé] o senhor|o senhor [eé] meu ref[uú]gio|escudo e prote[cç][aã]o)/i,
    build: () => 'Jesus Christ standing in radiant triumph with open arms radiating celestial strength, peace, courage and divine golden light, dark storm clouds parting to reveal glowing heavenly sun',
    palette: ['#18233C', '#283B66', '#E9C46A', '#F4A261', '#0B111E'],
    title: 'Tudo Posso Naquele que me Fortalece'
  }
];

// DICIONÁRIO COMPLETO PORTUGUÊS -> INGLÊS BÍBLICO E VISUAL
export const PT_TO_EN_DICTIONARY = [
  [/\bjesus( cristo)?\b/gi, 'Jesus Christ'],
  [/\bsenhor\b/gi, 'Lord'],
  [/\bdeus\b/gi, 'God'],
  [/\bpai\b/gi, 'Father'],
  [/\bfilho\b/gi, 'Son'],
  [/\besp[ií]rito santo\b/gi, 'Holy Spirit'],
  [/\bvirgem maria\b/gi, 'Virgin Mary'],
  [/\bnossa senhora\b/gi, 'Our Lady the Virgin Mary'],
  [/\bm[aã]e de deus\b/gi, 'Mother of God'],
  [/\bs[aã]o jos[eé]\b/gi, 'Saint Joseph'],
  [/\bs[aã]o pedro\b/gi, 'Saint Peter'],
  [/\bs[aã]o paulo\b/gi, 'Saint Paul'],
  [/\bs[aã]o jo[aã]o\b/gi, 'Saint John the Apostle'],
  [/\bs[aã]o jo[aã]o batista\b/gi, 'Saint John the Baptist'],
  [/\bs[aã]o miguel( arcanjo)?\b/gi, 'Archangel Saint Michael'],
  [/\bs[aã]o rafael\b/gi, 'Archangel Saint Raphael'],
  [/\bs[aã]o gabriel\b/gi, 'Archangel Saint Gabriel'],
  [/\barcanjo(s)?\b/gi, 'archangel(s)'],
  [/\banjo(s)?\b/gi, 'angel(s)'],
  [/\bprofeta(s)?\b/gi, 'prophet(s)'],
  [/\bap[oó]stolo(s)?\b/gi, 'apostle(s)'],
  [/\bdisc[ií]pulo(s)?\b/gi, 'disciple(s)'],
  [/\bmultid[aã]o\b/gi, 'multitude crowd'],
  [/\bpatriarca(s)?\b/gi, 'patriarch(s)'],
  [/\bmois[eé]s\b/gi, 'Moses'],
  [/\bno[eé]\b/gi, 'Noah'],
  [/\babra[aã]o\b/gi, 'Abraham'],
  [/\bisaque\b/gi, 'Isaac'],
  [/\bjac[oó]\b/gi, 'Jacob'],
  [/\bj[oó]\b/gi, 'Job'],
  [/\bdavi\b/gi, 'David'],
  [/\bsalom[aã]o\b/gi, 'Solomon'],
  [/\belias\b/gi, 'Elijah'],
  [/\beliseu\b/gi, 'Elisha'],
  [/\bisa[ií]as\b/gi, 'Isaiah'],
  [/\bjeremias\b/gi, 'Jeremiah'],
  [/\bezequiel\b/gi, 'Ezekiel'],
  [/\bdaniel\b/gi, 'Daniel'],
  [/\bjonas\b/gi, 'Jonah'],
  [/\bsamaritana\b/gi, 'Samaritan woman'],
  [/\bl[aá]zaro\b/gi, 'Lazarus'],
  [/\bmadalena\b/gi, 'Mary Magdalene'],
  [/\bpastor\b/gi, 'shepherd'],
  [/\bovelha(s)?\b/gi, 'sheep'],
  [/\bcordeiro\b/gi, 'lamb'],
  [/\ble[aã]o\b/gi, 'lion'],
  [/\bpomba\b/gi, 'dove'],
  [/\bpeixe(s)?\b/gi, 'fish'],
  [/\bserpente\b/gi, 'serpent'],

  [/\bbel[eé]m\b/gi, 'Bethlehem'],
  [/\bnazar[eé]\b/gi, 'Nazareth'],
  [/\bjerusal[eé]m\b/gi, 'Jerusalem'],
  [/\bgalil[eé]ia\b/gi, 'Galilee'],
  [/\bcalv[aá]rio\b/gi, 'Calvary'],
  [/\bg[oó]lgota\b/gi, 'Golgotha'],
  [/\bjord[aã]o\b/gi, 'Jordan river'],
  [/\brio\b/gi, 'river'],
  [/\bmar\b/gi, 'sea'],
  [/\bmontanha\b/gi, 'mountain'],
  [/\bmonte\b/gi, 'mount'],
  [/\bcolina\b/gi, 'hill'],
  [/\bdeserto\b/gi, 'desert'],
  [/\bc[eé]u\b/gi, 'heaven'],
  [/\bc[eé]us\b/gi, 'heavens'],
  [/\btemplo\b/gi, 'temple'],
  [/\bigreja\b/gi, 'church cathedral'],
  [/\bcidade\b/gi, 'city'],
  [/\bcaminho\b/gi, 'path'],
  [/\bpo[cç]o\b/gi, 'well'],
  [/\bjardim\b/gi, 'garden'],
  [/\b[eé]den\b/gi, 'Eden'],
  [/\bcova\b/gi, 'den'],
  [/\bsepulcro\b/gi, 'tomb'],
  [/\bt[uú]mulo\b/gi, 'tomb'],
  [/\bmanjedoura\b/gi, 'manger'],
  [/\best[aá]bulo\b/gi, 'stable'],
  [/\bbarco\b/gi, 'boat'],
  [/\bnavio\b/gi, 'ship'],
  [/\barca\b/gi, 'ark'],

  [/\bcruz\b/gi, 'holy cross'],
  [/\bc[aá]lice\b/gi, 'golden chalice'],
  [/\bp[aã]o\b/gi, 'bread'],
  [/\bvinho\b/gi, 'wine'],
  [/\bostens[oó]rio\b/gi, 'monstrance'],
  [/\bh[oó]stia\b/gi, 'sacred host'],
  [/\bvela(s)?\b/gi, 'candle(s)'],
  [/\bcajado\b/gi, 'staff'],
  [/\bespada\b/gi, 'sword'],
  [/\barmadura\b/gi, 'armor'],
  [/\bcoroa\b/gi, 'crown'],
  [/\bespinhos\b/gi, 'thorns'],
  [/\bestrela\b/gi, 'star'],
  [/\bl[ií]rio(s)?\b/gi, 'lily flowers'],
  [/\brosa(s)?\b/gi, 'roses'],
  [/\bflor(es)?\b/gi, 'flowers'],
  [/\b[aá]rvore\b/gi, 'tree'],
  [/\blivro\b/gi, 'book bible'],
  [/\bb[ií]blia\b/gi, 'Holy Bible'],
  [/\bpedra\b/gi, 'stone'],
  [/\bt[aá]buas\b/gi, 'stone tablets'],
  [/\bmanto\b/gi, 'robe mantle'],
  [/\bvestes\b/gi, 'robes'],
  [/\basi(nh)?as\b/gi, 'wings'],

  [/\bcura(ndo)?\b/gi, 'healing'],
  [/\borando\b/gi, 'praying'],
  [/\bora[cç][aã]o\b/gi, 'prayer'],
  [/\baben[cç]oando\b/gi, 'blessing'],
  [/\baben[cç]oado\b/gi, 'blessed'],
  [/\bensinando\b/gi, 'teaching'],
  [/\bpregando\b/gi, 'preaching'],
  [/\bcaminhando\b/gi, 'walking'],
  [/\bandando\b/gi, 'walking'],
  [/\bvoando\b/gi, 'flying'],
  [/\bdescendo\b/gi, 'descending'],
  [/\bsubindo\b/gi, 'ascending'],
  [/\bressuscitando\b/gi, 'resurrecting'],
  [/\bluz\b/gi, 'divine light'],
  [/\bfogo\b/gi, 'holy fire'],
  [/\bchama(s)?\b/gi, 'flames'],
  [/\braios\b/gi, 'rays of light'],
  [/\baura\b/gi, 'golden halo aura'],
  [/\bhalo\b/gi, 'radiant halo'],
  [/\bgl[oó]ria\b/gi, 'glory'],
  [/\bpaz\b/gi, 'peace'],
  [/\bamor\b/gi, 'love'],
  [/\bvit[oó]ria\b/gi, 'victory'],
  [/\bmilagre\b/gi, 'miracle'],
  [/\btempestade\b/gi, 'raging tempest storm'],
  [/\bonda(s)?\b/gi, 'waves'],
  [/\bvento\b/gi, 'wind'],
  [/\bnuvem\b/gi, 'clouds'],
  [/\bnuvens\b/gi, 'clouds'],
  [/\bnoite\b/gi, 'night'],
  [/\bdia\b/gi, 'day'],
  [/\bentardecer\b/gi, 'golden sunset'],
  [/\bamanhecer\b/gi, 'dawn sunrise'],
  [/\bdourad[oa]\b/gi, 'golden'],
  [/\bcelestial\b/gi, 'heavenly celestial'],
  [/\bdivin[oa]\b/gi, 'divine'],
  [/\bsagradas?\b/gi, 'sacred'],
  [/\bsant[oa]s?\b/gi, 'holy'],
  [/\bluminos[oa]\b/gi, 'radiant luminous'],
  [/\bbrilhante\b/gi, 'brilliant shining'],
  [/\bcrian[cç]a(s)?\b/gi, 'children'],
  [/\bhomem\b/gi, 'man'],
  [/\bmulher\b/gi, 'woman'],
  [/\bjovem\b/gi, 'young'],
  [/\bvelho\b/gi, 'elder'],
  [/\bidoso\b/gi, 'elder'],
  [/\bforte\b/gi, 'strong powerful'],
  [/\bhumilde\b/gi, 'humble'],
  [/\bcom\b/gi, 'with'],
  [/\bde\b/gi, 'of'],
  [/\bem\b/gi, 'in'],
  [/\bsobre\b/gi, 'upon'],
  [/\bpara\b/gi, 'for'],
  [/\be\b/gi, 'and']
];

const DYNAMIC_ATMOSPHERE_VARIATIONS = [
  'dramatic celestial golden light breaking through clouds, volumetric holy sunbeams, solemn sacred presence',
  'divine golden hour illumination, warm holy glow, gentle heavenly aura, serene and majestic sacred art',
  'radiant heavenly dawn with soft ethereal glow, celestial rays, transcendent peace, masterpiece composition',
  'sublime heavenly luminescence, deep rich chiaroscuro shadows, pious atmosphere, museum quality fine art',
  'glorious heavenly aura, vibrant sacred colors, spiritual transcendence, profound reverence, timeless masterpiece'
];

function getRandomAtmosphereVariation() {
  const idx = Math.floor(Math.random() * DYNAMIC_ATMOSPHERE_VARIATIONS.length);
  return DYNAMIC_ATMOSPHERE_VARIATIONS[idx];
}

/**
 * Traduz e enriquece um prompt em português para uma cena visual detalhada em inglês.
 */
export function buildSacredVisualPrompt(userPrompt, options = {}, style = SACRED_AI_STYLES[0]) {
  const rawPrompt = (userPrompt || '').trim();
  const verseText = (options.verseText || '').trim();
  const bookRef = (options.bookRef || '').trim();
  const atmosphere = getRandomAtmosphereVariation();

  // 1. PRIORIDADE MÁXIMA: Se o usuário forneceu um prompt explícito
  if (rawPrompt) {
    for (const rule of SACRED_SCENE_RULES) {
      if (rule.regex.test(rawPrompt)) {
        const scene = rule.build(options);
        return `${scene}, ${atmosphere}, ${style.suffix}, highly detailed sacred art, 8k, flawless composition, pious Catholic devotion, no modern elements, no watermark, no text`;
      }
    }

    let customTranslated = rawPrompt;
    customTranslated = customTranslated.replace(/^Cena\s+(sagrada\s+)?b[ií]blica\s+(de|inspirada\s+em)?\s*/i, '');
    customTranslated = customTranslated.replace(/^(imagem|card|pintura|arte|desenho)\s+(de|sobre)?\s*/i, '');
    customTranslated = customTranslated.replace(/^[“”"']/g, '').replace(/[“”"']$/g, '');

    for (const [pattern, replacement] of PT_TO_EN_DICTIONARY) {
      customTranslated = customTranslated.replace(pattern, replacement);
    }

    return `${customTranslated}, sacred biblical scene, ${atmosphere}, ${style.suffix}, glorious heavenly atmosphere, divine golden aura, pious reverent fine art, highly detailed, 8k resolution, no modern text, no watermark`;
  }

  // 2. SE O PROMPT ESTIVER VAZIO: Inspecionar o versículo ou referência bíblica
  if (verseText || bookRef) {
    const verseToInspect = `${verseText} ${bookRef}`;
    for (const rule of SACRED_SCENE_RULES) {
      if (rule.regex.test(verseToInspect)) {
        const scene = rule.build(options);
        return `${scene}, ${atmosphere}, ${style.suffix}, highly detailed sacred art, 8k, flawless composition, pious Catholic devotion, no modern elements, no watermark, no text`;
      }
    }

    let translatedVerse = verseText;
    for (const [pattern, replacement] of PT_TO_EN_DICTIONARY) {
      translatedVerse = translatedVerse.replace(pattern, replacement);
    }

    const subject = translatedVerse ? `Sacred biblical narrative of ${translatedVerse}` : (bookRef ? `Biblical scene inspired by ${bookRef}` : 'Divine heavenly light shining upon the Holy Bible and the Cross of Christ');
    return `${subject}, sacred biblical scene, ${atmosphere}, ${style.suffix}, glorious heavenly atmosphere, divine golden aura, pious reverent fine art, highly detailed, 8k resolution, no modern text, no watermark`;
  }

  // 3. Fallback Padrão Sagrado
  return `Divine heavenly light shining upon the Holy Bible and the Holy Cross of Christ, ${atmosphere}, ${style.suffix}, glorious heavenly atmosphere, divine golden aura, pious reverent fine art, highly detailed, 8k resolution, no modern text, no watermark`;
}

/**
 * Gera uma imagem bíblica sacra de alta definição com IA com múltiplos níveis de contingência.
 * @param {string} userPrompt - Descrição do tema bíblico ou citação
 * @param {string} styleId - ID do estilo artístico
 * @param {object} options - Opções (width, height, verseText, bookRef)
 * @returns {Promise<string>} Data URL base64 da imagem gerada
 */
export async function generateSacredAIImage(userPrompt, styleId = 'renaissance', options = {}) {
  const width = options.width || 1080;
  const height = options.height || 1080;
  const seed = Math.floor(Math.random() * 900000000) + 100000;
  const timestamp = Date.now();

  const style = SACRED_AI_STYLES.find(s => s.id === styleId) || SACRED_AI_STYLES[0];
  const visualPrompt = buildSacredVisualPrompt(userPrompt, options, style);
  const encodedPrompt = encodeURIComponent(visualPrompt);

  console.log('[SacredAI] Solicitando arte sacra (Seed:', seed, '):', visualPrompt);

  // === TIER 1: PUTER.JS AI ENGINE (Nativo no navegador com Flux / SD) ===
  if (typeof window !== 'undefined' && window.puter && window.puter.ai && typeof window.puter.ai.txt2img === 'function') {
    try {
      console.log('[SacredAI] Tentando Tier 1 (Puter.js Flux AI)...');
      const puterPromise = window.puter.ai.txt2img(visualPrompt, { model: 'flux' });
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Puter AI timeout')), 14000));
      
      const imgResult = await Promise.race([puterPromise, timeoutPromise]);
      if (imgResult && imgResult.src) {
        console.log('[SacredAI] Imagem gerada com sucesso via Puter AI!');
        return imgResult.src;
      }
    } catch (puterErr) {
      console.warn('[SacredAI] Puter AI indisponível ou timeout:', puterErr.message);
    }
  }

  // === TIER 2: POLLINATIONS CLOUD ENDPOINTS (com timeout rápido de 7s por nó) ===
  const cloudEndpoints = [
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&model=turbo&seed=${seed}&nologo=true&enhance=false&_t=${timestamp}`,
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${seed}&nologo=true&_t=${timestamp}`
  ];

  for (const url of cloudEndpoints) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);

    try {
      console.log('[SacredAI] Tentando Tier 2 Cloud:', url);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.startsWith('image/')) {
          const blob = await response.blob();
          if (blob && blob.size > 2000) {
            console.log('[SacredAI] Imagem gerada com sucesso via Cloud!');
            return await blobToDataURL(blob);
          }
        }
      }
    } catch (cloudErr) {
      clearTimeout(timer);
      console.warn('[SacredAI] Cloud Endpoint falhou:', cloudErr.message);
    }
  }

  // === TIER 3: MOTOR SACRO PROCEDURAL DINÂMICO DE ALTA FIDELIDADE (ZERO FALHAS) ===
  console.log('[SacredAI] Ativando Tier 3 (Motor Procedural de Arte Sacra HD)...');
  return renderProceduralSacredMasterpiece(userPrompt, options, style);
}

/**
 * Renderiza uma obra de arte sacra proceduralmente no Canvas com harmonia estética sublime,
 * garantindo que uma imagem exclusiva e tematicamente perfeita seja gerada em qualquer circunstância.
 */
export function renderProceduralSacredMasterpiece(userPrompt, options = {}, style = SACRED_AI_STYLES[0]) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  const w = 1080;
  const h = 1080;

  const rawPrompt = (userPrompt || options.verseText || '').trim();
  let matchedRule = SACRED_SCENE_RULES[0];
  for (const rule of SACRED_SCENE_RULES) {
    if (rule.regex.test(rawPrompt)) {
      matchedRule = rule;
      break;
    }
  }

  const p = matchedRule.palette;
  const randomShift = Math.random() * 40 - 20;

  // 1. Fundo Gradiente Atmosférico Rico
  const bgGrad = ctx.createRadialGradient(w / 2, h * 0.42, 60, w / 2, h * 0.5, w * 0.85);
  bgGrad.addColorStop(0, p[1]);
  bgGrad.addColorStop(0.45, p[0]);
  bgGrad.addColorStop(1, p[4] || '#080406');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Raios Celestiais Volumétricos (God Rays)
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const raysCount = 14;
  for (let i = 0; i < raysCount; i++) {
    const angle = ((i - raysCount / 2) / raysCount) * 1.3 + (randomShift * 0.01);
    const rayGrad = ctx.createLinearGradient(w / 2, 0, w / 2 + Math.sin(angle) * w, h);
    rayGrad.addColorStop(0, 'rgba(232, 201, 138, 0.4)');
    rayGrad.addColorStop(0.5, 'rgba(212, 168, 83, 0.12)');
    rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = rayGrad;
    ctx.beginPath();
    ctx.moveTo(w / 2, 60);
    ctx.lineTo(w / 2 + Math.tan(angle - 0.08) * h, h);
    ctx.lineTo(w / 2 + Math.tan(angle + 0.08) * h, h);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // 3. Aura e Halo Sagrado Central
  ctx.save();
  const auraGrad = ctx.createRadialGradient(w / 2, h * 0.42, 40, w / 2, h * 0.42, 340);
  auraGrad.addColorStop(0, 'rgba(255, 240, 200, 0.65)');
  auraGrad.addColorStop(0.35, 'rgba(212, 168, 83, 0.35)');
  auraGrad.addColorStop(0.7, 'rgba(180, 120, 40, 0.12)');
  auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.42, 340, 0, Math.PI * 2);
  ctx.fill();

  // Halo Dourado Ornato
  ctx.strokeStyle = 'rgba(232, 201, 138, 0.55)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.42, 220, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(212, 168, 83, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.42, 240, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 4. Ícone / Símbolo Sacro Central Majestoso
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#F5E6C8';
  ctx.font = '160px "Cinzel", serif, sans-serif';
  try {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 24;
  } catch (e) {}

  let iconSymbol = '✝';
  if (matchedRule.id === 'good_shepherd') iconSymbol = '🐑';
  else if (matchedRule.id === 'calm_storm' || matchedRule.id === 'walk_water') iconSymbol = '🌊';
  else if (matchedRule.id === 'immaculate_heart') iconSymbol = '🌹';
  else if (matchedRule.id === 'sacred_heart') iconSymbol = '❤️‍🔥';
  else if (matchedRule.id === 'st_michael') iconSymbol = '⚔️';
  else if (matchedRule.id === 'creation') iconSymbol = '✨';
  else if (matchedRule.id === 'last_supper') iconSymbol = '🍞';
  else if (matchedRule.id === 'nativity') iconSymbol = '⭐';
  else if (matchedRule.id === 'resurrection') iconSymbol = '👑';
  else if (matchedRule.id === 'pentecost') iconSymbol = '🕊️';
  else if (matchedRule.id === 'noah_ark') iconSymbol = '🌈';

  ctx.fillText(iconSymbol, w / 2, h * 0.42);
  ctx.restore();

  // 5. Título da Cena Sacra Pintada
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'bold 36px "Cinzel", serif';
  ctx.fillStyle = '#E8C98A';
  try {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 16;
  } catch (e) {}
  ctx.fillText(matchedRule.title.toUpperCase(), w / 2, h * 0.62);

  // Subtítulo do Estilo Artístico
  ctx.font = 'italic 22px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#F5E6C8';
  ctx.fillText(`“${style.name.replace(/^[^\s]+\s*/, '')}”`, w / 2, h * 0.665);
  ctx.restore();

  // 6. Textura de Pintura a Óleo / Vitral
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = 'rgba(212, 168, 83, 0.08)';
  for (let i = 0; i < 40; i++) {
    const rx = Math.random() * w;
    const ry = Math.random() * h;
    const rw = Math.random() * 200 + 50;
    const rh = Math.random() * 200 + 50;
    ctx.fillRect(rx, ry, rw, rh);
  }
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.92);
}

/**
 * Converte um Blob em Base64 Data URL para armazenamento persistente
 */
export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Compõe um Card Sagrado sofisticado sobrepondo o versículo sobre a imagem de IA no Canvas
 */
export function composeCardOnCanvas(canvas, imgElement, config = {}) {
  if (!canvas || !imgElement) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // 1. Desenhar a imagem cobrindo o canvas
  ctx.drawImage(imgElement, 0, 0, w, h);

  const showOverlay = config.showOverlay !== false;
  const verseText = (config.verseText || '').trim();
  const bookRef = (config.bookRef || '').trim();
  const oracaoText = (config.oracaoText || '').trim();

  if (!showOverlay || (!verseText && !bookRef && !oracaoText)) {
    return;
  }

  // 2. Vinheta gradiente de iluminação cinematográfica para legibilidade sublime
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(10, 4, 6, 0.7)');
  grad.addColorStop(0.2, 'rgba(10, 4, 6, 0.25)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
  grad.addColorStop(0.7, 'rgba(10, 4, 6, 0.45)');
  grad.addColorStop(1, 'rgba(10, 4, 6, 0.9)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 3. Moldura dourada fina com aura sagrada
  ctx.strokeStyle = 'rgba(212, 168, 83, 0.6)';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  ctx.strokeStyle = 'rgba(212, 168, 83, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(46, 46, w - 92, h - 92);

  // 4. Símbolo Topo (Cruz Dourada)
  ctx.font = '48px "Cinzel", serif, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E8C98A';
  try {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 12;
  } catch (e) {}
  ctx.fillText('✝', w / 2, 110);

  // 5. Título de Referência no Topo
  if (bookRef) {
    ctx.font = 'bold 30px "Cinzel", serif';
    ctx.fillStyle = '#F5E6C8';
    ctx.fillText(bookRef.toUpperCase(), w / 2, 160);

    // Divisor com estrela
    ctx.strokeStyle = 'rgba(212, 168, 83, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 100, 185);
    ctx.lineTo(w / 2 - 15, 185);
    ctx.moveTo(w / 2 + 15, 185);
    ctx.lineTo(w / 2 + 100, 185);
    ctx.stroke();

    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#D4A853';
    ctx.fillText('✦', w / 2, 190);
  }

  // 6. Texto do Versículo no Centro/Base
  if (verseText) {
    const maxTextWidth = w - 180;
    let fontSize = 38;
    if (verseText.length > 200) fontSize = 28;
    else if (verseText.length > 130) fontSize = 32;

    ctx.font = `italic ${fontSize}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = '#FFFFFF';
    try {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
      ctx.shadowBlur = 14;
    } catch (e) {}

    const lines = wrapCanvasText(ctx, `“${verseText}”`, maxTextWidth);
    const lineHeight = fontSize * 1.45;
    const totalTextHeight = lines.length * lineHeight;

    let startY = h - 220 - totalTextHeight;
    if (startY < 280) startY = 280;

    lines.forEach((line, i) => {
      ctx.fillText(line, w / 2, startY + i * lineHeight);
    });
  }

  // 7. Oração ou Mensagem devocional na base
  if (oracaoText) {
    ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#E8C98A';
    try {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 10;
    } catch (e) {}
    ctx.fillText(`“${oracaoText}”`, w / 2, h - 115);
  }

  // 8. Rodapé do Aplicativo
  ctx.font = '600 18px "Cinzel", serif';
  ctx.fillStyle = 'rgba(212, 168, 83, 0.85)';
  try {
    ctx.shadowBlur = 6;
  } catch (e) {}
  ctx.fillText('✝  BÍBLIA SAGRADA CATÓLICA  ✝', w / 2, h - 60);
  try {
    ctx.shadowBlur = 0;
  } catch (e) {}
}

function wrapCanvasText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + ' ' + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width < maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
