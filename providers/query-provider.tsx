"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        refetchOnWindowFocus: true,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

/**
 * import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";

// Inside a component wrapped by the provider:
const queryClient = useQueryClient();

useEffect(() => {
  socket.on("build_finished", (data) => {
    // This tells React Query to immediately re-fetch the project list
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  });

  return () => socket.off("build_finished");
}, [queryClient]);
 */