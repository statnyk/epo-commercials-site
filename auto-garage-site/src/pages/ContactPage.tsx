import { useState } from "react";
import { T, container } from "../theme.ts";
import { epoSettings, workingHours } from "../cms/epoData.ts";
import { IcoPhone, IcoMail, IcoMapPin, IcoClock } from "../assets/icons/index.ts";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";
import useDocumentMeta from "../hooks/useDocumentMeta.ts";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  useDocumentMeta({
    title: "Contact Us – EPO Commercials",
    description: "Get in touch with EPO Commercials. 24/7 breakdown assistance, bus and truck repair enquiries. Located at Oldmill Industrial Estate, Co. Kildare.",
    canonical: "https://www.epocommercials.ie/contact",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const canSubmit = name.trim() && email.trim() && message.trim() && status !== "sending";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          message: message.trim(),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: T.bg,
    border: `1.5px solid ${T.border}`,
    borderRadius: T.radius,
    padding: "12px 14px",
    color: T.textMain,
    fontSize: "14px",
    fontFamily: T.fontFamily,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    color: T.textSub,
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: T.fontFamily }}>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>
        {/* Page header */}
        <section style={{ background: T.bgWhite, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ ...container, paddingTop: "60px", paddingBottom: "32px" }}>
            <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Get In Touch</p>
            <h1 style={{ color: T.textMain, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Contact Us</h1>
            <p style={{ color: T.textSub, fontSize: "14px", marginTop: "10px", maxWidth: "520px" }}>
              Send us a message and we'll get back to you as soon as possible. For urgent breakdowns, please call directly.
            </p>
          </div>
        </section>

        {/* Form + sidebar */}
        <section style={{ background: T.bg }}>
          <div style={{ ...container, paddingTop: "48px", paddingBottom: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "start" }}>

            {/* Form */}
            <div style={{ background: T.bgWhite, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "32px" }}>
              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 style={{ color: T.textMain, fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>Message Sent</h3>
                  <p style={{ color: T.textSub, fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    style={{ background: T.accent, color: "#fff", border: "none", borderRadius: T.radius, padding: "10px 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ color: T.textMain, fontSize: "1.2rem", fontWeight: 700, marginBottom: "24px" }}>Send a Message</h2>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        style={inputStyle}
                        onFocus={(e) => e.currentTarget.style.borderColor = T.accent}
                        onBlur={(e) => e.currentTarget.style.borderColor = T.border}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        style={inputStyle}
                        onFocus={(e) => e.currentTarget.style.borderColor = T.accent}
                        onBlur={(e) => e.currentTarget.style.borderColor = T.border}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={labelStyle}>Phone (optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+353 ..."
                      style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = T.accent}
                      onBlur={(e) => e.currentTarget.style.borderColor = T.border}
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      required
                      rows={5}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                      onFocus={(e) => e.currentTarget.style.borderColor = T.accent}
                      onBlur={(e) => e.currentTarget.style.borderColor = T.border}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ color: T.heroBadgeRed, fontSize: "13px", marginBottom: "16px" }}>
                      Something went wrong. Please try again or contact us by phone.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    style={{
                      width: "100%",
                      background: canSubmit ? T.primary : T.textMuted,
                      color: "#fff",
                      border: "none",
                      borderRadius: T.radius,
                      padding: "14px 28px",
                      fontSize: "15px",
                      fontWeight: 700,
                      cursor: canSubmit ? "pointer" : "not-allowed",
                      transition: "background 0.15s",
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Urgent callout */}
              <div style={{ background: T.heroBadgeRed, borderRadius: T.radiusMd, padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: T.radius, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <IcoPhone />
                  </div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>24/7 Breakdown</p>
                  </div>
                </div>
                <a href={`tel:${epoSettings.phone}`} style={{ color: "#fff", fontWeight: 800, fontSize: "20px", textDecoration: "none", display: "block", marginBottom: "4px" }}>{epoSettings.phone}</a>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "12px", margin: 0 }}>For urgent breakdowns, call us directly</p>
              </div>

              {/* Alt phone */}
              {epoSettings.phoneAlt && (
                <InfoCard icon={<IcoPhone />} label="Alternative Phone">
                  <a href={`tel:${epoSettings.phoneAlt}`} style={{ color: T.accent, fontWeight: 700, fontSize: "16px", textDecoration: "none" }}>{epoSettings.phoneAlt}</a>
                </InfoCard>
              )}

              {/* Email */}
              <InfoCard icon={<IcoMail />} label="Email">
                <a href={`mailto:${epoSettings.email}`} style={{ color: T.accent, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>{epoSettings.email}</a>
              </InfoCard>

              {/* Location */}
              <InfoCard icon={<IcoMapPin />} label="Location">
                <p style={{ color: T.textMain, fontWeight: 600, fontSize: "14px", margin: 0 }}>{epoSettings.addressUrl ? <a href={epoSettings.addressUrl} target="_blank" rel="noopener noreferrer" style={{ color: T.textMain, textDecoration: "underline" }}>{epoSettings.address}</a> : epoSettings.address}</p>
              </InfoCard>

              {/* Hours */}
              <InfoCard icon={<IcoClock />} label="Opening Hours">
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                  {workingHours.map((h) => (
                    <li key={h.label} style={{ display: "flex", justifyContent: "space-between", color: h.is247 ? T.accent : T.textSub, fontSize: "13px", fontWeight: h.is247 ? 700 : 400 }}>
                      <span>{h.label}</span><span style={{ marginLeft: "16px" }}>{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function InfoCard({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: T.bgWhite, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: T.radius, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, flexShrink: 0 }}>
          {icon}
        </div>
        <p style={{ color: T.textSub, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>{label}</p>
      </div>
      {children}
    </div>
  );
}
