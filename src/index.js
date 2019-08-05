L.mapquest.key = 'g2egZCu69Ravnu4jtBeImYEArbV4GUZm';
window.addEventListener('DOMContentLoaded', () => {
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
            !unwanted.name.includes("Caribou Coffee") &&
            unwanted.name !== "The Coffee Bean" &&
            unwanted.name !== "Peet's Coffee" &&
            unwanted.name !== "Dunkin Donuts" &&
            unwanted.address !== "undefined"
        ) {
            return unwanted.name;
        }
    };

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
      const footer = document.querySelector('footer');
      document.querySelector('.results').appendChild(footer)
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

    function addDirections(locationResult) {
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
        waypoints: waypointsLocation(),
        optimizeWaypoints: true,
        options: {
        enhancedNarrative: true,
        }
      }, createMap);
    }
  
    function createMap(err, response) {
  
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
      const hideLoadingGIF = document.querySelector(".loading-image");
      hideLoadingGIF.style.display = "none";
      // narrativeControl.setDirectionsLayer(directionsLayer); // For directions that scroll
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
      const weatherHeader = document.querySelector(".weatherHeader")
      weatherJacket.addEventListener("click", function showWeather() {
        if (weatherDiv.style.display === "none"){
          weatherDiv.style.display = "block";
          weatherDiv.style.backgroundColor = "rgba(0,0,0,.8)"
          weatherDiv.style.color = "white";
          weatherHeader.style.display = "none"
          weatherDiv.style.fontSize = "2%"
          weatherDiv.style.border = "5px solid black"
          
        }
        else {
          weatherDiv.style.display = "none";
          weatherJacket.style.height = "0%";
          weatherHeader.style.display= "block"
        }
      })
      weatherDiv.innerHTML=
      `
        <p>${currentConditions}: ${userTemp}° F
        <img src = ${weatherIconUrl}>
        </p>`
        return jsonUserWeather;
    };

    //Master Function
    async function fetchMyData() {
      navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const city = position;
          console.log(position)
          var locationResult =  `${latitude},${longitude}`; //33.943516, -83.399084 // <-- Hardcoded lat/lng
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