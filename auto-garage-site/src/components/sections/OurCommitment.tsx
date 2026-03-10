import { T, container } from "../../theme.ts";

export default function OurCommitment() {
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
          <p style={{ color: T.accent, fontSize: "17px", fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
            We do not just repair vehicles — we keep transport businesses moving.
          </p>
        </div>
      </div>
    </section>
  );
}
