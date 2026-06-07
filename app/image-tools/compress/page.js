"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SchemaOrg from "../../components/SchemaOrg";
import FAQ from "../../components/FAQ";
import PrivacyBanner from "../../components/PrivacyBanner";

const FAQS = [
  { q: "Will compressing reduce image quality?", a: "Slight quality reduction may occur at high compression levels. Use the quality slider to find the best balance between file size and visual quality." },
  { q: "Are my images uploaded to a server?", a: "No. All compression happens locally in your browser using JavaScript. Your images never leave your device." },
  { q: "What image formats are supported?", a: "JPG, PNG and WebP formats are supported for compression." },
  { q: "What is the maximum image size I can compress?", a: "Since processing is done in your browser, very large images above 20MB may be slow on older devices. Most images compress instantly." },
  { q: "How much can I reduce the file size?", a: "Typical reduction is 30-70% depending on the original image and quality setting chosen." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

export default function ImageCompressor() {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.8);

  useEffect(() => {
    return () => {
      if (original?.url) URL.revokeObjectURL(original.url);
      if (compressed?.url) URL.revokeObjectURL(compressed.url);
    };
  }, [original, compressed]);

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
      const imageCompression = (await import("browser-image-compression")).default;
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
    <main id="main-content" className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <SchemaOrg name="Image Compressor" description="Compress images online free no signup" url="/image-tools/compress" />
      <Header breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "Image Compressor" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Image Compressor — Reduce Image Size Online Free</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Compress JPG and PNG images without losing quality. Free, no signup required.</p>
        </div>

        <div style={introStyle}>
          Image compression reduces file size while preserving visual quality — essential for faster website loading, staying within email attachment limits, and saving storage space. This tool uses a quality slider to let you control the balance between file size and visual quality. A setting of 0.8 (80%) typically achieves 40–60% file size reduction with no perceptible quality loss for most photographs. PNG files compress differently from JPEGs — PNGs use lossless compression so quality is preserved but size reduction is more limited. All compression happens locally in your browser using the browser-image-compression library — your images are never uploaded to any server.
        </div>

        <PrivacyBanner />
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
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}