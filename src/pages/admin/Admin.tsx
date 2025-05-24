
import { Routes, Route } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import TenantsIndexPage from "./tenants";
import TenantAdminSettingsPage from "./tenants/[tenantShortname]";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto py-6">
        <Routes>
          <Route path="/" element={<div>Admin Dashboard</div>} />
          <Route path="/tenants" element={<TenantsIndexPage />} />
          <Route path="/tenants/:tenantShortname" element={<TenantAdminSettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
