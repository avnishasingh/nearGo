
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getFavorites, toggleFavorite } from "../utils/favorites";
// import { getRecentlyViewed } from "../utils/recentlyViewed";
// import { CATEGORY_META } from "../utils/placeMeta";

// export default function Dashboard() {
//   const [favorites, setFavorites] = useState([]);
//   const [recent, setRecent] = useState([]);
//   const lastMood = localStorage.getItem("smart_places_last_mood");

//   useEffect(() => {
//     getFavorites().then(setFavorites);
//     setRecent(getRecentlyViewed());
//   }, []);

//   const handleRemove = async (place) => {
//     await toggleFavorite(place);
//     getFavorites().then(setFavorites);
//   };

//   const renderCard = (p, actionBtn) => {
//     const meta = CATEGORY_META[p.category] || { icon: "📍", color: "#94a3b8", label: "Place" };
//     return (
//       <div key={p.id} style={styles.card}>
//         <div>
//           <div style={{ ...styles.badge, background: meta.color + "22", color: meta.color }}>{meta.icon} {meta.label}</div>
//           <h3 style={styles.name}>{p.name}</h3>
//         </div>
//         {actionBtn}
//       </div>
//     );
//   };

//   return (
//     <div style={styles.page}>
//       <Link to="/" style={styles.back}>← Back</Link>
//       <h1 style={styles.heading}>Saved Places</h1>
//       {lastMood && <p style={styles.hint}>Your last search was for: <b style={{ textTransform: "capitalize" }}>{lastMood}</b></p>}

//       <h2 style={styles.subheading}>Saved ({favorites.length})</h2>
//       {favorites.length === 0 && <p style={styles.empty}>Nothing saved yet — tap the bookmark icon on any place to save it here.</p>}
//       {favorites.map((p) => renderCard(p, <button onClick={() => handleRemove(p)} style={styles.removeBtn}>Remove</button>))}

//       <h2 style={{ ...styles.subheading, marginTop: "28px" }}>Recently Viewed</h2>
//       {recent.length === 0 && <p style={styles.empty}>Tap Directions on a place to track it here.</p>}
//       {recent.map((p) => renderCard(p, null))}
//     </div>
//   );
// }

// const styles = {
//   page: { minHeight: "100vh", background: "radial-gradient(circle at top, #1e293b, #020617 70%)", padding: "28px 20px", fontFamily: "system-ui, sans-serif", color: "white" },
//   back: { color: "#38bdf8", textDecoration: "none", fontWeight: 600, fontSize: "14px" },
//   heading: { fontSize: "24px", margin: "12px 0 6px" },
//   hint: { opacity: 0.6, fontSize: "14px", marginBottom: "24px" },
//   subheading: { fontSize: "17px", marginBottom: "12px" },
//   empty: { opacity: 0.6, fontSize: "14px" },
//   card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "14px 18px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" },
//   badge: { display: "inline-block", fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "999px", marginBottom: "6px" },
//   name: { margin: 0, fontSize: "15px" },
//   removeBtn: { background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" },
// };
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, toggleFavorite } from "../utils/favorites";
import { getRecentlyViewed } from "../utils/recentlyViewed";
import { CATEGORY_META } from "../utils/placeMeta";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Dashboard() {
  const [favorites, setFavorites] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    getFavorites().then(setFavorites);
    setRecent(getRecentlyViewed());
  }, []);

  const handleRemove = async (place) => {
    await toggleFavorite(place);
    getFavorites().then(setFavorites);
  };

  const renderCard = (p, actionBtn) => {
    const meta = CATEGORY_META[p.category] || { color: "#948da3", label: "Place" };
    return (
      <div key={p.id} style={styles.card}>
        <div>
          <div style={{ ...styles.badge, background: meta.color + "22", color: meta.color }}>{meta.label}</div>
          <h3 style={styles.name}>{p.name}</h3>
        </div>
        {actionBtn}
      </div>
    );
  };

    return (
    <div style={styles.page}>
      <AnimatedBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
      <Link to="/" style={styles.back}>← Back</Link>
      <h1 style={styles.heading}>Saved Places</h1>

      <h2 style={styles.subheading}>Saved ({favorites.length})</h2>
      {favorites.length === 0 && <p style={styles.empty}>Nothing saved yet — tap the bookmark icon on any place to save it here.</p>}
      {favorites.map((p) => renderCard(p, <button onClick={() => handleRemove(p)} style={styles.removeBtn}>Remove</button>))}

      <h2 style={{ ...styles.subheading, marginTop: "28px" }}>Recently Viewed</h2>
      {recent.length === 0 && <p style={styles.empty}>Tap Directions on a place to track it here.</p>}
            {recent.map((p) => renderCard(p, null))}
      </div>
    </div>
  );
}

const styles = {
  page: { position: "relative", minHeight: "100vh", background: "#14101f", padding: "64px 20px 40px", fontFamily: "system-ui, sans-serif", color: "#faf6ec", overflow: "hidden" },
  back: { color: "#e0bd7d", textDecoration: "none", fontWeight: 600, fontSize: "14px" },
  heading: { fontSize: "22px", margin: "12px 0 24px", color: "#faf6ec" },
  subheading: { fontSize: "16px", marginBottom: "12px", color: "#faf6ec" },
  empty: { color: "#948da3", fontSize: "14px" },
  card: { background: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: "14px", padding: "14px 18px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  badge: { display: "inline-block", fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "999px", marginBottom: "6px" },
  name: { margin: 0, fontSize: "15px", color: "#faf6ec" },
  removeBtn: { background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#faf6ec", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" },
};