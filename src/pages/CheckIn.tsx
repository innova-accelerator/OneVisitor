import { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { Shield, Camera, QrCode, Clock, CheckCircle, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TenantContext, TenantBranding } from "../App";

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
  const { tenantId } = useParams<{ tenantId: string }>();
  const { setCurrentTenant, setTenantBranding, tenantBranding } = useContext(TenantContext);
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
    photo: false
  });
  const { toast } = useToast();

  // Load tenant branding when component mounts or tenantId changes
  useEffect(() => {
    if (tenantId && demoTenants[tenantId]) {
      setCurrentTenant(tenantId);
      setTenantBranding(demoTenants[tenantId]);
    } else {
      // Default branding
      setCurrentTenant(null);
      setTenantBranding(null);
    }
  }, [tenantId, setCurrentTenant, setTenantBranding]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
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
    setStep(5);
  };

  // Get styling based on tenant branding
  const getBrandStyles = () => {
    if (!tenantBranding) {
      return {
        primaryBg: "from-blue-600 to-purple-600",
        primaryButton: "bg-blue-600 hover:bg-blue-700",
        logo: <Shield className="h-8 w-8 text-blue-600" />,
        organizationName: "OneVisitor"
      };
    }

    return {
      primaryBg: "",
      primaryButton: "",
      logo: tenantBranding.logo ? 
        <img src={tenantBranding.logo} alt="Logo" className="h-8 w-8" /> : 
        <Shield className="h-8 w-8" style={{ color: tenantBranding.primaryColor }} />,
      organizationName: tenantBranding.name
    };
  };

  const brandStyles = getBrandStyles();

  // Helper to apply tenant's primary color to buttons
  const getButtonStyle = () => {
    if (!tenantBranding) {
      return "bg-blue-600 hover:bg-blue-700";
    }
    
    return "";
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
              <p className="text-gray-600">Please enter your information to check in</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="text-lg p-6"
                />
              </div>
              
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                  className="text-lg p-6"
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
                  className="text-lg p-6"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Visit Details</h2>
              <p className="text-gray-600">Tell us about your visit</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="host">Host Name *</Label>
                <Input
                  id="host"
                  value={formData.host}
                  onChange={(e) => handleInputChange("host", e.target.value)}
                  placeholder="Who are you visiting?"
                  className="text-lg p-6"
                />
              </div>
              
              <div>
                <Label htmlFor="purpose">Purpose of Visit</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                  placeholder="Brief description of your visit"
                  className="text-lg p-4"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Expected Duration</Label>
                <select
                  id="duration"
                  value={formData.expectedDuration}
                  onChange={(e) => handleInputChange("expectedDuration", e.target.value)}
                  className="w-full text-lg p-6 border border-gray-300 rounded-md"
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
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Photo & Verification</h2>
              <p className="text-gray-600">We need a photo for your visitor badge</p>
            </div>
            
            <div className="space-y-6">
              <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                <CardContent className="p-8 text-center">
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Take Photo</h3>
                  <p className="text-gray-600 mb-4">Position yourself in the frame and smile!</p>
                  <Button 
                    onClick={() => setFormData(prev => ({ ...prev, photo: true }))}
                    className={getButtonStyle()}
                    style={{ 
                      backgroundColor: tenantBranding?.primaryColor,
                      color: "#ffffff"
                    }}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Capture Photo
                  </Button>
                  {formData.photo && (
                    <div className="mt-4">
                      <Badge className="bg-green-100 text-green-800">Photo captured successfully!</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign Agreements</h2>
              <p className="text-gray-600">Please review and sign the required documents</p>
            </div>
            
            <div className="space-y-4">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Visitor Agreement</CardTitle>
                  <CardDescription>
                    By signing below, you acknowledge that you understand and agree to follow all facility policies.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-300 text-center">
                    <p className="text-gray-600 mb-4">Digital signature area</p>
                    <Button 
                      onClick={() => setFormData(prev => ({ ...prev, signature: true }))}
                      variant="outline"
                    >
                      Sign Here
                    </Button>
                    {formData.signature && (
                      <div className="mt-4">
                        <Badge className="bg-green-100 text-green-800">Document signed!</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900">Welcome!</h2>
            <p className="text-xl text-gray-600">Your badge is being printed</p>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="space-y-2 text-left">
                  <p><strong>Visitor:</strong> {formData.name}</p>
                  <p><strong>Company:</strong> {formData.company}</p>
                  <p><strong>Host:</strong> {formData.host}</p>
                  <p><strong>Duration:</strong> {formData.expectedDuration}</p>
                  <p><strong>Check-in Time:</strong> {new Date().toLocaleTimeString()}</p>
                </div>
              </CardContent>
            </Card>
            
            <p className="text-gray-600 mb-6">
              Your host has been notified. Please wait in the reception area.
            </p>
            
            <Button 
              onClick={handleUnlock}
              className={getButtonStyle()}
              style={{ 
                backgroundColor: tenantBranding?.primaryColor,
                color: "#ffffff"
              }}
              size="lg"
            >
              <Shield className="h-5 w-5 mr-2" />
              Unlock Door
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      style={tenantBranding ? {
        background: `linear-gradient(to bottom right, ${tenantBranding.primaryColor}10, ${tenantBranding.secondaryColor}10)`,
        fontFamily: tenantBranding.font || 'inherit'
      } : {}}
    >
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              {brandStyles.logo}
              <span 
                className="text-xl font-bold text-gray-900"
                style={tenantBranding ? { color: tenantBranding.primaryColor } : {}}
              >
                {brandStyles.organizationName}
              </span>
            </Link>
            <div className="flex items-center space-x-2">
              <QrCode className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Scan QR code for faster check-in</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        {step < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[1, 2, 3, 4].map((stepNumber) => (
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
              Step {step} of 4
            </div>
          </div>
        )}

        {/* Main Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            {renderStep()}
            
            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  Previous
                </Button>
                
                {step < 4 ? (
                  <Button
                    onClick={handleNextStep}
                    disabled={
                      (step === 1 && (!formData.name || !formData.email)) ||
                      (step === 2 && !formData.host) ||
                      (step === 3 && !formData.photo) ||
                      (step === 4 && !formData.signature)
                    }
                    className={getButtonStyle()}
                    style={{ 
                      backgroundColor: tenantBranding?.primaryColor || undefined,
                      color: "#ffffff"
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.signature}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Complete Check-in
                  </Button>
                )}
              </div>
            )}
            
            {step === 5 && (
              <div className="mt-8 text-center">
                <Link to="/dashboard">
                  <Button variant="outline">
                    <LogOut className="h-4 w-4 mr-2" />
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckIn;
