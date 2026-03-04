import { useState, useEffect } from "react";
import { epoSettings, services, workingHours, fetchParts } from "./cms/epoData";
import type { Part } from "./cms/epoData";
import { T, container } from "./theme";
import AdminPanel from "./AdminPanel";

import heroImg  from "./assets/images/2026-03-02 08.43.04.jpg";
import shopImg  from "./assets/images/2026-03-02 08.43.36.jpg";
import mechImg  from "./assets/images/2026-03-02 08.43.52.jpg";
import logoMain from "./assets/logo/epo_1.svg";
import logoInverse from "./assets/logo/epo_2.svg";

/* ─── Breakpoint hook ────────────────────────────────────────────── */
function useIsDesktop(bp = 768) {
  const [ok, setOk] = useState(() => window.innerWidth >= bp);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${bp}px)`);
    const h = (e: MediaQueryListEvent) => setOk(e.matches);
    mq.addEventListener("change", h);
    setOk(mq.matches);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return ok;
}

/* ─── Button helpers ─────────────────────────────────────────────── */
function BtnPrimary({ href, children, size = "md" }: { href: string; children: React.ReactNode; size?: "sm" | "md" | "lg" }) {
  const pad = size === "lg" ? "15px 32px" : size === "sm" ? "8px 18px" : "11px 24px";
  const fs  = size === "lg" ? "16px" : size === "sm" ? "13px" : "14px";
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: hov ? T.primaryDark : T.primary, color: "#fff", fontWeight: 700, fontSize: fs, padding: pad, borderRadius: T.radius, textDecoration: "none", transition: "background 0.18s", boxShadow: T.shadowMd }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  );
}

function BtnOutline({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: `2px solid ${T.primary}`, color: hov ? "#fff" : T.primary, background: hov ? T.primary : "transparent", fontWeight: 700, fontSize: "14px", padding: "11px 24px", borderRadius: T.radius, textDecoration: "none", transition: "all 0.18s" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────── */
const IcoPhone = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16l.46.92z"/></svg>;
const IcoMenu = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IcoX    = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const IcoMapPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoMail  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IcoClock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IcoTruck = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IcoClip  = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></svg>;
const IcoCpu   = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>;
const IcoZap   = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IcoPkg   = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m16.5 9.4-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;

const svcIconMap: Record<string, () => React.ReactElement> = {
  breakdown: IcoTruck, cvrt: IcoClip, diagnostics: IcoCpu, electrical: IcoZap, bus: IcoTruck, truck: IcoTruck,
};
const svcColorMap: Record<string, string> = {
  breakdown: T.primary, cvrt: "#0ea5e9", diagnostics: "#6366f1", electrical: "#f97316", bus: "#10b981", truck: "#f59e0b",
};

/* ─── Service Card ───────────────────────────────────────────────── */
function ServiceCard({ s }: { s: typeof services[number] }) {
  const [hov, setHov] = useState(false);
  const Icon = svcIconMap[s.icon] ?? IcoTruck;
  const color = svcColorMap[s.icon] ?? T.primary;
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: T.bgWhite, border: hov ? `1.5px solid ${T.primary}` : `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px 24px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: hov ? T.shadowHover : T.shadow, transition: "all 0.2s", cursor: "default" }}>
      <div style={{ width: "52px", height: "52px", borderRadius: T.radius, background: hov ? T.primaryLight : T.bg, display: "flex", alignItems: "center", justifyContent: "center", color: hov ? T.primary : color, transition: "all 0.2s" }}>
        <Icon />
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
          <h3 style={{ color: T.textMain, fontWeight: 700, fontSize: "15px", margin: 0 }}>{s.title}</h3>
          {s.highlight && (
            <span style={{ background: T.primary, color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>24/7</span>
          )}
        </div>
        {s.bullets && s.bullets.length > 0 ? (
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
            {s.bullets.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                <span style={{ flexShrink: 0, marginTop: "3px", width: "16px", height: "16px", borderRadius: "50%", background: hov ? T.primary : color, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "background 0.2s" }}>
                  <IcoCheck />
                </span>
                <span style={{ color: T.textSub, fontSize: "13px", lineHeight: 1.55 }}>{b}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: T.textSub, fontSize: "13px", lineHeight: 1.65, margin: 0 }}>{s.description}</p>
        )}
      </div>
    </article>
  );
}

/* ─── Part Card ──────────────────────────────────────────────────── */
function PartCard({ p }: { p: Part }) {
  const [hov, setHov] = useState(false);
  const addedLabel =
    p.created_at
      ? new Date(p.created_at).toLocaleDateString("en-IE", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: T.bgWhite, border: `1.5px solid ${hov ? T.primary : T.border}`, borderRadius: T.radiusMd, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: hov ? T.shadowHover : T.shadow, transition: "all 0.2s" }}>
      <div style={{ height: "160px", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
        {p.image_url ? (
          <img src={p.image_url} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <IcoPkg />
            <span style={{ color: T.textMuted, fontSize: "11px" }}>No photo available</span>
          </>
        )}
      </div>
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ color: T.textMain, fontWeight: 700, fontSize: "14px", lineHeight: 1.3, margin: 0 }}>{p.name}</h3>
        <div>
          {p.price != null ? (
            <span style={{ color: T.primary, fontWeight: 800, fontSize: "20px" }}>€{p.price}</span>
          ) : (
            <span style={{ color: T.textMuted, fontSize: "13px" }}>Price on request</span>
          )}
        </div>
        {addedLabel && (
          <p style={{ color: T.textMuted, fontSize: "11px", margin: 0 }}>
            Added {addedLabel}
          </p>
        )}
      </div>
    </article>
  );
}

/* ─── Nav Link ───────────────────────────────────────────────────── */
function NavLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ color: hov ? T.primary : T.textSub, fontWeight: 500, fontSize: "14px", textDecoration: "none", padding: "6px 12px", borderRadius: "6px", background: hov ? T.primaryLight : "transparent", transition: "all 0.15s" }}>
      {label}
    </a>
  );
}

/* ─── Header ─────────────────────────────────────────────────────── */
function Header() {
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
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: T.bgWhite, borderBottom: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ ...container, height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img
            src={logoMain}
            alt="EPO Commercials logo"
            style={{ height: "34px", width: "auto", display: "block" }}
          />
        </a>

        {/* Desktop nav */}
        {isDesktop && (
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navLinks.map((l) => <NavLink key={l.href} href={l.href} label={l.label} />)}
            <div style={{ marginLeft: "12px", display: "flex", gap: "8px", alignItems: "center", paddingLeft: "16px", borderLeft: `1px solid ${T.border}` }}>
              <a href={`tel:${epoSettings.phone}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: T.primary, fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
                <IcoPhone />{epoSettings.phone}
              </a>
              <BtnPrimary href={`tel:${epoSettings.phone}`} size="sm">Call Now</BtnPrimary>
            </div>
          </nav>
        )}

        {/* Mobile hamburger */}
        {!isDesktop && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href={`tel:${epoSettings.phone}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: T.primary, fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
              <IcoPhone />
            </a>
            <button onClick={() => setOpen((v) => !v)} style={{ background: "none", border: `1px solid ${T.border}`, cursor: "pointer", color: T.textSub, padding: "6px 8px", display: "flex", borderRadius: "6px" }}>
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
              <BtnOutline href={`tel:${epoSettings.phoneAlt}`}>
                <IcoPhone /> {epoSettings.phoneAlt}
              </BtnOutline>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ ...container, paddingTop: "72px", paddingBottom: "72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "56px", alignItems: "center" }}>

        {/* Left: copy */}
        <div>
          {/* 24/7 badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: T.primaryLight, border: `1px solid ${T.borderBlue}`, borderRadius: "100px", padding: "5px 14px", marginBottom: "24px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: T.accent, display: "inline-block" }} />
            <span style={{ color: T.primary, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>24/7 Breakdown Assistance · Dublin, Ireland</span>
          </div>

          <h1 style={{ color: T.primaryDark, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "580px", marginBottom: "20px" }}>
            Bus &amp; Heavy-Duty Vehicle<br />
            <span style={{ color: T.primary }}>Repair Specialists</span>
          </h1>

          <p style={{ color: T.textSub, fontSize: "clamp(15px, 1.8vw, 17px)", lineHeight: 1.8, maxWidth: "520px", marginBottom: "16px" }}>
            Specialist repair and maintenance for <strong style={{ color: T.textMain }}>Buses, Trucks and Heavy-Duty Vehicles</strong>. Qualified technicians — available around the clock for emergency breakdowns.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
            {["Bus Specialists", "CVRT Pre-Test", "Computer Diagnostics", "Electrical Repair", "All Makes Covered"].map((tag) => (
              <span key={tag} style={{ background: T.bgWhite, border: `1px solid ${T.borderBlue}`, color: T.primary, fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "100px" }}>{tag}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
            <BtnPrimary href={`tel:${epoSettings.phone}`} size="lg">
              <IcoPhone /> {epoSettings.phone}
            </BtnPrimary>
            {epoSettings.phoneAlt && (
              <BtnOutline href={`tel:${epoSettings.phoneAlt}`}>
                <IcoPhone /> {epoSettings.phoneAlt}
              </BtnOutline>
            )}
          </div>
          <p style={{ color: T.textMuted, fontSize: "12px" }}>No online booking — please call for all appointments &amp; breakdowns</p>
        </div>

        {/* Right: image */}
        <div style={{ borderRadius: T.radiusLg, overflow: "hidden", boxShadow: T.shadowMd, aspectRatio: "4/3", position: "relative" }}>
          <img src={heroImg} alt="EPO Company service van at work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {/* 24/7 overlay badge */}
          <div style={{ position: "absolute", bottom: "16px", left: "16px", background: T.primary, color: "#fff", borderRadius: T.radius, padding: "10px 16px", boxShadow: T.shadowMd }}>
            <div style={{ fontWeight: 900, fontSize: "22px", lineHeight: 1 }}>24/7</div>
            <div style={{ fontSize: "11px", fontWeight: 600, opacity: 0.85 }}>Breakdown response</div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ borderTop: `1px solid ${T.border}`, background: T.bgWhite }}>
        <div style={{ ...container, paddingTop: "28px", paddingBottom: "28px", display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "space-around" }}>
          {[
            { v: "24/7",    l: "Breakdown assistance" },
            { v: "CVRT",    l: "Pre-test specialists"  },
            { v: "HGV",     l: "Buses & trucks"        },
            { v: "All makes", l: "Brands covered"      },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ color: T.primary, fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 900, lineHeight: 1 }}>{s.v}</div>
              <div style={{ color: T.textMuted, fontSize: "12px", marginTop: "4px" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────────── */
function About() {
  const bullets = [
    "Experienced heavy vehicle specialists",
    "Qualified mechanical and electrical technicians",
    "Bus and truck expertise",
    "CVRT pre-test specialists",
    "Fast turnaround times",
    "All major makes covered",
    "Dublin-based and locally trusted",
  ];

  return (
    <section id="about" style={{ background: T.bgWhite, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
        <div>
          <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>About Us</p>
          <h2 style={{ color: T.primaryDark, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "20px" }}>About EPO Commercials</h2>
          <p style={{ color: T.textSub, fontSize: "15px", lineHeight: 1.85, marginBottom: "28px" }}>
            EPO Commercials is a Dublin-based mechanical service company specialising in the repair, maintenance, and diagnostics of buses, trucks, and heavy-duty vehicles. With extensive hands-on experience in the commercial transport sector, our qualified technicians deliver reliable, efficient, and professional services designed to minimise downtime and maximise fleet performance.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "28px" }}>
            {bullets.map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ flexShrink: 0, marginTop: "3px", width: "18px", height: "18px", borderRadius: "50%", background: T.primary, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <IcoCheck />
                </span>
                <span style={{ color: T.textSub, fontSize: "13px", lineHeight: 1.45 }}>{b}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: T.textMuted, fontSize: "13px" }}>
            <IcoMapPin /><span>{epoSettings.address}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ borderRadius: T.radiusMd, overflow: "hidden", boxShadow: T.shadow, aspectRatio: "16/9" }}>
            <img src={shopImg} alt="Heavy vehicle engine repair" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ borderRadius: T.radiusMd, overflow: "hidden", boxShadow: T.shadow, aspectRatio: "16/9" }}>
            <img src={mechImg} alt="Professional mechanic at work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" style={{ background: T.bg }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>What We Offer</p>
          <h2 style={{ color: T.primaryDark, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Our Services</h2>
          <p style={{ color: T.textSub, fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
            Professional repair and maintenance for all heavy vehicles — call us to book an appointment.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          {services.map((s) => <ServiceCard key={s.id} s={s} />)}
        </div>

        {/* CTA strip */}
        <div style={{ background: T.primary, borderRadius: T.radiusMd, padding: "28px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Bookings by phone only</p>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "15px", margin: 0 }}>Call us to confirm availability, parts and timing for your vehicle.</p>
          </div>
          <a href={`tel:${epoSettings.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: T.primary, fontWeight: 800, fontSize: "15px", padding: "12px 24px", borderRadius: T.radius, textDecoration: "none" }}>
            <IcoPhone /> {epoSettings.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose ─────────────────────────────────────────────────── */
function WhyChoose() {
  const reasons = [
    "Experienced heavy vehicle specialists",
    "Qualified mechanical and electrical technicians",
    "Bus and truck expertise",
    "CVRT pre-test specialists",
    "Fast turnaround times",
    "All major makes covered",
    "Dublin-based and locally trusted",
  ];

  return (
    <section id="why-choose" style={{ background: T.bgWhite, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Our Strengths</p>
          <h2 style={{ color: T.primaryDark, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Why Choose EPO Commercials</h2>
          <p style={{ color: T.textSub, fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
            We bring deep expertise and genuine dedication to every vehicle we service.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {reasons.map((r) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: "14px", background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radius, padding: "18px 20px" }}>
              <span style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%", background: T.primaryLight, display: "inline-flex", alignItems: "center", justifyContent: "center", color: T.primary }}>
                <IcoCheck />
              </span>
              <span style={{ color: T.textMain, fontSize: "14px", fontWeight: 600, lineHeight: 1.4 }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Our Commitment ─────────────────────────────────────────────── */
function OurCommitment() {
  return (
    <section style={{ background: T.primaryDark }}>
      <div style={{ ...container, paddingTop: "72px", paddingBottom: "72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", alignItems: "center" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Our Promise</p>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "0" }}>Our Commitment</h2>
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: 1.85, margin: "0 0 20px" }}>
            At EPO Commercials, we are committed to delivering professional workmanship, transparent communication, reliable service, and long-term fleet support.
          </p>
          <p style={{ color: T.primary, fontSize: "17px", fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
            We do not just repair vehicles — we keep transport businesses moving.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Working Hours ──────────────────────────────────────────────── */
function WorkingHours() {
  return (
    <section id="hours" style={{ background: T.bgWhite, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "60px", alignItems: "center" }}>
        <div>
          <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Availability</p>
          <h2 style={{ color: T.primaryDark, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "16px" }}>Working Hours</h2>
          <p style={{ color: T.textSub, fontSize: "15px", lineHeight: 1.8 }}>
            Regular workshop hours apply to all scheduled services.<br />
            For breakdowns — we're available <strong style={{ color: T.primary }}>around the clock, every day of the year</strong>.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {workingHours.map((h) => (
            <div key={h.label} style={{ background: h.is247 ? T.primaryLight : T.bg, border: h.is247 ? `1.5px solid ${T.borderBlue}` : `1.5px solid ${T.border}`, borderRadius: T.radius, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: h.is247 ? T.primary : T.textMuted }}><IcoClock /></span>
                <span style={{ color: h.is247 ? T.primary : T.textMain, fontWeight: h.is247 ? 700 : 500, fontSize: "14px" }}>{h.label}</span>
              </div>
              <span style={{ color: h.is247 ? T.primary : T.textMain, fontWeight: 700, fontSize: h.is247 ? "16px" : "14px", whiteSpace: "nowrap" }}>{h.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Parts ──────────────────────────────────────────────────────── */
function Parts({ limit, showViewMore }: { limit?: number; showViewMore?: boolean } = {}) {
  const [parts, setParts] = useState<Part[]>([]);
  useEffect(() => {
    fetchParts().then(setParts).catch(() => setParts([]));
  }, []);

  const displayed = limit != null ? parts.slice(0, limit) : parts;

  return (
    <section id="parts" style={{ background: T.bg }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ marginBottom: "44px" }}>
          <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Available Stock</p>
          <h2 style={{ color: T.primaryDark, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "8px" }}>Parts for Sale</h2>
          <p style={{ color: T.textSub, fontSize: "14px", maxWidth: "500px" }}>Quality parts for heavy vehicles. Stock updated regularly — contact us for current availability and pricing.</p>
        </div>

        {displayed.length === 0 ? (
          <div style={{ background: T.bgWhite, border: `1.5px dashed ${T.border}`, borderRadius: T.radiusMd, padding: "56px 24px", textAlign: "center", color: T.textMuted }}>
            <IcoPkg />
            <p style={{ marginTop: "12px", fontSize: "14px" }}>No parts listed yet. Check back soon or call us to enquire.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {displayed.map((p) => <PartCard key={p.id} p={p} />)}
          </div>
        )}

        {showViewMore && limit != null && parts.length > limit && (
          <div style={{ marginTop: "28px", textAlign: "center" }}>
            <a
              href="/parts"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "11px 26px",
                borderRadius: T.radius,
                border: `1.5px solid ${T.primary}`,
                color: T.primary,
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                background: T.bgWhite,
              }}
            >
              View more parts
            </a>
          </div>
        )}

        {/* Email enquiry */}
        <div style={{ marginTop: "32px", background: T.bgWhite, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "22px 28px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "14px", boxShadow: T.shadow }}>
          <div>
            <p style={{ color: T.textMain, fontSize: "15px", fontWeight: 700, margin: "0 0 2px" }}>Can't find what you need?</p>
            <p style={{ color: T.textSub, fontSize: "13px", margin: 0 }}>Send a parts enquiry by email and we'll get back to you.</p>
          </div>
          <a href={`mailto:${epoSettings.emailParts ?? epoSettings.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: `2px solid ${T.primary}`, color: T.primary, fontWeight: 700, fontSize: "13px", padding: "10px 20px", borderRadius: T.radius, textDecoration: "none" }}>
            <IcoMail /> {epoSettings.emailParts ?? epoSettings.email}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Parts Page (all parts) ─────────────────────────────────────── */
function PartsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: T.fontFamily }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section style={{ background: T.bgWhite, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ ...container, paddingTop: "60px", paddingBottom: "32px" }}>
            <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Parts Catalogue</p>
            <h1 style={{ color: T.primaryDark, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>All Parts for Sale</h1>
            <p style={{ color: T.textSub, fontSize: "14px", marginTop: "10px", maxWidth: "520px" }}>
              Browse the full list of parts currently listed for heavy vehicles. For availability and pricing confirmation, please contact us by phone or email.
            </p>
          </div>
        </section>
        <Parts />
      </main>
      <Footer />
    </div>
  );
}

/* ─── Contact ────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{ background: T.bgWhite, borderTop: `1px solid ${T.border}` }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Get In Touch</p>
        <h2 style={{ color: T.primaryDark, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "44px" }}>Contact</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {/* Primary phone card */}
          <div style={{ background: T.primary, borderRadius: T.radiusMd, padding: "28px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: "16px" }}>
              <IcoPhone />
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Phone (Primary)</p>
            <a href={`tel:${epoSettings.phone}`} style={{ color: "#fff", fontWeight: 800, fontSize: "20px", textDecoration: "none", display: "block", marginBottom: "4px" }}>{epoSettings.phone}</a>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", margin: 0 }}>24/7 for breakdown · all bookings by phone</p>
          </div>

          {/* Secondary phone */}
          {epoSettings.phoneAlt && (
            <div style={{ background: T.bg, border: `1.5px solid ${T.borderBlue}`, borderRadius: T.radiusMd, padding: "28px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, marginBottom: "16px" }}>
                <IcoPhone />
              </div>
              <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Phone (Alternative)</p>
              <a href={`tel:${epoSettings.phoneAlt}`} style={{ color: T.primary, fontWeight: 800, fontSize: "19px", textDecoration: "none" }}>{epoSettings.phoneAlt}</a>
            </div>
          )}

          {/* Accounts phone */}
          {epoSettings.phoneAccounts && (
            <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, marginBottom: "16px" }}>
                <IcoPhone />
              </div>
              <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Accounts</p>
              <a href={`tel:${epoSettings.phoneAccounts}`} style={{ color: T.primary, fontWeight: 800, fontSize: "19px", textDecoration: "none" }}>{epoSettings.phoneAccounts}</a>
            </div>
          )}

          {/* Location */}
          <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, marginBottom: "16px" }}>
              <IcoMapPin />
            </div>
            <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Location</p>
            <p style={{ color: T.textMain, fontWeight: 600, fontSize: "15px", margin: 0 }}>{epoSettings.address}</p>
          </div>

          {/* Hours summary */}
          <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, marginBottom: "16px" }}>
              <IcoClock />
            </div>
            <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Opening Hours</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {workingHours.map((h) => (
                <li key={h.label} style={{ display: "flex", justifyContent: "space-between", color: h.is247 ? T.primary : T.textSub, fontSize: "13px", fontWeight: h.is247 ? 700 : 400 }}>
                  <span>{h.label}</span><span>{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* General email */}
          <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, marginBottom: "16px" }}>
              <IcoMail />
            </div>
            <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>General Enquiries</p>
            <a href={`mailto:${epoSettings.email}`} style={{ color: T.primary, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>{epoSettings.email}</a>
          </div>

          {/* Parts email */}
          {epoSettings.emailParts && (
            <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, marginBottom: "16px" }}>
                <IcoMail />
              </div>
              <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Parts Enquiries</p>
              <a href={`mailto:${epoSettings.emailParts}`} style={{ color: T.primary, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>{epoSettings.emailParts}</a>
            </div>
          )}

          {/* Accounts email */}
          {epoSettings.emailAccounts && (
            <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary, marginBottom: "16px" }}>
                <IcoMail />
              </div>
              <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Accounts</p>
              <a href={`mailto:${epoSettings.emailAccounts}`} style={{ color: T.primary, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>{epoSettings.emailAccounts}</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: T.primaryDark, color: T.textInverse }}>
      <div style={{ ...container, paddingTop: "40px", paddingBottom: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px", marginBottom: "32px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <img
                src={logoInverse}
                alt="EPO Commercials logo"
                style={{ height: "30px", width: "auto", display: "block" }}
              />
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
              {epoSettings.tagline}<br />{epoSettings.address}
            </p>
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <a href={`tel:${epoSettings.phone}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: "#fff", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}><IcoPhone />{epoSettings.phone}</a>
              {epoSettings.phoneAlt && (
                <a href={`tel:${epoSettings.phoneAlt}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}><IcoPhone />{epoSettings.phoneAlt}</a>
              )}
              {epoSettings.phoneAccounts && (
                <a href={`tel:${epoSettings.phoneAccounts}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}><IcoPhone />{epoSettings.phoneAccounts}</a>
              )}
              <a href={`mailto:${epoSettings.email}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.7)", fontSize: "13px", textDecoration: "none" }}><IcoMail />{epoSettings.email}</a>
              {epoSettings.emailParts && (
                <a href={`mailto:${epoSettings.emailParts}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.65)", fontSize: "13px", textDecoration: "none" }}><IcoMail />{epoSettings.emailParts}</a>
              )}
              {epoSettings.emailAccounts && (
                <a href={`mailto:${epoSettings.emailAccounts}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.65)", fontSize: "13px", textDecoration: "none" }}><IcoMail />{epoSettings.emailAccounts}</a>
              )}
            </div>
          </div>

          {/* Hours */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Hours</p>
            {workingHours.map((h) => (
              <div key={h.label} style={{ display: "flex", justifyContent: "space-between", color: h.is247 ? "#fff" : "rgba(255,255,255,0.65)", fontSize: "13px", fontWeight: h.is247 ? 700 : 400, marginBottom: "5px" }}>
                <span>{h.label}</span><span>{h.hours}</span>
              </div>
            ))}
          </div>

          {/* Nav */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["#about", "#services", "#hours", "#parts", "#contact"].map((href) => (
                <a key={href} href={href} style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", textDecoration: "none" }}>
                  {href.replace("#", "").charAt(0).toUpperCase() + href.replace("#", "").slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>© {new Date().getFullYear()} EPO Commercials · All rights reserved · <a href="https://www.epocommercials.ie" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>www.epocommercials.ie</a></p>
          <a href="#admin" style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", textDecoration: "none" }}>Admin</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────────────── */
function Site() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: T.fontFamily }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <OurCommitment />
        <WorkingHours />
        <Parts limit={4} showViewMore />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash || window.location.pathname);
  useEffect(() => {
    const h = () => setRoute(window.location.hash || window.location.pathname);
    window.addEventListener("hashchange", h);
    window.addEventListener("popstate", h);
    return () => {
      window.removeEventListener("hashchange", h);
      window.removeEventListener("popstate", h);
    };
  }, []);
  if (route === "#admin") return <AdminPanel />;
  if (route === "/parts") return <PartsPage />;
  return <Site />;
}
