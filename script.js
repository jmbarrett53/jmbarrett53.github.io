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
      const pyOutputStr = await response.text();
      console.log('Python Output:', pyOutputStr);

      // Parse the tuple string into coordinates
      const coordinates = parseCoordinates(pyOutputStr);

      // Add the new marker to the map
      if (coordinates) {
        addMarkerToMap(coordinates[0], coordinates[1]);
      }

    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Function to parse tuple string into an array of numbers
function parseCoordinates(tupleStr) {
  try {
    // Remove parentheses and split by comma
    const stripped = tupleStr.replace(/[()']/g, '').trim();
    const [lat, lon] = stripped.split(',').map(Number);

    // Ensure parsed values are valid numbers
    if (!isNaN(lat) && !isNaN(lon)) {
      return [lat, lon];
    } else {
      console.error('Invalid coordinates received:', tupleStr);
      return null;
    }
  } catch (error) {
    console.error('Error parsing coordinates:', error);
    return null;
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