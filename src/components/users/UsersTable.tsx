
import React from 'react';
import { User } from '@/types/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

/**
 * UsersTable
 * 
 * Displays a table of users with actions for editing and deactivation.
 * Currently uses in-memory data passed as props.
 * 
 * TODO: When implementing API, add sort functionality and loading states.
 */
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Org Access</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Site Access</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No users found
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => {
            // Map role names and filter out Superadmin
            const displayRoles = user.roles
              .filter(r => r !== 'Superadmin')
              .map(r => r === 'TenantAdmin' ? 'Admin' : r);
              
            return (
              <TableRow 
                key={user.id}
                className={!user.isActive ? 'opacity-60' : ''}
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <select
                    value={orgAccess[user.id] || 'Viewer'}
                    onChange={e => onOrgAccessChange(user, e.target.value as 'Viewer'|'Admin')}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </TableCell>
                <TableCell>{displayRoles.join(', ')}</TableCell>
                <TableCell>
                  <Button 
                    variant="link" 
                    size="sm"
                    onClick={() => onManagePermissions(user)}
                  >
                    Manage...
                  </Button>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </Button>
                  {user.isActive && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDeactivate(user)}
                    >
                      Deactivate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
