(function(module) {
  var breweryController = {};
  var indexRendered = false;

  Brewery.filterUniqueBreweryIds();
  // Beer.initTables();
  // Brewery.initTables();

  breweryController.grabAll = function(ctx, next) {
    Beer.initTables();
    Brewery.initTables();
    Brewery.grabAllBreweryData();
    next();
  };

  breweryController.index = function(ctx, next) {
    $('#map').show();
    $('#breweries').show();
    $('.sidebar').show();
    if (!indexRendered) {
      setTimeout(function(){
        breweryView.initIndexPage();
      }, 1500);
      indexRendered = true;
    }
    $('#about').hide();
    // Beer.initTables();
    next();
  };

  module.breweryController = breweryController;
})(window);
