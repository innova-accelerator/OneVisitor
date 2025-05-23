
import React from 'react';
import { Shield } from "lucide-react";
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
      <Link to="/dashboard" className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-bold text-gray-800">OneVisitor</span>
      </Link>
      <nav className="space-x-4">
        <Link to="/dashboard/kiosks" className="text-gray-600 hover:text-gray-800">Sites</Link>
        <Link to="/dashboard/visitors" className="text-gray-600 hover:text-gray-800">Visitors</Link>
        <Link to="/dashboard/settings" className="text-gray-600 hover:text-gray-800">Settings</Link>
        <Link to="/dashboard/users" className="text-gray-600 hover:text-gray-800">Users</Link>
        <Link to="/help" className="text-gray-600 hover:text-gray-800">Help</Link>
      </nav>
    </header>
  );
}
