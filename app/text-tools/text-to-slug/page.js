"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TextToSlug() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  function handleCopy() {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Text to Slug" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Text to Slug</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert any text to a URL-friendly slug instantly. Free, no signup required.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>INPUT TEXT</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Hello World! This is my Blog Post"
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 16px", fontSize: "15px", outline: "none", background: "white", color: "#374151" }}
            />
          </div>

          {text && (
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500" }}>SLUG OUTPUT</label>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{ fontSize: "12px", color: "#6B7280", background: "white", border: "0.5px solid #C7D2FE", padding: "4px 12px", borderRadius: "6px", cursor: "pointer" }}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={{ background: "white", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "14px 16px", fontFamily: "monospace", fontSize: "16px", color: "#4F46E5", wordBreak: "break-all" }}>
                {slug || "—"}
              </div>
            </div>
          )}

          {text && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              {[
                ["Original length", text.length + " chars"],
                ["Slug length", slug.length + " chars"],
                ["Words", slug.split("-").filter(Boolean).length],
              ].map(([label, value]) => (
                <div key={label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: "500", color: "#4F46E5" }}>{value}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Type or paste your text above</li>
            <li>• Slug updates instantly as you type</li>
            <li>• Use for URLs, file names or IDs</li>
            <li>• Special characters are removed automatically</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}