"use client";
import React, { useState } from 'react';
import {
    GitBranch, Clock, ExternalLink, Play,
    CheckCircle2, XCircle, MoreHorizontal, Globe,
    Info, Bell, Trash2, Save
} from 'lucide-react';
import Image from 'next/image';
import BuildRow from '@/components/dashboard/project/build-row';
import ConfigInput from '@/components/dashboard/project/config-input';
import UsageMetric from '@/components/dashboard/project/usage-metric';
import NotificationItem from '@/components/dashboard/project/notification-item';

export default function ProjectDetailPage() {
    const [activeTab, setActiveTab] = useState('Builds');

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* 1. Project Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-bold tracking-tight">Project-Nebula-API</h1>
                        <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            HEALTHY
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-gray-500 tracking-widest">
                        <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Image src="/svg/github.svg" alt="GitHub" width={14} height={14} className="object-contain w-3.5 h-3.5" />
                            github.com/pipelab/nebula-api
                        </a>
                        <div className="flex items-center gap-2">
                            <GitBranch size={14} className="text-brand" /> main
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} /> Last deploy 14m ago
                        </div>
                    </div>
                </div>

            
            </div>

            {/* 2. Tabs Navigation */}
            <div className="flex border-b border-white/5 gap-8">
                {['Builds', 'Deployments'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
              pb-4 text-xs font-bold transition-all relative
              ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
            `}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                        )}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Main Content */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Recent Builds Section */}
                    <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/2">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Recent Builds</span>
                            <MoreHorizontal size={16} className="text-gray-600" />
                        </div>
                        <div className="divide-y divide-white/5">
                            <BuildRow status="Success" commit="feat: implement graphql resolver logic" id="a9c2f4e" time="3m 42s" color="text-emerald-400" />
                            <BuildRow status="Success" commit="fix: circular dependency in auth module" id="7f2d1e0" time="4m 15s" color="text-emerald-400" />
                            <BuildRow status="Failed" commit="chore: update devDependencies" id="4b1a2c3" time="22s" color="text-red-400" />
                        </div>
                    </div>

                    {/* Configuration Section */}
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-8">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Build Configuration</h3>
                            <p className="text-gray-500 text-sm">Configure how Shipyard builds and packages your application.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ConfigInput label="BUILD COMMAND" value="npm run build" />
                            <ConfigInput label="OUTPUT DIRECTORY" value="dist/" />
                        </div>

                        <div className="space-y-4">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Environment Variables</span>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-gray-400"
                                        value="DATABASE_URL"
                                        readOnly
                                        title="Environment variable name"
                                    />
                                    <input
                                        className="flex-2 bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono"
                                        value="••••••••••••••••••••"
                                        readOnly
                                        title="Environment variable value"
                                    />
                                    <button title='trash' type='button' className="p-2.5 text-gray-600 hover:text-red-400"><Trash2 size={16} /></button>
                                </div>
                                <div className="flex gap-2">
                                    <input className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono" placeholder="Key" />
                                    <input className="flex-2 bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono" placeholder="Value" />
                                    <button title='add' type='button' className="p-2.5 text-brand"><Plus size={16} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-6 py-2.5 rounded-md flex items-center gap-2 transition-all">
                                <Save size={14} /> Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="space-y-4 pt-8">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
                            <p className="text-gray-500 text-sm">Irreversibly delete this project and all associated deployments, logs, and artifacts.</p>
                        </div>
                        <button className="border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs font-bold px-6 py-2.5 rounded-md transition-all">
                            Delete Project
                        </button>
                    </div>
                </div>

                {/* Right Column: Side Cards */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Production URL Card */}
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Production URL</p>
                                <a href="#" className="text-lg font-bold hover:text-brand flex items-center gap-2 transition-colors">
                                    nebula-api.pipelab.sh <ExternalLink size={14} />
                                </a>
                            </div>
                            <div className="text-white/10"><Globe size={40} /></div>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500">
                            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500" /> SSL Active</span>
                            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500" /> Global Edge Network</span>
                        </div>
                        {/* Tiny Chart Placeholder */}
                        <div className="h-20 w-full mt-6 bg-linear-to-t from-brand/5 to-transparent border-x border-t border-white/5 rounded-t-lg" />
                    </div>

                    {/* Resource Usage Card */}
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Resources (30d)</p>
                        <div className="space-y-4">
                            <UsageMetric label="Build Minutes" value="142 / 500" progress={30} />
                            <UsageMetric label="Data Transfer" value="12.4 GB / 50 GB" progress={25} />
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System Notifications</p>
                        <NotificationItem
                            icon={<Info className="text-blue-400" size={14} />}
                            text="Infrastructure upgrade scheduled for Saturday, 02:00 UTC. Expect minimal downtime."
                        />
                        <NotificationItem
                            icon={<Bell className="text-amber-400" size={14} />}
                            text="Collaborator @alex_dev has been invited to this project."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


function Plus({ size }: { size: number }) {
    return <Play size={size} className="-rotate-90" />; 
}