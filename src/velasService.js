/**
 * velasService.js - Mural Comunitário de Intenções: "Acenda uma Vela Virtual"
 * Bíblia Sagrada Católica (Edição Ave Maria)
 */

import { FIREBASE_DB_URL } from './firebaseGallery.js';
import { Preferences } from '@capacitor/preferences';

export const VELAS_CATEGORIAS = {
  todos: { id: 'todos', label: 'Todas as Velas', icon: 'fa-fire' },
  saude: { id: 'saude', label: 'Saúde & Cura', icon: 'fa-heart-pulse', color: '#22c55e' },
  familia: { id: 'familia', label: 'Paz na Família', icon: 'fa-house-heart', color: '#3b82f6' },
  graca: { id: 'graca', label: 'Graça & Milagre', icon: 'fa-hands-praying', color: '#eab308' },
  trabalho: { id: 'trabalho', label: 'Trabalho & Pão', icon: 'fa-briefcase', color: '#f97316' },
  conversao: { id: 'conversao', label: 'Conversão', icon: 'fa-cross', color: '#a855f7' },
  almas: { id: 'almas', label: 'Pelos Falecidos', icon: 'fa-dove', color: '#94a3b8' },
  agradecimento: { id: 'agradecimento', label: 'Ação de Graças', icon: 'fa-sparkles', color: '#ec4899' }
};

const LOCAL_STORAGE_VELAS_KEY = 'biblia_velas_local_cache';
const LOCAL_STORAGE_REZADAS_KEY = 'biblia_velas_minhas_rezadas';
const LOCAL_STORAGE_MINHAS_VELAS_KEY = 'biblia_minhas_proprias_velas';

// Initial default seed candles for inspiring presentation
const DEFAULT_INITIAL_VELAS = [
  {
    id: "vela_seed_1",
    autor: "Maria Aparecida",
    cidade: "Aparecida - SP",
    categoria: "saude",
    intencao: "Peço a intercessão de Nossa Senhora pela recuperação da saúde do meu neto Miguel e por todos os enfermos que estão nos hospitais.",
    dataCriacao: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    oracoesCount: 142
  },
  {
    id: "vela_seed_2",
    autor: "Antônio Carlos",
    cidade: "Belo Horizonte - MG",
    categoria: "familia",
    intencao: "Pela paz e reconciliação no meu lar, e para que o amor de Cristo reine entre meus filhos e minha esposa.",
    dataCriacao: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    oracoesCount: 98
  },
  {
    id: "vela_seed_3",
    autor: "Terezinha de Jesus",
    cidade: "Fortaleza - CE",
    categoria: "graca",
    intencao: "Em oração a Santa Rita de Cássia por uma causa muito difícil e por uma porta aberta de trabalho.",
    dataCriacao: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    oracoesCount: 215
  },
  {
    id: "vela_seed_4",
    autor: "Anônimo",
    cidade: "Curitiba - PR",
    categoria: "agradecimento",
    intencao: "Agradeço a Deus por uma grande graça alcançada na minha vida profissional através da oração do Santo Terço diário.",
    dataCriacao: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    oracoesCount: 76
  }
];

/**
 * Carrega a lista de velas rezadas pelo usuário no dispositivo atual
 */
export async function getVelasRezadasLocal() {
  try {
    const { value } = await Preferences.get({ key: LOCAL_STORAGE_REZADAS_KEY });
    if (value) return JSON.parse(value);
  } catch (e) {}
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REZADAS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

/**
 * Salva a lista de velas rezadas
 */
export async function saveVelaRezadaLocal(velaId) {
  const list = await getVelasRezadasLocal();
  if (!list.includes(velaId)) {
    list.push(velaId);
    try {
      await Preferences.set({ key: LOCAL_STORAGE_REZADAS_KEY, value: JSON.stringify(list) });
    } catch (e) {}
    try {
      localStorage.setItem(LOCAL_STORAGE_REZADAS_KEY, JSON.stringify(list));
    } catch (e) {}
  }
  return list;
}

/**
 * Obtém todas as velas de intenção ativas da nuvem Firebase (ou fallback local)
 */
export async function getVelasOracao() {
  let cloudItems = [];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${FIREBASE_DB_URL}/velas_oracao.json`, {
      signal: controller.signal,
      cache: 'no-cache'
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        for (const [key, val] of Object.entries(data)) {
          if (val && val.intencao) {
            cloudItems.push({
              id: key,
              autor: val.autor || 'Anônimo',
              cidade: val.cidade || '',
              categoria: val.categoria || 'graca',
              intencao: val.intencao || '',
              dataCriacao: val.dataCriacao || new Date().toISOString(),
              oracoesCount: parseInt(val.oracoesCount || 0)
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('[VelasService] Falha ao consultar Firebase, usando cache local:', err);
  }

  // Merge with local created candles and seeds
  let localVelas = [];
  try {
    const { value } = await Preferences.get({ key: LOCAL_STORAGE_MINHAS_VELAS_KEY });
    if (value) localVelas = JSON.parse(value);
  } catch (e) {}

  const mergedMap = new Map();

  // 1. Initial seeds
  DEFAULT_INITIAL_VELAS.forEach(v => mergedMap.set(v.id, v));

  // 2. Cloud items
  cloudItems.forEach(v => mergedMap.set(v.id, v));

  // 3. Local created items
  localVelas.forEach(v => mergedMap.set(v.id, v));

  const allVelas = Array.from(mergedMap.values());

  // Sort: Most recent first
  allVelas.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));

  return allVelas;
}

/**
 * Acende uma nova vela de oração no Mural e salva na nuvem
 */
export async function acenderNovaVela({ autor, cidade, categoria, intencao }) {
  const novaVela = {
    autor: (autor || 'Anônimo').trim(),
    cidade: (cidade || '').trim(),
    categoria: categoria || 'graca',
    intencao: (intencao || '').trim(),
    dataCriacao: new Date().toISOString(),
    oracoesCount: 1
  };

  let createdId = `vela_${Date.now()}`;

  // 1. Enviar para Firebase Realtime Database
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/velas_oracao.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaVela)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.name) {
        createdId = data.name;
      }
    }
  } catch (err) {
    console.warn('[VelasService] Não foi possível salvar na nuvem agora, salvando localmente:', err);
  }

  const velaCompleta = { ...novaVela, id: createdId };

  // 2. Salvar localmente em Minhas Velas
  try {
    let minhas = [];
    const { value } = await Preferences.get({ key: LOCAL_STORAGE_MINHAS_VELAS_KEY });
    if (value) minhas = JSON.parse(value);
    minhas.unshift(velaCompleta);
    await Preferences.set({ key: LOCAL_STORAGE_MINHAS_VELAS_KEY, value: JSON.stringify(minhas) });
  } catch (e) {}

  // Auto-marcar como rezada pelo próprio autor
  await saveVelaRezadaLocal(createdId);

  return velaCompleta;
}

/**
 * Registra que o fiel rezou por uma intenção ("Rezei por você 🙏")
 */
export async function rezarPorVela(velaId, currentCount = 0) {
  await saveVelaRezadaLocal(velaId);
  const newCount = currentCount + 1;

  // Atualiza no Firebase se não for seed local
  if (!velaId.startsWith('vela_seed_')) {
    try {
      await fetch(`${FIREBASE_DB_URL}/velas_oracao/${velaId}/oracoesCount.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCount)
      });
    } catch (e) {
      console.warn('[VelasService] Erro ao incrementar oração na nuvem:', e);
    }
  }

  return newCount;
}

/**
 * Calcula se a vela ainda está acesa (duração de 7 dias)
 */
export function isVelaAcesa(vela) {
  if (!vela || !vela.dataCriacao) return true;
  const created = new Date(vela.dataCriacao).getTime();
  const diffDays = (Date.now() - created) / (1000 * 3600 * 24);
  return diffDays <= 7;
}

/**
 * Formata o tempo restante da vela acesa
 */
export function formatarStatusVela(dataCriacao) {
  if (!dataCriacao) return 'Vela acesa';
  const created = new Date(dataCriacao).getTime();
  const diffHours = Math.floor((Date.now() - created) / (1000 * 3600));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 7) {
    return 'Vela cumprida (7 dias de oração)';
  }

  const diasRestantes = 7 - diffDays;
  if (diffDays === 0) {
    return `Acesa hoje • Restam ${diasRestantes} dias`;
  }
  return `Acesa há ${diffDays} dia${diffDays > 1 ? 's' : ''} • Restam ${diasRestantes} dias`;
}
