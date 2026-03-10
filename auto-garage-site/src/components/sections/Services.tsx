import { useState } from "react";
import { T, container } from "../../theme.ts";
import { epoSettings, services } from "../../cms/epoData.ts";
import type { Service } from "../../cms/epoData.ts";
import { IcoPhone, IcoCheck, IcoTruck } from "../../assets/icons/index.ts";
import { svcIconMap, svcColorMap } from "../../assets/icons/svcMaps.ts";

function ServiceCard({ s }: { s: Service }) {
  const [hov, setHov] = useState(false);
  const Icon = svcIconMap[s.icon] ?? IcoTruck;
  const color = svcColorMap[s.icon] ?? T.primary;
  const isRed = s.highlight;
  const borderColor = hov ? (isRed ? T.heroBadgeRed : T.primary) : (isRed ? "rgba(239,68,68,0.5)" : T.border);
  const iconBg = hov ? (isRed ? "rgba(239,68,68,0.25)" : T.primaryLight) : (isRed ? "rgba(239,68,68,0.18)" : T.bg);
  const iconColor = hov ? (isRed ? T.heroBadgeRed : T.primary) : (isRed ? T.heroBadgeRed : color);
  const bulletBg = hov ? (isRed ? T.heroBadgeRed : T.primary) : (isRed ? T.heroBadgeRed : color);
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: T.bgWhite, border: `1.5px solid ${borderColor}`, borderRadius: T.radiusMd, padding: "28px 24px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: hov ? T.shadowHover : T.shadow, transition: "all 0.2s", cursor: "default" }}>
      <div style={{ width: "52px", height: "52px", borderRadius: T.radius, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: iconColor, transition: "all 0.2s" }}>
        <Icon />
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
          <h3 style={{ color: isRed ? T.heroBadgeRed : T.textMain, fontWeight: 700, fontSize: "15px", margin: 0 }}>{s.title}</h3>
          {s.highlight && (
            <span style={{ background: T.heroBadgeRed, color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>24/7</span>
          )}
        </div>
        {s.bullets && s.bullets.length > 0 ? (
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
            {s.bullets.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                <span style={{ flexShrink: 0, marginTop: "3px", width: "16px", height: "16px", borderRadius: "50%", background: bulletBg, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "background 0.2s" }}>
                  <IcoCheck />
                </span>
                <span style={{ color: T.textMain, fontSize: "14px", lineHeight: 1.6 }}>{b}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: T.textMain, fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{s.description}</p>
        )}
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ background: T.bg }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>What We Offer</p>
          <h2 style={{ color: T.textMain, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Our Services</h2>
          <p style={{ color: T.textMain, fontSize: "16px", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto" }}>
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
