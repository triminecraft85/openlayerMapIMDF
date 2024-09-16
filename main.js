import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {Circle, Fill, Stroke, Style,Text} from 'ol/style';
import Overlay from 'ol/Overlay.js';
import OSM from 'ol/source/OSM';
import './style.css'
/* const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ctu%3Acantho_university_units&maxFeatures=50&outputFormat=application%2Fjson',
    format: new GeoJSON(),
  }),
  style: {
    'fill-color': 'red',
    'stroke-color' : 'black',
    'stroke-width' : 1.0,
  },
}); */
const sidePanel = document.getElementById('side-panel');
const sidePanelContent = document.getElementById('side-panel-content');
const closeBtn = document.getElementById('close-btn');


let roomGEOJSON = new VectorSource({
  url: 'http://127.0.0.1:8000/api/units',  
  format: new GeoJSON(),
});

let room = new VectorLayer({
  source: roomGEOJSON,
  style: new Style({
    fill: new Fill({
      color: 'rgba(80,180,250,0.5)',
    }),
    stroke: new Stroke({
      color: 'gray',
      width: 2,
    })
  })
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    room,
  ],
  target: 'map',
  view: new View({
    center: [11774143.875, 1122400.1918],
    zoom: 20,
  }),
});

//side panel
closeBtn.onclick = function() {
  sidePanel.style.left = '-300px'; // Hide the side panel
};

map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
    if (layer === room) {
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


//click highlight
let highlightStyle = new Style({
  stroke: new Stroke({
    color: 'gray',
    width: 5,
  }),
  fill: new Fill({
    color: 'rgba(255, 255, 0, 0.5)',
  }),
});

let selectedFeature = null;
map.on('click', function(evt) {
  if (selectedFeature) {
    selectedFeature.setStyle(undefined);
    selectedFeature = null;
  }
  
  map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
      selectedFeature = feature;
      feature.setStyle(highlightStyle); 
      return true; 
  });
  
});

//floor change
function filterRoomsByFloor(floor) {
  let filteredRooms = [];

  roomGEOJSON.forEachFeature(function(feature) {
    if (String(feature.get('level_id')) === String(floor)) {
      filteredRooms.push(feature);
    }
  });

  let filteredSource = new VectorSource({
    features: filteredRooms
  });

  room.setSource(filteredSource);  
}

document.getElementById('floor-select').addEventListener('change', function(event) {
  let selectedFloor = String(event.target.value);  
  filterRoomsByFloor(selectedFloor);  
});

