import { T, container } from "../../theme.ts";
import { epoSettings, workingHours } from "../../cms/epoData.ts";
import { IcoPhone, IcoMapPin, IcoMail, IcoClock } from "../../assets/icons/index.ts";

export default function Contact() {
  return (
    <section id="contact" style={{ background: T.bgWhite, borderTop: `1px solid ${T.border}` }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Get In Touch</p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", marginBottom: "44px" }}>
          <h2 style={{ color: T.textMain, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Contact</h2>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: T.primary, color: "#fff", fontWeight: 600, fontSize: "13px", padding: "9px 20px", borderRadius: T.radius, textDecoration: "none", boxShadow: T.shadow }}>
            <IcoMail /> Send us a Message
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {/* Primary phone card */}
          <div style={{ background: T.heroBadgeRed, borderRadius: T.radiusMd, padding: "28px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: "16px" }}>
              <IcoPhone />
            </div>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Phone (Primary)</p>
            <a href={`tel:${epoSettings.phone}`} style={{ color: "#fff", fontWeight: 800, fontSize: "20px", textDecoration: "none", display: "block", marginBottom: "4px" }}>{epoSettings.phone}</a>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "12px", margin: 0 }}>24/7 for breakdown · all bookings by phone</p>
          </div>

          {/* Secondary phone */}
          {epoSettings.phoneAlt && (
            <div style={{ background: T.bg, border: `1.5px solid ${T.borderBlue}`, borderRadius: T.radiusMd, padding: "28px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginBottom: "16px" }}>
                <IcoPhone />
              </div>
              <p style={{ color: T.textSub, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Phone (Alternative)</p>
              <a href={`tel:${epoSettings.phoneAlt}`} style={{ color: T.accent, fontWeight: 800, fontSize: "19px", textDecoration: "none" }}>{epoSettings.phoneAlt}</a>
            </div>
          )}

          {/* Accounts phone */}
          {epoSettings.phoneAccounts && (
            <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginBottom: "16px" }}>
                <IcoPhone />
              </div>
              <p style={{ color: T.textSub, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Accounts</p>
              <a href={`tel:${epoSettings.phoneAccounts}`} style={{ color: T.accent, fontWeight: 800, fontSize: "19px", textDecoration: "none" }}>{epoSettings.phoneAccounts}</a>
            </div>
          )}

          {/* Location */}
          <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginBottom: "16px" }}>
              <IcoMapPin />
            </div>
            <p style={{ color: T.textSub, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Location</p>
            <p style={{ color: T.textMain, fontWeight: 600, fontSize: "15px", margin: 0 }}>{epoSettings.addressUrl ? <a href={epoSettings.addressUrl} target="_blank" rel="noopener noreferrer" style={{ color: T.textMain, textDecoration: "underline" }}>{epoSettings.address}</a> : epoSettings.address}</p>
          </div>

          {/* Hours summary */}
          <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginBottom: "16px" }}>
              <IcoClock />
            </div>
            <p style={{ color: T.textSub, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Opening Hours</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {workingHours.map((h) => (
                <li key={h.label} style={{ display: "flex", justifyContent: "space-between", color: h.is247 ? T.accent : T.textSub, fontSize: "13px", fontWeight: h.is247 ? 700 : 400 }}>
                  <span>{h.label}</span><span>{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* General email */}
          <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginBottom: "16px" }}>
              <IcoMail />
            </div>
            <p style={{ color: T.textSub, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>General Enquiries</p>
            <a href={`mailto:${epoSettings.email}`} style={{ color: T.accent, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>{epoSettings.email}</a>
          </div>

          {/* Parts email */}
          {epoSettings.emailParts && (
            <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginBottom: "16px" }}>
                <IcoMail />
              </div>
              <p style={{ color: T.textSub, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Parts Enquiries</p>
              <a href={`mailto:${epoSettings.emailParts}`} style={{ color: T.accent, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>{epoSettings.emailParts}</a>
            </div>
          )}

          {/* Accounts email */}
          {epoSettings.emailAccounts && (
            <div style={{ background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "28px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginBottom: "16px" }}>
                <IcoMail />
              </div>
              <p style={{ color: T.textSub, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Accounts</p>
              <a href={`mailto:${epoSettings.emailAccounts}`} style={{ color: T.accent, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>{epoSettings.emailAccounts}</a>
            </div>
          )}
        </div>

        {/* Mini map */}
        <a href={epoSettings.addressUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "28px", borderRadius: T.radiusMd, overflow: "hidden", border: `1.5px solid ${T.border}`, textDecoration: "none" }}>
          <iframe
            title="EPO Commercials location"
            src="https://maps.google.com/maps?q=53.248172,-6.526338&output=embed"
            width="100%"
            height="220"
            style={{ border: 0, display: "block", pointerEvents: "none" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts"
          />
          <div style={{ background: T.bg, padding: "12px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <IcoMapPin />
            <span style={{ color: T.textMain, fontWeight: 600, fontSize: "14px" }}>{epoSettings.address}</span>
            <span style={{ color: T.accent, fontSize: "13px", fontWeight: 600, marginLeft: "auto" }}>Open in Google Maps &rarr;</span>
          </div>
        </a>
      </div>
    </section>
  );
}
