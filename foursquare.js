
fourSquareUrl = ''
// ll=33.848747,-84.373383&intent=browse&radius=3200&query=coffee
const fourSquareData= 
    //return location and name information
    i => {
        return {  
            name: `${i.name}`,
            latitude: `${i.location.lat}`,
            longitude: `${i.location.lng}`,
            address: `${i.location.address}`, 
            city: `${i.location.city}`,
            state: `${i.location.state}`,
            postalcode: `${i.location.postalCode}`,
            address: `${i.location.address}`,
            distance: `${i.location.distance}`,
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
}

fetchMyData()