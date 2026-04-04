"use client";
import {
    GitBranch, Hash, Clock, Calendar,

    ShieldCheck, Server
} from 'lucide-react';
import TerminalConsole from '@/components/dashboard/deployments/terminal-console';

export default function DeploymentDetailPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-8 right-8">
                        <div className="w-12 h-12 rounded-full border-2 border-brand/20 p-0.5">
                            <img src="https://github.com/verifieddanny.png" alt="Avatar" className="rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Active Commit</p>
                        <h2 className="text-3xl font-bold tracking-tight max-w-xl leading-tight">
                            feat: implement distributed caching layer for global edge nodes
                        </h2>

                        <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-gray-400">
                            <div className="flex items-center gap-2">
                                <GitBranch size={14} className="text-brand" /> <span>main</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Hash size={14} className="text-brand" /> <span>8f2a1c9</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-brand" /> <span>14:20 PM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-brand" /> <span>Oct 24</span>
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
                                <span className="text-gray-400">Build Performance</span>
                                <span className="text-emerald-400 font-bold">+12% faster</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="bg-brand h-full" style={{ width: '85%' }} />
                            </div>
                        </div>

                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400 flex items-center gap-2">
                                <ShieldCheck size={14} className="text-brand" /> Security Scan
                            </span>
                            <span className="text-emerald-400">No vulnerabilities</span>
                        </div>

                        <div className="grid grid-cols-2 pt-4 border-t border-white/5 gap-4">
                            <div className="space-y-1">
                                <p className="text-[9px] font-mono text-gray-500 uppercase">Environment</p>
                                <p className="text-sm font-bold">Production</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-mono text-gray-500 uppercase">Provider</p>
                                <p className="text-sm font-bold flex items-center gap-2">
                                    <Server size={12} className="text-brand" /> AWS us-east-1
                                </p>
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

