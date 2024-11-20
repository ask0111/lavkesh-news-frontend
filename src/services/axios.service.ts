import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const BASE_PATH= '/api/v1/news/lv-powered'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + BASE_PATH, // Replace with your base API URL
  timeout: 5000, // Request timeout in ms
});

// Set default headers
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

// Helper function to set a default authorization token
export const setAuthToken = (token: string | null): void => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// CRUD operation functions
export const apiService = {
  get: async <T = any>(path: string, headers?: Record<string, string>): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = { headers };
    return axiosInstance.get<T>(path, config);
  },

  post: async <T = any>(
    path: string,
    data: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = { headers };
    return axiosInstance.post<T>(path, data, config);
  },

  put: async <T = any>(
    path: string,
    data: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = { headers };
    return axiosInstance.put<T>(path, data, config);
  },

  delete: async <T = any>(
    path: string,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = { headers };
    return axiosInstance.delete<T>(path, config);
  },
};

export default axiosInstance;
