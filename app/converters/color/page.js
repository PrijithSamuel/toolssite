"use client";

import { useState } from "react";
import Link from "next/link";

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [copied, setCopied] = useState("");

  const validHex = isValidHex(hex);
  const rgb = validHex ? hexToRgb(hex) : null;
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  function handleCopy(text, label) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }

  const presets = [
    "#ef4444", "#f97316", "#eab308", "#22c55e",
    "#3b82f6", "#8b5cf6", "#ec4899", "#000000",
    "#ffffff", "#6b7280", "#1e293b", "#f8fafc",
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/converters" className="text-gray-400 hover:text-gray-600 text-sm">Converters</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Color Converter</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Converter</h1>
          <p className="text-gray-500">Convert HEX colors to RGB and HSL instantly. Free, no signup.</p>
        </div>

        {/* Color preview + input */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-6">
          <div
            className="w-full h-32 rounded-xl mb-4 border border-gray-200 transition-colors"
            style={{ backgroundColor: validHex ? hex : "#ffffff" }}
          />
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={validHex ? hex : "#000000"}
              onChange={(e) => setHex(e.target.value)}
              className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#3b82f6"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        {/* Results */}
        {validHex && rgb && hsl && (
          <div className="space-y-3 mb-6">
            {[
              { label: "HEX", value: hex.toUpperCase() },
              { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
              { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
              { label: "RGB Values", value: `R: ${rgb.r}  G: ${rgb.g}  B: ${rgb.b}` },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mr-3">{item.label}</span>
                  <span className="text-sm font-mono text-gray-800">{item.value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(item.value, item.label)}
                  className="text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg"
                >
                  {copied === item.label ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Presets */}
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {presets.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setHex(color)}
                className="w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: color,
                  borderColor: hex === color ? "#3b82f6" : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-green-900 mb-2">How to use</h2>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Type a HEX code or use the color picker</li>
            <li>• HEX, RGB and HSL values appear instantly</li>
            <li>• Click Copy next to any format to copy it</li>
            <li>• Use presets to quickly pick common colors</li>
          </ul>
        </div>
      </div>
    </main>
  );
}