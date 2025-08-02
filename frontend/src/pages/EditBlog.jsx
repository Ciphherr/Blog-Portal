import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    // Fetch existing blog details
    axios
      .get(`http://localhost:3000/blogs/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setTitle(data.title);
          setContent(data.content);
          setImagePreview(data.blogImage);
        }
      })
      .catch((err) => {
        console.error("Error fetching blog for edit", err);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (newImage) formData.append("blogImage", newImage);

      await axios.put(`http://localhost:3000/blogs/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error("Error updating blog", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-dark-light rounded-xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-light">Edit Blog</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-light mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-light"
            required
          />
        </div>
        <div>
          <label className="block text-light mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-light h-40"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-light mb-2">Blog Image</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-60 object-cover rounded mb-4"
            />
          )}
          <input type="file" onChange={handleImageChange} />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-bright text-dark rounded-lg hover:bg-bright/90"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
