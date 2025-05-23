import React, { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for sites - would come from API in real implementation
const mockSites = [
  { id: '1', name: 'Headquarters' },
  { id: '2', name: 'Downtown Office' },
  { id: '3', name: 'Manufacturing Plant' },
  { id: '4', name: 'Research Center' },
];

export interface SitePermission {
  siteId: string;
  level: 'Viewer' | 'Admin' | 'None';
}

interface UserPermissionsModalProps {
  isOpen: boolean;
  user: User | null;
  currentPermissions: SitePermission[];
  onSave: (permissions: SitePermission[]) => void;
  onCancel: () => void;
}

export function UserPermissionsModal({
  isOpen,
  user,
  currentPermissions,
  onSave,
  onCancel
}: UserPermissionsModalProps) {
  // Track permissions state within the modal
  const [permissions, setPermissions] = useState<SitePermission[]>([]);

  // Reset permissions when modal opens with new user
  useEffect(() => {
    if (user && isOpen) {
      setPermissions(currentPermissions);
    }
  }, [user, currentPermissions, isOpen]);

  // Update a single permission
  const updatePermission = (siteId: string, level: 'Viewer' | 'Admin' | 'None') => {
    setPermissions(current => {
      // Filter out 'None' permissions when saving
      if (level === 'None') {
        return current.filter(p => p.siteId !== siteId);
      }
      
      // Update existing or add new permission
      const existingIndex = current.findIndex(p => p.siteId === siteId);
      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex] = { siteId, level };
        return updated;
      } else {
        return [...current, { siteId, level }];
      }
    });
  };

  // Handle save action
  const handleSave = () => {
    // Only keep non-None permissions
    const filteredPermissions = permissions.filter(p => p.level !== 'None');
    onSave(filteredPermissions);
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={`Site Access for ${user.name}`}
      description="Configure which sites this user can access and their permission level."
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {mockSites.map(site => {
          const permission = permissions.find(p => p.siteId === site.id);
          const currentLevel = permission?.level || 'None';
          
          return (
            <div key={site.id} className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">{site.name}</span>
              <Select
                value={currentLevel}
                onValueChange={(value: string) => 
                  updatePermission(site.id, value as 'Viewer' | 'Admin' | 'None')
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">No Access</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                  <SelectItem value="Admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        })}
        
        <div className="pt-4 text-sm text-muted-foreground">
          <p>
            <strong>Viewer:</strong> Can view visitor logs and site data, but cannot make changes.
          </p>
          <p>
            <strong>Administrator:</strong> Full control including editing site settings and user management.
          </p>
        </div>
      </div>
    </Modal>
  );
}
