import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const protect = expressAsyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)
            throw new Error("No token!");
        const user = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
export default protect;
