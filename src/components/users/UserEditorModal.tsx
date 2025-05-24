
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
  const [formData, setFormData] = useState<UserFormData & { permissions: 'Viewer' | 'Admin' }>({
    name: "",
    email: "",
    roles: [],
    isActive: true,
    permissions: "Viewer"
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        roles: initialData.roles,
        isActive: initialData.isActive,
        permissions: "Viewer" // Default to Viewer, assuming this is new functionality
      });
    } else {
      // Reset to defaults for new user
      setFormData({
        name: "",
        email: "",
        roles: [],
        isActive: true,
        permissions: "Viewer"
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

  const handlePermissionsChange = (value: 'Viewer' | 'Admin') => {
    setFormData(prev => ({ ...prev, permissions: value }));
  };

  const handleActiveChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };

  const validateForm = (): boolean => {
    const newErrors: {name?: string; email?: string;} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: send permissions to API
      onSave({
        name: formData.name,
        email: formData.email,
        roles: formData.roles,
        isActive: formData.isActive,
        permissions: formData.permissions
      });
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
        
        {/* Permissions Field */}
        <div className="space-y-2">
          <Label htmlFor="permissions">
            Permissions
          </Label>
          <Select
            value={formData.permissions}
            onValueChange={(value: 'Viewer' | 'Admin') => handlePermissionsChange(value)}
          >
            <SelectTrigger id="permissions">
              <SelectValue placeholder="Select permissions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Viewer">Viewer</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Viewers can only view content. Admins can manage users and settings.
          </p>
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
