
import React from 'react';
import { Shield, LogOut } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useTenant } from '@/context/TenantContext';
import TenantBranding from '@/components/TenantBranding';

export function Header() {
  const { tenantBranding } = useTenant();
  const navigate = useNavigate();
  
  // Simple logout handler that redirects to login page
  const handleLogout = () => {
    // TODO: Implement actual logout logic when auth is integrated
    navigate('/login');
  };
  
  return (
    <header className="flex items-center justify-between px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white" style={{ height: '64px' }}>
      <Link to="/dashboard" className="flex items-center space-x-2">
        {tenantBranding?.logo ? (
          <img
            src={tenantBranding.logo}
            alt={tenantBranding.name}
            className="h-8 w-auto"
          />
        ) : (
          <Shield className="h-6 w-6 text-white" />
        )}
        <span className="text-xl font-semibold">{tenantBranding?.name || 'OneVisitor'}</span>
      </Link>
      <div className="flex items-center">
        <nav className="space-x-4">
          <Link to="/dashboard/kiosks" className="text-white hover:text-gray-100">Sites</Link>
          <Link to="/dashboard/visitors" className="text-white hover:text-gray-100">Visitors</Link>
          <Link to="/dashboard/users" className="text-white hover:text-gray-100">Users</Link>
          <Link to="/dashboard/settings" className="text-white hover:text-gray-100">Settings</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="ml-4 bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 flex items-center"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </button>
      </div>
    </header>
  );
}
