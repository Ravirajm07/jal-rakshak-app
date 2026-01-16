"use client";

import { useData } from "@/lib/contexts/DataContext";
import { CitizenDashboard } from "@/components/dashboard/CitizenDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { RoleSwitcher } from "@/components/common/RoleSwitcher";

export default function DashboardPage() {
    const { userRole, loading } = useData();

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <>
            {userRole === "admin" ? <AdminDashboard /> : <CitizenDashboard />}
            <RoleSwitcher />
        </>
    );
}
