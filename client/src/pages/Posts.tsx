import React from "react"
import { useEffect } from "react"
import { useFetchOwnPostQuery } from "../api/postApiSlice"
import { toast } from "react-toastify"
import type { CustomErrorObject } from "../types/customError"
import { Spinner } from "../components/Spinner"
import { OwnPost } from "../components/OwnPost"
import type { postInterface } from "../types/modelType"

export const Posts: React.FC = () => {
  const {
    data: posts,
    isLoading: postLoading,
    isError: postIsError,
    error: postError,
  } = useFetchOwnPostQuery(null)
  useEffect(() => {
    if (postIsError) {
      const customMessage = postError as CustomErrorObject
      toast.error(customMessage?.data?.err)
    }
  }, [postError, postIsError])
  if (postLoading) return <Spinner />
  return (
    <div className="py-8 px-10 flex flex-col gap-8">
      {posts.map((p: Omit<postInterface, "userId">) => (
        <OwnPost key={p._id} post={p} />
      ))}
    </div>
  )
}
