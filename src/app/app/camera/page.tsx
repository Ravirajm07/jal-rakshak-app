"use client";

import { useState, useEffect } from "react";
import styles from "./Camera.module.css";
import { Button } from "@/components/ui/Button";
import { Maximize2, VolumeX, AlertCircle, RefreshCw, Video, Activity, ShieldCheck } from "lucide-react";

interface CameraFeed {
    id: string;
    location: string;
    status: 'live' | 'offline' | 'maintenance';
    viewers: number;
    color: string; // To simulate different feeds
}

const CAMERAS: CameraFeed[] = [
    { id: 'CAM-01', location: 'Panchganga Ghat (North)', status: 'live', viewers: 124, color: '#1e293b' },
    { id: 'CAM-02', location: 'Rankala Tower', status: 'live', viewers: 85, color: '#0f172a' },
    { id: 'CAM-03', location: 'Shiroli Bridge', status: 'maintenance', viewers: 0, color: '#334155' },
    { id: 'CAM-04', location: 'Bapat Camp Low-lying', status: 'live', viewers: 210, color: '#172554' },
    { id: 'CAM-05', location: 'Market Yard Sump', status: 'live', viewers: 45, color: '#1e1b4b' },
    { id: 'CAM-06', location: 'City Entrance', status: 'offline', viewers: 0, color: '#000000' },
];

export default function CameraPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Live Surveillance</h1>
                    <p className={styles.subtitle}>Real-time CCTV feeds from critical flood monitoring zones.</p>
                </div>
                <div>
                    <Button variant="outline">
                        <RefreshCw size={16} style={{ marginRight: '0.5rem' }} /> Refresh Feeds
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsRow}>
                <div className={styles.statCard}>
                    <div style={{ padding: '0.75rem', background: '#dbeafe', borderRadius: '50%', color: '#2563eb' }}>
                        <Video size={24} />
                    </div>
                    <div>
                        <div className={styles.statValue}>{CAMERAS.filter(c => c.status === 'live').length} / {CAMERAS.length}</div>
                        <div className={styles.statLabel}>Active Cameras</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div style={{ padding: '0.75rem', background: '#ffe4e6', borderRadius: '50%', color: '#e11d48' }}>
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className={styles.statValue}>464</div>
                        <div className={styles.statLabel}>Total Viewers</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div style={{ padding: '0.75rem', background: '#dcfce7', borderRadius: '50%', color: '#16a34a' }}>
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <div className={styles.statValue}>Secure</div>
                        <div className={styles.statLabel}>Network Status</div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className={styles.grid}>
                {CAMERAS.map((cam) => (
                    <div key={cam.id} className={styles.cameraCard}>
                        {cam.status === 'live' ? (
                            <div className={styles.feedPlaceholder} style={{ background: `linear-gradient(45deg, ${cam.color}, #000)` }}>
                                {/* Simulated Content */}
                                <div style={{ opacity: 0.1 }}>
                                    <Video size={64} />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.feedPlaceholder} style={{ background: '#111' }}>
                                <div className={styles.offlineMessage}>
                                    <AlertCircle size={32} />
                                    <span>{cam.status === 'maintenance' ? 'MAINTENANCE MODE' : 'SIGNAL LOST'}</span>
                                </div>
                            </div>
                        )}

                        {/* Top Overlay */}
                        <div className={styles.overlayTop}>
                            <div className={styles.locationBadge}>
                                <Video size={14} /> {cam.location}
                            </div>
                            {cam.status === 'live' && (
                                <div className={styles.liveIndicator}>
                                    <div className={styles.recIndicator}></div> REC
                                </div>
                            )}
                        </div>

                        {/* Bottom Overlay */}
                        <div className={styles.overlayBottom}>
                            <div>
                                <div className={styles.timestamp}>{formatDate(currentTime)} {formatTime(currentTime)}</div>
                                {cam.status === 'live' && <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{cam.viewers} watching now</div>}
                            </div>
                            <div className={styles.controls}>
                                <button className={styles.controlBtn} title="Mute"><VolumeX size={16} /></button>
                                <button className={styles.controlBtn} title="Fullscreen"><Maximize2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
