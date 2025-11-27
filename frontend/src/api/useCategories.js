import { useEffect, useState } from "react";
import axios from "./axios";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
    } catch (err) {
      alert("Failed to load categories" + (err.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await loadCategories();
    };
    fetchCategories();
  }, []);

  return categories;
}
