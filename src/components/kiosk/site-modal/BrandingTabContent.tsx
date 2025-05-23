
import React from 'react';
import { KioskSite } from "@/models/kiosk";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BrandingTabContentProps {
  site: KioskSite;
  handleChange: (field: string, value: any) => void;
  handleBrandingChange: (field: string, value: any) => void;
  handleUrlChange: (value: string) => void;
}

export const BrandingTabContent = ({
  site,
  handleChange,
  handleBrandingChange,
  handleUrlChange,
}: BrandingTabContentProps) => {
  // Helper function to handle regular input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("branding.")) {
      const brandingField = name.split(".")[1];
      handleBrandingChange(brandingField, value);
    } else {
      handleChange(name, value);
    }
  };

  // Special handler for URL path input
  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUrlChange(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Site Name</Label>
          <Input
            id="name"
            name="name"
            value={site.name}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="e.g., Main Office, Warehouse, etc."
          />
        </div>

        <div>
          <Label htmlFor="url">URL Path</Label>
          <div className="flex items-center mt-1">
            <span className="text-gray-500 mr-1">/{site.tenantId}.onevisitor.app/</span>
            <Input
              id="url"
              name="url"
              value={site.url}
              onChange={handleUrlInputChange}
              placeholder="site-path"
              className="flex-1"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This is the URL path where visitors will access the check-in page.
          </p>
        </div>

        <div>
          <Label htmlFor="branding.logo">Logo URL</Label>
          <Input
            id="branding.logo"
            name="branding.logo"
            value={site.branding.logo}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="https://..."
          />
        </div>

        <div>
          <Label htmlFor="branding.favicon">Favicon URL</Label>
          <Input
            id="branding.favicon"
            name="branding.favicon"
            value={site.branding.favicon}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="https://..."
          />
        </div>

        <div>
          <Label htmlFor="branding.primaryColor">Primary Color</Label>
          <div className="flex mt-1">
            <Input
              id="branding.primaryColor"
              name="branding.primaryColor"
              value={site.branding.primaryColor}
              onChange={handleInputChange}
              className="flex-1"
            />
            <div
              className="w-10 h-10 ml-2 border rounded"
              style={{ backgroundColor: site.branding.primaryColor }}
            ></div>
          </div>
        </div>

        <div>
          <Label htmlFor="branding.secondaryColor">Secondary Color</Label>
          <div className="flex mt-1">
            <Input
              id="branding.secondaryColor"
              name="branding.secondaryColor"
              value={site.branding.secondaryColor}
              onChange={handleInputChange}
              className="flex-1"
            />
            <div
              className="w-10 h-10 ml-2 border rounded"
              style={{ backgroundColor: site.branding.secondaryColor }}
            ></div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="welcomeMessage">Welcome Message</Label>
          <Textarea
            id="welcomeMessage"
            name="welcomeMessage"
            value={site.welcomeMessage}
            onChange={handleInputChange}
            className="mt-1"
            rows={3}
            placeholder="Enter a welcome message for your visitors..."
          />
        </div>
      </div>
    </div>
  );
};
