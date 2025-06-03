const navigation = {
  categories: [
    {
      id: "motorcycle",
      name: "Motorcycle Parts & Gear",
      featured: [
        {
          name: "Performance Builds",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt: "Performance motorcycle parts and gear",
        },
        {
          name: "Style-Based Builds",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt: "Thai and Indonesian style builds",
        },
      ],
      sections: [
        {
          id: "parts",
          name: "Build Your Bike",
          items: [
            { name: "Exhaust Systems", href: "#" },
            { name: "Suspension Kits", href: "#" },
            { name: "Body Kits", href: "#" },
            { name: "Lighting Upgrades", href: "#" },
          ],
        },
        {
          id: "gear",
          name: "Ride-Ready Gear",
          items: [
            { name: "Helmets", href: "#" },
            { name: "Jackets & Gloves", href: "#" },
            { name: "Riding Boots", href: "#" },
            { name: "Protective Armor", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Smart Accessories",
          items: [
            { name: "Phone Mounts", href: "#" },
            { name: "Dash Cams", href: "#" },
            { name: "GPS & Alarms", href: "#" },
            { name: "Underlights", href: "#" },
          ],
        },
      ],
    },
    {
      id: "car",
      name: "Car Parts & Accessories",
      featured: [
        {
          name: "Trending Car Mods",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt: "Popular car upgrades and modifications",
        },
        {
          name: "Top Brands",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt: "Popular car part brands",
        },
      ],
      sections: [
        {
          id: "parts",
          name: "Performance & Styling",
          items: [
            { name: "Air Intakes", href: "#" },
            { name: "Suspension Kits", href: "#" },
            { name: "Exterior Mods", href: "#" },
            { name: "Lighting Kits", href: "#" },
          ],
        },
        {
          id: "interior",
          name: "Interior Accessories",
          items: [
            { name: "Steering Wheels", href: "#" },
            { name: "Seat Covers", href: "#" },
            { name: "Shift Knobs", href: "#" },
            { name: "Ambient Lights", href: "#" },
          ],
        },
        {
          id: "tech",
          name: "Smart Accessories",
          items: [
            { name: "Dash Cams", href: "#" },
            { name: "GPS & Sensors", href: "#" },
            { name: "OBD Devices", href: "#" },
            { name: "Security Systems", href: "#" },
          ],
        },
      ],
    },
    {
      id: "style",
      name: "Shop by Style",
      featured: [],
      sections: [
        {
          id: "styles",
          name: "Popular Builds",
          items: [
            { name: "Thai Concept", href: "#" },
            { name: "Indonesian Style", href: "#" },
            { name: "Lowered Look", href: "#" },
            { name: "Track Setup", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Trending", href: "#" },
    { name: "New Arrivals", href: "#" },
    { name: "Brands", href: "#" },
    { name: "Deals", href: "#" },
  ],
};

export default navigation;
