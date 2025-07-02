import { User } from "../models/Authentication/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJWT =  async (req, _ , next)=>{
    try {
        const token = req.cookies?.accessToken;
        if(!token){
            throw new ApiError(404, "Unauthorised request");
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodeToken?._id);
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(401, error?.message || "Invalid access token"));
    }

}

export {verifyJWT};