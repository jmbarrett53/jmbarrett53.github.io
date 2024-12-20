let userLattitude = 0;
    let userLongitude = 0;

    // Prompt user for location
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      userLattitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);
      let userLocation = userLattitude + "," + userLongitude;
      // alert(`User is located at ${userLocation}`);
      displayMap(userLattitude, userLongitude)
    }

    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
        }
    } 

    function displayMap(mapLattitude, mapLongitude) {
      var map = L.map('map').setView([mapLattitude, mapLongitude], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([mapLattitude, mapLongitude]).addTo(map)
      .bindPopup('User Origin')
      .openPopup();
    }
    
    // Call the function to get the user's location
    getLocation();