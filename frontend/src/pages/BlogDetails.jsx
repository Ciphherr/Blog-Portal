import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/authContext"; // Assuming you have user info in context

const BlogDetails = () => {
  const { id } = useParams();
  const { user, loggedIn } = useAuth();
  const [blog, setBlog] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blogs/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setBlog(data);
          setLikesCount(data.likes?.length || 0);
          setComments(data.comments || []);
          if (loggedIn) {
            setIsLiked(data.likes?.includes(user._id));
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching blog", err);
      });
  }, [id, loggedIn, user]);

  const handleLike = async () => {
    if (!loggedIn) {
      alert("Please sign in to like");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/blogs/${id}/like`,
        {},
        { withCredentials: true }
      );
      setLikesCount(res.data.likesCount);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error liking blog", err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      alert("Please sign in to comment");
      return;
    }
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/blogs/${id}/comment`,
        { text: newComment },
        { withCredentials: true }
      );
      setComments(res.data.comments);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Blog Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-light mb-6">{blog.title}</h1>

                  {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-bright rounded-full flex items-center justify-center">
              {blog.owner?.profileImage ? (
                <img
                  src={blog.owner.profileImage}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover shadow-xl"
                />
              ) : (
                blog.owner.username.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div>
              <p className="text-light font-medium text-lg">
                {blog.owner?.username || "Unknown Author"}
              </p>
              <p className="text-light/60 text-sm">
                Published on{" "}
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

        {/* Like Button */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={handleLike}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              isLiked ? "bg-red-500 text-white" : "bg-gray-700 text-white"
            }`}
          >
            {isLiked ? "Liked" : "Like"}
          </button>
          <span className="text-light">{likesCount} Likes</span>
        </div>

        {/* Blog Image */}
        {blog.blogImage && (
          <img
            src={blog.blogImage}
            alt="Blog"
            className="w-full h-64 md:h-96 object-cover mb-8 rounded-xl shadow-lg"
          />
        )}

        {/* Blog Content */}
        <div className="text-light leading-relaxed mb-12">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Comments Section */}
        <div className="bg-dark-light p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-light">Comments</h3>
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-light/60">No comments yet</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-700 pb-2">
                  <p className="text-light font-medium">{comment.username}</p>
                  <p className="text-light/80">{comment.text}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="mt-4 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 bg-gray-800 text-light rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-bright text-dark rounded-lg hover:bg-bright/90"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
