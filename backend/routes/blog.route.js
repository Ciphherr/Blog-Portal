import express from "express";
import { createBlog, getAllBlogs, getMyBlogs, readBlog, searchBlogs, toggleLike, getMyLikedBlogs, addComment } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const blogRouter = express.Router();
blogRouter.post("/write", verifyJWT, upload.single("blogImage"), createBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/my/blogs", verifyJWT, getMyBlogs);
blogRouter.get("/my/liked-blogs", verifyJWT, getMyLikedBlogs);
blogRouter.get("/search", verifyJWT, searchBlogs);
blogRouter.put("/:id/like", verifyJWT, toggleLike);
blogRouter.post("/:id/comment", verifyJWT, addComment);
blogRouter.get("/:id", verifyJWT, readBlog);



export default blogRouter;
