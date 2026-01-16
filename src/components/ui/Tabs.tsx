import React from 'react';

interface TabsProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className = "" }: TabsProps) {
    return (
        <div className={`flex w-fit items-center rounded-lg bg-gray-100 p-1 ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        rounded-md px-3 py-1.5 text-sm font-medium transition-all
                        ${activeTab === tab.id
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
