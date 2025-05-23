
/**
 * User Type Definitions
 * 
 * These interfaces define the data structures used in the User Management module.
 * They are designed to match the expected backend API responses and requests.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAt?: string;  // ISO date string
}

export type UserFormData = Omit<User, 'id' | 'createdAt'>;

export const AVAILABLE_ROLES = [
  "Admin", // Renamed from TenantAdmin
  "Receptionist", 
  "SecurityOfficer"
] as const;

export type UserRole = typeof AVAILABLE_ROLES[number];

// TODO: This will be expanded when implementing the actual API integration
export interface UserListResponse {
  users: User[];
  totalCount: number;
}
