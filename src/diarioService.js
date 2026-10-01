/**
 * diarioService.js - Diário Espiritual & Mural de Graças Alcançadas ("Livro da Gratidão")
 * Sincronizado em Tempo Real na Nuvem (Firebase Cloud) + Cache Offline Local
 */

import { Preferences } from '@capacitor/preferences';
import { FIREBASE_DB_URL } from './firebaseGallery.js';

export const DIARIO_CATEGORIAS = [
  { id: "saude", nome: "Saúde & Cura", icone: "fa-heart-pulse", cor: "#ef4444" },
  { id: "familia", nome: "Família & Lar", icone: "fa-house-chimney-window", cor: "#f59e0b" },
  { id: "conversao", nome: "Conversão & Fé", icone: "fa-cross", cor: "#8b5cf6" },
  { id: "trabalho", nome: "Trabalho & Finanças", icone: "fa-briefcase", cor: "#3b82f6" },
  { id: "vocacao", nome: "Vocação & Discernimento", icone: "fa-compass", cor: "#06b6d4" },
  { id: "protecao", nome: "Proteção & Libertação", icone: "fa-shield-halved", cor: "#10b981" },
  { id: "agradecimento", nome: "Louvor & Gratidão", icone: "fa-hands-praying", cor: "#eab308" }
];

const STORAGE_KEY_DIARIO = 'diario_espiritual_gracas_v1';

const DEFAULT_INITIAL_DIARIO = [
  {
    id: "exemplo_1",
    titulo: "Pela restauração da saúde do meu pai",
    pedido: "Peço a intercessão de São José e de Nossa Senhora pela recuperação da saúde do meu pai.",
    categoria: "saude",
    status: "graca_alcancada",
    dataInicio: new Date(Date.now() - 30 * 86400000).toISOString(),
    dataGraca: new Date(Date.now() - 5 * 86400000).toISOString(),
    testemunho: "Graças a Deus e às orações, os exames deram ótimos e ele recebeu alta com a bênção divina!",
    versiculo: "Salmos 103,2-3"
  },
  {
    id: "exemplo_2",
    titulo: "Paz e união no meu casamento",
    pedido: "Senhor Jesus, derramai o Vosso amor e o Espírito Santo no nosso lar, afastando toda discórdia.",
    categoria: "familia",
    status: "em_oracao",
    dataInicio: new Date(Date.now() - 12 * 86400000).toISOString(),
    dataGraca: null,
    testemunho: "",
    versiculo: "1 Coríntios 13,7"
  }
];

/**
 * Lê o cache local
 */
async function getDiarioLocalCache() {
  try {
    const res = await Preferences.get({ key: STORAGE_KEY_DIARIO });
    if (res && res.value) return JSON.parse(res.value);
  } catch (e) {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DIARIO);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

/**
 * Salva no cache local
 */
async function setDiarioLocalCache(itens) {
  const dataString = JSON.stringify(itens);
  try {
    await Preferences.set({ key: STORAGE_KEY_DIARIO, value: dataString });
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEY_DIARIO, dataString);
  } catch (e) {}
}

/**
 * Retorna todos os registros do diário espiritual sincronizados com o Firebase Cloud
 */
export async function getDiarioItens() {
  let cloudItems = [];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${FIREBASE_DB_URL}/diario_oracoes.json`, {
      signal: controller.signal,
      cache: 'no-cache'
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        for (const [key, val] of Object.entries(data)) {
          if (val && val.titulo) {
            cloudItems.push({
              id: key,
              titulo: val.titulo || '',
              pedido: val.pedido || '',
              categoria: val.categoria || 'agradecimento',
              status: val.status || 'em_oracao',
              dataInicio: val.dataInicio || new Date().toISOString(),
              dataGraca: val.dataGraca || null,
              testemunho: val.testemunho || '',
              versiculo: val.versiculo || ''
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('[DiarioService] Falha ao consultar Firebase, usando cache local:', err);
  }

  // Mescla com cache local e exemplos iniciais
  const localCache = await getDiarioLocalCache();
  const mergedMap = new Map();

  // 1. Exemplos iniciais como fallback se nada existir
  if (cloudItems.length === 0 && localCache.length === 0) {
    DEFAULT_INITIAL_DIARIO.forEach(i => mergedMap.set(i.id, i));
  }

  // 2. Cloud items (fonte da verdade)
  cloudItems.forEach(i => mergedMap.set(i.id, i));

  // 3. Local cache
  localCache.forEach(i => {
    if (!mergedMap.has(i.id)) {
      mergedMap.set(i.id, i);
    }
  });

  const allItems = Array.from(mergedMap.values());
  allItems.sort((a, b) => new Date(b.dataInicio || 0) - new Date(a.dataInicio || 0));

  // Atualiza cache local
  await setDiarioLocalCache(allItems);

  return allItems;
}

/**
 * Adiciona um novo pedido de oração no diário e sincroniza no Firebase Cloud
 */
export async function salvarNovoItemDiario(novo) {
  let itemFormatado = {
    id: 'diario_' + Date.now(),
    titulo: (novo.titulo || '').trim(),
    pedido: (novo.pedido || '').trim(),
    categoria: novo.categoria || 'agradecimento',
    status: 'em_oracao',
    dataInicio: new Date().toISOString(),
    dataGraca: null,
    testemunho: '',
    versiculo: novo.versiculo ? novo.versiculo.trim() : ''
  };

  // 1. Salvar na nuvem Firebase
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/diario_oracoes.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemFormatado)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.name) {
        itemFormatado.id = data.name;
      }
    }
  } catch (err) {
    console.warn('[DiarioService] Falha ao salvar no Firebase, salvando localmente:', err);
  }

  // 2. Salvar localmente
  const itens = await getDiarioLocalCache();
  itens.unshift(itemFormatado);
  await setDiarioLocalCache(itens);

  return itemFormatado;
}

/**
 * Atualiza um pedido marcando-o como Graça Alcançada e sincroniza na nuvem
 */
export async function marcarGracaAlcancada(id, testemunho, versiculo = '') {
  const patchData = {
    status: 'graca_alcancada',
    dataGraca: new Date().toISOString(),
    testemunho: (testemunho || '').trim(),
    versiculo: (versiculo || '').trim()
  };

  // 1. Atualizar no Firebase Cloud
  try {
    await fetch(`${FIREBASE_DB_URL}/diario_oracoes/${id}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchData)
    });
  } catch (err) {
    console.warn('[DiarioService] Falha ao sincronizar graça com Firebase:', err);
  }

  // 2. Atualizar cache local
  const itens = await getDiarioLocalCache();
  const index = itens.findIndex(i => i.id === id);
  if (index !== -1) {
    itens[index] = { ...itens[index], ...patchData };
    await setDiarioLocalCache(itens);
    return itens[index];
  }
  return null;
}

/**
 * Reverte o status para Em Oração e sincroniza na nuvem
 */
export async function reabrirEmOracao(id) {
  const patchData = {
    status: 'em_oracao',
    dataGraca: null
  };

  try {
    await fetch(`${FIREBASE_DB_URL}/diario_oracoes/${id}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchData)
    });
  } catch (err) {}

  const itens = await getDiarioLocalCache();
  const index = itens.findIndex(i => i.id === id);
  if (index !== -1) {
    itens[index] = { ...itens[index], ...patchData };
    await setDiarioLocalCache(itens);
    return itens[index];
  }
  return null;
}

/**
 * Exclui um registro do diário e remove do Firebase Cloud
 */
export async function excluirItemDiario(id) {
  try {
    await fetch(`${FIREBASE_DB_URL}/diario_oracoes/${id}.json`, {
      method: 'DELETE'
    });
  } catch (err) {}

  let itens = await getDiarioLocalCache();
  itens = itens.filter(i => i.id !== id);
  await setDiarioLocalCache(itens);
  return itens;
}

/**
 * Retorna estatísticas rápidas do diário
 */
export async function getEstatisticasDiario() {
  const itens = await getDiarioLocalCache();
  const total = itens.length;
  const emOracao = itens.filter(i => i.status === 'em_oracao').length;
  const alcancadas = itens.filter(i => i.status === 'graca_alcancada').length;

  return { total, emOracao, alcancadas };
}

/**
 * Gera texto para compartilhamento de testemunho de graça no WhatsApp
 */
export function formatarTestemunhoWhatsApp(item) {
  let texto = `🕊️ *TESTEMUNHO DE FÉ & GRAÇA ALCANÇADA!* 🙏✨\n\n`;
  texto += `📌 *${item.titulo}*\n`;
  if (item.testemunho) {
    texto += `\n“${item.testemunho}”\n`;
  }
  if (item.versiculo) {
    texto += `\n📖 _${item.versiculo}_\n`;
  }
  texto += `\n_“Tudo é possível àquele que crê.” (Mc 9,23)_\n`;
  texto += `\n*Bíblia Sagrada Católica*\nhttps://bibliasagradaavemaria.com.br`;
  return texto;
}
