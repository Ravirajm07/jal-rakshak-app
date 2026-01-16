"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle, MapPin, Droplets, CheckCircle2, ChevronRight, Play, Send } from "lucide-react";

export function CitizenDashboard() {
    const { toggleDemoMode } = useData();
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    // Exact data from reference image
    const RECENT_COMPLAINTS = [
        { 
            id: 1042, 
            type: "Pipe Burst", 
            location: "Ward A, Main Sq", 
            ticket: "#1042",
            date: "17/01/2026", 
            status: "IN PROGRESS", 
            color: "warning",
            dotColor: "yellow"
        },
        { 
            id: 1039, 
            type: "Water Logging", 
            location: "Ward B, Lane 4", 
            ticket: "#1039",
            date: "16/01/2026", 
            status: "OPEN", 
            color: "info",
            dotColor: "blue"
        },
        { 
            id: 988, 
            type: "Taps Leaking", 
            location: "Ward D, Sector 4", 
            ticket: "#0988",
            date: "12/01/2026", 
            status: "RESOLVED", 
            color: "success",
            dotColor: "green"
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitting(false);
        alert("Complaint Submitted!");
    };

    const filteredComplaints = activeTab === "all" 
        ? RECENT_COMPLAINTS 
        : activeTab === "active" 
        ? RECENT_COMPLAINTS.filter(c => c.status !== "RESOLVED")
        : RECENT_COMPLAINTS.filter(c => c.status === "RESOLVED");

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 min-h-screen pb-24">
            {/* Welcome Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome, Citizen</h1>
                <p className="text-slate-600 text-base font-normal">Stay safe and help us keep the city clean.</p>
            </div>

            {/* Alerts Section - Two Cards Side by Side */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Flood Warning Card */}
                <Card className="bg-red-50 border-red-200 shadow-sm p-6 flex items-start gap-4">
                    <div className="p-2.5 bg-white rounded-full text-red-600 shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-red-900 text-lg mb-1">Flood Warning</h3>
                        <p className="text-red-800 text-sm leading-relaxed mb-2">
                            Panchganga River level rising above 45ft. Evacuation protocols active for low-lying areas.
                        </p>
                        <p className="text-red-600 text-xs font-medium">10 MINS AGO</p>
                    </div>
                </Card>

                {/* Service Restored Card */}
                <Card className="bg-blue-50 border-blue-200 shadow-sm p-6 flex items-start gap-4">
                    <div className="p-2.5 bg-white rounded-full text-blue-600 shrink-0">
                        <Droplets size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-blue-900 text-lg mb-1">Service Restored</h3>
                        <p className="text-blue-800 text-sm leading-relaxed mb-2">
                            Safe drinking water supply has been fully restored in Ward C following maintenance work.
                        </p>
                        <p className="text-blue-600 text-xs font-medium">2 HOURS AGO</p>
                    </div>
                </Card>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column - Report an Issue */}
                <div className="lg:col-span-6">
                    <Card className="p-0 border border-slate-200 shadow-md rounded-xl overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-bold text-slate-800">Report an Issue</h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Issue Type</label>
                                    <select className="w-full bg-white border-slate-200 rounded-lg p-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all">
                                        <option>Pipe Burst</option>
                                        <option>Water Logging</option>
                                        <option>Contamination</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Location</label>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Ward C, Near Shivaji Statue"
                                            className="w-full bg-white border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Description</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Describe the issue briefly..."
                                        className="w-full bg-white border-slate-200 rounded-lg p-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                                    disabled={submitting}
                                >
                                    <Send size={16} />
                                    {submitting ? "Submitting Report..." : "Submit Report"}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Track Status */}
                <div className="lg:col-span-6">
                    <Card className="h-full border border-slate-200 shadow-md rounded-xl overflow-hidden flex flex-col">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-bold text-slate-800">Track Status</h2>
                        </div>

                        {/* Tabs */}
                        <div className="px-6 pt-4">
                            <div className="flex gap-1 border-b border-slate-200">
                                {["all", "active", "resolved"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            activeTab === tab
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-slate-500 hover:text-slate-700"
                                        }`}
                                    >
                                        {tab === "all" ? "All" : tab === "active" ? "Active" : "Resolved"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Complaint List */}
                        <div className="p-0 flex-1 overflow-y-auto">
                            {filteredComplaints.map((item, i) => (
                                <div
                                    key={item.id}
                                    className={`p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                                        i !== filteredComplaints.length - 1 ? 'border-b border-slate-100' : ''
                                    }`}
                                >
                                    <div
                                        className={`w-3 h-3 rounded-full shrink-0 ${
                                            item.dotColor === 'yellow' ? 'bg-yellow-500' :
                                            item.dotColor === 'blue' ? 'bg-blue-500' :
                                            'bg-green-500'
                                        }`}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-semibold text-slate-800 text-sm">{item.type}</h4>
                                            <Badge
                                                className={`text-[10px] px-2 py-0.5 font-semibold ${
                                                    item.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'IN PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}
                                            >
                                                {item.status}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-slate-600 mb-1">
                                            {item.location} • Ticket {item.ticket}
                                        </p>
                                        <p className="text-[11px] text-slate-400">{item.date}</p>
                                    </div>
                                    {item.status === 'RESOLVED' ? (
                                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                    ) : (
                                        <ChevronRight size={18} className="text-slate-300 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Bottom Action - Enable Demo Mode */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={toggleDemoMode}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-full shadow-lg flex items-center gap-2 transition-all"
                >
                    <Play size={16} />
                    ENABLE DEMO MODE
                </Button>
            </div>
        </div>
    );
}
