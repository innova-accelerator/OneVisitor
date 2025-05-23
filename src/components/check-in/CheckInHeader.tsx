
import { Shield } from "lucide-react";
import { TenantBranding } from "@/models/tenant";

interface CheckInHeaderProps {
  tenantBranding: TenantBranding | null;
}

export const CheckInHeader = ({ tenantBranding }: CheckInHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="mb-4 flex justify-center">
        {tenantBranding?.logo ? (
          <img 
            src={tenantBranding.logo} 
            alt="Organization Logo" 
            className="h-16 w-auto"
          />
        ) : (
          <Shield 
            className="h-16 w-16" 
            style={{ color: tenantBranding?.primaryColor || "#3498db" }}
          />
        )}
      </div>
      <h1 
        className="text-xl font-bold text-gray-900"
        style={tenantBranding ? { color: tenantBranding.primaryColor } : {}}
      >
        {tenantBranding?.name || "OneVisitor"}
      </h1>
      <p className="text-gray-600 mt-2">
        Welcome! Please check in for your visit.
      </p>
    </div>
  );
};
