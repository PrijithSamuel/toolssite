"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = e.target;
    const data = new FormData(form);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });
    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header />

      {/* Hero */}
      <div style={{ background: "#4F46E5", padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "600", color: "white", marginBottom: "12px" }}>
            Contact Us
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)" }}>
            Have a question, suggestion or found a bug? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "14px", padding: "32px" }}>
          <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "24px" }}>
            We typically respond within 24–48 hours.
          </p>

          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#1E1B4B", marginBottom: "6px" }}>Message sent!</p>
              <p style={{ fontSize: "14px", color: "#6B7280" }}>Thanks for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
              <input type="hidden" name="subject" value="QuikToolkit Contact Form" />
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />

              <div>
                <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  style={{ width: "100%", padding: "10px 14px", border: "0.5px solid #D1D5DB", borderRadius: "8px", fontSize: "14px", color: "#1E1B4B", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  style={{ width: "100%", padding: "10px 14px", border: "0.5px solid #D1D5DB", borderRadius: "8px", fontSize: "14px", color: "#1E1B4B", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message..."
                  style={{ width: "100%", padding: "10px 14px", border: "0.5px solid #D1D5DB", borderRadius: "8px", fontSize: "14px", color: "#1E1B4B", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>

              {status === "error" && (
                <p style={{ fontSize: "13px", color: "#DC2626" }}>Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                style={{ background: "#4F46E5", color: "white", border: "none", borderRadius: "8px", padding: "12px", fontSize: "14px", fontWeight: "500", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
