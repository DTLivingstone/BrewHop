(function(module) {
  var breweryController = {};
  var indexRendered = false;

  breweryController.index = function() {
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
