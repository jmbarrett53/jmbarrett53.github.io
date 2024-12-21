let userLatitude = 0;
let userLongitude = 0;

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;

      // // Display map
      // displayMap(userLatitude, userLongitude);

      // Send location to backend
      const response = await fetch('http://localhost:3000/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: userLatitude, longitude: userLongitude }),
      });
      // Next line will return as a string e.g., "('34.27238083', '-79.70439911')"
      const pyOutputStr = await response.text();
      console.log('Python Output:', pyOutputStr);

      // Parse the tuple string into coordinates
      const coordinates = parseCoordinates(pyOutputStr);

      // Add the new marker to the map
      if (coordinates) {
        const bucLat = coordinates[0];
        const bucLong = coordinates[1];
      }
      else {
        console.log("Invalid Coordinates")
        return
      }
      
      // Display map after calculating closest buc-ees
      displayMap(userLatitude, userLongitude, bucLat, bucLong);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function displayMap(userLat, userLong, bucLat, bucLong) {
  var map = L.map('map').setView([userLat, userLong], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // Add current location
  L.marker([userLat, userLong]).addTo(map)
    .bindPopup('Your Location')
    .openPopup();

    L.marker([bucLat, bucLong]).addTo(map)
    .bindPopup("Closest Buc-ee's")
    .openPopup();
}

// Function to parse tuple string e.g., "('34.27238083', '-79.70439911')" into an array of numbers
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

// Function to add a marker to the map
function addMarkerToMap(lat, lon) {
  L.marker([lat, lon]).addTo(map)
    .bindPopup(`New Location: ${lat}, ${lon}`)
    .openPopup();
}

getLocation();