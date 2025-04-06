
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import { Client } from '@/utils/mockData';
import { API_BASE_URL } from '@/constants/api';
import { getAccessToken } from '@/utils/cookies';

interface ClientQueryParams {
  crm_type?: string;
  status?: string;
  limit?: number;
  page?: number;
}

export const clientApi = createApi({
  reducerPath: 'clientApi',
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
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    getClients: builder.query<Client[], ClientQueryParams>({
      query: (params) => ({
        url: '/client',
        method: 'GET',
        params
      }),
      providesTags: ['Client']
    }),
    updateClient: builder.mutation<Client, { id: string; data: Partial<Client> }>({
      query: ({ id, data }) => ({
        url: `/client/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Client']
    }),
    addClientComment: builder.mutation<Client, { id: string; comment: string }>({
      query: ({ id, comment }) => ({
        url: `/client/${id}/comment`,
        method: 'POST',
        body: { content: comment }
      }),
      invalidatesTags: ['Client']
    })
  }),
});

export const { 
  useGetClientsQuery,
  useUpdateClientMutation,
  useAddClientCommentMutation
} = clientApi;
