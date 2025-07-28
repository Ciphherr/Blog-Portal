import { useEffect, useState } from "react";
import { useLocation , Link } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/blogs/search?query=${query}`, {
          withCredentials: true,
        });
        if (res.data.data) setResults(res.data.data);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (loading) return <p className="text-light text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-dark to-dark-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-light text-center">
          Search Results for "{query}"
        </h2>
        {results.length === 0 ? (
          <p className="text-light/60 text-center">No results found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {results.map((blog) => (
              <div
                key={blog._id}
                className="bg-dark-light rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-bright/10 transition-all duration-300 border border-bright/20 hover:border-bright/40 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden flex items-center justify-center bg-dark/50">
                  {blog.blogImage ? (
                    <img
                      src={blog.blogImage}
                      alt="blog"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-light/60 text-sm">No Image</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-light line-clamp-2 hover:text-bright transition-colors duration-200">
                    {blog.title}
                  </h3>
                  <p className="text-light/80 mb-4 text-sm leading-relaxed line-clamp-3">
                    {blog.content.slice(0, 100)}...
                  </p>
                  <Link to={`/blog/${blog._id}`} className="bg-bright text-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-bright/90 transition-all duration-200 mb-3 w-full">
                  Read More
                  </Link>
                  <div className="pt-3 border-t border-bright/20">
                    <p className="text-xs text-light/60">
                      By {blog.ownerDetails?.username || "Unknown"} •{" "}
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown date"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
