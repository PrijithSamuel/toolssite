"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("nl-NL"); }
function fmtDec(n, d = 2) { return n.toLocaleString("nl-NL", { minimumFractionDigits: d, maximumFractionDigits: d }); }

// Zorgtoeslag 2025
const ZORGTOESLAG_MAX_SINGLE = 154;
const ZORGTOESLAG_MAX_PARTNER = 263;
const ZORGTOESLAG_LIMIT_SINGLE = 37496;
const ZORGTOESLAG_LIMIT_PARTNER = 47368;

// Huurtoeslag 2025
const HUURTOESLAG_MAX_RENT = 879.66;
const HUURTOESLAG_MAX_ALLOWANCE = 417;
const HUURTOESLAG_LIMIT = 31375;

// Kinderbijslag 2025
const KINDERBIJSLAG_PER_Q = 280;

// Kinderopvangtoeslag 2025
const KOT_MAX_PCT = 0.96;
const KOT_HOURLY_MAX = 10.25;

export default function NetherlandsToeslagen() {
  const [income, setIncome] = useState("35000");
  const [hasPartner, setHasPartner] = useState(false);
  const [partnerIncome, setPartnerIncome] = useState("0");
  const [renting, setRenting] = useState(true);
  const [rent, setRent] = useState("900");
  const [children, setChildren] = useState("0");
  const [childcareHours, setChildcareHours] = useState("0");

  const inc = parseFloat(income) || 0;
  const pInc = parseFloat(partnerIncome) || 0;
  const totalIncome = hasPartner ? inc + pInc : inc;
  const rentVal = parseFloat(rent) || 0;
  const childrenNum = parseInt(children) || 0;
  const ccHours = parseFloat(childcareHours) || 0;

  // Zorgtoeslag
  const zorgLimit = hasPartner ? ZORGTOESLAG_LIMIT_PARTNER : ZORGTOESLAG_LIMIT_SINGLE;
  const zorgMax = hasPartner ? ZORGTOESLAG_MAX_PARTNER : ZORGTOESLAG_MAX_SINGLE;
  const zorgEligible = totalIncome <= zorgLimit;
  let zorgtoeslag = 0;
  if (zorgEligible) {
    const phase = Math.max(0, 1 - totalIncome / zorgLimit);
    zorgtoeslag = zorgMax * Math.sqrt(phase);
    zorgtoeslag = Math.min(zorgMax, Math.max(0, zorgtoeslag));
  }

  // Huurtoeslag
  const huurEligible = renting && totalIncome <= HUURTOESLAG_LIMIT && rentVal <= HUURTOESLAG_MAX_RENT;
  let huurtoeslag = 0;
  if (huurEligible) {
    const incomePhase = Math.max(0, 1 - totalIncome / HUURTOESLAG_LIMIT);
    huurtoeslag = Math.min(HUURTOESLAG_MAX_ALLOWANCE, HUURTOESLAG_MAX_ALLOWANCE * incomePhase);
  }

  // Kinderbijslag (universal)
  const kinderbijslag = childrenNum > 0 ? (childrenNum * KINDERBIJSLAG_PER_Q) / 3 : 0;

  // Kinderopvangtoeslag
  const ccAnnualHours = ccHours * 52;
  const ccCosts = ccAnnualHours * KOT_HOURLY_MAX;
  const kinderopvangtoeslag = childrenNum > 0 && ccHours > 0 ? (ccCosts * KOT_MAX_PCT) / 12 : 0;

  const totalMonthly = zorgtoeslag + huurtoeslag + kinderbijslag + kinderopvangtoeslag;
  const totalAnnual = totalMonthly * 12;

  const toeslagen = [
    {
      name: "Zorgtoeslag",
      desc: "Healthcare allowance",
      monthly: zorgtoeslag,
      eligible: zorgEligible,
      reason: !zorgEligible ? `Income €${fmt(totalIncome)} exceeds limit €${fmt(zorgLimit)}` : null,
      color: "#4F46E5",
    },
    {
      name: "Huurtoeslag",
      desc: "Rent allowance",
      monthly: huurtoeslag,
      eligible: huurEligible,
      reason: !renting ? "Only for renters" : totalIncome > HUURTOESLAG_LIMIT ? `Income €${fmt(totalIncome)} exceeds limit €${fmt(HUURTOESLAG_LIMIT)}` : rentVal > HUURTOESLAG_MAX_RENT ? `Rent €${fmt(rentVal)} exceeds max rent €${fmtDec(HUURTOESLAG_MAX_RENT)}` : null,
      color: "#6366F1",
    },
    {
      name: "Kinderbijslag",
      desc: `Child benefit (${childrenNum} child${childrenNum !== 1 ? "ren" : ""})`,
      monthly: kinderbijslag,
      eligible: childrenNum > 0,
      reason: childrenNum === 0 ? "Enter number of children" : null,
      color: "#10B981",
      note: "Universal — no income test",
    },
    {
      name: "Kinderopvangtoeslag",
      desc: "Childcare allowance",
      monthly: kinderopvangtoeslag,
      eligible: childrenNum > 0 && ccHours > 0,
      reason: childrenNum === 0 ? "Requires children" : ccHours === 0 ? "Enter weekly childcare hours" : null,
      color: "#8B5CF6",
    },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Toeslagen Calculator" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Toeslagen Calculator Nederland 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Check which Dutch government allowances (toeslagen) you qualify for and estimate your monthly amounts.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Jaarinkomen / Annual income (€)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>€</span>
              <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "11px 12px 11px 26px", outline: "none", background: "white", fontSize: "18px", fontWeight: "500", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Partner / Toeslagpartner?</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setHasPartner(false)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !hasPartner ? "#4F46E5" : "white", color: !hasPartner ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>No partner</button>
              <button onClick={() => setHasPartner(true)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: hasPartner ? "#4F46E5" : "white", color: hasPartner ? "white" : "#374151", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>With partner</button>
            </div>
          </div>

          {hasPartner && (
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Partner annual income (€)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}>€</span>
                <input type="number" value={partnerIncome} onChange={(e) => setPartnerIncome(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 26px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>Combined income: €{fmt(totalIncome)}</div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Housing situation</label>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => setRenting(true)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: renting ? "#4F46E5" : "white", color: renting ? "white" : "#374151", fontSize: "12px", cursor: "pointer" }}>Huurder</button>
                <button onClick={() => setRenting(false)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !renting ? "#4F46E5" : "white", color: !renting ? "white" : "#374151", fontSize: "12px", cursor: "pointer" }}>Eigenaar</button>
              </div>
            </div>
            {renting && (
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Monthly rent (€)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6B7280", fontSize: "13px" }}>€</span>
                  <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 24px", outline: "none", background: "white", fontSize: "14px", boxSizing: "border-box" }} />
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Number of children (kinderen)</label>
              <input type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
            </div>
            {childrenNum > 0 && (
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Childcare hours per week</label>
                <input type="number" min="0" value={childcareHours} onChange={(e) => setChildcareHours(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "6px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Totaal toeslagen / maand</div>
              <div style={{ fontSize: "40px", fontWeight: "700", color: "#4F46E5" }}>€{fmt(totalMonthly)}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Per jaar</div>
              <div style={{ fontSize: "40px", fontWeight: "700", color: "#6366F1" }}>€{fmt(totalAnnual)}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
          {toeslagen.map((t) => (
            <div key={t.name} style={{ background: "white", border: `0.5px solid ${t.eligible ? "#E0E7FF" : "#F3F4F6"}`, borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: t.eligible ? t.color : "#D1D5DB", flexShrink: 0 }} />
                    <span style={{ fontSize: "14px", fontWeight: "600", color: t.eligible ? "#1E1B4B" : "#9CA3AF" }}>{t.name}</span>
                    {t.note && <span style={{ fontSize: "10px", background: "#ECFDF5", color: "#065F46", padding: "2px 6px", borderRadius: "4px", fontWeight: "500" }}>{t.note}</span>}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginLeft: "18px" }}>{t.desc}</div>
                  {!t.eligible && t.reason && (
                    <div style={{ fontSize: "11px", color: "#EF4444", marginLeft: "18px", marginTop: "3px" }}>✗ {t.reason}</div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: t.eligible ? t.color : "#D1D5DB" }}>
                    {t.eligible ? `€${fmt(t.monthly)}/mo` : "—"}
                  </div>
                  {t.eligible && t.monthly > 0 && (
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>€{fmt(t.monthly * 12)}/year</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
          ⚠️ Indicatieve berekening op basis van 2025 tarieven van de Belastingdienst. Vraag toeslagen aan via toeslagen.nl of de DigiD app. Toeslagen worden verrekend op basis van je definitieve jaarinkomen.
        </div>
      </div>
      <Footer />
    </main>
  );
}
