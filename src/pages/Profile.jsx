import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../utils/favorites";
import { getRecentlyViewed } from "../utils/recentlyViewed";
import { getSearchCountThisMonth, getMoodCounts } from "../utils/activityTracker";
import { getGreetingName } from "../utils/userProfile";
import AnimatedBackground from "../components/AnimatedBackground";

const MOOD_LABELS = { work: "Work", date: "Date", food: "Food", gym: "Gym", chill: "Chill", hospital: "Hospital", nightlife: "Nightlife", shopping: "Shopping", atm: "ATM", games: "Games", sports: "Sports", shows: "Shows" };

export default function Profile() {
  const [favCount, setFavCount] = useState(0);
  const [recentCount, setRecentCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const [moodCounts, setMoodCounts] = useState({});
  const name = getGreetingName();
  const initial = name ? name.trim()[0].toUpperCase() : "?";

  useEffect(() => {
    getFavorites().then((f) => setFavCount(f.length));
    setRecentCount(getRecentlyViewed().length);
    setSearchCount(getSearchCountThisMonth());
    setMoodCounts(getMoodCounts());
  }, []);

  const total = Object.values(moodCounts).reduce((a, b) => a + b, 0) || 1;
  const vibe = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="profile-wrap">
      <style>{`
.profile-wrap { position: relative; min-height: 100vh; background: #14101f; padding: 64px 20px 40px; color: #faf6ec; font-family: system-ui, sans-serif; overflow: hidden; }
        .profile-content { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
        .back-link { color: #e0bd7d; text-decoration: none; font-size: 14px; font-weight: 600; }
        .avatar-block { display: flex; flex-direction: column; align-items: center; gap: 12px; margin: 28px 0; }
        .avatar-circle { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(150deg, rgba(224,189,125,0.35), rgba(224,189,125,0.1)); border: 1px solid rgba(224,189,125,0.4); display: flex; align-items: center; justify-content: center; }
        .avatar-initial { font-size: 26px; font-weight: 700; color: #e8c98a; }
        .profile-name { font-size: 18px; font-weight: 700; margin: 0; }
        .stats-row { display: flex; gap: 10px; margin-bottom: 26px; flex-wrap: wrap; }
        .stat-card { flex: 1 1 100px; background: rgba(255,255,255,0.035); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; padding: 14px; text-align: center; text-decoration: none; color: inherit; }
        .stat-num { font-size: 22px; font-weight: 800; color: #e0bd7d; }
        .stat-label { font-size: 11px; color: #948da3; margin-top: 4px; }
        .section-title { font-size: 11.5px; color: #948da3; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.06em; }
        .vibe-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .vibe-label { width: 90px; font-size: 13px; flex-shrink: 0; }
        .bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; }
        .bar-fill { height: 100%; background: #e0bd7d; }
        .vibe-pct { width: 36px; font-size: 12px; color: #948da3; text-align: right; }
        .empty-text { color: #948da3; font-size: 13.5px; }
      `}</style>

      <AnimatedBackground />
      <div className="profile-content">
        <Link to="/" className="back-link press-feedback">← Back</Link>

        <div className="avatar-block">
          <div className="avatar-circle"><span className="avatar-initial">{initial}</span></div>
          <p className="profile-name">{name || "Guest"}</p>
        </div>

        <div className="stats-row">
          <Link to="/dashboard" className="stat-card press-feedback"><div className="stat-num">{recentCount}</div><div className="stat-label">Recently Viewed</div></Link>
          <div className="stat-card"><div className="stat-num">{searchCount}</div><div className="stat-label">Searches this month</div></div>
          <Link to="/dashboard" className="stat-card press-feedback"><div className="stat-num">{favCount}</div><div className="stat-label">Places saved</div></Link>
        </div>

        <div className="section-title">Your Vibe</div>
        {vibe.length === 0 && <p className="empty-text">Search a few moods and your vibe will show up here.</p>}
        {vibe.map(([mood, count]) => {
          const pct = Math.round((count / total) * 100);
          return (
            <div key={mood} className="vibe-row">
              <div className="vibe-label">{MOOD_LABELS[mood] || mood}</div>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
              <div className="vibe-pct">{pct}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}