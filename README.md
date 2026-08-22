# nearGo

A location-aware place recommendation web app that finds nearby spots based on your mood — Work, Date, Quick Bite, Gym, Games, Chill, Sports, Shows, Hospital, ATM/Bank, Shopping, and Nightlife — or via Nova, a built-in AI chat assistant.

🔗 **Live app:** https://near-go-chi.vercel.app/
🔗 **Backend API:** https://neargo-oqj1.onrender.com

## Features

- Mood-based and natural-language search for nearby places
- Real geolocation + Geoapify Places API (OpenStreetMap-backed data)
- Transparent, explainable match-score ranking (distance, budget fit, open/closed status)
- List and interactive map views (Leaflet)
- Weather-aware suggestions (Open-Meteo)
- AI chat assistant ("Nova") powered by Groq's LLM API, with a custom hand-animated SVG mascot
- Save/bookmark places (persisted via MySQL) and recently viewed tracking
- Personal activity stats and usage-based "vibe" breakdown
- Installable as a Progressive Web App (PWA) — works offline-tolerant, add-to-home-screen on Android/iOS
- Custom onboarding flow, fully responsive dark jewel-tone UI

## Tech Stack

**Frontend:** React 19, React Router, custom CSS-in-JS (no UI framework), react-leaflet
**Backend:** Node.js, Express, MySQL (via mysql2)
**APIs:** Geoapify (Places + Geocoding), Groq (LLM chat), Open-Meteo (weather, no key required)
**Hosting:** Vercel (frontend), Render (backend), Aiven (MySQL)

## Running locally

### Frontend
\`\`\`bash
npm install
npm start
\`\`\`
Runs on http://localhost:3000. Requires a `.env` file with:
\`\`\`
REACT_APP_GEOAPIFY_KEY=your_geoapify_key
\`\`\`

### Backend
\`\`\`bash
cd backend
npm install
node server.js
\`\`\`
Runs on http://localhost:5001. Requires a `backend/.env` file with:
\`\`\`
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smart_places
GROQ_API_KEY=your_groq_key
PORT=5001
\`\`\`

## Notes

This is a personal portfolio project built to demonstrate full-stack development: geolocation and mapping, third-party API integration, a recommendation/ranking algorithm, backend + database design, and AI integration via a proxied LLM call.