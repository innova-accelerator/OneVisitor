
import React from 'react';
import { User } from "@/types/user";
import { UserFormData } from "@/types/user";
import { UserEditorModal } from "@/components/users/UserEditorModal";
import { ConfirmDeactivateDialog } from "@/components/users/ConfirmDeactivateDialog";
import { UserPermissionsModal, SitePermission } from "@/components/users/UserPermissionsModal";

interface UserModalsProps {
  isEditorOpen: boolean;
  isDeactivateDialogOpen: boolean;
  isPermissionsModalOpen: boolean;
  currentUser?: User;
  permissionsUser: User | null;
  userPermissions: Record<string, SitePermission[]>;
  onSaveUser: (data: UserFormData) => void;
  onConfirmDeactivate: () => void;
  onSavePermissions: (permissions: SitePermission[]) => void;
  onCloseEditor: () => void;
  onCloseDeactivateDialog: () => void;
  onClosePermissionsModal: () => void;
}

export function UserModals({
  isEditorOpen,
  isDeactivateDialogOpen,
  isPermissionsModalOpen,
  currentUser,
  permissionsUser,
  userPermissions,
  onSaveUser,
  onConfirmDeactivate,
  onSavePermissions,
  onCloseEditor,
  onCloseDeactivateDialog,
  onClosePermissionsModal
}: UserModalsProps) {
  return (
    <>
      <UserEditorModal
        isOpen={isEditorOpen}
        initialData={currentUser}
        onSave={onSaveUser}
        onCancel={onCloseEditor}
      />
      
      <ConfirmDeactivateDialog
        isOpen={isDeactivateDialogOpen}
        userName={currentUser?.name || ""}
        onConfirm={onConfirmDeactivate}
        onCancel={onCloseDeactivateDialog}
      />
      
      <UserPermissionsModal
        isOpen={isPermissionsModalOpen}
        user={permissionsUser}
        currentPermissions={permissionsUser ? userPermissions[permissionsUser.id] || [] : []}
        onSave={onSavePermissions}
        onCancel={onClosePermissionsModal}
      />
    </>
  );
}
