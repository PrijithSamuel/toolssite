"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Official Ukrainian Cabinet Resolution 55 transliteration table
const CYR_TO_LAT = [
  // Special two-character sequences must come before single chars
  ["ЗГ", "ZGH"], ["Зг", "Zgh"], ["зг", "zgh"],
  // Uppercase
  ["А", "A"], ["Б", "B"], ["В", "V"], ["Г", "H"], ["Ґ", "G"],
  ["Д", "D"], ["Е", "E"], ["Є", "Ye"], ["Ж", "Zh"], ["З", "Z"],
  ["И", "Y"], ["І", "I"], ["Ї", "Yi"], ["Й", "Y"], ["К", "K"],
  ["Л", "L"], ["М", "M"], ["Н", "N"], ["О", "O"], ["П", "P"],
  ["Р", "R"], ["С", "S"], ["Т", "T"], ["У", "U"], ["Ф", "F"],
  ["Х", "Kh"], ["Ц", "Ts"], ["Ч", "Ch"], ["Ш", "Sh"], ["Щ", "Shch"],
  ["Ю", "Yu"], ["Я", "Ya"], ["Ь", ""],
  // Lowercase
  ["а", "a"], ["б", "b"], ["в", "v"], ["г", "h"], ["ґ", "g"],
  ["д", "d"], ["е", "e"], ["є", "ye"], ["ж", "zh"], ["з", "z"],
  ["и", "y"], ["і", "i"], ["ї", "yi"], ["й", "y"], ["к", "k"],
  ["л", "l"], ["м", "m"], ["н", "n"], ["о", "o"], ["п", "p"],
  ["р", "r"], ["с", "s"], ["т", "t"], ["у", "u"], ["ф", "f"],
  ["х", "kh"], ["ц", "ts"], ["ч", "ch"], ["ш", "sh"], ["щ", "shch"],
  ["ю", "yu"], ["я", "ya"], ["ь", ""],
];

// Reverse map for Latin → Cyrillic (best-effort, longer matches first)
const LAT_TO_CYR = [
  ["Shch", "Щ"], ["shch", "щ"],
  ["Zh", "Ж"], ["zh", "ж"],
  ["Kh", "Х"], ["kh", "х"],
  ["Ts", "Ц"], ["ts", "ц"],
  ["Ch", "Ч"], ["ch", "ч"],
  ["Sh", "Ш"], ["sh", "ш"],
  ["Ye", "Є"], ["ye", "є"],
  ["Yi", "Ї"], ["yi", "ї"],
  ["Yu", "Ю"], ["yu", "ю"],
  ["Ya", "Я"], ["ya", "я"],
  ["Zgh", "ЗГ"], ["zgh", "зг"],
  ["A", "А"], ["a", "а"],
  ["B", "Б"], ["b", "б"],
  ["V", "В"], ["v", "в"],
  ["H", "Г"], ["h", "г"],
  ["G", "Ґ"], ["g", "ґ"],
  ["D", "Д"], ["d", "д"],
  ["E", "Е"], ["e", "е"],
  ["Z", "З"], ["z", "з"],
  ["Y", "И"], ["y", "и"],
  ["I", "І"], ["i", "і"],
  ["K", "К"], ["k", "к"],
  ["L", "Л"], ["l", "л"],
  ["M", "М"], ["m", "м"],
  ["N", "Н"], ["n", "н"],
  ["O", "О"], ["o", "о"],
  ["P", "П"], ["p", "п"],
  ["R", "Р"], ["r", "р"],
  ["S", "С"], ["s", "с"],
  ["T", "Т"], ["t", "т"],
  ["U", "У"], ["u", "у"],
  ["F", "Ф"], ["f", "ф"],
];

function cyrToLat(text) {
  let result = text;
  for (const [cyr, lat] of CYR_TO_LAT) {
    result = result.split(cyr).join(lat);
  }
  return result;
}

function latToCyr(text) {
  let result = "";
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const [lat, cyr] of LAT_TO_CYR) {
      if (text.slice(i, i + lat.length) === lat) {
        result += cyr;
        i += lat.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  return result;
}

export default function Transliteration() {
  const [mode, setMode] = useState("cyr2lat"); // "cyr2lat" | "lat2cyr"
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = mode === "cyr2lat" ? cyrToLat(input) : latToCyr(input);

  async function copy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function swapMode() {
    const newMode = mode === "cyr2lat" ? "lat2cyr" : "cyr2lat";
    setMode(newMode);
    setInput(output);
  }

  const placeholder = mode === "cyr2lat"
    ? "Введіть текст українською мовою…"
    : "Enter transliterated Latin text…";

  const exampleInput = "Київ, Харків, Запоріжжя";
  const exampleOutput = cyrToLat(exampleInput);

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Ukrainian Transliteration" }]} />
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>🇺🇦 Ukrainian Latin Transliteration Tool</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            Converts Ukrainian Cyrillic ↔ Latin based on the official Cabinet of Ministers Resolution No. 55 standard used in passports, road signs and official documents.
          </p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", alignItems: "center" }}>
          <button
            onClick={() => { setMode("cyr2lat"); setInput(""); }}
            style={{ padding: "9px 20px", borderRadius: "10px", border: "none", background: mode === "cyr2lat" ? "#4F46E5" : "white", color: mode === "cyr2lat" ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer", border: mode === "cyr2lat" ? "none" : "0.5px solid #C7D2FE" }}
          >
            Cyrillic → Latin
          </button>
          <button
            onClick={() => { setMode("lat2cyr"); setInput(""); }}
            style={{ padding: "9px 20px", borderRadius: "10px", border: "none", background: mode === "lat2cyr" ? "#4F46E5" : "white", color: mode === "lat2cyr" ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer", border: mode === "lat2cyr" ? "none" : "0.5px solid #C7D2FE" }}
          >
            Latin → Cyrillic
          </button>
          <button
            onClick={swapMode}
            title="Swap direction and carry output to input"
            style={{ marginLeft: "auto", padding: "9px 16px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: "white", color: "#4F46E5", fontSize: "18px", cursor: "pointer" }}
          >
            ⇄
          </button>
        </div>

        {/* Input / Output */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {mode === "cyr2lat" ? "Ukrainian Cyrillic" : "Latin (transliterated)"}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              rows={10}
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px", outline: "none", background: "white", fontSize: "15px", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", lineHeight: "1.6" }}
            />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {mode === "cyr2lat" ? "Latin (transliterated)" : "Ukrainian Cyrillic"}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Output appears here…"
              rows={10}
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px", outline: "none", background: "#F8F9FF", fontSize: "15px", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", lineHeight: "1.6", color: "#1E1B4B" }}
            />
          </div>
        </div>

        {/* Copy button */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          <button
            onClick={copy}
            disabled={!output}
            style={{ padding: "11px 24px", borderRadius: "10px", background: copied ? "#DCFCE7" : "#4F46E5", color: copied ? "#15803D" : "white", border: "none", fontSize: "14px", fontWeight: "600", cursor: output ? "pointer" : "not-allowed", opacity: output ? 1 : 0.5 }}
          >
            {copied ? "✓ Copied!" : "Copy Output"}
          </button>
          <button
            onClick={() => setInput("")}
            style={{ padding: "11px 20px", borderRadius: "10px", border: "0.5px solid #C7D2FE", background: "white", color: "#6B7280", fontSize: "14px", cursor: "pointer" }}
          >
            Clear
          </button>
        </div>

        {/* Info note */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", marginBottom: "6px" }}>ℹ️ About this standard</div>
          <div style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6" }}>
            This tool uses the <strong>Ukrainian national transliteration system</strong> approved by Cabinet of Ministers Resolution No. 55 (2010). It is the official standard for Ukrainian passports, road signs, official documents and geographic names. The soft sign (Ь) is omitted in transliteration.
          </div>
        </div>

        {/* Example */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#374151" }}>Example</div>
          <div style={{ padding: "14px 20px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Cyrillic</div>
              <div style={{ fontFamily: "monospace", fontSize: "14px", color: "#1E1B4B" }}>{exampleInput}</div>
            </div>
            <div style={{ fontSize: "20px", color: "#C7D2FE", alignSelf: "center" }}>→</div>
            <div>
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Latin (Resolution 55)</div>
              <div style={{ fontFamily: "monospace", fontSize: "14px", color: "#4F46E5" }}>{exampleOutput}</div>
            </div>
          </div>
        </div>

        {/* Character table */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginTop: "16px" }}>
          <div style={{ padding: "10px 16px", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#374151" }}>Character Table (Resolution No. 55)</div>
          <div style={{ padding: "14px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "8px" }}>
              {[
                ["А","A"],["Б","B"],["В","V"],["Г","H"],["Ґ","G"],
                ["Д","D"],["Е","E"],["Є","Ye"],["Ж","Zh"],["З","Z"],
                ["И","Y"],["І","I"],["Ї","Yi"],["Й","Y"],["К","K"],
                ["Л","L"],["М","M"],["Н","N"],["О","O"],["П","P"],
                ["Р","R"],["С","S"],["Т","T"],["У","U"],["Ф","F"],
                ["Х","Kh"],["Ц","Ts"],["Ч","Ch"],["Ш","Sh"],["Щ","Shch"],
                ["Ю","Yu"],["Я","Ya"],["Ь","—"],
              ].map(([cyr, lat]) => (
                <div key={cyr} style={{ background: "#F8F9FF", borderRadius: "6px", padding: "6px 10px", textAlign: "center" }}>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1E1B4B" }}>{cyr}</span>
                  <span style={{ fontSize: "13px", color: "#9CA3AF", margin: "0 4px" }}>→</span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#4F46E5", fontFamily: "monospace" }}>{lat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
