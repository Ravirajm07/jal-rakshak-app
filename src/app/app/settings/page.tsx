"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useData } from "@/lib/contexts/DataContext";
import { Moon, Bell, Globe, LogOut, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { GeminiService } from "@/lib/services/gemini";

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
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>

            {/* AI Configuration */}
            <Card className="p-4">
                <div className="flex items-center gap-3 mb-4 text-slate-800">
                    <Key size={20} className="text-blue-600" />
                    <div>
                        <CardTitle>Google Gemini AI Configuration</CardTitle>
                        <CardDescription>Enter your API key to enable smart features.</CardDescription>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            type="password"
                            placeholder="Enter Gemini API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleSaveKey}>Save Key</Button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                    Leave empty to use "Simulation Mode" for demonstration purposes.
                </p>
            </Card>

            <Card className="divide-y">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="text-slate-500" size={20} />
                        <div>
                            <p className="font-medium">Notifications</p>
                            <p className="text-xs text-slate-500">Receive flood alerts</p>
                        </div>
                    </div>
                    <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Globe className="text-slate-500" size={20} />
                        <div>
                            <p className="font-medium">Language</p>
                            <p className="text-xs text-slate-500">English (Default)</p>
                        </div>
                    </div>
                    <span className="text-sm text-slate-400 cursor-not-allowed">Change</span>
                </div>

                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Moon className="text-slate-500" size={20} />
                        <div>
                            <p className="font-medium">Dark Mode</p>
                            <p className="text-xs text-slate-500">Coming soon</p>
                        </div>
                    </div>
                    <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-not-allowed">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                </div>
            </Card>

            <Button variant="danger" fullWidth onClick={logout} className="mt-8">
                <LogOut size={18} className="mr-2" /> Log Out
            </Button>
        </div>
    );
}
