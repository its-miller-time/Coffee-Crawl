
window.onload = function() {
  L.mapquest.key = 'g2egZCu69Ravnu4jtBeImYEArbV4GUZm';

let shopNum = prompt("How many shops would you like to visit?");

//async function fourSquareURLConstructor()
async function fourSquareURLConstructor(locationResult) {
	const baseURL = "https://api.foursquare.com/v2/venues/search?";
	const clientID = "ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL";
	const clientSecret = "CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD";
	const version = "20180323";
	//const latLng = "33.7748,-84.2963";
	//const latLng = await startLocation();
	const latLng = locationResult;
	console.log(latLng);
	const intent = "browse";
	const searchRadius = "3200";
	const queryTopic = "coffee";
	const categoryID = "4bf58dd8d48988d1e0931735";
	return `${baseURL}client_id=${clientID}&client_secret=${clientSecret}&v=${version}&ll=${latLng}&intent=${intent}&radius=${searchRadius}&query=${queryTopic}`;
}

// let fourSquareURL = fourSquareURLConstructor();

const fourSquareData = venue => {
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
	};
};

const undesiredResults = unwanted => {
	if (
		unwanted.name !== "Starbucks" &&
		unwanted.name !== "Allegro Coffee Company" &&
		unwanted.name !== "Starbucks Coffee" &&
		unwanted.name !== "Caribou Coffee" &&
		unwanted.name !== "The Coffee Bean" &&
		unwanted.name !== "Peet's Coffee" &&
		unwanted.name !== "Dunkin Donuts" &&
		unwanted.address !== "undefined"
	) {
		return unwanted.name;
	}
};

async function fetchMyData() {
    navigator.geolocation.getCurrentPosition(async (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
        var locationResult = `${latitude},${longitude}`;
        localStorage.setItem('userLocation',locationResult)
        addDirections(locationResult);
        console.log(latitude);
        console.log(longitude);
        const fourSquareURL = await fourSquareURLConstructor(locationResult);
        console.log(fourSquareURL);
        const fourSquare = await fetch(fourSquareURL);
        const jsonFourSquare = await fourSquare.json();
        // console.log(jsonFourSquare.response.venues)
        const updatedFourSquare = jsonFourSquare.response.venues
            .map(fourSquareData)
            .filter(undesiredResults);
        // console.log(updatedFourSquare)
        const stringifiedFourSquareVenues = JSON.stringify(updatedFourSquare);
        localStorage.setItem("venues", stringifiedFourSquareVenues);
    })
}
fetchMyData();

function waypointsLatLng() {
	const coffeePlaces = JSON.parse(localStorage.getItem("venues"));
	return coffeePlaces
		.map(venue => (latlng = `${venue.latitude},${venue.longitude}`))
		.slice(0, shopNum - 1);
}


  

  function addDirections(userLocation) {
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
  console.log("LOCAL STORAGE: ",userLocation)
    directions.route({
      start: userLocation,//localStorage.getItem('userLocation'),
      // end: '790 Huff Rd NW, Atlanta, GA 30318',
     waypoints: waypointsLatLng().slice(0,3),
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