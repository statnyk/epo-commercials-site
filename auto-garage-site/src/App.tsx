import { useState, useEffect } from "react";
import { epoSettings, services, workingHours, loadParts } from "./cms/epoData";
import type { Part } from "./cms/epoData";
import AdminPanel from "./AdminPanel";

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

/* ─── Design tokens ──────────────────────────────────────────────── */
const C = {
  bg: "#0d1117",
  card: "#161b27",
  cardBorder: "rgba(255,255,255,0.07)",
  orange: "#f97316",
  orangeDark: "#ea6000",
  blue: "#3b82f6",
  text: "#f1f5f9",
  muted: "#64748b",
  mutedLight: "#94a3b8",
} as const;

const container: React.CSSProperties = {
  maxWidth: "1152px",
  margin: "0 auto",
  paddingLeft: "24px",
  paddingRight: "24px",
};

/* ─── SVG Icons ──────────────────────────────────────────────────── */
function IcoPhone() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16l.46.92z"/></svg>;
}
function IcoMenu() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function IcoX() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function IcoTruck() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
}
function IcoClipboard() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></svg>;
}
function IcoCpu() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>;
}
function IcoDroplet() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
}
function IcoZap() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}
function IcoClock() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function IcoMapPin() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function IcoMail() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}
function IcoPackage() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m16.5 9.4-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
}
function IcoArrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
}

const serviceIconMap = {
  breakdown: IcoTruck,
  cvrt: IcoClipboard,
  diagnostics: IcoCpu,
  hydraulic: IcoDroplet,
  electrical: IcoZap,
};

const serviceColorMap: Record<string, string> = {
  breakdown: C.orange,
  cvrt: C.blue,
  diagnostics: "#a78bfa",
  hydraulic: "#06b6d4",
  electrical: "#f59e0b",
};

/* ─── Header ─────────────────────────────────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  useEffect(() => { if (isDesktop) setOpen(false); }, [isDesktop]);

  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#hours", label: "Hours" },
    { href: "#parts", label: "Parts" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(13,17,23,0.97)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ ...container, height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <span style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`, borderRadius: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </span>
          <div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: "16px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>EPO Company</div>
            <div style={{ color: C.muted, fontSize: "11px", lineHeight: 1.1 }}>Heavy Vehicle Specialists</div>
          </div>
        </a>

        {/* Desktop nav */}
        {isDesktop && (
          <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} style={{ color: C.mutedLight, fontSize: "14px", fontWeight: 500, textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = C.text)} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = C.mutedLight)}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${epoSettings.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`, color: "#fff", fontWeight: 700, fontSize: "13px", padding: "9px 18px", borderRadius: "8px", textDecoration: "none", boxShadow: `0 2px 12px rgba(249,115,22,0.35)` }}>
              <IcoPhone />
              {epoSettings.phone}
            </a>
          </nav>
        )}

        {/* Mobile hamburger */}
        {!isDesktop && (
          <button onClick={() => setOpen((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: C.mutedLight, padding: "4px", display: "flex" }}>
            {open ? <IcoX /> : <IcoMenu />}
          </button>
        )}
      </div>

      {!isDesktop && open && (
        <div style={{ background: "#111827", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 24px 20px" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", color: "#cbd5e1", fontSize: "15px", fontWeight: 500, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
          <a href={`tel:${epoSettings.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "16px", background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`, color: "#fff", fontWeight: 700, fontSize: "14px", padding: "11px 22px", borderRadius: "8px", textDecoration: "none" }}>
            <IcoPhone /> Call Now
          </a>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ background: `linear-gradient(160deg, #060a12 0%, #0d1528 50%, #060a12 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", left: "0", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px", position: "relative", zIndex: 1 }}>
        {/* 24/7 badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(249,115,22,0.12)", border: `1px solid rgba(249,115,22,0.3)`, borderRadius: "100px", padding: "6px 14px", marginBottom: "28px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.orange, display: "inline-block", boxShadow: `0 0 8px ${C.orange}` }} />
          <span style={{ color: C.orange, fontSize: "13px", fontWeight: 700 }}>24/7 Breakdown Assistance Available</span>
        </div>

        <h1 style={{ color: C.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: "700px", marginBottom: "20px" }}>
          Heavy Vehicle Repair<br />
          <span style={{ color: C.orange }}>You Can Count On</span>
        </h1>

        <p style={{ color: C.mutedLight, fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.75, maxWidth: "560px", marginBottom: "36px" }}>
          Specialist repair and maintenance for HGVs, buses, LCVs, trailers and refuse trucks.
          Available <strong style={{ color: C.text }}>24/7</strong> for emergency breakdown – we come to you.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "60px" }}>
          <a href={`tel:${epoSettings.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`, color: "#fff", fontWeight: 800, fontSize: "16px", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", boxShadow: `0 4px 20px rgba(249,115,22,0.4)` }}>
            <IcoPhone /> Call Now · {epoSettings.phone}
          </a>
          <a href="#services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.15)", color: C.text, fontWeight: 600, fontSize: "15px", padding: "14px 24px", borderRadius: "10px", textDecoration: "none" }}>
            Our Services <IcoArrow />
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {[
            { v: "24/7", l: "Breakdown response" },
            { v: "HGV", l: "Trucks & buses" },
            { v: "CVRT", l: "Pre-test specialists" },
            { v: "All makes", l: "Brands covered" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ color: C.orange, fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 900, lineHeight: 1 }}>{s.v}</div>
              <div style={{ color: C.muted, fontSize: "12px", marginTop: "4px" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────────── */
function About() {
  const points = [
    "Extensive experience in heavy vehicle repair",
    "Team of qualified professional technicians",
    "Electrical and mechanical expertise",
    "Available for emergency breakdowns",
  ];

  return (
    <section id="about" style={{ background: "#0d1117", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "56px", alignItems: "center" }}>
        <div>
          <p style={{ color: C.orange, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>About us</p>
          <h2 style={{ color: C.text, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "20px" }}>
            About Company
          </h2>
          <p style={{ color: C.mutedLight, fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" }}>
            The EPO company has been operating in the heavy vehicle repair and maintenance market for a long time, with extensive experience in the field and a team of professionals. We are here to offer you quality services even in cases of breakdown.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: C.muted, fontSize: "13px" }}>
            <IcoMapPin />
            <span>{epoSettings.address}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {points.map((p) => (
            <div key={p} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "12px", padding: "18px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ flexShrink: 0, marginTop: "2px", width: "20px", height: "20px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span style={{ color: C.mutedLight, fontSize: "13px", fontWeight: 500, lineHeight: 1.4 }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" style={{ background: "#080c14" }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ marginBottom: "48px", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <p style={{ color: C.orange, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>What we offer</p>
            <h2 style={{ color: C.text, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", margin: 0 }}>Our Services</h2>
          </div>
          <a href={`tel:${epoSettings.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "8px", padding: "9px 16px", color: C.orange, fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>
            <IcoPhone /> Book by phone
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {services.map((s) => {
            const Icon = serviceIconMap[s.icon];
            const color = serviceColorMap[s.icon];
            return (
              <article key={s.id} style={{ background: s.highlight ? `linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(234,96,0,0.06) 100%)` : C.card, border: s.highlight ? `1px solid rgba(249,115,22,0.3)` : `1px solid ${C.cardBorder}`, borderRadius: "14px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
                  <Icon />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <h3 style={{ color: C.text, fontWeight: 700, fontSize: "15px", margin: 0 }}>{s.title}</h3>
                    {s.highlight && (
                      <span style={{ background: C.orange, color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>24/7</span>
                    )}
                  </div>
                  <p style={{ color: C.muted, fontSize: "13px", lineHeight: 1.65, margin: 0 }}>{s.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Working Hours ──────────────────────────────────────────────── */
function WorkingHours() {
  return (
    <section id="hours" style={{ background: "#0d1117", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", alignItems: "center" }}>
        <div>
          <p style={{ color: C.orange, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Availability</p>
          <h2 style={{ color: C.text, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "16px" }}>Working Hours</h2>
          <p style={{ color: C.muted, fontSize: "14px", lineHeight: 1.7 }}>
            Regular workshop hours apply to all scheduled services.<br />
            For breakdowns — we're available <strong style={{ color: C.orange }}>around the clock, every day</strong>.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {workingHours.map((h) => (
            <div key={h.label} style={{ background: h.is247 ? `linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(234,96,0,0.08) 100%)` : C.card, border: h.is247 ? "1px solid rgba(249,115,22,0.3)" : `1px solid ${C.cardBorder}`, borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: h.is247 ? C.orange : C.muted }}>
                  <IcoClock />
                </span>
                <span style={{ color: h.is247 ? C.text : C.mutedLight, fontWeight: h.is247 ? 700 : 500, fontSize: "14px" }}>{h.label}</span>
              </div>
              <span style={{ color: h.is247 ? C.orange : C.text, fontWeight: 700, fontSize: h.is247 ? "16px" : "14px", whiteSpace: "nowrap" }}>
                {h.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Parts ──────────────────────────────────────────────────────── */
function Parts() {
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    setParts(loadParts());
    const handler = () => setParts(loadParts());
    window.addEventListener("epo_parts_updated", handler);
    return () => window.removeEventListener("epo_parts_updated", handler);
  }, []);

  return (
    <section id="parts" style={{ background: "#080c14" }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ marginBottom: "40px" }}>
          <p style={{ color: C.orange, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Available stock</p>
          <h2 style={{ color: C.text, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "8px" }}>Parts for Sale</h2>
          <p style={{ color: C.muted, fontSize: "14px", maxWidth: "520px" }}>
            Quality parts for heavy vehicles. Stock updated regularly — contact us for availability and pricing.
          </p>
        </div>

        {parts.length === 0 ? (
          <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "14px", padding: "48px 24px", textAlign: "center" }}>
            <IcoPackage />
            <p style={{ color: C.muted, marginTop: "12px", fontSize: "14px" }}>No parts listed yet. Check back soon or call us.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {parts.map((p) => (
              <article key={p.id} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ height: "160px", background: p.imageUrl ? "none" : "linear-gradient(135deg, #1c2333 0%, #0d1117 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <>
                      <IcoPackage />
                      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>No photo</span>
                    </>
                  )}
                </div>
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h3 style={{ color: C.text, fontWeight: 700, fontSize: "14px", lineHeight: 1.3, margin: 0 }}>{p.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {p.price != null ? (
                      <span style={{ color: C.orange, fontWeight: 800, fontSize: "18px" }}>€{p.price}</span>
                    ) : (
                      <span style={{ color: C.muted, fontSize: "13px" }}>Price on request</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Email enquiry strip */}
        <div style={{ marginTop: "32px", background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "12px", padding: "20px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <p style={{ color: C.text, fontSize: "14px", fontWeight: 600, margin: "0 0 2px" }}>Can't find what you're looking for?</p>
            <p style={{ color: C.muted, fontSize: "13px", margin: 0 }}>Send us a parts enquiry by email</p>
          </div>
          <a href={`mailto:${epoSettings.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`, color: "#fff", fontWeight: 600, fontSize: "13px", padding: "10px 20px", borderRadius: "8px", textDecoration: "none" }}>
            <IcoMail /> {epoSettings.email}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{ background: "#0d1117", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <p style={{ color: C.orange, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Get in touch</p>
        <h2 style={{ color: C.text, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "40px" }}>Contact</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {/* Phone – primary CTA */}
          <div style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`, borderRadius: "14px", padding: "28px", gridColumn: "span 1" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: "16px" }}>
              <IcoPhone />
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Phone (primary)</p>
            <a href={`tel:${epoSettings.phone}`} style={{ color: "#fff", fontWeight: 800, fontSize: "20px", textDecoration: "none", display: "block", marginBottom: "6px" }}>{epoSettings.phone}</a>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", margin: 0 }}>24/7 for breakdown · call for all bookings</p>
          </div>

          {/* Address */}
          <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "14px", padding: "28px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.orange, marginBottom: "16px" }}>
              <IcoMapPin />
            </div>
            <p style={{ color: C.muted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Location</p>
            <p style={{ color: C.text, fontWeight: 600, fontSize: "15px", margin: 0 }}>{epoSettings.address}</p>
          </div>

          {/* Parts email */}
          <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "14px", padding: "28px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(59,130,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.blue, marginBottom: "16px" }}>
              <IcoMail />
            </div>
            <p style={{ color: C.muted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Parts enquiries (email only)</p>
            <a href={`mailto:${epoSettings.email}`} style={{ color: C.text, fontWeight: 600, fontSize: "14px", textDecoration: "none", display: "block" }}>{epoSettings.email}</a>
          </div>

          {/* Hours summary */}
          <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "14px", padding: "28px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", marginBottom: "16px" }}>
              <IcoClock />
            </div>
            <p style={{ color: C.muted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Opening hours</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {workingHours.map((h) => (
                <li key={h.label} style={{ display: "flex", justifyContent: "space-between", color: h.is247 ? C.orange : C.mutedLight, fontSize: "13px", fontWeight: h.is247 ? 700 : 400 }}>
                  <span>{h.label}</span>
                  <span>{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#060a12", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ ...container, paddingTop: "32px", paddingBottom: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`, borderRadius: "6px", width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </span>
            <span style={{ color: C.text, fontWeight: 700, fontSize: "14px" }}>EPO Company</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: C.muted, fontSize: "12px" }}>
              <IcoMapPin />{epoSettings.address}
            </span>
            <a href={`tel:${epoSettings.phone}`} style={{ display: "flex", alignItems: "center", gap: "5px", color: C.orange, fontSize: "12px", textDecoration: "none", fontWeight: 600 }}>
              <IcoPhone />{epoSettings.phone}
            </a>
            <span style={{ color: C.muted, fontSize: "12px" }}>Mon–Fri 08:00–18:00 · Sat 08:00–14:00 · 24/7 breakdown</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
          <div style={{ display: "flex", gap: "16px" }}>
            {["#about", "#services", "#hours", "#parts", "#contact"].map((href) => (
              <a key={href} href={href} style={{ color: C.muted, fontSize: "12px", textDecoration: "none" }}>
                {href.replace("#", "").charAt(0).toUpperCase() + href.replace("#", "").slice(1)}
              </a>
            ))}
          </div>
          <p style={{ color: C.muted, fontSize: "11px", margin: 0 }}>© {new Date().getFullYear()} EPO Company · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Site ───────────────────────────────────────────────────────── */
function Site() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <About />
        <Services />
        <WorkingHours />
        <Parts />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ─── Root with routing ──────────────────────────────────────────── */
export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const h = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);

  if (route === "#admin") return <AdminPanel />;
  return <Site />;
}
