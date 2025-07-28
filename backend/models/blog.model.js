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
);

blogSchema.index({ title: "text", content: "text" });
blogSchema.index({ owner: 1 });

export const Blogs = mongoose.model("Blogs", blogSchema);