"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Info, Shield, Users, Award, Droplets, Map, Bell } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-8">
            {/* Header Section */}
            <div className="text-center space-y-2">
                <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-2">
                    <Droplets size={48} className="text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">JalRakshak</h1>
                <p className="text-slate-500 font-medium">Prototype water-quality, flood-risk and civic reporting app</p>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mt-2">
                    v0.1.0 prototype
                </div>
            </div>

            {/* Mission Card */}
            <Card className="p-8 border-t-4 border-t-blue-500">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                        <Award size={24} />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-xl">Our Mission</CardTitle>
                        <CardDescription className="text-base leading-relaxed text-slate-600">
                            JalRakshak explores how citizens and administrators could report water
                            issues, review flood-risk indicators, and coordinate sanitation response.
                            The current release uses simulated monitoring data and is not an official
                            emergency or public-health system.
                        </CardDescription>
                    </div>
                </div>
            </Card>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4 text-purple-500">
                        <Map size={28} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Real-time Monitoring</h3>
                    <p className="text-sm text-slate-500">Prototype views for water levels and quality metrics.</p>
                </Card>

                <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4 text-red-500">
                        <Bell size={28} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Instant Alerts</h3>
                    <p className="text-sm text-slate-500">Sample alert and notification workflows.</p>
                </Card>

                <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4 text-green-500">
                        <Shield size={28} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Citizen Reporting</h3>
                    <p className="text-sm text-slate-500">Citizen issue reporting and status tracking.</p>
                </Card>

                <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4 text-blue-500">
                        <Users size={28} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
                    <p className="text-sm text-slate-500">Bridging the gap between the municipal corporation and citizens.</p>
                </Card>
            </div>

            <div className="border-t border-slate-200" />

            {/* Credits Section */}
            <div className="text-center space-y-4">
                <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Project Scope</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-bold text-slate-800">Educational civic-tech prototype</span>
                </div>
                <p className="text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} JalRakshak contributors.
                </p>
            </div>

            {/* Developer/Contact Card (Optional) */}
            <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs text-slate-500">
                    <Info size={14} />
                    <span>Report security issues through SECURITY.md.</span>
                </div>
            </div>
        </div>
    );
}
