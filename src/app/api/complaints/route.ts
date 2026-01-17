import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';

// Demo Data fallback for when DB is not connected
import { DemoStore } from '@/lib/demo-store';

export async function GET() {
    try {
        await dbConnect();
        const complaints = await Complaint.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: complaints });
    } catch (error: any) {
        console.warn("Database connection failed, serving DEMO data:", error.message);
        // Fallback to shared demo store
        return NextResponse.json({ success: true, data: DemoStore.getAll(), _isDemo: true });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const complaint = await Complaint.create(body);
        return NextResponse.json({ success: true, data: complaint }, { status: 201 });
    } catch (error) {
        console.warn("Database connection failed, simulating POST");
        // Simulate successful creation
        try {
            const body = await request.json();
            const mockComplaint = { ...body, _id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };

            // Use shared store
            DemoStore.add(mockComplaint);

            return NextResponse.json({ success: true, data: mockComplaint, _isDemo: true }, { status: 201 });
        } catch (e) {
            return NextResponse.json({ success: false, error: 'Failed to create complaint' }, { status: 400 });
        }
    }
}
