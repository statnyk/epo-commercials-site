export const T = {
  /* Brand */
  primary:      "#0052A3",
  primaryDark:  "#002F5E",
  primaryLight: "#E8F0FB",
  accent:       "#0088FF",

  /* Text */
  textMain:     "#222222",
  textSub:      "#4B5563",
  textMuted:    "#9CA3AF",
  textInverse:  "#FFFFFF",

  /* Surfaces */
  bg:           "#E2E8F0",
  bgWhite:      "#FFFFFF",
  bgDark:       "#002F5E",

  /* UI */
  border:       "#E5E7EB",
  borderBlue:   "rgba(0,82,163,0.18)",
  shadow:       "0 2px 8px rgba(0,82,163,0.08)",
  shadowMd:     "0 4px 16px rgba(0,82,163,0.12)",
  shadowHover:  "0 8px 28px rgba(0,82,163,0.18)",

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
