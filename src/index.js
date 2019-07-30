//CREATE MAP
window.onload = function() {
  L.mapquest.key = 'g2egZCu69Ravnu4jtBeImYEArbV4GUZm';

  //GET USER CURRENT LOCATION


//   const location = navigator.geolocation.getCurrentPosition(function(position) {
//     return(position.coords.latitude, position.coords.longitude);
//   });

// console.log(location)


function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  // let mapLink.href = '';
  userLocation = '';
  console.log(userLocation)

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    userLocation = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location'; //ASK FOR ADDRESS INPUT
  }

  if (!navigator.geolocation) {
    prompt(`We can't find you! Please enter a location`);
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

}
geoFindMe()

  // var currentLocation = navigator.geolocation.getCurrentPosition(position => position.coords.latitude, position.coords.longitude);
  // console.log(currentLocation());

  //GET USER DEFINED START
  var map = L.mapquest.map('map', {
    center: [37.7749, -122.4194],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  });
  L.mapquest.control().addTo(map);
  L.mapquest.geocodingControl().addTo(map);


  addDirections();
  //GET DIRECTIONS
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
      start: '33.7748,-84.2963',
      // end: '790 Huff Rd NW, Atlanta, GA 30318',
     waypoints: venuesLatLng(), //WILL FILL THIS WITH USER INFO

        optimizeWaypoints: true,
      options: {
        enhancedNarrative: false,
      }
    }, createMap);
  }
  //LOAD MAP ONTO PAGE
  function createMap(err, response) {

    var map = L.mapquest.map('map', {
      center: [0, 0],
      layers: L.mapquest.tileLayer('map'),
      zoom: 9
    });

    var directionsLayer = L.mapquest.directionsLayer({
      directionsResponse: response
    }).addTo(map);

    var narrativeControl = L.mapquest.narrativeControl({
      directionsResponse: response,
      compactResults: true,
      interactive: true
    });

    narrativeControl.setDirectionsLayer(directionsLayer);
    narrativeControl.addTo(map);
  }
}

//FOURSQUARE DATA
fourSquareUrl = "https://api.foursquare.com/v2/venues/search?client_id=ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL&client_secret=CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD&v=20180323&v=20180323&ll=33.7748,-84.2963&intent=browse&radius=3200&query=coffee"
const fourSquareData= 
    venue => {
        return {  
            name: `${venue.name}`,
            latitude: `${venue.location.lat}`,
            longitude: `${venue.location.lng}`,
            address: `${venue.location.address}`, 
            city: `${venue.location.city}`,
            state: `${venue.location.state}`,
            postalcode: `${venue.location.postalCode}`,
            address: `${venue.location.address}`,
            distance: `${venue.location.distance}`,
        }};
const undesiredResults = unwanted => {
    if (unwanted.name !== "Starbucks" && unwanted.name !== "Allegro Coffee Company" && unwanted.name !== "Starbucks Coffee" && unwanted.name !== "Caribou Coffee" && unwanted.name !== "The Coffee Bean" && unwanted.name !== "Peet's Coffee" && unwanted.name !== "Dunkin Donuts" && unwanted.address !== "undefined")
    {return unwanted.name};
}

async function fetchMyData(){
    const fourSquare = await fetch(fourSquareUrl)
    const jsonFourSquare = await fourSquare.json();
    console.log(jsonFourSquare.response.venues)
    const updatedFourSquare = jsonFourSquare.response.venues.map(fourSquareData).filter(undesiredResults)
    console.log(updatedFourSquare)
    const stringifiedFourSquareVenues = JSON.stringify(updatedFourSquare);
    localStorage.setItem("venues", stringifiedFourSquareVenues);
}
fetchMyData();


function venuesLatLng(shopChoice){
  const parsedVenues = JSON.parse(localStorage.getItem('venues'));
  return parsedVenues.map(venue => latlng = `${venue.latitude},${venue.longitude}`).slice(0,shopChoice);
}







// function geoFindMe() {

//     const status = document.querySelector('#status');
//     const mapLink = document.querySelector('#map-link');
  
//     mapLink.href = '';
//     mapLink.textContent = '';
  
//     function success(position) {
//       const latitude  = position.coords.latitude;
//       const longitude = position.coords.longitude;
  
//       status.textContent = '';
//       mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//       mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
//     }
  
//     function error() {
//       status.textContent = 'Unable to retrieve your location';
//     }
  
//     if (!navigator.geolocation) {
//       status.textContent = 'Geolocation is not supported by your browser';
//     } else {
//       status.textContent = 'Locating…';
//       navigator.geolocation.getCurrentPosition(success, error);
//     }
  
//   }
  
//   document.querySelector('#find-me').addEventListener('click', geoFindMe);