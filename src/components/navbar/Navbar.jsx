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
import { useUser } from "@/contexts/UserContext";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [banner, setBanner] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (_) {}
  };

  return (
    <header className="bg-stone-900 text-white text-sm shadow-md">
      {banner && (
        <p className="bg-purple-800 h-8 flex items-center justify-center px-4 font-medium">
          Holiday Sale!
        </p>
      )}

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-10">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-300"
            aria-label="Open menu"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          {!loading && (
            <div className="hidden lg:flex items-center gap-x-4">
              <UserAuthActions user={user} logout={handleLogout} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-2 gap-2 flex-wrap">
          <Link to="/" className="flex-shrink-0">
            <img
              src="logo.png"
              alt="CarCycleTech"
              className="h-16 w-auto object-contain"
            />
          </Link>

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

          <Link to="/cart" className="p-2 text-gray-50 hover:text-gray-400">
            <ShoppingBagIcon className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>
        </div>

        <div className="hidden lg:flex justify-center py-2">
          <DesktopNav navigation={navigation} />
        </div>

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

      <MobileMenu
        open={open}
        setOpen={setOpen}
        navigation={navigation}
        user={user}
        logout={handleLogout}
      />
    </header>
  );
}
