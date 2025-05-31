// No TODOs found in this file
import { useState, useEffect } from "react";
import { KioskSite } from "@/models/kiosk";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisitorTypeEditor } from "./VisitorTypeEditor";
import { FormLayoutBuilder } from "./FormLayoutBuilder";
import { HostManager } from "./HostManager";
import { BrandingTabContent } from "./site-modal/BrandingTabContent";
import { useSiteForm } from "@/hooks/useSiteForm";

interface KioskSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (site: KioskSite) => void;
  site: KioskSite | null;
}

export const KioskSiteModal = ({
  isOpen,
  onClose,
  onSave,
  site
}: KioskSiteModalProps) => {
  const isEditing = !!site;
  const [activeTab, setActiveTab] = useState("branding");
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    siteData,
    handleChange,
    handleBrandingChange,
    handleUrlChange,
    updateVisitorTypes,
    updateFormFields,
    createSiteId,
    setSiteData,
    defaultSite
  } = useSiteForm(site);

  const validateSiteData = (): boolean => {
    // Check if site name is provided
    if (!siteData.name || siteData.name.trim() === "") {
      setValidationError("Site name is required.");
      setActiveTab("branding");
      return false;
    }

    // Check if URL path is provided
    if (!siteData.url || siteData.url.trim() === "") {
      setValidationError("URL path is required.");
      setActiveTab("branding");
      return false;
    }

    // Check if any form field has id "host"
    const hasHostField = siteData.formFields.some(field => field.id === "host");
    
    if (hasHostField) {
      // If host field exists, hosts array must exist and have at least one item
      const hasHosts = siteData.host && siteData.host.length > 0;
      
      if (!hasHosts) {
        setValidationError("At least one host must be configured when the host field is included in the form.");
        setActiveTab("hosts");
        return false;
      }
    }
    
    setValidationError(null);
    return true;
  };

  const handleSave = () => {
    // Validate all required fields before saving
    if (!validateSiteData()) {
      return;
    }

    // Generate ID from name if new site
    const newSite = {
      ...siteData,
      id: createSiteId()
    };
    onSave(newSite);
  };

  console.info(siteData);

  useEffect(() => {
    if (isOpen && !isEditing) {
      setSiteData(defaultSite);
      setValidationError(null);
    }
  }, [isOpen]);

  // Clear validation error when switching tabs or when data is updated
  useEffect(() => {
    if (validationError) {
      // Clear error if the user has fixed the validation issue
      if (validationError.includes("Site name") && siteData.name?.trim()) {
        setValidationError(null);
      } else if (validationError.includes("URL path") && siteData.urlPath?.trim()) {
        setValidationError(null);
      } else if (validationError.includes("host") && activeTab !== "hosts") {
        setValidationError(null);
      }
    }
  }, [activeTab, siteData.name, siteData.urlPath, siteData.host]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? `Edit Site: ${site?.name}` : "Create New Check-in Site"}</DialogTitle>
          <DialogDescription>
            Configure how visitors will check in at this location.
          </DialogDescription>
        </DialogHeader>
        
        {validationError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {validationError}
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="visitor-types">Visitor Types</TabsTrigger>
            <TabsTrigger value="form-layout">Form Layout</TabsTrigger>
            <TabsTrigger value="hosts">Hosts</TabsTrigger>
          </TabsList>
          
          {/* Branding Tab */}
          <TabsContent value="branding">
            <BrandingTabContent 
              site={siteData} 
              handleChange={handleChange} 
              handleBrandingChange={handleBrandingChange} 
              handleUrlChange={handleUrlChange} 
            />
          </TabsContent>
          
          {/* Visitor Types Tab */}
          <TabsContent value="visitor-types">
            <VisitorTypeEditor
              visitorTypes={siteData.visitorTypes}
              onChange={updateVisitorTypes}
            />
          </TabsContent>
          
          {/* Form Layout Tab */}
          <TabsContent value="form-layout">
            <FormLayoutBuilder
              formFields={siteData.formFields}
              visitorTypes={siteData.visitorTypes}
              onChange={updateFormFields}
            />
          </TabsContent>
          
          {/* Hosts Tab */}
          <TabsContent value="hosts">
            <HostManager
              handleChange={handleChange}
              siteId={siteData.id}
              initialHosts={siteData.host || []}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "Update Site" : "Create Site"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};