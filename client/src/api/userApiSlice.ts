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
      if (
        endpoint === "logoutUserApi" ||
        endpoint === "fetchUser" ||
        endpoint === "updateUser"
      ) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User"],
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
    fetchUser: builder.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (userBody) => ({
        url: "/user",
        method: "PUT",
        body: userBody,
      }),
      invalidatesTags: ["User"],
    }),
    postUser: builder.mutation({
      query: (data: { username: string; password: string }) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginUserMutation,
  useLogoutUserApiMutation,
  useFetchUserQuery,
  useUpdateUserMutation,
  usePostUserMutation,
} = userApiSlice
