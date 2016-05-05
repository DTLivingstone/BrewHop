(function(module) {

  var breweryView = {};

  var render = function(brewery) {
    var template = Handlebars.compile($('#brewery-template').text());

    return template(brewery);
  };

  breweryView.initProfilePage = function() {
    var template = Handlebars.compile($('#').text());
  };

  breweryView.initIndexPage = function() {
    Brewery.all.forEach(function(a){
      $('#breweries').append(a.toHtml());
    });
  };

  breweryView.handleBeerFilter = function() {
    var filterArray = [];
    $('input[type="checkbox"]').change(function(){
      if($(this).is(':checked')) {
        var filterString = $(this).attr('name') + '=' + $(this).val();
        filterArray.push(filterString);
      } else {
        var filterString = $(this).attr('name') + '=' + $(this).val();
        filterArray.splice(filterArray.indexOf(filterString), 1);
      }
      filterResults(filterArray);
    });
  };

  var filterResults = function(filterArray) {
    var sqlString = filterArray.join(' OR ');
    Brewery.findBreweryWhere(filterArray, sqlString);
  };

  //TODO:Write what to do next with results from handleBeerFilter. This funtion should display the resulting Breweries in DOM with map.

  breweryView.handleBeerFilter();
  module.breweryView = breweryView;
})(window);
