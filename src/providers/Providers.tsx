"use client";

import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
     const [queryClient] = useState(() => new QueryClient());

     return (
          <QueryClientProvider client={queryClient}>
               <AuthProvider>{children}</AuthProvider>
               <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
     );
}
