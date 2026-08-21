const API_KEY = process.env.REACT_APP_GEOAPIFY_KEY;

export async function searchLocation(query) {
  const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&limit=5&apiKey=${API_KEY}`);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  return (data.features || []).map((f) => ({
    label: f.properties.formatted,
    lat: f.properties.lat,
    lon: f.properties.lon,
  }));
}