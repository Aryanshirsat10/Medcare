function initMap() {
  // Get the user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLocation = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);

      // Define the search request
      var searchRequest = {
        location: userLocation,
        radius: 500,
        entityType: 'Healthcare',
        query: 'Doctor'
      };

      // Create a new map centered on the user's location
      var map = new Microsoft.Maps.Map('#map', {
        center: userLocation,
        zoom: 15
      });

      // Perform a search for doctors
      Microsoft.Maps.Search.search(searchRequest, map, function(searchResponse) {
        var results = searchResponse.results;
        if (results && results.length > 0) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i].location;

            // Create a pushpin to mark the location of the doctor
            var pushpin = new Microsoft.Maps.Pushpin(place, {
              title: results[i].name,
              subTitle: results[i].address.formattedAddress
            });

            // Add the pushpin to the map
            map.entities.push(pushpin);

            // Create an info box to display additional information about the doctor
            var infobox = new Microsoft.Maps.Infobox(place, {
              title: results[i].name,
              description: results[i].address.formattedAddress
            });

            // Add an event handler to display the info box when the pushpin is clicked
            Microsoft.Maps.Events.addHandler(pushpin, 'click', function(e) {
              infobox.setOptions({ visible: true });
            });
          }
        }
      });
    }, function() {
      // Handle errors with geolocation
      alert('Error: The Geolocation service failed.');
    });
  } else {
    // Handle errors with geolocation
    alert('Error: Your browser doesn\'t support geolocation.');
  }
}
