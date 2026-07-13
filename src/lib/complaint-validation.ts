export const COMPLAINT_TYPES = [
    "Pipe Burst",
    "Water Logging",
    "Sewage Leak",
    "Quality Issue",
    "Low Pressure",
    "Other",
    "System Alert",
] as const;

export const COMPLAINT_STATUSES = ["Open", "In Progress", "Resolved"] as const;

export type ComplaintType = (typeof COMPLAINT_TYPES)[number];
export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number];

export interface CreateComplaintInput {
    type: ComplaintType;
    location: string;
    description: string;
    userId: string;
    userEmail?: string;
}

export interface UpdateComplaintInput {
    status?: ComplaintStatus;
    adminResponse?: string;
}

type ValidationResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: string };

const MAX_LOCATION_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_USER_ID_LENGTH = 128;
const MAX_EMAIL_LENGTH = 254;
const MAX_ADMIN_RESPONSE_LENGTH = 2000;

function asRecord(value: unknown): Record<string, unknown> | null {
    if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
}

function cleanString(value: unknown): string | null {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function optionalCleanString(value: unknown): string | undefined {
    if (value === undefined || value === null) return undefined;
    return cleanString(value) ?? undefined;
}

function isComplaintType(value: string): value is ComplaintType {
    return COMPLAINT_TYPES.includes(value as ComplaintType);
}

function isComplaintStatus(value: string): value is ComplaintStatus {
    return COMPLAINT_STATUSES.includes(value as ComplaintStatus);
}

export function validateCreateComplaint(input: unknown): ValidationResult<CreateComplaintInput> {
    const body = asRecord(input);
    if (!body) return { ok: false, error: "Request body must be a JSON object." };

    const type = cleanString(body.type);
    if (!type || !isComplaintType(type)) return { ok: false, error: "Complaint type is invalid." };

    const location = cleanString(body.location);
    if (!location || location.length > MAX_LOCATION_LENGTH) {
        return { ok: false, error: "Location is required and must be 200 characters or fewer." };
    }

    const description = cleanString(body.description);
    if (!description || description.length > MAX_DESCRIPTION_LENGTH) {
        return { ok: false, error: "Description is required and must be 2000 characters or fewer." };
    }

    const userId = cleanString(body.userId);
    if (!userId || userId.length > MAX_USER_ID_LENGTH) {
        return { ok: false, error: "User identifier is required and must be 128 characters or fewer." };
    }

    const userEmail = optionalCleanString(body.userEmail);
    if (userEmail && userEmail.length > MAX_EMAIL_LENGTH) {
        return { ok: false, error: "User email must be 254 characters or fewer." };
    }

    return {
        ok: true,
        data: {
            type,
            location,
            description,
            userId,
            ...(userEmail ? { userEmail } : {}),
        },
    };
}

export function validateUpdateComplaint(input: unknown): ValidationResult<UpdateComplaintInput> {
    const body = asRecord(input);
    if (!body) return { ok: false, error: "Request body must be a JSON object." };

    const allowedKeys = new Set(["status", "adminResponse"]);
    const unknownKeys = Object.keys(body).filter((key) => !allowedKeys.has(key));
    if (unknownKeys.length > 0) return { ok: false, error: "Update contains unsupported fields." };

    const updates: UpdateComplaintInput = {};

    if ("status" in body) {
        const status = cleanString(body.status);
        if (!status || !isComplaintStatus(status)) return { ok: false, error: "Complaint status is invalid." };
        updates.status = status;
    }

    if ("adminResponse" in body) {
        const adminResponse = optionalCleanString(body.adminResponse);
        if (adminResponse && adminResponse.length > MAX_ADMIN_RESPONSE_LENGTH) {
            return { ok: false, error: "Admin response must be 2000 characters or fewer." };
        }
        if (adminResponse) updates.adminResponse = adminResponse;
    }

    if (!updates.status && !updates.adminResponse) {
        return { ok: false, error: "At least one supported update field is required." };
    }

    return { ok: true, data: updates };
}
