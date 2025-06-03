import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productsApi";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
};
