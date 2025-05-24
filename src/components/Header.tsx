
import React from 'react';
import { Shield } from "lucide-react";
import { Link } from 'react-router-dom';
import { useTenant } from '@/context/TenantContext';
import TenantBranding from '@/components/TenantBranding';

export function Header() {
  const { tenantBranding } = useTenant();
  
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
    </header>
  );
}
