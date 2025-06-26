import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const productsCollection = collection(db, "products");

export async function fetchProducts() {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createProduct(productData) {
  return await addDoc(productsCollection, productData);
}
