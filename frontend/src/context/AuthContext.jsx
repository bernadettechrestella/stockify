import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Saat app load, coba refresh access token
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await axios.post("/auth/refresh");
        setToken(res.data.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
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
