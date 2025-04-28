import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3JlZ2Jhbm5hIiwiYSI6ImNseWIwdWVucjE4c28yaW4ybTl5dGZ3aWoifQ.KAs0fxSZ6Ia7gLfaJFQ72A";

interface Location {
  longitude: number;
  latitude: number;
}

interface MapboxMapProps {
  location: Location;
}

const MapBoxComp: React.FC<MapboxMapProps> = ({ location }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [location.longitude, location.latitude],
        zoom: 10,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    }

    if (mapRef.current && !markerRef.current) {
      // Add a marker at the provided location
      markerRef.current = new mapboxgl.Marker({ color: "red" })
        .setLngLat([location.longitude, location.latitude])
        .addTo(mapRef.current);
    }
  }, []);

  // Update marker and map center when location changes
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLngLat([location.longitude, location.latitude]);
      mapRef.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 10,
        essential: true,
      });
    }
  }, [location]);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "rgba(255, 255, 255, 0.8)",
          padding: "5px 10px",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          fontSize: "14px",
        }}>
        Longitude: {location.longitude}, Latitude: {location.latitude}
      </div>
    </div>
  );
};

export default MapBoxComp;
