"use client";
import { Camera } from 'lucide-react';
import { useAuthStore } from '@/store/use-auth-store';
import { format, parseISO } from 'date-fns';

export default function SettingsPage() {
    const { user } = useAuthStore();

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">Profile</h1>
                <p className="text-gray-500 mt-2">Manage your personal information and developer profile.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-4">
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center space-y-6 sticky top-24">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-brand/50 transition-colors">
                                <img
                                    src={user?.avatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button title='profile' type='button' className="absolute -bottom-2 -right-2 bg-brand text-black p-2 rounded-lg shadow-lg hover:scale-110 transition-transform cursor-pointer">
                                <Camera size={18} />
                            </button>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-12">

                    <section className="space-y-6">
                        <div className="flex items-center gap-3 border-l-2 border-brand pl-4">
                            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400">Profile Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SettingsInput label="Username" defaultValue={user?.username} />
                            <SettingsInput label="Email Address" defaultValue={user?.email} type="email" />
                        </div>


                    </section>


                 

                </div>
            </div>
        </div>
    );
}

function SettingsInput({ label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</label>
            <input
                {...props}
                disabled
                className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none focus:border-brand/40 transition-colors"
            />
        </div>
    );
}