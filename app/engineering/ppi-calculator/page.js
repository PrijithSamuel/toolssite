"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const REFERENCES = [
  { device: "iPhone 15",         res: "2556×1179", diag: 6.1,  ppi: 460 },
  { device: "MacBook Pro 14\"",  res: "3024×1964", diag: 14.2, ppi: 254 },
  { device: "4K TV 55\"",        res: "3840×2160", diag: 55,   ppi: 80  },
  { device: "Full HD Monitor 24\"", res: "1920×1080", diag: 24, ppi: 92 },
];

function getRating(ppi) {
  if (!ppi) return null;
  if (ppi < 100)  return { label: "Low Resolution",    color: "#EF4444", bg: "#FFF5F5", border: "#FCA5A5" };
  if (ppi < 200)  return { label: "Standard",           color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" };
  if (ppi < 300)  return { label: "High Resolution",    color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" };
  return           { label: "Retina / HiDPI",           color: "#10B981", bg: "#ECFDF5", border: "#6EE7B7" };
}

export default function PpiCalculator() {
  const [sw, setSw] = useState("2560");
  const [sh, setSh] = useState("1440");
  const [diag, setDiag] = useState("27");

  const W = parseFloat(sw), H = parseFloat(sh), D = parseFloat(diag);
  const valid = W > 0 && H > 0 && D > 0;

  const diagPx = valid ? Math.sqrt(W * W + H * H) : 0;
  const ppi = valid ? diagPx / D : 0;
  const megapixels = valid ? (W * H) / 1e6 : 0;
  const dotPitchMm = valid ? 25.4 / ppi : 0;

  const ppiRounded = Math.round(ppi);
  const rating = valid ? getRating(ppiRounded) : null;

  const inp = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Engineering", href: "/engineering" }, { label: "PPI Calculator" }]} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>PPI Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate pixels per inch, total megapixels and dot pitch for any screen.</p>
        </div>

        {/* Inputs */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Width (px)</label>
              <input type="number" value={sw} onChange={(e) => setSw(e.target.value)} placeholder="2560" min="1" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Height (px)</label>
              <input type="number" value={sh} onChange={(e) => setSh(e.target.value)} placeholder="1440" min="1" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Diagonal (inches)</label>
              <input type="number" value={diag} onChange={(e) => setDiag(e.target.value)} placeholder="27" min="0.1" step="0.1" style={inp} />
            </div>
          </div>
        </div>

        {valid && rating && (
          <>
            {/* PPI hero */}
            <div style={{ background: rating.bg, border: `0.5px solid ${rating.border}`, borderRadius: "12px", padding: "28px 24px", marginBottom: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: rating.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>{rating.label}</div>
              <div style={{ fontSize: "72px", fontWeight: "700", color: rating.color, lineHeight: 1 }}>
                {ppiRounded}
                <span style={{ fontSize: "24px", marginLeft: "6px" }}>PPI</span>
              </div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "8px" }}>pixels per inch</div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              {[
                { label: "Megapixels", value: megapixels.toFixed(2) + " MP", sub: `${Math.round(W * H).toLocaleString()} total pixels` },
                { label: "Dot Pitch", value: dotPitchMm.toFixed(3) + " mm", sub: "distance between pixel centres" },
                { label: "Diagonal (px)", value: Math.round(diagPx).toLocaleString(), sub: "diagonal pixel count" },
                { label: "Density", value: `${ppiRounded} PPI`, sub: `${(ppiRounded * 0.3937).toFixed(1)} PPCM` },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px 16px" }}>
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: "#4F46E5" }}>{value}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* PPI rating guide */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>PPI Rating Guide</div>
              {[
                { range: "< 100 PPI",   label: "Low Resolution",  color: "#EF4444", active: ppiRounded < 100 },
                { range: "100–199 PPI", label: "Standard",         color: "#F59E0B", active: ppiRounded >= 100 && ppiRounded < 200 },
                { range: "200–299 PPI", label: "High Resolution",  color: "#3B82F6", active: ppiRounded >= 200 && ppiRounded < 300 },
                { range: "300+ PPI",    label: "Retina / HiDPI",   color: "#10B981", active: ppiRounded >= 300 },
              ].map(({ range, label, color, active }) => (
                <div key={range} style={{ padding: "11px 20px", borderBottom: "0.5px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center", background: active ? "#F8F9FF" : "white" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: "13px", color: active ? color : "#374151", fontWeight: active ? "600" : "400" }}>{label}</span>
                    {active && <span style={{ fontSize: "11px", background: color, color: "white", borderRadius: "4px", padding: "1px 6px" }}>Your screen</span>}
                  </div>
                  <span style={{ fontSize: "12px", color: "#9CA3AF", fontFamily: "monospace" }}>{range}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reference table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151", background: "#F8F9FF" }}>Reference Devices</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#F8F9FF" }}>
                {["Device", "Resolution", "Diagonal", "PPI"].map((h) => (
                  <th key={h} style={{ padding: "8px 14px", textAlign: "left", color: "#6B7280", fontWeight: "600", borderBottom: "0.5px solid #E0E7FF" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REFERENCES.map((r) => (
                <tr key={r.device} style={{ borderBottom: "0.5px solid #F3F4F6" }}>
                  <td style={{ padding: "9px 14px", color: "#374151", fontWeight: "500" }}>{r.device}</td>
                  <td style={{ padding: "9px 14px", color: "#6B7280", fontFamily: "monospace", fontSize: "12px" }}>{r.res}</td>
                  <td style={{ padding: "9px 14px", color: "#6B7280" }}>{r.diag}&quot;</td>
                  <td style={{ padding: "9px 14px", color: "#4F46E5", fontWeight: "600" }}>{r.ppi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
}
