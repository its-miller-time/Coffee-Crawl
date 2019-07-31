// let shopNum = prompt("How many shops would you like to visit?");

// const undesiredResults = unwanted => {
//   if (unwanted.name !== "Starbucks" && unwanted.name !== "Allegro Coffee Company" 
//   && unwanted.name !== "Starbucks Coffee" && unwanted.name !== "Caribou Coffee" 
//   && unwanted.name !== "The Coffee Bean" && unwanted.name !== "Peet's Coffee" 
//   && unwanted.name !== "Dunkin Donuts" && unwanted.address !== "undefined")
//   {return unwanted.name};
// }
 
// const fourSquareData = 
//     venue => {
//         return {  
//             name: `${venue.name}`,
//             latitude: `${venue.location.lat}`,
//             longitude: `${venue.location.lng}`,
//             address: `${venue.location.address}`, 
//             city: `${venue.location.city}`,
//             state: `${venue.location.state}`,
//             postalcode: `${venue.location.postalCode}`,
//             address: `${venue.location.address}`,
//             distance: `${venue.location.distance}`,
//         }};

// let fourSquareURL = fourSquareURLConstructor();

 
//  function getUserLocation(){
//    function success(position) {
//     const latitude  = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     var locationResult = `${latitude},${longitude}`;
//     localStorage.setItem('userLocation',locationResult)
//   }
//   navigator.geolocation.getCurrentPosition(success)
// };

// //async function fourSquareURLConstructor()
// async function fourSquareURLConstructor() {
//     const baseURL = "https://api.foursquare.com/v2/venues/search?";
//     const clientID = "ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL";
//     const clientSecret = "CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD";
//     const version = "20180323";

//     const latLng = localStorage.getItem('userLocation');
//     console.log(latLng);
//     const intent = "browse";
//     const searchRadius = "3200";
//     const queryTopic = "coffee";
//     const categoryID = "4bf58dd8d48988d1e0931735";
//     const apiUrl =  `${baseURL}client_id=${clientID}&client_secret=${clientSecret}&v=${version}&ll=${latLng}&intent=${intent}&radius=${searchRadius}&query=${queryTopic}`
//     console.log(apiUrl)
//     return apiUrl;
// }

// async function fetchMyData(){
//     const fourSquare = await fetch(fourSquareURL)
//     console.log(fourSquareURL)
//     const jsonFourSquare = await fourSquare.json();
//     console.log(jsonFourSquare.response.venues)
//     const updatedFourSquare = jsonFourSquare.response.venues.map(fourSquareData).filter(undesiredResults)
//     console.log(updatedFourSquare)
//     const stringifiedFourSquareVenues = JSON.stringify(updatedFourSquare);
//     console.log(stringifiedFourSquareVenues)
//     localStorage.setItem("venues", stringifiedFourSquareVenues);
// }

// function waypointsLatLng() {
//     const coffeePlaces = JSON.parse(localStorage.getItem('venues'));
//     return coffeePlaces.map(venue => latlng = `${venue.latitude},${venue.longitude}`).slice(0,shopNum-1);
// }


// getUserLocation()
// fetchMyData()


// function getUserLocation() {
// 	function success(position) {
// 		const latitude = position.coords.latitude;
// 		const longitude = position.coords.longitude;
// 		var locationResult = `${latitude},${longitude}`;
// 		return locationResult;
// 	}
// 	return navigator.geolocation.getCurrentPosition(success);
// }
// getUserLocation(); //move to bottom of file

// userInput = "33 Peachtree Pl Ste 9 Atlanta, GA 30309"
// async function startLocation() {
//   if(userInput === ""){
//     location = await getUserLocation()
//   } else {
//     location = userInput
//   }
// };

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

// console.log(fourSquareURLConstructor());

// function userInput(){
//     street = window.prompt("Enter your street: ")
//     city = window.prompt("Enter your city: ")
//     state = window.prompt("Enter your state: ")
//     zip = window.prompt("Enter your zipcode: ")
// }

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
// console.log(waypointsLatLng());

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
