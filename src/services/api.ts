import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, refreshToken } from './auth';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure (e.g., logout user)
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api; 