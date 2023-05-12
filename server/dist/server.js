import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import cors from "cors";
import ErrorHandler from "./middleware/ErrorHandler.js";
import compression from "compression";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRoute.js";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(cors({
    origin: "http://localhost:5173",
}));
//ROUTES
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.get("/*", (req, res) => {
    res.status(404).json("Not found!");
});
app.use(ErrorHandler);
connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(process.env.PORT, () => console.log("app listening"));
})
    .catch((err) => console.error(err));
