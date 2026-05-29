"use client";

import { useState } from "react";
import Link from "next/link";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  }

  function validate() {
    try {
      JSON.parse(input);
      setError("✓ Valid JSON");
      setOutput("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
  }

  const isValidError = error.startsWith("✓");

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/developer-tools" className="text-gray-400 hover:text-gray-600 text-sm">Developer Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">JSON Formatter</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter</h1>
          <p className="text-gray-500">Format, minify and validate JSON instantly. Free, no signup required.</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <button type="button" onClick={format}
            className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700">
            Format / Beautify
          </button>
          <button type="button" onClick={minify}
            className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Minify
          </button>
          <button type="button" onClick={validate}
            className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Validate
          </button>
          <button type="button" onClick={handleClear}
            className="px-5 py-2 bg-white border border-red-200 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50">
            Clear
          </button>
        </div>

        {/* Error / success message */}
        {error && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
            isValidError
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}>
            {error}
          </div>
        )}

        {/* Editor panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Input JSON</label>
              <span className="text-xs text-gray-400">{input.length} chars</span>
            </div>
            <textarea
              className="w-full h-96 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder='Paste your JSON here e.g. {"name":"John","age":30}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Output</label>
              {output && (
                <button type="button" onClick={handleCopy}
                  className="text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg">
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              className="w-full h-96 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm font-mono leading-relaxed resize-none bg-gray-50 focus:outline-none"
              readOnly
              value={output}
              placeholder="Formatted JSON will appear here..."
              spellCheck={false}
            />
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">How to use</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Paste your JSON in the left panel</li>
            <li>• Click Format to beautify with proper indentation</li>
            <li>• Click Minify to compress into one line</li>
            <li>• Click Validate to check if your JSON is valid</li>
          </ul>
        </div>
      </div>
    </main>
  );
}