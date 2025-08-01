import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        username: { type: String, required: true },
        text: { type: String, required: true },
    },
    { timestamps: true }
);


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
        },
        likes:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" 
            }
        ],
        comments: [commentSchema]
    },
    {
        timestamps: true
    }
);

blogSchema.index({ title: "text", content: "text" });
blogSchema.index({ owner: 1 });

export const Blogs = mongoose.model("Blogs", blogSchema);