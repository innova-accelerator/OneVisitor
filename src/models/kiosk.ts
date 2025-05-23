
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
  requiredFields?: string[];
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
  active?: boolean;
}

// Site visitor interface (for check-ins/outs)
export interface SiteVisitor {
  id: string;
  siteId: string;
  visitorType: string;
  name: string;
  company?: string;
  host: string;
  checkInTime: string;
  checkOutTime?: string;
  formResponses: Record<string, any>;
  signatureUrl?: string;
  photoUrl?: string;
  status: 'active' | 'checked-out';
}

// Site interface
export interface KioskSite {
  id: string;
  tenantId: string;
  name: string;
  url: string;  // URL path for the site (e.g., "hq-lobby", "warehouse-door")
  urlType: "path";  // Only using path-based URLs now
  published: boolean;
  branding: KioskBranding;
  welcomeMessage: string;
  language: string;
  lastPublished: string | null;
  visitorTypes: VisitorType[];
  formFields: FormField[];
  hosts?: Host[];
  visitorCount?: number;
}
