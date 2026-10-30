import { Preferences } from '@capacitor/preferences';
import { getFirebaseGalleryImages, getFirebaseDeletedImages, saveImageToFirebase, deleteImageFromFirebase } from './firebaseGallery.js';

export let isDBReady = false;
let useBackend = false;
let bibliaData = null;
let planCache = null;
let livrosMap = new Map();
let totalVersiculosPrecalc = 0;
let favoritosCount = 0;
let favoritos = {};
let userImages = [];
let favoriteImages = {};
let saveTimeout = null;
let saveImagesTimeout = null;
let saveFavImagesTimeout = null;

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

async function loadUserImagesLocal() {
    return new Promise(async (resolve) => {
        const timeout = setTimeout(() => {
            userImages = [];
            resolve();
        }, 1000);
        try {
            const { value } = await Preferences.get({ key: 'biblia_user_images' });
            userImages = value ? JSON.parse(value) : [];
        } catch (e) {
            userImages = [];
        } finally {
            clearTimeout(timeout);
            resolve();
        }
    });
}

async function loadFavoriteImagesLocal() {
    return new Promise(async (resolve) => {
        const timeout = setTimeout(() => {
            favoriteImages = {};
            resolve();
        }, 1000);
        try {
            const { value } = await Preferences.get({ key: 'biblia_favorite_images' });
            favoriteImages = value ? JSON.parse(value) : {};
        } catch (e) {
            favoriteImages = {};
        } finally {
            clearTimeout(timeout);
            resolve();
        }
    });
}

function saveUserImagesLocal() {
    if (saveImagesTimeout) clearTimeout(saveImagesTimeout);
    saveImagesTimeout = setTimeout(async () => {
        try {
            await Preferences.set({
                key: 'biblia_user_images',
                value: JSON.stringify(userImages)
            });
        } catch (e) {
            console.error("[NativeStorage] Erro ao salvar imagens de usuário locais:", e);
        }
    }, 100);
}

function saveFavoriteImagesLocal() {
    if (saveFavImagesTimeout) clearTimeout(saveFavImagesTimeout);
    saveFavImagesTimeout = setTimeout(async () => {
        try {
            await Preferences.set({
                key: 'biblia_favorite_images',
                value: JSON.stringify(favoriteImages)
            });
        } catch (e) {
            console.error("[NativeStorage] Erro ao salvar favoritos de imagens locais:", e);
        }
    }, 100);
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

async function fetchWithTimeout(url, options = {}, timeoutMs = 1800) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timer);
        return res;
    } catch (err) {
        clearTimeout(timer);
        throw err;
    }
}

export function getApiUrl(endpoint) {
    if (!endpoint) return '';
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) return endpoint;
    const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // 1. Explicit env var
    let envApi = '';
    try {
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
            envApi = (import.meta.env.VITE_API_URL || '').trim();
        }
    } catch (e) {}

    if (envApi) {
        return `${envApi.replace(/\/$/, '')}${clean}`;
    }

    // 2. If running on Capacitor Native Android/iOS or custom host
    if (typeof window !== 'undefined') {
        const customUrl = localStorage.getItem('biblia_custom_api_url');
        if (customUrl && customUrl.trim()) {
            return `${customUrl.trim().replace(/\/$/, '')}${clean}`;
        }
        
        // If loaded in a mobile browser on LAN (e.g. http://192.168.1.10:5173), relative /api works
        // If loaded inside Capacitor (capacitor://localhost or https://localhost), check stored dev IP
        if (window.location.protocol === 'capacitor:' || (window.location.hostname === 'localhost' && !window.location.port)) {
            const devHost = localStorage.getItem('biblia_dev_host_ip');
            if (devHost) {
                return `http://${devHost}:3001${clean}`;
            }
        }
    }

    // 3. In web browser (Vite proxy / express)
    return clean;
}

export async function syncPendingUserImagesToBackend() {
    if (!useBackend || !userImages || userImages.length === 0) return;

    for (let i = 0; i < userImages.length; i++) {
        const img = userImages[i];
        if (typeof img.id === 'string' && img.id.startsWith('usr_')) {
            try {
                const res = await fetchWithTimeout(getApiUrl('/api/img-versiculos'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_livro: img.id_livro,
                        nome_livro: img.nome_livro,
                        id_capitulo: img.id_capitulo,
                        id_versiculo: img.id_versiculo,
                        texto: img.texto,
                        address: img.address,
                        oracao: img.oracao
                    })
                }, 15000);
                if (res.ok) {
                    const created = await res.json();
                    userImages[i].id = created.id;
                    userImages[i].is_user_upload = true;
                    if (created.created_at) userImages[i].created_at = created.created_at;
                    saveUserImagesLocal();
                    console.log('[BibliaDB] Imagem local sincronizada com sucesso no SQLite global:', created.id);
                }
            } catch (err) {
                console.warn('[BibliaDB] Erro ao sincronizar imagem pendente:', err);
            }
        }
    }
}

export async function initDB() {
    const isNative = typeof window !== 'undefined' && ((window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) || window.location.protocol === 'capacitor:' || (window.location.hostname === 'localhost' && !window.location.port));
    const hasCustomBackend = typeof window !== 'undefined' && (localStorage.getItem('biblia_custom_api_url') || localStorage.getItem('biblia_dev_host_ip'));

    // No App Nativo Android sem backend customizado, pula verificação de rede e carrega o JSON local instantaneamente
    if (!isNative || hasCustomBackend) {
        try {
            const checkRes = await fetchWithTimeout(getApiUrl('/api/stats'), { cache: 'no-cache' }, isNative ? 1200 : 2500);
            if (checkRes.ok) {
                useBackend = true;
                isDBReady = true;
                console.log('[BibliaDB] Conectado ao servidor Backend SQLite (/api)!');
                await Promise.all([loadFavoritosLocal(), loadUserImagesLocal(), loadFavoriteImagesLocal()]);
                syncPendingUserImagesToBackend().catch(e => console.warn('[BibliaDB] Erro no sync em segundo plano:', e));
                return;
            }
        } catch (err) {
            console.warn('[BibliaDB] Backend não acessível, usando banco local JSON (Fallback):', err);
        }
    }

    // Fallback local se o backend não estiver disponível (ex: app offline / app nativo)
    useBackend = false;
    try {
        let res = null;
        const candidates = ['data/biblia.json', '/data/biblia.json', './data/biblia.json'];
        for (const candidate of candidates) {
            try {
                res = await fetch(candidate);
                if (res && res.ok) break;
            } catch (e) {
                // tenta próximo candidato
            }
        }
        if (!res || !res.ok) throw new Error(`HTTP error ao carregar biblia.json: ${res ? res.status : 'desconhecido'}`);
        bibliaData = await res.json();
        
        await Promise.all([loadFavoritosLocal(), loadUserImagesLocal(), loadFavoriteImagesLocal()]);
        
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
            const res = await fetchWithTimeout(getApiUrl('/api/livros'), {}, 1500);
            if (res.ok) return await res.json();
        } catch (err) {
            console.warn('[BibliaDB] Falha no backend getLivros, usando local:', err);
        }
    }
    return (bibliaData && bibliaData.livros && bibliaData.livros.length) ? bibliaData.livros : CANONICAL_BOOKS;
}

export async function getVersiculos(idLivro, idCapitulo) {
    if (useBackend) {
        try {
            const res = await fetchWithTimeout(getApiUrl(`/api/livros/${idLivro}/capitulos/${idCapitulo}/versiculos`), {}, 1500);
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

function removeAccents(str) {
    if (!str) return '';
    return str
        .replace(/[\u00AD\u200B\u200C\u200D\uFEFF\u2060]/g, '')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const BOOK_ALIASES = [
    // Antigo Testamento
    { id: 1, aliases: ['genesis', 'gn', 'gen'] },
    { id: 2, aliases: ['exodo', 'ex'] },
    { id: 3, aliases: ['levitico', 'lv', 'lev'] },
    { id: 4, aliases: ['numeros', 'nm', 'num'] },
    { id: 5, aliases: ['deuteronomio', 'dt', 'deut'] },
    { id: 6, aliases: ['josue', 'js', 'jos'] },
    { id: 7, aliases: ['juizes', 'jz', 'jui', 'jzes'] },
    { id: 8, aliases: ['rute', 'rt'] },
    { id: 9, aliases: ['1 samuel', '1samuel', '1 sm', '1sm', '1 s', '1s', 'i samuel', 'i sm'] },
    { id: 10, aliases: ['2 samuel', '2samuel', '2 sm', '2sm', '2 s', '2s', 'ii samuel', 'ii sm'] },
    { id: 11, aliases: ['1 reis', '1reis', '1 rs', '1rs', '1 r', '1r', 'i reis', 'i rs'] },
    { id: 12, aliases: ['2 reis', '2reis', '2 rs', '2rs', '2 r', '2r', 'ii reis', 'ii rs'] },
    { id: 13, aliases: ['1 cronicas', '1cronicas', '1 cr', '1cr', 'i cronicas', 'i cr'] },
    { id: 14, aliases: ['2 cronicas', '2cronicas', '2 cr', '2cr', 'ii cronicas', 'ii cr'] },
    { id: 15, aliases: ['esdras', 'esd', 'ed'] },
    { id: 16, aliases: ['neemias', 'ne', 'neem'] },
    { id: 17, aliases: ['tobias', 'tb', 'tob'] },
    { id: 18, aliases: ['judite', 'jdt', 'jdte'] },
    { id: 19, aliases: ['ester', 'est'] },
    { id: 20, aliases: ['job'] },
    { id: 21, aliases: ['salmos', 'salmo', 'sl', 'sal', 'psalms', 'psalmo'] },
    { id: 22, aliases: ['1 macabeus', '1macabeus', '1 mc', '1mc', 'i macabeus', 'i mc'] },
    { id: 23, aliases: ['2 macabeus', '2macabeus', '2 mc', '2mc', 'ii macabeus', 'ii mc'] },
    { id: 24, aliases: ['proverbios', 'proverbio', 'pv', 'pr', 'prov'] },
    { id: 25, aliases: ['eclesiastes', 'ec', 'ecl'] },
    { id: 26, aliases: ['cantico dos canticos', 'canticos dos canticos', 'cantico', 'canticos', 'cantares', 'ct'] },
    { id: 27, aliases: ['sabedoria', 'sb', 'sab'] },
    { id: 28, aliases: ['eclesiastico', 'siracida', 'siracide', 'eclo', 'sir'] },
    { id: 29, aliases: ['isaias', 'is'] },
    { id: 30, aliases: ['jeremias', 'jr', 'jer'] },
    { id: 31, aliases: ['lamentacoes', 'lamentacao', 'lm', 'lam'] },
    { id: 32, aliases: ['baruc', 'baruque', 'br'] },
    { id: 33, aliases: ['ezequiel', 'ez', 'ezeq'] },
    { id: 34, aliases: ['daniel', 'dn', 'dan'] },
    { id: 35, aliases: ['oseias', 'os'] },
    { id: 36, aliases: ['joel', 'jl'] },
    { id: 37, aliases: ['amos', 'am'] },
    { id: 38, aliases: ['abdias', 'obadias', 'ab', 'ob'] },
    { id: 39, aliases: ['jonas', 'jn'] },
    { id: 40, aliases: ['miqueias', 'mq'] },
    { id: 41, aliases: ['naum', 'na'] },
    { id: 42, aliases: ['habacuc', 'habacuque', 'hc', 'hab'] },
    { id: 43, aliases: ['sofonias', 'sf', 'sof'] },
    { id: 44, aliases: ['ageu', 'ag'] },
    { id: 45, aliases: ['zacarias', 'zc', 'zac'] },
    { id: 46, aliases: ['malaquias', 'ml', 'mal'] },
    // Novo Testamento
    { id: 47, aliases: ['sao mateus', 'mateus', 'mt', 'mat'] },
    { id: 48, aliases: ['sao marcos', 'marcos', 'mc', 'marc', 'mar'] },
    { id: 49, aliases: ['sao lucas', 'lucas', 'lc', 'luc'] },
    { id: 50, aliases: ['sao joao', 'joao', 'jo', 'jn'] },
    { id: 51, aliases: ['atos dos apostolos', 'atos', 'at', 'act'] },
    { id: 52, aliases: ['romanos', 'rm', 'rom'] },
    { id: 53, aliases: ['1 corintios', '1corintios', '1 cor', '1cor', '1 co', '1co', 'i corintios', 'i cor'] },
    { id: 54, aliases: ['2 corintios', '2corintios', '2 cor', '2cor', '2 co', '2co', 'ii corintios', 'ii cor'] },
    { id: 55, aliases: ['galatas', 'gl', 'gal'] },
    { id: 56, aliases: ['efesios', 'ef', 'efe'] },
    { id: 57, aliases: ['filipenses', 'fp', 'fl', 'fil'] },
    { id: 58, aliases: ['colossenses', 'cl', 'col'] },
    { id: 59, aliases: ['1 tessalonicenses', '1tessalonicenses', '1 ts', '1ts', 'i tessalonicenses', 'i ts'] },
    { id: 60, aliases: ['2 tessalonicenses', '2tessalonicenses', '2 ts', '2ts', 'ii tessalonicenses', 'ii ts'] },
    { id: 61, aliases: ['1 timoteo', '1timoteo', '1 tm', '1tm', 'i timoteo', 'i tm'] },
    { id: 62, aliases: ['2 timoteo', '2timoteo', '2 tm', '2tm', 'ii timoteo', 'ii tm'] },
    { id: 63, aliases: ['tito', 'tt'] },
    { id: 64, aliases: ['filemon', 'filemom', 'fm', 'flm'] },
    { id: 65, aliases: ['hebreus', 'hb', 'heb'] },
    { id: 66, aliases: ['sao tiago', 'tiago', 'tg', 'tiag'] },
    { id: 67, aliases: ['1 sao pedro', '1sao pedro', '1 pedro', '1pedro', '1 pe', '1pe', '1 p', '1p', 'i sao pedro', 'i pedro', 'i pe'] },
    { id: 68, aliases: ['2 sao pedro', '2sao pedro', '2 pedro', '2pedro', '2 pe', '2pe', '2 p', '2p', 'ii sao pedro', 'ii pedro', 'ii pe'] },
    { id: 69, aliases: ['1 sao joao', '1sao joao', '1 joao', '1joao', '1 jo', '1jo', '1 j', '1j', 'i sao joao', 'i joao', 'i jo'] },
    { id: 70, aliases: ['2 sao joao', '2sao joao', '2 joao', '2joao', '2 jo', '2jo', '2 j', '2j', 'ii sao joao', 'ii joao', 'ii jo'] },
    { id: 71, aliases: ['3 sao joao', '3sao joao', '3 joao', '3joao', '3 jo', '3jo', '3 j', '3j', 'iii sao joao', 'iii joao', 'iii jo'] },
    { id: 72, aliases: ['sao judas', 'judas', 'jd', 'jud'] },
    { id: 73, aliases: ['apocalipse', 'ap', 'apoc'] }
];

const SEARCH_STOP_WORDS = new Set([
    'a', 'o', 'e', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
    'um', 'uma', 'uns', 'umas', 'por', 'para', 'com', 'que', 'se', 'me', 'te', 'lhe',
    'ele', 'ela', 'eles', 'elas', 'ao', 'aos', 'seu', 'sua', 'seus', 'suas'
]);

function parseBiblicalReference(rawQuery) {
    if (!rawQuery) return null;
    let q = removeAccents(rawQuery).trim().toLowerCase();
    q = q.replace(/^iii\s+/i, '3 ').replace(/^ii\s+/i, '2 ').replace(/^i\s+/i, '1 ');

    const match = q.match(/^([1-3]?\s*[a-zçãõáéíóúâêô]+(?:\s+[a-zçãõáéíóúâêô]+)*?)\s*(\d{1,3})(?:[\s:,.-]+(\d{1,3}))?$/i);
    if (!match) return null;

    const bookRaw = match[1].trim();
    const capNum = parseInt(match[2], 10);
    const verNum = match[3] ? parseInt(match[3], 10) : null;
    if (isNaN(capNum) || capNum <= 0) return null;

    for (const item of BOOK_ALIASES) {
        for (const alias of item.aliases) {
            if (bookRaw === alias) {
                return { idLivro: item.id, cap: capNum, ver: verNum, isPsalm: item.id === 21 };
            }
        }
    }
    return null;
}

function buildExactSearchRegex(term) {
    const parts = removeAccents(term).toLowerCase().trim().split(/\s+/).filter(Boolean).map(escapeRegex);
    if (parts.length === 0) return null;
    const separator = '[\\s,.:;!?"\'«“»”\\-–—]+';
    return new RegExp(`(?:^|[^a-z0-9])${parts.join(separator)}(?:$|[^a-z0-9])`, 'i');
}

export async function buscar(termo) {
    if (!termo || termo.trim().length < 2) return [];

    if (useBackend) {
        try {
            const res = await fetchWithTimeout(getApiUrl(`/api/busca?q=${encodeURIComponent(termo)}`), {}, 2500);
            if (res.ok) {
                const bRes = await res.json();
                if (Array.isArray(bRes)) {
                    return bRes.map(r => ({
                        ...r,
                        favorito: favoritos[`${r.id_livro}_${r.id_capitulo}_${r.id_versiculo}`] ? 1 : (r.favorito || 0)
                    }));
                }
            }
        } catch (err) {
            console.warn('[BibliaDB] Falha na busca backend, usando fallback local:', err);
        }
    }

    if (!bibliaData || !bibliaData.livros) {
        try {
            const candidates = ['data/biblia.json', '/data/biblia.json', './data/biblia.json'];
            for (const candidate of candidates) {
                try {
                    const res = await fetch(candidate);
                    if (res && res.ok) {
                        bibliaData = await res.json();
                        bibliaData.livros.forEach(l => livrosMap.set(l.id_livro, l));
                        break;
                    }
                } catch (e) {}
            }
        } catch (e) {
            console.warn('[BibliaDB] Erro ao carregar biblia.json para busca local:', e);
        }
    }

    if (!bibliaData || !bibliaData.livros) return [];
    const cleanTerm = termo.trim().replace(/^["'«“\s]+|["'»”:,.;!?\s]+$/g, '');
    if (cleanTerm.length < 2) return [];

    const results = [];
    const seen = new Set();

    function addResult(idLivro, cap, ver, texto) {
        const key = `${idLivro}_${cap}_${ver}`;
        if (seen.has(key)) return;
        seen.add(key);
        const livro = livrosMap.get(idLivro) || bibliaData.livros.find(l => l.id_livro === idLivro);
        results.push({
            id_livro: idLivro,
            nome_livro: livro ? livro.nome_livro : '',
            id_capitulo: cap,
            id_versiculo: ver,
            texto: texto,
            favorito: favoritos[key] ? 1 : 0
        });
    }

    // 1. Verificar se é referência bíblica direta (ex: "Salmo 23", "João 3:16", "Mateus 5")
    const ref = parseBiblicalReference(cleanTerm);
    if (ref) {
        const psalmAltCap = (ref.isPsalm && ref.cap === 23) ? 22 : ((ref.isPsalm && ref.cap === 91) ? 90 : null);
        const capsToFetch = psalmAltCap ? [psalmAltCap, ref.cap] : [ref.cap];

        for (const c of capsToFetch) {
            const key = `${ref.idLivro}_${c}`;
            const vs = bibliaData.versiculos[key] || [];
            if (ref.ver) {
                const target = vs.find(v => v.v === ref.ver);
                if (target) {
                    addResult(ref.idLivro, c, target.v, target.t);
                }
            } else {
                for (const v of vs) {
                    addResult(ref.idLivro, c, v.v, v.t);
                    if (results.length >= 200) return results;
                }
            }
        }
        if (results.length > 0) return results;
    }

    // 2. Tentar busca pela frase contínua com limites de palavras exatas e flexibilidade de pontuação/hífens
    const phraseRegex = buildExactSearchRegex(cleanTerm);
    if (phraseRegex) {
        for (const livro of bibliaData.livros) {
            for (let cap = 1; cap <= livro.total_capitulos; cap++) {
                const key = `${livro.id_livro}_${cap}`;
                const vs = bibliaData.versiculos[key] || [];
                for (const v of vs) {
                    const normText = removeAccents(v.t);
                    if (phraseRegex.test(normText)) {
                        addResult(livro.id_livro, cap, v.v, v.t);
                        if (results.length >= 200) return results;
                    }
                }
            }
        }
    }

    if (results.length > 0) return results;

    // 3. Fallback para múltiplas palavras (todas devem ocorrer como palavras exatas)
    const words = cleanTerm
        .split(/\s+/)
        .map(w => removeAccents(w).replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '').toLowerCase())
        .filter(w => w.length >= 2);

    if (words.length <= 1) return results;

    const wordRegexes = words.map(w => new RegExp(`(?:^|[^a-z0-9])${escapeRegex(w)}(?:$|[^a-z0-9])`, 'i'));

    for (const livro of bibliaData.livros) {
        for (let cap = 1; cap <= livro.total_capitulos; cap++) {
            const key = `${livro.id_livro}_${cap}`;
            const vs = bibliaData.versiculos[key] || [];
            for (const v of vs) {
                const normText = removeAccents(v.t);
                if (wordRegexes.every(rgx => rgx.test(normText))) {
                    addResult(livro.id_livro, cap, v.v, v.t);
                    if (results.length >= 200) return results;
                }
            }
        }
    }

    if (results.length > 0) return results;

    // 4. Se a frase tem 3 ou mais palavras e nenhuma casou todas, buscar por relevância ignorando stop words
    if (words.length >= 3) {
        const sigWords = words.filter(w => !SEARCH_STOP_WORDS.has(w));
        const activeWords = sigWords.length >= 2 ? sigWords : words;
        const activeRegexes = activeWords.map(w => new RegExp(`(?:^|[^a-z0-9])${escapeRegex(w)}(?:$|[^a-z0-9])`, 'i'));
        const minMatches = Math.max(2, Math.ceil(activeWords.length * 0.60));

        const scored = [];
        for (const livro of bibliaData.livros) {
            for (let cap = 1; cap <= livro.total_capitulos; cap++) {
                const key = `${livro.id_livro}_${cap}`;
                const vs = bibliaData.versiculos[key] || [];
                for (const v of vs) {
                    const normText = removeAccents(v.t);
                    let score = 0;
                    for (const rgx of activeRegexes) {
                        if (rgx.test(normText)) score++;
                    }
                    if (score >= minMatches) {
                        scored.push({
                            id_livro: livro.id_livro,
                            cap,
                            ver: v.v,
                            texto: v.t,
                            score
                        });
                    }
                }
            }
        }

        scored.sort((a, b) => b.score - a.score);
        for (const s of scored.slice(0, 100)) {
            addResult(s.id_livro, s.cap, s.ver, s.texto);
        }
    }

    return results;
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
            const res = await fetchWithTimeout(getApiUrl('/api/versiculo-do-dia'), {}, 1500);
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
            await fetchWithTimeout(getApiUrl('/api/favoritos/toggle'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idLivro, idCapitulo, idVersiculo })
            }, 1500);
        } catch (err) {
            console.warn('[BibliaDB] Sincronização de favorito no backend falhou:', err);
        }
    }

    return isFav;
}

export function isFavorito(idLivro, idCapitulo, idVersiculo) {
    const key = `${idLivro}_${idCapitulo}_${idVersiculo}`;
    return !!favoritos[key];
}

export async function getFavoritos() {
    if (useBackend) {
        try {
            const res = await fetchWithTimeout(getApiUrl('/api/favoritos'), {}, 1500);
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

export async function getImgVersiculos(searchQuery = '', filterCategory = 'all') {
    let allImgs = [];

    // 1. Base canonical images (150 Holy Verses)
    const baseImgs = (bibliaData && bibliaData.img_versiculos) ? bibliaData.img_versiculos.map((img, idx) => ({
        id: `base_${idx + 1}`,
        id_livro: img.id_livro,
        nome_livro: img.nome_livro,
        id_capitulo: img.id_capitulo,
        id_versiculo: img.id_versiculo,
        texto: img.texto,
        address: img.address || img.url,
        oracao: img.oracao || '',
        is_user_upload: false,
        created_at: null
    })) : [];

    // 2. Fetch shared cloud images and deletion tombstones from Firebase Realtime Database
    let cloudImgs = [];
    let deletedMap = {};
    try {
        [cloudImgs, deletedMap] = await Promise.all([
            getFirebaseGalleryImages(),
            getFirebaseDeletedImages()
        ]);
    } catch (e) {
        console.warn('[BibliaDB] Falha ao consultar Firebase, usando cache local:', e);
    }

    // 3. Fallback backend if Firebase returned empty
    if (!cloudImgs.length && useBackend) {
        try {
            const res = await fetchWithTimeout(getApiUrl('/api/img-versiculos'), {}, 3000);
            if (res.ok) {
                const backendImgs = await res.json();
                cloudImgs = backendImgs.filter(b => b.is_user_upload).map(img => ({
                    id: img.id,
                    id_livro: img.id_livro,
                    nome_livro: img.nome_livro,
                    id_capitulo: img.id_capitulo,
                    id_versiculo: img.id_versiculo,
                    texto: img.texto,
                    address: img.address || img.url,
                    oracao: img.oracao || '',
                    is_user_upload: true,
                    created_at: img.created_at
                }));
            }
        } catch (err) {
            console.warn('[BibliaDB] Backend fallback error:', err);
        }
    }

    // 4. Purge deleted or stale images from local userImages cache so other devices don't resurrect them
    const cloudIds = new Set(cloudImgs.map(img => String(img.id)));
    const deletedKeys = new Set(Object.keys(deletedMap || {}));
    const deletedAddresses = new Set(Object.values(deletedMap || {}).map(v => v?.address).filter(Boolean));

    let userImagesChanged = false;
    userImages = userImages.filter(img => {
        const imgId = String(img.id);
        if (deletedKeys.has(imgId) || (img.firebase_key && deletedKeys.has(String(img.firebase_key)))) {
            userImagesChanged = true;
            return false;
        }
        if (img.address && deletedAddresses.has(img.address)) {
            userImagesChanged = true;
            return false;
        }
        // If it was already a synced cloud image, but no longer in Firebase, it was deleted on another device
        if (img.firebase_key && !cloudIds.has(String(img.firebase_key))) {
            userImagesChanged = true;
            return false;
        }
        if (!img.is_offline_pending && !cloudIds.has(imgId)) {
            userImagesChanged = true;
            return false;
        }
        return true;
    });

    if (userImagesChanged) {
        saveUserImagesLocal();
    }

    // 5. Merge: Cloud uploaded images (single source of truth) + truly offline pending images
    const seenKeys = new Set();
    const mergedUploads = [];

    // Cloud images first
    for (const img of cloudImgs) {
        const key = `${img.nome_livro || ''}_${img.id_capitulo || ''}_${img.id_versiculo || ''}_${img.texto || ''}_${img.address || ''}`;
        if (!seenKeys.has(key)) {
            seenKeys.add(key);
            seenKeys.add(String(img.id));
            mergedUploads.push({ ...img, is_user_upload: true });
        }
    }

    // Only merge local user images that are truly offline drafts created without connection
    for (const img of userImages) {
        if (img.is_offline_pending) {
            const key = `${img.nome_livro || ''}_${img.id_capitulo || ''}_${img.id_versiculo || ''}_${img.texto || ''}_${img.address || ''}`;
            if (!seenKeys.has(key) && !seenKeys.has(String(img.id))) {
                seenKeys.add(key);
                mergedUploads.push({ ...img, is_user_upload: true });
                // Attempt to sync offline draft to cloud
                saveImageToFirebase(img).then(saved => {
                    if (saved && saved.id) {
                        img.firebase_key = saved.id;
                        img.is_offline_pending = false;
                        saveUserImagesLocal();
                    }
                }).catch(() => {});
            }
        }
    }

    allImgs = [...mergedUploads, ...baseImgs];

    // 6. Apply local filtering
    if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        allImgs = allImgs.filter(img => {
            const ref = `${img.nome_livro || ''} ${img.id_capitulo || ''},${img.id_versiculo || ''}`.toLowerCase();
            return (
                (img.nome_livro && img.nome_livro.toLowerCase().includes(q)) ||
                (img.texto && img.texto.toLowerCase().includes(q)) ||
                (img.oracao && img.oracao.toLowerCase().includes(q)) ||
                ref.includes(q)
            );
        });
    }

    if (filterCategory === 'uploads') {
        allImgs = allImgs.filter(img => img.is_user_upload);
    } else if (filterCategory === 'videos') {
        allImgs = allImgs.filter(img => img.youtube_url && img.youtube_url.trim().length > 0);
    } else if (filterCategory === 'salmos') {
        allImgs = allImgs.filter(img => img.id_livro === 21 || (img.nome_livro && img.nome_livro.toLowerCase().includes('salmo')));
    } else if (filterCategory === 'evangelhos') {
        allImgs = allImgs.filter(img => [47, 48, 49, 50].includes(img.id_livro));
    } else if (filterCategory === 'at') {
        allImgs = allImgs.filter(img => img.id_livro && img.id_livro <= 46);
    } else if (filterCategory === 'nt') {
        allImgs = allImgs.filter(img => img.id_livro && img.id_livro >= 47);
    }

    // Attach favorites flag
    allImgs = allImgs.map(img => ({
        ...img,
        is_favorite: !!favoriteImages[String(img.id)] || !!favoriteImages[`${img.nome_livro}_${img.id_capitulo}_${img.id_versiculo}`]
    }));

    if (filterCategory === 'favorites') {
        allImgs = allImgs.filter(img => img.is_favorite);
    }

    return allImgs;
}

export async function addImgVersiculo(imgData) {
    let newImg = {
        id_livro: imgData.id_livro ? parseInt(imgData.id_livro) : null,
        nome_livro: imgData.nome_livro || 'Bíblia',
        id_capitulo: imgData.id_capitulo ? parseInt(imgData.id_capitulo) : null,
        id_versiculo: imgData.id_versiculo ? parseInt(imgData.id_versiculo) : null,
        texto: imgData.texto || '',
        address: imgData.address || imgData.url || '',
        oracao: imgData.oracao || '',
        youtube_url: (imgData.youtube_url || '').trim(),
        is_user_upload: true,
        created_at: new Date().toISOString()
    };

    // 1. Save directly to Firebase Realtime Database (Global across all devices)
    try {
        const cloudSaved = await saveImageToFirebase(newImg);
        if (cloudSaved && cloudSaved.id) {
            newImg.id = cloudSaved.id;
            newImg.firebase_key = cloudSaved.id;
            newImg.is_offline_pending = false;
        } else {
            newImg.id = `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
            newImg.is_offline_pending = true;
        }
    } catch (e) {
        newImg.id = `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        newImg.is_offline_pending = true;
    }

    // 2. Save locally for instant offline availability
    userImages.unshift(newImg);
    saveUserImagesLocal();

    // 3. Backup to backend SQLite if available
    if (useBackend) {
        try {
            fetchWithTimeout(getApiUrl('/api/img-versiculos'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newImg)
            }, 10000).catch(() => {});
        } catch (err) { }
    }

    return newImg;
}

export async function deleteImgVersiculo(id, fallbackImg = null) {
    const idStr = String(id);
    const targetImg = fallbackImg || userImages.find(img => String(img.id) === idStr);

    // 1. Delete from Firebase Cloud (awaited to ensure cloud sync before re-fetching)
    try {
        await deleteImageFromFirebase(idStr, targetImg);
    } catch (e) {
        console.warn('[Firebase] Delete error:', e);
    }

    // 2. Delete from local cache
    userImages = userImages.filter(img => {
        if (String(img.id) === idStr) return false;
        if (targetImg && targetImg.address && img.address === targetImg.address) return false;
        return true;
    });

    if (saveImagesTimeout) clearTimeout(saveImagesTimeout);
    try {
        await Preferences.set({
            key: 'biblia_user_images',
            value: JSON.stringify(userImages)
        });
    } catch (e) {
        console.error("[NativeStorage] Erro ao salvar imagens após exclusão:", e);
    }

    if (favoriteImages[idStr]) {
        delete favoriteImages[idStr];
        saveFavoriteImagesLocal();
    }

    // 3. Delete from backend if available
    if (useBackend && !idStr.startsWith('usr_')) {
        try {
            await fetchWithTimeout(getApiUrl(`/api/img-versiculos/${id}`), { method: 'DELETE' }, 5000).catch(() => {});
        } catch (err) { }
    }

    return true;
}

export function toggleFavoriteImage(imgId, refKey = '') {
    const key = String(imgId);
    let isFav = false;
    if (favoriteImages[key] || (refKey && favoriteImages[refKey])) {
        delete favoriteImages[key];
        if (refKey) delete favoriteImages[refKey];
        isFav = false;
    } else {
        favoriteImages[key] = true;
        if (refKey) favoriteImages[refKey] = true;
        isFav = true;
    }
    saveFavoriteImagesLocal();
    return isFav;
}

export function isFavoriteImage(imgId, refKey = '') {
    const key = String(imgId);
    return !!favoriteImages[key] || (refKey ? !!favoriteImages[refKey] : false);
}

export const CANONICAL_BOOKS = [
    { id_livro: 1, nome_livro: 'Gênesis', total_capitulos: 50 },
    { id_livro: 2, nome_livro: 'Êxodo', total_capitulos: 40 },
    { id_livro: 3, nome_livro: 'Levítico', total_capitulos: 27 },
    { id_livro: 4, nome_livro: 'Números', total_capitulos: 36 },
    { id_livro: 5, nome_livro: 'Deuteronômio', total_capitulos: 34 },
    { id_livro: 6, nome_livro: 'Josué', total_capitulos: 24 },
    { id_livro: 7, nome_livro: 'Juízes', total_capitulos: 21 },
    { id_livro: 8, nome_livro: 'Rute', total_capitulos: 4 },
    { id_livro: 9, nome_livro: 'I Samuel', total_capitulos: 31 },
    { id_livro: 10, nome_livro: 'II Samuel', total_capitulos: 24 },
    { id_livro: 11, nome_livro: 'I Reis', total_capitulos: 22 },
    { id_livro: 12, nome_livro: 'II Reis', total_capitulos: 25 },
    { id_livro: 13, nome_livro: 'I Crônicas', total_capitulos: 29 },
    { id_livro: 14, nome_livro: 'II Crônicas', total_capitulos: 36 },
    { id_livro: 15, nome_livro: 'Esdras', total_capitulos: 10 },
    { id_livro: 16, nome_livro: 'Neemias', total_capitulos: 13 },
    { id_livro: 17, nome_livro: 'Tobias', total_capitulos: 14 },
    { id_livro: 18, nome_livro: 'Judite', total_capitulos: 16 },
    { id_livro: 19, nome_livro: 'Ester', total_capitulos: 10 },
    { id_livro: 20, nome_livro: 'Jó', total_capitulos: 42 },
    { id_livro: 21, nome_livro: 'Salmos', total_capitulos: 150 },
    { id_livro: 22, nome_livro: 'I Macabeus', total_capitulos: 16 },
    { id_livro: 23, nome_livro: 'II Macabeus', total_capitulos: 15 },
    { id_livro: 24, nome_livro: 'Provérbios', total_capitulos: 31 },
    { id_livro: 25, nome_livro: 'Eclesiastes', total_capitulos: 12 },
    { id_livro: 26, nome_livro: 'Cântico dos Cânticos', total_capitulos: 8 },
    { id_livro: 27, nome_livro: 'Sabedoria', total_capitulos: 19 },
    { id_livro: 28, nome_livro: 'Eclesiástico', total_capitulos: 29 },
    { id_livro: 29, nome_livro: 'Isaías', total_capitulos: 66 },
    { id_livro: 30, nome_livro: 'Jeremias', total_capitulos: 52 },
    { id_livro: 31, nome_livro: 'Lamentações', total_capitulos: 5 },
    { id_livro: 32, nome_livro: 'Baruc', total_capitulos: 6 },
    { id_livro: 33, nome_livro: 'Ezequiel', total_capitulos: 48 },
    { id_livro: 34, nome_livro: 'Daniel', total_capitulos: 12 },
    { id_livro: 35, nome_livro: 'Oséias', total_capitulos: 14 },
    { id_livro: 36, nome_livro: 'Joel', total_capitulos: 3 },
    { id_livro: 37, nome_livro: 'Amós', total_capitulos: 9 },
    { id_livro: 38, nome_livro: 'Abdias', total_capitulos: 1 },
    { id_livro: 39, nome_livro: 'Jonas', total_capitulos: 4 },
    { id_livro: 40, nome_livro: 'Miquéias', total_capitulos: 7 },
    { id_livro: 41, nome_livro: 'Naum', total_capitulos: 3 },
    { id_livro: 42, nome_livro: 'Habacuc', total_capitulos: 3 },
    { id_livro: 43, nome_livro: 'Sofonias', total_capitulos: 3 },
    { id_livro: 44, nome_livro: 'Ageu', total_capitulos: 2 },
    { id_livro: 45, nome_livro: 'Zacarias', total_capitulos: 14 },
    { id_livro: 46, nome_livro: 'Malaquias', total_capitulos: 3 },
    { id_livro: 47, nome_livro: 'São Mateus', total_capitulos: 28 },
    { id_livro: 48, nome_livro: 'São Marcos', total_capitulos: 16 },
    { id_livro: 49, nome_livro: 'São Lucas', total_capitulos: 24 },
    { id_livro: 50, nome_livro: 'São João', total_capitulos: 21 },
    { id_livro: 51, nome_livro: 'Atos dos Apóstolos', total_capitulos: 28 },
    { id_livro: 52, nome_livro: 'Romanos', total_capitulos: 16 },
    { id_livro: 53, nome_livro: 'I Coríntios', total_capitulos: 16 },
    { id_livro: 54, nome_livro: 'II Coríntios', total_capitulos: 13 },
    { id_livro: 55, nome_livro: 'Gálatas', total_capitulos: 6 },
    { id_livro: 56, nome_livro: 'Efésios', total_capitulos: 6 },
    { id_livro: 57, nome_livro: 'Filipenses', total_capitulos: 4 },
    { id_livro: 58, nome_livro: 'Colossenses', total_capitulos: 4 },
    { id_livro: 59, nome_livro: 'I Tessalonicenses', total_capitulos: 5 },
    { id_livro: 60, nome_livro: 'II Tessalonicenses', total_capitulos: 3 },
    { id_livro: 61, nome_livro: 'I Timóteo', total_capitulos: 6 },
    { id_livro: 62, nome_livro: 'II Timóteo', total_capitulos: 4 },
    { id_livro: 63, nome_livro: 'Tito', total_capitulos: 3 },
    { id_livro: 64, nome_livro: 'Filêmon', total_capitulos: 1 },
    { id_livro: 65, nome_livro: 'Hebreus', total_capitulos: 13 },
    { id_livro: 66, nome_livro: 'São Tiago', total_capitulos: 5 },
    { id_livro: 67, nome_livro: 'I São Pedro', total_capitulos: 5 },
    { id_livro: 68, nome_livro: 'II São Pedro', total_capitulos: 3 },
    { id_livro: 69, nome_livro: 'I São João', total_capitulos: 5 },
    { id_livro: 70, nome_livro: 'II São João', total_capitulos: 1 },
    { id_livro: 71, nome_livro: 'III São João', total_capitulos: 1 },
    { id_livro: 72, nome_livro: 'São Judas', total_capitulos: 1 },
    { id_livro: 73, nome_livro: 'Apocalipse', total_capitulos: 22 }
];

export function buildPlanoLeituraArray(booksList) {
    const list = (booksList && booksList.length) ? booksList : CANONICAL_BOOKS;
    const allChapters = [];
    for (let i = 0; i < list.length; i++) {
        const livro = list[i];
        const totalCaps = livro.total_capitulos || livro.totalCapitulos || 1;
        for (let cap = 1; cap <= totalCaps; cap++) {
            allChapters.push({
                id_livro: livro.id_livro,
                nome_livro: livro.nome_livro,
                capitulo: cap
            });
        }
    }
    const total = allChapters.length;
    const remainder = total % 365;
    const basePerDay = Math.floor(total / 365);
    const plano = new Array(365);
    let cursor = 0;
    for (let dia = 0; dia < 365; dia++) {
        const count = dia < remainder ? basePerDay + 1 : basePerDay;
        plano[dia] = {
            dia: dia + 1,
            leituras: allChapters.slice(cursor, cursor + count)
        };
        cursor += count;
    }
    return plano;
}

// Pré-popula imediatamente o cache em memória com os 365 dias canônicos (0ms de espera)
planCache = buildPlanoLeituraArray(CANONICAL_BOOKS);

export function getPlanoLeituraSync() {
    if (planCache && Array.isArray(planCache) && planCache.length === 365) {
        return planCache;
    }
    planCache = buildPlanoLeituraArray(CANONICAL_BOOKS);
    return planCache;
}

export async function getPlanoLeitura() {
    if (planCache && Array.isArray(planCache) && planCache.length === 365) {
        return planCache;
    }

    // 1. Tenta recuperar do cache local do navegador/dispositivo (0ms instantâneo)
    try {
        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('biblia_plano_365_v2') : null;
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length === 365) {
                planCache = parsed;
                return planCache;
            }
        }
    } catch (e) {}

    // 2. Se temos backend ativo, tenta buscar do backend
    if (useBackend) {
        try {
            const res = await fetchWithTimeout(getApiUrl('/api/plano-leitura'), {}, 1200);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length === 365) {
                    planCache = data;
                    try { localStorage.setItem('biblia_plano_365_v2', JSON.stringify(planCache)); } catch (e) {}
                    return planCache;
                }
            }
        } catch (err) {
            console.warn('[BibliaDB] Falha getPlanoLeitura backend, usando cálculo local:', err);
        }
    }

    // 3. Garante cálculo imediato offline ultra-resiliente
    const livros = (bibliaData && bibliaData.livros && bibliaData.livros.length) ? bibliaData.livros : CANONICAL_BOOKS;
    const plano = buildPlanoLeituraArray(livros);
    planCache = plano;
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('biblia_plano_365_v2', JSON.stringify(planCache));
        }
    } catch (e) {}
    return plano;
}

export async function getStats() {
    if (useBackend) {
        try {
            const res = await fetchWithTimeout(getApiUrl('/api/stats'), {}, 1500);
            if (res.ok) return await res.json();
        } catch (err) {
            console.warn('[BibliaDB] Falha getStats backend, usando local:', err);
        }
    }

    return {
        total_livros: bibliaData ? bibliaData.livros.length : 0,
        total_versiculos: totalVersiculosPrecalc,
        total_favoritos: favoritosCount,
        total_imagens: (bibliaData && bibliaData.img_versiculos ? bibliaData.img_versiculos.length : 150) + userImages.length,
        livros_at: 46,
        livros_nt: 27
    };
}

export function exportUserImages() {
    return userImages || [];
}

export function getUserImagesCount() {
    return (userImages || []).length;
}

export async function importUserImages(items) {
    if (!Array.isArray(items) || items.length === 0) return 0;
    
    let addedCount = 0;
    const existingIds = new Set((userImages || []).map(img => String(img.id)));
    const existingTexts = new Set((userImages || []).map(img => `${img.nome_livro}_${img.id_capitulo}_${img.id_versiculo}_${img.texto}`));

    for (const item of items) {
        if (!item || (!item.address && !item.texto)) continue;
        const key = `${item.nome_livro || ''}_${item.id_capitulo || ''}_${item.id_versiculo || ''}_${item.texto || ''}`;
        
        if (!existingTexts.has(key)) {
            const newImg = {
                id: (item.id && !existingIds.has(String(item.id))) ? item.id : `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                id_livro: item.id_livro ? parseInt(item.id_livro) : null,
                nome_livro: item.nome_livro || 'Bíblia',
                id_capitulo: item.id_capitulo ? parseInt(item.id_capitulo) : null,
                id_versiculo: item.id_versiculo ? parseInt(item.id_versiculo) : null,
                texto: item.texto || '',
                address: item.address || item.url || '',
                oracao: item.oracao || '',
                is_user_upload: true,
                created_at: item.created_at || new Date().toISOString()
            };
            userImages.unshift(newImg);
            existingIds.add(String(newImg.id));
            existingTexts.add(key);
            addedCount++;
        }
    }

    if (addedCount > 0) {
        saveUserImagesLocal();
        syncPendingUserImagesToBackend().catch(() => {});
    }

    return addedCount;
}
