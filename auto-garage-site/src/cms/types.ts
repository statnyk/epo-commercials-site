export interface SiteSettings {
  name: string;
  tagline: string;
  phone: string;
  whatsapp?: string;
  email: string;
  address: string;
  eircode?: string;
  openingHours: string[];
}

export type ServiceCategory =
  | "NCT & Tests"
  | "Diagnostics"
  | "Servicing"
  | "Tyres & Brakes"
  | "Air Conditioning"
  | "Other";

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  category: ServiceCategory;
  priceFrom?: number;
  durationMinutes?: number;
  isFeatured?: boolean;
}

export type PartCategory =
  | "Engine"
  | "Suspension"
  | "Body & Lights"
  | "Electrics"
  | "Interior"
  | "Other";

export type PartCondition = "New" | "Used – Grade A" | "Used – Grade B" | "Reconditioned";

export interface Part {
  id: string;
  title: string;
  slug: string;
  category: PartCategory;
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  engineSize?: string;
  fuelType?: "Petrol" | "Diesel" | "Hybrid" | "Electric" | "Other";
  condition: PartCondition;
  price: number;
  currency: "EUR";
  inStock: boolean;
  location: string;
  delivery: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export type PageBlockType = "richText" | "image" | "list";

export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string;
}

export interface Page {
  id: string;
  slug: "home" | "about" | "services" | "parts" | "contact" | (string & {});
  title: string;
  blocks: PageBlock[];
}

