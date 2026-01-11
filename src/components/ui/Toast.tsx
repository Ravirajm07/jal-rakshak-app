"use client";

import styles from "./Toast.module.css";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onClose: (id: string) => void;
}

export function Toast({ id, message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    const icons = {
        success: <CheckCircle size={20} color="#10b981" />,
        error: <AlertCircle size={20} color="#ef4444" />,
        info: <Info size={20} color="#3b82f6" />
    };

    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            {icons[type]}
            <span className={styles.message}>{message}</span>
            <button onClick={() => onClose(id)} style={{ marginLeft: 'auto', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9ca3af' }}>
                <X size={16} />
            </button>
        </div>
    );
}

export function ToastContainer({ toasts, removeToast }: { toasts: ToastProps[], removeToast: (id: string) => void }) {
    return (
        <div className={styles.container}>
            {toasts.map(t => (
                <Toast key={t.id} {...t} onClose={removeToast} />
            ))}
        </div>
    );
}
