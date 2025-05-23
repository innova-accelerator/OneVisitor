
import { KioskSite } from "@/models/kiosk";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
  handleUrlChange
}: BrandingTabContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="site-name">Site Name</Label>
          <Input 
            id="site-name" 
            value={site.name} 
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Main Office"
          />
        </div>

        <div>
          <Label htmlFor="url-type">URL Type</Label>
          <div className="flex space-x-2 mt-1">
            <Button
              type="button"
              variant={site.urlType === "path" ? "default" : "outline"}
              onClick={() => handleChange("urlType", "path")}
              className="flex-1"
            >
              Path
            </Button>
            <Button
              type="button"
              variant={site.urlType === "subdomain" ? "default" : "outline"}
              onClick={() => handleChange("urlType", "subdomain")}
              className="flex-1"
            >
              Subdomain
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="site-url">
            {site.urlType === "subdomain" 
              ? "Subdomain" 
              : "Path"
            }
          </Label>
          <div className="flex items-center mt-1">
            {site.urlType === "subdomain" && (
              <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 text-gray-500">
                https://
              </div>
            )}
            <Input
              id="site-url"
              value={site.url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder={site.urlType === "subdomain" ? "office" : "checkin"}
              className={site.urlType === "subdomain" ? "rounded-l-none" : ""}
            />
            {site.urlType === "subdomain" ? (
              <div className="bg-gray-100 px-3 py-2 rounded-r-md border border-l-0 text-gray-500">
                .onevisitor.app
              </div>
            ) : (
              <div className="bg-gray-100 px-3 py-2 rounded-r-md border border-l-0 text-gray-500">
                .onevisitor.app/{site.url}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="logo-url">Logo URL</Label>
          <Input
            id="logo-url"
            value={site.branding.logo}
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
            value={site.branding.favicon}
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
                value={site.branding.primaryColor}
                onChange={(e) => handleBrandingChange("primaryColor", e.target.value)}
                className="h-10 w-10 border rounded"
              />
              <Input
                value={site.branding.primaryColor}
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
                value={site.branding.secondaryColor}
                onChange={(e) => handleBrandingChange("secondaryColor", e.target.value)}
                className="h-10 w-10 border rounded"
              />
              <Input
                value={site.branding.secondaryColor}
                onChange={(e) => handleBrandingChange("secondaryColor", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="welcome-message">Welcome Message</Label>
          <textarea
            id="welcome-message"
            value={site.welcomeMessage}
            onChange={(e) => handleChange("welcomeMessage", e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <select
            id="language"
            value={site.language}
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
      <SiteBrandingPreview site={site} />
    </div>
  );
};

// Site Branding Preview component
const SiteBrandingPreview = ({ site }: { site: KioskSite }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div 
        className="w-full p-4"
        style={{
          backgroundColor: site.branding.primaryColor,
          color: "white"
        }}
      >
        <div className="flex items-center space-x-4">
          {site.branding.logo && (
            <img 
              src={site.branding.logo}
              alt={site.name}
              className="h-8"
            />
          )}
          <h2 className="text-xl font-semibold">
            {site.name || "Site Name"} Check-in
          </h2>
        </div>
      </div>
      <div className="p-6">
        <div className="prose">
          <h3>Welcome</h3>
          <p>{site.welcomeMessage}</p>
          
          <div className="mt-8">
            <h4>I am here for:</h4>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {site.visitorTypes.map(type => (
                <div 
                  key={type.id}
                  className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50"
                  style={{
                    borderColor: site.branding.secondaryColor
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
  );
};
