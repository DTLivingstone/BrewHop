(function(module) {
  var breweryController = {};

  // Brewery.createLocationTable();

  breweryController.index = function() {
    // FilterUniqueBreweryIds(Brewery.initTables);

    $('#breweries').show().siblings().hide();
    $('#map').show();
    $('#filter').show();
  };

  breweryController.loadByBeerCategory = function(ctx, next) {
    var breweryData = function(breweriesByBeerCategory) {
      ctx.breweries = breweriesByBeerCategory;
      next();
    };
    Brewery.findBreweryWhere();
  };

  module.breweryController = breweryController;
})(window);
