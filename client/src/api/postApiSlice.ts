import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { userInterface, postInterface } from "../types/modelType"

export const postApiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_POSTS_URI,
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const token = getState().user.accessToken as Pick<
        userInterface,
        "accessToken"
      >
      headers.set("Authorization", `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<postInterface[], []>({
      query: () => ({
        url: "/all",
      }),
    }),
  }),
})
export const { useFetchPostsQuery } = postApiSlice
