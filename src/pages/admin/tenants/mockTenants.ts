
export interface MockTenant {
  id: string;
  name: string;
  shortname: string;
  logo: string | null;
  primaryColor: string;
  status: "active" | "inactive" | "pending";
  userCount: number;
  subscriptionPlan: string;
  primaryContact: string;
  primaryAdminId: string;
  resourceLimits: {
    maxSites: number;
    maxKiosks: number;
    maxUsers: number;
    maxVisitorsPerMonth: number;
  };
}

export const mockTenants: MockTenant[] = [
  {
    id: "1",
    name: "Acme Corporation",
    shortname: "acme",
    logo: "https://placehold.co/100x50?text=ACME",
    primaryColor: "#2563eb",
    status: "active",
    userCount: 12,
    subscriptionPlan: "Pro",
    primaryContact: "admin@acmecorp.com",
    primaryAdminId: "user1",
    resourceLimits: {
      maxSites: 5,
      maxKiosks: 10,
      maxUsers: 25,
      maxVisitorsPerMonth: 1000
    }
  },
  {
    id: "2",
    name: "Globex Industries",
    shortname: "globex",
    logo: "https://placehold.co/100x50?text=GLOBEX",
    primaryColor: "#10b981",
    status: "active",
    userCount: 8,
    subscriptionPlan: "Business Plan",
    primaryContact: "admin@globex.com",
    primaryAdminId: "user2",
    resourceLimits: {
      maxSites: 3,
      maxKiosks: 5,
      maxUsers: 15,
      maxVisitorsPerMonth: 500
    }
  },
  {
    id: "3",
    name: "Initech LLC",
    shortname: "initech",
    logo: "https://placehold.co/100x50?text=INITECH",
    primaryColor: "#6366f1",
    status: "inactive",
    userCount: 3,
    subscriptionPlan: "Starter Plan",
    primaryContact: "admin@initech.com",
    primaryAdminId: "user3",
    resourceLimits: {
      maxSites: 1,
      maxKiosks: 2,
      maxUsers: 5,
      maxVisitorsPerMonth: 100
    }
  },
  {
    id: "4",
    name: "Wayne Enterprises",
    shortname: "wayne",
    logo: "https://placehold.co/100x50?text=WAYNE",
    primaryColor: "#000000",
    status: "active",
    userCount: 25,
    subscriptionPlan: "Enterprise Plan",
    primaryContact: "bruce@wayne.com",
    primaryAdminId: "user4",
    resourceLimits: {
      maxSites: 10,
      maxKiosks: 20,
      maxUsers: 50,
      maxVisitorsPerMonth: 5000
    }
  },
  {
    id: "5",
    name: "Stark Industries",
    shortname: "stark",
    logo: "https://placehold.co/100x50?text=STARK",
    primaryColor: "#dc2626",
    status: "pending",
    userCount: 0,
    subscriptionPlan: "Enterprise Plan",
    primaryContact: "tony@stark.com",
    primaryAdminId: "user5",
    resourceLimits: {
      maxSites: 10,
      maxKiosks: 20,
      maxUsers: 50,
      maxVisitorsPerMonth: 5000
    }
  }
];

export const mockUsers = [
  { id: "user1", name: "John Doe", email: "john@acmecorp.com" },
  { id: "user2", name: "Jane Smith", email: "jane@globex.com" },
  { id: "user3", name: "Robert Johnson", email: "robert@initech.com" },
  { id: "user4", name: "Bruce Wayne", email: "bruce@wayne.com" },
  { id: "user5", name: "Tony Stark", email: "tony@stark.com" },
  { id: "user6", name: "Clark Kent", email: "clark@dailyplanet.com" },
  { id: "user7", name: "Diana Prince", email: "diana@themyscira.com" },
  { id: "user8", name: "Peter Parker", email: "peter@bugle.com" },
  { id: "user9", name: "Barry Allen", email: "barry@starlabs.com" },
  { id: "user10", name: "Hal Jordan", email: "hal@ferrisair.com" }
];

export const getTenantByShortname = (shortname: string): MockTenant | undefined => {
  return mockTenants.find(tenant => tenant.shortname === shortname);
};
