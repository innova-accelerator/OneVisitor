
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Routes, Route, useLocation } from "react-router-dom";
import KioskCustomization from "./KioskCustomization";
import { SettingsTabs } from "@/components/dashboard/SettingsTabs";
import { GlobalVisitorsDashboard } from "@/components/dashboard/GlobalVisitorsDashboard";
import { useContext } from "react";
import { TenantContext } from "@/App";
import Users from "./dashboard/Users";

const Dashboard = () => {
  const { currentTenant } = useContext(TenantContext);
  const location = useLocation();
  const path = location.pathname;
  
  // Determine if we should show stats cards based on the current path
  const showStatsCards = path === "/dashboard" || 
    path === "/dashboard/" || 
    path.includes("/dashboard/visitors");
  
  return (
    <DashboardLayout>
      {showStatsCards && <StatsCards />}
      
      <Routes>
        <Route path="/" element={<GlobalVisitorsDashboard />} />
        <Route path="/visitors" element={<GlobalVisitorsDashboard />} />
        <Route path="/kiosks" element={<KioskCustomization />} />
        <Route path="/settings" element={<SettingsTabs />} />
        <Route path="/settings/organization" element={<SettingsTabs />} />
        <Route path="/settings/integrations" element={<SettingsTabs />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
