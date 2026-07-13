"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function DisclaimerModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Build logic: Show only once per browser session
        const hasSeenDisclaimer = sessionStorage.getItem("hasSeenDisclaimer");

        if (!hasSeenDisclaimer) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenDisclaimer", "true");
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Important Notice"
            footer={
                <Button onClick={handleClose} fullWidth>
                    I Understand
                </Button>
            }
        >
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <p style={{ fontSize: "1.05rem", fontWeight: 500, color: "#1f2937" }}>
                    JalRakshak is a prototype civic-tech project. Sensor, flood, CCTV and water-quality information may be simulated and must not be used as the sole source for emergency, medical or public-safety decisions.
                </p>
            </div>
        </Modal>
    );
}
