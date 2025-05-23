
import { useState, useEffect } from 'react';
import { User, UserFormData } from "@/types/user";
import { SitePermission } from "@/components/users/UserPermissionsModal";
import { v4 as uuidv4 } from 'uuid';

// Mock data for initial users
const initialMockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    roles: ["TenantAdmin", "SecurityOfficer"],
    isActive: true,
    createdAt: "2023-01-15T08:30:00Z"
  },
  {
    id: "2",
    name: "Sara Johnson",
    email: "sara.j@example.com",
    roles: ["Receptionist"],
    isActive: true,
    createdAt: "2023-02-20T09:15:00Z"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.c@example.com",
    roles: ["Superadmin"],
    isActive: true,
    createdAt: "2022-11-05T11:45:00Z"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    roles: ["SecurityOfficer"],
    isActive: false,
    createdAt: "2023-03-10T14:20:00Z"
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    roles: ["TenantAdmin"],
    isActive: true,
    createdAt: "2023-04-25T10:00:00Z"
  }
];

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
    if (currentUser) {
      // Update the user's isActive status to false
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === currentUser.id 
            ? { ...user, isActive: false } 
            : user
        )
      );
    }
    
    // Close the confirmation dialog
    setIsDeactivateDialogOpen(false);
    
    // TODO: In a real implementation, this would call the deactivate user API endpoint
    console.log('Deactivate user:', currentUser);
  };
  
  // Handle saving permissions for a user
  const handleSavePermissions = (permissions: SitePermission[]) => {
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
