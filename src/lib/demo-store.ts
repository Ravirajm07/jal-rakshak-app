
// This is a temporary in-memory store for the Demo Mode
// It allows different API routes to access the same "database"
// preventing data inconsistency between LIST and UPDATE operations.

export interface Complaint {
    _id: string;
    type: string;
    location: string;
    description: string;
    status: string;
    adminResponse?: string;
    createdAt: string;
    userId?: string;
    userEmail?: string;
}

// Initial Mock Data
let STORE: Complaint[] = [
    { _id: '1', type: 'Pipe Burst', location: 'Ward A, Main Sq', description: 'Major pipe burst near market', status: 'In Progress', createdAt: new Date().toISOString() },
    { _id: '2', type: 'Water Logging', location: 'Ward B, Lane 4', description: 'Stagnant water since yesterday', status: 'Open', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: '3', type: 'System Alert', location: 'System', description: 'Sensor malfunction in Sector 4', status: 'Open', createdAt: new Date().toISOString() },
];

export const DemoStore = {
    getAll: () => STORE,
    add: (complaint: Complaint) => {
        STORE.unshift(complaint);
        return complaint;
    },
    update: (id: string, updates: Partial<Complaint>) => {
        const index = STORE.findIndex(c => c._id === id);
        if (index !== -1) {
            STORE[index] = { ...STORE[index], ...updates };
            return STORE[index];
        }
        return null;
    },
    getById: (id: string) => STORE.find(c => c._id === id)
};
