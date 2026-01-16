"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import styles from "./Analytics.module.css";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";

// --- Data Constants ---

const DATA_SETS = {
    day: {
        level: [
            { time: "00:00", level: 12.0 },
            { time: "04:00", level: 12.2 },
            { time: "08:00", level: 13.5 }, // Flash flood spike simulation
            { time: "12:00", level: 14.8 },
            { time: "16:00", level: 14.5 },
            { time: "20:00", level: 13.0 },
            { time: "23:59", level: 12.8 },
        ],
        quality: [
            { time: "00:00", ph: 7.1, turbidity: 2 },
            { time: "04:00", ph: 7.0, turbidity: 2.5 },
            { time: "08:00", ph: 6.5, turbidity: 8 }, // Rain impact
            { time: "12:00", ph: 6.8, turbidity: 6 },
            { time: "16:00", ph: 7.0, turbidity: 4 },
            { time: "20:00", ph: 7.2, turbidity: 3 },
            { time: "23:59", ph: 7.1, turbidity: 2 },
        ],
        analysis: "Immediate Analysis: Sudden water level spike observed at 08:00 due to heavy morning rainfall. Turbidity increased significantly but is currently stabilizing. Proceed with caution."
    },
    week: {
        level: [
            { day: "Mon", level: 12.5 },
            { day: "Tue", level: 13.2 },
            { day: "Wed", level: 14.8 },
            { day: "Thu", level: 15.5 },
            { day: "Fri", level: 14.2 },
            { day: "Sat", level: 13.8 },
            { day: "Sun", level: 14.2 },
        ],
        quality: [
            { day: "Mon", ph: 7.0, turbidity: 2 },
            { day: "Tue", ph: 7.2, turbidity: 3 },
            { day: "Wed", ph: 6.8, turbidity: 5 },
            { day: "Thu", ph: 6.5, turbidity: 8 },
            { day: "Fri", ph: 7.1, turbidity: 4 },
            { day: "Sat", ph: 7.3, turbidity: 2 },
            { day: "Sun", ph: 7.2, turbidity: 2.5 },
        ],
        analysis: "Weekly Trend: Water levels peaked on Thursday (15.5m), approaching the danger mark. Quality metrics show a correlation between level rise and turbidity spikes. Ensure drainage checks."
    },
    year: {
        level: [
            { month: "Jan", level: 10.0 },
            { month: "Mar", level: 11.5 },
            { month: "May", level: 12.0 },
            { month: "Jul", level: 18.5 }, // Peak Monsoon
            { month: "Aug", level: 19.2 }, // Danger!
            { month: "Sep", level: 16.0 },
            { month: "Oct", level: 14.0 },
            { month: "Dec", level: 11.0 },
        ],
        quality: [
            { month: "Jan", ph: 7.4, turbidity: 1 },
            { month: "Mar", ph: 7.2, turbidity: 2 },
            { month: "May", ph: 7.0, turbidity: 3 },
            { month: "Jul", ph: 6.5, turbidity: 15 }, // Muddy
            { month: "Aug", ph: 6.4, turbidity: 18 },
            { month: "Sep", ph: 6.8, turbidity: 10 },
            { month: "Oct", ph: 7.0, turbidity: 5 },
            { month: "Dec", ph: 7.3, turbidity: 1.5 },
        ],
        analysis: "Annual Pattern: Consistent monsoon spikes (July-August) observed repeatedly. Long-term data suggests identifying flood plains for evacuation during Q3. Water quality is excellent in Q1 and Q4."
    }
};

type TimeRange = 'day' | 'week' | 'year';

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<TimeRange>('week');

    const currentData = DATA_SETS[timeRange];
    const xAxisKey = timeRange === 'day' ? 'time' : timeRange === 'year' ? 'month' : 'day';

    return (
        <div className={styles.container}>
            {/* Header with Selector */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                <div>
                    <h1 className={styles.title}>Detailed Analytics</h1>
                    <p className={styles.subtitle}>Historical data and trends for Panchganga River</p>
                </div>

                {/* Time Range Selector */}
                <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex items-center">
                    {['day', 'week', 'year'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range as TimeRange)}
                            className={`
                               px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize
                               ${timeRange === range
                                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                           `}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <Card>
                <div className="mb-4">
                    <CardTitle>Water Level Trend ({timeRange === 'day' ? '24 Hours' : timeRange === 'year' ? '12 Months' : '7 Days'})</CardTitle>
                    <CardDescription>Measured in meters. Flood danger mark at 16m.</CardDescription>
                </div>
                <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentData.level}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey={xAxisKey} style={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis domain={[0, 20]} style={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="level"
                                stroke="var(--primary)"
                                fill="var(--primary-light)"
                                strokeWidth={2}
                            />
                            {/* Danger Line */}
                            <Line type="monotone" dataKey={() => 16} stroke="var(--danger)" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex gap-2 mt-4 text-xs text-slate-500">
                    <Badge variant="danger">--- Danger Line (16m)</Badge>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                    <div className="mb-4">
                        <CardTitle>pH Levels</CardTitle>
                        <CardDescription>Acidity/Alkalinity trend.</CardDescription>
                    </div>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={currentData.quality}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey={xAxisKey} style={{ fontSize: 10 }} />
                                <YAxis domain={[0, 14]} style={{ fontSize: 10 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="ph" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <div className="mb-4">
                        <CardTitle>Turbidity (Cloudiness)</CardTitle>
                        <CardDescription>NTU values over the {timeRange}.</CardDescription>
                    </div>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={currentData.quality}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey={xAxisKey} style={{ fontSize: 10 }} />
                                <YAxis style={{ fontSize: 10 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="turbidity" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <Card className="bg-blue-50 border-blue-100 mt-6 md:mt-4">
                <CardTitle className="text-blue-900">System Analysis</CardTitle>
                <p className="text-sm text-blue-800 mt-2 leading-relaxed">
                    <strong>({timeRange.toUpperCase()} VIEW):</strong> {currentData.analysis}
                </p>
            </Card>
        </div>
    );
}
