"use client";
import { useEffect, useState } from 'react';
import {
    GitBranch, Clock, ExternalLink, MoreHorizontal, Globe,
    Info
} from 'lucide-react';
import Image from 'next/image';
import BuildRow from '@/components/dashboard/project/build-row';
import UsageMetric from '@/components/dashboard/project/usage-metric';
import NotificationItem from '@/components/dashboard/project/notification-item';
import { useProjectStore } from '@/store/use-project-store';
import { useParams } from 'next/navigation';
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';
import DeploymentRow from '@/components/dashboard/project/deployment-row';
import { statusColors } from '@/lib/status-color';
import { Deployment, useProjects, useRollback } from '@/hooks/use-projects';
import ProjectSettings from '@/components/dashboard/project/settings';
import { useAuthStore } from '@/store/use-auth-store';
import { socket } from '@/lib/socket';
import { useQueryClient } from '@tanstack/react-query';

interface buildUpdate {
    projectId: number;
    buildId: number;
    status: "failed" | "running" | "passed";
}
interface deployUpdate {
    projectId: number;
    buildId: number;
    status: string,
    url: string,
}
export default function ProjectDetailPage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Builds');
    const { currentProject, setCurrentProject, setProjects } = useProjectStore();
    const rollbackMutation = useRollback();
    const { data: projects, isLoading } = useProjects();
    const [newSecrets, setNewSecrets] = useState<{ key: string; value: string }[]>([]);

    const { token } = useAuthStore();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!token) return;

        socket.on("buildStatusUpdate", (data: buildUpdate) => {
            if (currentProject && data.projectId === currentProject.id) {
                const updatedBuilds = (currentProject.builds || []).map(b =>
                    b.id === data.buildId ? { ...b, status: data.status } : b
                );
                setCurrentProject({
                    ...currentProject,
                    builds: updatedBuilds
                });
                queryClient.invalidateQueries({ queryKey: ["projects"] });
            }
        });

        socket.on("deploymentUpdate", (data: deployUpdate) => {
            if (currentProject && data.projectId === currentProject.id) {
                setCurrentProject({
                    ...currentProject,
                    productionUrl: data.url
                });
                queryClient.invalidateQueries({ queryKey: ["projects"] });
            }
        });

        socket.on("connect_error", (err) => {
            console.error("Socket Auth Failed:", err.message);
        });

        return () => {
            socket.off("buildStatusUpdate");
            socket.off("deploymentUpdate");
        };
    }, [token, currentProject?.id, queryClient, setCurrentProject]);


    useEffect(() => {
        if (projects && id) {
            setProjects(projects);
            const project = projects.find(p => p.id.toString() === id.toString());
            if (project) {
                setCurrentProject(project);
            }
        }
    }, [projects, id, setProjects, setCurrentProject]);

    if (isLoading && !currentProject) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                <span className="ml-4 text-gray-500 font-mono">Syncing workspace...</span>
            </div>
        );
    }

    if (!currentProject) {
        return <div className="p-20 text-center text-red-400">Project not found.</div>;
    }

    const builds = currentProject.builds || [];
    const latestBuild = builds[0];

    const deployments = builds
        .filter(b => b.deployment)
        .map(b => ({ ...b.deployment, commit: b.commit }));

    const totalBuildMinutes = builds.reduce((acc, build) => {
        if (build.startedAt && build.finishedAt) {
            const start = new Date(build.startedAt);
            const end = new Date(build.finishedAt);
            const duration = differenceInMinutes(end, start);
            return acc + Math.max(duration, 1);
        }
        return acc;
    }, 0);

    const buildLimit = 500;
    const usagePercentage = Math.min((totalBuildMinutes / buildLimit) * 100, 100);

    const handleRollback = async (currentId: number, prevId: number) => {
        if (confirm("Are you sure you want to rollback to this version?")) {
            try {
                await rollbackMutation.mutateAsync({ latestDeploymentId: currentId, previousDeploymentId: prevId });
                // Note: Eventually, you'll redirect to the new build/deployment page here
            } catch (err) {
                console.error("Rollback failed", err);
            }
        }
    };


    const addSecretField = () => {
        setNewSecrets([...newSecrets, { key: '', value: '' }]);
    };

    const updateNewSecret = (index: number, field: 'key' | 'value', val: string) => {
        const updated = [...newSecrets];
        updated[index][field] = val;
        setNewSecrets(updated);
    };

    const removeNewSecret = (index: number) => {
        setNewSecrets(newSecrets.filter((_, i) => i !== index));
    };



    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* 1. Project Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-bold tracking-tight">{currentProject.name}</h1>
                        <span className={`${statusColors[latestBuild?.status || 'queued']} text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1.5`}>
                            <span className={`w-1 h-1 rounded-full ${latestBuild?.status === 'passed' ? 'bg-emerald-400' :
                                    latestBuild?.status === 'failed' ? 'bg-red-400' :
                                        'bg-blue-400 animate-pulse'
                                }`} />
                            {latestBuild?.status?.toUpperCase() || 'IDLE'}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-gray-500 tracking-widest">
                        <a href={currentProject.repoUrl} target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Image src="/svg/github.svg" alt="GitHub" width={14} height={14} className="opacity-50" />
                            {currentProject.repoUrl.replace('https://', '')}
                        </a>
                        <div className="flex items-center gap-2">
                            <GitBranch size={14} className="text-brand" />{currentProject.branch}
                        </div>
                        {latestBuild && (
                            <div className="flex items-center gap-2">
                                <Clock size={14} />
                                {latestBuild.finishedAt
                                    ? `Last deploy ${formatDistanceToNow(new Date(latestBuild.finishedAt).toISOString())} ago`
                                    : 'Build in progress...'}
                            </div>
                        )}
                    </div>
                </div>


            </div>

            {/* 2. Tabs Navigation */}
            <div className="flex border-b border-white/5 gap-8">
                {['Builds', 'Deployments', 'Settings'].map((tab) => (
                    <button
                        type='button'
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-xs font-bold cursor-pointer transition-all relative ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {activeTab === 'Builds' && (
                        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/1">
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Build History</span>
                                <MoreHorizontal size={16} className="text-gray-600" />
                            </div>
                            <div className="divide-y divide-white/5">
                                {builds.map((build) => (
                                    <BuildRow
                                        key={build.id}
                                        status={build.status === 'passed' ? 'Success' : build.status === 'failed' ? 'Failed' : 'Running'}
                                        commit={build.commit}
                                        id={build.id.toString().substring(0, 7)}
                                        time={build.finishedAt ? formatDistanceToNow(new Date(build.finishedAt).toISOString()) : 'Active'}
                                        color={build.status === 'passed' ? 'text-emerald-400' : build.status === 'failed' ? 'text-red-400' : 'text-blue-400'}
                                        buildId={build.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Deployments' && (
                        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/1">
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Active Deployments</span>
                            </div>
                            <div className="divide-y divide-white/5">
                                {deployments.length > 0 ? deployments.map((deploy: Deployment & { commit: string }) => {
                                    const liveDeployments = deployments.filter(d => d.status === "live");
                                    const latestId = liveDeployments[0]?.id;
                                    const prevId = liveDeployments[1]?.id;
                                    return (
                                        <DeploymentRow
                                            key={deploy.id}
                                            id={deploy.id}
                                            status={deploy.status}
                                            commit={deploy.commit}
                                            date={formatDistanceToNow
                                                (new Date(deploy.createdAt).toISOString())}
                                            latest={deploy.id === latestId}
                                            prevDeploymentId={deploy.id === latestId ? prevId : null}
                                            onRollback={handleRollback}
                                        />
                                    )
                                }) : (
                                    <div className="p-12 text-center text-gray-600 text-xs font-mono">No active deployments found.</div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <ProjectSettings currentProject={currentProject} addSecretField={addSecretField} newSecrets={newSecrets} updateNewSecret={updateNewSecret} removeNewSecret={removeNewSecret} setNewSecrets={setNewSecrets} />
                    )}
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">Production URL</p>
                        {currentProject.productionUrl ? (
                            <a href={currentProject.productionUrl} target="_blank" className="text-lg font-bold hover:text-brand flex items-center gap-2 transition-colors">
                                {currentProject.productionUrl.replace('https://', '')} <ExternalLink size={14} />
                            </a>
                        ) : (
                            <span className="text-gray-600 italic text-sm">No live URL</span>
                        )}
                        <div className="mt-6 flex items-center gap-4 text-[10px] font-mono text-gray-500 border-t border-white/5 pt-4">
                            <span className="flex items-center gap-1.5"><Globe size={12} className="text-emerald-500" /> Edge Network</span>
                        </div>
                    </div>

                    <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Resources (Project Life)</p>
                        <div className="space-y-4">
                            <UsageMetric
                                label="Total Build Time"
                                value={`${totalBuildMinutes}m / ${buildLimit}m`}
                                progress={usagePercentage}
                            />
                        </div>

                        <p className="text-[10px] text-gray-500 leading-relaxed italic">
                            * Usage is calculated based on the difference between build start and finish timestamps.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Notifications</p>
                        <NotificationItem icon={<Info className="text-blue-400" size={14} />} text="Build logs now include detailed memory usage." />
                    </div>
                </div>
            </div>
        </div>
    );
}