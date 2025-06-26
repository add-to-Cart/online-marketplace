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
    <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-10">
        {navigation.categories.map((category) => (
          <Popover key={category.id} className="relative">
            <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-xs font-medium text-gray-50 hover:text-indigo-400 data-open:border-indigo-600 data-open:text-indigo-600 transition-colors">
              {category.name}
            </PopoverButton>

            <PopoverPanel className="absolute inset-x-0 top-full bg-white text-gray-900 shadow-lg z-20">
              <div className="mx-auto max-w-7xl px-8 py-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                    {category.featured?.map((item) => (
                      <div key={item.name} className="group relative text-base">
                        <img
                          src={item.imageSrc || "/fallback.png"}
                          alt={item.imageAlt || item.name}
                          className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-80 transition"
                          loading="lazy"
                        />
                        <Link
                          to={item.href}
                          className="mt-4 block font-medium text-gray-900 hover:text-indigo-600 transition"
                        >
                          <span
                            className="absolute inset-0 z-10"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">Shop now</p>
                      </div>
                    ))}
                  </div>

                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                    {category.sections?.map((section) => (
                      <div key={section.id}>
                        <p className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul className="mt-6 space-y-4">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className="hover:text-indigo-600 transition"
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

        {trendingPage && (
          <Link
            to={trendingPage.href}
            className="flex items-center text-xs font-semibold text-yellow-300 hover:text-yellow-400 underline underline-offset-4 transition"
          >
            {trendingPage.name}
          </Link>
        )}

        {otherPages.map((page) => (
          <Link
            key={page.name}
            to={page.href}
            className="flex items-center text-xs font-medium text-gray-50 hover:text-gray-300 transition"
          >
            {page.name}
          </Link>
        ))}
      </div>
    </PopoverGroup>
  );
}
