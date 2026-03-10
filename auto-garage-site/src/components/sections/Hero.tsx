import { T, container } from "../../theme.ts";
import { epoSettings } from "../../cms/epoData.ts";
import BtnPrimary from "../ui/BtnPrimary.tsx";
import BtnOutline from "../ui/BtnOutline.tsx";
import { IcoPhone } from "../../assets/icons/index.ts";
import heroImg from "../../assets/images/2026-03-02 08.43.04.jpg";

export default function Hero() {
  return (
    <section style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ ...container, paddingTop: "72px", paddingBottom: "72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "56px", alignItems: "center" }}>

        {/* Left: copy */}
        <div>
          {/* 24/7 badge – red only here */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: T.heroBadgeRed, border: "1px solid rgba(255,255,255,0.15)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "inline-block", flexShrink: 0 }} />
            <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>24/7 Breakdown Assistance · Dublin, Ireland</span>
          </div>

          <h1 style={{ color: T.textMain, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "580px", marginBottom: "20px" }}>
            Bus &amp; Heavy-Duty Vehicle<br />
            <span style={{ color: T.accent }}>Repair Specialists</span>
          </h1>

          <p style={{ color: T.textSub, fontSize: "clamp(15px, 1.8vw, 17px)", lineHeight: 1.8, maxWidth: "520px", marginBottom: "16px" }}>
            Specialist repair and maintenance for <strong style={{ color: T.textMain }}>Buses, Trucks and Heavy-Duty Vehicles</strong>. Qualified technicians — available around the clock for emergency breakdowns.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
            {["Bus Specialists", "CVRT Pre-Test", "Computer Diagnostics", "Electrical Repair", "All Makes Covered"].map((tag) => (
              <span key={tag} style={{ background: "transparent", border: `1.5px solid ${T.borderBlue}`, color: T.accent, fontSize: "12px", fontWeight: 600, padding: "6px 14px", borderRadius: "100px" }}>{tag}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
            <BtnPrimary href={`tel:${epoSettings.phone}`} size="lg">
              <IcoPhone /> {epoSettings.phone}
            </BtnPrimary>
            {epoSettings.phoneAlt && (
              <BtnOutline href={`tel:${epoSettings.phoneAlt}`} size="lg">
                <IcoPhone /> {epoSettings.phoneAlt}
              </BtnOutline>
            )}
          </div>
          <p style={{ color: T.textMuted, fontSize: "12px" }}>No online booking — please call for all appointments &amp; breakdowns</p>
        </div>

        {/* Right: image */}
        <div style={{ borderRadius: T.radiusLg, overflow: "hidden", boxShadow: T.shadowMd, aspectRatio: "4/3", position: "relative" }}>
          <img src={heroImg} alt="EPO Company service van at work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {/* 24/7 overlay badge – red only here */}
          <div style={{ position: "absolute", bottom: "16px", left: "16px", background: T.heroBadgeRed, color: "#fff", borderRadius: T.radius, padding: "10px 16px", boxShadow: T.shadowMd }}>
            <div style={{ fontWeight: 900, fontSize: "22px", lineHeight: 1 }}>24/7</div>
            <div style={{ fontSize: "11px", fontWeight: 600, opacity: 0.9 }}>Breakdown response</div>
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
