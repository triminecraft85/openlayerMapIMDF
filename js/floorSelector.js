// floorSelector.js
import VectorSource from 'ol/source/Vector';

// Filter rooms by floor
export function filterRoomsByFloor(roomLayer, selectedFloor) {
  const source = roomLayer.getSource();
  const filteredRooms = [];

  source.forEachFeature(function (feature) {
    if (String(feature.get('level_id')) === String(selectedFloor)) {
      filteredRooms.push(feature);
    }
  });

  const filteredSource = new VectorSource({
    features: filteredRooms,
  });

  roomLayer.setSource(filteredSource);
}

// Setup floor selector change listener
export function setupFloorSelector(roomLayer) {
  document.getElementById('floor-select').addEventListener('change', function (event) {
    const selectedFloor = String(event.target.value);
    filterRoomsByFloor(roomLayer, selectedFloor);
  });
}
