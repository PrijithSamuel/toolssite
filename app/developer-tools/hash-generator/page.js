"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Pure-JS MD5 implementation
function md5(inputStr) {
  const str = unescape(encodeURIComponent(inputStr));
  function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    return ((((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff));
  }
  function rol(n, c) { return (n << c) | (n >>> (32 - c)); }
  function cmn(q, a, b, x, s, t) { return safeAdd(rol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
  function blks(s) {
    const nb = ((s.length + 8) >> 6) + 1;
    const b = new Array(nb * 16).fill(0);
    for (let i = 0; i < s.length; i++) b[i >> 2] |= s.charCodeAt(i) << (i % 4) * 8;
    b[s.length >> 2] |= 0x80 << (s.length % 4) * 8;
    b[nb * 16 - 2] = s.length * 8;
    return b;
  }
  function hex(n) {
    let s = "";
    for (let j = 0; j <= 3; j++) s += ("0" + ((n >> j * 8) & 0xff).toString(16)).slice(-2);
    return s;
  }
  const x = blks(str);
  let [a, b, c, d] = [1732584193, -271733879, -1732584194, 271733878];
  for (let i = 0; i < x.length; i += 16) {
    const [oa, ob, oc, od] = [a, b, c, d];
    a=ff(a,b,c,d,x[i],7,-680876936);d=ff(d,a,b,c,x[i+1],12,-389564586);c=ff(c,d,a,b,x[i+2],17,606105819);b=ff(b,c,d,a,x[i+3],22,-1044525330);
    a=ff(a,b,c,d,x[i+4],7,-176418897);d=ff(d,a,b,c,x[i+5],12,1200080426);c=ff(c,d,a,b,x[i+6],17,-1473231341);b=ff(b,c,d,a,x[i+7],22,-45705983);
    a=ff(a,b,c,d,x[i+8],7,1770035416);d=ff(d,a,b,c,x[i+9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,-42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
    a=ff(a,b,c,d,x[i+12],7,1804603682);d=ff(d,a,b,c,x[i+13],12,-40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);b=ff(b,c,d,a,x[i+15],22,1236535329);
    a=gg(a,b,c,d,x[i+1],5,-165796510);d=gg(d,a,b,c,x[i+6],9,-1069501632);c=gg(c,d,a,b,x[i+11],14,643717713);b=gg(b,c,d,a,x[i],20,-373897302);
    a=gg(a,b,c,d,x[i+5],5,-701558691);d=gg(d,a,b,c,x[i+10],9,38016083);c=gg(c,d,a,b,x[i+15],14,-660478335);b=gg(b,c,d,a,x[i+4],20,-405537848);
    a=gg(a,b,c,d,x[i+9],5,568446438);d=gg(d,a,b,c,x[i+14],9,-1019803690);c=gg(c,d,a,b,x[i+3],14,-187363961);b=gg(b,c,d,a,x[i+8],20,1163531501);
    a=gg(a,b,c,d,x[i+13],5,-1444681467);d=gg(d,a,b,c,x[i+2],9,-51403784);c=gg(c,d,a,b,x[i+7],14,1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);
    a=hh(a,b,c,d,x[i+5],4,-378558);d=hh(d,a,b,c,x[i+8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16,1839030562);b=hh(b,c,d,a,x[i+14],23,-35309556);
    a=hh(a,b,c,d,x[i+1],4,-1530992060);d=hh(d,a,b,c,x[i+4],11,1272893353);c=hh(c,d,a,b,x[i+7],16,-155497632);b=hh(b,c,d,a,x[i+10],23,-1094730640);
    a=hh(a,b,c,d,x[i+13],4,681279174);d=hh(d,a,b,c,x[i],11,-358537222);c=hh(c,d,a,b,x[i+3],16,-722521979);b=hh(b,c,d,a,x[i+6],23,76029189);
    a=hh(a,b,c,d,x[i+9],4,-640364487);d=hh(d,a,b,c,x[i+12],11,-421815835);c=hh(c,d,a,b,x[i+15],16,530742520);b=hh(b,c,d,a,x[i+2],23,-995338651);
    a=ii(a,b,c,d,x[i],6,-198630844);d=ii(d,a,b,c,x[i+7],10,1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);b=ii(b,c,d,a,x[i+5],21,-57434055);
    a=ii(a,b,c,d,x[i+12],6,1700485571);d=ii(d,a,b,c,x[i+3],10,-1894986606);c=ii(c,d,a,b,x[i+10],15,-1051523);b=ii(b,c,d,a,x[i+1],21,-2054922799);
    a=ii(a,b,c,d,x[i+8],6,1873313359);d=ii(d,a,b,c,x[i+15],10,-30611744);c=ii(c,d,a,b,x[i+6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21,1309151649);
    a=ii(a,b,c,d,x[i+4],6,-145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+2],15,718787259);b=ii(b,c,d,a,x[i+9],21,-343485551);
    a=safeAdd(a,oa);b=safeAdd(b,ob);c=safeAdd(c,oc);d=safeAdd(d,od);
  }
  return hex(a)+hex(b)+hex(c)+hex(d);
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha1(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({ md5: "", sha1: "", sha256: "" });
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (!input) { setHashes({ md5: "", sha1: "", sha256: "" }); return; }
    const m = md5(input);
    setHashes((h) => ({ ...h, md5: m }));
    sha1(input).then((s) => setHashes((h) => ({ ...h, sha1: s })));
    sha256(input).then((s) => setHashes((h) => ({ ...h, sha256: s })));
  }, [input]);

  function copyHash(key, val) {
    if (!val) return;
    navigator.clipboard.writeText(val).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const rows = [
    { key: "md5", label: "MD5", bits: "128-bit", chars: 32, note: "Fast — not for security use" },
    { key: "sha1", label: "SHA-1", bits: "160-bit", chars: 40, note: "Deprecated for cryptographic use" },
    { key: "sha256", label: "SHA-256", bits: "256-bit", chars: 64, note: "Current gold standard" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "Hash Generator" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Hash Generator</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Generate MD5, SHA-1 and SHA-256 hashes from any text input.</p>
        </div>

        <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to hash..."
            rows={4}
            style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", outline: "none", background: "white", fontSize: "13px", resize: "vertical", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {rows.map(({ key, label, bits, chars, note }) => (
            <div key={key} style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#1E1B4B" }}>{label}</span>
                  <span style={{ fontSize: "11px", background: "#EEF2FF", color: "#6366F1", padding: "2px 7px", borderRadius: "4px" }}>{bits}</span>
                  <span style={{ fontSize: "11px", color: "#9CA3AF" }}>{note}</span>
                </div>
                <button
                  onClick={() => copyHash(key, hashes[key])}
                  disabled={!hashes[key]}
                  style={{ padding: "5px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied === key ? "#10B981" : "white", color: copied === key ? "white" : "#374151", fontSize: "12px", cursor: hashes[key] ? "pointer" : "default", fontWeight: "500" }}
                >
                  {copied === key ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={{ background: "#F8F9FF", borderRadius: "8px", padding: "10px 14px", fontFamily: "monospace", fontSize: "13px", color: hashes[key] ? "#1E1B4B" : "#D1D5DB", wordBreak: "break-all", minHeight: "40px" }}>
                {hashes[key] || `${chars} character hash will appear here`}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px", marginTop: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>About these hashes</div>
          <p style={{ fontSize: "12px", color: "#6B7280", margin: 0, lineHeight: "1.6" }}>
            MD5 is implemented in pure JavaScript. SHA-1 and SHA-256 use the browser's built-in Web Crypto API for accuracy. All hashing happens entirely in your browser — no data is sent anywhere.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
