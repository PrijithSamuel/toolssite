"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`);
    else router.push("/search");
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div style={{ display: "flex", alignItems: "center", background: "white", borderRadius: "12px", maxWidth: "500px", margin: "0 auto 24px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
      <span style={{ padding: "0 10px 0 16px", fontSize: "18px" }}>🔍</span>
      <input
        type="text"
        placeholder="Search 50+ tools — try 'PDF merge' or 'BMI'..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        style={{ flex: 1, border: "none", outline: "none", fontSize: "13px", padding: "14px 0", background: "transparent", color: "#374151" }}
      />
      <button
        type="button"
        onClick={handleSearch}
        style={{ background: "#4F46E5", color: "white", border: "none", padding: "10px 20px", fontSize: "13px", fontWeight: "500", cursor: "pointer", margin: "6px", borderRadius: "8px" }}>
        Search
      </button>
    </div>
  );
}