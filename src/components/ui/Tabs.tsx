import React from 'react';

interface TabsProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className = "" }: TabsProps) {
    return (
        <div className={`flex gap-2 border-b border-gray-200 ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 rounded-t-md
                        ${activeTab === tab.id
                            ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
