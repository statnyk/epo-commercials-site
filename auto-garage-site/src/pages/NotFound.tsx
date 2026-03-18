import { useState } from "react";
import { T } from "../theme.ts";
import { epoSettings } from "../cms/epoData.ts";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";
import { IcoPhone, IcoGauge } from "../assets/icons/index.ts";

export default function NotFound() {
  const [hovBtn, setHovBtn] = useState(false);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: T.fontFamily }}>
      <Header />
      <main id="main-content" style={{ flex: 1, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          {/* Gauge icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: T.bgWhite, border: `2px solid ${T.border}`, boxShadow: T.shadowMd, display: "flex", alignItems: "center", justifyContent: "center", color: T.primary }}>
              <IcoGauge size={60} />
            </div>
          </div>

          {/* 404 number */}
          <div style={{ fontSize: "clamp(72px, 15vw, 120px)", fontWeight: 900, lineHeight: 1, color: T.primary, letterSpacing: "-0.04em", marginBottom: "4px" }}>
            404
          </div>

          <h1 style={{ color: T.textMain, fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800, marginBottom: "12px", marginTop: 0 }}>
            Page Not Found
          </h1>

          <p style={{ color: T.textSub, fontSize: "15px", lineHeight: 1.8, marginBottom: "32px" }}>
            Looks like this page broke down on the road. The URL you're looking for doesn't exist or has been moved.
          </p>

          {/* Info tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: T.primaryLight, border: `1px solid ${T.borderBlue}`, borderRadius: "100px", padding: "5px 16px", marginBottom: "32px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.accent, display: "inline-block" }} />
            <span style={{ color: T.primary, fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em" }}>
              24/7 Breakdown Assistance still available
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: hovBtn ? T.primaryDark : T.primary, color: "#fff", fontWeight: 700, fontSize: "15px", padding: "13px 28px", borderRadius: T.radius, textDecoration: "none", transition: "background 0.18s", boxShadow: T.shadowMd }}
              onMouseEnter={() => setHovBtn(true)}
              onMouseLeave={() => setHovBtn(false)}
            >
              ← Back to Home
            </a>
            <a
              href={`tel:${epoSettings.phone}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: `2px solid ${T.primary}`, color: T.primary, background: "transparent", fontWeight: 700, fontSize: "15px", padding: "11px 28px", borderRadius: T.radius, textDecoration: "none" }}
            >
              <IcoPhone /> {epoSettings.phone}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
