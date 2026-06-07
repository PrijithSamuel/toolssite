"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PrivacyBanner from "../../components/PrivacyBanner";
import FAQ from "../../components/FAQ";

const FAQS = [
  { q: "How many images can I convert to one PDF?", a: "You can add as many images as you need. Each image becomes one page in the PDF." },
  { q: "Can I change the order of images in the PDF?", a: "Yes. Use the up and down arrows next to each image to reorder them before converting." },
  { q: "What image formats are supported?", a: "JPG, PNG and WebP images are all supported." },
  { q: "What page sizes are available?", a: "A4, A3, Letter and Legal page sizes are available in both portrait and landscape orientation." },
  { q: "Are my images uploaded to a server?", a: "No. All conversion happens locally in your browser. Your images never leave your device." },
];

const introStyle = { background: "white", border: "0.5px solid #E0E7FF", borderRadius: "12px", padding: "20px", marginBottom: "24px", fontSize: "14px", color: "#4B5563", lineHeight: "1.8" };

export default function ImageToPDF() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");

  function handleFiles(e) {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({ file, url: URL.createObjectURL(file), name: file.name }));
    setImages((prev) => [...prev, ...newImages]);
  }

  function removeImage(index) { setImages((prev) => prev.filter((_, i) => i !== index)); }
  function moveUp(index) { if (index === 0) return; const arr = [...images]; [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]; setImages(arr); }
  function moveDown(index) { if (index === images.length - 1) return; const arr = [...images]; [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]; setImages(arr); }

  async function convertToPDF() {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation, format: pageSize, unit: "mm" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const ratio = Math.min(pageW / img.width, pageH / img.height);
            const w = img.width * ratio; const h = img.height * ratio;
            const x = (pageW - w) / 2; const y = (pageH - h) / 2;
            doc.addImage(img, "PNG", x, y, w, h);
            resolve();
          };
          img.src = images[i].url;
        });
      }
      doc.save("images.pdf");
    } catch (e) { alert("Error creating PDF: " + e.message); }
    setLoading(false);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <Header breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "Image to PDF" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#1E1B4B", marginBottom: "6px" }}>Image to PDF</h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Convert one or multiple images to PDF. Free, no signup required.</p>
        </div>

        <div style={introStyle}>
          Converting images to PDF is useful when submitting identity documents, assembling a photo portfolio, compiling scanned pages into a single document, or preparing images for professional printing. This tool places each uploaded image on its own page in the PDF. You can upload multiple images and reorder them using the arrows before converting. Page size options include A4, A3, Letter, and Legal in both portrait and landscape orientation — the image is automatically centered and scaled to fit within the page margins. All conversion happens in your browser using the jsPDF library. Your images are never uploaded to any server.
        </div>

        <PrivacyBanner />
        <div style={{ border: "2px dashed #C7D2FE", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "16px", background: "white" }}>
          <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" id="pdf-input" />
          <label htmlFor="pdf-input" style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>📑</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1E1B4B", marginBottom: "4px" }}>Click to upload images</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>JPG, PNG, WebP — multiple files supported</p>
          </label>
        </div>

        {images.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "12px" }}>Page Settings</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>PAGE SIZE</label>
                  <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}
                    style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" }}>
                    <option value="a4">A4</option>
                    <option value="a3">A3</option>
                    <option value="letter">Letter</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500", display: "block", marginBottom: "6px" }}>ORIENTATION</label>
                  <select value={orientation} onChange={(e) => setOrientation(e.target.value)}
                    style={{ width: "100%", border: "0.5px solid #C7D2FE", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", outline: "none", background: "white", color: "#374151" }}>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "#6366F1", fontWeight: "500" }}>{images.length} image{images.length > 1 ? "s" : ""}</p>
            {images.map((img, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", background: "white", border: "0.5px solid #E0E7FF", borderRadius: "10px", padding: "10px 14px" }}>
                <img src={img.url} alt={img.name} style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "8px", border: "0.5px solid #E0E7FF" }} />
                <span style={{ flex: 1, fontSize: "13px", color: "#1E1B4B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.name}</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[["↑", () => moveUp(i)], ["↓", () => moveDown(i)], ["✕", () => removeImage(i)]].map(([icon, fn], j) => (
                    <button key={j} type="button" onClick={fn}
                      style={{ padding: "4px 8px", border: `0.5px solid ${j === 2 ? "#FECACA" : "#C7D2FE"}`, borderRadius: "6px", background: "white", color: j === 2 ? "#DC2626" : "#6366F1", cursor: "pointer", fontSize: "13px" }}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button type="button" onClick={convertToPDF} disabled={loading}
              style={{ width: "100%", background: "#4F46E5", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Creating PDF..." : `Convert ${images.length} Image${images.length > 1 ? "s" : ""} to PDF`}
            </button>
          </div>
        )}

        <div style={{ marginTop: "24px", background: "#EEF2FF", border: "0.5px solid #C7D2FE", borderRadius: "12px", padding: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "500", color: "#1E1B4B", marginBottom: "8px" }}>How to use</h2>
          <ul style={{ fontSize: "13px", color: "#4338CA", lineHeight: "1.8" }}>
            <li>• Upload one or multiple images</li>
            <li>• Reorder using ↑ ↓ buttons</li>
            <li>• Choose page size and orientation</li>
            <li>• Click Convert and PDF downloads automatically</li>
          </ul>
        </div>
      </div>
      <FAQ faqs={FAQS} />
      <Footer />
    </main>
  );
}