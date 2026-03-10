import { useState } from "react";

export default function NavLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ color: "#fff", fontWeight: 600, fontSize: "15px", textDecoration: "none", padding: "6px 12px", borderRadius: "6px", background: hov ? "rgba(255,255,255,0.12)" : "transparent", transition: "all 0.15s" }}>
      {label}
    </a>
  );
}
