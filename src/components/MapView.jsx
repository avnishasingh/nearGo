import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CATEGORY_META } from "../utils/placeMeta";

// react-leaflet's default marker icons break under webpack — this fixes it with CDN URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userIcon = L.divIcon({ html: "🔵", className: "user-marker", iconSize: [24, 24] });

const MapView = ({ places, userLat, userLng }) => (
  <div style={{ height: "460px", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }}>
    <MapContainer center={[userLat, userLng]} zoom={14} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      <Marker position={[userLat, userLng]} icon={userIcon}><Popup>You are here</Popup></Marker>
      {places.map((p) => {
        const meta = CATEGORY_META[p.category] || { icon: "📍", label: "Place" };
        return (
          <Marker key={p.id} position={[p.lat, p.lon]}>
            <Popup>
              <b>{meta.icon} {p.name}</b><br />
              {meta.label} · {p.distanceKm.toFixed(2)} km away<br />
              <a href={`https://www.google.com/maps?q=${p.lat},${p.lon}`} target="_blank" rel="noreferrer">Directions →</a>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  </div>
);

export default MapView;