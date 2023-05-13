import React, { useState, useEffect } from "react"
import { useLoginUserMutation } from "../api/userApiSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setUser } from "../features/userSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import type { CustomErrorObject } from "../types/customError"
import { Spinner } from "../components/Spinner"

export const Login: React.FC = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  //Types
  interface formDataInterface {
    username: string
    password: string
  }

  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<formDataInterface>({
    username: "",
    password: "",
  })
  //onChange Function
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const [loginUser, { isLoading, isError, isSuccess, error, data }] =
    useLoginUserMutation()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    loginUser({ username: formData.username, password: formData.password })
  }
  useEffect(() => {
    if (user.accessToken) navigate("/")
    if (isError) {
      const customError = error as CustomErrorObject
      toast.error(customError.data.err)
    }
    if (isSuccess && data) {
      dispatch(setUser(data))
      navigate("/")
    }
  }, [isError, error, data, isSuccess, dispatch, user.accessToken, navigate])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="h-screen w-screen bg-slate-950 flex justify-center items-center">
      <section className=" py-12 px-4 flex flex-col items-center bg-black rounded-xl w-[700px] bg-opacity-5 border-gray-900 border shadow-xl shadow-indigo-800">
        <h1 className=" text-neutral-100 tracking-tighter text-7xl font-extrabold">
          LOGIN
        </h1>
        <form
          className="flex flex-col gap-3 w-[80%] mt-[10%]"
          onSubmit={onSubmit}
        >
          <input
            name="username"
            type="text"
            required
            className=" bg-black bg-opacity-50 w-full p-4 text-neutral-100 border border-gray-900 placeholder:text-gray-700"
            placeholder="Username..."
            onChange={onChange}
            value={formData.username}
          />
          <input
            type="password"
            name="password"
            required
            className=" bg-black bg-opacity-50 w-full p-4 text-neutral-100 border border-gray-900 placeholder:text-gray-700"
            placeholder="Password..."
            onChange={onChange}
            value={formData.password}
          />
          <button
            type="submit"
            className=" w-full font-bold p-4 text-neutral-100 bg-slate-900 border border-gray-900 hover:bg-slate-950 transition-all duration-100"
          >
            LOGIN
          </button>
        </form>
        <button className="w-[80%] mt-4 font-bold p-4 text-neutral-100 bg-slate-900 border border-gray-900 hover:bg-slate-950 transition-all duration-100">
          REGISTER
        </button>
      </section>
    </div>
  )
}
