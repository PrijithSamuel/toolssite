"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";
import LastUpdated from "../../components/LastUpdated";

function fmt(n) { return Math.abs(Math.round(n)).toLocaleString("en-CA"); }
function fmtDec(n, d = 1) { return n.toLocaleString("en-CA", { minimumFractionDigits: d, maximumFractionDigits: d }); }

const FED_BANDS = [
  { from: 0, to: 57375, rate: 0.15 },
  { from: 57375, to: 114750, rate: 0.205 },
  { from: 114750, to: 158519, rate: 0.26 },
  { from: 158519, to: 220000, rate: 0.29 },
  { from: 220000, to: Infinity, rate: 0.33 },
];

const PROVINCES = [
  { code: "ON", name: "Ontario", bands: [{ from: 0, to: 51446, rate: 0.0505 }, { from: 51446, to: 102894, rate: 0.0915 }, { from: 102894, to: 150000, rate: 0.1116 }, { from: 150000, to: 220000, rate: 0.1216 }, { from: 220000, to: Infinity, rate: 0.1316 }] },
  { code: "BC", name: "British Columbia", bands: [{ from: 0, to: 45654, rate: 0.0506 }, { from: 45654, to: 91310, rate: 0.077 }, { from: 91310, to: 104835, rate: 0.105 }, { from: 104835, to: 127299, rate: 0.1229 }, { from: 127299, to: 172602, rate: 0.147 }, { from: 172602, to: 240716, rate: 0.168 }, { from: 240716, to: Infinity, rate: 0.205 }] },
  { code: "AB", name: "Alberta", bands: [{ from: 0, to: 148269, rate: 0.10 }, { from: 148269, to: 177922, rate: 0.12 }, { from: 177922, to: 237230, rate: 0.13 }, { from: 237230, to: 355845, rate: 0.14 }, { from: 355845, to: Infinity, rate: 0.15 }] },
  { code: "QC", name: "Quebec", bands: [{ from: 0, to: 51780, rate: 0.14 }, { from: 51780, to: 103545, rate: 0.19 }, { from: 103545, to: 126000, rate: 0.24 }, { from: 126000, to: Infinity, rate: 0.2575 }] },
  { code: "MB", name: "Manitoba", bands: [{ from: 0, to: 47000, rate: 0.108 }, { from: 47000, to: 100000, rate: 0.1275 }, { from: 100000, to: Infinity, rate: 0.174 }] },
  { code: "SK", name: "Saskatchewan", bands: [{ from: 0, to: 49720, rate: 0.105 }, { from: 49720, to: 142058, rate: 0.125 }, { from: 142058, to: Infinity, rate: 0.145 }] },
  { code: "NS", name: "Nova Scotia", bands: [{ from: 0, to: 29590, rate: 0.0879 }, { from: 29590, to: 59180, rate: 0.1495 }, { from: 59180, to: 93000, rate: 0.1667 }, { from: 93000, to: 150000, rate: 0.175 }, { from: 150000, to: Infinity, rate: 0.21 }] },
  { code: "NB", name: "New Brunswick", bands: [{ from: 0, to: 47715, rate: 0.094 }, { from: 47715, to: 95431, rate: 0.14 }, { from: 95431, to: 176756, rate: 0.16 }, { from: 176756, to: Infinity, rate: 0.195 }] },
  { code: "NL", name: "Newfoundland & Labrador", bands: [{ from: 0, to: 43198, rate: 0.087 }, { from: 43198, to: 86395, rate: 0.145 }, { from: 86395, to: 154244, rate: 0.158 }, { from: 154244, to: 215943, rate: 0.178 }, { from: 215943, to: 275870, rate: 0.198 }, { from: 275870, to: 551739, rate: 0.208 }, { from: 551739, to: Infinity, rate: 0.218 }] },
  { code: "PE", name: "Prince Edward Island", bands: [{ from: 0, to: 32656, rate: 0.0965 }, { from: 32656, to: 64313, rate: 0.1363 }, { from: 64313, to: 105000, rate: 0.1665 }, { from: 105000, to: 140000, rate: 0.18 }, { from: 140000, to: Infinity, rate: 0.187 }] },
  { code: "YT", name: "Yukon", bands: [{ from: 0, to: 57375, rate: 0.064 }, { from: 57375, to: 114750, rate: 0.09 }, { from: 114750, to: 500000, rate: 0.109 }, { from: 500000, to: Infinity, rate: 0.128 }] },
  { code: "NT", name: "Northwest Territories", bands: [{ from: 0, to: 50597, rate: 0.059 }, { from: 50597, to: 101198, rate: 0.086 }, { from: 101198, to: 164525, rate: 0.122 }, { from: 164525, to: Infinity, rate: 0.1405 }] },
  { code: "NU", name: "Nunavut", bands: [{ from: 0, to: 53268, rate: 0.04 }, { from: 53268, to: 106537, rate: 0.07 }, { from: 106537, to: 173205, rate: 0.09 }, { from: 173205, to: Infinity, rate: 0.115 }] },
];

function calcBandTax(income, bands) {
  let tax = 0;
  for (const b of bands) {
    if (income <= b.from) break;
    tax += (Math.min(income, b.to) - b.from) * b.rate;
  }
  return Math.max(0, tax);
}

function getMarginalRate(income, fedBands, provBands) {
  const fedRate = [...fedBands].reverse().find((b) => income > b.from)?.rate ?? 0;
  const provRate = [...provBands].reverse().find((b) => income > b.from)?.rate ?? 0;
  return fedRate + provRate;
}

const CANADA_TAX_FAQS = [
  {
    q: "What is the federal Basic Personal Amount (BPA) for 2025?",
    a: "The federal Basic Personal Amount for 2025 is $15,705. This gives every taxpayer a non-refundable credit of 15% of that amount (~$2,356), reducing federal tax before any other credits are applied.",
  },
  {
    q: "What are the Canadian federal income tax brackets for 2025?",
    a: "Canada's 2025 federal tax brackets are: 15% on the first $57,375; 20.5% on $57,375–$114,750; 26% on $114,750–$158,519; 29% on $158,519–$220,000; and 33% on income above $220,000.",
  },
  {
    q: "Do I pay provincial income tax on top of federal tax?",
    a: "Yes. Canada uses a two-tier system — you pay both federal income tax and provincial or territorial tax. Each province sets its own rate schedules. Quebec residents also file a separate provincial return with Revenu Québec.",
  },
  {
    q: "What are CPP and EI deductions and how much are they?",
    a: "CPP (Canada Pension Plan) is 5.95% on earnings between $3,500 and $68,500, capped at $3,867.50 for 2025. EI (Employment Insurance) is 1.66% of insurable earnings up to a cap of $1,049.12 for 2025. Both generate non-refundable federal tax credits.",
  },
  {
    q: "Which Canadian province has the lowest income tax rate?",
    a: "Nunavut (starting at 4%) and the Northwest Territories (5.9%) have the lowest territorial rates. Alberta has a flat 10% provincial rate with no provincial sales tax, making it popular for higher earners. Nova Scotia has the highest top marginal rate at 21%.",
  },
];

export default function CanadaIncomeTax() {
  const [incomeInput, setIncomeInput] = useState("80000");
  const [provinceCode, setProvinceCode] = useState("ON");

  const income = parseFloat(incomeInput) || 0;
  const province = PROVINCES.find((p) => p.code === provinceCode);

  const BPA = 15705;
  const CPP_MAX = 3867.50;
  const EI_MAX = 1049.12;

  const cpp = Math.min(CPP_MAX, Math.max(0, income - 3500) * 0.0595);
  const ei = Math.min(EI_MAX, income * 0.0166);

  const fedTaxable = Math.max(0, income - BPA);
  const fedGross = calcBandTax(fedTaxable, FED_BANDS);
  const fedCredits = (BPA * 0.15) + (cpp * 0.15) + (ei * 0.15);
  const fedTax = Math.max(0, fedGross - fedCredits);

  const provTax = province ? calcBandTax(income, province.bands) : 0;

  const totalTax = fedTax + provTax + cpp + ei;
  const netAnnual = income - totalTax;
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
  const marginalRate = province ? getMarginalRate(income, FED_BANDS, province.bands) * 100 : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Canadian Income Tax" }]} />
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Canadian Income Tax Calculator 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Federal + provincial tax, CPP and EI — CRA 2025 rates for all provinces and territories.</p>
        </div>
        <LastUpdated date="January 2025" source="Canada Revenue Agency" sourceUrl="https://www.canada.ca/en/revenue-agency.html" />
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "20px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" }}>
          Canada uses a combined federal-provincial tax system. Federal tax is calculated on net income after deducting the Basic Personal Amount ($15,705 in 2025), CPP contributions and EI premiums. Each province adds its own progressive tax on the same income — so your combined marginal rate in Nova Scotia can exceed 54% at the top, while Alberta residents pay no provincial sales tax and have lower combined rates. CPP and EI deductions also generate their own non-refundable federal tax credits at the 15% rate.
        </div>
        <div style={{ marginBottom: "20px" }}>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Annual Employment Income ($)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>$</span>
                <input type="number" value={incomeInput} onChange={(e) => setIncomeInput(e.target.value)} placeholder="80000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px 12px 26px", outline: "none", background: "white", fontSize: "20px", fontWeight: "600", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Province / Territory</label>
              <select value={provinceCode} onChange={(e) => setProvinceCode(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 12px", outline: "none", background: "white", fontSize: "14px", cursor: "pointer" }}>
                {PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {income > 0 && (
          <>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Take-Home / Month</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#4F46E5" }}>${fmt(netAnnual / 12)}</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Take-Home / Year</div>
                  <div style={{ fontSize: "22px", fontWeight: "600", color: "#4F46E5" }}>${fmt(netAnnual)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Effective Rate</div>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#EF4444" }}>{fmtDec(effectiveRate)}%</div>
                </div>
              </div>
              <div style={{ height: "9px", background: "#E0E7FF", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${100 - effectiveRate}%`, background: "linear-gradient(90deg,#4F46E5,#818CF8)", borderRadius: "5px", transition: "width 0.4s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                <span>Take-home: ${fmt(netAnnual)}</span>
                <span>Total tax: ${fmt(totalTax)} | Marginal: {fmtDec(marginalRate)}%</span>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "10px 20px", display: "grid", gridTemplateColumns: "1fr 130px 80px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF" }}>
                <span>Deduction</span><span style={{ textAlign: "right" }}>Annual</span><span style={{ textAlign: "right" }}>% of income</span>
              </div>
              {[
                { label: "Gross income", val: income, color: "#1E1B4B", bold: true },
                { label: `Federal income tax (after BPA credit)`, val: fedTax, color: "#EF4444" },
                { label: `${province?.name} provincial tax`, val: provTax, color: "#F97316" },
                { label: `CPP contributions (5.95%)`, val: cpp, color: "#8B5CF6" },
                { label: `EI premiums (1.66%)`, val: ei, color: "#6366F1" },
                { label: "Total deductions", val: totalTax, color: "#EF4444", bold: true },
                { label: "✓ Net take-home", val: netAnnual, color: "#4F46E5", bold: true },
              ].map((r) => (
                <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 130px 80px", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ textAlign: "right", fontWeight: r.bold ? "700" : "500", color: r.color }}>${fmt(r.val)}</span>
                  <span style={{ textAlign: "right", color: "#9CA3AF", fontSize: "12px" }}>{income > 0 ? fmtDec(r.val / income * 100) : 0}%</span>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: "Marginal Tax Rate", val: `${fmtDec(marginalRate)}%` },
                  { label: "Basic Personal Amount", val: "$15,705" },
                  { label: "Max CPP Contribution", val: "$3,867.50" },
                ].map((i) => (
                  <div key={i.label} style={{ background: "#F8F9FF", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{i.label}</div>
                    <div style={{ fontSize: "17px", fontWeight: "700", color: "#374151" }}>{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Estimate using 2025 CRA federal and provincial rates. Does not include surtaxes, other deductions, or non-refundable credits beyond BPA, CPP and EI. Consult a CPA or use CRA My Account for exact figures.
            </div>
          </>
        )}
      </div>
      <FAQ faqs={CANADA_TAX_FAQS} />
      <Footer />
    </main>
  );
}
