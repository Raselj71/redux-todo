import type { loginResponse } from "../../types/common";
import { apiSlice } from "../apiSlice";
import { setCredentials } from "./authSlice";

export  const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAPI: builder.mutation<
      loginResponse,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/login",
        body: data,
        method:'POST'
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              setCredentials({
                token: result.data.token,
                user: result.data.User,
                expiresAt: result.data.expiresAt,
              })
            );
          }
        } catch (error) {
          console.log("error", error);
        }
      },
    }),


      signupAPI: builder.mutation<
      loginResponse,
      { email: string; password: string , name:string}
    >({
      query: (data) => ({
        url: "/auth/register",
        body: data,
        method:'POST'
      }),

     
    }),
  }),


});

export const {useLoginAPIMutation , useSignupAPIMutation } = authApi;

