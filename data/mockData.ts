
import { Project, Campaign, Report, Lead, ProjectStatus, CampaignPlatform, CampaignStatus, LeadStatus, Role } from '../types';

export const mockProjects: Project[] = [
    {
        id: 'proj-1',
        name: 'Raulo Website V2',
        team: ['Alice', 'Bob'],
        status: ProjectStatus.ONGOING,
        progress: 75,
        milestones: [{ id: 'm1', name: 'UI/UX Design', completed: true }, { id: 'm2', name: 'Frontend Dev', completed: true }, { id: 'm3', name: 'Backend API', completed: false }],
        documents: [],
        updates: [{id: 'upd-1', date: new Date().toISOString(), text: 'Frontend completed, starting API integration.'}]
    },
    {
        id: 'proj-2',
        name: 'Mobile App Launch',
        team: ['Charlie', 'David'],
        status: ProjectStatus.UPCOMING,
        progress: 10,
        milestones: [{ id: 'm1', name: 'Planning', completed: true }, { id: 'm2', name: 'Wireframing', completed: false }],
        documents: [],
        updates: []
    },
     {
        id: 'proj-3',
        name: 'Internal CRM Tool',
        team: ['Eve', 'Frank'],
        status: ProjectStatus.COMPLETED,
        progress: 100,
        milestones: [{ id: 'm1', name: 'Dev', completed: true }, { id: 'm2', name: 'Testing', completed: true }, { id: 'm3', name: 'Deployment', completed: true }],
        documents: [],
        updates: [{id: 'upd-1', date: new Date().toISOString(), text: 'Project deployed successfully.'}]
    },
];

export const mockCampaigns: Campaign[] = [
    {
        id: 'camp-1',
        name: 'Q3 Email Blast',
        platform: CampaignPlatform.EMAIL,
        status: CampaignStatus.ACTIVE,
        sent: 5000,
        responses: 250,
        leadsGenerated: 50,
    },
    {
        id: 'camp-2',
        name: 'IG Influencer Collab',
        platform: CampaignPlatform.INSTAGRAM,
        status: CampaignStatus.COMPLETED,
        sent: 100,
        responses: 80,
        leadsGenerated: 20,
    },
    {
        id: 'camp-3',
        name: 'LinkedIn Outreach',
        platform: CampaignPlatform.LINKEDIN,
        status: CampaignStatus.PLANNING,
        sent: 0,
        responses: 0,
        leadsGenerated: 0,
    }
];

export const mockReports: Report[] = [];

export const mockLeads: Lead[] = [
    {
        id: 'lead-1',
        name: 'John Doe',
        company: 'Innovate Inc.',
        city: 'Mumbai',
        niche: 'Real Estate',
        status: LeadStatus.INTERESTED_MEETING_BOOKED,
        lastContacted: new Date().toISOString(),
        notes: 'Meeting scheduled for Friday.'
    },
    {
        id: 'lead-2',
        name: 'Jane Smith',
        company: 'Cafe Corner',
        city: 'Delhi',
        niche: 'Cafes',
        status: LeadStatus.INTERESTED_NOT_BOOKED,
        lastContacted: new Date().toISOString(),
        notes: 'Requested more info, follow up tomorrow.'
    },
    {
        id: 'lead-3',
        name: 'Peter Jones',
        company: 'Design Dreams',
        city: 'Bangalore',
        niche: 'Interior Designers',
        status: LeadStatus.NOT_INTERESTED,
        lastContacted: new Date().toISOString(),
        notes: 'Not a good fit.'
    },
];
