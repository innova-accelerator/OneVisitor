
import React, { useState, useEffect } from 'react';
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { AVAILABLE_ROLES, UserFormData } from "@/types/user";
import { Check, X } from "lucide-react";

/**
 * UserEditorModal
 * 
 * A form modal for creating or editing users.
 * Validates inputs and calls onSave with the form data when submitted.
 * 
 * TODO: When implementing API, add loading states and error handling.
 */
interface UserEditorModalProps {
  isOpen: boolean;
  initialData?: { id: string; name: string; email: string; roles: string[]; isActive: boolean };
  onSave: (data: UserFormData) => void;
  onCancel: () => void;
}

export function UserEditorModal({ 
  isOpen, 
  initialData, 
  onSave, 
  onCancel 
}: UserEditorModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    roles: [],
    isActive: true
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    roles?: string;
  }>({});

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        roles: initialData.roles,
        isActive: initialData.isActive
      });
    } else {
      // Reset to defaults for new user
      setFormData({
        name: "",
        email: "",
        roles: [],
        isActive: true
      });
    }
    
    // Clear errors when form is reset
    setErrors({});
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when it's changed
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRoleToggle = (role: string) => {
    setFormData(prev => {
      const newRoles = prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role];
        
      // Clear roles error if any are selected
      if (newRoles.length > 0 && errors.roles) {
        setErrors(prev => ({ ...prev, roles: undefined }));
      }
        
      return { ...prev, roles: newRoles };
    });
  };

  const handleActiveChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };

  const validateForm = (): boolean => {
    const newErrors: {name?: string; email?: string; roles?: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (formData.roles.length === 0) {
      newErrors.roles = "At least one role is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={initialData ? "Edit User" : "Add New User"}
      description={initialData 
        ? "Edit the information for this user."
        : "Add a new user to the system."
      }
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>
        
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="user@example.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
        
        {/* Roles Field */}
        <div className="space-y-2">
          <Label className={errors.roles ? "text-destructive" : ""}>
            Roles
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {AVAILABLE_ROLES.map((role) => (
              <div 
                key={role} 
                className={`flex items-center justify-between border rounded-md p-2 cursor-pointer ${
                  formData.roles.includes(role) 
                    ? 'bg-primary/10 border-primary' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => handleRoleToggle(role)}
              >
                <span>{role}</span>
                {formData.roles.includes(role) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </div>
          {errors.roles && <p className="text-sm text-destructive">{errors.roles}</p>}
        </div>
        
        {/* Active Status Field */}
        <div className="flex items-center justify-between">
          <Label htmlFor="isActive">Active Status</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={handleActiveChange}
            />
            <span className={`text-sm ${formData.isActive ? 'text-green-600' : 'text-gray-400'}`}>
              {formData.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save User
          </Button>
        </div>
      </form>
    </Modal>
  );
}
