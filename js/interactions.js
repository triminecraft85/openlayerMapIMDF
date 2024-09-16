// interactions.js
import { Style, Stroke, Fill } from 'ol/style';

let selectedFeature = null;  // Track the selected feature

// Highlight style for rooms
const highlightStyle = new Style({
  stroke: new Stroke({
    color: 'gray',
    width: 5,
  }),
  fill: new Fill({
    color: 'rgba(255, 255, 0, 0.5)',
  }),
});

// Function to handle clicks (for side panel updates)
export function setupClickInteraction(map, roomLayer, sidePanel, sidePanelContent) {
  map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      if (layer === roomLayer) {
        return feature;
      }
    });

    if (feature) {
        var panelContent = '<h3>' + feature.get('name').vi + '</h3>';
            panelContent += '<p>Category: ' + feature.get('category') + '</p>';
            panelContent += '<p>Level ID: ' + feature.get('level_id') + '</p>';
            panelContent += '<p>Geometry Type: ' + feature.getGeometry().getType() + '</p>';
            panelContent += '<p>Coordinates: ' + JSON.stringify(feature.getGeometry().getCoordinates()) + '</p>';
        
            sidePanelContent.innerHTML = panelContent;
            sidePanel.style.left = '0px'; 
    } else {
      sidePanel.style.left = '-300px';
    }
  });
}

// Function to handle hover highlighting
export function setupHoverInteraction(map, roomLayer) {
  map.on('pointermove', function (evt) {
    if (selectedFeature) {
      selectedFeature.setStyle(undefined);
      selectedFeature = null;
    }

    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      if (layer === roomLayer) {
        selectedFeature = feature;
        feature.setStyle(highlightStyle);
        return true;
      }
    });
  });
}
