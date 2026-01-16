
export class GeminiService {
    // No API Keys needed for simulation

    static initialize() {
        // No-op
    }

    static setApiKey(key: string) {
        // No-op
    }

    static getApiKey(): string | null {
        return "simulated-key";
    }

    static async generateResponse(prompt: string): Promise<string> {
        // ALWAYS return simulated response
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getSimulatedResponse(prompt));
            }, 1000); // 1 second delay for realism
        });
    }

    private static getSimulatedResponse(prompt: string): string {
        const lower = prompt.toLowerCase();

        // --- CITIZEN MENUS ---
        if (prompt === "Is my area at flood risk today?") {
            return "**JalRakshak AI:** Based on real-time sensor data from Panchganga and Radhanagari Dam, your current location (Ward A) is in the **Green Zone (Safe)**. Water levels are at 18ft (Warning Level: 39ft). No immediate flood risk detected for the next 24 hours.";
        }
        if (prompt === "Current river water level status") {
            return "**JalRakshak AI:** Current Panchganga River Level is **18.2 ft** (Steady). \n\n- **Rajaram Bandhara**: 18.0 ft\n- **Radhanagari Discharge**: 1100 cusecs\n\nThe water level is well below the danger mark of 43ft.";
        }
        if (prompt === "Is the water safe to drink?") {
            return "**JalRakshak AI:** Yes. The Water Quality Index (WQI) for your ward is **85 (Good)**. \n\n- **pH**: 7.2 (Neutral)\n- **Turbidity**: 2.1 NTU (Clear)\n\nThe water is safe for consumption. Regular chlorination was confirmed at 06:00 AM today.";
        }
        if (prompt === "Any active alerts in my ward?") {
            return "**JalRakshak AI:** There are **0 Critical Alerts** for your ward right now. \n\nHowever, the IMD has issued a **Yellow Alert (Heavy Rainfall)** for the Kolhapur district for tomorrow evening. Please keep your emergency kit ready as a precaution.";
        }
        if (prompt === "How do I raise a complaint?") {
            return "**JalRakshak AI:** To raise a complaint, please use the **'Report Issue'** tab in the sidebar menu.\n\n1. Click 'Report Issue'\n2. Select the problem type (e.g., Pipe Burst)\n3. Detect or Pin location\n4. Upload a photo (optional)\n\nFor life-threatening emergencies, call **112** immediately.";
        }

        // --- ADMIN MENUS ---
        if (prompt === "Show wards with rising water levels") {
            return "**JalRakshak AI:** \n\n**Rising Levels Detected:**\n1. **Ward E (Bapat Camp)**: +0.5ft in last hour (Current: 22ft)\n2. **Ward C (Bavda)**: +0.3ft in last hour (Current: 19ft)\n\nAll other wards are steady.";
        }
        if (prompt === "List unresolved complaints") {
            return "**JalRakshak AI:** \n\n**Unresolved Priority Complaints:**\n- **#1024**: Major Pipe Burst at Station Rd (Open 2h)\n- **#1029**: Sewage overflow near School No. 4 (Open 45m)\n\nPlease check the 'Complaints' dashboard for full details.";
        }
        if (prompt === "Any critical alerts in the last 24 hours?") {
            return "**JalRakshak AI:** \n\n**Critical Alerts (Last 24h):**\n- **04:00 AM**: Flash potential detected in Zone 4 (Cleared)\n- **11:30 PM**: Sensor malfunction at Rajaram Bandhara (Resolved)\n\nNo active critical alerts at this moment.";
        }
        if (prompt === "Water quality anomalies this week") {
            return "**JalRakshak AI:** \n\n**Weekly Quality Report:**\n- **Monday**: High Turbidity in Ward B (Resolved)\n- **Wednesday**: pH fluctuation (6.4) in Ward D (Investigating)\n\nOverall WQI average: 82 (Good).";
        }
        if (prompt === "System health status") {
            return "**JalRakshak AI:** \n\n**System Status:**\n- **IoT Sensors**: 98% Online (42/43 Active)\n- **Database**: Healthy\n- **API Latency**: 45ms\n- **Last Backup**: Today, 03:00 AM\n\nSystem is running smoothly.";
        }


        // --- GENERAL FALLBACKS ---
        if (lower.includes("flood") || lower.includes("danger")) {
            return "**JalRakshak AI:** Based on current sensor data, the water levels at Panchganga Ghat are steady. Always follow official instructions from local authorities.";
        }
        if (lower.includes("water") || lower.includes("safe")) {
            return "**JalRakshak AI:** The water quality index is currently **Safe** (pH 7.2). It is safe for consumption.";
        }
        if (lower.includes("help") || lower.includes("contact")) {
            return "**JalRakshak AI:** For medical emergencies, call 108. For flood rescue, call 112. I can also connect you to the nearest Ward Officer.";
        }

        return "**JalRakshak AI:** I can help you analyze flood risks, check water quality, or guide you to safety protocols. Please select one of the menu options for the most accurate information.";
    }
}
