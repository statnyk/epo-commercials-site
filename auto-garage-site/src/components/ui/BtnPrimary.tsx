import { useState } from "react";
import { T } from "../../theme.ts";

export default function BtnPrimary({ href, children, size = "md" }: { href: string; children: React.ReactNode; size?: "sm" | "md" | "lg" }) {
  const pad = size === "lg" ? "15px 32px" : size === "sm" ? "8px 18px" : "11px 24px";
  const fs  = size === "lg" ? "16px" : size === "sm" ? "13px" : "14px";
  const minW = size === "lg" ? "240px" : undefined;
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: hov ? T.primaryDark : T.primary, color: "#fff", fontWeight: 700, fontSize: fs, padding: pad, border: "2px solid transparent", borderRadius: T.radius, textDecoration: "none", transition: "background 0.18s, border-color 0.18s", boxShadow: T.shadowMd, minWidth: minW, boxSizing: "border-box" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  );
}
