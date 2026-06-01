"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");

  const { matches, highlighted } = useMemo(() => {
    if (!pattern || !testString) return { matches: [], highlighted: [] };
    try {
      setError("");
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const matches = [];
      const parts = [];
      let lastIndex = 0;
      let match;
      const execRegex = new RegExp(pattern, "g" + flags.replace("g", ""));

      while ((match = execRegex.exec(testString)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, match.index), highlight: false });
        }
        parts.push({ text: match[0], highlight: true });
        matches.push({ value: match[0], index: match.index, groups: match.slice(1) });
        lastIndex = match.index + match[0].length;
        if (match[0] === "") execRegex.lastIndex++;
      }

      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), highlight: false });
      }

      return { matches, highlighted: parts };
    } catch (e) {
      setError(e.message);
      return { matches: [], highlighted: [] };
    }
  }, [pattern, flags, testString]);

  const flagOptions = [
    { id: "g", label: "g", desc: "Global" },
    { id: "i", label: "i", desc: "Case insensitive" },
    { id: "m", label: "m", desc: "Multiline" },
    { id: "s", label: "s", desc: "Dot all" },
  ];

  function toggleFlag(f) {
    setFlags(prev => prev.includes(f) ? prev.replace(f, "") : prev + f);
  }

  const commonPatterns = [
    { label: "Email", pattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}" },
    { label: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}" },
    { label: "Phone", pattern: "[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}" },
    { label: "IP Address", pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b" },
    { label: "Date", pattern: "\\d{1,2}[\\/\\-]\\d{1,2}[\\/\\-]\\d{2,4}" },
    { label: "Hex Color", pattern: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/developer-tools" className="text-gray-400 hover:text-gray-600 text-sm">Developer Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Regex Tester</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Regex Tester</h1>
          <p className="text-gray-500">Test and debug regular expressions instantly. Free, no signup required.</p>
        </div>

        {/* Common patterns */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Common Patterns</p>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((p) => (
              <button key={p.label} type="button" onClick={() => setPattern(p.pattern)}
                className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern input */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Pattern</label>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
              <span className="text-gray-400 font-mono">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-1 text-sm font-mono focus:outline-none"
                spellCheck={false}
              />
              <span className="text-gray-400 font-mono">/</span>
              <span className="text-blue-600 font-mono text-sm">{flags}</span>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          {/* Flags */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Flags</label>
            <div className="flex gap-2 flex-wrap">
              {flagOptions.map((f) => (
                <button key={f.id} type="button" onClick={() => toggleFlag(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                    flags.includes(f.id)
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}>
                  {f.label} <span className="font-sans opacity-60">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Test string */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Test String</label>
            {matches.length > 0 && (
              <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                {matches.length} match{matches.length > 1 ? "es" : ""}
              </span>
            )}
            {pattern && !error && matches.length === 0 && testString && (
              <span className="text-xs font-medium text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                No matches
              </span>
            )}
          </div>
          <textarea
            className="w-full h-40 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Enter test string here..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Highlighted result */}
        {testString && pattern && !error && highlighted.length > 0 && (
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Highlighted Matches</label>
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 text-sm font-mono leading-relaxed break-all">
              {highlighted.map((part, i) =>
                part.highlight ? (
                  <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part.text}</mark>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </div>
          </div>
        )}

        {/* Match list */}
        {matches.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Match Details</label>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-4">
                  <span className="text-xs text-gray-400">#{i + 1}</span>
                  <code className="text-sm font-mono bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded">{m.value}</code>
                  <span className="text-xs text-gray-400">index: {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-xs text-gray-400">groups: {m.groups.join(", ")}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">How to use</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter a regex pattern or pick a common one above</li>
            <li>• Toggle flags as needed (g = global, i = case insensitive)</li>
            <li>• Paste your test string — matches highlight instantly</li>
            <li>• See match count, positions and capture groups below</li>
          </ul>
        </div>
      </div>
    </main>
  );
}