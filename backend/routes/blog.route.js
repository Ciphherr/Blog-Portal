import express from "express";
import { createBlog } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/write", verifyJWT, upload.single("blogImage"), createBlog);

export default blogRouter;
