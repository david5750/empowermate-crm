
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import { Client } from '@/utils/mockData';
import { API_BASE_URL } from '@/constants/api';
import { getAccessToken } from '@/utils/cookies';

interface DemoClientQueryParams {
  crm_type?: string;
  status?: string;
  limit?: number;
  page?: number;
}

export const demoClientApi = createApi({
  reducerPath: 'demoClientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
  tagTypes: ['DemoClient'],
  endpoints: (builder) => ({
    getDemoClients: builder.query<Client[], DemoClientQueryParams>({
      query: (params) => ({
        url: '/demo-client',
        method: 'GET',
        params
      }),
      providesTags: ['DemoClient']
    }),
    updateDemoClient: builder.mutation<Client, { id: string; data: Partial<Client> }>({
      query: ({ id, data }) => ({
        url: `/demo-client/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['DemoClient']
    }),
    addDemoClientComment: builder.mutation<Client, { id: string; comment: string }>({
      query: ({ id, comment }) => ({
        url: `/demo-client/${id}/comment`,
        method: 'POST',
        body: { content: comment }
      }),
      invalidatesTags: ['DemoClient']
    })
  }),
});

export const { 
  useGetDemoClientsQuery,
  useUpdateDemoClientMutation,
  useAddDemoClientMutation
} = demoClientApi;
