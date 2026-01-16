"use client";

import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
    AlertTriangle, Siren, Users, TrendingUp,
    Map as MapIcon, ArrowRight, Activity, Clock
} from "lucide-react";
import {
    AreaChart, Area, Tooltip, ResponsiveContainer
} from "recharts";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import map for Dashboard (no SSR)
const DashboardMap = dynamic(() => import("@/components/map/MapComponent"), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full bg-slate-50 text-slate-400">Initializing Ops Map...</div>
});

const SPARKLINE_DATA = [
    { time: "1", value: 30 }, { time: "2", value: 45 }, { time: "3", value: 35 },
    { time: "4", value: 50 }, { time: "5", value: 70 }, { time: "6", value: 65 },
    { time: "7", value: 85 }, { time: "8", value: 80 }, { time: "9", value: 95 },
];

export function AdminDashboard() {
    const { complaints } = useData();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    // Simulated Critical Feed (In real app, filter from complaints/alerts)
    const CRITICAL_FEED = [
        { id: 1, type: "SLA Breach", message: "Complaint #4492 unresolved for 48h", time: "10m ago", severity: "high" },
        { id: 2, type: "Sensor Alert", message: "Panchganga Station B: Rapid Rise (+2ft/hr)", time: "25m ago", severity: "critical" },
        { id: 3, type: "Public Safety", message: "Crowd gathering reported at Shivaji Bridge", time: "1h ago", severity: "medium" },
    ];

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] gap-4 p-4 max-w-[1700px] mx-auto overflow-hidden">

            {/* 1. Command Header */}
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Activity className="text-indigo-600" />
                        Command Center
                    </h1>
                    <p className="text-sm text-slate-500 font-medium ml-8">
                        Kolhapur Municipal Corporation • Operational Status: <span className="text-green-600">Active</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-xs h-8 border-slate-300">
                        Generate Report
                    </Button>
                    <Button variant="danger" className="text-xs h-8 shadow-sm shadow-red-200">
                        <Siren size={14} className="mr-1" />
                        Broadcast Alert
                    </Button>
                </div>
            </div>

            {/* 2. KPI Ticker (High Density) */}
            <div className="grid grid-cols-4 gap-4 shrink-0 h-24">
                <Card className="flex flex-col justify-center p-4 border-l-4 border-l-red-500 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow bg-white rounded-xl">
                    <div className="absolute top-0 right-0 p-2 opacity-5 text-red-500 group-hover:opacity-10 transition-opacity">
                        <AlertTriangle size={60} />
                    </div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider z-10">Critical Alerts</span>
                    <div className="text-3xl font-bold text-slate-900 mt-1 z-10">3</div>
                    <span className="text-xs text-red-600 font-medium mt-1 flex items-center z-10">
                        <TrendingUp size={12} className="mr-1" /> +2 from yesterday
                    </span>
                </Card>

                {/* FileTextIcon inline svg replacement */}
                <Card className="flex flex-col justify-center p-4 border-l-4 border-l-amber-500 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow bg-white rounded-xl">
                    <div className="absolute top-0 right-0 p-2 opacity-5 text-amber-500 group-hover:opacity-10 transition-opacity">
                        <FileTextIcon size={60} />
                    </div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider z-10">Open Complaints</span>
                    <div className="text-3xl font-bold text-slate-900 mt-1 z-10">
                        {complaints.filter(c => c.status !== 'Resolved').length}
                    </div>
                    <span className="text-xs text-amber-600 font-medium mt-1 z-10">Requires Triage</span>
                </Card>

                <Card className="flex flex-col justify-center p-4 border-l-4 border-l-blue-500 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow bg-white rounded-xl">
                    <div className="absolute top-0 right-0 p-2 opacity-5 text-blue-500 group-hover:opacity-10 transition-opacity">
                        <Clock size={60} />
                    </div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider z-10">Avg. Response</span>
                    <div className="text-3xl font-bold text-slate-900 mt-1 z-10">4.2h</div>
                    <span className="text-xs text-green-600 font-medium mt-1 z-10">Within SLA targets</span>
                </Card>

                <Card className="flex flex-col justify-center p-4 border-l-4 border-l-indigo-500 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow bg-white rounded-xl">
                    <div className="absolute top-0 right-0 p-2 opacity-5 text-indigo-500 group-hover:opacity-10 transition-opacity">
                        <Users size={60} />
                    </div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider z-10">Field Units</span>
                    <div className="text-3xl font-bold text-slate-900 mt-1 z-10">12</div>
                    <span className="text-xs text-indigo-600 font-medium mt-1 z-10">Active in Ward C</span>
                </Card>
            </div>

            {/* 3. Main Split View (Ops Map + Feed) */}
            <div className="flex-1 min-h-0 grid grid-cols-12 gap-4 pb-2">

                {/* Left: Geospatial Ops (Map) - 66% width */}
                <Card className="col-span-8 p-0 border border-slate-200 shadow-sm overflow-hidden flex flex-col relative h-full rounded-2xl bg-white">
                    <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur px-3 py-1.5 rounded-md shadow-sm border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                        <MapIcon size={14} />
                        Live Situation Map
                    </div>
                    <div className="w-full h-full bg-slate-100 relative z-0">
                        {/* Pass a dummy high water level to show critical styling in map if needed */}
                        <DashboardMap waterLevel={15} />
                    </div>
                </Card>

                {/* Right: Tactics Column - 33% width */}
                <div className="col-span-4 flex flex-col gap-4 h-full min-h-0">

                    {/* Critical Feed */}
                    <Card className="flex-1 p-0 border border-slate-200 shadow-sm overflow-hidden flex flex-col rounded-2xl bg-white">
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                <Siren size={14} className="text-red-500" />
                                Priority Feed
                            </h3>
                            <Badge variant="neutral" className="bg-white border border-slate-200 text-slate-500 text-[10px]">REALTIME</Badge>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                            {CRITICAL_FEED.map(item => (
                                <div key={item.id} className={`
                                    p-3 rounded-xl border-l-4 transition-all cursor-pointer hover:bg-slate-50 border
                                    ${item.severity === 'critical' ? 'bg-red-50/30 border-slate-100 border-l-red-500' :
                                        item.severity === 'high' ? 'bg-amber-50/30 border-slate-100 border-l-amber-500' :
                                            'bg-white border-slate-100 border-l-slate-300'}
                                `}>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-xs font-bold uppercase tracking-tight 
                                            ${item.severity === 'critical' ? 'text-red-700' : 'text-slate-700'}
                                        `}>
                                            {item.type}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-800 leading-snug">
                                        {item.message}
                                    </p>
                                    <div className="flex justify-end mt-2">
                                        <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
                                            ACTION <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Analytics (Sparkline) */}
                    <Card className="h-48 p-4 shrink-0 rounded-2xl shadow-sm border border-slate-200 bg-white">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase">Flood Risk Trend</h3>
                                <div className="text-2xl font-bold text-slate-900 mt-1">High</div>
                            </div>
                            <div className="text-right">
                                <div className="text-red-600 font-bold text-sm flex items-center justify-end gap-1">
                                    <TrendingUp size={14} /> +12%
                                </div>
                                <div className="text-[10px] text-slate-400">vs. last 6 hours</div>
                            </div>
                        </div>
                        <div className="h-24 w-full">
                            {isMounted && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={SPARKLINE_DATA}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip cursor={false} content={<></>} />
                                        <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const FileTextIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);
