"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PRINT_SIZES = [
  { name: "10×15 cm",  sub: "4×6 inch",   wCm: 10, hCm: 15, minW: 1181, minH: 1772 },
  { name: "13×18 cm",  sub: "5×7 inch",   wCm: 13, hCm: 18, minW: 1535, minH: 2126 },
  { name: "15×21 cm",  sub: "A5",         wCm: 15, hCm: 21, minW: 1772, minH: 2480 },
  { name: "20×30 cm",  sub: "8×12 inch",  wCm: 20, hCm: 30, minW: 2362, minH: 3543 },
  { name: "21×29.7 cm",sub: "A4",         wCm: 21, hCm: 29.7,minW:2480, minH: 3508 },
  { name: "30×40 cm",  sub: "12×16 inch", wCm: 30, hCm: 40, minW: 3543, minH: 4724 },
  { name: "30×45 cm",  sub: "12×18 inch", wCm: 30, hCm: 45, minW: 3543, minH: 5315 },
  { name: "40×60 cm",  sub: "16×24 inch", wCm: 40, hCm: 60, minW: 4724, minH: 7087 },
];

// Recommended MP for 300 DPI print
function recMegapixels(wCm, hCm) {
  const w = Math.round((wCm / 2.54) * 300);
  const h = Math.round((hCm / 2.54) * 300);
  return (w * h / 1_000_000).toFixed(1);
}

function getDpi(photoW, photoH, printWCm, printHCm) {
  const dpiW = (photoW / (printWCm / 2.54));
  const dpiH = (photoH / (printHCm / 2.54));
  return Math.min(dpiW, dpiH);
}

function getStatus(dpi) {
  if (dpi >= 300) return "ok";
  if (dpi >= 150) return "warn";
  return "bad";
}

const STATUS_CFG = {
  ok:   { icon: "✅", label: "Excellent",   bg: "#F0FDF4", border: "#86EFAC", color: "#15803D" },
  warn: { icon: "⚠️", label: "Borderline",  bg: "#FFFBEB", border: "#FCD34D", color: "#92400E" },
  bad:  { icon: "❌", label: "Too Low",     bg: "#FFF1F2", border: "#FCA5A5", color: "#991B1B" },
};

function fmtDpi(dpi) { return dpi >= 1000 ? ">999" : Math.round(dpi).toString(); }

export default function PhotoPrintSize() {
  const [w, setW] = useState("");
  const [h, setH] = useState("");

  const pw = parseInt(w);
  const ph = parseInt(h);
  const valid = pw > 0 && ph > 0;
  const mp = valid ? (pw * ph / 1_000_000).toFixed(1) : null;

  // Auto-orient: always compare long side to long side
  const results = valid
    ? PRINT_SIZES.map((size) => {
        const [photoLong, photoShort] = pw >= ph ? [pw, ph] : [ph, pw];
        const [printLong, printShort] = size.hCm >= size.wCm ? [size.hCm, size.wCm] : [size.wCm, size.hCm];
        const dpi = getDpi(photoShort, photoLong, printShort, printLong);
        return { ...size, dpi, status: getStatus(dpi) };
      })
    : null;

  const inputStyle = { border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "15px", width: "100%", boxSizing: "border-box" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "Photo Print Size" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>🖨️ Photo Print Size Calculator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            Enter your photo dimensions in pixels to check which print sizes will look sharp at 300 DPI.
          </p>
        </div>

        {/* Input card */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px 24px", marginBottom: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "12px", alignItems: "end" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", display: "block", marginBottom: "5px" }}>Width (pixels)</label>
              <input type="number" min="1" value={w} onChange={(e) => setW(e.target.value)} placeholder="e.g. 4000" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", display: "block", marginBottom: "5px" }}>Height (pixels)</label>
              <input type="number" min="1" value={h} onChange={(e) => setH(e.target.value)} placeholder="e.g. 6000" style={inputStyle} />
            </div>
            <div style={{ paddingBottom: "1px" }}>
              <button onClick={() => { setW(""); setH(""); }} style={{ padding: "10px 16px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: "#EEF2FF", color: "#4F46E5", fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}>
                Clear
              </button>
            </div>
          </div>
          {mp && (
            <div style={{ marginTop: "12px", display: "flex", gap: "20px" }}>
              <div style={{ fontSize: "13px", color: "#6B7280" }}>
                Resolution: <strong style={{ color: "#1E1B4B" }}>{pw.toLocaleString()} × {ph.toLocaleString()} px</strong>
              </div>
              <div style={{ fontSize: "13px", color: "#6B7280" }}>
                Megapixels: <strong style={{ color: "#4F46E5" }}>{mp} MP</strong>
              </div>
            </div>
          )}
        </div>

        {/* DPI legend */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
          {Object.entries(STATUS_CFG).map(([key, cfg]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "20px", background: cfg.bg, border: `0.5px solid ${cfg.border}`, fontSize: "12px", color: cfg.color, fontWeight: "600" }}>
              {cfg.icon} {cfg.label} {key === "ok" ? "(≥300 DPI)" : key === "warn" ? "(150–299 DPI)" : "(<150 DPI)"}
            </div>
          ))}
        </div>

        {/* Results table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8F9FF" }}>
                {["Print Size", "Inches", "Min Pixels", "Rec. MP", valid && "Your DPI", valid && "Quality"].filter(Boolean).map((h) => (
                  <th key={h} style={{ padding: "11px 14px", fontSize: "11px", fontWeight: "700", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left", borderBottom: "0.5px solid #E0E7FF" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRINT_SIZES.map((size, i) => {
                const res = results?.[i];
                const cfg = res ? STATUS_CFG[res.status] : null;
                return (
                  <tr key={size.name} style={{ borderBottom: i < PRINT_SIZES.length - 1 ? "0.5px solid #F3F4F6" : "none", background: res ? cfg.bg : (i % 2 === 0 ? "white" : "#FAFBFF") }}>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#1E1B4B" }}>{size.name}</div>
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: "13px", color: "#6B7280" }}>{size.sub}</td>
                    <td style={{ padding: "12px 14px", fontSize: "12px", fontFamily: "monospace", color: "#374151" }}>
                      {size.minW.toLocaleString()} × {size.minH.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: "13px", color: "#6B7280" }}>
                      {recMegapixels(size.wCm, size.hCm)} MP
                    </td>
                    {valid && (
                      <>
                        <td style={{ padding: "12px 14px", fontSize: "14px", fontWeight: "700", color: cfg.color }}>
                          {fmtDpi(res.dpi)} DPI
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "20px", background: cfg.bg, border: `0.5px solid ${cfg.border}`, fontSize: "12px", fontWeight: "600", color: cfg.color }}>
                            {cfg.icon} {cfg.label}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Info box */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginTop: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", marginBottom: "6px" }}>ℹ️ About print resolution</div>
          <div style={{ fontSize: "13px", color: "#374151", lineHeight: "1.7" }}>
            <strong>300 DPI</strong> is the professional standard for sharp photo prints. <strong>150–299 DPI</strong> may look acceptable for larger prints viewed from a distance. <strong>Below 150 DPI</strong> will look visibly blurry or pixelated when printed. Photo orientation is handled automatically — portrait and landscape are compared correctly.
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
