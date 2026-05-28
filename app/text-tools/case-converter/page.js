"use client";

import { useState } from "react";
import Link from "next/link";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  function toUpper() { setText(t => t.toUpperCase()); }
  function toLower() { setText(t => t.toLowerCase()); }
  function toTitle() { setText(t => t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())); }
  function toSentence() { setText(t => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())); }
  function toAlternating() { setText(t => t.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("")); }
  function removeSpaces() { setText(t => t.replace(/\s+/g, "")); }

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const buttons = [
    { label: "UPPER CASE", fn: toUpper, style: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100" },
    { label: "lower case", fn: toLower, style: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" },
    { label: "Title Case", fn: toTitle, style: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" },
    { label: "Sentence case", fn: toSentence, style: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100" },
    { label: "aLtErNaTiNg", fn: toAlternating, style: "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100" },
    { label: "Remove Spaces", fn: removeSpaces, style: "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/text-tools" className="text-gray-400 hover:text-gray-600 text-sm">Text Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Case Converter</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Converter</h1>
          <p className="text-gray-500">Convert text to uppercase, lowercase, title case and more. Free, instant, no signup.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.fn}
              className={`border rounded-xl px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${btn.style}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            className="w-full h-72 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Type or paste your text here, then click a button above..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={() => setText("")}
                className="text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {text && (
          <div className="mt-3 flex gap-4 text-xs text-gray-400">
            <span>{text.trim() === "" ? 0 : text.trim().split(/\s+/).length} words</span>
            <span>{text.length} characters</span>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-yellow-900 mb-2">How to use</h2>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Paste your text in the box below</li>
            <li>• Click any button above to convert instantly</li>
            <li>• Use Copy to copy the result to clipboard</li>
          </ul>
        </div>
      </div>
    </main>
  );
}