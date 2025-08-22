import { apiRequest } from './client';
import Constants from 'expo-constants';

const { API_MODE } = Constants.expoConfig?.extra || {};

export const login = async (email: string, password: string): Promise<any> => {
  if (API_MODE === 'mock') {
    // In-app mock
    if (email === 'test@example.com' && password === '123456') {
      return { token: 'mock-token-123', name: 'Mock User' };
    } else {
      throw new Error('Invalid credentials (mock)');
    }
  }

  // Real API
    return await apiRequest<any>({
    url: '/users/tokens',
    method: 'post',
    data: {auth: {email, password} },
  });
};
