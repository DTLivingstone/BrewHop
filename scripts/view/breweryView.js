(function(module) {

  var breweryView = {};
  var breweryRendered = false;

  var render = function(brewery) {
    var template = Handlebars.compile($('#brewery-template').text());
    // console.log(brewery);
    return template(brewery);
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
      // How can I take the breweryId results from the above function and pass into my initIndex?
    });
  };

  var filterResults = function(filterArray) {
    var sqlString = filterArray.join(' OR ');
    Brewery.findBreweryWhere(filterArray, sqlString);
  };

  breweryView.initIndexPage = function() {
    if (breweryRendered === true) {
      return;
    };
    breweryRendered = true;
    Brewery.all.forEach(function(b){
      $('#breweries').append(render(b));
    });
    breweryView.handleBeerFilter();
    // breweryView.setTeasers();
  };

  module.breweryView = breweryView;
})(window);
