import React from "react"
import type { postInterface } from "../types/modelType"

interface SinglePostProps {
  data: postInterface
}

export const SinglePost: React.FC<SinglePostProps> = ({ data }) => {
  return (
    <article className="px-4 py-4 border border-gray-800 rounded-lg flex flex-col justify-start shadow-md shadow-indigo-800">
      <section>
        <h1 className="font-extrabold text-3xl px-32">
          {data.title.toUpperCase()}
        </h1>
      </section>
      <main className="bg-slate-900 border border-gray-900 bg-opacity-50 py-4  my-8 px-4 rounded-lg text-justify">
        <p>
          {data.content.toString().charAt(0).toUpperCase() +
            data.content.toString().slice(1)}
        </p>
      </main>
      <section className="flex justify-between pt-8">
        <span className="flex gap-4 font-light">
          Author: <h3 className=" font-semibold">{data.userId.username}</h3>
        </span>
        <p className=" font-light text-sm text-gray-400">
          {data.createdAt.toString().split("T").join(" ").slice(0, 16)}
        </p>
      </section>
    </article>
  )
}
