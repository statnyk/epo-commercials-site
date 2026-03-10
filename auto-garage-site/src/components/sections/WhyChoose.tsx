import { T, container } from "../../theme.ts";
import { IcoCheck } from "../../assets/icons/index.ts";

export default function WhyChoose() {
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
          <h2 style={{ color: T.textMain, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Why Choose EPO Commercials</h2>
          <p style={{ color: T.textMain, fontSize: "16px", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto" }}>
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
