
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandingSettings from "./settings/BrandingSettings";
import CheckInFormSettings from "./settings/CheckInFormSettings";
import NotificationSettings from "./settings/NotificationSettings";
import SecuritySettings from "./settings/SecuritySettings";
import OrganizationSettings from "./settings/OrganizationSettings";

export const SettingsTabs = () => {
  return (
    <Tabs defaultValue="branding" className="space-y-4">
      <TabsList className="bg-white/80 backdrop-blur-sm">
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security & Access</TabsTrigger>
        <TabsTrigger value="organization" asChild>
          <Link to="/dashboard/settings/organization" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Organization Settings
          </Link>
        </TabsTrigger>
        <TabsTrigger value="integrations" asChild>
          <Link to="/dashboard/settings/integrations" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Integrations
          </Link>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="branding">
        <BrandingSettings />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
      
      <TabsContent value="organization">
        <OrganizationSettings />
      </TabsContent>
      
      <TabsContent value="integrations">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">Integrations</h2>
          <p className="text-muted-foreground mt-2">Configure third-party integrations and API connections.</p>
          {/* TODO: Add integration settings UI here */}
        </div>
      </TabsContent>
    </Tabs>
  );
};
