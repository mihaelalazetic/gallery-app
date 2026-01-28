import type { InputProps } from "antd";
import { Input, List, Spin } from "antd";
import L, { LatLng, Map as LeafletMap } from "leaflet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useThemeToggle } from "../providers/AppThemeProvider";

/** Small debounce hook (no dependency) */
function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

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
  reverseCache: React.MutableRefObject<Map<string, any>>;
}> = ({ onSelect, externalPosition, reverseCache }) => {
  const [position, setPosition] = useState<LatLng | null>(
    externalPosition || null
  );
  const map = useMap();

  useMapEvents({
    click: async (e) => {
      setPosition(e.latlng);
      const { lat, lng } = e.latlng;

      // cache key rounded so tiny moves don't miss cache
      const key = `${lat.toFixed(5)},${lng.toFixed(5)}`;
      const cached = reverseCache.current.get(key);
      if (cached) {
        onSelect(cached);
        return;
      }

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`
        );
        const data = await res.json();

        const payload = {
          name: data.name || (data.display_name ? data.display_name.split(",")[0] : "Selected place"),
          address: data.display_name || `${lat}, ${lng}`,
          lat,
          lng,
        };

        reverseCache.current.set(key, payload);
        onSelect(payload);
      } catch (err) {
        console.error(err);
        onSelect({
          name: "Selected place",
          address: `${lat}, ${lng}`,
          lat,
          lng,
        });
      }
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
  const debouncedSearch = useDebouncedValue(searchTerm, 400);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(false);

  const mapRef = useRef<LeafletMap | null>(null);

  // Abort controller for search requests
  const searchAbortRef = useRef<AbortController | null>(null);

  // In-memory caches
  const searchCache = useRef<Map<string, any[]>>(new Map());
  const reverseCache = useRef<Map<string, any>>(new Map());

  const { darkMode } = useThemeToggle();

  // Only update input state here
  const handleSearch: InputProps["onChange"] = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length < 3) {
      setSuggestions([]);
    }
  };

  // Perform search using debounced value
  useEffect(() => {
    const q = debouncedSearch.trim();
    if (q.length < 3) return;

    const key = q.toLowerCase();

    // serve from cache instantly
    const cached = searchCache.current.get(key);
    if (cached) {
      setSuggestions(cached);
      return;
    }

    // cancel previous request
    searchAbortRef.current?.abort();
    const controller = new AbortController();
    searchAbortRef.current = controller;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            q
          )}&format=json&addressdetails=1&limit=8&accept-language=en`,
          { signal: controller.signal }
        );

        const data = await res.json();

        // If request was aborted, do nothing
        if (controller.signal.aborted) return;

        searchCache.current.set(key, data);
        setSuggestions(data);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    // cleanup on unmount/change
    return () => controller.abort();
  }, [debouncedSearch]);

  const handleSelectSuggestion = (sug: any) => {
    const lat = parseFloat(sug.lat);
    const lng = parseFloat(sug.lon);
    const position = new L.LatLng(lat, lng);

    setSelectedPosition(position);

    onSelect({
      name: sug.display_name?.split(",")?.[0] ?? "Selected place",
      address: sug.display_name ?? `${lat}, ${lng}`,
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
        allowClear
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
          reverseCache={reverseCache}
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
