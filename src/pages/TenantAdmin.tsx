
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Building, Plus, Trash2, Edit, Globe, Users, Settings, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tenant {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
  status: "active" | "pending" | "suspended";
  userCount: number;
}

const TenantAdmin = () => {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: "acme-corp",
      name: "Acme Corporation",
      domain: "acme.com",
      createdAt: "2023-05-15",
      status: "active",
      userCount: 120,
    },
    {
      id: "globex",
      name: "Globex Industries",
      domain: "globex-ind.com",
      createdAt: "2023-06-22",
      status: "active",
      userCount: 84,
    },
    {
      id: "stark-ind",
      name: "Stark Industries",
      domain: "stark.tech",
      createdAt: "2023-07-10",
      status: "pending",
      userCount: 45,
    },
    {
      id: "wayne-ent",
      name: "Wayne Enterprises",
      domain: "wayne.org",
      createdAt: "2023-08-05",
      status: "active",
      userCount: 92,
    }
  ]);
  
  const [newTenant, setNewTenant] = useState({
    name: "",
    domain: "",
    primaryColor: "#3B82F6",
    logo: ""
  });
  
  const { toast } = useToast();

  const handleCreateTenant = () => {
    if (!newTenant.name || !newTenant.domain) {
      toast({
        title: "Validation Error",
        description: "Organization name and domain are required",
        variant: "destructive",
      });
      return;
    }

    // Create new tenant ID from name
    const tenantId = newTenant.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const tenant: Tenant = {
      id: tenantId,
      name: newTenant.name,
      domain: newTenant.domain,
      createdAt: new Date().toISOString().split('T')[0],
      status: "pending",
      userCount: 0
    };
    
    setTenants([...tenants, tenant]);
    
    toast({
      title: "Organization created",
      description: `${newTenant.name} has been created successfully`,
    });
    
    // Reset form
    setNewTenant({
      name: "",
      domain: "",
      primaryColor: "#3B82F6",
      logo: ""
    });
  };
  
  const handleDeleteTenant = (id: string) => {
    setTenants(tenants.filter(tenant => tenant.id !== id));
    
    toast({
      title: "Organization deleted",
      description: "The organization has been removed from the system",
    });
  };

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
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tenant Administration</h1>
          <p className="text-gray-600">Manage organizations and their configurations</p>
        </div>

        <Tabs defaultValue="organizations" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="organizations">
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Managed Organizations</CardTitle>
                <CardDescription>All organizations on the OneVisitor platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Organization</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Domain</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Users</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tenants.map((tenant) => (
                          <tr key={tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium text-gray-900">{tenant.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{tenant.domain}</td>
                            <td className="py-3 px-4 text-gray-600">{tenant.createdAt}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                variant={tenant.status === "active" ? "default" : "secondary"}
                                className={
                                  tenant.status === "active" ? "bg-green-100 text-green-800" : 
                                  tenant.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-red-100 text-red-800"
                                }
                              >
                                {tenant.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-gray-500" />
                                {tenant.userCount}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Globe className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-red-600"
                                  onClick={() => handleDeleteTenant(tenant.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Create New Organization</CardTitle>
                <CardDescription>Add a new tenant to the OneVisitor platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input 
                        id="org-name" 
                        placeholder="Acme Corporation" 
                        value={newTenant.name}
                        onChange={(e) => setNewTenant({...newTenant, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="org-domain">Primary Domain</Label>
                      <Input 
                        id="org-domain" 
                        placeholder="acme.com" 
                        value={newTenant.domain}
                        onChange={(e) => setNewTenant({...newTenant, domain: e.target.value})}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Used for email matching and subdomain creation
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="org-color">Primary Brand Color</Label>
                      <div className="flex space-x-2">
                        <input 
                          type="color" 
                          id="org-color" 
                          className="h-10 w-10 border border-gray-300 rounded"
                          value={newTenant.primaryColor}
                          onChange={(e) => setNewTenant({...newTenant, primaryColor: e.target.value})}
                        />
                        <Input 
                          value={newTenant.primaryColor}
                          onChange={(e) => setNewTenant({...newTenant, primaryColor: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="org-logo">Organization Logo URL</Label>
                      <Input 
                        id="org-logo" 
                        placeholder="https://example.com/logo.png" 
                        value={newTenant.logo}
                        onChange={(e) => setNewTenant({...newTenant, logo: e.target.value})}
                      />
                    </div>
                    <Button 
                      className="w-full mt-6" 
                      onClick={handleCreateTenant}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Organization
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Organization Preview</h3>
                    <div className="p-4 border border-gray-200 rounded bg-white">
                      <div className="flex items-center space-x-2 mb-4">
                        {newTenant.logo ? (
                          <img src={newTenant.logo} alt="Logo" className="h-8 w-8" />
                        ) : (
                          <div 
                            className="h-8 w-8 rounded flex items-center justify-center text-white" 
                            style={{backgroundColor: newTenant.primaryColor || "#3B82F6"}}
                          >
                            {newTenant.name.charAt(0) || "O"}
                          </div>
                        )}
                        <span className="font-bold">{newTenant.name || "New Organization"}</span>
                      </div>
                      <div 
                        className="h-2 w-full rounded"
                        style={{backgroundColor: newTenant.primaryColor || "#3B82F6"}}
                      ></div>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>Subdomain: {newTenant.name ? newTenant.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : "organization"}.onevisitor.app</p>
                        <p>Email domain: {newTenant.domain || "example.com"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure global platform settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Require MFA for all admins</Label>
                          <p className="text-sm text-gray-500">Enforce multi-factor authentication for administrators</p>
                        </div>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Session timeout</Label>
                          <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                        </div>
                        <select className="p-2 border border-gray-300 rounded">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3">Default Organization Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="default-check-in-fields">Default Check-In Fields</Label>
                        <textarea 
                          id="default-check-in-fields" 
                          className="w-full p-2 border border-gray-300 rounded mt-1" 
                          rows={4}
                          defaultValue="name,email,company,host,purpose"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">
                          Comma-separated list of default fields for new organizations
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Save Platform Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TenantAdmin;
