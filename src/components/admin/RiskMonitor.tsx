import React, { useMemo } from 'react';
import { useData } from '@/lib/contexts/DataContext';
import { ShieldCheck, AlertOctagon, HelpCircle } from 'lucide-react';
import styles from './RiskMonitor.module.css';

export const RiskMonitor = () => {
    const { waterData, alerts } = useData();

    // Scoring Logic
    const scores = useMemo(() => {
        // 1. Flood Risk Score (0-100)
        // Base calculation: (Level / DangerLevel) * 100
        const DANGER_LEVEL = 45;
        let floodScore = (waterData.level / DANGER_LEVEL) * 100;

        // Modifiers
        const activeAlerts = alerts.filter(a => a.severity === 'danger').length;
        floodScore += (activeAlerts * 10); // +10 per severe alert

        // Cap at 100
        floodScore = Math.min(Math.round(floodScore), 100);

        // Determine Flood Risk Label
        let floodLabel = 'Low';
        let floodClass = styles.low;
        if (floodScore > 90) { floodLabel = 'Critical'; floodClass = styles.critical; }
        else if (floodScore > 75) { floodLabel = 'High'; floodClass = styles.high; }
        else if (floodScore > 50) { floodLabel = 'Medium'; floodClass = styles.medium; }

        // 2. Water Safety Score
        // Simple logic: Is pH or Turbidity bad?
        const isPhBad = waterData.ph < 6.5 || waterData.ph > 8.5;
        const isTurbidityBad = waterData.turbidity > 5;

        let safetyStatus = 'Safe';
        let safetyClass = styles.low; // Reusing low (green) for safe

        if (isPhBad && isTurbidityBad) {
            safetyStatus = 'Critical';
            safetyClass = styles.high;
        } else if (isPhBad || isTurbidityBad) {
            safetyStatus = 'Warning';
            safetyClass = styles.medium;
        }

        return {
            flood: { score: floodScore, label: floodLabel, css: floodClass },
            safety: { status: safetyStatus, css: safetyClass }
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
