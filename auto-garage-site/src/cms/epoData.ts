export interface EpoSettings {
  company: string;
  tagline: string;
  phone: string;
  phoneAlt?: string;
  phoneAccounts?: string;
  email: string;
  emailParts?: string;
  emailAccounts?: string;
  address: string;
  eircode?: string;
}

export interface WorkingHours {
  label: string;
  hours: string;
  is247?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "breakdown" | "cvrt" | "diagnostics" | "electrical" | "bus" | "truck";
  highlight?: boolean;
  bullets?: string[];
}

export interface Part {
  id: string;
  name: string;
  price: number | null;
  imageUrl: string;
  addedAt: number;
}

export const epoSettings: EpoSettings = {
  company: "EPO Commercials",
  tagline: "Bus & Heavy-Duty Vehicle Repair Specialists",
  phone: "+353 87 721 0448",
  phoneAlt: "+353 87 666 6693",
  phoneAccounts: "0851788303",
  email: "info@epocommercials.ie",
  emailParts: "parts@epocommercials.ie",
  emailAccounts: "accounts@epocommercials.ie",
  address: "Dublin, Ireland",
};

export const workingHours: WorkingHours[] = [
  { label: "Monday – Friday", hours: "08:00 – 18:00" },
  { label: "Saturday", hours: "08:00 – 14:00" },
  { label: "Breakdown Assistance", hours: "24 / 7", is247: true },
];

export const services: Service[] = [
  {
    id: "breakdown",
    title: "Breakdown Assistance 24/7",
    description:
      "Round-the-clock emergency recovery and roadside repair for buses, trucks and trailers. We come to you — day or night.",
    icon: "breakdown",
    highlight: true,
  },
  {
    id: "cvrt",
    title: "CVRT Preparation",
    description:
      "Full pre-test inspection and on-the-spot rectification to help your commercial vehicle pass the CVRT first time.",
    icon: "cvrt",
  },
  {
    id: "diagnostics",
    title: "Computer Diagnostics",
    description:
      "Advanced diagnostics for engine management, ABS, EBS, transmission and body electronics on all heavy-duty platforms.",
    icon: "diagnostics",
  },
  {
    id: "electrical",
    title: "Electrical & Mechanical Repair",
    description:
      "Full electrical and mechanical repair services for buses, HGVs, LCVs, trailers and refuse trucks carried out by qualified technicians.",
    icon: "electrical",
  },
  {
    id: "bus",
    title: "Bus Repair & Maintenance",
    description: "",
    icon: "bus",
    bullets: [
      "Full diagnostics and fault finding",
      "Electrical system repairs",
      "Engine and gearbox repairs",
      "Brake systems",
      "Suspension and steering",
      "Preventative maintenance programs",
      "Pre-CVRT inspections",
    ],
  },
  {
    id: "truck",
    title: "Truck & Heavy-Duty Vehicle Services",
    description: "",
    icon: "truck",
    bullets: [
      "Engine diagnostics and overhaul",
      "Electrical and electronic systems",
      "Transmission and drivetrain",
      "Air brake systems",
      "Suspension repairs",
      "Fleet servicing contracts",
      "24/7 emergency roadside breakdown repairs",
    ],
  },
];

export const PARTS_STORAGE_KEY = "epo_parts_v1";

export function loadParts(): Part[] {
  try {
    const raw = localStorage.getItem(PARTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Part[]) : defaultParts;
  } catch {
    return defaultParts;
  }
}

export function saveParts(parts: Part[]): void {
  localStorage.setItem(PARTS_STORAGE_KEY, JSON.stringify(parts));
}

const defaultParts: Part[] = [
  {
    id: "demo-1",
    name: "Volvo FH Air Dryer",
    price: 280,
    imageUrl: "",
    addedAt: Date.now() - 86400000,
  },
  {
    id: "demo-2",
    name: "Mercedes Actros Starter Motor",
    price: 450,
    imageUrl: "",
    addedAt: Date.now() - 172800000,
  },
  {
    id: "demo-3",
    name: "DAF XF Turbocharger (Reconditioned)",
    price: 890,
    imageUrl: "",
    addedAt: Date.now() - 259200000,
  },
];
