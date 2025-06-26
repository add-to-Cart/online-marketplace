import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function useRelatedProducts(currentProduct) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentProduct) return;

    const fetchRelated = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const all = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const scoredMatches = all
          .filter((p) => p.id !== currentProduct.id)
          .map((p) => {
            let score = 0;

            if (Array.isArray(p.tags) && Array.isArray(currentProduct.tags)) {
              const sharedTags = p.tags.filter((tag) =>
                currentProduct.tags.includes(tag)
              );
              score += sharedTags.length;
            }

            if (p.category === currentProduct.category) score += 2;

            if (Array.isArray(currentProduct.style) && Array.isArray(p.style)) {
              const sharedStyles = p.style.filter((s) =>
                currentProduct.style.includes(s)
              );
              score += sharedStyles.length;
            } else if (p.style === currentProduct.style) {
              score += 1;
            }

            if (p.vehicleType === currentProduct.vehicleType) score += 1;

            if (typeof p.viewCount === "number") {
              score += Math.min(Math.floor(p.viewCount / 10), 3); // max +3 pts
            }

            return { ...p, _score: score };
          })
          .filter((p) => p._score > 0)
          .sort((a, b) => b._score - a._score)
          .slice(0, 6);

        setRelated(scoredMatches);
      } catch (error) {
        alert("Error loading related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentProduct]);

  return { related, loading };
}
