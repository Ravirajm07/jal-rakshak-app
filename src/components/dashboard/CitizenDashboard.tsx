"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AlertCircle, MapPin, Droplets, CheckCircle2, ChevronDown, Play, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CitizenDashboard() {
    const { addComplaint, toggleDemoMode } = useData();
    const [submitting, setSubmitting] = useState(false);

    // Hardcoded status data to match the image exactly
    const MOCK_STATUS_ITEMS = [
        { id: 1042, type: "Pipe Burst", location: "Ward A, Main Sq", date: "17/01/2026", status: "In Progress", color: "warning" },
        { id: 1039, type: "Water Logging", location: "Ward B, Lane 4", date: "16/01/2026", status: "Open", color: "info" },
        { id: 988, type: "Taps Leaking", location: "Ward D, Sector 4", date: "12/01/2026", status: "Resolved", color: "success" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitting(false);
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 min-h-screen pb-20">

            {/* 1. Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Welcome, Citizen</h1>
                <p className="text-slate-500 mt-1">Stay safe and help us keep the city clean.</p>
            </div>

            {/* 2. Alerts Section (Two Cards) */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Red Card */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex items-start gap-4 relative overflow-hidden">
                    <div className="p-2 bg-red-100 rounded-full text-red-600 shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="font-bold text-red-900 mb-1">Flood Warning</h3>
                        <p className="text-red-800 text-sm leading-relaxed mb-2">
                            Panchganga River level rising above 45ft. Evacuation protocols active for low-lying areas.
                        </p>
                        <span className="text-red-700 text-xs font-bold uppercase tracking-wide">10 mins ago</span>
                    </div>
                    {/* Decorative Icon */}
                    <div className="absolute -right-6 -bottom-6 text-red-100 opacity-50">
                        <AlertCircle size={100} />
                    </div>
                </div>

                {/* Blue Card */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4 relative overflow-hidden">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0">
                        <Droplets size={24} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="font-bold text-blue-900 mb-1">Service Restored</h3>
                        <p className="text-blue-800 text-sm leading-relaxed mb-2">
                            Safe drinking water supply has been fully restored in Ward C following maintenance work.
                        </p>
                        <span className="text-blue-700 text-xs font-bold uppercase tracking-wide">2 hours ago</span>
                    </div>
                    {/* Decorative Icon */}
                    <div className="absolute -right-6 -bottom-6 text-blue-100 opacity-50">
                        <Droplets size={100} />
                    </div>
                </div>
            </div>

            {/* 3. Main Content Columns */}
            <div className="grid lg:grid-cols-12 gap-8">

                {/* Left: Report an Issue (7 cols in image context approx 60/40) */}
                <div className="lg:col-span-7">
                    <Card className="p-6 h-full flex flex-col border border-slate-200 shadow-sm rounded-2xl">
                        <div className="flex items-center gap-3 mb-6 border-l-4 border-blue-600 pl-3">
                            <h2 className="text-lg font-bold text-slate-800">Report an Issue</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Issue Type</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 font-medium">
                                        <option>Pipe Burst</option>
                                        <option>Water Logging</option>
                                        <option>Sewage Leak</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="e.g. Ward C, Near Shivaji Statue"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-3 pl-11 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe the issue briefly..."
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 font-medium resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-sm shadow-blue-200 mt-2"
                            >
                                {submitting ? "Submitting..." : "➤ Submit Report"}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Right: Track Status (5 cols) */}
                <div className="lg:col-span-5">
                    <Card className="p-6 h-full flex flex-col border border-slate-200 shadow-sm rounded-2xl bg-white">
                        <div className="flex items-center gap-3 mb-6 border-l-4 border-blue-600 pl-3">
                            <h2 className="text-lg font-bold text-slate-800">Track Status</h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex p-1 bg-slate-50 rounded-lg mb-6 border border-slate-100">
                            <button className="flex-1 py-1.5 text-sm font-bold text-blue-600 bg-white rounded shadow-sm">All</button>
                            <button className="flex-1 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">Active</button>
                            <button className="flex-1 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">Resolved</button>
                        </div>

                        {/* List */}
                        <div className="space-y-6">
                            {MOCK_STATUS_ITEMS.map((item) => (
                                <div key={item.id} className="group cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${item.color === 'warning' ? 'bg-amber-500' : item.color === 'info' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                                            <span className="font-bold text-slate-800">{item.type}</span>
                                        </div>
                                        <Badge className={`uppercase text-[10px] font-bold px-2 py-0.5 rounded ${item.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                item.status === 'In Progress' ? 'bg-amber-100 text-amber-700 transition-colors' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium pl-4 mb-2">
                                        {item.location} • Ticket #{item.id}
                                    </p>
                                    <div className="flex justify-between items-center pl-4">
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                            <Clock size={10} />
                                            {item.date}
                                        </div>
                                        {item.status !== 'Resolved' && (
                                            <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                        )}
                                        {item.status === 'Resolved' && (
                                            <CheckCircle2 size={14} className="text-green-500" />
                                        )}
                                    </div>
                                    <div className="border-b border-slate-50 mt-4 group-last:border-0"></div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* 4. Bottom Action */}
            <div className="fixed bottom-6 right-6">
                <Button
                    onClick={toggleDemoMode}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                    <Play size={16} fill="currentColor" />
                    ENABLE DEMO MODE
                </Button>
            </div>

        </div>
    );
}
