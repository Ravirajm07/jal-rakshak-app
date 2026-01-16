"use client";

import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Droplets, AlertTriangle, CheckCircle, FileText, Download, Radio, TrendingUp, Filter } from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import styles from "@/app/app/dashboard/Dashboard.module.css";
import dynamic from "next/dynamic";
import { DecisionPanel } from "@/components/admin/DecisionPanel";
import { useState } from "react";

// Dynamically import map for Dashboard (no SSR)
const DashboardMap = dynamic(() => import("@/components/map/MapComponent"), {
    ssr: false,
    loading: () => <div className={styles.mapLoading}>Loading Map...</div>
});

const LEVEL_DATA = [
    { time: "12 AM", level: 40 },
    { time: "2 AM", level: 41 },
    { time: "4 AM", level: 40.5 },
    { time: "6 AM", level: 42 },
    { time: "8 AM", level: 43.5 },
    { time: "10 AM", level: 44.2 },
    { time: "12 PM", level: 43.8 },
    { time: "2 PM", level: 44.5 },
    { time: "4 PM", level: 45.2 }, // Peak
    { time: "6 PM", level: 45.0 },
    { time: "8 PM", level: 44.8 },
];

export function AdminDashboard() {
    const { complaints, updateComplaintStatus } = useData();
    const [filterStatus, setFilterStatus] = useState<string>("All");

    const filteredComplaints = filterStatus === "All"
        ? complaints
        : complaints.filter(c => c.status === filterStatus);

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>City Overview (Admin)</h1>
                    <p className={styles.subtitle}>Real-time monitoring for Kolhapur District • Last updated: Just now</p>
                </div>
                <div className={styles.actions}>
                    <Button variant="outline" size="sm">
                        <Download size={16} style={{ marginRight: '0.5rem' }} />
                        Export Report
                    </Button>
                    <Button variant="danger" size="sm">
                        <Radio size={16} style={{ marginRight: '0.5rem' }} />
                        Broadcast Alert
                    </Button>
                </div>
            </div>

            {/* Decision Support Panel (Admin Only) */}
            <DecisionPanel />

            {/* KPI Cards */}
            <div className={styles.kpiGrid}>
                {/* Safe - Emerald */}
                <Card className={styles.kpiCard} style={{ borderLeftColor: '#10b981' }}>
                    <div className={styles.kpiTop}>
                        <div className={styles.kpiLabel}>Water Quality</div>
                        <div className={styles.kpiIcon} style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
                            <Droplets size={18} />
                        </div>
                    </div>
                    <div className={styles.kpiValue}>Safe</div>
                    <div className={styles.kpiStatus} style={{ color: '#059669' }}>
                        <TrendingUp size={14} /> Optimal Levels
                    </div>
                </Card>

                {/* Flood - Blue */}
                <Card className={styles.kpiCard} style={{ borderLeftColor: '#3b82f6' }}>
                    <div className={styles.kpiTop}>
                        <div className={styles.kpiLabel}>Flood Risk</div>
                        <div className={styles.kpiIcon} style={{ backgroundColor: '#dbeafe', color: '#2563eb' }}>
                            <CheckCircle size={18} />
                        </div>
                    </div>
                    <div className={styles.kpiValue}>Normal</div>
                    <div className={styles.kpiStatus} style={{ color: '#64748b' }}>
                        2ft below warning level
                    </div>
                </Card>

                {/* Complaints - Amber */}
                <Card className={styles.kpiCard} style={{ borderLeftColor: '#f59e0b' }}>
                    <div className={styles.kpiTop}>
                        <div className={styles.kpiLabel}>Active Complaints</div>
                        <div className={styles.kpiIcon} style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                            <AlertTriangle size={18} />
                        </div>
                    </div>
                    <div className={styles.kpiValue}>{complaints.filter(c => c.status !== 'Resolved').length}</div>
                    <div className={styles.kpiStatus} style={{ color: '#d97706' }}>
                        Requires Attention
                    </div>
                </Card>

                {/* Resolved - Indigo */}
                <Card className={styles.kpiCard} style={{ borderLeftColor: '#6366f1' }}>
                    <div className={styles.kpiTop}>
                        <div className={styles.kpiLabel}>Resolved Cases</div>
                        <div className={styles.kpiIcon} style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                            <FileText size={18} />
                        </div>
                    </div>
                    <div className={styles.kpiValue}>{complaints.filter(c => c.status === 'Resolved').length}</div>
                    <div className={styles.kpiStatus} style={{ color: '#059669' }}>
                        ↑ 15% this week
                    </div>
                </Card>
            </div>

            {/* Complaint Management Section */}
            <Card className="mb-6 p-0 overflow-hidden border-t-4 border-t-indigo-500 shadow-md">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FileText className="text-indigo-600" size={20} />
                        Complaint Management
                    </h3>
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-400" />
                        <select
                            className="text-sm border-none bg-gray-50 rounded-md p-1 focus:ring-0 text-gray-600 font-medium"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComplaints.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No complaints found.
                                    </td>
                                </tr>
                            ) : (
                                filteredComplaints.map((complaint) => (
                                    <tr key={complaint.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {complaint.type}
                                            <div className="text-xs font-normal text-gray-500 mt-1 truncate max-w-[200px]">{complaint.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{complaint.location}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : 'Just now'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                complaint.status === 'Resolved' ? 'success' :
                                                    complaint.status === 'In Progress' ? 'warning' : 'danger'
                                            }>
                                                {complaint.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                className="bg-white border border-gray-300 text-gray-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                value={complaint.status}
                                                onChange={(e) => updateComplaintStatus(complaint.id, e.target.value as any)}
                                            >
                                                <option value="Open">Open</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Main Content Grid (Original Charts) */}
            <div className={styles.mainGrid}>
                {/* Left: Water Level Graph */}
                <div className={styles.leftColumn}>
                    <Card className={styles.chartCard}>
                        {/* ... Existing Chart Code ... */}
                        <div className={styles.chartHeader}>
                            <div className={styles.chartTitle}>
                                <h3>Live Water Levels</h3>
                                <p>Panchganga River • Last 24 Hours</p>
                            </div>
                            <Badge variant="danger" className="animate-pulse">● LIVE</Badge>
                        </div>

                        <div className={styles.bigMetric}>
                            <span className={styles.metricValue}>45.2</span>
                            <span className={styles.metricUnit}>ft</span>
                            <span className={styles.metricLabel}>Current Level</span>
                        </div>

                        <div className={styles.chartContainer} style={{ height: 300, width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={LEVEL_DATA}>
                                    <defs>
                                        <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="level"
                                        stroke="#2563eb"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorLevel)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Map Preview at Bottom */}
                    <Card className={styles.mapCard}>
                        <div className="w-full h-full">
                            <DashboardMap />
                        </div>
                    </Card>
                </div>

                {/* Right: Quality Indicators column */}
                <div className={styles.rightColumn}>
                    {/* Overall Status */}
                    <Card className={styles.statusSummary}>
                        <div className={styles.statusHeader}>
                            <h3 className={styles.statusTitle}>Water Status: SAFE</h3>
                            <div className={styles.checkIcon}>
                                <CheckCircle size={20} />
                            </div>
                        </div>
                        <p className={styles.statusDesc}>All parameters within limits</p>
                    </Card>

                    <h3 className={styles.sectionTitle}>Quality Indicators</h3>

                    {/* pH */}
                    <Card className={styles.qualityCard}>
                        <div className={styles.qualityLeft}>
                            <div className={styles.qualityIcon} style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                                <Droplets size={20} />
                            </div>
                            <div>
                                <div className={styles.qualityName}>pH Level</div>
                                <div className={styles.qualityTarget}>Target: 6.5 - 8.5</div>
                            </div>
                        </div>
                        <div className={styles.qualityRight}>
                            <div className={styles.qualityValue}>7.2</div>
                            <div className={styles.qualityStatus}>Good</div>
                        </div>
                    </Card>

                    {/* Turbidity */}
                    <Card className={styles.qualityCard}>
                        <div className={styles.qualityLeft}>
                            <div className={styles.qualityIcon} style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                                <Droplets size={20} />
                            </div>
                            <div>
                                <div className={styles.qualityName}>Turbidity</div>
                                <div className={styles.qualityTarget}>Clarity</div>
                            </div>
                        </div>
                        <div className={styles.qualityRight}>
                            <div className={styles.qualityValue}>2.1</div>
                            <div className={styles.qualityStatus} style={{ color: '#059669' }}>Low</div>
                        </div>
                    </Card>

                    {/* Chlorine */}
                    <Card className={styles.qualityCard}>
                        <div className={styles.qualityLeft}>
                            <div className={styles.qualityIcon} style={{ backgroundColor: '#f0fdf4', color: '#0d9488' }}>
                                <Droplets size={20} />
                            </div>
                            <div>
                                <div className={styles.qualityName}>Chlorine</div>
                                <div className={styles.qualityTarget}>Disinfectant</div>
                            </div>
                        </div>
                        <div className={styles.qualityRight}>
                            <div className={styles.qualityValue}>0.5</div>
                            <div className={styles.qualityStatus}>Safe</div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
