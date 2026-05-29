"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ImageResizer() {
  const [original, setOriginal] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockRatio, setLockRatio] = useState(true);
  const [resized, setResized] = useState(null);
  const canvasRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setOriginal({ file, url, width: img.width, height: img.height });
      setWidth(img.width);
      setHeight(img.height);
      setResized(null);
    };
    img.src = url;
  }

  function handleWidthChange(val) {
    setWidth(val);
    if (lockRatio && original) {
      setHeight(Math.round((val / original.width) * original.height));
    }
  }

  function handleHeightChange(val) {
    setHeight(val);
    if (lockRatio && original) {
      setWidth(Math.round((val / original.height) * original.width));
    }
  }

  function resize() {
    if (!original || !width || !height) return;
    const canvas = canvasRef.current;
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, parseInt(width), parseInt(height));
      setResized(canvas.toDataURL("image/png"));
    };
    img.src = original.url;
  }

  function download() {
    if (!resized) return;
    const link = document.createElement("a");
    link.href = resized;
    link.download = "resized_" + original.file.name;
    link.click();
  }

  const presets = [
    { label: "HD 1280×720", w: 1280, h: 720 },
    { label: "Full HD 1920×1080", w: 1920, h: 1080 },
    { label: "Square 1080×1080", w: 1080, h: 1080 },
    { label: "Thumbnail 300×300", w: 300, h: 300 },
    { label: "Profile 400×400", w: 400, h: 400 },
    { label: "Banner 1500×500", w: 1500, h: 500 },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/image-tools" className="text-gray-400 hover:text-gray-600 text-sm">Image Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Image Resizer</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Resizer</h1>
          <p className="text-gray-500">Resize images to any dimension instantly. Free, no signup required.</p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-gray-300 transition-colors">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="resize-input" />
          <label htmlFor="resize-input" className="cursor-pointer">
            <div className="text-4xl mb-3">📐</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Click to upload an image</p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP supported</p>
          </label>
        </div>

        {original && (
          <div className="space-y-5">

            {/* Original info */}
            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2">
              Original: <span className="font-medium text-gray-800">{original.width} × {original.height}px</span>
            </div>

            {/* Presets */}
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Quick Presets</p>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => { setWidth(p.w); setHeight(p.h); setLockRatio(false); }}
                    className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Width / Height inputs */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={lockRatio}
                  onChange={(e) => setLockRatio(e.target.checked)}
                  className="rounded"
                />
                Lock aspect ratio
              </label>
            </div>

            {/* Resize button */}
            <button
              type="button"
              onClick={resize}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
              Resize Image
            </button>

            {/* Result */}
            {resized && (
              <div className="space-y-3">
                <img src={resized} alt="Resized" className="w-full rounded-xl border border-gray-100" />
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-green-700">
                    ✓ Resized to {width} × {height}px
                  </div>
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

        <canvas ref={canvasRef} className="hidden" />

        <div className="mt-8 bg-purple-50 border border-purple-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-purple-900 mb-2">How to use</h2>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Upload any image</li>
            <li>• Enter custom dimensions or pick a preset</li>
            <li>• Toggle aspect ratio lock to avoid distortion</li>
            <li>• Click Resize then Download</li>
          </ul>
        </div>
      </div>
    </main>
  );
}