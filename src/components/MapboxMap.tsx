import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { FeatureCollection } from "geojson";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3JlZ2Jhbm5hIiwiYSI6ImNseWIwdWVucjE4c28yaW4ybTl5dGZ3aWoifQ.KAs0fxSZ6Ia7gLfaJFQ72A";

interface YachtLocation {
  id: number;
  latitude: number;
  longitude: number;
}

interface MapboxMapProps {
  yachtLocations: YachtLocation[];
  hoveredLocation: { latitude: number; longitude: number } | null;
  onClusterClick: (clusterYachts: YachtLocation[]) => void; // New prop for cluster click
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  yachtLocations,
  hoveredLocation,
  onClusterClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const fitMapToBounds = (locations: YachtLocation[]) => {
    if (locations.length > 0 && mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds(
        [locations[0].longitude, locations[0].latitude],
        [locations[0].longitude, locations[0].latitude]
      );

      locations.forEach((location) => {
        bounds.extend([location.longitude, location.latitude]);
      });

      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12,
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [15.0609, 38.1446],
        zoom: 2,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    }

    mapRef.current?.on("style.load", () => {
      if (!mapRef.current?.getSource("yachts")) {
        const yachtData: FeatureCollection = {
          type: "FeatureCollection",
          features: yachtLocations.map((location) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [location.longitude, location.latitude],
            },
            properties: { id: location.id },
          })),
        };

        mapRef.current?.addSource("yachts", {
          type: "geojson",
          data: yachtData,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        mapRef.current?.addLayer({
          id: "clusters",
          type: "circle",
          source: "yachts",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
            "circle-stroke-color": "#fff",
            "circle-stroke-width": 2,
          },
        });

        mapRef.current?.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "yachts",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          paint: {
            "text-color": "#000",
          },
        });

        mapRef.current?.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "yachts",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 10,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });
      }

      fitMapToBounds(yachtLocations);

      // Change cluster color and cursor on hover
      mapRef.current?.on("mouseenter", "clusters", () => {
        if (mapRef.current) {
          mapRef.current.setPaintProperty(
            "clusters",
            "circle-color",
            "#ff7f50"
          );
          mapRef.current.getCanvas().style.cursor = "pointer";
        }
      });

      mapRef.current?.on("mouseleave", "clusters", () => {
        if (mapRef.current) {
          mapRef.current.setPaintProperty(
            "clusters",
            "circle-color",
            "#f28cb1"
          );
          mapRef.current.getCanvas().style.cursor = "";
        }
      });

      mapRef.current?.on("click", "clusters", (e) => {
        const features = mapRef.current?.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });

        if (features?.length) {
          const clusterId = features[0].properties?.cluster_id;

          if (clusterId && mapRef.current?.getSource("yachts")) {
            (
              mapRef.current.getSource("yachts") as mapboxgl.GeoJSONSource
            ).getClusterLeaves(clusterId, Infinity, 0, (err, leaves) => {
              if (!err && leaves) {
                const clusterYachts = leaves.map((leaf: any) => ({
                  id: leaf.properties.id,
                  latitude: leaf.geometry.coordinates[1],
                  longitude: leaf.geometry.coordinates[0],
                }));
                onClusterClick(clusterYachts); // Pass cluster data to parent
              }
            });
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    if (mapRef.current?.isStyleLoaded()) {
      const yachtData: FeatureCollection = {
        type: "FeatureCollection",
        features: yachtLocations.map((location) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
          },
          properties: { id: location.id },
        })),
      };

      (mapRef.current.getSource("yachts") as mapboxgl.GeoJSONSource)?.setData(
        yachtData
      );
      fitMapToBounds(yachtLocations);
    }
  }, [yachtLocations]);

  useEffect(() => {
    if (mapRef?.current && hoveredLocation) {
      mapRef?.current.flyTo({
        center: [hoveredLocation?.longitude, hoveredLocation?.latitude],
        zoom: 10,
        essential: true,
      });
    }
  }, [hoveredLocation]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default MapboxMap;
