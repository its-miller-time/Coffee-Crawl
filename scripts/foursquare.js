function getUserLocation(){
    function success(position) {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const locationResult = `${latitude},${longitude}`;
        localStorage.setItem("userLocation", locationResult);
        }
    navigator.geolocation.getCurrentPosition(success)
};
getUserLocation()
console.log(localStorage.getItem("userLocation"))

let shopNum = prompt("How many shops would you like to visit?");

function fourSquareURLConstructor() {
    const baseURL = "https://api.foursquare.com/v2/venues/search?";
    const clientID = "ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL";
    const clientSecret = "CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD";
    const version = "20180323";
    const latLng = "33.7748,-84.2963";
    const intent = "browse";
    const searchRadius = "3200";
    const queryTopic = "coffee";
    const categoryID = "4bf58dd8d48988d1e0931735";
    return `${baseURL}client_id=${clientID}&client_secret=${clientSecret}&v=${version}&ll=${latLng}&intent=${intent}&radius=${searchRadius}&query=${queryTopic}`
}

console.log(fourSquareURLConstructor());

let fourSquareURL = fourSquareURLConstructor();

const fourSquareData = 
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
    if (unwanted.name !== "Starbucks" && unwanted.name !== "Allegro Coffee Company" 
    && unwanted.name !== "Starbucks Coffee" && unwanted.name !== "Caribou Coffee" 
    && unwanted.name !== "The Coffee Bean" && unwanted.name !== "Peet's Coffee" 
    && unwanted.name !== "Dunkin Donuts" && unwanted.address !== "undefined")
    {return unwanted.name};
}

async function fetchMyData(){
    const fourSquare = await fetch(fourSquareURL)
    const jsonFourSquare = await fourSquare.json();
    console.log(jsonFourSquare.response.venues)
    const updatedFourSquare = jsonFourSquare.response.venues.map(fourSquareData).filter(undesiredResults)
    console.log(updatedFourSquare)
    const stringifiedFourSquareVenues = JSON.stringify(updatedFourSquare);
    localStorage.setItem("venues", stringifiedFourSquareVenues);
}
fetchMyData();


function waypointsLatLng() {
    const coffeePlaces = JSON.parse(localStorage.getItem('venues'));
    return coffeePlaces.map(venue => latlng = `${venue.latitude},${venue.longitude}`).slice(0,shopNum-1);
}
console.log(waypointsLatLng());