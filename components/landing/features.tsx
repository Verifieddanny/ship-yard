import { Sparkles, Terminal, Lock, Globe, Cloud } from 'lucide-react';

export default function Features() {
    return (
        <section className="py-24 bg-background text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight">
                        Engineered for Reliability
                    </h2>
                    <p className="text-[#737373] font-sans text-lg max-w-2xl">
                        Every feature is designed to reduce the surface area of failure.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-6">

                    <div className="col-span-12 lg:col-span-8 relative bg-[#1A1A1A] border border-white/5 rounded-3xl p-10 overflow-hidden group">
                        <div className="absolute top-6 right-6">
                            <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                                Docker-Native
                            </span>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-12 border border-blue-500/20">
                            <Sparkles className="text-brand" size={24} />
                        </div>
                        <div className="max-w-md space-y-4">
                            <h3 className="text-2xl font-bold font-sans">Automatic Dockerfile generation</h3>
                            <p className="text-[#BEC8D2] font-sans leading-relaxed">
                                Stop writing boilerplate. Shipyard analyzes your package.json, go.mod, or requirements.txt
                                to generate optimized multi-stage production builds automatically.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4 bg-[#1A1A1A] border border-white/5 rounded-3xl p-10 flex flex-col justify-between">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-12 border border-emerald-500/20">
                            <Terminal className="text-emerald-400" size={24} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold font-sans">Real-time build logs</h3>
                            <p className="text-[#BEC8D2] font-sans leading-relaxed">
                                Streaming logs directly from the builder. Debug issues in real-time with full history and searchable traces.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4 bg-[#1A1A1A] border border-white/5 rounded-3xl p-10">
                        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-12 border border-red-500/20">
                            <Lock className="text-red-400" size={24} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold font-sans">Encrypted secrets</h3>
                            <p className="text-[#BEC8D2] font-sans leading-relaxed">
                                Military-grade encryption for your environment variables. Injected only at runtime, never stored in plaintext.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-8 relative bg-[#1A1A1A] border border-white/5 rounded-3xl p-10 overflow-hidden flex flex-col lg:flex-row justify-between">
                        <div className="relative z-10 max-w-sm flex flex-col justify-between h-full">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-12 border border-blue-500/20">
                                <Cloud className="text-brand" size={24} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold font-sans">Edge Infrastructure</h3>
                                <p className="text-[#BEC8D2] font-sans leading-relaxed">
                                    Deploy to over 20 regions globally. Lower latency for your users by moving execution closer to the requester.
                                </p>
                            </div>
                        </div>

                        <div className="absolute -right-20 -bottom-20 opacity-20 lg:opacity-40">
                            <Globe size={400} strokeWidth={0.5} className="text-brand" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}