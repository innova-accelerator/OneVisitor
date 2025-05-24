
import { useState, useContext } from "react";
import { TenantContext } from "@/App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OrganizationSettings = () => {
  const { currentTenant, tenantBranding } = useContext(TenantContext);
  
  const [orgSettings, setOrgSettings] = useState({
    name: tenantBranding?.name || "",
    primaryColor: tenantBranding?.primaryColor || "#3B82F6",
    logo: tenantBranding?.logo || "",
    billingContact: "",
    primaryAdmin: "",
    subscriptionActive: true
  });

  const mockUsers = [
    { id: "user1", name: "Alice Smith", email: "alice@example.com" },
    { id: "user2", name: "Bob Johnson", email: "bob@example.com" },
    { id: "user3", name: "Charlie Brown", email: "charlie@example.com" }
  ];

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // In a real app, we would upload the file to storage
        // and get a URL back. For now, just use the data URL
        setOrgSettings({
          ...orgSettings,
          logo: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: PUT /api/tenants/:tenantId/settings
    console.log("Saving organization settings:", orgSettings);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organization Administration</h1>
      
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
          <CardDescription>
            Manage your organization details and subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="org-name">Organization Name</Label>
              <Input 
                id="org-name" 
                value={orgSettings.name}
                onChange={(e) => setOrgSettings({...orgSettings, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="primary-color">Primary Brand Color</Label>
              <div className="flex space-x-2">
                <input 
                  type="color" 
                  id="primary-color" 
                  className="h-10 w-10 border border-gray-300 rounded"
                  value={orgSettings.primaryColor}
                  onChange={(e) => setOrgSettings({...orgSettings, primaryColor: e.target.value})}
                />
                <Input 
                  value={orgSettings.primaryColor}
                  onChange={(e) => setOrgSettings({...orgSettings, primaryColor: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="logo">Organization Logo</Label>
              <Input 
                id="logo" 
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="mt-1"
              />
              {orgSettings.logo && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Preview:</p>
                  <img 
                    src={orgSettings.logo}
                    alt="Organization logo preview" 
                    className="h-16 object-contain"
                  />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="billing-contact">Primary Billing Contact</Label>
              <Input 
                id="billing-contact" 
                type="email"
                placeholder="email@example.com"
                value={orgSettings.billingContact}
                onChange={(e) => setOrgSettings({...orgSettings, billingContact: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="primary-admin">Primary Administrator</Label>
              <Select 
                value={orgSettings.primaryAdmin}
                onValueChange={(value) => setOrgSettings({...orgSettings, primaryAdmin: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an administrator" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                This user will have full access to organization settings
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="subscription-status"
                checked={orgSettings.subscriptionActive}
                onCheckedChange={(checked) => setOrgSettings({...orgSettings, subscriptionActive: checked})}
              />
              <Label htmlFor="subscription-status">Subscription Active</Label>
            </div>
          </div>
          
          <Button onClick={handleSave}>
            Save Organization Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationSettings;
