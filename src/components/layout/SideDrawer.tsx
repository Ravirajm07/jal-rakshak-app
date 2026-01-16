"use client";

import styles from "./SideDrawer.module.css";
import { Droplets } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS, FOOTER_NAV_ITEMS } from "@/config/navigation";
import { useData } from "@/lib/contexts/DataContext";

export const SideDrawer = () => {
    const pathname = usePathname();
    const { userRole } = useData();

    // Default to citizen view if role isn't loaded yet to be safe, or wait? 
    // DataContext loads fast, usually 'citizen' or 'admin'.
    // Force refresh check
    return (
        <aside className={styles.drawer}>
            <div className={styles.brand}>
                <Droplets size={28} />
                JalRakshak
            </div>

            <nav className={styles.nav}>
                {MAIN_NAV_ITEMS.filter(item => item.roles.includes(userRole)).map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(styles.item, isActive && styles.active)}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <nav className={styles.nav}>
                    {FOOTER_NAV_ITEMS.filter(item => item.roles.includes(userRole)).map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(styles.item, isActive && styles.active)}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};
