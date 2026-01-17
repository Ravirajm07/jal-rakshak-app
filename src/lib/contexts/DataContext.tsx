"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
    onAuthStateChanged,
    signOut,
    User
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // Only import auth
import { useRouter } from "next/navigation";
import { ToastContainer } from "@/components/ui/Toast";
import { LocalNotifications } from '@capacitor/local-notifications';

// Define Types
type UserRole = "citizen" | "admin" | null;

interface WaterData {
    level: number;
    ph: number;
    turbidity: number;
}

interface Alert {
    id: number;
    message: string;
    severity: "warning" | "danger" | "safe";
    timestamp: string;
}

export interface Complaint {
    _id: string; // MongoDB ID
    id: string; // Frontend compatibility
    type: "Pipe Burst" | "Water Logging" | "Sewage Leak" | "Quality Issue" | "Other" | "System Alert";
    location: string;
    status: "Open" | "In Progress" | "Resolved";
    description?: string;
    adminResponse?: string;
    createdAt?: string;
    userId?: string;
    userEmail?: string;
}

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    type: "success" | "warning" | "info" | "error";
    read: boolean;
    time: string;
}

interface DataContextType {
    userRole: UserRole;
    user: User | null;
    waterData: WaterData;
    alerts: Alert[];
    complaints: Complaint[];
    login: (role: UserRole) => Promise<void>;
    logout: () => Promise<void>;
    addComplaint: (complaint: Omit<Complaint, "_id" | "id" | "status" | "createdAt"> & { id?: string }) => Promise<void>;
    updateComplaintStatus: (id: string, status: Complaint["status"], adminResponse?: string) => Promise<void>;
    loading: boolean;
    isDemoMode: boolean;
    toggleDemoMode: () => void;
    setDemoRole: (role: UserRole) => void;
    notifications: AppNotification[];
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Simulated Data State
    const [waterData, setWaterData] = useState<WaterData>({ level: 45.2, ph: 7.2, turbidity: 2.1 });
    const [alerts] = useState<Alert[]>([
        { id: 1, message: "Flood Warning: Panchganga River level rising above 45ft.", severity: "danger", timestamp: "10 mins ago" },
        { id: 2, message: "Safe drinking water supply restored in Ward C.", severity: "safe", timestamp: "2 hours ago" },
    ]);

    // Demo Complaints Data
    const DEMO_COMPLAINTS: Complaint[] = [
        { _id: '1', id: '1', type: 'Pipe Burst', location: 'Ward A, Main Sq', description: 'Major pipe burst near market', status: 'In Progress', createdAt: new Date().toISOString(), userId: 'demo_user', userEmail: 'citizen@demo.com' },
        { _id: '2', id: '2', type: 'Water Logging', location: 'Ward B, Lane 4', description: 'Stagnant water since yesterday', status: 'Open', createdAt: new Date(Date.now() - 86400000).toISOString(), userId: 'demo_user', userEmail: 'citizen@demo.com' },
        { _id: '3', id: '3', type: 'System Alert', location: 'System', description: 'Sensor malfunction in Sector 4', status: 'Open', createdAt: new Date().toISOString(), userId: 'admin', userEmail: 'admin@system.com' },
    ];

    // Notification State
    const [notifications, setNotifications] = useState<AppNotification[]>([
        { id: "101", title: "Welcome", message: "Welcome to JalRakshak! Report issues to help us.", type: "info", read: false, time: "Just now" }
    ]);

    const [complaints, setComplaints] = useState<Complaint[]>([]);

    // Demo Mode State
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [demoRole, setDemoRole] = useState<UserRole>("citizen");

    // Firebase Auth Listener
    useEffect(() => {
        // Hydrate from LocalStorage first to prevent redirect on refresh
        const savedRole = localStorage.getItem('user_role');
        if (savedRole) {
            setUserRole(savedRole as UserRole);
            setLoading(false); // Valid role found, stop loading immediately
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const role = currentUser.email?.includes("admin") ? "admin" : "citizen";
                setUserRole(role);
                localStorage.setItem('user_role', role);
            } else {
                // Only clear if we are NOT in demo mode (manual demo mode persistence handles otherwise)
                if (!localStorage.getItem('is_demo_mode')) {
                    setUserRole(null);
                    localStorage.removeItem('user_role');
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Effect to handle demo mode overrides
    const effectiveRole = isDemoMode ? demoRole : userRole;

    // Simulation Loop for Live Data
    useEffect(() => {
        const interval = setInterval(() => {
            setWaterData(prev => ({
                level: +(prev.level + (Math.random() * 0.2 - 0.1)).toFixed(1),
                ph: +(prev.ph + (Math.random() * 0.1 - 0.05)).toFixed(1),
                turbidity: +(prev.turbidity + (Math.random() * 0.2 - 0.1)).toFixed(1),
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Toast State
    const [toasts, setToasts] = useState<any[]>([]);

    const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const [isApiFallback, setIsApiFallback] = useState(false);

    // Fetch Complaints (with Demo Fallback)
    const fetchComplaints = async () => {
        // Stop hammering if we already know API is down
        if (isApiFallback) return;

        try {
            const res = await fetch('/api/complaints');
            if (res.status === 503) throw new Error("Service Unavailable");
            if (!res.ok) throw new Error("API Failed");

            const data = await res.json();
            if (data.success) {
                const mappedComplaints = data.data.map((c: any) => ({
                    ...c,
                    id: c._id
                }));
                // Sort by latest first
                mappedComplaints.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setComplaints(mappedComplaints);
            }
        } catch (error) {
            console.warn("API unavailable, switching to persistent demo mode:", error);
            setIsApiFallback(true); // LOCK: Stop further network requests
            if (complaints.length === 0) setComplaints(DEMO_COMPLAINTS);
        }
    };

    // Initial fetch and polling
    useEffect(() => {
        // 1. Try to load from LocalStorage FIRST for instant render
        const saved = localStorage.getItem('demo_complaints');
        if (saved) {
            try {
                setComplaints(JSON.parse(saved));
                setLoading(false); // Instant load!
            } catch (e) {
                console.error("Failed to parse local complaints", e);
            }
        } else {
            // Seed with Demo Data if nothing in LS
            setComplaints(DEMO_COMPLAINTS);
            setLoading(false);
        }

        // 2. Then sync with Server (Background)
        fetchComplaints();

        const interval = setInterval(() => {
            if (!isApiFallback) fetchComplaints();
        }, 5000); // Live sync
        return () => clearInterval(interval);
    }, [isApiFallback]);

    // Save to LS whenever complaints change (to persist across refresh)
    useEffect(() => {
        if (complaints.length > 0) {
            localStorage.setItem('demo_complaints', JSON.stringify(complaints));
        }
    }, [complaints]);

    // Actions
    const login = async (role: UserRole) => {
        console.warn("Use signInWithEmailAndPassword directly");
    };

    const logout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const toggleDemoMode = () => {
        setIsDemoMode(prev => {
            const newVal = !prev;
            if (newVal) localStorage.setItem('is_demo_mode', 'true');
            else localStorage.removeItem('is_demo_mode');
            return newVal;
        });

        // Default to citizen when entering demo mode
        if (!isDemoMode) {
            setDemoRole("citizen");
            localStorage.setItem('user_role', "citizen"); // Persist effective role
        }
    };

    const setDemoRoleAction = (role: UserRole) => {
        setDemoRole(role);
        if (role) localStorage.setItem('user_role', role); // Persist manually set demo role
    };

    const addNotification = async (title: string, message: string, type: "success" | "warning" | "info" | "error" = "info") => {
        const newNotif: AppNotification = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            message,
            type,
            read: false,
            time: "Just now"
        };
        setNotifications(prev => [newNotif, ...prev]);

        // Native Notification Trigger
        try {
            // Check if native environment
            const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform();
            if (isNative) {
                await LocalNotifications.schedule({
                    notifications: [
                        {
                            title: title,
                            body: message,
                            id: Math.floor(Math.random() * 100000),
                            schedule: { at: new Date(Date.now() + 100) }, // Immediate
                            sound: undefined,
                            attachments: undefined,
                            actionTypeId: "",
                            extra: null
                        }
                    ]
                });
            }
        } catch (e) {
            console.warn("Native notification failed:", e);
        }
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const updateComplaintStatus = async (id: string, status: Complaint["status"], adminResponse?: string) => {
        try {
            const res = await fetch(`/api/complaints/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, adminResponse })
            });
            const data = await res.json();

            if (data.success) {
                showToast("Status updated!", "success");

                // AUTO-NOTIFY Logic
                addNotification(
                    "Complaint Updated",
                    `Your complaint #${id} is now ${status}. ${adminResponse ? `Note: ${adminResponse}` : ''}`,
                    status === 'Resolved' ? 'success' : 'info'
                );

                fetchComplaints(); // Refresh
            } else {
                throw new Error(data.error);
            }
        } catch (e) {
            console.error("Error updating status: ", e);
            if (isApiFallback || isDemoMode) {
                // Demo Mode Fallback
                setComplaints(prev => prev.map(c =>
                    (c.id === id || c._id === id) ? { ...c, status, adminResponse: adminResponse || c.adminResponse } : c
                ));
                showToast("Status updated (Demo Mode)", "success");

                // Demo Notification
                addNotification(
                    "Complaint Updated",
                    `Your complaint #${id} is now ${status}.`,
                    status === 'Resolved' ? 'success' : 'info'
                );
            } else {
                showToast("Failed to update status.", "error");
            }
        }
    };

    const addComplaint = async (complaint: Omit<Complaint, "_id" | "id" | "status" | "createdAt"> & { id?: string }) => {
        try {
            const res = await fetch('/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...complaint,
                    userId: user?.uid || "anonymous_demo_user",
                    userEmail: user?.email || "citizen@jalrakshak.demo"
                })
            });
            const data = await res.json();

            if (data.success) {
                showToast("Complaint submitted successfully!", "success");
                // Notify user
                setTimeout(() => {
                    addNotification("Report Received", "We have received your report. Thank you for alerting us.", "success");
                }, 1000);
                fetchComplaints(); // Refresh immediately
            } else {
                throw new Error(data.error);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            if (isApiFallback || isDemoMode) {
                // Demo Mode Fallback
                const fallbackId = Math.random().toString(36).substr(2, 9);
                const newComplaint: Complaint = {
                    _id: complaint.id || fallbackId,
                    id: complaint.id || fallbackId,
                    type: complaint.type,
                    location: complaint.location,
                    description: complaint.description,
                    status: 'Open',
                    createdAt: new Date().toISOString(),
                    userId: user?.uid || "demo_user",
                    userEmail: user?.email || "citizen@demo.com"
                };
                setComplaints(prev => [newComplaint, ...prev]);
                showToast("Complaint submitted (Demo Mode)", "success");
                // Notify user demo
                setTimeout(() => {
                    addNotification("Report Received", "We have received your report. Thank you for alerting us.", "success");
                }, 1000);
            } else {
                showToast("Failed to submit complaint.", "error");
            }
        }
    };

    return (
        <DataContext.Provider value={{
            userRole: effectiveRole, // Use the effective role (real or demo)
            user,
            waterData,
            alerts,
            complaints,
            notifications,
            markAsRead,
            markAllAsRead,
            login,
            logout,
            addComplaint,
            updateComplaintStatus,
            loading,
            isDemoMode,
            toggleDemoMode,
            setDemoRole: setDemoRoleAction
        }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
}
