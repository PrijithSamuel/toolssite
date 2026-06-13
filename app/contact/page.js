import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact QuikToolkit — Free Online Tools",
  description: "Contact the QuikToolkit team with questions, suggestions or bug reports.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header />

      <div style={{ background: "#4F46E5", padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "600", color: "white", marginBottom: "12px" }}>
            Contact Us
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>
            Have a question, suggestion or found a bug? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "14px", padding: "32px" }}>
          <div style={{ textAlign: "center", padding: "32px" }}>
            <p style={{ fontSize: "14px", color: "#4B5563", marginBottom: "16px" }}>
              Have a question or suggestion? We would love to hear from you.
            </p>
            <a
              href="mailto:contact@quiktoolkit.com"
              style={{
                background: "#4F46E5", color: "white", padding: "12px 24px",
                borderRadius: "8px", textDecoration: "none", fontSize: "14px",
                fontWeight: "500", display: "inline-block"
              }}>
              Email Us at contact@quiktoolkit.com
            </a>
            <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "16px" }}>
              We typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
