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
  icon: "breakdown" | "cvrt" | "diagnostics" | "electrical" | "bus" | "truck" | "alignment";
  highlight?: boolean;
  redCard?: boolean;
  bullets?: string[];
}

export interface Part {
  id: string;
  name: string;
  price: number | null;
  image_url: string;
  created_at: string;
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
    id: "alignment",
    title: "Alignment for Buses and HGV",
    description:
      "Professional wheel alignment services for buses and heavy goods vehicles. Precision laser alignment to reduce tyre wear, improve fuel efficiency and ensure safe handling.",
    icon: "alignment",
    redCard: true,
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

import { supabase } from "../lib/supabase";

export async function fetchParts(): Promise<Part[]> {
  const { data, error } = await supabase
    .from("parts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addPart(part: {
  name: string;
  price: number | null;
  image_url: string;
}): Promise<Part> {
  const { data, error } = await supabase
    .from("parts")
    .insert(part)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePart(
  id: string,
  updates: Partial<Pick<Part, "name" | "price" | "image_url">>,
): Promise<Part> {
  const { data, error } = await supabase
    .from("parts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePart(id: string): Promise<void> {
  const { error } = await supabase.from("parts").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadPartImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from("parts-images")
    .upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("parts-images").getPublicUrl(path);
  return data.publicUrl;
}
