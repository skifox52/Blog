import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userInterface } from "../types/modelType"

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USERS_URI,
    prepareHeaders: (
      headers,
      { getState, endpoint }: { getState: any; endpoint: string }
    ) => {
      const token = getState().user.accessToken as Pick<
        userInterface,
        "accessToken"
      >
      if (endpoint === "logoutUserApi") {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: { username: string; password: string }) => ({
        url: "/login",
        method: "POST",
        body: { username: data.username, password: data.password },
      }),
    }),
    logoutUserApi: builder.mutation({
      query: (data: { refreshToken: string }) => ({
        url: "/logout",
        method: "DELETE",
        body: { refreshToken: data.refreshToken },
      }),
    }),
  }),
})

export const { useLoginUserMutation, useLogoutUserApiMutation } = userApiSlice
