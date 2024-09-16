// roomLayer.js
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';

// Function to create the room vector layer
export function createRoomLayer() {
  const roomGEOJSON = new VectorSource({
    url: 'http://127.0.0.1:8000/api/units',  // Replace with your API endpoint
    format: new GeoJSON(),
  });

  const roomLayer = new VectorLayer({
    source: roomGEOJSON,
    style: new Style({
      fill: new Fill({
        color: 'rgba(80,180,250,0.5)',
      }),
      stroke: new Stroke({
        color: 'gray',
        width: 2,
      }),
    }),
  });

  return roomLayer;
}
