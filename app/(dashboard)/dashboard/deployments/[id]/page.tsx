"use client";
import { useParams } from 'next/navigation';
import {
    GitBranch, Hash, Clock, Calendar,
} from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import TerminalConsole from '@/components/dashboard/deployments/terminal-console';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

export default function DeploymentDetailPage() {
    const { id } = useParams();
    const { data: projects, isLoading, refetch } = useProjects();
    const [liveStatus, setLiveStatus] = useState<string | null>(null);

    const allBuilds = projects?.flatMap(p => p.builds || []) || [];
    const currentBuild = allBuilds.find(b => b.id.toString() === id?.toString());
    const [imgSrc, setImgSrc] = useState("https://github.com/identicons/ghost.png");



    useEffect(() => {
        const img = new Image();
        img.onload = () => setImgSrc(`https://github.com/${currentBuild?.commitAuthor}.png`);
        img.onerror = () => { };
        img.src = `https://github.com/${currentBuild?.commitAuthor}.png`;
    }, [currentBuild?.commitAuthor]);


    useEffect(() => {
        if (!isLoading && !currentBuild && projects) {
            refetch();
        }
    }, [currentBuild, isLoading, projects, refetch]);

    useEffect(() => {
        const handleStatusUpdate = (data: { buildId: number, status: string }) => {
            if (data.buildId.toString() === id?.toString()) {
                setLiveStatus(data.status);
            }
        };

        socket.on("buildStatusUpdate", handleStatusUpdate);
        return () => { socket.off("buildStatusUpdate", handleStatusUpdate); };
    }, [id]);


    if (isLoading) {
        return <div className="p-20 text-center animate-pulse font-mono text-gray-500">Loading deployment details...</div>;
    }

    if (!currentBuild) {
        return <div className="p-20 text-center text-red-400 font-mono">Deployment not found.</div>;
    }

    const status = liveStatus || currentBuild.status;
    const buildDate = new Date(currentBuild.startedAt);

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-8 right-8">
                        <div className="w-12 h-12 rounded-full border-2 border-brand/20 p-0.5">
                            <img
                                src={imgSrc}
                                alt={currentBuild.commitAuthor}
                                className="rounded-full"
                                onError={() => setImgSrc("https://github.com/identicons/ghost.png")}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Active Commit</p>
                        <h2 className="text-3xl font-bold tracking-tight max-w-xl leading-tight">
                            {currentBuild.commit}
                        </h2>

                        <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-gray-400">
                            <div className="flex items-center gap-2">
                                <GitBranch size={14} className="text-brand" /> <span>{currentBuild.branch}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Hash size={14} className="text-brand" /> <span>{currentBuild.commitHash?.substring(0, 7) || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-brand" /> <span>{format(buildDate, 'HH:mm a')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-brand" /> <span>{format(buildDate, 'MMM dd')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Health Status Card */}
                <div className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-8">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Health Status</p>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Build Status</span>
                                <span className={`font-bold transition-colors ${status === 'passed' ? 'text-emerald-400' :
                                    status === 'failed' ? 'text-red-400' : 'text-blue-400 animate-pulse'
                                    }`}>
                                    {status.toUpperCase()}
                                </span>
                            </div>
                            {/* Dynamic Progress Bar */}
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-700 ease-out ${status === 'passed' ? 'bg-emerald-400' :
                                        status === 'failed' ? 'bg-red-400' : 'bg-brand'
                                        }`}
                                    style={{
                                        width: status === 'passed' ? '100%' :
                                            status === 'failed' ? '100%' : '60%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terminal Section */}
            <TerminalConsole />
        </div>
    );
}