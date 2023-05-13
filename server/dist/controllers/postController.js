import expressAsyncHandler from "express-async-handler";
import PostModel from "../models/PostModel.js";
import { Types } from "mongoose";
//||||||||||||||POST CRUD|||||||||||||||||||||||||
//Get all posts
export const getPosts = expressAsyncHandler(async (req, res) => {
    try {
        const posts = await PostModel.find({}).populate({
            path: "userId",
            select: "-password-_id",
        });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//Get own posts
export const getOwnPosts = expressAsyncHandler(async (req, res) => {
    try {
        const ownPosts = await PostModel.find({
            userId: req.user?.id,
        });
        res.status(200).json(ownPosts);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//Create a new post
export const createPost = expressAsyncHandler(async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await PostModel.create({
            title,
            content,
            userId: new Types.ObjectId(req.user?.id),
        });
        res.status(201).json("Post created successfully!");
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//Update a post
export const updatePost = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.findByIdAndUpdate(id, req.body);
        res.status(200).json("Post updated successfully!");
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//Delete a Post
export const deletePost = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.findByIdAndDelete(id);
        res.status(200).json("Post deleted successfully");
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
