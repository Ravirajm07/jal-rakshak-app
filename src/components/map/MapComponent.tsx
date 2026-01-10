"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./MapComponent.module.css";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Fix for default marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for different statuses
const getCustomIcon = (status: "safe" | "contaminated" | "flood") => {
    let color = "#10b981"; // green
    if (status === "contaminated") color = "#f59e0b"; // amber
    else if (status === "flood") color = "#ef4444"; // red

    return L.divIcon({
        className: "custom-icon",
        html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

interface MarkerData {
    id: number;
    lat: number;
    lng: number;
    status: "safe" | "contaminated" | "flood";
    location: string;
    details: string;
}

const MARKERS: MarkerData[] = [
    { id: 1, lat: 16.7050, lng: 74.2433, status: "flood", location: "Panchganga Ghat", details: "Water level critical (16.2m). Avoid this zone." },
    { id: 2, lat: 16.6950, lng: 74.2250, status: "safe", location: "Rankala Lake", details: "Water quality is good. Safe for usage." },
    { id: 3, lat: 16.7200, lng: 74.2600, status: "contaminated", location: "Shiroli Ind. Area", details: "High turbidity detected. Do not drink." },
    { id: 4, lat: 16.6800, lng: 74.2500, status: "safe", location: "Shivaji University", details: "Safe zone. No flood risk." },
    { id: 5, lat: 16.7100, lng: 74.2800, status: "flood", location: "Bapat Camp", details: "Rising water levels alert." },
];

function ResetCenterView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
}

export default function MapComponent() {
    const center: [number, number] = [16.7050, 74.2433]; // Kolhapur Coordinates

    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.mapWrapper}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ResetCenterView center={center} />

                {/* Flood Risk Zone Circle */}
                <Circle
                    center={[16.7050, 74.2433]}
                    pathOptions={{ fillColor: 'red', color: 'red', fillOpacity: 0.2, weight: 1 }}
                    radius={800}
                />

                {MARKERS.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={[marker.lat, marker.lng]}
                        icon={getCustomIcon(marker.status)}
                    >
                        <Popup>
                            <div className="flex flex-col gap-2 p-1">
                                <h3 className="font-bold text-sm text-slate-800">{marker.location}</h3>
                                <Badge variant={marker.status === 'safe' ? 'success' : marker.status === 'contaminated' ? 'warning' : 'danger'}>
                                    {marker.status.toUpperCase()}
                                </Badge>
                                <p className="text-xs text-slate-500 leading-snug">{marker.details}</p>
                                <Button size="sm" variant="outline" fullWidth className="h-8 text-xs mt-1">
                                    View Details
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
