
import { User } from "@/types/user";

// Mock data for initial users
export const initialMockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    roles: ["Admin", "SecurityOfficer"],
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
    roles: ["Admin"],
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
    roles: ["Admin"],
    isActive: true,
    createdAt: "2023-04-25T10:00:00Z"
  }
];
