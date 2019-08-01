fourSquareUrl = "https://api.foursquare.com/v2/venues/search?client_id=ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL&client_secret=CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD&v=20180323&v=20180323&ll=33.7748,-84.2963&intent=browse&radius=3200&query=coffee"
const fourSquareData= 
    //return location and name information
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



const coffeePlaces = JSON.parse(localStorage.getItem('venues'));
const latLng = (venues) => venues.map(venue => latlng = `${venue.latitude},${venue.longitude}`);
console.log(latLng(coffeePlaces));





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