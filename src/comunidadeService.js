// ==========================================================================
// SERVIÇO DE COMUNIDADE CATÓLICA, MURAL FRATERNO E BATE-PAPO EM TEMPO REAL
// ==========================================================================

import { FIREBASE_DB_URL } from './firebaseGallery.js';
import { getDeviceId, getLocalParoquia } from './paroquiasService.js';

// Mensagens acolhedoras inaugurais (garantem que o fiel nunca encontre uma sala deserta)
export const INAUGURAL_MESSAGES = {
  geral: [
    {
      id: 'pastoral_welcome',
      nome: 'Comunidade Bíblia Sagrada',
      paroquia: 'Igreja Católica Apostólica Romana',
      cidade: 'Brasil',
      estado: 'BR',
      texto: 'Paz e Bem a todos os irmãos e irmãs! Sejam bem-vindos ao Mural Fraterno da Bíblia Católica. Este espaço foi consagrado para a partilha da Palavra de Deus, intenções de oração e comunhão entre as nossas paróquias. Sintam-se em casa!',
      timestamp: Date.now() - 1000 * 60 * 60 * 4,
      is_pastoral: true,
      reacoes: { amem: 12, oracao: 8 }
    },
    {
      id: 'inaugural_oracao',
      nome: 'Irmão Francisco',
      paroquia: 'Paróquia São Francisco de Assis',
      cidade: 'Assis',
      estado: 'SP',
      texto: 'Senhor, fazei de nós um instrumento de vossa paz! Onde houver ódio, que levemos o amor. Deixo aqui minhas orações por todas as famílias cadastradas em nosso aplicativo hoje. 🙏🕊️',
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      is_pastoral: false,
      reacoes: { amem: 9, oracao: 5 }
    },
    {
      id: 'inaugural_acolhida',
      nome: 'Maria Teresa',
      paroquia: 'Santuário Nossa Senhora Aparecida',
      cidade: 'Aparecida',
      estado: 'SP',
      texto: 'Salve Maria Imaculada! Que alegria poder rezar e me conectar com irmãos de tantas cidades diferentes. Deus abençoe a caminhada de fé de cada um!',
      timestamp: Date.now() - 1000 * 60 * 35,
      is_pastoral: false,
      reacoes: { amem: 15, oracao: 4 }
    }
  ],
  amizades: [
    {
      id: 'pastoral_amizades_welcome',
      nome: 'Acolhida Pastoral',
      paroquia: 'Pastoral Familiar & Juventude',
      cidade: 'Brasil',
      estado: 'BR',
      texto: 'Bem-vindo ao espaço de Amizades Católicas e Vocação! Aqui buscamos criar laços santos, cultivar amizades que nos aproximam do Céu e apoiar jovens e fiéis que buscam relacionamentos sérios fundamentados na fé cristã e nos sacramentos. ✝️❤️',
      timestamp: Date.now() - 1000 * 60 * 60 * 5,
      is_pastoral: true,
      reacoes: { amem: 14, oracao: 6 }
    },
    {
      id: 'inaugural_amizade_1',
      nome: 'Gabriel Santos',
      paroquia: 'Paróquia Sagrada Família',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      texto: 'Olá irmãos! Tenho 26 anos, participo do grupo de jovens e do ministério de música. É muito bom encontrar fiéis que compartilham o mesmo amor pela liturgia e pela Eucaristia. Um abraço fraterno a todos!',
      timestamp: Date.now() - 1000 * 60 * 45,
      is_pastoral: false,
      reacoes: { amem: 7, oracao: 3 }
    }
  ]
};

// Fiéis iniciais representativos para dinamismo imediato no primeiro acesso
export const SEED_FIEIS = [
  {
    id: 'fiel_demo_1',
    nome: 'Ana Cecília',
    paroquia: 'Catedral Metropolitana',
    cidade: 'São Paulo',
    estado: 'SP',
    santo: 'Santa Teresinha do Menino Jesus',
    last_seen: Date.now() - 1000 * 60 * 2,
    online: true
  },
  {
    id: 'fiel_demo_2',
    nome: 'João Paulo',
    paroquia: 'Paróquia São Bento',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    santo: 'São Bento',
    last_seen: Date.now() - 1000 * 60 * 4,
    online: true
  },
  {
    id: 'fiel_demo_3',
    nome: 'Helena Ribeiro',
    paroquia: 'Santuário do Perpétuo Socorro',
    cidade: 'Curitiba',
    estado: 'PR',
    santo: 'Nossa Senhora do Perpétuo Socorro',
    last_seen: Date.now() - 1000 * 60 * 6,
    online: true
  },
  {
    id: 'fiel_demo_4',
    nome: 'Lucas Martins',
    paroquia: 'Paróquia Imaculado Coração de Maria',
    cidade: 'Goiânia',
    estado: 'GO',
    santo: 'São José',
    last_seen: Date.now() - 1000 * 60 * 8,
    online: true
  }
];

// Base de dados comunitária no Firebase (utiliza nó com permissão total garantida de leitura/escrita)
export const COMUNIDADE_BASE_URL = `${FIREBASE_DB_URL}/velas_oracao/comunidade`;

let presenceTimer = null;
let muralPollTimer = null;

/**
 * Retorna o perfil do fiel atual formatado
 */
export async function getPerfilFiel() {
  const paroquiaData = await getLocalParoquia();
  const deviceId = await getDeviceId();
  let nomeSalvo = localStorage.getItem('biblia_fiel_nome');

  if (!nomeSalvo && paroquiaData && paroquiaData.nome_devoto) {
    nomeSalvo = paroquiaData.nome_devoto;
    try { localStorage.setItem('biblia_fiel_nome', nomeSalvo); } catch (e) {}
  }

  const santoSalvo = localStorage.getItem('biblia_fiel_santo') || 'Nossa Senhora Aparecida';

  return {
    id: deviceId,
    nome: nomeSalvo || 'Irmão em Cristo',
    paroquia: (paroquiaData && paroquiaData.paroquia) || 'Paróquia Católica',
    cidade: (paroquiaData && paroquiaData.cidade) || 'Brasil',
    estado: (paroquiaData && paroquiaData.estado) || 'BR',
    santo: santoSalvo,
    has_custom_nome: !!nomeSalvo
  };
}

/**
 * Atualiza o nome ou santo de devoção do fiel
 */
export function salvarPerfilFiel(nome, santo = null) {
  if (nome && nome.trim()) {
    const cleanNome = nome.trim();
    localStorage.setItem('biblia_fiel_nome', cleanNome);
    try {
      const paroquiaRaw = localStorage.getItem('biblia_paroquia_perfil');
      if (paroquiaRaw) {
        const pData = JSON.parse(paroquiaRaw);
        pData.nome_devoto = cleanNome;
        localStorage.setItem('biblia_paroquia_perfil', JSON.stringify(pData));
      }
    } catch (e) {}
  }
  if (santo && santo.trim()) {
    localStorage.setItem('biblia_fiel_santo', santo.trim());
  }
}

/**
 * Envia sinal de batimento (heartbeat) para o Firebase indicando que o fiel está online
 */
export async function pingPresencaOnline() {
  try {
    const perfil = await getPerfilFiel();
    const url = `${COMUNIDADE_BASE_URL}/presenca/${perfil.id}.json`;
    
    const payload = {
      id: perfil.id,
      nome: perfil.nome,
      paroquia: perfil.paroquia,
      cidade: perfil.cidade,
      estado: perfil.estado,
      santo: perfil.santo,
      last_seen: Date.now(),
      online: true
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);
    return res.ok;
  } catch (e) {
    console.warn('[ComunidadeService] Falha ao enviar batimento de presenca:', e);
    return false;
  }
}

/**
 * Inicia o batimento contínuo de presença enquanto o app estiver aberto (a cada 45s)
 */
export function startPresenceHeartbeat() {
  if (presenceTimer) clearInterval(presenceTimer);
  pingPresencaOnline();
  presenceTimer = setInterval(pingPresencaOnline, 45000);
}

export function stopPresenceHeartbeat() {
  if (presenceTimer) {
    clearInterval(presenceTimer);
    presenceTimer = null;
  }
}

/**
 * Busca os fiéis online no Firebase (ativos nos últimos 20 minutos)
 */
export async function getFieisOnline() {
  const agora = Date.now();
  const limiteOnline = agora - 20 * 60 * 1000; // 20 minutos de tolerância ativa
  const fieisMap = new Map();
  const myDeviceId = await getDeviceId();

  // 1. Sempre inclui o usuário atual se tiver perfil configurado
  try {
    const perfilLocal = await getPerfilFiel();
    if (perfilLocal && perfilLocal.nome && perfilLocal.nome !== 'Irmão em Cristo') {
      fieisMap.set(perfilLocal.id, {
        ...perfilLocal,
        last_seen: agora,
        online: true,
        is_me: true
      });
    }
  } catch (e) {}

  // 2. Busca fiéis reais no Firebase
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${COMUNIDADE_BASE_URL}/presenca.json`, { signal: controller.signal, cache: 'no-cache' });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        Object.keys(data).forEach(key => {
          const item = data[key];
          if (item && item.last_seen && item.last_seen >= limiteOnline) {
            fieisMap.set(key, { 
              ...item, 
              online: true,
              is_me: key === myDeviceId
            });
          }
        });
      }
    }
  } catch (e) {
    console.warn('[ComunidadeService] Presença remota offline, usando dados locais:', e.message);
  }

  // 3. Adiciona fiéis sementes para complementar a experiência fraterna
  SEED_FIEIS.forEach(f => {
    if (!fieisMap.has(f.id)) {
      fieisMap.set(f.id, { ...f, online: true, is_seed: true });
    }
  });

  // Ordenação:
  // 1. O próprio usuário logado (is_me)
  // 2. Fiéis reais cadastrados
  // 3. Fiéis sementes
  // E por último visto mais recente
  return Array.from(fieisMap.values()).sort((a, b) => {
    if (a.is_me && !b.is_me) return -1;
    if (!a.is_me && b.is_me) return 1;
    if (!a.is_seed && b.is_seed) return -1;
    if (a.is_seed && !b.is_seed) return 1;
    return (b.last_seen || 0) - (a.last_seen || 0);
  });
}

/**
 * Busca mensagens do mural (Geral ou Amizades)
 */
export async function getMuralMensagens(channel = 'geral') {
  const key = channel === 'amizades' ? 'amizades' : 'geral';
  let mensagens = [];

  // 1. Mensagens inaugurais acolhedoras
  const baseInaugural = INAUGURAL_MESSAGES[key] || [];

  // 2. Mensagens salvas no Firebase
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${COMUNIDADE_BASE_URL}/mural/${key}.json`, { signal: controller.signal, cache: 'no-cache' });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        const remotas = Object.keys(data).map(k => ({
          ...data[k],
          id: k
        }));
        mensagens = [...baseInaugural, ...remotas];
      } else {
        mensagens = [...baseInaugural];
      }
    } else {
      mensagens = [...baseInaugural];
    }
  } catch (e) {
    mensagens = [...baseInaugural];
  }

  // Ordena por timestamp cronológico (mais antigo para mais recente)
  mensagens.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

  // Limita às últimas 80 mensagens para performance ultra-rápida
  if (mensagens.length > 80) {
    mensagens = mensagens.slice(mensagens.length - 80);
  }

  return mensagens;
}

/**
 * Envia uma nova mensagem para o mural no Firebase
 */
export async function enviarMensagemMural(channel = 'geral', texto = '') {
  const cleanTexto = String(texto || '').trim();
  if (!cleanTexto) throw new Error('A mensagem não pode estar vazia');

  if (cleanTexto.length > 600) {
    throw new Error('A mensagem é muito longa (máximo 600 caracteres)');
  }

  const key = channel === 'amizades' ? 'amizades' : 'geral';
  const perfil = await getPerfilFiel();

  const payload = {
    user_id: perfil.id,
    nome: perfil.nome,
    paroquia: perfil.paroquia,
    cidade: perfil.cidade,
    estado: perfil.estado,
    texto: cleanTexto,
    timestamp: Date.now(),
    reacoes: { amem: 1 }
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const res = await fetch(`${COMUNIDADE_BASE_URL}/mural/${key}.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: controller.signal
  });
  clearTimeout(timeout);

  if (!res.ok) {
    throw new Error('Erro ao transmitir mensagem pela rede');
  }

  const result = await res.json();

  // Ao enviar mensagem, renova imediatamente a presenca online do fiel
  pingPresencaOnline().catch(() => {});

  return { ...payload, id: result.name };
}

/**
 * Reage com "Amém 🙏" em uma mensagem
 */
export async function reagirMensagemMural(channel = 'geral', messageId = '', tipo = 'amem') {
  if (!messageId || messageId.startsWith('pastoral_') || messageId.startsWith('inaugural_')) {
    // Mensagens inaugurais mantêm reações locais
    return true;
  }
  const key = channel === 'amizades' ? 'amizades' : 'geral';
  try {
    const url = `${COMUNIDADE_BASE_URL}/mural/${key}/${messageId}/reacoes/${tipo}.json`;
    const res = await fetch(url);
    let count = 0;
    if (res.ok) {
      count = (await res.json()) || 0;
    }
    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(count + 1)
    });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Inicia escuta em tempo real do mural via polling inteligente a cada 4 segundos
 */
export function startMuralPolling(channel, onUpdate) {
  stopMuralPolling();
  getMuralMensagens(channel).then(onUpdate).catch(() => {});
  muralPollTimer = setInterval(async () => {
    try {
      const msgs = await getMuralMensagens(channel);
      onUpdate(msgs);
    } catch (e) {}
  }, 4500);
}

export function stopMuralPolling() {
  if (muralPollTimer) {
    clearInterval(muralPollTimer);
    muralPollTimer = null;
  }
}

/**
 * Formata tempo decorrido amigável (ex: 'Há 5 min', 'Hoje às 14:30')
 */
export function formatarTempoDecorrido(timestamp) {
  if (!timestamp) return 'Hoje';
  const diff = Date.now() - timestamp;
  const minutos = Math.floor(diff / (1000 * 60));
  if (minutos < 1) return 'Agora mesmo';
  if (minutos < 60) return `Há ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `Há ${horas}h`;
  const d = new Date(timestamp);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')} às ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
