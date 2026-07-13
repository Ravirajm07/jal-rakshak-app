import type { Complaint } from "@/lib/contexts/DataContext";

const CSV_HEADERS = ["ID", "Type", "Location", "Status", "Admin Response", "Description"];

export function escapeCsvCell(value: unknown): string {
    const text = value === undefined || value === null ? "" : String(value);
    const escaped = text.replace(/"/g, '""');
    return /[",\r\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

export function buildComplaintCsv(complaints: Pick<Complaint, "id" | "type" | "location" | "status" | "adminResponse" | "description">[]): string {
    const rows = complaints.map((complaint) => [
        complaint.id,
        complaint.type,
        complaint.location,
        complaint.status,
        complaint.adminResponse ?? "",
        complaint.description ?? "",
    ]);

    return [
        CSV_HEADERS.join(","),
        ...rows.map((row) => row.map(escapeCsvCell).join(",")),
    ].join("\n");
}
