
import { useState, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { VisitorTable } from "@/components/dashboard/VisitorTable";
import { SettingsTabs } from "@/components/dashboard/SettingsTabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TenantContext } from "@/App";
import KioskCustomization from "./KioskCustomization";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentTenant } = useContext(TenantContext);
  
  useEffect(() => {
    // Redirect to main dashboard view when component mounts
    if (window.location.pathname === "/dashboard") {
      navigate("/dashboard/overview");
    }
  }, [navigate]);
  
  return (
    <DashboardLayout>
      <Routes>
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="visitors" element={<DashboardVisitors />} />
        <Route path="kiosks" element={<KioskCustomization />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Routes>
    </DashboardLayout>
  );
};

const DashboardOverview = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your visitor management dashboard</p>
      </div>
      
      <StatsCards />
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Active Visitors</h2>
        <Button size="sm">View All</Button>
      </div>
      
      <VisitorTable />
      
      <div className="mt-8">
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common visitor management tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-900">New Check-In</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-900">Pre-Register Visitor</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-900">Send Invite</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-900">Emergency Muster</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const DashboardVisitors = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Visitor Management</h1>
        <p className="text-gray-600">View and manage all visitors</p>
      </div>
      
      <Card className="bg-white/70 backdrop-blur-sm border-0 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="flex space-x-2">
              <Button variant="secondary">All Visitors</Button>
              <Button variant="outline">Checked In</Button>
              <Button variant="outline">Checked Out</Button>
            </div>
            <div className="flex space-x-2">
              <Button>Add Visitor</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <VisitorTable />
    </>
  );
};

const DashboardSettings = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your tenant settings</p>
      </div>
      
      <SettingsTabs />
    </>
  );
};

export default Dashboard;
