import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { API_URL } = Constants.expoConfig?.extra || {};
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // start delay in ms

console.log(API_URL)

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add auth token automatically
axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = await AsyncStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: refresh token on 401
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const res = await axiosClient.post('/auth/refresh', { refresh_token: refreshToken });
          const { access_token, refresh_token } = res.data as { access_token: string; refresh_token: string };
          await AsyncStorage.setItem('access_token', access_token);
          await AsyncStorage.setItem('refresh_token', refresh_token);

          if (originalRequest?.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
          }

          return axiosClient.request(originalRequest!);
        } catch (err) {
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Generic request with retries
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
    let attempt = 0;
  
    while (attempt < MAX_RETRIES) {
      try {
        const { data } = await axiosClient.request<T>(config);
        return data;
      } catch (err: any) {
        const isNetworkError = !err.response; // No response means network failed
        attempt++;
  
        if (!isNetworkError || attempt >= MAX_RETRIES) {
          // If it's not network error or max retries reached, throw
          throw err;
        }
  
        // Exponential backoff for network errors
        await new Promise((res) =>
          setTimeout(res, RETRY_DELAY * Math.pow(2, attempt - 1))
        );
      }
    }
  
    throw new Error('Max retries reached for network errors');
  }
  
