"use client";

import { useState, useMemo, useEffect } from "react";
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

// --- Advanced Logic Engines ---

type TrendType = 'Rising' | 'Falling' | 'Stable' | 'Volatile';
type RiskLevel = 'Critical' | 'High' | 'Moderate' | 'Low';
type TimeRange = 'day' | 'week' | 'year';

function analyzeTrend(values: number[]): TrendType {
    if (values.length < 2) return 'Stable';

    // Volatility check: High variance relative to range
    const max = Math.max(...values);
    const min = Math.min(...values);
    const end = values[values.length - 1];
    const start = values[0];

    const range = max - min;
    // If range is significant (>2) and end point is far from extremes or erratic
    if (range > 3 && (Math.abs(end - start) < range * 0.2)) return 'Volatile';

    const change = ((end - start) / start) * 100;

    if (change > 5) return 'Rising';
    if (change < -5) return 'Falling';
    return 'Stable';
}

function calculateVelocity(values: number[]): number {
    // Max hourly rise
    let maxRise = 0;
    for (let i = 1; i < values.length; i++) {
        const delta = values[i] - values[i - 1];
        if (delta > maxRise) maxRise = delta;
    }
    return parseFloat(maxRise.toFixed(2));
}

function generateInsight(range: TimeRange, levelData: any[], qualityData: any[]): string {
    const levels = levelData.map(d => d.level);
    const turbidities = qualityData.map(d => d.turbidity);

    const trend = analyzeTrend(levels);
    const currentLevel = levels[levels.length - 1];
    const maxLevel = Math.max(...levels);

    // Safety thresholds
    const DANGER_LEVEL = 16.0;
    const WARNING_LEVEL = 14.5;

    let risk: RiskLevel = 'Low';
    if (maxLevel >= DANGER_LEVEL) risk = 'Critical';
    else if (maxLevel >= WARNING_LEVEL) risk = 'High';
    else if (trend === 'Rising') risk = 'Moderate';

    // Dynamic Text Generation Pattern
    switch (range) {
        case 'day':
            const velocity = calculateVelocity(levels);
            const urgentPhrase = velocity > 0.5 ? `Rapid rise detected (${velocity}m/hr).` : "Velocity is stable.";

            return `Immediate Analysis: Water levels are ${trend} at ${currentLevel}m. ${urgentPhrase} Immediate risk is ${risk.toUpperCase()}. ${risk === 'Critical' ? "EVACUATION ADVISED." : "Monitor hourly updates for sudden spikes."
                }`;

        case 'week':
            const avgTurbidity = (turbidities.reduce((a, b) => a + b, 0) / turbidities.length).toFixed(1);
            return `Operational Status: 7-day trend is ${trend}. Highest recorded level was ${maxLevel}m. ${trend === 'Rising' ? "Mobilize response teams for potential overflow." : "Conditions are stabilizing within operational norms."
                } Turbidity average is ${avgTurbidity} NTU.`;

        case 'year':
            // Simple seasonality check simulation
            const monsoonPeak = levelData.find(d => ['Jul', 'Aug'].includes(d.month))?.level || 0;
            const isAbnormal = monsoonPeak > 18; // Historic norm

            return `Strategic Insight: Annual cycle indicates ${isAbnormal ? 'heavy' : 'normal'} monsoon seasonality. Peak observed in August (${monsoonPeak}m). Infrastructure load capacity was ${isAbnormal ? 'EXCEEDED' : 'sufficient'}. Long-term recommendation: ${isAbnormal ? 'Upgrade flood defenses in Sector 4.' : 'Maintain current maintenance schedule.'}`;
    }
}

// --- Data Constants (Raw Data Only) ---

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
            { time: "08:00", ph: 6.5, turbidity: 8 },
            { time: "12:00", ph: 6.8, turbidity: 6 },
            { time: "16:00", ph: 7.0, turbidity: 4 },
            { time: "20:00", ph: 7.2, turbidity: 3 },
            { time: "23:59", ph: 7.1, turbidity: 2 },
        ]
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
        ]
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
            { month: "Jul", ph: 6.5, turbidity: 15 },
            { month: "Aug", ph: 6.4, turbidity: 18 },
            { month: "Sep", ph: 6.8, turbidity: 10 },
            { month: "Oct", ph: 7.0, turbidity: 5 },
            { month: "Dec", ph: 7.3, turbidity: 1.5 },
        ]
    }
};

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<TimeRange>('week');
    // Prevent hydration mismatch and size calculation errors
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const currentData = DATA_SETS[timeRange];
    // Cast strict keys for Recharts to avoid type complaint, though it usually handles it.
    const xAxisKey = timeRange === 'day' ? 'time' : timeRange === 'year' ? 'month' : 'day';

    // Dynamic generation via memoization
    const systemAnalysisText = useMemo(() => {
        return generateInsight(timeRange, currentData.level, currentData.quality);
    }, [timeRange, currentData]);

    if (!isMounted) {
        return <div className="p-10 flex justify-center text-gray-400">Loading Analytics...</div>;
    }

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
                {/* Fixed height container for robustness */}
                <div className={styles.chartContainer} style={{ minHeight: '300px' }}>
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
                    {/* Fixed height container for robustness */}
                    <div className="h-[200px]" style={{ minHeight: '200px' }}>
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
                    {/* Fixed height container for robustness */}
                    <div className="h-[200px]" style={{ minHeight: '200px' }}>
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
                    <strong>({timeRange.toUpperCase()} VIEW):</strong> {systemAnalysisText}
                </p>
            </Card>
        </div>
    );
}
