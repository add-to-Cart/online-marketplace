import { useProducts } from "../hooks/useProducts";

export function ProductList() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded p-2 shadow hover:shadow-md"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-32 w-full object-cover"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="text-primary font-bold mt-1">₱{product.price}</p>
        </div>
      ))}
    </div>
  );
}
