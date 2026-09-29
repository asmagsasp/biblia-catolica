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

// GET /api/stats
router.get('/stats', async (req, res) => {
    try {
        const stats = await getStats();
        res.json(stats);
    } catch (err) {
        console.error('Erro ao buscar estatísticas:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});

export default router;
