"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PDFToText() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleFile(e) { const f = e.target.files[0]; if (!f) return; setFile(f); setText(""); }

  async function extract() {
    if (!file) return;
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const url = URL.createObjectURL(new Blob([arrayBuffer], { type: "application/pdf" }));
      await new Promise((resolve, reject) => {
        if (window.pdfjsLib) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = resolve; script.onerror = reject;
        document.head.appendChild(script);
      });
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const pdf = await window.pdfjsLib.getDocument(url).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }
      setText(fullText || "No text found. This may be a scanned image-based PDF.");
    } catch (e) { setText("Error extracting text: " + e.message); }
    setLoading(false);
  }

  function handleCopy() { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  function downloadTxt() {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name.replace(".pdf", "") + ".txt";
    link.click();
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "PDF Tools", href: "/pdf" }, { label: "PDF to Text" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>PDF to Text Extractor — Free Online Tool</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Extract text content from any PDF file instantly. Free, no signup required.</p>
        </div>

        <div style={{ border: "2px dashed #C7D2FE", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "16px", background: "white" }}>
          <input type="file" accept=".pdf" onChange={handleFile} className="hidden" id="pdftext-input" />
          <label htmlFor="pdftext-input" style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>📝</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>Click to upload a PDF</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>Works on text-based PDFs. Scanned PDFs need OCR.</p>
          </label>
        </div>

        {file && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>📄</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B" }}>{file.name}</p>
                <p style={{ fontSize: "11px", color: "#9CA3AF" }}>{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>

            <button type="button" onClick={extract} disabled={loading}
              style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Extracting text..." : "Extract Text"}
            </button>

            {text && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B" }}>Extracted Text</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button type="button" onClick={handleCopy}
                      style={{ fontSize: "12px", color: "#6B7280", background: "#EEF2FF", border: "0.5px solid #C7D2FE", padding: "4px 12px", borderRadius: "6px", cursor: "pointer" }}>
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button type="button" onClick={downloadTxt}
                      style={{ fontSize: "12px", color: "white", background: "#4F46E5", border: "none", padding: "4px 12px", borderRadius: "6px", cursor: "pointer" }}>
                      Download .txt
                    </button>
                  </div>
                </div>
                <textarea readOnly value={text}
                  style={{ width: "100%", height: "300px", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "none", outline: "none", background: "white", color: "#374151" }} />
                <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{text.split(/\s+/).filter(Boolean).length} words extracted</p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Upload any text-based PDF</li>
            <li>• Click Extract Text</li>
            <li>• Copy or download as .txt file</li>
            <li>• Note: scanned image PDFs need OCR software</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}