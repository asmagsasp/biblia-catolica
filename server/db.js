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
                        url TEXT,
                        texto TEXT,
                        referencia TEXT
                    )
                `);

                await run(`CREATE INDEX IF NOT EXISTS idx_versiculos_texto ON versiculos(texto)`);
                await run(`CREATE INDEX IF NOT EXISTS idx_versiculos_busca ON versiculos(id_livro, id_capitulo)`);

                const countRow = await getOne(`SELECT COUNT(*) as count FROM livros`);
                if (countRow.count === 0) {
                    console.log('[Backend DB] Populando banco SQLite a partir do biblia.json...');
                    const jsonPath = path.join(__dirname, '..', 'public', 'data', 'biblia.json');
                    if (fs.existsSync(jsonPath)) {
                        const rawData = fs.readFileSync(jsonPath, 'utf-8');
                        const bibliaData = JSON.parse(rawData);

                        await run('BEGIN TRANSACTION');
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
                            const stmtImg = db.prepare(`INSERT INTO img_versiculos (url, texto, referencia) VALUES (?, ?, ?)`);
                            for (const img of bibliaData.img_versiculos) {
                                stmtImg.run(img.url || '', img.texto || '', img.referencia || '');
                            }
                            stmtImg.finalize();
                        }

                        await run('COMMIT');
                        console.log('[Backend DB] Banco de dados SQLite inicializado com sucesso!');
                    } else {
                        console.warn('[Backend DB] Arquivo biblia.json não encontrado em:', jsonPath);
                    }
                } else {
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

export async function buscar(termo) {
    await ensureDB();
    if (!termo || termo.length < 3) return [];
    const sql = `
        SELECT 
            v.id_livro, 
            l.nome_livro, 
            v.id_capitulo, 
            v.id_versiculo, 
            v.texto
        FROM versiculos v
        JOIN livros l ON v.id_livro = l.id_livro
        WHERE v.texto LIKE ?
        LIMIT 50
    `;
    return await getAll(sql, [`%${termo}%`]);
}

export async function getVersiculoDoDia() {
    await ensureDB();
    const imgs = await getAll(`SELECT * FROM img_versiculos`);
    if (!imgs.length) return null;
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    return imgs[dayOfYear % imgs.length];
}

export async function getImgVersiculos() {
    await ensureDB();
    return await getAll(`SELECT * FROM img_versiculos`);
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
