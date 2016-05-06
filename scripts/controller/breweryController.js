(function(module) {
  var breweryController = {};

  // Brewery.createLocationTable();

  breweryController.index = function() {
    setTimeout(function() {
      $('#map').show();
      breweryView.initIndexPage();
      $('#about').hide();
    });
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
