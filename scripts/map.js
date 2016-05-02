'use strict';
function initMap(){
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 47.61, lng: -122.33},
    zoom: 14
  });
  // setMarkers(map);
}

// var breweries = [
// //list brewery long & lat in the brackets
//   ['two-beers': 47.5605572, -122.3396921, 1],
//   []
//
// ];
//
// function setMarkers(map) {
//   var image = {
//     url: '',//image file goes here
//     //the marker size is 20 px wide by 30px tall
//     size: new google.maps.Size(20,30),
//     origin: new google.maps.Point(0,0),
//     anchor: new google.maps.Point(0,30)
//   };
//   var shape = {
//     coords: [1,1,1,20,18,20,18,1],
//     type: 'poly'
//   };
//   for (var i = 0; i < breweries.length; i++){
//     var brewery = breweries[i];
//     var marker = new google.maps.Marker({
//       position:{lat: brewery[1], lng: brewery[2]},
//       map: map,
//       icon: image,
//       shape: shape,
//       title: brewery[0],
//       zIndex: brewery[3]
//     });
//   }
// }
