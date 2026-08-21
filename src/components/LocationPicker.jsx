import React, { useState, useEffect } from "react";
import { searchLocation } from "../services/geocode";
import { ChevronDownIcon } from "./icons";
const LocationPicker = ({ onSelect, currentLabel,autoOpen }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);
  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try { setResults(await searchLocation(query)); } catch { setResults([]); }
    setSearching(false);
  };

  return (
    <>
     <button style={styles.trigger} onClick={() => setOpen(true)}>
  📍 {currentLabel ? currentLabel.split(",")[0] : "Current location"} <ChevronDownIcon />
</button>
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)}>
          <div style={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 14px", color: "white" }}>Choose a location</h3>
            <button style={styles.useLocBtn} onClick={() => { onSelect(null); setOpen(false); }}>📍 Use my current location</button>
            <div style={styles.searchRow}>
              <input style={styles.input} placeholder="e.g. Connaught Place, Delhi" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
              <button style={styles.searchBtn} onClick={handleSearch}>{searching ? "…" : "Search"}</button>
            </div>
            {results.map((r, i) => (
              <button key={i} style={styles.resultItem} onClick={() => { onSelect({ lat: r.lat, lon: r.lon, label: r.label }); setOpen(false); }}>{r.label}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const styles = {

  trigger: {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#faf6ec",
    padding: "8px 14px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "13px"
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "flex-end",
    zIndex: 55
  },

  sheet: {
    background: "#14101f",
    width: "100%",
    borderRadius: "20px 20px 0 0",
    padding: "22px 20px 30px"
  },

  useLocBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(224,189,125,0.15)",
    border: "1px solid #e0bd7d",
    color: "#e0bd7d",
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: "14px"
  },

  searchRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "10px"
  },

  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "#faf6ec"
  },

  searchBtn: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#e0bd7d",
    color: "#14101f",
    fontWeight: 700,
    cursor: "pointer"
  },

  resultItem: {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#faf6ec",
    padding: "10px 12px",
    borderRadius: "10px",
    marginBottom: "6px",
    cursor: "pointer"
  },

};
export default LocationPicker;