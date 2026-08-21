const KEY = "smart_places_onboarded";
export function isOnboarded() { return localStorage.getItem(KEY) === "true"; }
export function setOnboarded() { localStorage.setItem(KEY, "true"); }