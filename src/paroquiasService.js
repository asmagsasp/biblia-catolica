// Serviço de Identificação Paroquial e Sincronização Fraterna de 30%
import { Preferences } from '@capacitor/preferences';
import { FIREBASE_DB_URL } from './firebaseGallery.js';

const STORAGE_KEY = 'biblia_paroquia_perfil';
const DISMISSED_KEY = 'biblia_paroquia_dismissed';
const DEVICE_KEY = 'biblia_device_id';

// Lista de Estados do Brasil (UF e Nome Completo)
export const ESTADOS_BRASIL = [
  { uf: 'AC', nome: 'Acre' },
  { uf: 'AL', nome: 'Alagoas' },
  { uf: 'AP', nome: 'Amapá' },
  { uf: 'AM', nome: 'Amazonas' },
  { uf: 'BA', nome: 'Bahia' },
  { uf: 'CE', nome: 'Ceará' },
  { uf: 'DF', nome: 'Distrito Federal' },
  { uf: 'ES', nome: 'Espírito Santo' },
  { uf: 'GO', nome: 'Goiás' },
  { uf: 'MA', nome: 'Maranhão' },
  { uf: 'MT', nome: 'Mato Grosso' },
  { uf: 'MS', nome: 'Mato Grosso do Sul' },
  { uf: 'MG', nome: 'Minas Gerais' },
  { uf: 'PA', nome: 'Pará' },
  { uf: 'PB', nome: 'Paraíba' },
  { uf: 'PR', nome: 'Paraná' },
  { uf: 'PE', nome: 'Pernambuco' },
  { uf: 'PI', nome: 'Piauí' },
  { uf: 'RJ', nome: 'Rio de Janeiro' },
  { uf: 'RN', nome: 'Rio Grande do Norte' },
  { uf: 'RS', nome: 'Rio Grande do Sul' },
  { uf: 'RO', nome: 'Rondônia' },
  { uf: 'RR', nome: 'Roraima' },
  { uf: 'SC', nome: 'Santa Catarina' },
  { uf: 'SP', nome: 'São Paulo' },
  { uf: 'SE', nome: 'Sergipe' },
  { uf: 'TO', nome: 'Tocantins' }
];

/**
 * Retorna ou gera um identificador único de instalação para sincronização segura
 */
export async function getDeviceId() {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      const res = await Preferences.get({ key: DEVICE_KEY });
      id = res && res.value ? res.value : null;
    }
    if (!id) {
      id = 'fiel_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      localStorage.setItem(DEVICE_KEY, id);
      await Preferences.set({ key: DEVICE_KEY, value: id });
    }
    return id;
  } catch (e) {
    return 'fiel_anon_' + Date.now().toString(36);
  }
}

/**
 * Carrega a paróquia registrada localmente (do LocalStorage ou Preferences)
 */
export async function getLocalParoquia() {
  try {
    // 1. Tenta LocalStorage primeiro (rápido e síncrono)
    const localRaw = localStorage.getItem(STORAGE_KEY);
    if (localRaw) {
      try {
        const parsed = JSON.parse(localRaw);
        if (parsed && parsed.paroquia) return parsed;
      } catch (e) {}
    }

    // 2. Fallback para Preferences do Capacitor
    const prefRes = await Preferences.get({ key: STORAGE_KEY });
    if (prefRes && prefRes.value) {
      try {
        const parsed = JSON.parse(prefRes.value);
        if (parsed && parsed.paroquia) {
          localStorage.setItem(STORAGE_KEY, prefRes.value);
          return parsed;
        }
      } catch (e) {}
    }
  } catch (e) {
    console.warn('[ParoquiaService] Erro ao ler paróquia local:', e);
  }
  return null;
}

/**
 * Verifica se o usuário optou por pular o cadastro na primeira vez
 */
export async function isParoquiaDismissed() {
  try {
    const localVal = localStorage.getItem(DISMISSED_KEY);
    if (localVal === 'true') return true;
    const prefRes = await Preferences.get({ key: DISMISSED_KEY });
    return prefRes && prefRes.value === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Marca como ignorado temporariamente (para não forçar a tela em todas as aberturas)
 */
export async function dismissParoquiaOnboarding() {
  try {
    localStorage.setItem(DISMISSED_KEY, 'true');
    await Preferences.set({ key: DISMISSED_KEY, value: 'true' });
  } catch (e) {}
}

/**
 * Salva a paróquia localmente e dispara sincronização com Firebase
 */
export async function saveParoquia(data) {
  if (!data || !data.estado || !data.cidade || !data.paroquia) {
    throw new Error('Estado, Cidade e Nome da Paróquia são obrigatórios');
  }

  const deviceId = await getDeviceId();
  const payload = {
    id: deviceId,
    estado: String(data.estado).trim().toUpperCase(),
    cidade: String(data.cidade).trim(),
    paroquia: String(data.paroquia).trim(),
    pix_chave: data.pix_chave ? String(data.pix_chave).trim() : '',
    nome_devoto: data.nome_devoto ? String(data.nome_devoto).trim() : '',
    updated_at: new Date().toISOString()
  };

  const jsonStr = JSON.stringify(payload);

  // 1. Grava no LocalStorage e no Capacitor Preferences
  try {
    localStorage.setItem(STORAGE_KEY, jsonStr);
    localStorage.removeItem(DISMISSED_KEY); // Limpa flag de ignorado
    if (payload.nome_devoto) {
      localStorage.setItem('biblia_fiel_nome', payload.nome_devoto);
      await Preferences.set({ key: 'biblia_fiel_nome', value: payload.nome_devoto });
    }
    await Preferences.set({ key: STORAGE_KEY, value: jsonStr });
    await Preferences.remove({ key: DISMISSED_KEY });
  } catch (e) {
    console.warn('[ParoquiaService] Erro ao persistir localmente:', e);
  }

  // 2. Sincroniza em segundo plano com a nuvem Firebase Realtime Database
  syncParoquiaToFirebase(payload).catch(err => {
    console.warn('[ParoquiaService] Sincronização com nuvem adiada (offline):', err);
  });

  return payload;
}

/**
 * Envia o registro da paróquia para o Firebase Realtime Database
 */
export async function syncParoquiaToFirebase(payload) {
  if (!payload || !payload.id) return;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const url = `${FIREBASE_DB_URL}/paroquias_cadastradas/${payload.id}.json`;
    
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (res.ok) {
      console.log('[ParoquiaService] Paróquia sincronizada com a nuvem Firebase com sucesso!');
    }
  } catch (err) {
    console.warn('[ParoquiaService] Falha de rede ao enviar paróquia:', err);
    throw err;
  }
}

/**
 * Busca todas as paróquias cadastradas na nuvem para o painel de fechamento de 30% do Padre
 */
export async function fetchAllParoquiasFromFirebase() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const url = `${FIREBASE_DB_URL}/paroquias_cadastradas.json`;

    const res = await fetch(url, {
      cache: 'no-cache',
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) return [];
    const data = await res.json();
    if (!data || typeof data !== 'object') return [];

    const list = Object.values(data).filter(item => item && item.paroquia);
    list.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
    return list;
  } catch (err) {
    console.warn('[ParoquiaService] Falha ao carregar paróquias da nuvem:', err);
    return [];
  }
}
