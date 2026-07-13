import mongoose, { Schema, Document, Model } from 'mongoose';
import { COMPLAINT_STATUSES, COMPLAINT_TYPES, ComplaintStatus, ComplaintType } from '@/lib/complaint-validation';

export interface IComplaint extends Document {
    type: ComplaintType;
    location: string;
    description: string;
    status: ComplaintStatus;
    userId: string;
    userEmail?: string;
    adminResponse?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ComplaintSchema: Schema = new Schema(
    {
        type: { type: String, enum: COMPLAINT_TYPES, required: true },
        location: { type: String, required: true, trim: true, maxlength: 200 },
        description: { type: String, required: true, trim: true, maxlength: 2000 },
        status: {
            type: String,
            enum: COMPLAINT_STATUSES,
            default: 'Open'
        },
        userId: { type: String, required: true, trim: true, maxlength: 128 },
        userEmail: { type: String, trim: true, maxlength: 254 },
        adminResponse: { type: String, trim: true, maxlength: 2000 }
    },
    {
        timestamps: true,
    }
);

const Complaint: Model<IComplaint> = mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema);

export default Complaint;
