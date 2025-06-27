import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { useUser } from "@/contexts/UserContext";
import ProductCard from "@/features/marketplace/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function DealsPage() {
  const { user } = useUser();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        let products = [];

        if (user) {
          const viewHistorySnapshot = await getDocs(
            collection(db, "users", user.uid, "viewHistory")
          );

          const categoryCount = {};
          viewHistorySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.category) {
              categoryCount[data.category] =
                (categoryCount[data.category] || 0) + 1;
            }
          });

          const topCategories = Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([category]) => category);

          let q;
          if (topCategories.length > 0) {
            q = query(
              collection(db, "products"),
              where("category", "in", topCategories),
              orderBy("price", "asc"),
              limit(20)
            );
          } else {
            q = query(
              collection(db, "products"),
              orderBy("price", "asc"),
              orderBy("viewCount", "desc"),
              limit(20)
            );
          }

          const snapshot = await getDocs(q);
          products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } else {
          const q = query(
            collection(db, "products"),
            orderBy("price", "asc"),
            orderBy("viewCount", "desc"),
            limit(20)
          );

          const snapshot = await getDocs(q);
          products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }

        setDeals(products);
      } catch (error) {
        alert("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [user]);

  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {user ? "Deals For You" : "Best Deals"}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : deals.length === 0 ? (
          <div className="text-gray-500 text-sm col-span-full text-center">
            No deals available right now.
          </div>
        ) : (
          deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
