
import { Shield } from "lucide-react";
import { TenantBranding } from "@/models/tenant";

interface CheckInHeaderProps {
  tenantBranding: TenantBranding | null;
}

export const CheckInHeader = ({ site }: CheckInHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="mb-4 flex justify-center">
        {site?.logo ? (
          <img 
            src={site.logo} 
            alt="Organization Logo" 
            className="h-16 w-auto"
          />
        ) : (
          <Shield 
            className="h-16 w-16" 
            style={{ color: site?.primaryColor || "#3498db" }}
          />
        )}
      </div>
      <h1 
        className="text-xl font-bold text-gray-900"
        style={site ? { color: site.primaryColor } : {}}
      >
        {site?.name || "OneVisitor"}
      </h1>
      <p className="text-gray-600 mt-2">
        {site?.welcomeMessage}
      </p>
    </div>
  );
};
