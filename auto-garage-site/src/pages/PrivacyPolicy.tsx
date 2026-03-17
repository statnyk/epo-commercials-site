import { T, container } from "../theme.ts";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";

const S = {
  heading: { color: T.textMain, fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700, marginTop: "32px", marginBottom: "12px" } as React.CSSProperties,
  p: { color: T.textSub, fontSize: "14px", lineHeight: 1.8, marginBottom: "12px" } as React.CSSProperties,
  ul: { color: T.textSub, fontSize: "14px", lineHeight: 1.8, paddingLeft: "20px", marginBottom: "12px" } as React.CSSProperties,
  link: { color: T.accent, textDecoration: "none" } as React.CSSProperties,
};

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: T.fontFamily }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section style={{ background: T.bgWhite, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ ...container, paddingTop: "60px", paddingBottom: "32px" }}>
            <p style={{ color: T.accent, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Legal</p>
            <h1 style={{ color: T.textMain, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Privacy Policy</h1>
            <p style={{ color: T.textSub, fontSize: "14px", marginTop: "10px" }}>
              Last updated: March 2026
            </p>
          </div>
        </section>

        <section style={{ background: T.bg }}>
          <div style={{ ...container, paddingTop: "40px", paddingBottom: "60px", maxWidth: "780px" }}>

            <h2 style={S.heading}>1. Who We Are</h2>
            <p style={S.p}>
              EPO Commercials is a bus and heavy-duty vehicle repair specialist based in Dublin, Ireland.
              We are committed to protecting the privacy of visitors to our website{" "}
              <a href="https://www.epocommercials.ie" style={S.link}>www.epocommercials.ie</a>.
            </p>
            <p style={S.p}>
              For any questions about this policy or your personal data, contact us at{" "}
              <a href="mailto:info@epocommercials.ie" style={S.link}>info@epocommercials.ie</a> or call{" "}
              <a href="tel:+353877210448" style={S.link}>+353 87 721 0448</a>.
            </p>

            <h2 style={S.heading}>2. What Data We Collect</h2>
            <p style={S.p}>We may collect the following information when you interact with our website:</p>
            <ul style={S.ul}>
              <li>Name and contact details (phone number, email address) when you contact us directly</li>
              <li>Technical data such as IP address, browser type, operating system, and pages visited</li>
              <li>Any information you voluntarily provide via phone, email, or other communication</li>
            </ul>

            <h2 style={S.heading}>3. How We Use Your Data</h2>
            <p style={S.p}>We use your personal data for the following purposes:</p>
            <ul style={S.ul}>
              <li>To respond to your enquiries about our services or parts</li>
              <li>To provide vehicle repair and maintenance services</li>
              <li>To send relevant service updates or appointment reminders</li>
              <li>To improve our website and customer experience</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 style={S.heading}>4. Legal Basis for Processing (GDPR)</h2>
            <p style={S.p}>Under the General Data Protection Regulation (GDPR), we process your data on the following bases:</p>
            <ul style={S.ul}>
              <li><strong style={{ color: T.textMain }}>Consent</strong> — when you voluntarily contact us or provide your details</li>
              <li><strong style={{ color: T.textMain }}>Contractual necessity</strong> — to provide repair services you have requested</li>
              <li><strong style={{ color: T.textMain }}>Legitimate interest</strong> — to improve our services and respond to enquiries</li>
              <li><strong style={{ color: T.textMain }}>Legal obligation</strong> — to comply with applicable laws and regulations</li>
            </ul>

            <h2 style={S.heading}>5. Data Sharing</h2>
            <p style={S.p}>
              We do not sell, trade, or rent your personal data to third parties. We may share data with
              trusted service providers who assist in operating our website or business, provided they agree
              to keep your information confidential. We may also disclose data if required by law.
            </p>

            <h2 style={S.heading}>6. Data Retention</h2>
            <p style={S.p}>
              We retain your personal data only for as long as necessary to fulfil the purposes outlined in
              this policy, or as required by law. Contact and service records are typically retained for up to
              7 years in line with Irish tax and business regulations.
            </p>

            <h2 style={S.heading}>7. Cookies</h2>
            <p style={S.p}>
              Our website may use essential cookies to ensure the site functions correctly. We do not use
              advertising or tracking cookies. If we introduce analytics cookies in the future, we will
              update this policy and seek your consent where required.
            </p>

            <h2 style={S.heading}>8. Your Rights</h2>
            <p style={S.p}>Under GDPR, you have the right to:</p>
            <ul style={S.ul}>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data ("right to be forgotten")</li>
              <li>Restrict or object to the processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p style={S.p}>
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:info@epocommercials.ie" style={S.link}>info@epocommercials.ie</a>.
            </p>

            <h2 style={S.heading}>9. Data Security</h2>
            <p style={S.p}>
              We take appropriate technical and organisational measures to protect your personal data
              against unauthorised access, alteration, disclosure, or destruction. Our website uses SSL
              encryption to secure data in transit.
            </p>

            <h2 style={S.heading}>10. Third-Party Links</h2>
            <p style={S.p}>
              Our website may contain links to external sites. We are not responsible for the privacy
              practices of other websites and encourage you to read their privacy policies.
            </p>

            <h2 style={S.heading}>11. Changes to This Policy</h2>
            <p style={S.p}>
              We may update this privacy policy from time to time. Any changes will be posted on this page
              with an updated revision date. We encourage you to review this policy periodically.
            </p>

            <h2 style={S.heading}>12. Complaints</h2>
            <p style={S.p}>
              If you believe your data protection rights have been violated, you have the right to lodge a
              complaint with the Irish Data Protection Commission (DPC):
            </p>
            <p style={S.p}>
              Data Protection Commission<br />
              21 Fitzwilliam Square South, Dublin 2, D02 RD28, Ireland<br />
              Website: <a href="https://www.dataprotection.ie" style={S.link}>www.dataprotection.ie</a><br />
              Phone: +353 (0)1 765 0100
            </p>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
