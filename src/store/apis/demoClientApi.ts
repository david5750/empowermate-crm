
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import { Client } from '@/utils/mockData';

interface DemoClientQueryParams {
  crm_type?: string;
  status?: string;
  limit?: number;
  page?: number;
}

export const demoClientApi = createApi({
  reducerPath: 'demoClientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4012/api/v1',
    prepareHeaders: (headers, { getState }) => {
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
  useAddDemoClientCommentMutation
} = demoClientApi;
