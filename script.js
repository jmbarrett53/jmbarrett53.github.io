// script.js
var map = L.map('map').setView([38.901222, -77.265259], 12); // Initial view (Vienna, VA)

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker at Vienna, Virginia
L.marker([38.899, -77.265]).addTo(map)
.bindPopup('Vienna, Virginia')
.openPopup();

// // Function to simulate dynamic traffic data (for example, traffic speed or congestion)
// function getTrafficData() {
//   // Simulated traffic data - you can replace this with real-time data from an API
//   const trafficData = [
//     { lat: 37.7749, lon: -122.4194, congestion: 'high' },
//     { lat: 37.7849, lon: -122.4294, congestion: 'low' },
//     { lat: 37.7949, lon: -122.4394, congestion: 'medium' },
//   ];

//   return trafficData;
// }

// // Function to visualize traffic on the map
// function visualizeTraffic() {
//   const trafficData = getTrafficData();
  
//   trafficData.forEach((data) => {
//     let color;
//     switch (data.congestion) {
//       case 'high':
//         color = 'red';
//         break;
//       case 'medium':
//         color = 'orange';
//         break;
//       case 'low':
//         color = 'green';
//         break;
//       default:
//         color = 'blue';
//         break;
//     }

//     // Add a marker for each traffic point with dynamic colors
//     L.circleMarker([data.lat, data.lon], {
//       radius: 10,
//       fillColor: color,
//       color: color,
//       weight: 1,
//       opacity: 1,
//       fillOpacity: 0.8
//     }).addTo(map);
//   });
// }

// // Call visualizeTraffic to display traffic data
// visualizeTraffic();

// // You can use setInterval to refresh the traffic data dynamically
// setInterval(() => {
//   visualizeTraffic();
// }, 5000); // Refresh traffic data every 5 seconds

// function getTrafficData() {
//     // Example API fetch to get real-time traffic data
//     fetch('https://api.example.com/traffic-data')
//       .then((response) => response.json())
//       .then((data) => {
//         // Process and visualize the traffic data
//         visualizeTraffic(data);
//       })
//       .catch((error) => console.error('Error fetching traffic data:', error));
//   }
  