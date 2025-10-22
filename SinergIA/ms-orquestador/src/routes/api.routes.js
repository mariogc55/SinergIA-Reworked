
import express from 'express';
import { AutomationController } from '../infra/http/AutomationController';
import { AutomationService } from '../application/AutomationService';
import { IssueCreationStrategy } from '../application/strategies/IssueCreationStrategy';
import { GeminiAdapter } from '../../ms-integracion/src/infra/adapters/GeminiAPIAdapter';
import { JiraRestAdapter } from '../../ms-integracion/src/infra/adapters/JiraRestAdapter';

const router = express.Router();

const geminiAdapter = new GeminiAdapter();
const jiraAdapter = new JiraRestAdapter();
const issueCreationStrategy = new IssueCreationStrategy(geminiAdapter, jiraAdapter);
const automationService = new AutomationService(issueCreationStrategy);
const automationController = AutomationController(automationService);

router.post('/automate', automationController.triggerAutomation);

export default router;