import { useNavigate } from "react-router-dom";
import mockProducts from "@/features/products/data/mockProducts";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 p-4 lg:mx-40 lg:mt-12">
      {mockProducts.map((product) => (
        <div
          key={product.id}
          onClick={() => handleProductClick(product.id)}
          className="cursor-pointer border-1 border-gray-200 hover:shadow-md transition duration-150 flex flex-col bg-white p-5"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-32 object-contain rounded mb-3"
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-gray-800 text-sm font-medium truncate">
              {product.name}
            </p>
            <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded w-max">
              tags
            </div>
            <p className="font-semibold text-gray-700 text-sm mt-auto">
              ₱{product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
