const KEY = "smart_places_recent";

export function getRecentlyViewed() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}

export function addRecentlyViewed(place) {
  const list = getRecentlyViewed().filter((p) => p.id !== place.id);
  list.unshift(place);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 10)));
}