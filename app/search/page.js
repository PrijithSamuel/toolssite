"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import tools from "../data/tools";

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const filtered = tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "16px" }}>Search Tools</h1>
        <div style={{ display: "flex", alignItems: "center", background: "white", border: "0.5px solid #C7D2FE", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(79,70,229,0.08)" }}>
          <span style={{ padding: "0 12px 0 16px", fontSize: "20px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search 25+ tools — try 'PDF', 'calculator', 'image'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ flex: 1, border: "none", outline: "none", fontSize: "15px", padding: "16px 0", background: "transparent", color: "#374151" }}
          />
          {query && (
            <button type="button" onClick={() => setQuery("")}
              style={{ padding: "0 16px", fontSize: "18px", color: "#9CA3AF", background: "transparent", border: "none", cursor: "pointer" }}>
              ✕
            </button>
          )}
        </div>
      </div>

      {query.trim() === "" && (
        <div>
          <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "20px" }}>Browse all {tools.length} tools:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {query.trim() !== "" && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <h2 style={{ fontSize: "18px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>No tools found for "{query}"</h2>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Try searching for "PDF", "calculator", "image" or "converter"</p>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <p style={{ fontSize: "13px", color: "#6366F1", fontWeight: "500", marginBottom: "14px" }}>
            {results.length} result{results.length > 1 ? "s" : ""} for "{query}"
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {results.map((tool) => (
              <ToolCard key={tool.name} tool={tool} query={query} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ToolCard({ tool, query }) {
  function highlight(text, query) {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query?.toLowerCase()
        ? <mark key={i} style={{ background: "#FEF08A", color: "#713F12", borderRadius: "2px", padding: "0 1px" }}>{part}</mark>
        : part
    );
  }

  return (
    <Link href={tool.href} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", textDecoration: "none", display: "flex", alignItems: "center", gap: "14px" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
        {tool.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
          <span style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B" }}>{highlight(tool.name, query)}</span>
          {tool.badge && (
            <span style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "4px", background: "#EEF2FF", color: "#4F46E5", fontWeight: "500" }}>{tool.badge}</span>
          )}
        </div>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>{highlight(tool.description, query)}</p>
      </div>
      <span style={{ fontSize: "11px", color: "#A5B4FC", flexShrink: 0 }}>{tool.category}</span>
    </Link>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Search" }]} />
      <Suspense fallback={
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ fontSize: "14px", color: "#6B7280" }}>Loading search...</div>
        </div>
      }>
        <SearchContent />
      </Suspense>
      <Footer />
    </main>
  );
}