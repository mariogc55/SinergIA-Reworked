// AutomationService.js (Se comunica únicamente con el MS-Orquestador)
import axios from 'axios';

const ORCHESTRATOR_URL = "http://localhost:3000/api/v1/automate";

export const AutomationService = {
    /**
     * @param {string} prompt
     * @param {string} developerId
     * @returns {Object}
     */
    async triggerAutomation(prompt, developerId) {
        try {
            const response = await axios.post(ORCHESTRATOR_URL, {
                prompt: prompt,
                userId: developerId 
            });
            return response.data; 
        } catch (error) {
            console.error("Fallo de comunicación con el Orquestador:", error);
            throw new Error(`No se pudo automatizar la tarea. Verifique la conexión: ${error.message}`);
        }
    }
};