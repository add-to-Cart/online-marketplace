import {
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Disclosure,
} from "@headlessui/react";
import {
  XMarkIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
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
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white text-gray-900 pb-6 shadow-xl">
          <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-200">
            <h2 className="text-sm font-semibold">Menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 py-2 flex items-center gap-3 border-b border-gray-100">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 rounded-md border border-gray-300 text-sm"
              />
            </div>
            <Link
              to="/cart"
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Cart"
            >
              <ShoppingBagIcon className="h-5 w-5" />
            </Link>
          </div>

          <TabGroup>
            <div className="border-b border-gray-100">
              <TabList className="flex overflow-x-auto px-4 space-x-4 text-sm no-scrollbar">
                {navigation.categories.map((category) => (
                  <Tab
                    key={category.name}
                    className="shrink-0 py-2 border-b-2 border-transparent hover:text-indigo-600 data-selected:border-indigo-600 data-selected:text-indigo-600"
                  >
                    {category.name}
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels as={Fragment}>
              {navigation.categories.map((category) => (
                <TabPanel
                  key={category.name}
                  className="px-4 pt-4 pb-6 space-y-3"
                >
                  {category.featured.map((item) => (
                    <Disclosure key={item.name}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between items-center px-3 py-2 bg-gray-100 rounded-md">
                            <span>{item.name}</span>
                            <ChevronUpIcon
                              className={`h-4 w-4 transition-transform ${
                                open ? "rotate-180" : ""
                              }`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-3 pt-2 pb-3 text-sm text-gray-600">
                            <img
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              className="rounded-lg object-cover aspect-square w-full mb-2"
                            />
                            <Link
                              to={item.href}
                              className="text-indigo-600 font-medium"
                            >
                              Shop now →
                            </Link>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          <div className="mt-2 border-t border-gray-100 px-4 py-4">
            <h3 className="text-sm font-semibold mb-2">🔥 Trending Now</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link
                  to="/trending/engine-parts"
                  className="hover:text-indigo-600"
                >
                  High Performance Engine Parts
                </Link>
              </li>
              <li>
                <Link
                  to="/trending/thai-style"
                  className="hover:text-indigo-600"
                >
                  Thai Style Mod Kits
                </Link>
              </li>
              <li>
                <Link
                  to="/trending/led-lights"
                  className="hover:text-indigo-600"
                >
                  LED Light Strips
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-100 px-4 py-4 space-y-3">
            {navigation.pages.map((page) => (
              <Link
                key={page.name}
                to={page.href}
                className="block text-sm hover:text-indigo-600"
              >
                {page.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 px-4 py-4 space-y-2 text-sm">
            {user ? (
              <>
                <span className="block text-gray-700">Hi, {user.email}</span>
                <button
                  onClick={logout}
                  className="w-full text-left text-gray-700 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-indigo-600">
                  Sign in
                </Link>
                <Link to="/signup" className="block hover:text-indigo-600">
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
