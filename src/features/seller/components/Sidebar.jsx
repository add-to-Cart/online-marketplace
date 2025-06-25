import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { user: authUser } = useAuth(); // For UID slicing
  const { user } = useUser(); // Includes .seller

  return (
    <>
      {/* Seller Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-3" />
          <div className="text-xs text-gray-500 mb-1">Seller ID</div>
          <div className="text-sm font-medium break-all text-center">
            {authUser?.uid.slice(0, 8)}
          </div>
          <div className="mt-1 text-base font-semibold text-center">
            {user?.seller?.storeName || "Unregistered"}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
        <NavLink
          to="/seller/products"
          className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium"
        >
          🏷️ Products
        </NavLink>
        <NavLink
          to="/seller/inventory"
          className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium"
        >
          📦 Inventory
        </NavLink>
        <NavLink
          to="/seller/sales"
          className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium"
        >
          📊 Sales
        </NavLink>
        <NavLink
          to="/seller/orders"
          className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium"
        >
          📬 Orders
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 text-sm text-center text-gray-400">
        Seller Dashboard © {new Date().getFullYear()}
      </div>
    </>
  );
}
