import React, { useEffect, useState } from "react"
import { useFetchUserQuery, useUpdateUserMutation } from "../api/userApiSlice"
import { CustomErrorObject } from "../types/customError"
import { toast } from "react-toastify"
import { Spinner } from "../components/Spinner"

export const Profile: React.FC = () => {
  interface userInput {
    username?: string
    password?: string
  }
  const [edit, setEdit] = useState<boolean>(false)
  const { data, isLoading, isError, error } = useFetchUserQuery(null)
  const [inputData, setInputData] = useState<userInput>({
    username: "",
    password: "",
  })
  const [
    updateUser,
    {
      isLoading: isisLoading,
      isError: isisError,
      error: errorObject,
      isSuccess,
    },
  ] = useUpdateUserMutation()
  useEffect(() => {
    if (isError) {
      const customError = error as CustomErrorObject
      toast.error(customError.data.err)
    }
    if (isisError) {
      const customError = errorObject as CustomErrorObject
      toast.error(customError.data.err)
    }
    if (isSuccess) toast.success("User updated successfully!")
  }, [isError, error, isisError, errorObject, isSuccess])
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setEdit(!edit)
  }
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (inputData.password === "") delete inputData["password"]
    if (inputData.username === "") delete inputData["username"]
    if (inputData.password && inputData.password?.length < 4)
      return toast.error("Password must be greater then 4 caracters")
    updateUser(inputData)
    inputData.username
    setInputData({
      username: "",
      password: "",
    })
  }
  if (isLoading) return <Spinner />
  if (isisLoading) return <Spinner />
  return (
    <div className="py-16 px-32 h-full ">
      <section className="flex flex-col gap-4 items-center mx-auto h-full w-1/2 py-8 px-4 border border-gray-800 rounded-lg shadow-indigo-800 shadow-lg">
        <h1 className=" text-white text-6xl">{data.username}</h1>
        <button className="btn btn-outline" onClick={handleOnClick}>
          Edit credentials
        </button>
        {edit && (
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col p-4 gap-4 w-2/3 mt-8"
          >
            <input
              type="text"
              className="input bg-transparent border border-gray-700"
              placeholder="Username..."
              value={inputData.username}
              name="username"
              onChange={handleOnChange}
            />
            <input
              type="password"
              className="input bg-transparent border border-gray-700"
              placeholder="Password..."
              name="password"
              value={inputData.password}
              onChange={handleOnChange}
            />
            <button type="submit" className="btn btn-outline">
              Edit
            </button>
            <button className="btn btn-outline" onClick={handleOnClick}>
              Cancel
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
