import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/services/firebase";

export default function CountProduct() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const coll = collection(db, "products");
        const snapshot = await getCountFromServer(coll);
        setCount(snapshot.data().count);
      } catch (error) {
        console.error("Failed to fetch product count:", error);
      }
    };

    fetchProductCount();
  }, []);

  return (
    <div className="p-4 text-center">
      {count === null ? "Loading product count..." : `Total Products: ${count}`}
    </div>
  );
}
