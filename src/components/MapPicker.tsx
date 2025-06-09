import type { InputProps } from "antd";
import { Input, List, Spin } from "antd";
import L, { LatLng, Map as LeafletMap } from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useThemeToggle } from "../providers/AppThemeProvider";

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
  externalPosition?: LatLng;
}> = ({ onSelect, externalPosition }) => {
  const [position, setPosition] = useState<LatLng | null>(
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

  useEffect(() => {
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
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);

  const { darkMode } = useThemeToggle();

  const handleSearch: InputProps["onChange"] = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (sug: any) => {
    const lat = parseFloat(sug.lat);
    const lng = parseFloat(sug.lon);
    const position = new L.LatLng(lat, lng);
    setSelectedPosition(position);
    onSelect({
      name: sug.display_name.split(",")[0],
      address: sug.display_name,
      lat,
      lng,
    });
    setSuggestions([]);
    setSearchTerm(sug.display_name);
    if (mapRef.current) {
      mapRef.current.setView(position, mapRef.current.getZoom());
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Input
        placeholder="Search for a location..."
        value={searchTerm}
        onChange={handleSearch}
        suffix={loading ? <Spin size="small" /> : null}
        style={{ width: "100%", marginBottom: 8 }}
      />

      {suggestions.length > 0 && (
        <List
          bordered
          size="small"
          dataSource={suggestions}
          style={{ marginBottom: 8, maxHeight: 200, overflowY: "auto" }}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleSelectSuggestion(item)}
              style={{ cursor: "pointer" }}
            >
              {item.display_name}
            </List.Item>
          )}
        />
      )}

      <MapContainer
        center={[41.9981, 21.4254]}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: 8 }}
      >
        <MapRefCapture mapRef={mapRef} />

        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/">OSM</a>'
          url={
            darkMode
              ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
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
  useEffect(() => {
    mapRef.current = map;
  }, [map]);
  return null;
};

export default MapPicker;
