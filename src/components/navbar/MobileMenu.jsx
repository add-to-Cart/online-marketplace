import { Dialog, DialogPanel } from "@headlessui/react";
import {
  XMarkIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function MobileMenu({
  open,
  setOpen,
  navigation,
  user,
  logout,
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex z-50">
        <DialogPanel className="relative flex w-full max-w-xs flex-col bg-white text-gray-900 shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-base font-semibold">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Search and Cart */}
          <div className="px-4 py-2 flex items-center gap-3">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute h-4 w-4 text-gray-400 left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search parts, builds..."
                className="w-full pl-8 pr-3 py-1.5 rounded-md border text-sm"
              />
            </div>
            <Link to="/cart" className="p-2 text-gray-500 hover:text-gray-700">
              <ShoppingBagIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Category-focused navigation only */}
          <div className="px-4 py-4 space-y-2">
            {navigation.categories.map((category) => (
              <Link
                key={category.id}
                to={category.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-gray-800 hover:text-indigo-600"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Secondary links relevant to your store */}
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/market"
              onClick={() => setOpen(false)}
              className="block text-sm hover:text-indigo-600"
            >
              Market
            </Link>
            <Link
              to="/trending"
              onClick={() => setOpen(false)}
              className="block text-sm hover:text-indigo-600"
            >
              Trending Builds
            </Link>
            <Link
              to="/deals"
              onClick={() => setOpen(false)}
              className="block text-sm hover:text-indigo-600"
            >
              Deals
            </Link>
            <Link
              to="/brands"
              onClick={() => setOpen(false)}
              className="block text-sm hover:text-indigo-600"
            >
              Brands
            </Link>
          </div>

          {/* User actions */}
          <div className="px-4 py-4 text-sm space-y-2">
            {user ? (
              <>
                <span className="block text-gray-700">Hi, {user.email}</span>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full text-left hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block hover:text-indigo-600"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block hover:text-indigo-600"
                  onClick={() => setOpen(false)}
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
