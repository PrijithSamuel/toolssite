"use client";

import { useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
export const metadata = {
  title: "Merge PDF Free — Combine PDF Files Online",
  description: "Merge multiple PDF files into one online for free. No signup, no watermark, no file size limit.",
};

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleFiles(e) {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      name: file.name,
      size: file.size,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setDone(false);
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDone(false);
  }

  function moveUp(index) {
    if (index === 0) return;
    const arr = [...files];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    setFiles(arr);
  }

  function moveDown(index) {
    if (index === files.length - 1) return;
    const arr = [...files];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    setFiles(arr);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

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
    } catch (e) {
      alert("Error merging PDFs: " + e.message);
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
          <span className="text-sm font-medium text-gray-900">Merge PDF</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Merge PDF</h1>
          <p className="text-gray-500">Combine multiple PDF files into one. Free, no signup, no watermark.</p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-gray-300 transition-colors">
          <input type="file" accept=".pdf" multiple onChange={handleFiles} className="hidden" id="merge-input" />
          <label htmlFor="merge-input" className="cursor-pointer">
            <div className="text-4xl mb-3">📄</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Click to upload PDF files</p>
            <p className="text-xs text-gray-400">Upload 2 or more PDF files to merge</p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-5">
            {/* File list */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{files.length} file{files.length > 1 ? "s" : ""} — use arrows to reorder</p>
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <span className="text-xl">📄</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 truncate">{f.name}</p>
                    <p className="text-xs text-gray-400">{formatSize(f.size)}</p>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => moveUp(i)}
                      className="text-xs px-2 py-1 border border-gray-200 rounded hover:bg-gray-100 text-gray-500">↑</button>
                    <button type="button" onClick={() => moveDown(i)}
                      className="text-xs px-2 py-1 border border-gray-200 rounded hover:bg-gray-100 text-gray-500">↓</button>
                    <button type="button" onClick={() => removeFile(i)}
                      className="text-xs px-2 py-1 border border-red-200 rounded hover:bg-red-50 text-red-400">✕</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Merge button */}
            {files.length >= 2 ? (
              <button
                type="button"
                onClick={merge}
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Merging..." : `Merge ${files.length} PDFs`}
              </button>
            ) : (
              <p className="text-center text-sm text-gray-400">Add at least 2 PDF files to merge</p>
            )}

            {done && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-green-700">✓ PDFs merged and downloaded successfully!</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-red-50 border border-red-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-red-900 mb-2">How to use</h2>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Upload 2 or more PDF files</li>
            <li>• Reorder using ↑ ↓ arrows</li>
            <li>• Click Merge — combined PDF downloads instantly</li>
            <li>• No watermark, no file size limit</li>
          </ul>
        </div>
      </div>
    </main>
  );
}