"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input"; // Assuming you have an Input component or use a standard one
import { Search, Filter, Download } from "lucide-react";

export default function ComplaintsPage() {
    const { complaints, updateComplaintStatus } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");

    const filteredComplaints = complaints.filter(c => {
        const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        const matchesType = typeFilter === "All" || c.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="p-6 space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Complaint Management</h1>
                    <p className="text-sm text-gray-500">Wait Last updated: Just now</p>
                </div>
                <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                    <Download size={16} />
                    Export Data
                </Button>
            </header>

            {/* Filters */}
            <Card className="p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or Location"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        className="p-2 border border-gray-200 rounded-lg text-sm bg-white"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="All">Type: All</option>
                        <option value="Pipe Burst">Pipe Burst</option>
                        <option value="Water Logging">Water Logging</option>
                        <option value="System Alert">System Alert</option>
                    </select>
                    <select
                        className="p-2 border border-gray-200 rounded-lg text-sm bg-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">Status: All</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                    <Button variant="outline" onClick={() => { setSearchTerm(""); setStatusFilter("All"); setTypeFilter("All"); }}>
                        Reset Filters
                    </Button>
                </div>
            </Card>

            {/* Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Admin Note</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComplaints.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No complaints found.
                                    </td>
                                </tr>
                            ) : (
                                filteredComplaints.map((c, i) => (
                                    <tr key={c.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">#{i + 1}</td>
                                        <td className="px-6 py-4">{c.type}</td>
                                        <td className="px-6 py-4 text-gray-600">{c.location}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                c.status === 'Resolved' ? 'success' :
                                                    c.status === 'In Progress' ? 'warning' : 'primary' // 'primary' usually blue/neutral 
                                            }>
                                                {c.status === 'Open' ? '• Open' :
                                                    c.status === 'In Progress' ? '• In Progress' : '• Resolved'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">-</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="outline" size="sm" className="hover:bg-gray-100">
                                                Update
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
