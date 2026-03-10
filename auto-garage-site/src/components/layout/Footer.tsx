import { T, container } from "../../theme.ts";
import { epoSettings, workingHours } from "../../cms/epoData.ts";
import { IcoPhone, IcoMail } from "../../assets/icons/index.ts";
import logoInverse from "../../assets/logo/epo_2.svg";

export default function Footer() {
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

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>© {new Date().getFullYear()} EPO Commercials · All rights reserved · <a href="https://www.epocommercials.ie" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>www.epocommercials.ie</a></p>
        </div>
      </div>
    </footer>
  );
}
