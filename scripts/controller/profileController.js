(function(module) {
  var profileController = {
    index: function() {
      FilterUniqueBreweryIds(breweryView.initProfilePage);
      $('main > section').hide();
      $('#profiles').show();
    }
  };

  module.profileController = profileController;
})(window);
