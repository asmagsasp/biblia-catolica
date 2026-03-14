/**
 * BibliaDB - Camada de dados offline da Bíblia Sagrada Católica
 * Carrega o JSON e fornece todas as operações localmente.
 */

let bibliaData = null;
let planCache = null;
let favoritos = JSON.parse(localStorage.getItem('biblia_favoritos') || '{}');

export async function initDB() {
    if (bibliaData) return;
    const res = await fetch('/data/biblia.json');
    bibliaData = await res.json();
    console.log(`[BibliaDB] Carregado: ${bibliaData.livros.length} livros`);
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
    } else {
        favoritos[key] = 1;
    }
    localStorage.setItem('biblia_favoritos', JSON.stringify(favoritos));
    return favoritos[key] ? 1 : 0;
}

export function getFavoritos() {
    const result = [];
    const livrosMap = new Map();
    bibliaData.livros.forEach(l => livrosMap.set(l.id_livro, l));

    for (const key of Object.keys(favoritos)) {
        const [livroId, cap, ver] = key.split('_').map(Number);
        const livroInfo = livrosMap.get(livroId);
        if (!livroInfo) continue;
        
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
        }
    }
    return result.sort((a, b) => a.id_livro - b.id_livro || a.id_capitulo - b.id_capitulo || a.id_versiculo - b.id_versiculo);
}

export function getImgVersiculos() {
    return bibliaData.img_versiculos;
}

export function getPlanoLeitura() {
    if (planCache) return planCache;
    
    const allChapters = [];
    for (const livro of bibliaData.livros) {
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
    const plano = [];
    for (let dia = 0; dia < 365; dia++) {
        const start = dia * perDay;
        const end = (dia === 364) ? total : (start + perDay);
        plano.push({
            dia: dia + 1,
            leituras: allChapters.slice(start, end)
        });
    }
    planCache = plano;
    return plano;
}

export function getStats() {
    let totalVersiculos = 0;
    for (const key in bibliaData.versiculos) {
        totalVersiculos += bibliaData.versiculos[key].length;
    }
    return {
        total_livros: bibliaData.livros.length,
        total_versiculos: totalVersiculos,
        total_favoritos: Object.keys(favoritos).length,
        total_imagens: bibliaData.img_versiculos.length,
        livros_at: bibliaData.livros.filter(l => l.id_testamento === 1).length,
        livros_nt: bibliaData.livros.filter(l => l.id_testamento === 2).length
    };
}
