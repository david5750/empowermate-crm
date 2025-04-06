
import { API_BASE_URL, API_TOKEN } from "@/constants/api";
import { getAccessToken } from "./cookies";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
};

export const clientFetcher = async <T = any>(
  endpoint: string, 
  options: RequestOptions = {}
): Promise<T> => {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Add auth token if available
  const accessToken = getAccessToken();
  if (accessToken) {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  } else if (API_TOKEN) {
    // Fallback to API_TOKEN if no access token in cookies
    defaultHeaders['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  const config: RequestOptions = {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...options.headers },
    credentials: 'include',
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, config as RequestInit);
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    // Check if the response is empty or not JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text() as unknown as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
