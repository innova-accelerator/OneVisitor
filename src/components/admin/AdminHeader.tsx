
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => {
    return path.startsWith(route);
  };

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/admin" className="text-xl font-bold flex items-center">
              <span className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Admin</span>
              OneVisitor
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link 
              to="/admin"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/admin") && !isActive("/admin/tenants") 
                  ? "bg-slate-800 text-white" 
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/tenants"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/admin/tenants") 
                  ? "bg-slate-800 text-white" 
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              Organizations
            </Link>
            <Link 
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
            >
              Exit Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
