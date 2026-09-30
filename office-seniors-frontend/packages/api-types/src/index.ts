export type UserRole = 'admin' | 'staff' | 'senior';

export interface User {
  id: number;
  username: string;
  email?: string | null;
  role: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  photoPath?: string | null;
  avatar?: string | null;
  position?: string | null;
  department?: string | null;
  assignedBy?: number | null;
  isActive: boolean | null;
  profileCompleted?: boolean | null;
  emailVerified: boolean | null;
  approvalStatus?: string | null;
  hasAssignment?: boolean;
  assignedStaffId?: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface JWTPayload {
  userId: number;
  username: string;
  role: string;
  seniorId?: number;
  iat: number;
  exp: number;
}

export interface Senior {
  id: number;
  userId: number;
  notes?: string | null;
  user?: User;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface StaffMember {
  id: number;
  userId: number;
  position?: string | null;
  user?: User;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface StaffAssignment {
  id: number;
  staffId: number;
  seniorId: number;
  assignedBy?: number | null;
  assignedAt: string | null;
  isActive: boolean | null;
  notes?: string | null;
  staff?: StaffMember;
  senior?: Senior;
  createdAt: string | null;
  updatedAt: string | null;
}

export type HealthRecordType =
  | 'medication'
  | 'appointment'
  | 'condition'
  | 'vaccination'
  | 'allergy'
  | 'exercise'
  | 'general';

export type HealthRecordStatus = 'active' | 'completed' | 'cancelled' | 'pending';

export interface HealthRecord {
  id: number;
  seniorId: number;
  type: HealthRecordType;
  title: string;
  description?: string | null;
  dateTime?: string | null;
  reminderTime?: string | null;
  notes?: string | null;
  status?: HealthRecordStatus | null;
  medicineName?: string | null;
  dosage?: string | null;
  frequency?: string | null;
  refillDate?: string | null;
  doctorName?: string | null;
  location?: string | null;
  appointmentDate?: string | null;
  severity?: string | null;
  diagnosedDate?: string | null;
  treatment?: string | null;
  testType?: string | null;
  testResults?: string | null;
  labFacility?: string | null;
  testDate?: string | null;
  vaccineName?: string | null;
  vaccinationDate?: string | null;
  nextDueDate?: string | null;
  vaccineProvider?: string | null;
  allergen?: string | null;
  reaction?: string | null;
  allergySeverity?: string | null;
  activityType?: string | null;
  duration?: string | null;
  exerciseFrequency?: string | null;
  createdAt: string | null;
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id: number;
  seniorId: number;
  staffId?: number | null;
  title: string;
  type: string;
  description?: string | null;
  appointmentDate: string;
  appointmentTime: string;
  duration?: number | null;
  location?: string | null;
  doctorName?: string | null;
  contactPhone?: string | null;
  status: AppointmentStatus;
  notes?: string | null;
  reminderSent?: boolean | null;
  senior?: Senior;
  staff?: StaffMember;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Program {
  id: number;
  name: string;
  description?: string | null;
  category?: string | null;
  scheduleDays?: string | null;
  location?: string | null;
  instructor?: string | null;
  capacity?: number | null;
  cost?: number | null;
  applicationStatus?: string;
  isEnrolled?: boolean;
  canApply?: boolean;
  enrollmentCount?: number;
  createdAt: string | null;
  updatedAt?: string | null;
}

export type EnrollmentStatus = 'active' | 'completed' | 'dropped' | 'pending';

export interface Enrollment {
  id: number;
  seniorId: number;
  programId: number;
  applicationId?: number | null;
  enrollmentDate: string | null;
  status: EnrollmentStatus;
  attendanceCount: number | null;
  completionPercentage: number | null;
  notes?: string | null;
  program?: Program;
  senior?: Senior;
  createdAt: string | null;
}

export type ProgramApplicationStatus = 'pending' | 'approved' | 'rejected' | 'waitlisted';

export interface ProgramApplication {
  id: number;
  seniorId: number;
  programId: number;
  applicationDate: string | null;
  status: ProgramApplicationStatus;
  statusUpdatedAt: string | null;
  statusUpdatedBy?: number | null;
  statusReason?: string | null;
  motivation?: string | null;
  notes?: string | null;
  priority?: string | null;
  program?: Program;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Contact {
  id: number;
  seniorId: number;
  name: string;
  phone?: string | null;
  email?: string | null;
  relationship?: string | null;
  role?: string | null;
  isEmergency: boolean | null;
  createdAt: string | null;
}

export interface CoreBenefit {
  id: number;
  name: string;
  description?: string | null;
  icon?: string | null;
  category?: string | null;
  isActive: boolean | null;
  displayOrder?: number | null;
  createdAt: string | null;
  updatedAt?: string | null;
}

export type BenefitApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'disbursed';

export interface BenefitApplication {
  id: number;
  seniorId: number;
  applicationType: string;
  applicationDate: string | null;
  status: BenefitApplicationStatus;
  statusUpdatedAt: string | null;
  statusUpdatedBy?: number | null;
  statusReason?: string | null;
  priority?: string | null;
  estimatedAmount?: number | null;
  notes?: string | null;
  assignedTo?: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export type NotificationType =
  | 'appointment_reminder'
  | 'program_update'
  | 'benefit_update'
  | 'general'
  | 'assignment'
  | 'task';

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  relatedId?: number | null;
  isRead: boolean | null;
  createdBy?: number | null;
  createdAt: string | null;
  readAt?: string | null;
}

export type RescheduleStatus = 'pending' | 'approved' | 'rejected';

export interface RescheduleRequest {
  id: number;
  appointmentId: number;
  seniorId: number;
  requestedBy: number;
  reason: string;
  requestedDate: string;
  requestedTime: string;
  status: RescheduleStatus;
  approvedBy?: number | null;
  approvedAt?: string | null;
  finalDate?: string | null;
  finalTime?: string | null;
  approvalNotes?: string | null;
  rejectedBy?: number | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;
  appointment?: Appointment;
  createdAt: string | null;
  updatedAt: string | null;
}

export type FinancialAssistanceStatus = 'pending' | 'approved' | 'disbursed' | 'claimed' | 'rejected';

export interface FinancialDistribution {
  id: number;
  seniorId: number;
  amount: number;
  distributionDate: string;
  status: FinancialAssistanceStatus;
  claimedDate?: string | null;
  category?: string | null;
  description?: string | null;
  createdBy?: number | null;
  senior?: Senior;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface DashboardStats {
  totalSeniors?: number;
  activeSeniors?: number;
  totalStaff?: number;
  activeStaff?: number;
  totalAppointments?: number;
  pendingTasks?: number;
  unreadNotifications?: number;
  recentActivities?: Activity[];
}

export interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
