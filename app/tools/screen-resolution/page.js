"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RESOLUTIONS = [
  { name: "720p HD",          w: 1280,  h: 720,  ratio: "16:9",  use: "TV / YouTube" },
  { name: "1080p Full HD",    w: 1920,  h: 1080, ratio: "16:9",  use: "Standard monitor" },
  { name: "1440p QHD",        w: 2560,  h: 1440, ratio: "16:9",  use: "Gaming monitor" },
  { name: "4K UHD",           w: 3840,  h: 2160, ratio: "16:9",  use: "4K TV / Monitor" },
  { name: "8K",               w: 7680,  h: 4320, ratio: "16:9",  use: "Professional" },
  { name: "iPhone 15",        w: 2556,  h: 1179, ratio: "19.5:9",use: "Smartphone" },
  { name: "Instagram Square", w: 1080,  h: 1080, ratio: "1:1",   use: "Social media" },
  { name: "Instagram Portrait",w:1080,  h: 1350, ratio: "4:5",   use: "Social media" },
  { name: "Instagram Story",  w: 1080,  h: 1920, ratio: "9:16",  use: "Stories / Reels" },
  { name: "YouTube Thumbnail",w: 1280,  h: 720,  ratio: "16:9",  use: "Video thumbnail" },
  { name: "Facebook Cover",   w: 820,   h: 312,  ratio: "~2.6:1",use: "Social media" },
  { name: "Twitter Header",   w: 1500,  h: 500,  ratio: "3:1",   use: "Social media" },
  { name: "LinkedIn Cover",   w: 1584,  h: 396,  ratio: "4:1",   use: "Professional" },
];

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function simplifyRatio(w, h) {
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

function findMatch(w, h) {
  return RESOLUTIONS.find((r) => r.w === w && r.h === h) || null;
}

const CATEGORY_COLORS = {
  "TV / YouTube":     "#DBEAFE",
  "Standard monitor": "#DBEAFE",
  "Gaming monitor":   "#DBEAFE",
  "4K TV / Monitor":  "#DBEAFE",
  "Professional":     "#E0E7FF",
  "Smartphone":       "#D1FAE5",
  "Social media":     "#FEF3C7",
  "Stories / Reels":  "#FEF3C7",
  "Video thumbnail":  "#FEF3C7",
  "Social media":     "#FEF3C7",
};

const USE_COLORS = {
  "TV / YouTube":     { bg: "#DBEAFE", color: "#1D4ED8" },
  "Standard monitor": { bg: "#DBEAFE", color: "#1D4ED8" },
  "Gaming monitor":   { bg: "#DBEAFE", color: "#1D4ED8" },
  "4K TV / Monitor":  { bg: "#DBEAFE", color: "#1D4ED8" },
  "Professional":     { bg: "#EDE9FE", color: "#6D28D9" },
  "Smartphone":       { bg: "#D1FAE5", color: "#065F46" },
  "Social media":     { bg: "#FEF3C7", color: "#92400E" },
  "Stories / Reels":  { bg: "#FEF3C7", color: "#92400E" },
  "Video thumbnail":  { bg: "#FEF3C7", color: "#92400E" },
};

function getUseStyle(use) {
  return USE_COLORS[use] || { bg: "#F3F4F6", color: "#374151" };
}

export default function ScreenResolution() {
  const [cw, setCw] = useState("");
  const [ch, setCh] = useState("");

  const pw = parseInt(cw);
  const ph = parseInt(ch);
  const valid = pw > 0 && ph > 0;

  const ratio     = valid ? simplifyRatio(pw, ph) : null;
  const totalPx   = valid ? (pw * ph).toLocaleString() : null;
  const mp        = valid ? (pw * ph / 1_000_000).toFixed(2) : null;
  const match     = valid ? findMatch(pw, ph) : null;

  const inputStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  // Bar chart: normalise widths to 4K as 100%
  const maxW = 7680;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Screen Resolution Reference" }]} />
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>🖥️ Screen Resolution Reference &amp; Aspect Ratio Tool</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Common resolutions for displays, social media and video — plus a custom aspect ratio calculator.</p>
        </div>

        {/* ── Section 1: Reference table ── */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "24px" }}>
          <div style={{ padding: "12px 18px", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "700", color: "#374151" }}>
            Common Resolutions Reference
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8F9FF" }}>
                  {["Name", "Width", "Height", "Aspect Ratio", "Megapixels", "Use Case"].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: "700", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left", borderBottom: "0.5px solid #E0E7FF", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RESOLUTIONS.map((r, i) => {
                  const useStyle = getUseStyle(r.use);
                  const mpVal = (r.w * r.h / 1_000_000).toFixed(1);
                  return (
                    <tr key={i} style={{ borderBottom: i < RESOLUTIONS.length - 1 ? "0.5px solid #F3F4F6" : "none" }}>
                      <td style={{ padding: "11px 14px", fontSize: "13px", fontWeight: "600", color: "#1E1B4B", whiteSpace: "nowrap" }}>{r.name}</td>
                      <td style={{ padding: "11px 14px", fontSize: "13px", fontFamily: "monospace", color: "#374151" }}>{r.w.toLocaleString()}</td>
                      <td style={{ padding: "11px 14px", fontSize: "13px", fontFamily: "monospace", color: "#374151" }}>{r.h.toLocaleString()}</td>
                      <td style={{ padding: "11px 14px", fontSize: "13px", fontFamily: "monospace", color: "#6366F1", fontWeight: "600" }}>{r.ratio}</td>
                      <td style={{ padding: "11px 14px", fontSize: "13px", color: "#374151" }}>{mpVal} MP</td>
                      <td style={{ padding: "11px 14px" }}>
                        <span style={{ padding: "3px 10px", borderRadius: "20px", background: useStyle.bg, color: useStyle.color, fontSize: "11px", fontWeight: "600", whiteSpace: "nowrap" }}>
                          {r.use}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual width comparison bars */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>Width Comparison</div>
          {RESOLUTIONS.filter((r) => r.ratio === "16:9").map((r) => (
            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", minWidth: "130px" }}>{r.name}</span>
              <div style={{ flex: 1, height: "10px", borderRadius: "5px", background: "#F3F4F6", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(r.w / maxW) * 100}%`, background: "linear-gradient(90deg, #4F46E5, #818CF8)", borderRadius: "5px" }} />
              </div>
              <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#374151", minWidth: "42px", textAlign: "right" }}>{r.w}px</span>
            </div>
          ))}
        </div>

        {/* ── Section 2: Custom calculator ── */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 24px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "16px" }}>Custom Resolution Calculator</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", display: "block", marginBottom: "5px" }}>Width (px)</label>
              <input type="number" min="1" value={cw} onChange={(e) => setCw(e.target.value)} placeholder="e.g. 1920" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", display: "block", marginBottom: "5px" }}>Height (px)</label>
              <input type="number" min="1" value={ch} onChange={(e) => setCh(e.target.value)} placeholder="e.g. 1080" style={inputStyle} />
            </div>
          </div>

          {valid && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "14px" }}>
                {[
                  { label: "Aspect Ratio", value: ratio, color: "#6366F1" },
                  { label: "Total Pixels", value: totalPx, color: "#4F46E5" },
                  { label: "Megapixels",   value: `${mp} MP`, color: "#7C3AED" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background: "#EEF2FF", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "800", color, fontFamily: "monospace" }}>{value}</div>
                    <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "3px" }}>{label}</div>
                  </div>
                ))}
              </div>

              {match ? (
                <div style={{ background: "#ECFDF5", border: "0.5px solid #6EE7B7", borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "18px" }}>✅</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#065F46" }}>Matches: {match.name}</div>
                    <div style={{ fontSize: "12px", color: "#047857" }}>Used for: {match.use}</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color: "#4F46E5" }}>
                  ℹ️ No exact match in the standard resolutions list. Aspect ratio: <strong>{ratio}</strong>.
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
