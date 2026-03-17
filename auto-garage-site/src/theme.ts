export const T = {
  /* Brand */
  primary:      "#0052A3",
  primaryDark:  "#002F5E",
  primaryLight: "rgba(0,82,163,0.22)",
  accent:       "#3b82f6",

  /* Text (on dark backgrounds) */
  textMain:     "#f1f5f9",
  textSub:      "#94a3b8",
  textMuted:    "#64748b",
  textInverse:  "#FFFFFF",

  /* Surfaces – darker, solid (no white) */
  bg:           "#1e2530",
  bgWhite:      "#252d3b",
  bgDark:       "#002F5E",

  /* UI – red for 24/7 badges, contact phrase, service highlight */
  heroBadgeRed: "#ff6b6b",
  border:       "rgba(255,255,255,0.08)",
  borderBlue:   "rgba(0,82,163,0.35)",
  shadow:       "0 2px 12px rgba(0,0,0,0.25)",
  shadowMd:     "0 4px 20px rgba(0,0,0,0.35)",
  shadowHover:  "0 8px 28px rgba(0,0,0,0.4)",

  /* Radius */
  radius:       "8px",
  radiusMd:     "12px",
  radiusLg:     "16px",

  /* Font */
  fontFamily:   "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
} as const;

/** Shared container styles */
export const container: React.CSSProperties = {
  maxWidth:     "1152px",
  margin:       "0 auto",
  paddingLeft:  "24px",
  paddingRight: "24px",
};

/** Section vertical padding */
export const section = (bg: string): React.CSSProperties => ({
  background:   bg,
  paddingTop:   "80px",
  paddingBottom:"80px",
});
