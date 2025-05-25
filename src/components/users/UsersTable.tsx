
import React from 'react';
import { User } from '@/types/user';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDeactivate: (user: User) => void;
  onManagePermissions: (user: User) => void;
  orgAccess: Record<string, 'Viewer'|'Admin'>;
  onOrgAccessChange: (user: User, level: 'Viewer'|'Admin') => void;
}

export function UsersTable({ 
  users, 
  onEdit, 
  onDeactivate,
  onManagePermissions,
  orgAccess,
  onOrgAccessChange
}: UsersTableProps) {
  
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: { row: { original: User } }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }: { row: { original: User } }) => (
        <select
          value={orgAccess[row.original.id] || 'Viewer'}
          onChange={e => onOrgAccessChange(row.original, e.target.value as 'Viewer'|'Admin')}
          className="border rounded px-2 py-1"
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
      ),
    },
    {
      accessorKey: "siteAccess",
      header: "Site Access",
      cell: ({ row }: { row: { original: User } }) => (
        <Button 
          variant="link" 
          size="sm"
          onClick={() => onManagePermissions(row.original)}
        >
          Manage...
        </Button>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }: { row: { original: User } }) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          row.original.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: User } }) => (
        <div className="text-right space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </Button>
          {row.original.isActive && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onDeactivate(row.original)}
            >
              Deactivate
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable 
      columns={columns}
      data={users}
      noDataMessage="No users found"
    />
  );
}
