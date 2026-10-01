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
        const deleteKeys = new Set();
        if (!idStr.startsWith('usr_') && !idStr.startsWith('http') && !idStr.startsWith('data:')) {
            deleteKeys.add(idStr);
        }

        // Scan database to delete by matching key, address or verse content
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);
        const res = await fetch(`${FIREBASE_DB_URL}/gallery.json`, { 
            cache: 'no-cache',
            signal: controller.signal 
        }).catch(() => null);
        clearTimeout(timeout);

        if (res && res.ok) {
            const data = await res.json().catch(() => null);
            if (data && typeof data === 'object') {
                for (const [key, val] of Object.entries(data)) {
                    if (val) {
                        const matchesKey = (key === idStr || String(val.id) === idStr || String(val.firebase_key) === idStr);
                        const matchesAddress = (fallbackImg && fallbackImg.address && val.address && val.address === fallbackImg.address) ||
                                               (idStr.startsWith('http') && val.address === idStr) ||
                                               (fallbackImg && fallbackImg.url && val.address === fallbackImg.url);
                        const matchesContent = fallbackImg && fallbackImg.texto && val.texto === fallbackImg.texto && 
                                               String(val.id_capitulo || '') === String(fallbackImg.id_capitulo || '') && 
                                               String(val.id_versiculo || '') === String(fallbackImg.id_versiculo || '');

                        if (matchesKey || matchesAddress || matchesContent) {
                            deleteKeys.add(key);
                        }
                    }
                }
            }
        }

        const deletePromises = [];
        for (const key of deleteKeys) {
            deletePromises.push(
                fetch(`${FIREBASE_DB_URL}/gallery/${encodeURIComponent(key)}.json`, { 
                    method: 'DELETE' 
                }).then(() => {
                    console.log('[FirebaseGallery] Imagem removida com sucesso do Firebase:', key);
                }).catch(e => console.warn('[FirebaseGallery] Erro ao deletar chave:', key, e))
            );
        }

        if (deletePromises.length > 0) {
            await Promise.all(deletePromises);
        }
        return true;
    } catch (err) {
        console.warn('[FirebaseGallery] Erro ao remover do Firebase:', err);
        return false;
    }
}

