import { useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase";

export default function DeleteDuplicateProducts() {
  useEffect(() => {
    const deleteDuplicates = async () => {
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);

      // Group products by name + storeName
      const productMap = new Map();

      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        const key = `${data.name}__${data.storeName}`; // unique per name + store
        if (!productMap.has(key)) {
          productMap.set(key, [docSnap]);
        } else {
          productMap.get(key).push(docSnap);
        }
      });

      // Delete duplicates (keep the first one per name + storeName)
      for (const [key, docs] of productMap.entries()) {
        if (docs.length > 1) {
          console.log(`❌ Duplicates found for: ${key}`);
          for (let i = 1; i < docs.length; i++) {
            await deleteDoc(doc(db, "products", docs[i].id));
            console.log(`🗑️ Deleted duplicate: ${docs[i].id}`);
          }
        }
      }

      console.log("✅ Duplicate removal complete");
    };

    deleteDuplicates();
  }, []);

  return <div className="p-10 text-center">Removing duplicates...</div>;
}
