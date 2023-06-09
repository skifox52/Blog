import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { logoutUser } from "../features/userSlice"
import { useLogoutUserApiMutation } from "../api/userApiSlice"
import { CustomErrorObject } from "../types/customError"
import { toast } from "react-toastify"
import { Spinner } from "./Spinner"
import { usePostPostMutation } from "../api/postApiSlice"
import type { postInterface } from "../types/modelType"

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState<Omit<postInterface, "userId" | "_id">>({
    title: "",
    content: "",
  })
  const { refreshToken }: { refreshToken: string | null } = useAppSelector(
    (state) => state.user
  )
  const [logoutUserApi, { isLoading, isError, error }] =
    useLogoutUserApiMutation()
  const logout: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const response = (await logoutUserApi({ refreshToken } as {
      refreshToken: string
    })) as { data: string }
    toast.success(response.data)
    dispatch(logoutUser())
    navigate("/login")
  }
  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const [
    postPost,
    {
      isLoading: postIsLoading,
      isError: postIsError,
      error: postError,
      isSuccess,
    },
  ] = usePostPostMutation()
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    postPost({
      title: input.title,
      content: input.content,
    })
  }
  useEffect(() => {
    if (isError) {
      const customError = error as CustomErrorObject
      const message =
        (customError && customError.data && customError.data.err) || customError
      toast.error(message.toString())
    }
    if (postIsError) {
      const customError = postError as CustomErrorObject
      const message =
        (customError && customError.data && customError.data.err) || customError
      toast.error(message.toString())
      console.log(customError)
    }
    if (isSuccess) toast.success("Post addes successfully!")
  }, [isError, error, postIsError, postError, isSuccess])
  if (isLoading) return <Spinner />
  if (postIsLoading) return <Spinner />
  return (
    <div className="navbar bg-slate-950 shadow-md relative z-50 text-gray-100 shadow-indigo-800">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl font-extrabold tracking-tighter"
        >
          BLOG
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className=" from-control mx-4 relative  after:absolute after:h-[1px] after:w-0 after:bottom-0 after:bg-white after:left-0 hover:after:w-full after:transition-all duration-300 ">
          <label htmlFor="my-modal-4" className="cursor-pointer">
            Add post
          </label>
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label
            htmlFor="my-modal-4"
            className="modal cursor-pointer bg-slate-950 bg-opacity-90"
          >
            <label className="modal-box bg-slate-950 shadow-indigo-800 border border-gray-700 shadow-lg relative">
              <h3 className="text-3xl font-semibold ">Add a post</h3>
              <form
                onSubmit={handleOnSubmit}
                className="mt-8 flex flex-col gap-4"
              >
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleOnChange}
                  required
                  className="input text-[18px] placeholder:text-gray-500 input-md w-full bg-transparent border border-gray-700"
                  placeholder="Title..."
                />
                <textarea
                  name="content"
                  value={input.content}
                  onChange={handleOnChange}
                  required
                  placeholder="Content..."
                  className=" textarea h-24 text-[18px] placeholder:text-gray-500 input-md w-full bg-transparent border border-gray-700"
                ></textarea>
                <button
                  type="submit"
                  className="bg-transparent border border-gray-800 px-4 py-2 rounded-lg shadow-md shadow-indigo-800 hover:shadow-none hover:translate-y-[1px] font-semibold"
                >
                  Submit
                </button>
              </form>
            </label>
          </label>
        </div>

        <div className=" from-control mx-4 relative  after:absolute after:h-[1px] after:w-0 after:bottom-0 after:bg-white after:left-0 hover:after:w-full after:transition-all duration-300 ">
          <Link to={"/posts"}>My posts</Link>
        </div>
        <div className=" from-control mx-4 relative  after:absolute after:h-[1px] after:w-0 after:bottom-0 after:bg-white after:left-0 hover:after:w-full after:transition-all duration-300 ">
          <Link to={"/profile"}>Profile</Link>
        </div>
        <div className=" from-control mx-4">
          <button
            onClick={logout}
            className="bg-transparent border border-gray-800 px-4 py-2 rounded-lg shadow-md shadow-indigo-800 hover:shadow-none hover:translate-y-[1px]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
