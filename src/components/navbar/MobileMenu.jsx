"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  XMarkIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({
  open,
  setOpen,
  navigation,
  user,
  logout,
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
      <DialogBackdrop className="fixed inset-0 bg-black/25" />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
          {/* Close button and optional header for mobile menu */}
          <div className="flex px-4 pt-5 pb-2 justify-between items-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
            <h2 className="text-lg font-medium text-gray-900">Menu</h2>
          </div>

          {/* Search and Cart for Mobile */}
          {/* Increased horizontal padding for more breathing room */}
          <div className="border-b border-gray-200 px-6 py-4 flex items-center space-x-4">
            {" "}
            {/* Changed px-4 to px-6 */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <Link to="/cart" className="p-2 text-gray-400 hover:text-gray-500">
              <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">View cart</span>
            </Link>
          </div>

          {/* Category Tabs */}
          {/* Increased horizontal padding for tabs */}
          <TabGroup>
            <div className="border-b border-gray-200">
              <TabList className="flex overflow-x-auto no-scrollbar space-x-6 px-6">
                {navigation.categories.map((category) => (
                  <Tab
                    key={category.name}
                    className="shrink-0 whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 data-selected:border-indigo-600 data-selected:text-indigo-600"
                  >
                    {category.name}
                  </Tab>
                ))}
              </TabList>
            </div>
            {/* Increased horizontal padding for tab panels */}
            <TabPanels as={Fragment}>
              {navigation.categories.map((category) => (
                <TabPanel
                  key={category.name}
                  className="space-y-10 px-6 pt-10 pb-8"
                >
                  <div className="grid grid-cols-2 gap-x-4">
                    {category.featured.map((item) => (
                      <div key={item.name} className="group relative text-sm">
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                        />
                        <Link
                          to={item.href}
                          className="mt-6 block font-medium text-gray-900"
                        >
                          <span className="absolute inset-0 z-10" />
                          {item.name}
                        </Link>
                        <p className="mt-1">Shop now</p>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Static pages including "Trending" */}
          {/* Increased horizontal padding */}
          <div className="border-t border-gray-200 px-6 py-6 space-y-6">
            {" "}
            {/* Changed px-4 to px-6 */}
            {navigation.pages.map((page) => (
              <div key={page.name}>
                <Link
                  to={page.href}
                  className="block text-base font-medium text-gray-900"
                >
                  {page.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Auth actions */}
          {/* Increased horizontal padding */}
          <div className="px-6 py-6 border-t border-gray-200 space-y-2">
            {" "}
            {/* Changed px-4 to px-6 */}
            {user ? (
              <>
                <span className="text-sm text-gray-700">Hi, {user.email}</span>
                <button
                  onClick={logout}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block text-sm font-medium text-gray-700 hover:text-gray-800"
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
