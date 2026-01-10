import React from "react";
import styles from "./Badge.module.css";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "success" | "warning" | "danger" | "info" | "neutral";
}

export const Badge = ({ className, variant = "neutral", ...props }: BadgeProps) => {
    return (
        <span className={cn(styles.badge, styles[variant], className)} {...props} />
    );
};
