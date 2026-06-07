"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const TABS = [
  { id: "women-clothes", label: "Women Clothes" },
  { id: "men-clothes",   label: "Men Clothes" },
  { id: "women-shoes",   label: "Women Shoes" },
  { id: "men-shoes",     label: "Men Shoes" },
];

// Each table: array of size rows, each row is { eu, us, uk, ... }
const WOMEN_CLOTHES = [
  { eu: "32", us: "0",  uk: "4"  },
  { eu: "34", us: "2",  uk: "6"  },
  { eu: "36", us: "4",  uk: "8"  },
  { eu: "38", us: "6",  uk: "10" },
  { eu: "40", us: "8",  uk: "12" },
  { eu: "42", us: "10", uk: "14" },
  { eu: "44", us: "12", uk: "16" },
  { eu: "46", us: "14", uk: "18" },
  { eu: "48", us: "16", uk: "20" },
  { eu: "50", us: "18", uk: "22" },
  { eu: "52", us: "20", uk: "24" },
  { eu: "54", us: "22", uk: "26" },
];

const MEN_CLOTHES = [
  { eu: "44", label: "XS",  chest: "86"  },
  { eu: "46", label: "S",   chest: "90"  },
  { eu: "48", label: "M",   chest: "94"  },
  { eu: "50", label: "L",   chest: "98"  },
  { eu: "52", label: "XL",  chest: "102" },
  { eu: "54", label: "2XL", chest: "106" },
  { eu: "56", label: "3XL", chest: "110" },
  { eu: "58", label: "4XL", chest: "118" },
  { eu: "60", label: "5XL", chest: "126" },
];

const WOMEN_SHOES = [
  { eu: "35", us: "5",    uk: "2.5", cm: "22.5" },
  { eu: "36", us: "6",    uk: "3.5", cm: "23"   },
  { eu: "37", us: "6.5",  uk: "4",   cm: "23.5" },
  { eu: "38", us: "7.5",  uk: "5",   cm: "24"   },
  { eu: "39", us: "8.5",  uk: "6",   cm: "25"   },
  { eu: "40", us: "9.5",  uk: "7",   cm: "25.5" },
  { eu: "41", us: "10.5", uk: "8",   cm: "26"   },
  { eu: "42", us: "11.5", uk: "9",   cm: "27"   },
];

const MEN_SHOES = [
  { eu: "39", us: "6",    uk: "5.5",  cm: "25"   },
  { eu: "40", us: "7",    uk: "6.5",  cm: "25.5" },
  { eu: "41", us: "7.5",  uk: "7",    cm: "26.5" },
  { eu: "42", us: "8.5",  uk: "8",    cm: "27"   },
  { eu: "43", us: "9.5",  uk: "9",    cm: "27.5" },
  { eu: "44", us: "10.5", uk: "10",   cm: "28.5" },
  { eu: "45", us: "11",   uk: "10.5", cm: "29"   },
  { eu: "46", us: "12",   uk: "11.5", cm: "29.5" },
  { eu: "47", us: "13",   uk: "12.5", cm: "30.5" },
  { eu: "48", us: "14",   uk: "13.5", cm: "31"   },
];

function getTableConfig(tab) {
  switch (tab) {
    case "women-clothes": return { data: WOMEN_CLOTHES, cols: ["eu", "us", "uk"], headers: ["EU / UA", "US", "UK"] };
    case "men-clothes":   return { data: MEN_CLOTHES,   cols: ["eu", "label", "chest"], headers: ["EU / UA", "Label", "Chest (cm)"] };
    case "women-shoes":   return { data: WOMEN_SHOES,   cols: ["eu", "us", "uk", "cm"], headers: ["EU / UA", "US", "UK", "Foot (cm)"] };
    case "men-shoes":     return { data: MEN_SHOES,     cols: ["eu", "us", "uk", "cm"], headers: ["EU / UA", "US", "UK", "Foot (cm)"] };
  }
}

export default function ClothingSize() {
  const [tab, setTab] = useState("women-clothes");
  const [selected, setSelected] = useState(null); // index of selected row

  function handleTabChange(id) {
    setTab(id);
    setSelected(null);
  }

  const { data, cols, headers } = getTableConfig(tab);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Converters", href: "/converters" }, { label: "Clothing Size Converter" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>👗 Clothing Size Converter — EU US UK</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Select your size in any system to see equivalents. Useful for shopping on AliExpress, Amazon, Zara and other international stores.</p>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              style={{
                padding: "9px 18px",
                borderRadius: "10px",
                border: tab === t.id ? "none" : "0.5px solid #C7D2FE",
                background: tab === t.id ? "#4F46E5" : "white",
                color: tab === t.id ? "white" : "#374151",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Selected size highlight */}
        {selected !== null && (
          <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#4F46E5", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Your size equivalents</div>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {cols.map((col, i) => (
                <div key={col} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "3px" }}>{headers[i]}</div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "#4F46E5" }}>{data[selected][col]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Size table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8F9FF" }}>
                  {headers.map((h) => (
                    <th key={h} style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "700", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", borderBottom: "0.5px solid #E0E7FF" }}>
                      {h}
                    </th>
                  ))}
                  <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: "700", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", borderBottom: "0.5px solid #E0E7FF" }}>
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => {
                  const isSelected = selected === i;
                  return (
                    <tr
                      key={i}
                      onClick={() => setSelected(isSelected ? null : i)}
                      style={{
                        background: isSelected ? "#EEF2FF" : i % 2 === 0 ? "white" : "#FAFBFF",
                        cursor: "pointer",
                        borderBottom: "0.5px solid #F3F4F6",
                        transition: "background 0.1s",
                      }}
                    >
                      {cols.map((col) => (
                        <td key={col} style={{ padding: "13px 16px", fontSize: "15px", fontWeight: isSelected ? "700" : "500", color: isSelected ? "#4F46E5" : "#1E1B4B", textAlign: "center" }}>
                          {row[col]}
                        </td>
                      ))}
                      <td style={{ padding: "13px 16px", textAlign: "center" }}>
                        <div style={{
                          width: "20px", height: "20px", borderRadius: "50%", margin: "0 auto",
                          background: isSelected ? "#4F46E5" : "transparent",
                          border: `2px solid ${isSelected ? "#4F46E5" : "#C7D2FE"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {isSelected && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "white" }} />}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info box */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", marginBottom: "6px" }}>ℹ️ Shopping tip</div>
          <div style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6" }}>
            Sizes can vary by brand. When shopping internationally on <strong>AliExpress</strong>, <strong>Amazon</strong> or <strong>Zara</strong>, always check the brand's own size chart and measure your actual body dimensions — especially chest, waist and hips for clothes, and foot length in cm for shoes.
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
