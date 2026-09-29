export type UserRole = 'CUSTOMER' | 'STAFF';

export type PlaceCategory = 'BARBER' | 'RESTAURANT';

export type QueueStatus =
  | 'WAITING'
  | 'CALLED'
  | 'SERVING'
  | 'SERVED'
  | 'CANCELLED'
  | 'SKIPPED';

export type OrderStatus =
  | 'PENDING'
  | 'PREPARING'
  | 'ALMOST_READY'
  | 'READY'
  | 'PICKED_UP'
  | 'CANCELLED';

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  address: string;
  isActive: boolean;
  averageServiceMinutes?: number;
  currentWaitingCount?: number;
  nowServingNumber?: number;
}

export interface QueueItem {
  id: string;
  placeId: string;
  placeName: string;
  customerId: string;
  customerName: string;
  queueNumber: number;
  status: QueueStatus;
  nowServingNumber: number;
  peopleAhead: number;
  estimatedWaitMinutes: number;
  joinedAt: string;
  calledAt?: string;
  servedAt?: string;
}

export interface OrderFoodItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderItem {
  id: string;
  placeId: string;
  placeName: string;
  customerId: string;
  customerName: string;
  orderNumber: string;
  status: OrderStatus;
  estimatedMinutes: number;
  items: OrderFoodItem[];
  createdAt: string;
  readyAt?: string;
  pickedUpAt?: string;
}
