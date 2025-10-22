import express from 'express';
import cors from 'cors';
import apiRoutes from './src/routes/api.routes';
import { initializeDatabase } from './src/infra/db/connection';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRoutes);

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`📈 MS-Métricas (PSP) corriendo en http://localhost:${PORT}`);
        console.log(`Utilizando PostgreSQL como motor de persistencia.`);
    });
}).catch(err => {
    console.error("CRÍTICO: El MS-Métricas no pudo inicializarse debido a un error de DB.");
    process.exit(1); 
});