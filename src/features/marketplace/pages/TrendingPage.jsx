import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/services/firebase";
import ProductCard from "@/features/marketplace/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function TrendingPage() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          orderBy("soldCount", "desc"),
          orderBy("viewCount", "desc"),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrendingProducts(products);
      } catch (error) {
        alert("Error fetching trending products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Trending Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : trendingProducts.length === 0 ? (
          <div className="text-gray-500 text-sm col-span-full text-center">
            No trending products found.
          </div>
        ) : (
          trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
