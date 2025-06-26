import ProductForm from "@/features/seller/components/ProductForm";
import ProductList from "@/features/seller/components/ProductList";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 py-6">
      <div className="lg:col-span-2">
        <ProductList />
      </div>

      <div className="sticky top-4">
        <ProductForm />
      </div>
    </div>
  );
}
