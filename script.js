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
      const data = await response.text();
      console.log('Python Output:', data);
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

getLocation();