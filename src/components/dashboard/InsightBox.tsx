"use client";

import { AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./InsightBox.module.css";

interface InsightBoxProps {
    message: string;
    severity: "safe" | "warning" | "danger";
}

export const InsightBox = ({ message, severity }: InsightBoxProps) => {
    return (
        <Link href="/app/analytics" className={cn(styles.box, styles[severity])}>
            <div className={styles.iconWrapper}>
                <AlertTriangle size={24} />
            </div>
            <div className={styles.content}>
                <h4 className={styles.title}>AI Insight</h4>
                <p className={styles.message}>{message}</p>
            </div>
            <ChevronRight className={styles.arrow} />
        </Link>
    );
};
