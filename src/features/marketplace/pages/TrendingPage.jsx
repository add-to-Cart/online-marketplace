import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import getRankedData from "../recommendations/scoring";
import ProductCard from "@/features/marketplace/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function TrendingPage() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTrendingProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const productsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTrendingProducts(getRankedData(productsList));
    setLoading(false);
  };
  useEffect(() => {
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
