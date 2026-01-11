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
                <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Bell size={24} />
                        </div>
                        <div className="ml-4 flex flex-col">
                            <p className="font-semibold text-base text-slate-900 leading-tight">Notifications</p>
                            <p className="text-sm text-slate-500 mt-1">Receive flood alerts</p>
                        </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 cursor-pointer">
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm" />
                    </div>
                </div>

                {/* Language */}
                <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <Globe size={24} />
                        </div>
                        <div className="ml-4 flex flex-col">
                            <p className="font-semibold text-base text-slate-900 leading-tight">Language</p>
                            <p className="text-sm text-slate-500 mt-1">English (Default)</p>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 cursor-pointer hover:underline px-2 py-1 rounded">Change</span>
                </div>

                {/* Dark Mode */}
                <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center">
                        <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                            <Moon size={24} />
                        </div>
                        <div className="ml-4 flex flex-col">
                            <p className="font-semibold text-base text-slate-900 leading-tight">Dark Mode</p>
                            <p className="text-sm text-slate-500 mt-1">Coming soon</p>
                        </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 cursor-not-allowed">
                        <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm" />
                    </div>
                </div>
            </Card>

            <Button variant="danger" fullWidth onClick={logout} className="mt-8">
                <LogOut size={18} className="mr-2" /> Log Out
            </Button>
        </div>
    );
}
