"use client";

import { useState, useEffect } from "react";
import styles from "./Camera.module.css";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Maximize2, VolumeX, AlertCircle, RefreshCw, Video, Activity, ShieldCheck, Plus, X, Trash2 } from "lucide-react";

interface CameraFeed {
    id: string;
    location: string;
    status: 'live' | 'offline' | 'maintenance';
    viewers: number;
    color: string; // To simulate different feeds
    url?: string;
    type: 'simulated' | 'ip';
}

const INITIAL_CAMERAS: CameraFeed[] = [
    { id: 'CAM-01', location: 'Panchganga Ghat (North)', status: 'live', viewers: 124, color: '#1e293b', type: 'simulated' },
    { id: 'CAM-02', location: 'Rankala Tower', status: 'live', viewers: 85, color: '#0f172a', type: 'simulated' },
    { id: 'CAM-03', location: 'Shiroli Bridge', status: 'maintenance', viewers: 0, color: '#334155', type: 'simulated' },
    { id: 'CAM-04', location: 'Bapat Camp Low-lying', status: 'live', viewers: 210, color: '#172554', type: 'simulated' },
    { id: 'CAM-05', location: 'Market Yard Sump', status: 'live', viewers: 45, color: '#1e1b4b', type: 'simulated' },
    { id: 'CAM-06', location: 'City Entrance', status: 'offline', viewers: 0, color: '#000000', type: 'simulated' },
];

export default function CameraPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [cameras, setCameras] = useState<CameraFeed[]>(INITIAL_CAMERAS);
    const [showModal, setShowModal] = useState(false);
    const [newCam, setNewCam] = useState({ location: '', ip: '' });

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

    const handleAddCamera = () => {
        if (!newCam.location || !newCam.ip) {
            alert("Please enter both location and IP/URL");
            return;
        }

        // Auto-format IP to MJPEG URL if just IP is provided (Common for IP Webcam App)
        // e.g., 192.168.1.5 -> http://192.168.1.5:8080/video
        let streamUrl = newCam.ip;
        if (!streamUrl.startsWith('http')) {
            // Assume typical specific port for IP Webcam if only IP is given, or just try to use as is if they know what they are doing.
            // But usually users just type IP. Let's make it easy for "IP Webcam" Android app which is common.
            // Defaulting to typical pattern: http://<IP>:8080/video
            streamUrl = `http://${newCam.ip}:8080/video`;
        }

        const newFeed: CameraFeed = {
            id: `IP-${Date.now()}`,
            location: newCam.location,
            status: 'live',
            viewers: 1,
            color: '#000',
            type: 'ip',
            url: streamUrl
        };

        setCameras(prev => [newFeed, ...prev]);
        setNewCam({ location: '', ip: '' });
        setShowModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Live Surveillance</h1>
                    <p className={styles.subtitle}>Real-time CCTV feeds from critical flood monitoring zones.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => setShowModal(true)}>
                        <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add Camera
                    </Button>
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
                        <div className={styles.statValue}>{cameras.filter(c => c.status === 'live').length} / {cameras.length}</div>
                        <div className={styles.statLabel}>Active Cameras</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div style={{ padding: '0.75rem', background: '#ffe4e6', borderRadius: '50%', color: '#e11d48' }}>
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className={styles.statValue}>{464 + cameras.filter(c => c.type === 'ip').length}</div>
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
                {cameras.map((cam) => (
                    <div key={cam.id} className={styles.cameraCard}>
                        {cam.status === 'live' ? (
                            <div className={styles.feedPlaceholder} style={{ background: cam.type === 'ip' ? '#000' : `linear-gradient(45deg, ${cam.color}, #000)` }}>
                                {cam.type === 'ip' && cam.url ? (
                                    <img
                                        src={cam.url}
                                        alt={cam.location}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.style.display = 'none';
                                            // Append a text error
                                            img.parentElement!.innerHTML = `<div style="color: #ef4444; font-size: 0.75rem; text-align: center; padding: 1rem;">
                                                <p style="font-weight: 700; margin-bottom: 0.25rem;">Connection Failed</p>
                                                <p>Check IP or ensure Mixed Content is allowed.</p>
                                            </div>`;
                                        }}
                                    />
                                ) : (
                                    /* Simulated Content */
                                    <div style={{ opacity: 0.1 }}>
                                        <Video size={64} />
                                    </div>
                                )}
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
                                <button
                                    className={styles.controlBtn}
                                    title="Remove Camera"
                                    onClick={() => setCameras(prev => prev.filter(c => c.id !== cam.id))}
                                    style={{ color: '#f87171' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Camera Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Add IP Camera</h3>
                            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Camera Location / Name</label>
                                <Input
                                    className={styles.input}
                                    placeholder="e.g. Mobile Feed 1"
                                    value={newCam.location}
                                    onChange={(e) => setNewCam({ ...newCam, location: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Camera IP Address or URL</label>
                                <Input
                                    className={styles.input}
                                    placeholder="e.g. 192.168.29.45"
                                    value={newCam.ip}
                                    onChange={(e) => setNewCam({ ...newCam, ip: e.target.value })}
                                />
                                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                                    <b>Tip:</b> If using &quot;IP Webcam&quot; app, just enter the IP (e.g. 192.168.1.5).
                                    <br />
                                    Constructed URL: <code style={{ background: '#eee', padding: '2px 4px', borderRadius: '4px' }}>{
                                        !newCam.ip ? '...' :
                                            newCam.ip.startsWith('http') ? newCam.ip : `http://${newCam.ip}:8080/video`
                                    }</code>
                                </p>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button variant="outline" onClick={() => {
                                const url = !newCam.ip ? '' : newCam.ip.startsWith('http') ? newCam.ip : `http://${newCam.ip}:8080/video`;
                                if (url) window.open(url, '_blank');
                            }}>Test Link</Button>
                            <Button onClick={handleAddCamera}>Join & Show</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
