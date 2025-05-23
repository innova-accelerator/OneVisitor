
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, Plus } from "lucide-react";

interface UsersHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddUser: () => void;
}

export function UsersHeader({ searchQuery, onSearchChange, onAddUser }: UsersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <UsersIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Button onClick={onAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
    </div>
  );
}
