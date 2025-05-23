
import { useState } from 'react';
import { User, UserFormData } from "@/types/user";
import { SitePermission } from "@/components/users/UserPermissionsModal";
import { v4 as uuidv4 } from 'uuid';

export function useUserActions(
  users: User[], 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setIsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  setIsDeactivateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPermissionsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPermissionsUser: React.Dispatch<React.SetStateAction<User | null>>,
  setUserPermissions: React.Dispatch<React.SetStateAction<Record<string, SitePermission[]>>>,
  setOrgAccess: React.Dispatch<React.SetStateAction<Record<string, 'Viewer'|'Admin'>>>
) {
  // Open modal for creating a new user
  const handleAddUser = () => {
    setCurrentUser(undefined);
    setIsEditorOpen(true);
  };

  // Open modal for editing an existing user
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditorOpen(true);
  };

  // Open confirmation dialog for deactivating a user
  const handleDeactivateClick = (user: User) => {
    setCurrentUser(user);
    setIsDeactivateDialogOpen(true);
  };

  // Open permissions modal for a user
  const handleManagePermissions = (user: User) => {
    setPermissionsUser(user);
    setIsPermissionsModalOpen(true);
  };

  // Handle organization access change
  const handleOrgAccessChange = (user: User, level: 'Viewer'|'Admin') => {
    // TODO: call PUT /api/tenants/:tenantId/users/:userId to update org role
    setOrgAccess(prev => ({ ...prev, [user.id]: level }));
  };

  // Save a new or updated user
  const handleSaveUser = (data: UserFormData) => {
    // Filter out Superadmin from any roles during save
    const filteredData = {
      ...data,
      roles: data.roles.filter(r => r !== 'Superadmin')
    };
    
    const currentUser = users.find(user => user.id === (data as User).id);
    
    if (currentUser) {
      // Update existing user
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === currentUser.id 
            ? { ...user, ...filteredData } 
            : user
        )
      );
    } else {
      // Create new user with generated ID
      const newUser: User = {
        id: uuidv4(),
        ...filteredData,
        createdAt: new Date().toISOString()
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
    
    // Close the modal after saving
    setIsEditorOpen(false);
    
    // TODO: In a real implementation, this would call the create or update user API endpoint
    console.log('Save user:', currentUser ? 'Update' : 'Create', filteredData);
  };

  // Confirm deactivation of a user
  const handleConfirmDeactivate = () => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === (users.find(u => u.id === user.id)?.id)) {
          return { ...user, isActive: false };
        }
        return user;
      })
    );
    
    // Close the confirmation dialog
    setIsDeactivateDialogOpen(false);
    
    // TODO: In a real implementation, this would call the deactivate user API endpoint
    console.log('Deactivate user:', users.find(u => !u.isActive));
  };
  
  // Handle saving permissions for a user
  const handleSavePermissions = (permissions: SitePermission[]) => {
    const permissionsUser = users.find(u => !u.isActive);
    if (permissionsUser) {
      // Update permissions in local state
      setUserPermissions(prev => ({
        ...prev,
        [permissionsUser.id]: permissions
      }));
      
      // Close the modal after saving
      setIsPermissionsModalOpen(false);
      
      // TODO: In a real implementation, this would call the update permissions API endpoint
      console.log('Save permissions for user:', permissionsUser.id, permissions);
    }
  };

  return {
    handleAddUser,
    handleEditUser,
    handleDeactivateClick,
    handleManagePermissions,
    handleOrgAccessChange,
    handleSaveUser,
    handleConfirmDeactivate,
    handleSavePermissions,
  };
}
