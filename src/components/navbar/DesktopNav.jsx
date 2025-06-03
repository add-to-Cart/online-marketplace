"use client";

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Link } from "react-router-dom";

export default function DesktopNav({ navigation }) {
  const trendingPage = navigation.pages.find(
    (page) => page.name === "Trending"
  );
  const otherPages = navigation.pages.filter(
    (page) => page.name !== "Trending"
  );

  return (
    // Increased space-x for more separation between main nav items
    <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-10">
        {" "}
        {/* Increased space-x from 8 to 10 */}
        {/* Categories Popovers */}
        {navigation.categories.map((category) => (
          <Popover key={category.name} className="flex">
            <div className="relative flex">
              <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-xs font-medium text-gray-50 hover:text-gray-400 data-open:border-indigo-600 data-open:text-indigo-600">
                {category.name}
              </PopoverButton>
            </div>

            <PopoverPanel className="absolute inset-x-0 top-full bg-white shadow-sm">
              <div className="mx-auto max-w-7xl px-8 py-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                    {category.featured.map((item) => (
                      <div key={item.name} className="group relative text-base">
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
                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul className="mt-6 space-y-4">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className="hover:text-gray-800"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
        ))}
        {/* Prominent "Trending" link */}
        {trendingPage && (
          <Link
            to={trendingPage.href}
            className="flex items-center text-xs font-semibold text-yellow-300 hover:text-yellow-400 underline underline-offset-4"
          >
            {trendingPage.name}
          </Link>
        )}
        {/* Other static pages */}
        {otherPages.map((page) => (
          <Link
            key={page.name}
            to={page.href}
            className="flex items-center text-xs font-medium text-gray-50 hover:text-gray-400"
          >
            {page.name}
          </Link>
        ))}
      </div>
    </PopoverGroup>
  );
}
