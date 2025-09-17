import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { RootState } from "../redux/store"; // Adjust the import path to where your RootState is defined

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
         prepareHeaders: (headers, { getState }) => {
      const { token, expiresAt } = (getState() as RootState).auth

      
      if (token && (!expiresAt || Date.now() < expiresAt)) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      
      if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')

      return headers
    },

    }),
    endpoints: () => ({}),
})