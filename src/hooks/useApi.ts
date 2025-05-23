
import { useState } from 'react';
import { useTenant } from '@/context/TenantContext';
import { useToast } from './use-toast';

interface ApiOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => Promise<T | null>;
}

/**
 * Hook for making API requests with standardized error handling and tenant context
 */
export function useApi(options: ApiOptions = {}) {
  const { tenantId } = useTenant();
  const { toast } = useToast();
  const defaultBaseUrl = import.meta.env.VITE_API_URL || '/api';
  
  const baseUrl = options.baseUrl || defaultBaseUrl;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(tenantId ? { 'X-Tenant-ID': tenantId } : {}),
    ...options.headers,
  };
  
  /**
   * Make a request to the API
   */
  async function request<T>(
    endpoint: string,
    method: string,
    config: RequestConfig = {}
  ): Promise<T | null> {
    const { params, headers, body, ...rest } = config;
    
    // Build URL with query parameters
    let url = `${baseUrl}${endpoint}`;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
      }
    }
    
    try {
      const response = await fetch(url, {
        method,
        headers: { ...defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        credentials: options.withCredentials ? 'include' : 'same-origin',
        ...rest,
      });
      
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      if (!response.ok) {
        const errorData = isJson ? await response.json() : await response.text();
        throw new Error(
          typeof errorData === 'string' 
            ? errorData 
            : errorData.message || `Request failed with status ${response.status}`
        );
      }
      
      // Handle empty responses
      if (response.status === 204 || !contentType) {
        return null;
      }
      
      // Parse JSON response
      if (isJson) {
        return await response.json();
      }
      
      // Return raw response for non-JSON content
      return await response.text() as unknown as T;
      
    } catch (error) {
      // Show error toast
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      
      throw error;
    }
  }
  
  /**
   * Hook for making a GET request
   */
  function useGet<T>(endpoint: string, config: RequestConfig = {}): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchData = async (): Promise<T | null> => {
      setLoading(true);
      try {
        const result = await request<T>(endpoint, 'GET', config);
        setData(result);
        setError(null);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        return null;
      } finally {
        setLoading(false);
      }
    };
    
    return { data, error, loading, refetch: fetchData };
  }
  
  return {
    get: <T>(endpoint: string, config?: RequestConfig) => request<T>(endpoint, 'GET', config),
    post: <T>(endpoint: string, data?: any, config?: RequestConfig) =>
      request<T>(endpoint, 'POST', { ...config, body: data }),
    put: <T>(endpoint: string, data?: any, config?: RequestConfig) =>
      request<T>(endpoint, 'PUT', { ...config, body: data }),
    patch: <T>(endpoint: string, data?: any, config?: RequestConfig) =>
      request<T>(endpoint, 'PATCH', { ...config, body: data }),
    delete: <T>(endpoint: string, config?: RequestConfig) =>
      request<T>(endpoint, 'DELETE', config),
    useGet,
  };
}
