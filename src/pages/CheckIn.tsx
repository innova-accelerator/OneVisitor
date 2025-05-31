import { useState, useEffect } from "react";
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
import { useSiteDetails } from "@/hooks/useSite";

interface CheckInProps {
  isPreview?: boolean;
}

interface FormData {
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

interface VisitorType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const CheckIn = ({ isPreview = false }: CheckInProps) => {
  const { sitePath } = useParams<{ sitePath?: string }>();
  const [step, setStep] = useState<number>(1);
  const { site, submitVisitor } = useSiteDetails(sitePath);
  const [badgeID, setBadgeID]=useState(null)
  
  const [formData, setFormData] = useState<FormData>({
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
  const [currentBranding, setCurrentBranding] = useState<any>(null);
  const [visitorTypes, setVisitorTypes] = useState<VisitorType[]>([]);
  const { toast } = useToast();
  const { tenantBranding } = useTenantBranding(sitePath);

  // Update branding and visitor types when site or tenantBranding changes
  useEffect(() => {
    if (site) {
      setCurrentBranding({
        name: site.name,
        logo: site.branding.logo,
        primaryColor: site.branding.primaryColor,
        secondaryColor: site.branding.secondaryColor,
        font: undefined
      });
      
      setVisitorTypes(site.visitorTypes?.map(vt => ({
        id: vt.id,
        name: vt.name,
        icon: vt.icon || "User",
        color: site.branding.primaryColor || "#3498db"
      })) || []);
    } else if (tenantBranding) {
      setCurrentBranding(tenantBranding);
    }
  }, [site]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
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

  const handleSubmit = async () => {
    if (!isPreview) {
      try {
        // Create FormData for submission
        const submissionData = new FormData();
        
        // Add form data
        Object.entries(formData).forEach(([key, value]) => {
          submissionData.append(key, String(value));
        });
        
        // Add photo if present
        if (photo) {
          submissionData.append('photo', photo);
        }
        
        // Make API call if sitePath exists
        if (sitePath) {
          // TODO: Replace with actual API call
          console.log('Would submit to:', `/api/sites/site/${sitePath}/visitors`);
          console.log('Form data:', Object.fromEntries(submissionData.entries()));
          
          // Example API call:
          // const response = await fetch(`/api/sites/${sitePath}/visitors`, {
          //   method: 'POST',
          //   body: submissionData,
          // });
          // 
          // if (!response.ok) {
          //   throw new Error('Failed to submit check-in');
          // }
          var badgeIDS=`VIS-${Math.floor(Math.random() * 10000)}`

          const dateNow=new Date()
          submissionData.append('site', site.id);
          submissionData.append('badgeID', badgeIDS);
          submissionData.append('checkIn', dateNow.toISOString());
          setBadgeID(badgeIDS)
          const response=await submitVisitor(submissionData)
          console.info(response)
        }
        
        toast({
          title: "Check-in Complete!",
          description: "Welcome badge has been printed. Please wait for host notification.",
        });
      } catch (error) {
        console.error('Check-in submission error:', error);
        toast({
          title: "Check-in Failed",
          description: "Please try again or contact support.",
          variant: "destructive",
        });
        return; // Don't proceed to step 4 if submission failed
      }
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



  const renderCurrentStep = () => {
    switch(step) {
      case 1:
        return (
          <VisitorTypeSelection 
            visitorTypes={visitorTypes} 
            onSelect={(type: string) => {
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
              site={site}
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
            badgeID={badgeID}
          />
        );
      default:
        return null;
    }
  };

  // Validate required fields for step 2 based on site.formFields
  const isStep2Valid = () => {
    if (!site?.formFields) {
      // Default validation if no site formFields
      return formData.name.trim() && formData.email.trim() && formData.host.trim();
    }
    
    // Check all required fields from site.formFields
    return site.formFields
      .filter(field => field.required)
      .every(field => {
        const value = formData[field.id];
        return value && String(value).trim();
      });
  };

  // Create gradient background using site colors
  const backgroundStyle = currentBranding ? {
    background: `linear-gradient(to bottom right, ${currentBranding.primaryColor}10, ${currentBranding.secondaryColor || currentBranding.primaryColor}20)`,
    fontFamily: currentBranding.font || 'inherit'
  } : {};

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4"
      style={backgroundStyle}
    >
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8">
          {/* Logo & Header */}
          <CheckInHeader site={site} />
          
          {/* Progress and Content */}
          <CheckInProgress 
            step={step}
            tenantBranding={currentBranding}
            onPrevious={handlePreviousStep}
            onNext={step < 3 ? handleNextStep : handleSubmit}
            isNextDisabled={step === 2 && !isStep2Valid()}
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