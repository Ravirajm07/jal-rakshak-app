
export class GeminiService {
    static initialize() {
        // Simulation-only in v0.1.0.
    }

    static setApiKey(key: string) {
        void key;
    }

    static getApiKey(): string | null {
        return null;
    }

    static async generateResponse(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getSimulatedResponse(prompt));
            }, 1000);
        });
    }

    private static getSimulatedResponse(prompt: string): string {
        const lower = prompt.toLowerCase();

        // --- CITIZEN MENUS ---
        if (prompt === "Is my area at flood risk today?") {
            return "**JalRakshak Assistant:** This prototype uses simulated data. In the current sample scenario, Ward A is shown as **Green Zone (Safe)**. Always follow official local authority guidance for real incidents.";
        }
        if (prompt === "Current river water level status") {
            return "**JalRakshak Assistant:** Sample Panchganga River level: **18.2 ft** (steady). This is simulated prototype data and not an official measurement.";
        }
        if (prompt === "Is the water safe to drink?") {
            return "**JalRakshak Assistant:** The sample water-quality values show pH 7.2 and turbidity 2.1 NTU. This prototype cannot determine whether water is safe to drink; follow official advisories.";
        }
        if (prompt === "Any active alerts in my ward?") {
            return "**JalRakshak Assistant:** The sample data has no critical ward alert. This is not connected to an official weather or emergency alert feed.";
        }
        if (prompt === "How do I raise a complaint?") {
            return "**JalRakshak Assistant:** Use the **Report Issue** page, select an issue type, add location and description, then submit. For life-threatening emergencies, call **112** immediately.";
        }

        // --- ADMIN MENUS ---
        if (prompt === "Show wards with rising water levels") {
            return "**JalRakshak Assistant:** Sample rising-level view: Ward E and Ward C are marked for review. This is simulated decision-support data.";
        }
        if (prompt === "List unresolved complaints") {
            return "**JalRakshak Assistant:** Use the complaint management screen for current records. This chat response is a static prototype prompt, not a database query.";
        }
        if (prompt === "Any critical alerts in the last 24 hours?") {
            return "**JalRakshak Assistant:** No live alert-history integration is enabled in v0.1.0. Review the dashboard and official systems before taking action.";
        }
        if (prompt === "Water quality anomalies this week") {
            return "**JalRakshak Assistant:** The prototype can display sample quality trends, but it does not ingest verified live water-quality feeds.";
        }
        if (prompt === "System health status") {
            return "**JalRakshak Assistant:** System health monitoring is not implemented yet. Check deployment logs and database status in your hosting provider.";
        }


        // --- GENERAL FALLBACKS ---
        if (lower.includes("flood") || lower.includes("danger")) {
            return "**JalRakshak Assistant:** This prototype can show simulated flood-risk data. Always follow official instructions from local authorities.";
        }
        if (lower.includes("water") || lower.includes("safe")) {
            return "**JalRakshak Assistant:** The prototype cannot certify drinking-water safety. Use official public-health guidance.";
        }
        if (lower.includes("help") || lower.includes("contact")) {
            return "**JalRakshak Assistant:** For medical emergencies, call 108. For flood rescue, call 112.";
        }

        return "**JalRakshak Assistant:** I can explain the prototype flood-risk, water-quality, and complaint-reporting flows. Please select one of the menu options for the most relevant simulated response.";
    }
}
