"use client";
import React, { createContext, useContext, useEffect } from 'react';
import { socket } from '@/lib/socket';
import { useAuthStore } from '@/store/use-auth-store';
import { useProjectStore } from '@/store/use-project-store';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuthStore();
    const { addLog } = useProjectStore();

    useEffect(() => {
        if (!token) {
            socket.disconnect();
            return;
        }

        if (!socket.connected) {
            socket.connect();
        }

        const logHandler = (data: any) => {
            addLog(data.buildId, {
                lineNumber: data.lineNumber,
                log: data.log,
                type: data.type || 'info'
            });
        };

        socket.on("build_logs", logHandler);
        socket.on("run_logs", logHandler);
        socket.on("build_errors", (data) => addLog(data.buildId, { ...data, type: 'error' }));
        socket.on("run_error", (data) => addLog(data.buildId, { ...data, type: 'error' }));

        return () => {
            socket.off("build_logs", logHandler);
            socket.off("run_logs", logHandler);
            socket.off("build_errors");
            socket.off("run_error");
        };
    }, [token, addLog]);

    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    );
};