import { T, container } from "../theme.ts";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";
import Parts from "../components/sections/Parts.tsx";

export default function PartsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: T.fontFamily }}>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>
        <section style={{ background: T.bgWhite, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ ...container, paddingTop: "60px", paddingBottom: "32px" }}>
            <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Parts Catalogue</p>
            <h1 style={{ color: T.textMain, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>All Parts for Sale</h1>
            <p style={{ color: T.textSub, fontSize: "14px", marginTop: "10px", maxWidth: "520px" }}>
              Browse the full list of parts currently listed for heavy vehicles. For availability and pricing confirmation, please contact us by phone or email.
            </p>
          </div>
        </section>
        <Parts />
      </main>
      <Footer />
    </div>
  );
}
