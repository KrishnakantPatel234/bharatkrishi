import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req , res , next) => {
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message : "Unauthorized access , token is missing"
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists"
            });
        }

        req.user = user;

        next();
    }
    catch(error){
            return res.status(401).json({
                message : "Unauthorized access , token is invalid"
            })
    }
}

export default authMiddleware;