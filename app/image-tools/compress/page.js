"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import Link from "next/link";

export default function ImageCompressor() {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.8);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setOriginal({ file, url: URL.createObjectURL(file) });
    setCompressed(null);
  }

  async function compress() {
    if (!original) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
      };
      const result = await imageCompression(original.file, options);
      setCompressed({ file: result, url: URL.createObjectURL(result) });
    } catch (e) {
      alert("Error compressing image: " + e.message);
    }
    setLoading(false);
  }

  function download() {
    if (!compressed) return;
    const link = document.createElement("a");
    link.href = compressed.url;
    link.download = "compressed_" + original.file.name;
    link.click();
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  const savings = compressed
    ? Math.round((1 - compressed.file.size / original.file.size) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/image-tools" className="text-gray-400 hover:text-gray-600 text-sm">Image Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Image Compressor</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Compressor</h1>
          <p className="text-gray-500">Compress JPG and PNG images without losing quality. Free, no signup required.</p>
        </div>

        {/* Upload area */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-gray-300 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="text-4xl mb-3">🖼️</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Click to upload an image</p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP supported</p>
          </label>
        </div>

        {original && (
          <div className="space-y-6">
            {/* Quality slider */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Quality</span>
                <span className="text-gray-500">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>

            {/* Compress button */}
            <button
              type="button"
              onClick={compress}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Compressing..." : "Compress Image"}
            </button>

            {/* Before / After */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span className="font-medium">Original</span>
                  <span>{formatSize(original.file.size)}</span>
                </div>
                <img src={original.url} alt="Original" className="w-full rounded-xl border border-gray-100 object-cover" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span className="font-medium">Compressed</span>
                  <span>{compressed ? formatSize(compressed.file.size) : "—"}</span>
                </div>
                {compressed ? (
                  <img src={compressed.url} alt="Compressed" className="w-full rounded-xl border border-gray-100 object-cover" />
                ) : (
                  <div className="w-full aspect-square bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center">
                    <p className="text-xs text-gray-400">Compressed image here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Savings + download */}
            {compressed && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-green-700">🎉 {savings}% smaller!</div>
                  <div className="text-xs text-green-600">{formatSize(original.file.size)} → {formatSize(compressed.file.size)}</div>
                </div>
                <button
                  type="button"
                  onClick={download}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-purple-50 border border-purple-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-purple-900 mb-2">How to use</h2>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Upload any JPG, PNG or WebP image</li>
            <li>• Adjust quality slider as needed</li>
            <li>• Click Compress and see before/after comparison</li>
            <li>• Download the compressed image</li>
          </ul>
        </div>
      </div>
    </main>
  );
}