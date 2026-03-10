import { useState } from "react";
import { T } from "../../theme.ts";

export default function BtnOutline({ href, children, size = "md" }: { href: string; children: React.ReactNode; size?: "sm" | "md" | "lg" }) {
  const pad = size === "lg" ? "15px 32px" : size === "sm" ? "8px 18px" : "11px 24px";
  const fs  = size === "lg" ? "16px" : size === "sm" ? "13px" : "14px";
  const minW = size === "lg" ? "240px" : undefined;
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", border: `2px solid ${hov ? T.primaryDark : T.primary}`, color: hov ? "#fff" : T.primary, background: hov ? T.primary : "transparent", fontWeight: 700, fontSize: fs, padding: pad, borderRadius: T.radius, textDecoration: "none", transition: "all 0.18s", minWidth: minW, boxSizing: "border-box" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  );
}
