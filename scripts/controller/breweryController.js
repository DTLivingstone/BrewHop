(function(module) {
  var breweryController = {};

  Brewery.createLocationTable();

  breweryController.index = function() {
    // FilterUniqueBreweryIds(Brewery.initTables);

    $('#breweries').show().siblings().hide();
  };

  module.breweryController = breweryController;
})(window);
