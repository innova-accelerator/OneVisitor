
import { SitePermission } from "@/components/users/UserPermissionsModal";
import { User } from "@/types/user";

export interface UserManagementState {
  users: User[];
  searchQuery: string;
  isEditorOpen: boolean;
  isDeactivateDialogOpen: boolean;
  isPermissionsModalOpen: boolean;
  currentUser?: User;
  permissionsUser: User | null;
  userPermissions: Record<string, SitePermission[]>;
  orgAccess: Record<string, 'Viewer'|'Admin'>;
}
