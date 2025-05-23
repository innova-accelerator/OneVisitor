
/**
 * Tenant model representing an organization in the multi-tenant system
 */
export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  branding: TenantBranding;
  settings: TenantSettings;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'pending' | 'suspended';
}

/**
 * Visual branding configuration for a tenant
 */
export interface TenantBranding {
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  font?: string;
  badgeTemplate?: BadgeTemplate;
}

/**
 * Badge printing configuration 
 */
export interface BadgeTemplate {
  width: number;  // in mm
  height: number; // in mm
  logoPosition: 'top' | 'left' | 'none';
  showPhoto: boolean;
  fields: string[];
  expirationHours: number;
}

/**
 * Tenant-specific settings and configurations
 */
export interface TenantSettings {
  checkIn: CheckInSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  integrations: IntegrationSettings;
}

export interface CheckInSettings {
  requiredFields: string[];
  optionalFields: string[];
  visitorAgreementText: string;
  healthScreeningEnabled: boolean;
  healthScreeningQuestions?: string[];
}

export interface NotificationSettings {
  hostEmail: boolean;
  hostSms: boolean;
  slackEnabled: boolean;
  slackWebhook?: string;
  teamsEnabled: boolean;
  teamsWebhook?: string;
  customWebhooks: string[];
}

export interface SecuritySettings {
  visitorPhotoRequired: boolean;
  signatureRequired: boolean;
  badgeExpiration: number; // hours
  autoCheckOutTime: number; // hours
  doorAccessEnabled: boolean;
  allowedDoors: string[];
}

export interface IntegrationSettings {
  calendarSync?: {
    provider: 'google' | 'outlook' | 'none';
    enabled: boolean;
  };
  accessControl?: {
    provider: 'kisi' | 'hid' | 'paxton' | 'none';
    apiKey?: string;
    doorIds: string[];
  };
  zapier?: {
    enabled: boolean;
    webhooks: {
      visitorCheckIn?: string;
      visitorCheckOut?: string;
      emergencyAlert?: string;
    };
  };
}
