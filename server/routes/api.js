import express from 'express';
import {
    getLivros,
    getVersiculos,
    buscar,
    getVersiculoDoDia,
    getImgVersiculos,
    addImgVersiculo,
    deleteImgVersiculo,
    toggleFavorito,
    getFavoritos,
    getPlanoLeitura,
    getStats
} from '../db.js';

const router = express.Router();

// GET /api/stats
router.get('/stats', async (req, res) => {
    try {
        const stats = await getStats();
        res.json(stats);
    } catch (err) {
        console.error('Erro ao buscar stats:', err);
        res.status(500).json({ error: 'Erro interno ao buscar stats' });
    }
});

// GET /api/livros
router.get('/livros', async (req, res) => {
    try {
        const livros = await getLivros();
        res.json(livros);
    } catch (err) {
        console.error('Erro ao buscar livros:', err);
        res.status(500).json({ error: 'Erro interno ao buscar livros' });
    }
});

// GET /api/livros/:idLivro/capitulos/:idCapitulo/versiculos
router.get('/livros/:idLivro/capitulos/:idCapitulo/versiculos', async (req, res) => {
    try {
        const idLivro = parseInt(req.params.idLivro);
        const idCapitulo = parseInt(req.params.idCapitulo);
        const versiculos = await getVersiculos(idLivro, idCapitulo);
        res.json(versiculos);
    } catch (err) {
        console.error('Erro ao buscar versículos:', err);
        res.status(500).json({ error: 'Erro interno ao buscar versículos' });
    }
});

// GET /api/busca?q=termo
router.get('/busca', async (req, res) => {
    try {
        const termo = req.query.q || '';
        const resultados = await buscar(termo);
        res.json(resultados);
    } catch (err) {
        console.error('Erro na busca:', err);
        res.status(500).json({ error: 'Erro interno na busca' });
    }
});

// GET /api/versiculo-do-dia
router.get('/versiculo-do-dia', async (req, res) => {
    try {
        const v = await getVersiculoDoDia();
        res.json(v);
    } catch (err) {
        console.error('Erro ao buscar versículo do dia:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});

// GET /api/img-versiculos?q=termo&categoria=all
router.get('/img-versiculos', async (req, res) => {
    try {
        const q = req.query.q || '';
        const categoria = req.query.categoria || 'all';
        const imgs = await getImgVersiculos(q, categoria);
        res.json(imgs);
    } catch (err) {
        console.error('Erro ao buscar imagens de versículos:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});

// POST /api/img-versiculos
router.post('/img-versiculos', async (req, res) => {
    try {
        const { id_livro, nome_livro, id_capitulo, id_versiculo, texto, address, oracao } = req.body;
        if (!address && !texto) {
            return res.status(400).json({ error: 'Imagem ou texto são obrigatórios' });
        }
        const novaImg = await addImgVersiculo({
            id_livro: id_livro ? parseInt(id_livro) : null,
            nome_livro: nome_livro || 'Bíblia',
            id_capitulo: id_capitulo ? parseInt(id_capitulo) : null,
            id_versiculo: id_versiculo ? parseInt(id_versiculo) : null,
            texto: texto || '',
            address: address || '',
            oracao: oracao || ''
        });
        res.status(201).json(novaImg);
    } catch (err) {
        console.error('Erro ao salvar imagem de versículo:', err);
        res.status(500).json({ error: 'Erro interno ao salvar imagem' });
    }
});

// DELETE /api/img-versiculos/:id
router.delete('/img-versiculos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await deleteImgVersiculo(id);
        res.json(result);
    } catch (err) {
        console.error('Erro ao excluir imagem:', err);
        res.status(500).json({ error: 'Erro interno ao excluir imagem' });
    }
});

// GET /api/favoritos
router.get('/favoritos', async (req, res) => {
    try {
        const favs = await getFavoritos();
        res.json(favs);
    } catch (err) {
        console.error('Erro ao buscar favoritos:', err);
        res.status(500).json({ error: 'Erro interno ao buscar favoritos' });
    }
});

// POST /api/favoritos/toggle
router.post('/favoritos/toggle', async (req, res) => {
    try {
        const { idLivro, idCapitulo, idVersiculo } = req.body;
        if (!idLivro || !idCapitulo || !idVersiculo) {
            return res.status(400).json({ error: 'Parâmetros inválidos' });
        }
        const novoStatus = await toggleFavorito(idLivro, idCapitulo, idVersiculo);
        res.json({ idLivro, idCapitulo, idVersiculo, favorito: novoStatus });
    } catch (err) {
        console.error('Erro ao alternar favorito:', err);
        res.status(500).json({ error: 'Erro interno ao alternar favorito' });
    }
});

// GET /api/plano-leitura
router.get('/plano-leitura', async (req, res) => {
    try {
        const plano = await getPlanoLeitura();
        res.json(plano);
    } catch (err) {
        console.error('Erro ao buscar plano de leitura:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});

let serverGeminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
let serverAdminPin = process.env.ADMIN_PIN || '7777';

// POST /api/admin/verify-pin
router.post('/admin/verify-pin', (req, res) => {
    const { pin } = req.body;
    if (pin && pin === serverAdminPin) {
        return res.json({ success: true, hasKey: !!serverGeminiKey });
    }
    return res.status(401).json({ error: 'Senha incorreta' });
});

// POST /api/admin/set-gemini-key
router.post('/admin/set-gemini-key', (req, res) => {
    const { pin, key, newPin } = req.body;
    if (!pin || pin !== serverAdminPin) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
    if (key !== undefined) {
        serverGeminiKey = (key || '').trim();
    }
    if (newPin && newPin.trim()) {
        serverAdminPin = newPin.trim();
    }
    return res.json({ success: true, hasKey: !!serverGeminiKey });
});

// POST /api/homilia (Secure AI generation on server)
router.post('/homilia', async (req, res) => {
    try {
        const { bookName, chapter, verse, text, clientKey } = req.body;
        const activeKey = serverGeminiKey || clientKey;
        if (!activeKey) {
            return res.status(400).json({ error: 'KEY_NOT_CONFIGURED' });
        }

        const prompt = `Você é um padre católico acolhedor, profundamente piedoso, sábio e com sólida formação teológica e pastoral.
Faça uma bela e tocante homilia devocional (entre 3 e 4 parágrafos substanciais) para a seguinte passagem bíblica:
${bookName} ${chapter}${verse === 'completo' ? '' : ':' + verse} - "${text}"

Instruções para a homilia:
1. Comece com uma saudação cristã paternal e calorosa.
2. Explique o sentido espiritual profundo e teológico desta passagem no contexto do livro de ${bookName}.
3. Conecte com os ensinamentos dos Santos Padres da Igreja (como Santo Agostinho, São Tomás de Aquino, São João Crisóstomo ou Santa Teresa).
4. Dê 3 ensinamentos ou compromissos práticos para a vida diária do fiel moderno (família, trabalho, oração).
5. Termine com uma oração e bênção sacerdotal solene em nome da Santíssima Trindade.
Destaque frases e conceitos espirituais centrais em negrito.`;

        const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
        let homilyText = null;

        for (const model of models) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.7, topP: 0.95, maxOutputTokens: 2048 }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                        homilyText = data.candidates[0].content.parts[0].text;
                        break;
                    }
                }
            } catch (e) {
                console.warn(`[Backend Gemini] Tentativa com ${model} falhou:`, e.message);
            }
        }

        if (homilyText) {
            return res.json({ homily: homilyText });
        } else {
            return res.status(502).json({ error: 'GEMINI_UNAVAILABLE' });
        }
    } catch (err) {
        console.error('Erro ao processar homilia no servidor:', err);
        res.status(500).json({ error: 'Erro interno ao gerar homilia' });
    }
});

// GET /api/liturgia?dia=DD&mes=MM&ano=YYYY (Proxy/cache seguro da Liturgia Diária)
const liturgiaServerCache = new Map();

router.get('/liturgia', async (req, res) => {
    try {
        const now = new Date();
        const dia = String(req.query.dia || now.getDate()).padStart(2, '0');
        const mes = String(req.query.mes || (now.getMonth() + 1)).padStart(2, '0');
        const ano = String(req.query.ano || now.getFullYear());
        const cacheKey = `${ano}-${mes}-${dia}`;

        if (liturgiaServerCache.has(cacheKey)) {
            return res.json(liturgiaServerCache.get(cacheKey));
        }

        const urls = [
            `https://liturgia.up.railway.app/v2/?dia=${dia}&mes=${mes}&ano=${ano}`,
            `https://liturgia.up.railway.app/?dia=${dia}&mes=${mes}`,
            `https://liturgia.up.railway.app/v2/`,
            `https://liturgia.up.railway.app/`
        ];

        for (const url of urls) {
            try {
                const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
                if (response.ok) {
                    const data = await response.json();
                    if (data && (data.leituras || data.evangelho || data.primeiraLeitura)) {
                        liturgiaServerCache.set(cacheKey, data);
                        return res.json(data);
                    }
                }
            } catch (inner) {}
        }

        res.status(404).json({ error: 'LITURGIA_NOT_FOUND' });
    } catch (err) {
        console.error('[Backend API] Erro ao buscar liturgia:', err);
        res.status(500).json({ error: 'INTERNAL_ERROR' });
    }
});

export default router;
