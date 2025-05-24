
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ColorPicker } from "@/components/ui/color-picker";
import { ChevronLeft } from "lucide-react";
import { getTenantByShortname, mockUsers } from "./mockTenants";
import { useToast } from "@/components/ui/use-toast";

const TenantAdminSettingsPage = () => {
  const { tenantShortname } = useParams<{ tenantShortname: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [tenant, setTenant] = useState(getTenantByShortname(tenantShortname || ""));
  const [formValues, setFormValues] = useState({
    name: tenant?.name || "",
    primaryColor: tenant?.primaryColor || "#3b82f6",
    logo: tenant?.logo || "",
    primaryContact: tenant?.primaryContact || "",
    primaryAdminId: tenant?.primaryAdminId || "",
    status: tenant?.status === "active",
    subscriptionPlan: tenant?.subscriptionPlan || "Basic",
    maxSites: tenant?.resourceLimits.maxSites || 3,
    maxKiosks: tenant?.resourceLimits.maxKiosks || 5, 
    maxUsers: tenant?.resourceLimits.maxUsers || 10,
    maxVisitorsPerMonth: tenant?.resourceLimits.maxVisitorsPerMonth || 500
  });

  useEffect(() => {
    if (!tenant) {
      toast({
        title: "Organization not found",
        description: "The organization you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/admin/tenants");
    } else {
      setFormValues({
        name: tenant.name,
        primaryColor: tenant.primaryColor,
        logo: tenant.logo || "",
        primaryContact: tenant.primaryContact,
        primaryAdminId: tenant.primaryAdminId,
        status: tenant.status === "active",
        subscriptionPlan: tenant.subscriptionPlan,
        maxSites: tenant.resourceLimits.maxSites,
        maxKiosks: tenant.resourceLimits.maxKiosks,
        maxUsers: tenant.resourceLimits.maxUsers,
        maxVisitorsPerMonth: tenant.resourceLimits.maxVisitorsPerMonth
      });
    }
  }, [tenant, tenantShortname, navigate, toast]);

  const handleInputChange = (field: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare the data for submission
    const updatedTenant = {
      ...tenant,
      name: formValues.name,
      primaryColor: formValues.primaryColor,
      logo: formValues.logo,
      primaryContact: formValues.primaryContact,
      primaryAdminId: formValues.primaryAdminId,
      status: formValues.status ? "active" : "inactive",
      subscriptionPlan: formValues.subscriptionPlan,
      resourceLimits: {
        maxSites: formValues.maxSites,
        maxKiosks: formValues.maxKiosks,
        maxUsers: formValues.maxUsers,
        maxVisitorsPerMonth: formValues.maxVisitorsPerMonth
      }
    };

    // TODO: PUT /api/admin/tenants/:tenantShortname/settings with updatedTenant
    console.log("Saving tenant settings:", updatedTenant);

    toast({
      title: "Settings saved",
      description: `${updatedTenant.name} settings have been updated.`
    });
  };

  if (!tenant) {
    return null; // We'll redirect in useEffect
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin/tenants")}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Organization: {tenant.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
            <CardDescription>
              Manage basic information about this organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input 
                  id="org-name" 
                  value={formValues.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Organization ID</Label>
                <Input 
                  value={tenant.shortname}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">The organization ID cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primary-contact">Primary Contact Email</Label>
                <Input 
                  id="primary-contact" 
                  type="email"
                  value={formValues.primaryContact}
                  onChange={(e) => handleInputChange("primaryContact", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-admin">Primary Administrator</Label>
                <Select 
                  value={formValues.primaryAdminId}
                  onValueChange={(value) => handleInputChange("primaryAdminId", value)}
                >
                  <SelectTrigger className="w-full">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="subscription-plan">Subscription Plan</Label>
                <Select 
                  value={formValues.subscriptionPlan}
                  onValueChange={(value) => handleInputChange("subscriptionPlan", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 flex flex-col">
                <Label htmlFor="status">Subscription Status</Label>
                <div className="flex items-center h-10 space-x-2">
                  <Switch 
                    id="status"
                    checked={formValues.status}
                    onCheckedChange={(checked) => handleInputChange("status", checked)}
                  />
                  <Label htmlFor="status" className="cursor-pointer">
                    {formValues.status ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>
              Customize organization visual identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="org-logo">Logo URL</Label>
                <Input 
                  id="org-logo" 
                  value={formValues.logo}
                  onChange={(e) => handleInputChange("logo", e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <ColorPicker 
                  label="Primary Brand Color"
                  value={formValues.primaryColor}
                  onChange={(color) => handleInputChange("primaryColor", color)}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-4">Branding Preview</h3>
                  <div className="mb-4" style={{ backgroundColor: formValues.primaryColor, height: "4px" }}></div>
                  <div className="flex items-center mb-4">
                    {formValues.logo ? (
                      <img src={formValues.logo} alt="Logo Preview" className="h-8 mr-2" />
                    ) : (
                      <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center mr-2">
                        {formValues.name.charAt(0) || "L"}
                      </div>
                    )}
                    <span className="font-medium">{formValues.name || "Organization Name"}</span>
                  </div>
                  <div className="p-3 rounded-md text-white text-sm mb-3 text-center" style={{ backgroundColor: formValues.primaryColor }}>
                    Primary Color Button
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Limits</CardTitle>
            <CardDescription>
              Set limits for organization resources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="max-sites">Maximum Sites</Label>
                <Input 
                  id="max-sites" 
                  type="number"
                  value={formValues.maxSites}
                  onChange={(e) => handleInputChange("maxSites", parseInt(e.target.value) || 0)}
                  min={1}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-kiosks">Maximum Kiosks</Label>
                <Input 
                  id="max-kiosks" 
                  type="number"
                  value={formValues.maxKiosks}
                  onChange={(e) => handleInputChange("maxKiosks", parseInt(e.target.value) || 0)}
                  min={1}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-users">Maximum Users</Label>
                <Input 
                  id="max-users" 
                  type="number"
                  value={formValues.maxUsers}
                  onChange={(e) => handleInputChange("maxUsers", parseInt(e.target.value) || 0)}
                  min={1}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-visitors">Maximum Visitors per Month</Label>
                <Input 
                  id="max-visitors" 
                  type="number"
                  value={formValues.maxVisitorsPerMonth}
                  onChange={(e) => handleInputChange("maxVisitorsPerMonth", parseInt(e.target.value) || 0)}
                  min={1}
                  step={100}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            type="button"
            onClick={() => navigate("/admin/tenants")}
          >
            Cancel
          </Button>
          <Button type="submit">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TenantAdminSettingsPage;
