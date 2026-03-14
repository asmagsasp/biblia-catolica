export let isDBReady = false;
let bibliaData = null;
let planCache = null;
let livrosMap = new Map();
let totalVersiculosPrecalc = 0;
let favoritosCount = 0;
let favoritos = {};
let saveTimeout = null;

function loadFavoritos() {
    try {
        const saved = localStorage.getItem('biblia_favoritos');
        favoritos = saved ? JSON.parse(saved) : {};
    } catch (e) {
        favoritos = {};
    }
}

function saveFavoritos() {
    try {
        localStorage.setItem('biblia_favoritos', JSON.stringify(favoritos));
    } catch (e) {
        console.error("[BibliaDB] Erro ao salvar:", e);
    }
}

export async function initDB() {
    if (bibliaData) return;
    try {
        console.log("[BibliaDB] Iniciando fetch...");
        const res = await fetch('/data/biblia.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        bibliaData = await res.json();
        
        loadFavoritos();
        
        // Indexar livros
        bibliaData.livros.forEach(l => livrosMap.set(l.id_livro, l));
        
        totalVersiculosPrecalc = 0;
        for (const key in bibliaData.versiculos) {
            totalVersiculosPrecalc += bibliaData.versiculos[key].length;
        }
        
        favoritosCount = Object.keys(favoritos).length;
        isDBReady = true;
        console.log("[BibliaDB] Banco de dados pronto.");
        
        // Aquecer cache em background (não trava o boot)
        setTimeout(() => getPlanoLeitura(), 1000);
    } catch (e) {
        console.error("[BibliaDB] ERRO CRÍTICO NO INIT:", e);
        // Fallback básico para não travar o app na splash
        bibliaData = { livros: [], versiculos: {}, img_versiculos: [] };
        isDBReady = true;
    }
}

export function isReady() { return isDBReady; }

export function getLivros() {
    return bibliaData.livros;
}

export function getVersiculos(idLivro, idCapitulo) {
    const key = `${idLivro}_${idCapitulo}`;
    const vs = bibliaData.versiculos[key] || [];
    return vs.map(v => ({
        id_versiculo: v.v,
        texto: v.t,
        favorito: favoritos[`${idLivro}_${idCapitulo}_${v.v}`] ? 1 : 0
    }));
}

export function buscar(termo) {
    if (!termo || termo.length < 3) return [];
    const lower = termo.toLowerCase();
    const resultados = [];

    for (const livro of bibliaData.livros) {
        for (let cap = 1; cap <= livro.total_capitulos; cap++) {
            const key = `${livro.id_livro}_${cap}`;
            const vs = bibliaData.versiculos[key] || [];
            for (const v of vs) {
                if (v.t.toLowerCase().includes(lower)) {
                    resultados.push({
                        id_livro: livro.id_livro,
                        nome_livro: livro.nome_livro,
                        id_capitulo: cap,
                        id_versiculo: v.v,
                        texto: v.t
                    });
                    if (resultados.length >= 50) return resultados;
                }
            }
        }
    }
    return resultados;
}

export function getVersiculoDoDia() {
    const imgs = bibliaData.img_versiculos;
    if (!imgs.length) return null;
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    return imgs[dayOfYear % imgs.length];
}

export function toggleFavorito(idLivro, idCapitulo, idVersiculo) {
    const key = `${idLivro}_${idCapitulo}_${idVersiculo}`;
    if (favoritos[key]) {
        delete favoritos[key];
        favoritosCount = Math.max(0, favoritosCount - 1);
    } else {
        favoritos[key] = true;
        favoritosCount++;
    }
    saveFavoritos();
    return favoritos[key] ? 1 : 0;
}

export function getFavoritos() {
    const result = [];
    if (!isDBReady) return [];
    
    const keys = Object.keys(favoritos);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        try {
            const parts = key.split('_');
            if (parts.length !== 3) continue;
            
            const livroId = parseInt(parts[0]);
            const cap = parseInt(parts[1]);
            const ver = parseInt(parts[2]);
            
            const livroInfo = livrosMap.get(livroId);
            if (!livroInfo) continue;
            
            const keyVs = `${livroId}_${cap}`;
            const vs = bibliaData.versiculos[keyVs] || [];
            // Otimização: find direto
            const v = vs.find(x => x.v === ver);
            
            if (v) {
                result.push({
                    id_livro: livroId,
                    nome_livro: livroInfo.nome_livro,
                    id_capitulo: cap,
                    id_versiculo: ver,
                    texto: v.t
                });
            }
        } catch (e) { }
    }
    return result.sort((a, b) => a.id_livro - b.id_livro || a.id_capitulo - b.id_capitulo || a.id_versiculo - b.id_versiculo);
}

function limparFavoritosOrfaos() {
    if (!isDBReady) return;
    let changed = false;
    for (const key of Object.keys(favoritos)) {
        const parts = key.split('_').map(Number);
        const [lid, cap, ver] = parts;
        const vs = bibliaData.versiculos[`${lid}_${cap}`] || [];
        if (!vs.find(x => x.v === ver)) {
            delete favoritos[key];
            changed = true;
        }
    }
    if (changed) {
        favoritosCount = Object.keys(favoritos).length;
        localStorage.setItem('biblia_favoritos', JSON.stringify(favoritos));
    }
}

export function getImgVersiculos() {
    return bibliaData.img_versiculos;
}

export function getPlanoLeitura() {
    if (planCache) return planCache;
    if (!bibliaData) return [];
    
    const allChapters = [];
    const livros = bibliaData.livros;
    for (let i = 0; i < livros.length; i++) {
        const livro = livros[i];
        for (let cap = 1; cap <= livro.total_capitulos; cap++) {
            allChapters.push({
                id_livro: livro.id_livro,
                nome_livro: livro.nome_livro,
                capitulo: cap
            });
        }
    }
    
    const total = allChapters.length;
    const perDay = Math.floor(total / 365);
    const plano = new Array(365);
    
    for (let dia = 0; dia < 365; dia++) {
        const start = dia * perDay;
        const end = (dia === 364) ? total : (start + perDay);
        plano[dia] = {
            dia: dia + 1,
            leituras: allChapters.slice(start, end)
        };
    }
    planCache = plano;
    return plano;
}

export function getStats() {
    if (!bibliaData) return {};
    return {
        total_livros: bibliaData.livros.length,
        total_versiculos: totalVersiculosPrecalc,
        total_favoritos: favoritosCount,
        total_imagens: bibliaData.img_versiculos.length,
        livros_at: 46, // Constante para economizar CPU
        livros_nt: 27  // Constante para economizar CPU
    };
}
