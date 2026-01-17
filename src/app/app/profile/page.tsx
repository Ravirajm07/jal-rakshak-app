"use client";

import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { User, MapPin, Phone, Shield } from "lucide-react";

export default function ProfilePage() {
    const { userRole, complaints } = useData();

    return (
        <div className="max-w-md mx-auto space-y-4">
            {/* Main Profile Card */}
            <Card className="p-6 text-center border-none shadow-sm">
                <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-400 border border-slate-200">
                    <User size={48} strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Citizen User</h1>
                <p className="text-slate-500 font-medium mb-6">Admin Account</p>

                <div className="text-left pt-6 border-t border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-4">Personal Details</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                            <Phone size={18} className="text-slate-400" />
                            <span className="font-medium text-slate-700">+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <MapPin size={18} className="text-slate-400" />
                            <span className="font-medium text-slate-700">RajaramPuri, Kolhapur</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <Shield size={18} className="text-slate-400" />
                            <span className="font-medium text-slate-700">ID Verified</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-6 border-none shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                    <div className="text-4xl font-bold text-blue-600 mb-1">{complaints.length}</div>
                    <div className="text-sm font-medium text-slate-500">Reports Filed</div>
                </Card>
                <Card className="text-center p-6 border-none shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                    <div className="text-4xl font-bold text-green-600 mb-1">0</div>
                    <div className="text-sm font-medium text-slate-500">Alerts Subscribed</div>
                </Card>
            </div>
        </div>
    );
}
