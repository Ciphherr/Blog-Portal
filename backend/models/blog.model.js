import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
        title :{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        blogImage: {
            type: String
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Blogs = mongoose.model("Blogs", blogSchema);