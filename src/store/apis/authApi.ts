
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

interface LoginRequest {
  email: string;
  password: string;
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
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4012/api/v1/auth',
    prepareHeaders: (headers, { getState }) => {
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
  }),
});

export const { useLoginMutation } = authApi;
