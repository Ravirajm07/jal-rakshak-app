import { describe, expect, it } from "vitest";
import { validateCreateComplaint, validateUpdateComplaint } from "./complaint-validation";

describe("validateCreateComplaint", () => {
    it("accepts a well-formed citizen complaint", () => {
        const result = validateCreateComplaint({
            type: "Pipe Burst",
            location: "Ward A, Main Square",
            description: "Water pipe burst near the market entrance.",
            userId: "firebase-user-123",
            userEmail: "citizen@example.test",
        });

        expect(result.ok).toBe(true);
        if (result.ok) {
            expect(result.data).toEqual({
                type: "Pipe Burst",
                location: "Ward A, Main Square",
                description: "Water pipe burst near the market entrance.",
                userId: "firebase-user-123",
                userEmail: "citizen@example.test",
            });
        }
    });

    it("rejects unsupported complaint types", () => {
        const result = validateCreateComplaint({
            type: "Free Water Tanker",
            location: "Ward B",
            description: "Please send a tanker.",
            userId: "firebase-user-123",
        });

        expect(result.ok).toBe(false);
        if (!result.ok) expect(result.error).toContain("type");
    });

    it("rejects overlong descriptions", () => {
        const result = validateCreateComplaint({
            type: "Water Logging",
            location: "Ward C",
            description: "x".repeat(2001),
            userId: "firebase-user-123",
        });

        expect(result.ok).toBe(false);
        if (!result.ok) expect(result.error).toContain("2000");
    });
});

describe("validateUpdateComplaint", () => {
    it("accepts an allowed status update", () => {
        const result = validateUpdateComplaint({
            status: "Resolved",
            adminResponse: "Clean-up crew dispatched and issue resolved.",
        });

        expect(result.ok).toBe(true);
        if (result.ok) {
            expect(result.data).toEqual({
                status: "Resolved",
                adminResponse: "Clean-up crew dispatched and issue resolved.",
            });
        }
    });

    it("rejects unsupported status values", () => {
        const result = validateUpdateComplaint({ status: "Deleted" });

        expect(result.ok).toBe(false);
        if (!result.ok) expect(result.error).toContain("status");
    });

    it("rejects mass-assignment fields", () => {
        const result = validateUpdateComplaint({
            status: "In Progress",
            userId: "attacker-controlled-user",
            role: "admin",
        });

        expect(result.ok).toBe(false);
        if (!result.ok) expect(result.error).toContain("unsupported");
    });
});
