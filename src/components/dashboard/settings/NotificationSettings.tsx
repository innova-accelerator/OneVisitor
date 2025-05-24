
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    slackEnabled: false,
    slackWebhook: "",
    teamsEnabled: false,
    teamsWebhook: ""
  });

  return (
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
  );
};

export default NotificationSettings;
