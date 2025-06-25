import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white border border-gray-200 rounded shadow hover:shadow-md transition p-3 flex flex-col"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-36 object-cover rounded mb-2"
      />
      <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
        {product.name}
      </h2>
      <p className="text-sm font-bold text-blue-600">
        ₱{product.price?.toLocaleString()}
      </p>
      <p className="text-xs text-gray-500 mt-1">{product.category}</p>
    </Link>
  );
}
