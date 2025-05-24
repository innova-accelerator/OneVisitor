import { useState, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TenantContext } from "@/App";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

export const SettingsTabs = () => {
  const { tenantBranding, setTenantBranding } = useContext(TenantContext);
  
  const [brandingSettings, setBrandingSettings] = useState({
    name: tenantBranding?.name || "",
    logo: tenantBranding?.logo || "",
    primaryColor: tenantBranding?.primaryColor || "#3B82F6",
    secondaryColor: tenantBranding?.secondaryColor || "#1E40AF",
    font: tenantBranding?.font || "Inter"
  });

  const [formSettings, setFormSettings] = useState({
    requiredFields: ["name", "email", "host"],
    visitorAgreement: "By signing, I acknowledge that I have read and agree to abide by all company policies during my visit.",
    healthScreening: true,
    healthQuestions: "Do you have any COVID-19 symptoms?\nHave you been exposed to anyone with COVID-19 in the past 14 days?"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    slackEnabled: false,
    slackWebhook: "",
    teamsEnabled: false,
    teamsWebhook: ""
  });

  const [securitySettings, setSecuritySettings] = useState({
    requirePhoto: true,
    requireSignature: true,
    badgeExpiration: 24,
    autoCheckout: 12,
    doorAccess: false
  });

  const handleBrandingUpdate = () => {
    if (setTenantBranding) {
      setTenantBranding(brandingSettings);
    }
  };
  
  return (
    <Tabs defaultValue="branding" className="space-y-4">
      <TabsList className="bg-white/80 backdrop-blur-sm">
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="check-in-form">Check-In Form</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security & Access</TabsTrigger>
        <TabsTrigger asChild>
          <Link to="/dashboard/settings/organization" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Organization Administration
          </Link>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="branding">
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
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input 
                    id="org-name" 
                    value={brandingSettings.name}
                    onChange={(e) => setBrandingSettings({...brandingSettings, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="org-logo">Logo URL</Label>
                  <Input 
                    id="org-logo" 
                    value={brandingSettings.logo}
                    onChange={(e) => setBrandingSettings({...brandingSettings, logo: e.target.value})}
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
      </TabsContent>
      
      <TabsContent value="check-in-form">
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Check-In Form Settings</CardTitle>
            <CardDescription>
              Configure the fields and content for your visitor check-in form
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="required-fields">Required Check-In Fields</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {["name", "email", "phone", "company", "host", "purpose", "photo", "signature"].map((field) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`field-${field}`} 
                      checked={formSettings.requiredFields.includes(field)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormSettings({...formSettings, requiredFields: [...formSettings.requiredFields, field]});
                        } else {
                          setFormSettings({...formSettings, requiredFields: formSettings.requiredFields.filter(f => f !== field)});
                        }
                      }}
                    />
                    <label htmlFor={`field-${field}`} className="text-sm">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="visitor-agreement">Visitor Agreement Text</Label>
              <Textarea 
                id="visitor-agreement"
                value={formSettings.visitorAgreement}
                onChange={(e) => setFormSettings({...formSettings, visitorAgreement: e.target.value})}
                rows={3}
                className="mt-1"
              />
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="health-screening"
                  checked={formSettings.healthScreening}
                  onCheckedChange={(checked) => setFormSettings({...formSettings, healthScreening: checked})}
                />
                <Label htmlFor="health-screening">Enable Health Screening Questions</Label>
              </div>
              
              {formSettings.healthScreening && (
                <div className="mt-4">
                  <Label htmlFor="health-questions">Health Screening Questions</Label>
                  <Textarea 
                    id="health-questions"
                    value={formSettings.healthQuestions}
                    onChange={(e) => setFormSettings({...formSettings, healthQuestions: e.target.value})}
                    rows={4}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter one question per line. Visitors must answer "No" to all questions to proceed.
                  </p>
                </div>
              )}
            </div>
            
            <Button>Save Form Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how hosts are notified when visitors arrive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Notify hosts by email when their visitors arrive</p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={notificationSettings.emailEnabled}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailEnabled: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Send text messages to hosts when their visitors check in</p>
                </div>
                <Switch 
                  id="sms-notifications"
                  checked={notificationSettings.smsEnabled}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsEnabled: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="slack-notifications">Slack Notifications</Label>
                  <p className="text-sm text-gray-500">Post messages to Slack when visitors arrive</p>
                </div>
                <Switch 
                  id="slack-notifications"
                  checked={notificationSettings.slackEnabled}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, slackEnabled: checked})}
                />
              </div>
              
              {notificationSettings.slackEnabled && (
                <div>
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input 
                    id="slack-webhook"
                    value={notificationSettings.slackWebhook}
                    onChange={(e) => setNotificationSettings({...notificationSettings, slackWebhook: e.target.value})}
                    className="mt-1"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="teams-notifications">Microsoft Teams Notifications</Label>
                  <p className="text-sm text-gray-500">Send notifications to Microsoft Teams</p>
                </div>
                <Switch 
                  id="teams-notifications"
                  checked={notificationSettings.teamsEnabled}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, teamsEnabled: checked})}
                />
              </div>
              
              {notificationSettings.teamsEnabled && (
                <div>
                  <Label htmlFor="teams-webhook">Teams Webhook URL</Label>
                  <Input 
                    id="teams-webhook"
                    value={notificationSettings.teamsWebhook}
                    onChange={(e) => setNotificationSettings({...notificationSettings, teamsWebhook: e.target.value})}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            
            <Button>Save Notification Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Security & Access Settings</CardTitle>
            <CardDescription>
              Configure security requirements and access controls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-photo">Require Visitor Photo</Label>
                  <p className="text-sm text-gray-500">Capture visitor photos during check-in</p>
                </div>
                <Switch 
                  id="require-photo"
                  checked={securitySettings.requirePhoto}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requirePhoto: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-signature">Require Visitor Signature</Label>
                  <p className="text-sm text-gray-500">Visitors must sign an agreement</p>
                </div>
                <Switch 
                  id="require-signature"
                  checked={securitySettings.requireSignature}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireSignature: checked})}
                />
              </div>
              
              <div>
                <Label htmlFor="badge-expiration">Badge Expiration Time (hours)</Label>
                <Input 
                  id="badge-expiration"
                  type="number"
                  value={securitySettings.badgeExpiration}
                  onChange={(e) => setSecuritySettings({...securitySettings, badgeExpiration: parseInt(e.target.value) || 24})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="auto-checkout">Auto-Checkout After (hours)</Label>
                <Input 
                  id="auto-checkout"
                  type="number"
                  value={securitySettings.autoCheckout}
                  onChange={(e) => setSecuritySettings({...securitySettings, autoCheckout: parseInt(e.target.value) || 12})}
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="door-access">Enable Door Access Control</Label>
                  <p className="text-sm text-gray-500">Allow visitor badges to unlock doors</p>
                </div>
                <Switch 
                  id="door-access"
                  checked={securitySettings.doorAccess}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, doorAccess: checked})}
                />
              </div>
            </div>
            
            <Button>Save Security Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
