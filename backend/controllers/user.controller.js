import {User} from "../models/Authentication/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createUser = async (req, res)=>{
         const {username, email, password} = req.body

          if ([email, username, password].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required")
         }

         const existedUser = await User.findOne({
            $or: [{ username }, { email }]
         })

         if (existedUser) {
            throw new ApiError(409, "User with email or username already exists")
         }

         const usercreation = await User.create({
            username,
            email,
            password
         })

         if(!usercreation){
            throw new ApiError(500, "registration failed")
         }

         return res.status(201).json(
            new ApiResponse(200,  "User registered Successfully")
         )

}

export default createUser;