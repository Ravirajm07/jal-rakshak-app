"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
    Search,
    Download,
    Edit2,
    ChevronLeft,
    ChevronRight,
    Droplets,
    AlertTriangle,
    Wrench,
    FileText,
    HelpCircle,
    RefreshCw
} from "lucide-react";

// Helper for type icons
const getTypeIcon = (type: string) => {
    switch (type) {
        case 'Pipe Burst': return <Droplets size={16} className="text-gray-500" />;
        case 'Water Logging': return <Wrench size={16} className="text-gray-500" />;
        case 'Sewage Leak': return <AlertTriangle size={16} className="text-gray-500" />;
        case 'Quality Issue': return <FileText size={16} className="text-gray-500" />;
        case 'System Alert': return <AlertTriangle size={16} className="text-gray-500" />;
        default: return <HelpCircle size={16} className="text-gray-500" />;
    }
};

export default function ComplaintsPage() {
    const { complaints } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter Logic
    const filteredComplaints = complaints.filter(c => {
        const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        const matchesType = typeFilter === "All" || c.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredComplaints.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto font-inter bg-[#F8F9FA] min-h-screen">

            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-1">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827] tracking-tight">Complaint Management</h1>
                    <div className="flex items-center gap-2 text-gray-500 mt-1.5 ml-0.5">
                        <RefreshCw size={14} className="text-gray-400" />
                        <p className="text-xs md:text-sm font-medium text-gray-500">Last updated: Just now</p>
                    </div>
                </div>
                <Button className="bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all h-10">
                    <Download size={18} />
                    Export Data
                </Button>
            </div>

            {/* 2. Filter Bar - High Fidelity Match */}
            <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center h-auto md:h-12 w-full">
                {/* Search */}
                <div className="relative flex-1 w-full h-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or Location"
                        className="w-full h-full pl-10 pr-4 py-2.5 md:py-0 bg-transparent rounded-lg outline-none text-sm text-gray-600 placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-6 px-4 border-t md:border-t-0 md:border-l border-gray-100 py-2 md:py-0 w-full md:w-auto h-full justify-end bg-gray-50 md:bg-transparent rounded-b-xl md:rounded-none">

                    {/* Type Filter */}
                    <div className="relative flex items-center group cursor-pointer">
                        <span className="text-sm font-semibold text-gray-700 mr-2">Type:</span>
                        <select
                            className="appearance-none bg-transparent font-medium text-sm text-gray-500 outline-none cursor-pointer pr-4 hover:text-gray-900 transition-colors"
                            value={typeFilter}
                            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All">All</option>
                            <option value="Pipe Burst">Pipe Burst</option>
                            <option value="Water Logging">Water Logging</option>
                            <option value="System Alert">System Alert</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="relative flex items-center group cursor-pointer">
                        <span className="text-sm font-semibold text-gray-700 mr-2">Status:</span>
                        <select
                            className="appearance-none bg-transparent font-medium text-sm text-gray-500 outline-none cursor-pointer pr-4 hover:text-gray-900 transition-colors"
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All">All</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    <button
                        onClick={() => { setSearchTerm(""); setStatusFilter("All"); setTypeFilter("All"); setCurrentPage(1); }}
                        className="text-[#2563EB] hover:text-blue-800 text-sm font-semibold whitespace-nowrap"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* 3. Table Card - Full Width Alignment */}
            <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white border-b border-gray-100">
                            <tr>
                                <th className="pl-8 pr-4 py-5 font-bold text-gray-400 text-[11px] uppercase tracking-wider w-[120px]">ID</th>
                                <th className="px-6 py-5 font-bold text-gray-400 text-[11px] uppercase tracking-wider">Type</th>
                                <th className="px-6 py-5 font-bold text-gray-400 text-[11px] uppercase tracking-wider">Location</th>
                                <th className="px-6 py-5 font-bold text-gray-400 text-[11px] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-5 font-bold text-gray-400 text-[11px] uppercase tracking-wider">Status</th>
                                <th className="pr-8 pl-4 py-5 font-bold text-gray-400 text-[11px] uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedItems.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-10 text-gray-400">No complaints found</td></tr>
                            ) : paginatedItems.map((c, i) => (
                                <tr key={c.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="pl-8 pr-4 py-6 font-bold text-gray-900">
                                        #JR-204{i + (currentPage - 1) * 5 + 5}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(c.type)}
                                            <span className="text-gray-700 font-medium">{c.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-gray-500 font-medium">{c.location}</td>
                                    <td className="px-6 py-6 text-gray-400 font-medium">
                                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "Oct 12, 2023"}
                                    </td>
                                    <td className="px-6 py-6">
                                        <Badge variant="neutral" className={`
                                            !px-3 !py-1 !text-xs !font-bold !rounded-full border-0
                                            ${c.status === 'Resolved' ? '!bg-green-100 !text-green-600' :
                                                c.status === 'In Progress' ? '!bg-amber-100 !text-amber-600' :
                                                    '!bg-blue-100 !text-blue-600'}
                                        `}>
                                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2
                                                ${c.status === 'Resolved' ? 'bg-green-500' :
                                                    c.status === 'In Progress' ? 'bg-amber-500' :
                                                        'bg-blue-500'}
                                            `}></span>
                                            {c.status}
                                        </Badge>
                                    </td>
                                    <td className="pr-8 pl-4 py-6 text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-blue-200 text-blue-600 hover:bg-blue-50 font-bold px-4 rounded-lg h-9 w-fit ml-auto"
                                        >
                                            <Edit2 size={14} className="mr-2" />
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-gray-100 p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 font-medium">
                        Showing <span className="text-gray-900">{filteredComplaints.length > 0 ? startIndex + 1 : 0}</span> to <span className="text-gray-900">{Math.min(startIndex + itemsPerPage, filteredComplaints.length)}</span> of <span className="text-gray-900">{filteredComplaints.length}</span> entries
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="h-8 w-8 p-0 rounded-md border-gray-200"><ChevronLeft size={16} /></Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`h-8 w-8 text-xs font-bold rounded-md border transition-all 
                                    ${currentPage === page
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="h-8 w-8 p-0 rounded-md border-gray-200"><ChevronRight size={16} /></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
