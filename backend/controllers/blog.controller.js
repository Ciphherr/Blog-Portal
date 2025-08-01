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
    const blog = await Blogs.findById(req.params.id).populate("owner", "username email profileImage");
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

const searchBlogs = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      throw new ApiError(400, "Search query is required");
    }

    const blogs = await Blogs.aggregate([
      {
        $lookup: {
          from: "users", 
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
        },
      },
      { $unwind: "$ownerDetails" },
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { content: { $regex: query, $options: "i" } },
            { "ownerDetails.username": { $regex: query, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          blogImage: 1,
          createdAt: 1,
          "ownerDetails.username": 1,
          "ownerDetails.email": 1,
        },
      },
    ]);

    return res.status(200).json(new ApiResponse(200, blogs));
  } catch (error) {
    next(error);
  }
};

const toggleLike = async(req, res, next)=>{
  try {
    const {id} = req.params;
    const userId = req.user._id;

    const blog = await Blogs.findById(id);
    if(!blog) return res.status(404).json({ message: "Blog not found" });

    const index = blog.likes.indexOf(userId);
    if(index == -1){
      blog.likes.push(userId);
    }
    else{
      blog.likes.splice(index, 1);
    }

    await blog.save();
    res.status(200).json({ success: true, likesCount: blog.likes.length });

  } catch (error) {
     next(error);
  }
}


const addComment = async (req, res, next)=>{
 try {
   const {id} = req.params;
   const userId = req.user._id;
   const username = req.user.username;
   const {text} = req.body;
 
   if(!text) return res.status(400).json({ message: "Comment cannot be empty" });
 
   const blog = await Blogs.findById(id);
   if(!blog) return res.status(404).json({ message: "Blog not found" });
 
   blog.comments.push({ user: userId, username, text });
   await blog.save();
 
   res.status(201).json({ success: true, comments: blog.comments });
 } catch (error) {
    next(error);
 }
}

export { createBlog, getAllBlogs, getMyBlogs, readBlog, searchBlogs, toggleLike, addComment };
