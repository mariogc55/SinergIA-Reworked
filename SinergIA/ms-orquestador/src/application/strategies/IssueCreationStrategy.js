// IssueCreationStrategy.js (Implementación concreta del Patrón STRATEGY)
import { IAutomationStrategy } from "../../domain/ports/IAutomationStrategy";
import { GeminiAdapter } from "../../../ms-integracion/src/infra/adapters/GeminiAPIAdapter";
import { JiraRestAdapter } from "../../../ms-integracion/src/infra/adapters/JiraRestAdapter";

export class IssueCreationStrategy extends IAutomationStrategy {
    constructor(geminiAdapter, jiraAdapter) {
        super();
        this.geminiAdapter = geminiAdapter || new GeminiAdapter();
        this.jiraAdapter = jiraAdapter || new JiraRestAdapter();
    }

    async execute(prompt, userId) {
        const functionCallResult = await this.geminiAdapter.analyzePromptForJiraCreation(prompt);

        if (!functionCallResult || functionCallResult.name !== 'create_jira_issue') {
            return { message: "Gemini no detectó una intención clara de creación de tareas. Intenta ser más específico." };
        }

        const args = functionCallResult.args;

        const issueData = {
            projectKey: args.projectKey || 'SINERGIA',
            title: args.title || 'Tarea automatizada sin título',
            description: `${args.description} (Solicitado por el usuario ${userId})`,
            riskLevel: args.riskLevel || 'Medio',
            issueType: args.issueType || 'Task'
        };

        console.log(`Ejecutando creación en Jira para: ${issueData.title}`);
        const jiraResult = await this.jiraAdapter.createIssueWithRisk(issueData);

        return {
            message: `Tarea automatizada creada con éxito: ${jiraResult.key}. Nivel de Riesgo asignado: ${issueData.riskLevel}.`,
            jiraUrl: jiraResult.url,
            jiraKey: jiraResult.key
        };
    }
}