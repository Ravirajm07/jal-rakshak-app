"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AlertCircle, MapPin, Droplets, CheckCircle2, ChevronRight, Play } from "lucide-react"; // Removed specific icons if needed
import { Badge } from "@/components/ui/Badge";

export function CitizenDashboard() {
    const { addComplaint, toggleDemoMode, user } = useData(); // Use real user data if available
    const [submitting, setSubmitting] = useState(false);

    // Dynamic-looking data
    const RECENT_COMPLAINTS = [
        { id: 1042, type: "Pipe Burst", location: "Ward A, Main Sq", date: "Today", status: "In Progress", color: "warning" },
        { id: 1039, type: "Water Logging", location: "Ward B, Lane 4", date: "Yesterday", status: "Open", color: "info" },
        { id: 988, type: "Taps Leaking", location: "Ward D, Sector 4", date: "Jan 12", status: "Resolved", color: "success" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitting(false);
        alert("Complaint Submitted!");
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 min-h-screen pb-20">

            {/* 1. Premium Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome, Citizen</h1>
                    <p className="text-slate-500 mt-1 font-medium">Stay safe and help us keep the city clean.</p>
                </div>
                {/* Weather/Status Widget could go here */}
            </div>

            {/* 2. Alerts Section - Modern & Dynamic */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-50 border-red-100 shadow-sm shadow-red-100 p-5 flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full text-red-500 shadow-sm shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-red-900 text-lg">Flood Alert: Zone A</h3>
                        <p className="text-red-700/80 text-sm mt-1 leading-relaxed">
                            Water levels in Panchganga are rising. Please avoid river banks.
                        </p>
                    </div>
                </Card>

                <Card className="bg-blue-50 border-blue-100 shadow-sm shadow-blue-100 p-5 flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full text-blue-500 shadow-sm shrink-0">
                        <Droplets size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-blue-900 text-lg">Water Supply Restored</h3>
                        <p className="text-blue-700/80 text-sm mt-1 leading-relaxed">
                            Maintenance in Ward C is complete. Supply will resume shortly.
                        </p>
                    </div>
                </Card>
            </div>

            {/* 3. Main Action Grid */}
            <div className="grid lg:grid-cols-12 gap-8">

                {/* Complaint Form - Premium Style */}
                <div className="lg:col-span-7">
                    <Card className="p-0 border border-slate-200 shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <MapPin size={18} className="text-blue-600" />
                                Report an Issue
                            </h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Issue Type</label>
                                        <select className="w-full bg-slate-50 border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                                            <option>Pipe Burst</option>
                                            <option>Water Logging</option>
                                            <option>Contamination</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Location</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Near Market Yard"
                                            className="w-full bg-slate-50 border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Description</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Describe the issue..."
                                        className="w-full bg-slate-50 border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-all transform hover:scale-[1.01]"
                                >
                                    {submitting ? "Submitting Report..." : "Submit Complaint"}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>

                {/* Status Tracker - Premium Style */}
                <div className="lg:col-span-5">
                    <Card className="h-full border border-slate-200 shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-800">My Activity</h2>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-100">View All</span>
                        </div>

                        <div className="p-0 flex-1 overflow-y-auto">
                            {RECENT_COMPLAINTS.map((item, i) => (
                                <div key={item.id} className={`
                                    p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer
                                    ${i !== RECENT_COMPLAINTS.length - 1 ? 'border-b border-slate-100' : ''}
                                `}>
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                        ${item.color === 'warning' ? 'bg-amber-100 text-amber-600' :
                                            item.color === 'info' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}
                                    `}>
                                        {item.color === 'warning' ? <AlertCircle size={20} /> :
                                            item.color === 'info' ? <Droplets size={20} /> : <CheckCircle2 size={20} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-800 text-sm truncate">{item.type}</h4>
                                            <Badge className={`text-[10px] px-1.5 py-0.5 ${item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                                                    item.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {item.status}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5 truncate">{item.location}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Demo Toggle */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={toggleDemoMode}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-5 rounded-full shadow-xl flex items-center gap-2 transition-all hover:-translate-y-1"
                >
                    <Play size={16} /> Demo
                </Button>
            </div>

        </div>
    );
}
