import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Booking } from '../types/booking.types';

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  getBookingsByStatus: (status: Booking['status']) => Booking[];
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),
      updateBooking: (id, updates) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),
      getBookingsByStatus: (status) => {
        return get().bookings.filter((b) => b.status === status);
      },
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

