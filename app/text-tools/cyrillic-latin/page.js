"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Ukrainian Cyrillic → Latin (programmer-friendly, close to ISO 9 / common IT usage)
const UA_MAP = {
  "А":"A","а":"a","Б":"B","б":"b","В":"V","в":"v","Г":"H","г":"h",
  "Ґ":"G","ґ":"g","Д":"D","д":"d","Е":"E","е":"e","Є":"Ye","є":"ye",
  "Ж":"Zh","ж":"zh","З":"Z","з":"z","И":"Y","и":"y","І":"I","і":"i",
  "Ї":"Yi","ї":"yi","Й":"J","й":"j","К":"K","к":"k","Л":"L","л":"l",
  "М":"M","м":"m","Н":"N","н":"n","О":"O","о":"o","П":"P","п":"p",
  "Р":"R","р":"r","С":"S","с":"s","Т":"T","т":"t","У":"U","у":"u",
  "Ф":"F","ф":"f","Х":"Kh","х":"kh","Ц":"Ts","ц":"ts","Ч":"Ch","ч":"ch",
  "Ш":"Sh","ш":"sh","Щ":"Shch","щ":"shch","Ь":"","ь":"","Ю":"Yu","ю":"yu",
  "Я":"Ya","я":"ya",
};

// Russian Cyrillic → Latin
const RU_MAP = {
  "А":"A","а":"a","Б":"B","б":"b","В":"V","в":"v","Г":"G","г":"g",
  "Д":"D","д":"d","Е":"Ye","е":"ye","Ё":"Yo","ё":"yo","Ж":"Zh","ж":"zh",
  "З":"Z","з":"z","И":"I","и":"i","Й":"J","й":"j","К":"K","к":"k",
  "Л":"L","л":"l","М":"M","м":"m","Н":"N","н":"n","О":"O","о":"o",
  "П":"P","п":"p","Р":"R","р":"r","С":"S","с":"s","Т":"T","т":"t",
  "У":"U","у":"u","Ф":"F","ф":"f","Х":"Kh","х":"kh","Ц":"Ts","ц":"ts",
  "Ч":"Ch","ч":"ch","Ш":"Sh","ш":"sh","Щ":"Shch","щ":"shch","Ъ":"","ъ":"",
  "Ы":"Y","ы":"y","Ь":"","ь":"","Э":"E","э":"e","Ю":"Yu","ю":"yu",
  "Я":"Ya","я":"ya",
};

function transliterate(text, map) {
  return text.split("").map((ch) => (map[ch] !== undefined ? map[ch] : ch)).join("");
}

const UA_EXAMPLE = { input: "змінна_значення", output: "zminna_znachennia" };
const RU_EXAMPLE = { input: "переменная_значение", output: "peremennaya_znachenie" };

export default function CyrillicLatin() {
  const [lang, setLang] = useState("uk"); // "uk" | "ru"
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const map = lang === "uk" ? UA_MAP : RU_MAP;
  const output = transliterate(input, map);
  const example = lang === "uk" ? UA_EXAMPLE : RU_EXAMPLE;

  async function copy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Text Tools", href: "/text-tools" }, { label: "Cyrillic to Latin" }]} />
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E1B4B", marginBottom: "6px" }}>🔤 Cyrillic to Latin Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            Character-by-character Cyrillic → Latin conversion. Useful for naming variables, functions and identifiers in code when working in Ukrainian or Russian.
          </p>
        </div>

        {/* Language toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button
            onClick={() => { setLang("uk"); setInput(""); }}
            style={{ padding: "9px 22px", borderRadius: "10px", border: lang === "uk" ? "none" : "0.5px solid #C7D2FE", background: lang === "uk" ? "#4F46E5" : "white", color: lang === "uk" ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
          >
            🇺🇦 Ukrainian
          </button>
          <button
            onClick={() => { setLang("ru"); setInput(""); }}
            style={{ padding: "9px 22px", borderRadius: "10px", border: lang === "ru" ? "none" : "0.5px solid #C7D2FE", background: lang === "ru" ? "#4F46E5" : "white", color: lang === "ru" ? "white" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
          >
            🇷🇺 Russian
          </button>
        </div>

        {/* Input / Output side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {lang === "uk" ? "Ukrainian Cyrillic" : "Russian Cyrillic"}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "uk" ? "Введіть текст або назву змінної…" : "Введите текст или название переменной…"}
              rows={10}
              autoFocus
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px", outline: "none", background: "white", fontSize: "15px", resize: "vertical", boxSizing: "border-box", fontFamily: "monospace", lineHeight: "1.6" }}
            />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#6B7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Latin Output</div>
            <textarea
              value={output}
              readOnly
              placeholder="Latin output appears here…"
              rows={10}
              style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "12px", outline: "none", background: "#F8F9FF", fontSize: "15px", resize: "vertical", boxSizing: "border-box", fontFamily: "monospace", lineHeight: "1.6", color: "#1E1B4B" }}
            />
          </div>
        </div>

        {/* Actions */}
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

        {/* Info box */}
        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", marginBottom: "6px" }}>💡 Tip for developers</div>
          <div style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6" }}>
            Ukrainian IT professionals often need to transliterate variable names, function names or comments written in Cyrillic into ASCII-safe Latin identifiers. This tool converts character-by-character so identifiers remain readable and consistent. For official document use, see the <a href="/text-tools/transliteration" style={{ color: "#4F46E5", textDecoration: "underline" }}>Ukrainian Transliteration Tool</a> (Resolution No. 55 standard).
          </div>
        </div>

        {/* Example */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "10px 16px", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#374151" }}>Example</div>
          <div style={{ padding: "14px 20px", display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Cyrillic identifier</div>
              <div style={{ fontFamily: "monospace", fontSize: "14px", color: "#1E1B4B", background: "#F3F4F6", padding: "4px 10px", borderRadius: "4px", display: "inline-block" }}>{example.input}</div>
            </div>
            <div style={{ fontSize: "20px", color: "#C7D2FE" }}>→</div>
            <div>
              <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>Latin identifier</div>
              <div style={{ fontFamily: "monospace", fontSize: "14px", color: "#4F46E5", background: "#EEF2FF", padding: "4px 10px", borderRadius: "4px", display: "inline-block" }}>{example.output}</div>
            </div>
          </div>
        </div>

        {/* Character map */}
        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", background: "#F8F9FF", borderBottom: "0.5px solid #E0E7FF", fontSize: "12px", fontWeight: "600", color: "#374151" }}>
            Character Map — {lang === "uk" ? "Ukrainian" : "Russian"}
          </div>
          <div style={{ padding: "14px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "6px" }}>
              {Object.entries(map)
                .filter(([k]) => k === k.toUpperCase() && k.trim() !== "" && /\p{L}/u.test(k))
                .map(([cyr, lat]) => (
                  <div key={cyr} style={{ background: "#F8F9FF", borderRadius: "6px", padding: "5px 8px", textAlign: "center" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#1E1B4B" }}>{cyr}</span>
                    <span style={{ fontSize: "11px", color: "#9CA3AF", margin: "0 3px" }}>→</span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#4F46E5", fontFamily: "monospace" }}>{lat || "—"}</span>
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
