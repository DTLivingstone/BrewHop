var marker;
var mapIconInfo = "brewery info goes here";

function initMap(){
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 47.61, lng: -122.33},
    zoom: 15
  });
  setMarkers(map);
}

var breweries = [
//list brewery long & lat in the brackets
  ['two-beers', 47.61, -122.33, 1],
  ['test-beers', 47.69, -122.36,2],

];


function setMarkers(map) {
  var infowindow = new google.maps.InfoWindow({
    content: mapIconInfo,
    maxWidth: 200
  });
  var image = {
    url: '/images/icons/icon-hopfen.svg',
    //the marker size is 20 px wide by 30px tall
    size: new google.maps.Size(20,30),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,30)
  };
  var shape = {
    coords: [1,1,1,20,18,20,18,1],
    type: 'poly'
  };
  for (var i = 0; i < breweries.length; i++){
    var brewery = breweries[i];
    var marker = new google.maps.Marker({
      position:{lat: brewery[1], lng: brewery[2]},
      map: map,
      icon: image,
      shape: shape,
      title: brewery[0],
      zIndex: brewery[3]
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
}
