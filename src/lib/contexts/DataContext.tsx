"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Import db here
import { useRouter } from "next/navigation";
import { ToastContainer } from "@/components/ui/Toast";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

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
    id: string; // Changed from number to string for Firestore ID
    type: "Pipe Burst" | "Water Logging" | "Sewage Leak" | "Quality Issue" | "Other";
    location: string;
    status: "Open" | "In Progress" | "Resolved";
    description?: string;
    adminResponse?: string;
    timestamp?: any; // Firestore Timestamp
    userId?: string;
}

interface DataContextType {
    userRole: UserRole;
    user: User | null; // Firebase User
    waterData: WaterData;
    alerts: Alert[];
    complaints: Complaint[];
    login: (role: UserRole) => Promise<void>; // Kept for interface compatibility, but unused
    logout: () => Promise<void>;
    addComplaint: (complaint: Omit<Complaint, "id" | "status" | "timestamp">) => Promise<void>;
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

    // Firestore Collections
    // Firestore Collections - Imports moved to top

    // Toast State
    const [toasts, setToasts] = useState<any[]>([]);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Real-time Complaints Listener with Notifications
    useEffect(() => {
        const q = query(collection(db, "complaints"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot: any) => {
            const fetchedComplaints = snapshot.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            })) as Complaint[];

            setComplaints(fetchedComplaints);

            // Handle Notifications
            if (!isFirstLoad) {
                snapshot.docChanges().forEach((change: any) => {
                    const docData = change.doc.data();
                    // New Complaint (Notify Admin)
                    if (change.type === "added" && userRole === "admin" && docData.userId !== user?.uid) {
                        showToast(`New ${docData.type} reported at ${docData.location}`, "info");
                    }
                    // Status Update (Notify Citizen)
                    if (change.type === "modified") {
                        // If user is owner
                        if (userRole === "citizen" && docData.userId === user?.uid) {
                            showToast(`Your complaint status updated to: ${docData.status}`, "success");
                        }
                        // If admin just updated it
                        if (userRole === "admin") {
                            // Optional confirmation for admin
                        }
                    }
                });
            } else {
                setIsFirstLoad(false);
            }
        });

        return () => unsubscribe();
    }, [userRole, user, isFirstLoad]); // Dependencies updated

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

    const addComplaint = async (complaint: Omit<Complaint, "id" | "status" | "timestamp">) => {
        try {
            await addDoc(collection(db, "complaints"), {
                ...complaint,
                status: "Open",
                timestamp: serverTimestamp(), // Server-side timestamp
                userId: user?.uid || "anonymous",
                userEmail: user?.email || "anonymous"
            });
            showToast("Complaint submitted successfully!", "success");
        } catch (e) {
            console.error("Error adding document: ", e);
            showToast("Failed to submit complaint.", "error");
        }
    };

    const updateComplaintStatus = async (id: string, status: Complaint["status"], adminResponse?: string) => {
        try {
            const compRef = doc(db, "complaints", id);
            await updateDoc(compRef, {
                status,
                adminResponse,
                lastUpdated: serverTimestamp()
            });
            showToast("Status updated!", "success");
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
