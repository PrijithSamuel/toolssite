"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function fmt(n) { return Math.round(n).toLocaleString("en-LK"); }

const ENGINE_BANDS = [
  { label: "Under 1000cc", cid: 0.30, excise: 1200000 },
  { label: "1000 – 1300cc", cid: 0.30, excise: 1500000 },
  { label: "1300 – 1500cc", cid: 0.30, excise: 2000000 },
  { label: "1500 – 1800cc", cid: 0.50, excise: 3500000 },
  { label: "1800 – 2000cc", cid: 0.75, excise: 5000000 },
  { label: "2000 – 2500cc", cid: 1.00, excise: 8000000 },
  { label: "Above 2500cc", cid: 1.00, excise: 8000000 },
];

const VEHICLE_TYPES = ["Car", "SUV", "Van", "Motorcycle", "Electric Vehicle"];

const introStyle = { background:"white", border:"0.5px solid #E0E7FF", borderRadius:"12px", padding:"20px", marginBottom:"20px", fontSize:"14px", color:"#4B5563", lineHeight:"1.85" };

export default function SriLankaVehicle() {
  const [vehicleType, setVehicleType] = useState("Car");
  const [engineBand, setEngineBand] = useState(1);
  const [cifUSD, setCifUSD] = useState("15000");
  const [usdRate, setUsdRate] = useState("320");
  const [isElectric, setIsElectric] = useState(false);

  const cifVal = parseFloat(cifUSD) || 0;
  const rate = parseFloat(usdRate) || 320;
  const cifLKR = cifVal * rate;

  const band = ENGINE_BANDS[engineBand];

  // Electric vehicles get reduced duties
  const cidRate = isElectric || vehicleType === "Electric Vehicle" ? 0.05 : band.cid;
  const exciseDuty = isElectric || vehicleType === "Electric Vehicle" ? 0 : band.excise;

  const cid = cifLKR * cidRate;
  const pal = cifLKR * 0.10;
  const vatBase = cifLKR + cid + exciseDuty;
  const vat = vatBase * 0.18;
  const sscl = vatBase * 0.025;

  const totalTax = cid + exciseDuty + pal + vat + sscl;
  const totalLanded = cifLKR + totalTax;

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Finance", href: "/finance" }, { label: "Vehicle Import Tax Sri Lanka" }]} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#1E1B4B", marginBottom: "4px" }}>Vehicle Import Duty Calculator Sri Lanka 2025</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Calculate customs duty, excise, VAT and total landed cost for importing a vehicle.</p>
        </div>

        <div style={introStyle}>
          Importing a vehicle to Sri Lanka involves multiple tax layers that together often exceed the CIF value of the vehicle itself. The total tax burden includes Customs Import Duty, Excise Duty, Value Added Tax at 18%, the Social Security Contribution Levy at 2.5%, and the Ports and Airports Levy at 10% of CIF value. The applicable rates depend on the engine capacity — vehicles above 1,800cc attract significantly higher excise duty than smaller engines. Japanese-manufactured vehicles from auction houses are the most commonly imported category in Sri Lanka, and calculating the total cost before bidding at auction is essential to avoid unexpected expenses at the port of entry.
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          {/* Vehicle type */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "7px" }}>Vehicle Type</label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {VEHICLE_TYPES.map((t) => (
                <button key={t} onClick={() => { setVehicleType(t); setIsElectric(t === "Electric Vehicle"); }} style={{ padding: "7px 14px", borderRadius: "8px", border: "0.5px solid #C7D2FE", background: vehicleType === t ? "#4F46E5" : "white", color: vehicleType === t ? "white" : "#374151", fontSize: "12px", cursor: "pointer", fontWeight: "500" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Engine capacity */}
          {vehicleType !== "Electric Vehicle" && (
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "7px" }}>Engine Capacity</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {ENGINE_BANDS.map((b, i) => (
                  <button key={b.label} onClick={() => setEngineBand(i)} style={{ padding: "10px 14px", borderRadius: "8px", border: `0.5px solid ${engineBand === i ? "#A5B4FC" : "#C7D2FE"}`, background: engineBand === i ? "#EEF2FF" : "white", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: engineBand === i ? "#4F46E5" : "#1E1B4B" }}>{b.label}</span>
                    <span style={{ fontSize: "11px", color: "#9CA3AF" }}>CID {(b.cid * 100).toFixed(0)}% | Excise Rs.{fmt(b.excise)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>CIF Value (USD)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#6B7280" }}>$</span>
                <input type="number" value={cifUSD} onChange={(e) => setCifUSD(e.target.value)} placeholder="15000" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px 10px 28px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>USD to LKR Rate</label>
              <input type="number" value={usdRate} onChange={(e) => setUsdRate(e.target.value)} placeholder="320" style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "16px", boxSizing: "border-box" }} />
              {cifVal > 0 && <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>CIF in LKR: Rs.{fmt(cifLKR)}</div>}
            </div>
          </div>
        </div>

        {cifLKR > 0 && (
          <>
            {isElectric && (
              <div style={{ background: "#ECFDF5", border: "0.5px solid #6EE7B7", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", fontSize: "12px", color: "#065F46" }}>
                ⚡ Electric Vehicle — reduced CID (5%) and no excise duty applies.
              </div>
            )}

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total Taxes</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#EF4444" }}>Rs.{fmt(totalTax)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{cifLKR > 0 ? ((totalTax / cifLKR) * 100).toFixed(0) : 0}% of CIF value</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#4F46E5", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Total Landed Cost</div>
                  <div style={{ fontSize: "34px", fontWeight: "700", color: "#4F46E5" }}>Rs.{fmt(totalLanded)}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>CIF + all taxes</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ padding: "10px 20px", fontSize: "11px", fontWeight: "600", color: "#6B7280", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", display: "grid", gridTemplateColumns: "1fr 130px 80px" }}>
                <span>Tax / Duty</span><span style={{ textAlign: "right" }}>Amount (LKR)</span><span style={{ textAlign: "right" }}>Rate</span>
              </div>
              {[
                { label: "CIF Value in LKR", val: cifLKR, rate: "—", color: "#1E1B4B", bold: true },
                { label: `Customs Import Duty (CID)`, val: cid, rate: `${(cidRate * 100).toFixed(0)}%`, color: "#EF4444" },
                { label: "Excise Duty", val: exciseDuty, rate: "fixed", color: "#F97316" },
                { label: "Ports & Airport Levy (PAL)", val: pal, rate: "10%", color: "#F59E0B" },
                { label: "VAT (on CIF+CID+Excise)", val: vat, rate: "18%", color: "#8B5CF6" },
                { label: "SSCL", val: sscl, rate: "2.5%", color: "#6366F1" },
                { label: "Total Taxes", val: totalTax, rate: "—", color: "#EF4444", bold: true },
                { label: "Total Landed Cost", val: totalLanded, rate: "—", color: "#4F46E5", bold: true },
              ].map((r) => (
                <div key={r.label} style={{ padding: "10px 20px", borderBottom: "0.5px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 130px 80px", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{r.label}</span>
                  <span style={{ textAlign: "right", fontWeight: r.bold ? "700" : "500", color: r.color }}>Rs.{fmt(r.val)}</span>
                  <span style={{ textAlign: "right", color: "#9CA3AF", fontSize: "12px" }}>{r.rate}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "10px", padding: "12px 16px", fontSize: "11px", color: "#6B7280" }}>
              ⚠️ Approximate calculation based on 2025 Sri Lanka Customs rates. Actual duties may vary by vehicle age, condition, and specific customs rulings. Consult Sri Lanka Customs (customs.gov.lk) for exact figures.
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
