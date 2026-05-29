"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");

  const chars = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  function getStrength(pwd) {
    if (pwd.length < 8) return { label: "Weak", color: "text-red-500", bg: "bg-red-500", width: "25%" };
    if (pwd.length < 12) return { label: "Fair", color: "text-yellow-500", bg: "bg-yellow-500", width: "50%" };
    if (pwd.length < 16) return { label: "Good", color: "text-blue-500", bg: "bg-blue-500", width: "75%" };
    return { label: "Strong", color: "text-green-500", bg: "bg-green-500", width: "100%" };
  }

  function generate() {
    const enabled = Object.entries(options).filter(([, v]) => v).map(([k]) => chars[k]);
    if (enabled.length === 0) return;
    let charset = enabled.join("");
    let pwd = "";
    // ensure at least one char from each enabled set
    enabled.forEach(set => { pwd += set[Math.floor(Math.random() * set.length)]; });
    for (let i = pwd.length; i < length; i++) {
      pwd += charset[Math.floor(Math.random() * charset.length)];
    }
    // shuffle
    pwd = pwd.split("").sort(() => Math.random() - 0.5).join("");
    setPassword(pwd);
    setStrength(getStrength(pwd));
  }

  function handleCopy() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function toggleOption(key) {
    const active = Object.entries(options).filter(([, v]) => v).length;
    if (active === 1 && options[key]) return; // keep at least one
    setOptions(o => ({ ...o, [key]: !o[key] }));
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/developer-tools" className="text-gray-400 hover:text-gray-600 text-sm">Developer Tools</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Password Generator</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Generator</h1>
          <p className="text-gray-500">Generate strong, secure passwords instantly. Free, no signup required.</p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 space-y-6">

          {/* Password display */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <span className="flex-1 font-mono text-lg text-gray-800 break-all">
              {password || "Click Generate to create a password"}
            </span>
            {password && (
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          {/* Strength bar */}
          {password && strength && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Strength</span>
                <span className={strength.color}>{strength.label}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${strength.bg}`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
          )}

          {/* Length slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Length</span>
              <span className="font-bold text-gray-900">{length}</span>
            </div>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-gray-900"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>6</span>
              <span>64</span>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(options).map(([key, val]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={val}
                  onChange={() => toggleOption(key)}
                  className="rounded"
                />
                <span className="text-sm text-gray-600 capitalize">{key}</span>
              </label>
            ))}
          </div>

          {/* Generate button */}
          <button
            type="button"
            onClick={generate}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            Generate Password
          </button>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Tips for strong passwords</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Use at least 16 characters for strong security</li>
            <li>• Enable all character types for maximum strength</li>
            <li>• Never reuse passwords across different sites</li>
            <li>• Store passwords in a password manager</li>
          </ul>
        </div>
      </div>
    </main>
  );
}