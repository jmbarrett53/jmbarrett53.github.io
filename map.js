// Initialize the map centered on Alabama
const map = L.map('map').setView([32.806671, -86.791130], 7); // Zoom level 7

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Load the CSV file
Papa.parse("processed_stores.csv", {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;
        data.forEach(row => {
            if (row.latitude && row.longitude) {
                const lat = parseFloat(row.latitude);
                const lng = parseFloat(row.longitude);
                const name = row["Store Name"]; // Correct column name

                // Add a marker for each store
                const marker = L.marker([lat, lng]).addTo(map);
                marker.bindPopup(`<b>${name}</b>`); // Store name popup

                // Add a shaded circle around the store
                L.circle([lat, lng], {
                    color: 'blue',       // Circle border color
                    fillColor: 'lightblue', // Shaded fill color
                    fillOpacity: 0.3,   // Transparency of the fill
                    radius: 5000        // Radius in meters (5 km in this case)
                }).addTo(map);
            }
        });
    }
});
