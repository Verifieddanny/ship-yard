"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Check } from 'lucide-react';

export default function OrgSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState({ id: 'pipelab-hq', name: 'Pipelab-HQ' });

    const orgs = [
        { id: 'pipelab-hq', name: 'Pipelab-HQ' },
        { id: 'shipyard-core', name: 'Shipyard Core' },
        { id: 'devdanny', name: 'DevDanny' },
    ];

    return (
        <div className="relative w-full font-sans">
            {/* The Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between bg-[#0a0a0a] border rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-200
                    ${isOpen ? 'border-brand/50 ring-1 ring-brand/20' : 'border-white/10 hover:border-white/20'}
                `}
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-brand/10 border border-brand/20">
                        <Image src="/svg/github.svg" alt="GitHub" width={14} height={14} />
                    </div>
                    <span className="font-medium">{selected.name}</span>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                    <div className="absolute left-0 right-0 mt-2 z-20 bg-[#0a0a0a] border border-white/10 rounded-2xl py-2 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
                        {orgs.map((org) => (
                            <button
                                type='button'
                                key={org.id}
                                onClick={() => {
                                    setSelected(org);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors
                                    ${selected.id === org.id ? 'text-brand bg-brand/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                                    {org.name}
                                </div>
                                {selected.id === org.id && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}