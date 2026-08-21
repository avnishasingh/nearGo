import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parseQuery, MOOD_KEYWORDS } from "../utils/nlParser";
import { isOnboarded } from "../utils/onboarding";
import { fetchNearbyPlaces } from "../services/placesApi";

const NovaMascot = () => (
  <svg viewBox="0 0 100 100" width="38" height="38">
    <defs>
      <linearGradient id="novaHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdf6e8" />
        <stop offset="100%" stopColor="#f0dcae" />
      </linearGradient>
    </defs>
    <line x1="32" y1="18" x2="22" y2="4" stroke="#e0bd7d" strokeWidth="3" strokeLinecap="round" />
    <circle cx="22" cy="4" r="3.5" fill="#e0bd7d" />
    <g className="nova-antenna-r">
      <line x1="68" y1="18" x2="78" y2="4" stroke="#e0bd7d" strokeWidth="3" strokeLinecap="round" />
      <circle cx="78" cy="4" r="3.5" fill="#e0bd7d" />
    </g>
    <rect x="18" y="14" width="64" height="58" rx="22" fill="url(#novaHeadGrad)" />
    <rect x="27" y="36" width="46" height="24" rx="12" fill="#241c30" />
    <circle cx="41" cy="48" r="6" fill="#8fd8f0" className="nova-eye" />
    <circle cx="59" cy="48" r="6" fill="#8fd8f0" className="nova-eye" />
  </svg>
);

// "catering.fast_food" -> "Fast Food"
const humanizeCategory = (cat) => {
  if (!cat) return "Place";
  const last = cat.split(".").pop();
  return last.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const getPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("no geolocation"));
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      reject,
      { timeout: 8000 }
    );
  });

const STOP_WORDS = new Set([
  // pronouns & possessives
  "mujhe", "muje", "mera", "meri", "mere", "hume", "humein", "mai", "main",
  "hum", "tu", "tum", "aap", "ap", "unhe", "unko", "iska", "iski", "iske",
  "apni", "apna", "apne",

  // request/filler verbs
  "koi", "kuch", "acha", "achha", "please", "plz", "bta", "btao", "batao",
  "bata", "dikhao", "dikha", "de", "do", "kro", "karo", "krdo", "kar",
  "chahiye", "dedo", "suggest", "recommend", "tell", "give",
  "find", "search", "dhundo", "dhundh", "dhoondo",

  // common particles / postpositions
  "hai", "h", "hain", "ka", "ke", "ki", "ko", "m", "me", "mein", "se",
  "tak", "par", "pr", "pe", "wala", "wale", "wali",

  // english fillers
  "near", "in", "at", "the", "a", "an", "of", "for", "to", "on", "is",
  "are", "some", "any", "good", "best", "nice",

  // question/location generic words
  "yaha", "yha", "yahan", "wahan", "wha", "wahi", "kaha", "kha", "kaunsa",
  "konsa", "konsi", "kaunsi", "kya", "kaisa", "kaisi",

  // connectors
  "aur", "or", "ek", "bhi", "toh", "to", "hi", "sa", "si",

  // generic place/location words (should never be treated as a place name)
  "current", "location", "spot", "jagah", "area", "nearby", "aas",
  "paas", "aaspaas",
]);

// Mood keywords come from nlParser.js — strip them too, so only the
// location-like leftover words remain.
const MOOD_WORDS = new Set(Object.values(MOOD_KEYWORDS).flat());

const extractLocationPhrase = (text) => {
  const words = text
    .toLowerCase()
    .replace(/[.,?!]/g, "")
    .split(/\s+/)
    .filter((w) => w && !STOP_WORDS.has(w) && !MOOD_WORDS.has(w));

  const phrase = words.join(" ").trim();
  return phrase.length > 2 ? phrase : null;
};

const ChatAssistant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi, I'm Nova! Tell me what you're looking for." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { setOpen(false); }, [location.pathname]);
  if (!isOnboarded()) return null;

  const send = async () => {
    if (!input.trim() || busy) return;
    const userText = input.trim();
    const newMessages = [...messages, { from: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setBusy(true);

    try {
      const chatHistory = newMessages.filter((m) => m.from === "user" || m.from === "ai").map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));
      const res = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { from: "ai", text: data.reply || "Sorry, I didn't get that." }]);

      const { mood, maxBudget, maxDistanceKm } = parseQuery(userText);
      if (mood) {
        const params = new URLSearchParams({ mood, q: userText });
        if (maxBudget) params.set("maxBudget", maxBudget);
        if (maxDistanceKm) params.set("maxDistance", maxDistanceKm);
        const radius = maxDistanceKm ? maxDistanceKm * 1000 : 5000;

        const locationPhrase = extractLocationPhrase(userText);
        console.log("USER TEXT:", userText, "| LOCATION PHRASE:", locationPhrase); // TEMP DEBUG — remove later

        if (locationPhrase) {
          setMessages((m) => [
            ...m,
            {
              from: "ai",
              text: "Results page khol raha hoon — wahaan jagah daal ke exact spots dekh lo.",
              action: () => navigate(`/results?mood=${mood}&q=${encodeURIComponent(userText)}&openLocation=1`),
            },
          ]);
        } else {
          try {
            const { lat, lng } = await getPosition();
            const places = await fetchNearbyPlaces(mood, lat, lng, radius, 30);
            const top = [...places].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

            if (top.length) {
              setMessages((m) => [
                ...m,
                {
                  from: "ai",
                  type: "results",
                  places: top,
                  action: () => navigate(`/results?${params.toString()}`),
                },
              ]);
            } else {
              setMessages((m) => [...m, { from: "ai", text: "Couldn't find nearby matches right now.", action: () => navigate(`/results?${params.toString()}`) }]);
            }
          } catch {
            setMessages((m) => [...m, { from: "ai", text: "Turn on location to see real spots nearby.", action: () => navigate(`/results?${params.toString()}`) }]);
          }
        }
      }
    } catch {
      setMessages((m) => [...m, { from: "ai", text: "Couldn't reach the AI right now — is the backend running on port 5001?" }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes novaBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes novaWave { 0%,85%,100% { transform: rotate(0deg); } 90% { transform: rotate(-16deg); } 95% { transform: rotate(6deg); } }
        @keyframes novaBlink { 0%,92%,100% { transform: scaleY(1); } 95% { transform: scaleY(0.15); } }
        @keyframes novaGlow { 0%,100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.08); } }
        .nova-fab-wrap { position: fixed; bottom: 24px; right: 20px; z-index: 60; }
        .nova-glow-ring {
          position: absolute; inset: -10px; border-radius: 50%; z-index: -1; filter: blur(8px);
          background: radial-gradient(circle, rgba(90,120,180,0.28), rgba(201,168,106,0.22) 55%, rgba(180,90,110,0.14) 78%, transparent 82%);
          animation: novaGlow 3s ease-in-out infinite;
        }
        .nova-fab {
          position: relative; width: 54px; height: 54px; border-radius: 50%;
          background: #191327; border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          animation: novaBob 2.6s ease-in-out infinite;
        }
        .nova-antenna-r { transform-origin: 68px 18px; animation: novaWave 4.5s ease-in-out infinite; }
        .nova-eye { transform-origin: center; animation: novaBlink 5s ease-in-out infinite; }
      `}</style>

      <div className="nova-fab-wrap">
        <div className="nova-glow-ring" />
        <button className="nova-fab" onClick={() => setOpen(!open)}><NovaMascot /></button>
      </div>

      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>Nova</div>
          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} style={{ ...styles.bubble, ...(m.from === "user" ? styles.userBubble : styles.aiBubble) }}>
                {m.text}

                {m.type === "results" && (
                  <div style={styles.resultsWrap}>
                    {m.places.map((p) => (
                      <div key={p.id} style={styles.resultCard} onClick={m.action}>
                        <div style={styles.resultTop}>
                          <span style={styles.resultName}>{p.name}</span>
                          <span style={styles.resultDist}>{p.distanceKm.toFixed(1)} km</span>
                        </div>
                        <span style={styles.resultCat}>{humanizeCategory(p.category)}</span>
                      </div>
                    ))}
                    <button style={styles.viewBtn} onClick={m.action}>See all results →</button>
                  </div>
                )}

                {m.action && !m.type && <button style={styles.viewBtn} onClick={m.action}>View results →</button>}
              </div>
            ))}
            {busy && <div style={{ ...styles.bubble, ...styles.aiBubble }}>Thinking…</div>}
          </div>
          <div style={styles.inputRow}>
            <input style={styles.input} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask Nova…" disabled={busy} />
            <button style={styles.sendBtn} onClick={send} disabled={busy}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  panel: { position: "fixed", bottom: "94px", right: "20px", width: "320px", maxHeight: "440px", background: "#14101f", border: "1px solid rgba(255,255,255,0.11)", borderRadius: "18px", display: "flex", flexDirection: "column", zIndex: 60, overflow: "hidden", backdropFilter: "blur(16px)" },
  header: { padding: "14px 16px", fontWeight: 700, color: "#faf6ec", borderBottom: "1px solid rgba(255,255,255,0.08)" },
  messages: { flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" },
  bubble: { padding: "9px 12px", borderRadius: "12px", fontSize: "13.5px", maxWidth: "88%" },
  aiBubble: { background: "rgba(255,255,255,0.06)", color: "#faf6ec", alignSelf: "flex-start" },
  userBubble: { background: "#e0bd7d", color: "#14101f", alignSelf: "flex-end" },
  viewBtn: { display: "block", marginTop: "6px", background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "inherit", padding: "5px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", width: "100%" },
  resultsWrap: { marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" },
  resultCard: { background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "10px", padding: "8px 10px", cursor: "pointer" },
  resultTop: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" },
  resultName: { fontSize: "13px", fontWeight: 600, color: "#faf6ec", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  resultDist: { fontSize: "11px", color: "#e0bd7d", flexShrink: 0 },
  resultCat: { fontSize: "11.5px", color: "#948da3" },
  inputRow: { display: "flex", gap: "6px", padding: "10px", borderTop: "1px solid rgba(255,255,255,0.08)" },
  input: { flex: 1, padding: "9px 12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#faf6ec", fontSize: "13px" },
  sendBtn: { background: "#e0bd7d", border: "none", borderRadius: "10px", padding: "0 14px", cursor: "pointer", fontWeight: 700, color: "#14101f" },
};

export default ChatAssistant;