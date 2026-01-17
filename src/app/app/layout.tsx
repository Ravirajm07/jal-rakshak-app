"use client";

import { useData } from "@/lib/contexts/DataContext";
import NotificationCenter from "@/components/ui/NotificationCenter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { SideDrawer } from "@/components/layout/SideDrawer";
import styles from "@/components/layout/MainLayout.module.css";
import { Bell, User, CloudRain, Menu, X, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DisclaimerModal } from "@/components/common/DisclaimerModal";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userRole, loading } = useData();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !userRole) {
            router.push("/login"); // Auth Check
        }
    }, [userRole, loading, router]);

    if (loading) return <div className="h-screen flex items-center justify-center text-blue-600 font-medium animate-pulse">Initializing App...</div>;
    if (!userRole) return null;

    return (
        <div className={styles.layout}>
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <SideDrawer />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
                    <div className="relative z-50 w-64 h-full bg-white shadow-xl animate-in slide-in-from-left duration-200">
                        <SideDrawer />
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.mainWrapper}>
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className="md:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
                            <Menu className="text-gray-700" size={24} />
                        </div>
                        {/* Title for mobile context if needed */}
                        <div className="md:hidden font-bold text-lg text-gray-800 ml-2">JalRakshak</div>
                    </div>

                    <div className={styles.headerRight}>
                        {/* Location Pill - Visible on mobile but compact */}
                        <div className="hidden min-[380px]:flex bg-slate-100 rounded-full pl-3 pr-4 py-1.5 text-xs font-semibold text-slate-700 items-center gap-2 whitespace-nowrap shadow-sm border border-slate-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Kolhapur City
                        </div>

                        {/* Status Pill - Ward C */}
                        <div className="hidden sm:flex bg-blue-50 text-blue-700 rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-blue-100 transition-colors items-center gap-1.5 whitespace-nowrap shadow-sm border border-blue-100">
                            <Info size={14} className="stroke-[2.5px]" />
                            <span>Ward C: Safe</span>
                        </div>

                        {/* Bell Icon */}
                        <Button variant="ghost" size="icon" className="relative text-slate-600 hover:bg-slate-100 w-9 h-9 rounded-full">
                            <Bell size={20} strokeWidth={2.5} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </Button>

                        {/* Profile Avatar - Outlined */}
                        <div className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 bg-white shadow-sm">
                            <User size={20} strokeWidth={2.5} />
                        </div>
                    </div>
                </header>

                <main className={styles.content}>
                    {children}
                </main>
            </div>

            <BottomNav />
            <DisclaimerModal />
        </div>
    );
}
