/**
 * BibliaDB - Camada de dados offline da Bíblia Sagrada Católica
 * Carrega o JSON e fornece todas as operações localmente.
 */

let bibliaData = null;
let planCache = null;
let livrosMap = new Map();
let totalVersiculosPrecalc = 0;
let favoritosCount = 0;
let favoritos = JSON.parse(localStorage.getItem('biblia_favoritos') || '{}');

export async function initDB() {
    if (bibliaData) return;
    try {
        const res = await fetch('/data/biblia.json');
        bibliaData = await res.json();
        
        // Pre-cálculos pesados uma única vez no boot
        bibliaData.livros.forEach(l => livrosMap.set(l.id_livro, l));
        
        totalVersiculosPrecalc = 0;
        for (const key in bibliaData.versiculos) {
            totalVersiculosPrecalc += bibliaData.versiculos[key].length;
        }
        
        favoritosCount = Object.keys(favoritos).length;

        console.log(`[BibliaDB] Carregado: ${bibliaData.livros.length} livros e ${totalVersiculosPrecalc} versículos`);
        
        // Pós-processamento pesado em background bem depois do boot
        setTimeout(() => getPlanoLeitura(), 2000);
    } catch (e) {
        console.error("[BibliaDB] Erro ao carregar JSON:", e);
    }
}

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
        favoritos[key] = 1;
        favoritosCount++;
    }
    localStorage.setItem('biblia_favoritos', JSON.stringify(favoritos));
    return favoritos[key] ? 1 : 0;
}

export function getFavoritos() {
    const result = [];
    try {
        if (!bibliaData || !bibliaData.livros || !bibliaData.versiculos) return [];

        let orphaned = false;
        for (const key of Object.keys(favoritos)) {
            try {
                const parts = key.split('_').map(Number);
                if (parts.length !== 3) { orphaned = true; delete favoritos[key]; continue; }
                
                const [livroId, cap, ver] = parts;
                const livroInfo = livrosMap.get(livroId);
                if (!livroInfo) { orphaned = true; delete favoritos[key]; continue; }
                
                const keyVs = `${livroId}_${cap}`;
                const vs = bibliaData.versiculos[keyVs] || [];
                const v = vs.find(x => x.v === ver);
                
                if (v) {
                    result.push({
                        id_livro: livroId,
                        nome_livro: livroInfo.nome_livro,
                        id_capitulo: cap,
                        id_versiculo: ver,
                        texto: v.t
                    });
                } else {
                    orphaned = true;
                    delete favoritos[key];
                }
            } catch (e) {
                console.error("[BibliaDB] Erro ao processar favorito individual:", key, e);
            }
        }
        if (orphaned) {
            localStorage.setItem('biblia_favoritos', JSON.stringify(favoritos));
        }
    } catch (globalError) {
        console.error("[BibliaDB] Erro fatal em getFavoritos:", globalError);
    }
    return result.sort((a, b) => a.id_livro - b.id_livro || a.id_capitulo - b.id_capitulo || a.id_versiculo - b.id_versiculo);
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
