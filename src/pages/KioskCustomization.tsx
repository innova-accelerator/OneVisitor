
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Eye, Trash2, Upload, Check, X } from "lucide-react";
import { KioskSiteList } from "@/components/kiosk/KioskSiteList";
import { KioskSiteModal } from "@/components/kiosk/KioskSiteModal";
import { KioskSite } from "@/models/kiosk";

const KioskCustomization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<KioskSite | null>(null);
  const { toast } = useToast();

  // Mock site data for demonstration
  const [sites, setSites] = useState<KioskSite[]>([
    {
      id: "main-office",
      tenantId: "tenant1", // Added tenantId
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
        { id: "visitor", name: "Visitor", icon: "User" },
        { id: "contractor", name: "Contractor", icon: "Briefcase" },
        { id: "interview", name: "Interview", icon: "Clipboard" }
      ],
      formFields: [
        { id: "name", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "company", label: "Company", type: "text", required: false },
        { id: "host", label: "Host", type: "select", required: true }
      ]
    },
    {
      id: "warehouse",
      tenantId: "tenant1", // Added tenantId
      name: "Warehouse",
      url: "warehouse",
      urlType: "path",
      published: false,
      branding: {
        logo: "https://placehold.co/200x100?text=Warehouse",
        primaryColor: "#10b981",
        secondaryColor: "#059669",
        favicon: "https://placehold.co/32x32?text=WH"
      },
      welcomeMessage: "Welcome to our warehouse facility.",
      language: "en",
      lastPublished: null,
      visitorTypes: [
        { id: "delivery", name: "Delivery", icon: "Package" },
        { id: "visitor", name: "Visitor", icon: "User" }
      ],
      formFields: [
        { id: "name", label: "Full Name", type: "text", required: true },
        { id: "company", label: "Company", type: "text", required: true },
        { id: "purpose", label: "Purpose of Visit", type: "text", required: true }
      ]
    }
  ]);

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
      // Update existing site
      setSites(sites.map(s => s.id === site.id ? site : s));
      toast({
        title: "Site updated",
        description: `${site.name} has been updated successfully`,
      });
    } else {
      // Add new site
      setSites([...sites, site]);
      toast({
        title: "Site created",
        description: `${site.name} has been created successfully`,
      });
    }
    handleCloseModal();
  };

  const handleDeleteSite = (siteId: string) => {
    setSites(sites.filter(site => site.id !== siteId));
    toast({
      title: "Site deleted",
      description: "The site has been removed",
    });
  };

  const handleTogglePublish = (siteId: string, published: boolean) => {
    setSites(sites.map(site => {
      if (site.id === siteId) {
        return {
          ...site,
          published,
          lastPublished: published ? new Date().toISOString() : site.lastPublished
        };
      }
      return site;
    }));

    toast({
      title: published ? "Site published" : "Site unpublished",
      description: published 
        ? "The site is now live and accessible"
        : "The site has been unpublished"
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Kiosk Customization</h1>
        <p className="text-gray-600">Create and manage visitor check-in sites for your organization</p>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border-0 mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Your Check-in Sites</h2>
              <p className="text-sm text-gray-500">Configure multiple check-in experiences for different locations</p>
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
    </DashboardLayout>
  );
};

export default KioskCustomization;
