
// TODO: Integration Points
// - Add integration settings UI in the integrations tab

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { KioskSiteList } from "@/components/kiosk/KioskSiteList";
import { KioskSiteModal } from "@/components/kiosk/KioskSiteModal";
import { KioskSite } from "@/models/kiosk";
import { useTenant } from "@/context/TenantContext";
import { useSiteList } from "@/hooks/useSite";

const KioskCustomization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<KioskSite | null>(null);
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  
  // Use our new site list hook instead of local state
  const { 
    sites, 
    addSite, 
    updateSite, 
    deleteSite, 
    togglePublish 
  } = useSiteList();

  const handleOpenModal = (site?: KioskSite) => {
    if (site) {
      setEditingSite(site);
    } else {
      setEditingSite(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSite(null);
  };

  const handleSaveSite = (site: KioskSite) => {
    if (editingSite) {
      
      updateSite(site);
      toast({
        title: "Site updated",
        description: `${site.name} has been updated successfully`,
      });
    } else {
      // Add new site
      addSite(site);
      toast({
        title: "Site created",
        description: `${site.name} has been created successfully`,
      });
    }
    handleCloseModal();
  };

  const handleDeleteSite = (siteId: string) => {
    deleteSite(siteId);
    toast({
      title: "Site deleted",
      description: "The site has been removed",
    });
  };

  const handleTogglePublish = (siteId: string, published: boolean) => {
    togglePublish(siteId, published);
    
    toast({
      title: published ? "Site published" : "Site unpublished",
      description: published 
        ? "The site is now live and accessible"
        : "The site has been unpublished"
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Site Management</h1>
        <p className="text-gray-600">Create and manage visitor check-in sites for your organization</p>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border-0 mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Your Check-in Sites</h2>
              <p className="text-sm text-gray-500">
                Configure multiple check-in experiences at {currentTenant || "your-org"}.onevisitor.app/&lt;site-path&gt;
              </p>
            </div>
            <Button onClick={() => handleOpenModal()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Site
            </Button>
          </div>
        </CardContent>
      </Card>

      <KioskSiteList 
        sites={sites} 
        onEdit={handleOpenModal} 
        onDelete={handleDeleteSite}
        onTogglePublish={handleTogglePublish}
      />

      <KioskSiteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSite}
        site={editingSite}
      />
    </div>
  );
};

export default KioskCustomization;
