import { Preferences } from '@capacitor/preferences';
import { getFirebaseGalleryImages, saveImageToFirebase, deleteImageFromFirebase } from './firebaseGallery.js';

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
    try {
        const { value } = await Preferences.get({ key: 'biblia_user_images' });
        userImages = value ? JSON.parse(value) : [];
    } catch (e) {
        userImages = [];
    }
}

async function loadFavoriteImagesLocal() {
    try {
        const { value } = await Preferences.get({ key: 'biblia_favorite_images' });
        favoriteImages = value ? JSON.parse(value) : {};
    } catch (e) {
        favoriteImages = {};
    }
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
    try {
        // Tentar conectar ao backend em /api/stats com timeout de 3s
        const checkRes = await fetchWithTimeout(getApiUrl('/api/stats'), { cache: 'no-cache' }, 3000);
        if (checkRes.ok) {
            useBackend = true;
            isDBReady = true;
            console.log('[BibliaDB] Conectado ao servidor Backend SQLite (/api)!');
            await Promise.all([loadFavoritosLocal(), loadUserImagesLocal(), loadFavoriteImagesLocal()]);
            // Sincronizar em segundo plano quaisquer imagens que o usuário criou localmente
            syncPendingUserImagesToBackend().catch(e => console.warn('[BibliaDB] Erro no sync em segundo plano:', e));
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
    return bibliaData ? bibliaData.livros : [];
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
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export async function buscar(termo) {
    if (!termo || termo.trim().length < 2) return [];

    if (useBackend) {
        try {
            const res = await fetchWithTimeout(getApiUrl(`/api/busca?q=${encodeURIComponent(termo)}`), {}, 1500);
            if (res.ok) {
                const bRes = await res.json();
                if (bRes && bRes.length > 0) {
                    return bRes.map(r => ({
                        ...r,
                        favorito: favoritos[`${r.id_livro}_${r.id_capitulo}_${r.id_versiculo}`] ? 1 : (r.favorito || 0)
                    }));
                }
            }
        } catch (err) {
            console.warn('[BibliaDB] Falha na busca backend, usando local:', err);
        }
    }

    if (!bibliaData) return [];
    const words = termo.trim().split(/\s+/).map(w => removeAccents(w)).filter(w => w.length > 0);
    const resultados = [];

    for (const livro of bibliaData.livros) {
        for (let cap = 1; cap <= livro.total_capitulos; cap++) {
            const key = `${livro.id_livro}_${cap}`;
            const vs = bibliaData.versiculos[key] || [];
            for (const v of vs) {
                const normText = removeAccents(v.t);
                if (words.every(w => normText.includes(w))) {
                    resultados.push({
                        id_livro: livro.id_livro,
                        nome_livro: livro.nome_livro,
                        id_capitulo: cap,
                        id_versiculo: v.v,
                        texto: v.t,
                        favorito: favoritos[`${livro.id_livro}_${cap}_${v.v}`] ? 1 : 0
                    });
                    if (resultados.length >= 200) return resultados;
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

    // 2. Fetch shared cloud images from Firebase Realtime Database
    let cloudImgs = [];
    try {
        cloudImgs = await getFirebaseGalleryImages();
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

    // 4. Merge: Cloud uploaded images + local user images + base 150 canonical images
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

    // Local user images (offline created)
    for (const img of userImages) {
        const key = `${img.nome_livro || ''}_${img.id_capitulo || ''}_${img.id_versiculo || ''}_${img.texto || ''}_${img.address || ''}`;
        if (!seenKeys.has(key) && !seenKeys.has(String(img.id))) {
            seenKeys.add(key);
            mergedUploads.push({ ...img, is_user_upload: true });
            // Auto sync to Firebase in background
            saveImageToFirebase(img).catch(() => {});
        }
    }

    allImgs = [...mergedUploads, ...baseImgs];

    // 5. Apply local filtering
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
        is_user_upload: true,
        created_at: new Date().toISOString()
    };

    // 1. Save directly to Firebase Realtime Database (Global across all devices)
    try {
        const cloudSaved = await saveImageToFirebase(newImg);
        if (cloudSaved && cloudSaved.id) {
            newImg.id = cloudSaved.id;
            newImg.firebase_key = cloudSaved.id;
        } else {
            newImg.id = `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        }
    } catch (e) {
        newImg.id = `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
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

export async function deleteImgVersiculo(id) {
    const idStr = String(id);
    const targetImg = userImages.find(img => String(img.id) === idStr);

    // 1. Delete from Firebase Cloud
    deleteImageFromFirebase(idStr, targetImg).catch(e => console.warn('[Firebase] Delete error:', e));

    // 2. Delete from local cache
    userImages = userImages.filter(img => String(img.id) !== idStr);
    saveUserImagesLocal();

    if (favoriteImages[idStr]) {
        delete favoriteImages[idStr];
        saveFavoriteImagesLocal();
    }

    // 3. Delete from backend if available
    if (useBackend && !idStr.startsWith('usr_')) {
        try {
            fetchWithTimeout(getApiUrl(`/api/img-versiculos/${id}`), { method: 'DELETE' }, 5000).catch(() => {});
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

export async function getPlanoLeitura() {
    if (planCache) return planCache;

    if (useBackend) {
        try {
            const res = await fetchWithTimeout(getApiUrl('/api/plano-leitura'), {}, 1500);
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
