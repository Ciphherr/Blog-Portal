import { Blogs } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      throw new ApiError(400, "Title and Content are required.");
    }

    // Upload image to Cloudinary
    let blogImage = "";
    if (req.file?.path) {
      const cloudinaryUrl = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryUrl) {
        throw new ApiError(500, "Image upload failed.");
      }
      blogImage = cloudinaryUrl;
    }

    // Create blog entry
    const blog = await Blogs.create({
      title,
      content,
      blogImage,
      owner: req.user._id,
    });

    return res.status(201).json(
      new ApiResponse(201, blog, "Blog created successfully.")
    );
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res)=>{
   try {
    const blogs = await Blogs.find()
      .populate("owner", "username email") // fetch user's name & email
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json( new ApiResponse (200, blogs));
  } catch (error) {
      throw new ApiError(500, "Failed to fetch blogs");
  }
}

const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, blogs));
  } catch (error) {
    throw new ApiError(500, "Unable to fetch your blogs");
  }
};

const readBlog = async (req, res)=>{
  try {
    const blog = await Blogs.findById(req.params.id).populate("owner", "username email");
    if(!blog){
      throw new ApiError(404, "Blog not found");
    }
    res.status(200).json(
      new ApiResponse(200, blog)
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
}

export { createBlog, getAllBlogs, getMyBlogs, readBlog };
