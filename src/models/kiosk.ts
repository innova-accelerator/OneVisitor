
// Site branding interface
export interface KioskBranding {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  favicon: string;
}

// Visitor type interface
export interface VisitorType {
  id: string;
  name: string;
  icon?: string;
}

// Form field interface
export interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  visitorTypeIds?: string[];
  conditionalLogic?: {
    field: string;
    operator: "equals" | "notEquals" | "contains";
    value: string;
  };
}

// Host interface
export interface Host {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
}

// Kiosk site interface
export interface KioskSite {
  id: string;
  name: string;
  url: string; 
  urlType: "subdomain" | "path";
  published: boolean;
  branding: KioskBranding;
  welcomeMessage: string;
  language: string;
  lastPublished: string | null;
  visitorTypes: VisitorType[];
  formFields: FormField[];
  hosts?: Host[];
}
