"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Check } from 'lucide-react';
import { Oragnization, useOrganizations } from '@/hooks/use-projects';

export default function OrgSelector({ onSelect, selected }: { onSelect: (val: Oragnization) => void; selected: Oragnization | null }) {
    const { data: orgs, isLoading } = useOrganizations();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (orgs && !selected) onSelect(orgs[0]);
    }, [orgs, selected, onSelect]);

    if (isLoading) {
        return (
            <div className="w-full h-11.5 bg-[#0a0a0a] border border-white/5 rounded-2xl animate-pulse flex items-center px-4 gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/5" />
                <div className="w-24 h-4 bg-white/5 rounded-md" />
                <div className="ml-auto w-4 h-4 bg-white/5 rounded-full" />
            </div>
        );
    }

    return (
        <div className="relative w-full font-sans">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center  cursor-pointer justify-between bg-[#0a0a0a] border rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-200
                    ${isOpen ? 'border-brand/50 ring-1 ring-brand/20' : 'border-white/10 hover:border-white/20'}
                `}
            >
                <div className="flex items-center gap-3 ">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-brand/10 border border-brand/20">
                        <Image src="/svg/github.svg" alt="GitHub" width={14} height={14} />
                    </div>
                    <span className="font-medium">{selected?.login || 'Select Account'}</span>
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
                        {orgs?.map((org) => (
                            <button
                                type='button'
                                key={org.login + org.avatar_url}
                                onClick={() => {
                                    onSelect(org);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors
                                    ${selected?.login === org.login ? 'text-brand bg-brand/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                                `}
                            >

                                <Image src={org.avatar_url || ""} alt={org.login} width={16} height={16} className='w-5 h-5 rounded-full' />
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                                    {org.login}
                                </div>
                                {selected?.login === org.login && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}