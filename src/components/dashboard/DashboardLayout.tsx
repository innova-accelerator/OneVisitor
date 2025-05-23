
import { ReactNode } from "react";
import { DashboardNavbar } from "./DashboardNavbar";
import { TenantSelector } from "./TenantSelector";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TenantSelector />
        {children}
      </div>
    </div>
  );
};
