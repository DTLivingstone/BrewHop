'use strict';
function initMap(){
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 47.61, lng: -122.33},
    zoom: 14
  });
  map.data.loadGeoJson('https://storage.googleapis.com/maps-devrel/google.json');
}
