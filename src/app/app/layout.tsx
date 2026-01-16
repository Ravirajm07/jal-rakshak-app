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
            <SideDrawer />

            <div className={styles.mainWrapper}>
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className="md:hidden">
                            <CloudRain className="text-blue-600" />
                        </div>
                        {/* Breadcrumb or Title could go here */}
                        {/* For now, minimal as in design */}
                    </div>

                    <div className={styles.headerRight}>
                        <div className="flex bg-slate-100 rounded-full px-4 py-2 text-sm font-medium text-slate-600 items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Kolhapur City
                        </div>

                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-blue-600">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </Button>

                        <div className={styles.userProfile}>
                            <User size={20} />
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
