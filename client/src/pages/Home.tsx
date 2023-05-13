import React, { useEffect } from "react"
import { useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import { useFetchPostsQuery } from "../api/postApiSlice"
import type { CustomErrorObject } from "../types/customError"
import { toast } from "react-toastify"
import { SinglePost } from "../components/SinglePost"

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const token: string | null = useAppSelector((state) => state.user.accessToken)
  const { data, isLoading, isError, error, isSuccess } = useFetchPostsQuery([])
  useEffect(() => {
    if (!token) navigate("/login")
    if (isError) {
      const customError = error as CustomErrorObject
      toast.error(customError.data.err)
    }
  }, [isError, error, navigate, token])
  if (isLoading) return <h1 className="text-5xl text-white">Loading...</h1>
  return (
    <div className=" bg-slate-950 h-full w-full text-gray-100 py-16 px-32 flex flex-col gap-16 items-center">
      {isSuccess && data.map((da) => <SinglePost key={da._id} data={da} />)}
    </div>
  )
}
