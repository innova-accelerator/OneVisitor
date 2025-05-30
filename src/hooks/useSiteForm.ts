
import { useState, useEffect } from "react";
import { KioskSite } from "@/models/kiosk";

export const useSiteForm = (initialSite: KioskSite | null) => {
  const defaultSite: KioskSite = {
    id: "",
    tenantId: "tenant1",
    name: "",
    url: "",
    urlType: "path",
    published: false,
    branding: {
      logo: "",
      primaryColor: "#3B82F6",
      secondaryColor: "#2563EB",
      favicon: ""
    },
    welcomeMessage: "Welcome! Please check in for your visit.",
    language: "en",
    lastPublished: null,
    visitorTypes: [
      { id: "visitor", name: "Visitor", icon: "User" }
    ],
    formFields: [
      { id: "name", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: false },
      { id: "company", label: "Company", type: "text", required: false },
      { id: "host", label: "Host", type: "select", required: true }
    ]
  };
  
  const [siteData, setSiteData] = useState<KioskSite>(defaultSite);

  useEffect(() => {
    if (initialSite) {
      setSiteData({...initialSite});
    } else {
      setSiteData({...defaultSite});
    }
  }, [initialSite]);

  const handleChange = (field: string, value: any) => {
    setSiteData(prev => ({
      ...prev,
      [field]: value
    }));

    //ACTUAL API CALL SHOULD BE HERE
  };

  const handleBrandingChange = (field: string, value: any) => {
    setSiteData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value
      }
    }));
  };

  const handleUrlChange = (value: string) => {
    // Convert to URL-friendly slug
    const urlSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    
    setSiteData(prev => ({
      ...prev,
      url: urlSlug
    }));
  };

  const setPrimaryColor = (color: string) => {
    setSiteData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        primaryColor: color
      }
    }));
  };

  const setSecondaryColor = (color: string) => {
    setSiteData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        secondaryColor: color
      }
    }));
  };

  const updateVisitorTypes = (visitorTypes: any[]) => {
    setSiteData(prev => ({
      ...prev,
      visitorTypes
    }));
  };

  const updateFormFields = (formFields: any[]) => {
    setSiteData(prev => ({
      ...prev,
      formFields
    }));
  };

  const createSiteId = () => {
    return siteData.id || siteData.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  };

  return {
    siteData,
    setSiteData,
    handleChange,
    handleBrandingChange,
    handleUrlChange,
    setPrimaryColor,
    setSecondaryColor,
    updateVisitorTypes,
    updateFormFields,
    createSiteId,
    defaultSite
  };
};
