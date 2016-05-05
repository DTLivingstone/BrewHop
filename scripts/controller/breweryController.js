(function(module) {
  var breweryController = {};

  breweryController.index = function() {
    Brewery.initTables();

    $('#breweries').show().siblings().hide();

    $('.brewery-query').on('submit', function(event) {
      event.preventDefault();
      var breweryName = $('#brewery-input').val();
      breweryName = something; // something that matches to name or id in our data;
    });


  };

  // testing an idea from stackoverflow
  function matchBreweryName (string, stringInArray) {
    for (var i = 0; i < stringInArray.length; i++) {
      if (stringInArray[i].match(string)) return i;
    }
    return -1;
  }


  breweryController.loadByBeerCategory = function(ctx, next) {
    var breweryData = function(breweriesByBeerCategory) {
      ctx.breweries = breweriesByBeerCategory;
      next();
    };
    Brewery.findBreweryWhere();
  };

  module.breweryController = breweryController;
})(window);
