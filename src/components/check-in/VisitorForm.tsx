import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[] | { value: string; label: string }[];
  placeholder?: string;
}

interface Host {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  visitor_count: number;
}

interface VisitorFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  host: string | number; // Can be string initially, but should be number for API
  purpose: string;
  expectedDuration: string;
  signature: boolean;
  photo: boolean;
  visitorType: string;
  [key: string]: any; // Allow dynamic fields
}

interface VisitorFormProps {
  formData: VisitorFormData;
  onInputChange: (field: string, value: string | number) => void;
  site?: {
    formFields?: FormField[];
    hosts?: Host[];
  } | null;
}

export const VisitorForm = ({ formData, onInputChange, site }: VisitorFormProps) => {
  if (!site?.formFields || site.formFields.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
          <p className="text-gray-600">No form fields configured for this site</p>
        </div>
      </div>
    );
  }

  const renderHostField = (field: FormField) => {
    const value = formData[field.id] || "";
    const isRequired = field.required;
    const label = `${field.label}${isRequired ? ' *' : ''}`;
    
    const hosts = site?.hosts || [];
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Find selected host
    const selectedHost = hosts.find(host => host.id.toString() === value.toString());
    
    // Filter hosts based on search
    const filteredHosts = hosts.filter(host => 
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div key={field.id} className="relative">
        <Label htmlFor={field.id}>{label}</Label>
        
        {/* Display Field - Shows selected host or placeholder */}
        <div 
          className="mt-1 relative border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedHost ? (
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-900">{selectedHost.name}</div>
                <div className="text-sm text-gray-600">{selectedHost.email}</div>
              </div>
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-gray-500">{field.placeholder || "Select a host..."}</span>
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200">
              <Input
                type="text"
                placeholder="Search hosts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            
            {/* Host List */}
            <div className="max-h-60 overflow-auto">
              {filteredHosts.length > 0 ? (
                filteredHosts.map((host) => (
                  <div
                    key={host.id}
                    className="px-3 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      onInputChange(field.id, host.id);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    <div className="font-medium text-gray-900">{host.name}</div>
                    <div className="text-sm text-gray-600">
                      {host.email} {host.department && `• ${host.department}`}
                    </div>
                    {host.phone && (
                      <div className="text-xs text-gray-500">{host.phone}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-3 py-3 text-gray-500 text-center">
                  No hosts found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Overlay to close dropdown when clicking outside */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => {
              setIsOpen(false);
              setSearchTerm("");
            }}
          />
        )}
      </div>
    );
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || "";
    const isRequired = field.required;
    const label = `${field.label}${isRequired ? ' *' : ''}`;

    // Special handling for Host field
    if (field.id === 'host' || field.label.toLowerCase() === 'host') {
      return renderHostField(field);
    }

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{label}</Label>
            <Input
              id={field.id}
              type={field.type}
              value={value}
              onChange={(e) => onInputChange(field.id, e.target.value)}
              placeholder={field.placeholder || ""}
              className="mt-1"
              required={isRequired}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{label}</Label>
            <Textarea
              id={field.id}
              value={value}
              onChange={(e) => onInputChange(field.id, e.target.value)}
              placeholder={field.placeholder || ""}
              className="mt-1"
              rows={2}
              required={isRequired}
            />
          </div>
        );

      case "select":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{label}</Label>
            <Select value={value} onValueChange={(val) => onInputChange(field.id, val)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => {
                  const optionValue = typeof option === 'string' ? option : option.value;
                  const optionLabel = typeof option === 'string' ? option : option.label;
                  return (
                    <SelectItem key={optionValue} value={optionValue}>
                      {optionLabel}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        );

      case "number":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{label}</Label>
            <Input
              id={field.id}
              type="number"
              value={value}
              onChange={(e) => onInputChange(field.id, e.target.value)}
              placeholder={field.placeholder || ""}
              className="mt-1"
              required={isRequired}
            />
          </div>
        );

      case "date":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{label}</Label>
            <Input
              id={field.id}
              type="date"
              value={value}
              onChange={(e) => onInputChange(field.id, e.target.value)}
              className="mt-1"
              required={isRequired}
            />
          </div>
        );

      case "time":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{label}</Label>
            <Input
              id={field.id}
              type="time"
              value={value}
              onChange={(e) => onInputChange(field.id, e.target.value)}
              className="mt-1"
              required={isRequired}
            />
          </div>
        );

      default:
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{label}</Label>
            <Input
              id={field.id}
              value={value}
              onChange={(e) => onInputChange(field.id, e.target.value)}
              placeholder={field.placeholder || ""}
              className="mt-1"
              required={isRequired}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
        <p className="text-gray-600">Please enter your details below</p>
      </div>
      
      <div className="space-y-4">
        {site.formFields.map(renderField)}
      </div>
    </div>
  );
};