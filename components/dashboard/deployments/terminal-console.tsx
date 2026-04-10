"use client";
import { useEffect, useRef, useState } from 'react';
import { Download, Maximize2, Minimize2 } from 'lucide-react';
import LogLine from './log-line';
import { useProjectStore } from '@/store/use-project-store';
import { useParams } from 'next/navigation';
import { useProjects } from '@/hooks/use-projects';

export default function TerminalConsole() {
    const { id: buildIdFromUrl } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data: projects } = useProjects();
    const {logs, setInitialLogs } = useProjectStore();

    const activeBuildId = Number(buildIdFromUrl);
    const currentLogs = activeBuildId ? logs[activeBuildId] || [] : [];

    useEffect(() => {
        const allBuilds = projects?.flatMap(p => p.builds || []) || [];
        const specificBuild = allBuilds.find(b => b.id === activeBuildId);

        if (specificBuild?.logs && specificBuild.logs.length > currentLogs.length) {
            setInitialLogs(activeBuildId, specificBuild.logs);
        }
    }, [projects, activeBuildId])

    useEffect(() => {
        if (!projects || !activeBuildId) return;

        const allBuilds = projects.flatMap(p => p.builds || []);
        const specificBuild = allBuilds.find(b => b.id === activeBuildId);

        if (specificBuild?.logs && specificBuild.logs.length > currentLogs.length) {
            setInitialLogs(activeBuildId, specificBuild.logs);
        }
    }, [projects, activeBuildId, setInitialLogs]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentLogs]);

    return (
        <div className={`
            bg-[#0D0D0D]  border border-white/5 rounded-xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out
            ${isExpanded ? 'fixed inset-0 z-100 m-0 rounded-none h-screen' : 'relative h-125 shadow-2xl'}
        `}>
            <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        Live Console Output {isExpanded && '— FULLSCREEN'}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-gray-500">
                    <Download size={14} className="hover:text-white cursor-pointer transition-colors" />
                    <button
                        type='button'
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hover:text-white cursor-pointer transition-colors outline-none"
                    >
                        {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto  no-scrollbar p-6 font-mono text-[13px] space-y-1 custom-scrollbar bg-black/20">
                {currentLogs.length > 0 ? (
                    currentLogs.map((log, idx) => (
                        <LogLine
                            key={`${activeBuildId}-${idx}`}
                            line={log.lineNumber.toString().padStart(2, '0')}
                            type={log.type}
                            text={log.log}
                        />
                    ))
                ) : (
                    <div className="text-gray-600 animate-pulse font-mono">
                        {`[SYSTEM]: Establishing stream for Build #${activeBuildId}...`}
                        <br />
                        Waiting for logs...
                    </div>
                )}
                <div className="flex gap-4 pl-1">
                    <span className="text-gray-700 select-none">
                        {(currentLogs.length + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="w-2 h-4 bg-brand animate-pulse mt-1" />
                </div>
            </div>
        </div>
    );
}