"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, List, Loader2 } from 'lucide-react';
import ProjectCard from '@/components/dashboard/components/project-card';
import { Project, useProjects } from '@/hooks/use-projects';
import { formatDistanceToNow } from 'date-fns';
import { useProjectStore } from '@/store/use-project-store';

export default function DashboardPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { setProjects, setCurrentProject } = useProjectStore();
    const { data: projects, isLoading, error } = useProjects();

    useEffect(() => {
        if (projects) {
            setProjects(projects);
        }
    }, [projects, setProjects]);

    const handleProjectClick = (project: Project) => {
        setCurrentProject(project);
        router.push(`/dashboard/projects/${project.id}`);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="w-8 h-8 text-brand animate-spin" />
                <p className="text-gray-500 font-mono text-xs">Fetching your workspace...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-400 p-8 border border-red-500/20 rounded-xl bg-red-500/5">Failed to load projects.</div>;
    }
    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-[10px] font-mono text-brand uppercase tracking-[0.2em] mb-1">Environment / Production</p>
                    <h2 className="text-3xl font-bold tracking-tight">Active Projects</h2>
                </div>
                <div className="flex bg-white/5 border border-white/10 rounded-md p-1">
                    <button
                        title='list'
                        type='button'
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white/10 text-brand shadow-sm' : 'text-gray-500 hover:bg-white/5'}`}
                    >
                        <List size={16} />
                    </button>
                    <button
                        title='grid'
                        type='button'
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white/10 text-brand shadow-sm' : 'text-gray-500 hover:bg-white/5'}`}
                    >
                        <Grid size={16} />
                    </button>
                </div>
            </div>

            <div className={
                viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
            }>

                {projects?.map((project: Project) => {
                    const latestBuild = project.builds?.[0];
                    const status = latestBuild?.status || 'queued';
                    const repoPath = project.repoUrl
                        .replace('https://github.com/', '')
                        .replace('.git', '');
                    return (
                        <div key={project.id} onClick={() => handleProjectClick(project)}>

                            <ProjectCard
                                key={project.id}
                                viewMode={viewMode}
                                name={project.name}
                                repo={repoPath}
                                status={status}
                                meta={latestBuild?.deployment ? `Deployed ${formatDistanceToNow(new Date(latestBuild?.deployment?.createdAt))} ago` : 'Never deployed'}

                                error={status === 'failed' ? 'Build Error' : undefined}
                                errorMessage={latestBuild?.logs[0]?.log || 'No logs available.'}
                                deployedUrl={project.productionUrl || ""}
                            />
                        </div>
                    );
                })}



                {viewMode === 'grid' && projects && projects.length > 0 && (
                    <>
                        <div className="lg:col-span-2 bg-[#141414] border border-white/5 rounded-xl p-8 relative overflow-hidden flex justify-between">
                            <div className="relative z-10 space-y-6">
                                <div>
                                    <p className="text-[10px] font-mono text-brand uppercase tracking-widest mb-2">Quick Insight</p>
                                    <h3 className="text-2xl font-bold">Build Health: 94.2%</h3>
                                    <p className="text-gray-400 text-sm max-w-sm mt-2">
                                        Your deployment stability has increased by 12% since the last sprint cycle.
                                        High velocity maintained across 14 services.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-black/40 border border-white/5 p-4 rounded-lg w-32">
                                        <p className="text-[9px] text-gray-500 font-mono uppercase">Weekly Deploys</p>
                                        <p className="text-xl font-bold">128</p>
                                    </div>
                                    <div className="bg-black/40 border border-white/5 p-4 rounded-lg w-32">
                                        <p className="text-[9px] text-gray-500 font-mono uppercase">Avg Run Time</p>
                                        <p className="text-xl font-bold">1m 42s</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-20 w-1/2 h-full bg-linear-to-t from-brand/20 to-transparent pointer-events-none" />
                        </div>
                    </>
                )}

                {projects?.length === 0 && (
                    <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl">
                        <p className="text-gray-500">No projects found. Deploy your first one!</p>
                    </div>
                )}


            </div>
        </div>


    );
}

