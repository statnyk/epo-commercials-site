import { T, container } from "../../theme.ts";
import { epoSettings } from "../../cms/epoData.ts";
import { IcoCheck, IcoMapPin } from "../../assets/icons/index.ts";
import shopImg from "../../assets/images/2026-03-02 08.43.36.jpg";
import mechImg from "../../assets/images/2026-03-02 08.43.52.jpg";

export default function About() {
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
          <h2 style={{ color: T.textMain, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "20px" }}>About EPO Commercials</h2>
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
