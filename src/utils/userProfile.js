const KEY = "smart_places_user_name";
export function getUserName() { return localStorage.getItem(KEY); }
export function setUserName(name) { localStorage.setItem(KEY, name); }

// First + middle name only, never the last word (surname) — used for all greetings
export function getGreetingName() {
  const name = getUserName();
  if (!name) return null;
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts.slice(0, -1).join(" ") : parts[0];
}