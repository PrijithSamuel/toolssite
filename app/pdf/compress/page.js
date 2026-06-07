"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SchemaOrg from "../../components/SchemaOrg";

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function formatSize(bytes) { if (bytes < 1024) return bytes + " B"; if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"; return (bytes / (1024 * 1024)).toFixed(2) + " MB"; }

  async function handleFile(e) { const f = e.target.files[0]; if (!f) return; setFile(f); setResult(null); }

  async function compress() {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
      pdf.setTitle(""); pdf.setAuthor(""); pdf.setSubject(""); pdf.setKeywords([]); pdf.setProducer(""); pdf.setCreator("");
      const compressed = await pdf.save({ useObjectStreams: true, addDefaultPage: false, objectsPerTick: 50 });
      const savings = Math.round((1 - compressed.byteLength / bytes.byteLength) * 100);
      const blob = new Blob([compressed], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResult({ url, originalSize: bytes.byteLength, compressedSize: compressed.byteLength, savings: savings > 0 ? savings : 0, name: "compressed_" + file.name });
    } catch (e) { alert("Error compressing PDF: " + e.message); }
    setLoading(false);
  }

  function download() { if (!result) return; const link = document.createElement("a"); link.href = result.url; link.download = result.name; link.click(); }

  return (
    <main id="main-content" className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <SchemaOrg name="Compress PDF" description="Reduce PDF file size free online no signup" url="/pdf/compress" />
      <Header breadcrumbs={[{ label: "PDF Tools", href: "/pdf" }, { label: "Compress PDF" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Compress PDF Online — Reduce File Size Free</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Reduce PDF file size instantly. Free, no signup, no watermark.</p>
        </div>

        <div style={{ border: "2px dashed #C7D2FE", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "16px", background: "white" }}>
          <input type="file" accept=".pdf" onChange={handleFile} className="hidden" id="compress-input" />
          <label htmlFor="compress-input" style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🗜️</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>Click to upload a PDF</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>Works best on PDFs with metadata and unoptimized structure</p>
          </label>
        </div>

        {file && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>📄</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B" }}>{file.name}</p>
                <p style={{ fontSize: "11px", color: "#9CA3AF" }}>{formatSize(file.size)}</p>
              </div>
            </div>

            <button type="button" onClick={compress} disabled={loading}
              style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Compressing..." : "Compress PDF"}
            </button>

            {result && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[["Original", formatSize(result.originalSize), "#6B7280"], ["Compressed", formatSize(result.compressedSize), "#6B7280"], ["Saved", result.savings + "%", "#059669"]].map(([label, value, color]) => (
                    <div key={label} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>{label}</div>
                      <div style={{ fontSize: "20px", fontWeight: "500", color }}>{value}</div>
                    </div>
                  ))}
                </div>
                {result.savings > 0 ? (
                  <div style={{ background: "#D1FAE5", border: "0.5px solid #A7F3D0", borderRadius: "10px", padding: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: "500", color: "#065F46" }}>🎉 Reduced by {result.savings}%</p>
                      <p style={{ fontSize: "12px", color: "#059669" }}>{formatSize(result.originalSize)} → {formatSize(result.compressedSize)}</p>
                    </div>
                    <button type="button" onClick={download}
                      style={{ background: "#4F46E5", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
                      Download
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ background: "#FEF9C3", border: "0.5px solid #FDE68A", borderRadius: "10px", padding: "14px" }}>
                      <p style={{ fontSize: "13px", fontWeight: "500", color: "#713F12" }}>This PDF is already well optimized</p>
                      <p style={{ fontSize: "12px", color: "#92400E", marginTop: "4px" }}>PDFs with mostly images or already compressed content have limited size reduction.</p>
                    </div>
                    <button type="button" onClick={download}
                      style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
                      Download Anyway
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Upload any PDF file</li>
            <li>• Click Compress — works best on text-heavy PDFs</li>
            <li>• Download the compressed version</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}