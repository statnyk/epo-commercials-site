import { useState, useRef, useEffect } from "react";
import { loadParts, saveParts, PARTS_STORAGE_KEY } from "./cms/epoData";
import type { Part } from "./cms/epoData";

const C = {
  bg: "#0d1117",
  card: "#161b27",
  cardBorder: "rgba(255,255,255,0.07)",
  orange: "#f97316",
  text: "#f1f5f9",
  muted: "#64748b",
  mutedLight: "#94a3b8",
  red: "#ef4444",
  green: "#22c55e",
};

const ADMIN_PASSWORD = "epo2024";

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display: "block", color: C.mutedLight, fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>{children}</label>;
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", boxSizing: "border-box", background: "#0d1117", border: `1px solid rgba(255,255,255,0.1)`, borderRadius: "8px", padding: "10px 12px", color: C.text, fontSize: "14px", outline: "none" }}
    />
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);

  const [parts, setParts] = useState<Part[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authed) setParts(loadParts());
  }, [authed]);

  function handleLogin() {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwErr(false);
    } else {
      setPwErr(true);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImageUrl(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  }

  function handleImageUrlChange(v: string) {
    setImageUrl(v);
    setImagePreview(v);
  }

  function addPart() {
    if (!name.trim()) return;
    setSaving(true);
    const newPart: Part = {
      id: `part_${Date.now()}`,
      name: name.trim(),
      price: price ? parseFloat(price) : null,
      imageUrl,
      addedAt: Date.now(),
    };
    const updated = [newPart, ...parts];
    saveParts(updated);
    setParts(updated);
    window.dispatchEvent(new Event("epo_parts_updated"));
    setName("");
    setPrice("");
    setImageUrl("");
    setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
    setSaving(false);
    setSuccessMsg("Part added successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  function deletePart(id: string) {
    if (!confirm("Remove this part from the listing?")) return;
    const updated = parts.filter((p) => p.id !== id);
    saveParts(updated);
    setParts(updated);
    window.dispatchEvent(new Event("epo_parts_updated"));
  }

  function clearAll() {
    if (!confirm("Remove ALL parts from the listing? This cannot be undone.")) return;
    localStorage.removeItem(PARTS_STORAGE_KEY);
    setParts([]);
    window.dispatchEvent(new Event("epo_parts_updated"));
  }

  /* ── Login screen ─────────────────────────────────────────────── */
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "16px", padding: "40px 36px", width: "100%", maxWidth: "380px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `linear-gradient(135deg, ${C.orange} 0%, #ea6000 100%)`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <h1 style={{ color: C.text, fontWeight: 800, fontSize: "20px", margin: 0 }}>EPO Admin Panel</h1>
            <p style={{ color: C.muted, fontSize: "13px", marginTop: "4px" }}>Parts management</p>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <Label>Password</Label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setPwErr(false); }}
              onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
              placeholder="Enter admin password"
              style={{ width: "100%", boxSizing: "border-box", background: "#0d1117", border: `1px solid ${pwErr ? C.red : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", padding: "11px 12px", color: C.text, fontSize: "14px", outline: "none" }}
            />
            {pwErr && <p style={{ color: C.red, fontSize: "12px", marginTop: "5px" }}>Incorrect password.</p>}
          </div>

          <button onClick={handleLogin} style={{ width: "100%", background: `linear-gradient(135deg, ${C.orange} 0%, #ea6000 100%)`, color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}>
            Sign in
          </button>

          <p style={{ color: C.muted, fontSize: "12px", textAlign: "center", marginTop: "16px" }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ""; }} style={{ color: C.mutedLight, textDecoration: "none" }}>← Back to site</a>
          </p>
        </div>
      </div>
    );
  }

  /* ── Admin dashboard ──────────────────────────────────────────── */
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Top bar */}
      <header style={{ background: "rgba(13,17,23,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px", height: "58px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ background: `linear-gradient(135deg, ${C.orange} 0%, #ea6000 100%)`, borderRadius: "6px", width: "28px", height: "28px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </span>
          <span style={{ color: C.text, fontWeight: 700, fontSize: "14px" }}>EPO Admin · Parts</span>
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ""; }} style={{ color: C.muted, fontSize: "13px", textDecoration: "none" }}>← View site</a>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", alignItems: "start" }}>
        {/* Add part form */}
        <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "14px", padding: "28px" }}>
          <h2 style={{ color: C.text, fontWeight: 700, fontSize: "16px", marginBottom: "20px" }}>Add New Part</h2>

          <div style={{ marginBottom: "14px" }}>
            <Label>Part name *</Label>
            <Input value={name} onChange={setName} placeholder="e.g. Volvo FH Air Dryer" />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <Label>Price (€)</Label>
            <Input value={price} onChange={setPrice} placeholder="Leave blank for 'Price on request'" type="number" />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <Label>Photo – upload file</Label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ color: C.mutedLight, fontSize: "13px", width: "100%" }} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Label>Or paste image URL</Label>
            <Input value={typeof imageUrl === "string" && imageUrl.startsWith("data:") ? "" : imageUrl} onChange={handleImageUrlChange} placeholder="https://example.com/part.jpg" />
          </div>

          {imagePreview && (
            <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden", height: "120px" }}>
              <img src={imagePreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setImagePreview("")} />
            </div>
          )}

          {successMsg && (
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "8px", padding: "10px 14px", color: C.green, fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
              {successMsg}
            </div>
          )}

          <button onClick={addPart} disabled={!name.trim() || saving} style={{ width: "100%", background: name.trim() ? `linear-gradient(135deg, ${C.orange} 0%, #ea6000 100%)` : "#1e293b", color: name.trim() ? "#fff" : C.muted, fontWeight: 700, fontSize: "14px", padding: "12px", borderRadius: "8px", border: "none", cursor: name.trim() ? "pointer" : "not-allowed", transition: "opacity 0.15s" }}>
            {saving ? "Adding..." : "Add Part"}
          </button>
        </div>

        {/* Parts list */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 style={{ color: C.text, fontWeight: 700, fontSize: "16px", margin: 0 }}>
              Listed Parts <span style={{ color: C.muted, fontSize: "14px", fontWeight: 400 }}>({parts.length})</span>
            </h2>
            {parts.length > 0 && (
              <button onClick={clearAll} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: C.red, fontWeight: 600, fontSize: "12px", padding: "5px 12px", borderRadius: "6px", cursor: "pointer" }}>
                Clear all
              </button>
            )}
          </div>

          {parts.length === 0 ? (
            <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "12px", padding: "32px", textAlign: "center", color: C.muted, fontSize: "14px" }}>
              No parts yet. Add your first part using the form.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {parts.map((p) => (
                <div key={p.id} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "12px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "8px", background: "#1c2333", flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16.5 9.4-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: C.text, fontWeight: 600, fontSize: "14px", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                    <p style={{ color: p.price != null ? C.orange : C.muted, fontSize: "13px", fontWeight: p.price != null ? 700 : 400, margin: 0 }}>
                      {p.price != null ? `€${p.price}` : "Price on request"}
                    </p>
                  </div>
                  <button onClick={() => deletePart(p.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: C.red, fontWeight: 600, fontSize: "12px", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", flexShrink: 0 }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
