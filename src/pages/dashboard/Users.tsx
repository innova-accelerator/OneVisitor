
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useUserManagement } from "@/hooks/useUserManagement";
import { UsersHeader } from "@/components/users/UsersHeader";
import { UserTableContainer } from "@/components/users/UserTableContainer";
import { UserModals } from "@/components/users/UserModals";
import { MockDisclaimer } from "@/components/users/MockDisclaimer";

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
 */
const Users = () => {
  const {
    users,
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
  } = useUserManagement();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <UsersHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddUser={handleAddUser}
        />
        
        <UserTableContainer 
          users={users}
          onEdit={handleEditUser}
          onDeactivate={handleDeactivateClick}
          onManagePermissions={handleManagePermissions}
          orgAccess={orgAccess}
          onOrgAccessChange={handleOrgAccessChange}
        />
        
        <MockDisclaimer />
      </div>
      
      <UserModals
        isEditorOpen={isEditorOpen}
        isDeactivateDialogOpen={isDeactivateDialogOpen}
        isPermissionsModalOpen={isPermissionsModalOpen}
        currentUser={currentUser}
        permissionsUser={permissionsUser}
        userPermissions={userPermissions}
        onSaveUser={handleSaveUser}
        onConfirmDeactivate={handleConfirmDeactivate}
        onSavePermissions={handleSavePermissions}
        onCloseEditor={() => setIsEditorOpen(false)}
        onCloseDeactivateDialog={() => setIsDeactivateDialogOpen(false)}
        onClosePermissionsModal={() => {
          setIsPermissionsModalOpen(false);
          setPermissionsUser(null);
        }}
      />
    </DashboardLayout>
  );
};

export default Users;
