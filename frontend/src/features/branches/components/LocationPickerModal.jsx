import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/ui";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DEFAULT_CENTER = [4.60971, -74.08175]; // Bogotá
const COLOMBIA_BIAS = { lat: 4.5709, lon: -74.2973 };

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterMap({ position, zoom = 16 }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [position]);
  return null;
}

const expandAbbreviations = (text) => {
  return text
    .replace(/\bcl\.?\b/gi, "Calle")
    .replace(/\bcr\.?\b/gi, "Carrera")
    .replace(/\bcra\.?\b/gi, "Carrera")
    .replace(/\bkr\.?\b/gi, "Carrera")
    .replace(/\btv\.?\b/gi, "Transversal")
    .replace(/\bdg\.?\b/gi, "Diagonal")
    .replace(/\bav\.?\b/gi, "Avenida");
};

// Parsea "Calle 10 #9-47, Pereira" en sus componentes:
// via: "Calle 10", numeroVia: "9", placa: "47", resto: "Pereira"
const parseColombianAddress = (raw) => {
  const text = expandAbbreviations(raw.trim());

  // Captura: <Vía> <número vía> # <número placa>[-<complemento>]
  const match = text.match(
    /((?:Calle|Carrera|Transversal|Diagonal|Avenida)\s*\.?\s*\d+\w?)\s*#\s*(\d+\w?)\s*-?\s*(\d+)?/i
  );

  if (!match) {
    return { full: text, via: null, numeroVia: null, placa: null, resto: text };
  }

  const via = match[1].trim();
  const numeroVia = match[2].trim();
  const placa = match[3] ? match[3].trim() : null;

  // Todo lo que queda después del match completo (ciudad, barrio, etc.)
  const resto = text.slice(match.index + match[0].length).replace(/^[,\s]+/, "").trim();

  return { full: text, via, numeroVia, placa, resto };
};

const searchPhoton = async (query) => {
  const fullQuery = /colombia/i.test(query) ? query : `${query}, Colombia`;
  const res = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(fullQuery)}&lat=${COLOMBIA_BIAS.lat}&lon=${COLOMBIA_BIAS.lon}&location_bias_scale=0.9&limit=5`
  );
  const data = await res.json();
  return (data.features || []).map((f) => {
    const props = f.properties;
    const parts = [
      props.name,
      props.street,
      props.housenumber,
      props.district,
      props.city,
      props.state,
      props.country,
    ].filter(Boolean);
    return {
      display_name: parts.join(", "),
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
      id: `photon-${f.geometry.coordinates[0]}-${f.geometry.coordinates[1]}`,
      hasHouseNumber: !!props.housenumber,
    };
  });
};

// Nominatim con búsqueda estructurada: usa el campo "street" con vía + placa,
// que a veces encuentra coincidencias que la búsqueda libre no encuentra.
const searchNominatimStructured = async ({ via, numeroVia, placa, resto }) => {
  const street = placa
    ? `${via} ${numeroVia}-${placa}`
    : `${via} ${numeroVia}`;

  const params = new URLSearchParams({
    format: "json",
    street,
    city: resto || "",
    country: "Colombia",
    limit: "5",
  });

  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
  const data = await res.json();
  return data.map((r) => ({
    display_name: r.display_name,
    lat: parseFloat(r.lat),
    lon: parseFloat(r.lon),
    id: `nom-${r.place_id}`,
    hasHouseNumber: r.class === "building" || r.type === "house" || /\d/.test(r.display_name.split(",")[0]),
  }));
};

const LocationPickerModal = ({ open, onClose, onSelect, initialPosition }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [approxMatch, setApproxMatch] = useState(false);
  const [searchNote, setSearchNote] = useState("");

  useEffect(() => {
    if (open) {
      setPosition(initialPosition || null);
      setAddress("");
      setQuery("");
      setResults([]);
      setApproxMatch(false);
      setSearchNote("");
    }
  }, [open, initialPosition]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      setAddress(data.display_name || "");
    } catch (err) {
      console.error("Error en geocodificación inversa:", err);
    }
  };

  const handlePick = (lat, lng) => {
    setPosition([lat, lng]);
    setApproxMatch(false);
    setSearchNote("");
    reverseGeocode(lat, lng);
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setResults([]);
    setSearchNote("");

    const parsed = parseColombianAddress(query);

    try {
      let found = [];

      // Intento 1: si logramos parsear vía + placa, probamos búsqueda estructurada
      // (la que mejor aprovecha el número después del #, cuando el dato existe).
      if (parsed.via && parsed.placa) {
        found = await searchNominatimStructured(parsed);
      }

      // Intento 2: búsqueda libre completa con Photon (vía + placa + ciudad)
      if (found.length === 0) {
        found = await searchPhoton(parsed.full);
      }

      // Intento 3: si nada tiene número de placa, buscamos solo por vía + ciudad
      // (sin el número), para al menos ubicar la calle correcta
      const anyWithHouseNumber = found.some((r) => r.hasHouseNumber);
      if (!anyWithHouseNumber && parsed.via) {
        const broaderQuery = `${parsed.via}, ${parsed.resto}`;
        const broader = await searchPhoton(broaderQuery);
        if (broader.length > 0) {
          found = broader;
          setSearchNote(
            `No encontramos el predio exacto "#${parsed.numeroVia}-${parsed.placa}" en el mapa. Te ubicamos sobre "${parsed.via}" — ajusta con clic para precisar.`
          );
        }
      }

      // Intento 4: última salida, solo la ciudad/resto
      if (found.length === 0 && parsed.resto) {
        found = await searchPhoton(parsed.resto);
        setSearchNote(
          "No encontramos la vía ni el predio en el mapa gratuito. Te ubicamos en la zona general — ajusta con clic para precisar."
        );
      }

      setResults(found);
      setApproxMatch(!found.some((r) => r.hasHouseNumber));
    } catch (err) {
      console.error("Error al buscar dirección:", err);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectResult = (result) => {
    setPosition([result.lat, result.lon]);
    setAddress(result.display_name);
    setResults([]);
    setQuery(result.display_name);
    setApproxMatch(!result.hasHouseNumber);
  };

  const handleConfirm = () => {
    if (!position) return;
    onSelect({
      direccion: address,
      latitud: position[0],
      longitud: position[1],
    });
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalHeader
        icon={
          <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Seleccionar ubicación
        </h3>
        <p className="text-[13px] text-[var(--muted)]">
          Busca una dirección o haz clic directamente en el mapa.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Calle 10 #9-47, Pereira"
              className="flex-1 px-3.5 py-2.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
            />
            <Button type="submit" disabled={searching}>
              {searching ? "Buscando..." : "Buscar"}
            </Button>
          </form>

          {results.length > 0 && (
            <div className="border border-[var(--border)] rounded-lg overflow-hidden max-h-40 overflow-y-auto">
              {results.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => handleSelectResult(result)}
                  className="w-full text-left px-3.5 py-2.5 text-sm text-[var(--text)] hover:bg-[var(--surface-2)] transition border-b border-[var(--border)] last:border-b-0"
                >
                  {result.display_name}
                  {!result.hasHouseNumber && (
                    <span className="block text-xs text-amber-500 mt-0.5">
                      Coincidencia aproximada — ajusta con clic en el mapa
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {searchNote && (
            <p className="text-xs text-amber-500">{searchNote}</p>
          )}

          {!searching && results.length === 0 && query && !searchNote && (
            <p className="text-xs text-[var(--muted)]">
              Sin resultados. Haz clic directamente sobre el punto exacto en el mapa.
            </p>
          )}

          <div className="rounded-lg overflow-hidden border border-[var(--border)]" style={{ height: "350px" }}>
            <MapContainer
              center={position || DEFAULT_CENTER}
              zoom={position ? 16 : 12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <ClickHandler onPick={handlePick} />
              {position && (
                <>
                  <Marker position={position} />
                  <RecenterMap position={position} zoom={approxMatch ? 14 : 16} />
                </>
              )}
            </MapContainer>
          </div>

          {approxMatch && position && !searchNote && (
            <p className="text-xs text-amber-500">
              Este es un punto aproximado. Haz clic exactamente sobre la ubicación de la sede para mayor precisión.
            </p>
          )}

          {address && (
            <div className="text-sm text-[var(--text)] bg-[var(--surface-2)] rounded-lg px-3.5 py-2.5">
              <span className="font-bold">Dirección detectada:</span> {address}
            </div>
          )}

          {position && (
            <div className="text-xs text-[var(--muted)]">
              Lat: {position[0].toFixed(6)} · Lng: {position[1].toFixed(6)}
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} disabled={!position}>
          Usar esta ubicación
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LocationPickerModal;