
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import { Lead } from '@/utils/mockData';
import { API_BASE_URL } from '@/constants/api';
import { getAccessToken } from '@/utils/cookies';

interface LeadQueryParams {
  crm_type?: string;
  status?: string;
  limit?: number;
  page?: number;
}

export const leadApi = createApi({
  reducerPath: 'leadApi',
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
  tagTypes: ['Lead'],
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], LeadQueryParams>({
      query: (params) => ({
        url: '/lead',
        method: 'GET',
        params
      }),
      providesTags: ['Lead']
    }),
    createLead: builder.mutation<Lead, Partial<Lead>>({
      query: (lead) => ({
        url: '/lead',
        method: 'POST',
        body: lead
      }),
      invalidatesTags: ['Lead']
    }),
    updateLead: builder.mutation<Lead, { id: string; data: Partial<Lead> }>({
      query: ({ id, data }) => ({
        url: `/lead/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Lead']
    }),
    deleteLead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/lead/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Lead']
    }),
    convertLeadToClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/lead/${id}/convert`,
        method: 'POST'
      }),
      invalidatesTags: ['Lead']
    })
  }),
});

export const { 
  useGetLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useConvertLeadToClientMutation
} = leadApi;
