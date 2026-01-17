import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';

// Demo Data fallback for when DB is not connected
const DEMO_COMPLAINTS = [
    { _id: '1', type: 'Pipe Burst', location: 'Ward A, Main Sq', description: 'Major pipe burst near market', status: 'In Progress', createdAt: new Date().toISOString() },
    { _id: '2', type: 'Water Logging', location: 'Ward B, Lane 4', description: 'Stagnant water since yesterday', status: 'Open', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: '3', type: 'System Alert', location: 'System', description: 'Sensor malfunction in Sector 4', status: 'Open', createdAt: new Date().toISOString() },
];

export async function GET() {
    try {
        await dbConnect();
        const complaints = await Complaint.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: complaints });
    } catch (error: any) {
        console.warn("Database connection failed, serving DEMO data:", error.message);
        // Fallback to demo data instead of 503ing
        return NextResponse.json({ success: true, data: DEMO_COMPLAINTS, _isDemo: true });
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

            // Push to in-memory store so other devices (Admin) can see it!
            DEMO_COMPLAINTS.unshift(mockComplaint);

            return NextResponse.json({ success: true, data: mockComplaint, _isDemo: true }, { status: 201 });
        } catch (e) {
            return NextResponse.json({ success: false, error: 'Failed to create complaint' }, { status: 400 });
        }
    }
}
