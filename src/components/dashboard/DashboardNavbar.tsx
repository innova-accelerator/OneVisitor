
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Settings, MonitorSmartphone, HelpCircle } from "lucide-react";
import { useContext } from "react";
import { TenantContext } from "@/App";

export const DashboardNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { tenantBranding } = useContext(TenantContext);

  const isActive = (path: string) => {
    return currentPath.includes(path);
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-sm backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/dashboard" className="flex items-center flex-shrink-0">
              {tenantBranding?.logo ? (
                <img src={tenantBranding.logo} alt="Logo" className="h-8 w-auto" />
              ) : (
                <img 
                  src="/onevisitor-logo.svg" 
                  alt="OneVisitor" 
                  className="h-8 w-auto" 
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.style.display = 'none';
                    // Show shield icon as fallback if image fails to load
                    const shield = document.createElement('div');
                    shield.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>';
                    e.currentTarget.parentNode?.appendChild(shield.firstChild!);
                  }}
                />
              )}
              <span className="ml-2 text-xl font-bold">
                {tenantBranding?.name || "OneVisitor"}
              </span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/dashboard/kiosks">
                <Button 
                  variant={isActive("/dashboard/kiosks") ? "secondary" : "ghost"}
                  className="text-primary-foreground hover:text-primary-foreground"
                >
                  <MonitorSmartphone className="h-4 w-4 mr-2" />
                  Sites
                </Button>
              </Link>
              <Link to="/dashboard/visitors">
                <Button 
                  variant={isActive("/dashboard/visitors") ? "secondary" : "ghost"}
                  className="text-primary-foreground hover:text-primary-foreground"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Visitors
                </Button>
              </Link>
              <Link to="/dashboard/users">
                <Button 
                  variant={isActive("/dashboard/users") ? "secondary" : "ghost"}
                  className="text-primary-foreground hover:text-primary-foreground"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </Button>
              </Link>
              <Link to="/dashboard/settings">
                <Button 
                  variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
                  className="text-primary-foreground hover:text-primary-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Link to="/dashboard/help">
                <Button 
                  variant={isActive("/dashboard/help") ? "secondary" : "ghost"}
                  className="text-primary-foreground hover:text-primary-foreground"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
