"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SchemaOrg from "../../components/SchemaOrg";

export default function ImageCompressor() {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.8);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setOriginal({ file, url: URL.createObjectURL(file) });
    setCompressed(null);
  }

  async function compress() {
    if (!original) return;
    setLoading(true);
    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: quality };
      const result = await imageCompression(original.file, options);
      setCompressed({ file: result, url: URL.createObjectURL(result) });
    } catch (e) { alert("Error compressing image: " + e.message); }
    setLoading(false);
  }

  function download() {
    if (!compressed) return;
    const link = document.createElement("a");
    link.href = compressed.url;
    link.download = "compressed_" + original.file.name;
    link.click();
  }

  function formatSize(bytes) { if (bytes < 1024) return bytes + " B"; if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"; return (bytes / (1024 * 1024)).toFixed(2) + " MB"; }
  const savings = compressed ? Math.round((1 - compressed.file.size / original.file.size) * 100) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <SchemaOrg name="Image Compressor" description="Compress images online free no signup" url="/image-tools/compress" />
      <Header breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "Image Compressor" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Image Compressor</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Compress JPG and PNG images without losing quality. Free, no signup required.</p>
        </div>

        <div style={{ border: "2px dashed #C7D2FE", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "16px", background: "white" }}>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="file-input" />
          <label htmlFor="file-input" style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🖼️</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>Click to upload an image</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>JPG, PNG, WebP supported</p>
          </label>
        </div>

        {original && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
                <span style={{ fontWeight: "500", color: "#1E1B4B" }}>Quality</span>
                <span style={{ color: "#6366F1" }}>{Math.round(quality * 100)}%</span>
              </div>
              <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#4F46E5" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>
                <span>Smaller file</span><span>Better quality</span>
              </div>
            </div>

            <button type="button" onClick={compress} disabled={loading}
              style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Compressing..." : "Compress Image"}
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>
                  <span style={{ fontWeight: "500" }}>Original</span>
                  <span>{formatSize(original.file.size)}</span>
                </div>
                <img src={original.url} alt="Original" style={{ width: "100%", borderRadius: "10px", border: "0.5px solid #E0E7FF" }} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>
                  <span style={{ fontWeight: "500" }}>Compressed</span>
                  <span>{compressed ? formatSize(compressed.file.size) : "—"}</span>
                </div>
                {compressed ? (
                  <img src={compressed.url} alt="Compressed" style={{ width: "100%", borderRadius: "10px", border: "0.5px solid #E0E7FF" }} />
                ) : (
                  <div style={{ width: "100%", aspectRatio: "1", background: "#F9FAFB", borderRadius: "10px", border: "2px dashed #E0E7FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: "12px", color: "#9CA3AF" }}>Result here</p>
                  </div>
                )}
              </div>
            </div>

            {compressed && (
              <div style={{ background: "#D1FAE5", border: "0.5px solid #A7F3D0", borderRadius: "10px", padding: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "500", color: "#065F46" }}>🎉 {savings}% smaller!</p>
                  <p style={{ fontSize: "12px", color: "#059669" }}>{formatSize(original.file.size)} → {formatSize(compressed.file.size)}</p>
                </div>
                <button type="button" onClick={download}
                  style={{ background: "#4F46E5", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
                  Download
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Upload any JPG, PNG or WebP image</li>
            <li>• Adjust quality slider as needed</li>
            <li>• Click Compress and see before/after comparison</li>
            <li>• Download the compressed image</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}