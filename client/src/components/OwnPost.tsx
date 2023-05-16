import React, { useState, useEffect } from "react"
import type { postInterface } from "../types/modelType"
import { AiFillDelete } from "react-icons/ai"
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../api/postApiSlice"
import { Spinner } from "./Spinner"
import type { CustomErrorObject } from "../types/customError"
import { toast } from "react-toastify"

interface OwnPostProps {
  post: Omit<postInterface, "userId">
}

export const OwnPost: React.FC<OwnPostProps> = ({ post }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [input, setInput] = useState<{ title: string; content: string }>({
    title: post.title,
    content: post.content,
  })
  const [
    deletePost,
    { isLoading: deleteLoading, isError: deleteisError, error: deleteError },
  ] = useDeletePostMutation()
  const [
    updatePost,
    { isLoading: updateLoading, isError: updateisError, error: updateError },
  ] = useUpdatePostMutation()
  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setEdit(!edit)
  }
  const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    console.log(input)
    await updatePost({ data: input, id: post._id })
    setEdit(false)
    toast.success("Updated successfully")
  }
  const handleOnDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const confirm: boolean = window.confirm(
      "Are you sure you want to delete this post?"
    )
    if (confirm) {
      deletePost(post._id)
    }
  }
  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  useEffect(() => {
    if (updateisError) {
      const customError = updateError as CustomErrorObject
      toast.error(customError?.data?.err)
    }
    if (deleteisError) {
      const customError = deleteError as CustomErrorObject
      toast.error(customError?.data?.err)
    }
  }, [updateError, deleteError, updateisError, deleteisError])
  if (updateLoading) return <Spinner />
  if (deleteLoading) return <Spinner />
  return (
    <div className="w-full border border-gray-800 rounded-xl shadow-indigo-800 shadow-lg mx-auto">
      <AiFillDelete
        className="mt-4 mb-2 text-xl cursor-pointer hover:fill-red-600  mx-8"
        onClick={handleOnDelete}
      />
      <div className="text-gray-50   flex items-center justify-between py-4 px-8">
        <div>
          {edit ? (
            <input
              className="input input-base-100"
              name="title"
              value={input.title}
              onChange={handleOnChange}
            />
          ) : (
            <h1 className=" font-bold text-xl">{post.title}</h1>
          )}
        </div>
        <div>
          {edit ? (
            <textarea
              className="input input-base-100"
              name="content"
              value={input.content}
              onChange={handleOnChange}
            ></textarea>
          ) : (
            <h1>{post.content}</h1>
          )}
        </div>
        <div>
          {edit ? (
            <div className="flex gap-8">
              <button className=" btn btn-base-100" onClick={handleOnSubmit}>
                Submit
              </button>
              <button className=" btn btn-base-100" onClick={handleEdit}>
                Cancel
              </button>
            </div>
          ) : (
            <button className=" btn btn-base-100" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
