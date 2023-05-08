import express, { Express, Request, Response } from "express"
import { connect } from "mongoose"
import "dotenv/config"
import cors from "cors"
import ErrorHandler from "./middleware/ErrorHandler.js"
import compression from "compression"
import userRouter from "./routes/userRouter.js"
import postRouter from "./routes/PostRoute.js"

const app: Express = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(compression())
app.use(
  cors({
    origin: "http://localhost:5173",
  })
)

//ROUTES
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)

app.get("/*", (req: Request, res: Response): void => {
  res.status(404).json("Not found!")
})

app.use(ErrorHandler)
connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(process.env.PORT, () => console.log("app listening"))
  })
  .catch((err: any) => console.error(err))
