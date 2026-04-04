"use client";
import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import ProjectCard from '@/components/dashboard/components/project-card';

export default function DashboardPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

                <ProjectCard
                    viewMode={viewMode}
                    name="nebula-api-v2"
                    repo="pipelab/nebula-core"
                    status="RUNNING"
                    meta="Last deploy 12m ago by @alex_stack"
                    progress={70}
                />
                <ProjectCard
                    viewMode={viewMode}
                    name="shuttle-auth-service"
                    repo="pipelab/auth-go"
                    status="FAILED"
                    error="Build error in main.go:42"
                    errorMessage="Error: expected 'package', found 'EOF'"
                />
                <ProjectCard
                    viewMode={viewMode}

                    name="oceanic-dashboard-ui"
                    repo="pipelab/ui-kit"
                    status="PASSED"
                    meta="Deployed 4h ago by @system"
                    segments={[1, 1, 1, 1]}
                />
                <ProjectCard
                    viewMode={viewMode}

                    name="internal-tooling-sdk"
                    repo="pipelab/sdk"
                    status="QUEUED"
                    emptyState="Waiting for available runner..."
                />



                {viewMode === 'grid' && (
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


            </div>
        </div>


    );
}

