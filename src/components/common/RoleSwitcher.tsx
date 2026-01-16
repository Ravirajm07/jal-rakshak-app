import { useData } from "@/lib/contexts/DataContext";
import { Button } from "@/components/ui/Button";
import { User, Shield, toggle } from "lucide-react";

export function RoleSwitcher() {
    const { isDemoMode, toggleDemoMode, userRole, setDemoRole } = useData();

    if (!isDemoMode) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    onClick={toggleDemoMode}
                    variant="primary"
                    className="shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    Enable Demo Mode
                </Button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 bg-white p-4 rounded-lg shadow-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Demo Control</span>
                <button
                    onClick={toggleDemoMode}
                    className="text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
            </div>

            <div className="flex bg-gray-100 p-1 rounded-md">
                <button
                    onClick={() => setDemoRole("citizen")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${userRole === "citizen"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <User size={16} />
                    Citizen
                </button>
                <button
                    onClick={() => setDemoRole("admin")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-all ${userRole === "admin"
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <Shield size={16} />
                    Admin
                </button>
            </div>
            <div className="text-[10px] text-center text-gray-400 mt-1">
                Viewing as: {userRole === "citizen" ? "Resident" : "Municipal Officer"}
            </div>
        </div>
    );
}
