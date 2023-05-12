import React, { useEffect } from "react"
import { useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import { useFetchPostsQuery } from "../api/postApiSlice"
import type { CustomErrorObject } from "../types/customError"
import { toast } from "react-toastify"

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
  }, [])
  if (isLoading) return <h1 className="text-5xl text-white">Loading...</h1>
  return (
    <div className=" bg-slate-950 h-full w-full text-gray-100 py-8 px-16">
      {isSuccess && data.map((da) => <h1 key={da._id}>{da.title}</h1>)}
    </div>
  )
}
