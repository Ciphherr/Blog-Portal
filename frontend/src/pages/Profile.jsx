import { useEffect, useState } from "react";
import { useAuth } from "../Context/authContext";
import {Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, loading, checkAuth } = useAuth();
  const [myBlogs, setMyBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [myRes, likedRes] = await Promise.all([
          axios.get("http://localhost:3000/blogs/my/blogs", { withCredentials: true }),
          axios.get("http://localhost:3000/blogs/my/liked-blogs", { withCredentials: true })
        ]);

        if (myRes.data.success) setMyBlogs(myRes.data.data);
        if (likedRes.data.success) setLikedBlogs(likedRes.data.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);

    try {
      await axios.post("http://localhost:3000/users/update-profile-image", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile picture updated");
      checkAuth(); // Refresh user info
    } catch (err) {
      alert("Failed to upload profile image");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users/change-password", passwords, {
        withCredentials: true,
      });
      alert("Password changed successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  if (loading) return <p className="text-light">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-light min-h-screen bg-transparent">

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-transparent border border-light/20 rounded-xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={user.profileImage || "/default-avatar.png"}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-bright/20 shadow-xl"
                />
              </div>
              <h2 className="text-2xl font-bold mt-4 mb-1">{user?.username}</h2>
              <p className="text-light/70 mb-4">{user?.email}</p>
              
              {/* Upload Button */}
              <label className="inline-block cursor-pointer">
                <input 
                  type="file" 
                  onChange={handleImageUpload} 
                  className="hidden"
                  accept="image/*"
                />
                <span className="px-4 py-2 bg-bright/10 hover:bg-bright/20 border border-bright/30 rounded-lg text-bright text-sm font-medium transition-all duration-300 hover:shadow-lg">
                  📸 Change Avatar
                </span>
              </label>
            </div>

            {/* Stats */}
            <div className="border-t border-light/20 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-light/70">Total Blogs</span>
                <span className="text-bright font-bold text-xl">{myBlogs.length}</span>
              </div>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="bg-transparent border border-light/20 rounded-xl p-6 shadow-lg mt-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              🔒 Change Password
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light/80 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                  className="w-full p-3 border border-light/20 rounded-lg bg-dark-light text-light placeholder-light/50 focus:border-bright focus:outline-none focus:ring-2 focus:ring-bright/20 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light/80 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="w-full p-3 border border-light/20 rounded-lg bg-dark-light text-light placeholder-light/50 focus:border-bright focus:outline-none focus:ring-2 focus:ring-bright/20 transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-3 bg-bright text-dark font-medium rounded-lg hover:bg-bright/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="lg:col-span-2">
          <div className="bg-dark-light border border-light/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                ✍️ Your Blogs
              </h3>
              <div className="text-sm text-light/70">
                {myBlogs.length} {myBlogs.length === 1 ? 'blog' : 'blogs'}
              </div>
            </div>

            {myBlogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h4 className="text-xl font-medium text-light/80 mb-2">No blogs yet</h4>
                <p className="text-light/60">Start writing your first blog to see it here</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {myBlogs.map((blog, index) => (
                  <Link to={`/blog/${blog._id}`}  key={blog._id} className="group p-5 bg-dark border border-light/10 rounded-xl shadow-md hover:shadow-bright/10 hover:border-bright/30 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg leading-tight group-hover:text-bright transition-colors">
                        {blog.title}
                      </h4>
                      <span className="text-xs text-light/50 bg-light/10 px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                    
                    <p className="text-sm text-light/80 leading-relaxed mb-4 line-clamp-3">
                      {blog.content.slice(0, 120)}...
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-light/50">
                      <span className="flex items-center gap-1">
                        📅 {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        📊 {blog.content.length} chars
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Liked Blogs Section */}
          <div className="bg-dark-light border border-light/20 rounded-xl p-6 shadow-lg mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                 Your Liked Blogs
              </h3>
              <div className="text-sm text-light/70">
                {likedBlogs.length} {likedBlogs.length === 1 ? 'blog' : 'blogs'}
              </div>
            </div>

            {likedBlogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h4 className="text-xl font-medium text-light/80 mb-2">No blogs liked yet</h4>
                <p className="text-light/60">Like your first blog to see it here</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {likedBlogs.map((blog, index) => (
                  <Link to={`/blog/${blog._id}`}  key={blog._id} className="group p-5 bg-dark border border-light/10 rounded-xl shadow-md hover:shadow-bright/10 hover:border-bright/30 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg leading-tight group-hover:text-bright transition-colors">
                        {blog.title}
                      </h4>
                      <span className="text-xs text-light/50 bg-light/10 px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                    
                    <p className="text-sm text-light/80 leading-relaxed mb-4 line-clamp-3">
                      {blog.content.slice(0, 120)}...
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-light/50">
                      <span className="flex items-center gap-1">
                        📅 {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        📊 {blog.content.length} chars
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
