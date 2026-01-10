"use client";

import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { User, MapPin, Phone, Shield } from "lucide-react";

export default function ProfilePage() {
    const { userRole, complaints } = useData();

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-3 flex items-center justify-center text-slate-400">
                    <User size={40} />
                </div>
                <h1 className="text-xl font-bold">Citizen User</h1>
                <p className="text-slate-500 capitalize">{userRole} Account</p>
            </div>

            <Card className="mb-6">
                <h3 className="font-semibold mb-4 border-b pb-2">Personal Details</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="text-slate-400" />
                        <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <MapPin size={16} className="text-slate-400" />
                        <span>RajaramPuri, Kolhapur</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Shield size={16} className="text-slate-400" />
                        <span>ID Verified</span>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-blue-600">{complaints.length}</div>
                    <div className="text-xs text-slate-500">Reports Filed</div>
                </Card>
                <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-xs text-slate-500">Alerts Subscribed</div>
                </Card>
            </div>
        </div>
    );
}
