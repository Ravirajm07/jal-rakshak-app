"use client";

import { useData } from "@/lib/contexts/DataContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { SideDrawer } from "@/components/layout/SideDrawer";
import styles from "@/components/layout/MainLayout.module.css";
import { Bell, User, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DisclaimerModal } from "@/components/common/DisclaimerModal";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userRole, loading } = useData();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !userRole) {
            router.push("/login"); // Auth Check
        }
    }, [userRole, loading, router]);

    if (loading) return <div className="h-screen flex items-center justify-center text-blue-600 font-medium animate-pulse">Initializing App...</div>;
    if (!userRole) return null;

    return (
        <div className={styles.layout}>
            {/* <SideDrawer /> Removed for Top-Nav Layout */}

            <div className={styles.mainWrapper}>
                <header className="bg-white border-b border-gray-200 sticky top-0 z-50 h-16 flex items-center justify-between px-8 shadow-sm">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                            <CloudRain size={20} fill="currentColor" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">JalRakshak</span>
                    </div>

                    {/* Center: Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="/app/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Dashboard</a>
                        <a href="/app/complaints" className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 py-5">Complaints</a>
                        <a href="/app/map" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Map View</a>
                        <a href="/app/settings" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Settings</a>
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100 rounded-full h-10 w-10">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </Button>
                        <div className="h-9 w-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white cursor-pointer">
                            <User size={18} />
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
