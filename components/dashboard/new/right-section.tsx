"use client";
import { useState } from 'react';
import BuildInput from './build-input'
import { FolderOpen, Info, Plus, Settings2, Trash2 } from 'lucide-react'

interface EnvVar {
    id: string;
    key: string;
    value: string;
}

function RightSection({ project, branch }: { project?: string; branch?: string }) {
    const [envVars, setEnvVars] = useState<EnvVar[]>([
        { id: crypto.randomUUID(), key: '', value: '' }
    ]);

    const addVariable = () => {
        setEnvVars([...envVars, { id: crypto.randomUUID(), key: '', value: '' }]);
    };

    const removeVariable = (id: string) => {
        setEnvVars(envVars.filter(v => v.id !== id));
    };

    const updateVariable = (id: string, field: 'key' | 'value', newValue: string) => {
        setEnvVars(envVars.map(v => v.id === id ? { ...v, [field]: newValue } : v));
    };
    return (
        <div className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-8 self-start sticky top-24">
            <div>
                <p className="text-[10px] font-mono text-brand uppercase tracking-widest mb-2">Step 02</p>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Project Configuration</h2>
                <p className="text-gray-500 text-sm">Fine-tune your build settings and environment.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="project-name" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Project Name</label>
                    <input
                        id="project-name"
                        type="text"
                        disabled
                        value={project || ""}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand/50"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="production-branch" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Production Branch</label>
                    <div className="relative">
                        <input
                            id="production-branch"
                            type="text"
                            disabled
                            value={branch || ""}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand/50"
                        />
                        <Settings2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-2 text-sm font-bold">
                    <FolderOpen size={16} className="text-brand" />
                    Build & Output Settings
                </div>

                <div className="space-y-4">
                    <BuildInput label="Install Command" value="npm install" />
                    <BuildInput label="Build Command" value="npm run build" />
                    <BuildInput label="Output Directory" value="dist" icon={<FolderOpen size={14} />} />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        Environment Variables <Info size={12} />
                    </div>
                    <button
                        type="button"
                        onClick={addVariable}
                        className="text-[10px] font-mono text-brand uppercase tracking-widest flex items-center gap-1 hover:opacity-80 cursor-pointer"
                    >
                        <Plus size={12} /> Add Variable
                    </button>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 flex items-start gap-3">
                    <div className="text-brand mt-0.5">⚡</div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                        Projects with environment variables will be <span className="text-brand">CI only</span>. Runtime injection is handled during the orchestration phase.
                    </p>
                </div>

                {/* Rendered List */}
                <div className="space-y-3">
                    {envVars.map((v) => (
                        <div key={v.id} className="flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                            <input
                                placeholder="KEY (e.g. API_TOKEN)"
                                value={v.key}
                                onChange={(e) => updateVariable(v.id, 'key', e.target.value)}
                                className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono outline-none focus:border-brand/40 transition-colors"
                            />
                            <input
                                placeholder="VALUE"
                                value={v.value}
                                onChange={(e) => updateVariable(v.id, 'value', e.target.value)}
                                className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono outline-none focus:border-brand/40 transition-colors"
                            />
                            <button
                                title='trash'
                                type='button'
                                onClick={() => removeVariable(v.id)}
                                className="p-2.5 text-gray-600 hover:text-red-400 border border-white/10 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                disabled={envVars.length === 0}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {envVars.length === 0 && (
                    <p className="text-center text-[10px] text-gray-600 font-mono py-2">No variables added.</p>
                )}
            </div>
        </div>
    )
}

export default RightSection