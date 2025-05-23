import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TenantSelector } from "@/components/dashboard/TenantSelector";
import { Routes, Route } from "react-router-dom";
import KioskCustomization from "./KioskCustomization";
import { SettingsTabs } from "@/components/dashboard/SettingsTabs";
import { useContext } from "react";
import { TenantContext } from "@/App";

const Dashboard = () => {
  const { currentTenant } = useContext(TenantContext);
  
  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <TenantSelector />
        <StatsCards />
        <Routes>
          <Route path="/kiosks" element={<KioskCustomization />} />
          <Route path="/settings" element={<SettingsTabs />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
