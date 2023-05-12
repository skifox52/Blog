import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_USERS_URI }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: { username: string; password: string }) => ({
        url: "/login",
        method: "POST",
        body: { username: data.username, password: data.password },
      }),
    }),
  }),
})

export const { useLoginUserMutation } = userApiSlice
