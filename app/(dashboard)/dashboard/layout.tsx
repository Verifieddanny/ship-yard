"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import "../../globals.css";
import TopBar from '@/components/dashboard/top-bar';
import Footer from '@/components/dashboard/footer';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/use-auth-store';
import DashboardSkeleton from '@/components/dashboard/dashboard-skeleton';
import QueryProvider from '@/providers/query-provider';
import { SocketProvider } from '@/providers/socket-provider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        if (mounted && !token) {
            router.push('/');
        }

    }, [token, router, mounted]);

    if (!mounted || !token) {
        return (
            <html lang="en">
                <body className="bg-[#0A0A0A]">
                    <DashboardSkeleton />
                </body>
            </html>
        );
    }

    return (
        <QueryProvider>

            <html lang="en">
                <body className="bg-[#0A0A0A]">
                    <SocketProvider>
                        <div className="flex max-h-screen h-full text-white font-sans overflow-hidden no-scrollbar relative">

                            <div className={`
                        fixed inset-y-0 left-0 z-100 transform h-screen md:sticky top-0 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out bg-[#0A0A0A]
                        ${isSidebarOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:w-64'}
                    `}>
                                <Sidebar onClose={() => setIsSidebarOpen(false)} />
                            </div>

                            {isSidebarOpen && (
                                <div
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                                    onClick={() => setIsSidebarOpen(false)}
                                />
                            )}

                            <div className="flex-1 flex flex-col min-w-0 min-h-screen relative overflow-y-scroll  no-scrollbar">
                                <TopBar setIsSidebarOpen={setIsSidebarOpen} />

                                <main className="p-4 md:p-8 flex-1 bg-[#0a0a0a]">
                                    {children}
                                </main>

                                <Footer />
                            </div>
                        </div>
                    </SocketProvider>
                </body>
            </html>
        </QueryProvider>
    );
}