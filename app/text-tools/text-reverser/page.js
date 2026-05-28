"use client";

import { useState } from "react";
import Link from "next/link";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const reversed = text.split("").reverse().join("");
  const reversedWords = text.split(" ").reverse().join(" ");
  const reversedLines = text.split("\n").reverse().join("\n");

  function handleCopy(val) {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/text-tools" className="text-gray-400 hover:text-gray-600 text-sm">Text Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Text Reverser</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Reverser</h1>
          <p className="text-gray-500">Reverse characters, words or lines instantly. Free, no signup required.</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your text</label>
          <textarea
            className="w-full h-40 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {text && (
          <div className="space-y-4">
            {[
              { label: "Reversed Characters", value: reversed },
              { label: "Reversed Words", value: reversedWords },
              { label: "Reversed Lines", value: reversedLines },
            ].map((item) => (
              <div key={item.label} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.value)}
                    className="text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-sm text-gray-800 break-all">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-yellow-900 mb-2">How to use</h2>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Type or paste your text in the box above</li>
            <li>• Results appear instantly in 3 formats</li>
            <li>• Click Copy to copy any result</li>
          </ul>
        </div>
      </div>
    </main>
  );
}