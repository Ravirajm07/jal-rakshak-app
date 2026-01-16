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
    HelpCircle
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
    const { complaints } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");

    // Pagination State
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
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto font-inter">
            {/* 1. Header Card */}
            <Card className="p-6 border border-gray-100 shadow-sm rounded-xl bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Complaint Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Last updated: Just now</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all w-fit">
                    <Download size={18} />
                    Export Data
                </Button>
            </Card>

            {/* 2. Filters & Content Container */}
            <div className="space-y-4">
                {/* Filter Bar - Single Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    {/* Left: Search */}
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by ID or Location..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-800 placeholder:text-gray-400"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                    </div>

                    {/* Right: Filters & Reset */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            className="flex-1 md:flex-none appearance-none pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer min-w-[140px]"
                            value={typeFilter}
                            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All">Type: All</option>
                            <option value="Pipe Burst">Pipe Burst</option>
                            <option value="Water Logging">Water Logging</option>
                            <option value="System Alert">System Alert</option>
                        </select>

                        <select
                            className="flex-1 md:flex-none appearance-none pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer min-w-[140px]"
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All">Status: All</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>

                        <button
                            onClick={() => { setSearchTerm(""); setStatusFilter("All"); setTypeFilter("All"); setCurrentPage(1); }}
                            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors whitespace-nowrap"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* 3. Table Card */}
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paginatedItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                            No complaints matching your filters.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedItems.map((c, i) => (
                                        <tr key={c.id} className="group hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-900">
                                                #{c.id.substring(0, 4)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {getTypeIcon(c.type)}
                                                    <span className="text-gray-700 font-medium">{c.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{c.location}</td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="neutral" className={`
                                                    !px-2.5 !py-0.5 !text-xs !font-medium !rounded-full border-0
                                                    ${c.status === 'Resolved' ? '!bg-emerald-50 !text-emerald-700' :
                                                        c.status === 'In Progress' ? '!bg-yellow-50 !text-yellow-700' :
                                                            '!bg-blue-50 !text-blue-700'}
                                                `}>
                                                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5
                                                        ${c.status === 'Resolved' ? 'bg-emerald-500' :
                                                            c.status === 'In Progress' ? 'bg-yellow-500' :
                                                                'bg-blue-500'}
                                                    `}></span>
                                                    {c.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium border border-transparent hover:border-blue-100"
                                                >
                                                    <span className="mr-2">Update</span>
                                                    <Edit2 size={14} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="border-t border-gray-100 p-4 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-900">{filteredComplaints.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + itemsPerPage, filteredComplaints.length)}</span> of <span className="font-medium text-gray-900">{filteredComplaints.length}</span> entries
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="h-9 w-9 p-0 rounded-lg border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white hover:border-gray-300 disabled:opacity-50"
                            >
                                <ChevronLeft size={18} />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`
                                        h-9 w-9 text-sm font-medium rounded-lg transition-colors
                                        ${currentPage === page
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-200'}
                                    `}
                                >
                                    {page}
                                </button>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="h-9 w-9 p-0 rounded-lg border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white hover:border-gray-300 disabled:opacity-50"
                            >
                                <ChevronRight size={18} />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
