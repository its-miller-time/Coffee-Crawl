L.mapquest.key = 'g2egZCu69Ravnu4jtBeImYEArbV4GUZm';
window.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
  let shopNum = prompt("How many shops would you like to visit?");
  
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
            !unwanted.name.includes("Starbuck") &&
            unwanted.name !== "Allegro Coffee Company" &&
            // unwanted.name !== "Starbucks Coffee" &&
            !unwanted.name.includes("Caribou Coffee") &&
            unwanted.name !== "The Coffee Bean" &&
            unwanted.name !== "Peet's Coffee" &&
            unwanted.name !== "Dunkin Donuts" &&
            unwanted.address !== "undefined"
        ) {
            return unwanted.name;
        }
    };

    
    // const weatherBox = document.getElementsByName("");
    


// function getRadius(){    
//   const milesToMeters = (miles) => (miles * (1609.34))
//   let radios = document.getElementsByName('radius');
//       for (var i = 0, length = radios.length; i < length; i++){
//         if (radios[i].checked){
//           return(milesToMeters(radios[i].value))
//         }
//       break;
//       };
//     }


    //
    function selectWeather(){
      imgSrc = ""
      switch(weatherCondition){
        case'cloudy':
          imgSrc = "../assets/cloudy.gif";
        case'sunny':
          imgSrc = "../assets/sunny.gif";
        case'windy':
          imgSrc = "../assets/windy.gif";
        case'rainh':
          imgSrc = "../assets/rainy.gif";
      }
    };

    //Creating and loading the list of venues the user will visit
    function getVenuesList(){
      const venuesDiv = document.querySelector(".venuesDiv");
      let locIndex = 0
      const venues = JSON.parse(localStorage.getItem("venues"));
      while(locIndex < shopNum){
        const el = document.createElement("li")
        el.innerHTML = `<strong>${venues[locIndex].name}</strong> <br> ${venues[locIndex].address}, ${venues[locIndex].city}, ${venues[locIndex].state} ${venues[locIndex].postalcode} <hr>` 
        document.querySelector('.results').appendChild(el)
        locIndex++
      }
      const header = document.querySelector('header')
      document.getElementById('map').style.top = `${header.offsetHeight}px`
    }


    async function fourSquareURLConstructor(locationResult) {
      const baseURL = "https://api.foursquare.com/v2/venues/search?";
      const clientID = "ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL";
      const clientSecret = "CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD";
      const version = "20180323";
      const latLng = locationResult;
      console.log(latLng);
      const intent = "browse";
      const searchRadius = "10000";
      const queryTopic = "coffee";
      const categoryID = "4bf58dd8d48988d1e0931735";
      return `${baseURL}client_id=${clientID}&client_secret=${clientSecret}&v=${version}&ll=${latLng}&intent=${intent}&radius=${searchRadius}&query=${queryTopic}`;
  }

    function waypointsLocation() {
        const coffeePlaces = JSON.parse(localStorage.getItem("venues"));
        console.log(coffeePlaces);
        return coffeePlaces
            .map(venue => (address = `${venue.address},${venue.city},${venue.state} ${venue.postalcode}`))
            .slice(0, shopNum);
    }

=======
	let shopNum = prompt("How many shops would you like to visit?");

    //async function fourSquareURLConstructor()
    async function fourSquareURLConstructor(locationResult) {
        const baseURL = "https://api.foursquare.com/v2/venues/search?";
        const clientID = "ZTBN04P0C1HZICYQWPO4OO1ZXYB2PHMALYZPLKTIOHT34VUL";
        const clientSecret = "CGG1LF2IHSYQFVBMM4QXT4JREE51LXXVTXX4POHV2WLCQLOD";
        const version = "20180323";
        const latLng = locationResult;
        console.log(latLng);
        const intent = "browse";
        const searchRadius = "3200";
        const queryTopic = "coffee";
        const categoryID = "4bf58dd8d48988d1e0931735";
        return `${baseURL}client_id=${clientID}&client_secret=${clientSecret}&v=${version}&ll=${latLng}&intent=${intent}&radius=${searchRadius}&query=${queryTopic}`;
    }

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
            const fourSquareURL = await fourSquareURLConstructor(locationResult);
            console.log(fourSquareURL);
            const fourSquare = await fetch(fourSquareURL);
            const jsonFourSquare = await fourSquare.json();
            const updatedFourSquare = jsonFourSquare.response.venues
                .map(fourSquareData)
                .filter(undesiredResults);
            const stringifiedFourSquareVenues = JSON.stringify(updatedFourSquare);
            localStorage.setItem("venues", stringifiedFourSquareVenues);
            addDirections(locationResult)
        })
    }
    

    function waypointsLatLng() {
        const coffeePlaces = JSON.parse(localStorage.getItem("venues"));
        console.log(coffeePlaces);
        return coffeePlaces
            .map(venue => (latlng = `${venue.latitude},${venue.longitude}`))
            .slice(0, shopNum - 1);
    }

    // addDirections();
  
>>>>>>> master
    function addDirections(locationResult) {
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
        start: locationResult,
<<<<<<< HEAD
        end:locationResult,
        waypoints: waypointsLocation(),
        optimizeWaypoints: true,
        options: {
        enhancedNarrative: true,
=======
        waypoints: waypointsLatLng(),
        optimizeWaypoints: true,
        options: {
        enhancedNarrative: true
>>>>>>> master
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
<<<<<<< HEAD
        interactive: true,
      });
  
      narrativeControl.setDirectionsLayer(directionsLayer);
      // narrativeControl.addTo(map);
    }

    async function weather(latitude,longitude){
      let atlWeatherAPI = `http://my-little-cors-proxy.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=a373f4ca9633876c822db955b3ed301e`
      userWeather = await fetch(atlWeatherAPI);
      jsonUserWeather = await userWeather.json();
      let weatherIconUrl = `http://openweathermap.org/img/wn/${jsonUserWeather.weather[0].icon}@2x.png`
      console.log(weatherIconUrl)
      const currentConditions = jsonUserWeather.weather[0].main;
      const userTemp = jsonUserWeather.main.temp;
      const weatherDiv = document.querySelector(".weather");
      weatherDiv.style.display = "none";
      const weatherJacket = document.querySelector(".weatherJacket")
      weatherJacket.onmouseover = function showWeather() {
        if (weatherDiv.style.display === "none"){
          weatherDiv.style.display = "block";
        }
        else {weatherDiv.style.display = "none"}
      }
      weatherDiv.innerHTML=
        `
        <p>${currentConditions}<br>${userTemp}</p>
        <img src = ${weatherIconUrl}>
        `
        return jsonUserWeather;
    };

    //Master Function
    async function fetchMyData() {
      navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const city = position;
          console.log(position)
          var locationResult =  `${latitude},${longitude}`; //33.943516, -83.399084
          localStorage.setItem('userLocation',locationResult)
          const fourSquareURL = await fourSquareURLConstructor(locationResult);
          console.log(fourSquareURL);
          const fourSquare = await fetch(fourSquareURL);
          const jsonFourSquare = await fourSquare.json();
          const updatedFourSquare = jsonFourSquare.response.venues
              .map(fourSquareData)
              .filter(undesiredResults);
          const stringifiedFourSquareVenues = JSON.stringify(updatedFourSquare);
          localStorage.setItem("venues", stringifiedFourSquareVenues);
          addDirections(locationResult)
          await weather(latitude,longitude)
          getVenuesList()
      })
  }
    fetchMyData();
  });
=======
        interactive: true
      });
  
      narrativeControl.setDirectionsLayer(directionsLayer);
      narrativeControl.addTo(map);
    }

    fetchMyData();

  });
// });
>>>>>>> master
