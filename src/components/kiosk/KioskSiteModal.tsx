
import { useState, useEffect } from "react";
import { KioskSite, VisitorType, FormField } from "@/models/kiosk";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisitorTypeEditor } from "./VisitorTypeEditor";
import { FormLayoutBuilder } from "./FormLayoutBuilder";
import { HostManager } from "./HostManager";

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
  
  // Site state
  const [siteData, setSiteData] = useState<KioskSite>({
    id: "",
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
  });

  // Load site data when editing
  useEffect(() => {
    if (site) {
      setSiteData({...site});
    } else {
      // Reset form when creating a new site
      setSiteData({
        id: "",
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
      });
    }
    setActiveTab("branding");
  }, [site, isOpen]);

  const handleChange = (field: string, value: any) => {
    setSiteData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const handleSave = () => {
    // Generate ID from name if new site
    const newSite = {
      ...siteData,
      id: siteData.id || siteData.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
    };
    onSave(newSite);
  };

  const updateVisitorTypes = (visitorTypes: VisitorType[]) => {
    setSiteData(prev => ({
      ...prev,
      visitorTypes
    }));
  };

  const updateFormFields = (formFields: FormField[]) => {
    setSiteData(prev => ({
      ...prev,
      formFields
    }));
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
          <TabsContent value="branding" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input 
                    id="site-name" 
                    value={siteData.name} 
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Main Office"
                  />
                </div>

                <div>
                  <Label htmlFor="url-type">URL Type</Label>
                  <div className="flex space-x-2 mt-1">
                    <Button
                      type="button"
                      variant={siteData.urlType === "path" ? "default" : "outline"}
                      onClick={() => handleChange("urlType", "path")}
                      className="flex-1"
                    >
                      Path
                    </Button>
                    <Button
                      type="button"
                      variant={siteData.urlType === "subdomain" ? "default" : "outline"}
                      onClick={() => handleChange("urlType", "subdomain")}
                      className="flex-1"
                    >
                      Subdomain
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="site-url">
                    {siteData.urlType === "subdomain" 
                      ? "Subdomain" 
                      : "Path"
                    }
                  </Label>
                  <div className="flex items-center mt-1">
                    {siteData.urlType === "subdomain" && (
                      <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 text-gray-500">
                        https://
                      </div>
                    )}
                    <Input
                      id="site-url"
                      value={siteData.url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder={siteData.urlType === "subdomain" ? "office" : "checkin"}
                      className={siteData.urlType === "subdomain" ? "rounded-l-none" : ""}
                    />
                    {siteData.urlType === "subdomain" ? (
                      <div className="bg-gray-100 px-3 py-2 rounded-r-md border border-l-0 text-gray-500">
                        .onevisitor.app
                      </div>
                    ) : (
                      <div className="bg-gray-100 px-3 py-2 rounded-r-md border border-l-0 text-gray-500">
                        .onevisitor.app/{siteData.url}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input
                    id="logo-url"
                    value={siteData.branding.logo}
                    onChange={(e) => handleBrandingChange("logo", e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="favicon-url">Favicon URL</Label>
                  <Input
                    id="favicon-url"
                    value={siteData.branding.favicon}
                    onChange={(e) => handleBrandingChange("favicon", e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                  />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Upload Favicon
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex space-x-2 mt-1">
                      <input
                        type="color"
                        id="primary-color"
                        value={siteData.branding.primaryColor}
                        onChange={(e) => handleBrandingChange("primaryColor", e.target.value)}
                        className="h-10 w-10 border rounded"
                      />
                      <Input
                        value={siteData.branding.primaryColor}
                        onChange={(e) => handleBrandingChange("primaryColor", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex space-x-2 mt-1">
                      <input
                        type="color"
                        id="secondary-color"
                        value={siteData.branding.secondaryColor}
                        onChange={(e) => handleBrandingChange("secondaryColor", e.target.value)}
                        className="h-10 w-10 border rounded"
                      />
                      <Input
                        value={siteData.branding.secondaryColor}
                        onChange={(e) => handleBrandingChange("secondaryColor", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <textarea
                    id="welcome-message"
                    value={siteData.welcomeMessage}
                    onChange={(e) => handleChange("welcomeMessage", e.target.value)}
                    className="w-full p-2 border rounded-md mt-1"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={siteData.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                    className="w-full p-2 border rounded-md mt-1"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
              
              {/* Live Preview */}
              <div className="border rounded-md overflow-hidden">
                <div 
                  className="w-full p-4"
                  style={{
                    backgroundColor: siteData.branding.primaryColor,
                    color: "white"
                  }}
                >
                  <div className="flex items-center space-x-4">
                    {siteData.branding.logo && (
                      <img 
                        src={siteData.branding.logo}
                        alt={siteData.name}
                        className="h-8"
                      />
                    )}
                    <h2 className="text-xl font-semibold">
                      {siteData.name || "Site Name"} Check-in
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="prose">
                    <h3>Welcome</h3>
                    <p>{siteData.welcomeMessage}</p>
                    
                    <div className="mt-8">
                      <h4>I am here for:</h4>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {siteData.visitorTypes.map(type => (
                          <div 
                            key={type.id}
                            className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50"
                            style={{
                              borderColor: siteData.branding.secondaryColor
                            }}
                          >
                            <span className="text-lg font-medium">{type.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
