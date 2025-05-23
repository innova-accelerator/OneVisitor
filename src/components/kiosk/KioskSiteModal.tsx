
import { useState } from "react";
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

  const {
    siteData,
    handleChange,
    handleBrandingChange,
    handleUrlChange,
    updateVisitorTypes,
    updateFormFields,
    createSiteId
  } = useSiteForm(site);

  const handleSave = () => {
    // Generate ID from name if new site
    const newSite = {
      ...siteData,
      id: createSiteId()
    };
    onSave(newSite);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? `Edit Site: ${site?.name}` : "Create New Check-in Site"}</DialogTitle>
          <DialogDescription>
            Configure how visitors will check in at this location.
          </DialogDescription>
        </DialogHeader>
        
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
              siteId={siteData.id}
              hosts={siteData.hosts || []}
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
