
import React, { useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UsersTable } from "@/components/users/UsersTable";
import { UserEditorModal } from "@/components/users/UserEditorModal";
import { ConfirmDeactivateDialog } from "@/components/users/ConfirmDeactivateDialog";
import { Button } from "@/components/ui/button";
import { User, UserFormData } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Users as UsersIcon, Plus } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

/**
 * UsersPage
 * 
 * Main page for user management. Contains:
 * - Search functionality
 * - Users table
 * - Add/Edit user modal
 * - Deactivate user confirmation dialog
 * 
 * Currently uses in-memory state with mock data.
 * 
 * TODO: When implementing API integration:
 * 1. Replace useState with React Query hooks
 * 2. Add loading states and error handling
 * 3. Implement real pagination and filtering
 * 4. Replace mock data manipulation with API calls
 */

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

const Users = () => {
  // State for user data
  const [users, setUsers] = useState<User[]>(initialMockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  
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

  // Save a new or updated user
  const handleSaveUser = (data: UserFormData) => {
    if (currentUser) {
      // Update existing user
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === currentUser.id 
            ? { ...user, ...data } 
            : user
        )
      );
    } else {
      // Create new user with generated ID
      const newUser: User = {
        id: uuidv4(),
        ...data,
        createdAt: new Date().toISOString()
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
    
    // Close the modal after saving
    setIsEditorOpen(false);
    
    // TODO: In a real implementation, this would call the create or update user API endpoint
    console.log('Save user:', currentUser ? 'Update' : 'Create', data);
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-6 w-6" />
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button onClick={handleAddUser}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <UsersTable
            users={filteredUsers}
            onEdit={handleEditUser}
            onDeactivate={handleDeactivateClick}
          />
          
          {/* Static Pagination - No functionality */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {filteredUsers.length} users
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary/10">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
        
        {/* Disclaimer about mock data */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm">
          <p className="font-medium text-yellow-800">⚠️ Frontend Mockup Only</p>
          <p className="text-yellow-700 mt-1">
            This is a mockup with in-memory data. All changes will be lost on page refresh. 
            In a real implementation, this would be connected to backend APIs.
          </p>
        </div>
      </div>
      
      {/* Modals */}
      <UserEditorModal
        isOpen={isEditorOpen}
        initialData={currentUser}
        onSave={handleSaveUser}
        onCancel={() => setIsEditorOpen(false)}
      />
      
      <ConfirmDeactivateDialog
        isOpen={isDeactivateDialogOpen}
        userName={currentUser?.name || ""}
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setIsDeactivateDialogOpen(false)}
      />
    </DashboardLayout>
  );
};

export default Users;
