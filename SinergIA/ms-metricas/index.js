import express from 'express';
import cors from 'cors';
import apiRoutes from './src/routes/api.routes';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRoutes);

app.listen(PORT, () => {
    console.log(`MS-Métricas (PSP) corriendo en http://localhost:${PORT}`);
});