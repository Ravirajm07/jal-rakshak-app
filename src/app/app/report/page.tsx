"use client";

import { useData } from "@/lib/contexts/DataContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useRef } from "react";
import { CloudUpload, Search, MapPin, ArrowRight, AlertTriangle, Download, X, CheckCircle } from "lucide-react";
import styles from "./Report.module.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamic Import for Map
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400 text-sm">Loading Map...</div>
});

export default function ReportPage() {
    const { userRole, complaints, addComplaint, updateComplaintStatus } = useData();
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        type: "",
        location: "",
        description: "",
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Tracking State
    const [trackId, setTrackId] = useState("");
    const [trackingResult, setTrackingResult] = useState<any | null>(null);
    const [showTrackModal, setShowTrackModal] = useState(false);
    const [trackError, setTrackError] = useState("");

    // ADMIN VIEW - Allow admin to file reports too (Management removed as requested)
    // if (userRole === "admin") {
    //    return <AdminComplaintsView />;
    // }

    // Handlers
    const handleTrackReport = () => {
        if (!trackId.trim()) {
            setTrackError("Please enter a valid Reference ID");
            return;
        }

        // Search in complaints (including local state ones)
        const found = complaints.find(c => c.id.toString() === trackId.trim() || c._id === trackId.trim());

        if (found) {
            setTrackingResult(found);
            setShowTrackModal(true);
            setTrackError("");
        } else {
            setTrackError("Report not found. Please check the ID.");
            setTrackingResult(null);
        }
    };

    // CITIZEN VIEW
    return (
        <div className={styles.container}>

            {/* LEFT COLUMN: Report Form */}
            <div className={styles.leftColumn}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Report a Water Issue</h1>
                    <p className={styles.subtitle}>Help us keep our city safe and clean. Please provide accurate details below for a quick response.</p>
                </div>

                <Card className={styles.formCard}>
                    <form className={styles.form} onSubmit={(e) => {
                        e.preventDefault();
                        if (!formData.type || !formData.location || !formData.description) {
                            alert("Please fill in all required fields.");
                            return;
                        }
                        addComplaint({ ...formData, type: formData.type as any || 'Other' });
                        setFormData({ type: "", location: "", description: "" });
                        // Scroll to top or show success visual
                    }}>

                        {/* Type Selection */}
                        <div className={styles.formGroup}>
                            <label htmlFor="complaint-type" className={styles.label}>Complaint Type</label>
                            <select
                                id="complaint-type"
                                className={styles.select}
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select issue type</option>
                                <option value="Pipe Burst">Pipe Burst</option>
                                <option value="Water Logging">Water Logging</option>
                                <option value="Sewage Leak">Sewage Leak</option>
                                <option value="Quality Issue">Quality Issue</option>
                                <option value="Low Pressure">Low Pressure</option>
                            </select>
                        </div>

                        {/* Location Input */}
                        <div className={styles.formGroup}>
                            <label htmlFor="incident-location" className={styles.label}>Incident Location</label>
                            <div className={styles.locationRow}>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        id="incident-location"
                                        placeholder="Enter street address or landmark"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="button" className={styles.detectBtn} onClick={() => setFormData({ ...formData, location: "Detected: Ward A, Near Shivaji Market" })}>
                                    <MapPin size={18} style={{ marginRight: '0.5rem' }} /> Detect Location
                                </button>
                            </div>
                            {/* Map Preview */}
                            <div className={styles.mapPreview}>
                                <div className="w-full h-full">
                                    <MapComponent
                                        waterLevel={14}
                                        onLocationSelect={(lat, lng) => {
                                            setFormData(prev => ({ ...prev, location: `${lat.toFixed(4)}, ${lng.toFixed(4)}` }));
                                        }}
                                    />
                                </div>
                                {/* Overlay instruction to capture attention if needed, but Map is interactive */}
                                <div className={styles.mapLabel} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '4px 12px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '0.75rem', zIndex: 999 }}>Pin location on map</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className={styles.formGroup}>
                            <label htmlFor="complaint-description" className={styles.label}>Description</label>
                            <textarea
                                id="complaint-description"
                                className={styles.textarea}
                                placeholder="Describe the issue in detail (e.g. severity, duration, specific landmarks)..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        {/* File Upload */}
                        <div className={styles.formGroup}>
                            <label htmlFor="evidence-upload" className={styles.label}>Upload Evidence <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(Optional)</span></label>
                            <input
                                type="file"
                                id="evidence-upload"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/png, image/jpeg, image/gif, image/svg+xml"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        // Mock upload by just showing the name
                                        alert(`File selected: ${e.target.files[0].name}`);
                                    }
                                }}
                                style={{ display: 'none' }}
                            />
                            <div
                                className={styles.uploadBox}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className={styles.uploadIconCircle}>
                                    <CloudUpload size={20} />
                                </div>
                                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--primary)' }}>Click to upload <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>or drag and drop</span></p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>SVG, PNG, JPG or GIF (max. 10MB)</p>
                            </div>
                        </div>

                        <Button type="submit" fullWidth size="md">
                            Submit Report <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Button>
                    </form>
                </Card>
            </div>

            {/* RIGHT COLUMN: Status & Info */}
            <div className={styles.sidebar}>
                {/* Check Status Card */}
                <Card className={styles.statusCard}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
                            <Search size={24} />
                        </div>
                        <h3 className={styles.cardTitle}>Check Status</h3>
                    </div>
                    <p className={styles.cardText}>Already filed a report? Enter your reference ID to track its progress.</p>

                    <div className="relative mb-3">
                        <Input
                            placeholder="e.g., JR-1234"
                            value={trackId}
                            onChange={(e) => setTrackId(e.target.value)}
                        />
                    </div>
                    {trackError && <p className="text-xs text-red-500 mb-2">{trackError}</p>}

                    <Button variant="outline" fullWidth onClick={handleTrackReport}>
                        Track Report <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                    </Button>

                    <div className={styles.infoBox}>
                        <div className={styles.infoIcon}>i</div>
                        <p>Most complaints are reviewed within 24 hours. For emergencies, please call the hotline directly.</p>
                    </div>
                </Card>

                {/* Emergency Card */}
                <div className={styles.emergencyCard}>
                    <div style={{ flexShrink: 0 }}>
                        <AlertTriangle color="#ef4444" size={24} />
                    </div>
                    <div>
                        <h4 className={styles.emergencyTitle}>Emergency?</h4>
                        <p className={styles.emergencyText}>
                            If this is a severe flooding emergency causing immediate danger to life, call <strong>112</strong> immediately.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tracking Modal */}
            {showTrackModal && trackingResult && (
                <div className={styles.modalOverlay} onClick={() => setShowTrackModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Report Status #{trackingResult.id}</h3>
                            <button className={styles.closeBtn} onClick={() => setShowTrackModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                <div className={`p-2 rounded-full ${trackingResult.status === 'Resolved' ? 'bg-green-100 text-green-600' :
                                    trackingResult.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                                        'bg-amber-100 text-amber-600'
                                    }`}>
                                    {trackingResult.status === 'Resolved' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{trackingResult.status}</h4>
                                    <p className="text-xs text-slate-500">Updated recently</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Type</label>
                                    <p className="font-medium text-slate-800">{trackingResult.type}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Description</label>
                                    <p className="text-sm text-slate-600">{trackingResult.description}</p>
                                </div>
                                {trackingResult.adminResponse && (
                                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-md">
                                        <label className="text-xs font-semibold text-blue-600 uppercase mb-1 block">Officer Response</label>
                                        <p className="text-sm text-slate-700">{trackingResult.adminResponse}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <Button onClick={() => setShowTrackModal(false)}>Close</Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

// ------ ADMIN COMPONENT ------
function AdminComplaintsView() {
    const { complaints, updateComplaintStatus } = useData();
    const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
    const [responseStatus, setResponseStatus] = useState("In Progress");
    const [responseText, setResponseText] = useState("");

    const handleOpenModal = (complaint: any) => {
        setSelectedComplaint(complaint);
        setResponseStatus(complaint.status);
        setResponseText(complaint.adminResponse || "");
    };

    const handleCloseModal = () => {
        setSelectedComplaint(null);
        setResponseText("");
    };

    const handleSubmitUpdate = () => {
        if (selectedComplaint) {
            updateComplaintStatus(selectedComplaint.id, responseStatus as any, responseText);
            handleCloseModal();
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Resolved': return { bg: '#ecfdf5', text: '#065f46', dot: '#059669' }; // green
            case 'Open': return { bg: '#eff6ff', text: '#1e40af', dot: '#2563eb' }; // blue
            default: return { bg: '#fffbeb', text: '#92400e', dot: '#d97706' }; // amber
        }
    };

    const handleExport = () => {
        if (!complaints.length) return;

        // Create CSV Header
        const headers = ["ID", "Type", "Location", "Status", "Admin Response", "Description"];

        // Map Data
        const rows = complaints.map(c => [
            c.id,
            `"${c.type}"`, // Quote to handle commas
            `"${c.location}"`,
            c.status,
            `"${c.adminResponse || ''}"`,
            `"${c.description || ''}"`
        ]);

        // Combine
        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        // Trigger Download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `jalrakshak_complaints_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className={styles.adminHeader}>
                <div>
                    <h1 className={styles.adminTitle}>Complaint Management</h1>
                    <div className={styles.lastUpdated}>
                        <span className="animate-spin">Wait</span>
                        Last updated: Just now
                    </div>
                </div>
                <Button onClick={handleExport}>
                    <Download size={16} style={{ marginRight: '0.5rem' }} /> Export Data
                </Button>
            </div>

            {/* Filters */}
            <Card className={styles.filtersCard}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or Location"
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <select className={styles.filterSelect}>
                        <option>Type: All</option>
                    </select>
                    <select className={styles.filterSelect}>
                        <option>Status: All</option>
                    </select>
                    <Button variant="ghost">Reset Filters</Button>
                </div>
            </Card>

            {/* Table */}
            <Card className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Type</th>
                            <th className={styles.th}>Location</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>Admin Note</th>
                            <th className={styles.th} style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.length > 0 ? complaints.map((c) => {
                            const colors = getStatusColor(c.status);
                            return (
                                <tr key={c.id} className={styles.tr}>
                                    <td className={styles.td} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>#{c.id}</td>
                                    <td className={styles.td}>{c.type}</td>
                                    <td className={styles.td}>{c.location}</td>
                                    <td className={styles.td}>
                                        <span className={styles.statusPill} style={{ backgroundColor: colors.bg, color: colors.text }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors.dot, marginRight: '6px' }}></span>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className={styles.td} style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {c.adminResponse || "-"}
                                    </td>
                                    <td className={styles.td} style={{ textAlign: 'right' }}>
                                        <Button size="sm" variant="outline" onClick={() => handleOpenModal(c)}>
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No complaints found</td></tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {/* Update Modal */}
            {selectedComplaint && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Update Complaint #{selectedComplaint.id}</h3>
                            <button className={styles.closeBtn} onClick={handleCloseModal}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Update Status</label>
                                <select
                                    className={styles.select}
                                    value={responseStatus}
                                    onChange={(e) => setResponseStatus(e.target.value)}
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Admin Response / Note</label>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Enter details about the action taken (e.g., Cleaned 2km radius)..."
                                    value={responseText}
                                    onChange={(e) => setResponseText(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <Button variant="ghost" onClick={handleCloseModal}>Cancel</Button>
                            <Button onClick={handleSubmitUpdate}>Save Update</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
