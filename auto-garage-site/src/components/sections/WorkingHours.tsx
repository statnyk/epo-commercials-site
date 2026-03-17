import { T, container } from "../../theme.ts";
import { workingHours } from "../../cms/epoData.ts";
import { IcoClock } from "../../assets/icons/index.ts";

export default function WorkingHours() {
  return (
    <section id="hours" style={{ background: T.bgWhite, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "60px", alignItems: "center" }}>
        <div>
          <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Availability</p>
          <h2 style={{ color: T.textMain, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "16px" }}>Working Hours</h2>
          <p style={{ color: T.textSub, fontSize: "15px", lineHeight: 1.8 }}>
            Regular workshop hours apply to all scheduled services.<br />
            For breakdowns — we're available <strong style={{ color: T.accent }}>around the clock, every day of the year</strong>.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {workingHours.map((h) => (
            <div key={h.label} style={{ background: h.is247 ? "rgba(255,107,107,0.15)" : T.bg, border: h.is247 ? `1.5px solid ${T.heroBadgeRed}` : `1.5px solid ${T.border}`, borderRadius: T.radius, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: h.is247 ? T.heroBadgeRed : T.textMuted }}><IcoClock /></span>
                <span style={{ color: h.is247 ? T.heroBadgeRed : T.textMain, fontWeight: h.is247 ? 700 : 500, fontSize: "14px" }}>{h.label}</span>
              </div>
              <span style={{ color: h.is247 ? T.heroBadgeRed : T.textMain, fontWeight: 700, fontSize: h.is247 ? "16px" : "14px", whiteSpace: "nowrap" }}>{h.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
