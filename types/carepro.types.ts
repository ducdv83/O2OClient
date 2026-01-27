export interface CarePro {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  bio?: string;
  yearsExp: number;
  skills: string[];
  certificates: string[];
  verifiedLevel: number;
  ratingAvg: number;
  ratingCount: number;
  hourlyRateHint: number;
  serviceTypes: string[];
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  availableHours?: {
    [key: string]: { start: string; end: string }[];
  };
}

export interface Review {
  id: string;
  raterName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

