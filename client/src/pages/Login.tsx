import React, { useState, useEffect } from "react"
import { useLoginUserMutation, usePostUserMutation } from "../api/userApiSlice"
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
  interface registerData extends formDataInterface {
    confirmPassword: string
  }
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<formDataInterface>({
    username: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState<registerData>({
    username: "",
    password: "",
    confirmPassword: "",
  })
  const handleRegisterOnchange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  //onChange Function
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const [loginUser, { isLoading, isError, isSuccess, error, data }] =
    useLoginUserMutation()
  const [
    postUser,
    { isLoading: loading, isError: isisError, error: errorMessage },
  ] = usePostUserMutation()
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    loginUser({ username: formData.username, password: formData.password })
  }
  const registerOnSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault()
    const { username, password, confirmPassword } = registerData
    if (password !== confirmPassword)
      return toast.warning("Password doesn't match!")
    if (password.length < 4)
      return toast.warning("Password must be greater then 4 characters!")
    await postUser({ username, password })
    toast.success("User is added successfully!")
  }
  useEffect(() => {
    if (user.accessToken) navigate("/")
    if (isError) {
      const customError = error as CustomErrorObject
      toast.error(customError.data.err)
    }
    if (isisError) {
      const customError = errorMessage as CustomErrorObject
      toast.error(customError.data.err)
    }
    if (isSuccess && data) {
      dispatch(setUser(data))
      navigate("/")
    }
  }, [
    isError,
    error,
    data,
    isSuccess,
    dispatch,
    user.accessToken,
    isisError,
    errorMessage,
    navigate,
  ])
  if (loading) return <Spinner />
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
        <div className=" from-control mt-4 relative  after:absolute after:h-[1px] after:w-0 after:bottom-0 after:bg-white after:left-0 hover:after:w-full after:transition-all duration-300 ">
          <label htmlFor="my-modal-4" className="cursor-pointer">
            REGISTER
          </label>
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label
            htmlFor="my-modal-4"
            className="modal cursor-pointer bg-slate-950 bg-opacity-90"
          >
            <label className="modal-box bg-slate-950 shadow-indigo-800 border border-gray-700 shadow-lg relative">
              <h3 className="text-3xl font-semibold ">Register</h3>
              <form
                className="mt-8 flex flex-col gap-4"
                onSubmit={registerOnSubmit}
              >
                <input
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterOnchange}
                  required
                  className="input text-[18px] placeholder:text-gray-500 input-md w-full bg-transparent border border-gray-700"
                  placeholder="Username..."
                />
                <input
                  value={registerData.password}
                  onChange={handleRegisterOnchange}
                  name="password"
                  type="password"
                  required
                  placeholder="Password..."
                  className=" input text-[18px] placeholder:text-gray-500 input-md w-full bg-transparent border border-gray-700"
                />
                <input
                  value={registerData.confirmPassword}
                  onChange={handleRegisterOnchange}
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confrim password..."
                  className=" input text-[18px] placeholder:text-gray-500 input-md w-full bg-transparent border border-gray-700"
                />
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
      </section>
    </div>
  )
}
