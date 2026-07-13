import { describe, expect, it } from "vitest";
import { calculateFloodRisk, classifyWaterSafety } from "./water-status";

describe("calculateFloodRisk", () => {
    it("classifies low river levels as low risk", () => {
        expect(calculateFloodRisk({ level: 18, dangerLevel: 45 })).toEqual({ score: 40, label: "Low" });
    });

    it("adds active danger-alert weight to the flood score", () => {
        expect(calculateFloodRisk({ level: 34, dangerLevel: 45, activeDangerAlerts: 1 })).toEqual({ score: 86, label: "High" });
    });

    it("caps flood score at 100 and marks critical risk", () => {
        expect(calculateFloodRisk({ level: 48, dangerLevel: 45, activeDangerAlerts: 2 })).toEqual({ score: 100, label: "Critical" });
    });
});

describe("classifyWaterSafety", () => {
    it("marks pH and turbidity within thresholds as safe", () => {
        expect(classifyWaterSafety(7.2, 2.1)).toBe("Safe");
    });

    it("warns when one quality signal is outside threshold", () => {
        expect(classifyWaterSafety(6.2, 2.1)).toBe("Warning");
    });

    it("marks water quality critical when pH and turbidity are both outside thresholds", () => {
        expect(classifyWaterSafety(9.2, 8)).toBe("Critical");
    });
});
