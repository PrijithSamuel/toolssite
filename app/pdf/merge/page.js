"use client";

import { useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SchemaOrg from "../../components/SchemaOrg";

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleFiles(e) {
    const newFiles = Array.from(e.target.files).map((file) => ({ file, name: file.name, size: file.size }));
    setFiles((prev) => [...prev, ...newFiles]);
    setDone(false);
  }

  function removeFile(index) { setFiles((prev) => prev.filter((_, i) => i !== index)); setDone(false); }
  function moveUp(index) { if (index === 0) return; const arr = [...files]; [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]; setFiles(arr); }
  function moveDown(index) { if (index === files.length - 1) return; const arr = [...files]; [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]; setFiles(arr); }
  function formatSize(bytes) { if (bytes < 1024) return bytes + " B"; if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"; return (bytes / (1024 * 1024)).toFixed(2) + " MB"; }

  async function merge() {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const merged = await PDFDocument.create();
      for (const f of files) {
        const bytes = await f.file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const mergedBytes = await merged.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "merged.pdf";
      link.click();
      setDone(true);
    } catch (e) { alert("Error merging PDFs: " + e.message); }
    setLoading(false);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <SchemaOrg name="Merge PDF" description="Combine multiple PDF files into one free online tool" url="/pdf/merge" />
      <Header breadcrumbs={[{ label: "PDF Tools", href: "/pdf" }, { label: "Merge PDF" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Merge PDF</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Combine multiple PDF files into one. Free, no signup, no watermark.</p>
        </div>

        <div style={{ border: "2px dashed #C7D2FE", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "16px", background: "white" }}>
          <input type="file" accept=".pdf" multiple onChange={handleFiles} className="hidden" id="merge-input" />
          <label htmlFor="merge-input" aria-label="Upload PDF files" style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>📄</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>Click to upload PDF files</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>Upload 2 or more PDF files to merge</p>
          </label>
        </div>

        {files.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500" }}>{files.length} file{files.length > 1 ? "s" : ""} — use arrows to reorder</p>
            {files.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "12px 16px" }}>
                <span style={{ fontSize: "20px" }}>📄</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", color: "#1E1B4B", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                  <p style={{ fontSize: "11px", color: "#9CA3AF" }}>{formatSize(f.size)}</p>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[["↑", () => moveUp(i)], ["↓", () => moveDown(i)], ["✕", () => removeFile(i)]].map(([icon, fn], j) => (
                    <button key={j} type="button" onClick={fn}
                      style={{ padding: "4px 8px", border: `0.5px solid ${j === 2 ? "#FECACA" : "#C7D2FE"}`, borderRadius: "6px", background: "white", color: j === 2 ? "#DC2626" : "#6366F1", cursor: "pointer", fontSize: "13px" }}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {files.length >= 2 ? (
              <button type="button" onClick={merge} disabled={loading}
                style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
                {loading ? "Merging..." : `Merge ${files.length} PDFs`}
              </button>
            ) : (
              <p style={{ textAlign: "center", fontSize: "13px", color: "#9CA3AF" }}>Add at least 2 PDF files to merge</p>
            )}

            {done && (
              <div style={{ background: "#D1FAE5", border: "0.5px solid #A7F3D0", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <p style={{ fontSize: "13px", fontWeight: "500", color: "#065F46" }}>✓ PDFs merged and downloaded successfully!</p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Upload 2 or more PDF files</li>
            <li>• Reorder using ↑ ↓ arrows</li>
            <li>• Click Merge — combined PDF downloads instantly</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}