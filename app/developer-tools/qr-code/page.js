"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import QRCode from "qrcode";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "What can I encode in a QR code?", a: "Any text including URLs, phone numbers, email addresses, plain text, SMS messages and Wi-Fi credentials." },
  { q: "What is the maximum text length for a QR code?", a: "QR codes can hold up to about 3,000 characters of text, though shorter content produces simpler, more scannable codes." },
  { q: "Can I change the QR code colours?", a: "Yes. Use the colour pickers to change both the QR code foreground colour and the background colour." },
  { q: "How do I download the QR code?", a: "Click the Download PNG button to save the QR code as a PNG image to your device." },
  { q: "Will the QR code work forever?", a: "The QR code itself has no expiry. However if the URL it points to changes or goes offline the code will stop working." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [color, setColor] = useState("#1E1B4B");
  const [bg, setBg] = useState("#ffffff");
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!text || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text, { width: size, color: { dark: color, light: bg }, margin: 2 });
  }, [text, size, color, bg]);

  function download() {
    if (!canvasRef.current || !text) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  }

  const inputStyle = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "QR Code Generator" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>QR Code Generator — Create QR Codes Free Online</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Generate QR codes for any text or URL. Free, no signup required.</p>
        </div>

        <div style={introStyle}>
          QR codes are two-dimensional barcodes that smartphones can scan to instantly open a URL, display contact information, connect to Wi-Fi, or trigger any other text-based action. They are widely used on business cards, restaurant menus, event tickets, product packaging, and marketing materials. This generator creates QR codes for any text input — most commonly a URL. You can adjust the size for print or screen use, and customise the foreground and background colours to match your branding. Download the result as a PNG image ready for use in any design tool or printed material.
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>TEXT OR URL</label>
            <input type="text" placeholder="e.g. https://quiktoolkit.com" value={text} onChange={(e) => setText(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
              <span style={{ fontWeight: "500", color: "#1E1B4B" }}>Size</span>
              <span style={{ color: "#6366F1" }}>{size}px</span>
            </div>
            <input type="range" min="128" max="512" step="32" value={size} onChange={(e) => setSize(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#4F46E5" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>QR COLOR</label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: "40px", height: "36px", borderRadius: "6px", border: "0.5px solid #C7D2FE", cursor: "pointer" }} />
                <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#374151" }}>{color}</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>BACKGROUND</label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: "40px", height: "36px", borderRadius: "6px", border: "0.5px solid #C7D2FE", cursor: "pointer" }} />
                <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#374151" }}>{bg}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          {text ? (
            <>
              <canvas ref={canvasRef} style={{ borderRadius: "12px", border: "0.5px solid #E0E7FF" }} />
              <button type="button" onClick={download}
                style={{ background: "#4F46E5", color: "white", border: "none", padding: "12px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
                Download PNG
              </button>
            </>
          ) : (
            <div style={{ width: "200px", height: "200px", background: "white", border: "2px dashed #C7D2FE", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontSize: "12px", color: "#9CA3AF", textAlign: "center", padding: "16px" }}>Enter text above to generate your QR code</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Type any text or paste a URL above</li>
            <li>• QR code generates instantly as you type</li>
            <li>• Adjust size and colors as needed</li>
            <li>• Click Download PNG to save</li>
          </ul>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}