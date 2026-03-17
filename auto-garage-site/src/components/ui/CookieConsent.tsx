import { useState, useEffect } from "react";
import { T } from "../../theme.ts";

const STORAGE_KEY = "epo_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: T.primaryDark,
        borderTop: `1px solid ${T.border}`,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.4)",
        padding: "16px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px 20px",
        animation: "cookieSlideUp 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes cookieSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", lineHeight: 1.6, margin: 0, maxWidth: "620px", textAlign: "center" }}>
        We use essential cookies to ensure our website functions correctly. We do not use advertising or tracking cookies.
        See our{" "}
        <a href="/privacy" style={{ color: T.accent, textDecoration: "underline" }}>Privacy Policy</a>{" "}
        for more details.
      </p>
      <button
        onClick={accept}
        style={{
          background: T.accent,
          color: "#fff",
          border: "none",
          borderRadius: T.radius,
          padding: "8px 24px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Accept
      </button>
    </div>
  );
}
