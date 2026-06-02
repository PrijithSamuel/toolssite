"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ConvertFormat() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(0.9);
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f); setPreview(URL.createObjectURL(f)); setConverted(null);
  }

  function convert() {
    if (!file) return;
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (format === "jpeg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      const mimeType = format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
      const dataUrl = canvas.toDataURL(mimeType, quality);
      setConverted({ dataUrl, mimeType });
      setLoading(false);
    };
    img.src = preview;
  }

  function download() {
    if (!converted || !file) return;
    const link = document.createElement("a");
    link.href = converted.dataUrl;
    link.download = file.name.replace(/\.[^.]+$/, "") + "." + format;
    link.click();
  }

  const formats = [
    { id: "png", label: "PNG", desc: "Lossless, supports transparency" },
    { id: "jpeg", label: "JPG", desc: "Smaller size, no transparency" },
    { id: "webp", label: "WebP", desc: "Modern, best compression" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "Convert Format" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Image Format Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert images between JPG, PNG and WebP. Free, no signup required.</p>
        </div>

        <div style={{ border: "2px dashed #C7D2FE", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "16px", background: "white" }}>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="format-input" />
          <label htmlFor="format-input" style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔄</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>Click to upload an image</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>JPG, PNG, WebP supported</p>
          </label>
        </div>

        {file && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px" }}>
              <p style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "8px" }}>ORIGINAL</p>
              <img src={preview} alt="Original" style={{ maxHeight: "160px", borderRadius: "8px", objectFit: "contain", margin: "0 auto", display: "block" }} />
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "12px" }}>Convert to</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: format !== "png" ? "16px" : "0" }}>
                {formats.map((f) => (
                  <button key={f.id} type="button" onClick={() => setFormat(f.id)}
                    style={{ padding: "12px", borderRadius: "10px", border: "none", cursor: "pointer", textAlign: "left", background: format === f.id ? "#4F46E5" : "white" }}>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: format === f.id ? "white" : "#1E1B4B" }}>{f.label}</div>
                    <div style={{ fontSize: "11px", marginTop: "2px", color: format === f.id ? "rgba(255,255,255,0.75)" : "#9CA3AF" }}>{f.desc}</div>
                  </button>
                ))}
              </div>
              {format !== "png" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                    <span style={{ fontWeight: "500", color: "#1E1B4B" }}>Quality</span>
                    <span style={{ color: "#6366F1" }}>{Math.round(quality * 100)}%</span>
                  </div>
                  <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#4F46E5" }} />
                </div>
              )}
            </div>

            <button type="button" onClick={convert} disabled={loading}
              style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Converting..." : `Convert to ${format.toUpperCase()}`}
            </button>

            {converted && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px" }}>
                  <p style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "8px" }}>CONVERTED — {format.toUpperCase()}</p>
                  <img src={converted.dataUrl} alt="Converted" style={{ maxHeight: "160px", borderRadius: "8px", objectFit: "contain", margin: "0 auto", display: "block" }} />
                </div>
                <div style={{ background: "#D1FAE5", border: "0.5px solid #A7F3D0", borderRadius: "10px", padding: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "13px", fontWeight: "500", color: "#065F46" }}>✓ Converted to {format.toUpperCase()}</p>
                  <button type="button" onClick={download}
                    style={{ background: "#4F46E5", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Upload any JPG, PNG or WebP image</li>
            <li>• Select the output format</li>
            <li>• Adjust quality if needed</li>
            <li>• Click Convert then Download</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}