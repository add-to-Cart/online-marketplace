import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import getRankedData from "../scoring";

export default function TestFeaturePage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Raw Products:", productList); // Debug
    setProducts(getRankedData(productList));
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return products.map((p) => (
    <div key={p.id}>
      <span className="text-red-500">{p.id}</span> = {p.name} {p.soldCount}
    </div>
  ));
}
