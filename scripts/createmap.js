window.onload = function() {
  L.mapquest.key = 'g2egZCu69Ravnu4jtBeImYEArbV4GUZm';

  addDirections();

  function addDirections() {
    var directions = L.mapquest.directions();
    directions.setLayerOptions({
    startMarker: {
      icon: 'flag',
      iconOptions: {
        size: 'sm',
        primaryColor: '#1fc715',
        secondaryColor: '#1fc715',
        symbol: 'A'
      }
    },
    endMarker: {
      icon: 'circle',
      iconOptions: {
        size: 'sm',
        primaryColor: '#e9304f',
        secondaryColor: '#e9304f',
        symbol: 'B'
      }
    },
    routeRibbon: {
      color: "#2aa6ce",
      opacity: 1.0,
      showTraffic: true
    }
  });
    directions.route({
      start: localStorage.getItem('userLocation'), //'33.7748,-84.2963',
      // end: '790 Huff Rd NW, Atlanta, GA 30318',
     waypoints: waypointsLatLng(),
    //  [
    //   "33 Peachtree Pl Ste 9 Atlanta, GA 30309",
    //   '790 Huff Rd NW, Atlanta, GA 30318',
    //   "1230 Peachtree St NE Atlanta, GA 30309",
    //   "1000 Piedmont Ave NE Atlanta, GA 30309"
    // ],
        optimizeWaypoints: true,
      options: {
        enhancedNarrative: true
      }
    }, createMap);
  }

  function createMap(err, response) {

    var map = L.mapquest.map('map', {
      center: [0, 0],
      layers: L.mapquest.tileLayer('map'),
      zoom: 20
    });

    var directionsLayer = L.mapquest.directionsLayer({
      directionsResponse: response
    }).addTo(map);

    var narrativeControl = L.mapquest.narrativeControl({
      directionsResponse: response,
      compactResults: true,
      interactive: true
    });

    // L.mapquest.control().addTo(map);
    // L.mapquest.geocodingControl().addTo(map);
    narrativeControl.setDirectionsLayer(directionsLayer);
    narrativeControl.addTo(map);
  }
}
// const url = 
//https://www.mapquestapi.com/search/v3/prediction?collection=%22address%22%2C%22category%22%2C%22poi%22&limit=10&q=coffee%20shops&key=g2egZCu69Ravnu4jtBeImYEArbV4GUZm

// userQuery = prompt("Where are you starting your crawl?")
// function searchAhead(userQuery){
//   const key = "g2egZCu69Ravnu4jtBeImYEArbV4GUZm";
//   const userLocation = ""
//   return `https://www.mapquestapi.com/search/v3/prediction?collection=%22address%22%2C%22category%22%2C%22poi%22&limit=10&q=${userQuery}%20shops&key=${key}`
// }
// searchAhead(userQuery)

// https://www.mapquestapi.com/search/v3/prediction?collection=%22address%22%2C%22category%22%2C%22poi%22&limit=10&q="coffee shops"%20shops&key=g2egZCu69Ravnu4jtBeImYEArbV4GUZm