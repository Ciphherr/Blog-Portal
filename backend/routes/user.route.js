import { Router } from "express";
import {registerUser, loginUser, logoutUser, updateProfileImage, changePassword} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.post("/update-profile-image", verifyJWT, upload.single("profileImage"), updateProfileImage);
router.post("/change-password", verifyJWT, changePassword);
router.route("/me").get(verifyJWT, (req, res)=>{
    const user = req.user;
    res.status(200).json({  
        success: true,
        user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
        },
    });
});

export default router;