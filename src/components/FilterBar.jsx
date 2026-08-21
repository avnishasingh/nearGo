import React, { useState } from "react";

const RADIUS_OPTIONS = [
  { label: "Nearby (1 km)", value: 1000 },
  { label: "Walkable (3 km)", value: 3000 },
  { label: "City area (10 km)", value: 10000 },
  { label: "Whole city (25 km)", value: 25000 },
];

const FilterBar = ({ sortBy, setSortBy, budget, setBudget, radius, setRadius }) => {
  const [sheet, setSheet] = useState(null); // "budget" | "area" | null
  const radiusLabel = RADIUS_OPTIONS.find((r) => r.value === radius)?.label.split(" (")[0];

  return (
    <>
      <div style={styles.row}>
         <button style={{ ...styles.pill, ...(sortBy === "score" ? styles.pillActive : {}) }} onClick={() => setSortBy("score")}>Best Match</button>
<button style={styles.pill} onClick={() => setSheet("area")}>{radiusLabel || "Area"}</button>
        <button style={styles.pill} onClick={() => setSheet("budget")}>₹ Budget {budget ? `(₹${budget})` : ""}</button>
      </div>

      {sheet === "budget" && (
        <div style={styles.overlay} onClick={() => setSheet(null)}>
          <div style={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <div style={styles.sheetHeader}><h3 style={{ margin: 0 }}>Budget</h3><button style={styles.closeBtn} onClick={() => setSheet(null)}>✕</button></div>
            <label style={styles.sliderLabel}>{budget ? `Up to ₹${budget}` : "Any budget"}</label>
            <input type="range" min="0" max="2500" step="50" value={budget || 0} onChange={(e) => setBudget(Number(e.target.value) || null)} style={styles.slider} />
            <div style={styles.sliderTrack}><span>₹0</span><span>₹2500+</span></div>
            <button style={styles.applyBtn} onClick={() => setSheet(null)}>Apply</button>
          </div>
        </div>
      )}

      {sheet === "area" && (
        <div style={styles.overlay} onClick={() => setSheet(null)}>
          <div style={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <div style={styles.sheetHeader}><h3 style={{ margin: 0 }}>Search Area</h3><button style={styles.closeBtn} onClick={() => setSheet(null)}>✕</button></div>
            <div style={styles.radiusGrid}>
              {RADIUS_OPTIONS.map((r) => (
                <button key={r.value} onClick={() => setRadius(r.value)} style={{ ...styles.radiusBtn, ...(radius === r.value ? styles.radiusBtnActive : {}) }}>{r.label}</button>
              ))}
            </div>
            <button style={styles.applyBtn} onClick={() => setSheet(null)}>Apply</button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {

  row: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "16px"
  },

  pill: {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#faf6ec",
    padding: "8px 14px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "13px"
  },

  pillActive: {
    background: "rgba(224,189,125,0.15)",
    borderColor: "#e0bd7d",
    color: "#e0bd7d"
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "flex-end",
    zIndex: 50
  },

  sheet: {
    background: "#14101f",
    width: "100%",
    borderRadius: "20px 20px 0 0",
    padding: "22px 20px 30px",
    color: "#faf6ec"
  },

  sheetHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px"
  },

  closeBtn: {
    background: "none",
    border: "none",
    color: "#faf6ec",
    fontSize: "18px",
    cursor: "pointer"
  },

  sliderLabel: {
    fontSize: "14px",
    opacity: 0.8,
    display: "block",
    marginBottom: "8px"
  },

  slider: {
    width: "100%"
  },

  sliderTrack: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    opacity: 0.5,
    marginBottom: "20px"
  },

  radiusGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "20px"
  },

  radiusBtn: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.04)",
    color: "#faf6ec",
    cursor: "pointer",
    fontSize: "12.5px"
  },

  radiusBtnActive: {
    borderColor: "#e0bd7d",
    background: "rgba(224,189,125,0.15)",
    color: "#e0bd7d"
  },

  applyBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    background: "#e0bd7d",
    color: "#14101f",
    border: "none",
    fontWeight: 700,
    cursor: "pointer"
  },

};

export default FilterBar;