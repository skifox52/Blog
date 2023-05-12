import { Router } from "express";
import { deleteUser, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateUser, } from "../controllers/userController.js";
import protect from "../middleware/protect.js";
const userRouter = Router();
userRouter
    .post("/", registerUser)
    .post("/login", loginUser)
    .delete("/logout", protect, logoutUser)
    .post("/refresh", protect, refreshAccessToken)
    .get("/user", protect, getUser)
    .put("/user", protect, updateUser)
    .delete("/user", protect, deleteUser);
export default userRouter;
