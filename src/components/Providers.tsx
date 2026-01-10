"use client";

import { DataProvider } from "@/lib/contexts/DataContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return <DataProvider>{children}</DataProvider>;
}
