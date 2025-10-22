// secrets.js (Gestión de credenciales con Patrón SINGLETON)
let instance = null;

export class SecretsManager {
    constructor() {
        if (instance) {
            return instance;
        }
        
        this.GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'CLAVE_GEMINI_FAKE'; 
        this.JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;
        
        instance = this;
    }

    getGeminiKey() {
        if (this.GEMINI_API_KEY === 'CLAVE_GEMINI_FAKE') {
            console.warn("ADVERTENCIA: Usando clave de Gemini de respaldo no segura.");
        }
        return this.GEMINI_API_KEY;
    }

    getJiraAuthToken() {
        return this.JIRA_AUTH_TOKEN;
    }
}

export const Secrets = new SecretsManager();