import apiClient from './client';

export interface CreateJobRequest {
  service_type: string;
  description?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  start_time: string;
  end_time: string;
  budget_min?: number;
  budget_max?: number;
}

export interface Job {
  id: string;
  client_id: string;
  service_type: string;
  description?: string;
  address: string;
  start_time: string;
  end_time: string;
  budget_min?: number;
  budget_max?: number;
  status: 'DRAFT' | 'OPEN' | 'BOOKED' | 'DONE' | 'CANCELLED';
  created_at: string;
}

export const jobsApi = {
  create: async (data: CreateJobRequest): Promise<Job> => {
    const response = await apiClient.post<Job>('/jobs', data);
    return response.data;
  },

  findAll: async (params?: {
    status?: string;
    service_type?: string;
    search?: string;
  }): Promise<Job[]> => {
    const response = await apiClient.get<Job[]>('/jobs', { params });
    return response.data;
  },

  findNearby: async (lat: number, lng: number, radius?: number): Promise<Job[]> => {
    const response = await apiClient.get<Job[]>('/jobs/nearby', {
      params: { lat, lng, radius },
    });
    return response.data;
  },

  getMyJobs: async (): Promise<Job[]> => {
    const response = await apiClient.get<Job[]>('/jobs/me');
    return response.data;
  },

  findOne: async (id: string): Promise<Job> => {
    const response = await apiClient.get<Job>(`/jobs/${id}`);
    return response.data;
  },

  publish: async (id: string): Promise<Job> => {
    const response = await apiClient.put<Job>(`/jobs/${id}/publish`);
    return response.data;
  },

  cancel: async (id: string): Promise<Job> => {
    const response = await apiClient.put<Job>(`/jobs/${id}/cancel`);
    return response.data;
  },
};

