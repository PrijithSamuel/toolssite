"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function isValidHex(hex) { return /^#[0-9A-Fa-f]{6}$/.test(hex); }

export default function ColorConverter() {
  const [hex, setHex] = useState("#4F46E5");
  const [copied, setCopied] = useState("");

  const validHex = isValidHex(hex);
  const rgb = validHex ? hexToRgb(hex) : null;
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  function handleCopy(text, label) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }

  const presets = ["#4F46E5", "#059669", "#DC2626", "#D97706", "#2563EB", "#7C3AED", "#EC4899", "#000000", "#ffffff", "#6B7280", "#1E1B4B", "#F5F3FF"];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "Color Converter" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Color Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert HEX colors to RGB and HSL instantly. Free, no signup.</p>
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ width: "100%", height: "100px", borderRadius: "10px", background: validHex ? hex : "#ffffff", border: "0.5px solid #C7D2FE", marginBottom: "16px" }} />
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input type="color" value={validHex ? hex : "#000000"} onChange={(e) => setHex(e.target.value)}
              style={{ width: "44px", height: "40px", borderRadius: "8px", border: "0.5px solid #C7D2FE", cursor: "pointer", padding: "2px" }} />
            <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#4F46E5"
              style={{ flex: 1, border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", fontFamily: "monospace", outline: "none", background: "white", color: "#374151" }} />
          </div>
        </div>

        {validHex && rgb && hsl && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
            {[
              { label: "HEX", value: hex.toUpperCase() },
              { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
              { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
              { label: "RGB Values", value: `R: ${rgb.r}  G: ${rgb.g}  B: ${rgb.b}` },
            ].map((item) => (
              <div key={item.label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginRight: "12px" }}>{item.label}</span>
                  <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#374151" }}>{item.value}</span>
                </div>
                <button type="button" onClick={() => handleCopy(item.value, item.label)}
                  style={{ fontSize: "12px", color: "#6B7280", background: "#EEF2FF", border: "0.5px solid #C7D2FE", padding: "3px 10px", borderRadius: "6px", cursor: "pointer" }}>
                  {copied === item.label ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}

        <div>
          <p style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "8px" }}>QUICK PRESETS</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {presets.map((color) => (
              <button key={color} type="button" onClick={() => setHex(color)}
                style={{ width: "32px", height: "32px", borderRadius: "8px", background: color, border: hex === color ? "2px solid #4F46E5" : "0.5px solid #C7D2FE", cursor: "pointer" }} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}