
export enum Role {
    BOSS = 'Boss',
    TECH_LEAD = 'Tech Lead',
    SALES_MANAGER = 'Sales Manager',
    TELECALLER = 'Telecaller'
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface ProjectMilestone {
    id: string;
    name: string;
    completed: boolean;
}

export enum ProjectStatus {
    UPCOMING = 'Upcoming',
    ONGOING = 'Ongoing',
    COMPLETED = 'Completed'
}

export interface ProjectUpdate {
    id: string;
    date: string;
    text: string;
}

export interface Project {
    id: string;
    name: string;
    team: string[];
    status: ProjectStatus;
    progress: number;
    milestones: ProjectMilestone[];
    documents: File[];
    updates: ProjectUpdate[];
}

export enum CampaignPlatform {
    EMAIL = 'Email',
    INSTAGRAM = 'Instagram DM',
    LINKEDIN = 'LinkedIn DM'
}

export enum CampaignStatus {
    PLANNING = 'Planning',
    ACTIVE = 'Active',
    COMPLETED = 'Completed',
    PAUSED = 'Paused'
}

export interface Campaign {
    id: string;
    name: string;
    platform: CampaignPlatform;
    status: CampaignStatus;
    sent: number;
    responses: number;
    leadsGenerated: number;
}

export interface Report {
    id: string;
    name: string;
    date: string;
    uploader: Role.SALES_MANAGER;
    file: File;
}

export enum LeadStatus {
    NEW = 'New',
    CONTACTED = 'Contacted',
    INTERESTED_MEETING_BOOKED = 'Interested & Meeting Booked',
    INTERESTED_NOT_BOOKED = 'Interested but Meeting Not Booked',
    NOT_INTERESTED = 'Not Interested'
}

export interface Lead {
    id: string;
    name: string;
    company: string;
    city: string;
    niche: string;
    status: LeadStatus;
    lastContacted: string;
    notes: string;
}
