"use client";

import styles from "./BottomNav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOBILE_NAV_ITEMS } from "@/config/navigation";
import { useData } from "@/lib/contexts/DataContext";

export const BottomNav = () => {
    const pathname = usePathname();
    const { userRole } = useData();

    return (
        <nav className={styles.nav}>
            {MOBILE_NAV_ITEMS.filter(item => item.roles.includes(userRole)).map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(styles.item, isActive && styles.active)}
                    >
                        <Icon size={24} />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
};
