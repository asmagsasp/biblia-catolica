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
    online: true,
    ultimo_recado: {
      texto: 'Rezar o Santo Terço hoje pelas famílias católicas! 🌹',
      timestamp: Date.now() - 1000 * 60 * 12
    }
  },
  {
    id: 'fiel_demo_2',
    nome: 'João Paulo',
    paroquia: 'Paróquia São Bento',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    santo: 'São Bento',
    last_seen: Date.now() - 1000 * 60 * 4,
    online: true,
    ultimo_recado: {
      texto: 'A Cruz Sagrada seja a minha luz! Paz e bem a todos os irmãos. 🛡️',
      timestamp: Date.now() - 1000 * 60 * 25
    }
  },
  {
    id: 'fiel_demo_3',
    nome: 'Helena Ribeiro',
    paroquia: 'Santuário do Perpétuo Socorro',
    cidade: 'Curitiba',
    estado: 'PR',
    santo: 'Nossa Senhora do Perpétuo Socorro',
    last_seen: Date.now() - 1000 * 60 * 6,
    online: true,
    ultimo_recado: {
      texto: 'Pedindo a intercessão de Nossa Senhora pelos enfermos nesta semana. 🕊️',
      timestamp: Date.now() - 1000 * 60 * 40
    }
  },
  {
    id: 'fiel_demo_4',
    nome: 'Lucas Martins',
    paroquia: 'Paróquia Imaculado Coração de Maria',
    cidade: 'Goiânia',
    estado: 'GO',
    santo: 'São José',
    last_seen: Date.now() - 1000 * 60 * 8,
    online: true,
    ultimo_recado: {
      texto: 'São José, pai adotivo de Jesus, rogai por nossas vocações! ✝️',
      timestamp: Date.now() - 1000 * 60 * 55
    }
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
      method: 'PATCH',
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
 * Busca os fiéis online no Firebase (ativos nos últimos 20 minutos) com deduplicação inteligente por nome
 */
export async function getFieisOnline() {
  const agora = Date.now();
  const limiteOnline = agora - 20 * 60 * 1000; // 20 minutos de tolerância ativa
  const myDeviceId = await getDeviceId();
  const perfilLocal = await getPerfilFiel();
  const myNomeClean = (perfilLocal && perfilLocal.nome && perfilLocal.nome !== 'Irmão em Cristo') 
    ? perfilLocal.nome.trim().toLowerCase() 
    : '';

  const rawList = [];

  // 1. Sempre inclui o usuário atual local se tiver nome configurado
  try {
    let recadoLocal = null;
    const recadoLocalStr = localStorage.getItem('biblia_fiel_ultimo_recado');
    if (recadoLocalStr) {
      try { recadoLocal = JSON.parse(recadoLocalStr); } catch (e) {}
    }

    if (perfilLocal && perfilLocal.nome && perfilLocal.nome !== 'Irmão em Cristo') {
      rawList.push({
        ...perfilLocal,
        ultimo_recado: recadoLocal,
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
            const itemNomeClean = (item.nome || '').trim().toLowerCase();
            const isMe = key === myDeviceId || (myNomeClean && itemNomeClean === myNomeClean);
            rawList.push({
              ...item,
              id: key,
              online: true,
              is_me: isMe
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
    rawList.push({ ...f, online: true, is_seed: true });
  });

  // 4. DEDUPLICAÇÃO INTELIGENTE POR NOME:
  // - O usuário atual (is_me) só aparece UMA vez (a versão com maior last_seen / local)
  // - Outros fiéis são agrupados por nome (case-insensitive). Se um fiel tiver mais de um device ID, mantém o mais recente!
  const fieisDeduplicados = new Map();

  // Primeiro processa os registros do usuário atual (is_me)
  const myEntries = rawList.filter(x => x.is_me);
  if (myEntries.length > 0) {
    myEntries.sort((a, b) => (b.last_seen || 0) - (a.last_seen || 0));
    const bestMe = myEntries[0];
    fieisDeduplicados.set('__me__', { ...bestMe, is_me: true });
  }

  // Depois processa os outros fiéis
  const others = rawList.filter(x => !x.is_me);
  others.sort((a, b) => (b.last_seen || 0) - (a.last_seen || 0));

  for (const item of others) {
    const nomeKey = (item.nome || '').trim().toLowerCase();
    if (!nomeKey) continue;

    // Se tiver o mesmo nome do usuário atual, nunca exibe como outra pessoa
    if (myNomeClean && nomeKey === myNomeClean) continue;

    // Se for 'Irmão em Cristo' sem recado e não for semente, ignora se já tiver pessoas
    if (nomeKey === 'irmão em cristo' && !item.ultimo_recado && !item.is_seed) continue;

    if (!fieisDeduplicados.has(nomeKey)) {
      fieisDeduplicados.set(nomeKey, item);
    }
  }

  const result = Array.from(fieisDeduplicados.values());
  return result.sort((a, b) => {
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

  // Ao enviar mensagem, grava também como último recado no card do fiel e renova presença
  const recadoPayload = {
    texto: cleanTexto,
    timestamp: Date.now()
  };
  try {
    localStorage.setItem('biblia_fiel_ultimo_recado', JSON.stringify(recadoPayload));
  } catch (e) {}

  fetch(`${COMUNIDADE_BASE_URL}/presenca/${perfil.id}/ultimo_recado.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recadoPayload)
  }).catch(() => {});
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

// ==========================================================================
// BATE-PAPO FRATERNO DIRETO (CONVERSA 1 A 1 ENTRE FIÉIS)
// ==========================================================================
let chatDiretoPollTimer = null;

export function getChatId(idA, idB) {
  return [String(idA || ''), String(idB || '')].sort().join('_');
}

/**
 * Busca histórico de mensagens diretas entre dois fiéis com recuperação resiliente por nome e ID
 */
export async function getConversaDireta(chatId, destId = null, destNome = null) {
  if (!chatId) return [];
  const perfil = await getPerfilFiel();
  const myId = perfil.id;
  const myNome = (perfil.nome || '').trim().toLowerCase();
  const targetNome = (destNome || '').trim().toLowerCase();

  const msgsMap = new Map();

  // 1. Busca mensagens no chatId direto
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${COMUNIDADE_BASE_URL}/conversas_diretas/${chatId}/mensagens.json`, {
      signal: controller.signal,
      cache: 'no-cache'
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        Object.keys(data).forEach(k => {
          msgsMap.set(k, { ...data[k], id: k });
        });
      }
    }
  } catch (e) {}

  // 2. Busca e unifica conversas cruzadas entre os dois fiéis por nome ou ID
  // Isso garante que mesmo se o usuário ou destinatário trocou de aba, limpou cache ou alterou ID, NENHUMA mensagem é perdida!
  try {
    const controllerAll = new AbortController();
    const timeoutAll = setTimeout(() => controllerAll.abort(), 6000);
    const resAll = await fetch(`${COMUNIDADE_BASE_URL}/conversas_diretas.json`, {
      signal: controllerAll.signal,
      cache: 'no-cache'
    });
    clearTimeout(timeoutAll);

    if (resAll.ok) {
      const allChats = await resAll.json();
      if (allChats && typeof allChats === 'object') {
        Object.keys(allChats).forEach(cKey => {
          const cData = allChats[cKey];
          if (cData && cData.mensagens && typeof cData.mensagens === 'object') {
            Object.keys(cData.mensagens).forEach(mId => {
              const m = cData.mensagens[mId];
              if (!m) return;
              const deNome = (m.de_nome || '').trim().toLowerCase();
              const paraNome = (m.para_nome || '').trim().toLowerCase();

              const matchParticipants = 
                (m.de_id === myId && m.para_id === destId) ||
                (m.de_id === destId && m.para_id === myId) ||
                (targetNome && myNome && (
                  (deNome === myNome && paraNome === targetNome) ||
                  (deNome === targetNome && paraNome === myNome) ||
                  (deNome.includes(targetNome) && paraNome.includes(myNome)) ||
                  (deNome.includes(myNome) && paraNome.includes(targetNome))
                ));

              if (matchParticipants) {
                const uniqueKey = m.id || `${m.timestamp}_${m.texto}`;
                if (!msgsMap.has(uniqueKey)) {
                  msgsMap.set(uniqueKey, { ...m, id: mId });
                }
              }
            });
          }
        });
      }
    }
  } catch (e) {}

  // 3. Marca mensagens da caixa de entrada como lidas automaticamente
  if (destId) {
    marcarMensagemLida(destId, destNome).catch(() => {});
  }

  const msgs = Array.from(msgsMap.values());
  msgs.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  return msgs;
}

/**
 * Envia mensagem direta entre dois fiéis com entrega garantida na caixa de entrada e espelhamento
 */
export async function enviarMensagemDireta(destId, destNome, texto) {
  const cleanTexto = String(texto || '').trim();
  if (!cleanTexto) throw new Error('A mensagem não pode estar vazia');

  const perfil = await getPerfilFiel();
  const chatId = getChatId(perfil.id, destId);

  const payload = {
    de_id: perfil.id,
    de_nome: perfil.nome,
    para_id: destId,
    para_nome: destNome,
    texto: cleanTexto,
    timestamp: Date.now()
  };

  // 1. Grava na conversa direta primária
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const res = await fetch(`${COMUNIDADE_BASE_URL}/conversas_diretas/${chatId}/mensagens.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: controller.signal
  });
  clearTimeout(timeout);

  if (!res.ok) throw new Error('Erro ao transmitir mensagem');
  const result = await res.json();
  const savedMsg = { ...payload, id: result.name };

  // 2. Busca todos os device IDs ativos pertencentes ao destinatário (pelo nome)
  // Para espelhar a mensagem e alertar o aparelho correto onde o fiel estiver com o app aberto!
  const targetIds = new Set([destId]);
  try {
    const presRes = await fetch(`${COMUNIDADE_BASE_URL}/presenca.json`, { cache: 'no-cache' });
    if (presRes.ok) {
      const presData = await presRes.json();
      if (presData && typeof presData === 'object') {
        const destNomeLower = destNome.trim().toLowerCase();
        Object.keys(presData).forEach(k => {
          const item = presData[k];
          if (item && item.nome && item.nome.trim().toLowerCase() === destNomeLower) {
            targetIds.add(k);
          }
        });
      }
    }
  } catch (e) {}

  // 3. Grava notificação de Caixa de Entrada para todos os IDs do destinatário
  const notifPayload = {
    de_id: perfil.id,
    de_nome: perfil.nome,
    de_paroquia: perfil.paroquia,
    de_cidade: perfil.cidade,
    de_estado: perfil.estado,
    para_id: destId,
    para_nome: destNome,
    texto: cleanTexto,
    timestamp: Date.now(),
    lido: false
  };

  for (const tid of targetIds) {
    // Escreve na caixa_entrada/{tid}/{perfil.id}.json
    fetch(`${COMUNIDADE_BASE_URL}/caixa_entrada/${tid}/${perfil.id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notifPayload)
    }).catch(() => {});

    // Se houver outro ID ativo, espelha a mensagem também na conversa daquele ID
    if (tid !== destId) {
      const altChatId = getChatId(perfil.id, tid);
      fetch(`${COMUNIDADE_BASE_URL}/conversas_diretas/${altChatId}/mensagens.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, para_id: tid })
      }).catch(() => {});
    }
  }

  // 4. Também grava na caixa de entrada indexada pelo nome limpo do destinatário
  const destNomeSlug = destNome.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
  if (destNomeSlug) {
    fetch(`${COMUNIDADE_BASE_URL}/caixa_entrada_nome/${destNomeSlug}/${perfil.id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notifPayload)
    }).catch(() => {});
  }

  // 5. Atualiza o ultimo_recado do autor para exibir no card em Fiéis Online
  const recadoPayload = {
    texto: cleanTexto,
    timestamp: Date.now(),
    para_nome: destNome,
    para_id: destId
  };
  try {
    localStorage.setItem('biblia_fiel_ultimo_recado', JSON.stringify(recadoPayload));
  } catch (e) {}

  fetch(`${COMUNIDADE_BASE_URL}/presenca/${perfil.id}/ultimo_recado.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recadoPayload)
  }).catch(() => {});

  // 6. Atualiza batimento de presença
  pingPresencaOnline().catch(() => {});

  return savedMsg;
}

// ==========================================================================
// CAIXA DE ENTRADA & NOTIFICAÇÕES EM TEMPO REAL
// ==========================================================================
let caixaEntradaPollTimer = null;
const notifiedMessageKeys = new Set();

/**
 * Escuta continuamente a caixa de entrada para notificar o fiel instantaneamente
 */
export async function checkCaixaEntrada(onNewMessage) {
  try {
    const perfil = await getPerfilFiel();
    const myId = perfil.id;
    const myNomeSlug = (perfil.nome || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '_');

    const unreadItems = [];

    // 1. Verifica caixa do deviceId
    try {
      const resId = await fetch(`${COMUNIDADE_BASE_URL}/caixa_entrada/${myId}.json`, { cache: 'no-cache' });
      if (resId.ok) {
        const data = await resId.json();
        if (data && typeof data === 'object') {
          Object.keys(data).forEach(k => {
            const item = data[k];
            if (item && item.lido === false && item.de_id !== myId) {
              unreadItems.push({ ...item, key: k, type: 'device' });
            }
          });
        }
      }
    } catch (e) {}

    // 2. Verifica caixa pelo nome do usuário (caso o device ID tenha mudado)
    if (myNomeSlug && myNomeSlug !== 'irmao_em_cristo') {
      try {
        const resNome = await fetch(`${COMUNIDADE_BASE_URL}/caixa_entrada_nome/${myNomeSlug}.json`, { cache: 'no-cache' });
        if (resNome.ok) {
          const dataNome = await resNome.json();
          if (dataNome && typeof dataNome === 'object') {
            Object.keys(dataNome).forEach(k => {
              const item = dataNome[k];
              if (item && item.lido === false && item.de_id !== myId) {
                const already = unreadItems.find(x => x.de_id === item.de_id && x.timestamp === item.timestamp);
                if (!already) {
                  unreadItems.push({ ...item, key: k, type: 'name' });
                }
              }
            });
          }
        }
      } catch (e) {}
    }

    if (unreadItems.length > 0 && typeof onNewMessage === 'function') {
      for (const item of unreadItems) {
        const itemKey = `${item.de_id}_${item.timestamp}`;
        if (!notifiedMessageKeys.has(itemKey)) {
          notifiedMessageKeys.add(itemKey);
          onNewMessage(item);
        }
      }
    }
  } catch (e) {}
}

export function startCaixaEntradaListener(onNewMessage) {
  if (caixaEntradaPollTimer) clearInterval(caixaEntradaPollTimer);
  checkCaixaEntrada(onNewMessage);
  caixaEntradaPollTimer = setInterval(() => {
    checkCaixaEntrada(onNewMessage);
  }, 3000);
}

export function stopCaixaEntradaListener() {
  if (caixaEntradaPollTimer) {
    clearInterval(caixaEntradaPollTimer);
    caixaEntradaPollTimer = null;
  }
}

export async function marcarMensagemLida(senderId, senderNome = '') {
  try {
    const perfil = await getPerfilFiel();
    const myId = perfil.id;
    const myNomeSlug = (perfil.nome || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '_');

    // Remove ou marca como lido no nó do device
    fetch(`${COMUNIDADE_BASE_URL}/caixa_entrada/${myId}/${senderId}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lido: true })
    }).catch(() => {});

    // Remove ou marca como lido no nó do nome
    if (myNomeSlug) {
      fetch(`${COMUNIDADE_BASE_URL}/caixa_entrada_nome/${myNomeSlug}/${senderId}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lido: true })
      }).catch(() => {});
    }
  } catch (e) {}
}

export function startChatDiretoPolling(chatId, destId = null, destNome = null, onUpdate = null) {
  stopChatDiretoPolling();
  // Trata caso a chamada use apenas 2 argumentos (chatId, onUpdate)
  const callback = typeof destId === 'function' ? destId : (typeof onUpdate === 'function' ? onUpdate : () => {});
  const actualDestId = typeof destId === 'function' ? null : destId;
  const actualDestNome = typeof destNome === 'function' ? null : destNome;

  getConversaDireta(chatId, actualDestId, actualDestNome).then(callback).catch(() => {});
  chatDiretoPollTimer = setInterval(async () => {
    try {
      const msgs = await getConversaDireta(chatId, actualDestId, actualDestNome);
      callback(msgs);
    } catch (e) {}
  }, 3000);
}

export function stopChatDiretoPolling() {
  if (chatDiretoPollTimer) {
    clearInterval(chatDiretoPollTimer);
    chatDiretoPollTimer = null;
  }
}


