import React, { useMemo } from 'react';
import { useData } from '@/lib/contexts/DataContext';
import { ShieldCheck, AlertOctagon, HelpCircle } from 'lucide-react';
import styles from './RiskMonitor.module.css';
import { calculateFloodRisk, classifyWaterSafety } from '@/lib/water-status';

export const RiskMonitor = () => {
    const { waterData, alerts } = useData();

    // Scoring Logic
    const scores = useMemo(() => {
        const activeAlerts = alerts.filter(a => a.severity === 'danger').length;
        const floodRisk = calculateFloodRisk({ level: waterData.level, activeDangerAlerts: activeAlerts });
        const safetyStatus = classifyWaterSafety(waterData.ph, waterData.turbidity);

        return {
            flood: {
                score: floodRisk.score,
                label: floodRisk.label,
                css: floodRisk.label === 'Critical' ? styles.critical : floodRisk.label === 'High' ? styles.high : floodRisk.label === 'Medium' ? styles.medium : styles.low
            },
            safety: {
                status: safetyStatus,
                css: safetyStatus === 'Critical' ? styles.high : safetyStatus === 'Warning' ? styles.medium : styles.low
            }
        };
    }, [waterData, alerts]);

    // CG calculation for circle
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scores.flood.score / 100) * circumference;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Severity Scoring</h3>
                <HelpCircle size={16} className="text-gray-400" />
            </div>

            <div className={styles.grid}>
                {/* Flood Risk Score */}
                <div className={styles.scoreCard}>
                    <div className={styles.scoreLabel}>Flood Risk Score</div>
                    <div className={styles.circleContainer}>
                        <svg width="100" height="100" className={styles.svgCircle}>
                            <circle cx="50" cy="50" r={radius} className={styles.bgCircle} />
                            <circle
                                cx="50" cy="50" r={radius}
                                className={styles.progressCircle}
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                stroke={scores.flood.score > 75 ? '#ef4444' : scores.flood.score > 50 ? '#f59e0b' : '#10b981'}
                            />
                        </svg>
                        <div className={styles.scoreValue}>{scores.flood.score}</div>
                    </div>
                    <div className={`${styles.riskLabel} ${scores.flood.css}`}>
                        {scores.flood.label}
                    </div>
                </div>

                {/* Water Safety Score */}
                <div className={styles.scoreCard}>
                    <div className={styles.scoreLabel}>Water Safety</div>
                    <div className={styles.safetyBox}>
                        {scores.safety.status === 'Safe' ? (
                            <ShieldCheck size={48} className="text-emerald-500 mb-2" />
                        ) : (
                            <AlertOctagon size={48} className={scores.safety.status === 'Critical' ? "text-red-500 mb-2" : "text-amber-500 mb-2"} />
                        )}
                        <div className={`${styles.riskLabel} ${scores.safety.css}`}>
                            {scores.safety.status}
                        </div>
                    </div>
                    <p className={styles.explanations}>
                        Based on pH ({waterData.ph}) and Turbidity ({waterData.turbidity})
                    </p>
                </div>
            </div>
        </div>
    );
};
