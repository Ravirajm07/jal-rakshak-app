import React, { useMemo } from 'react';
import { useData } from '@/lib/contexts/DataContext';
import { History, ArrowRight, BookOpen } from 'lucide-react';
import styles from './CityMemory.module.css';
import { Button } from '@/components/ui/Button';

// Mock Historical Database
const HISTORY_DB = [
    { year: 2021, month: 'July', level: 54.0, event: "Great Floods '21", impact: "City submerged. 15,000 evacuated.", severity: 'high' },
    { year: 2019, month: 'August', level: 46.5, event: "Monsoon Surge", impact: "Riverbanks breached. 2 Wards affected.", severity: 'high' },
    { year: 2023, month: 'August', level: 42.0, event: "Warning Event", impact: "Traffic halted on Shivaji Bridge.", severity: 'medium' },
    { year: 2022, month: 'September', level: 38.0, event: "Heavy Rainfall", impact: "Minor water logging in low areas.", severity: 'low' },
    { year: 2020, month: 'June', level: 35.0, event: "Early Monsoon", impact: "No significant impact.", severity: 'low' },
];

export const CityMemory = () => {
    const { waterData } = useData();
    const currentLevel = waterData.level;

    const matchedEvent = useMemo(() => {
        // Find the event with the smallest difference in water level
        return HISTORY_DB.reduce((prev, curr) => {
            return (Math.abs(curr.level - currentLevel) < Math.abs(prev.level - currentLevel) ? curr : prev);
        });
    }, [currentLevel]);

    const isWorse = currentLevel > matchedEvent.level;
    const diff = Math.abs(currentLevel - matchedEvent.level).toFixed(1);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <History size={16} />
                <span>City Memory • Historical Context</span>
            </div>

            <div className={styles.content}>
                <div className={styles.mainInfo}>
                    <h3 className={styles.title}>
                        Reminds us of {matchedEvent.month} {matchedEvent.year}
                    </h3>
                    <p className={styles.summary}>
                        Current conditions are similar to the <strong>{matchedEvent.event}</strong>.
                    </p>

                    <div className={`${styles.impact} ${matchedEvent.severity === 'high' ? styles.bad : ''}`}>
                        <BookOpen size={16} className="shrink-0 mt-0.5" />
                        <span>
                            <strong>Historical Impact:</strong> {matchedEvent.impact}
                        </span>
                    </div>
                </div>

                <div className={styles.comparisonBox}>
                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Then ({matchedEvent.year})</div>
                        <div className={styles.statValue}>{matchedEvent.level} ft</div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Now</div>
                        <div className={`${styles.statValue} ${styles.highlight}`}>{currentLevel} ft</div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.stat}>
                        <div className={styles.statLabel}>Difference</div>
                        <div className={styles.statValue} style={{ color: isWorse ? '#ef4444' : '#10b981' }}>
                            {isWorse ? '+' : '-'}{diff}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
