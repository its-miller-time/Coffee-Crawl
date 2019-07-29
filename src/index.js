// const coffeeShopsURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.8486615,-84.3755117&radius=1500&type=restaurant&keyword=cruise&key=APIKEY`

// async function getCoffeeShops(){
//     let coffeeShops = await fetch 
// }

var request = {
    location: '33.8486615,-84.3755117',
    radius: 8047,
    types: ['cafe']
  };

  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  function callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK){
      for (var i = 0; i < results.length; i++){
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  }


