
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Card from '../ui/Card';
// FIX: Import 'CampaignStatus' to resolve reference error.
import { Project, Lead, Campaign, Report, LeadStatus, ProjectStatus, CampaignStatus } from '../../types';
import { Briefcase, Target, Phone, FileText } from '../ui/icons';

const BossPanel: React.FC = () => {
    const { user, projects, leads, campaigns, reports } = useContext(AppContext);

    const ongoingProjects = projects.filter(p => p.status === ProjectStatus.ONGOING).length;
    const leadsToday = leads.filter(l => new Date(l.lastContacted).toDateString() === new Date().toDateString()).length;
    const meetingsBooked = leads.filter(l => l.status === LeadStatus.INTERESTED_MEETING_BOOKED).length;
    const activeCampaigns = campaigns.filter(c => c.status === CampaignStatus.ACTIVE).length;

    return (
        <div className="animate-fade-in space-y-6">
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500 dark:text-gray-400">Here's a real-time overview of your enterprise.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:border-primary transition-all duration-300">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Ongoing Projects</p>
                            <p className="text-2xl font-bold">{ongoingProjects}</p>
                        </div>
                    </div>
                </Card>
                <Card className="hover:border-secondary transition-all duration-300">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-secondary/10 rounded-full">
                            <Target className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Active Campaigns</p>
                            <p className="text-2xl font-bold">{activeCampaigns}</p>
                        </div>
                    </div>
                </Card>
                <Card className="hover:border-accent transition-all duration-300">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-accent/10 rounded-full">
                            <Phone className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Meetings Booked</p>
                            <p className="text-2xl font-bold">{meetingsBooked}</p>
                        </div>
                    </div>
                </Card>
                 <Card className="hover:border-yellow-500 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-yellow-500/10 rounded-full">
                            <FileText className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Reports Today</p>
                            <p className="text-2xl font-bold">{reports.length}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Tech Lead Updates</h2>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {projects.filter(p => p.updates.length > 0).map(project => (
                             <div key={project.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                 <p className="font-bold">{project.name}</p>
                                 {project.updates.slice(0, 1).map(update => (
                                     <div key={update.id} className="text-sm text-gray-600 dark:text-gray-300">
                                        <p>"{update.text}"</p>
                                        <p className="text-xs text-gray-400 mt-1">{new Date(update.date).toLocaleString()}</p>
                                     </div>
                                 ))}
                             </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Sales & Telecaller Activity</h2>
                     <div className="space-y-4 max-h-96 overflow-y-auto">
                         <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                             <p className="font-bold">Recent Leads</p>
                             {leads.slice(0, 5).map(lead => (
                                 <div key={lead.id} className="flex justify-between items-center text-sm py-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                     <p>{lead.name} <span className="text-xs text-gray-500">({lead.company})</span></p>
                                     <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{lead.status}</span>
                                 </div>
                             ))}
                         </div>
                         <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                             <p className="font-bold">Active Campaigns</p>
                              {campaigns.filter(c => c.status === CampaignStatus.ACTIVE).map(campaign => (
                                 <div key={campaign.id} className="flex justify-between items-center text-sm py-1">
                                     <p>{campaign.name}</p>
                                     <span className="font-mono text-secondary">{campaign.leadsGenerated} leads</span>
                                 </div>
                             ))}
                         </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default BossPanel;
