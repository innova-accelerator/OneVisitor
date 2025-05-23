
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
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center flex-shrink-0">
              {tenantBranding?.logo ? (
                <img src={tenantBranding.logo} alt="Logo" className="h-8 w-auto" />
              ) : (
                <Shield className="h-8 w-8 text-blue-600" />
              )}
              <span className="ml-2 text-xl font-bold text-gray-900">
                {tenantBranding?.name || "OneVisitor"}
              </span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/dashboard/kiosks">
                <Button 
                  variant={isActive("/dashboard/kiosks") ? "default" : "ghost"}
                >
                  <MonitorSmartphone className="h-4 w-4 mr-2" />
                  Sites
                </Button>
              </Link>
              <Link to="/dashboard/visitors">
                <Button 
                  variant={isActive("/dashboard/visitors") ? "default" : "ghost"}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Visitors
                </Button>
              </Link>
              <Link to="/dashboard/settings">
                <Button 
                  variant={isActive("/dashboard/settings") ? "default" : "ghost"}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Link to="/dashboard/help">
                <Button 
                  variant={isActive("/dashboard/help") ? "default" : "ghost"}
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
