
var markers =[];
var map;
var mapIconInfo = "brewery info goes here";
var breweries = [
//list brewery long & lat in the brackets
  ['Bad Jimmys Brewing', 47.660403, -122.365406, 4],
  ['Big Al Brewing', 47.514322, -122.352378, 5],
  ['Big Time Brewing Company', 47.657854, -122.313546, 6],
  ['Burdick Brewery', 47.530388, -122.323241, 7],
  ['Cloudburst Brewing', 47.611686, -122.345118, 8],
  ['Counterbalance Brewing Company', 47.545501, -122.328096, 9],
  ['Elliott Bay Brewery and Pub', 47.560406, -122.386415, 1],
  ['Elysian Brewing Company', 47.613929, -122.315922, 2],
  // ['Emerald City Beer Company', ],/////closed now
  // ['Filthy Brewing Alliance',],///not a brewery
  ['Flying Bike Cooperative Brewery', 47.692105, -122.355007, 3],
  ['Flying Lion Brewing', 47.555989, -122.284290, 4],
  ['Fremont Brewing', 47.649189, -122.344433, 5],
  ['Georgetown Brewing Company', 47.555271, -122.325672, 6],
  ['Ghostfish Brewing Company', 47.576287, -122.333849, 7],
  ['Hales Ales Brewery and Pub',47.659074, -122.365339, 8],
  ['Hellbent Brewing Company', 47.723948, -122.293203, 9],
  ['Hilliard\'s Beer', 47.6645442, -122.3780257, 1],
  ['Holy Mountain Brewing Company', 47.6308025,-122.3767066,2],
  // ['Kortegast & Co'],////not sure what this is
  ['Lantern Brewing', 47.6980789,-122.3456311, 3],
  ['Lowercase Brewing', 47.530388,-122.32544, 4],
  ['Lucky Envelope Brewing', 47.6647949,-122.371264, 5],
  ['Machine House Brewery', 47.550159,-122.319486, 6],
  ['Maritime Pacific Brewing', 47.6626916,-122.3739636, 7],
  ['Naked City Brewery & Taphouse', 47.6918448,-122.3572893, 8],
  ['No. 6 Hard Cider', 47.6274115,-122.3720425, 9],
  ['NW Peaks Brewery', 47.664183,-122.380805, 1],
  ['Odin Brewing Company', 47.4899768,-122.3523348, 2],
  ['Outer Planet Craft Brewing', 47.6180202,-122.3186698, 3],
  ['Outlander Brewing', 47.65231,-122.357761, 4],///not sure if this is a brewery
  // ['Pacific Rim Brewing'],/////no longer a brewery now call big Al
  ['Peddler Brewing Company', 47.6638753,-122.377054, 5],
  ['Pike Brewing Company', 47.608232,-122.341937, 6],
  ['Populuxe Brewing',47.6645364,-122.3702511, 7],
  ['Pyramid Breweries', 47.5907677,-122.3382887, 8],
  ['RAM Restaurant & Brewery', 47.6858006,-122.3473387, 9],
  ['RAM Restaurant & Brewery', 47.6858006,-122.3473387, 1],
  ['Reuben\'s Brews', 47.6654282,-122.3752631, 2],
  ['Rock Bottom Restaurant & Brewery', 47.6123963,-122.3366261, 3],
  // ['Rock Island Brewing Co.', ],/////not in Seattle
  ['Rooftop Brewing Company', 47.6558417,-122.3753068, 4],
  ['Schilling Cider', 47.6496435,-122.3513875, 5],
  ['Schooner Exact Brewing Company', 47.56772,-122.337812, 6],
  ['Seapine Brewing Company', 47.576109,-122.337779, 7],
  ['Seattle Cider Company', 47.5603272,-122.3397986, 8],
  ['Spinnaker Bay Brewing', 47.5507849,-122.2792994, 9],
  ['Standard Brewing', 47.5994777,-122.3019431, 1],
  ['Stoup Brewing', 47.6666891,-122.3733587, 2],
  // ['Thomas Kemper Brewing',],/////part of Pyramid
  ['Tin Dog Brewing', 47.526066,-122.331874, 3],
  ['TroutTamer Brewing', 44.528608,-72.0038298, 4],
  ['Two Beers Brewing Company', 47.5605572,-122.3396921, 5],
  ['Urban Family Brewing', 47.6605741,-122.392483, 6],
  ['West Seattle Brewing Company', 47.5643375,-122.3798643, 7],
];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.61, lng: -122.33},
    zoom: 14
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
  var infowindow = new google.maps.InfoWindow({
    content: mapIconInfo,
    maxWidth: 200
  });

  var shape = {
    coords: [1,25,30,,35,35,25,1],
    type: 'poly'
  };
  for (var i = 0; i < breweries.length; i++){
    // var brewery = breweries[i];
    // console.log(brewery);
    var marker = new google.maps.Marker({
      position:{lat: breweries[i][1], lng: breweries[i][2]},
      map: map,
      icon: image,
      shape: shape,
      setTitle: breweries[i][0],
      setZIndex: breweries[i][3]
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  }
};
$('#map').hide();

$( "#search" ).on( "click", function(event) {
  $('#map').show();
  initMap();
});
