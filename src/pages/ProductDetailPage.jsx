import { useParams, useNavigate } from "react-router-dom";
import mockProducts from "@/features/products/data/mockProducts";
import { useAuth } from "@/contexts/AuthContext";

export default function ProductDetailPage() {
  // Get the productId from the URL params (e.g., /products/1 means productId = "1")
  const { productId } = useParams();

  // Hook to programmatically navigate to other routes
  const navigate = useNavigate();

  // Get the current logged-in user (if any)
  const { user } = useAuth();

  // Find the product in our mock data by matching productId (as string)
  const product = mockProducts.find((p) => p.id === productId);

  // If no product found, show a simple message and stop rendering further
  if (!product) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-600">
        Product not found
      </div>
    );
  }

  // When user clicks the button, check if logged in
  const handleButtonClick = () => {
    if (!user) {
      // If not logged in, redirect to login page and remember this page
      navigate("/login", { state: { from: `/products/${productId}` } });
    } else {
      // If logged in, simulate adding to cart or purchase
      alert(`Product "${product.name}" added to cart.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Product name */}
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      {/* Product image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full max-h-96 object-contain mb-4"
      />

      {/* Product description or fallback text */}
      <p className="mb-4">
        {product.description || "No description available."}
      </p>

      {/* Product price formatted with commas */}
      <p className="text-xl font-semibold mb-6">
        ₱{product.price.toLocaleString()}
      </p>

      {/* Button that changes text depending on login state */}
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {user ? "Add to Cart" : "Login to Purchase"}
      </button>
    </div>
  );
}
