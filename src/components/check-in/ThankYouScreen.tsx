
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Shield } from "lucide-react";
import { TenantBranding } from "@/models/tenant";

interface VisitorFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  host: string;
  purpose: string;
  expectedDuration: string;
  signature: boolean;
  photo: boolean;
  visitorType: string;
}

interface ThankYouScreenProps {
  formData: VisitorFormData;
  onUnlock: () => void;
  onDone: () => void;
  tenantBranding: TenantBranding | null;
  photo?: File | null;
}

export const ThankYouScreen = ({ formData, onUnlock, onDone, tenantBranding, photo }: ThankYouScreenProps) => {
  return (
    <div className="space-y-8 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check-in Complete!</h2>
        <p className="text-gray-600">
          Thank you for checking in. Your host has been notified.
        </p>
      </div>
      
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="space-y-2 text-left">
            {photo && (
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={URL.createObjectURL(photo)} 
                    alt="Visitor" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <p className="text-sm"><strong>Name:</strong> {formData.name}</p>
            <p className="text-sm"><strong>Host:</strong> {formData.host}</p>
            <p className="text-sm"><strong>Check-in Time:</strong> {new Date().toLocaleTimeString()}</p>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-green-200">
              <span className="text-xs text-green-700">Badge ID: VIS-{Math.floor(Math.random() * 10000)}</span>
              <Badge variant="secondary" className="bg-green-700 text-white">
                <Clock className="h-3 w-3 mr-1" />
                {formData.expectedDuration || "1 hour"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Button 
          onClick={onUnlock}
          className="w-full"
          style={{ 
            backgroundColor: tenantBranding?.primaryColor || "#3498db",
            color: "#ffffff"
          }}
          size="lg"
        >
          <Shield className="h-5 w-5 mr-2" />
          Unlock Door
        </Button>
        
        <Button
          variant="outline"
          onClick={onDone}
          className="w-full"
        >
          Done
        </Button>
      </div>
    </div>
  );
};
