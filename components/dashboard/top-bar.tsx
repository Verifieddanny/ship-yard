"use client"
import { usePathname, useRouter } from 'next/navigation';
import { Clock, ExternalLink, Loader2, Menu, Plus, RotateCcw, Search } from 'lucide-react'
import { useProjectStore } from '@/store/use-project-store';
import { statusColors } from '@/lib/status-color';
import { useRebuild } from '@/hooks/use-projects';
import { useAuthStore } from '@/store/use-auth-store';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

function TopBar({ setIsSidebarOpen }: { setIsSidebarOpen: (open: boolean) => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuthStore();
    const { currentProject, searchTerm, setSearchTerm } = useProjectStore();
    const rebuildMutation = useRebuild();

    const latestBuild = currentProject?.builds?.[0]
    const [liveStatus, setLiveStatus] = useState<string | null>(null);

    const pathParts = pathname.split("/");
    const isDeploymentPage = pathParts.includes("deployments");
    const paramsId = pathParts[pathParts.length - 1];

    useEffect(() => {
        if (!paramsId) return;

        const handleStatusUpdate = (data: { buildId: number, status: string }) => {
            if (data.buildId.toString() === paramsId.toString()) {
                setLiveStatus(data.status);
            }
        };

        socket.on("buildStatusUpdate", handleStatusUpdate);
        return () => { socket.off("buildStatusUpdate", handleStatusUpdate); };
    }, [paramsId]);


    useEffect(() => {
        setLiveStatus(null);
    }, [paramsId]);

    const activeBuild = currentProject?.builds?.find(b => b.id.toString() === paramsId);
    const buildToShow = isDeploymentPage ? activeBuild : currentProject?.builds?.[0];

    const currentStatus = liveStatus || buildToShow?.status || 'queued';

    const handleRebuild = async () => {
        if (!latestBuild) return;

        try {
            const newBuild = await rebuildMutation.mutateAsync(latestBuild.id);
            if (newBuild?.id) {
                router.push(`/dashboard/deployments/${newBuild.id}`);
            }
        } catch (err) {
            console.error("Rebuild failed", err);
        }
    };


    return (
        <header className="min-h-16 border-b border-white/5 px-4 py-3 md:px-8 flex items-center sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-md z-40">
            {pathname === "/dashboard" || pathname === "/dashboard/profile" ? (
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 lg:hidden">
                        <button
                            type='button'
                            title='menu'
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-gray-400 hover:text-white"
                        >
                            <Menu size={24} />
                        </button>
                        <span className="font-bold text-sm">Shipyard</span>
                    </div>

                    {pathname === "/dashboard" ? (<div className="relative hidden md:block w-64 lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/50 transition-colors"
                        />
                    </div>) : (<div className="relative hidden md:block w-64 lg:w-96" />)}

                    <div className="flex items-center gap-3 md:gap-6">
                        <a href='/dashboard/new' type='button' className="bg-brand cursor-pointer text-black font-bold p-2 md:px-4 md:py-1.5 rounded-md text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                            <Plus size={16} /> <span className="hidden md:inline">New Project</span>
                        </a>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">{user?.username}</p>
                                <p className="text-[10px] text-gray-500 font-mono">{user?.email}</p>
                            </div>
                            {user ? (
                                <Image src={user.avatar} alt={user.username} width={32} height={32} className='rounded-full' />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand to-blue-600 border border-white/10 shrink-0" />
                            )}
                        </div>
                    </div>
                </div>
            ) : pathname === "/dashboard/new" ? (
                <div className="flex items-center gap-2 text-sm font-sans text-[#E5E2E1]">
                    <span>/</span>
                    <span className="text-white font-bold">New Project</span>
                </div>
            ) : paramsId ? (
                <div className="flex  items-center justify-between gap-4 w-full py-1 sm:py-0">

                    <div className="flex items-center gap-2 md:gap-3 flex-wrap w-1/2">
                        <button
                            title='menu'
                            type='button'
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-1 lg:hidden text-gray-400 hover:text-white mr-1"
                        >
                            <Menu size={20} />
                        </button>
                        <span className="text-[9px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest">Deployments</span>
                        <span className="text-gray-700">/</span>
                        <span className="text-xs md:text-sm font-mono text-white truncate max-w-20 sm:max-w-none">
                            #{paramsId}
                        </span>
                        <span className={`${statusColors[currentStatus]} text-[8px] md:text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1.5 shrink-0 ml-1`}>
                            <span className={`w-1 h-1 rounded-full ${currentStatus === 'passed' ? 'bg-emerald-400' :
                                currentStatus === 'failed' ? 'bg-red-400' :
                                    'bg-blue-400 animate-pulse'
                                }`} />
                            {currentStatus.toUpperCase()}
                        </span>
                    </div>

                    <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
                        <span className="text-[10px] font-mono text-gray-500 hidden md:flex items-center gap-1.5 sm:mr-2">
                            <Clock size={12} /> <span className="hidden xs:inline text-[9px]">2m 14s</span>
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                type='button'
                                onClick={handleRebuild}
                                disabled={rebuildMutation.isPending || !latestBuild}
                                className="bg-white/5 border border-white/10 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                            >
                                {rebuildMutation.isPending ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : (
                                    <RotateCcw size={14} />
                                )}
                                <span className="hidden xs:inline">
                                    {rebuildMutation.isPending ? 'Queuing...' : 'Rebuild'}
                                </span>
                            </button>

                            <a
                                href={currentProject?.productionUrl}
                                target="_blank"
                                className="bg-brand text-black text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-2 transition-opacity whitespace-nowrap"
                            >
                                <ExternalLink size={14} />
                                <span><span className="hidden xs:inline">Visit </span>Prod</span>
                            </a>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    )
}

export default TopBar