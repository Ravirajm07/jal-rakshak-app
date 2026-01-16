"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, CheckCircle2, MapPin, Send, Droplets, Info, History } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";

export function CitizenDashboard() {
    const { alerts, addComplaint, complaints } = useData();
    const [activeTab, setActiveTab] = useState("all");
    const [formData, setFormData] = useState({
        type: "Pipe Burst",
        location: "",
        description: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        await addComplaint({
            type: formData.type as any,
            location: formData.location,
            description: formData.description
        });
        setFormData({ type: "Pipe Burst", location: "", description: "" });
        setSubmitting(false);
    };

    // 1. First strict filter: ONLY my complaints
    const myComplaints = complaints.filter(c => c.userEmail === "citizen@jalrakshak.demo" || c.userEmail?.includes("citizen"));

    // 2. Tab filter
    const filteredComplaints = myComplaints.filter(c => {
        if (activeTab === 'all') return true;
        if (activeTab === 'resolved') return c.status === 'Resolved';
        if (activeTab === 'pending') return c.status !== 'Resolved';
        return true;
    });

    return (
        <div className="max-w-[1200px] mx-auto p-6 md:p-8 space-y-8 min-h-screen">

            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome, Citizen</h1>
                    <p className="text-slate-500 mt-1 font-medium">Stay safe and help us keep the city clean.</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Info size={16} />
                    Ward C: Safe Levels
                </div>
            </header>

            {/* Alerts Section */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-1 bg-red-500 rounded-full"></div>
                    <h2 className="text-lg font-bold text-slate-800">Nearby Alerts</h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {alerts.map(alert => (
                        <div
                            key={alert.id}
                            className={`
                                relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all hover:shadow-md
                                ${alert.severity === 'danger'
                                    ? 'bg-white border-red-100 hover:border-red-200'
                                    : 'bg-white border-blue-100 hover:border-blue-200'}
                            `}
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute -right-4 -top-4 opacity-5">
                                {alert.severity === 'danger' ? <AlertTriangle size={100} /> : <Droplets size={100} />}
                            </div>

                            <div className="flex gap-4 relative z-10">
                                <div className={`
                                    p-3 rounded-xl h-fit shadow-sm
                                    ${alert.severity === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}
                                `}>
                                    {alert.severity === 'danger' ? <AlertTriangle size={24} strokeWidth={2.5} /> : <Droplets size={24} strokeWidth={2.5} />}
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold text-slate-900 leading-tight">{alert.message}</p>
                                    <span className="inline-block text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                        {alert.timestamp}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Action Grid */}
            <div className="grid lg:grid-cols-12 gap-8">

                {/* 1. Complaint Form (Left - Larger) */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-1 bg-indigo-500 rounded-full"></div>
                        <h2 className="text-lg font-bold text-slate-800">Report an Issue</h2>
                    </div>

                    <Card className="p-0 border-0 shadow-lg shadow-indigo-500/5 rounded-2xl overflow-hidden ring-1 ring-slate-200/60 bg-white">
                        <div className="p-1 bg-gradient-to-r from-indigo-50 to-white border-b border-indigo-50/50"></div>
                        <div className="p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Issue Type */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Issue Type</label>
                                    <div className="relative group">
                                        <select
                                            className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all appearance-none cursor-pointer hover:bg-white hover:border-slate-300"
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option>Pipe Burst</option>
                                            <option>Water Logging</option>
                                            <option>Sewage Leak</option>
                                            <option>Quality Issue</option>
                                            <option>Other</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <History size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                            <MapPin size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="e.g. Ward C, Near Shivaji Statue"
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all hover:bg-white hover:border-slate-300"
                                            required
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Describe the issue briefly..."
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all resize-none hover:bg-white hover:border-slate-300"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-2">Processing...</span>
                                    ) : (
                                        <>
                                            <Send size={18} strokeWidth={2.5} />
                                            Submit Report
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>

                {/* 2. Status Tracker (Right) */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-1 bg-green-500 rounded-full"></div>
                        <h2 className="text-lg font-bold text-slate-800">Track Status</h2>
                    </div>

                    <div className="bg-white border-0 shadow-lg shadow-slate-200/60 rounded-2xl overflow-hidden ring-1 ring-slate-200 h-full flex flex-col">
                        <div className="p-4 bg-white border-b border-slate-100">
                            <Tabs
                                tabs={[
                                    { id: 'all', label: 'All' },
                                    { id: 'pending', label: 'Active' },
                                    { id: 'resolved', label: 'Done' }
                                ]}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                            // You might need to update the Tabs component to accept className for styling overrides if needed, 
                            // or better yet, rely on its default clean styling if it's already good.
                            // Assuming Tabs component is flexible or simple.
                            />
                        </div>

                        <div className="p-4 bg-slate-50/50 flex-1 min-h-[300px] overflow-y-auto custom-scrollbar">
                            {filteredComplaints.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 py-10 opacity-60">
                                    <div className="p-4 bg-slate-100 rounded-full">
                                        <History size={24} />
                                    </div>
                                    <p className="font-medium text-sm">No complaints found</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredComplaints.map(complaint => (
                                        <div
                                            key={complaint.id}
                                            className="group relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-default"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${complaint.status === 'Resolved' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                                    <span className="font-bold text-slate-800 text-sm">{complaint.type}</span>
                                                </div>
                                                <Badge className={`
                                                    px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md border-0
                                                    ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                        complaint.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}
                                                `}>
                                                    {complaint.status}
                                                </Badge>
                                            </div>

                                            <p className="text-sm text-slate-500 font-medium pl-4 border-l-2 border-slate-100 mb-3 truncate">
                                                {complaint.location}
                                            </p>

                                            <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-50 pt-2 mt-2">
                                                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                                                    #{complaint.id.substring(0, 6)}...
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <History size={12} />
                                                    {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : 'Just now'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
