// window.onload = function() {
//     L.mapquest.key = 'g2egZCu69Ravnu4jtBeImYEArbV4GUZm';
  
//     addDirections();
  
//     function addDirections() {
//       var directions = L.mapquest.directions();
//       directions.setLayerOptions({
//       startMarker: {
//         icon: 'flag',
//         iconOptions: {
//           size: 'sm',
//           primaryColor: '#1fc715',
//           secondaryColor: '#1fc715',
//           symbol: 'A'
//         }
//       },
//       endMarker: {
//         icon: 'circle',
//         iconOptions: {
//           size: 'sm',
//           primaryColor: '#e9304f',
//           secondaryColor: '#e9304f',
//           symbol: 'B'
//         }
//       },
//       routeRibbon: {
//         color: "#2aa6ce",
//         opacity: 1.0,
//         showTraffic: true
//       }
//     });
//       directions.route({
//         start: '33.7748,-84.2963',
//         // end: '790 Huff Rd NW, Atlanta, GA 30318',
//        waypoints: latLng(coffeePlaces).slice(0,3),
//       //  [
//       //   "33 Peachtree Pl Ste 9 Atlanta, GA 30309",
//       //   '790 Huff Rd NW, Atlanta, GA 30318',
//       //   "1230 Peachtree St NE Atlanta, GA 30309",
//       //   "1000 Piedmont Ave NE Atlanta, GA 30309"
//       // ],
//           optimizeWaypoints: true,
//         options: {
//           enhancedNarrative: true
//         }
//       }, createMap);
//     }
  
//     function createMap(err, response) {
  
//       var map = L.mapquest.map('map', {
//         center: [0, 0],
//         layers: L.mapquest.tileLayer('map'),
//         zoom: 9
//       });
  
//       var directionsLayer = L.mapquest.directionsLayer({
//         directionsResponse: response
//       }).addTo(map);
  
//       var narrativeControl = L.mapquest.narrativeControl({
//         directionsResponse: response,
//         compactResults: true,
//         interactive: true
//       });
  
//       narrativeControl.setDirectionsLayer(directionsLayer);
//       narrativeControl.addTo(map);
//     }
//   }