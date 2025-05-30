import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L, { Map as LeafletMap } from "leaflet";

interface MapPickerProps {
  onSelect: (location: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

const LocationMarker: React.FC<{
  onSelect: MapPickerProps["onSelect"];
  externalPosition?: L.LatLng;
}> = ({ onSelect, externalPosition }) => {
  const [position, setPosition] = useState<L.LatLng | null>(
    externalPosition || null
  );
  const map = useMap();

  useMapEvents({
    click: async (e) => {
      setPosition(e.latlng);
      const { lat, lng } = e.latlng;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      onSelect({
        name: data.name || data.display_name.split(",")[0],
        address: data.display_name,
        lat,
        lng,
      });
    },
  });

  // Update map position if externalPosition changes
  React.useEffect(() => {
    if (externalPosition) {
      setPosition(externalPosition);
      map.setView(externalPosition, map.getZoom());
    }
  }, [externalPosition, map]);

  return position ? <Marker position={position} /> : null;
};

const MapPicker: React.FC<MapPickerProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<L.LatLng | null>(
    null
  );
  const mapRef = useRef<LeafletMap | null>(null);

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    if (query.length < 3) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSelectSuggestion = async (suggestion: any) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    const position = new L.LatLng(lat, lng);
    setSelectedPosition(position);
    onSelect({
      name: suggestion.display_name.split(",")[0],
      address: suggestion.display_name,
      lat,
      lng,
    });
    setSuggestions([]);
    setSearchTerm(suggestion.display_name);
    if (mapRef.current) {
      mapRef.current.setView(position, mapRef.current.getZoom());
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Search for a location..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8, borderRadius: 4 }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: 8,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        >
          {suggestions.map((sug, idx) => (
            <li
              key={idx}
              onClick={() => handleSelectSuggestion(sug)}
              style={{
                padding: 8,
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {sug.display_name}
            </li>
          ))}
        </ul>
      )}

      <MapContainer
        center={[41.9981, 21.4254]}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: 8 }}
      >
        <MapRefCapture mapRef={mapRef} />

        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          onSelect={onSelect}
          externalPosition={selectedPosition || undefined}
        />
      </MapContainer>
    </div>
  );
};

const MapRefCapture: React.FC<{
  mapRef: React.MutableRefObject<LeafletMap | null>;
}> = ({ mapRef }) => {
  const map = useMap();
  React.useEffect(() => {
    mapRef.current = map;
  }, [map]);
  return null;
};

export default MapPicker;
