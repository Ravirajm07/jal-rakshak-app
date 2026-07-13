import { describe, expect, it } from "vitest";
import { buildComplaintCsv, escapeCsvCell } from "./report-export";

describe("escapeCsvCell", () => {
    it("escapes quotes and wraps comma-containing values", () => {
        expect(escapeCsvCell('Ward A, "Market"')).toBe('"Ward A, ""Market"""');
    });

    it("renders empty values as empty cells", () => {
        expect(escapeCsvCell(undefined)).toBe("");
    });
});

describe("buildComplaintCsv", () => {
    it("builds a CSV with headers and escaped complaint values", () => {
        const csv = buildComplaintCsv([
            {
                id: "JR-1001",
                type: "Pipe Burst",
                location: "Ward A, Main Square",
                status: "Open",
                adminResponse: 'Crew said "scheduled"',
                description: "Large leak near market\nNeeds barricade",
            },
        ]);

        expect(csv).toBe([
            "ID,Type,Location,Status,Admin Response,Description",
            'JR-1001,Pipe Burst,"Ward A, Main Square",Open,"Crew said ""scheduled""","Large leak near market\nNeeds barricade"',
        ].join("\n"));
    });
});
