
import { KioskSite } from "@/models/kiosk";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import { TenantContext } from "@/App";

interface BrandingTabContentProps {
  site: KioskSite;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBrandingChange: (field: string, value: string) => void;
  handleUrlChange: (value: string) => void;
}

export const BrandingTabContent = ({
  site,
  handleChange,
  handleBrandingChange,
  handleUrlChange,
}: BrandingTabContentProps) => {
  const { currentTenant } = useContext(TenantContext);
  const tenantId = currentTenant || "your-org";

  // Function to create URL-friendly path from name
  const generateUrlPath = (name: string) => {
    return name.toLowerCase()
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters except hyphens
      .replace(/-+/g, '-');      // Replace multiple consecutive hyphens with a single one
  };

  return (
    <div className="space-y-6">
      {/* Site Name */}
      <div>
        <Label htmlFor="name">Site Name</Label>
        <Input
          id="name"
          name="name"
          value={site.name}
          onChange={(e) => {
            handleChange(e);
            if (!site.id) { // Auto-generate URL path only for new sites
              handleUrlChange(generateUrlPath(e.target.value));
            }
          }}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          The name of your check-in location (e.g., "HQ Lobby", "Warehouse Door")
        </p>
      </div>
      
      {/* URL Path */}
      <div>
        <Label htmlFor="url">URL Path</Label>
        <div className="flex items-center mt-1">
          <div className="bg-gray-100 px-3 py-2 rounded-l-md text-gray-500 border border-r-0 border-gray-300">
            {tenantId}.onevisitor.app/
          </div>
          <Input
            id="url"
            name="url"
            value={site.url}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="rounded-l-none"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          The path where this site will be accessible (auto-generated from name, but you can customize it)
        </p>
      </div>

      {/* Welcome Message */}
      <div>
        <Label htmlFor="welcomeMessage">Welcome Message</Label>
        <Input
          id="welcomeMessage"
          name="welcomeMessage"
          value={site.welcomeMessage}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      {/* Language */}
      <div>
        <Label htmlFor="language">Default Language</Label>
        <Select
          value={site.language}
          onValueChange={(value) => {
            const event = {
              target: { name: "language", value },
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange(event);
          }}
        >
          <SelectTrigger id="language" className="mt-1">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Branding Colors */}
      <div>
        <Label>Branding Colors</Label>
        <div className="grid grid-cols-2 gap-4 mt-1">
          <div>
            <Label htmlFor="primaryColor" className="text-xs">
              Primary Color
            </Label>
            <div className="flex mt-1">
              <Input
                id="primaryColor"
                type="color"
                value={site.branding.primaryColor}
                onChange={(e) => handleBrandingChange("primaryColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={site.branding.primaryColor}
                onChange={(e) => handleBrandingChange("primaryColor", e.target.value)}
                className="flex-1 ml-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="secondaryColor" className="text-xs">
              Secondary Color
            </Label>
            <div className="flex mt-1">
              <Input
                id="secondaryColor"
                type="color"
                value={site.branding.secondaryColor}
                onChange={(e) => handleBrandingChange("secondaryColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={site.branding.secondaryColor}
                onChange={(e) => handleBrandingChange("secondaryColor", e.target.value)}
                className="flex-1 ml-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <Label>Logo</Label>
        <div className="mt-1 p-4 border-2 border-dashed border-gray-300 rounded-md">
          {site.branding.logo ? (
            <div className="flex items-center justify-between">
              <img
                src={site.branding.logo}
                alt="Site logo"
                className="h-12"
              />
              <button
                type="button"
                onClick={() => handleBrandingChange("logo", "")}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Upload your logo (PNG or SVG recommended)
              </p>
              <Input
                id="logo"
                type="url"
                placeholder="Enter logo URL"
                className="mt-2"
                onChange={(e) => handleBrandingChange("logo", e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Favicon Upload */}
      <div>
        <Label>Favicon</Label>
        <div className="mt-1 p-4 border-2 border-dashed border-gray-300 rounded-md">
          {site.branding.favicon ? (
            <div className="flex items-center justify-between">
              <img
                src={site.branding.favicon}
                alt="Site favicon"
                className="h-8"
              />
              <button
                type="button"
                onClick={() => handleBrandingChange("favicon", "")}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Upload a favicon (32x32px recommended)
              </p>
              <Input
                id="favicon"
                type="url"
                placeholder="Enter favicon URL"
                className="mt-2"
                onChange={(e) => handleBrandingChange("favicon", e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="border rounded-md overflow-hidden">
        <div className="bg-gray-100 p-2 border-b">
          <p className="text-xs font-medium">Live Preview</p>
        </div>
        <div
          className="w-full p-4"
          style={{
            backgroundColor: site.branding.primaryColor,
            color: "white",
          }}
        >
          <div className="flex items-center space-x-4">
            {site.branding.logo && (
              <img src={site.branding.logo} alt="Logo" className="h-8" />
            )}
            <h2 className="text-xl font-semibold">{site.name} Check-in</h2>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm">{site.welcomeMessage}</p>
        </div>
      </div>
    </div>
  );
};
