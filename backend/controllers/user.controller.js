import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const generateAccessTokenandRefreshToken = async (userId)=>{
   const user = await User.findById(userId);
   const accessToken = user.generateAccessToken();
   const refreshToken = user.generateRefreshToken();

   user.refreshToken = refreshToken;
   await user.save({validateBeforeSave : false});

   return {accessToken, refreshToken}
}

const registerUser = async (req, res)=>{
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

const loginUser = async (req, res)=>{
   const {username , password} = req.body;

   if ([username, password].some((field) => field?.trim() === "")) {
         throw new ApiError(400, "All fields are required")
   }
   
   const user = await User.findOne({username});

   if(!user){
      throw new ApiError(404, "User not found");
   }

   const isPasswordValid = await user.isPasswordCorrect(password);

   if(!isPasswordValid){
      throw new ApiError(401,"Invalid credentials");
   }


   const {accessToken, refreshToken} = await generateAccessTokenandRefreshToken(user._id);

   const options ={
      httpOnly : true,
      secure : false,
   };

   return res.status(201).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
      new ApiResponse(200,  "User loggedIn Successfully")
   );
}

const logoutUser = async (req, res)=>{
   await User.findByIdAndUpdate
   (
      req.user._id, 
      {
            $unset: {
                refreshToken: 1 
            }
      },
      {
            new: true
      }
   )

   const options ={
      httpOnly : true,
      secure : false,
      path: "/"
   };

   return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
      new ApiResponse(200, "User Logged Out")
   );
}

const updateProfileImage = async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No image uploaded");
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  if (req.file?.path) {
        const cloudinaryUrl = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryUrl) {
          throw new ApiError(500, "Image upload failed.");
        }
        user.profileImage = cloudinaryUrl;
      }// or cloudinary URL if you're using that
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Profile picture updated successfully"));
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) throw new ApiError(401, "Old password incorrect");

  user.password = newPassword;
  await user.save();

  res.status(200).json(new ApiResponse(200, "Password changed successfully"));
};



export {registerUser, loginUser, logoutUser, updateProfileImage, changePassword};