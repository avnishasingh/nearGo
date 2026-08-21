import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseQuery } from "../utils/nlParser";
import { getTimeContext } from "../utils/timeContext";
import AnimatedBackground from "../components/AnimatedBackground";
import { BrandBadge, BrandWordmark } from "../components/BrandLogo";
import { isOnboarded } from "../utils/onboarding";
import { getGreetingName } from "../utils/userProfile";

import SuggestionCard from "../components/SuggestionCard";
import MoodTile from "../components/MoodTile";
import { BriefcaseIcon, HeartIcon, UtensilsIcon, DumbbellIcon, HospitalIcon, BankIcon, BagIcon, MoonIcon, JoystickIcon, LeafIcon, ActivityIcon, ClapperIcon } from "../components/moodIcons";

const EVERYDAY = [
  { id: "work", label: "Work", Icon: BriefcaseIcon, rgb: "140,166,230", iconColor: "#b0c2f0" },
  { id: "date", label: "Date", Icon: HeartIcon, rgb: "220,130,155", iconColor: "#eab0c2" },
  { id: "food", label: "Quick Bite", Icon: UtensilsIcon, rgb: "224,189,125", iconColor: "#e8c98a" },
  { id: "gym", label: "Gym", Icon: DumbbellIcon, rgb: "125,205,160", iconColor: "#a8e0c0" },
];
const FUN_SUB = [
  { id: "games", label: "Games", Icon: JoystickIcon, rgb: "200,140,225", iconColor: "#dcb8ee" },
  { id: "chill", label: "Chill", Icon: LeafIcon, rgb: "200,140,225", iconColor: "#dcb8ee" },
  { id: "sports", label: "Sports", Icon: ActivityIcon, rgb: "200,140,225", iconColor: "#dcb8ee" },
  { id: "shows", label: "Shows", Icon: ClapperIcon, rgb: "200,140,225", iconColor: "#dcb8ee" },
];
const UTILITY = [
  { id: "hospital", label: "Hospital", Icon: HospitalIcon, rgb: "220,130,130", iconColor: "#eeb0b0" },
  { id: "atm", label: "ATM / Bank", Icon: BankIcon, rgb: "224,189,125", iconColor: "#e8c98a" },
  { id: "shopping", label: "Shopping", Icon: BagIcon, rgb: "140,166,230", iconColor: "#b0c2f0" },
  { id: "nightlife", label: "Nightlife", Icon: MoonIcon, rgb: "200,140,225", iconColor: "#dcb8ee" },
];

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userName] = useState(getGreetingName());

  useEffect(() => {
    if (!isOnboarded()) navigate("/onboarding");
  }, [navigate]);
  const [funOpen, setFunOpen] = useState(false);
  const timeContext = getTimeContext();

  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Hey there, night owl" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 21 ? "Good evening" : "Hey there, night owl";

  const goToMood = (id) => navigate(`/results?mood=${id}`);

  const handleSearch = () => {
    if (!query.trim()) return;
    const { mood, maxBudget, maxDistanceKm } = parseQuery(query);
    const params = new URLSearchParams({ mood: mood || "food", q: query });
    if (maxBudget) params.set("maxBudget", maxBudget);
    if (maxDistanceKm) params.set("maxDistance", maxDistanceKm);
    navigate(`/results?${params.toString()}`);
  };

  return (
    <div className="home-wrap">
      <style>{`
        .home-wrap { position: relative; height: 100vh; height: 100dvh; overflow: hidden; background: #14101f; display: flex; flex-direction: column; align-items: center; padding: 50px 20px 84px; color: #faf6ec; font-family: system-ui, sans-serif; }
        .home-content { position: relative; z-index: 1; width: 100%; max-width: 560px; height: 100%; display: flex; flex-direction: column; justify-content: space-evenly; }
        .wave { display: inline-block; animation: waveGesture 1.6s ease-in-out 1; transform-origin: 70% 70%; }
        @keyframes waveGesture { 0%,100% { transform: rotate(0deg); } 15% { transform: rotate(18deg); } 30% { transform: rotate(-10deg); } 45% { transform: rotate(18deg); } 60% { transform: rotate(-6deg); } }
        .home-heading { font-size: 21px; font-weight: 700; margin: 4px 0 2px; }
        .home-sub { font-size: 11.5px; color: #a89fb5; margin: 0; }
        .search-row { display: flex; gap: 8px; width: 100%; }
        .search-input { flex: 1; min-width: 0; padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.11); background: rgba(255,255,255,0.06); color: #faf6ec; font-size: 14px; }
        .search-btn { padding: 6px 18px; border-radius: 9px; border: none; background: #e0bd7d; color: #14101f; font-weight: 700; flex-shrink: 0; }
        .section-title { font-size: 11px; color: #e8e1d5; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.06em; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
      `}</style>

      <AnimatedBackground />
      <div style={{ position: "fixed", top: "16px", left: "20px", zIndex: 70, display: "flex", alignItems: "center", gap: "7px" }}>
        <BrandBadge size={26} radius={9} iconSize={16} />
        <BrandWordmark size={14} />
      </div>

      <div className="home-content">
        <div>
          <h1 className="home-heading">{userName ? `${greeting}, ${userName}` : "Hey there"} <span className="wave">👋</span></h1>
          <p className="home-sub">Let's find your next favorite spot</p>
        </div>

        <SuggestionCard title={timeContext.label} subtitle="Curated picks near you" onClick={() => goToMood(timeContext.mood)} />

        <div className="search-row">
          <input className="search-input" placeholder="e.g. quiet place to work under ₹300" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <button className="search-btn press-feedback" onClick={handleSearch}>Find</button>
        </div>

        <div>
          <div className="section-title">Everyday</div>
          <div className="grid-4">{EVERYDAY.map((m) => <MoodTile key={m.id} label={m.label} Icon={m.Icon} rgb={m.rgb} iconColor={m.iconColor} size={26} padding="22px 6px" onClick={() => goToMood(m.id)} />)}</div>
        </div>

        <div>
          <div className="section-title">Fun Zone</div>
          <SuggestionCard title="Fun Zone" subtitle="Games, shows, sports & chill spots" Icon={JoystickIcon} onClick={() => setFunOpen(!funOpen)} />
          {funOpen && (
            <div className="grid-4" style={{ marginTop: "8px" }}>{FUN_SUB.map((m) => <MoodTile key={m.id} label={m.label} Icon={m.Icon} rgb={m.rgb} iconColor={m.iconColor} size={24} padding="18px 6px" onClick={() => goToMood(m.id)} />)}</div>
          )}
        </div>

        <div>
          <div className="section-title">Utility</div>
          <div className="grid-4">{UTILITY.map((m) => <MoodTile key={m.id} label={m.label} Icon={m.Icon} rgb={m.rgb} iconColor={m.iconColor} size={24} padding="22px 6px" onClick={() => goToMood(m.id)} />)}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;