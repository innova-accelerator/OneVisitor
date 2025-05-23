
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Home, Users, Settings, MonitorSmartphone } from "lucide-react";

export const DashboardNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.includes(path);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center flex-shrink-0">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">OneVisitor</span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/dashboard/overview">
                <Button 
                  variant={isActive("/dashboard/overview") ? "default" : "ghost"}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Overview
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
              <Link to="/dashboard/kiosks">
                <Button 
                  variant={isActive("/dashboard/kiosks") ? "default" : "ghost"}
                >
                  <MonitorSmartphone className="h-4 w-4 mr-2" />
                  Kiosks
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
