import express from 'express';
import { ReportController } from '../infra/http/ReportController';
import { MongoMetricRepository } from '../infra/repositories/MongoMetricRepository';

const router = express.Router();

const metricRepository = new MongoMetricRepository();
const reportController = ReportController(metricRepository);

router.get('/psp/summary/:developerId', reportController.getPSPSummary);
router.post('/log/time', reportController.logTime);
router.post('/log/defect', reportController.logDefect);

export default router;