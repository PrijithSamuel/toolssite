"use client";

import { useState } from "react";
import Link from "next/link";

export default function ImageToPDF() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");

  function handleFiles(e) {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prev) => [...prev, ...newImages]);
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function moveUp(index) {
    if (index === 0) return;
    const arr = [...images];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    setImages(arr);
  }

  function moveDown(index) {
    if (index === images.length - 1) return;
    const arr = [...images];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    setImages(arr);
  }

  async function convertToPDF() {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation, format: pageSize, unit: "mm" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const ratio = Math.min(pageW / img.width, pageH / img.height);
            const w = img.width * ratio;
            const h = img.height * ratio;
            const x = (pageW - w) / 2;
            const y = (pageH - h) / 2;
            doc.addImage(img, "PNG", x, y, w, h);
            resolve();
          };
          img.src = images[i].url;
        });
      }
      doc.save("images.pdf");
    } catch (e) {
      alert("Error creating PDF: " + e.message);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/image-tools" className="text-gray-400 hover:text-gray-600 text-sm">Image Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Image to PDF</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image to PDF</h1>
          <p className="text-gray-500">Convert one or multiple images to PDF. Free, no signup required.</p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-gray-300 transition-colors">
          <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" id="pdf-input" />
          <label htmlFor="pdf-input" className="cursor-pointer">
            <div className="text-4xl mb-3">📑</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Click to upload images</p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP — multiple files supported</p>
          </label>
        </div>

        {images.length > 0 && (
          <div className="space-y-5">

            {/* Page settings */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
              <p className="text-sm font-medium text-gray-700 mb-3">Page Settings</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Page Size</label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none"
                  >
                    <option value="a4">A4</option>
                    <option value="a3">A3</option>
                    <option value="letter">Letter</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Orientation</label>
                  <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image list */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{images.length} image{images.length > 1 ? "s" : ""} — drag to reorder</p>
              {images.map((img, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <img src={img.url} alt={img.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                  <span className="flex-1 text-sm text-gray-700 truncate">{img.name}</span>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => moveUp(i)}
                      className="text-xs px-2 py-1 border border-gray-200 rounded hover:bg-gray-100 text-gray-500">↑</button>
                    <button type="button" onClick={() => moveDown(i)}
                      className="text-xs px-2 py-1 border border-gray-200 rounded hover:bg-gray-100 text-gray-500">↓</button>
                    <button type="button" onClick={() => removeImage(i)}
                      className="text-xs px-2 py-1 border border-red-200 rounded hover:bg-red-50 text-red-400">✕</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Convert button */}
            <button
              type="button"
              onClick={convertToPDF}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating PDF..." : `Convert ${images.length} Image${images.length > 1 ? "s" : ""} to PDF`}
            </button>
          </div>
        )}

        <div className="mt-8 bg-purple-50 border border-purple-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-purple-900 mb-2">How to use</h2>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Upload one or multiple images</li>
            <li>• Reorder using ↑ ↓ buttons</li>
            <li>• Choose page size and orientation</li>
            <li>• Click Convert and PDF downloads automatically</li>
          </ul>
        </div>
      </div>
    </main>
  );
}