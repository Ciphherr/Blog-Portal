import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/users/me", {
        withCredentials: true,
      });
      if (res.data.success) {
        setLoggedIn(true);
        setUser(res.data.user);
      }
    } catch {
      setLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/users/logout",
      {},
      { withCredentials: true }
    );
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, user, checkAuth, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Vite-compatible export (named function)
export function useAuth() {
  return useContext(AuthContext);
}
