
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Campaign, CampaignPlatform } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Plus, Upload, Mail, Linkedin, Instagram } from '../ui/icons';

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
    const progress = campaign.sent > 0 ? (campaign.responses / campaign.sent) * 100 : 0;
    const getPlatformIcon = (platform: CampaignPlatform) => {
        switch (platform) {
            case CampaignPlatform.EMAIL: return <Mail className="h-5 w-5 text-red-500" />;
            case CampaignPlatform.LINKEDIN: return <Linkedin className="h-5 w-5 text-blue-700" />;
            case CampaignPlatform.INSTAGRAM: return <Instagram className="h-5 w-5 text-pink-500" />;
            default: return null;
        }
    }
    
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 animate-slide-in">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg">{campaign.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {getPlatformIcon(campaign.platform)}
                        <span className="ml-2">{campaign.platform}</span>
                    </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{campaign.status}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 text-center">
                <div>
                    <p className="text-xl font-bold">{campaign.sent}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sent</p>
                </div>
                <div>
                    <p className="text-xl font-bold">{campaign.responses}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Responses</p>
                </div>
                <div>
                    <p className="text-xl font-bold text-secondary">{campaign.leadsGenerated}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Leads</p>
                </div>
            </div>
        </Card>
    );
};

const SalesManagerPanel: React.FC = () => {
    const { campaigns, reports, addReport } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState<CampaignPlatform | 'All'>('All');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            addReport({
                name: file.name,
                date: new Date().toISOString(),
                file: file
            });
        }
    };
    
    const filteredCampaigns = activeTab === 'All' ? campaigns : campaigns.filter(c => c.platform === activeTab);
    const tabs: (CampaignPlatform | 'All')[] = ['All', CampaignPlatform.EMAIL, CampaignPlatform.INSTAGRAM, CampaignPlatform.LINKEDIN];

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Marketing Dashboard</h1>
                <div className="flex space-x-2">
                    <Button variant="secondary">
                        <Plus className="h-5 w-5 mr-2"/> Create Campaign
                    </Button>
                     <label htmlFor="report-upload" className="cursor-pointer">
                        <Button as="span">
                            <Upload className="h-5 w-5 mr-2"/> Upload Report
                        </Button>
                    </label>
                    <input id="report-upload" type="file" className="hidden" onChange={handleFileUpload} />
                </div>
            </div>
            
            <div>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map(tab => (
                             <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
            </div>
        </div>
    );
};

export default SalesManagerPanel;
