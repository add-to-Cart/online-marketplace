import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getRecommendedProducts = async (currentProduct, limit = 6) => {
  if (!currentProduct) return [];

  try {
    const snapshot = await getDocs(collection(db, "products"));

    const allProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const recommended = allProducts
      .filter(
        (item) => item.id !== currentProduct.id && item.isAvailable !== false
      )
      .map((item) => {
        let score = 0;

        if (item.category === currentProduct.category) score += 3;

        if (Array.isArray(item.tags) && Array.isArray(currentProduct.tags)) {
          const commonTags = item.tags.filter((tag) =>
            currentProduct.tags.includes(tag)
          );
          score += commonTags.length;
        }

        if (
          Array.isArray(item.styles) &&
          Array.isArray(currentProduct.styles)
        ) {
          const commonStyles = item.styles.filter((style) =>
            currentProduct.styles.includes(style)
          );
          score += commonStyles.length;
        }

        if (item.vehicleType === currentProduct.vehicleType) score += 1;

        if (typeof item.viewCount === "number") {
          score += Math.min(Math.floor(item.viewCount / 10), 3);
        }

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return recommended;
  } catch (error) {
    return [];
  }
};
