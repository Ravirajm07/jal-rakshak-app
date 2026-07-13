import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';
import { DemoStore } from '@/lib/demo-store';
import { validateCreateComplaint } from '@/lib/complaint-validation';

export async function GET() {
    try {
        await dbConnect();
        const complaints = await Complaint.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: complaints });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.warn("Database connection failed, serving DEMO data:", message);
        return NextResponse.json({ success: true, data: DemoStore.getAll(), _isDemo: true });
    }
}

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = validateCreateComplaint(body);
    if (!parsed.ok) {
        return NextResponse.json({ success: false, error: parsed.error }, { status: 400 });
    }

    try {
        await dbConnect();
        const complaint = await Complaint.create(parsed.data);
        return NextResponse.json({ success: true, data: complaint }, { status: 201 });
    } catch {
        console.warn("Database connection failed, simulating POST");
        const mockComplaint = {
            ...parsed.data,
            _id: Math.random().toString(36).slice(2, 11),
            status: 'Open' as const,
            createdAt: new Date().toISOString()
        };

        DemoStore.add(mockComplaint);

        return NextResponse.json({ success: true, data: mockComplaint, _isDemo: true }, { status: 201 });
    }
}
