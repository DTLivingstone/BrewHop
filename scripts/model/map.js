
var markers =[];
var map;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.61, lng: -122.33},
    zoom: 12
  });
  setMarkers(map);
};

function setMarkers(map) {

  var image = {
    url: 'images/icons/hop-map-icon-small.png',
    size: new google.maps.Size(30,30),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,30)
  };


  var shape = {
    coords: [1,25,30,,35,35,25,1],
    type: 'poly'
  };
  for (var i = 0; i < Brewery.all.length; i++){
    // var brewery = breweries[i];
    // console.log(brewery);
    var marker = new google.maps.Marker({
      position:{lat: parseFloat(Brewery.all[i].latitude), lng: parseFloat(Brewery.all[i].longitude)},
      map: map,
      icon: image,
      shape: shape,
      setTitle: Brewery.all[i].breweryId,
      setZIndex: Brewery.all[i].id
    });
    markers.push(marker);

  }

};

setTimeout(function(){
  initMap();
},1000);
