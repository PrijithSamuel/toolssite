"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("nl-NL"); }
function fmtDec(n, d = 2) { return n.toLocaleString("nl-NL", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const ZELFSTANDIGENAFTREK = 3750;
const MKB_RATE = 0.1331;

function calcBox1Tax(taxable) {
  if (taxable <= 0) return 0;
  if (taxable <= 75518) return taxable * 0.3582;
  return 75518 * 0.3582 + (taxable - 75518) * 0.495;
}

function calcAHK(income) {
  if (income <= 24813) return 3362;
  if (income >= 75518) return 0;
  return Math.max(0, 3362 - (income - 24813) * (3362 / (75518 - 24813)));
}

function calcArbeidskorting(income) {
  if (income <= 0) return 0;
  let ak = Math.min(income, 43000) * (5052 / 43000);
  if (income > 43000) ak = Math.max(0, 5052 - (income - 43000) * (5052 / (120000 - 43000)));
  return Math.max(0, ak);
}

export default function NetherlandsZZP() {
  const [revenueInput, setRevenueInput] = useState("80000");
  const [expensesInput, setExpensesInput] = useState("10000");
  const [btwRate, setBtwRate] = useState(21);

  const revenue = parseFloat(revenueInput) || 0;
  const expenses = parseFloat(expensesInput) || 0;

  const winst = Math.max(0, revenue - expenses);
  const mkbVrijstelling = winst * MKB_RATE;
  const winstNaMKB = winst - mkbVrijstelling;
  const zelftstandigenaftrekApplied = Math.min(winstNaMKB, ZELFSTANDIGENAFTREK);
  const taxableWinst = Math.max(0, winstNaMKB - zelftstandigenaftrekApplied);

  const grossTax = calcBox1Tax(taxableWinst);
  const ahk = calcAHK(taxableWinst);
  const ak = calcArbeidskorting(taxableWinst);
  const totalCredits = ahk + ak;
  const netTax = Math.max(0, grossTax - totalCredits);

  const btwToPayAnnual = revenue * (btwRate / 100);
  const btwQ = btwToPayAnnual / 4;
  const netIncome = winst - netTax;
  const netMonthly = netIncome / 12;
  const effectiveRate = winst > 0 ? (netTax / winst) * 100 : 0;

  const quarters = ["Q1 (Jan–Mar)", "Q2 (Apr–Jun)", "Q3 (Jul–Sep)", "Q4 (Oct–Dec)"];
  const btwDeadlines = ["Apr 30", "Jul 31", "Oct 31", "Jan 31"];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "ZZP Belasting Calculator" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>ZZP Belasting Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Dutch freelancer tax — bereken inkomstenbelasting, MKB-winstvrijstelling en BTW voor ZZP&apos;ers.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Jaaromzet / Annual Revenue (€)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>€</span>
                <input type="number" value={revenueInput} onChange={(e) => setRevenueInput(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 26px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Zakelijke kosten / Business Expenses (€)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>€</span>
                <input type="number" value={expensesInput} onChange={(e) => setExpensesInput(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 26px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>BTW-tarief op je omzet</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[{ rate: 21, label: "21% — Hoog tarief" }, { rate: 9, label: "9% — Laag tarief" }, { rate: 0, label: "0% — Vrijgesteld" }].map(({ rate, label }) => (
                <button key={rate} onClick={() => setBtwRate(rate)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: btwRate === rate ? "#4F46E5" : "white", color: btwRate === rate ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {revenue > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Netto inkomen / jaar</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(netIncome)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Per maand</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(netMonthly)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Effectief tarief</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#EF4444" }}>{fmtDec(effectiveRate, 1)}%</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "10px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 130px" }}>
                <span>Berekening</span><span style={{ textAlign: "right" }}>Bedrag</span>
              </div>
              {[
                { label: "Omzet (revenue)", val: revenue, color: "#1E1B4B", bold: true },
                { label: "Zakelijke kosten (expenses)", val: -expenses, color: "#EF4444" },
                { label: "Winst (profit)", val: winst, color: "#374151", bold: true },
                { label: `MKB-winstvrijstelling (${(MKB_RATE * 100).toFixed(2)}% van winst)`, val: -mkbVrijstelling, color: "#10B981" },
                { label: `Zelfstandigenaftrek 2025`, val: -zelftstandigenaftrekApplied, color: "#10B981" },
                { label: "Belastbare winst (taxable profit)", val: taxableWinst, color: "#374151", bold: true },
                { label: "Box 1 belasting (voor kortingen)", val: -grossTax, color: "#EF4444" },
                { label: "Algemene heffingskorting", val: ahk, color: "#10B981" },
                { label: "Arbeidskorting", val: ak, color: "#10B981" },
                { label: "Netto inkomstenbelasting", val: -netTax, color: "#EF4444", bold: true },
                { label: "✓ Netto inkomen", val: netIncome, color: "#4F46E5", bold: true },
              ].map((r) => (
                <div key={r.label} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 130px", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ textAlign: "right", fontWeight: r.bold ? "700" : "500", color: r.color }}>
                    {r.val < 0 ? `−€${fmt(Math.abs(r.val))}` : `€${fmt(r.val)}`}
                  </span>
                </div>
              ))}
            </div>

            {btwRate > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                  BTW-aangifte — kwartaaloverzicht ({btwRate}% tarief)
                </div>
                <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "11px", fontWeight: "600", color: "#6B7280", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#F8F9FF" }}>
                  <span>Kwartaal</span><span style={{ textAlign: "center" }}>BTW te betalen</span><span style={{ textAlign: "right" }}>Aangifte uiterlijk</span>
                </div>
                {quarters.map((q, i) => (
                  <div key={q} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: "13px" }}>
                    <span style={{ color: "#374151" }}>{q}</span>
                    <span style={{ textAlign: "center", fontWeight: "600", color: "#4F46E5" }}>€{fmt(btwQ)}</span>
                    <span style={{ textAlign: "right", color: "#9CA3AF" }}>{btwDeadlines[i]}</span>
                  </div>
                ))}
                <div style={{ padding: "10px 20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: "13px", background: "#EEF2FF" }}>
                  <span style={{ fontWeight: "700", color: "#4F46E5" }}>Totaal BTW / jaar</span>
                  <span style={{ textAlign: "center", fontWeight: "700", color: "#EF4444" }}>€{fmt(btwToPayAnnual)}</span>
                  <span />
                </div>
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Vereenvoudigde berekening op basis van 2025 tarieven. Zelfstandigenaftrek en MKB-winstvrijstelling vereisen minimaal 1.225 uur werken aan je onderneming (urencriterium). Raadpleeg een belastingadviseur voor je persoonlijke situatie.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
