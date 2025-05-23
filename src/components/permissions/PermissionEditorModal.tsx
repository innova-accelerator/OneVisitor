
import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Permission } from '@/pages/dashboard/sites/sitePath/permissions';

// Mock users for the dropdown
const mockUsers = [
  { id: 'user1', name: 'Alice Smith', email: 'alice@example.com' },
  { id: 'user2', name: 'Bob Johnson', email: 'bob@example.com' },
  { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com' },
  { id: 'user4', name: 'Diana Prince', email: 'diana@example.com' },
  { id: 'user5', name: 'Ethan Hunt', email: 'ethan@example.com' },
  { id: 'user6', name: 'Fiona Gallagher', email: 'fiona@example.com' },
];

interface PermissionEditorModalProps {
  isOpen: boolean;
  initialData?: Permission | null;
  onSave: (data: Omit<Permission, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export function PermissionEditorModal({ 
  isOpen, 
  initialData, 
  onSave, 
  onCancel 
}: PermissionEditorModalProps) {
  // Form state
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');
  const [role, setRole] = useState<Permission['role']>('Staff');
  const [level, setLevel] = useState<Permission['level']>('Viewer');

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      // Find the user in our mock data that matches the initialData
      const matchingUser = mockUsers.find(u => u.email === initialData.userEmail);
      
      if (matchingUser) {
        setSelectedUserId(matchingUser.id);
      } else {
        setSelectedUserId('');
      }
      
      setSelectedUserName(initialData.userName);
      setSelectedUserEmail(initialData.userEmail);
      setRole(initialData.role);
      setLevel(initialData.level);
    } else {
      setSelectedUserId('');
      setSelectedUserName('');
      setSelectedUserEmail('');
      setRole('Staff');
      setLevel('Viewer');
    }
  }, [isOpen, initialData]);

  const handleUserChange = (userId: string) => {
    const selectedUser = mockUsers.find(u => u.id === userId);
    if (selectedUser) {
      setSelectedUserId(selectedUser.id);
      setSelectedUserName(selectedUser.name);
      setSelectedUserEmail(selectedUser.email);
    }
  };

  const handleSave = () => {
    if (!selectedUserName || !selectedUserEmail) {
      return; // Don't save if required fields are missing
    }
    
    const permissionData = {
      ...(initialData?.id ? { id: initialData.id } : {}),
      userName: selectedUserName,
      userEmail: selectedUserEmail,
      role,
      level
    };
    
    onSave(permissionData);
  };

  const modalTitle = initialData ? 'Edit Permission' : 'Add Permission';

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onCancel}
      title={modalTitle}
      maxWidth="md"
    >
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="user">User</Label>
          <Select 
            value={selectedUserId} 
            onValueChange={handleUserChange}
            disabled={!!initialData} // Disable changing user when editing
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {mockUsers.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {/* TODO: Add link to create new user if needed */}
            User not in the list? Create a new user first.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={role} onValueChange={(value: Permission['role']) => setRole(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
              <SelectItem value="Receptionist">Receptionist</SelectItem>
              <SelectItem value="SecurityOfficer">Security Officer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Permission Level</Label>
          <Select value={level} onValueChange={(value: Permission['level']) => setLevel(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Admins can manage site settings and content. Viewers can only view data.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!selectedUserName || !selectedUserEmail}>
          Save
        </Button>
      </div>
    </Modal>
  );
}
