import express from 'express';
import cors from 'cors';
import apiRoutes from './src/routes/api.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
    res.send(`MS-Orquestador (Puerto ${PORT}) - Listo para orquestar Gemini y Jira.`);
});

app.listen(PORT, () => {
    console.log(`🚀 MS-Orquestador corriendo en http://localhost:${PORT}`);
});