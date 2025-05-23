
import { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { Shield, Camera, QrCode, Clock, CheckCircle, LogOut, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TenantContext } from "@/App";
import { TenantBranding } from "@/models/tenant";

// Demo tenant branding data - in a real app this would come from API
const demoTenants: Record<string, TenantBranding> = {
  "acme-corp": {
    name: "Acme Corporation",
    logo: "https://placehold.co/200x200/3498db/FFFFFF/png?text=ACME",
    primaryColor: "#3498db",
    secondaryColor: "#2980b9",
    font: "Inter, sans-serif"
  },
  "globex": {
    name: "Globex Industries",
    logo: "https://placehold.co/200x200/27ae60/FFFFFF/png?text=GLOBEX",
    primaryColor: "#27ae60",
    secondaryColor: "#2ecc71",
    font: "Roboto, sans-serif"
  },
  "wayne-ent": {
    name: "Wayne Enterprises",
    logo: "https://placehold.co/200x200/34495e/FFFFFF/png?text=WAYNE",
    primaryColor: "#34495e",
    secondaryColor: "#2c3e50",
    font: "Montserrat, sans-serif"
  },
  "stark-ind": {
    name: "Stark Industries",
    logo: "https://placehold.co/200x200/e74c3c/FFFFFF/png?text=STARK",
    primaryColor: "#e74c3c",
    secondaryColor: "#c0392b",
    font: "Poppins, sans-serif"
  },
};

const CheckIn = () => {
  const { setCurrentTenant, setTenantBranding, tenantBranding } = useContext(TenantContext);
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

  // Load tenant branding when component mounts or site path changes
  useEffect(() => {
    // Extract tenant ID from site path or use default
    const currentTenantId = sitePath?.split('-')[0] || 'acme-corp';
    
    if (currentTenantId && demoTenants[currentTenantId]) {
      setCurrentTenant(currentTenantId);
      setTenantBranding(demoTenants[currentTenantId]);
    } else {
      // Default branding
      setCurrentTenant(null);
      setTenantBranding(null);
    }
  }, [sitePath, setCurrentTenant, setTenantBranding]);

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

  const renderVisitorTypeSelection = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Select Visitor Type</h2>
          <p className="text-gray-600">What brings you here today?</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visitorTypes.map(type => (
            <button
              key={type.id}
              onClick={() => {
                handleInputChange("visitorType", type.id);
                handleNextStep();
              }}
              className="flex items-center p-4 border rounded-lg hover:shadow-md transition-all"
              style={{ 
                backgroundColor: `${type.color}20`, 
                borderColor: type.color 
              }}
            >
              <div className="rounded-full p-2 mr-3" style={{ backgroundColor: type.color }}>
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderVisitorForm = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
          <p className="text-gray-600">Please enter your details below</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@company.com"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="Your company name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="host">Host Name *</Label>
            <Input
              id="host"
              value={formData.host}
              onChange={(e) => handleInputChange("host", e.target.value)}
              placeholder="Who are you visiting?"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="purpose">Purpose of Visit</Label>
            <Textarea
              id="purpose"
              value={formData.purpose}
              onChange={(e) => handleInputChange("purpose", e.target.value)}
              placeholder="Brief description of your visit"
              className="mt-1"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="duration">Expected Duration</Label>
            <select
              id="duration"
              value={formData.expectedDuration}
              onChange={(e) => handleInputChange("expectedDuration", e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select duration</option>
              <option value="30min">30 minutes</option>
              <option value="1hour">1 hour</option>
              <option value="2hours">2 hours</option>
              <option value="halfday">Half day</option>
              <option value="fullday">Full day</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewConfirm = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
          <p className="text-gray-600">Please verify your information</p>
        </div>
        
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="py-3 px-4 bg-gray-50 flex justify-between items-center">
              <div>
                <CardTitle className="text-base font-medium">Personal Details</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(2)}
                className="h-8 text-xs"
              >
                Edit
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Name:</dt>
                  <dd>{formData.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Email:</dt>
                  <dd>{formData.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Company:</dt>
                  <dd>{formData.company || "—"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="py-3 px-4 bg-gray-50 flex justify-between items-center">
              <div>
                <CardTitle className="text-base font-medium">Visit Details</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(2)}
                className="h-8 text-xs"
              >
                Edit
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Visitor Type:</dt>
                  <dd>{visitorTypes.find(t => t.id === formData.visitorType)?.name || "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Host:</dt>
                  <dd>{formData.host}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Purpose:</dt>
                  <dd>{formData.purpose || "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500">Duration:</dt>
                  <dd>{formData.expectedDuration || "—"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <div className="flex justify-center pt-4">
            <Badge
              variant="outline"
              className="px-3 py-1 text-sm flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
            >
              <Camera className="h-3 w-3" />
              Photo captured
            </Badge>
          </div>
          
          <div className="text-center text-sm text-gray-500 italic">
            By checking in, you agree to our visitor terms and conditions.
          </div>
        </div>
      </div>
    );
  };

  const renderThankYou = () => {
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
            onClick={handleUnlock}
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
            onClick={resetForm}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </div>
    );
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
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              {tenantBranding?.logo ? (
                <img 
                  src={tenantBranding.logo} 
                  alt="Organization Logo" 
                  className="h-16 w-auto"
                />
              ) : (
                <Shield 
                  className="h-16 w-16" 
                  style={{ color: tenantBranding?.primaryColor || "#3498db" }}
                />
              )}
            </div>
            <h1 
              className="text-xl font-bold text-gray-900"
              style={tenantBranding ? { color: tenantBranding.primaryColor } : {}}
            >
              {tenantBranding?.name || "OneVisitor"}
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome! Please check in for your visit.
            </p>
          </div>
          
          {/* Progress Steps - only show for steps 1-3 */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {[1, 2, 3].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepNumber <= step
                        ? 'text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    style={stepNumber <= step ? { 
                      backgroundColor: tenantBranding?.primaryColor || '#3B82F6'
                    } : {}}
                  >
                    {stepNumber}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600">
                Step {step} of 3
              </div>
            </div>
          )}
          
          {/* Step Content */}
          {step === 1 && renderVisitorTypeSelection()}
          {step === 2 && renderVisitorForm()}
          {step === 3 && renderReviewConfirm()}
          {step === 4 && renderThankYou()}
          
          {/* Navigation Buttons */}
          {step > 1 && step < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={handlePreviousStep}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              {step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  disabled={
                    (step === 2 && (!formData.name || !formData.email || !formData.host))
                  }
                  style={{ 
                    backgroundColor: tenantBranding?.primaryColor || "#3498db",
                    color: "#ffffff"
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  style={{ 
                    backgroundColor: tenantBranding?.primaryColor || "#3498db",
                    color: "#ffffff"
                  }}
                >
                  Complete Check-in
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckIn;
