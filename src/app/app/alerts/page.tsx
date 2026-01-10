"use client";

import styles from "./Alerts.module.css";
import { useData } from "@/lib/contexts/DataContext";
import { AlertTriangle, CheckCircle, Clock, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AlertsPage() {
    const { alerts } = useData();

    const getIcon = (severity: string) => {
        switch (severity) {
            case "danger": return <AlertTriangle className="text-red-500" size={24} />;
            case "warning": return <AlertTriangle className="text-amber-500" size={24} />;
            case "safe": return <CheckCircle className="text-green-500" size={24} />;
            default: return <Bell className="text-blue-500" size={24} />;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Bell className="text-blue-600" />
                <h1>Alerts & Notifications</h1>
            </div>

            <div className={styles.alertList}>
                {alerts.map((alert) => (
                    <div key={alert.id} className={cn(styles.alertCard, styles[alert.severity])}>
                        <div className={styles.iconWrapper}>
                            {getIcon(alert.severity)}
                        </div>
                        <div className={styles.content}>
                            <div className={styles.header}>
                                {/* Infer title from severity if generic, or use a map */}
                                <h3 className={styles.headline}>
                                    {alert.severity === 'danger' ? 'Critical Alert' :
                                        alert.severity === 'warning' ? 'Warning' : 'System Notice'}
                                </h3>
                                <span className={cn(styles.badge, styles[alert.severity])}>
                                    {alert.severity}
                                </span>
                            </div>
                            <p className={styles.message}>{alert.message}</p>
                            <p className={styles.timestamp}>
                                <Clock size={12} />
                                Issued: {alert.timestamp}
                            </p>
                        </div>
                    </div>
                ))}

                {alerts.length === 0 && (
                    <div className={styles.emptyState}>
                        <Bell size={48} className="mx-auto mb-4 text-slate-300" />
                        <p>No active alerts at this time.</p>
                        <p className="text-sm mt-1">You're all safe!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
