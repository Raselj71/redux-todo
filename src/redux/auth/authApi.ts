import { apiSlice } from "../apiSlice";

export const authApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:'/login',
                body:data,
                
            })
        })
    })
})