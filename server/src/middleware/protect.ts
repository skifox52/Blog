import { NextFunction, RequestHandler, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

const protect: RequestHandler = expressAsyncHandler(
  async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers["authorization"]
      const token = authHeader && authHeader.split(" ")[1]
      if (!token) throw new Error("No token!")
      const user = jwt.verify(token, process.env.ACCESS_SECRET as string)
      req.user = user
      next()
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
export default protect
