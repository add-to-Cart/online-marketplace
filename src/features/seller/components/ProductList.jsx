// components/ProductList.jsx
import { useState, useEffect } from "react";
import { db, auth } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const ref = collection(db, "products");
      const querySnap = await getDocs(ref);
      setProducts(querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    load();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-4">Your Products</h3>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border-b pb-2">
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-gray-500">₱{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
