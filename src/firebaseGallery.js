// Firebase Realtime Database Sync for Holy Catholic Gallery
export const FIREBASE_DB_URL = "https://bibliasagradaavemaria-ad542-default-rtdb.firebaseio.com";

/**
 * Fetch all gallery images saved in Firebase Cloud Realtime Database
 */
export async function getFirebaseGalleryImages() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(`${FIREBASE_DB_URL}/gallery.json`, {
            signal: controller.signal,
            cache: 'no-cache'
        });
        clearTimeout(timeout);

        if (!res.ok) return [];
        const data = await res.json();
        if (!data || typeof data !== 'object') return [];

        const items = [];
        for (const [key, val] of Object.entries(data)) {
            if (val && (val.address || val.texto)) {
                items.push({
                    id: key,
                    firebase_key: key,
                    id_livro: val.id_livro ? parseInt(val.id_livro) : null,
                    nome_livro: val.nome_livro || 'Bíblia',
                    id_capitulo: val.id_capitulo ? parseInt(val.id_capitulo) : null,
                    id_versiculo: val.id_versiculo ? parseInt(val.id_versiculo) : null,
                    texto: val.texto || '',
                    address: val.address || val.url || '',
                    oracao: val.oracao || '',
                    is_user_upload: true,
                    created_at: val.created_at || new Date().toISOString()
                });
            }
        }

        // Ordenar por data de criação decrescente
        items.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        return items;
    } catch (err) {
        console.warn('[FirebaseGallery] Falha ao carregar imagens da nuvem Firebase:', err);
        return [];
    }
}

/**
 * Save a new gallery image directly to Firebase Realtime Database
 */
export async function saveImageToFirebase(imgData) {
    try {
        const payload = {
            id_livro: imgData.id_livro ? parseInt(imgData.id_livro) : null,
            nome_livro: imgData.nome_livro || 'Bíblia',
            id_capitulo: imgData.id_capitulo ? parseInt(imgData.id_capitulo) : null,
            id_versiculo: imgData.id_versiculo ? parseInt(imgData.id_versiculo) : null,
            texto: imgData.texto || '',
            address: imgData.address || imgData.url || '',
            oracao: imgData.oracao || '',
            is_user_upload: true,
            created_at: imgData.created_at || new Date().toISOString()
        };

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        const res = await fetch(`${FIREBASE_DB_URL}/gallery.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (res.ok) {
            const data = await res.json();
            console.log('[FirebaseGallery] Imagem salva na nuvem Firebase com ID:', data.name);
            return {
                ...payload,
                id: data.name,
                firebase_key: data.name
            };
        }
    } catch (err) {
        console.warn('[FirebaseGallery] Erro ao gravar imagem no Firebase:', err);
    }
    return null;
}

/**
 * Delete an image from Firebase Realtime Database
 */
export async function deleteImageFromFirebase(id, fallbackImg = null) {
    if (!id) return false;
    const idStr = String(id);

    try {
        // Se idStr é uma chave do Firebase (não começa com base_ ou usr_)
        if (!idStr.startsWith('base_') && !idStr.startsWith('usr_') && idStr.length > 5) {
            await fetch(`${FIREBASE_DB_URL}/gallery/${idStr}.json`, { method: 'DELETE' });
            return true;
        }

        // Se veio com identificador local, buscar a chave correspondente no Firebase
        const res = await fetch(`${FIREBASE_DB_URL}/gallery.json`);
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data === 'object') {
                for (const [key, val] of Object.entries(data)) {
                    if (val && (
                        (val.address && fallbackImg && val.address === fallbackImg.address) ||
                        (val.texto && fallbackImg && val.texto === fallbackImg.texto && val.id_versiculo === fallbackImg.id_versiculo)
                    )) {
                        await fetch(`${FIREBASE_DB_URL}/gallery/${key}.json`, { method: 'DELETE' });
                        console.log('[FirebaseGallery] Imagem removida do Firebase pela chave:', key);
                        return true;
                    }
                }
            }
        }
    } catch (err) {
        console.warn('[FirebaseGallery] Erro ao remover do Firebase:', err);
    }
    return false;
}
