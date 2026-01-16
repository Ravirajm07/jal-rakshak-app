"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AlertCircle, CheckCircle, MapPin, Send, Droplets } from "lucide-react";
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
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome, Citizen</h1>
                <p className="text-gray-500">Stay safe and help us keep the city clean.</p>
            </header>

            {/* Alerts Section */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="text-red-500" size={20} />
                    Nearby Alerts
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {alerts.map(alert => (
                        <Card key={alert.id} className={`border-l-4 ${alert.severity === 'danger' ? 'border-l-red-500' : 'border-l-blue-500'}`}>
                            <div className="flex gap-3">
                                <div className={`p-2 rounded-full h-fit ${alert.severity === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {alert.severity === 'danger' ? <AlertCircle size={20} /> : <Droplets size={20} />}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{alert.message}</p>
                                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
                {/* Complaint Form */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Send size={18} className="text-indigo-600" />
                        Report an Issue
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                            <select
                                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Pipe Burst</option>
                                <option>Water Logging</option>
                                <option>Sewage Leak</option>
                                <option>Quality Issue</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Ward C, Near Shivaji Statue"
                                    className="w-full pl-9 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                rows={3}
                                placeholder="Describe the issue briefly..."
                                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Submit Report"}
                        </Button>
                    </form>
                </Card>

                {/* Status Tracker */}
                <Card className="p-0 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-white">
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <CheckCircle size={18} className="text-green-600" />
                            Track Status
                        </h3>
                        <Tabs
                            tabs={[
                                { id: 'all', label: 'My Complaints' },
                                { id: 'pending', label: 'Not Solved' },
                                { id: 'resolved', label: 'Solved' }
                            ]}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </div>

                    <div className="p-4 bg-white min-h-[300px]">
                        {filteredComplaints.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-sm">No complaints found in this category.</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                {filteredComplaints.map(complaint => (
                                    <div key={complaint.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-medium text-gray-900">{complaint.type}</span>
                                            <Badge variant={
                                                complaint.status === 'Resolved' ? 'success' :
                                                    complaint.status === 'In Progress' ? 'warning' : 'neutral'
                                            }>
                                                {complaint.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{complaint.location}</p>
                                        <div className="flex justify-between items-end">
                                            <div className="text-xs text-gray-400">
                                                ID: {complaint.id.substring(0, 8)}...
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : 'Just now'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
