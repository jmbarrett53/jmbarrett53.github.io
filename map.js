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
                    radius: 24140     // Radius in meters (5 km in this case)
                }).addTo(map);
            }
        });
    }
});

// Function to highlight counties from CSV and apply them to GeoJSON
async function highlightCounties(csvFilePath, geojsonFilePath) {
    try {
        // Load the CSV file
        const csvResponse = await fetch(csvFilePath);
        const csvText = await csvResponse.text();
        const csvData = Papa.parse(csvText, { header: true }).data;
        const highlightCounties = csvData.map(row => row.CountyName.trim());

        // Load the GeoJSON file
        const geojsonResponse = await fetch(geojsonFilePath);
        const geojsonData = await geojsonResponse.json();

        // Add GeoJSON layer with conditional styling
        L.geoJSON(geojsonData, {
            style: function (feature) {
                if (highlightCounties.includes(feature.properties.NAME)) {
                    return { color: 'red', weight: 2, fillColor: 'yellow', fillOpacity: 0.6 };
                } else {
                    return { color: 'blue', weight: 1, fillOpacity: 0.3 };
                }
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(`County: ${feature.properties.NAME}`);
            }
        }).addTo(map);
    } catch (error) {
        console.error('Error loading files:', error);
    }
}

// Call the function with paths to your CSV and GeoJSON files
highlightCounties('AL_county_econ_data.csv', 'alabama_counties.geojson');
