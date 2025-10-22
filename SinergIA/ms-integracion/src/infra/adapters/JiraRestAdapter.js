// JiraRestAdapter.js (Implementa el Patrón ADAPTER/FACADE)
import { Secrets } from "../config/secrets";
import axios from 'axios';

export class JiraRestAdapter {
    constructor() {
        this.baseUrl = process.env.JIRA_URL || "https://ejemplo.atlassian.net/rest/api/3";
        this.headers = { 
            Authorization: `Bearer ${Secrets.getJiraAuthToken()}`,
            'Content-Type': 'application/json'
        };
    }

    /**
     * @param {Object} issueData
     * @returns {Object}
     */
    async createIssueWithRisk(issueData) {
        const jiraPayload = {
            fields: {
                project: { key: issueData.projectKey },
                summary: issueData.title,
                description: { type: "doc", version: 1, content: [{ type: "paragraph", content: [{ type: "text", text: issueData.description }] }] },
                issuetype: { name: issueData.issueType || 'Task' },
                'customfield_10001': issueData.riskLevel 
            }
        };

        try {
            const response = await axios.post(`${this.baseUrl}/issue`, jiraPayload, { headers: this.headers });
            
            return { 
                key: response.data.key, 
                url: `${this.baseUrl}/browse/${response.data.key}` 
            };
        } catch (error) {
            throw new Error(`Jira API Error: ${error.response ? error.response.status : error.message}`);
        }
    }
}