"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/use-auth-store';

export default function AuthCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    useEffect(() => {
        const token = searchParams.get('token');
        const username = searchParams.get('username');
        const avatar = searchParams.get('avatar');
        const email = searchParams.get('email');
        const createdAt = searchParams.get('createdAt');

        if (token && username) {
            setAuth(token, { username, avatar: avatar || '', email: email || '', createdAt: createdAt || "" });
            router.push('/dashboard');
        }
    }, [searchParams, setAuth, router]);


    return (
        <div className="h-screen bg-[#0A0A0A] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-gray-400 font-mono text-sm animate-pulse">Authenticating with Shipyard...</p>
            </div>
        </div>
    );
}