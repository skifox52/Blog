import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import PostModel, { PostInterface } from "../models/PostModel.js"
import { Types } from "mongoose"

//||||||||||||||POST CRUD|||||||||||||||||||||||||
//Get all posts
export const getPosts = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const posts: PostInterface[] = await PostModel.find({}).populate({
        path: "userId",
        select: "-password-_id",
      })
      res.status(200).json(posts)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Get own posts
export const getOwnPosts = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const ownPosts: PostInterface[] = await PostModel.find({
        userId: req.user?.id,
      })
      res.status(200).json(ownPosts)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Create a new post
export const createPost = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content }: Omit<PostInterface, "_id" | "userId"> = req.body
      const newPost: PostInterface = await PostModel.create({
        title,
        content,
        userId: new Types.ObjectId(req.user?.id),
      })
      res.status(201).json("Post created successfully!")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Update a post
export const updatePost = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      await PostModel.findByIdAndUpdate(
        id,
        req.body as Omit<PostInterface, "_id" | "userId">
      )
      res.status(200).json("Post updated successfully!")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Delete a Post
export const deletePost = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      await PostModel.findByIdAndDelete(id)
      res.status(200).json("Post deleted successfully")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
