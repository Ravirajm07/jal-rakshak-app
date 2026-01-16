"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Download, RotateCcw } from "lucide-react";

export default function ComplaintsPage() {
    const { complaints } = useData();
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
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Complaint Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Wait Last updated: Just now</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-colors">
                    <Download size={18} />
                    Export Data
                </Button>
            </header>

            {/* Filters Bar */}
            <Card className="p-4 border border-gray-100 shadow-sm rounded-xl bg-white">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search - Left Aligned */}
                    <div className="relative w-full md:max-w-xl">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID or Location"
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700 placeholder:text-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filters - Right Aligned */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="relative">
                            <select
                                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer hover:border-gray-300 transition-colors min-w-[140px]"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="All">Type: All</option>
                                <option value="Pipe Burst">Pipe Burst</option>
                                <option value="Water Logging">Water Logging</option>
                                <option value="System Alert">System Alert</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer hover:border-gray-300 transition-colors min-w-[140px]"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">Status: All</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        <button
                            onClick={() => { setSearchTerm(""); setStatusFilter("All"); setTypeFilter("All"); }}
                            className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </Card>

            {/* Table Card */}
            <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider bg-white">ID</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider bg-white">Type</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider bg-white">Location</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider bg-white">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider bg-white">Admin Note</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider bg-white text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredComplaints.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-3 bg-gray-50 rounded-full">
                                                <Filter size={24} className="text-gray-400" />
                                            </div>
                                            <p className="text-base font-medium text-gray-900">No complaints found</p>
                                            <p className="text-sm">Try adjusting your search or filters to find what you're looking for.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredComplaints.map((c, i) => (
                                    <tr key={c.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <span className="font-semibold text-gray-900">#{c.id.substring(0, 4) || i + 1}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-gray-700 font-medium">{c.type}</span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-600">{c.location}</td>
                                        <td className="px-6 py-5">
                                            <Badge variant="neutral" className={`
                                                !bg-opacity-10 !px-3 !py-1 !text-xs !font-medium !rounded-full border-0
                                                ${c.status === 'Resolved' ? '!bg-emerald-50 !text-emerald-700' :
                                                    c.status === 'In Progress' ? '!bg-amber-50 !text-amber-700' :
                                                        '!bg-blue-50 !text-blue-700'}
                                            `}>
                                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 mb-0.5
                                                    ${c.status === 'Resolved' ? 'bg-emerald-500' :
                                                        c.status === 'In Progress' ? 'bg-amber-500' :
                                                            'bg-blue-500'}
                                                `}></span>
                                                {c.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-5 text-gray-400 italic">
                                            {c.adminResponse || "-"}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium px-4"
                                            >
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
