import { Card } from "@/components/ui/Card";
import { Droplets } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                    <Droplets size={48} />
                </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">JalRakshak</h1>
            <p className="text-slate-500 mb-8">v1.0.0 (Beta)</p>

            <Card className="text-left mb-8">
                <h2 className="font-semibold text-lg mb-2">Mission</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                    JalRakshak empowers the citizens of Kolhapur with real-time water insights, flood alerts, and a seamless sanitation reporting mechanism.
                    Our goal is to create a resilient, water-smart city through community participation and data-driven governance.
                </p>
            </Card>

            <div className="text-sm text-slate-400">
                <p>Developed for Kolhapur Municipal Corporation</p>
                <p>&copy; 2024 Smart City Initiative</p>
            </div>
        </div>
    );
}
