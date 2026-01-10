"use client";

import dynamic from "next/dynamic";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Dynamically import map to avoid SSR window is not defined error
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[600px] bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-slate-400">
            Loading Interactive Map...
        </div>
    ),
});

export default function MapPage() {
    return (
        <div className="max-w-[1600px] mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">City Hazard Map</h1>
                    <p className="text-sm text-slate-500">Live sensor data and flood risk zones for Kolhapur.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download size={16} className="mr-2" /> Download Offline Map
                    </Button>
                </div>
            </div>

            <MapComponent />
        </div>
    );
}
