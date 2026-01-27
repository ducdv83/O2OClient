import apiClient from './client';
import { Booking } from '../../types/booking.types';

export interface CreateBookingRequest {
  job_id: string;
  carepro_id: string;
  agreed_rate: number;
  start_time: string;
  end_time: string;
}

export const bookingsApi = {
  create: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/bookings', data);
    return response.data;
  },

  findAll: async (params?: { status?: string }): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>('/bookings', { params });
    return response.data;
  },

  findOne: async (id: string): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  cancel: async (id: string, reason?: string): Promise<Booking> => {
    const response = await apiClient.put<Booking>(`/bookings/${id}/cancel`, { reason });
    return response.data;
  },
};

