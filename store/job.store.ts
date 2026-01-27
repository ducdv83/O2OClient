import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface JobDraft {
  serviceType?: string;
  skills?: string[];
  description?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  location?: {
    address: string;
    latitude: number;
    longitude: number;
  };
  budgetMin?: number;
  budgetMax?: number;
  tryOneTime?: boolean;
}

export interface Job {
  id: string;
  serviceType: string;
  skills: string[];
  description: string;
  startTime: Date;
  endTime: Date;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  budgetMin: number;
  budgetMax: number;
  tryOneTime: boolean;
  status: 'DRAFT' | 'OPEN' | 'BOOKED' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  candidateCount?: number;
}

interface JobState {
  draft: JobDraft | null;
  jobs: Job[];
  setDraft: (draft: JobDraft | null) => void;
  updateDraft: (updates: Partial<JobDraft>) => void;
  clearDraft: () => void;
  addJob: (job: Job) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  getJobsByStatus: (status: Job['status']) => Job[];
}

export const useJobStore = create<JobState>()(
  persist(
    (set, get) => ({
      draft: null,
      jobs: [],
      setDraft: (draft) => set({ draft }),
      updateDraft: (updates) =>
        set((state) => ({
          draft: state.draft ? { ...state.draft, ...updates } : updates,
        })),
      clearDraft: () => set({ draft: null }),
      addJob: (job) =>
        set((state) => ({
          jobs: [...state.jobs, job],
        })),
      updateJob: (id, updates) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === id ? { ...j, ...updates } : j
          ),
        })),
      getJobsByStatus: (status) => {
        return get().jobs.filter((j) => j.status === status);
      },
    }),
    {
      name: 'job-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

