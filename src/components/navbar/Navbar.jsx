import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
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

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [banner, setBanner] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <header className="relative bg-stone-900">
        {/* Top promotional banner */}
        {banner ? (
          <p className="bg-purple-800 flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Holiday Sale!
          </p>
        ) : (
          ""
        )}

        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="py-2">
            {" "}
            {/* Added padding for separation */}
            {/* First Row: Logo, Search, Auth, Cart (visible on all screens, but layout changes) */}
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button (visible on small screens) */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-500"
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </button>

              {/* Logo */}
              <Link to="/" className="ml-4 flex lg:ml-0 flex-shrink-0">
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company Logo"
                  className="h-8 w-auto"
                />
              </Link>

              {/* User Auth Actions and Cart Icon (right-aligned) */}
              <div className="flex items-center ml-auto gap-x-6">
                {" "}
                {/* Desktop Search Bar (hidden on small screens, visible on large) */}
                <div className="hidden lg:block relative flex-grow max-w-md mx-8">
                  {" "}
                  {/* Added flex-grow and mx-8 for centering */}
                  <MagnifyingGlassIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-50"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Search parts..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-50 rounded-md text-gray-50 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {/* Adjusted gap-x */}
                {/* User Auth Actions (hidden on small, visible on large) */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                  <UserAuthActions user={user} logout={handleLogout} />
                </div>
                {/* Cart Icon */}
                <Link
                  to="/cart"
                  className="p-2 -mr-2  text-gray-50 hover:text-gray-400"
                >
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Items in cart</span>
                </Link>
              </div>
            </div>
            {/* Second Row: Desktop Navigation (hidden on small screens, visible on large) */}
            <div className="hidden lg:flex lg:justify-center lg:mt-2 lg:py-2">
              {" "}
              {/* Added mt-4, py-2 and border-t */}
              <DesktopNav navigation={navigation} />
            </div>
            {/* Mobile Search Bar (visible on small screens only) */}
            <div className="lg:hidden relative mt-4">
              {" "}
              {/* Added mt-4 for spacing */}
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search parts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
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
