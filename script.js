let userLatitude = 0;
let userLongitude = 0;

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;

      // Display map
      displayMap(userLatitude, userLongitude);

      // Send location to backend
      const response = await fetch('http://localhost:3000/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: userLatitude, longitude: userLongitude }),
      });
      // Next line will return as a string
      const py_output_str = await response.text();
      console.log('Python Output:', py_output_str);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function displayMap(lat, lon) {
  var map = L.map('map').setView([lat, lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  L.marker([lat, lon]).addTo(map)
    .bindPopup('Your Location')
    .openPopup();
}

// Function to add a marker to the map
function addMarkerToMap(lat, lon) {
  L.marker([lat, lon]).addTo(map)
    .bindPopup(`New Location: ${lat}, ${lon}`)
    .openPopup();
}

getLocation();