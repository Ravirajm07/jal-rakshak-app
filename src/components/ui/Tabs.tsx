import styles from './Tabs.module.css';

interface TabsProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string; // Keep for external layout
}

export function Tabs({ tabs, activeTab, onTabChange, className = "" }: TabsProps) {
    return (
        <div className={`${styles.container} ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        ${styles.tab}
                        ${activeTab === tab.id ? styles.active : styles.inactive}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
