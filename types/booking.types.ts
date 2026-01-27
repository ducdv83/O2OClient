export type BookingStatus =
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DISPUTED'
  | 'CANCELLED';

export type PaymentMethod = 'WALLET' | 'CARD' | 'MOMO' | 'ZALOPAY';

export interface Booking {
  id: string;
  jobId: string;
  careproId: string;
  careproName: string;
  careproAvatar?: string;
  agreedRate: number;
  startTime: Date;
  endTime: Date;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  status: BookingStatus;
  createdAt: Date;
  payment?: {
    id: string;
    amount: number;
    method: PaymentMethod;
    escrowStatus: 'HELD' | 'RELEASED' | 'REFUNDED';
  };
}

