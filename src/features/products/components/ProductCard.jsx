// src/features/products/components/ProductCard.jsx
export default function ProductCard({ product }) {
  return (
    <div className="rounded-xl border shadow p-4 hover:shadow-md transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-primary font-bold mt-2">₱{product.price}</p>
    </div>
  );
}
