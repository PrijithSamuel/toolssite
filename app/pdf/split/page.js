"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PrivacyBanner from "../../components/PrivacyBanner";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "Can I extract specific pages from a PDF?", a: "Yes. Choose the page range option and enter the page numbers you want to extract, such as 1,3,5-8." },
  { q: "Will splitting damage my original PDF?", a: "No. The original file is never modified. A new PDF is created from your selected pages." },
  { q: "Are my files safe when splitting?", a: "Completely safe. All splitting happens locally in your browser. Nothing is uploaded to any server." },
  { q: "Can I split a password-protected PDF?", a: "Password-protected PDFs cannot be split without entering the password first. Remove the password protection before splitting." },
  { q: "What format are the split pages saved in?", a: "Each extracted page or page range is saved as a separate PDF file, downloaded automatically to your device." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

export default function SplitPDF() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [mode, setMode] = useState("all");
  const [pageRange, setPageRange] = useState("");

  async function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setDone(false);
    const { PDFDocument } = await import("pdf-lib");
    const bytes = await f.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    setPageCount(pdf.getPageCount());
    setFile(f);
  }

  function parseRanges(input, total) {
    const pages = new Set();
    const parts = input.split(",").map(p => p.trim());
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        for (let i = start; i <= Math.min(end, total); i++) pages.add(i);
      } else {
        const n = parseInt(part);
        if (n >= 1 && n <= total) pages.add(n);
      }
    }
    return [...pages].sort((a, b) => a - b);
  }

  async function split() {
    if (!file) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(bytes);
      const total = srcPdf.getPageCount();
      if (mode === "all") {
        for (let i = 0; i < total; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(srcPdf, [i]);
          newPdf.addPage(page);
          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `page_${i + 1}.pdf`;
          link.click();
          await new Promise(r => setTimeout(r, 300));
        }
      } else {
        const pages = parseRanges(pageRange, total);
        if (pages.length === 0) { alert("No valid pages found."); setLoading(false); return; }
        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(srcPdf, pages.map(p => p - 1));
        copied.forEach(p => newPdf.addPage(p));
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "extracted_pages.pdf";
        link.click();
      }
      setDone(true);
    } catch (e) { alert("Error splitting PDF: " + e.message); }
    setLoading(false);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "PDF Tools", href: "/pdf" }, { label: "Split PDF" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Split PDF Online — Extract Pages Free</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Split a PDF into separate pages or extract specific pages. Free, no signup.</p>
        </div>

        <div style={introStyle}>
          Splitting a PDF is useful when you need to extract a single contract page from a multi-document bundle, isolate specific sections of a report, or separate invoice pages for different recipients. This tool gives you two options: extract all pages as individual PDF files, or specify exactly which pages you want using a range like 1,3,5-8. The original PDF is never modified — a new file is created for each extracted page or range. Your file is processed entirely in your browser with no server upload required.
        </div>

        <PrivacyBanner />
        <div style={{ border: "2px dashed #C7D2FE", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "16px", background: "white" }}>
          <input type="file" accept=".pdf" onChange={handleFile} className="hidden" id="split-input" />
          <label htmlFor="split-input" style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>✂️</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>Click to upload a PDF</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>One PDF file at a time</p>
          </label>
        </div>

        {file && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>📄</span>
              <div>
                <p style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B" }}>{file.name}</p>
                <p style={{ fontSize: "11px", color: "#9CA3AF" }}>{pageCount} pages</p>
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "12px" }}>Split mode</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: mode === "range" ? "12px" : "0" }}>
                {[["all", "Extract all pages separately"], ["range", "Extract specific pages"]].map(([id, label]) => (
                  <button key={id} type="button" onClick={() => setMode(id)}
                    style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", border: mode === id ? "none" : "0.5px solid #C7D2FE", background: mode === id ? "#4F46E5" : "white", color: mode === id ? "white" : "#4B5563" }}>
                    {label}
                  </button>
                ))}
              </div>
              {mode === "range" && (
                <div>
                  <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>Page numbers (e.g. 1,3,5-8) — Total: {pageCount}</label>
                  <input type="text" placeholder="e.g. 1,3,5-8" value={pageRange} onChange={(e) => setPageRange(e.target.value)}
                    style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" }} />
                </div>
              )}
            </div>

            <button type="button" onClick={split} disabled={loading}
              style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Splitting..." : "Split PDF"}
            </button>

            {done && (
              <div style={{ background: "#D1FAE5", border: "0.5px solid #A7F3D0", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <p style={{ fontSize: "13px", fontWeight: "500", color: "#065F46" }}>✓ PDF split and downloaded successfully!</p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Upload a PDF file</li>
            <li>• Choose to split all pages or extract specific ones</li>
            <li>• For specific pages use format: 1,3,5-8</li>
          </ul>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}