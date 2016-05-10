(function(module) {
  var breweryController = {};
  var indexRendered = false;

  Brewery.filterUniqueBreweryIds();

  var dbloadComplete = false;

  var checkDBloadComplete = function() {
    if (Beer.dbComplete === true && Brewery.dbComplete === true) {
      dbloadComplete = true;
    };
  };

  breweryController.initTables = function(ctx, next) {
    $('#map').show();
    $('#breweries').show();
    $('.sidebar').show();
    $('#about').hide();
    Brewery.initTables();
    Beer.initTables();
    next();
  };

  breweryController.index = function(ctx, next) {
    Brewery.grabAllBreweryData();
    // if (!indexRendered) {
    breweryView.initIndexPage();
      // indexRendered = true;
    // };
  };

  module.breweryController = breweryController;
})(window);
