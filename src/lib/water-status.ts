export type FloodRiskLabel = "Low" | "Medium" | "High" | "Critical";
export type WaterSafetyLabel = "Safe" | "Warning" | "Critical";

export interface FloodRiskInput {
    level: number;
    dangerLevel?: number;
    activeDangerAlerts?: number;
}

export interface FloodRiskResult {
    score: number;
    label: FloodRiskLabel;
}

export function calculateFloodRisk({
    level,
    dangerLevel = 45,
    activeDangerAlerts = 0,
}: FloodRiskInput): FloodRiskResult {
    if (!Number.isFinite(level) || level < 0) {
        throw new Error("Water level must be a non-negative number.");
    }
    if (!Number.isFinite(dangerLevel) || dangerLevel <= 0) {
        throw new Error("Danger level must be a positive number.");
    }

    const alertModifier = Math.max(0, activeDangerAlerts) * 10;
    const score = Math.min(Math.round((level / dangerLevel) * 100 + alertModifier), 100);

    if (score > 90) return { score, label: "Critical" };
    if (score > 75) return { score, label: "High" };
    if (score > 50) return { score, label: "Medium" };
    return { score, label: "Low" };
}

export function classifyWaterSafety(ph: number, turbidity: number): WaterSafetyLabel {
    if (!Number.isFinite(ph) || !Number.isFinite(turbidity)) {
        throw new Error("Water quality values must be finite numbers.");
    }

    const isPhBad = ph < 6.5 || ph > 8.5;
    const isTurbidityBad = turbidity > 5;

    if (isPhBad && isTurbidityBad) return "Critical";
    if (isPhBad || isTurbidityBad) return "Warning";
    return "Safe";
}
