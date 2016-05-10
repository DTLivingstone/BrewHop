(function(module) {

  var breweryView = {};
  var beersLoaded = false;

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

  breweryView.setTeasers = function() {
    $('.brewery-container *:nth-of-type(n+2)').hide();
    $('.brewery-container').on('click', 'a.learn-more', function(e) {
      e.preventDefault();
      $('.brewery-container *:nth-of-type(n+2)').hide();
      $(this).parent().find('*').fadeIn();
      $('a.learn-more').show();
      $(this).hide();
    });
  };

  var filterResults = function(filterArray) {
    var sqlString = filterArray.join(' OR ');
    Brewery.findBreweryWhere(filterArray, sqlString);
  };

  breweryView.initIndexPage = function() {
    Brewery.all.forEach(function(b){
      $('#breweries').append(render(b));
    });
    breweryView.handleBeerFilter();
    breweryView.setTeasers();
    // Beer.initTables();
  };

  module.breweryView = breweryView;
})(window);
