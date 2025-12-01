import { useEffect, useState } from "react";
import axios from "./axios";
import { useAuth } from "../context/AuthContext";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const { token, loading: authLoading } = useAuth();

  const loadCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data.data);
    } catch (err) {
      alert("Failed to load categories" + (err.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    if (!authLoading && token) {
      const fetchCategories = async () => {
      await loadCategories();
    };
    fetchCategories();
    } 
  }, [authLoading, token]);

  return categories;
}
