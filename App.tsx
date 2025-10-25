
import React, { useState, useEffect, useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import LoginPage from './components/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import BossPanel from './components/panels/BossPanel';
import TechLeadPanel from './components/panels/TechLeadPanel';
import SalesManagerPanel from './components/panels/SalesManagerPanel';
import TelecallerPanel from './components/panels/TelecallerPanel';
import { Role } from './types';
import ToastContainer from './components/ui/ToastContainer';
import { RauloLogo } from './components/ui/icons';

const AppContent: React.FC = () => {
    const { user } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-dark-bg">
                <div className="animate-logo-pulse">
                    <RauloLogo className="h-24 w-24 text-primary" />
                </div>
            </div>
        );
    }
    
    if (!user) {
        return <LoginPage />;
    }

    const renderPanel = () => {
        switch (user.role) {
            case Role.BOSS:
                return <BossPanel />;
            case Role.TECH_LEAD:
                return <TechLeadPanel />;
            case Role.SALES_MANAGER:
                return <SalesManagerPanel />;
            case Role.TELECALLER:
                return <TelecallerPanel />;
            default:
                return <div>Invalid Role</div>;
        }
    };

    return (
        <DashboardLayout>
            {renderPanel()}
        </DashboardLayout>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <div className="font-sans antialiased text-gray-900 bg-gray-100 dark:bg-dark-bg dark:text-dark-text">
                <AppContent />
                <ToastContainer />
            </div>
        </AppProvider>
    );
};

export default App;
