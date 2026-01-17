"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
    Search,
    Download,
    Edit3,
    ChevronLeft,
    ChevronRight,
    Droplets,
    AlertTriangle,
    Wrench,
    FileText,
    HelpCircle,
    RefreshCw,
    ListFilter
} from "lucide-react";

// Helper for type icons - matching the reference icons
const getTypeIcon = (type: string) => {
    switch (type) {
        case 'Pipe Burst': return <Wrench size={16} className="text-gray-500" />; // Wrench icon style
        case 'Water Logging': return <Droplets size={16} className="text-gray-500" />;
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
        <div className="p-8 max-w-[1600px] mx-auto font-sans bg-[#F9FAFB] min-h-screen text-slate-900">

            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-[28px] font-black text-[#111827] tracking-tight mb-1">Complaint Management</h1>
                    <div className="flex items-center gap-2 text-gray-500">
                        <RefreshCw size={14} className="text-gray-400" />
                        <p className="text-sm font-medium text-gray-500">Last updated: Just now</p>
                    </div>
                </div>
                <Button className="bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm h-10 transition-all">
                    <Download size={18} strokeWidth={2.5} />
                    Export Data
                </Button>
            </div>

            {/* 2. Filter Bar - Card with Bordered Controls */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between mb-6 gap-4">

                {/* Search - Distinct Bordered Input */}
                <div className="relative w-full md:w-[320px]">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by ID or Location"
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                {/* Filters - Bordered Selects */}
                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">

                    {/* Type Select */}
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 outline-none cursor-pointer hover:bg-gray-50 focus:border-blue-500 transition-all min-w-[120px]"
                            value={typeFilter}
                            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
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

                    {/* Status Select */}
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm font-semibold text-gray-700 outline-none cursor-pointer hover:bg-gray-50 focus:border-blue-500 transition-all min-w-[130px]"
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
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
                        onClick={() => { setSearchTerm(""); setStatusFilter("All"); setTypeFilter("All"); setCurrentPage(1); }}
                        className="text-[#2563EB] hover:text-blue-800 text-sm font-bold ml-2 whitespace-nowrap"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* 3. Table Card */}
            <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F9FAFB] border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-500 text-[11px] uppercase tracking-wider w-[140px]">ID</th>
                                <th className="px-6 py-4 font-bold text-gray-500 text-[11px] uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 font-bold text-gray-500 text-[11px] uppercase tracking-wider">Location</th>
                                <th className="px-6 py-4 font-bold text-gray-500 text-[11px] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 font-bold text-gray-500 text-[11px] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-bold text-gray-500 text-[11px] uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedItems.map((c, i) => (
                                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5 font-bold text-gray-900 text-sm">
                                        #{c.id}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            {getTypeIcon(c.type)}
                                            <span className="text-gray-700 text-sm font-semibold">{c.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-gray-500 text-sm font-medium">{c.location}</td>
                                    <td className="px-6 py-5 text-gray-500 text-sm font-medium">
                                        Oct {12 - i}, 2023
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={`
                                            inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border
                                            ${c.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                                                c.status === 'In Progress' ? 'bg-[#FFFAE5] text-[#B45309] border-[#FEF3C7]' : // Yellow/Amber
                                                    'bg-blue-50 text-blue-700 border-blue-200'}
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full
                                                ${c.status === 'Resolved' ? 'bg-green-500' :
                                                    c.status === 'In Progress' ? 'bg-[#F59E0B]' :
                                                        'bg-blue-500'}
                                            `}></span>
                                            {c.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-blue-200 text-[#2563EB] hover:bg-blue-50 font-bold px-4 rounded-lg h-9 ml-auto flex items-center gap-2"
                                        >
                                            <ListFilter size={14} className="stroke-[2.5px]" />
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-gray-200 p-4 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 font-medium">
                        Showing <span className="font-bold text-gray-900">{startIndex + 1}</span> to <span className="font-bold text-gray-900">{Math.min(startIndex + itemsPerPage, filteredComplaints.length)}</span> of <span className="font-bold text-gray-900">{filteredComplaints.length}</span> entries
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-all font-medium"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {/* Numbered Pagination Buttons matching image style */}
                        {[1, 2, 3].map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded border transition-all font-bold text-sm
                                    ${currentPage === page
                                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 transition-all font-medium"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
