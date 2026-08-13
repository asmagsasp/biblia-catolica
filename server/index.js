import app from './app.js';
import { initDatabase } from './db.js';

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        console.log('[Backend Server] Inicializando banco de dados...');
        await initDatabase();
        
        app.listen(PORT, () => {
            console.log(`[Backend Server] Servidor de Banco de Dados rodando em http://localhost:${PORT}`);
            console.log(`[Backend Server] APIs disponíveis em http://localhost:${PORT}/api/`);
        });
    } catch (err) {
        console.error('[Backend Server] Falha ao iniciar servidor backend:', err);
        process.exit(1);
    }
}

startServer();
