import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API REST
app.use('/api', apiRoutes);

// Endpoint de verificação de saúde
app.get('/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

export default app;
