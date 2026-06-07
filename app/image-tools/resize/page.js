"use client";

import { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PrivacyBanner from "../../components/PrivacyBanner";

export default function ImageResizer() {
  const [original, setOriginal] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockRatio, setLockRatio] = useState(true);
  const [resized, setResized] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      if (original?.url) URL.revokeObjectURL(original.url);
    };
  }, [original]);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setOriginal({ file, url, width: img.width, height: img.height }); setWidth(img.width); setHeight(img.height); setResized(null); };
    img.src = url;
  }

  function handleWidthChange(val) { setWidth(val); if (lockRatio && original) setHeight(Math.round((val / original.width) * original.height)); }
  function handleHeightChange(val) { setHeight(val); if (lockRatio && original) setWidth(Math.round((val / original.height) * original.width)); }

  function resize() {
    if (!original || !width || !height) return;
    const canvas = canvasRef.current;
    canvas.width = parseInt(width); canvas.height = parseInt(height);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => { ctx.drawImage(img, 0, 0, parseInt(width), parseInt(height)); setResized(canvas.toDataURL("image/png")); };
    img.src = original.url;
  }

  function download() {
    if (!resized) return;
    const link = document.createElement("a");
    link.href = resized; link.download = "resized_" + original.file.name; link.click();
  }

  const presets = [
    { label: "HD 1280×720", w: 1280, h: 720 }, { label: "Full HD 1920×1080", w: 1920, h: 1080 },
    { label: "Square 1080×1080", w: 1080, h: 1080 }, { label: "Thumbnail 300×300", w: 300, h: 300 },
    { label: "Profile 400×400", w: 400, h: 400 }, { label: "Banner 1500×500", w: 1500, h: 500 },
  ];

  const inputStyle = { width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "Image Resizer" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Image Resizer — Resize Images Online Free</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Resize images to any dimension instantly. Free, no signup required.</p>
        </div>

        <PrivacyBanner />
        <div style={{ border: "2px dashed #C7D2FE", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "16px", background: "white" }}>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="resize-input" />
          <label htmlFor="resize-input" style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>📐</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>Click to upload an image</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>JPG, PNG, WebP supported</p>
          </label>
        </div>

        {original && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#6B7280" }}>
              Original: <span style={{ fontWeight: "500", color: "#1E1B4B" }}>{original.width} × {original.height}px</span>
            </div>

            <div>
              <p style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", marginBottom: "8px" }}>QUICK PRESETS</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {presets.map((p) => (
                  <button key={p.label} type="button" onClick={() => { setWidth(p.w); setHeight(p.h); setLockRatio(false); }}
                    style={{ fontSize: "11px", padding: "5px 10px", border: "0.5px solid #C7D2FE", borderRadius: "6px", background: "white", color: "#4B5563", cursor: "pointer" }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>WIDTH (px)</label>
                  <input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>HEIGHT (px)</label>
                  <input type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#4B5563", cursor: "pointer" }}>
                <input type="checkbox" checked={lockRatio} onChange={(e) => setLockRatio(e.target.checked)} />
                Lock aspect ratio
              </label>
            </div>

            <button type="button" onClick={resize}
              style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
              Resize Image
            </button>

            {resized && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <img src={resized} alt="Resized" style={{ width: "100%", borderRadius: "10px", border: "0.5px solid #E0E7FF" }} />
                <div style={{ background: "#D1FAE5", border: "0.5px solid #A7F3D0", borderRadius: "10px", padding: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "13px", fontWeight: "500", color: "#065F46" }}>✓ Resized to {width} × {height}px</p>
                  <button type="button" onClick={download}
                    style={{ background: "#4F46E5", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Upload any image</li>
            <li>• Enter custom dimensions or pick a preset</li>
            <li>• Toggle aspect ratio lock to avoid distortion</li>
            <li>• Click Resize then Download</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}