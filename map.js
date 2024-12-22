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
                // Add a marker for each store
                const marker = L.marker([parseFloat(row.latitude), parseFloat(row.longitude)]).addTo(map);
                marker.bindPopup(`<b>${row.store_name}</b>`); // Add store name as a popup
            }
        });
    }
});
