
import { useState, useContext, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { 
  Users, 
  Shield, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  FileText,
  Calendar,
  Home,
  Settings,
  Building,
  Palette,
  Bell,
  Link as LinkIcon
} from "lucide-react";
import { TenantContext } from "../App";
import { TenantBranding } from "../models/tenant";

// Demo tenant data - in a real app this would come from API
const demoTenants: Record<string, TenantBranding> = {
  "acme-corp": {
    name: "Acme Corporation",
    logo: "https://placehold.co/200x200/3498db/FFFFFF/png?text=ACME",
    primaryColor: "#3498db",
    secondaryColor: "#2980b9",
    font: "Inter, sans-serif"
  },
  "globex": {
    name: "Globex Industries",
    logo: "https://placehold.co/200x200/27ae60/FFFFFF/png?text=GLOBEX",
    primaryColor: "#27ae60",
    secondaryColor: "#2ecc71",
    font: "Roboto, sans-serif"
  }
};

const Dashboard = () => {
  const { currentTenant, setCurrentTenant, setTenantBranding } = useContext(TenantContext);
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If there's a tenant selected in URL or context, use that
    if (currentTenant) {
      setSelectedTenant(currentTenant);
      setTenantBranding(demoTenants[currentTenant]);
    }
  }, [currentTenant, setTenantBranding]);

  const changeTenant = (tenantId: string) => {
    setSelectedTenant(tenantId);
    setCurrentTenant(tenantId);
    setTenantBranding(demoTenants[tenantId]);
  };

  const todayStats = {
    checkedIn: 47,
    preRegistered: 23,
    onSite: 15,
    expired: 8
  };

  const recentVisitors = [
    { name: "Sarah Johnson", company: "Tech Corp", host: "John Smith", time: "2:30 PM", status: "On Site" },
    { name: "Michael Chen", company: "Design Co", host: "Emily Davis", time: "1:45 PM", status: "Checked Out" },
    { name: "Anna Williams", company: "Consulting LLC", host: "David Wilson", time: "11:20 AM", status: "On Site" },
    { name: "Robert Brown", company: "Finance Group", host: "Lisa Anderson", time: "10:15 AM", status: "On Site" }
  ];

  const alerts = [
    { type: "warning", message: "3 visitors have exceeded their scheduled time", time: "5 min ago" },
    { type: "info", message: "Badge printer #2 needs paper refill", time: "15 min ago" },
    { type: "success", message: "Weekly security report generated", time: "1 hour ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">OneVisitor</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/checkin">
                <Button variant="ghost">Check In</Button>
              </Link>
              <Link to="/muster">
                <Button variant="ghost">Emergency</Button>
              </Link>
              <Link to="/admin/tenants">
                <Button variant="ghost">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Organization Selector */}
        {!selectedTenant ? (
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Select Organization</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(demoTenants).map(([tenantId, tenant]) => (
                <Card 
                  key={tenantId} 
                  className="hover:shadow-lg cursor-pointer transition-all duration-300 border-0"
                  onClick={() => changeTenant(tenantId)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {tenant.logo ? (
                        <img src={tenant.logo} alt={`${tenant.name} logo`} className="w-16 h-16 object-contain rounded" />
                      ) : (
                        <div 
                          className="w-16 h-16 flex items-center justify-center text-2xl font-bold text-white rounded" 
                          style={{backgroundColor: tenant.primaryColor}}
                        >
                          {tenant.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold mb-1">{tenant.name}</h3>
                        <div className="flex">
                          <Badge variant="outline" className="mr-2">15 active visitors</Badge>
                          <Badge variant="outline">23 pre-registered</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card 
                className="border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all duration-300"
                onClick={() => navigate('/admin/tenants')}
              >
                <CardContent className="flex flex-col items-center justify-center h-full p-10 text-gray-500">
                  <Building className="h-12 w-12 mb-4" />
                  <p className="text-center font-medium">Add New Organization</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <>
            {/* Tenant Dashboard Header */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Badge className="mr-2 bg-blue-100 text-blue-800 border-blue-200" variant="secondary">
                    {demoTenants[selectedTenant].name}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTenant(null)}>
                    Change Organization
                  </Button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Monitor visitor activity and manage your facility</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Pre-Register Visitors
                </Button>
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Generate Check-in Link
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Checked In Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.checkedIn}</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm opacity-90">+12% from yesterday</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Currently On Site</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.onSite}</div>
                  <div className="flex items-center mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm opacity-90">Active visitors</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Pre-Registered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.preRegistered}</div>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm opacity-90">Upcoming visits</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Expired Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.expired}</div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm opacity-90">Need attention</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="visitors" className="space-y-6">
              <TabsList className="bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="visitors">Recent Visitors</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="settings">Organization Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="visitors">
                <Card className="bg-white/80 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Recent Visitor Activity</CardTitle>
                    <CardDescription>Latest check-ins and current status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentVisitors.map((visitor, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{visitor.name}</div>
                            <div className="text-sm text-gray-600">{visitor.company} • Host: {visitor.host}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">{visitor.time}</div>
                            <Badge 
                              variant={visitor.status === "On Site" ? "default" : "secondary"}
                              className={visitor.status === "On Site" ? "bg-green-100 text-green-800" : ""}
                            >
                              {visitor.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts">
                <Card className="bg-white/80 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Important notifications and warnings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alerts.map((alert, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                          <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                            alert.type === 'warning' ? 'text-orange-500' : 
                            alert.type === 'info' ? 'text-blue-500' : 'text-green-500'
                          }`} />
                          <div className="flex-1">
                            <div className="text-sm text-gray-900">{alert.message}</div>
                            <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle>Branding Configuration</CardTitle>
                      <CardDescription>Customize your visitor experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Organization Logo</Label>
                          <div className="mt-2 p-4 border border-gray-200 rounded flex items-center justify-center">
                            {demoTenants[selectedTenant].logo ? (
                              <img src={demoTenants[selectedTenant].logo} alt="Organization logo" className="h-16 object-contain" />
                            ) : (
                              <div className="h-16 w-16 flex items-center justify-center text-2xl font-bold text-white rounded" style={{backgroundColor: demoTenants[selectedTenant].primaryColor}}>
                                {demoTenants[selectedTenant].name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="mt-2">
                            Change Logo
                          </Button>
                        </div>
                        
                        <div>
                          <Label>Brand Colors</Label>
                          <div className="flex space-x-2 mt-2">
                            <div>
                              <div className="h-8 w-8 rounded" style={{backgroundColor: demoTenants[selectedTenant].primaryColor}}></div>
                              <span className="text-xs text-gray-500">Primary</span>
                            </div>
                            <div>
                              <div className="h-8 w-8 rounded" style={{backgroundColor: demoTenants[selectedTenant].secondaryColor}}></div>
                              <span className="text-xs text-gray-500">Secondary</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Palette className="h-4 w-4 mr-2" />
                          Edit Branding Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle>Check-In Form Configuration</CardTitle>
                      <CardDescription>Customize visitor registration fields</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Required Fields</Label>
                          <div className="flex flex-wrap gap-2">
                            <Badge>Name</Badge>
                            <Badge>Email</Badge>
                            <Badge>Host</Badge>
                            <Badge>Purpose</Badge>
                            <Button variant="outline" size="sm" className="h-6 text-xs">+ Add</Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Optional Fields</Label>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">Phone</Badge>
                            <Badge variant="outline">Company</Badge>
                            <Badge variant="outline">Expected Duration</Badge>
                            <Button variant="outline" size="sm" className="h-6 text-xs">+ Add</Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Visitor Agreement</Label>
                          <div className="p-2 border border-gray-200 rounded bg-gray-50 text-xs text-gray-700">
                            By signing, I agree to follow all security protocols and confidentiality requirements while on premises.
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Edit Form Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                
                  <Card className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Configure how hosts are notified</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <Label className="text-base">Email Notifications</Label>
                            <p className="text-sm text-gray-500">Send emails to hosts when visitors arrive</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <Label className="text-base">SMS Notifications</Label>
                            <p className="text-sm text-gray-500">Send text messages to hosts</p>
                          </div>
                          <input type="checkbox" className="toggle" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <Label className="text-base">Slack Integration</Label>
                            <p className="text-sm text-gray-500">Post visitor arrivals to Slack channel</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Bell className="h-4 w-4 mr-2" />
                          Configure Notifications
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                
                  <Card className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle>Door Access Settings</CardTitle>
                      <CardDescription>Configure automatic door unlock</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <Label className="text-base">Visitor Door Access</Label>
                            <p className="text-sm text-gray-500">Allow visitors to unlock doors from check-in kiosk</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div>
                          <Label>Authorized Doors</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge>Main Entrance</Badge>
                            <Badge>Reception Area</Badge>
                            <Badge>Meeting Room Hallway</Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <Label className="text-base">Access Expiration</Label>
                            <p className="text-sm text-gray-500">How long until access expires</p>
                          </div>
                          <select className="border border-gray-300 rounded p-1">
                            <option>15 minutes</option>
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>4 hours</option>
                          </select>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Shield className="h-4 w-4 mr-2" />
                          Configure Access Control
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
