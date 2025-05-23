
import React from 'react';
import { UsersTable } from "@/components/users/UsersTable";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";

interface UserTableContainerProps {
  users: User[];
  onEdit: (user: User) => void;
  onDeactivate: (user: User) => void;
  onManagePermissions: (user: User) => void;
}

export function UserTableContainer({ 
  users, 
  onEdit, 
  onDeactivate,
  onManagePermissions
}: UserTableContainerProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <UsersTable
        users={users}
        onEdit={onEdit}
        onDeactivate={onDeactivate}
        onManagePermissions={onManagePermissions}
      />
      
      {/* Static Pagination - No functionality */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {users.length} of {users.length} users
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-primary/10">1</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
