export type UserRole = 'CUSTOMER' | 'STAFF';

export type ServiceType = 'TELLER' | 'CUSTOMER_SERVICE';

export type QueueStatus =
  | 'WAITING'
  | 'CALLED'
  | 'SERVING'
  | 'SERVED'
  | 'CANCELLED'
  | 'SKIPPED';

export interface BranchServiceInfo {
  type: ServiceType;
  name: string;
  description: string;
  waitingCount: number;
  currentServingNumber: string;
  avgWaitMinutes: number;
}

export interface Branch {
  id: string;
  name: string;
  shortName: string;
  city: string;
  address: string;
  operatingHours: string;
  isOpen: boolean;
  services: BranchServiceInfo[];
}

export interface QueueTicket {
  id: string;
  ticketNumber: string; // e.g. 'CS-018', 'T-004'
  serviceType: ServiceType;
  serviceName: string; // 'Teller' or 'Customer Service'
  branchId: string;
  branchName: string;
  customerId: string;
  customerName: string;
  status: QueueStatus;
  counterName?: string; // e.g. 'Counter 02', 'Teller 01'
  nowServingNumber: string; // e.g. 'CS-014'
  peopleAhead: number;
  estimatedWaitMinutes: number;
  createdAt: string;
  calledAt?: string;
  servedAt?: string;
  completedAt?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phone?: string;
  customerReference?: string; // Fictional Customer Reference ID (e.g. NXL-0001)
}

export interface StaffProfile {
  id: string;
  fullName: string;
  email: string;
  role: 'STAFF';
  employeeId: string;
  branchId: string;
  branchName: string;
  assignedService: ServiceType;
  assignedCounter: string;
}
