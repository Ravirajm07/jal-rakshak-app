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
    type: "Pipe Burst" | "Water Logging" | "Sewage Leak" | "Quality Issue" | "Other";
    location: string;
    status: "Open" | "In Progress" | "Resolved";
    description?: string;
    adminResponse?: string;
    createdAt?: string;
    userId?: string;
    userEmail?: string;
}

interface DataContextType {
    userRole: UserRole;
    user: User | null;
    waterData: WaterData;
    alerts: Alert[];
    complaints: Complaint[];
    login: (role: UserRole) => Promise<void>;
    logout: () => Promise<void>;
    addComplaint: (complaint: Omit<Complaint, "_id" | "status" | "createdAt">) => Promise<void>;
    updateComplaintStatus: (id: string, status: Complaint["status"], adminResponse?: string) => Promise<void>;
    loading: boolean;
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
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    // Firebase Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const role = currentUser.email?.includes("admin") ? "admin" : "citizen";
                setUserRole(role);
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Simulation Loop for Live Data
    useEffect(() => {
        const interval = setInterval(() => {
            setWaterData(prev => ({
                level: +(prev.level + (Math.random() * 0.2 - 0.1)).toFixed(2),
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

    // MongoDB Polling for Complaints
    const fetchComplaints = async () => {
        try {
            const res = await fetch('/api/complaints');
            const data = await res.json();
            if (data.success) {
                setComplaints(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch complaints:", error);
        }
    };

    // Initial fetch and polling
    useEffect(() => {
        fetchComplaints();
        const interval = setInterval(fetchComplaints, 3000); // Poll every 3 seconds
        return () => clearInterval(interval);
    }, []);

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

    const addComplaint = async (complaint: Omit<Complaint, "_id" | "status" | "createdAt">) => {
        try {
            const res = await fetch('/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...complaint,
                    userId: user?.uid || "anonymous",
                    userEmail: user?.email || "anonymous"
                })
            });
            const data = await res.json();

            if (data.success) {
                showToast("Complaint submitted successfully!", "success");
                fetchComplaints(); // Refresh immediately
            } else {
                throw new Error(data.error);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            showToast("Failed to submit complaint.", "error");
        }
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
                fetchComplaints(); // Refresh
            } else {
                throw new Error(data.error);
            }
        } catch (e) {
            console.error("Error updating status: ", e);
            showToast("Failed to update status.", "error");
        }
    };

    return (
        <DataContext.Provider value={{
            userRole,
            user,
            waterData,
            alerts,
            complaints,
            login,
            logout,
            addComplaint,
            updateComplaintStatus,
            loading
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
