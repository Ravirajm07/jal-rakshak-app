import React, { useMemo } from 'react';
import { useData } from '@/lib/contexts/DataContext';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, CheckCircle, Info, Megaphone, ShieldAlert, Activity } from 'lucide-react';
import styles from './DecisionPanel.module.css';

export const DecisionPanel = () => {
    const { waterData, alerts, complaints } = useData();

    // Decision Logic Engine
    const decision = useMemo(() => {
        const activeFloods = alerts.some(a => a.severity === 'danger');
        const highComplaints = complaints.filter(c => c.status === 'Open').length > 5;

        // CRITICAL Level
        if (waterData.level > 45 || activeFloods) {
            return {
                status: 'critical',
                label: 'CRITICAL SITUATION DETECTED',
                icon: <ShieldAlert size={28} className="text-red-600" />,
                message: `Water level is at ${waterData.level}ft, crossing the danger mark. Immediate evacuation protocol required.`,
                actions: [
                    "Issue district-wide Red Alert via Broadcast System.",
                    "Deploy NDRF teams to Panchganga riverbanks.",
                    "Activate relief camps in Ward C and D."
                ],
                colorClass: styles.critical
            };
        }

        // WARNING Level
        if (waterData.level > 40 || highComplaints) {
            return {
                status: 'warning',
                label: 'WARNING: ACTION REQUIRED',
                icon: <AlertTriangle size={28} className="text-amber-600" />,
                message: highComplaints
                    ? `Unusual spike in complaints (${complaints.length} open). Possible infrastructure failure.`
                    : `Water level rising (${waterData.level}ft). Precautionary measures advised.`,
                actions: [
                    "Notify Ward Officers to inspect drainage lines.",
                    "Put emergency response teams on standby.",
                    "Issue advisory to citizens in low-lying areas."
                ],
                colorClass: styles.warning
            };
        }

        // NORMAL Level
        return {
            status: 'normal',
            label: 'SYSTEM STATUS: NORMAL',
            icon: <CheckCircle size={28} className="text-emerald-600" />,
            message: "All parameters are within safe limits. Routine monitoring in progress.",
            actions: [
                "Continue scheduled sensor maintenance.",
                "Review daily logs at 18:00 hrs.",
                "Verify backup power systems."
            ],
            colorClass: styles.normal
        };
    }, [waterData, alerts, complaints]);

    const handleAcknowledge = () => {
        alert("Recommendation Acknowledged. Action Logged.");
    };

    return (
        <div className={`${styles.panel} ${decision.colorClass}`}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <div className={styles.icon}>
                        {decision.icon}
                    </div>
                    <div>
                        <h2 className={styles.title}>What Should We Do NOW?</h2>
                        <p className={styles.subtitle}>AI-Assisted Action Recommendations</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    {decision.status === 'critical' && (
                        <span className="animate-pulse bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
                            LIVE THREAT
                        </span>
                    )}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.statusBox}>
                    <div className={styles.statusLabel}>{decision.label}</div>
                    <div className={styles.statusMessage}>
                        {decision.message}
                    </div>
                </div>

                <div className={styles.actionBox}>
                    <div className={styles.actionTitle}>
                        <Activity size={16} /> Recommended Actions
                    </div>
                    <ul className={styles.actionList}>
                        {decision.actions.map((action, idx) => (
                            <li key={idx} className={styles.actionItem}>
                                <div className={styles.bullet}></div>
                                <span>{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.actions}>
                <Button variant="outline" size="sm" onClick={handleAcknowledge}>
                    Acknowledge
                </Button>
                {decision.status !== 'normal' && (
                    <Button variant="danger" size="sm">
                        <Megaphone size={16} style={{ marginRight: '8px' }} />
                        <span>Initiate Action</span>
                    </Button>
                )}
            </div>
        </div>
    );
};
