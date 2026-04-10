import { useAuthStore } from "@/store/use-auth-store";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8080";

export const socket: Socket = io(SOCKET_URL, {
    withCredentials: true,
    auth: (cb) => {
        const token = useAuthStore.getState().token;
        cb({ token });
    },
});