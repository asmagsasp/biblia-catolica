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
                        texto_norm TEXT,
                        PRIMARY KEY (id_livro, id_capitulo, id_versiculo)
                    )
                `);

                try {
                    await run(`ALTER TABLE versiculos ADD COLUMN texto_norm TEXT`);
                } catch (e) {
                    // Coluna já existe
                }

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
                await run(`CREATE INDEX IF NOT EXISTS idx_versiculos_texto_norm ON versiculos(texto_norm)`);
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

                                const stmtVer = db.prepare(`INSERT INTO versiculos (id_livro, id_capitulo, id_versiculo, texto, texto_norm) VALUES (?, ?, ?, ?, ?)`);
                                for (const key in bibliaData.versiculos) {
                                    const [idLivro, idCap] = key.split('_').map(Number);
                                    const vs = bibliaData.versiculos[key];
                                    for (const v of vs) {
                                        stmtVer.run(idLivro, idCap, v.v, v.t, removeAccents(v.t));
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

                // Garantir que todos os versículos existentes tenham texto_norm preenchido para busca sem acentos
                try {
                    const unnormCount = await getOne(`SELECT COUNT(*) as count FROM versiculos WHERE texto_norm IS NULL`);
                    if (unnormCount && unnormCount.count > 0) {
                        console.log(`[Backend DB] Normalizando ${unnormCount.count} versículos para busca ultra-rápida sem acentos...`);
                        const allVerses = await getAll(`SELECT id_livro, id_capitulo, id_versiculo, texto FROM versiculos WHERE texto_norm IS NULL`);
                        await run('BEGIN TRANSACTION');
                        const stmtNorm = db.prepare(`UPDATE versiculos SET texto_norm = ? WHERE id_livro = ? AND id_capitulo = ? AND id_versiculo = ?`);
                        for (const v of allVerses) {
                            stmtNorm.run(removeAccents(v.texto), v.id_livro, v.id_capitulo, v.id_versiculo);
                        }
                        await new Promise((resFin) => stmtNorm.finalize(resFin));
                        await run('COMMIT');
                        console.log('[Backend DB] Normalização de versículos concluída com sucesso!');
                    }
                } catch (errNorm) {
                    console.warn('[Backend DB] Aviso na normalização de versículos:', errNorm);
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
    await ensureDB();
    if (!termo || termo.trim().length < 2) return [];
    
    const cleanTerm = termo.trim().replace(/^["'«“\s]+|["'»”:,.;!?\s]+$/g, '');
    if (cleanTerm.length < 2) return [];

    const normTerm = removeAccents(cleanTerm);

    // 1. Verificar se é referência bíblica direta (ex: "Salmo 23", "João 3:16", "Mateus 5")
    const ref = parseBiblicalReference(cleanTerm);
    if (ref) {
        const psalmAltCap = (ref.isPsalm && ref.cap === 23) ? 22 : ((ref.isPsalm && ref.cap === 91) ? 90 : null);
        const capsToFetch = psalmAltCap ? [psalmAltCap, ref.cap] : [ref.cap];
        const refResults = [];
        for (const c of capsToFetch) {
            let sql = `
                SELECT v.id_livro, l.nome_livro, v.id_capitulo, v.id_versiculo, v.texto
                FROM versiculos v
                JOIN livros l ON v.id_livro = l.id_livro
                WHERE v.id_livro = ? AND v.id_capitulo = ?
            `;
            const params = [ref.idLivro, c];
            if (ref.ver) {
                sql += ` AND v.id_versiculo = ?`;
                params.push(ref.ver);
            }
            sql += ` ORDER BY v.id_versiculo ASC LIMIT 200`;
            const rows = await getAll(sql, params);
            if (rows && rows.length > 0) {
                refResults.push(...rows);
            }
        }
        if (refResults.length > 0) return refResults;
    }

    // 2. Tentar busca de frase exata usando texto_norm com limites de palavras flexíveis
    const phraseRegex = buildExactSearchRegex(cleanTerm);
    if (!phraseRegex) return [];

    let phraseSql = `
        SELECT 
            v.id_livro, 
            l.nome_livro, 
            v.id_capitulo, 
            v.id_versiculo, 
            v.texto,
            v.texto_norm
        FROM versiculos v
        JOIN livros l ON v.id_livro = l.id_livro
        WHERE v.texto_norm LIKE ?
        LIMIT 1000
    `;
    const phraseCandidates = await getAll(phraseSql, [`%${normTerm}%`]);
    const phraseResults = phraseCandidates
        .filter(r => phraseRegex.test(r.texto_norm || removeAccents(r.texto)))
        .slice(0, 200)
        .map(({ texto_norm, ...rest }) => rest);

    if (phraseResults && phraseResults.length > 0) {
        return phraseResults;
    }

    // 3. Fallback para múltiplas palavras (todas devem ocorrer como palavras exatas)
    const words = cleanTerm
        .split(/\s+/)
        .map(w => removeAccents(w).replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '').toLowerCase())
        .filter(w => w.length >= 2);

    if (words.length <= 1) return [];

    const conditions = words.map(() => `v.texto_norm LIKE ?`);
    const wordsSql = `
        SELECT 
            v.id_livro, 
            l.nome_livro, 
            v.id_capitulo, 
            v.id_versiculo, 
            v.texto,
            v.texto_norm
        FROM versiculos v
        JOIN livros l ON v.id_livro = l.id_livro
        WHERE ${conditions.join(' AND ')}
        LIMIT 1000
    `;
    const wordRegexes = words.map(w => new RegExp(`(?:^|[^a-z0-9])${escapeRegex(w)}(?:$|[^a-z0-9])`, 'i'));
    const wordCandidates = await getAll(wordsSql, words.map(w => `%${w}%`));
    const allWordsMatches = wordCandidates
        .filter(r => {
            const norm = r.texto_norm || removeAccents(r.texto);
            return wordRegexes.every(rgx => rgx.test(norm));
        })
        .slice(0, 200)
        .map(({ texto_norm, ...rest }) => rest);

    if (allWordsMatches.length > 0) {
        return allWordsMatches;
    }

    // 4. Se tiver 3 ou mais palavras e nenhuma casou todas, buscar por relevância com pontuação
    if (words.length >= 3) {
        const sigWords = words.filter(w => !SEARCH_STOP_WORDS.has(w));
        const activeWords = sigWords.length >= 2 ? sigWords : words;
        const scoreExpr = activeWords.map(() => `(CASE WHEN v.texto_norm LIKE ? THEN 1 ELSE 0 END)`).join(' + ');
        const minMatches = Math.max(2, Math.ceil(activeWords.length * 0.60));
        const fuzzySql = `
            SELECT * FROM (
                SELECT 
                    v.id_livro, 
                    l.nome_livro, 
                    v.id_capitulo, 
                    v.id_versiculo, 
                    v.texto,
                    v.texto_norm,
                    (${scoreExpr}) as match_count
                FROM versiculos v
                JOIN livros l ON v.id_livro = l.id_livro
            ) sub
            WHERE sub.match_count >= ?
            ORDER BY sub.match_count DESC
            LIMIT 200
        `;
        const params = [...activeWords.map(w => `%${w}%`), minMatches];
        const fuzzyCandidates = await getAll(fuzzySql, params);
        if (fuzzyCandidates && fuzzyCandidates.length > 0) {
            return fuzzyCandidates.map(({ texto_norm, match_count, ...rest }) => rest);
        }
    }

    return [];
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
    if (planCache && Array.isArray(planCache) && planCache.length === 365) return planCache;
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
