"use client";

import { useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  async function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setResult(null);
  }

  async function compress() {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { updateMetadata: false });

      // Remove metadata to reduce size
      pdf.setTitle("");
      pdf.setAuthor("");
      pdf.setSubject("");
      pdf.setKeywords([]);
      pdf.setProducer("");
      pdf.setCreator("");

      const compressed = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      const savings = Math.round((1 - compressed.byteLength / bytes.byteLength) * 100);
      const blob = new Blob([compressed], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setResult({
        url,
        originalSize: bytes.byteLength,
        compressedSize: compressed.byteLength,
        savings: savings > 0 ? savings : 0,
        name: "compressed_" + file.name,
      });
    } catch (e) {
      alert("Error compressing PDF: " + e.message);
    }
    setLoading(false);
  }

  function download() {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result.url;
    link.download = result.name;
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
          <span className="text-sm font-medium text-gray-900">Compress PDF</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compress PDF</h1>
          <p className="text-gray-500">Reduce PDF file size instantly. Free, no signup, no watermark.</p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-gray-300 transition-colors">
          <input type="file" accept=".pdf" onChange={handleFile} className="hidden" id="compress-input" />
          <label htmlFor="compress-input" className="cursor-pointer">
            <div className="text-4xl mb-3">🗜️</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Click to upload a PDF</p>
            <p className="text-xs text-gray-400">Works best on PDFs with metadata and unoptimized structure</p>
          </label>
        </div>

        {file && (
          <div className="space-y-5">
            {/* File info */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-xl">📄</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
              </div>
            </div>

            {/* Compress button */}
            <button
              type="button"
              onClick={compress}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Compressing..." : "Compress PDF"}
            </button>

            {/* Result */}
            {result && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-400 mb-1">Original</div>
                    <div className="text-lg font-bold text-gray-900">{formatSize(result.originalSize)}</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-400 mb-1">Compressed</div>
                    <div className="text-lg font-bold text-gray-900">{formatSize(result.compressedSize)}</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-400 mb-1">Saved</div>
                    <div className="text-lg font-bold text-green-600">{result.savings}%</div>
                  </div>
                </div>

                {result.savings > 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-700">🎉 Reduced by {result.savings}%</p>
                      <p className="text-xs text-green-600">{formatSize(result.originalSize)} → {formatSize(result.compressedSize)}</p>
                    </div>
                    <button type="button" onClick={download}
                      className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
                      Download
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-yellow-700">This PDF is already well optimized</p>
                      <p className="text-xs text-yellow-600 mt-1">PDFs with mostly images or already compressed content have limited size reduction.</p>
                    </div>
                    <button type="button" onClick={download}
                      className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700">
                      Download Anyway
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-red-50 border border-red-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-red-900 mb-2">How to use</h2>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Upload any PDF file</li>
            <li>• Click Compress — works best on text-heavy PDFs</li>
            <li>• Download the compressed version</li>
            <li>• No watermark added, no quality loss on text</li>
          </ul>
        </div>
      </div>
    </main>
  );
}