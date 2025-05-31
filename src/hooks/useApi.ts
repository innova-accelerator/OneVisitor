import { useState, useEffect } from 'react';
import { useTenant } from '@/context/TenantContext';
import { useToast } from './use-toast';

interface ApiOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  autoTimezone?: boolean; // Add option to auto-include timezone
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
 * Get current timezone offset in minutes
 */
function getTimezoneOffset(): string {
  const offset = new Date().getTimezoneOffset();
  return offset.toString();
}

/**
 * Hook for making API requests with standardized error handling and tenant context
 */
export function useApi(options: ApiOptions = {}) {
  const { tenantId } = useTenant();
  const { toast } = useToast();
  const defaultBaseUrl = import.meta.env.VITE_API_URL || '/api';
  
  const baseUrl = options.baseUrl || defaultBaseUrl;
  const autoTimezone = options.autoTimezone !== false; // Default to true
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(tenantId ? { 'X-Tenant-ID': tenantId } : {}),
    ...options.headers,
  };
  
  /**
   * Add timezone offset to data for POST/PUT requests
   */
  function addTimezoneIfNeeded(method: string, data: any): any {
    if (!autoTimezone) {
      return data;
    }
    
    // Add timezone to ALL POST and PUT requests
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      // Handle FormData
      if (data instanceof FormData) {
        if (!data.has('timezoneOffset')) {
          console.log('✅ Adding timezone to FormData:', getTimezoneOffset());
          data.append('timezoneOffset', getTimezoneOffset());
        }
        return data;
      }
      
      // Handle regular objects
      if (data && typeof data === 'object') {
        // Only add timezoneOffset if it's not already provided
        if (!data.hasOwnProperty('timezoneOffset')) {
          console.log('✅ Adding timezone to request:', getTimezoneOffset());
          return {
            ...data,
            timezoneOffset: getTimezoneOffset()
          };
        } else {
          console.log('⚠️ Timezone already exists:', data.timezoneOffset);
        }
      }
    }
    
    return data;
  }
  
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
    
    // Add timezone offset if needed
    const processedBody = addTimezoneIfNeeded(method, body);
    
    try {
      console.log(`[API Request] ${method} ${url}`, {
        headers: { ...defaultHeaders, ...headers },
        body: processedBody instanceof FormData ? 'FormData' : processedBody
      });
      
      const requestHeaders = { ...defaultHeaders, ...headers };
      
      // Remove Content-Type header for FormData (let browser set it with boundary)
      if (processedBody instanceof FormData) {
        delete requestHeaders['Content-Type'];
      }
      
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: processedBody instanceof FormData ? processedBody : (processedBody ? JSON.stringify(processedBody) : undefined),
        credentials: options.withCredentials ? 'include' : 'same-origin',
        ...rest,
      });
      
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      if (!response.ok) {
        const errorData = isJson ? await response.json() : await response.text();
        const errorMessage = typeof errorData === 'string' 
          ? errorData 
          : errorData.message || `Request failed with status ${response.status}`;
        
        const error = new Error(errorMessage);
        
        // Log detailed error information to console
        console.error(`[API Error] ${method} ${url}`, {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          errorData,
          requestBody: processedBody instanceof FormData ? 'FormData' : processedBody
        });
        
        throw error;
      }
      
      // Handle empty responses
      if (response.status === 204 || !contentType) {
        console.log(`[API Success] ${method} ${url} - No content`);
        return null;
      }
      
      // Parse JSON response
      if (isJson) {
        const data = await response.json();
        console.log(`[API Success] ${method} ${url}`, data);
        return data;
      }
      
      // Return raw response for non-JSON content
      const textData = await response.text();
      console.log(`[API Success] ${method} ${url} - Text response`, textData);
      return textData as unknown as T;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      // Log error to console with full context
      console.error(`[API Request Failed] ${method} ${url}`, {
        error,
        message: errorMessage,
        requestBody: processedBody instanceof FormData ? 'FormData' : processedBody,
        headers: { ...defaultHeaders, ...headers },
        timestamp: new Date().toISOString()
      });
      
      // Show error toast
      toast({
        title: 'API Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw error;
    }
  }
  
  /**
   * Hook for making a GET request with useState and useEffect
   */
  function useGet<T>(endpoint: string, config: RequestConfig = {}): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchData = async (): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const result = await request<T>(endpoint, 'GET', config);
        setData(result);
        return result;
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        console.error(`[useGet Error] ${endpoint}`, errorObj);
        setError(errorObj);
        return null;
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      let cancelled = false;
      
      const loadData = async () => {
        try {
          setLoading(true);
          setError(null);
          const result = await request<T>(endpoint, 'GET', config);
          if (!cancelled) {
            setData(result);
          }
        } catch (err) {
          if (!cancelled) {
            const errorObj = err instanceof Error ? err : new Error(String(err));
            console.error(`[useGet useEffect Error] ${endpoint}`, errorObj);
            setError(errorObj);
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

      loadData();
      
      return () => {
        cancelled = true;
      };
    }, [endpoint, JSON.stringify(config)]);
    
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
    // Helper to get current timezone offset
    getTimezoneOffset,
  };
}