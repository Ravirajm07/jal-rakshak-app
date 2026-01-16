import React from 'react';

interface TabsProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className = "" }: TabsProps) {
    return (
        <div className={`flex space-x-1 rounded-xl bg-slate-100 p-1 ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200
                        ${activeTab === tab.id
                            ? 'bg-white text-blue-700 shadow ring-1 ring-black/5'
                            : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
