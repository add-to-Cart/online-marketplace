const navigation = {
  categories: [
    {
      id: "motorcycle",
      name: "Motorcycle Parts & Gear",
      featured: [
        {
          name: "Sport Commuter Builds",
          href: "/styles/sport-commuter",
          imageSrc: "/assets/builds/sport.jpg",
          imageAlt: "Sporty yet practical motorcycles",
        },
        {
          name: "Adventure Setups",
          href: "/styles/adventure",
          imageSrc: "/assets/builds/adventure.jpg",
          imageAlt: "Adventure and dual-sport motorcycles",
        },
      ],
      sections: [
        {
          name: "Bike Upgrades",
          items: [
            { name: "Rims & Tires", href: "/category/rims-tires" },
            { name: "Suspension", href: "/category/suspension" },
            { name: "Brakes & Levers", href: "/category/brakes" },
            { name: "Lights & Indicators", href: "/category/lights" },
          ],
        },
        {
          name: "Rider Gear",
          items: [
            { name: "Helmets", href: "/category/helmets" },
            { name: "Gloves", href: "/category/gloves" },
            { name: "Jackets", href: "/category/jackets" },
            { name: "Boots", href: "/category/boots" },
          ],
        },
        {
          name: "Accessories",
          items: [
            { name: "Phone Mounts", href: "/category/phone-mounts" },
            { name: "Dash Cams", href: "/category/dashcams" },
            { name: "Security Systems", href: "/category/alarms" },
          ],
        },
      ],
    },
    {
      id: "car",
      name: "Car Parts & Accessories",
      featured: [
        {
          name: "Commuter Mods",
          href: "/styles/commuter-mods",
          imageSrc: "/assets/builds/car.jpg",
          imageAlt: "Affordable and efficient upgrades",
        },
        {
          name: "Comfort Builds",
          href: "/styles/comfort-upgrades",
          imageSrc: "/assets/builds/interior.jpg",
          imageAlt: "Interior accessories for comfort",
        },
      ],
      sections: [
        {
          name: "Exterior Upgrades",
          items: [
            { name: "Tires & Rims", href: "/category/car-rims" },
            { name: "Body Kits", href: "/category/body-kits" },
            { name: "Lighting", href: "/category/car-lights" },
          ],
        },
        {
          name: "Interior Enhancements",
          items: [
            { name: "Seat Covers", href: "/category/seat-covers" },
            { name: "Steering Covers", href: "/category/steering" },
            { name: "Organizers", href: "/category/organizers" },
          ],
        },
        {
          name: "Tech & Accessories",
          items: [
            { name: "Dashcams", href: "/category/dashcams" },
            { name: "Car Sensors", href: "/category/sensors" },
            { name: "Security Devices", href: "/category/security" },
          ],
        },
      ],
    },
    {
      id: "styles",
      name: "Shop by Style",
      featured: [],
      sections: [
        {
          name: "Build Styles",
          items: [
            { name: "Sporty Commuter", href: "/styles/sport-commuter" },
            { name: "Classic Look", href: "/styles/classic" },
            { name: "Adventure Touring", href: "/styles/adventure" },
            { name: "OEM+", href: "/styles/oem-plus" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Trending", href: "/trending" },
    { name: "New Arrivals", href: "/new" },
    { name: "Brands", href: "/brands" },
    { name: "Deals", href: "/deals" },
  ],
};

export default navigation;
