import { useState } from "react";
import { T } from "../../theme.ts";

export default function NavLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ color: hov ? T.primary : T.textSub, fontWeight: 500, fontSize: "14px", textDecoration: "none", padding: "6px 12px", borderRadius: "6px", background: hov ? T.primaryLight : "transparent", transition: "all 0.15s" }}>
      {label}
    </a>
  );
}
