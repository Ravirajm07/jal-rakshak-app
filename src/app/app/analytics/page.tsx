"use client";

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

const LEVEL_DATA = [
    { day: "Mon", level: 12.5 },
    { day: "Tue", level: 13.2 },
    { day: "Wed", level: 14.8 },
    { day: "Thu", level: 15.5 },
    { day: "Fri", level: 14.2 },
    { day: "Sat", level: 13.8 },
    { day: "Sun", level: 14.2 },
];

const QUALITY_DATA = [
    { day: "Mon", ph: 7.0, turbidity: 2 },
    { day: "Tue", ph: 7.2, turbidity: 3 },
    { day: "Wed", ph: 6.8, turbidity: 5 },
    { day: "Thu", ph: 6.5, turbidity: 8 },
    { day: "Fri", ph: 7.1, turbidity: 4 },
    { day: "Sat", ph: 7.3, turbidity: 2 },
    { day: "Sun", ph: 7.2, turbidity: 2.5 },
];

export default function AnalyticsPage() {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.title}>Detailed Analytics</h1>
                <p className={styles.subtitle}>Historical data and trends for Panchganga River</p>
            </div>

            <Card>
                <div className="mb-4">
                    <CardTitle>Water Level Trend (7 Days)</CardTitle>
                    <CardDescription>Measured in meters. Flood danger mark at 16m.</CardDescription>
                </div>
                <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={LEVEL_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" style={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <div className="mb-4">
                        <CardTitle>pH Levels</CardTitle>
                        <CardDescription>Acidity/Alkalinity trend.</CardDescription>
                    </div>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={QUALITY_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" style={{ fontSize: 10 }} />
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
                        <CardDescription>NTU values over the week.</CardDescription>
                    </div>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={QUALITY_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" style={{ fontSize: 10 }} />
                                <YAxis style={{ fontSize: 10 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="turbidity" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <Card className="bg-blue-50 border-blue-100">
                <CardTitle className="text-blue-900">System Analysis</CardTitle>
                <p className="text-sm text-blue-800 mt-2 leading-relaxed">
                    Based on the past 7 days of data, the water level has shown a <strong>moderate increase (Trend: Rising)</strong> due to recent rainfall in the catchment area.
                    However, quality parameters (pH and Turbidity) remain within safe limits.
                    Citizens are advised to stay alert for flood warnings if levels cross 15.5m.
                </p>
            </Card>
        </div>
    );
}
