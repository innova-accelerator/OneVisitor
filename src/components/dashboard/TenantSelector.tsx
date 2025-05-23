
import { useContext } from "react";
import { TenantContext } from "@/App";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const TenantSelector = () => {
  const { currentTenant, setCurrentTenant, tenantBranding, setTenantBranding } = useContext(TenantContext);

  const mockTenants = [
    {
      id: "acme-corp",
      name: "Acme Corporation",
      domain: "acme.com",
      branding: {
        name: "Acme Corporation",
        logo: "https://placehold.co/100x50?text=ACME",
        primaryColor: "#2563eb",
        secondaryColor: "#1e40af",
        font: "Inter"
      }
    },
    {
      id: "globex",
      name: "Globex Industries",
      domain: "globex.com",
      branding: {
        name: "Globex Industries",
        logo: "https://placehold.co/100x50?text=GLOBEX",
        primaryColor: "#10b981",
        secondaryColor: "#059669",
        font: "Roboto"
      }
    }
  ];

  const handleTenantChange = (tenantId: string) => {
    const selectedTenant = mockTenants.find(t => t.id === tenantId);
    if (selectedTenant) {
      setCurrentTenant(selectedTenant.id);
      setTenantBranding(selectedTenant.branding);
    }
  };

  return (
    <Card className="mb-6 bg-white/70 backdrop-blur-sm border-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {tenantBranding?.logo && (
              <img 
                src={tenantBranding.logo} 
                alt={tenantBranding.name} 
                className="h-8"
              />
            )}
            <h2 className="text-lg font-medium text-gray-900">
              {tenantBranding?.name || "Select an organization"}
            </h2>
          </div>
          <div className="w-64">
            <Select
              value={currentTenant || ""}
              onValueChange={handleTenantChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                {mockTenants.map(tenant => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
