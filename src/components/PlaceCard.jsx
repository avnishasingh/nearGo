
// import { BookmarkIcon } from "./icons";
// import React, { useState, useEffect } from "react";
// import { CATEGORY_META } from "../utils/placeMeta";
// import { estimateTravelTime, parseOpenStatus, computeMatchScore, matchQualifier } from "../utils/recommendation";
// import { isFavorite, toggleFavorite } from "../utils/favorites";
// import { addRecentlyViewed } from "../utils/recentlyViewed";


// const PlaceCard = ({ place, maxBudgetTier, moodLabel }) => {
//   const meta = CATEGORY_META[place.category] || { icon: "📍", color: "#94a3b8", label: "Place", tier: "₹₹", priceHint: "" };
//   const { walkMin, driveMin } = estimateTravelTime(place.distanceKm);
//   const openStatus = parseOpenStatus(place.rawOpeningHours);
//   const { score, reasons, qualifier } = computeMatchScore({ distanceKm: place.distanceKm, tier: meta.tier, maxBudgetTier, openStatus, moodLabel });
//  const [saved, setSaved] = useState(false);
// useEffect(() => { isFavorite(place.id).then(setSaved); }, [place.id]);
//   const [showWhy, setShowWhy] = useState(false);

//   const handleSave = async () => {
//   const nowSaved = await toggleFavorite({ id: place.id, name: place.name, category: place.category, lat: place.lat, lon: place.lon });
//   setSaved(nowSaved);
// };
//   const handleDirections = () => addRecentlyViewed({ id: place.id, name: place.name, category: place.category, lat: place.lat, lon: place.lon });

//   return (
//     <div style={styles.card}>
//       <div style={styles.top}>
//         <div style={styles.left}>
//           <div style={styles.badgeRow}>
//             <div style={{ ...styles.badge, background: meta.color + "22", color: meta.color }}>{meta.icon} {meta.label}</div>
//            <div style={styles.scoreBadge}>⭐ {score}% · {qualifier}</div>
//             {openStatus.known && (
//               <div style={{ ...styles.badge, background: openStatus.isOpen ? "#22c55e22" : "#ef444422", color: openStatus.isOpen ? "#22c55e" : "#ef4444" }}>
//                 {openStatus.text}
//               </div>
//             )}
//           </div>
//           <h3 style={styles.name}>{place.name}</h3>
//           <p style={styles.distance}>📍 {place.distanceKm.toFixed(2)} km · 🚶 {walkMin} min · 🚗 {driveMin} min</p>
//           <p style={styles.price}>{meta.tier} {meta.priceHint && `· ${meta.priceHint}`}</p>
//         </div>
//         <div style={styles.actions}>
//           <button onClick={handleSave} style={styles.saveBtn}>
//   <BookmarkIcon filled={saved} color={saved ? "#38bdf8" : "#94a3b8"} />
// </button>
//           <a href={`https://www.google.com/maps?q=${place.lat},${place.lon}`} target="_blank" rel="noreferrer" style={styles.mapBtn} onClick={handleDirections}>
//             Directions →
//           </a>
//         </div>
//       </div>

//       <button style={styles.whyToggle} onClick={() => setShowWhy(!showWhy)}>
//         {showWhy ? "▲ Hide reasons" : "⭐ Why this place?"}
//       </button>
//       {showWhy && (
//         <ul style={styles.reasonsList}>
//           {reasons.map((r, i) => <li key={i} style={styles.reasonItem}>{r}</li>)}
//         </ul>
//       )}
//     </div>
//   );
// };

// const styles = {
//   card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "18px 20px", marginBottom: "14px" },
//   top: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" },
//   left: { textAlign: "left", flex: 1 },
//   badgeRow: { display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" },
//   badge: { display: "inline-block", fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "999px" },
//   scoreBadge: { fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "999px", background: "#38bdf822", color: "#38bdf8" },
//   name: { margin: "0 0 4px 0", fontSize: "17px", color: "white" },
//   distance: { margin: "0 0 4px 0", fontSize: "13px", opacity: 0.65, color: "white" },
//   price: { margin: 0, fontSize: "12.5px", opacity: 0.55, color: "white" },
//   actions: { display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" },
//   saveBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex" },
//   mapBtn: { padding: "9px 16px", borderRadius: "10px", background: "#38bdf8", color: "#020617", textDecoration: "none", fontWeight: 700, fontSize: "13px", whiteSpace: "nowrap" },
//   whyToggle: { marginTop: "12px", background: "none", border: "none", color: "#38bdf8", fontSize: "12.5px", cursor: "pointer", padding: 0 },
//   reasonsList: { margin: "10px 0 0", paddingLeft: "18px", color: "white", opacity: 0.75, fontSize: "13px", lineHeight: 1.7 },
//   reasonItem: {},
// };

// export default PlaceCard;
import React, { useState, useEffect } from "react";
import { CATEGORY_META } from "../utils/placeMeta";
import { estimateTravelTime, parseOpenStatus, computeMatchScore } from "../utils/recommendation";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import { BookmarkIcon } from "./icons";

const PlaceCard = ({ place, maxBudgetTier, moodLabel }) => {
  const meta = CATEGORY_META[place.category] || { icon: "📍", color: "#94a3b8", label: "Place", tier: "₹₹", priceHint: "" };
  const { walkMin, driveMin } = estimateTravelTime(place.distanceKm);
  const openStatus = parseOpenStatus(place.rawOpeningHours);
  const { score, qualifier } = computeMatchScore({ distanceKm: place.distanceKm, tier: meta.tier, maxBudgetTier, openStatus, moodLabel });
  const [saved, setSaved] = useState(false);

  useEffect(() => { isFavorite(place.id).then(setSaved); }, [place.id]);

  const handleSave = async () => {
    const nowSaved = await toggleFavorite({ id: place.id, name: place.name, category: place.category, lat: place.lat, lon: place.lon });
    setSaved(nowSaved);
  };
  const handleDirections = () => addRecentlyViewed({ id: place.id, name: place.name, category: place.category, lat: place.lat, lon: place.lon });

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div style={styles.left}>
          <div style={styles.badgeRow}>
          <div style={{ ...styles.badge, background: meta.color + "22", color: meta.color }}>{meta.label}</div>
            <div style={styles.scoreBadge}>⭐ {score}% · {qualifier}</div>
            {openStatus.known && (
              <div style={{ ...styles.badge, background: openStatus.isOpen ? "#22c55e22" : "#ef444422", color: openStatus.isOpen ? "#22c55e" : "#ef4444" }}>{openStatus.text}</div>
            )}
          </div>
          <h3 style={styles.name}>{place.name}</h3>
          <p style={styles.distance}>📍 {place.distanceKm.toFixed(2)} km · 🚶 {walkMin} min · 🚗 {driveMin} min</p>
          <p style={styles.price}>{meta.tier === "Free" ? "Free" : `₹ ${meta.priceHint || "Price varies"}`}</p>
        </div>
        <div style={styles.actions}>
          <button onClick={handleSave} style={styles.saveBtn}><BookmarkIcon filled={saved} color={saved ? "#e0bd7d" : "#94a3b8"} /></button>
          <a href={`https://www.google.com/maps?q=${place.lat},${place.lon}`} target="_blank" rel="noreferrer" style={styles.mapBtn} onClick={handleDirections}>Directions →</a>
        </div>
      </div>
    </div>
  );
};

const styles = {

  card: {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "18px 20px",
    marginBottom: "14px"
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px"
  },

  left: {
    textAlign: "left",
    flex: 1
  },

  badgeRow: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    marginBottom: "8px"
  },

  badge: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: 700,
    padding: "3px 9px",
    borderRadius: "999px"
  },

  scoreBadge: {
    fontSize: "11px",
    fontWeight: 700,
    padding: "3px 9px",
    borderRadius: "999px",
    background: "rgba(224,189,125,0.15)",
    color: "#e0bd7d"
  },

  name: {
    margin: "0 0 4px 0",
    fontSize: "17px",
    color: "#faf6ec"
  },

  distance: {
    margin: "0 0 4px 0",
    fontSize: "13px",
    color: "#948da3"
  },

  price: {
    margin: 0,
    fontSize: "12.5px",
    opacity: 0.6,
    color: "white"
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center"
  },

  saveBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex"
  },

  mapBtn: {
    padding: "9px 6px",
    borderRadius: "10px",
    background: "#e0bd7d",
    color: "#14101f",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "13px",
    whiteSpace: "nowrap"
  },

};
export default PlaceCard;