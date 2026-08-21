import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import FilterBar from "../components/FilterBar";
import MapView from "../components/MapView";
import LocationPicker from "../components/LocationPicker";
import AnimatedBackground from "../components/AnimatedBackground";
import WeatherEffect from "../components/WeatherEffect";
import { fetchNearbyPlaces } from "../services/placesApi";
import { parseOpenStatus } from "../utils/recommendation";
import { budgetToTier, TIER_RANK, CATEGORY_META } from "../utils/placeMeta";
import { fetchWeather } from "../utils/weather";
import { trackSearch } from "../utils/activityTracker";

const Results = () => {
  const [searchParams] = useSearchParams();
  const mood = searchParams.get("mood");

  const urlMaxBudget = searchParams.get("maxBudget");
  const shouldOpenLocation = searchParams.get("openLocation") === "1";

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [sortBy, setSortBy] = useState("score");
  const [budget, setBudget] = useState(urlMaxBudget ? Number(urlMaxBudget) : null);
  const [radius, setRadius] = useState(5000);
  const [viewMode, setViewMode] = useState("list");
  const [userCoords, setUserCoords] = useState(null);
 const urlLat = searchParams.get("lat");
const urlLng = searchParams.get("lng");
const urlLocLabel = searchParams.get("locLabel");

const [locationOverride, setLocationOverride] = useState(
  urlLat && urlLng
    ? { lat: Number(urlLat), lon: Number(urlLng), label: urlLocLabel || "Searched location" }
    : null
);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const runFetch = async (lat, lng) => {
      setUserCoords({ lat, lng });
      try {
        let results = await fetchNearbyPlaces(mood, lat, lng, radius);
        if (results.length < 4 && radius < 25000) {
          results = await fetchNearbyPlaces(mood, lat, lng, radius * 3);
        }
        setPlaces(results);
        localStorage.setItem("smart_places_last_mood", mood || "");
        trackSearch(mood);
        fetchWeather(lat, lng).then(setWeather);
      } catch (err) {
        setError(err.message || "Couldn't fetch places right now. Try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    if (locationOverride) {
      runFetch(locationOverride.lat, locationOverride.lon);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => runFetch(pos.coords.latitude, pos.coords.longitude),
        () => { setError("Location access denied — please allow it and retry."); setLoading(false); }
      );
    }
  }, [mood, radius, locationOverride, reloadKey]);

  const maxBudgetTier = budgetToTier(budget);

  let visible = places.map((p) => {
    const meta = CATEGORY_META[p.category] || {};
    const openStatus = parseOpenStatus(p.rawOpeningHours);
    return { ...p, tier: meta.tier, openStatus };
  });

  if (maxBudgetTier) visible = visible.filter((p) => (TIER_RANK[p.tier] ?? 2) <= TIER_RANK[maxBudgetTier]);
  if (sortBy === "distance") visible = [...visible].sort((a, b) => a.distanceKm - b.distanceKm);

  const weatherBanner = weather?.isRainy
    ? "It's rainy nearby — indoor options ranked first."
    : weather?.isSunny
    ? "Great weather — good day for outdoor picks."
    : null;

  return (
    <div className="results-wrap">
      <style>{`
    .results-wrap {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #14101f;
  padding: 64px 20px 40px;
  color: #faf6ec;
  font-family: system-ui, sans-serif;
  -webkit-overflow-scrolling: touch;
}
        .results-content { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
        .skeleton { height: 92px; border-radius: 16px; margin-bottom: 14px; background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.07), rgba(255,255,255,0.03)); background-size: 200% 100%; animation: shimmer 1.3s infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>

      <AnimatedBackground />
     {weather?.isSunny && <WeatherEffect variant="sunny" />}
{weather?.isRainy && <WeatherEffect variant="rainy" />}

      <div className="results-content">
        <div style={styles.header}>
          <Link to="/" style={styles.back}>← Back</Link>
          <h1 style={styles.title}>Results for: {mood || "nearby"}</h1>
          <button style={styles.refreshBtn} onClick={() => setReloadKey((k) => k + 1)}>Refresh</button>
        </div>

        <div style={styles.locRow}>
          <LocationPicker currentLabel={locationOverride?.label} onSelect={setLocationOverride} autoOpen={shouldOpenLocation} />
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setViewMode("list")} style={{ ...styles.viewBtn, ...(viewMode === "list" ? styles.viewBtnActive : {}) }}>List</button>
            <button onClick={() => setViewMode("map")} style={{ ...styles.viewBtn, ...(viewMode === "map" ? styles.viewBtnActive : {}) }}>Map</button>
          </div>
        </div>

       
        {weatherBanner && <p style={styles.weatherBanner}>{weatherBanner}</p>}

        <FilterBar sortBy={sortBy} setSortBy={setSortBy} budget={budget} setBudget={setBudget} radius={radius} setRadius={setRadius} />

        {!loading && !error && visible.length > 0 && (
          <p style={styles.meta}>{visible.length} places · sorted by {sortBy === "score" ? "best match" : "distance"}</p>
        )}

        {viewMode === "map" && userCoords && !loading && (
          <MapView places={visible} userLat={locationOverride?.lat || userCoords.lat} userLng={locationOverride?.lon || userCoords.lng} />
        )}

        {loading && Array.from({ length: 5 }).map((_, i) => <div className="skeleton" key={i} />)}
        {!loading && error && <p style={styles.empty}>{error}</p>}
        {!loading && !error && visible.length === 0 && <p style={styles.empty}>No places match this filter. Try widening it.</p>}

        {viewMode === "list" && !loading && !error && visible.map((p) => (
          <PlaceCard key={p.id} place={p} maxBudgetTier={maxBudgetTier} moodLabel={mood} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px", flexWrap: "wrap" },
  back: { color: "#e0bd7d", textDecoration: "none", fontWeight: 600, fontSize: "14px" },
  title: { fontSize: "22px", margin: 0, textTransform: "capitalize", flex: 1, fontWeight: 700 },
  refreshBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#faf6ec", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontSize: "13px" },
  locRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" },
  viewBtn: { padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#faf6ec", cursor: "pointer", fontSize: "13px" },
  viewBtnActive: { background: "rgba(224,189,125,0.12)", borderColor: "#e0bd7d", color: "#e0bd7d" },
  interpretBanner: { color: "#e0bd7d", fontSize: "13px", marginBottom: "6px" },
  weatherBanner: { color: "#e8c98a", fontSize: "13px", marginBottom: "10px" },
  meta: { color: "#948da3", fontSize: "13px", marginBottom: "16px" },
  empty: { color: "#948da3", textAlign: "center", marginTop: "40px" },
};

export default Results;