import ProtectedRoute from "@/components/auth/protected";
import {
  DashboardHeader,
  DashboardSidebar,
} from "@/components/layout/dashboard";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <ProtectedRoute>
      <div className="w-screen max-w-screen min-h-screen flex grow gap-4 p-4 bg-slate-700 text-slate-200">
        <DashboardSidebar />
        <main className="flex grow flex-col gap-4">
          <DashboardHeader />
          <div className="flex grow bg-slate-800 p-4 rounded-xl shadow-xl overflow-auto max-h-[calc(100vh-116px)]">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default layout;
