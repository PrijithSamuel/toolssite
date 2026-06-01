"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConvertFormat() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(0.9);
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setConverted(null);
  }

  function convert() {
    if (!file) return;
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // white background for jpg
      if (format === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      const mimeType = format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
      const dataUrl = canvas.toDataURL(mimeType, quality);
      setConverted({ dataUrl, mimeType });
      setLoading(false);
    };
    img.src = preview;
  }

  function download() {
    if (!converted || !file) return;
    const link = document.createElement("a");
    link.href = converted.dataUrl;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    link.download = `${baseName}.${format}`;
    link.click();
  }

  const formats = [
    { id: "png", label: "PNG", desc: "Lossless, supports transparency" },
    { id: "jpeg", label: "JPG", desc: "Smaller size, no transparency" },
    { id: "webp", label: "WebP", desc: "Modern format, best compression" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/image-tools" className="text-gray-400 hover:text-gray-600 text-sm">Image Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Convert Format</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Format Converter</h1>
          <p className="text-gray-500">Convert images between JPG, PNG and WebP. Free, no signup required.</p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-gray-300 transition-colors">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="format-input" />
          <label htmlFor="format-input" className="cursor-pointer">
            <div className="text-4xl mb-3">🔄</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Click to upload an image</p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP supported</p>
          </label>
        </div>

        {file && (
          <div className="space-y-5">

            {/* Preview */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Original — {file.name}</p>
              <img src={preview} alt="Original" className="max-h-48 rounded-lg object-contain mx-auto" />
            </div>

            {/* Format selection */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 space-y-4">
              <p className="text-sm font-medium text-gray-700">Convert to</p>
              <div className="grid grid-cols-3 gap-3">
                {formats.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`p-3 rounded-xl border text-left transition-colors ${
                      format === f.id
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`font-bold text-sm ${format === f.id ? "text-white" : "text-gray-900"}`}>{f.label}</div>
                    <div className={`text-xs mt-0.5 ${format === f.id ? "text-purple-200" : "text-gray-400"}`}>{f.desc}</div>
                  </button>
                ))}
              </div>

              {/* Quality slider — only for jpg and webp */}
              {format !== "png" && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Quality</span>
                    <span className="text-gray-500">{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              )}
            </div>

            {/* Convert button */}
            <button
              type="button"
              onClick={convert}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Converting..." : `Convert to ${format.toUpperCase()}`}
            </button>

            {/* Result */}
            {converted && (
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Converted — {format.toUpperCase()}</p>
                  <img src={converted.dataUrl} alt="Converted" className="max-h-48 rounded-lg object-contain mx-auto" />
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-green-700">✓ Converted to {format.toUpperCase()} successfully</p>
                  <button
                    type="button"
                    onClick={download}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                  >
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-purple-50 border border-purple-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-purple-900 mb-2">How to use</h2>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Upload any JPG, PNG or WebP image</li>
            <li>• Select the output format</li>
            <li>• Adjust quality if needed</li>
            <li>• Click Convert then Download</li>
          </ul>
        </div>
      </div>
    </main>
  );
}