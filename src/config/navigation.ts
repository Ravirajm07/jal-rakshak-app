import {
    LayoutDashboard,
    Map,
    Bell,
    Settings,
    Info,
    BarChart,
    FileWarning,
    User,
    Bot,
    FileText,
    Video
} from "lucide-react";

export type UserRole = "citizen" | "admin" | null;

export interface NavItem {
    label: string;
    href: string;
    icon: any;
    roles: UserRole[]; // List of roles that can see this item
}

export const MAIN_NAV_ITEMS: NavItem[] = [
    {
        label: "Dashboard",
        href: "/app/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "citizen"]
    },
    {
        label: "Report Issue",
        href: "/app/report",
        icon: FileText,
        roles: ["admin", "citizen"]
    },
    {
        label: "Analytics",
        href: "/app/analytics",
        icon: BarChart,
        roles: ["admin"] // Admin only
    },
    {
        label: "Map View",
        href: "/app/map",
        icon: Map,
        roles: ["admin"] // Hidden for civilians as requested
    },

    {
        label: "Alerts",
        href: "/app/alerts",
        icon: Bell,
        roles: ["admin"]
    },
    {
        label: "AI Chat",
        href: "/app/chat",
        icon: Bot,
        roles: ["admin", "citizen"]
    },
    {
        label: "Live Cameras",
        href: "/app/camera",
        icon: Video,
        roles: ["admin"] // Admin only
    },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
    {
        label: "Settings",
        href: "/app/settings",
        icon: Settings,
        roles: ["admin", "citizen"]
    },
    {
        label: "About",
        href: "/app/about",
        icon: Info,
        roles: ["admin", "citizen"]
    },
];

export const MOBILE_NAV_ITEMS: NavItem[] = [
    {
        label: "Home",
        href: "/app/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "citizen"]
    },
    {
        label: "Map",
        href: "/app/map",
        icon: Map,
        roles: ["admin"]
    },
    {
        label: "Report",
        href: "/app/report",
        icon: FileText,
        roles: ["admin", "citizen"]
    },
    {
        label: "Profile",
        href: "/app/profile",
        icon: User,
        roles: ["admin", "citizen"]
    },
];
