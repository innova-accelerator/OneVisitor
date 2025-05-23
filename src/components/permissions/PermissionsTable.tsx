
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ConfirmRemoveDialog } from "./ConfirmRemoveDialog";
import { Permission } from '@/pages/dashboard/sites/sitePath/permissions';
import { Edit, Trash2 } from 'lucide-react';

interface PermissionsTableProps {
  permissions: Permission[];
  onEdit: (perm: Permission) => void;
  onRemove: (id: string) => void;
}

export function PermissionsTable({ permissions, onEdit, onRemove }: PermissionsTableProps) {
  const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);
  const [pendingRemoveName, setPendingRemoveName] = useState<string>('');
  
  const handleRemoveClick = (id: string, name: string) => {
    setPendingRemoveId(id);
    setPendingRemoveName(name);
  };

  const handleConfirmRemove = () => {
    if (pendingRemoveId) {
      onRemove(pendingRemoveId);
      setPendingRemoveId(null);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No permissions configured yet
                </TableCell>
              </TableRow>
            ) : (
              permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium">{permission.userName}</TableCell>
                  <TableCell>{permission.userEmail}</TableCell>
                  <TableCell>{permission.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      permission.level === 'Admin' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {permission.level}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEdit(permission)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveClick(permission.id, permission.userName)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmRemoveDialog
        isOpen={pendingRemoveId !== null}
        itemLabel={`permission for ${pendingRemoveName}`}
        onConfirm={handleConfirmRemove}
        onCancel={() => setPendingRemoveId(null)}
      />
    </>
  );
}
