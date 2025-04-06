
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import { API_BASE_URL } from '@/constants/api';
import { getAccessToken } from '@/utils/cookies';

interface LoginRequest {
  email: string;
  password: string;
  crm_type: string;  // Added CRM type parameter
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  crm_type: string;
}

interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${API_BASE_URL}/auth`,
    prepareHeaders: (headers, { getState }) => {
      // First try to get the token from cookies
      const cookieToken = getAccessToken();
      if (cookieToken) {
        headers.set('authorization', `Bearer ${cookieToken}`);
        return headers;
      }
      
      // Fall back to redux state if cookie not available
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<{ user: User }, void>({
      query: () => '/me',
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
