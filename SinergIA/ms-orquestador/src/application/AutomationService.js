// AutomationService.js (Gestor de Flujo / Orquestador)
import { IssueCreationStrategy } from "./strategies/IssueCreationStrategy";

const STRATEGY_MAP = {
    'create_issue': new IssueCreationStrategy()
};

export class AutomationService {
    /**
     * @param {string} prompt
     * @param {string} userId
     * @returns {Object}
     */
    async automate(prompt, userId) {
        
        const selectedStrategyKey = 'create_issue';

        const strategy = STRATEGY_MAP[selectedStrategyKey];

        if (!strategy) {
            throw new Error("Estrategia de automatización no encontrada para esta intención.");
        }

        console.log(`MS-Orquestador: Ejecutando Estrategia: ${selectedStrategyKey}`);
        return strategy.execute(prompt, userId);
    }
}