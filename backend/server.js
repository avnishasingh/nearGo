require("dotenv").config({ path: "./backend/.env" });
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});
// --- Favorites ---
// --- Favorites ---
app.get("/api/favorites", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM favorites ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET favorites error:", err);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: "Name required" });
  }
  try {
    await pool.query('INSERT INTO app_users (name) VALUES (?)', [name.trim()]);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to save user name:", err.message);
    res.status(500).json({ error: "Failed to save" });
  }
});
app.post("/api/favorites", async (req, res) => {
  try {
    const { place_id, name, category, lat, lon } = req.body;

    console.log("Saving favorite:", {
      place_id,
      name,
      category,
      lat,
      lon,
    });

    if (!place_id || !name || lat == null || lon == null) {
      return res.status(400).json({
        error: "Missing required favorite fields",
      });
    }

    await pool.query(
      "INSERT INTO favorites (place_id, name, category, lat, lon) VALUES (?,?,?,?,?)",
      [place_id, name, category, lat, lon]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("POST favorite error:", err);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

app.delete("/api/favorites/:place_id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM favorites WHERE place_id = ?",
      [req.params.place_id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE favorite error:", err);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

// --- Real AI chat, key stays server-side ---
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content:
            "You are Nova, a warm nearby-places assistant in an Indian app. Reply like a helpful friend texting — max 2 short lines, no bullet points, no dashes, no lists. " +
              "Match the user's language style (Hindi/English/Hinglish). " +
              "Never say internal fields like 'mood: work'. " +
              "You do NOT know the user's city or which real places exist there — NEVER name any specific mall, restaurant, shop, or business, even if it sounds real to you. Only describe the general type/vibe of place (e.g. 'ek achha shopping mall' not any actual mall name). " +
              "Real place names are fetched separately from live data and shown automatically below your message — you never have access to them yourself.",
          },
          ...messages,
        ],
      }),
    });
    const data = await groqRes.json();
    if (!data.choices) {
      console.error("Groq error:", JSON.stringify(data));
      return res.json({ reply: "AI had an issue — check backend terminal for details." });
    }
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error("Request failed:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(process.env.PORT, () => console.log(`Backend running on port ${process.env.PORT}`));