import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';
import { DemoStore } from '@/lib/demo-store';
import { validateUpdateComplaint } from '@/lib/complaint-validation';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    let body;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = validateUpdateComplaint(body);
    if (!parsed.ok) {
        return NextResponse.json({ success: false, error: parsed.error }, { status: 400 });
    }

    try {
        await dbConnect();

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { ...parsed.data },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            throw new Error("Not found in DB (might be demo data)");
        }

        return NextResponse.json({ success: true, data: complaint });
    } catch {
        console.warn("Database connection failed or item not found, trying DEMO store");

        try {
            const updated = DemoStore.update(id, parsed.data);

            if (updated) {
                return NextResponse.json({ success: true, data: updated, _isDemo: true });
            } else {
                return NextResponse.json({ success: false, error: 'Complaint not found' }, { status: 404 });
            }
        } catch {
            return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 400 });
        }
    }
}
