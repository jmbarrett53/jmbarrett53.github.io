// Initialize the heatmap functionality after the map is set up
function initHeatmap(map) {
    // Example data points (latitude, longitude, intensity)
    const heatmapData = [
      [38.899, -77.265, 0.5], // Example point with intensity
      [38.895, -77.275, 0.2],
      [38.905, -77.250, 0.8],
      [38.890, -77.260, 0.4]
    ];
  
    // Add heatmap layer
    const heatmapLayer = L.heatLayer(heatmapData, {
      radius: 25,  // Radius of each heatmap point in pixels
      blur: 15,    // Blur intensity for the heatmap
      maxZoom: 13, // Maximum zoom level for heatmap
      max: 1.0     // Maximum intensity
    });
  
    // Add the heatmap layer to the map
    heatmapLayer.addTo(map);
  }
  
  // Initialize heatmap on page load
  window.onload = function () {
    // The map is already created in your HTML shell, pass it to initHeatmap
    initHeatmap(map);
  };
  