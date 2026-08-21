const API = "http://localhost:5001/api/favorites";

export async function getFavorites() {
  try {
    const res = await fetch(API);
    const rows = await res.json();
    return rows.map((r) => ({ id: r.place_id, name: r.name, category: r.category, lat: r.lat, lon: r.lon }));
  } catch {
    return [];
  }
}

export async function isFavorite(id) {
  const favs = await getFavorites();
  return favs.some((p) => p.id === id);
}

export async function toggleFavorite(place) {
  const wasFav = await isFavorite(place.id);
  if (wasFav) {
    await fetch(`${API}/${place.id}`, { method: "DELETE" });
    return false;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ place_id: place.id, name: place.name, category: place.category, lat: place.lat, lon: place.lon }),
    });
    return true;
  }
}