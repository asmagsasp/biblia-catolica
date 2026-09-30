// SERVIÇO AVANÇADO DE GERAÇÃO DE IMAGENS SACRAS E ARTE BÍBLICA COM INTELIGÊNCIA ARTIFICIAL

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
const SACRED_SCENE_RULES = [
  // 1. Jesus acalmando a tempestade
  {
    regex: /(acalma|tempestade|barco.*mar|mar.*galileia|ondas.*vento|vento.*mar|socorre.*afundando|mar.*tempestuoso)/i,
    build: () => 'Jesus Christ standing majestically in a wooden fishing boat on the stormy Sea of Galilee, raising His hand with divine authority commanding the violent raging waves and tempest to be still, dramatic storm clouds parting with golden celestial sunlight breaking through, disciples looking in reverent awe'
  },
  // 2. Jesus andando sobre as águas
  {
    regex: /(andando sobre as [aá]guas|caminha(r|ndo)? sobre (as )?[aá]guas|pedro.*afundando|salva-me.*senhor|homem de pouca f[eé]|mar.*noite.*jesus|salvar pedro)/i,
    build: () => 'Jesus Christ walking serenely on the surface of the dark stormy sea, extending His luminous hand to rescue Saint Peter from the waves, divine glowing golden halo, majestic celestial moonlight and ocean spray'
  },
  // 3. O Bom Pastor / Salmo 23
  {
    regex: /(bom pastor|ovelha|pastoreia|salmo\s*23|pastor.*nada|verdes prados|[aá]guas tranquilas|[aá]guas de repouso|rebanho)/i,
    build: () => 'Jesus Christ as the Good Shepherd in flowing holy robes, tenderly cradling a gentle white lamb in His arms, walking through lush green biblical pastures with a peaceful flowing crystal stream, rolling Galilean hills, warm golden hour sunlight, divine halo'
  },
  // 4. Moisés abrindo o Mar Vermelho
  {
    regex: /(mar vermelho|abriu o mar|partir o mar|moises.*mar|mois[eé]s.*cajado|[eê]xodo 14|travessia do mar)/i,
    build: () => 'Moses with glowing white beard holding his wooden staff aloft, miraculously parting the towering walls of the Red Sea, illuminated dry seabed pathway, dramatic pillar of celestial fire, towering churning ocean walls, awe-inspiring biblical Exodus narrative'
  },
  // 5. Arca de Noé / Dilúvio
  {
    regex: /(arca de no[eé]|dil[uú]vio|ararate|no[eé].*animais|g[eê]nesis 6|g[eê]nesis 7|g[eê]nesis 8|monte ararate)/i,
    build: () => 'Noah\'s Ark ancient wooden ship resting on the mountains of Ararat after the great flood, pairs of diverse animals descending peacefully, brilliant radiant rainbow glowing across dramatic celestial sky, white dove holding green olive branch'
  },
  // 6. A Criação / Fiat Lux / Gênesis 1
  {
    regex: /(cria[cç][aã]o|fiat lux|g[eê]nesis 1|fa[cç]a-se a luz|haja luz|luz das trevas|universo.*deus|no princ[ií]pio criou deus)/i,
    build: () => 'The Creation of the Universe, God creating celestial light separating light from darkness in the cosmic deep, luminous glowing stars, planets and swirling galaxies forming, majestic divine golden rays of Fiat Lux, sacred Genesis'
  },
  // 7. A Última Ceia / Eucaristia
  {
    regex: /(ceia|[uú]ltima ceia|eucaristia|sagrada comunh[aã]o|p[aã]o e vinho|c[aá]lice|este [eé] o meu corpo|sangue da nova alian[cç]a|ostens[oó]rio|h[oó]stia|sant[ií]ssimo sacramento)/i,
    build: () => 'Jesus Christ at the Last Supper table with the twelve Apostles, elevating the sacred unleavened bread and golden chalice of wine with heavenly light radiating from His holy hands, warm reverent candlelight, sacred communion'
  },
  // 8. São Miguel Arcanjo
  {
    regex: /(s[aã]o miguel|arcanjo miguel|quem como deus|derrotando o drag[aã]o|espada de fogo|arcanjo.*armadura|batalha celestial)/i,
    build: () => 'Archangel Saint Michael in radiant ornate golden armor with majestic feathered wings, holding a glowing blazing sword of holy fire, standing triumphant over darkness, celestial divine light beams shining from heaven, heroic and sacred'
  },
  // 9. A Natividade / Menino Jesus / Belém
  {
    regex: /(natividade|nascimento de jesus|menino jesus|pres[eé]pio|bel[eé]m|estrela do oriente|s[aã]o jos[eé].*maria.*manjedoura|noite feliz|menino na manjedoura)/i,
    build: () => 'The Holy Nativity in Bethlehem, baby Jesus asleep in the humble manger radiant with divine light, Virgin Mary and Saint Joseph looking down with tender love, shining Star of Bethlehem glowing above the stable, peaceful adoration'
  },
  // 10. Ressurreição de Jesus / Sepulcro Vazio
  {
    regex: /(ressurrei[cç][aã]o|t[uú]mulo vazio|sepulcro vazio|ressuscitou|ele vive|vit[oó]ria sobre a morte|domingo de p[aá]scoa|ressurreic[aã]o)/i,
    build: () => 'The Glorious Resurrection of Jesus Christ, triumphant Christ clothed in radiant blinding white and gold rising from the open stone tomb, holding the banner of victory, angelic light, Roman guards in awe, dawn golden morning light'
  },
  // 11. Imaculado Coração de Maria / Virgem Maria
  {
    regex: /(imaculado cora[cç][aã]o|nossa senhora|virgem maria|m[aã]e de deus|aparecida|f[aá]tima|guadalupe|lourdes|ave maria|rainha do c[eé]u)/i,
    build: () => 'The Blessed Virgin Mary Queen of Heaven in celestial blue and radiant white mantle, gentle loving motherly gaze, golden halo of twelve stars, surrounded by white roses and soft divine light rays'
  },
  // 12. Sagrado Coração de Jesus / Misericórdia
  {
    regex: /(sagrado cora[cç][aã]o|cora[cç][aã]o de jesus|miseric[oó]rdia divina|jesus misericordioso|raios da miseric[oó]rdia)/i,
    build: () => 'The Sacred Heart of Jesus Christ with glowing flames and crown of thorns, gentle hand raised in blessing, compassionate divine gaze, rays of red and pale light radiating from His heart'
  },
  // 13. Pentecostes / Espírito Santo
  {
    regex: /(pentecostes|esp[ií]rito santo|pomba celestial|l[ií]nguas de fogo|cen[aá]culo|dons do esp[ií]rito|par[aá]clito)/i,
    build: () => 'The Holy Spirit descending as a glowing white dove surrounded by seven rays of golden light and gentle divine flames, Pentecost upper room with apostles, heavenly illumination'
  },
  // 14. Anunciação
  {
    regex: /(anuncia[cç][aã]o|anjo gabriel|arcanjo gabriel|fa[cç]a-se em mim|eis a serva|anuncia[cç]ao)/i,
    build: () => 'The Annunciation, Archangel Gabriel with golden wings appearing before kneeling Virgin Mary with white lilies, Holy Spirit dove in divine light, intimate holy revelation'
  },
  // 15. Crucificação / Calvário / Cruz
  {
    regex: /(crucifica[cç][aã]o|na cruz|monte calv[aá]rio|g[oó]lgota|santa cruz|paix[aã]o de cristo|consumado est[aá]|cruz de cristo)/i,
    build: () => 'Jesus Christ on the Holy Cross at Mount Calvary, heavenly light breaking through dark storm clouds, sacred solemn redemption, reverent and profound'
  },
  // 16. Davi e Golias
  {
    regex: /(davi.*golias|golias|funda.*pedra|gigante filisteu|davi.*pastor)/i,
    build: () => 'Young David holding sling and stone facing giant Goliath in the Valley of Elah, dramatic ancient biblical battlefield, golden light of faith'
  },
  // 17. Daniel na Cova dos Leões
  {
    regex: /(daniel.*le[oõ]es|cova dos le[oõ]es|le[aã]o.*daniel)/i,
    build: () => 'Daniel in the Lions\' Den, kneeling in peaceful prayer unharmed among resting majestic lions, beam of celestial divine light shining from above'
  },
  // 18. Sermão da Montanha / Bem-Aventuranças
  {
    regex: /(serm[aã]o da montanha|bem-aventurados|colina.*galileia|mateus 5|ensinando a multid[aã]o)/i,
    build: () => 'Jesus Christ delivering the Sermon on the Mount, teaching the disciples and multitude on a wildflower hillside overlooking the Sea of Galilee, soft morning sunlight'
  },
  // 19. Multiplicação dos Pães e Peixes
  {
    regex: /(multiplica[cç][aã]o.*p[aã]es|p[aã]es e peixes|cinco p[aã]es|dois peixes|alimentou a multid[aã]o|multiplica[cç]ao)/i,
    build: () => 'Jesus Christ blessing baskets of bread and fish to feed the multitude on a green hillside, golden light, holy miracle, joyful disciples'
  },
  // 20. São José e o Menino Jesus
  {
    regex: /(s[aã]o jos[eé]|jos[eé] oper[aá]rio|carpintaria.*jesus|pai adotivo|jos[eé].*menino)/i,
    build: () => 'Saint Joseph holding infant Jesus with fatherly love and holding a flowering white lily staff, warm carpenter workshop light with sunbeams and wood shavings'
  },
  // 21. Transfiguração
  {
    regex: /(transfigura[cç][aã]o|monte tabor|mois[eé]s e elias|vestes brancas como a luz|transfigura[cç]ao)/i,
    build: () => 'The Transfiguration of Jesus on Mount Tabor, radiant blinding white light, Moses and Elijah appearing beside Christ, disciples Peter James and John kneeling in awe'
  },
  // 22. Jonas e o Grande Peixe
  {
    regex: /(jonas|grande peixe|baleia|n[ií]nive)/i,
    build: () => 'Jonah emerging onto the beach from the sea and great fish, dramatic coastal clouds and golden dawn, divine redemption'
  },
  // 23. Apocalipse / Nova Jerusalém
  {
    regex: /(apocalipse|nova jerusal[eé]m|rio da vida|[aá]rvore da vida|vis[aã]o de jo[aã]o|cidade santa|trono de deus)/i,
    build: () => 'The Holy City New Jerusalem descending from heaven, golden streets, crystalline river of life, brilliant tree of life, majestic celestial glory, Book of Revelation'
  },
  // 24. Filho Pródigo
  {
    regex: /(filho pr[oó]digo|abra[cç]o do pai|pai misericordioso|perdoou o filho)/i,
    build: () => 'The Parable of the Prodigal Son, loving father weeping and embracing his returning kneeling son in warm emotional golden light, forgiveness and grace'
  },
  // 25. Anjo da Guarda
  {
    regex: /(anjo da guarda|santo anjo|guardi[aã]o|prote[cç][aã]o dos anjos)/i,
    build: () => 'Guardian Angel in glowing white robes with protective feathered wings sheltering a child along a mountain path, gentle golden celestial light'
  },
  // 26. Batismo de Jesus
  {
    regex: /(batismo.*jesus|rio jord[aã]o.*batismo|jo[aã]o batista.*batizando)/i,
    build: () => 'The Baptism of Jesus Christ in the River Jordan by Saint John the Baptist, Holy Spirit as a luminous dove descending from open heaven with radiant beams of light'
  },
  // 27. Cura dos enfermos / Milagre
  {
    regex: /(curou.*cego|cura dos enfermos|milagre.*jesus|leproso.*curado|ressuscitou.*l[aá]zaro|l[aá]zaro vem para fora)/i,
    build: () => 'Jesus Christ laying compassionate hands in miraculous healing upon the sick, surrounded by disciples, divine golden aura of hope and mercy'
  },
  // 28. Caminho de Emaús
  {
    regex: /(caminho de ema[uú]s|ceia em ema[uú]s|partir do p[aã]o.*disc[ií]pulos)/i,
    build: () => 'The Walk to Emmaus, the Risen Christ walking and talking with two disciples along a peaceful sunlit path at sunset, warm golden glow'
  },
  // 29. O Verbo Divino / Prólogo de São João
  {
    regex: /(no princ[ií]pio era o verbo|o verbo se fez carne|o verbo estava com deus|jo[aã]o 1,?\s*1|luz resplandece nas trevas)/i,
    build: () => 'Jesus Christ as the Divine Logos and Eternal Word of God, radiant in heavenly celestial glory, open Holy Scripture with golden letters of light, surrounded by the cosmic creation and angelic choir'
  },
  // 30. Força e Vitória / Filipenses 4:13
  {
    regex: /(tudo posso naquele que me fortalece|filipenses 4,?\s*13|minha for[cç]a [eé] o senhor|o senhor [eé] meu ref[uú]gio|escudo e prote[cç][aã]o)/i,
    build: () => 'Jesus Christ standing in radiant triumph with open arms radiating celestial strength, peace, courage and divine golden light, dark storm clouds parting to reveal glowing heavenly sun'
  },
  // 31. O Amor / 1 Coríntios 13
  {
    regex: /(o amor nunca falha|o amor [eé] paciente|1 cor[ií]ntios 13|f[eé].*esperan[cç]a.*amor|o maior deles [eé] o amor)/i,
    build: () => 'The Sacred Christian Virtue of Divine Love and Charity, radiant celestial light shining from heaven upon a holy glowing cross, gentle white dove of peace, and blossoming fragrant white roses'
  },
  // 32. Assunção e Coroação de Maria
  {
    regex: /(assun[cç][aã]o|coroa[cç][aã]o de nossa senhora|rainha dos anjos|maria elevada aos c[eé]us)/i,
    build: () => 'The Glorious Assumption and Coronation of the Virgin Mary, angels lifting Our Lady towards the heavenly throne, radiant golden light, crown of twelve stars, joyful celestial celebration'
  }
];

// DICIONÁRIO COMPLETO PORTUGUÊS -> INGLÊS BÍBLICO E VISUAL
const PT_TO_EN_DICTIONARY = [
  // Personagens e Títulos
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

  // Lugares e Ambientes
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

  // Objetos e Símbolos
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

  // Ações e Conceitos Visuais
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

// Variações sutis de atmosfera e iluminação para garantir variedade artística
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
 * Traduz e enriquece um prompt em português para uma cena visual detalhada em inglês
 * perfeitamente compreensível pelos modelos de difusão de arte sacra (Flux / Stable Diffusion).
 */
export function buildSacredVisualPrompt(userPrompt, options = {}, style = SACRED_AI_STYLES[0]) {
  const rawPrompt = (userPrompt || '').trim();
  const verseText = (options.verseText || '').trim();
  const bookRef = (options.bookRef || '').trim();
  const atmosphere = getRandomAtmosphereVariation();

  // 1. PRIORIDADE MÁXIMA: Se o usuário forneceu um prompt explícito (digitado ou chip), avaliar SOMENTE o prompt!
  if (rawPrompt) {
    for (const rule of SACRED_SCENE_RULES) {
      if (rule.regex.test(rawPrompt)) {
        const scene = rule.build(options);
        return `${scene}, ${atmosphere}, ${style.suffix}, highly detailed sacred art, 8k, flawless composition, pious Catholic devotion, no modern elements, no watermark, no text`;
      }
    }

    // Se o prompt explícito não caiu em regra pronta, traduzir o texto personalizado do usuário
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
 * Gera uma imagem bíblica sacra de alta definição com IA (Flux / Stable Diffusion).
 * @param {string} userPrompt - Descrição do tema bíblico ou citação
 * @param {string} styleId - ID do estilo artístico
 * @param {object} options - Opções (width, height, verseText, bookRef)
 * @returns {Promise<string>} Data URL base64 da imagem gerada
 */
export async function generateSacredAIImage(userPrompt, styleId = 'renaissance', options = {}) {
  const width = options.width || 1024;
  const height = options.height || 1024;
  const seed = Math.floor(Math.random() * 900000000) + 100000;
  const timestamp = Date.now();

  const style = SACRED_AI_STYLES.find(s => s.id === styleId) || SACRED_AI_STYLES[0];
  
  // Constrói o prompt visual refinado em inglês
  const visualPrompt = buildSacredVisualPrompt(userPrompt, options, style);
  const encodedPrompt = encodeURIComponent(visualPrompt);

  console.log('[SacredAI] Prompt visual enriquecido (Seed:', seed, '):', visualPrompt);

  // Modelos e endpoints com suporte a fallback automático e cache-busting
  const candidateUrls = [
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=flux&seed=${seed}&nologo=true&enhance=false&_t=${timestamp}`,
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=turbo&seed=${seed}&nologo=true&enhance=false&_t=${timestamp}`,
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&_t=${timestamp}`
  ];

  let lastError = null;

  for (const url of candidateUrls) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000); // 20s max por candidato

    try {
      console.log('[SacredAI] Solicitando imagem sacra:', url);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const json = await response.json();
          console.warn('[SacredAI] Resposta não-imagem da API:', json);
          continue;
        }

        const blob = await response.blob();
        if (blob && blob.size > 2000 && blob.type.startsWith('image/')) {
          return await blobToDataURL(blob);
        }
      } else {
        console.warn(`[SacredAI] Endpoint retornou status ${response.status}, tentando próximo candidato...`);
      }
    } catch (err) {
      clearTimeout(timer);
      console.warn('[SacredAI] Tentativa falhou:', err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('Não foi possível gerar a arte sacra no momento. Verifique sua conexão e tente novamente.');
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

  // 1. Desenhar a imagem de IA cobrindo o canvas
  ctx.drawImage(imgElement, 0, 0, w, h);

  const showOverlay = config.showOverlay !== false;
  const verseText = (config.verseText || '').trim();
  const bookRef = (config.bookRef || '').trim();
  const oracaoText = (config.oracaoText || '').trim();

  if (!showOverlay || (!verseText && !bookRef && !oracaoText)) {
    return; // Se o usuário não quiser sobreposição, deixa a arte pura
  }

  // 2. Vinheta gradiente de iluminação cinematográfica para legibilidade sublime
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(10, 4, 6, 0.7)');
  grad.addColorStop(0.2, 'rgba(10, 4, 6, 0.25)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
  grad.addColorStop(0.7, 'rgba(10, 4, 6, 0.4)');
  grad.addColorStop(1, 'rgba(10, 4, 6, 0.88)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 3. Moldura dourada fina com aura sagrada
  ctx.strokeStyle = 'rgba(212, 168, 83, 0.55)';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  ctx.strokeStyle = 'rgba(212, 168, 83, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(46, 46, w - 92, h - 92);

  // 4. Símbolo Topo (Cruz Dourada)
  ctx.font = '48px "Cinzel", serif, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E8C98A';
  try {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
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
