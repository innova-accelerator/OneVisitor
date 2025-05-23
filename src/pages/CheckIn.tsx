
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

const CheckIn = () => {
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
  const { toast } = useToast();
  const { tenantBranding } = useTenantBranding(sitePath);

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
    toast({
      title: "Door Unlocked",
      description: "Access granted. Door will remain unlocked for 30 seconds.",
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Check-in Complete!",
      description: "Welcome badge has been printed. Please wait for host notification.",
    });
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
    setStep(1);
  };

  // Mock visitor types
  const visitorTypes = [
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
          <VisitorForm 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 3:
        return (
          <ReviewConfirm 
            formData={formData} 
            visitorTypes={visitorTypes}
            onEdit={setStep} 
          />
        );
      case 4:
        return (
          <ThankYouScreen 
            formData={formData} 
            onUnlock={handleUnlock} 
            onDone={resetForm}
            tenantBranding={tenantBranding}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4"
      style={tenantBranding ? {
        background: `linear-gradient(to bottom right, ${tenantBranding.primaryColor}10, ${tenantBranding.secondaryColor}10)`,
        fontFamily: tenantBranding.font || 'inherit'
      } : {}}
    >
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8">
          {/* Logo & Header */}
          <CheckInHeader tenantBranding={tenantBranding} />
          
          {/* Progress and Content */}
          <CheckInProgress 
            step={step}
            tenantBranding={tenantBranding}
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
