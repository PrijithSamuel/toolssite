"use client";

import { useState } from "react";
import Link from "next/link";

export default function PDFToText() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setText("");
  }

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
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      const pdf = await window.pdfjsLib.getDocument(url).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }

      setText(fullText || "No text found. This may be a scanned image-based PDF.");
    } catch (e) {
      setText("Error extracting text: " + e.message);
    }
    setLoading(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadTxt() {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name.replace(".pdf", "") + ".txt";
    link.click();
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/pdf" className="text-gray-400 hover:text-gray-600 text-sm">PDF Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">PDF to Text</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF to Text</h1>
          <p className="text-gray-500">Extract text content from any PDF file instantly. Free, no signup required.</p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-gray-300 transition-colors">
          <input type="file" accept=".pdf" onChange={handleFile} className="hidden" id="pdftext-input" />
          <label htmlFor="pdftext-input" className="cursor-pointer">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Click to upload a PDF</p>
            <p className="text-xs text-gray-400">Works on text-based PDFs. Scanned PDFs need OCR.</p>
          </label>
        </div>

        {file && (
          <div className="space-y-5">
            {/* File info */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-xl">📄</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>

            {/* Extract button */}
            <button
              type="button"
              onClick={extract}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Extracting text..." : "Extract Text"}
            </button>

            {/* Result */}
            {text && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">Extracted Text</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={handleCopy}
                      className="text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg">
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button type="button" onClick={downloadTxt}
                      className="text-xs text-white bg-gray-900 hover:bg-gray-700 px-3 py-1 rounded-lg">
                      Download .txt
                    </button>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={text}
                  className="w-full h-96 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm font-mono leading-relaxed resize-none bg-gray-50 focus:outline-none"
                />
                <p className="text-xs text-gray-400">{text.split(/\s+/).filter(Boolean).length} words extracted</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-red-50 border border-red-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-red-900 mb-2">How to use</h2>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Upload any text-based PDF</li>
            <li>• Click Extract Text</li>
            <li>• Copy or download as .txt file</li>
            <li>• Note: scanned image PDFs need OCR software</li>
          </ul>
        </div>
      </div>
    </main>
  );
}