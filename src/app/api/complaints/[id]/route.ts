import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id } = params;

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return NextResponse.json({ success: false, error: 'Complaint not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: complaint });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update complaint' }, { status: 400 });
    }
}
