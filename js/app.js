function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      latitud: -34.397,
      longitud: 150.644
    },
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var txtOrigin = document.getElementById('txtOrigin');
  var txtDestiny = document.getElementById('txtDestiny');
  var btnRuta = document.getElementById('btnRuta');
  new google.maps.places.Autocomplete(txtOrigin);
  new google.maps.places.Autocomplete(txtDestiny);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: txtOrigin.value,
      destination: txtDestiny.value,
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No encontramos una ruta');
      }
    });
  };

  var trazarRuta = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  btnRuta.addEventListener('click', trazarRuta);

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
}