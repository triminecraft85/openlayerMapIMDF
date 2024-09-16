// mapInit.js
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// Function to initialize the map
export function initMap(roomLayer) {
  const map = new Map({
    target: 'map',  // This must match the ID of the map container in HTML
    layers: [
      new TileLayer({
        source: new OSM(),  // OpenStreetMap base layer
      }),
      roomLayer,  // Vector layer for the rooms
    ],
    view: new View({
      center: [11774143.875, 1122400.1918],  // Coordinates for initial center
      zoom: 20,  // Initial zoom level
    }),
  });

  return map;  // Return map instance
}
