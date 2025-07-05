import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blogs/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setBlog(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching blog", err);
      });
  }, [id]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-dark-light">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-light mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-bright rounded-full flex items-center justify-center">
              <span className="text-dark font-bold text-lg">
                {blog.owner?.username?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-light font-medium text-lg">
                {blog.owner?.username || "Unknown Author"}
              </p>
              <p className="text-light/60 text-sm">
                Published on {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Blog Image */}
        {blog.blogImage && (
          <div className="mb-8 overflow-hidden shadow-2xl">
            <img 
              src={blog.blogImage} 
              alt="Blog" 
              className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}

        {/* Content Section */}
        <div className="bg-transparent p-8 md:p-12 shadow-2xl">
          <div className="prose prose-lg max-w-none">
            <div className="text-light/90 leading-relaxed text-lg space-y-6">
              {blog.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-bright/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-bright rounded-full animate-pulse"></div>
              <span className="text-light/60 text-sm">Article by {blog.owner?.username || "Unknown"}</span>
            </div>
            <div className="text-light/60 text-sm">
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
