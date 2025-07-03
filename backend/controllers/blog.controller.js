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

export { createBlog };
