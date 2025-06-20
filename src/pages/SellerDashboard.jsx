// pages/SellerDashboard.jsx

import { useSeller } from "@/contexts/SellerContext";
import SellerSidebar from "../features/seller/components/SellerSidebar";
import OrdersTable from "../features/seller/components/OrdersTable";
import ProductList from "../features/seller/components/ProductList";

export default function SellerDashboard() {
  const { seller } = useSeller();

  if (!seller) return <p>Loading seller info...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar seller={seller} />
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-xl font-bold">Welcome, {seller.shopName}</h1>
        <ProductList />
        <OrdersTable />
      </main>
    </div>
  );
}
