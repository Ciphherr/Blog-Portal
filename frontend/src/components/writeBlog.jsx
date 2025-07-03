import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/authContext";

const WriteBlog = () => {
  const { loggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/signin");
    }
  }, [loggedIn, loading]);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("blogImage", image); // key name must match backend

    try {
      const res = await axios.post("http://localhost:3000/blogs/write", formData, {
        withCredentials: true, // include cookies
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog created successfully!");
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark p-4 md:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-bright/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-bright/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-light/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-bright to-bright/60 rounded-full shadow-lg mb-4">
            <svg className="w-8 h-8 text-dark" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-light mb-2">Create Your Story</h1>
          <p className="text-light/70 text-lg">Share your thoughts with the world</p>
        </div>

        {/* Main Form Container */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-bright/20 to-bright/10 rounded-3xl blur-xl"></div>
          
          <div className="relative bg-dark/80 backdrop-blur-xl border border-bright/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <label className="block text-light font-semibold text-lg">
                  Blog Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-dark-light/50 border border-bright/30 rounded-xl text-light placeholder-light/50 focus:border-bright focus:outline-none focus:ring-2 focus:ring-bright/20 transition-all duration-200 text-lg"
                    placeholder="Enter your blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-3">
                <label className="block text-light font-semibold text-lg">
                  Content
                </label>
                <div className="relative">
                  <textarea
                    className="w-full px-6 py-4 bg-dark-light/50 border border-bright/30 rounded-xl text-light placeholder-light/50 focus:border-bright focus:outline-none focus:ring-2 focus:ring-bright/20 transition-all duration-200 resize-none"
                    placeholder="Write your story here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={12}
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-3">
                <label className="block text-light font-semibold text-lg">
                  Featured Image
                </label>
                
                {!imagePreview ? (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-bright/30 rounded-xl cursor-pointer hover:border-bright/50 transition-all duration-200 bg-dark-light/30 hover:bg-dark-light/50 group"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-bright/60 group-hover:text-bright transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        <p className="mb-2 text-sm text-light/70">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-light/50">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-dark-light/30">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-bright to-bright/80 hover:from-bright/90 hover:to-bright/70 text-dark font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-bright/25"
                >
                  Publish Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;