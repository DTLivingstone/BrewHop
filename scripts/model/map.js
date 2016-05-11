
  var markers = {};
  var map;
  var mapLoaded = false;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.61, lng: -122.33},
      zoom: 12,
      scrollwheel: false
    });
    google.maps.event.addListenerOnce(map, 'idle', function(){
      mapLoaded = true;
    });
  }

  function loadMap() {
    google.maps.event.addListenerOnce(map, 'idle', function(){
      setMarkers(map);
    });
  }

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

    var infowindow = new google.maps.InfoWindow({
    });

    function newMarker(brewery) {
      var marker = new google.maps.Marker({
        position:{lat: parseFloat(brewery.latitude), lng: parseFloat(brewery.longitude)},
        map: map,
        icon: image,
        shape: shape,
        title: brewery.name
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.close();
        infowindow.setContent(marker.getTitle());
        infowindow.open(map,marker);
      });
      markers[brewery.breweryId] = marker;
    };

    for (var i = 0; i < Brewery.all.length; i++){
      newMarker(Brewery.all[i]);
    }
  }
