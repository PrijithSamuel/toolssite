"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-CA"); }
function fmtDec(n, d = 1) { return n.toLocaleString("en-CA", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const FED_BANDS = [
  { from: 0, to: 57375, rate: 0.15 },
  { from: 57375, to: 114750, rate: 0.205 },
  { from: 114750, to: 158519, rate: 0.26 },
  { from: 158519, to: 220000, rate: 0.29 },
  { from: 220000, to: Infinity, rate: 0.33 },
];

const PROV_RATES = {
  ON: 0.0915, BC: 0.077, AB: 0.10, QC: 0.19, MB: 0.1275,
  SK: 0.125, NS: 0.1495, NB: 0.14, NL: 0.145, PE: 0.1363,
};

const PROVINCES = [
  { code: "ON", name: "Ontario" }, { code: "BC", name: "BC" }, { code: "AB", name: "Alberta" },
  { code: "QC", name: "Quebec" }, { code: "MB", name: "Manitoba" }, { code: "SK", name: "Saskatchewan" },
  { code: "NS", name: "Nova Scotia" }, { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland" }, { code: "PE", name: "PEI" },
];

function getMarginalFed(income) {
  return [...FED_BANDS].reverse().find((b) => income > b.from)?.rate ?? 0.15;
}

function compound(annual, years, rate = 0.06) {
  let bal = 0;
  for (let y = 0; y < years; y++) bal = (bal + annual) * (1 + rate);
  return bal;
}

const introStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"20px", marginBottom:"20px", fontSize:"14px", color:"#4B5563", lineHeight:"1.85" };

export default function CanadaRRSP() {
  const [income, setIncome] = useState("100000");
  const [province, setProvince] = useState("ON");
  const [contribInput, setContribInput] = useState("15000");
  const [age, setAge] = useState("40");
  const [retireAge, setRetireAge] = useState("65");

  const inc = parseFloat(income) || 0;
  const contrib = Math.min(parseFloat(contribInput) || 0, Math.min(32490, inc * 0.18));
  const requestedContrib = parseFloat(contribInput) || 0;
  const isCapped = requestedContrib > contrib;

  const fedRate = getMarginalFed(inc);
  const provRate = PROV_RATES[province] || 0.10;
  const marginalRate = fedRate + provRate;

  const taxRefund = contrib * marginalRate;
  const netCost = contrib - taxRefund;

  const yearsToRetire = Math.max(0, (parseInt(retireAge) || 65) - (parseInt(age) || 40));
  const rrspBalance = yearsToRetire > 0 ? compound(contrib, yearsToRetire) : contrib;
  const tfsaBalance = yearsToRetire > 0 ? compound(contrib, yearsToRetire) : contrib;

  const monthlyRetirementRRSP = yearsToRetire > 0 ? rrspBalance / (25 * 12) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "RRSP Calculator Canada" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>RRSP Calculator Canada 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate your RRSP tax refund, contribution room and projected retirement savings.</p>
        </div>

        <div style={introStyle}>
          The Registered Retirement Savings Plan (RRSP) is Canada&apos;s primary tax-advantaged retirement savings vehicle. Contributions to an RRSP are deducted from your taxable income in the year they are made, reducing your income tax payable immediately. The investment grows tax-sheltered inside the RRSP until withdrawal — typically at retirement when your income and therefore your marginal tax rate is lower. The 2025 RRSP contribution limit is 32,490 Canadian dollars or 18% of your previous year&apos;s earned income, whichever is lower. Unused contribution room carries forward indefinitely, meaning Canadians who contributed less than the maximum in previous years can make larger contributions in future years to catch up.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Annual Income ($)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Province</label>
              <select value={province} onChange={(e) => setProvince(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                {PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
              RRSP Contribution ($)
              <span style={{ color: "#9CA3AF", fontWeight: "400", marginLeft: "8px" }}>Max ${fmt(Math.min(32490, inc * 0.18))} (18% of income or $32,490)</span>
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
              <input type="number" value={contribInput} onChange={(e) => setContribInput(e.target.value)} style={{ width: "100%", border: `0.5px solid ${isCapped ? "#FCD34D" : "#C7D2FE"}`, borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            {isCapped && <div style={{ fontSize: "11px", color: "#F97316", marginTop: "3px" }}>Capped at ${fmt(contrib)} (your maximum room)</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Current Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Retirement Age</label>
              <input type="number" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
          </div>
        </div>

        {inc > 0 && contrib > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Tax Refund This Year", val: `$${fmt(taxRefund)}`, sub: `@ ${fmtDec(marginalRate * 100)}% marginal rate`, color: "#10B981" },
                  { label: "Net Cost of Contribution", val: `$${fmt(netCost)}`, sub: `$${fmt(contrib)} − $${fmt(taxRefund)}`, color: "#4F46E5" },
                  { label: "RRSP at Retirement", val: `$${fmt(rrspBalance)}`, sub: `${yearsToRetire} yrs at 6% growth`, color: "#374151" },
                ].map((i) => (
                  <div key={i.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>{i.label}</div>
                    <div style={{ fontSize: "26px", fontWeight: "700", color: i.color }}>{i.val}</div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{i.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "0.5px solid #C7D2FE", fontSize: "12px", color: "#374151", textAlign: "center" }}>
                Every <strong>$1</strong> in RRSP costs you only <strong>${fmtDec(1 - marginalRate, 2)}</strong> after the tax refund — and grows tax-deferred.
              </div>
            </div>

            {yearsToRetire > 0 && (
              <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "600", color: "#374151" }}>RRSP vs TFSA — Annual ${fmt(contrib)} contribution over {yearsToRetire} years</div>
                {[
                  { label: "Contribution amount", rrsp: `$${fmt(contrib)}/yr`, tfsa: `$${fmt(contrib)}/yr` },
                  { label: "Tax refund on contribution", rrsp: `$${fmt(taxRefund)}/yr`, tfsa: "None" },
                  { label: "Net cost per year", rrsp: `$${fmt(netCost)}/yr`, tfsa: `$${fmt(contrib)}/yr` },
                  { label: "Balance at retirement (6% growth)", rrsp: `$${fmt(rrspBalance)}`, tfsa: `$${fmt(tfsaBalance)}` },
                  { label: "Tax on withdrawals", rrsp: "Taxed as income", tfsa: "Tax-free" },
                  { label: "Monthly income (25yr drawdown)", rrsp: `$${fmt(monthlyRetirementRRSP)}`, tfsa: `$${fmt(tfsaBalance / (25 * 12))}` },
                ].map((r) => (
                  <div key={r.label} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: "12px" }}>
                    <span style={{ color: "#6B7280" }}>{r.label}</span>
                    <span style={{ color: "#4F46E5", fontWeight: "500", textAlign: "center" }}>{r.rrsp}</span>
                    <span style={{ color: "#10B981", fontWeight: "500", textAlign: "center" }}>{r.tfsa}</span>
                  </div>
                ))}
                <div style={{ padding: "8px 20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: "11px", color: "#9CA3AF", background: "#F8F9FF" }}>
                  <span></span><span style={{ textAlign: "center", fontWeight: "600" }}>RRSP</span><span style={{ textAlign: "center", fontWeight: "600" }}>TFSA</span>
                </div>
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ 2025 RRSP limit: $32,490 or 18% of prior year earned income. RRSP deadline: March 3, 2025 (for 2024 tax year). Growth projection at 6% is illustrative — actual returns vary. Withdrawals are taxed as income. Consult a financial advisor.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
