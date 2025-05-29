import { useState, useEffect } from 'react';
import { User } from "@/types/user";
import { SitePermission } from "@/components/users/UserPermissionsModal";
import { initialMockUsers } from '@/data/mockUsers';
import { useUserActions } from '@/hooks/useUserActions';

export function useUserManagement() {
  // State for user data
  const [users, setUsers] = useState<User[]>(initialMockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  
  // State for permissions modal
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [userPermissions, setUserPermissions] = useState<Record<string, SitePermission[]>>({});
  const [permissionsUser, setPermissionsUser] = useState<User | null>(null);
  
  // State for organization access
  const [orgAccess, setOrgAccess] = useState<Record<string, 'Viewer'|'Admin'>>({});
  
  // Initialize org access for all users
  useEffect(() => {
    const initial = users.reduce((acc, user) => ({ 
      ...acc, 
      [user.id]: 'Viewer' 
    }), {});
    setOrgAccess(initial);
  }, [users]);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.roles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Initialize user actions
  const {
    handleAddUser,
    handleEditUser,
    handleDeactivateClick,
    handleManagePermissions,
    handleOrgAccessChange,
    handleSaveUser,
    handleConfirmDeactivate,
    handleSavePermissions,
  } = useUserActions(
    users,
    setUsers,
    setIsEditorOpen,
    currentUser,
    setCurrentUser,
    setIsDeactivateDialogOpen,
    setIsPermissionsModalOpen,
    setPermissionsUser,
    setUserPermissions,
    setOrgAccess
  );

  return {
    users: filteredUsers,
    searchQuery,
    setSearchQuery,
    isEditorOpen,
    isDeactivateDialogOpen,
    isPermissionsModalOpen,
    currentUser,
    permissionsUser,
    userPermissions,
    orgAccess,
    handleAddUser,
    handleEditUser,
    handleDeactivateClick,
    handleManagePermissions,
    handleOrgAccessChange,
    handleSaveUser,
    handleConfirmDeactivate,
    handleSavePermissions,
    setIsEditorOpen,
    setIsDeactivateDialogOpen,
    setPermissionsUser,
    setIsPermissionsModalOpen
  };
}
