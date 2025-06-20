import { useEffect, useState } from "react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";
import UserAuthActions from "./UserAuthActions";
import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";
import navigation from "@/data/navigationData";
import { useUser } from "@/contexts/UserContext";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [banner, setBanner] = useState(false);

  useEffect(() => {});

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <header className="relative bg-stone-900 text-white text-sm">
        {/* Top banner */}
        {banner && (
          <p className="bg-purple-800 flex h-8 items-center justify-center px-4 font-medium">
            Holiday Sale!
          </p>
        )}

        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          {/* Row 1: Auth actions / Mobile menu */}
          <div className="flex items-center justify-end h-10">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-500"
            >
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
            <div className="hidden lg:flex items-center gap-x-4">
              {loading ? null : (
                <UserAuthActions user={user} logout={handleLogout} />
              )}
            </div>
          </div>

          {/* Row 2: Logo + Search + Cart */}
          <div className="flex items-center justify-between py-2 gap-2 flex-wrap">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Logo"
                className="h-7 w-auto"
              />
            </Link>

            {/* Search bar (desktop only) */}
            <div className="hidden lg:block relative flex-grow max-w-xl mx-4">
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-50"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search parts..."
                className="w-full pl-9 pr-3 py-1.5 border border-gray-600 rounded-md bg-stone-800 text-gray-100 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Cart icon */}
            <Link to="/cart" className="p-2 text-gray-50 hover:text-gray-400">
              <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Items in cart</span>
            </Link>
          </div>

          {/* Row 3: Desktop nav */}
          <div className="hidden lg:flex justify-center py-2">
            <DesktopNav navigation={navigation} />
          </div>

          {/* Mobile search */}
          <div className="lg:hidden relative mt-2 mb-2">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search parts..."
              className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        open={open}
        setOpen={setOpen}
        navigation={navigation}
        user={user}
        logout={handleLogout}
      />
    </div>
  );
}
