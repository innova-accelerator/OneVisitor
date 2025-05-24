
import React from 'react';

import { useUserManagement } from "@/hooks/useUserManagement";
import { UsersHeader } from "@/components/users/UsersHeader";
import { UserTableContainer } from "@/components/users/UserTableContainer";
import { UserModals } from "@/components/users/UserModals";
import { MockDisclaimer } from "@/components/users/MockDisclaimer";
import { useResourceLimits } from "@/hooks/useResourceLimits";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  const { isAtLimit } = useResourceLimits();
  const isAtUserLimit = isAtLimit.users(users.length);

  const wrappedHandleAddUser = () => {
    if (!isAtUserLimit) {
      handleAddUser();
    }
  };

  return (
    <>
      <div className="space-y-6">
        <UsersHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddUser={
            isAtUserLimit ? 
            undefined :  // This will disable the button in UsersHeader
            wrappedHandleAddUser
          }
          isAddDisabled={isAtUserLimit}
          addDisabledTooltip={isAtUserLimit ? "User limit reached" : undefined}
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
    </>
  );
};

export default Users;
