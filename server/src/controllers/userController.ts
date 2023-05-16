import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import UserModel, { UserSchemaInterface } from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import "dotenv/config"
import refreshTokenModel from "../models/RefreshTokenModel.js"
import bcrypt from "bcrypt"
import expressAsyncHandler from "express-async-handler"
//||||||||||||||||AUTHENTIFICATION||||||||||||||||||||||||||||||||
//UTILS [[
//Types
interface UserReturnType {
  _id: string
  accessToken: string
  refreshToken: string
}
//----< Check if user Exisst

const userExistFunc = async (username: string): Promise<boolean> => {
  try {
    const user = await UserModel.find({ username })
    return user.length > 0 ? true : false
  } catch (error: any) {
    throw new Error(error)
  }
}
//-------->
//-----< Return Access and Refreh tokens
const genAccessToken = (id: string): string => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET as string, {
    expiresIn: "100h",
  })
}
const genRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET as string)
}
const returnAccessAndRefresh = async (id: string): Promise<UserReturnType> => {
  try {
    const accessToken: string = genAccessToken(id)
    const refreshToken: string = genRefreshToken(id)
    await refreshTokenModel.create({ idUtilisateur: id, refreshToken })
    return { _id: id, accessToken, refreshToken }
  } catch (error: any) {
    throw new Error(error)
  }
}
//----->
// ]]

//Register Users
export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body
      if (!username || !password) throw new Error("Empty fields!")
      if (await userExistFunc(username)) throw new Error("User already exists!")
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser: UserSchemaInterface = await UserModel.create({
        username,
        password: hashedPassword,
      })
      const userReturn: UserReturnType = await returnAccessAndRefresh(
        newUser._id.toString() as string
      )
      res.status(201).json(userReturn)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Login User
export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body
      if (!username || !password) throw new Error("Empty fields!")
      if (!(await userExistFunc(username)))
        throw new Error("User doesn't exist!")
      const user = await UserModel.find({ username })
      const passwordMatch = await bcrypt.compare(password, user[0].password)
      if (!passwordMatch) throw new Error("Wrong password!")
      const userReturn: UserReturnType = await returnAccessAndRefresh(
        user[0]._id.toString()
      )
      res.status(200).json(userReturn)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Logout User
export const logoutUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw new Error("No refresh token!")
      await refreshTokenModel.findOneAndDelete({ refreshToken })
      res.status(200).json("Logged out successfully!")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Refresh Access Token
export const refreshAccessToken = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw new Error("No refresh token!")
      const refreshTokenExists: boolean =
        (await refreshTokenModel.find({ refreshToken })).length > 0
          ? true
          : false
      if (!refreshTokenExists) throw new Error("Invalid refresh token")
      const { iat, ...data }: any = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET as string
      )
      res.status(200).json({ accessToken: genAccessToken(data) })
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//||||||||||||||||||||||||||||||CRUD USER|||||||||||||||||||||||||||||||||||||||||||||||
//Get user profile
export const getUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserModel.findById(req.user?.id)
      res.status(200).json(user)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Put User Profile
export const updateUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const data: Omit<UserSchemaInterface, "_id"> = req.body
      const { password } = req.body
      let hashedPassword: string = ""
      if (password) hashedPassword = await bcrypt.hash(password, 10)
      await UserModel.findByIdAndUpdate(req.user?.id, {
        ...data,
        password: hashedPassword,
      })
      res.status(200).json("User updated successfully!")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Delete user profile
export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      await UserModel.findByIdAndDelete(req.user?.id)
      res.status(200).json("User deleted successfully!")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
