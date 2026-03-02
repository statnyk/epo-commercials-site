import type { Page, Part, Service, SiteSettings } from "./types";

export const siteSettings: SiteSettings = {
  name: "Dublin Auto & Parts",
  tagline: "Independent garage & quality used parts in Dublin 8",
  phone: "+353 1 555 1234",
  whatsapp: "+353 85 123 4567",
  email: "info@dublinauto.ie",
  address: "Unit 3, Kilmainham Industrial Estate, Dublin 8",
  eircode: "D08 AB12",
  openingHours: [
    "Mon–Fri: 08:30–18:00",
    "Sat: 09:00–14:00",
    "Sun & Bank Holidays: Closed",
  ],
};

export const services: Service[] = [
  {
    id: "nct-prep",
    slug: "nct-prep",
    title: "NCT Pre-Test & Repairs",
    shortDescription: "Full inspection and repairs to help your car pass first time.",
    longDescription:
      "We check brakes, suspension, emissions and lights before your NCT appointment and can complete most repairs on-site the same day.",
    category: "NCT & Tests",
    priceFrom: 80,
    durationMinutes: 90,
    isFeatured: true,
  },
  {
    id: "diagnostics",
    slug: "diagnostics",
    title: "Computer Diagnostics",
    shortDescription: "Engine management, ABS, airbag and electrical fault finding.",
    category: "Diagnostics",
    priceFrom: 50,
    durationMinutes: 45,
    isFeatured: true,
  },
  {
    id: "servicing",
    slug: "servicing",
    title: "Interim & Full Service",
    shortDescription: "Service packages for petrol and diesel cars and light vans.",
    category: "Servicing",
    priceFrom: 160,
    durationMinutes: 120,
  },
  {
    id: "tyres-brakes",
    slug: "tyres-brakes",
    title: "Tyres, Brakes & Steering",
    shortDescription: "Replacement tyres, brake pads/discs and steering components.",
    category: "Tyres & Brakes",
    priceFrom: 60,
    durationMinutes: 60,
  },
  {
    id: "aircon",
    slug: "aircon",
    title: "Air Conditioning Service",
    shortDescription: "Re-gas, leak test and cabin filter replacement.",
    category: "Air Conditioning",
    priceFrom: 90,
    durationMinutes: 60,
  },
];

export const parts: Part[] = [
  {
    id: "vw-golf-7-headlamp",
    slug: "vw-golf-7-headlamp-right",
    title: "VW Golf Mk7 Headlamp (Right)",
    make: "Volkswagen",
    model: "Golf",
    yearFrom: 2013,
    yearTo: 2017,
    category: "Body & Lights",
    condition: "Used – Grade A",
    price: 140,
    currency: "EUR",
    inStock: true,
    location: "Dublin 8",
    delivery: "Collection or nationwide courier",
    imageUrl: "/images/parts/golf-headlamp.jpg",
    isFeatured: true,
  },
  {
    id: "ford-focus-tdci-turbo",
    slug: "ford-focus-1-5-tdci-turbo",
    title: "Ford Focus 1.5 TDCi Turbocharger",
    make: "Ford",
    model: "Focus",
    yearFrom: 2015,
    yearTo: 2018,
    category: "Engine",
    condition: "Reconditioned",
    price: 420,
    currency: "EUR",
    inStock: true,
    location: "Dublin 8",
    delivery: "Courier only",
    imageUrl: "/images/parts/focus-turbo.jpg",
    isFeatured: false,
  },
  {
    id: "toyota-corolla-door",
    slug: "toyota-corolla-front-left-door",
    title: "Toyota Corolla Front Left Door (White)",
    make: "Toyota",
    model: "Corolla",
    yearFrom: 2014,
    yearTo: 2019,
    category: "Body & Lights",
    condition: "Used – Grade B",
    price: 220,
    currency: "EUR",
    inStock: false,
    location: "On order",
    delivery: "Please call for availability",
    imageUrl: "/images/parts/corolla-door.jpg",
  },
];

export const pages: Page[] = [
  {
    id: "home",
    slug: "home",
    title: "Home",
    blocks: [
      {
        id: "home-intro",
        type: "richText",
        content:
          "Independent Irish-owned garage specialising in NCT preparation, diagnostics and quality used parts for most popular makes and models.",
      },
    ],
  },
  {
    id: "about",
    slug: "about",
    title: "About the garage",
    blocks: [
      {
        id: "about-main",
        type: "richText",
        content:
          "Based in Dublin 8, our mechanics have over 15 years of main dealer and independent workshop experience. We focus on clear communication, honest pricing and getting you back on the road quickly.",
      },
    ],
  },
  {
    id: "contact",
    slug: "contact",
    title: "Contact & booking",
    blocks: [
      {
        id: "contact-note",
        type: "richText",
        content:
          "We take bookings by phone only so we can confirm availability, parts and timing for your vehicle. Please have your registration number ready when you call.",
      },
    ],
  },
];

