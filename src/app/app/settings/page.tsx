"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useData } from "@/lib/contexts/DataContext";
import { Moon, Bell, Globe, LogOut, Bot } from "lucide-react";
import { useState } from "react";
import styles from "./Settings.module.css";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const { logout } = useData();

    const { addComplaint } = useData();
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            await addComplaint({
                type: "Water Logging",
                location: "Panchganga Ghat",
                description: "Severe water logging observed due to heavy rain."
            });
            await addComplaint({
                type: "Pipe Burst",
                location: "Rankala Lake Road",
                description: "Main water supply line leakage reported."
            });
            await addComplaint({
                type: "Quality Issue",
                location: "Shivaji Park",
                description: "Water appears muddy and has a bad odor."
            });
            alert("✅ 3 Sample Complaints Added!");
        } catch (error) {
            console.error(error);
            alert("Failed to add data. Check console.");
        }
        setIsSeeding(false);
    };

    return (
        <div className={styles.pageContainer}>
            <div className="flex justify-between items-center">
                <h1 className={styles.pageTitle}>Settings</h1>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSeed}
                    disabled={isSeeding}
                >
                    {isSeeding ? "Seeding..." : "🌱 Seed Database"}
                </Button>
            </div>

            {/* AI Configuration */}
            <Card className={styles.aiCard}>
                <div className={styles.aiHeader}>
                    <div className={styles.iconBox}>
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className={styles.cardTitle}>AI Assistant Mode</h3>
                        <p className={styles.cardDesc}>
                            The current assistant uses scripted prototype responses. Server-side Gemini integration is not enabled in v0.1.0.
                        </p>
                    </div>
                </div>

                <div className={styles.noteBox}>
                    <span className={styles.noteLabel}>Note:</span>
                    Do not paste private AI API keys into the client app. Add any future AI integration behind a server-side route.
                </div>
            </Card>

            {/* Settings List */}
            <Card className={styles.listContainer}>
                {/* Notifications */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={cn(styles.itemIcon, styles.iconBlue)}>
                            <Bell size={24} />
                        </div>
                        <div className={styles.itemContent}>
                            <p className={styles.itemTitle}>Notifications</p>
                            <p className={styles.itemSubtitle}>Receive flood alerts</p>
                        </div>
                    </div>
                    <div className={styles.itemRight}>
                        <div className={cn(styles.toggle, styles.toggleActive)}>
                            <div className={styles.toggleDot} />
                        </div>
                    </div>
                </div>

                {/* Language */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={cn(styles.itemIcon, styles.iconPurple)}>
                            <Globe size={24} />
                        </div>
                        <div className={styles.itemContent}>
                            <p className={styles.itemTitle}>Language</p>
                            <p className={styles.itemSubtitle}>English (Default)</p>
                        </div>
                    </div>
                    <div className={styles.itemRight}>
                        <span className={styles.changeLink}>Change</span>
                    </div>
                </div>

                {/* Dark Mode */}
                <div className={styles.listItem}>
                    <div className={styles.itemLeft}>
                        <div className={cn(styles.itemIcon, styles.iconSlate)}>
                            <Moon size={24} />
                        </div>
                        <div className={styles.itemContent}>
                            <p className={styles.itemTitle}>Dark Mode</p>
                            <p className={styles.itemSubtitle}>Coming soon</p>
                        </div>
                    </div>
                    <div className={styles.itemRight}>
                        <div className={styles.toggle}>
                            <div className={styles.toggleDot} />
                        </div>
                    </div>
                </div>
            </Card>

            <Button variant="danger" fullWidth onClick={logout} className="mt-4">
                <LogOut size={18} className="mr-2" /> Log Out
            </Button>
        </div>
    );
}
