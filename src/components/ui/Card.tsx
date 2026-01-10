import React from "react";
import styles from "./Card.module.css";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverable = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(styles.card, !hoverable && styles.noHover, className)}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn(styles.title, className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn(styles.description, className)} {...props} />;
}
