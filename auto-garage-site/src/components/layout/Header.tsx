import { useState, useEffect } from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop.ts";
import { T, container } from "../../theme.ts";
import { epoSettings } from "../../cms/epoData.ts";
import BtnPrimary from "../ui/BtnPrimary.tsx";
import BtnOutline from "../ui/BtnOutline.tsx";
import NavLink from "../ui/NavLink.tsx";
import { IcoPhone, IcoMenu, IcoX } from "../../assets/icons/index.ts";
import logoInverse from "../../assets/logo/epo_2.svg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  useEffect(() => { if (isDesktop) setOpen(false); }, [isDesktop]);

  const navLinks = [
    { href: "#about",    label: "About"    },
    { href: "#services", label: "Services" },
    { href: "#hours",    label: "Hours"    },
    { href: "#parts",    label: "Parts"    },
    { href: "#contact",  label: "Contact"  },
  ];

  return (
    <>
    <a
      href="#main-content"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        zIndex: 200,
        background: T.primary,
        color: "#fff",
        fontWeight: 700,
        fontSize: "14px",
        padding: "12px 24px",
        borderRadius: "0 0 8px 0",
        textDecoration: "none",
      }}
      onFocus={(e) => {
        e.currentTarget.style.position = "fixed";
        e.currentTarget.style.left = "0";
        e.currentTarget.style.top = "0";
        e.currentTarget.style.width = "auto";
        e.currentTarget.style.height = "auto";
      }}
      onBlur={(e) => {
        e.currentTarget.style.position = "absolute";
        e.currentTarget.style.left = "-9999px";
        e.currentTarget.style.width = "1px";
        e.currentTarget.style.height = "1px";
      }}
    >
      Skip to main content
    </a>
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: T.bgWhite, borderBottom: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ ...container, height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img
            src={logoInverse}
            alt="EPO Commercials logo"
            style={{ height: "34px", width: "auto", display: "block" }}
          />
        </a>

        {/* Desktop nav */}
        {isDesktop && (
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navLinks.map((l) => <NavLink key={l.href} href={l.href} label={l.label} />)}
            <div style={{ marginLeft: "12px", display: "flex", gap: "8px", alignItems: "center", paddingLeft: "16px", borderLeft: `1px solid ${T.border}` }}>
              <a href={`tel:${epoSettings.phone}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: T.accent, fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
                <IcoPhone />{epoSettings.phone}
              </a>
              <BtnPrimary href={`tel:${epoSettings.phone}`} size="sm">Call Now</BtnPrimary>
            </div>
          </nav>
        )}

        {/* Mobile hamburger */}
        {!isDesktop && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href={`tel:${epoSettings.phone}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: T.accent, fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
              <IcoPhone />
            </a>
            <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} style={{ background: "none", border: `1px solid ${T.border}`, cursor: "pointer", color: T.textSub, padding: "6px 8px", display: "flex", borderRadius: "6px" }}>
              {open ? <IcoX /> : <IcoMenu />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {!isDesktop && open && (
        <div style={{ background: T.bgWhite, borderTop: `1px solid ${T.border}`, padding: "12px 24px 20px" }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", color: T.textMain, fontWeight: 500, fontSize: "15px", padding: "12px 0", borderBottom: `1px solid ${T.border}`, textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <BtnPrimary href={`tel:${epoSettings.phone}`} size="lg">
              <IcoPhone /> {epoSettings.phone}
            </BtnPrimary>
            {epoSettings.phoneAlt && (
              <BtnOutline href={`tel:${epoSettings.phoneAlt}`} size="lg">
                <IcoPhone /> {epoSettings.phoneAlt}
              </BtnOutline>
            )}
          </div>
        </div>
      )}
    </header>
    </>
  );
}
