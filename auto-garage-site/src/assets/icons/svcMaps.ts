import type React from "react";
import IcoTruck from "./Truck.tsx";
import IcoClip from "./Clip.tsx";
import IcoCpu from "./Cpu.tsx";
import IcoZap from "./Zap.tsx";
import IcoCrosshair from "./Crosshair.tsx";
import { T } from "../../theme.ts";

export const svcIconMap: Record<string, () => React.ReactElement> = {
  breakdown: IcoTruck,
  cvrt: IcoClip,
  diagnostics: IcoCpu,
  electrical: IcoZap,
  bus: IcoTruck,
  truck: IcoTruck,
  alignment: IcoCrosshair,
};

export const svcColorMap: Record<string, string> = {
  breakdown: T.primary,
  cvrt: "#0ea5e9",
  diagnostics: "#6366f1",
  electrical: "#f97316",
  bus: "#10b981",
  truck: "#f59e0b",
  alignment: "#ef4444",
};
