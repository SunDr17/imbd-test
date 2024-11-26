import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

import { API_URL, API_KEY, API_REQUEST_TIMEOUT_SECS } from '@/constants';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_REQUEST_TIMEOUT_SECS,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.url) {
      // Check if the URL already has query parameters
      const separator = config.url.includes("?") ? "&" : "?";
      // Append the API key to the URL
      config.url += `${separator}api_key=${API_KEY}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;
