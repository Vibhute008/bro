
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { Lead, LeadStatus } from '../../types';
import Button from '../ui/Button';
import { Plus, Upload, ChevronDown, Folder } from '../ui/icons';

const LeadRow: React.FC<{ lead: Lead; onStatusChange: (leadId: string, status: LeadStatus) => void; }> = ({ lead, onStatusChange }) => {
    const statusOptions = Object.values(LeadStatus);
    const statusColor: Record<LeadStatus, string> = {
        [LeadStatus.NEW]: 'bg-gray-200 text-gray-800',
        [LeadStatus.CONTACTED]: 'bg-blue-200 text-blue-800',
        [LeadStatus.INTERESTED_NOT_BOOKED]: 'bg-yellow-200 text-yellow-800',
        [LeadStatus.INTERESTED_MEETING_BOOKED]: 'bg-green-200 text-green-800',
        [LeadStatus.NOT_INTERESTED]: 'bg-red-200 text-red-800',
    };

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{lead.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{lead.company}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{lead.niche}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <select 
                    value={lead.status} 
                    onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                    className={`text-xs p-2 rounded-md border-none focus:ring-0 ${statusColor[lead.status]}`}
                >
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </td>
             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(lead.lastContacted).toLocaleDateString()}</td>
        </tr>
    );
};


const TelecallerPanel: React.FC = () => {
    const { leads, updateLeadStatus } = useContext(AppContext);
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({ 'Mumbai': true });

    // FIX: Explicitly type the accumulator in `reduce` to ensure `leadsByCity` is correctly typed.
    const leadsByCity = useMemo(() => {
        return leads.reduce((acc: Record<string, Lead[]>, lead) => {
            (acc[lead.city] = acc[lead.city] || []).push(lead);
            return acc;
        }, {});
    }, [leads]);
    
    const toggleFolder = (city: string) => {
        setOpenFolders(prev => ({...prev, [city]: !prev[city]}));
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">CRM Leads</h1>
                <div className="flex space-x-2">
                    <Button variant="secondary">
                        <Plus className="h-5 w-5 mr-2"/> Add Lead
                    </Button>
                    <Button>
                        <Upload className="h-5 w-5 mr-2"/> Import Leads
                    </Button>
                </div>
            </div>
            
            <div className="bg-white dark:bg-dark-card shadow-md rounded-lg overflow-hidden">
                <div className="p-4 border-b dark:border-gray-700 font-bold text-lg">Indian Leads</div>
                <div className="p-4 space-y-4">
                {Object.entries(leadsByCity).map(([city, cityLeads]) => (
                    <div key={city}>
                        <button onClick={() => toggleFolder(city)} className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                            <Folder className="h-5 w-5 mr-2 text-yellow-500" />
                            <span className="font-semibold">{city} ({cityLeads.length})</span>
                             <ChevronDown className={`h-5 w-5 ml-auto transition-transform ${openFolders[city] ? 'rotate-180' : ''}`} />
                        </button>
                        {openFolders[city] && (
                            <div className="pl-4 mt-2">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Niche</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                                        {cityLeads.map(lead => <LeadRow key={lead.id} lead={lead} onStatusChange={updateLeadStatus}/>)}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default TelecallerPanel;
