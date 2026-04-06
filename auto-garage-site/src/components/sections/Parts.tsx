import { useState, useEffect } from "react";
import { T, container } from "../../theme.ts";
import { epoSettings, fetchParts } from "../../cms/epoData.ts";
import type { Part } from "../../cms/epoData.ts";
import { IcoPkg, IcoMail } from "../../assets/icons/index.ts";

function PartCard({ p }: { p: Part }) {
  const [hov, setHov] = useState(false);
  const addedLabel =
    p.created_at
      ? new Date(p.created_at).toLocaleDateString("en-IE", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: T.bgWhite, border: `1.5px solid ${hov ? T.primary : T.border}`, borderRadius: T.radiusMd, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: hov ? T.shadowHover : T.shadow, transition: "all 0.2s" }}>
      <div style={{ height: "160px", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
        {p.image_url ? (
          <img src={p.image_url} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <IcoPkg />
            <span style={{ color: T.textMuted, fontSize: "11px" }}>No photo available</span>
          </>
        )}
      </div>
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ color: T.textMain, fontWeight: 700, fontSize: "14px", lineHeight: 1.3, margin: 0 }}>{p.name}</h3>
        <div>
          {p.price != null ? (
            <span style={{ color: T.accent, fontWeight: 800, fontSize: "20px" }}>€{p.price}</span>
          ) : (
            <span style={{ color: T.textMuted, fontSize: "13px" }}>Price on request</span>
          )}
        </div>
        {addedLabel && (
          <p style={{ color: T.textMuted, fontSize: "11px", margin: 0 }}>
            Added {addedLabel}
          </p>
        )}
      </div>
    </article>
  );
}

export default function Parts({ limit, showViewMore }: { limit?: number; showViewMore?: boolean } = {}) {
  const [parts, setParts] = useState<Part[]>([]);
  useEffect(() => {
    fetchParts().then(setParts).catch(() => setParts([]));
  }, []);

  const displayed = limit != null ? parts.slice(0, limit) : parts;

  return (
    <section id="parts" style={{ background: T.bg }}>
      <div style={{ ...container, paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ marginBottom: "44px" }}>
          <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Available Stock</p>
          <h2 style={{ color: T.textMain, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "8px" }}>Parts for Sale</h2>
          <p style={{ color: T.textMain, fontSize: "15px", lineHeight: 1.7, maxWidth: "500px" }}>Quality parts for heavy vehicles. Stock updated regularly — contact us for current availability and pricing.</p>
        </div>

        {displayed.length === 0 ? (
          <div style={{ background: T.bgWhite, border: `1.5px dashed ${T.border}`, borderRadius: T.radiusMd, padding: "56px 24px", textAlign: "center", color: T.textMuted }}>
            <IcoPkg />
            <p style={{ marginTop: "12px", fontSize: "14px" }}>No parts listed yet. Check back soon or call us to enquire.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {displayed.map((p) => <PartCard key={p.id} p={p} />)}
          </div>
        )}

        {showViewMore && limit != null && parts.length > limit && (
          <div style={{ marginTop: "28px", textAlign: "center" }}>
            <a
              href="/parts"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "11px 26px",
                borderRadius: T.radius,
                border: `1.5px solid ${T.accent}`,
                color: T.accent,
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                background: T.bgWhite,
              }}
            >
              View more parts
            </a>
          </div>
        )}

        {/* Email enquiry */}
        <div style={{ marginTop: "32px", background: T.bgWhite, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, padding: "22px 28px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "14px", boxShadow: T.shadow }}>
          <div>
            <p style={{ color: T.textMain, fontSize: "15px", fontWeight: 700, margin: "0 0 2px" }}>Can't find what you need?</p>
            <p style={{ color: T.textMain, fontSize: "14px", lineHeight: 1.6, margin: 0 }}>Send a parts enquiry by email and we'll get back to you.</p>
          </div>
          <a href={`mailto:${epoSettings.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: `2px solid ${T.accent}`, color: T.accent, fontWeight: 700, fontSize: "13px", padding: "10px 20px", borderRadius: T.radius, textDecoration: "none" }}>
            <IcoMail /> {epoSettings.email}
          </a>
        </div>
      </div>
    </section>
  );
}
