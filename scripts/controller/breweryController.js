(function(module) {
  var breweryController = {};
  var indexRendered = false;
  var dbloadComplete = false;
  var nextRoute;
  var dataInterval;

  Brewery.filterUniqueBreweryIds();

  breweryController.checkDBloadComplete = function() {
    if (Beer.dbComplete === true && Brewery.dbComplete === true) {
      clearInterval(dataInterval);
      nextRoute();
    };
  };

  breweryController.initTables = function(ctx, next) {
    $('#map').show();
    $('#breweries').show();
    $('.sidebar').show();
    $('#about').hide();
    if (!indexRendered) {
      Brewery.initTables();
      Beer.initTables();
      initMap();
      nextRoute = next;
      dataInterval = setInterval(breweryController.checkDBloadComplete, 1000);
    }
  };

  breweryController.index = function(ctx, next) {
    Brewery.grabAllBreweryData(function(){
      if (!indexRendered) {
        breweryView.initIndexPage();
        if (mapLoaded) {
          setMarkers(map);
        } else {
          loadMap();
        }
        indexRendered = true;
      };
    });
  };

  module.breweryController = breweryController;
})(window);
