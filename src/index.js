L.mapquest.key = 'J3sOSVAUrBtR5VQKHikNZ9KpzPVUAJZG';
window.addEventListener('DOMContentLoaded', () => {
  //get number of shops to visit. 
  // let shopNum = prompt("How many shops would you like to visit?");
  // const shopNum = document.querySelector('#input').value
  // const shopNum='4';
  
  //fourSquare data format
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

//Results to be removed from fourSquare Data
    const undesiredResults = unwanted => {
        if (
            !unwanted.name.includes("Starbuck") &&
            unwanted.name !== "Allegro Coffee Company" &&
            !unwanted.name.includes("Caribou Coffee") &&
            unwanted.name !== "The Coffee Bean" &&
            unwanted.name !== "Peet's Coffee" &&
            unwanted.name !== "Dunkin Donuts" &&
            unwanted.address !== "undefined"
        ) {
            return unwanted.name;
        }
    };

    function getVenuesList(shopNum){
      const venuesDiv = document.querySelector(".venuesDiv");
      let locIndex = 0
      const venues = JSON.parse(localStorage.getItem("venues"));
      while(locIndex < shopNum){
        const el = document.createElement("li")
        el.innerHTML = `<strong>${venues[locIndex].name}</strong> <br> ${venues[locIndex].address}, ${venues[locIndex].city}, ${venues[locIndex].state} ${venues[locIndex].postalcode} <hr>` 
        document.querySelector('.results').appendChild(el)
        locIndex++
      }
      const footer = document.querySelector('footer');
      document.querySelector('.results').appendChild(footer)
    }

    async function fourSquareURLConstructor(locationResult) {
      const baseURL = "https://api.foursquare.com/v2/venues/search?";
      const clientID = "ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL";
      const clientSecret = "CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD";
      const version = "20180323";
      const latLng = locationResult;
      const intent = "browse";
      const searchRadius = "10000";
      const queryTopic = "coffee";
      const categoryID = "4bf58dd8d48988d1e0931735";
      return `${baseURL}client_id=${clientID}&client_secret=${clientSecret}&v=${version}&ll=${latLng}&intent=${intent}&radius=${searchRadius}&query=${queryTopic}`;
  }

    function waypointsLocation(shopNum) {
        const coffeePlaces = JSON.parse(localStorage.getItem("venues"));
        return coffeePlaces
            .map(venue => (address = `${venue.address},${venue.city},${venue.state} ${venue.postalcode}`))
            .slice(0, shopNum);
    }

    function addDirections(locationResult, shopNum) {
      var directions = L.mapquest.directions();
      directions.setLayerOptions({
      startMarker: {
        draggable: false,
        icon: 'flag',
        iconOptions: {
          size: 'sm',
          primaryColor: '#1fc715',
          secondaryColor: '#1fc715',
          symbol: 'A'
        }
      },
      endMarker: {
        draggable: false,
        icon: 'circle',
        iconOptions: {
          size: 'sm',
          primaryColor: '#e9304f',
          secondaryColor: '#e9304f',
          symbol: 'B'
        }
      },
      routeRibbon: {
        draggable: false,
        color: "#2aa6ce",
        opacity: 1.0,
        showTraffic: true
      }
    });
      directions.route({
        start: locationResult,
        end:locationResult,
        waypoints: waypointsLocation(shopNum),
        optimizeWaypoints: true,
        options: {
        enhancedNarrative: true,
        }
      }, createMap);
    }
  
    function createMap(err, response) {
  
      try{
      var map = L.mapquest.map('map', {
        center: [0, 0],
        layers: L.mapquest.tileLayer('map'),
        zoom: 1
      });
  
      var directionsLayer = L.mapquest.directionsLayer({
        directionsResponse: response
      }).addTo(map);
  
      var narrativeControl = L.mapquest.narrativeControl({
        directionsResponse: response,
        compactResults: true,
        interactive: true,
      });

    }
    catch(err){
      console.log(err);
    }
  }

    //Master Function
    async function fetchMyData(shopNum) {
      // const shopNum = document.querySelector('#input').value
      navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const city = position;
          var locationResult =  `${latitude},${longitude}`; 
          //47.6062, -122.3321 // <-- Hardcoded lat/lng
          localStorage.setItem('userLocation',locationResult)
          const fourSquareURL = await fourSquareURLConstructor(locationResult);
          const fourSquare = await fetch(fourSquareURL);
          const jsonFourSquare = await fourSquare.json();
          const updatedFourSquare = jsonFourSquare.response.venues
              .map(fourSquareData)
              .filter(undesiredResults);
          const stringifiedFourSquareVenues = JSON.stringify(updatedFourSquare);
          localStorage.setItem("venues", stringifiedFourSquareVenues);
          addDirections(locationResult, shopNum)
          getVenuesList(shopNum)
      })
  }
    // document.getElementById('modal-button').onclick = (function (event){
    //   const modal = document.querySelector('#openModal');
    //   modal.style.display = 'block';
    // });

    //THIS IS THE ONE THAT WORKS
    document.getElementById('about-button').addEventListener('click', 
      ()=>{
        console.log('button click')
        // console.log('CLICK')
        return document.getElementById("openModal").classList.remove('hide-modal');
      });

      document.body.addEventListener('click', (e)=> {
        console.log('body click')
        if(e.target.id !== 'about-button') document.getElementById('openModal').classList.add('hide-modal');
        // console.log('click')
      });


    document.getElementById('button').onclick = function() {
      const shopNum = document.querySelector('#input').value;
      fetchMyData(shopNum);

      const hidden = document.getElementsByClassName('front')
      for(i=0; i<hidden.length; i++){
        hidden[i].style.display = 'none';
        }
        
      const loaded = document.getElementsByClassName('mapPage')
      for (i=0; i< loaded.length; i++){
        loaded[i].style.display = 'flex';
      }
      const wholeMap = document.getElementById('map');
      wholeMap.style.display = 'block';

      const aboot = document.getElementById('about-button');
      aboot.style.display = 'block';
  }

  });