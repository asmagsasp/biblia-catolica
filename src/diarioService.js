/**
 * diarioService.js - Diário Espiritual & Mural de Graças Alcançadas ("Livro da Gratidão")
 * Permite ao fiel registrar suas intenções de oração e testemunhar as bênçãos recebidas.
 */

import { Preferences } from '@capacitor/preferences';

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

/**
 * Retorna todos os registros do diário espiritual ordenados por data
 */
export async function getDiarioItens() {
  try {
    const res = await Preferences.get({ key: STORAGE_KEY_DIARIO });
    if (res && res.value) {
      return JSON.parse(res.value);
    }
  } catch (e) {
    const raw = localStorage.getItem(STORAGE_KEY_DIARIO);
    if (raw) return JSON.parse(raw);
  }

  // Exemplos iniciais para encantar o usuário na primeira abertura
  return [
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
}

async function persistirDiario(itens) {
  const dataString = JSON.stringify(itens);
  try {
    await Preferences.set({ key: STORAGE_KEY_DIARIO, value: dataString });
  } catch (e) {
    localStorage.setItem(STORAGE_KEY_DIARIO, dataString);
  }
}

/**
 * Adiciona um novo pedido de oração no diário
 */
export async function salvarNovoItemDiario(novo) {
  const itens = await getDiarioItens();
  const itemFormatado = {
    id: 'diario_' + Date.now(),
    titulo: novo.titulo.trim(),
    pedido: novo.pedido.trim(),
    categoria: novo.categoria || 'agradecimento',
    status: 'em_oracao',
    dataInicio: new Date().toISOString(),
    dataGraca: null,
    testemunho: '',
    versiculo: novo.versiculo ? novo.versiculo.trim() : ''
  };

  itens.unshift(itemFormatado);
  await persistirDiario(itens);
  return itemFormatado;
}

/**
 * Atualiza um pedido marcando-o como Graça Alcançada
 */
export async function marcarGracaAlcancada(id, testemunho, versiculo = '') {
  const itens = await getDiarioItens();
  const index = itens.findIndex(i => i.id === id);
  if (index !== -1) {
    itens[index].status = 'graca_alcancada';
    itens[index].dataGraca = new Date().toISOString();
    itens[index].testemunho = (testemunho || '').trim();
    if (versiculo) itens[index].versiculo = versiculo.trim();
    await persistirDiario(itens);
    return itens[index];
  }
  return null;
}

/**
 * Reverte o status para Em Oração
 */
export async function reabrirEmOracao(id) {
  const itens = await getDiarioItens();
  const index = itens.findIndex(i => i.id === id);
  if (index !== -1) {
    itens[index].status = 'em_oracao';
    itens[index].dataGraca = null;
    await persistirDiario(itens);
    return itens[index];
  }
  return null;
}

/**
 * Exclui um registro do diário
 */
export async function excluirItemDiario(id) {
  let itens = await getDiarioItens();
  itens = itens.filter(i => i.id !== id);
  await persistirDiario(itens);
  return itens;
}

/**
 * Retorna estatísticas rápidas do diário
 */
export async function getEstatisticasDiario() {
  const itens = await getDiarioItens();
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
