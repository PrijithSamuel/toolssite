"use client";
import { useState, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ImageToBase64() {
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState("");
  const [dataUri, setDataUri] = useState("");
  const [mimeType, setMimeType] = useState("image/png");
  const [originalSize, setOriginalSize] = useState(0);
  const [copied, setCopied] = useState({});
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  function processFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    setOriginalSize(file.size);
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      const b64 = result.split(",")[1];
      setBase64(b64);
      setDataUri(result);
      setPreview(result);
      setCopied({});
    };
    reader.readAsDataURL(file);
  }

  function handleFile(e) {
    processFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  }

  function copyItem(key, text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 1800);
    });
  }

  const base64SizeKb = base64 ? (base64.length * 0.75 / 1024).toFixed(1) : 0;
  const origSizeKb = (originalSize / 1024).toFixed(1);
  const imgTag = dataUri ? `<img src="${dataUri}" alt="image" />` : "";
  const ext = mimeType.split("/")[1]?.toUpperCase() ?? "IMG";

  const outputBoxStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" };
  const headerStyle = { padding: "10px 16px", borderBottom: "0.5px solid #E0E7FF", fontSize: "13px", fontWeight: "500", color: "#374151", background: "#F8F9FF", display: "flex", justifyContent: "space-between", alignItems: "center" };
  const codeStyle = { padding: "14px 16px", fontFamily: "monospace", fontSize: "12px", color: "#1E1B4B", wordBreak: "break-all", lineHeight: "1.6", maxHeight: "120px", overflowY: "auto", background: "white" };

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Developer Tools", href: "/developer-tools" }, { label: "Image to Base64" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Image to Base64 Converter</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Upload any image to get its Base64 string, data URI, and ready-to-use HTML img tag.</p>
        </div>

        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "#4F46E5" : "#C7D2FE"}`,
            borderRadius: "12px",
            padding: "36px 24px",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "#EEF2FF" : "white",
            marginBottom: "16px",
            transition: "all 0.2s",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>🖼️</div>
          <div style={{ fontSize: "15px", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>
            {preview ? "Click or drop to change image" : "Click or drag & drop an image"}
          </div>
          <div style={{ fontSize: "13px", color: "#9CA3AF" }}>PNG, JPG, GIF, WebP, SVG supported</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </div>

        {preview && (
          <>
            {/* Preview + size info */}
            <div style={{ background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "16px", marginBottom: "16px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <img src={preview} alt="preview" style={{ maxHeight: "100px", maxWidth: "180px", borderRadius: "8px", objectFit: "contain", border: "0.5px solid #E0E7FF" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[
                    { label: "Format", value: ext },
                    { label: "Original size", value: `${origSizeKb} KB` },
                    { label: "Base64 size", value: `${base64SizeKb} KB` },
                    { label: "Size increase", value: `~${Math.round((base64SizeKb / origSizeKb - 1) * 100)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background: "#EEF2FF", borderRadius: "8px", padding: "8px 14px" }}>
                      <div style={{ fontSize: "11px", color: "#6366F1", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#4F46E5" }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Output 1: Raw base64 */}
            <div style={outputBoxStyle}>
              <div style={headerStyle}>
                <span>Raw Base64 String</span>
                <button onClick={() => copyItem("b64", base64)} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied.b64 ? "#DCFCE7" : "#EEF2FF", color: copied.b64 ? "#15803D" : "#4F46E5", cursor: "pointer" }}>
                  {copied.b64 ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={codeStyle}>{base64}</div>
            </div>

            {/* Output 2: Data URI */}
            <div style={outputBoxStyle}>
              <div style={headerStyle}>
                <span>Data URI <span style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: "400" }}>data:{mimeType};base64,…</span></span>
                <button onClick={() => copyItem("uri", dataUri)} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied.uri ? "#DCFCE7" : "#EEF2FF", color: copied.uri ? "#15803D" : "#4F46E5", cursor: "pointer" }}>
                  {copied.uri ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={codeStyle}>{dataUri}</div>
            </div>

            {/* Output 3: HTML img tag */}
            <div style={outputBoxStyle}>
              <div style={headerStyle}>
                <span>HTML img tag</span>
                <button onClick={() => copyItem("img", imgTag)} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "0.5px solid #C7D2FE", background: copied.img ? "#DCFCE7" : "#EEF2FF", color: copied.img ? "#15803D" : "#4F46E5", cursor: "pointer" }}>
                  {copied.img ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={codeStyle}>{imgTag}</div>
            </div>
          </>
        )}

        <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "14px 18px", fontSize: "13px", color: "#374151" }}>
          <strong style={{ color: "#4F46E5" }}>Note:</strong> Base64 encoding increases file size by ~33%. It&apos;s best used for small images (icons, thumbnails). Large images should be served as files.
        </div>
      </div>
      <Footer />
    </main>
  );
}
