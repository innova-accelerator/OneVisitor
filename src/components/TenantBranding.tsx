
import { useContext } from 'react';
import { LegacyTenantContext } from "../App";

interface TenantBrandingProps {
  showLogo?: boolean;
  showName?: boolean;
}

/**
 * Component for displaying the current tenant's branding
 * Can be configured to show logo, name, or both
 */
const TenantBranding = ({ showLogo = true, showName = true }: TenantBrandingProps) => {
  const { tenantBranding } = useContext(LegacyTenantContext);
  
  if (!tenantBranding) {
    return null;
  }
  
  const { name, logo, primaryColor } = tenantBranding;
  
  return (
    <div className="flex items-center space-x-2">
      {showLogo && (
        logo ? 
          <img src={logo} alt={`${name} logo`} className="h-6 w-6 rounded object-contain" /> :
          <div 
            className="h-6 w-6 rounded flex items-center justify-center text-xs font-bold text-white" 
            style={{ backgroundColor: primaryColor || '#3B82F6' }}
          >
            {name.charAt(0)}
          </div>
      )}
      {showName && (
        <span 
          className="font-medium"
          style={{ color: primaryColor || 'inherit' }}
        >
          {name}
        </span>
      )}
    </div>
  );
};

export default TenantBranding;
