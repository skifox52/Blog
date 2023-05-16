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
  tagTypes: ["Post", "OwnPost"],
  endpoints: (builder) => ({
    fetchPosts: builder.query<postInterface[], []>({
      query: () => ({
        url: "/all",
      }),
      providesTags: ["Post"],
    }),
    postPost: builder.mutation<void, Omit<postInterface, "userId" | "_id">>({
      query: (post: postInterface) => ({
        url: "/",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post", "OwnPost"],
    }),
    fetchOwnPost: builder.query({
      query: () => "/",
      providesTags: ["OwnPost"],
    }),
    updatePost: builder.mutation<
      void,
      { data: { title: string; content: string }; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["OwnPost", "Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OwnPost"],
    }),
  }),
})
export const {
  useFetchPostsQuery,
  usePostPostMutation,
  useFetchOwnPostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApiSlice
