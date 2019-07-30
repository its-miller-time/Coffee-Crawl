fourSquareUrl = "https://api.foursquare.com/v2/venues/search?client_id=ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL&client_secret=CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD&v=20180323&v=20180323&ll=33.848747,-84.373383&intent=browse&radius=3200&query=coffee"
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

// const lats = coffeePlaces.forEach(venue => console.log(venue.latitude));
// const longs = coffeePlaces.forEach(venue => console.log(venue.longitude));
// const metersToMiles = (meters) => meters/1609.344
// console.log(metersToMiles(1000))


const venues = JSON.parse(localStorage.getItem('venues'));

const latLng = (venues) => venues.map(venue => latlng = venue.longitude + venue.latitide);

console.log(latLng(venues))