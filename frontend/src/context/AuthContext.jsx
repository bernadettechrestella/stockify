import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [loading, token, navigate]);

  useEffect(() => {
    const getAccessToken = async () => {
      if (window.location.pathname === "/login") {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const accessToken = res.data.data?.accessToken;
        if (accessToken) {
          setToken(accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }
      } catch {
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    getAccessToken();
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    navigate("/");
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setToken(null);
    axios.defaults.headers.common["Authorization"] = "";
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
