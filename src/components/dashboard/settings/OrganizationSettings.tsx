
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";

const OrganizationSettings = () => {
  const [orgName, setOrgName] = useState("Acme Corporation");
  const [primaryContact, setPrimaryContact] = useState("admin@acmecorp.com");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>("https://placehold.co/100x50?text=ACME");

  const handleFileSelect = (file: File) => {
    setLogoFile(file);
    // Generate a preview URL
    const previewUrl = URL.createObjectURL(file);
    setLogoUrl(previewUrl);
    // TODO: In a real implementation, you would upload this file to your server/storage
  };

  const handleClearLogo = () => {
    setLogoFile(null);
    if (logoUrl && logoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(logoUrl);
    }
    setLogoUrl(null);
  };

  const handleSubmit = () => {
    // TODO: Save organization settings
    console.log("Saving organization settings:", { orgName, primaryContact, logoFile });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle>Organization Settings</CardTitle>
        <CardDescription>
          Manage organization settings and subscription
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="logo-upload">Organization Logo</Label>
            <div className="mt-2">
              <FileUpload 
                onFileSelect={handleFileSelect}
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
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="primary-contact">Primary Contact Email</Label>
            <Input 
              id="primary-contact" 
              type="email"
              value={primaryContact}
              onChange={(e) => setPrimaryContact(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="subscription">Subscription Plan</Label>
            <div className="flex items-center space-x-2 mt-1">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium">
                Professional Plan
              </div>
              <span className="text-sm text-gray-500">
                (Renews on: Jan 1, 2026)
              </span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="usage">Resource Usage</Label>
            <div className="space-y-2 mt-1">
              <div className="flex justify-between text-sm">
                <span>Sites:</span>
                <span>3 of 5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Users:</span>
                <span>12 of 25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Visitors per month:</span>
                <span>842 of 1,000</span>
              </div>
            </div>
          </div>
          
          <Button onClick={handleSubmit}>Save Organization Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationSettings;
