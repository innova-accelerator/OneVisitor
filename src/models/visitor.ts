
/**
 * Visitor model representing a guest checking into a tenant's facility
 */
export interface Visitor {
  id: string;
  tenantId: string;
  name: string;
  email?: string;
  company?: string;
  phone?: string;
  hostId?: string;
  hostName: string;
  purpose?: string;
  expectedDuration?: string;
  checkInTime: string;
  checkOutTime?: string;
  photoUrl?: string;
  badgeId?: string;
  status: VisitorStatus;
  location?: string;
  agreementSigned: boolean;
  signatureUrl?: string;
  customFields?: Record<string, string>;
  doorAccessGranted?: boolean;
  lastDoorAccessTime?: string;
}

export type VisitorStatus = 'checked-in' | 'checked-out' | 'pre-registered' | 'no-show' | 'overdue' | 'emergency-safe' | 'emergency-unknown';

/**
 * Pre-registration invite for an expected visitor
 */
export interface VisitorInvite {
  id: string;
  tenantId: string;
  visitorId?: string; // Linked after check-in
  visitorName: string;
  visitorEmail: string;
  visitorCompany?: string;
  hostId: string;
  hostName: string;
  purpose?: string;
  inviteDate: string;
  meetingStart: string;
  meetingEnd?: string;
  status: InviteStatus;
  qrCode?: string;
  inviteLink?: string;
  expirationDate: string;
  sentNotifications: NotificationType[];
}

export type InviteStatus = 'pending' | 'sent' | 'confirmed' | 'checked-in' | 'expired' | 'canceled';

export type NotificationType = 'email' | 'sms' | 'calendar' | 'reminder';

/**
 * Audit log entry for visitor management activities
 */
export interface AuditLogEntry {
  id: string;
  tenantId: string;
  timestamp: string;
  action: 'check-in' | 'check-out' | 'door-access' | 'agreement-signed' | 'badge-printed' | 'emergency-muster';
  userId?: string;
  visitorId?: string;
  visitorName?: string;
  details: object;
  ipAddress?: string;
}

/**
 * Emergency muster event record
 */
export interface EmergencyEvent {
  id: string;
  tenantId: string;
  startTime: string;
  endTime?: string;
  initiatedBy: string;
  status: 'active' | 'resolved' | 'drill';
  locations: string[];
  affectedVisitorCount: number;
  safeVisitorCount: number;
  unknownVisitorCount: number;
  notificationsSent: number;
}
