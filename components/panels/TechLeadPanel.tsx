
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Project, ProjectStatus, ProjectUpdate } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { Plus, MessageSquare } from '../ui/icons';

const ProjectCard: React.FC<{ project: Project; onUpdate: (project: Project, updateText: string) => void; onStatusChange: (project:Project, status: ProjectStatus) => void; }> = ({ project, onUpdate, onStatusChange }) => {
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [updateText, setUpdateText] = useState('');

    const handleUpdateSubmit = () => {
        if (updateText.trim()) {
            onUpdate(project, updateText);
            setUpdateText('');
            setUpdateModalOpen(false);
        }
    };
    
    return (
        <Card className="mb-4 animate-slide-in">
            <h3 className="font-bold text-lg">{project.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Team: {project.team.join(', ')}</p>
            <div className="my-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
            </div>
            <div className="mt-2 text-xs">
                <p className="font-semibold">Last Update:</p>
                <p className="text-gray-600 dark:text-gray-300 italic">"{project.updates[0]?.text || 'No updates yet.'}"</p>
            </div>
            <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="secondary" onClick={() => setUpdateModalOpen(true)}>
                    <MessageSquare className="h-4 w-4 mr-1" /> Daily Update
                </Button>
                {project.status === ProjectStatus.UPCOMING && <Button size="sm" onClick={() => onStatusChange(project, ProjectStatus.ONGOING)}>Start Project</Button>}
                {project.status === ProjectStatus.ONGOING && <Button size="sm" onClick={() => onStatusChange(project, ProjectStatus.COMPLETED)}>Mark Complete</Button>}
            </div>
            <Modal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)} title={`Daily Update for ${project.name}`}>
                <textarea
                    className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
                    rows={4}
                    placeholder="What did the team complete today?"
                    value={updateText}
                    onChange={(e) => setUpdateText(e.target.value)}
                ></textarea>
                <div className="mt-4 flex justify-end">
                    <Button onClick={handleUpdateSubmit}>Add Update</Button>
                </div>
            </Modal>
        </Card>
    );
};


const TechLeadPanel: React.FC = () => {
    const { projects, addProject, updateProjectStatus, addProjectUpdate } = useContext(AppContext);

    const upcoming = projects.filter(p => p.status === ProjectStatus.UPCOMING);
    const ongoing = projects.filter(p => p.status === ProjectStatus.ONGOING);
    const completed = projects.filter(p => p.status === ProjectStatus.COMPLETED);

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Project Tracker</h1>
                <Button>
                    <Plus className="h-5 w-5 mr-2"/>
                    Add Project
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-200/50 dark:bg-dark-card/50 p-4 rounded-lg">
                    <h2 className="font-bold text-xl mb-4 text-center">Upcoming ({upcoming.length})</h2>
                    {upcoming.map(p => <ProjectCard key={p.id} project={p} onUpdate={(proj, text) => addProjectUpdate(proj.id, text)} onStatusChange={(proj, status) => updateProjectStatus(proj.id, status)} />)}
                </div>
                <div className="bg-gray-200/50 dark:bg-dark-card/50 p-4 rounded-lg">
                    <h2 className="font-bold text-xl mb-4 text-center">Ongoing ({ongoing.length})</h2>
                    {ongoing.map(p => <ProjectCard key={p.id} project={p} onUpdate={(proj, text) => addProjectUpdate(proj.id, text)} onStatusChange={(proj, status) => updateProjectStatus(proj.id, status)} />)}
                </div>
                <div className="bg-gray-200/50 dark:bg-dark-card/50 p-4 rounded-lg">
                    <h2 className="font-bold text-xl mb-4 text-center">Completed ({completed.length})</h2>
                    {completed.map(p => <ProjectCard key={p.id} project={p} onUpdate={(proj, text) => addProjectUpdate(proj.id, text)} onStatusChange={(proj, status) => updateProjectStatus(proj.id, status)} />)}
                </div>
            </div>
        </div>
    );
};

export default TechLeadPanel;
