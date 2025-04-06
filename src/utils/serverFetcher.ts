
import { API_BASE_URL, API_TOKEN } from "@/constants/api";

// This utility is for server-side API calls (for future use with SSR or edge functions)
export const serverFetcher = async <T = any>(
  endpoint: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    token?: string;
  } = {}
): Promise<T> => {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Use provided token, or fall back to API_TOKEN
  const token = options.token || API_TOKEN;
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...options.headers },
  };

  if (options.body) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(options.body);
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text() as unknown as T;
  } catch (error) {
    console.error('Server API request failed:', error);
    throw error;
  }
};
