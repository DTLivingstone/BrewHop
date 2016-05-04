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

  module.breweryView = breweryView;
})(window);
