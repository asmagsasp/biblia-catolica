import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbPath;
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const tmpDir = path.join('/tmp');
    if (!fs.existsSync(tmpDir)) {
        try { fs.mkdirSync(tmpDir, { recursive: true }); } catch (e) { }
    }
    dbPath = path.join(tmpDir, 'biblia.db');
} else {
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        try { fs.mkdirSync(dataDir, { recursive: true }); } catch (e) { }
    }
    dbPath = path.join(dataDir, 'biblia.db');
}

const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

function getAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function getOne(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

let planCache = null;
let isInitialized = false;
let initPromise = null;

export async function initDatabase() {
    if (isInitialized) return;
    if (initPromise) return initPromise;

    initPromise = new Promise(async (resolve, reject) => {
        try {
            db.serialize(async () => {
                await run(`
                    CREATE TABLE IF NOT EXISTS livros (
                        id_livro INTEGER PRIMARY KEY,
                        nome_livro TEXT NOT NULL,
                        id_testamento INTEGER NOT NULL,
                        total_capitulos INTEGER NOT NULL
                    )
                `);

                await run(`
                    CREATE TABLE IF NOT EXISTS versiculos (
                        id_livro INTEGER NOT NULL,
                        id_capitulo INTEGER NOT NULL,
                        id_versiculo INTEGER NOT NULL,
                        texto TEXT NOT NULL,
                        PRIMARY KEY (id_livro, id_capitulo, id_versiculo)
                    )
                `);

                await run(`
                    CREATE TABLE IF NOT EXISTS favoritos (
                        id_livro INTEGER NOT NULL,
                        id_capitulo INTEGER NOT NULL,
                        id_versiculo INTEGER NOT NULL,
                        PRIMARY KEY (id_livro, id_capitulo, id_versiculo)
                    )
                `);

                await run(`
                    CREATE TABLE IF NOT EXISTS img_versiculos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        id_livro INTEGER,
                        nome_livro TEXT,
                        id_capitulo INTEGER,
                        id_versiculo INTEGER,
                        texto TEXT,
                        address TEXT,
                        oracao TEXT,
                        is_user_upload INTEGER DEFAULT 0,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `);

                await run(`CREATE INDEX IF NOT EXISTS idx_versiculos_texto ON versiculos(texto)`);
                await run(`CREATE INDEX IF NOT EXISTS idx_versiculos_busca ON versiculos(id_livro, id_capitulo)`);

                const countRow = await getOne(`SELECT COUNT(*) as count FROM livros`);
                const countVersRow = await getOne(`SELECT COUNT(*) as count FROM versiculos`);
                const jsonPath = path.join(__dirname, '..', 'public', 'data', 'biblia.json');

                if (countRow.count === 0 || countVersRow.count < 30000) {
                    console.log('[Backend DB] Populando banco SQLite completo a partir do biblia.json...');
                    if (fs.existsSync(jsonPath)) {
                        const rawData = fs.readFileSync(jsonPath, 'utf-8');
                        const bibliaData = JSON.parse(rawData);

                        await run(`DELETE FROM livros`);
                        await run(`DELETE FROM versiculos`);
                        await run(`DELETE FROM img_versiculos WHERE is_user_upload = 0`);

                        await new Promise((resolvePopulate, rejectPopulate) => {
                            db.serialize(() => {
                                db.run('BEGIN TRANSACTION');
                                
                                const stmtLivro = db.prepare(`INSERT INTO livros (id_livro, nome_livro, id_testamento, total_capitulos) VALUES (?, ?, ?, ?)`);
                                for (const l of bibliaData.livros) {
                                    stmtLivro.run(l.id_livro, l.nome_livro, l.id_testamento, l.total_capitulos);
                                }
                                stmtLivro.finalize();

                                const stmtVer = db.prepare(`INSERT INTO versiculos (id_livro, id_capitulo, id_versiculo, texto) VALUES (?, ?, ?, ?)`);
                                for (const key in bibliaData.versiculos) {
                                    const [idLivro, idCap] = key.split('_').map(Number);
                                    const vs = bibliaData.versiculos[key];
                                    for (const v of vs) {
                                        stmtVer.run(idLivro, idCap, v.v, v.t);
                                    }
                                }
                                stmtVer.finalize();

                                if (bibliaData.img_versiculos && Array.isArray(bibliaData.img_versiculos)) {
                                    const stmtImg = db.prepare(`INSERT INTO img_versiculos (id_livro, nome_livro, id_capitulo, id_versiculo, texto, address, oracao, is_user_upload) VALUES (?, ?, ?, ?, ?, ?, ?, 0)`);
                                    for (const img of bibliaData.img_versiculos) {
                                        stmtImg.run(img.id_livro || null, img.nome_livro || '', img.id_capitulo || null, img.id_versiculo || null, img.texto || '', img.address || '', img.oracao || '');
                                    }
                                    stmtImg.finalize();
                                }

                                db.run('COMMIT', (err) => {
                                    if (err) return rejectPopulate(err);
                                    console.log('[Backend DB] Banco de dados SQLite populado com sucesso!');
                                    resolvePopulate();
                                });
                            });
                        });
                    } else {
                        console.warn('[Backend DB] Arquivo biblia.json não encontrado em:', jsonPath);
                    }
                } else {
                    // Check if img_versiculos needs upgrade (e.g. has address column with content or less than 147 items)
                    let needsUpgrade = false;
                    try {
                        const countImg = await getOne(`SELECT COUNT(*) as total FROM img_versiculos`);
                        const sampleImg = await getOne(`SELECT address, is_user_upload FROM img_versiculos LIMIT 1`);
                        if (!countImg || countImg.total < 150 || !sampleImg || !sampleImg.address) {
                            needsUpgrade = true;
                        }
                    } catch (e) {
                        needsUpgrade = true;
                    }

                    if (needsUpgrade) {
                        console.log('[Backend DB] Migrando tabela img_versiculos para nova estrutura...');
                        if (fs.existsSync(jsonPath)) {
                            const rawData = fs.readFileSync(jsonPath, 'utf-8');
                            const bibliaData = JSON.parse(rawData);
                            
                            await run(`DROP TABLE IF EXISTS img_versiculos`);
                            await run(`
                                CREATE TABLE IF NOT EXISTS img_versiculos (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    id_livro INTEGER,
                                    nome_livro TEXT,
                                    id_capitulo INTEGER,
                                    id_versiculo INTEGER,
                                    texto TEXT,
                                    address TEXT,
                                    oracao TEXT,
                                    is_user_upload INTEGER DEFAULT 0,
                                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                                )
                            `);
                            
                            await run('BEGIN TRANSACTION');
                            const stmtImg = db.prepare(`INSERT INTO img_versiculos (id_livro, nome_livro, id_capitulo, id_versiculo, texto, address, oracao, is_user_upload) VALUES (?, ?, ?, ?, ?, ?, ?, 0)`);
                            for (const img of bibliaData.img_versiculos) {
                                stmtImg.run(img.id_livro || null, img.nome_livro || '', img.id_capitulo || null, img.id_versiculo || null, img.texto || '', img.address || '', img.oracao || '');
                            }
                            await new Promise((resFin) => stmtImg.finalize(resFin));
                            await run('COMMIT');
                            console.log('[Backend DB] Tabela img_versiculos atualizada com', bibliaData.img_versiculos.length, 'imagens!');
                        }
                    }
                    console.log('[Backend DB] Banco de dados SQLite pronto. Registros de livros:', countRow.count);
                }
                isInitialized = true;
                resolve();
            });
        } catch (err) {
            console.error('[Backend DB] Erro na inicialização:', err);
            reject(err);
        }
    });

    return initPromise;
}

export async function ensureDB() {
    if (!isInitialized) {
        await initDatabase();
    }
}

export async function getLivros() {
    await ensureDB();
    return await getAll(`SELECT id_livro, nome_livro, id_testamento, total_capitulos FROM livros ORDER BY id_livro ASC`);
}

export async function getVersiculos(idLivro, idCapitulo) {
    await ensureDB();
    const sql = `
        SELECT 
            v.id_versiculo, 
            v.texto, 
            CASE WHEN f.id_versiculo IS NOT NULL THEN 1 ELSE 0 END as favorito
        FROM versiculos v
        LEFT JOIN favoritos f 
            ON v.id_livro = f.id_livro 
            AND v.id_capitulo = f.id_capitulo 
            AND v.id_versiculo = f.id_versiculo
        WHERE v.id_livro = ? AND v.id_capitulo = ?
        ORDER BY v.id_versiculo ASC
    `;
    return await getAll(sql, [idLivro, idCapitulo]);
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

function buildExactSearchRegex(term) {
    const parts = removeAccents(term).toLowerCase().trim().split(/\s+/).filter(Boolean).map(escapeRegex);
    if (parts.length === 0) return null;
    return new RegExp(`(?:^|[^a-z0-9])${parts.join('\\s+')}(?:$|[^a-z0-9])`, 'i');
}

export async function buscar(termo) {
    await ensureDB();
    if (!termo || termo.trim().length < 2) return [];
    
    const cleanTerm = termo.trim().replace(/^["'«“\s]+|["'»”:,.;!?\s]+$/g, '');
    if (cleanTerm.length < 2) return [];

    const phraseRegex = buildExactSearchRegex(cleanTerm);
    if (!phraseRegex) return [];

    // 1. Tentar busca de frase exata (filtrando para palavras/frases exatas)
    const phraseSql = `
        SELECT 
            v.id_livro, 
            l.nome_livro, 
            v.id_capitulo, 
            v.id_versiculo, 
            v.texto
        FROM versiculos v
        JOIN livros l ON v.id_livro = l.id_livro
        WHERE v.texto LIKE ?
        LIMIT 400
    `;
    const phraseCandidates = await getAll(phraseSql, [`%${cleanTerm}%`]);
    const phraseResults = phraseCandidates.filter(r => phraseRegex.test(removeAccents(r.texto))).slice(0, 200);
    if (phraseResults && phraseResults.length > 0) {
        return phraseResults;
    }

    // 2. Se não encontrar a frase contínua, buscar por palavras significativas (>= 2 caracteres)
    const words = cleanTerm
        .split(/\s+/)
        .map(w => removeAccents(w).replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '').toLowerCase())
        .filter(w => w.length >= 2);

    if (words.length <= 1) return []; // Se era palavra única e não achou como exata, encerra

    const conditions = words.map(() => `v.texto LIKE ?`);
    const wordsSql = `
        SELECT 
            v.id_livro, 
            l.nome_livro, 
            v.id_capitulo, 
            v.id_versiculo, 
            v.texto
        FROM versiculos v
        JOIN livros l ON v.id_livro = l.id_livro
        WHERE ${conditions.join(' AND ')}
        LIMIT 400
    `;
    const wordRegexes = words.map(w => new RegExp(`(?:^|[^a-z0-9])${escapeRegex(w)}(?:$|[^a-z0-9])`, 'i'));
    const wordCandidates = await getAll(wordsSql, words.map(w => `%${w}%`));
    return wordCandidates.filter(r => {
        const norm = removeAccents(r.texto);
        return wordRegexes.every(rgx => rgx.test(norm));
    }).slice(0, 200);
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
    await ensureDB();
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const item = VERSICULOS_INSPIRADORES[dayOfYear % VERSICULOS_INSPIRADORES.length];

    try {
        const row = await getOne(`
            SELECT v.id_livro, v.id_capitulo, v.id_versiculo, v.texto, l.nome_livro
            FROM versiculos v
            JOIN livros l ON v.id_livro = l.id_livro
            WHERE v.id_livro = ? AND v.id_capitulo = ? AND v.id_versiculo = ?
        `, [item.id_livro, item.cap, item.ver]);

        if (row && row.texto) {
            return {
                id_livro: row.id_livro,
                nome_livro: row.nome_livro,
                id_capitulo: row.id_capitulo,
                id_versiculo: row.id_versiculo,
                texto: row.texto.trim(),
                referencia: `${row.nome_livro} ${row.id_capitulo},${row.id_versiculo}`,
                oracao: item.oracao
            };
        }
    } catch (e) {
        console.error('[Backend DB] Erro ao buscar versiculo do dia no SQLite:', e);
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

export async function getImgVersiculos(searchQuery = '', filterCategory = 'all') {
    await ensureDB();
    let sql = `SELECT * FROM img_versiculos`;
    const params = [];
    const conditions = [];

    if (searchQuery && searchQuery.trim().length > 0) {
        const term = `%${searchQuery.trim()}%`;
        conditions.push(`(nome_livro LIKE ? OR texto LIKE ? OR oracao LIKE ? OR (nome_livro || ' ' || id_capitulo || ',' || id_versiculo) LIKE ?)`);
        params.push(term, term, term, term);
    }

    if (filterCategory === 'uploads') {
        conditions.push(`is_user_upload = 1`);
    } else if (filterCategory === 'salmos') {
        conditions.push(`(id_livro = 21 OR nome_livro LIKE '%Salmo%')`);
    } else if (filterCategory === 'evangelhos') {
        conditions.push(`id_livro IN (47, 48, 49, 50)`);
    } else if (filterCategory === 'at') {
        conditions.push(`id_livro <= 46`);
    } else if (filterCategory === 'nt') {
        conditions.push(`id_livro >= 47`);
    }

    if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(' AND ');
    }

    sql += ` ORDER BY is_user_upload DESC, id DESC`;
    return await getAll(sql, params);
}

export async function addImgVersiculo(data) {
    await ensureDB();
    const { id_livro, nome_livro, id_capitulo, id_versiculo, texto, address, oracao } = data;
    const res = await run(
        `INSERT INTO img_versiculos (id_livro, nome_livro, id_capitulo, id_versiculo, texto, address, oracao, is_user_upload) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
        [id_livro || null, nome_livro || 'Bíblia', id_capitulo || null, id_versiculo || null, texto || '', address || '', oracao || '']
    );
    const newId = res.lastID;
    return await getOne(`SELECT * FROM img_versiculos WHERE id = ?`, [newId]);
}

export async function deleteImgVersiculo(id) {
    await ensureDB();
    await run(`DELETE FROM img_versiculos WHERE id = ?`, [id]);
    return { success: true, id };
}

export async function toggleFavorito(idLivro, idCapitulo, idVersiculo) {
    await ensureDB();
    const existing = await getOne(
        `SELECT * FROM favoritos WHERE id_livro = ? AND id_capitulo = ? AND id_versiculo = ?`,
        [idLivro, idCapitulo, idVersiculo]
    );

    if (existing) {
        await run(`DELETE FROM favoritos WHERE id_livro = ? AND id_capitulo = ? AND id_versiculo = ?`, [idLivro, idCapitulo, idVersiculo]);
        return 0;
    } else {
        await run(`INSERT INTO favoritos (id_livro, id_capitulo, id_versiculo) VALUES (?, ?, ?)`, [idLivro, idCapitulo, idVersiculo]);
        return 1;
    }
}

export async function getFavoritos() {
    await ensureDB();
    const sql = `
        SELECT 
            f.id_livro,
            l.nome_livro,
            f.id_capitulo,
            f.id_versiculo,
            v.texto
        FROM favoritos f
        JOIN livros l ON f.id_livro = l.id_livro
        JOIN versiculos v ON f.id_livro = v.id_livro AND f.id_capitulo = v.id_capitulo AND f.id_versiculo = v.id_versiculo
        ORDER BY f.id_livro ASC, f.id_capitulo ASC, f.id_versiculo ASC
    `;
    return await getAll(sql);
}

export async function getPlanoLeitura() {
    if (planCache) return planCache;
    await ensureDB();

    const livros = await getLivros();
    const allChapters = [];
    for (const l of livros) {
        for (let cap = 1; cap <= l.total_capitulos; cap++) {
            allChapters.push({
                id_livro: l.id_livro,
                nome_livro: l.nome_livro,
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
    await ensureDB();
    const rowLivros = await getOne(`SELECT COUNT(*) as total FROM livros`);
    const rowVersiculos = await getOne(`SELECT COUNT(*) as total FROM versiculos`);
    const rowFavoritos = await getOne(`SELECT COUNT(*) as total FROM favoritos`);
    const rowImagens = await getOne(`SELECT COUNT(*) as total FROM img_versiculos`);

    return {
        total_livros: rowLivros ? rowLivros.total : 0,
        total_versiculos: rowVersiculos ? rowVersiculos.total : 0,
        total_favoritos: rowFavoritos ? rowFavoritos.total : 0,
        total_imagens: rowImagens ? rowImagens.total : 0,
        livros_at: 46,
        livros_nt: 27
    };
}
