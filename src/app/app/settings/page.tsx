"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useData } from "@/lib/contexts/DataContext";
import { Moon, Bell, Globe, LogOut, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { GeminiService } from "@/lib/services/gemini";
import styles from "./Settings.module.css";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const { logout } = useData();
    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
        const savedKey = GeminiService.getApiKey();
        if (savedKey) setApiKey(savedKey);
    }, []);

    const handleSaveKey = () => {
        GeminiService.setApiKey(apiKey);
        alert("API Key Saved Successfully!");
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Settings</h1>

            {/* AI Configuration */}
            <Card className={styles.aiCard}>
                <div className={styles.aiHeader}>
                    <div className={styles.iconBox}>
                        <Key size={24} />
                    </div>
                    <div>
                        <h3 className={styles.cardTitle}>Google Gemini AI Configuration</h3>
                        <p className={styles.cardDesc}>
                            Enter your API key to enable smart features like AI Chat and predictive analytics.
                        </p>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <Input
                            type="password"
                            placeholder="Enter your Gemini API Key here..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleSaveKey}>Save Key</Button>
                </div>

                <div className={styles.noteBox}>
                    <span className={styles.noteLabel}>Note:</span>
                    Leave empty to use "Simulation Mode" for demonstration.
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
