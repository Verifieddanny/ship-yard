"use client";
import React from 'react';
import { Camera, AlertTriangle, Shield, User, Mail, Lock } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">Account Settings</h1>
                <p className="text-gray-500 mt-2">Manage your personal information and developer profile.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left: Profile Summary Card */}
                <div className="lg:col-span-4">
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center space-y-6 sticky top-24">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-brand/50 transition-colors">
                                <img
                                    src="https://github.com/verifieddanny.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button title='profile' type='button' className="absolute -bottom-2 -right-2 bg-brand text-black p-2 rounded-lg shadow-lg hover:scale-110 transition-transform cursor-pointer">
                                <Camera size={18} />
                            </button>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-white">Danny Dev</h2>
                            <p className="text-brand font-mono text-xs">@devdanny</p>
                            <p className="text-gray-500 text-sm pt-2">Building the future of CI/CD.</p>
                        </div>

                        <div className="w-full pt-6 border-t border-white/5 space-y-4">
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                <span className="text-gray-500">Member Since</span>
                                <span className="text-white">Oct 2023</span>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Right: Settings Form */}
                <div className="lg:col-span-8 space-y-12">

                    {/* Profile Details Section */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 border-l-2 border-brand pl-4">
                            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400">Profile Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SettingsInput label="Username" defaultValue="Danny Dev" />
                            <SettingsInput label="Email Address" defaultValue="danny@pipelab.io" type="email" />
                        </div>


                    </section>


                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-6 pt-4">
                        <button type='button' className="text-xs font-bold text-gray-500 hover:text-white transition-colors cursor-pointer">
                            Discard Changes
                        </button>
                        <button type='button' className="bg-brand text-black font-bold px-10 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-[0_10px_20px_rgba(56,189,248,0.15)] cursor-pointer">
                            Save Changes
                        </button>
                    </div>

                    {/* Danger Zone */}
                    {/* <div className="bg-red-500/[0.02] border border-red-500/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle size={20} />
              <h3 className="font-bold">Danger Zone</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
              Deleting your account is permanent and cannot be undone. All pipeline data, projects, and secrets will be lost forever.
            </p>
            <button className="border border-red-500/20 text-red-500 font-bold px-6 py-2.5 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer">
              Delete Account
            </button>
          </div> */}
                </div>
            </div>
        </div>
    );
}

// Reusable Input Component
function SettingsInput({ label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</label>
            <input
                {...props}
                className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none focus:border-brand/40 transition-colors"
            />
        </div>
    );
}