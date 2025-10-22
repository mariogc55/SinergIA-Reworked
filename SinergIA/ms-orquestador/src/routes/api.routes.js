import express from 'express';
import { AutomationController } from '../infra/http/AutomationController';
import { AutomationService } from '../application/AutomationService';
import { IssueCreationStrategy } from '../application/strategies/IssueCreationStrategy';
import { GeminiAdapter } from '../../ms-integracion/src/infra/adapters/GeminiAPIAdapter'; 
import { JiraRestAdapter } from '../../ms-integracion/src/infra/adapters/JiraRestAdapter';
// import { ServiceNowAdapter } from '../../ms-integracion/src/infra/adapters/ServiceNowAdapter';

const router = express.Router();

const geminiAdapter = new GeminiAdapter();
const jiraAdapter = new JiraRestAdapter();

const issueCreationStrategy = new IssueCreationStrategy(geminiAdapter, jiraAdapter);

const strategyMap = {
    'create_issue': issueCreationStrategy,
};

const automationService = new AutomationService(strategyMap);

const automationController = AutomationController(automationService);

router.post('/automate', automationController.triggerAutomation); 

export default router;