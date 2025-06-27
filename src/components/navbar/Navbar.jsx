// src/components/Navbar.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import UserAuthActions from "./UserAuthActions";
import navigation from "@/data/navigationData";
import { useUser } from "@/contexts/UserContext";
import { useCart } from "@/contexts/CartContext";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <header className="bg-black text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 text-sm">
            {navigation.pages.map((page) => (
              <Link
                key={page.name}
                to={page.href}
                className="hover:text-blue-400 transition"
              >
                {page.name}
              </Link>
            ))}

            <div className="relative group">
              <button className="hover:text-blue-400 transition">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-neutral-900 border border-neutral-700 rounded shadow-sm opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50">
                {navigation.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="block px-4 py-2 text-sm text-white hover:bg-neutral-800"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <input
                type="text"
                placeholder="Search..."
                className="text-sm px-3 py-1.5 border border-neutral-700 rounded bg-neutral-900 text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <Link to="/cart" className="relative">
              <ShoppingBagIcon className="h-6 w-6 text-white hover:text-blue-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden lg:flex items-center">
              <UserAuthActions user={user} logout={logout} />
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2"
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
        navigation={navigation}
        user={user}
        logout={logout}
      />
    </>
  );
}
