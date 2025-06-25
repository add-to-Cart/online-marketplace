import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";

export default function ProductList() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("sellerId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  if (loading) {
    return <div className="text-gray-600 p-4">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="text-gray-500 p-4">No products found.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Product Listings
        </h2>
        {/* Optional: Add button for modal form on mobile */}
        <Link
          to="#"
          className="block md:hidden text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => alert("Open modal form")} // Replace this with modal logic
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow-sm border border-gray-200"
          >
            {/* Row 1: Product Name */}
            <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* Row 2: Product Image */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded border border-gray-300 shadow-sm mb-3"
            />

            {/* Row 3: Product Info */}
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-blue-600">
                ₱{product.price?.toLocaleString()}
              </p>

              <div className="text-xs text-gray-600 space-y-0.5">
                <p>
                  <span
                    className={
                      product.isAvailable ? "text-green-600" : "text-red-500"
                    }
                  >
                    {product.isAvailable ? "Available" : "Out of Stock"}
                  </span>
                </p>
                <p>
                  Category:{" "}
                  <span className="font-medium text-gray-800">
                    {product.category}
                  </span>
                </p>
                <p>
                  Style:{" "}
                  <span className="font-medium text-gray-800">
                    {product.styles}
                  </span>
                </p>
                <p>
                  Stock:{" "}
                  <span className="font-medium text-gray-800">
                    {product.stock}
                  </span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-2">
              <Link
                to={`/seller/products/edit/${product.id}`}
                className="px-3 py-1 text-sm text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => alert("Delete logic goes here")}
                className="px-3 py-1 text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
