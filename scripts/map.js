var BrewMap = {};
var marker =[];
var map;
var mapIconInfo = "brewery infor goes here";
var breweries = [
//list brewery long & lat in the brackets
  ['Bad Jimmy'/'s Brewing', 47.660403, -122.365406, 4],
  ['Big Al Brewing',47.514322, -122.352378, 5],
  ['Big Time Brewing Company', 47.657854, -122.313546, 6],
  ['Burdick Brewery', 47.530388, -122.323241, 7],
  ['Cloudburst Brewing', 47.611686, -122.345118, 8],
  ['503B S Michigan St, Seattle, WA 98108', 47.545501, -122.328096, 9],
  ['two-beers', 47.61, -122.33, 1],
  ['test-beers', 47.69, -122.36,2],
  ['hillards', 47.64, -122.34, 3],

];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.61, lng: -122.33},
    zoom: 15
  });
  setMarkers(map);
};

function setMarkers(map) {
  var infowindow = new google.maps.InfoWindow({
    content: mapIconInfo,
    maxWidth: 200
  });
  var image = {
    url: 'images/icons/hop-map-icon.png',
    size: new google.maps.Size(80,80),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,20)
  };
  var shape = {
    coords: [1,40,60,80,78,60,40,1],
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
};
