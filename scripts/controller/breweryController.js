(function(module) {
  var breweryController = {};
  var indexRendered = false;

  Brewery.filterUniqueBreweryIds();

  breweryController.initTables = function(ctx, next) {
    Brewery.initTables();
    Brewery.grabAllBreweryData();
    Beer.initTables();
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
    next();
  };

  module.breweryController = breweryController;
})(window);
