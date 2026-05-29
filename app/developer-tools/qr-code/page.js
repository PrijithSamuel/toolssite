"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [color, setColor] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!text || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      color: { dark: color, light: bg },
      margin: 2,
    });
  }, [text, size, color, bg]);

  function download() {
    if (!canvasRef.current || !text) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/developer-tools" className="text-gray-400 hover:text-gray-600 text-sm">Developer Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">QR Code Generator</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
          <p className="text-gray-500">Generate QR codes for any text or URL. Free, no signup required.</p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 space-y-4 mb-6">

          {/* Text input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text or URL</label>
            <input
              type="text"
              placeholder="e.g. https://yoursite.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
            />
          </div>

          {/* Size slider */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Size</span>
              <span className="text-gray-500">{size}px</span>
            </div>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full accent-gray-900"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">QR Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-9 rounded border border-gray-200 cursor-pointer" />
                <span className="text-sm font-mono text-gray-500">{color}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)}
                  className="w-10 h-9 rounded border border-gray-200 cursor-pointer" />
                <span className="text-sm font-mono text-gray-500">{bg}</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Preview */}
        <div className="flex flex-col items-center gap-4">
          {text ? (
            <>
              <canvas ref={canvasRef} className="rounded-xl border border-gray-100 shadow-sm" />
              <button
                type="button"
                onClick={download}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Download PNG
              </button>
            </>
          ) : (
            <div className="w-64 h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
              <p className="text-sm text-gray-400 text-center px-4">Enter text above to generate your QR code</p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">How to use</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Type any text or paste a URL above</li>
            <li>• QR code generates instantly as you type</li>
            <li>• Adjust size and colors as needed</li>
            <li>• Click Download PNG to save the QR code</li>
          </ul>
        </div>
      </div>
    </main>
  );
}