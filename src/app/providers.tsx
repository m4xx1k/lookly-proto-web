"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "react-hot-toast";

const AppProviders = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster reverseOrder={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default AppProviders;
