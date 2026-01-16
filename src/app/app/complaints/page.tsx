"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
    Search,
    Download,
    Filter,
    Edit2,
    ChevronLeft,
    ChevronRight,
    Droplets,
    AlertTriangle,
    Wrench,
    FileText,
    HelpCircle,
    RefreshCw,
    HeartPulse,
    Building2,
    Globe
} from "lucide-react";

// Helper for type icons
const getTypeIcon = (type: string) => {
    switch (type) {
        case 'Pipe Burst': return <Droplets size={16} className="text-blue-500" />;
        case 'Water Logging': return <Wrench size={16} className="text-amber-500" />; // Yellow/Amber
        case 'Sewage Leak': return <AlertTriangle size={16} className="text-red-500" />;
        case 'Quality Issue': return <FileText size={16} className="text-purple-500" />;
        case 'System Alert': return <AlertTriangle size={16} className="text-orange-500" />;
        default: return <HelpCircle size={16} className="text-gray-400" />;
    }
};

export default function ComplaintsPage() {
    // ... logic unchanged ...
    const { complaints } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // ... filter logic unchanged ...
    const filteredComplaints = complaints.filter(c => {
        const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        const matchesType = typeFilter === "All" || c.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    // ... pagination logic unchanged ...
    const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredComplaints.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto font-inter bg-slate-50 min-h-screen">
            {/* 1. Header Card */}
            <Card className="p-6 border-0 shadow-sm rounded-xl bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Complaint Management</h1>
                    <div className="flex items-center gap-2 text-slate-500 mt-2">
                        <RefreshCw size={14} />
                        <p className="text-sm font-medium">Last updated: Just now</p>
                    </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all font-semibold">
                    <Download size={18} />
                    Export Data
                </Button>
            </Card>

            {/* 2. Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or Location..."
                        className="w-full pl-11 pr-4 py-3 bg-white rounded-lg outline-none text-sm text-gray-700 placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex items-center gap-2 p-2 border-l border-gray-100">
                    <select
                        className="appearance-none pl-4 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                        value={typeFilter}
                        onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="All">Type: All</option>
                        <option value="Pipe Burst">Pipe Burst</option>
                        <option value="Water Logging">Water Logging</option>
                        <option value="System Alert">System Alert</option>
                    </select>

                    <select
                        className="appearance-none pl-4 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="All">Status: All</option>
                        <option value="Open">Status: Open</option>
                        <option value="In Progress">Status: In Progress</option>
                        <option value="Resolved">Status: Resolved</option>
                    </select>

                    <button
                        onClick={() => { setSearchTerm(""); setStatusFilter("All"); setTypeFilter("All"); setCurrentPage(1); }}
                        className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* 3. Table */}
            <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 font-bold text-gray-400 text-xs uppercase tracking-wider">ID</th>
                                <th className="px-6 py-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Type</th>
                                <th className="px-6 py-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Location</th>
                                <th className="px-6 py-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Date</th>
                                <th className="px-6 py-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Status</th>
                                <th className="px-8 py-5 font-bold text-gray-400 text-xs uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedItems.map((c, i) => (
                                <tr key={c.id} className="group hover:bg-gray-50/80 transition-colors">
                                    <td className="px-8 py-6 font-semibold text-gray-900">
                                        #JR-204{i + (currentPage - 1) * 5 + 5}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="text-slate-400">{getTypeIcon(c.type)}</div>
                                            <span className="text-gray-700 font-medium">{c.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-blue-600 hover:underline cursor-pointer font-medium">{c.location}</td>
                                    <td className="px-6 py-6 text-gray-500 font-medium">
                                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "Oct 12, 2023"}
                                    </td>
                                    <td className="px-6 py-6">
                                        <Badge variant="neutral" className={`
                                            !px-4 !py-1.5 !text-xs !font-bold !rounded-full border-0 shadow-sm
                                            ${c.status === 'Resolved' ? '!bg-[#E8F5E9] !text-[#2E7D32]' :
                                                c.status === 'In Progress' ? '!bg-[#FFF4E5] !text-[#B95000]' :
                                                    '!bg-[#E3F2FD] !text-[#1565C0]'}
                                        `}>
                                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2
                                                ${c.status === 'Resolved' ? 'bg-[#4CAF50]' :
                                                    c.status === 'In Progress' ? 'bg-[#FF9800]' :
                                                        'bg-[#2196F3]'}
                                            `}></span>
                                            {c.status}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-blue-200 text-blue-600 hover:bg-blue-50 font-bold px-4 rounded-lg"
                                        >
                                            <Edit2 size={12} className="mr-2" />
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="border-t border-gray-100 p-6 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 font-medium">
                        Showing <span className="text-gray-900">{filteredComplaints.length > 0 ? startIndex + 1 : 0}</span> to <span className="text-gray-900">{Math.min(startIndex + itemsPerPage, filteredComplaints.length)}</span> of <span className="text-gray-900">{filteredComplaints.length}</span> entries
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="h-8 w-8 p-0"><ChevronLeft size={14} /></Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`h-8 w-8 text-xs font-bold rounded-md border transition-all ${currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="h-8 w-8 p-0"><ChevronRight size={14} /></Button>
                    </div>
                </div>
            </Card>

            {/* SDG Footer */}
            <div className="mt-12 flex flex-col items-center">
                <div className="flex gap-6 mb-8">
                    {[
                        { title: 'Good Health', icon: HeartPulse, color: 'bg-green-600', num: 3 },
                        { title: 'Clean Water', icon: Droplets, color: 'bg-cyan-500', num: 6 },
                        { title: 'Sustainable Cities', icon: Building2, color: 'bg-orange-500', num: 11 },
                        { title: 'Climate Action', icon: Globe, color: 'bg-green-800', num: 13 }
                    ].map((g, i) => (
                        <div key={i} className={`w-20 h-20 rounded-xl ${g.color} text-white flex flex-col items-center justify-center p-2 text-center shadow-lg transform hover:scale-105 transition-transform`}>
                            <span className="text-[10px] font-black self-start absolute top-1 left-1.5">{g.num}</span>
                            <g.icon size={24} className="mb-1" />
                            <span className="text-[8px] font-bold uppercase leading-tight">{g.title}</span>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <h3 className="text-gray-900 font-bold mb-1">Supporting Sustainable Cities & Clean Water</h3>
                    <p className="text-gray-400 text-xs">JalRakshak Municipal Dashboard © 2026</p>
                </div>
            </div>
        </div>
    );
}
