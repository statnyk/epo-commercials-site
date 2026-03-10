import { useState, useEffect } from "react";
import { T } from "../../theme.ts";

export default function ScrollToFooterBtn() {
  const [visible, setVisible] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title="Scroll to footer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 200,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: `2px solid ${hov ? T.primary : T.accent}`,
        background: hov ? T.primary : T.accent,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: T.shadowMd,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease, background 0.2s, color 0.2s, border-color 0.2s",
        animation: visible ? "scrollBounce 2s ease-in-out infinite" : "none",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
