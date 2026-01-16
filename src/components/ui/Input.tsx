import React from "react";
import styles from "./Input.module.css";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        const inputId = props.id || React.useId();

        return (
            <div className={styles.inputWrapper}>
                {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
                <input
                    id={inputId}
                    ref={ref}
                    className={cn(styles.input, error && styles.error, className)}
                    {...props}
                />
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        );
    }
);
Input.displayName = "Input";
