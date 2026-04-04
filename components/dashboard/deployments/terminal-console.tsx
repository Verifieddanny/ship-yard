"use client";
import React, { useEffect, useState } from 'react';
import { Download, Maximize2, Minimize2 } from 'lucide-react';
import LogLine from './log-line';

export default function TerminalConsole() {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsExpanded(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const logs = [
    { line: "01", type: "info", text: "Initializing build environment..." },
    { line: "02", type: "info", text: "Pulling base image: node:20-alpine" },
    { line: "03", type: "info", text: "Cloned repository into /workspace" },
    { line: "15", text: "✓ Deployment active at: https://pipelab-auth-v2.shipyard.app" },
  ];

  const handleDownloadLogs = () => {
    // Format the logs into a single string
    const logText = logs
      .map(log => `${log.line} ${log.type ? `[${log.type}] ` : ''}${log.text}`)
      .join('\n');

    // Create a blob and trigger download
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `build-log-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

    return (
        <div className={`
      bg-[#0D0D0D] border border-white/5 rounded-xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out
      ${isExpanded
                ? 'fixed inset-0 z-100 m-0 rounded-none h-screen'
                : 'relative h-125 shadow-2xl'}
    `}>
            {/* Terminal Header */}
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
                    <Download onClick={handleDownloadLogs} size={14} className="hover:text-white cursor-pointer transition-colors" />

                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hover:text-white cursor-pointer transition-colors outline-none"
                        title={isExpanded ? "Minimize" : "Expand"}
                    >
                        {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 overflow-y-auto p-6 font-mono text-[13px] space-y-1 custom-scrollbar bg-black/20">
                <LogLine line="01" type="info" text="Initializing build environment..." />
                <LogLine line="02" type="info" text="Pulling base image: node:20-alpine" />
                <LogLine line="03" type="info" text="Cloned repository into /workspace" />
                <LogLine line="04" type="info" text="Running dependency resolution (npm install)" />
                <LogLine line="05" text="added 1422 packages in 48s" className="text-gray-400 pl-14" />
                <LogLine line="06" type="info" text="Starting build pipeline..." />
                <LogLine line="07" type="success" text="TypeScript compilation complete (0 errors)" />
                <LogLine line="08" type="info" text="Generating static optimized bundles..." />
                <LogLine line="09" text="File: static/chunks/main-8f2a1c9.js (142kb)" className="text-gray-500 pl-14" />
                <LogLine line="10" text="File: static/chunks/vendor-22bc8a1.js (2.1mb)" className="text-gray-500 pl-14" />
                <LogLine line="11" type="info" text="Uploading assets to edge storage..." />
                <LogLine line="12" type="error" text="Connection timed out on retry 1 of 3 (us-east-1)" />
                <LogLine line="13" type="info" text="Retry 2 successful. Assets synchronized." className="text-emerald-400" />
                <LogLine line="14" type="info" text="Purging global CDN cache..." />
                <LogLine line="15" text="✓ Deployment active at: https://pipelab-auth-v2.shipyard.app" className="text-emerald-400 font-bold pl-8 pt-2" />
                <div className="flex gap-4 pl-1">
                    <span className="text-gray-700 select-none">16</span>
                    <span className="w-2 h-4 bg-brand animate-pulse mt-1" />
                </div>
            </div>
        </div>
    );
}
