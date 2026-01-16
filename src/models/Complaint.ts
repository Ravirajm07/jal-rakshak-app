import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComplaint extends Document {
    type: string;
    location: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    userId: string;
    userEmail?: string;
    adminResponse?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ComplaintSchema: Schema = new Schema(
    {
        type: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String },
        status: {
            type: String,
            enum: ['Open', 'In Progress', 'Resolved'],
            default: 'Open'
        },
        userId: { type: String, required: true },
        userEmail: { type: String },
        adminResponse: { type: String }
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

// Prevent overwriting the model if it's already compiled (Hot Reload fix)
const Complaint: Model<IComplaint> = mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema);

export default Complaint;
