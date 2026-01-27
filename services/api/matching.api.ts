import apiClient from './client';
import { CarePro } from '../../types/carepro.types';

export interface FitScoreResult {
  carepro: CarePro;
  profile: any;
  fitScore: number;
  breakdown: {
    skills: number;
    timeDistance: number;
    experience: number;
    rating: number;
    price: number;
  };
}

export const matchingApi = {
  getMatchedCarePros: async (jobId: string, limit: number = 20): Promise<FitScoreResult[]> => {
    const response = await apiClient.get<FitScoreResult[]>(
      `/matching/jobs/${jobId}/carepros`,
      {
        params: { limit },
      }
    );
    return response.data;
  },
};

