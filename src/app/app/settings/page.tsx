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
            <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                        <Key size={24} />
                    </div>
                    <div>
                        <CardTitle className="text-lg">Google Gemini AI Configuration</CardTitle>
                        <CardDescription className="mt-1">Enter your API key to enable smart features like AI Chat and predictive analytics.</CardDescription>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <Input
                            type="password"
                            placeholder="Enter your Gemini API Key here..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="h-10"
                        />
                    </div>
                    <Button onClick={handleSaveKey} className="h-10 px-6">Save Key</Button>
                </div>

                <div className="mt-4 flex items-center gap-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-100">
                    <span className="font-semibold text-blue-600">Note:</span>
                    Leave empty to use "Simulation Mode" for demonstration.
                </div>
            </Card>

            {/* Settings List */}
            <Card className="divide-y divide-slate-100 overflow-hidden" style={{ padding: 0 }}>
                {/* Notifications */}
                <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Bell size={20} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-900">Notifications</p>
                            <p className="text-sm text-slate-500">Receive flood alerts</p>
                        </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                    </div>
                </div>

                {/* Language */}
                <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Globe size={20} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-900">Language</p>
                            <p className="text-sm text-slate-500">English (Default)</p>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">Change</span>
                </div>

                {/* Dark Mode */}
                <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                            <Moon size={20} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-900">Dark Mode</p>
                            <p className="text-sm text-slate-500">Coming soon</p>
                        </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
                        <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                    </div>
                </div>
            </Card>

            <Button variant="danger" fullWidth onClick={logout} className="mt-8">
                <LogOut size={18} className="mr-2" /> Log Out
            </Button>
        </div>
    );
}
