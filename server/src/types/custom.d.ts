import { Request } from "express"

declare global {
  declare namespace Express {
    interface Request {
      user?: { id: string; iat: number; exp: number }
    }
  }
}
