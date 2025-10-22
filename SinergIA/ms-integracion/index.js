import express from 'express';
import { Secrets } from './src/infra/config/secrets';

const app = express();
const PORT = process.env.PORT || 3001;

new Secrets();

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'Conectores listos. Claves cargadas (vía Singleton).' 
    });
});

app.listen(PORT, () => {
    console.log(`🔌 MS-Integración (Connectors) corriendo en http://localhost:${PORT}`);
});