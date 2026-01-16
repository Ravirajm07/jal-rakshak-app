import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';

export async function GET() {
    try {
        await dbConnect();
        const complaints = await Complaint.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: complaints });
    } catch (error: any) {
        console.error("Database Error:", error);
        return NextResponse.json({ success: false, error: error.message || 'Unknown DB Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const complaint = await Complaint.create(body);
        return NextResponse.json({ success: true, data: complaint }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create complaint' }, { status: 400 });
    }
}
