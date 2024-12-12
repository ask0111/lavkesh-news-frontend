import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookies } from "./cookies.service";

export const BASE_PATH = "/api/v1/news/lv-powered";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + BASE_PATH, // Replace with your base API URL
  timeout: 5000, // Request timeout in ms
});

// Set default headers
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the 'Authorization' header is required
    if (config.headers?.useAuthToken) {
      const token = getCookies("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      // Remove the custom `useAuthToken` key to prevent API errors
      delete config.headers.useAuthToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// CRUD operation functions
export const apiService = {
  get: async <T = any>(
    path: string,
    headers?: Record<string, string | number | boolean>
  ): Promise<AxiosResponse<T>> => {
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

  patch: async <T = any>(
    path: string,
    data: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = { headers };
    return axiosInstance.patch<T>(path, data, config);
  },

  delete: async <T = any>(
    path: string,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = { headers };
    return axiosInstance.delete<T>(path, config);
  },

  request: async <T = any>(
    method: AxiosRequestConfig['method'],
    path: string,
    data?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = {
      headers,
      method,
      url: path,
      data,
    };
    return axiosInstance.request<T>(config);
  },

};

export default axiosInstance;

export const fetchApiService = async(path: string, query: string)=>{
  try {
    const res = await apiService.get(`${path}?${query}`);
    const response = res.data;
    if(!response.status)throw new Error("Failed to fetch user data");
console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    return []
  }
}