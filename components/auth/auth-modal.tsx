"use client";
import { useEffect } from "react";
import { Rocket, X } from "lucide-react";
import Image from "next/image";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-120  bg-[#201F1F]/60 border border-[#3E4850]/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-200">

                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand/10 blur-3xl rounded-full pointer-events-none" />

                <div className="p-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                        <Rocket className="text-brand" size={25} />
                    </div>

                    <h2 className="text-2xl font-bold font-sans tracking-tight text-white mb-3">
                        Sign in to Shipyard
                    </h2>

                    <p className="text-[#BEC8D2] font-sans text-sm leading-relaxed mb-10 max-w-70">
                        Deploy infrastructure in seconds, not hours. Welcome back to the shipyard.
                    </p>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 px-6 rounded-xl transition-all hover:bg-gray-200 active:scale-[0.98] cursor-pointer"
                    >
                        <Image src="/svg/github-icon.svg" alt="GitHub Logo" width={20} height={20} className='w-5 h-5' />
                        <span className="font-sans">Continue with GitHub</span>
                    </button>

                    <p className="mt-12 font-display text-[11.2px] uppercase tracking-[0.2em] text-[#737373]">
                        Protected by secure shipyard protocols
                    </p>
                </div>

                <button
                    title="close"
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 cursor-pointer"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}