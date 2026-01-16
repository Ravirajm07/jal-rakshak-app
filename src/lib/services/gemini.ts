export class GeminiService {
    private static apiKey: string | null = null;
    private static readonly STORAGE_KEY = 'jalrakshak_gemini_key';
    // Hardcoded for internal usage as requested
    private static readonly DEFAULT_API_KEY = "AIzaSyARPQjSFMoVn2S6ENtiwacA82W66tZAjSI";

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
