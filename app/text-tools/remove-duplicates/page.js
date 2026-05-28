"use client";

import { useState } from "react";
import Link from "next/link";

export default function RemoveDuplicates() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);

  function getResult() {
    if (!text.trim()) return "";
    let lines = text.split("\n");
    if (trimLines) lines = lines.map(l => l.trim());
    const seen = new Set();
    return lines.filter(line => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).join("\n");
  }

  const result = getResult();
  const originalCount = text.trim() ? text.split("\n").filter(l => l.trim()).length : 0;
  const resultCount = result.trim() ? result.split("\n").filter(l => l.trim()).length : 0;
  const removedCount = originalCount - resultCount;

  function handleCopy() {
    navigator.clipboard.writeText(result);
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
          <span className="text-sm font-medium text-gray-900">Remove Duplicates</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Remove Duplicate Lines</h1>
          <p className="text-gray-500">Remove duplicate lines from any text instantly. Free, no signup required.</p>
        </div>

        {/* Options */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded"
            />
            Case sensitive
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded"
            />
            Trim whitespace
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Input</label>
              {originalCount > 0 && (
                <span className="text-xs text-gray-400">{originalCount} lines</span>
              )}
            </div>
            <textarea
              className="w-full h-72 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder={"apple\nbanana\napple\norange\nbanana"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Output</label>
              <div className="flex items-center gap-3">
                {removedCount > 0 && (
                  <span className="text-xs text-red-500">{removedCount} duplicates removed</span>
                )}
                {result && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
            </div>
            <textarea
              className="w-full h-72 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm leading-relaxed resize-none bg-gray-50 focus:outline-none"
              readOnly
              value={result}
              placeholder="Unique lines will appear here..."
            />
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-yellow-900 mb-2">How to use</h2>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Paste your lines of text on the left</li>
            <li>• Duplicates are removed instantly on the right</li>
            <li>• Toggle case sensitivity and whitespace trimming as needed</li>
          </ul>
        </div>
      </div>
    </main>
  );
}