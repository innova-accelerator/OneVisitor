
import React, { useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PermissionsTable } from '@/components/permissions/PermissionsTable';
import { PermissionEditorModal } from '@/components/permissions/PermissionEditorModal';
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { TenantContext } from "@/App";

export interface Permission {
  id: string;
  userName: string;
  userEmail: string;
  role: 'Admin' | 'Staff' | 'Receptionist' | 'SecurityOfficer';
  level: 'Viewer' | 'Admin';
}

const mockPermissions: Permission[] = [
  { id: '1', userName: 'Alice Smith', userEmail: 'alice@example.com', role: 'Staff', level: 'Viewer' },
  { id: '2', userName: 'Bob Johnson', userEmail: 'bob@example.com', role: 'Receptionist', level: 'Admin' },
  { id: '3', userName: 'Charlie Brown', userEmail: 'charlie@example.com', role: 'SecurityOfficer', level: 'Viewer' },
  { id: '4', userName: 'Diana Prince', userEmail: 'diana@example.com', role: 'Admin', level: 'Admin' },
];

export default function SitePermissionsPage() {
  const { currentTenant } = useContext(TenantContext);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);

  // TODO: Fetch real site ID from route params
  const siteId = "mock-site-id";

  // TODO: Fetch real permissions via GET /api/tenants/:tenantId/sites/:siteId/permissions
  // useEffect(() => {
  //   if (currentTenant && siteId) {
  //     fetch(`/api/tenants/${currentTenant}/sites/${siteId}/permissions`)
  //       .then(res => res.json())
  //       .then(data => setPermissions(data));
  //   }
  // }, [currentTenant, siteId]);

  const handleAddPermission = () => {
    setEditingPermission(null);
    setIsModalOpen(true);
  };

  const handleEditPermission = (permission: Permission) => {
    setEditingPermission(permission);
    setIsModalOpen(true);
  };

  const handleRemovePermission = (id: string) => {
    // TODO: call DELETE /api/tenants/:tenantId/sites/:siteId/permissions/:permissionId
    // if (currentTenant) {
    //   fetch(`/api/tenants/${currentTenant}/sites/${siteId}/permissions/${id}`, {
    //     method: 'DELETE'
    //   }).then(() => {
    //     setPermissions(ps => ps.filter(p => p.id !== id));
    //   });
    // }

    // In-memory implementation for now
    setPermissions(ps => ps.filter(p => p.id !== id));
  };

  const handleSavePermission = (data: Omit<Permission, 'id'> & { id?: string }) => {
    if (data.id) {
      // TODO: call PUT /api/tenants/:tenantId/sites/:siteId/permissions/:permissionId
      // if (currentTenant) {
      //   fetch(`/api/tenants/${currentTenant}/sites/${siteId}/permissions/${data.id}`, {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data)
      //   }).then(() => {
      //     setPermissions(ps => ps.map(p => p.id === data.id ? data as Permission : p));
      //   });
      // }

      // In-memory implementation for now
      setPermissions(ps => ps.map(p => p.id === data.id ? data as Permission : p));
    } else {
      // TODO: call POST /api/tenants/:tenantId/sites/:siteId/permissions
      // if (currentTenant) {
      //   fetch(`/api/tenants/${currentTenant}/sites/${siteId}/permissions`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data)
      //   })
      //     .then(res => res.json())
      //     .then(newPermission => {
      //       setPermissions(ps => [...ps, newPermission]);
      //     });
      // }

      // In-memory implementation for now
      const newPermission: Permission = {
        ...data as Omit<Permission, 'id'>,
        id: Date.now().toString()
      };
      setPermissions(ps => [...ps, newPermission]);
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Site Permissions</h1>
          <Button onClick={handleAddPermission}>
            + Add Permission
          </Button>
        </div>
        
        <PermissionsTable
          permissions={permissions}
          onEdit={handleEditPermission}
          onRemove={handleRemovePermission}
        />
        
        <PermissionEditorModal
          isOpen={isModalOpen}
          initialData={editingPermission}
          onSave={handleSavePermission}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
