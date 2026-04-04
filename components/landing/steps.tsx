import React from 'react';
import { Rocket } from 'lucide-react';
import Image from "next/image";


export default function Steps() {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 bg-[#1A1A1A]/50 border border-white/5 rounded-4xl p-12 lg:p-20 overflow-hidden">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand)_0%,transparent_100%)] opacity-[0.03]" />

                    <div className="relative z-10 w-full md:w-[20.7rem] h-59 bg-[#222222] border border-white/5 rounded-3xl p-4 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10 shadow-inner">
                            <Image src="/svg/github.svg" alt="GitHub Logo" width={24} height={24} className='w-6 h-6' />
                        </div>
                        <h3 className="text-2xl font-bold font-sans mb-4 tracking-tight">1. Push Code</h3>
                        <p className="text-[#BEC8D2] font-sans leading-relaxed text-left">
                            Connect your repository in one click. We support GitHub, GitLab, and Bitbucket.
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center justify-center flex-1 w-full md:w-auto h-24 md:h-auto mx-16">


                        <div className="relative z-10 flex flex-col items-center gap-4 md:rotate-0 rotate-90">
                            <div className='flex flex-col justify-center items-center'>
                                <div className="absolute w-28 md:w-[20rem] h-px bg-linear-to-r from-transparent via-[#89CEFF]/50 to-transparent shadow-[0_0_15px_rgba(137,206,255,0.3)]" />
                                <div className="w-2.5 h-2.5 bg-[#89CEFF] rounded-full shadow-[0_0_12px_#89CEFF] animate-pulse" />
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#89CEFF]/70 whitespace-nowrap md:block hidden">
                                Shipyard Orchestration
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 w-full md:w-[20.7rem] h-59 bg-[#222222] border border-white/5 rounded-3xl p-4 flex flex-col items-center text-center shadow-2xl shadow-brand/5">
                        <div className="w-16 h-16 bg-[#2A2A2A] rounded-2xl flex items-center justify-center mb-4 border border-white/10 shadow-inner py-6">
                            <Rocket className="text-brand" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-sans mb-4 tracking-tight text-brand">2. Go Live</h3>
                        <p className="text-[#BEC8D2] font-sans leading-relaxed text-left">
                            Deploy to globally distributed edge nodes. Automatic SSL, CDN, and DDoS protection.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}