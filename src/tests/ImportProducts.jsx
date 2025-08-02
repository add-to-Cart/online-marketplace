import { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import gen4 from "@/data/product";

export default function ImportProducts() {
  useEffect(() => {
    const importData = async () => {
      const productsRef = collection(db, "products");

      for (const product of gen4) {
        const normalizedName = product.name.trim().toLowerCase();

        try {
          // Check for existing product with normalized name
          const q = query(
            productsRef,
            where("normalizedName", "==", normalizedName)
          );
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            console.log(`❌ Skipped duplicate: ${product.name}`);
            continue;
          }

          // Add product if it's not a duplicate
          await addDoc(productsRef, {
            ...product,
            normalizedName,
            createdAt: serverTimestamp(),
          });

          console.log(`✅ Inserted: ${product.name}`);
        } catch (err) {
          console.error(`❌ Insert failed for ${product.name}:`, err);
        }
      }

      console.log("🎉 Import completed");
    };

    importData();
  }, []);

  return <div className="p-10 text-center">Importing products...</div>;
}
