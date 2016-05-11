(function(module) {
  var aboutView = {};

  aboutView.index = function() {
    $('#map').hide();
    $('#breweries').hide();
    $('.sidebar').hide();
    $('#about').show();
  };

  module.aboutView = aboutView;
})(window);
