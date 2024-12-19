function initMap() {
    // Center the map around Vienna
    const vienna = { lat: 48.2082, lng: 16.3738 };
  
    // Initialize the map
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: vienna,
      mapTypeId: 'roadmap'
    });
  
    // Example data points (latitude, longitude, intensity)
    const heatmapData = [
      { location: new google.maps.LatLng(48.210033, 16.363449), weight: 3 },
      { location: new google.maps.LatLng(48.209217, 16.379891), weight: 2 },
      { location: new google.maps.LatLng(48.215056, 16.345843), weight: 5 },
      { location: new google.maps.LatLng(48.198975, 16.372116), weight: 1 }
    ];
  
    // Create the heatmap layer
    const heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map
    });
  
    // Optional: Customize the heatmap
    heatmap.set('radius', 20);
    heatmap.set('opacity', 0.6);
  }
  
  // Initialize the map when the page loads
  window.onload = initMap;
  