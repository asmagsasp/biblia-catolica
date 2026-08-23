import { Preferences } from '@capacitor/preferences';

export let isDBReady = false;
let useBackend = false;
let bibliaData = null;
let planCache = null;
let livrosMap = new Map();
let totalVersiculosPrecalc = 0;
let favoritosCount = 0;
let favoritos = {};
let saveTimeout = null;

async function loadFavoritosLocal() {
    return new Promise(async (resolve) => {
        const timeout = setTimeout(() => {
            favoritos = {};
            favoritosCount = 0;
            resolve();
        }, 1500);

        try {
            const { value } = await Preferences.get({ key: 'biblia_favoritos' });
            favoritos = value ? JSON.parse(value) : {};
            favoritosCount = Object.keys(favoritos).length;
        } catch (e) {
            console.error("[BibliaDB] Erro no carregamento de favoritos locais:", e);
            favoritos = {};
            favoritosCount = 0;
        } finally {
            clearTimeout(timeout);
            resolve();
        }
    });
}

function saveFavoritosLocal() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
        try {
            await Preferences.set({
                key: 'biblia_favoritos',
                value: JSON.stringify(favoritos)
            });
        } catch (e) {
            console.error("[NativeStorage] Erro ao sincronizar favoritos locais:", e);
        }
    }, 100);
}

export async function initDB() {
    try {
        // Tentar conectar ao backend em /api/stats
        const checkRes = await fetch('/api/stats', { cache: 'no-cache' });
        if (checkRes.ok) {
            useBackend = true;
            isDBReady = true;
            console.log('[BibliaDB] Conectado ao servidor Backend SQLite (/api)!');
            await loadFavoritosLocal();
            return;
        }
    } catch (err) {
        console.warn('[BibliaDB] Backend não acessível, usando banco local JSON (Fallback):', err);
    }

    // Fallback local se o backend não estiver disponível (ex: app offline)
    useBackend = false;
    try {
        const res = await fetch('data/biblia.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        bibliaData = await res.json();
        
        await loadFavoritosLocal();
        
        bibliaData.livros.forEach(l => livrosMap.set(l.id_livro, l));
        
        totalVersiculosPrecalc = 0;
        for (const key in bibliaData.versiculos) {
            totalVersiculosPrecalc += bibliaData.versiculos[key].length;
        }
        
        favoritosCount = Object.keys(favoritos).length;
        isDBReady = true;
    } catch (e) {
        console.error("[BibliaDB] ERRO CRÍTICO NO INIT LOCAL:", e);
        bibliaData = { livros: [], versiculos: {}, img_versiculos: [] };
        isDBReady = true;
    }
}

export function isReady() { return isDBReady; }

export async function getLivros() {
    if (useBackend) {
        try {
            const res = await fetch('/api/livros');
            if (res.ok) return await res.json();
        } catch (err) {
            console.warn('[BibliaDB] Falha no backend getLivros, usando local:', err);
        }
    }
    return bibliaData ? bibliaData.livros : [];
}

export async function getVersiculos(idLivro, idCapitulo) {
    if (useBackend) {
        try {
            const res = await fetch(`/api/livros/${idLivro}/capitulos/${idCapitulo}/versiculos`);
            if (res.ok) {
                const backendVs = await res.json();
                // Mesclar favoritos locais caso o backend não tenha dados específicos de favoritos do usuario
                return backendVs.map(v => ({
                    id_versiculo: v.id_versiculo,
                    texto: v.texto,
                    favorito: v.favorito || (favoritos[`${idLivro}_${idCapitulo}_${v.id_versiculo}`] ? 1 : 0)
                }));
            }
        } catch (err) {
            console.warn('[BibliaDB] Falha no backend getVersiculos, usando local:', err);
        }
    }

    if (!bibliaData) return [];
    const key = `${idLivro}_${idCapitulo}`;
    const vs = bibliaData.versiculos[key] || [];
    return vs.map(v => ({
        id_versiculo: v.v,
        texto: v.t,
        favorito: favoritos[`${idLivro}_${idCapitulo}_${v.v}`] ? 1 : 0
    }));
}

export async function buscar(termo) {
    if (!termo || termo.length < 3) return [];

    if (useBackend) {
        try {
            const res = await fetch(`/api/busca?q=${encodeURIComponent(termo)}`);
            if (res.ok) return await res.json();
        } catch (err) {
            console.warn('[BibliaDB] Falha na busca backend, usando local:', err);
        }
    }

    if (!bibliaData) return [];
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

const VERSICULOS_INSPIRADORES = [
    { id_livro: 21, cap: 23, ver: 1, oracao: "Senhor, conduzi os meus passos e dai-me a paz de descansar em Teus braços." },
    { id_livro: 57, cap: 4, ver: 13, oracao: "Cristo Jesus, renovai as minhas forças diante de qualquer desafio." },
    { id_livro: 50, cap: 14, ver: 27, oracao: "Senhor Jesus, derramai a Vossa santa paz sobre o meu lar e meu coração." },
    { id_livro: 29, cap: 41, ver: 10, oracao: "Deus Pai, fortalecei minha fé e afastai todo temor da minha vida." },
    { id_livro: 21, cap: 91, ver: 1, oracao: "Sob a Vossa proteção divina coloco a minha família e este novo dia." },
    { id_livro: 24, cap: 3, ver: 5, oracao: "Senhor, entrego os meus planos nas Tuas mãos de amor." },
    { id_livro: 47, cap: 11, ver: 28, oracao: "Jesus manso e humilde de coração, fazei o meu coração semelhante ao Vosso." },
    { id_livro: 30, cap: 29, ver: 11, oracao: "Senhor, creio nas Vossas promessas de bênção e graça para o meu futuro." },
    { id_livro: 52, cap: 8, ver: 28, oracao: "Deus de bondade, que a Tua vontade soberana se cumpra em minha vida." },
    { id_livro: 21, cap: 46, ver: 1, oracao: "Na hora da dificuldade, sê a minha rocha inabalável, ó Deus." },
    { id_livro: 53, cap: 13, ver: 4, oracao: "Senhor, ensinai-me a amar o próximo como Tu me amas." },
    { id_livro: 49, cap: 1, ver: 37, oracao: "Aumentai a minha fé, Senhor, pois nada há que não possas realizar." },
    { id_livro: 6, cap: 1, ver: 9, oracao: "Dai-me coragem santa para perseverar no caminho do bem." },
    { id_livro: 21, cap: 121, ver: 2, oracao: "Minha esperança está no Senhor, criador do céu e da terra." },
    { id_livro: 50, cap: 3, ver: 16, oracao: "Obrigado, Pai Celeste, pelo imenso dom da salvação em Jesus Cristo." },
    { id_livro: 27, cap: 3, ver: 9, oracao: "Os que confiam no Senhor viverão com Ele no amor." },
    { id_livro: 28, cap: 2, ver: 6, oracao: "Confia em Deus, e Ele te curará; põe n'Ele a tua esperança." },
    { id_livro: 21, cap: 27, ver: 1, oracao: "O Senhor é minha luz e minha salvação: de quem terei medo?" },
    { id_livro: 21, cap: 37, ver: 5, oracao: "Entrego o meu caminho ao Senhor; confio n'Ele, e o mais Ele fará." },
    { id_livro: 21, cap: 118, ver: 24, oracao: "Este é o dia que o Senhor fez: regozijemo-nos e alegremo-nos nele!" },
    { id_livro: 24, cap: 16, ver: 3, oracao: "Confia ao Senhor as tuas obras, e os teus pensamentos serão estabelecidos." },
    { id_livro: 55, cap: 5, ver: 22, oracao: "Espírito Santo, dai-me amor, alegria, paz, paciência e bondade." },
    { id_livro: 56, cap: 2, ver: 8, oracao: "Pela graça fomos salvos, mediante a fé; e isso é dom de Deus." },
    { id_livro: 57, cap: 4, ver: 6, oracao: "Apresentai a Deus vossas orações com ações de graças." },
    { id_livro: 66, cap: 1, ver: 5, oracao: "Senhor, dai-me sabedoria divina para discernir o melhor caminho." },
    { id_livro: 67, cap: 5, ver: 7, oracao: "Lançai sobre Ele toda a vossa ansiedade, porque Ele cuida de vós." },
    { id_livro: 50, cap: 15, ver: 5, oracao: "Senhor Jesus, permanecei em mim para que eu frutifique no amor." },
    { id_livro: 47, cap: 6, ver: 33, oracao: "Buscai primeiro o Reino de Deus e a sua justiça, e tudo vos será acrescentado." },
    { id_livro: 47, cap: 28, ver: 20, oracao: "Eis que estou convosco todos os dias, até o fim dos tempos." },
    { id_livro: 50, cap: 8, ver: 12, oracao: "Eu sou a luz do mundo; quem me segue não andará nas trevas." },
    { id_livro: 21, cap: 103, ver: 1, oracao: "Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o Seu santo nome." },
    { id_livro: 21, cap: 139, ver: 14, oracao: "Eu vos louvo, Senhor, por tão maravilhosa criação que sou!" }
];

export async function getVersiculoDoDia() {
    if (useBackend) {
        try {
            const res = await fetch('/api/versiculo-do-dia');
            if (res.ok) {
                const v = await res.json();
                if (v && v.texto) return v;
            }
        } catch (err) {
            console.warn('[BibliaDB] Falha versiculo-do-dia backend, usando local:', err);
        }
    }

    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const item = VERSICULOS_INSPIRADORES[dayOfYear % VERSICULOS_INSPIRADORES.length];

    if (bibliaData && bibliaData.versiculos && bibliaData.livros) {
        const livro = bibliaData.livros.find(l => l.id_livro === item.id_livro);
        const nomeLivro = livro ? livro.nome_livro : 'Salmos';
        const key = `${item.id_livro}_${item.cap}`;
        const versos = bibliaData.versiculos[key] || [];
        const verso = versos.find(v => v.v === item.ver) || versos[0];

        if (verso) {
            return {
                id_livro: item.id_livro,
                nome_livro: nomeLivro,
                id_capitulo: item.cap,
                id_versiculo: verso.v,
                texto: (verso.t || '').trim(),
                referencia: `${nomeLivro} ${item.cap},${verso.v}`,
                oracao: item.oracao
            };
        }
    }

    return {
        id_livro: 21,
        nome_livro: "Salmos",
        id_capitulo: 23,
        id_versiculo: 1,
        texto: "O Senhor é o meu pastor; nada me faltará.",
        referencia: "Salmos 23,1",
        oracao: item.oracao
    };
}

export async function toggleFavorito(idLivro, idCapitulo, idVersiculo) {
    const key = `${idLivro}_${idCapitulo}_${idVersiculo}`;
    let isFav = 0;

    if (favoritos[key]) {
        delete favoritos[key];
        favoritosCount = Math.max(0, favoritosCount - 1);
        isFav = 0;
    } else {
        favoritos[key] = true;
        favoritosCount++;
        isFav = 1;
    }
    saveFavoritosLocal();

    if (useBackend) {
        try {
            await fetch('/api/favoritos/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idLivro, idCapitulo, idVersiculo })
            });
        } catch (err) {
            console.warn('[BibliaDB] Sincronização de favorito no backend falhou:', err);
        }
    }

    return isFav;
}

export async function getFavoritos() {
    if (useBackend) {
        try {
            const res = await fetch('/api/favoritos');
            if (res.ok) {
                const backendFavs = await res.json();
                if (backendFavs && backendFavs.length > 0) return backendFavs;
            }
        } catch (err) {
            console.warn('[BibliaDB] Falha getFavoritos backend, usando local:', err);
        }
    }

    const result = [];
    const keys = Object.keys(favoritos);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        try {
            const parts = key.split('_');
            if (parts.length !== 3) continue;
            
            const livroId = parseInt(parts[0]);
            const cap = parseInt(parts[1]);
            const ver = parseInt(parts[2]);
            
            let livroInfo = livrosMap.get(livroId);
            if (!livroInfo && bibliaData) {
                livroInfo = bibliaData.livros.find(l => l.id_livro === livroId);
            }
            if (!livroInfo) continue;
            
            let vs = bibliaData ? (bibliaData.versiculos[`${livroId}_${cap}`] || []) : [];
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

export async function getImgVersiculos() {
    if (useBackend) {
        try {
            const res = await fetch('/api/img-versiculos');
            if (res.ok) return await res.json();
        } catch (err) {
            console.warn('[BibliaDB] Falha getImgVersiculos backend, usando local:', err);
        }
    }
    return bibliaData ? bibliaData.img_versiculos : [];
}

export async function getPlanoLeitura() {
    if (planCache) return planCache;

    if (useBackend) {
        try {
            const res = await fetch('/api/plano-leitura');
            if (res.ok) {
                planCache = await res.json();
                return planCache;
            }
        } catch (err) {
            console.warn('[BibliaDB] Falha getPlanoLeitura backend, usando local:', err);
        }
    }

    const livros = await getLivros();
    if (!livros || !livros.length) return [];
    
    const allChapters = [];
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

export async function getStats() {
    if (useBackend) {
        try {
            const res = await fetch('/api/stats');
            if (res.ok) return await res.json();
        } catch (err) {
            console.warn('[BibliaDB] Falha getStats backend, usando local:', err);
        }
    }

    return {
        total_livros: bibliaData ? bibliaData.livros.length : 0,
        total_versiculos: totalVersiculosPrecalc,
        total_favoritos: favoritosCount,
        total_imagens: bibliaData ? bibliaData.img_versiculos.length : 0,
        livros_at: 46,
        livros_nt: 27
    };
}
