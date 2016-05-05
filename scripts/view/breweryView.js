(function(module) {

  var breweryView = {};

  var render = function(brewery) {
    var template = Handlebars.compile($('#brewery-template').text());
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
    Project.all.forEach(function(a){
      console.log(a);
      $('#projects').append(render(a));
    });
    breweryView.handleBeerFilter();
    // breweryView.setTeasers();
  };

  module.breweryView = breweryView;
})(window);
