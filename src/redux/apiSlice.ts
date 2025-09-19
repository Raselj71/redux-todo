import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../redux/store"; 

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      const { token, expiresAt } = (getState() as RootState).auth;

      if (token && (!expiresAt || Date.now() < new Date(expiresAt).getTime())) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      headers.set("Accept", "application/json");

      return headers;
    },
  }),
    tagTypes: ['Todos'],
  endpoints: () => ({}),
});
