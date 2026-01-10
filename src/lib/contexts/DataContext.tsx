"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

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

interface Complaint {
    id: number;
    type: "Pipe Burst" | "Water Logging" | "Sewage Leak" | "Quality Issue" | "Other";
    location: string;
    status: "Open" | "In Progress" | "Resolved";
    description?: string;
    adminResponse?: string;
}

interface DataContextType {
    userRole: UserRole;
    user: User | null; // Firebase User
    waterData: WaterData;
    alerts: Alert[];
    complaints: Complaint[];
    login: (role: UserRole) => Promise<void>; // Kept for interface compatibility, but unused
    logout: () => Promise<void>;
    addComplaint: (complaint: Omit<Complaint, "id" | "status">) => void;
    updateComplaintStatus: (id: number, status: Complaint["status"], adminResponse?: string) => void;
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
    const [complaints, setComplaints] = useState<Complaint[]>([
        { id: 101, type: "Pipe Burst", location: "Rankala Road", status: "Open", description: "Heavy leakage near bus stop" },
        { id: 102, type: "Water Logging", location: "Shahupuri", status: "In Progress", description: "Drainage blocked" },
    ]);

    // Firebase Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Determine role based on email for demo purposes
                // Real apps would use Custom Claims or Firestore
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


    // Actions
    const login = async (role: UserRole) => {
        // Deprecated in favor of direct Firebase login in page component
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

    const addComplaint = (complaint: Omit<Complaint, "id" | "status">) => {
        const newComplaint: Complaint = {
            id: Math.floor(Math.random() * 1000) + 1000,
            status: "Open",
            ...complaint
        };
        setComplaints(prev => [newComplaint, ...prev]);
    };

    const updateComplaintStatus = (id: number, status: Complaint["status"], adminResponse?: string) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, status, adminResponse } : c));
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
