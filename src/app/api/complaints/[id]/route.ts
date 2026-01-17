import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';
import { DemoStore } from '@/lib/demo-store';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();

        // Try real DB first
        const complaint = await Complaint.findByIdAndUpdate(
            params.id,
            { ...body },
            { new: true }
        );

        if (!complaint) {
            throw new Error("Not found in DB (might be demo data)");
        }

        return NextResponse.json({ success: true, data: complaint });
    } catch (error) {
        console.warn("Database connection failed or item not found, trying DEMO store");

        try {
            const body = await request.json();
            const updated = DemoStore.update(params.id, body);

            if (updated) {
                return NextResponse.json({ success: true, data: updated, _isDemo: true });
            } else {
                return NextResponse.json({ success: false, error: 'Complaint not found' }, { status: 404 });
            }
        } catch (e) {
            return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 400 });
        }
    }
}
