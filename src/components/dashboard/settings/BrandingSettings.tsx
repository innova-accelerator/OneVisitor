import { useState, useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TenantContext } from "@/App";
import { FileUpload } from "@/components/ui/file-upload";

const BrandingSettings = () => {
  const { tenantBranding, setTenantBranding } = useContext(TenantContext);
  
  const [brandingSettings, setBrandingSettings] = useState({
    name: tenantBranding?.name || "",
    logo: tenantBranding?.logo || "",
    primaryColor: tenantBranding?.primaryColor || "#3B82F6",
    secondaryColor: tenantBranding?.secondaryColor || "#1E40AF",
    font: tenantBranding?.font || "Inter"
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(brandingSettings.logo || null);

  const handleLogoSelect = (file: File) => {
    setLogoFile(file);
    // Generate a preview URL
    const previewUrl = URL.createObjectURL(file);
    setLogoUrl(previewUrl);
    // Update branding settings with new logo URL
    setBrandingSettings({...brandingSettings, logo: previewUrl});
  };

  const handleClearLogo = () => {
    setLogoFile(null);
    if (logoUrl && logoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(logoUrl);
    }
    setLogoUrl(null);
    setBrandingSettings({...brandingSettings, logo: ""});
  };

  const handleBrandingUpdate = () => {
    if (setTenantBranding) {
      setTenantBranding(brandingSettings);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle>Branding Settings</CardTitle>
        <CardDescription>
          Customize how your check-in experience looks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo-upload">Organization Logo</Label>
              <div className="mt-2">
                <FileUpload 
                  onFileSelect={handleLogoSelect}
                  onClear={handleClearLogo}
                  accept="image/*"
                  maxSizeMB={2}
                  buttonText="Upload Logo"
                  dropzoneText="or drag and drop an image"
                  previewUrl={logoUrl}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="org-name">Organization Name</Label>
              <Input 
                id="org-name" 
                value={brandingSettings.name}
                onChange={(e) => setBrandingSettings({...brandingSettings, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="primary-color">Primary Brand Color</Label>
              <div className="flex space-x-2">
                <input 
                  type="color" 
                  id="primary-color" 
                  className="h-10 w-10 border border-gray-300 rounded"
                  value={brandingSettings.primaryColor}
                  onChange={(e) => setBrandingSettings({...brandingSettings, primaryColor: e.target.value})}
                />
                <Input 
                  value={brandingSettings.primaryColor}
                  onChange={(e) => setBrandingSettings({...brandingSettings, primaryColor: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex space-x-2">
                <input 
                  type="color" 
                  id="secondary-color" 
                  className="h-10 w-10 border border-gray-300 rounded"
                  value={brandingSettings.secondaryColor}
                  onChange={(e) => setBrandingSettings({...brandingSettings, secondaryColor: e.target.value})}
                />
                <Input 
                  value={brandingSettings.secondaryColor}
                  onChange={(e) => setBrandingSettings({...brandingSettings, secondaryColor: e.target.value})}
                />
              </div>
            </div>
            
            <Button onClick={handleBrandingUpdate}>
              Save Branding Changes
            </Button>
          </div>
          
          <div>
            <div className="p-4 border border-gray-200 rounded-md bg-white">
              <h3 className="text-lg font-medium mb-4">Live Preview</h3>
              <div className="mb-4" style={{ backgroundColor: brandingSettings.primaryColor, height: "4px" }}></div>
              <div className="flex items-center mb-4">
                {brandingSettings.logo ? (
                  <img src={brandingSettings.logo} alt="Logo Preview" className="h-8 mr-2" />
                ) : (
                  <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center mr-2">
                    {brandingSettings.name.charAt(0) || "L"}
                  </div>
                )}
                <span className="font-medium">{brandingSettings.name || "Organization Name"}</span>
              </div>
              <div className="p-3 rounded-md text-white text-sm mb-3" style={{ backgroundColor: brandingSettings.primaryColor }}>
                Primary Color Button
              </div>
              <div className="p-3 rounded-md text-white text-sm" style={{ backgroundColor: brandingSettings.secondaryColor }}>
                Secondary Color Button
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandingSettings;
