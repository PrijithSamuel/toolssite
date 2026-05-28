"use client";
import { useState } from "react";
import Link from "next/link";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
          <span className="text-gray-200">/</span>
          <span className="text-sm text-gray-500">Text Tools</span>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-900">Word Counter</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Word Counter</h1>
          <p className="text-gray-500">Count words, characters, sentences and paragraphs instantly. Free, no signup required.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: "Words", value: words },
            { label: "Characters", value: characters },
            { label: "No Spaces", value: charactersNoSpaces },
            { label: "Sentences", value: sentences },
            { label: "Paragraphs", value: paragraphs },
            { label: "Read Time", value: readingTime + " min" },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            className="w-full h-72 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Start typing or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <button
              onClick={() => setText("")}
              className="absolute top-3 right-3 text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">How to use</h2>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Type or paste any text in the box above</li>
            <li>• Stats update instantly as you type</li>
            <li>• Reading time is based on 200 words per minute</li>
          </ul>
        </div>

      </div>
    </main>
  );
}