"use client";

import { useData } from "@/lib/contexts/DataContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { SideDrawer } from "@/components/layout/SideDrawer";
import styles from "@/components/layout/MainLayout.module.css";
import { Bell, User, CloudRain, Menu, X } from "lucide-react";
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

                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                            <span className="font-semibold text-slate-700">Kolhapur City</span>
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        <div className="hidden md:flex bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">i</div>
                            Ward C: Safe Levels
                        </div>

                        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-600">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                        </Button>

                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200">
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
