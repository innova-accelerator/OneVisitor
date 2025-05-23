
import { useState } from "react";
import { KioskSite, SiteVisitor } from "@/models/kiosk";

export const useVisitorData = () => {
  // Mock data - in a real app, this would come from an API
  const sites: KioskSite[] = [
    {
      id: "main-office",
      tenantId: "tenant1",
      name: "Main Office",
      url: "main-office",
      urlType: "path",
      published: true,
      branding: {
        logo: "https://placehold.co/200x100?text=MainOffice",
        primaryColor: "#2563eb",
        secondaryColor: "#1e40af",
        favicon: "https://placehold.co/32x32?text=MO"
      },
      welcomeMessage: "Welcome to our main office! Please check in.",
      language: "en",
      lastPublished: "2023-04-15T10:30:00Z",
      visitorTypes: [
        { id: "visitor", name: "Visitor" },
        { id: "contractor", name: "Contractor" },
        { id: "interview", name: "Interview" }
      ],
      formFields: [],
      visitorCount: 12
    },
    {
      id: "warehouse",
      tenantId: "tenant1",
      name: "Warehouse",
      url: "warehouse",
      urlType: "path",
      published: true,
      branding: {
        logo: "https://placehold.co/200x100?text=Warehouse",
        primaryColor: "#10b981",
        secondaryColor: "#059669",
        favicon: "https://placehold.co/32x32?text=WH"
      },
      welcomeMessage: "Welcome to our warehouse facility.",
      language: "en",
      lastPublished: "2023-04-15T10:30:00Z",
      visitorTypes: [
        { id: "delivery", name: "Delivery" },
        { id: "visitor", name: "Visitor" }
      ],
      formFields: [],
      visitorCount: 8
    }
  ];

  const visitors: SiteVisitor[] = [
    {
      id: "v1",
      siteId: "main-office",
      name: "John Doe",
      host: "Alice Smith",
      visitorType: "visitor",
      company: "ABC Corp",
      checkInTime: "09:30 AM",
      formResponses: {},
      status: "active"
    },
    {
      id: "v2",
      siteId: "main-office",
      name: "Jane Smith",
      host: "Bob Johnson",
      visitorType: "contractor",
      company: "XYZ Contractors",
      checkInTime: "10:15 AM",
      formResponses: {},
      status: "active"
    },
    {
      id: "v3",
      siteId: "warehouse",
      name: "Michael Brown",
      host: "Carol Williams",
      visitorType: "delivery",
      company: "FastShip Logistics",
      checkInTime: "11:45 AM",
      formResponses: {},
      status: "active"
    },
    {
      id: "v4",
      siteId: "warehouse",
      name: "Sarah Wilson",
      host: "David Taylor",
      visitorType: "visitor",
      company: "123 Consulting",
      checkInTime: "08:15 AM",
      checkOutTime: "11:30 AM",
      formResponses: {},
      status: "checked-out"
    },
    {
      id: "v5",
      siteId: "main-office",
      name: "Robert Garcia",
      host: "Emma Lee",
      visitorType: "interview",
      checkInTime: "13:45 PM",
      formResponses: {},
      status: "active"
    }
  ];
  
  // Get visitor types across all sites
  const allVisitorTypes = Array.from(
    new Set(sites.flatMap(site => site.visitorTypes.map(type => type.id)))
  );
  
  // Get site name for a given siteId
  const getSiteName = (siteId: string): string => {
    const site = sites.find(site => site.id === siteId);
    return site ? site.name : siteId;
  };

  // Handle export function
  const handleExport = () => {
    console.log("Exporting filtered visitors");
    // In a real app, this would generate a CSV/PDF
  };

  return {
    sites,
    visitors,
    allVisitorTypes,
    getSiteName,
    handleExport
  };
};
