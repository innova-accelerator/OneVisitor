
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddOrganizationModalProps {
  isOpen: boolean;
  onSave: (org: { shortname: string; name: string; subscriptionPlan: string; status: "active" | "inactive" | "pending" }) => void;
  onCancel: () => void;
}

export function AddOrganizationModal({ isOpen, onSave, onCancel }: AddOrganizationModalProps) {
  const [formValues, setFormValues] = useState({
    shortname: "",
    name: "",
    subscriptionPlan: "Basic"
  });
  
  const [errors, setErrors] = useState<{
    shortname?: string;
    name?: string;
  }>({});

  const handleChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = () => {
    const newErrors: {
      shortname?: string;
      name?: string;
    } = {};
    
    // Basic validation
    if (!formValues.shortname.trim()) {
      newErrors.shortname = "Organization ID is required";
    } else if (!/^[a-z0-9-]+$/.test(formValues.shortname)) {
      newErrors.shortname = "Only lowercase letters, numbers, and hyphens are allowed";
    }
    
    if (!formValues.name.trim()) {
      newErrors.name = "Organization Name is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave({
      ...formValues,
      status: "active"
    });
    
    // Reset form
    setFormValues({
      shortname: "",
      name: "",
      subscriptionPlan: "Basic"
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Add New Organization"
      description="Create a new organization in the system."
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Organization
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="org-shortname">Organization ID</Label>
          <Input
            id="org-shortname"
            placeholder="acme"
            value={formValues.shortname}
            onChange={(e) => handleChange("shortname", e.target.value)}
          />
          {errors.shortname && (
            <p className="text-sm text-red-500">{errors.shortname}</p>
          )}
          <p className="text-xs text-gray-500">
            This will be used in URLs and cannot be changed later
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="org-name">Organization Name</Label>
          <Input
            id="org-name"
            placeholder="Acme Corporation"
            value={formValues.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subscription-plan">Subscription Plan</Label>
          <Select 
            value={formValues.subscriptionPlan} 
            onValueChange={(value) => handleChange("subscriptionPlan", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Pro">Pro</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Modal>
  );
}
