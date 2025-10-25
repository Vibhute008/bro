
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Role, Project, Campaign, Report, Lead, ProjectStatus } from '../types';
import { USERS, CREDENTIALS } from '../constants';
import { mockProjects, mockCampaigns, mockReports, mockLeads } from '../data/mockData';

type Theme = 'light' | 'dark';

interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface AppContextType {
    user: User | null;
    login: (email: string, pass: string) => boolean;
    logout: () => void;
    
    theme: Theme;
    toggleTheme: () => void;

    projects: Project[];
    addProject: (project: Omit<Project, 'id' | 'progress' | 'documents' | 'updates'>) => void;
    updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
    addProjectUpdate: (projectId: string, updateText: string) => void;

    campaigns: Campaign[];
    addCampaign: (campaign: Omit<Campaign, 'id'>) => void;

    reports: Report[];
    addReport: (report: Omit<Report, 'id' | 'uploader'>) => void;

    leads: Lead[];
    addLead: (lead: Omit<Lead, 'id'>) => void;
    updateLeadStatus: (leadId: string, status: Lead['status']) => void;

    toasts: ToastMessage[];
    addToast: (message: string, type: ToastMessage['type']) => void;
}

export const AppContext = createContext<AppContextType>(null!);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [theme, setTheme] = useState<Theme>('light');
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
    const [reports, setReports] = useState<Report[]>(mockReports);
    const [leads, setLeads] = useState<Lead[]>(mockLeads);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
    }, [theme]);

    const addToast = useCallback((message: string, type: ToastMessage['type']) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const login = (email: string, pass: string): boolean => {
        if (CREDENTIALS[email] && CREDENTIALS[email] === pass) {
            const userData = USERS[email];
            if (userData) {
                setUser({ id: Date.now(), ...userData });
                addToast(`Welcome back, ${userData.name}!`, 'success');
                return true;
            }
        }
        addToast('Invalid credentials.', 'error');
        return false;
    };

    const logout = () => {
        setUser(null);
        addToast('Logged out successfully.', 'info');
    };

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const addProject = (projectData: Omit<Project, 'id' | 'progress' | 'documents' | 'updates'>) => {
        const newProject: Project = {
            ...projectData,
            id: `proj-${Date.now()}`,
            progress: 0,
            documents: [],
            updates: []
        };
        setProjects(prev => [newProject, ...prev]);
        addToast('Project added successfully!', 'success');
    };

    const updateProjectStatus = (projectId: string, status: ProjectStatus) => {
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status, progress: status === ProjectStatus.COMPLETED ? 100 : p.progress } : p));
        addToast('Project status updated!', 'info');
    };
    
    const addProjectUpdate = (projectId: string, updateText: string) => {
        const newUpdate = { id: `upd-${Date.now()}`, date: new Date().toISOString(), text: updateText };
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, updates: [newUpdate, ...p.updates] } : p));
        addToast('Project update added!', 'success');
    };

    const addCampaign = (campaignData: Omit<Campaign, 'id'>) => {
        const newCampaign: Campaign = {
            ...campaignData,
            id: `camp-${Date.now()}`,
        };
        setCampaigns(prev => [newCampaign, ...prev]);
        addToast('Campaign created!', 'success');
    };

    const addReport = (reportData: Omit<Report, 'id' | 'uploader'>) => {
        const newReport: Report = {
            ...reportData,
            id: `rep-${Date.now()}`,
            uploader: Role.SALES_MANAGER,
        };
        setReports(prev => [newReport, ...prev]);
        addToast('Report uploaded!', 'success');
    };
    
    const addLead = (leadData: Omit<Lead, 'id'>) => {
        const newLead: Lead = {
            ...leadData,
            id: `lead-${Date.now()}`,
        };
        setLeads(prev => [newLead, ...prev]);
        addToast('Lead added successfully!', 'success');
    };

    const updateLeadStatus = (leadId: string, status: Lead['status']) => {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status, lastContacted: new Date().toISOString() } : l));
        addToast('Lead status updated!', 'info');
    };

    const value = {
        user, login, logout,
        theme, toggleTheme,
        projects, addProject, updateProjectStatus, addProjectUpdate,
        campaigns, addCampaign,
        reports, addReport,
        leads, addLead, updateLeadStatus,
        toasts, addToast,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
