
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

interface VisitorFormProps {
  formData: VisitorFormData;
  onInputChange: (field: string, value: string) => void;
}

export const VisitorForm = ({ formData, onInputChange }: VisitorFormProps) => {
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
            onChange={(e) => onInputChange("name", e.target.value)}
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
            onChange={(e) => onInputChange("email", e.target.value)}
            placeholder="your.email@company.com"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => onInputChange("company", e.target.value)}
            placeholder="Your company name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="host">Host Name *</Label>
          <Input
            id="host"
            value={formData.host}
            onChange={(e) => onInputChange("host", e.target.value)}
            placeholder="Who are you visiting?"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="purpose">Purpose of Visit</Label>
          <Textarea
            id="purpose"
            value={formData.purpose}
            onChange={(e) => onInputChange("purpose", e.target.value)}
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
            onChange={(e) => onInputChange("expectedDuration", e.target.value)}
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
