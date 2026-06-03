"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";



const STATES = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg",
  "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen",
  "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];
const CHURCH_RATE = { "Baden-Württemberg": 0.08, "Bayern": 0.08 };
const getChurchRate = (s) => CHURCH_RATE[s] || 0.09;

const KLASSEN = [
  { k: 1, desc: "Single / Divorced" }, { k: 2, desc: "Single parent" },
  { k: 3, desc: "Married, higher earner" }, { k: 4, desc: "Married, similar" },
  { k: 5, desc: "Married, lower earner" }, { k: 6, desc: "2nd job" },
];

// German income tax formula 2024
function est(zvE) {
  if (zvE <= 11604) return 0;
  if (zvE <= 17005) { const y = (zvE - 11604) / 10000; return (974.07 * y + 1400) * y; }
  if (zvE <= 66760) { const z = (zvE - 17005) / 10000; return (206.43 * z + 2397) * z + 938.24; }
  if (zvE <= 277825) return 0.42 * zvE - 10602.13;
  return 0.45 * zvE - 18936.88;
}

function calcLohnsteuer(annual, klasse) {
  const D = 1266; // standard deductions
  switch (klasse) {
    case 1: case 4: return Math.max(0, Math.round(est(Math.max(0, annual - D))));
    case 2: return Math.max(0, Math.round(est(Math.max(0, annual - D - 4260))));
    case 3: return Math.max(0, Math.round(2 * est(Math.max(0, annual / 2 - D / 2))));
    case 5: return Math.max(0, Math.round(est(annual - D + 11604) - est(11604)));
    case 6: return Math.max(0, Math.round(est(annual + 11604) - est(11604)));
    default: return Math.max(0, Math.round(est(Math.max(0, annual - D))));
  }
}

function calc(grossM, klasse, state, church, isPrivate, hasChildren, isOver23) {
  const G = grossM * 12;
  const BBG_RV = 90600, BBG_KV = 62100;
  const capRV = Math.min(G, BBG_RV), capKV = Math.min(G, BBG_KV);

  const lst = calcLohnsteuer(G, klasse);
  const soli = lst > 18130 ? Math.round(lst * 0.055) : 0;
  const kirche = church ? Math.round(lst * getChurchRate(state)) : 0;

  const rv = Math.round(capRV * 0.093);
  const av = Math.round(capRV * 0.013);
  const kv = isPrivate ? 0 : Math.round(capKV * 0.0815);
  const pvRate = (!hasChildren && isOver23) ? 0.0205 : 0.017;
  const pv = isPrivate ? 0 : Math.round(capKV * pvRate);

  const totalDed = lst + soli + kirche + rv + av + kv + pv;
  const netA = G - totalDed;

  // Employer side
  const eRV = rv, eAV = av;
  const eKV = isPrivate ? 0 : Math.round(capKV * 0.073);
  const ePV = isPrivate ? 0 : Math.round(capKV * 0.017);
  const totalEmployerCost = G + eRV + eAV + eKV + ePV;

  const m = (x) => Math.round(x / 12);
  return {
    grossA: G, grossM: grossM,
    lst, lstM: m(lst), soli, soliM: m(soli), kirche, kircheM: m(kirche),
    rv, rvM: m(rv), av, avM: m(av), kv, kvM: m(kv), pv, pvM: m(pv),
    totalDed, totalDedM: m(totalDed),
    netA, netM: m(netA),
    eRV, eAV, eKV, ePV,
    totalEmployerCost, totalEmployerCostM: m(totalEmployerCost),
  };
}

function fmt(n) { return Math.round(n).toLocaleString("de-DE"); }

export default function BruttoNetto() {
  const [grossInput, setGrossInput] = useState("3500");
  const [isMonthly, setIsMonthly] = useState(true);
  const [klasse, setKlasse] = useState(1);
  const [state, setState] = useState("Nordrhein-Westfalen");
  const [church, setChurch] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [isOver23, setIsOver23] = useState(true);

  const rawVal = parseFloat(grossInput) || 0;
  const grossM = isMonthly ? rawVal : rawVal / 12;
  const res = grossM > 0 ? calc(grossM, klasse, state, church, isPrivate, hasChildren, isOver23) : null;

  const rows = res ? [
    { label: "Lohnsteuer", a: res.lst, m: res.lstM, color: "#EF4444" },
    { label: "Solidaritätszuschlag", a: res.soli, m: res.soliM, color: "#F97316" },
    { label: "Kirchensteuer", a: res.kirche, m: res.kircheM, color: "#F59E0B", hidden: !church },
    { label: "Rentenversicherung (9,3%)", a: res.rv, m: res.rvM, color: "#6366F1" },
    { label: "Arbeitslosenversicherung (1,3%)", a: res.av, m: res.avM, color: "#8B5CF6" },
    { label: `Krankenversicherung (8,15%)${isPrivate ? " — privat versichert" : ""}`, a: res.kv, m: res.kvM, color: "#0284C7", hidden: isPrivate },
    { label: `Pflegeversicherung (${!hasChildren && isOver23 ? "2,05" : "1,7"}%)`, a: res.pv, m: res.pvM, color: "#0891B2", hidden: isPrivate },
  ].filter((r) => !r.hidden) : [];

  const netPct = res ? ((res.netM / res.grossM) * 100).toFixed(1) : 0;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Brutto-Netto-Rechner" }]} />
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Brutto-Netto-Rechner 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Berechne dein Nettogehalt — German salary calculator with all deductions.</p>
        </div>

        {/* Input card */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Gross input + toggle */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <button onClick={() => setIsMonthly(true)} style={{ padding: "6px 16px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: isMonthly ? "#4F46E5" : "white", color: isMonthly ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Monthly</button>
              <button onClick={() => setIsMonthly(false)} style={{ padding: "6px 16px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: !isMonthly ? "#4F46E5" : "white", color: !isMonthly ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Annual</button>
            </div>
            <div style={{ position: "relative" }}>
              <input type="number" value={grossInput} onChange={(e) => setGrossInput(e.target.value)} placeholder="3500" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px 44px 12px 14px", outline: "none", background: "white", fontSize: "22px", fontWeight: "500", boxSizing: "border-box" }} />
              <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#6B7280" }}>€</span>
            </div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>
              {isMonthly ? `= ${fmt(rawVal * 12)} € / year` : `= ${fmt(rawVal / 12)} € / month`}
            </div>
          </div>

          {/* Steuerklasse */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "7px" }}>Steuerklasse</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
              {KLASSEN.map(({ k, desc }) => (
                <button key={k} onClick={() => setKlasse(k)} style={{ padding: "8px 6px", borderRadius: "8px", border: `0.5px solid ${klasse === k ? "#A5B4FC" : "#C7D2FE"}`, background: klasse === k ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: klasse === k ? "#4F46E5" : "#1E1B4B" }}>Klasse {k}</div>
                  <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* State + Church */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", marginBottom: "14px", alignItems: "end" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Bundesland</label>
              <select value={state} onChange={(e) => setState(e.target.value)} style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "9px 10px", outline: "none", background: "white", fontSize: "13px", cursor: "pointer" }}>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Kirchensteuer</label>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => setChurch(true)} style={{ padding: "9px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: church ? "#4F46E5" : "white", color: church ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Ja</button>
                <button onClick={() => setChurch(false)} style={{ padding: "9px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: !church ? "#4F46E5" : "white", color: !church ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Nein</button>
              </div>
            </div>
          </div>

          {/* Health insurance + Children + Age */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Health Insurance</label>
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => setIsPrivate(false)} style={{ flex: 1, padding: "8px 4px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: !isPrivate ? "#4F46E5" : "white", color: !isPrivate ? "white" : "#374151", fontSize: "11px", cursor: "pointer" }}>Gesetzlich</button>
                <button onClick={() => setIsPrivate(true)} style={{ flex: 1, padding: "8px 4px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: isPrivate ? "#4F46E5" : "white", color: isPrivate ? "white" : "#374151", fontSize: "11px", cursor: "pointer" }}>Privat</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Children</label>
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => setHasChildren(true)} style={{ flex: 1, padding: "8px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: hasChildren ? "#4F46E5" : "white", color: hasChildren ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Ja</button>
                <button onClick={() => setHasChildren(false)} style={{ flex: 1, padding: "8px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: !hasChildren ? "#4F46E5" : "white", color: !hasChildren ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Nein</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>Over 23?</label>
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => setIsOver23(true)} style={{ flex: 1, padding: "8px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: isOver23 ? "#4F46E5" : "white", color: isOver23 ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Ja</button>
                <button onClick={() => setIsOver23(false)} style={{ flex: 1, padding: "8px", borderRadius: "7px", border: "0.5px solid #C7D2FE", background: !isOver23 ? "#4F46E5" : "white", color: !isOver23 ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>Nein</button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {res && (
          <>
            {/* Summary */}
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Nettolohn / Monat</div>
                  <div style={{ fontSize: "36px", fontWeight: "600", color: "#4F46E5" }}>{fmt(res.netM)} €</div>
                </div>
                <div style={{ textAlign: "center", borderLeft: "1px solid #C7D2FE", borderRight: "1px solid #C7D2FE" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Nettolohn / Jahr</div>
                  <div style={{ fontSize: "24px", fontWeight: "500", color: "#4F46E5" }}>{fmt(res.netA)} €</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Net of Gross</div>
                  <div style={{ fontSize: "36px", fontWeight: "600", color: "#10B981" }}>{netPct}%</div>
                </div>
              </div>

              {/* Gross vs net bar */}
              <div style={{ height: "10px", background: "#E0E7FF", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${netPct}%`, background: "linear-gradient(90deg, #4F46E5, #818CF8)", borderRadius: "5px", transition: "width 0.4s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                <span>Netto: {fmt(res.grossM - res.totalDedM)} €</span>
                <span>Abzüge: {fmt(res.totalDedM)} € ({(100 - parseFloat(netPct)).toFixed(1)}%)</span>
              </div>
            </div>

            {/* Deductions table */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "12px 20px", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 110px 110px", gap: "8px", fontSize: "11px", fontWeight: "600", color: "#6B7280" }}>
                <span>Abzug (Deduction)</span>
                <span style={{ textAlign: "right" }}>/ Monat</span>
                <span style={{ textAlign: "right" }}>/ Jahr</span>
              </div>

              {/* Gross row */}
              <div style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 110px 110px", gap: "8px", background: "#F8F9FF" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#1E1B4B" }}>Bruttogehalt</span>
                <span style={{ textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#1E1B4B" }}>{fmt(res.grossM)} €</span>
                <span style={{ textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#1E1B4B" }}>{fmt(res.grossA)} €</span>
              </div>

              {rows.map((r) => (
                <div key={r.label} style={{ padding: "9px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 110px 110px", gap: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: r.color, flexShrink: 0 }} />
                    {r.label}
                  </span>
                  <span style={{ textAlign: "right", fontSize: "13px", color: r.color, fontWeight: "500" }}>−{fmt(r.m)} €</span>
                  <span style={{ textAlign: "right", fontSize: "13px", color: "#6B7280" }}>−{fmt(r.a)} €</span>
                </div>
              ))}

              {/* Net row */}
              <div style={{ padding: "12px 20px", display: "grid", gridTemplateColumns: "1fr 110px 110px", gap: "8px", background: "#EEF2FF" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#4F46E5" }}>✓ Nettolohn</span>
                <span style={{ textAlign: "right", fontSize: "16px", fontWeight: "700", color: "#4F46E5" }}>{fmt(res.netM)} €</span>
                <span style={{ textAlign: "right", fontSize: "14px", fontWeight: "600", color: "#4F46E5" }}>{fmt(res.netA)} €</span>
              </div>
            </div>

            {/* Employer costs */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>Arbeitgeberkosten (Employer Total Cost)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "10px" }}>
                {[
                  { label: "RV (9,3%)", val: res.eRV },
                  { label: "AV (1,3%)", val: res.eAV },
                  { label: "KV (7,3%)", val: isPrivate ? 0 : res.eKV },
                  { label: "PV (1,7%)", val: isPrivate ? 0 : res.ePV },
                ].map((e) => (
                  <div key={e.label} style={{ textAlign: "center", background: "#F8F9FF", borderRadius: "8px", padding: "10px" }}>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{e.label}</div>
                    <div style={{ fontSize: "15px", fontWeight: "500", color: "#374151" }}>{fmt(e.val / 12)} €</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "8px 0", borderTop: "0.5px solid #E0E7FF" }}>
                <span style={{ color: "#374151", fontWeight: "600" }}>Total cost to employer</span>
                <span style={{ color: "#4F46E5", fontWeight: "700", fontSize: "16px" }}>{fmt(res.totalEmployerCostM)} €/mo</span>
              </div>
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Approximate calculation based on 2024 German tax law. Does not account for individual deductions, tax allowances, private health insurance premiums, or employer-specific bonuses. Consult a Steuerberater for exact figures.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
