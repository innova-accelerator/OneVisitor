
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const SecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    requirePhoto: true,
    requireSignature: true,
    badgeExpiration: 24,
    autoCheckout: 12,
    doorAccess: false
  });

  return (
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
  );
};

export default SecuritySettings;
