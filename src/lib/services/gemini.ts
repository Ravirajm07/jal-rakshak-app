export class GeminiService {
    private static apiKey: string | null = null;
    private static readonly STORAGE_KEY = 'jalrakshak_gemini_key';
    // Hardcoded for internal usage as requested
    private static readonly DEFAULT_API_KEY = "AIzaSyDe--ZiX2sMEUzz40TAWHHoN5STaT96zok";

    static initialize() {
        if (typeof window !== 'undefined') {
            this.apiKey = localStorage.getItem(this.STORAGE_KEY);
        }
    }

    static setApiKey(key: string) {
        this.apiKey = key;
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.STORAGE_KEY, key);
        }
    }

    static getApiKey(): string | null {
        // Priority: Runtime set > Storage > Hardcoded Default
        if (this.apiKey) return this.apiKey;

        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.apiKey = stored;
                return stored;
            }
        }

        return this.DEFAULT_API_KEY;
    }

    static async generateResponse(prompt: string): Promise<string> {
        const key = this.getApiKey();

        // SIMULATION MODE (If no key is provided)
        if (!key) {
            console.log("Gemini: No API Key found, using simulation.");
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.getSimulatedResponse(prompt));
                }, 1500);
            });
        }

        // REAL API CALL
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite-preview-02-05:generateContent?key=${key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Gemini API Error:", error);
            return "I'm having trouble connecting to Google's servers right now. Please check your internet or API Key.";
        }
    }

    private static getSimulatedResponse(prompt: string): string {
        const lower = prompt.toLowerCase();

        // Specific Responses for Clickable Chips
        if (prompt === "Is my area at flood risk today?") {
            return "**Gemini (Analysis):** Based on real-time sensor data from Panchganga and Radhanagari Dam, your current location (Ward A) is in the **Green Zone (Safe)**. Water levels are at 18ft (Warning Level: 39ft). No immediate flood risk detected for the next 24 hours.";
        }
        if (prompt === "Current river water level status") {
            return "**Gemini (River Watch):** Current Panchganga River Level is **18.2 ft** (Steady). \n\n- **Rajaram Bandhara**: 18.0 ft\n- **Radhanagari Discharge**: 1100 cusecs\n\nThe water level is well below the danger mark of 43ft.";
        }
        if (prompt === "Is the water safe to drink?") {
            return "**Gemini (Quality Check):** Yes. The Water Quality Index (WQI) for your ward is **85 (Good)**. \n\n- **pH**: 7.2 (Neutral)\n- **Turbidity**: 2.1 NTU (Clear)\n\nThe water is safe for consumption. Regular chlorination was confirmed at 06:00 AM today.";
        }
        if (prompt === "Any active alerts in my ward?") {
            return "**Gemini (Alerts):** There are **0 Critical Alerts** for your ward right now. \n\nHowever, the IMD has issued a **Yellow Alert (Heavy Rainfall)** for the Kolhapur district for tomorrow evening. Please keep your emergency kit ready as a precaution.";
        }
        if (prompt === "How do I raise a complaint?") {
            return "**Gemini (Help):** To raise a complaint, please use the **'Report Issue'** tab in the sidebar menu.\n\n1. Click 'Report Issue'\n2. Select the problem type (e.g., Pipe Burst)\n3. Detect or Pin location\n4. Upload a photo (optional)\n\nFor life-threatening emergencies, call **112** immediately.";
        }

        // General keyword matching for other queries
        if (lower.includes("flood") || lower.includes("danger")) {
            return "**Gemini (Calculated):** Based on current sensor data, the water levels at Panchganga Ghat are rising. I recommend moving to higher ground (Zone 3) immediately. Emergency services have been notified.";
        }
        if (lower.includes("water") || lower.includes("safe")) {
            return "**Gemini (Analysis):** The water quality index is currently **Safe** (pH 7.2). It is safe for consumption after standard filtration.";
        }
        if (lower.includes("help") || lower.includes("contact")) {
            return "**Gemini (Support):** For medical emergencies, call 108. For flood rescue, call 112. I can also connect you to the nearest Ward Officer.";
        }

        return "**Gemini (AI):** I can help you analyze flood risks, check water quality, or guide you to safety protocols. What do you need assistance with?";
    }
}
