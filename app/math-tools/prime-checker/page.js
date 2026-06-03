"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}

function primeFactors(n) {
  const factors = [];
  for (let d = 2; d * d <= n; d++) while (n % d === 0) { factors.push(d); n = Math.floor(n / d); }
  if (n > 1) factors.push(n);
  return factors;
}

function nearestPrime(n, dir) {
  let c = dir === "above" ? n + 1 : n - 1;
  while (c >= 2 && !isPrime(c)) c += dir === "above" ? 1 : -1;
  return c >= 2 ? c : null;
}

function sieve(limit) {
  if (limit < 2) return [];
  const cap = Math.min(limit, 500);
  const s = new Array(cap + 1).fill(true);
  s[0] = s[1] = false;
  for (let i = 2; i * i <= cap; i++) if (s[i]) for (let j = i * i; j <= cap; j += i) s[j] = false;
  return s.reduce((a, v, i) => v ? [...a, i] : a, []);
}

export default function PrimeChecker() {
  const [input, setInput] = useState("17");
  const [listLimit, setListLimit] = useState("50");

  const n = parseInt(input) || 0;
  const prime = n >= 2 && isPrime(n);
  const factors = n >= 2 && !prime ? primeFactors(n) : [];
  const factorMap = factors.reduce((m, f) => { m[f] = (m[f] || 0) + 1; return m; }, {});
  const below = n > 2 ? nearestPrime(n, "below") : null;
  const above = nearestPrime(n, "above");
  const primes = sieve(parseInt(listLimit) || 50);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Math Tools", href: "/math-tools" }, { label: "Prime Checker" }]} />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Prime Checker</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Check if a number is prime, find its factors, and list primes.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Enter a Number</label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 97"
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 14px", outline: "none", background: "white", fontSize: "20px", boxSizing: "border-box" }}
          />
        </div>

        {n >= 2 && (
          <div style={{ background: prime ? "#ECFDF5" : "#FFF5F5", border: `0.5px solid ${prime ? "#6EE7B7" : "#FCA5A5"}`, borderRadius: "12px", padding: "20px 24px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "40px" }}>{prime ? "✓" : "✗"}</div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "600", color: prime ? "#065F46" : "#991B1B" }}>
                {n} is {prime ? "" : "NOT "}a prime number
              </div>
              <div style={{ fontSize: "13px", color: prime ? "#10B981" : "#EF4444", marginTop: "2px" }}>
                {prime ? "Divisible only by 1 and itself" : `Has ${factors.length} prime factor${factors.length !== 1 ? "s" : ""}`}
              </div>
            </div>
          </div>
        )}

        {n < 2 && input && (
          <div style={{ background: "#FFF5F5", border: "0.5px solid #FCA5A5", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px", fontSize: "13px", color: "#EF4444" }}>
            Prime numbers start from 2.
          </div>
        )}

        {factors.length > 0 && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Prime Factorization</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "18px", color: "#374151" }}>{n} =</span>
              {Object.entries(factorMap).map(([f, exp], i, arr) => (
                <span key={f} style={{ fontSize: "18px", color: "#4F46E5", fontWeight: "500" }}>
                  {f}{exp > 1 ? <sup>{exp}</sup> : ""}{i < arr.length - 1 ? " × " : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {n >= 2 && (below !== null || above !== null) && (
          <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>Nearest Primes</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {below !== null && (
                <div style={{ background: "#EEF2FF", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500" }}>NEAREST BELOW</div>
                  <div style={{ fontSize: "28px", fontWeight: "500", color: "#4F46E5" }}>{below}</div>
                </div>
              )}
              {above !== null && (
                <div style={{ background: "#EEF2FF", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500" }}>NEAREST ABOVE</div>
                  <div style={{ fontSize: "28px", fontWeight: "500", color: "#4F46E5" }}>{above}</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Prime Numbers up to</div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[50, 100, 200, 500].map((l) => (
                <button key={l} onClick={() => setListLimit(String(l))} style={{ padding: "4px 10px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: listLimit === String(l) ? "#4F46E5" : "white", color: listLimit === String(l) ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {primes.map((p) => (
              <span key={p} style={{ padding: "4px 9px", borderRadius: "5px", fontSize: "12px", background: p === n ? "#4F46E5" : "#EEF2FF", color: p === n ? "white" : "#4338CA", fontWeight: p === n ? "600" : "400" }}>{p}</span>
            ))}
          </div>
          <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "8px" }}>{primes.length} primes up to {Math.min(parseInt(listLimit) || 50, 500)}</div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
