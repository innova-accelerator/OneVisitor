
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTenantBranding } from "@/components/check-in/useTenantBranding";
import { CheckInHeader } from "@/components/check-in/CheckInHeader";
import { CheckInProgress } from "@/components/check-in/CheckInProgress";
import { VisitorTypeSelection } from "@/components/check-in/VisitorTypeSelection";
import { VisitorForm } from "@/components/check-in/VisitorForm";
import { ReviewConfirm } from "@/components/check-in/ReviewConfirm";
import { ThankYouScreen } from "@/components/check-in/ThankYouScreen";
import { ImageUploader } from "@/components/kiosk/ImageUploader";
import { KioskSite } from "@/models/kiosk";

interface CheckInProps {
  siteConfig?: KioskSite;
  isPreview?: boolean;
}

const CheckIn = ({ siteConfig, isPreview = false }: CheckInProps) => {
  const { sitePath } = useParams<{ sitePath?: string }>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    host: "",
    purpose: "",
    expectedDuration: "",
    signature: false,
    photo: false,
    visitorType: ""
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const { toast } = useToast();
  const { tenantBranding } = useTenantBranding(sitePath);

  // Use siteConfig if in preview mode, otherwise use tenantBranding
  const currentBranding = isPreview && siteConfig ? {
    name: siteConfig.name,
    logo: siteConfig.branding.logo,
    primaryColor: siteConfig.branding.primaryColor,
    secondaryColor: siteConfig.branding.secondaryColor,
    font: undefined
  } : tenantBranding;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleUnlock = () => {
    if (!isPreview) {
      toast({
        title: "Door Unlocked",
        description: "Access granted. Door will remain unlocked for 30 seconds.",
      });
    }
  };

  const handleSubmit = () => {
    if (!isPreview) {
      // Create FormData for submission
      const submissionData = new FormData();
      for (const key in formData) {
        submissionData.append(key, String(formData[key as keyof typeof formData]));
      }
      
      // Add photo if present
      if (photo) {
        submissionData.append('photo', photo);
      }

      // TODO: switch to multipart/form-data in backend
      // Make API call with FormData
      if (sitePath) {
        // This is a placeholder for the actual API call
        console.log('Would submit to:', `/api/sites/${sitePath}/visitors`);
        console.log('Form data:', Object.fromEntries(submissionData.entries()));
      }
      
      toast({
        title: "Check-in Complete!",
        description: "Welcome badge has been printed. Please wait for host notification.",
      });
    }
    setStep(4);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      host: "",
      purpose: "",
      expectedDuration: "",
      signature: false,
      photo: false,
      visitorType: ""
    });
    setPhoto(null);
    setStep(1);
  };

  // Use visitor types from siteConfig if in preview mode, otherwise use mock data
  const visitorTypes = isPreview && siteConfig ? 
    siteConfig.visitorTypes.map(vt => ({
      id: vt.id,
      name: vt.name,
      icon: vt.icon || "User",
      color: "#3498db"
    })) : [
      { id: "visitor", name: "Visitor", icon: "User", color: "#3498db" },
      { id: "contractor", name: "Contractor", icon: "Briefcase", color: "#e74c3c" },
      { id: "delivery", name: "Delivery", icon: "Package", color: "#27ae60" },
      { id: "interview", name: "Interview", icon: "Calendar", color: "#f39c12" }
    ];

  const renderCurrentStep = () => {
    switch(step) {
      case 1:
        return (
          <VisitorTypeSelection 
            visitorTypes={visitorTypes} 
            onSelect={(type) => {
              handleInputChange("visitorType", type);
              handleNextStep();
            }} 
          />
        );
      case 2:
        return (
          <>
            <VisitorForm 
              formData={formData} 
              onInputChange={handleInputChange} 
            />
            {!isPreview && (
              <div className="mt-6">
                <ImageUploader photo={photo} onPhotoChange={setPhoto} />
              </div>
            )}
          </>
        );
      case 3:
        return (
          <ReviewConfirm 
            formData={formData} 
            visitorTypes={visitorTypes}
            onEdit={setStep}
            photo={photo}
          />
        );
      case 4:
        return (
          <ThankYouScreen 
            formData={formData} 
            onUnlock={handleUnlock} 
            onDone={resetForm}
            tenantBranding={currentBranding}
            photo={photo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4"
      style={currentBranding ? {
        background: `linear-gradient(to bottom right, ${currentBranding.primaryColor}10, ${currentBranding.secondaryColor || currentBranding.primaryColor}10)`,
        fontFamily: currentBranding.font || 'inherit'
      } : {}}
    >
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8">
          {/* Logo & Header */}
          <CheckInHeader tenantBranding={currentBranding} />
          
          {/* Progress and Content */}
          <CheckInProgress 
            step={step}
            tenantBranding={currentBranding}
            onPrevious={handlePreviousStep}
            onNext={step < 3 ? handleNextStep : handleSubmit}
            isNextDisabled={step === 2 && (!formData.name || !formData.email || !formData.host)}
            showNavigation={step > 1 && step < 4}
            nextButtonText={step < 3 ? "Next" : "Complete Check-in"}
          >
            {renderCurrentStep()}
          </CheckInProgress>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckIn;
