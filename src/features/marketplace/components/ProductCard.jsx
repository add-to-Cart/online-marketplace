import { Link } from "react-router-dom";
import formatCreatedAt from "@/helpers/formatCreationDate";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 flex flex-col gap-2 group"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-30 object-contain rounded bg-white"
      />
      <h2 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
        {product.name}
        <span className="text-red-500">{product.soldCount}</span>
      </h2>
      <p className="text-sm font-bold text-blue-600">
        ₱{product.price?.toLocaleString()}
      </p>
      <p className="text-xs text-gray-500">
        {product.storeName || "Unknown"} &nbsp;•&nbsp;{" "}
        {formatCreatedAt(product.createdAt)}
      </p>
    </Link>
  );
}
