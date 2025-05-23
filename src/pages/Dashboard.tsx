
import { useState, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { VisitorTable } from "@/components/dashboard/VisitorTable";
import { GlobalVisitorsDashboard } from "@/components/dashboard/GlobalVisitorsDashboard";
import { SettingsTabs } from "@/components/dashboard/SettingsTabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TenantContext } from "@/App";
import KioskCustomization from "./KioskCustomization";
import { SiteVisitor } from "@/models/kiosk";

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
        <Route path="visitors/*" element={<DashboardVisitors />} />
        <Route path="kiosks/*" element={<KioskCustomization />} />
        <Route path="kiosks/:siteId/visitors" element={<SiteVisitorLog />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="help" element={<DashboardHelp />} />
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
        <Button size="sm" onClick={() => window.location.href = "/dashboard/visitors"}>View All</Button>
      </div>
      
      <VisitorTable />
      
      <div className="mt-8">
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common visitor management tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-900">New Check-In</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-900">Pre-Register Visitor</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-900">Send Invite</span>
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
          <Tabs defaultValue="current">
            <TabsList className="mb-4">
              <TabsTrigger value="current">Current Visitors</TabsTrigger>
              <TabsTrigger value="global">Global Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
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
              
              <div className="mt-6">
                <VisitorTable />
              </div>
            </TabsContent>
            
            <TabsContent value="global">
              <GlobalVisitorsDashboard />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

// New component for per-site visitor logs
const SiteVisitorLog = () => {
  // This would be fetched from the API using the siteId from URL params
  const [visitors, setVisitors] = useState<SiteVisitor[]>([
    {
      id: "v1",
      siteId: "main-office",
      visitorType: "Visitor",
      name: "Jane Smith",
      company: "Acme Corp",
      host: "John Doe",
      checkInTime: "09:30 AM",
      formResponses: {},
      status: "active"
    },
    {
      id: "v2",
      siteId: "main-office",
      visitorType: "Contractor",
      name: "Mike Johnson",
      company: "Build Co",
      host: "Sarah Williams",
      checkInTime: "10:15 AM",
      formResponses: {},
      status: "active"
    },
    {
      id: "v3",
      siteId: "main-office",
      visitorType: "Interview",
      name: "Chris Lee",
      company: "Applicant",
      host: "HR Team",
      checkInTime: "11:00 AM",
      checkOutTime: "12:30 PM",
      formResponses: {},
      status: "checked-out"
    }
  ]);

  const handleCheckOut = (visitorId: string) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === visitorId 
        ? { ...visitor, status: "checked-out", checkOutTime: new Date().toLocaleTimeString() } 
        : visitor
    ));
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Site Visitors</h1>
        <p className="text-gray-600">Visitors for this specific site</p>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border-0 mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Visitor Log</h2>
              <p className="text-sm text-gray-500">All check-ins for this location</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                Export CSV
              </Button>
              <Button>
                Check In Visitor
              </Button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-2">Check-In Time</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Host</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map(visitor => (
                <tr key={visitor.id} className="border-b border-gray-100">
                  <td className="py-3">{visitor.checkInTime}</td>
                  <td className="py-3">
                    {visitor.name}
                    {visitor.company && <div className="text-xs text-gray-500">{visitor.company}</div>}
                  </td>
                  <td className="py-3">{visitor.visitorType}</td>
                  <td className="py-3">{visitor.host}</td>
                  <td className="py-3">
                    {visitor.status === 'active' ? 
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span> :
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Checked out at {visitor.checkOutTime}
                      </span>
                    }
                  </td>
                  <td className="py-3">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      disabled={visitor.status !== 'active'}
                      onClick={() => handleCheckOut(visitor.id)}
                    >
                      {visitor.status === 'active' ? 'Check Out' : 'Checked Out'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
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

const DashboardHelp = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600">Get help with using OneVisitor</p>
      </div>
      
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle>Documentation & Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Getting Started Guide</h3>
            <p className="text-gray-600">Learn how to set up and configure your multi-site kiosk system</p>
            <Button variant="link" className="p-0 h-auto">View Documentation</Button>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">FAQ</h3>
            <p className="text-gray-600">Find answers to frequently asked questions</p>
            <Button variant="link" className="p-0 h-auto">Browse FAQ</Button>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Contact Support</h3>
            <p className="text-gray-600">Get help from our support team</p>
            <Button variant="link" className="p-0 h-auto">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
