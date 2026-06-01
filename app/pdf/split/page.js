"use client";

import { useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

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
      const bytes = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(bytes);
      const total = srcPdf.getPageCount();

      if (mode === "all") {
        // extract each page as separate PDF
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
        // extract specific pages
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
    } catch (e) {
      alert("Error splitting PDF: " + e.message);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/pdf" className="text-gray-400 hover:text-gray-600 text-sm">PDF Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Split PDF</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Split PDF</h1>
          <p className="text-gray-500">Split a PDF into separate pages or extract specific pages. Free, no signup.</p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-gray-300 transition-colors">
          <input type="file" accept=".pdf" onChange={handleFile} className="hidden" id="split-input" />
          <label htmlFor="split-input" className="cursor-pointer">
            <div className="text-4xl mb-3">✂️</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Click to upload a PDF</p>
            <p className="text-xs text-gray-400">One PDF file at a time</p>
          </label>
        </div>

        {file && (
          <div className="space-y-5">
            {/* File info */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-xl">📄</span>
              <div>
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-400">{pageCount} pages</p>
              </div>
            </div>

            {/* Mode */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-5 space-y-4">
              <p className="text-sm font-medium text-gray-700">Split mode</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { id: "all", label: "Extract all pages separately" },
                  { id: "range", label: "Extract specific pages" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      mode === m.id
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {mode === "range" && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                    Page numbers (e.g. 1,3,5-8)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1,3,5-8"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                  <p className="text-xs text-gray-400 mt-1">Total pages: {pageCount}</p>
                </div>
              )}
            </div>

            {/* Split button */}
            <button
              type="button"
              onClick={split}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Splitting..." : "Split PDF"}
            </button>

            {done && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-green-700">✓ PDF split and downloaded successfully!</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-red-50 border border-red-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-red-900 mb-2">How to use</h2>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Upload a PDF file</li>
            <li>• Choose to split all pages or extract specific ones</li>
            <li>• For specific pages use format: 1,3,5-8</li>
            <li>• Click Split — pages download automatically</li>
          </ul>
        </div>
      </div>
    </main>
  );
}