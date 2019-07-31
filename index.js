// L.mapquest.key = 'g2egZCu69Ravnu4jtBeImYEArbV4GUZm';
var baseLayer = L.mapquest.tileLayer('dark');

L.mapquest.geocoding().geocode(['New York, NY'], showMap);

console.log('hello world')

function showMap(err, data) {
  var map = createMap();
  map.addControl(L.mapquest.control());
  addLayerControl(map);
  L.mapquest.control().addTo(map);
  L.mapquest.geocodingControl().addTo(map);
}

function createMap() {
  var map = L.mapquest.map('map', {
    center: [40.7237, -73.9825],
    zoom: 14,
    layers: baseLayer
  });
  return map;
}

function addLayerControl(map) {
  L.control.layers({
    'Map': L.mapquest.tileLayer('map'),
    'Satellite': L.mapquest.tileLayer('satellite'),
    'Hybrid': L.mapquest.tileLayer('hybrid'),
    'Light': L.mapquest.tileLayer('light'),
    'Dark': baseLayer
  }, {}, { position: 'topleft'}).addTo(map);
}