import React from 'react';

interface TabsProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className = "" }: TabsProps) {
    return (
        <div className={`inline-flex items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500 ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                        ${activeTab === tab.id
                            ? 'bg-white text-slate-950 shadow-sm'
                            : 'hover:bg-slate-200/50 hover:text-slate-950'}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
