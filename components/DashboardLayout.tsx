
import React, { useContext, useState, ReactNode } from 'react';
import { AppContext } from '../context/AppContext';
import { Sun, Moon, Bell, LogOut, ChevronLeft, ChevronRight, Menu, X, Home, Briefcase, Target, Phone } from './ui/icons';
import { Role } from '../types';

const Sidebar: React.FC<{ isSidebarOpen: boolean; setSidebarOpen: (isOpen: boolean) => void }> = ({ isSidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useContext(AppContext);
    
    const navItems = [
        { icon: <Home className="h-5 w-5" />, label: 'Overview', roles: [Role.BOSS, Role.TECH_LEAD, Role.SALES_MANAGER, Role.TELECALLER] },
        { icon: <Briefcase className="h-5 w-5" />, label: 'Projects', roles: [Role.BOSS, Role.TECH_LEAD] },
        { icon: <Target className="h-5 w-5" />, label: 'Campaigns', roles: [Role.BOSS, Role.SALES_MANAGER] },
        { icon: <Phone className="h-5 w-5" />, label: 'Leads', roles: [Role.BOSS, Role.TELECALLER] },
    ];

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
            <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-dark-card shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex md:flex-col md:justify-between w-64`}>
                <div>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-xl font-bold text-primary">Raulo Ent.</span>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <X className="h-6 w-6"/>
                        </button>
                    </div>
                    <nav className="mt-4">
                        <ul>
                            {navItems.filter(item => user && item.roles.includes(user.role)).map(item => (
                                <li key={item.label}>
                                    <a href="#" className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                                        {item.icon}
                                        <span className="ml-3 font-medium">{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={logout} className="flex items-center w-full px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-500 rounded-lg transition-colors duration-200">
                        <LogOut className="h-5 w-5"/>
                        <span className="ml-3 font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};


const Navbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    const { user, theme, toggleTheme } = useContext(AppContext);

    return (
        <header className="bg-white dark:bg-dark-card shadow-sm sticky top-0 z-20">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                <button onClick={onMenuClick} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Menu className="h-6 w-6"/>
                </button>
                <div className="hidden md:block">
                    {/* Search Bar Placeholder */}
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <Bell className="h-5 w-5" />
                    </button>
                    <div className="flex items-center">
                        <img className="h-9 w-9 rounded-full object-cover" src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="User avatar" />
                        <div className="ml-3 hidden sm:block">
                            <p className="font-semibold text-sm">{user?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};


const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-gray-200">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
