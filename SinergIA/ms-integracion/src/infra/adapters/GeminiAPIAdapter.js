// GeminiAPIAdapter.js (Implementación del Adaptador Gemini)
import { GoogleGenAI } from '@google/genai';
import { Secrets } from "../config/secrets";

const JIRA_FUNCTION_SPEC = {
    name: "create_jira_issue",
    description: "Crea una nueva tarea de gestión de proyectos en Jira a partir de la solicitud del usuario.",
    parameters: {
        type: "object",
        properties: {
            title: { type: "string", description: "El título breve y conciso para la tarea." },
            description: { type: "string", description: "Una descripción detallada de la tarea y su contexto." },
            projectKey: { type: "string", description: "La clave del proyecto de Jira (ej. 'SINERGIA')." },
            issueType: { type: "string", description: "El tipo de tarea (ej. 'Bug', 'Task', 'Story')." },
            riskLevel: { type: "string", description: "El nivel de riesgo asociado a esta tarea (Bajo, Medio, Alto). Aplica Gestión de Riesgos." },
        },
        required: ["title", "description", "projectKey"],
    },
};

export class GeminiAdapter {
    constructor() {
        this.ai = new GoogleGenAI({ apiKey: Secrets.getGeminiKey() }); 
        this.model = 'gemini-2.5-flash';
    }

    /**
     * @param {string} prompt
     * @returns {Object|null}
     */
    async analyzePromptForJiraCreation(prompt) {
        const systemInstruction = `
            Actúa como un analista de proyectos experto en PMBOK y metodologías ágiles.
            Tu tarea es analizar el prompt del usuario y determinar si se necesita la función 'create_jira_issue'.
            Si la intención es crear o modificar una tarea de proyecto, devuelve la llamada a función con todos los argumentos extraídos.
            Si el usuario menciona un problema, asigna un 'riskLevel' (Bajo, Medio, Alto).
            Si la intención no es crear una tarea, NO devuelvas ninguna función.
        `;
        
        const response = await this.ai.models.generateContent({
            model: this.model,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                systemInstruction: systemInstruction,
                tools: [{ functionDeclarations: [JIRA_FUNCTION_SPEC] }],
            },
        });

        if (response.functionCalls && response.functionCalls.length > 0) {
            return response.functionCalls[0];
        }

        return null;
    }
}